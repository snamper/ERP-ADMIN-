<template>
    <assort-head :pagination-options.sync="paginationOptions" :deliver-goods.sync="deliverGoods" :base-look-up="baseLookUp">
        <div class="sheet-list" slot="tableList">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <!--<a href="javascript:void(0)" class="btn btn-default">打印订单</a>-->
                            <a @click="printDelivery" href="javascript:void(0)" class="btn btn-default">打印快递单</a>
                            <a @click="stockOrderSaveWeigh('')" href="javascript:void(0)" class="btn btn-default">不扫描发货</a>
                            <a @click="pauseCustomerOrder('')" href="javascript:void(0)" class="btn btn-default">暂停发货</a>
                            <a @click="stockOrderSaveCancel('')" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                            <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                            <label for="autoPrint">
                                <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
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
                                    <th>出库单号</th>
                                    <th>业务类型</th>
                                    <th>上游单号</th>
                                    <th>外部机构</th>
                                    <th>拣货单号</th>
                                    <th>快递公司</th>
                                    <th>运单号</th>
                                    <th>收货人</th>
                                    <th>收货地址</th>
                                    <th>交易备注</th>
                                </tr>
                            </thead>
                            <tbody v-for="good in deliverGoods" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state"><input type="checkbox" v-model="good.checked"></td>
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{good.OutStockID}}"><span class="iconfont"></span><span>{{good.Sheet}}</span></td>
                                    <td>{{good.TransferType | transferTypeToName baseLookUp.transferType}}</td>
                                    <td>{{good.UpSheet}}</td>
                                    <td>{{good.InName}}</td>
                                    <td>{{good.OutStockBatchSheet}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.Name}}">{{good.Name | truncationString}}</span></td>
                                    <td>{{good.DeliverySheetID}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.LinkMan}}">{{good.LinkMan}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.Country ? good.Country + ',' : ''}}{{good.State ? good.State + ',' : ''}}{{good.City ? good.City + ',' : ''}}{{good.District ? good.District + ',' : ''}}{{good.Address ? good.Address : ''}}">{{good.Country ? good.Country + ',' : ''}}{{good.State ? good.State + ',' : ''}}{{good.City ? good.City + ',' : ''}}{{good.District ? good.District + ',' : ''}}{{good.Address ? good.Address : '' | truncationString}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.TradeMemo}}">{{good.TradeMemo | truncationString}}</span></td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="11">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{good.OutStockID}}">
                                            <div class="sheet-detail-wrap">
                                                <assort-detail :assort-details="good.OutStockItem"></assort-detail>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="deliverGoods.length == 0 && $loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </assort-head>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                autoPrint: false,
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                deliverGoods: [],
                baseLookUp: {
                    stockLists: [],
                    merchantDeliveryLists: [],
                    shopLists: [],
                    channelList: [],
                    payLists: [],   // 支付方式
                    inID: [], //外部机构
                    transferType: [] //业务类型
                }
            }
        },
        computed: commonMethods.selectAll('this.deliverGoods',function (item) {
            return item
        }),
        methods: {
            getIDGroup: function (ItemID,key) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    ItemGroup.forEach(function (item) {
                        IDGroup.push(item[key]);
                    });
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //不扫描发货
            stockOrderSaveWeigh: function (ItemID) {
                var self = this;
                //确认提示
                var choiceDeliverGoods = self.getIDGroup(ItemID,'OutStockID');
                if (choiceDeliverGoods.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要不扫描发货吗?',
                        btnName: '不扫描发货',
                        events: {
                            confirm: 'stockOrderSaveWeigh'
                        }
                    });
                    self.$off('stockOrderSaveWeigh');

                    self.$once('stockOrderSaveWeigh',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpSkip_Scan',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceDeliverGoods)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '不扫描发货成功!'
                                });
                                self.$dispatch('transmit','searchGoods');    //不扫描发货成功,重新刷新列表

                            }
                        });
                    });
                }
            },
            //取消订单
            stockOrderSaveCancel: function (ItemID) {
                var self = this;
                //确认提示
                var choiceDeliverGoods = self.getIDGroup(ItemID,'OutStockID');
                if (choiceDeliverGoods.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消订单吗?',
                        btnName: '取消订单',
                        events: {
                            confirm: 'stockOrderSaveCancel'
                        }
                    });
                    self.$off('stockOrderSaveCancel');

                    self.$once('stockOrderSaveCancel',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpStockOrderSave_Cancel',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceDeliverGoods)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '取消订单成功!'
                                });
                                self.$dispatch('transmit','searchGoods');    //不扫描发货成功,重新刷新列表

                            }
                        });
                    });
                }
            },
            //暂停订单
            pauseCustomerOrder: function (ItemID) {
                var self = this;
                //确认提示
                var choiceDeliverGoods = self.getIDGroup(ItemID,'UpSheetID');
                if (choiceDeliverGoods.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要暂停订单吗?',
                        btnName: '暂停订单',
                        events: {
                            confirm: 'pauseCustomerOrder'
                        }
                    });
                    self.$off('pauseCustomerOrder');

                    self.$once('pauseCustomerOrder',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpPauseCustomerOrder',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceDeliverGoods)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '暂停订单成功!'
                                });
                                self.$dispatch('transmit','searchGoods');    //不扫描发货成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //获取快递单Sheet列表
            getDeliverySheetGroup: function () {
                if (this.checkedGroups.length > 0) {
                    var IDGroup = [];
                    var ItemGroup = this.checkedGroups;
                    var PayMode = ItemGroup[0].PayMode;
                    var MerchantDeliveryID = ItemGroup[0].MerchantDeliveryID;
                    var isTheSamePayMode = true;
                    var isTheSameDelivery = true;
                    ItemGroup.forEach(function (item) {
                        //是否相同快递
                        if (MerchantDeliveryID !== item.MerchantDeliveryID) {
                            isTheSameDelivery = false;
                        }
                        //是否相同支付方式
                        if (PayMode !== item.PayMode) {
                            isTheSamePayMode = false;
                        }
                        IDGroup.push(item.Sheet);
                    });
                    if (IDGroup.length === 0) {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请至少选中一个订单'
                        });
                        return {
                            ShopID: '',
                            IDGroup: [],
                            PayMode: '',
                            MerchantDeliveryID: ''
                        };
                    } else {
                        if (isTheSameDelivery) {
                            if (!isTheSamePayMode) {
                                PayMode = '';
                            }
                            return {
                                ShopID: '',
                                IDGroup: IDGroup,
                                PayMode: PayMode,
                                MerchantDeliveryID: MerchantDeliveryID
                            };
                        } else {
                            this.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '请选择相同快递公司的订单'
                            });
                            return {
                                ShopID: '',
                                IDGroup: [],
                                PayMode: '',
                                MerchantDeliveryID: ''
                            };
                        }
                    }
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return {
                        ShopID: '',
                        IDGroup: [],
                        PayMode: '',
                        MerchantDeliveryID: ''
                    }
                }
            },
            print: function (localStorageName,printUrl) {
//                var checkedGroups = this.checkedGroups;
//                if (checkedGroups.length == 0) {
//                    this.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请至少选中一个拣货单'
//                    });
//                    return ;
//                } else {
//                    var sheetList = [];
//                    checkedGroups.forEach(function (item) {
//                        sheetList.push(item.Sheet);
//                    })
//                }
                var deliveryParams = this.getDeliverySheetGroup();
                var sheetList = deliveryParams.IDGroup;
                var ShopID = deliveryParams.ShopID || '';
                var PayMode = typeof(deliveryParams.PayMode) == 'number' ? deliveryParams.PayMode : '';
                var MerchantDeliveryID = deliveryParams.MerchantDeliveryID || '';
                if (MerchantDeliveryID) {
                    if (sheetList.length > 0) {
                        var sheetListStr = JSON.stringify(sheetList);
                        localStorage[localStorageName] = sheetListStr;
                        window.open(printUrl + '?BusinessType=' + 3 + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint);
                    }
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '选中的订单中没有选择快递公司!'
                    });
                }

            },
            //打印拣货单
//            printPick: function () {
//                this.print('printPickSheetList','#!/print-pick');
//            },
            //打印快递单
            printDelivery: function () {
                this.print('printDeliveryList','#!/print-delivery');
            }
        },
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
            assortHead: require('./assort-head.vue'),
            assortDetail: require('./assort-detail.vue'),
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>