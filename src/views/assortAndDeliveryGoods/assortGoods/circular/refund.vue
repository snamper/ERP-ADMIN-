<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a @click="updateMerchantDelivery('')" href="javascript:void(0)" class="btn btn-default">修改快递</a>
                <a @click="createPick" href="javascript:void(0)" class="btn btn-default">生成拣货单</a>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <!--<th>状态</th>-->
                    <th>出库单号</th>
                    <th>采购退货单</th>
                    <th>供应商</th>
                    <!--<th>仓库</th>-->
                    <!--<th>快递公司</th>-->
                    <th>收货人</th>
                    <th>收货地址</th>
                    <th>支付方式</th>
                    <!--<th>订单金额</th>-->
                    <th>交易备注</th>
                </tr>
                </thead>
                <tbody v-for="customerOrder in customerOrders" class="panel panel-default">
                <tr class="sheet-list-item">
                    <td class="sheet-item-state"><input type="checkbox" v-model="customerOrder.checked"></td>
                    <!--<td><span>{{customerOrder.StatusDesc}}</span></td>-->
                    <td @click="getOrderItems(customerOrder)" class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"
                        data-target="#{{customerOrder.OutStockID}}"><span class="iconfont"></span><span>{{customerOrder.Sheet}}</span>
                    </td>
                    <td>{{customerOrder.UpSheet}}</td>
                    <td>{{customerOrder.InOrgin.Name}}</td>
                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Shop.Name}}">{{customerOrder.Shop.Name | truncationString}}</span></td>-->
                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Shop.NetShop.Channel.Name}}">{{customerOrder.Shop.NetShop.Channel.Name}}</span></td>-->
                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Stock.Name }}">{{customerOrder.Stock.Name | truncationString}}</span></td>-->
                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderFlag.MerchantDelivery.Name}}">{{customerOrder.OrderFlag.MerchantDelivery.Name | truncationString}}</span></td>-->
                    <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.LinkMan}}">{{customerOrder.LinkMan | truncationString}}</span></td>
                    <td>
                        <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Country ? customerOrder.Country + ',' : ''}}{{customerOrder.State ? customerOrder.State + ',' : ''}}{{customerOrder.City ? customerOrder.City + ',' : ''}}{{customerOrder.District ? customerOrder.District + ',' : ''}}{{customerOrder.Address}}">{{customerOrder.Country ? customerOrder.Country + ',' : ''}}{{customerOrder.State ? customerOrder.State + ',' : ''}}{{customerOrder.City ? customerOrder.City + ',' : ''}}{{customerOrder.District ? customerOrder.District + ',' : ''}}{{customerOrder.Address | truncationString }}
                        </span>
                    </td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.PayModeDesc}}">{{customerOrder.PayModeDesc | truncationString}}</span></td>
                    <!--<td><span>{{customerOrder.TotalAmount}}</span></td>-->

                    <td>
                        <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderBusiness.TradeMemo}}">
                        {{customerOrder.OrderBusiness.TradeMemo | truncationString}}
                        </span>
                    </td>
                </tr>
                <tr class="sheet-list-detail">
                    <td colspan="8">
                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{customerOrder.OutStockID}}">
                            <div class="sheet-detail-wrap">
                                <table class="table table-condensed">
                                    <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>商品</th>
                                        <th>商品名称</th>
                                        <th>尺码</th>
                                        <th>颜色</th>
                                        <th>数量</th>
                                        <th>建议售价</th>
                                        <!--<th>购买价</th>-->
                                        <th>实际售价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="OutStockItem in customerOrder.OutStockItems">
                                        <td>
                                            <span>{{OutStockItem.Barcode.CustomBC}}</span>
                                        </td>
                                        <td>{{OutStockItem.Barcode.Goods.CustomNo}}</td>
                                        <td>{{OutStockItem.Barcode.Goods.Name}}</td>
                                        <td>{{OutStockItem.Barcode.Size.Name}}</td>
                                        <td>{{OutStockItem.Barcode.Color.Name}}</td>
                                        <td>{{OutStockItem.Qty}}</td>
                                        <td><span v-if="OutStockItem.Barcode.Goods.GoodsDetail.MarketPrice">￥</span>{{OutStockItem.Barcode.Goods.GoodsDetail.MarketPrice}}</td>
                                        <!--<td>{{OutStockItem.DistributePrice}}</td>-->
                                        <td>{{OutStockItem.Price}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                <!--<tr class="sheet-list-detail">-->
                    <!--<td colspan="12">-->
                        <!--<div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"-->
                             <!--id="{{customerOrder.CustomerOrderID}}">-->
                            <!--<div class="sheet-detail-wrap">-->
                                <!--<order-detail  :order-items="customerOrder.OutStockItems"></order-detail>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</td>-->
                <!--</tr>-->
                </tbody>
            </table>
            <div v-if="customerOrders.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
            <pagination :pagination-options="paginationOptions"></pagination>
        </div>
    </div>
    <modal-create-pick></modal-create-pick>
    <modal-delivery></modal-delivery>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        props: ['customerOrders','isChangeTab','paginationOptions','baseLookUp'],
        computed: commonMethods.selectAll('this.customerOrders', function (item) {
            return item.OutStockID
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
            //生成采购单
            createPick: function () {
                this.$broadcast('modal-create-pick');
            },
            /**
             * 获取订单详情
             * @param customerOrder {object} 订单数据
             */
            getOrderItems: function (customerOrder) {
                var customerOrderID = customerOrder.OutStockID;     //订单ID
                var orderItems = customerOrder.OutStockItems;     //订单详情
                var OrderFlag = customerOrder.OutStockFlag.Flag;   //订单状态
                var isDoneItem = OrderFlag == 97 || OrderFlag == 98 || OrderFlag == 100;   //是否为已完成或已取消订单
                if (orderItems.length > 0) {
                    return;
                } else {
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
                    url: '/BusOutStock/ErpQueryOutStockItem' + method +'ByID',
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
        },
        components: {
            modalCreatePick: require('./modal-create-pick.vue'),
            modalDelivery: require('./modal-delivery.vue'),
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