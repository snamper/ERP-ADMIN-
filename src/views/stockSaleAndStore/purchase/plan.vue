
self.search();<template>
    <div class="operate-form-title">
        <p>生产订单</p>
    </div>

    <div class="query-form">
        <div class="query-header query-header-margin">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    订单状态:
                </label>
                <div class="checkbox-list">
                    <label class="checkbox-inline" v-for="checkbox in selectList">
                        <input v-model="query.Flag" type="checkbox" value="{{checkbox.Code}}" code="{{checkbox.Code}}"><span>{{checkbox.Text}}</span>
                    </label>
                </div>
                <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
            </div>
        </div>
        <div class="query-body form-inline lifeng-css query-detail" id="query-detail" @keyup.enter.stop="search">
            <div class="row expand-show" :class="{'show-expand' : show.flog}">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>订单编号</label>
                    <input v-model="query.Sheet | arrayToString" type="text" class="form-control"  placeholder="多个订单编号以;分隔">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>下单号</label>
                    <input type="text" class="form-control" v-model="query.OrderSheetID"  placeholder="多个下单号以;分隔">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>供应商</label>
                    <select class="form-control" name="" v-model="query.VenderID">
                        <option value="">不限</option>
                        <option v-for="opt in venderList" value="{{opt.VenderID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-6 col-md-8 col-sm-12">
                    <label>下单时间</label>
                    <div class='input-group date' id='orderDate-timepicker'>
                        <input v-model="query.OrderDate | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                    <span style="line-height:23px;"> ~ </span>
                    <div class='input-group date' id='orderDate-to-timepicker'>
                        <input v-model="query.OrderDate_To | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group col-lg-6 col-md-8 col-sm-12">
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
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="col-lg-12">
            <div class="batch-operation">
                <label class="batch-operation-title">批量操作:</label>
                <div class="batch-operation-group">
                    <a v-link="{name: 'plan-add', params:{id: 'false', edit: 'false'}}" href="javascript:void(0)" class="btn btn-default">新增</a>
                    <!-- <a href="javascript:void(0)" class="btn btn-default" @click="dispatch('transmit', 'uploadModalShow', '')">批量导入</a> -->
                    <a href="javascript:void(0)" class="btn btn-default" @click="cancel([], 100)">批量审核</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="cancel([], 97)">取消订单</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="print()">打印单据</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>状态</th>
                                <th>订单编号</th>
                                <th>下单号</th>
                                <th>供应商</th>
                                <th>SKU</th>
                                <th>明细</th>
                                <th>下单时间</th>
                                <th>交货日期</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>审核人</th>
                                <th>审核时间</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class="panel panel-default" v-for="t in tableList">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="t.checked"></td>
                                <td>
                                    {{t.Flag === 0 ? '待审核' : ''}}
                                    {{t.Flag === 97 ? '已取消' : ''}}
                                    {{t.Flag === 100 ? '已完成' : ''}}
                                </td>
                                <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{t.ManuOrderID}}"><span class="iconfont"></span><span>{{t.Sheet}}</span></td>
                                <td>{{t.OrderSheetID}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.VenderName}}">{{t.VenderName | truncationString}}</span></td>
                                <td>{{t.BarCodeNum}}</td>
                                <td>{{t.Qty}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.OrderDate | truncationTimeString}}">{{t.OrderDate | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.RecDate | truncationTimeString}}">{{t.RecDate | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.Editor}}">{{t.Editor | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.EditTime | truncationTimeString}}">{{t.EditTime | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.Checker }}">{{t.Checker | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.CheckTime | truncationTimeString}}">{{t.CheckTime | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{t.Note}}">{{t.Note | truncationString}}</td>
                                <td>
                                    <a href="#!/JXC/plan-edit?id={{t.ManuOrderID}}"  data-toggle="tooltip" data-placement="top" title="编辑">
                                    <span v-if="t.Flag === 0" class="click-element iconfont icon-alter"></span>
                                    </a>

                                    <a href="javascript:;"  data-toggle="tooltip" data-placement="top" title="审核">
                                    <span v-if="t.Flag === 0" @click="cancel([t], 100)" class="click-element iconfont icon-verify"></span>
                                    </a>

                                    <a href="javascript:;"  data-toggle="tooltip" data-placement="top" title="取消">
                                    <span v-if="t.Flag === 0" @click="cancel([t], 97)" class="click-element iconfont icon-cancel"></span>
                                    </a>

                                    <a href="#!/JXC/plan-see?id={{t.ManuOrderID}}"  data-toggle="tooltip" data-placement="top" title="查看">
                                    <span v-if="t.Flag !== 0" v-link="{name: 'plan-see', query: {id: t.ManuOrderID}}" class="click-element iconfont icon-look"></span>
                                    </a>
                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="12">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{t.ManuOrderID}}">
                                        <jxc-detail :is-handle="getIsHandle(t.Flag)" :index = "$index" :list.sync="t.BusManuOrderGoodInfo_Views" :type="3" model-name="inform" del-url="/BusPlanReceipt/ErpDelManuOrderItem"></jxc-detail>
                                        <div style="padding: 0 18px 10px;" v-if="getIsHandle(t.Flag)">
                                            <a @click.stop="submitItem(t, $index)" href="javascript:void(0)" class="btn btn-default">保存</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var commonMethods = require('../../../js/common');
    // 采购计划单
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                selectAll: '',
                servers: require('../../../js/servers/servers'),
                query: {
                    ManuOrderID: '',
                    MerchantID: '',
                    VenderID: '',
                    Flag: [],
                    Note: '',
                    Sheet: '',
                    OrderDate: '',
                    OrderDate_To: '',
                    RecDate: '',
                    RecDate_To: ''
                },
                tableList: [],
                selectList: [],
                venderList: [],
                paginationOptions:{
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                }
            }
        },
        components:{
            'jxc-detail': require('./JXC-detail.vue'),
            'pagination': require('../../../components/pagination.vue')
        },
        computed: commonMethods.selectAll('this.tableList', function (item) {
            return item
        }),
        events: {
            'page-change': function () {
                this.search(true);
            },
            'refresh-list': function () {
                this.search();
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
                    items = obj.BusManuOrderGoodInfo_Views;

                self.$broadcast('submit-before', function (submitType) {
                    if (submitType) {
                        items = obj.BusManuOrderGoodInfo_Views;
                        items.forEach(function (item, i) {
                            if (item.BarcodeID !== null && item.BarcodeID !== '') {
                                list.push({
                                    ManuOrderID: item.ManuOrderID || obj.ManuOrderID,
                                    BarcodeID: item.BarcodeID,
                                    Qty: item.Qty,
                                    ManuOrderItemID: item.ManuOrderItemID,
                                    Price: item.Price
                                });
                            }
                        });

                        self.servers.postAjax.bind(self)({
                            url: '/BusManuOrder/ErpSaveManuOrderItemList',
                            data: {BusManuOrderItemList: list},
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
            // 重置
            resetting: function () {
                this.query = {
                    ManuOrderID: '',
                    MerchantID: '',
                    VenderID: '',
                    Flag: [],
                    Note: '',
                    Sheet: '',
                    OrderDate: '',
                    OrderDate_To: '',
                    RecDate: '',
                    RecDate_To: ''
                }
            },
            slideList: function (obj) {
                obj.slideList = !obj.slideList;
            },
//            checkClick: function (code) {
//                var flag = this.query.Flag,
//                    fix = true;
//
//                for (var i in flag) {
//                    if (flag[i] === code) {
//                        fix = false;
//                        flag.splice(i, 1);
//                    }
//                }
//
//                if (fix) {
//                    flag.push(code);
//                }
//            },
            getFlag: function () {
                var relf = this;

                this.servers.getAjax({
                    url: '/BaseLookup/GetBusManuOrderFlag',
                    success: function (data) {
                        relf.selectList = data.Data;
                    }
                });
            },
            getData: function () {
                var self = this;

                if (self.query.OrderSheetID) self.query.OrderSheetID = self.query.OrderSheetID.split(';');

                this.servers.postAjax.bind(this)({
                    url: '/BusManuOrder/ErpQueryManuOrder',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: self.query
                    },
                    success: function (data) {
                        if (data.ResultCode == -1) return self.$dispatch('transmit', 'tip', {contentText: data.ErrorMessage});
                        for (var i = 0; i < data.Data.PageData.length; i++) {
                            data.Data.PageData[i].slideList = false;
                            data.Data.PageData[i].checked = false;
                        }
                        self.tableList = data.Data.PageData;
                        console.log(self.tableList)

                        self.paginationOptions.all = data.Data.TotalPages;
                        self.paginationOptions.totalRecords = data.Data.TotalRecords;
                    }
                });
            },
            search: function (type) {

                if ( this.paginationOptions.cur !== 1 && type !== true ) {

                    return this.paginationOptions.cur = 1;

                }

                this.getData();
            },
            cancel: function (arr, flag) {
                var self = this,
                    // 过滤之后的数组
                    list = [];

                if ( arr.length === 0 ) arr = this.checkedGroups;
                if ( arr.length === 0 ) return this.$dispatch('transmit', 'tip', {contentText: '请先选择生产订单!'});

                // 批量审核时过滤掉状态不为零的订单
                for (var i in arr) {
                    if (arr[i].Flag === 0) list.push(arr[i]);
                }

                if (list.length === 0) return this.$dispatch('transmit', 'tip', {contentText: '当前选择的所有订单已经完成相关操作'})

                this.servers.postAjax.bind(this)({
                    url:'/BusManuOrder/ErpCheckManuOrder',
                    data: {BusManuOrderList: list, Flag: flag},
                    success: function (data) {
                        if (data.ResultCode === 1) {
                            // self.$dispatch('transmit', 'tip', {contentText: flag === 100 ? '审核成功！' : '取消成功！'});
                            self.$dispatch('transmit', 'tip', {contentText: '操作成功'});
                            self.search();
                        }
                    }
                })
            },
            getIDGroup: function (ItemID,key) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    ItemGroup.forEach(function (item) {
                        IDGroup.push(item[key]);
                    });
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
            //打印
            print: function () {
                var localStorageName = 'printPackSheetList';
                var type = 6;
                var printUrl = '#!/print-order';
                var sheetList = [];
                sheetList = this.getIDGroup('','Sheet');
                if (sheetList.length > 0) {
                    var sheetListStr = JSON.stringify(sheetList);
                    localStorage[localStorageName] = sheetListStr;
                    //localStorage[IDlist] = JSON.stringify(outStockBatchIDGroup)
                    if (type == 6) {   //装箱单
                        localStorage.upSheetList = JSON.stringify([]);
                    }
                    window.open(printUrl + '?BusinessType=' + type + '&autoPrint=' + false);
                }
                
            },
            // 单条审核
            audit: function (obj) {
                var data = {BusManuOrderList:[]};
                data.BusManuOrderList.push({ManuOrderID:obj.ManuOrderID});
                this.getAudit(data);
            },
            getIsHandle: function (flag) {
                return flag != 100 && flag != 97;
            }
        },

        ready: function () {
            this.getFlag();
            this.search();
            this.servers.getVenderList(this, 'venderList');
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#orderDate-timepicker').datetimepicker({});
            $('#orderDate-to-timepicker').datetimepicker({});
            $('#recDate-timepicker').datetimepicker({});
            $('#recDate-to-timepicker').datetimepicker({});

            $("#orderDate-timepicker").on("dp.change",function (e) {
                $('#orderDate-to-timepicker').data("DateTimePicker").minDate(e.date);
            });
            $("#orderDate-to-timepicker").on("dp.change",function (e) {
                $('#orderDate-timepicker').data("DateTimePicker").maxDate(e.date);
            });
            $("#recDate-timepicker").on("dp.change",function (e) {
                $('#recDate-to-timepicker').data("DateTimePicker").minDate(e.date);
            });
            $("#recDate-to-timepicker").on("dp.change",function (e) {
                $('#recDate-timepicker').data("DateTimePicker").maxDate(e.date);
            });

            $('#orderDate-timepicker,#recDate-timepicker').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#orderDate-to-timepicker,#recDate-to-timepicker').datetimepicker('setStartDate',e.date);
            });
            $('#orderDate-to-timepicker,#recDate-to-timepicker').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#orderDate-timepicker,#recDate-timepicker').datetimepicker('setEndDate',e.date);
            });

        }
    }
</script>
<style media="screen" lang="less">
    .slide-click-element{
        cursor: pointer;
    }
    .slide-click-element:hover{
        border-radius: 5px 5px 0 0;
        background: #8996b0;
        color: #333333;
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
    .checkbox-inline{
        margin-top:-1px;
    }





</style>
