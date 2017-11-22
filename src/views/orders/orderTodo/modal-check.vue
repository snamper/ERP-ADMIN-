<template>
    <div class="modal fade" :class="{'in':modalWindow.show}" v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">是否需要发票</label>
                                    <select class="form-control" v-model="formData.Invoice">
                                        <option selected value="">不限</option>
                                        <option value=0>否</option>
                                        <option value=1>是</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">快递公司</label>
                                    <select v-model="formData.MerchantDeliveryID" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{merchantDeliveryList.MerchantDeliveryID}}" v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">{{merchantDeliveryList.Name}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">客户订单类型</label>
                                    <select v-model="formData.OrderType" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{customerOrderType.Code}}" v-for="customerOrderType in baseLookUp.customerOrderTypes">{{customerOrderType.Text}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">支付方式</label>
                                    <select v-model="formData.PayMode" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{payList.Code}}" v-for="payList in baseLookUp.payLists">{{payList.Text}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">店铺</label>
                                    <select v-model="formData.ShopID" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">仓库</label>
                                    <select v-model="formData.StockID" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{stockList.StockID}}"  v-for="stockList in baseLookUp.stockLists">{{stockList.Name}}</option>
                                    </select>
                                </div>
                                <div class="form-group" class="check-sku">
                                    <label class="col-sm-3 control-label">SKU</label>
                                    <input v-model="formData.SKU" placeholder="请输入SKU" type="text" class="form-control check-sku-item">
                                    <select v-model="formData.ItemCountLogic" class="form-control check-sku-item" v-model="merchantDeliveryID">
                                        <option value="=">=</option>
                                        <option value="&gt;">&gt;</option>
                                        <option value="&lt;">&lt;</option>
                                        <option value="&gt;=">&gt;=</option>
                                        <option value="&lt;=">&lt;=</option>
                                        <option value="&lt;&gt;">&lt;&gt;</option>
                                    </select>
                                    <input v-model="formData.ItemCount" placeholder="请输入数量" type="text" class="form-control check-sku-item">
                                </div>
                                <div class="form-group">
                                    <label >付款时间</label>
                                    <div class="date-wrap">
                                        <div class='input-group date' id='pay-timepicker-start'>
                                            <input v-model="formData.PayTimeBeg | formatDate" type='text' class="form-control" />
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                        </span>
                                        </div>
                                    </div>
                                    <span class="date-link">至</span>
                                    <div class="date-wrap">
                                        <div class='input-group date' id='pay-timepicker-end'>
                                            <input v-model="formData.PayTimeEnd | formatDate" type='text' class="form-control" />
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消</button>
                        <button @click="submit" type="button" class="btn btn-primary btn-primarybd"> 审核</button>
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
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                formData: {
                    Invoice: '',
                    ItemCount: '',
                    ItemCountLogic: '',
                    MerchantDeliveryID: '',
                    OrderType: '',
                    PayMode: '',
                    PayTimeBeg: '',
                    PayTimeEnd: '',
                    SKU: '',
                    ShopID: '',
                    StockID: '',
                },
                // 下拉列表数据
                baseLookUp: {},
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
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCheckCustomerOrderByWhere',
                    data: this.formData
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '一键审核成功'
                        });
                        self.$dispatch('transmit','page-change');
                        self.close();
                    }
                })
            },
        },
        events: {
            'modal-check': function (baseLookUp) {
                this.showModal();
                this.baseLookUp = baseLookUp;
            }
        },
        ready: function () {
            //dateTimePicker
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            });
            $('#pay-timepicker-end').datetimepicker({
            });
            $("#pay-timepicker-start").on("dp.change",function (e) {
                $('#pay-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end").on("dp.change",function (e) {
                $('#pay-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .check-sku {
        display: flex;
    }
    .check-sku-item {
        flex: 1;
    }
</style>
