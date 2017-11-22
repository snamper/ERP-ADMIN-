<template>
    <div class="container-fluid">
        <div class="unify-head">
            采购入库单
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        订单状态:
                    </label>
                    <div class="checkbox-list checkbox-list-center">
                        <label class="checkbox-inline" v-for="flag in baseLookUp.inStockFlag">
                            <input v-model="query.Flags" type="checkbox" value="{{flag.Code}}"><span>{{flag.Text}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>通知单</label>
                        <input v-model="query.UpSheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>入库类型</label>-->
                        <!--<select class="form-control" v-model="query.TransferType">-->
                            <!--<option value="" selected>不限</option>-->
                            <!--<option value="{{customerOrderType.Code}}" v-for="customerOrderType in baseLookUp.customerOrderType">{{customerOrderType.Text}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>供应商</label>
                        <select class="form-control" v-model="query.OutID">
                            <option value="" selected>不限</option>
                            <option value="{{venderList.VenderID}}" v-for="venderList in baseLookUp.venderList">{{venderList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>仓库</label>
                        <select class="form-control" v-model="query.StockID">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>SKU</label>
                        <input v-model="query.CustomBC | arrayToString" type="text"  class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品名称</label>
                        <input v-model="query.GoodName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>颜色</label>
                        <input v-model="query.ColorName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>尺码</label>
                        <input v-model="query.SizeName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单备注</label>
                        <input v-model="query.Note" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>入库SKU</label>
                        <input v-model="query.BarCodeNum"  type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.BarCodeNum_to"  type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>入库明细</label>
                        <input v-model="query.Qty" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.Qty_to" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>审核时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='check-timepicker-start'>
                                <input v-model="query.CheckTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='check-timepicker-end'>
                                <input v-model="query.CheckTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出商品明细</a>-->
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <!--<div class="col-lg-12">-->
                    <!--<div class="sheet-tab">-->
                        <!--<div class="sheet-state">-->
                            <!--<a v-link="{name:'instock-purchase', activeClass: 'active'}" class="sheet-tab-link">采购入库</a>-->
                            <!--<a v-link="{name:'instock-refund', activeClass: 'active'}" class="sheet-tab-link">退货入库</a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <router-view :base-look-up.sync="baseLookUp" :pagination-options.sync="paginationOptions" :in-stocks.sync="inStocks"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                //基本参数
                baseLookUp: {
                    stockList: [],
                    inStockFlag: [],
                    venderList: []
//                    customerOrderType: []
                },
                query: {
                    Sheet: [],   //单号
                    UpSheet: [], //上游单据
                    MerchantID: '',
                    OutID: '', //供应商ID
                    StockID: '', //仓库ID
                    CustomBC: [], //SKU
                    Flags: [], //状态
                    GoodName: '', //商品名
                    ColorName: '', //颜色名
                    SizeName: '', //尺码名
                    Note: '', //备注
                    Qty: '', //明细数
                    Qty_to: '',
                    BarCodeNum: '',  //商品部类数
                    BarCodeNum_to: '',
                    TransferType: 12, //入库类型
                    CheckTime: '',
                    CheckTime_to: ''
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                inStocks: []
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //重置表单
            resetForm: function () {
                this.query = {
                    Sheet: [],   //单号
                    MerchantID: '',
                    OutID: '', //供应商ID
                    StockID: '', //仓库ID
                    CustomBC: [], //SKU
                    Flags: [], //状态
                    GoodName: '', //商品名
                    ColorName: '', //颜色名
                    SizeName: '', //尺码名
                    Note: '', //备注
                    Qty: '', //明细数
                    Qty_to: '',
                    BarCodeNum: '',  //商品部类数
                    BarCodeNum_to: '',
                    TransferType: this.query.TransferType, //入库类型
                    CheckTime: '',
                    CheckTime_to: ''
                }
            },
            //获取所有入库单
            getInStock: function () {
                var self = this;
                NProgress.start();
                var pagination = self.paginationOptions;
                servers.postAjax.bind(this)({
                    url: '/BusInStock/ErpQueryInStock',
                    data: {
                        PageSize: pagination.pageSize,
                        PageNumber: pagination.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1) {
                        var inStocks = result.Data.PageData;
                        self.inStocks = [];
                        if (inStocks.length > 0) {
                            pagination.all = result.Data.TotalPages;
                            pagination.totalRecords = result.Data.TotalRecords;
                            inStocks.forEach(function (inStock) {
                                inStock.checked = false;
                                inStock.InStock_Item_Views.forEach(function (inStockDetail) {
                                    inStockDetail.isSaved = true;
                                    inStockDetail._Qty = inStockDetail.Qty;
                                    inStockDetail._Price = inStockDetail.Price;
                                    inStockDetail._NotifyQty = inStockDetail.NotifyQty;
                                })
                            });
                            self.inStocks = inStocks;
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
                var pagination = this.paginationOptions;
                if (pagination.cur == 1) {
                    this.getInStock();
                } else {
                    pagination.cur = 1
                }
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockList = val;
                });
                //获取所有供应商
                servers.getBaseData('VenderList', false, function (val) {
                    baseLookUp.venderList = val;
                });
                //获取所有入库类型
//                servers.getBaseData('CustomerOrderType', false, function (val) {
//                    baseLookUp.customerOrderType = val;
//                });
                //获取采购单状态
                servers.getBaseData('InStockFlag', false, function (val) {
                    baseLookUp.inStockFlag = val;
                });
            }
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                //是否为退货入库单
                this.getInStock();

                transition.next();
                //路由切换,拦截page-change事件

            }
        },
        ready: function () {
            this.getBaseLookUp();
            //dateTimePicker
            require('../../../../css/bootstrap-datetimepicker.css');
            require('../../../../js/plugins/bootstrap-datetimepicker');
            $('#check-timepicker-start').datetimepicker({
//
            });
            $('#check-timepicker-end').datetimepicker({
//
            });
            $("#check-timepicker-start").on("dp.change",function (e) {
                $('#check-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#check-timepicker-end").on("dp.change",function (e) {
                $('#check-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });

            $('#check-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#check-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#check-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#check-timepicker-start').datetimepicker('setEndDate',e.date);
            });



        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getInStock();
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.checkbox-list-center{
    input{
        vertical-align: middle;
    }
}
</style>