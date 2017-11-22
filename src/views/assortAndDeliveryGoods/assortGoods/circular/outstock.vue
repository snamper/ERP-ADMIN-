<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a @click="pauseCustomerOrder" href="javascript:void(0)" class="btn btn-default">暂停</a>
                <a @click="setOutOfStockCustomerOrder" href="javascript:void(0)" class="btn btn-default">置为缺货</a>
                <a @click="cancelCustomerOrder" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                <a @click="updateMerchantDelivery('')" href="javascript:void(0)" class="btn btn-default">修改快递</a>
                <a @click="createPick('')" href="javascript:void(0)" class="btn btn-default">生成拣货单</a>
                <a @click="createPick('isPostconditions')" href="javascript:void(0)" class="btn btn-default">后置打印分批</a>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <th>状态</th>
                    <th>订单号</th>
                    <th>店铺</th>
                    <th>平台</th>
                    <th>仓库</th>
                    <th>快递公司</th>
                    <th>收货人</th>
                    <th>收货地址</th>
                    <th>支付方式</th>
                    <th>实收款</th>
                    <th>交易备注</th>
                </tr>
                </thead>
                <tbody v-for="customerOrder in customerOrders" class="panel panel-default">
                    <tr class="sheet-list-item">
                        <td class="sheet-item-state"><input type="checkbox" v-model="customerOrder.checked"></td>
                        <td><span>{{customerOrder.StatusDesc}}</span></td>
                        <td @click="getOrderItems(customerOrder)" class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"
                            data-target="#{{customerOrder.CustomerOrderID}}"><span class="iconfont"></span><span>{{customerOrder.Sheet}}</span>
                        </td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Shop.Name}}">{{customerOrder.Shop.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Shop.NetShop.Channel.Name}}">{{customerOrder.Shop.NetShop.Channel.Name}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Stock.Name }}">{{customerOrder.Stock.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderFlag.MerchantDelivery.Name}}">{{customerOrder.OrderFlag.MerchantDelivery.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.LinkMan}}">{{customerOrder.LinkMan | truncationString}}</span></td>
                        <td>
                            <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Country? customerOrder.Country +',':''}}{{customerOrder.State ? customerOrder.State + ',' : ''}}{{customerOrder.City ? customerOrder.City + ',' : ''}}{{customerOrder.District ? customerOrder.District + ',' : ''}}{{customerOrder.Address}}">{{customerOrder.Country? customerOrder.Country +',':''}}{{customerOrder.State ? customerOrder.State + ',' : ''}}{{customerOrder.City ? customerOrder.City + ',' : ''}}{{customerOrder.District ? customerOrder.District + ',' : ''}}{{customerOrder.Address | truncationString }}
                            </span>
                        </td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.PayModeDesc}}">{{customerOrder.PayModeDesc | truncationString}}</span></td>
                        <td><span>{{customerOrder.TotalAmount}}</span></td>

                        <td>
                            <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderBusiness.TradeMemo}}">
                            {{customerOrder.OrderBusiness.TradeMemo | truncationString}}
                            </span>
                        </td>
                    </tr>
                    <tr class="sheet-list-detail">
                        <td colspan="12">
                            <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                 id="{{customerOrder.CustomerOrderID}}">
                                <div class="sheet-detail-wrap">
                                    <order-detail  :order-items="customerOrder.OrderItems"></order-detail>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="customerOrders.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
            <pagination :pagination-options="paginationOptions"></pagination>
        </div>
    </div>
    <modal-delivery></modal-delivery>
    <modal-create-pick></modal-create-pick>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        props: ['customerOrders','isChangeTab','paginationOptions','baseLookUp'],
        computed: commonMethods.selectAll('this.customerOrders', function (item) {
            return item.CustomerOrderID
        }),
        methods: {
            //获取选中的订单
            getCustomerIDGroup: function (customerID) {
                var customerIDGroup = [];
                if (customerID) {
                    customerIDGroup.push(customerID);
                } else {
                    customerIDGroup = this.checkedGroups;
                }
                if (customerIDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '至少要选中一个订单'
                    });
                    return [];
                } else {
                    return customerIDGroup;
                }
            },
            //修改快递
            updateMerchantDelivery: function (customerID) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                if (customerIDGroup.length > 0) {
                    var modalMerchantDeliveryData = {
                        merchantDeliveryLists: self.baseLookUp.merchantDeliveryLists,
                        customerIDGroup: customerIDGroup
                    };
                    self.$broadcast('modal-delivery', modalMerchantDeliveryData);
                }
            },
            //生成采购单
            createPick: function (isPostconditions) {
                this.$broadcast('modal-create-pick',isPostconditions);
            },
            /**
             * 获取订单详情
             * @param customerOrder {object} 订单数据
             */
            getOrderItems: function (customerOrder) {
                var customerOrderID = customerOrder.CustomerOrderID;     //订单ID
                var orderItems = customerOrder.OrderItems;     //订单详情
                var OrderFlag = customerOrder.OrderFlag.Flag;   //订单状态
                var isDoneItem = OrderFlag == 0 || OrderFlag == 11;   //是否为已完成或已取消订单
                if (orderItems.length > 0) {
                    return;
                } else {
                    NProgress.start();
                    if (isDoneItem) {       //如果是已完成或已取消订单,则用此接口获取订单详情数据
                        this.getOrderItemsAjax('Done',orderItems,customerOrderID);
                    } else {
                        this.getOrderItemsAjax('Temp',orderItems,customerOrderID);
                    }

                }
            },
            getOrderItemsAjax: function (method,orderItems,customerOrderID) {
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpQueryCustomerOrderItem' + method +'ByID',
                    data: {
                        ID: customerOrderID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        result.Data.forEach(function (item) {
                            orderItems.push(item);
                        });
                    }
                })
            },
            //取消客户订单
            cancelCustomerOrder: function () {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup();
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '无效操作无法恢复,订单设为无效后,将无法再对该订单进行任何操作,需要重新下载订单,你确定要继续吗?',
                        btnName: '设为无效',
                        events: {
                            confirm: 'confirm-cancel'
                        }
                    });
                    self.$off('confirm-cancel');


                    self.$once('confirm-cancel', function () {
                        self.cancelCustomerOrderAjax(customerIDGroup)
                    });
                }
            },
            cancelCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCancelCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '成功',
                            contentText: '取消客户订单成功'
                        });
                        self.$dispatch('transmit','page-change');
                    }
                })
            },
            //暂停客户订单
            pauseCustomerOrder: function () {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup();

                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '您确定要暂停该订单吗?暂停后该订单将无法继续流转,直至你对它重新启动',
                        btnName: '暂停',
                        events: {
                            confirm: 'confirm-pause'
                        }
                    });

                    self.$off('confirm-pause');

                    self.$once('confirm-pause', function () {
                        self.pauseCustomerOrderAjax(customerIDGroup);

                    });
                }
            },
            pauseCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpPauseCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '成功',
                            contentText: '暂停客户订单成功'
                        });
                        self.$dispatch('transmit','page-change');
                    }
                })
            },
            //置为缺货
            setOutOfStockCustomerOrder: function () {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup();

                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '您确定要将该订单置为缺货吗?',
                        btnName: '置为缺货',
                        events: {
                            confirm: 'setOutOfStockCustomerOrder'
                        }
                    });
                    self.$off('setOutOfStockCustomerOrder');

                    self.$once('setOutOfStockCustomerOrder', function () {
                        self.setOutOfStockCustomerOrderAjax(customerIDGroup);
                    });
                }
            },
            setOutOfStockCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpSetOutOfStockCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '成功',
                            contentText: '置为缺货成功'
                        });
                        self.$dispatch('transmit','page-change');
                    }
                })
            }
        },
        components: {
            modalDelivery: require('./modal-delivery.vue'),
            modalCreatePick: require('./modal-create-pick.vue'),
            orderDetail: require('./../order-detail.vue'),
            pagination: require('../../../../components/pagination.vue')
        },
        route: {
            data: function (transition) {
                this.isChangeTab = true;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>