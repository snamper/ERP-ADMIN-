<template>
    <div class="col-lg-12">
        <div class="batch-operation" >
            <label class="batch-operation-title" v-if="pageInfo.pageStatusCode !== -1 && pageInfo.pageStatusCode !== 4 && pageInfo.pageStatusCode !== 5">批量操作:</label>
            <div class="batch-operation-group" v-if="pageInfo.pageStatusCode !== -1 && pageInfo.pageStatusCode !== 4 && pageInfo.pageStatusCode !== 5">
                <a @click="checkRefund('')" href="javascript:void(0)" class="btn btn-default" v-if="pageInfo.pageStatusCode == 1">审核确认</a>
                <a @click="importRefund" href="javascript:void(0)" class="btn btn-default" v-if="pageInfo.pageStatusCode == 1">导入</a>
                <a @click="inStockRefund('')" href="javascript:void(0)" class="btn btn-default" v-if="pageInfo.pageStatusCode == 2">确认收货</a>
                <a @click="finishRefund('')" href="javascript:void(0)" class="btn btn-default" v-if="pageInfo.pageStatusCode == 2 || pageInfo.pageStatusCode == 3">通知结算</a>
                <a @click="cancelRefund('')" href="javascript:void(0)" class="btn btn-default">取消订单</a>
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
                        <th>退单单号</th>
                        <th>订单号</th>
                        <th>退货类型</th>
                        <th>退货原因</th>
                        <th>退货说明</th>
                        <th>店铺</th>
                        <th>平台</th>
                        <th>收货人</th>
                        <th>实退款</th>
                        <th>退货仓库</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody v-for="refundOrder in refundOrders" class="panel panel-default">
                    <tr class="sheet-list-item">
                        <td class="sheet-item-state"><input type="checkbox" v-model="refundOrder.checked"></td>
                        <td><span>{{refundOrder.StatusDesc}}</span></td>
                        <td @click="getRefundDetail(refundOrder,refundOrder.RefundID)" class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{refundOrder.RefundID}}"><span class="iconfont"></span><span>{{refundOrder.Sheet}}</span></td>
                        <td><span>{{refundOrder.OutSheet}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.RefundTypeDesc}}">{{refundOrder.RefundTypeDesc | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.FirstReason}}">{{refundOrder.FirstReason | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.FirstDescription}}">{{refundOrder.FirstDescription | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Shop.Name}}">{{refundOrder.Shop.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Shop.NetShop.Name}}">{{refundOrder.Shop.NetShop.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.LinkMan}}">{{refundOrder.LinkMan | truncationString}}</span></td>
                        <td>{{refundOrder.RefundFee}}</td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Stock.Name}}">{{refundOrder.Stock.Name | truncationString}}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Note}}">{{refundOrder.Note | truncationString}}</span></td>
                    </tr>
                    <tr class="sheet-list-detail">
                        <td colspan="13">
                            <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{refundOrder.RefundID}}">
                                <div class="sheet-detail-wrap">
                                    <refund-detail :base-look-up="baseLookUp" :refund-id="refundOrder.RefundID" :refund-details.sync="refundOrder.RefundItems" :state="state"></refund-detail>
                                    <div class="sheet-detail-operate" v-if="!state.isAll">
                                        <a v-if="state.isEmpty" @click="checkRefund(refundOrder.RefundID)" href="javascript:void(0)" class="btn btn-default">审核通过</a>
                                        <!--<a v-if="state.isEmpty" @click="" href="javascript:void(0)" class="btn btn-default">换货</a>-->
                                        <!--<a v-if="state.isEmpty" @click="" href="javascript:void(0)" class="btn btn-default">补货</a>-->
                                        <a v-if="state.isPick" @click="inStockRefund(refundOrder.RefundID)" href="javascript:void(0)" class="btn btn-default">确认收货</a>
                                        <a v-if="state.isPick || state.isReceive" @click="finishRefund(refundOrder.RefundID)" href="javascript:void(0)" class="btn btn-default">通知结算</a>
                                        <a v-if="state.isEmpty || state.isPick || state.isReceive" @click="cancelRefund(refundOrder.RefundID)" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="refundOrders.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
            <pagination :pagination-options="paginationOptions"></pagination>
        </div>
    </div>
    <!--<div>{{state | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    var reFundStatusCode = require('../../../globalConstants').reFundStatusCode;
    module.exports = {
        props: ['refundOrders','paginationOptions','baseLookUp'],
        data: function () {
            return {
                pageInfo: {
                    pageStatusCode: '',
                    fileType: 36,
                },
                state: {
                    isAll: false,  //全部退单
                    isEmpty: false,  //未确认
                    isPick: false,   //待收货
                    isReceive: false, //已收货
                    isFinish: false,   //已完成
                    isInvalid: false   //取消
                },
            }
        },
        methods: {
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
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return customerIDGroup;
                }
            },
            //已完成或已取消查询
            queryRefundItemAjax: function (refundOrder, refundID, method) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusRefund/ErpQueryRefundItem' + method + 'ByID',
                    data: {
                        ID: refundID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        refundOrder.RefundItems = [];
                        var refundArray = result.Data;
                        if (refundArray.length > 0) {
                            refundArray.forEach(function (item) {
                                item.isSaved = true;
                                item._OperType = item.OperType;
                                item._HasGoodReturn = item.HasGoodReturn;
                                item._SalesPrice = item.SalesPrice;
                                item._Qty = item.Qty;
                                item._RefundFee = item.RefundFee;
                            });
                            refundOrder.RefundItems = refundArray;
                        }
                    }
                })
            },
//            queryRefundItemDoneByID: function (refundOrder,refundID) {
//                var self = this;
//                NProgress.start();
//                servers.postAjax.bind(this)({
//                    url: '/BusRefund/ErpQueryRefundItemDoneByID',
//                    data: {
//                        ID: refundID
//                    }
//                }).done(function (result) {
//                    NProgress.done();
//                    if (result.ResultCode == 1) {
//                        refundOrder.RefundItems = [];
//                        var refundArray = result.Data;
//                        if (refundArray.length > 0) {
//                            refundArray.forEach(function (item) {
//                                item.isSaved = true;
//                                item._OperType = item.OperType;
//                                item._HasGoodReturn = item.HasGoodReturn;
//                                item._SalesPrice = item.SalesPrice;
//                                item._Qty = item.Qty;
//                                item._RefundFee = item.RefundFee;
//                            });
//                            refundOrder.RefundItems = refundArray;
//                        }
//                    }
//                })
//            },
//            //未完成状态查询
//            queryRefundItemTempByID: function (refundOrder,refundID) {
//                var self = this;
//                NProgress.start();
//                servers.postAjax.bind(this)({
//                    url: '/BusRefund/ErpQueryRefundItemTempByID',
//                    data: {
//                        ID: refundID
//                    }
//                }).done(function (result) {
//                    NProgress.done();
//                    if (result.ResultCode == 1) {
//                        refundOrder.RefundItems = [];
//                        var refundArray = result.Data;
//                        if (refundArray.length > 0) {
//                            refundOrder.RefundItems = refundArray;
//                        }
//                    }
//                })
//            },
            //所有状态查询
//            queryRefundItemAllByID: function (refundOrder,refundID) {
//                var self = this;
//                NProgress.start();
//                servers.postAjax.bind(this)({
//                    url: '/BusRefund/ErpQueryRefundItemTempByID',
//                    data: {
//                        ID: refundID
//                    }
//                }).done(function (result) {
//                    NProgress.done();
//                    if (result.ResultCode == 1) {
//                        refundOrder.RefundItems = [];
//                        var refundArray = result.Data;
//                        if (refundArray.length > 0) {
//                            refundOrder.RefundItems = refundArray;
//                        }
//                    }
//                })
//            },
            //审核确认
            checkRefund: function (customerID) {
                var self = this;
                var customerIDGroup = self.getCustomerIDGroup(customerID);
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要审核退货单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'checkRefund'
                        }
                    });
                    self.$off('checkRefund');
                    self.$once('checkRefund',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpCheckRefund',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '审核成功'
                                });
                                self.$dispatch('refresh');
                            }
                        });
                    });
                }
            },
            //取消退货单
            cancelRefund: function (customerID) {
                var self = this;
                var customerIDGroup = self.getCustomerIDGroup(customerID);
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消退货单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'cancelRefund'
                        }
                    });
                    self.$off('cancelRefund');

                    self.$once('cancelRefund',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpCancelRefund',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '取消成功'
                                });
                                self.$dispatch('refresh');
                            }
                        })
                    })
                }
            },
            //客户退货单收货确认
            inStockRefund: function (customerID) {
                var self = this;
                var customerIDGroup = self.getCustomerIDGroup(customerID);
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要收货吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'inStockRefund'
                        }
                    });
                    self.$off('inStockRefund');
                    self.$once('inStockRefund',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpInStockRefund',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '客户退货单收货成功'
                                });
                                self.$dispatch('refresh');
                            }
                        })
                    });
                }
            },
            //完成收货
            finishRefund: function (customerID) {
                var self = this;
                var customerIDGroup = self.getCustomerIDGroup(customerID);
                if (customerIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要完成收货吗?',
                        btnName: '完成收货',
                        events: {
                            confirm: 'finishRefund'
                        }
                    });
                    self.$off('finishRefund');

                    self.$once('finishRefund',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpFinishRefund',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '完成收货成功'
                                });
                                self.$dispatch('refresh');
                            }
                        })
                    });
                }
            },
            // 导入
            importRefund: function() {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            //获取退货单明细
            getRefundDetail: function (refundDetail, refundID) {
                var pageStatusCode = this.pageInfo.pageStatusCode;
                if (refundDetail.length > 0 ) {
                    return;
                } else {
                    if ([4,5].indexOf(pageStatusCode) > -1) {
                        this.queryRefundItemAjax(refundDetail, refundID,'Done');
                    } else if ([1,2,3].indexOf(pageStatusCode) > -1) {
                        this.queryRefundItemAjax(refundDetail, refundID,'Temp');
                    } else {
                        this.queryRefundItemAjax(refundDetail, refundID,'Temp');
                    }
                }
            },
            //重置页面状态
            resetState: function () {
                this.state = {
                    isAll: false,  //全部退单
                    isEmpty: false,  //未确认
                    isPick: false,   //待收货
                    isReceive: false, //已收货
                    isFinish: false,   //已完成
                    isInvalid: false   //取消
                };
            },
            //设置页面状态
            setState: function (pageStatusCode) {
                var state = this.state;
                switch (pageStatusCode) {
                    case -1:
                        state.isAll = true;
                        break;
                    case 1:
                        state.isEmpty = true;
                        break;
                    case 2:
                        state.isPick = true;
                        break;
                    case 3:
                        state.isReceive = true;
                        break;
                    case 4:
                        state.isFinish = true;
                        break;
                    case 5:
                        state.isInvalid = true;
                        break;
                    default:
                        state.isAll = true;
                }
            }
        },
        route: {
            data: function (transition) {
                var pageStatus = transition.to.name;
               var pageStatusCode = this.pageInfo.pageStatusCode = reFundStatusCode[pageStatus].code;
                this.resetState();
                this.setState(pageStatusCode);
            }
        },
        computed: commonMethods.selectAll('this.refundOrders', function (item) {
            return item.RefundID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            refundDetail: require('./refund-detail.vue')
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
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>