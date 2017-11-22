<template>
    <div class="modal fade" :class="{'in':modalWindow.show}"  v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" v-drag parent=".modal-content-wrap">
                    <button @click="close" type="button" class="close"><span>&times;</span></button>
                    <h4 class="modal-title">{{modalWindow.title}}</h4>
                </div>
                <div class="modal-body">
                    <div class="select-customerNo">
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text" v-model="sheet | arrayToString" class="form-control" placeholder="订单编号,多个以;隔开">
                                <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                            </div>
                        </div>
                        <div class="select-customerNo-result">
                            <select v-model="customerOrdersSelected" class="form-control" multiple>
                                <option :value="customerOrder" v-for="customerOrder in customerOrders">{{customerOrder.Sheet}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                    <button @click="submit" type="button" class="btn btn-primary"> 保存 </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!--<div>{{customerOrdersSelected | json}}</div>-->
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
                    title: '加入订单'
                },
                sheet: [],
                outStockBatchID: '',
                outStockBatchItems: [],  //拣货单订单列表
                customerOrders: [],   //根据订单编号搜索出来的订单
                customerOrdersSelected: [],  //选中的订单
                customerOrdersSave: [],  //保存的订单
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
                this.saveOutStockBatchItem();
            },
            getCustomerOrder: function () {
                var self = this;
                self.customerOrdersSelected = [];
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/ErpQueryOutStockInfo',
                    data: {
                        PageSize: 50,
                        PageNumber: 1,
                        SearchWhere: {
                            Status: [0],
                            UpSheet: self.sheet
                        }
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        if (result.Data.length > 0) {
                            self.customerOrders = result.Data;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }
                    }
                })
            },
            checkRepeat: function () {
                var self = this;
                var isInOutStockBatchItems = false;
                self.customerOrdersSave = [];
                self.customerOrdersSelected.forEach(function (orderSelected) {
                    self.outStockBatchItems.forEach(function (outStockBatchItem) {
                        if (orderSelected.OutStockID == outStockBatchItem.OutStockID) {
                            self.customerOrdersSelected.$remove(orderSelected);
                            isInOutStockBatchItems = true;
                        }
                    });
                    if (!isInOutStockBatchItems) {
                        orderSelected.OutStockBatchID = self.outStockBatchID;
                        self.customerOrdersSave.push({
                            OutStockBatchID: self.outStockBatchID,
                            OutStockID: orderSelected.OutStockID
                        });
                    }
                });
                return self.customerOrdersSave;
            },
            saveOutStockBatchItem: function () {
                var self = this;
                var customerOrdersSave = self.checkRepeat();
                if (customerOrdersSave.length > 0) {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusOutStockBatch/ErpSaveOutStockBatchItem',
                        contentType: 'application/json',
                        data: JSON.stringify(customerOrdersSave)
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('refreshOutStockBatch');
                            self.$dispatch('transmit','tip',{
                                name: '成功',
                                contentText: '成功'
                            });
                            self.close();
                        }
                    })
                } else {
                    self.close();
                }

            },
            search: function () {
                this.getCustomerOrder();
            }
        },
        events: {
            'modal-join-orders': function (data) {
                this.showModal();
                this.outStockBatchItems = data.outStockBatchItems;
                this.outStockBatchID = data.outStockBatchID;
                this.customerOrders =  [];   //根据订单编号搜索出来的订单
                this.customerOrdersSelected = [];  //选中的订单
                this.customerOrdersSave = []; //保存的订单
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
