<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        买满送活动
                    </label>
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >序号</label>-->
                        <!--<input v-model="query." type="text" class="form-control" placeholder="多个订单用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >活动名</label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >操作类型</label>
                        <select v-model="query.OperType" class="form-control">
                            <option value="">不限</option>
                            <option v-for="payPresentOperType in baseLookup.payPresentOperType" value="{{payPresentOperType.Code}}">{{payPresentOperType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >金额数量</label>
                        <select v-model="query.PayFlag" class="form-control">
                            <option value="">请选择</option>
                            <option value="{{payPresentPayFlag.Code}}" v-for="payPresentPayFlag in baseLookUp.payPresentPayFlag">{{payPresentPayFlag.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >备注</label>
                        <input v-model="query.Note" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option value="">不限</option>
                            <option value="1">启用</option>
                            <option value="0">禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>价格开始</label>
                        <input v-model="query.BeginPay" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.BeginPay_To" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>价格结束</label>
                        <input v-model="query.EndPay" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.EndPay_To" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >创建人</label>
                        <input v-model="query.Creater" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >活动开始</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='activeStart-timepicker-start'>
                                <input v-model="query.BeginTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='activeStart-timepicker-end'>
                                <input v-model="query.BeginTime_To" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >活动结束</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='activeEnd-timepicker-start'>
                                <input v-model="query.EndTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='activeEnd-timepicker-end'>
                                <input v-model="query.EndTime_To" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >创建时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.CreateTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.CreateTime_To" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-start'>
                                <input v-model="query.EditTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-end'>
                                <input v-model="query.EditTime_To" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-button-group">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a v-link="{name:'bonuspacks-add'}" href="javascript:void(0)" class="btn btn-default">新增</a>
                            <a @click="payPresentStatusEnable('')" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="payPresentStatusDisable('')" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input v-model="selectAll" type="checkbox"></th>
                                <!--<th>序号</th>-->
                                <th>店铺</th>
                                <th>活动名</th>
                                <th>活动开始</th>
                                <th>活动结束</th>
                                <th>价格开始</th>
                                <th>价格结束</th>
                                <th>操作类型</th>
                                <th>金额数量</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody class="panel panel-default">
                                <tr class="sheet-list-item" v-for="payPresentItem in payPresent">
                                    <td class="sheet-item-state"><input type="checkbox" v-model="payPresentItem.checked"><span></span></td>
                                    <!--<td>{{payPresentItem.}}</td>-->
                                    <td>{{payPresentItem.ShopName}}</td>
                                    <td>{{payPresentItem.Name}}</td>
                                    <td><span v-if="payPresentItem.BeginTime" data-toggle="tooltip" data-placement="top" title="{{payPresentItem.BeginTime | truncationTimeString}}">{{payPresentItem.BeginTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="payPresentItem.EndTime" data-toggle="tooltip" data-placement="top" title="{{payPresentItem.EndTime | truncationTimeString}}">{{payPresentItem.EndTime | formatDateFormShow}}</span></td>
                                    <td>{{payPresentItem.BeginPay}}</td>
                                    <td>{{payPresentItem.EndPay}}</td>
                                    <td>{{payPresentItem.OperTypeName}}</td>
                                    <td>{{payPresentItem.PayFlagName}}</td>
                                    <td>{{payPresentItem.Creater}}</td>
                                    <td><span v-if="payPresentItem.CreateTime" data-toggle="tooltip" data-placement="top" title="{{payPresentItem.CreateTime | truncationTimeString}}">{{payPresentItem.CreateTime | formatDateFormShow}}</span></td>
                                    <td>{{payPresentItem.Editor}}</td>
                                    <td><span v-if="payPresentItem.EditTime" data-toggle="tooltip" data-placement="top" title="{{payPresentItem.EditTime | truncationTimeString}}">{{payPresentItem.EditTime | formatDateFormShow}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{payPresentItem.Note}}">{{payPresentItem.Note | truncationString}}</span></td>
                                    <td>{{payPresentItem.Status ? '已启用' : '已禁用'}}</td>
                                    <td>
                                        <a v-link="{name:'bonuspacks-record',query:{PayPresentID:payPresentItem.PayPresentID}}" data-toggle="tooltip" data-placement="top" title="赠送记录"><span class="iconfont icon-giving-records"></span></a>
                                        <a v-link="{name: 'bonuspacks-edit',query:{PayPresentID:payPresentItem.PayPresentID}}" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                        <a v-if="payPresentItem.Status == 0" @click="payPresentStatusEnable(payPresentItem.PayPresentID)" href="javascript:void(0)" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                        <a v-if="payPresentItem.Status == 1" @click="payPresentStatusDisable(payPresentItem.PayPresentID)" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                    </td>
                                </tr>
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
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    BeginPay: '', //开始价格开始段
                    BeginPay_To: '', //开始价格结束段
                    BeginTime: '', //活动开始时间开始段
                    BeginTime_To: '', //活动开始时间结束段
                    CreateTime: '', //创建时间开始
                    CreateTime_To: '', //创建时间结束
                    Creater: '', //创建人
                    EditTime: '', //修改时间开始
                    EditTime_To: '', //修改时间结束
                    Editor: '', //修改人
                    EndPay: '', //结束价格开始段
                    EndPay_To: '', //结束价格结束段
                    EndTime: '', //活动结束时间开始段
                    EndTime_To: '', //活动结束时间结束段
                    Name: '', //活动名
                    Note: '', //备注
                    OperType: '', //操作类型
                    PayFlag: '', //金额数量
                    ShopID: '', //店铺
                    Status: '' //状态
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                payPresent: [],
                baseLookUp: {
                    shopLists: [],  //店铺
                    payPresentOperType: [], //操作类型
                    payPresentPayFlag: [] //金额数量
                }
            }
        },
        methods: {

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
                        contentText: '请至少选中一个活动'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //获取套餐列表
            getPayPresent: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusPayPresent/ErpQueryBusPayPresent',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        var payPresent = result.Data.PageData;
                        self.payPresent = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (payPresent.length > 0) {
                            payPresent.forEach(function (payPresentItem) {
                                payPresentItem.checked = false;
                            });
                            self.payPresent = payPresent;
                        }
                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getPayPresent();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //启用
            payPresentStatusEnable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceGroup = self.getIDGroup(ItemID);
                if (choiceGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要启用这些活动吗?',
                        btnName: '启用',
                        events: {
                            confirm: 'payPresentStatusEnable'
                        }
                    });
                    self.$off('payPresentStatusEnable');

                    self.$once('payPresentStatusEnable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusPayPresent/ErpStart',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '启用成功!'
                                });
                                self.getPayPresent();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            payPresentStatusDisable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceGroup = self.getIDGroup(ItemID);
                if (choiceGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要禁用这些活动吗?',
                        btnName: '禁用',
                        events: {
                            confirm: 'payPresentStatusDisable'
                        }
                    });
                    self.$off('payPresentStatusDisable');

                    self.$once('payPresentStatusDisable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusPayPresent/ErpEnable',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '禁用成功!'
                                });
                                self.getPayPresent();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取店铺
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取操作类型
                servers.getBaseData('BusPayPresentOperType',false,function (val) {
                    baseLookUp.payPresentOperType = val;
                });
                //获取金额数量下拉
                servers.getBaseData('BusPayPresentPayFlag',false,function (val) {
                    baseLookUp.payPresentPayFlag = val;
                });
            },
            //重置表单
            resetForm: function () {
                this.query = {
                    BeginPay: '', //开始价格开始段
                    BeginPay_To: '', //开始价格结束段
                    BeginTime: '', //活动开始时间开始段
                    BeginTime_To: '', //活动开始时间结束段
                    CreateTime: '', //创建时间开始
                    CreateTime_To: '', //创建时间结束
                    Creater: '', //创建人
                    EditTime: '', //修改时间开始
                    EditTime_To: '', //修改时间结束
                    Editor: '', //修改人
                    EndPay: '', //结束价格开始段
                    EndPay_To: '', //结束价格结束段
                    EndTime: '', //活动结束时间开始段
                    EndTime_To: '', //活动结束时间结束段
                    Name: '', //活动名
                    Note: '', //备注
                    OperType: '', //操作类型
                    PayFlag: '', //金额数量
                    ShopID: '', //店铺
                    Status: '' //状态
                }
            }
        },
        //在进入页面的时候先获取数据
        route: {
            data: function (transition) {
                //获取角色列表
                this.getPayPresent();
                this.getBaseData();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getPayPresent();
            }
        },
        computed: commonMethods.selectAll('this.payPresent', function (item) {
            return item.PayPresentID;
        }),
        components: {
            pagination: require('../../../../components/pagination.vue')
        },
        ready: function () {
            //dateTimePicker
            require('../../../../css/bootstrap-datetimepicker.css');
            require('../../../../js/plugins/bootstrap-datetimepicker');
            $('#activeStart-timepicker-start,#activeEnd-timepicker-start,#create-timepicker-start,#edit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#activeStart-timepicker-end,#activeEnd-timepicker-end,#create-timepicker-end,#edit-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#activeStart-timepicker-end,#activeEnd-timepicker-end,#create-timepicker-end,#edit-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#activeStart-timepicker-start,#activeEnd-timepicker-start,#create-timepicker-start,#edit-timepicker-start').datetimepicker('setEndDate',e.date);
            });
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>