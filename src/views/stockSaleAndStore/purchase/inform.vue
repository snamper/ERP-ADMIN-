<template>
<div class="sell-hd-fz">
    <h3>来货计划</h3>
</div>
    <div class="query-form" @keyup.enter.stop="postQuery">

    <div class="query-header query-header-margin">
        <div class="checkbox-group">
            <label class="checkbox-title">
                订单状态:
            </label>
            <div class="checkbox-list">
                <label class="checkbox-inline" v-for="label in statusList">
                    <input v-model="query.Flag" type="checkbox" value="{{label.Code}}" code="{{label.Code}}"><span>{{label.Text}}</span>
                </label>
            </div>
            <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
        </div>
    </div>
    <div class="query-body form-inline query-detail" id="query-detail">
        <div class="row expand-show" :class="{'show-expand' : show.flog}">
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 订单编号</label>
                <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个单号之间用;隔开">
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 生产订单编号</label>
                <input v-model="query.BusManuOrderSheet" type="text" class="form-control" placeholder="多个单号之间用;隔开">
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 送货单号</label>
                <input v-model="query.OutSheetID" type="text" class="form-control" placeholder="">
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 供应商</label>
                <select class="form-control" name="" v-model="query.VenderID">
                    <option value="">不限</option>
                    <option v-for="opt in venderList" value="{{opt.VenderID}}">{{opt.Name}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 收货仓库</label>
                <select class="form-control" name=""  v-model="query.StockID">
                    <option value="">不限</option>
                    <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                </select>
            </div>
            <div class="form-group col-lg-6 col-md-12 col-sm-12">
                <label>来货日期</label>
                <div class='input-group date' id='PurDate-timepicker'>
                    <input v-model="query.PurDate | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <span style="line-height:23px;"> ~ </span>
                <div class='input-group date' id='PurDate-to-timepicker'>
                    <input v-model="query.PurDate_To | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>

            <div class="form-group col-lg-6 col-md-12 col-sm-12">
                <label>交货日期</label>
                <div class='input-group date' id='recDate-timepicker'>
                    <input v-model="query.RecDate | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <span style="line-height:23px;"> ~ </span>
                <div class='input-group date' id='recDate-to-timepicker'>
                    <input v-model="query.RecDate_To | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
        </div>
        <div class="query-button-group">
            <a @click="postQuery" href="javascript:void(0)" class="btn btn-default">搜索</a>
            <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
        </div>
    </div>
    </div>
    <div class="sheet-list sheet-list-margin sheet-list-inform">
    <div class="row">
        <div class="col-lg-12">
            <div class="batch-operation">
                <label class="batch-operation-title">批量操作:</label>
                <div class="batch-operation-group">
                    <a href="#!/JXC/inform-add" class="btn btn-default">新增</a>
                    <!-- <a href="javascript:void(0)" class="btn btn-default" @click="dispatch('transmit', 'uploadModalShow', '')">批量导入</a> -->
                    <a href="javascript:void(0)" class="btn btn-default" @click="checkList([], 30)">批量审核</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="checkList([], 97)">取消订单</a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive sheet-list-table-bd">
                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header sheet-list-header-bd">
                        <tr>
                            <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                            <th>状态</th>
                            <th>订单编号</th>
                            <th>生产订单编号</th>
                            <th>供应商</th>
                            <th>收货仓库</th>
                            <th>SKU</th>
                            <th>明细</th>
                            <th>送货单号</th>
                            <th>下单时间</th>
                            <th>来货日期</th>
                            <th>交货日期</th>
                            <th>修改人</th>
                            <th>修改时间</th>
                            <th>审核人</th>
                            <th>审核时间</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-for="t in tableList" class="panel panel-default">
                        <tr class="sheet-list-item">
                            <td class="sheet-header-state"><input type="checkbox" v-model="t.checked"></td>
                            <td>
                                {{t.Flag == 100 ? '已完成' : ''}}
                                {{t.Flag == 97 ? '已取消' : ''}}
                                {{t.Flag == 30 ? '已审核' : ''}}
                                {{t.Flag == 0 ? '未审核' : ''}}
                            </td>
                            <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{t.PlanReceiptID}}"><span class="iconfont"></span><span>{{t.Sheet}}</span></td>
                            <td>{{t.BusManuOrderSheet}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.VenderName}}">{{t.VenderName | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.StockName}}">{{t.StockName | truncationString}}</span></td>
                            <td>{{t.BarCodeNum}}</td>
                            <td>{{t.Qty}}</td>
                            <td>{{t.OutSheetID}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.EditTime | truncationTimeString}}">{{t.EditTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.PurDate | truncationTimeString}}">{{t.PurDate | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.RecDate | truncationTimeString}}">{{t.RecDate | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Editor}}">{{t.Editor | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.EditTime | truncationTimeString}}">{{t.EditTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Checker }}">{{t.Checker | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.CheckTime | truncationTimeString}}">{{t.CheckTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Note}}">{{t.Note | truncationString}}</td>
                            <td>
                            <a data-toggle="tooltip" data-placement="top" title="编辑" href="#!/JXC/inform-edit?id={{t.PlanReceiptID}}">
                                <span class="click-element iconfont icon-alter" v-if="t.Flag === 0"></span>
                            </a>

                                <span class="click-element" v-if="t.Flag === 0"></span>
                                <a data-toggle="tooltip" data-placement="top" title="审核">
                                <span class="click-element iconfont icon-verify" v-if="t.Flag === 0" @click="checkList([t], 30)"></span>
                                </a>
                                <span class="click-element" v-if="t.Flag === 0"></span>
                                <a data-toggle="tooltip" data-placement="top" title="取消">
                                <span class="click-element iconfont icon-cancel" v-if="t.Flag === 0" @click="checkList([t], 97)"></span>
                                </a>
                                <a data-toggle="tooltip" data-placement="top" title="查看" href="#!/JXC/inform-see?id={{t.PlanReceiptID}}">
                                <span class="click-element iconfont icon-look" v-if="t.Flag !== 0" ></span>
                                </a>
                            </td>
                        </tr>
                        <tr class="sheet-list-detail">
                            <td colspan="18">
                                <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{t.PlanReceiptID}}">
                                    <jxc-detail :is-handle="getIsHandle(t.Flag)" :index = "$index" :list.sync="t.BusPlanReceiptGoodInfo_View" :type="3" model-name="inform" del-url="/BusPlanReceipt/ErpDelBusPlanReceiptItem"></jxc-detail>
                                    <div style="padding: 0 18px 10px;" v-if="getIsHandle(t.Flag)">
                                        <a @click.stop="submitItem(t, $index)" href="javascript:void(0)" class="btn btn-default">保存</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <!-- <tr class="sheet-list-detail">
                                <td colspan="12">
                                    <div class="tra" style="{{t.slideList ? 'opacity: 1; overflow:hidden; display:block;' : 'opacity: 0; overflow:hidden; display:none;'}}">

                                    </div>
                                </td>
                            </tr> -->
                    </tbody>
                </table>
                <pagination :pagination-options="paginationOptions"></pagination>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    var commonMethods = require('../../../js/common');

    var servers = require('../../../js/servers/servers');
    // 信息
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                venderList: [],
                stockList: [],
                statusList: [],
                query: {
                    MerchantID: '',
                    Flag: [],
                    Sheet: '',
                    OutSheetID: '',
                    ManuOrderID: '',
                    VenderID: '',
                    StockID: '',
                    PurDate: '',
                    PurDate_To: '',
                    RecDate: '',
                    RecDate_To: ''
                },
                tableList: [],
                paginationOptions:{
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                }
            }
        },
        components: {
            'jxc-detail': require('./JXC-detail.vue'),
            'pagination': require('../../../components/pagination.vue')
        },
        computed: commonMethods.selectAll('this.tableList', function (item) {
            return item
        }),
        events: {
            'page-change': function () {
                this.postQuery(true);
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            submitItem: function (obj, index) {
                var self = this,
                    list = [],
                    items = obj.BusPlanReceiptGoodInfo_View;

                self.$broadcast('submit-before', function (submitType) {
                    if (submitType) {
                        items = obj.BusPlanReceiptGoodInfo_View;
                        items.forEach(function (item, i) {
                            if (item.BarcodeID !== null && item.BarcodeID !== '') {
                                list.push({
                                    PlanReceiptID: item.PlanReceiptID || obj.PlanReceiptID,
                                    BarcodeID: item.BarcodeID,
                                    Qty: item.Qty,
                                    PlanReceiptItemID: item.PlanReceiptItemID,
                                    Price: item.Price
                                });
                            }
                        });

                        servers.postAjax.bind(self)({
                            url: '/BusPlanReceipt/ErpSaveBusPlanReceiptItemList',
                            data: {BusPlanReceiptItemList: list},
                            success: function (data) {
                                if (data.ResultCode === 1) {
                                    self.$dispatch('transmit', 'tip', {contentText: '保存成功！'});
                                    self.search();
                                }
                            }
                        })
                    }
                }, index)
            },
            checkClick: function (code) {
                var flag = this.query.Flag,
                    fix = true;

                for (var i in flag) {
                    if (flag[i] === code) {
                        fix = false;
                        flag.splice(i, 1);
                    }
                }

                if (fix) {
                    flag.push(code);
                }
            },
            getList: function () {
                var relf = this;
                servers.getAjax({
                    url: '/BaseLookup/GetBusPlanReceiptFlag',
                    success: function (data) {
                        relf.statusList = data.Data;
                    }
                });
            },
            postQuery: function (type) {
                var self = this;


                if ( this.paginationOptions.cur !== 1 && type !== true ) {

                    return this.paginationOptions.cur = 1;

                }

                // if(self.query.BusManuOrderSheet) self.query.BusManuOrderSheet = self.query.BusManuOrderSheet.split(';');

                servers.postAjax({
                    url: '/BusPlanReceipt/ErpQueryBusPlanReceipt',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: self.query
                    },
                    success: function (data) {

                        if ( data.ResultCode === -1 ) return alert(data.ErrorMessage);

                        for (var i = 0; i < data.Data.PageData.length; i++) {
                            data.Data.PageData[i].slideList = false;
                            data.Data.PageData[i].checked = false;
                        }
                        self.tableList = data.Data.PageData;

                        self.paginationOptions.all = data.Data.TotalPages;
                        self.paginationOptions.totalRecords = data.Data.TotalRecords;
                    }
                });
            },
            checkList: function (arr, flag) {

                var self = this,
                    // 过滤之后的数组
                    list = [];

                if ( arr.length === 0 ) arr = this.checkedGroups;
                if ( arr.length === 0 ) return this.$dispatch('transmit', 'tip', {contentText: '请先选择来货计划单!'});

                // 批量审核时过滤掉状态不为零的订单
                for (var i in arr) {
                    if (arr[i].Flag === 0) list.push(arr[i]);
                }

                if (list.length === 0) return this.$dispatch('transmit', 'tip', {contentText: '当前选择的所有订单已经完成相关操作'})

                servers.postAjax.bind(this)({
                    url: '/BusPlanReceipt/CheckBusPlanReceipt',
                    data: {
                        // [{ RetID: '67A1D46E-5734-4315-8480-9B55E7DF06BD', Sheet: 'BP20160511211414147515' }, { RetID: 'B8E85894-D518-4800-9BAE-E118A2DFB0F2', Sheet: 'BP20160511211549152702' }]
                        BusPlanReceiptList: list,
                        Flag: flag
                    },
                    success: function (data) {
                        if (data.ResultCode === 1) {
                            self.$dispatch('transmit', 'tip', {contentText: '操作成功!'});
                            self.postQuery();
                        }
                    }
                });
            },
            slideList: function (obj) {
                obj.slideList = !obj.slideList;
            },
            getIsHandle: function (flag) {
                return flag != 100 && flag != 97 && flag != 30;
            },
            //   重置
            resetting: function () {
                this.query = {
                    MerchantID: '',
                    Flag: [],
                    Sheet: '',
                    OutSheetID: '',
                    ManuOrderID: '',
                    VenderID: '',
                    StockID: '',
                    PurDate: '',
                    PurDate_To: '',
                    RecDate: '',
                    RecDate_To: ''
                }
            }
        },
        ready: function () {
            this.getList();
            this.postQuery();
            servers.getVenderList(this, 'venderList');
            servers.getStockList(this, 'stockList');

            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#PurDate-timepicker').datetimepicker({});
            $('#PurDate-to-timepicker').datetimepicker({});
            $('#recDate-timepicker').datetimepicker({});
            $('#recDate-to-timepicker').datetimepicker({});

            $("#PurDate-timepicker").on("dp.change",function (e) {
                $('#PurDate-to-timepicker').data("DateTimePicker").minDate(e.date);
            });
            $("#PurDate-to-timepicker").on("dp.change",function (e) {
                $('#PurDate-timepicker').data("DateTimePicker").maxDate(e.date);
            });
            $("#recDate-timepicker").on("dp.change",function (e) {
                $('#recDate-to-timepicker').data("DateTimePicker").minDate(e.date);
            });
            $("#recDate-to-timepicker").on("dp.change",function (e) {
                $('#recDate-timepicker').data("DateTimePicker").maxDate(e.date);
            });

            $('#PurDate-timepicker,#recDate-timepicker').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#PurDate-to-timepicker,#recDate-to-timepicker').datetimepicker('setStartDate',e.date);
            });
            $('#PurDate-to-timepicker,#recDate-to-timepicker').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#PurDate-timepicker,#recDate-timepicker').datetimepicker('setEndDate',e.date);
            });
        }
    }
</script>

<style type="text/css" lang="less">
.sheet-list-table{
    .table{
        .sheet-list-header-bd{
                    border-top: 1px solid #e5e5e5;

            tr{
                th{
                    border: 1px solid #e5e5e5;
                    border-left:0;
                    border-right:0;

                    text-align:center;

                    }
            }
        }
    }
}




    .sheet-list-table-bd{
        border:none;
        margin:0;
        .table-condensed{
            border: none;
        }
    }

    .sheet-list-margin{
        margin-left:15px;
    }
    .slide-click-element{
        cursor: pointer;
    }
    .slide-click-element:hover{
        border-radius: 5px 5px 0 0;
        background: #8996b0;
        color: #fff;
        padding: 5px 14px 5px 10px;
        vertical-align: middle;
    }
    .slide-click-element.click{
        border-radius: 5px 5px 0 0;
        background: #8996b0;
        color: #fff;
        padding: 5px 14px 5px 10px;
        vertical-align: middle;
    }
    .tra{
        transition: all .5s;
    }
    .sheet-list-inform{
        margin-left:0;
    }
    .query-header-margin{
        background: #fff;
    }

</style>
