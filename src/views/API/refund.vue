<template>
    <div class="container-fluid">
        <div class="unify-head">
            退单接口管理
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        订单状态:
                    </label>
                    <div class="checkbox-list">
                        <label class="checkbox-inline" v-for="orderFlag in baseLookUp.orderFlag">
                            <input type="checkbox" v-model="query.Flag" value="{{orderFlag.Code}}"> <span>{{orderFlag.Text}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >退单编号</label>
                        <input v-model="query.Rid | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >买家昵称</label>
                        <input v-model="query.BuyerNick" type="text" class="form-control">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >退货运单号</label>-->
                        <!--<input v-model="query.SID" type="text" class="form-control">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >交易号</label>
                        <input v-model="query.Tid | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >交易状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{iRefundStatus.Code}}" v-for="iRefundStatus in baseLookUp.iRefundStatus">{{iRefundStatus.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.Sku | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >地址</label>
                        <input v-model="query.Address" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >电话</label>
                        <input v-model="query.LinkTele" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >联系人</label>
                        <input v-model="query.LinkMan" type="text" class="form-control">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >SKU数字ID</label>-->
                        <!--<input v-model="query." type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->

                </div>
                <div class="query-button-group">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出商品明细</a>-->
                </div>

            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a @click="downRefundOrders" href="javascript:void(0)" class="btn btn-default">退货订单下载</a>
                            <a @click="turnOrder('')" href="javascript:void(0)" class="btn btn-default">生成退款单</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>订单状态</th>
                                    <th>退货编号</th>
                                    <th>交易号</th>
                                    <th>淘宝商店</th>
                                    <th>买家昵称</th>
                                    <th>退货状态</th>
                                    <th>退货说明</th>
                                    <th>退款金额</th>
                                    <th>退货申请时间</th>
                                    <th>下载时间</th>
                                    <th>处理时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="refundOrder in refundOrders" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td  ><input type="checkbox" v-model="refundOrder.checked" style="margin-right:8px;"></td>
                                    <td>{{refundOrder.DownNote.Flag | flagCodeToText baseLookUp.orderFlag}}</td>
                                    <td>{{refundOrder.RefundID}}</td>
                                    <td>{{refundOrder.Tid}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.ShopID | shopCodeToName baseLookUp.shopLists}}">{{refundOrder.ShopID | shopCodeToName baseLookUp.shopLists  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.BuyerNick}}">{{refundOrder.BuyerNick  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Status | flagCodeToText baseLookUp.iRefundStatus}}">{{refundOrder.Status | flagCodeToText baseLookUp.iRefundStatus  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{refundOrder.Description}}">{{refundOrder.Description  | truncationString }} </span></td>
                                    <td><span v-if="refundOrder.Price">￥</span>{{refundOrder.Price}}</td>
                                    <td><span v-if="refundOrder.CreateTime" data-toggle="tooltip" data-placement="top" title="{{refundOrder.CreateTime | truncationTimeString}}">{{refundOrder.CreateTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="refundOrder.Created" data-toggle="tooltip" data-placement="top" title="{{refundOrder.Created | truncationTimeString}}">{{refundOrder.Created | formatDateFormShow}}</span></td>
                                    <td><span v-if="refundOrder.Modified" data-toggle="tooltip" data-placement="top" title="{{refundOrder.Modified | truncationTimeString}}">{{refundOrder.Modified | formatDateFormShow}}</span></td>
                                    <td><a v-if="refundOrder.DownNote.Flag == 0" @click="turnOrder(refundOrder.InfRefundID)" href="javascript:void(0)"   data-toggle="tooltip" data-placement="top" title="处理"><span class="iconfont icon-dispose"></span></a></td>

                                </tr>
                            </tbody>
                        </table>
                        <div v-if="refundOrders.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-refund-download></modal-refund-download>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        props: ['baseLookUp'],
        data: function () {
            return {
                count: 0,
                show: {
                    flog: false
                },
                query: {
                    Rid: [],
                    ShopID: '',
                    Tid: [],
                    Sku: [],
                    BuyerNick: '',
                    SID: '',
                    Address: '',
                    LinkTele: '',
                    LinkMan: '',
                    Status: '',
                    Flag: []
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                refundOrders: []
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            getOrderIDGroup: function (orderId) {
                var self = this;
                var orderIdGroup = [];
                if (orderId) {
                    orderIdGroup.push(orderId);
                } else {
                    orderIdGroup = this.checkedGroups;
                }
                if (orderIdGroup.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return orderIdGroup;
                }
            },
            //获取退单列表
            getRefundOrders: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/PlatFormAPI/ErpRefundQuery',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    self.refundOrders = [];
                    if (result.ResultCode == 1) {
                        var refundOrders = result.Data.PageData;
                        if (refundOrders.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            refundOrders.forEach(function (refundOrder) {
                                refundOrder.checked = false;
                            });
                            self.refundOrders = refundOrders;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                })
            },
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getRefundOrders();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            resetForm: function () {
                this.query = {
                    Rid: [],
                    ShopID: '',
                    Tid: [],
                    Sku: [],
                    BuyerNick: '',
                    SID: '',
                    Address: '',
                    LinkTele: '',
                    LinkMan: '',
                    Status: '',
                    Flag: []
                }
            },
            downRefundOrders: function () {
                this.$broadcast('modal-refund-download',this.baseLookUp)
            },

            //生成退款单
            turnOrder: function (orderId) {
                var orderIdGroup = this.getOrderIDGroup(orderId);
                var self = this;
                if (orderIdGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要生成退款单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'confirm-turnRefund'
                        }
                    });
                    self.$off('confirm-turnRefund');
                    self.$once('confirm-turnRefund',function () {
                        if (self.count == 0) {
                            self.count = 1;
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/PlatFormAPI/TurnOrder',
                                contentType: 'application/json',
                                data: JSON.stringify(orderIdGroup)
                            }).done(function (result) {
                                NProgress.done();
                                self.count = 0;
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '生成退款单成功'
                                    });
                                    self.$dispatch('transmit','page-change');
                                }
                            }).fail(function (err) {
                                self.count = 0;
                            })
                        }
                    });
                }
            }
        },
        events: {
            'page-change': function () {
                this.getRefundOrders();
            }
        },
        route: {
            data: function (transition) {
                this.getRefundOrders();
                transition.next();
            }
        },
        computed: commonMethods.selectAll('this.refundOrders', function (item) {
            return item.InfRefundID
        }),
        ready: function () {

        },
        components: {
            pagination: require('../../components/pagination.vue'),
            modalRefundDownload: require('./modal-refund-download.vue'),
        }
    }
</script>





<style rel="stylesheet/less" lang="less">
    .sorthd{
        margin-bottom:15px;
        padding-left:30px;
        input{
            margin-left:20px;
            vertical-align:middle;margin-top:0px;
            margin-right:5px;
        }
    }
</style>