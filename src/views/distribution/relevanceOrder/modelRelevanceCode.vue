<template>
    <div class="modal fade order-tip" :class="{'in':modal.show}" v-show="close">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.title}}</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <!--<label class="control-label">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</label>-->
                                <h class="account-margin top-text">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr class="bgcolor">
                                        <th>SKU</th>
                                        <th>产品名称</th>
                                        <th>大码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="saleOrder in saleOrders">
                                        <td>{{saleOrder.CustomBC}}</td>
                                        <td>{{saleOrder.GoodsName}}</td>
                                        <td>
                                            <span v-if="!saleOrder.IsNewBoxCode">{{saleOrder.BoxCode}}</span>
                                            <input @keyup.enter="nextBoxCode($index + 1)" index="boxCodeForm{{$index + 1}}" v-if="saleOrder.IsNewBoxCode" v-model="saleOrder._BoxCode | scanBoxCode" type='text' class="form-control" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="matchOrder()" type="button" class="btn btn-primary"> 确定 </button>
                    </div>
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
                modal: {
                    show: false,
                    title: '盒码和防伪码'
                },
                saleOrders: [],
                qrCodeID: ''
            }
        },
        computed: {
            relevanceOrders: {
                get: function () {
                    var saleOrders = [];
                    this.saleOrders.forEach(function (saleOrder) {
                        if (saleOrder.IsNewBoxCode && saleOrder._BoxCode) {
                            saleOrders.push({
                                BarcodeID: saleOrder.BarcodeID,
                                BoxCode: saleOrder._BoxCode,
//                            QRCodeID: self.qrCodeID,
                                CustomerID: saleOrder.CustomerID,
                                SheetID: saleOrder.SheetID,
                                Note: saleOrder.Note || ''
                            });
                        }
                    });
                    return saleOrders;
                }
            }
        },
        filters: {
            scanBoxCode: {
                write: function (boxCode) {
                    var scanBoxCode = boxCode.match(/c=(.*)$/);  // 通过扫描二维码得到的boxCode
                    scanBoxCode = scanBoxCode ? scanBoxCode[1] : '';
                    return scanBoxCode || boxCode || '';
                }
            }
        },
        methods: {
            close: function () {
                this.modal.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modal.show = true;
            },
            // 关联订单
            matchOrder: function () {
                var self = this;
                if (self.relevanceOrders.length > 0) {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasQRCode/ErpOrderMatch',
                        contentType: 'application/json',
                        data: JSON.stringify(self.relevanceOrders)
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '关联成功!'
                            });
                            self.$dispatch('page-change');
                            self.close();
                        }
                    })
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少关联一条数据!'
                    });
                }
            },
            // 输入下一条数据
            nextBoxCode: function (index) {
                if (index < this.saleOrders.length) {
                    document.querySelector("[index='boxCodeForm" + (index + 1) + "']").focus();
                }
            }
        },
        events: {
            'model-relevance-code': function (saleOrders, qrCodeID) {
                this.showModal();
                this.saleOrders = saleOrders;
                this.qrCodeID = qrCodeID;

            }
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    .box-code {
        .top-text {
            padding-left: 15px;
        }
        .detail {
            margin-top: 20px;
        }
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>