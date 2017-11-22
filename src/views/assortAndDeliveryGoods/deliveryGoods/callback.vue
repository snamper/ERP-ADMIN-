<template>
    <assort-head :pagination-options="paginationOptions" :deliver-goods.sync="deliverGoods" :base-look-up="baseLookUp">
        <div class="sheet-list" slot="tableList">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a @click="writeBackOrder('')" href="javascript:void(0)" class="btn btn-default">回写订单</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>订单号</th>
                                    <th>回写结果</th>
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
                                    <td>{{good.Result}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.DeliveryName}}">{{good.DeliveryName | truncationString}}</span></td>
                                    <td>{{good.DeliverySheetID}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.LinkMan}}">{{good.LinkMan | truncationString}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.Country ? good.Country + ',' : ''}}{{good.State ? good.State + ',' : ''}}{{good.City ? good.City + ',' : ''}}{{good.District ? good.District + ',' : ''}}{{good.Address ? good.Address : ''}}">{{good.Country ? good.Country + ',' : ''}}{{good.State ? good.State + ',' : ''}}{{good.City ? good.City + ',' : ''}}{{good.District ? good.District + ',' : ''}}{{good.Address ? good.Address : '' | truncationString }}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{good.TradeMemo}}">{{good.TradeMemo | truncationString}}</span></td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="8">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{good.OutStockID}}">
                                            <div class="sheet-detail-wrap">
                                                <assort-detail :assort-details="good.OutStock_Item_View"></assort-detail>
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
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
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
                    transferType: [], //业务类型
                }
            }
        },
        methods: {
            getIDGroup: function (ItemID) {
                var IDGroup = [];
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    IDGroup = this.checkedGroups;
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
            //回写订单
            writeBackOrder: function (ItemID) {
                var self = this;
                //确认提示
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要回写订单吗?',
                    btnName: '回写订单',
                    events: {
                        confirm: 'writeBackOrder'
                    }
                });
                self.$off('writeBackOrder');

                self.$once('writeBackOrder',function () {
                    var choiceDeliverGoods = self.getIDGroup(ItemID);
                    if (choiceDeliverGoods.length > 0) {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/PlatFormAPI/DeliverGoods',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceDeliverGoods)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '回写订单成功!'
                                });
                                self.$dispatch('transmit','searchGoods');    //不扫描发货成功,重新刷新列表
                            }
                        });
                    }
                });
            }
        },
        computed: commonMethods.selectAll('this.deliverGoods',function (item) {
            return item.SerialID
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