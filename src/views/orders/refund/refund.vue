<template>
    <div class="container-fluid">
        <div class="unify-head">
            退单{{pageInfo.isRefundAll ? '查询' : '管理'}}
        </div>
        <div class="query-form" @keyup.enter.stop="search">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title" v-if="pageInfo.isRefundAll">
                        订单状态:
                    </label>
                    <div class="checkbox-list">
                        <label class="checkbox-inline" v-for="reFundStatus in baseLookUp.reFundStatus" v-if="pageInfo.isRefundAll">
                            <input type="checkbox" v-model="query.Status" value="{{reFundStatus.Code}}"> <span>{{reFundStatus.Text}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >退货单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >退货类型</label>
                        <select v-model="query.RefundType" class="form-control">
                            <option value="">不限</option>
                            <option value="{{reFundType.Code}}" v-for="reFundType in baseLookUp.reFundType">{{reFundType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.OutSheet | arrayToString" type="text" class="form-control"  placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货人姓名</label>
                        <input v-model="query.LinkMan" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货地址</label>
                        <input v-model="query.Address" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货人电话</label>
                        <input v-model="query.Phone" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >仓库名称</label>
                        <select v-model="query.StockID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{stockList.StockID}}"  v-for="stockList in baseLookUp.stockLists">{{stockList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品编码</label>
                        <input v-model="query.GoodsCode" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >颜色</label>
                        <input v-model="query.Color" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >尺码</label>
                        <input v-model="query.Size" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>金额范围</label>
                        <input v-model="query.MoneyBeg"  type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.MoneyEnd"  type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >买家昵称</label>
                        <input v-model="query.BuyerNick" type="text" class="form-control"  placeholder="">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >标题</label>-->
                        <!--<input v-model="query.Title" type="text" class="form-control"  placeholder="">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.SKU" type="text" class="form-control"  placeholder="">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >标记</label>-->
                        <!--<select v-model="query.Mark" class="form-control">-->
                            <!--<option selected value="">不限</option>-->
                            <!--<option  value=1>是</option>-->
                            <!--<option  value=0>否</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >付款时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-start'>
                                <input v-model="query.RefundTimeBeg | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-end'>
                                <input v-model="query.RefundTimeEnd | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >审核时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='check-timepicker-start'>
                                <input v-model="query.CheckTimeBeg | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='check-timepicker-end'>
                                <input v-model="query.CheckTimeEnd | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出商品明细</a>-->
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12" v-if="!pageInfo.isRefundAll">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a v-link="{name:'refund-empty',activeClass:'active'}" class="sheet-tab-link">待 确 认</a>
                            <a v-link="{name:'refund-confirm',activeClass:'active'}" class="sheet-tab-link ">待收货</a>
                            <a v-link="{name:'refund-receive',activeClass:'active'}" class="sheet-tab-link ">待结算</a>
                            <a v-link="{name:'refund-finish',activeClass:'active'}" class="sheet-tab-link ">已完成</a>
                            <a v-link="{name:'refund-invalid',activeClass:'active'}" class="sheet-tab-link ">已取消</a>
                        </div>
                    </div>
                </div>
                <router-view :base-look-up="baseLookUp" :refund-orders.sync="refundOrders[pageInfo.pageStatus]" :pagination-options.sync="pagination[pageInfo.pageStatus]"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var reFundStatusCode = require('../../../globalConstants').reFundStatusCode;
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    ID: '',
                    Status: [], //订单状态
                    Sheet: [], //订单号
                    OutSheet: [], // 外部交易号，即网店单号
                    ShopID: '',  // 网店ID
                    PayMode: '', // 支付模式
                    RefundTimeBeg: '', // 付款时间开始
                    RefundTimeEnd: '', // 付款时间结束
                    CheckTimeBeg: '', //审核时间开始
                    CheckTimeEnd: '', //审核时间结束
                    LinkMan: '', // 收货人
                    Address: '', // 收货地址
                    Phone: '', // 收货人电话
                    StockID: '', // 仓库ID
                    Title: '', // 标题
                    SKU: '', // SKU
                    GoodsCode: '', // 商品编号
                    Color: '', // 商品颜色
                    Size: '', // 商品尺码
                    GoodsName: '', // 商品名称
                    BuyerNick: '', // 买家昵称
                    Mark: '', // 标记
                    MoneyBeg: '', // 金额范围开始
                    MoneyEnd: '', // 金额范围结束
                    RefundType: '' //退货类型
                },
                pageInfo: {
                    isRefundAll: false,   //是否为全部订单页面
                    pageStatus: '',  //页面状态
                },
                //订单详情
                refundOrders: {
                    'refund-all': [], //所有退单
                    'refund-empty': [],  //待确认
                    'refund-finish': [], //已完成
                    'refund-invalid': [], //已取消
                    'refund-confirm': [], //已确认
                    'refund-receive': []
                },
                pagination: {
                    'refund-confirm': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },
                    'refund-empty': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },   //待确认
                    'refund-invalid': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },  // 取消
                    'refund-finish': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },  //已完成
                    'refund-receive': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },  //待收货
                    'refund-all': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }
                },
                baseLookUp: {
                    reFundType: [],
                    reFundStatus: [],
                    stockLists: [],
                    shopLists: [],
                    refundOperType: []
                }
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //获取退货单
            getRefundOrders: function () {
                var self = this;
                var isRefundAll = self.pageInfo.isRefundAll;
                var pageStatus = self.pageInfo.pageStatus;
                var pageNumber = self.pagination[pageStatus].cur;
                var pageSize = self.pagination[pageStatus].pageSize;
                var pageAll = self.pagination[pageStatus].all;
                self.refundOrders[pageStatus] = [];
                NProgress.start();
                if (isRefundAll) {
                    servers.postAjax.bind(self)({
                        url: '/BusRefund/ErpQueryRefundAll',
                        data: {
                            PageSize: pageSize,
                            PageNumber: pageNumber,
                            SearchWhere: self.query
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            NProgress.done();
                            var refundData = result.Data.PageData;
                            self.pagination[pageStatus].all = result.Data.TotalPages;
                            self.pagination[pageStatus].totalRecords = result.Data.TotalRecords;
                            if (refundData.length > 0) {
                                refundData.forEach(function (item) {
                                    item.checked = false;
                                });
                                self.refundOrders[pageStatus] = refundData;
                            } else {
//                                self.$dispatch('transmit','tip',{
//                                    name: '提示',
//                                    contentText: '结果为空'
//                                });
                            }

                        }

                    })
                } else {
                    servers.postAjax.bind(self)({
                        url: '/BusRefund/ErpQueryRefund',
                        data: {
                            PageSize: pageSize,
                            PageNumber: pageNumber,
                            SearchWhere: self.query
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if(result.ResultCode == 1) {
                            var refundData = result.Data.PageData;
                            self.pagination[pageStatus].all = result.Data.TotalPages;
                            self.pagination[pageStatus].totalRecords = result.Data.TotalRecords;
                            if (refundData.length > 0) {
                                refundData.forEach(function (item) {
                                    item.checked = false;
                                });
                                self.refundOrders[pageStatus] = refundData;
                            } else {
//                                self.$dispatch('transmit','tip',{
//                                    name: '提示',
//                                    contentText: '结果为空'
//                                });
                            }
                        }

                    })
                }
            },
            search: function () {
                var pageStatus = this.pageInfo.pageStatus;
                var pagination = this.pagination[pageStatus];
                if (pagination.cur == 1) {
                    this.getRefundOrders();
                } else {
                    pagination.cur = 1
                }
            },
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                servers.getBaseData('ReFundStatus',false,function (val) {
                    baseLookUp.reFundStatus = val;
                });
                servers.getBaseData('ReFundType',false,function (val) {
                    baseLookUp.reFundType = val;
                });
                servers.getBaseData('StockList',false,function (val) {
                    baseLookUp.stockLists = val;
                });
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                servers.getBaseData('RefundOperType',false,function (val) {
                    baseLookUp.refundOperType = val;
                })
            },
            resetForm: function () {
                var Status = this.query.Status;
                if (this.pageInfo.isRefundAll) {
                    Status = [];
                }
                this.query = {
                    ID: '',
                    Status: Status, //订单状态
                    Sheet: [], //订单号
                    OutSheet: [], // 外部交易号，即网店单号
                    ShopID: '',  // 网店ID
                    PayMode: '', // 支付模式
                    RefundTimeBeg: '', // 付款时间开始
                    RefundTimeEnd: '', // 付款时间结束
                    CheckTimeBeg: '', //审核时间开始
                    CheckTimeEnd: '', //审核时间结束
                    LinkMan: '', // 收货人
                    Address: '', // 收货地址
                    Phone: '', // 收货人电话
                    StockID: '', // 仓库ID
                    Title: '', // 标题
                    SKU: '', // SKU
                    GoodsCode: '', // 商品编号
                    Color: '', // 商品颜色
                    Size: '', // 商品尺码
                    GoodsName: '', // 商品名称
                    BuyerNick: '', // 买家昵称
                    Mark: '', // 标记
                    MoneyBeg: '', // 金额范围开始
                    MoneyEnd: '', // 金额范围结束
                    RefundType: '' //退货类型
                };
            }
        },
        route: {
            data: function (transition) {
                var pageStatus = this.pageInfo.pageStatus = transition.to.name;
                if (pageStatus == 'refund-all') {
                    this.pageInfo.isRefundAll = true;
                    this.query.Status = [];
                } else {
                    this.pageInfo.isRefundAll = false;
                    this.query.Status = [];
                    this.query.Status.push(reFundStatusCode[pageStatus].code);
                }
                this.getRefundOrders();
                transition.next();
            }
        },
        events: {
            //重新获取列表
            'refresh': function () {
                this.getRefundOrders();
            },
            'page-change': function () {
                this.getRefundOrders();
            }
        },
        ready: function () {
            //dateTimePicker
            this.getBaseData();

            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start,#check-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            });
            $('#pay-timepicker-end,#check-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            });
            $("#pay-timepicker-start,#check-timepicker-start").on("dp.change",function (e) {
                $('#pay-timepicker-end,#check-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end,#check-timepicker-end").on("dp.change",function (e) {
                $('#pay-timepicker-start,#check-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });

            $('#pay-timepicker-start,#check-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-timepicker-end,#check-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#pay-timepicker-end,#check-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-timepicker-start,#check-timepicker-start').datetimepicker('setEndDate',e.date);
            });


            //启动toolTip
            $('.toolTip-ctrl').tooltip();
            //显示详情页
            $('.sheet-list-collapse').on('show.bs.collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $('.sheet-list-collapse').on('hidden.bs.collapse',function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });

        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>