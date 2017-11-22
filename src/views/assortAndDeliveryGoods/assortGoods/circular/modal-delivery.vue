<template>
    <div class="modal fade"  :class="{'in':modalWindow.show}" v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">修改快递</label>
                            <select class="form-control" v-model="merchantDeliveryID">
                                <option v-for="delivery in deliveries" value="{{delivery.MerchantDeliveryID}}">{{delivery.Name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="submit" type="button" class="btn btn-primary"> 保存 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                // 父级组件 单条 数据储存
                merchantDeliveryID: '',
                customerIDGroup: [],
                deliveries: [],
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
                this.updateMerchantDelivery();
            },
            updateMerchantDelivery: function () {
                var updateMerchantDeliveryData = [];
                var self = this;
                self.customerIDGroup.forEach(function (customerID) {
                    updateMerchantDeliveryData.push({
                        CustomerOrderID: customerID,
                        MerchantDeliveryID: self.merchantDeliveryID
                    })
                });
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCustomerOrderUpdateOutStockMerchantDelivery',
                    contentType: 'application/json',
                    data: JSON.stringify(updateMerchantDeliveryData)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '成功',
                            contentText: '成功更新快递'
                        });
                        self.$dispatch('transmit','page-change');
                        self.close();
                    }
                })
            }
        },
        events: {
            /**
             * 自定义事件 修改条码
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'modal-delivery': function (data) {
                this.showModal();
                this.customerIDGroup = data.customerIDGroup;
                this.deliveries = data.merchantDeliveryLists;
            }
        }
    }
</script>
