<template>
    <assort-head :pagination-options.sync="paginationOptions" :deliver-goods.sync="deliverGoods" :base-look-up="baseLookUp">
        <div class="sheet-list" slot="tableList">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a v-link="{name:'delivery-weighed'}" class="btn btn-default">称重出库</a>
                            <a @click="skipWeighing('')" href="javascript:void(0)" class="btn btn-default">直接出库</a>
                            <a @click="pauseCustomerOrder('')" href="javascript:void(0)" class="btn btn-default">暂停</a>
                            <a @click="cancelCustomerOrder('')" href="javascript:void(0)" class="btn btn-default">取消订单</a>
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
                                <th>发货仓库</th>
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
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.StockName}}">{{good.StockName | truncationString}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.Name}}">{{good.Name | truncationString}}</span></td>
                                    <td>{{good.DeliverySheetID}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.LinkMan}}">{{good.LinkMan | truncationString}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.Country ? good.Country : ''}}{{good.State ? good.State : ''}}{{good.City ? ',' + good.City : ''}}{{good.District ? ',' + good.District : ''}}{{good.Address ? ',' + good.Address : ''}}">{{good.Country ? good.Country : ''}}{{good.State ? good.State : ''}}{{good.City ? ',' + good.City : ''}}{{good.District ? ',' + good.District : ''}}{{good.Address ? ',' + good.Address : '' | truncationString}}</span></td>
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
                        <div v-if="deliverGoods.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
        methods: {
//            getIDGroup: function (ItemID) {
//                var IDGroup = [];
//                if (ItemID) {
//                    IDGroup.push(ItemID);
//                } else {
//                    IDGroup = this.checkedGroups;
//                }
//                if (IDGroup.length === 0) {
//                    this.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请至少选中一个订单'
//                    });
//                    return [];
//                } else {
//                    return IDGroup;
//                }
//            },
            getIDGroup: function (ItemID,key,isCheckType) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    ItemGroup.forEach(function (item) {
                        if (isCheckType) {
                            if (item.TransferType == 21) {
                                IDGroup.push(item[key]);
                            }
                        } else {
                            IDGroup.push(item[key]);
                        }
                    });
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单或所选的订单中有不符合要求的订单'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            weighing: function (ItemID) {
                var outStockIDGroups = this.getIDGroup(ItemID,'OutStockID');
                var outStockID = '';
                if (outStockIDGroups.length > 0) {
                    outStockID = outStockIDGroups[0];
                    this.$route.router.go({name:'delivery-weighed',query:{outStockID:outStockID}});
                }
            },
            //不称重出库
            skipWeighing: function (ItemID) {
                var self = this;
                var outStockIDGroups = this.getIDGroup(ItemID,'OutStockID');
                if (outStockIDGroups.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要不称重发货吗?',
                        btnName: '不称重发货',
                        events: {
                            confirm: 'skipWeighing'
                        }
                    });
                    self.$off('skipWeighing');

                    self.$once('skipWeighing',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpBackWriteWeighList',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockIDGroups)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '不称重发货成功!'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    })
                }
            },
            //取消客户订单
            cancelCustomerOrder: function (ItemID) {
                var self = this;
                var customerIDGroup = this.getIDGroup(ItemID,'UpSheetID',true);
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '无效操作无法恢复,订单设为无效后,将无法再对该订单进行任何操作,需要重新下载订单,你确定要继续吗?',
                        btnName: '取消订单',
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
            //暂停订单
            pauseCustomerOrder: function (ItemID) {
                var self = this;
                //确认提示
                var choiceDeliverGoods = this.getIDGroup(ItemID,'UpSheetID',true);
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
                                self.$dispatch('transmit','page-change');    //不扫描发货成功,重新刷新列表
                            }
                        });
                    });
                }
            }
        },
        ready: function () {
            //显示详情页
//            $(document).on('show.bs.collapse', '.sheet-list-collapse', function () {
//                var sheetListCollapseId = $(this).attr('id');
//                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');
//
//            });
//            $(document).on('hidden.bs.collapse', '.sheet-list-collapse', function () {
//                var sheetListCollapseId = $(this).attr('id');
//                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
//            });
        },
        computed: commonMethods.selectAll('this.deliverGoods',function (item) {
            return item
        }),
        components: {
            assortHead: require('./assort-head.vue'),
            assortDetail: require('./assort-detail.vue'),
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>