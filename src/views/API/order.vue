<template>
    <div class="container-fluid">
        <div class="unify-head">
            订单接口管理
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
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >交易号</label>
                        <input v-model="query.Tid | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >交易状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{iOrderStatus.Code}}" v-for="iOrderStatus in baseLookUp.iOrderStatus">{{iOrderStatus.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.CustomBC | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >SKU数字ID</label>-->
                        <!--<input v-model="query.SkuID | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >国标码</label>-->
                        <!--<input v-model="query.BarCode | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >颜色</label>
                        <input v-model="query.ColorName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >尺码</label>
                        <input v-model="query.SizeName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>价格</label>
                        <input v-model="query.Price" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.Price_to" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>商品数</label>-->
                        <!--<input v-model="query.BarCodeNum" type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.BarCodeNum_to" type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>明细数</label>-->
                        <!--<input v-model="query.Num" type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.Num_to" type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >商品编码</label>-->
                        <!--<input v-model="query.CustomNo | arrayToString" type="text" class="form-control">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >买家留言</label>-->
                        <!--<input v-model="query.BuyerMemo" type="text" class="form-control">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >卖家备注</label>-->
                        <!--<input v-model="query.TradeMemo" type="text" class="form-control">-->
                    <!--</div>-->
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >交易创建</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.CreateTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.CreateTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >付款时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-start'>
                                <input v-model="query.PayTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-end'>
                                <input v-model="query.PayTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >下载时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='download-timepicker-start'>
                                <input v-model="query.Created | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='download-timepicker-end'>
                                <input v-model="query.Created_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >转单时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='turn-timepicker-start'>
                                <input v-model="query.HandleTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='turn-timepicker-end'>
                                <input v-model="query.HandleTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-button-group" style="clear:both;">
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
                            <a @click="downOrderAdd" href="javascript:void(0)" class="btn btn-default">订单增量下载</a>
                            <a @click="downOrderAll" href="javascript:void(0)" class="btn btn-default">订单全量下载</a>
                            <a @click="turnOrder('')" href="javascript:void(0)" class="btn btn-default">批量转单</a>
                            <!--<a @click="noTurnOrder('')" href="javascript:void(0)" class="btn btn-default">批量未转单</a>-->
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
                                    <th>交易号</th>
                                    <th>店铺</th>
                                    <th>买家昵称</th>
                                    <th>交易状态</th>
                                    <th>实付款</th>
                                    <th>邮费</th>
                                    <th>交易创建时间</th>
                                    <th>付款时间</th>
                                    <th>下载时间</th>
                                    <th>转单时间</th>
                                    <th>收货人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="order in orders" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" v-model="order.checked" style="margin-right:8px;"></td>
                                    <td>{{order.Flag | flagCodeToText baseLookUp.orderFlag}}</td>
                                    <td class="show-detail-ctrl collapsed sheet-item-state" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{order.NetOrderID}}"><span class="iconfont"></span><span>{{order.Tid}}</span></td>
                                    <td>{{order.ShopID | shopCodeToName baseLookUp.shopLists}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{order.BuyerNick}}">{{order.BuyerNick | truncationString}}</span></td>
                                    <td><span>{{order.Status | flagCodeToText baseLookUp.iOrderStatus}}</span></td>
                                    <td><span v-if="order.Payment">￥{{order.Payment}}</span></td>
                                    <td><span v-if="order.PostFee">￥{{order.PostFee}}</span></td>
                                    <td><span v-if="order.Created" data-toggle="tooltip" data-placement="top" title="{{order.Created | truncationTimeString}}">{{order.Created | formatDateFormShow}}</span></td>
                                    <td><span v-if="order.PayTime" data-toggle="tooltip" data-placement="top" title="{{order.PayTime | truncationTimeString}}">{{order.PayTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="order.CreateTime" data-toggle="tooltip" data-placement="top" title="{{order.CreateTime | truncationTimeString}}">{{order.CreateTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="order.HandleTime" data-toggle="tooltip" data-placement="top" title="{{order.HandleTime | truncationTimeString}}">{{order.HandleTime | formatDateFormShow}}</span></td>
                                    <td>{{order.ReceiverName}}</td>
                                    <td><a v-if="order.Flag == 0" href="javascript:void(0)" @click="turnOrder(order.NetOrderID)"  data-toggle="tooltip" data-placement="top" title="转单"><span class="iconfont icon-turn"></span></a></td>
                                </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="13">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{order.NetOrderID}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table table-condensed">
                                                <thead>
                                                <tr>
                                                    <th>商品</th>
                                                    <th>SKU</th>
                                                    <th>商品名称</th>
                                                    <th>尺码</th>
                                                    <th>颜色</th>
                                                    <th>建议售价</th>
                                                    <th>数量</th>
                                                    <!--<th>销售价</th>-->
                                                    <th>实际售价</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="netOrderItem in order.NetOrderItems">
                                                    <td>
                                                        <span>{{netOrderItem.CustomNo || '无匹配数据'}}</span>
                                                    </td>
                                                    <td>{{netOrderItem.CustomBC || '无匹配数据'}}</td>
                                                    <td>{{netOrderItem.Name || '无匹配数据'}}</td>
                                                    <td>{{netOrderItem.SizeName || '无匹配数据'}}</td>
                                                    <td>{{netOrderItem.ColorName}}</td>
                                                    <!--<td><span v-if="netOrderItem.MarketPrice">￥</span>{{netOrderItem.MarketPrice || '无匹配数据'}}</td>-->
                                                    <td><span v-if="netOrderItem.Price">￥</span>{{netOrderItem.Price || '无匹配数据'}}</td>
                                                    <td>{{netOrderItem.Num || '无匹配数据'}}</td>
                                                    <td><span v-if="netOrderItem.Payment">￥</span>{{netOrderItem.Payment}}</td>
                                                </tr>
                                                </tbody>
                                                <tbody class="list-detail-operation">
                                                <tr>
                                                    <td colspan="10" class="detail-btn-group">
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
                        <div v-if="orders.length == 0 && !$loadingRouteData" class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-download-add></modal-download-add>
    <modal-download-all></modal-download-all>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        props: ['baseLookUp'],
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    Flag: [],
                    Tid: [],
                    CustomBC: [],
                    SkuID: [],
                    BarCode: [],
                    ShopID: '',
                    CustomNo: '',
                    ColorName: '',
                    SizeName: '',
                    BuyerMemo: '',
                    TradeMemo: '',
                    Num: '',
                    Num_to: '',
                    Status: '',
                    Price: '',
                    Price_to: '',
                    BarCodeNum: '',
                    BarCodeNum_to: '',
                    PayTime: '',
                    PayTime_to: '',
                    Created: '',
                    Created_to: '',
                    CreateTime: '',
                    CreateTime_to: '',
                    HandleTime: '',
                    HandleTime_to: ''
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                orders: [],
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            getOrderIDGroup: function (orderId) {
                var orderIdGroup = [];
                if (orderId) {
                    orderIdGroup.push(orderId);
                } else {
                    orderIdGroup = this.checkedGroups;
                }
                if (orderIdGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return orderIdGroup;
                }
            },
            //获取平台订单数据
            getOrdersByApi: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/PlatFormAPI/ErpOrderQuery',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var orders = result.Data.PageData;
                        self.orders = [];
                        if (orders.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            orders.forEach(function (order) {
                                order.checked = false;
                            });
                            self.orders = orders;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                })
            },
            //订单全量下载
            downOrderAll: function () {
                this.$broadcast('modal-download-all',this.baseLookUp);
            },
            //订单增量下载
            downOrderAdd: function () {
                this.$broadcast('modal-download-add',this.baseLookUp);
            },
            //批量转单
            turnOrder: function (orderId) {
                var self = this;
                var orderIdGroup = self.getOrderIDGroup(orderId);
                if (orderIdGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要批量转单?',
                        btnName: '确定',
                        events: {
                            confirm: 'confirm-turnOrder'
                        }
                    });
                    self.$off('confirm-turnOrder');
                    self.$once('confirm-turnOrder',function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/PlatFormAPI/TurnOrder',
                                contentType: 'application/json',
                                data: JSON.stringify(orderIdGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '批量转单成功'
                                    });
                                    self.$dispatch('transmit','page-change');
                                }
                            })
                    });
                }
            },
            //批量未转单
//            noTurnOrder: function (orderId) {
//                var self = this;
//
//                self.$dispatch('transmit','tip',{
//                    name: '提示:',
//                    contentText: '确定要批量未转单?',
//                    btnName: '确定',
//                    events: {
//                        confirm: 'confirm-noTurnOrder'
//                    }
//                });
//
//                self.$once('confirm-noTurnOrder',function () {
//                    var orderIdGroup = self.getOrderIDGroup(orderId);
//                    if (orderIdGroup.length > 0) {
//                        NProgress.start();
//                        servers.postAjax.bind(this)({
//                            url: '/PlatFormAPI/NoTurnOrder',
//                            contentType: 'application/json',
//                            data: JSON.stringify(orderIdGroup)
//                        }).done(function (result) {
//                            NProgress.done();
//                            if (result.ResultCode == 1) {
//                                self.$dispatch('transmit','tip',{
//                                    name: '成功',
//                                    contentText: '批量转单成功'
//                                });
//                            }
//                        })
//                    }
//                });
//            },
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getOrdersByApi();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            //重置表单
            resetForm: function () {
                this.query = {
                    Flag: [],
                    Tid: [],
                    CustomBC: [],
                    SkuID: [],
                    BarCode: [],
                    ShopID: '',
                    CustomNo: '',
                    ColorName: '',
                    SizeName: '',
                    BuyerMemo: '',
                    TradeMemo: '',
                    Num: '',
                    Num_to: '',
                    Status: '',
                    Price: '',
                    Price_to: '',
                    BarCodeNum: '',
                    BarCodeNum_to: '',
                    PayTime: '',
                    PayTime_to: '',
                    Created: '',
                    Created_to: '',
                    CreateTime: '',
                    CreateTime_to: '',
                    HandleTime: '',
                    HandleTime_to: ''
                };
            }
        },
        events: {
            'page-change': function () {
                this.getOrdersByApi();
            }
        },
        route: {
          data: function (transition) {
              this.getOrdersByApi();
              transition.next();
          }
        },
        computed: commonMethods.selectAll('this.orders', function (item) {
            return item.NetOrderID
        }),
        ready: function () {


            //dateTimePicker
            require('../../css/bootstrap-datetimepicker.css');
            require('../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start,#create-timepicker-start,#download-timepicker-start,#turn-timepicker-start').datetimepicker({
            });
            $('#pay-timepicker-end,#create-timepicker-end,#download-timepicker-end,#turn-timepicker-end').datetimepicker({
            });
            $("#pay-timepicker-start,#create-timepicker-start,#download-timepicker-start,#turn-timepicker-start").on("dp.change",function (e) {
                $('#pay-timepicker-end,#assorting-timepicker-end,#download-timepicker-end,#turn-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end,#create-timepicker-end,#download-timepicker-end,#turn-timepicker-end").on("dp.change",function (e) {
                $('#pay-timepicker-start,#assorting-timepicker-start,#download-timepicker-start,#turn-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });

            $('#pay-timepicker-start,#create-timepicker-start,#download-timepicker-start,#turn-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-timepicker-end,#create-timepicker-end,#download-timepicker-end,#turn-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#pay-timepicker-end,#create-timepicker-end,#download-timepicker-end,#turn-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-timepicker-start,#create-timepicker-start,#download-timepicker-start,#turn-timepicker-start').datetimepicker('setEndDate',e.date);
            });


            //显示详情页
            $(document).on('show.bs.collapse','.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse','.sheet-list-collapse',function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });

        },
        components: {
            pagination: require('../../components/pagination.vue'),
            modalDownloadAll: require('./modal-download-all.vue'),
            modalDownloadAdd: require('./modal-download-add.vue')
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