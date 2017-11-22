<template>
    <div class="container-fluid">
        <div class="unify-head">
            拣货单列表
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        拣货单
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog
                        ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.OrderSheet | arrayToString" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>外部交易号</label>
                        <input v-model="query.OrderOutSheet | arrayToString" type="text" class="form-control"
                               placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">
                                {{shopList.Name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>支付方式</label>
                        <select v-model="query.PayMode" class="form-control">
                            <option value="">不限</option>
                            <option value="{{payList.Code}}" v-for="payList in baseLookUp.payLists">{{payList.Text}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>拣货单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control"
                               placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>收货人</label>
                        <input v-model="query.LinkMan" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>收货地址</label>
                        <input v-model="query.Address" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>仓库名称</label>
                        <select v-model="query.StockID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{stockList.StockID}}" v-for="stockList in baseLookUp.stockLists">
                                {{stockList.Name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>快递公司</label>
                        <select v-model="query.MerchantDeliveryID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{merchantDeliveryList.MerchantDeliveryID}}"
                                    v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">
                                {{merchantDeliveryList.Name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>运单号</label>
                        <input v-model="query.DeliverySheetID" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>需要发票</label>
                        <select v-model="query.Invoice" class="form-control">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>获取物流单</label>
                        <select v-model="query.IsGetDeliverySheetID" class="form-control">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>打印拣货单</label>
                        <select v-model="query.Print" class="form-control">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>业务类型</label>
                        <select v-model="query.TransferTypeDesc" class="form-control">
                            <option value="">不限</option>
                            <option value="{{businessList.Code}}" v-for="businessList in baseLookUp.TransferType">
                                {{businessList.Text}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>付款时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-start'>
                                <input v-model="query.PayTimeBeg | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-end'>
                                <input v-model="query.PayTimeEnd | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>订单审核时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='circular-timepicker-start'>
                                <input v-model="query.CheckTimeBeg | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='circular-timepicker-end'>
                                <input v-model="query.CheckTimeEnd | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>创建时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.CreateTimeBeg | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.CreateTimeEnd | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
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
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a  v-link="{name:'assort-pick-list-empty',activeClass:'active'}"
                               class="sheet-tab-link">未确认</a>
                            <a  v-link="{name:'assort-pick-list-pick',activeClass:'active'}"
                               class="sheet-tab-link">已拣货</a>
                            <a  v-link="{name:'assort-pick-list-finish',activeClass:'active'}" class="sheet-tab-link ">已完成</a>
                            <a  v-link="{name:'assort-pick-list-invalid',activeClass:'active'}" class="sheet-tab-link ">已取消</a>
                        </div>
                    </div>
                </div>
                <router-view :code="pageInfo.pageStatusCode"
                             :back="codeBack"
                             :out-stock-batch.sync="outStockBatch[pageInfo.pageStatusName]"
                             :pagination-options.sync="pagination[pageInfo.pageStatusName]"></router-view>
            </div>
        </div>
    </div>
    <!--<div>{{outStockBatch | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var outStockBatchCode = require('../../../globalConstants').outStockBatchCode;
    module.exports = {
        data: function () {
            return {
                codeBack:1,
                show: {
                    flog: false
                },
                pageInfo: {
                    pageStatusName: '',
                    pageStatusCode: ''
                },
                query: {
                    ID: '', //批次单ID
                    Status: '', //拣货单状态
                    Sheet: [], //批次单号
                    OrderSheet: [], //订单号
                    OrderOutSheet: [], //订单外部交易号
                    ShopID: '', //网店ID
                    PayMode: '', //支付模式
                    PayTimeBeg: '', //订单付款时间开始
                    PayTimeEnd: '', //订单付款时间结束
                    CheckTimeBeg: '', //订单审核时间开始
                    CheckTimeEnd: '', //订单审核时间结束
                    CreateTimeBeg: '', //创建时间开始
                    CreateTimeEnd: '', //创建时间结束
                    LinkMan: '', //收货人
                    Address: '', //收货地址
                    Phone: '', //收货人电话
                    StockID: '', //仓库ID
                    TransferTypeDesc: '', //业务类型
                    MerchantDeliveryID: '', //快递公司ID
                    Invoice: '', //发票
                    Print: '', //打印快递单
                    MoneyBeg: '',
                    MoneyEnd: ''
                },
                baseLookUp: {
                    shopLists: [],  //销售平台
                    payLists: [],   // 支付方式
                    stockLists: [], // 仓库
                    TransferType: [], //业务类型
                    merchantDeliveryLists: [] //快递公司
                },
                outStockBatch: {
                    'assort-pick-list-empty': [], //未确认
                    'assort-pick-list-pick': [], //已拣货
                    'assort-pick-list-finish': [], //已完成
                    'assort-pick-list-invalid': [] //已取消
                },
                pagination: {
                    'assort-pick-list-empty': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }, //未确认
                    'assort-pick-list-pick': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },
                    'assort-pick-list-finish': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }, //已完成
                    'assort-pick-list-invalid': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    } //已取消
                }
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            getOutStockBatch: function () {
                var self = this;
                var pageStatusName = this.pageInfo.pageStatusName;
                var pagination = this.pagination[pageStatusName];
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStockBatch/ErpQueryOutStockBatch',
                    data: {
                        PageSize: pagination.pageSize,
                        PageNumber: pagination.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var outStockBatch = result.Data.PageData;
                        self.outStockBatch[pageStatusName] = [];
                        if (outStockBatch.length > 0) {
                            self.pagination[pageStatusName].all = result.Data.TotalPages;
                            self.pagination[pageStatusName].totalRecords = result.Data.TotalRecords;
                            outStockBatch.forEach(function (item) {
                                item.checked = false;
                            });
                            self.outStockBatch[pageStatusName] = outStockBatch;
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
                var pageStatusName = this.pageInfo.pageStatusName;
                var pagination = this.pagination[pageStatusName];
                if (pagination.cur == 1) {
                    this.getOutStockBatch();
                } else {
                    pagination.cur = 1;
                }
            },
            resetForm: function () {
                this.query = {
                    ID: '', //批次单ID
                    Status: this.query.Status, //拣货单状态
                    Sheet: [], //批次单号
                    OrderSheet: [], //订单号
                    OrderOutSheet: [], //订单外部交易号
                    ShopID: '', //网店ID
                    PayMode: '', //支付模式
                    PayTimeBeg: '', //订单付款时间开始
                    PayTimeEnd: '', //订单付款时间结束
                    CheckTimeBeg: '', //订单审核时间开始
                    CheckTimeEnd: '', //订单审核时间结束
                    CreateTimeBeg: '', //创建时间开始
                    CreateTimeEnd: '', //创建时间结束
                    LinkMan: '', //收货人
                    Address: '', //收货地址
                    Phone: '', //收货人电话
                    StockID: '', //仓库ID
                    TransferTypeDesc: '',//业务类型
                    MerchantDeliveryID: '', //快递公司ID
                    Invoice: '', //发票
                    Print: '', //打印快递单
                    MoneyBeg: '',
                    MoneyEnd: ''
                }
            },
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取销售平台
                servers.getBaseData('ShopList', false, function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取支付方式
                servers.getBaseData('PayModel', false, function (val) {
                    baseLookUp.payLists = val;
                });
                //获取仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockLists = val;
                });

                //业务类型
                servers.getBaseData('TransferType', false, function (val) {
                    baseLookUp.TransferType = val;
                });
                //获取所有快递公司
                servers.getBaseData('MerchantDeliveryList', false, function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
            }
        },
        route: {
            data: function (transition) {
                var pageStatusName = this.pageInfo.pageStatusName = transition.to.name;
                this.query.Status = this.pageInfo.pageStatusCode = outStockBatchCode[pageStatusName].code;
                if (this.outStockBatch[pageStatusName].length > 0) {

                } else {
                    this.getOutStockBatch();
                }
                transition.next();
            }
        },
        events: {
            'page-change': function () {
                this.getOutStockBatch();
            },
        },
        ready: function () {
            this.getBaseData();
            //dateTimePicker
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').datetimepicker({});
            $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').datetimepicker({});
            $("#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start").on("dp.change", function (e) {
                $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end").on("dp.change", function (e) {
                $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
            //启动toolTip
            $('.toolTip-ctrl').tooltip();

        },
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>