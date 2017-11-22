<template>
    <div class="sheet-list ">
        <div class="row">
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <!--非问题单-->
                    <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                        <tr>
                            <!--<th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>-->
                            <th>状态</th>
                            <!--<th>操作</th>-->
                            <th>订单号</th>
                            <th>店铺</th>
                            <th>平台</th>
                            <th>购买者</th>
                            <th>外部交易号</th>
                            <th>收货人</th>
                            <th>联系电话</th>
                            <th>收货地址</th>
                            <th>支付方式</th>
                            <th>实收款</th>
                            <th>发货仓库</th>
                            <th>快递公司</th>
                            <th>运单号</th>
                            <th>发票抬头</th>
                            <th>买家留言</th>
                            <th>买家备注</th>
                            <th>卖家备注</th>
                            <th>交易备注</th>
                        </tr>
                        </thead>
                        <tbody v-for="opt in oderList" class="panel panel-default">
                        <tr class="sheet-list-item">
                            <td><span>{{opt.FlagName}}</span></td>
                            <td class="show-detail-ctrl collapsed"
                                @click="getOrderItems(opt)"
                                data-toggle="collapse" data-parent="#sheet-list"
                                data-target="#{{opt.CustomerOrderID}}">
                                <span class="iconfont icon-alter"></span><span>{{opt.Sheet}}</span>

                            </td>
                            <td class="sheet-item-remark">
                                <span class="toolTip-ctrl" data-toggle="tooltip" data-placement="top" title="{{opt.ShopName}}">{{opt.ShopName | truncationString}}</span>
                            </td>
                            <td>{{opt.ChannelName}}</td>
                            <td>{{opt.BuyerNick}}</td>
                            <td>{{opt.OutSheetID}}</td>
                            <td>{{opt.LinkMan}}</td>
                            <td>{{opt.Mobile}}</td>
                            <td><span class="toolTip-ctrl" data-toggle="tooltip" data-placement="top" title="{{opt.Address}}">{{opt.Address | truncationString}}</span></td>
                            <td>{{opt.PayName}}</td>
                            <td>{{opt.TotalAmount}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.StockName}}">{{opt.StockName | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.MerchantDeliveryName}}">{{opt.MerchantDeliveryName | truncationString}}</span></td>
                            <td>{{opt.DeliverySheetID}}</td>
                            <td>{{opt.InvoiceTitle}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.BuyerMessage}}">{{opt.BuyerMessage | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.BuyerMemo}}">{{opt.BuyerMemo | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.SellerMemo}}">{{opt.SellerMemo | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{opt.TradeMemo}}">{{opt.TradeMemo | truncationString}}</span></td>
                        </tr>
                        <tr class="sheet-list-detail">
                            <td colspan="16">
                                <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                     id="{{opt.CustomerOrderID}}">
                                    <div class="sheet-detail-wrap">
                                        <table class="table">
                                            <thead class="sheet-list-header">
                                            <tr>
                                                <th>商品</th>
                                                <th>SKU</th>
                                                <th>商品名称</th>
                                                <th>尺码</th>
                                                <th>颜色</th>
                                                <th>建议售价</th>
                                                <th>数量</th>
                                                <th>渠道售价</th>
                                                <th>实际售价</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="merchant in orderItems">
                                                <td>
                                                    <span>{{merchant.Barcode.Goods.CustomNo}}</span>
                                                </td>
                                                <td>
                                                    <span>{{merchant.Barcode.CustomBC}}</span>
                                                </td>
                                                <td>{{merchant.Barcode.Goods.Name}}</td>
                                                <td>{{merchant.Barcode.Size.Name}}</td>
                                                <td>{{merchant.Barcode.Color.Name}}</td>
                                                <td><span>￥</span>{{merchant.Barcode.Goods.GoodsDetail.MarketPrice ? merchant.Barcode.Goods.GoodsDetail.MarketPrice : ''}}</td>
                                                <td>
                                                    <span>{{merchant.Qty}}</span>
                                                </td>
                                                <td>
                                                    <span>￥{{merchant.OrderItemDetail.SalePrice}}</span>
                                                </td>
                                                <td>
                                                    <span>￥{{merchant.Price}}</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
         </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                query: {
                    MemberID: '',
                    Flag: '',
                    Sheet: '',
                    ShopName: '',
                    BuyerNick: '',
                    OutSheetID: '',
                    LinkMan: '',
                    ChannelName: '',
                    Mobile: '',
                    Address: '',
                    PayMode: '',
                    TotalAmount: '',
                    StockName: '',
                    MerchantDeliveryName: '',
                    DeliverySheetID: '',
                    InvoiceTitle: '',
                    BuyerMessage: '',
                    BuyerMemo: '',
                    SellerMemo: '',
                    TradeMemo: ''
                },
                oderList: [],
               orderItems: []
            }
        },
        methods:{
            viewOrder: function (MemberID) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMember/ErpMemberOrderList',
                    data: {
                        MemberID: MemberID,
                    }
                }).done(function (result) {
                    self.oderList = result.Data;
                })
                NProgress.done();
            },
            /**
             *  获取对应ID订单的明细,并将其存入对应的对象中
             * @param customerOrderID  {string} 订单ID
             * @param orderItems   {Array} 存储改订单的明细
             */
            getOrderItems: function (opt) {
                var self = this;
                var customerOrderID = opt.CustomerOrderID;
                var orderItems =self.orderItems= opt.OrderItems;
                var OrderFlag = opt.Flag;
                var isDoneItem = OrderFlag == 97 || OrderFlag == 100;
//                console.log(opt);
                if (orderItems.length > 0) {
                    return;
                } else {
                    NProgress.start();
                    if (isDoneItem) {
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpQueryCustomerOrderItemDoneByID',
                            data: {
                                ID: customerOrderID
                            }
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                NProgress.done();
                                result.Data.forEach(function (item) {
                                    orderItems.push(item);
                                });
                            }
                        })
                    } else {
                        servers.postAjax({
                            url: '/BusCustomerOrder/ErpQueryCustomerOrderItemTempByID',
                            data: {
                                ID: customerOrderID
                            }
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                NProgress.done();
                                result.Data.forEach(function (item) {
                                    orderItems.push(item);
                                });
                            }
                        })
                    }

                }
            },
        },
        route: {
            data: function (transition) {
                var self = this;
                console.log(transition);
                var query = transition;
                var MemberID = transition.to.query.MemberID;   //获取价格ID
                console.log(MemberID);
                if (MemberID) {
                    this.viewOrder(MemberID);
                }
            }
        },

        ready: function () {
//            this.viewOrder();
            }
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>