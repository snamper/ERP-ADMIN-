<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a @click="printPack(true)" href="javascript:void(0)" class="btn btn-default">全部打印</a>
                <a @click="printPack('')" href="javascript:void(0)" class="btn btn-default">打印订单</a>
                <!--<a href="javascript:void(0)" class="btn btn-default">打印商品清单</a>-->
                <a @click="printDelivery" href="javascript:void(0)" class="btn btn-default">打印快递单</a>
                <!--<a href="javascript:void(0)" class="btn btn-default">云热敏打印</a>-->
                <a @click="updateDeliverySheetID" href="javascript:void(0)" class="btn btn-default">修改运单号</a>
                <a @click="updateAddress('')" href="javascript:void(0)" class="btn btn-default">修改地址</a>
                <a @click="joinOrders" href="javascript:void(0)" class="btn btn-default">加入订单</a>
                <a @click="setOutOfStockCustomerOrder" href="javascript:void(0)" class="btn btn-default">置为缺货</a>
                <a @click="pauseCustomerOrder" href="javascript:void(0)" class="btn btn-default">暂停</a>
                <a @click="deleteOutStockBatchItem" href="javascript:void(0)" class="btn btn-default">移除订单</a>
                <a @click="cancelCustomerOrder" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                <label for="autoPrint">
                    <input id="autoPrint" v-model="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                </label>
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
                        <th>订单号</th>
                        <!--<th>出库单号</th>-->
                        <th>订单状态</th>
                        <th>店铺</th>
                        <!--<th>平台</th>-->
                        <!--<th>快递公司</th>-->
                        <th>运单号</th>
                        <th>收货人</th>
                        <th>收货手机</th>
                        <th>收货地址</th>
                        <!--<th>支付方式</th>-->
                        <!--<th>交易备注</th>-->
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for="outStockBatchItem in outStockBatchItems" class="panel panel-default">
                    <tr class="sheet-list-item">
                        <td><input type="checkbox" v-model="outStockBatchItem.checked"></td>
                        <!--<td>{{outStockBatchItem.OutStock.OutStockFlag.FlagDesc}}</td>-->
                        <td @click="getOutStockBatchDetail(outStockBatchItem)" class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"
                            data-target="#{{outStockBatchItem.OutStockBatchItemID}}"><span class="iconfont"></span><span>{{outStockBatchItem.OutStock.UpSheet}}</span></td>
                        <!--<td>{{outStockBatchItem.OutStock.Sheet}}</td>-->
                        <td>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 0 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    已录入
                                </span>
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 10 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    待拣货
                                </span>                                                       
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 90 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    待扫描
                                </span>                              
                            
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 92 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    待称重
                                </span>
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 97 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    已取消
                                </span>                                
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 98 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    已过期
                                </span>    
                            </span>
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 99 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    已取消
                                </span>    
                            </span>                            
                            <span v-if="outStockBatchItem.OutStock.OutStockFlag.Flag == 100 ">
                                <span v-if="outStockBatchItem.OutStock.HoldFlag == 1">
                                    已暂停
                                </span>
                                <span v-else>
                                    已完成
                                </span>    
                            </span>
                        </td>
                        <td class="sheet-item-remark" ><span class="toolTip-ctrl" data-toggle="tooltip" data-placement="top" title="3603180003245">{{outStockBatchItem.OutStock.InOrgin.Name}}</span></td>

                        <!--<td><span  data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.OutStock.InOrgin.ChannelName}}">{{outStockBatchItem.OutStock.InOrgin.ChannelName  | truncationString }} </span></td>-->
                        <!--<td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.OutStock.MerchantDelivery.Name}}">{{outStockBatchItem.OutStock.MerchantDelivery.Name  | truncationString}}</span></td>-->
                        <td><span>{{outStockBatchItem.OutStock.OutStockFlag.DeliverySheetID}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.OutStock.LinkMan}}">{{outStockBatchItem.OutStock.LinkMan  | truncationString }}</span></td>
                        <td><span>{{outStockBatchItem.OutStock.Mobile || outStockBatchItem.OutStock.Phone}}</span></td>
                        <td>
                            <span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.OutStock.Country ? outStockBatchItem.OutStock.Country + ',' : ''}}{{outStockBatchItem.OutStock.State ? outStockBatchItem.OutStock.State + ',' : ''}}{{outStockBatchItem.OutStock.City ? outStockBatchItem.OutStock.City + ',' : ''}}{{outStockBatchItem.OutStock.District ? outStockBatchItem.OutStock.District + ',' : ''}}{{outStockBatchItem.OutStock.Address }}">
                                {{outStockBatchItem.OutStock.Country ? outStockBatchItem.OutStock.Country + ',' : ''}}
                                {{outStockBatchItem.OutStock.State ? outStockBatchItem.OutStock.State + ',' : ''}}{{outStockBatchItem.OutStock.City ? outStockBatchItem.OutStock.City + ',' : ''}}{{outStockBatchItem.OutStock.District ? outStockBatchItem.OutStock.District + ',' : ''}}{{outStockBatchItem.OutStock.Address | truncationString}}

                            </span>
                        </td>
                        <!--<td><span>{{outStockBatchItem.OutStock.PayModeDesc}}</span></td>-->
                        <!--<td>-->
                            <!--<span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.OutStock.OutStockDetail.TradeMemo}}">-->
                        <!--{{outStockBatchItem.OutStock.OutStockDetail.TradeMemo | truncationString}}-->
                        <!--</span>-->
                        <!--</td>-->
                        <td>
                            <a href="javascript:void(0)" class="sheet-list-delete"
                               @click="updateAddress(outStockBatchItem)" data-toggle="tooltip" data-placement="top" title="修改地址"><span
                                    class="iconfont icon-alter"></span></a>
                        </td>
                    </tr>
                    <tr class="sheet-list-detail">
                        <td colspan="14">
                            <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{outStockBatchItem.OutStockBatchItemID}}">
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
                                            <tr v-for="OutStockItem in outStockBatchItem.OutStock.OutStockItems">
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
                </tbody>
            </table>
        </div>
    </div>
    <modal-join-orders></modal-join-orders>
    <modal-delivery-sheet></modal-delivery-sheet>
    <modal-address></modal-address>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var commonMethods = require('../../../js/common');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                autoPrint: false
            }
        },
        props: ['outStockBatchItems','code','sheet','merchantDeliveryId','shopId','payMode'],
        methods: {
            /**
             * 获取拣货单订单详情数据
             * @param outStockBatchItem {object} 拣货单对象
             * @param method  {string} 请求的方法
             */
            getOutStockBatchDetailMethod: function (outStockBatchItem,method) {
                var OutStockItems = outStockBatchItem.OutStock.OutStockItems;
                if (OutStockItems && OutStockItems.length > 0) {
                    return ;
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/' + method,
                    data: {
                        ID: outStockBatchItem.OutStockID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        outStockBatchItem.OutStock.OutStockItems = result.Data;
                    }
                })
            },
            //获取拣货单订单详情数据
            getOutStockBatchDetail: function (outStockBatchItem) {
//                console.log(outStockBatchItem.OutStock.OutStockFlag.Flag);
                if ([97,98,100].indexOf(outStockBatchItem.OutStock.OutStockFlag.Flag) > -1) { //已完成或已取消状态的获取方法
                    this.getOutStockBatchDetailMethod(outStockBatchItem,'ErpQueryOutStockItemDoneByID');
                } else {   //未完成状态查询
                    this.getOutStockBatchDetailMethod(outStockBatchItem,'ErpQueryOutStockItemTempByID');
                }
            },
            getCustomerIDGroup: function (customerOrder) {
                var customerIDGroup = [];
                var outStockBatchItemIDGroup = [];
                var outStockIDGroup = [];
                var isDealOrders = false;  //是否为完成单
                var isCanDelete = true;  //是否可以删除
                var isCanPauseAndChangeDeliverySheetID = true; //是否可以暂停和更改运单号
                var checkedGroups = [];
                if (customerOrder) {
                    checkedGroups.push(customerOrder);
                } else {
                    checkedGroups = this.checkedGroups;
                }
                checkedGroups.forEach(function (checkedGroup) {
                    var flag = checkedGroup.OutStock.OutStockFlag.Flag;
                    var transferType = checkedGroup.OutStock.TransferType;
                    if (transferType != 21) {
                        isCanPauseAndChangeDeliverySheetID = false;
                    }
                    if ([100].indexOf(flag) > -1) {
                        isDealOrders = true;
                        isCanDelete = false;
                    } else if ([97,98].indexOf(flag) > -1) {
                        isDealOrders = true;
                    }
                    outStockBatchItemIDGroup.push(checkedGroup.OutStockBatchItemID);
                    customerIDGroup.push(checkedGroup.OutStock.UpSheetID);
                    outStockIDGroup.push(checkedGroup.OutStock.OutStockID);
                });
                if (customerIDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return {
                        customerIDGroup:customerIDGroup,
                        outStockBatchItemIDGroup: outStockBatchItemIDGroup,
                        isDealOrders: isDealOrders,
                        isCanDelete: isCanDelete,
                        isCanPauseAndChangeDeliverySheetID: isCanPauseAndChangeDeliverySheetID,
                        outStockIDGroup: outStockIDGroup
                    };
                }
            },
            //暂停客户订单
            pauseCustomerOrder: function () {
                var self = this;
                var getCustomerIDGroup = this.getCustomerIDGroup();
                var customerIDGroup = getCustomerIDGroup.customerIDGroup;


                if (getCustomerIDGroup.isDealOrders) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (!getCustomerIDGroup.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，暂时无法暂停，请重新选择。'
                    });
                } else {
                    postPause();
                }

                function postPause() {
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
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusCustomerOrder/ErpPauseCustomerOrder',
                                contentType: 'application/json',
                                data: JSON.stringify(customerIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示',
                                        contentText: '暂停客户订单成功'
                                    });
                                    self.$dispatch('refreshOutStockBatch');
                                }
                            })
                        });
                    }
                }
            },
            //删除客户订单
            deleteOutStockBatchItem: function () {
                var self = this;
                var getCustomerIDGroup = this.getCustomerIDGroup();
                var outStockBatchItemIDGroup = getCustomerIDGroup.outStockBatchItemIDGroup;
                if (getCustomerIDGroup.isCanDelete) {
                    if (outStockBatchItemIDGroup.length > 0) {

                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定从当前拣货批次里移除该订单吗？',
                            btnName: '确定',
                            events: {
                                confirm: 'confirm-delete'
                            }
                        });

                        self.$off('confirm-delete');

                        self.$once('confirm-delete', function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusOutStockBatch/ErpDeleteOutStockBatchItem',
                                contentType: 'application/json',
                                data: JSON.stringify(outStockBatchItemIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '删除成功'
                                    });
                                    self.$dispatch('refreshOutStockBatch');
                                }
                            })
                        });
                    }
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成的订单,请重新选择'
                    });
                }

                },
            //置为缺货
            setOutOfStockCustomerOrder: function () {
                var self = this;
                var getCustomerIDGroup = this.getCustomerIDGroup();
                var customerIDGroup = getCustomerIDGroup.customerIDGroup;


                if (getCustomerIDGroup.isDealOrders) {

                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (getCustomerIDGroup.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，无法置为缺货，请重新选择。'
                    });
                } else {
                    setOutOfStock();
                }

                function setOutOfStock() {
                    if (customerIDGroup.length > 0) {

                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定要置为缺货吗?',
                            btnName: '设为缺货',
                            events: {
                                confirm: 'confirm-setOutOfStock'
                            }
                        });

                        self.$off('confirm-setOutOfStock');

                        self.$once('confirm-setOutOfStock', function () {
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
                                    self.$dispatch('refreshOutStockBatch');
                                }
                            })
                        });
                    }
                }
            },
            //取消订单
            cancelCustomerOrder: function () {

                var self = this;
                var getCustomerIDGroup = this.getCustomerIDGroup();
                var customerIDGroup = getCustomerIDGroup.customerIDGroup;
                var outStockIDGroup = getCustomerIDGroup.outStockIDGroup;

                if (getCustomerIDGroup.isDealOrders) {

                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (getCustomerIDGroup.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，无法取消，请重新选择。'
                    });
                } else {
                    postCancel();
                }

                function postCancel() {
                    if (customerIDGroup.length > 0) {

                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定要取消订单吗?',
                            btnName: '取消订单',
                            events: {
                                confirm: 'confirm-cancel'
                            }
                        });

                        self.$off('confirm-cancel');

                        self.$once('confirm-cancel', function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/DeliverGoods/ErpStockOrderSave_Cancel',
                                contentType: 'application/json',
                                data: JSON.stringify(outStockIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '取消订单成功'
                                    });
                                    self.$dispatch('refreshOutStockBatch');
                                }
                            })
                        });
                    }
                }
            },
            //加入订单
            joinOrders: function () {
                var joinMessage =  {
                    outStockBatchItems: this.outStockBatchItems,
                    outStockBatchID: this.OutStockBatchID
                };
                this.$broadcast('modal-join-orders',joinMessage);

            },
            //修改运单号
            updateDeliverySheetID: function () {
                //如果没有快递单号,则不能修改运单号
                if (!this.merchantDeliveryId) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该拣货单没有配置快递公司,不可修改运单号'
                    });
                    return;
                }
                if (this.checkedGroups.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                } else {
                    var getCustomerIDGroup = this.getCustomerIDGroup();
                    if (getCustomerIDGroup.isDealOrders) {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                        });
                    } else {
                        this.$dispatch('transmit','modal-delivery-sheet',this.checkedGroups);
                    }
                }
            },
            //获取快递单Sheet列表
//            getDeliverySheetGroup: function () {
//                var IDGroup = [];
//                var ItemGroup = this.checkedGroups;
////                var ShopID = ItemGroup[0].Shop.ShopID;
//                var PayMode = ItemGroup[0].OutStock.PayMode;
//                var MerchantDeliveryID = ItemGroup[0].OutStock.MerchantDelivery.MerchantDeliveryID;
////                var isTheSameShop = true;
//                var isTheSameMerchantDeliveryAndPayMode = true;
//                ItemGroup.forEach(function (item) {
////                    if (ShopID !== item.Shop.ShopID) {
////                        isTheSameShop = false;
////                    }
//                    if (PayMode !== item.PayMode ||  MerchantDeliveryID !== item.MerchantDeliveryID) {
//                        isTheSameMerchantDeliveryAndPayMode = false;
//                    }
//                    IDGroup.push(item.OutStock.UpSheet);
//                });
//                if (IDGroup.length === 0) {
//                    this.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请至少选中一个订单'
//                    });
//                    return {};
//                } else {
//                    if (isTheSameMerchantDeliveryAndPayMode) {
//                        return {
//                            ShopID: '',
//                            IDGroup: IDGroup,
//                            PayMode: PayMode,
//                            MerchantDeliveryID: MerchantDeliveryID
//                        }
//                    } else {
//                        this.$dispatch('transmit','tip',{
//                            name: '提示',
//                            contentText: '请选择相同快递公司和支付方式的订单'
//                        });
//                        return {};
//                    }
//                }
//            },
            //获取拣货单 装箱单列表
            getPickOrPackUpSheetID: function () {
                var SheetGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemGroup.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    ItemGroup.forEach(function (item) {
                        SheetGroup.push(item.OutStock.UpSheet);
                    })
                }
                return SheetGroup;

            },
            print: function (type,localStorageName,printUrl,isPrintAll) {
                var sheetList = [];
                if(this.checkedGroups.length>0) {
                    let list = this.checkedGroups;
                    for(var i=0;i<this.checkedGroups.length;i++){
                        sheetList.push(list[i].OutStock.UpSheet);
                    }
                }else {
                     this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请选择订单!'
                        });
                        return false;
                    // sheetList.push(this.sheet);
                }
                
                var ShopID = this.shopId || '';
                var PayMode = this.payMode;
                var MerchantDeliveryID = this.merchantDeliveryId || '';
                if (type == 3) {   //如果为快递单,则判断是否为同一个店铺或同样的支付方式和快递公司
                    PayMode = typeof(PayMode) == 'number' ? PayMode : '';
                    if (MerchantDeliveryID) {
                        if (sheetList.length > 0) {
                            var sheetListStr = JSON.stringify(sheetList);
                            //printDeliveryList
                            localStorage[localStorageName] = sheetListStr;
                            window.open(printUrl + '?BusinessType=' + type + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint);
                        }
                    } else {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '选中的订单中没有选择快递公司!'
                        });
                    }
                } else {
                    if (type == 2) {
                        var upSheetList = [];
                        if (!isPrintAll) {
                            upSheetList = this.getPickOrPackUpSheetID();
                            if (upSheetList.length == 0) {
                                return ;
                            }
                        }
                        localStorage.upSheetList = JSON.stringify(upSheetList);
                    }
                    if (sheetList.length > 0) {
                        var sheetListStr = JSON.stringify(sheetList);
                        localStorage[localStorageName] = sheetListStr;
                        window.open(printUrl + '?BusinessType=' + type + '&autoPrint=' + this.autoPrint);
                    }
                }
            },
            //打印装箱单
            printPack: function (isPrintAll) {
                this.print(2,'printPackSheetList','#!/print-pack',isPrintAll);
            },
            //打印拣货单
            printPick: function () {
                this.print(1,'printPickSheetList','#!/print-pick');
            },
            //打印快递单
            printDelivery: function () {
                this.print(3,'printDeliveryList','#!/print-delivery');
            },
            //修改收货信息
            updateAddress: function (customerOrder) {
                var ItemGroup = this.getCustomerIDGroup(customerOrder);
                if (ItemGroup.isDealOrders) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else {
                    if (ItemGroup.outStockIDGroup.length > 0) {
                        this.$broadcast('modal-address', ItemGroup.outStockIDGroup, customerOrder ? customerOrder.OutStock : '');
                    }
                }
            },
        },
        route: {
            data: function (transition) {
                this.$dispatch('getoutStockBatch');
                this.OutStockBatchID = transition.to.params.outStockBatchID;
            }
        },
        computed: commonMethods.selectAll('this.outStockBatchItems', function (item) {
            return item;
        }),
        ready: function () {
           
            //显示详情页
            $(document).on('show.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });
        },
        components: {
            modalJoinOrders: require('./modal-join-orders.vue'),
            modalDeliverySheet: require('./modal-delivery-sheet.vue'),
            modalAddress: require('./modal-address.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>