<template>
    <div class="modal fade" :class="{'in':modalWindow.show}"  v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" v-drag parent=".modal-content-wrap">
                    <button @click="close" type="button" class="close"><span>&times;</span></button>
                    <h4 class="modal-title">{{modalWindow.title}}</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="form-group col-lg-12" v-for="customer in customerGroup | orderBy 'OrderNo'">
                                <label>{{customer.Sheet}}</label>
                                <label>{{customer.LinkMan}}:</label>
                                <input @keyup.enter="autoGenerateSheet" @focus="getCurrent(customer,$index)" v-model="customer.DeliverySheetID" type="text" class="form-control"  placeholder="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:void(0)" @click="close" class="btn btn-default"> 取消 </a>
                    <!-- <a @click="autoGenerateSheet" href="javascript:void(0)"  class="btn btn-default">一键生成运单号</a> -->
                    <a href="javascript:void(0)" @click="submit" class="btn btn-primary"> 保存 </a>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                deliveryCode: 0,  //快递编码
                customerGroup: [],
                currentCustomer: {
                    customer: {},
                    index: 0
                }
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
                this.customerIDGroup = [];
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modalWindow.show = true;
            },
            submit: function () {
                this.updateOutStockDeliverySheetID();
            },
            updateOutStockDeliverySheetID: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/UpdateOutStockDeliverySheetID',
                    contentType: 'application/json',
                    data: JSON.stringify(self.customerGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '修改运单号成功!'
                        });
                        self.close();
                        self.$dispatch('refreshOutStockBatch');
                        self.$dispatch('page-change');
                    }
                })
            },
            //获取当前订单
            getCurrent: function (customer, index) {
                this.currentCustomer = {
                    customer: customer,
                    index: index
                }
            },
            // 自动生成运单号
            autoGenerateSheet: function () {
                var customerLength = this.customerGroup.length;    //订单长度
                var currentIndex = this.currentCustomer.index;     //当前订单的位置
                var currentDeliverySheetID = this.currentCustomer.customer.DeliverySheetID;   //当前运单号
                if (currentDeliverySheetID) {  //如果有选中当前单
                    for (var i = 1, distance = customerLength - currentIndex; i < distance; i++ ) {
                        switch (this.deliveryCode) {
                            case 'SF':
                                if (!isNaN(currentDeliverySheetID) && currentDeliverySheetID.length == 12) {
                                    currentDeliverySheetID = this.getNewOtherDeliveryNo(currentDeliverySheetID);
                                } else {
                                    this.$dispatch('transmit','tip',{
                                        name: '提示',
                                        contentText: '顺风的运单号为12位的数字!'
                                    });
                                }
                                break;
                            case 'EMS':
                                if (currentDeliverySheetID.length == 13 && !isNaN(currentDeliverySheetID.substr(2,11))) {
                                    currentDeliverySheetID = this.getNewEmsNo(currentDeliverySheetID);
                                } else {
                                    this.$dispatch('transmit','tip',{
                                        name: '提示',
                                        contentText: '请提供正确的EMS运单号!'
                                    });
                                }
                                break;
                            default:
                                currentDeliverySheetID = this.getNewOtherDeliveryNo(currentDeliverySheetID);
                        }
                        this.customerGroup[currentIndex + i].DeliverySheetID = currentDeliverySheetID;
                    }
                } else {

                }
            },
            // 自动生成EMS快递单号
            getNewEmsNo: function (No) {
                var fri = '';
                var res;
                var num3,
                        num4,
                        num5,
                        num6,
                        num7,
                        num8,
                        num9,
                        num0;
                var mid;
                var strZero = '00000000';
                var strNo = String(No);
                fri = String(Number(strNo.substr(2,8)) + 1);
                //不足零自动补零
                if (fri.Length < 8) {
                    var strTemp = strZero + fri;
                    fri = strTemp.substr(strTemp.length - 8);
                }
                num3 = Number(fri.substr(0,1));
                num4 = Number(fri.substr(1,1));
                num5 = Number(fri.substr(2,1));
                num6 = Number(fri.substr(3,1));
                num7 = Number(fri.substr(4,1));
                num8 = Number(fri.substr(5,1));
                num9 = Number(fri.substr(6,1));
                num0 = Number(fri.substr(7,1));
                mid = 8 * num3 + 6 * num4 + 4 * num5 + 2 * num6 + 3 * num7 + 5 * num8 + 9 * num9 + 7 * num0;
                res = 11 - (mid) % (11);
                if (res == 10) {
                    res = 0;
                }
                if (res == 11) {
                    res = 5;
                }

                var strHead = strNo.substr(0,2);

                var strEnd = strNo.substr(strNo.length - 2);

                var strEMSres = (strHead + fri + String(res) + strEnd);
                return strEMSres;
            },
            // 自动生成顺风单号
            getNewShunfengNo: function (No) {
                var strNo = String(No);
                if (strNo.length != 12) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '顺风的快递单号为12位数字,请检查!'
                    });
                    return '';
                }
                var fri,
                        Nfri,
                        Yuandanhao,
                        strNewNo;
                var num9,
                    num10,
                    num11,
                    num12;
                var Nnum9,
                    Nnum12;
                var iIndex = 8;

                fri = strNo.substr(0,11);
                Yuandanhao = strNo;


                var strZero = '00000000000';
                //不足零自动补零
                Nfri = String(Number(fri) + 1);
                if (Nfri.Length < 11) {
                    var strTemp = strZero + Nfri;
                    Nfri = strTemp.substr(strTemp.length - 8);
                }

                num9 = Number(Yuandanhao.substr(iIndex++ ,1));
                num10 = Number(Yuandanhao.substr(iIndex++ ,1));
                num11 = Number(Yuandanhao.substr(iIndex++ ,1));
                num12 = Number(Yuandanhao.substr(iIndex++ ,1));

                iIndex = 8;
                Num9 = Number(Nfri.substr(iIndex++, 1));

                if ((Nnum9 - num9 == 1) && ((num9) % (2) == 1)){
                    if (num12 - 8 >= 0) {
                        Nnum12 = num12 - 8;          // -8
                    } else {
                        Nnum12 = num12 - 8 + 10;
                    }
                }
                else if ((Nnum9 - num9 == 1) && ((num9) % (2) == 0)){
                    if (num12 - 7 >= 0) {
                        Nnum12 = num12 - 7;         // -7
                    } else {
                        Nnum12 = num12 - 7 + 10;
                    }
                } else {
                    if (((num10 == 3) || (num10 == 6)) && (num11 == 9)) {
                        if (num12 - 5 >= 0) {
                            Nnum12 = num12 - 5;            // -5
                        } else {
                            Nnum12 = num12 - 5 + 10;
                        }
                    } else if (num11 == 9) {
                        if (num12 - 4 >= 0) {
                            Nnum12 = num12 - 4;          // -4
                        } else {
                            Nnum12 = num12 - 4 + 10;
                        }
                    } else {
                        if (num12 - 1 >= 0) {
                            Nnum12 = num12 - 1;           // -1
                        } else {
                            Nnum12 = num12 - 1 + 10;
                        }
                    }
                    return strNewNo = Nfri + String(Nnum12);
                }
            },
            // 自动生成其他快递编码
            getNewOtherDeliveryNo: function (strNo) {
                var reg = /\d+/g;
                var ms = strNo.match(reg);
                if (ms.length == 1) {
                    var msStr = ms[0];
                    var msNo = Number(ms[0]) + 1;
                    var msStrTemp = String(msNo);
                    var difLength = msStr.length - msStrTemp.length;
                    if (difLength < 0) {
                        msStrTemp = msStrTemp.substr(-difLength);
                    } else {
                        for (var i = 0; i < difLength; i++) {
                            msStrTemp = '0' + msStrTemp;
                        }
                    }
                    msStr = msStrTemp;
                    return strNo.replace(/\d+/g,msStr);
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该运单号无法自动生成!'
                    });
                    return ''
                }
            }
        },
        events: {
            'modal-delivery-sheet': function (customerGroup) {
                this.showModal();
                var self = this;
                var customer = customerGroup
                self.customerGroup = customerGroup
                self.customerGroup = [];
                self.customerGroup.push({
                    OutStockID: customer.OutStockID,
                    Sheet: customer.Sheet,
                    DeliverySheetID: customer.OutStockFlag.DeliverySheetID,
                    OrderNo: customer.MerchantDelivery.OrderNo,
                    LinkMan: customer.LinkMan,
                    MerchantDeliveryID: customer.MerchantDeliveryID,
                    Code: customer.Code
                })
                self.deliveryCode = self.customerGroup[0].Code;
                //按OrderNo顺序排列
                self.customerGroup.sort(function (a, b) {
                    return a.OrderNo - b.OrderNo;
                })
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>