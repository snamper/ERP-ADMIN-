<template>
    <div class="container-fluid">
        <div class="unify-head">
            库存调整单
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        订单状态:
                    </label>
                    <div class="checkbox-list  checkbox-listcenter ">
                        <label class="checkbox-inline" v-for="inAdjustFlag in baseLookUp.inAdjustFlag">
                            <input type="checkbox" value={{inAdjustFlag.Code}} v-model="query.Flags"><span>{{inAdjustFlag.Text}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单号用;隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>调整类型</label>
                        <select class="form-control" v-model="query.Type">
                            <option value="" selected>请选择</option>
                            <option value=0>期初</option>
                            <option value=1>其他</option>
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
                        <input v-model="query.BarCode | arrayToString" type="text" class="form-control"  placeholder="多个SKU用;隔开">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>商品货号</label>-->
                        <!--<input v-model="BarCode | arrayToString" type="text" class="form-control"  placeholder="">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品名称</label>
                        <input v-model="query.GoodName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>颜色</label>
                        <input v-model="query.GoodColor" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>尺码</label>
                        <input v-model="query.GoodSize" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单备注</label>
                        <input v-model="query.Note" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品数量</label>
                        <input v-model="query.BarCodeNum"  type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.BarCodeNum_to"  type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>明细数量</label>
                        <input v-model="query.Qty | decimalToInteger" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.Qty_to | decimalToInteger" type="number" min="0" class="form-control" placeholder="">
                    </div>
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
                        <label>审核时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='audit-timepicker-start'>
                                <input v-model="query.CheckTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='audit-timepicker-end'>
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
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a v-link="{name:'inv-adjust-add'}" class="btn btn-default">新增</a>
                            <!--<a href="javascript:void(0)" class="btn btn-default">批量新增</a>-->
                            <a @click="checkInvAdjust('')" href="javascript:void(0)" class="btn btn-default">批量审核</a>
                            <a @click="cancelInvAdjust('')" href="javascript:void(0)" class="btn btn-default">置为无效</a>
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
                                    <th>订单编码</th>
                                    <th>调整仓库</th>
                                    <th>商品数</th>
                                    <th>明细数</th>
                                    <th>调整类型</th>
                                    <th>下单时间</th>
                                    <th>审核时间</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="invAdjust in invAdjusts" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state"><input type="checkbox" v-model="invAdjust.checked"></td>
                                    <td><span>{{invAdjust.Flag | flagCodeToText baseLookUp.inAdjustFlag}}</span></td>
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{invAdjust.InvAdjustID}}"><span class="iconfont"></span><span>{{invAdjust.Sheet}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{invAdjust.StockName}}">{{invAdjust.StockName  | truncationString }} </span></td>
                                    <td>{{invAdjust.BarCodeNum}}</td>
                                    <td>{{invAdjust.Qty}}</td>
                                    <td>{{invAdjust.Type ? '其他' : '期初' }}</td>
                                    <td><span v-if="invAdjust.EditTime " data-toggle="tooltip" data-placement="top" title="{{invAdjust.EditTime  | truncationTimeString}}">{{invAdjust.EditTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="invAdjust.CheckTime" data-toggle="tooltip" data-placement="top" title="{{invAdjust.CheckTime | truncationTimeString}}">{{invAdjust.CheckTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="invAdjust.Note" data-toggle="tooltip" data-placement="top" title="{{ invAdjust.Note | truncationTimeString}}">{{invAdjust.Note |  truncationString }}</span></td>
                                    <td>
                                        <a v-if="invAdjust.Flag == 0" @click="checkInvAdjust(invAdjust.InvAdjustID)" href="javascript:void(0)" class="sheet-list-check"  data-toggle="tooltip" data-placement="top" title="审核"><span class="iconfont icon-verify"></span></a>
                                        <a v-if="invAdjust.Flag == 0" @click="cancelInvAdjust(invAdjust.InvAdjustID)" href="javascript:void(0)"><span class="iconfont icon-invalid" data-toggle="tooltip" data-placement="top" title="置为无效"></span></a></a>
                                        <a v-if="invAdjust.Flag == 0" v-link="{name:'inv-adjust-edit',query:{invAdjustID:invAdjust.InvAdjustID}}" class="sheet-list-edit"  data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                                    </td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="11">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{invAdjust.InvAdjustID}}">
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="goodInfo in invAdjust.GoodInfo_View">
                                                            <td>
                                                                <span>{{goodInfo.CustomNo}}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{goodInfo.CustomBC}}</span>
                                                            </td>
                                                            <td><span data-toggle="tooltip" data-placement="top" title="{{goodInfo.Name}}">{{goodInfo.Name  | truncationString }} </span></td>
                                                            <td><span data-toggle="tooltip" data-placement="top" title="{{goodInfo.SizeName}}">{{goodInfo.SizeName  | truncationString }} </span></td>
                                                            <td><span data-toggle="tooltip" data-placement="top" title="{{goodInfo.ColorName}}">{{goodInfo.ColorName  | truncationString }} </span></td>
                                                            <td><span data-toggle="tooltip" data-placement="top" title="{{goodInfo.MarketPrice}}">{{goodInfo.MarketPrice  | truncationString }}</span></td>
                                                            <td>
                                                                <span>{{goodInfo.Qty}}</span>
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
                        <div v-if="invAdjusts.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options = "paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                    Type: '',
                    MerchantID: '',
                    GoodName: '',
                    GoodColor: '',
                    GoodSize: '',
                    BarCode: [],
                    InvAdjustID: '',
                    StockID: '',
                    Note: '',
                    BarCodeNum: '',
                    BarCodeNum_to: '',
                    Qty: '',
                    Qty_to: '',
                    EditTime: '',
                    EditTime_to: '',
                    CheckTime: '',
                    CheckTime_to: '',
                    Flags: [],
                    Sheet: []
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                baseLookUp: {
                    inAdjustFlag: [
//                        {
//                            Text: '录入',
//                            Code: 0
//                        },
//                        {
//                            Text: '审核',
//                            Code: 10
//                        },
//                        {
//                            Text: '人工取消',
//                            Code: 97
//                        },
//                        {
//                            Text: '过期系统自动取消',
//                            Code: 98
//                        },
//                        {
//                            Text: '收货机构取消',
//                            Code: 99
//                        },
//                        {
//                            Text: '完成结束',
//                            Code: 100
//                        }
                    ],
                    stockList: [],
                },
                invAdjusts: [],
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
            //审核
            checkInvAdjust: function (ItemID) {
                var self = this;
                //确认提示
                var choiceInvAdjust = self.getIDGroup(ItemID);
                if (choiceInvAdjust.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要审核通过吗',
                        btnName: '审核',
                        events: {
                            confirm: 'checkInvAdjust'
                        }
                    });
                }
                self.$off('checkInvAdjust');

                self.$once('checkInvAdjust',function () {
                    //发送启用禁用请求
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusInvAdjust/ErpCheckInvAdjust',
                        contentType: 'application/json',
                        data: JSON.stringify(choiceInvAdjust)
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '审核成功!'
                            });
                            self.getInvAdjust();    //启用成功,重新刷新列表
                        }
                    });
                });
            },
            //取消
            cancelInvAdjust: function (ItemID) {
                var self = this;
                //确认提示
                var choiceInvAdjust = self.getIDGroup(ItemID);
                if (choiceInvAdjust.length > 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要取消吗',
                        btnName: '置为无效',
                        events: {
                            confirm: 'cancelInvAdjust'
                        }
                    });
                }
                self.$off('cancelInvAdjust');

                self.$once('cancelInvAdjust',function () {
                    //发送启用禁用请求
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusInvAdjust/ErpSave_Cancel',
                        contentType: 'application/json',
                        data: JSON.stringify(choiceInvAdjust)
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '置为无效成功!'
                            });
                            self.getInvAdjust();    //启用成功,重新刷新列表
                        }
                    });
                });
            },
            getInvAdjust: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusInvAdjust/ErpQueryInvAdjust',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1) {
                        var invAdjusts = result.Data.PageData;
                        self.invAdjusts = [];
                        if (invAdjusts.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            invAdjusts.forEach(function (invAdjust) {
                                invAdjust.checked = false;
                            });
                            self.invAdjusts = invAdjusts;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示:',
//                                contentText: '结果为空'
//                            });
                        }
                    }
                })
            },
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getInvAdjust();
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
                //获取所有入库类型
                servers.getBaseData('CustomerOrderType', false, function (val) {
                    baseLookUp.customerOrderType = val;
                });
                //获取所有状态
                servers.getBaseData('InvAdjustFlag',false,function (val) {
                    baseLookUp.inAdjustFlag = val;
                })
            },
            resetForm: function () {
                this.query = {
                    Type: '',
                    MerchantID: '',
                    GoodName: '',
                    GoodColor: '',
                    GoodSize: '',
                    BarCode: [],
                    InvAdjustID: '',
                    StockID: '',
                    Note: '',
                    BarCodeNum: '',
                    BarCodeNum_to: '',
                    Qty: '',
                    Qty_to: '',
                    EditTime: '',
                    EditTime_to: '',
                    CheckTime: '',
                    CheckTime_to: '',
                    Flags: [],
                    Sheet: []
                }
            }
        },
        computed: commonMethods.selectAll('this.invAdjusts', function (item) {
            return item.InvAdjustID;
        }),
        route: {
            data: function (transition) {
                this.getBaseLookUp();
                this.getInvAdjust();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getInvAdjust();
            }
        },
        ready: function () {
            //dateTimePicker
            var self = this;
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#order-timepicker-start,#audit-timepicker-start').datetimepicker({
//                locale: 'zh-cn',
//                format: "dd MM yyyy - hh:ii"
            });
            $('#order-timepicker-end,#audit-timepicker-end').datetimepicker({
//                locale: 'zh-cn',
//                format: 'yyyy-mm-dd hh:ii'
            });
            $("#order-timepicker-start,#audit-timepicker-start").on("dp.change",function (e) {
                $('#pay-timepicker-end,#audit-timepicker-end').data("DateTimePicker").minDate(e.date);
//                console.log(e.date('2016-04-13 下午3点37分'))
            });
            $("#order-timepicker-end,#audit-timepicker-end").on("dp.change",function (e) {
                $('#pay-timepicker-start,#audit-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });

            $('#order-timepicker-start,#audit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#order-timepicker-end,#audit-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#order-timepicker-end,#audit-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#order-timepicker-start,#audit-timepicker-start').datetimepicker('setEndDate',e.date);
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
.checkbox-listcenter{
    .checkbox-inline{
        input{
            vertical-align: middle;
            margin-top:-1px;

        }
    }
}
</style>