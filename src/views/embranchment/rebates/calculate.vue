<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        育成计算
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <!--<a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>-->
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>代理等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>代理编号</label>
                        <input type="text" class="form-control" v-model="query.CustomerCode">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>代理名称</label>
                        <input type="text" class="form-control" v-model="query.CustomerName">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>返回月份<span class="form-required-mark">*</span></label>
                        <select  class="form-control" v-model="query.Month">
                            <option v-for="n in 12" value="{{n + 1}}">{{n + 1}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="0">未结算</option>
                            <option value="1">已结算</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <label>批量操作：</label>
                            <a @click="getPoint()" href="javascript:void(0)" class="btn btn-default">生成待返金额</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>代理编号</th>
                                <th>代理等级</th>
                                <th>代理姓名</th>
                                <th>当月销量</th>
                                <th>当月金额</th>
                                <th>关系人销量</th>
                                <th>关系人销售金额</th>
                                <th>提成金额</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in CalculateList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td>{{opt.CustomerCode}}</td>
                                <td>{{opt.CustomerGradeName}}</td>
                                <td>{{opt.CustomerName}}</td>
                                <td>{{opt.TotalCurrOrderNum}}</td>
                                <td>{{opt.TotalCurrOrderMoney ? opt.TotalCurrOrderMoney.toFixed(2) : '0.00'}}</td>
                                <td>{{opt.TotalOrderNum}}</td>
                                <td>{{opt.TotalOrderMoney ? opt.TotalOrderMoney.toFixed(2) : '0.00'}}</td>
                                <td>{{opt.TotalPoint ? opt.TotalPoint.toFixed(2) : '0.00' }}</td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <td>
                                    <a v-link="{name: 'rebates-calculate-flow', query: {CustomerID: opt.CustomerID,Month: query.Month,CustomerCode: opt.CustomerCode}}" data-toggle="tooltip" data-placement="top" title="育成记录"><span class="iconfont icon-look"></span></a>
                                </td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="CalculateList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
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
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0,
                    PageNumber: 1,
                },
                query: {
                    CustomerCode: '', //	客户编号	string
                    CustomerGradeID: '', //	客户等级ID	string
                    CustomerID: '',	//	string
                    CustomerName: '', //	客户名称	string
                    Month: '', //	月份	number	月份必填，1-12
                    Status: 0  //状态 0：未结算  1：已结算
                },
                show: {
                    flog: false
                },
                CalculateList: [], //育成列表
                CustomerGradeList: [], //客户等级
                Month: ''
            }
        },
        methods: {
            //收展多余的选项
            toggleItem() {
                this.show.flog = !this.show.flog;
            },
            //获取当前月份
            getMonth() {
                var self = this;
                var myDate = new Date();
                var M = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
                if (M == 0) {
                    self.query.Month = 12;
                    self.Month = 12;
                } else {
                    self.query.Month = M;
                    self.Month = M;
                }
            },
            //重置列表
            resetting() {
                this.query= {
                    CustomerCode: '', //	客户编号	string
                    CustomerGradeID: '', //	客户等级ID	string
                    CustomerID: '',	//	string
                    CustomerName: '', //	客户名称	string
                    Month: this.Month, //	月份	number	月份必填，1-12
                    Status: 0
                }
            },
            //生成返点
            getPoint(id) {
                var self = this;
                var PointDate = this.checkedGroups || [];
                if (PointDate.length > 0) {
                    var list = PointDate.map(function (item) {
                        return {
                            CustomerID: item.CustomerID,
                            Month: self.query.Month,
                        }
                    });
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定对勾选的代理商生成返点金额吗?',
                        events: {
                            confirm: 'getPoint'
                        }
                    });
                    self.$off('getPoint');
                    self.$once('getPoint', function () {
                        servers.postAjax.bind(this)({
                            url: '/BasDistributorIntroducerCalculate/ErpBalanceCustomerDistributorIntroducerPoint',
                            contentType: 'application/json',
                            data: JSON.stringify(list)
                        }).then(function (result) {
                            if (result.ResultCode == 1) {
                                self.getCalculateList();
                            }
                        });
                    });

                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个育成'
                    });
                    return [];
                }

            },
            //获取客户等级列表
            getCustomerGradeList() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetBasCustomerGradeList'
                }).then(function (result) {
                    if (result.ResultCode == 1) {
                        self.CustomerGradeList = result.Data;
                    }
                })
            },
            //获取育成信息列表
            getCalculateList() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorIntroducerCalculate/ErpQueryCustomerDistributorIntroducerPoint',
                    data: {
                        PageNumber: self.paginationOptions.PageNumber,
                        pageSize: self.paginationOptions.pageSize,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
//                        self.CalculateList = result.Data
                        var date = result.Data.PageData;
                        self.CalculateList = [];
                        if (date.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            date.forEach(function (item) {
                                item.checked = false;
                            });
                            self.CalculateList = date;
                        }
                        NProgress.done();
                    }
                    NProgress.done();
                })
            },
            //搜索
            search() {
                if (this.paginationOptions.cur == 1) {
                    this.getCalculateList();
                } else {
                    this.paginationOptions.cur = 1
                }
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getCalculateList();
            }
        },
        computed: commonMethods.selectAll('this.CalculateList', function (item) {
            return item;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
        },
        ready: function () {
            this.getMonth();
            this.getCustomerGradeList();
            this.getCalculateList();
        }
    };

</script>

<style rel="stylesheet/less" lang="less" >

</style>

