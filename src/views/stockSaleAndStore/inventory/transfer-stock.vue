<template>
    <div class="container-fluid">
        <div class="unify-head">
            商品调仓单
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        订单状态:
                    </label>
                    <div class="checkbox-list">
                        <label class="checkbox-inline" v-for="transferFlag in baseLookUp.transferFlag">
                            <input type="checkbox" value={{transferFlag.Code}} v-model="query.Flags" style="vertical-align: middle;margin-top:-2px;margin-right:5px;"><span>{{transferFlag.Text}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>移入仓库</label>
                        <select class="form-control" v-model="query.InStockID">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>移出仓库</label>
                        <select class="form-control" v-model="query.OutStockID">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>SKU</label>
                        <input v-model="query.BarCode | arrayToString" type="text"  class="form-control"  placeholder="多个编号,用;隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品货号</label>
                        <input v-model="query.CustomNo | arrayToString" type="text"  class="form-control"  placeholder="多个编号,用;隔开">
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
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>移出SKU</label>-->
                        <!--<input v-model="query.OutGoodsNum"  type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.OutGoodsNum_to"  type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>移出明细数</label>-->
                        <!--<input v-model="query.OutDetailedNum" type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.OutDetailedNum_to" type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>移入SKU</label>-->
                        <!--<input v-model="query.InGoodsNum"  type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.InGoodsNum_to"  type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>移入明细数</label>-->
                        <!--<input v-model="query.InDetailedNum" type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.InDetailedNum_to" type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>下单时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='order-timepicker-start'>
                                <input v-model="query.EditTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='order-timepicker-end'>
                                <input v-model="query.EditTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>移出审核</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='checkout-timepicker-start'>
                                <input v-model="query.OutCheckTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='checkout-timepicker-end'>
                                <input v-model="query.OutCheckTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>移入审核</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='checkin-timepicker-start'>
                                <input v-model="query.InCheckTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='checkin-timepicker-end'>
                                <input v-model="query.InCheckTime_to | formatDate" type='text' class="form-control" />
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
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a v-link="{name:'transfer-stock-add'}" class="btn btn-default">新增</a>
                            <!--<a href="javascript:void(0)" class="btn btn-default">批量导入</a>-->
                            <a @click="checkTransferStock('')" href="javascript:void(0)" class="btn btn-default">审核</a>
                            <a @click="cancelTransferStock('')" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive table-responsivebd ">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>状态</th>
                                <th>订单编码</th>
                                <th>移出仓库</th>
                                <th>商品</th>
                                <th>明细</th>
                                <th>移入仓库</th>
                                <!--<th>移出商品</th>-->
                                <!--<th>移出明细</th>-->
                                <th>下单时间</th>
                                <th>审核时间</th>
                                <!--<th>审核时间</th>-->
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="busTransfer in busTransfers" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="busTransfer.checked"></td>
                                <td><span>{{busTransfer.Flag | flagCodeToText baseLookUp.transferStatusList}}</span></td>
                                <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{busTransfer.TransferID}}"><span class="iconfont"></span><span>{{busTransfer.Sheet}}</span></td>
                                <td>{{busTransfer.OutStockName}}</td>
                                <td>{{busTransfer.OutBarCodeNum}}</td>
                                <td>{{busTransfer.OutBarCodeCount}}</td>
                                <td>{{busTransfer.InStockName}}</td>
                                <!--<td>{{busTransfer.InBarCodeNum}}</td>-->
                                <!--<td>{{busTransfer.InBarCodeCount}}</td>-->
                                <td><span v-if="busTransfer.EditTime" data-toggle="tooltip" data-placement="top" title="{{busTransfer.EditTime  | truncationTimeString}}">{{busTransfer.EditTime | formatDateFormShow}}</span></td>
                                <td><span v-if="busTransfer.InCheckTime" data-toggle="tooltip" data-placement="top" title="{{busTransfer.InCheckTime  | truncationTimeString}}">{{busTransfer.InCheckTime | formatDateFormShow}}</span></td>
                                <!--<td><span v-if="busTransfer.OutCheckTime" data-toggle="tooltip" data-placement="top" title="{{busTransfer.OutCheckTime  | truncationTimeString}}">{{busTransfer.OutCheckTime | formatDateFormShow}}</span></td>-->
                                <td><span  data-toggle="tooltip" data-placement="top" title="{{busTransfer.Note }}">{{busTransfer.Note | truncationString}}</span></td>
                                <td>
                                    <a v-if="busTransfer.Flag == 0" @click="checkTransferStock(busTransfer.TransferID)" href="javascript:void(0)" class="sheet-list-check"  data-toggle="tooltip" data-placement="top" title="审核"><span class="iconfont icon-verify"></span></a>
                                    <a v-if="busTransfer.Flag == 0" @click="cancelTransferStock(busTransfer.TransferID)" href="javascript:void(0)"  data-toggle="tooltip" data-placement="top" title="取消订单"><span class="iconfont icon-cancel"></span></a>
                                    <a v-if="busTransfer.Flag == 0" v-link="{name:'transfer-stock-edit',query:{transferID:busTransfer.TransferID}}" class="sheet-list-edit" data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="14">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{busTransfer.TransferID}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th>SKU</th>
                                                        <th>商品</th>
                                                        <th>商品名称</th>
                                                        <th>尺码</th>
                                                        <th>颜色</th>
                                                        <th>建议售价</th>
                                                        <th>移出数量</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="goodInfo in busTransfer.Transfer_Item_Views">
                                                        <td>{{goodInfo.CustomBC}}</td>
                                                        <td>{{goodInfo.CustomNo}}</td>
                                                        <td>{{goodInfo.Name}}</td>
                                                        <td>{{goodInfo.SizeName}}</td>
                                                        <td>{{goodInfo.ColorName}}</td>
                                                        <td>{{goodInfo.MarketPrice}}</td>
                                                        <td>{{goodInfo.Qty}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="busTransfers.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options = "paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div>{{query | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    Flags: [],
                    Sheet: [],      //单号
                    MerchantID: '',  //商家ID
                    OutStockID: '',   //出库仓库ID
                    InStockID: '',    //入库仓库ID
                    BarCode: [],      //SKU
                    CustomNo: [],     //商品货号
                    SizeName: '',     //规格名称
                    ColorName: '',    //颜色名称
                    GoodName: '',      //商品名称
                    Note: '',         //备注
                    OutGoodsNum: '',    //移出SKU
                    OutGoodsNum_to: '',
                    OutDetailedNum: '',   //移出名细
                    OutDetailedNum_to: '',
                    InGoodsNum: '',       //移入SKU
                    InGoodsNum_to: '',
                    InDetailedNum: '',    //移入明细
                    InDetailedNum_to: '',
                    EditTime: '',          //下单时间
                    EditTime_to: '',
                    InCheckTime: '',       //移入审核时间
                    InCheckTime_to: '',
                    OutCheckTime: '',      //移出审核时间
                    OutCheckTime_to: ''
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                busTransfers: [],
                baseLookUp: {
                    stockList: [],
                    transferStatusList: [],
                    transferFlag: []
                }
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
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
                        contentText: '请至少选中一个调整单'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //取消
            cancelTransferStock: function (ItemID) {
                var self = this;
                //确认提示
                var choiceTransferStock = self.getIDGroup(ItemID);
                if (choiceTransferStock.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消吗',
                        btnName: '置为无效',
                        events: {
                            confirm: 'cancelTransferStock'
                        }
                    });
                    self.$off('cancelTransferStock');

                    self.$once('cancelTransferStock',function () {
                            //发送启用禁用请求
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusTransfer/ErpSave_Cancel',
                                contentType: 'application/json',
                                data: JSON.stringify(choiceTransferStock)
                            }).done(function (result) {
                                NProgress.done();
                                if ( result.ResultCode == 1 ) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '置为无效成功!'
                                    });
                                    self.getTransferStock();    //启用成功,重新刷新列表
                                }
                            });
                    });
                }

            },
            //审核
            checkTransferStock: function (ItemID) {
                var self = this;
                //确认提示
                var choiceTransferStock = self.getIDGroup(ItemID);
                if (choiceTransferStock.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要审核通过吗',
                        btnName: '审核',
                        events: {
                            confirm: 'checkTransferStock'
                        }
                    });
                    self.$off('checkTransferStock');

                    self.$once('checkTransferStock',function () {

                            //发送启用禁用请求
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusTransfer/ErpCheckTransfer',
                                contentType: 'application/json',
                                data: JSON.stringify(choiceTransferStock)
                            }).done(function (result) {
                                NProgress.done();
                                if ( result.ResultCode == 1 ) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '审核成功!'
                                    });
                                    self.getTransferStock();    //启用成功,重新刷新列表
                                }
                            });
                    });
                }
            },
            getTransferStock: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusTransfer/ErpQueryTransfer',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.busTransfers = [];
                        var busTransfers = result.Data.PageData;
                        if (busTransfers.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            busTransfers.forEach(function (busTransfer) {
                                busTransfer.checked = false;
                            });
                            self.busTransfers = busTransfers;
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
                    this.getTransferStock();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockList = val;
                });
                servers.getBaseData('TransferStatusList',false,function (val) {
                    baseLookUp.transferStatusList = val;
                });
                servers.getBaseData('TransferFlag',false,function (val) {
                    baseLookUp.transferFlag = val;
                })
            },
            resetForm: function () {
                this.query = {
                    Flags: [],
                    Sheet: [],      //单号
                    MerchantID: '',  //商家ID
                    OutStockID: '',   //出库仓库ID
                    InStockID: '',    //入库仓库ID
                    BarCode: [],      //SKU
                    CustomNo: [],     //商品货号
                    SizeName: '',     //规格名称
                    ColorName: '',    //颜色名称
                    GoodName: '',      //商品名称
                    Note: '',         //备注
                    OutGoodsNum: '',    //移出SKU
                    OutGoodsNum_to: '',
                    OutDetailedNum: '',   //移出名细
                    OutDetailedNum_to: '',
                    InGoodsNum: '',       //移入SKU
                    InGoodsNum_to: '',
                    InDetailedNum: '',    //移入明细
                    InDetailedNum_to: '',
                    EditTime: '',          //下单时间
                    EditTime_to: '',
                    InCheckTime: '',       //移入审核时间
                    InCheckTime_to: '',
                    OutCheckTime: '',      //移出审核时间
                    OutCheckTime_to: ''
                }
            }
        },
        computed: commonMethods.selectAll('this.busTransfers', function (item) {
            return item.TransferID;
        }),
        route: {
            data: function (transition) {
                this.getTransferStock();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getTransferStock();
            }
        },
        ready: function () {
            //dateTimePicker
            this.getBaseLookUp();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#order-timepicker-start,#checkout-timepicker-start,#checkin-timepicker-start').datetimepicker({
//                locale: 'zh-cn',
//                format: "dd MM yyyy - hh:ii"
            });
            $('#order-timepicker-end,#checkout-timepicker-end,#checkin-timepicker-end').datetimepicker({
//                locale: 'zh-cn',
//                format: 'yyyy-mm-dd hh:ii'
            });
            $("#order-timepicker-start,#checkout-timepicker-start,#checkin-timepicker-start").on("dp.change",function (e) {
                $('#pay-timepicker-end,#checkout-timepicker-end,#checkin-timepicker-end').data("DateTimePicker").minDate(e.date);
//                console.log(e.date('2016-04-13 下午3点37分'))
            });
            $("#order-timepicker-end,#checkout-timepicker-end,#checkin-timepicker-end").on("dp.change",function (e) {
                $('#pay-timepicker-start,#checkout-timepicker-start,#checkin-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });

            $('#order-timepicker-start,#checkout-timepicker-start,#checkin-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#order-timepicker-end,#checkout-timepicker-end,#checkin-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#order-timepicker-end,#checkout-timepicker-end,#checkin-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#order-timepicker-start,#checkout-timepicker-start,#checkin-timepicker-start').datetimepicker('setEndDate',e.date);
            });



            //显示详情页
            $(document).on('show.bs.collapse','.sheet-list-collapse',function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse','.sheet-list-collapse',function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });

        },
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.table-responsivebd{
    border: 1px solid #e5e5e5;
    .table-condensed{
        border-left:none;
        border-top:none;

    }
}


</style>