<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        育成设置
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>推荐等级</label>
                        <select class="form-control" v-model="query.IntroducerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>被推荐等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>设置类型</label>
                        <select class="form-control" v-model="query.ConfigType">
                            <option value="">不限</option>
                            <option v-for="opt in PointConfigType " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value="1">启用</option>
                            <option value="-1">禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>审核人</label>
                        <input type="text" class="form-control" v-model="query.Editor">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >审核时间</label>
                        <date-picker :start-date.sync="query.BegEditTime" :end-date.sync="query.EndEditTime"></date-picker>
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
                            <a v-link="{name:'rebates-set-up-add'}" class="btn btn-default">新增</a>
                            <a @click="updateStatusStart( )" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="updateStatusEnd( )" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>推荐等级</th>
                                <th>被推荐等级</th>
                                <th>设置类型</th>
                                <th>操作类型</th>
                                <th>开始范围</th>
                                <th>结束范围</th>
                                <th>折扣/金额</th>
                                <th>修改时间</th>
                                <th>修改人</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in PointConfigList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td>{{opt.IntroducerGrade.Name}}</td>
                                <td>{{opt.CustomerGrade.Name}}</td>
                                <td>{{opt.ConfigTypeDesc}}</td>
                                <td>{{opt.OperTypeDesc}}</td>
                                <td>{{opt.BeginValue}}</td>
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                <td>{{opt.EndValue}}</td>
                                <td>{{opt.ConfigType == 0 ? opt.Point.toFixed(2) + '%' :  opt.Point.toFixed(2) }}</td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="2016-09-08">2016-09-08</span></td>-->
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>
                                <td>{{opt.Editor}}</td>
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                <td :class="[ opt.Status == 1 ? '' : 'state-forbid']">{{opt.Status == 1 ? "已启用" : "已禁用"}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>
                                <td>
                                    <a v-link="{name:'rebates-set-up-see',query: {id: opt.DistributorIntroducerPointConfigID}}"
                                    data-toggle="tooltip" data-placement="top" title="查看"><span class="iconfont icon-look"></span></a>

                                    <a v-link="{name:'rebates-set-up-edit',query: {id: opt.DistributorIntroducerPointConfigID}}"
                                    data-toggle="tooltip" data-placement="top" title="修改">
                                        <span class="btn-change iconfont icon-alter"></span>
                                    </a>
                                    <a @click="updateStatusStart(opt.DistributorIntroducerPointConfigID)" href="javascript:void(0)" v-if="opt.Status!=1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用">
                                        <span class="iconfont icon-play"></span>
                                    </a>
                                    <a @click="updateStatusEnd(opt.DistributorIntroducerPointConfigID)" href="javascript:void(0)" v-if="opt.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用">
                                        <span class="iconfont icon-forbid"></span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="PointConfigList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
                query: {
                    IntroducerGradeID: '', //	推荐人等级ID	string
                    CustomerGradeID: '', //	被推荐人等级ID	string
                    ConfigType: '', //设置类型
                    Status: '', //	状态	number
                    Editor: '', //	审核人	string
                    BegEditTime: '', //	开始审核时间	string
                    EndEditTime: '' //	结束审核时间	string
                },
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                show: {
                    flog: false
                },
                PointConfigType: [], //设置类型
                CustomerGradeList: [], //等级
                PointConfigList: [], //育成奖励列表
            }
        },
        methods: {
//            uploadFile: function () {
//                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
//            },
            //获取设置类型下拉列表 BaseLookup/GetDistributorIntroducerPointConfigType
            getPointConfigType() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorIntroducerPointConfigType'
                }).then(function (result) {
                    if (result.ResultCode == 1) {
                        self.PointConfigType = result.Data;
                    }
                })
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
            //重置列表
            resetting() {
                this.query = {
                    IntroducerGradeID: '', //	推荐人等级ID	string
                    CustomerGradeID: '', //	被推荐人等级ID	string
                    ConfigType: '', //设置类型
                    Status: '', //	状态	number
                    Editor: '', //	审核人	string
                    BegEditTime: '', //	开始审核时间	string
                    EndEditTime: '' //	结束审核时间	string
                }
            },
            //查询育成奖励配置档案信息
            getPointConfigList() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorIntroducerPointConfig/ErpQueryBasDistributorIntroducerPointConfig',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                        var date = result.Data.PageData;
                        self.PointConfigList = [];
                        if (date.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            date.forEach(function (item) {
//                                if (item.ConfigType == 1) {
//                                    item.BeginValue == item.BeginValue.toFixed(2) || '0.00';
//                                    item.EndValue == item.EndValue.toFixed(2) || '0.00';
//                                }
                                item.checked = false;
                            });
                            self.PointConfigList = date;
//                            console.log(self.auditList);
                        }
                    NProgress.done();
                })
            },
            //搜索
            search() {
                if (this.paginationOptions.cur == 1) {
                    this.getPointConfigList();
                } else {
                    this.paginationOptions.cur = 1
                }
            },

            getIDGroup: function (id) {
                var IDGroup = [];
                if (id) {
                    IDGroup.push(id);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //启用
            updateStatusStart(id) {
                var self = this;
                var choiceMember = self.getIDGroup(id);
                if (choiceMember.length > 0) {
                    var list = [];
                    choiceMember.forEach(function (id) {
                        list.push(id)
                    });
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要启用吗?',
                        events: {
                            confirm: 'updateStatusStart'
                        }
                    });
                    self.$off('updateStatusStart');
                    self.$once('updateStatusStart', function () {
                        servers.postAjax.bind(this)({
                            url: '/BasDistributorIntroducerPointConfig/ErpUseBasDistributorIntroducerPointConfig',
                            contentType: 'application/json',
                            data: JSON.stringify(list)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '启用成功！'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });

                    });
                }
            },
            //禁用
            updateStatusEnd(id) {
                var self = this;
                var choiceMember = self.getIDGroup(id);
                if (choiceMember.length > 0) {
                    var list = [];
                    choiceMember.forEach(function (id) {
                        list.push(id)
                    })
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要禁用吗?',
                        events: {
                            confirm: 'updateStatusEnd'
                        }
                    });
                    self.$off('updateStatusEnd');
                    self.$once('updateStatusEnd', function () {
                        servers.postAjax.bind(this)({
                            url: '/BasDistributorIntroducerPointConfig/ErpDisableBasDistributorIntroducerPointConfig',
                            contentType: 'application/json',
                            data: JSON.stringify(list)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '禁用成功！'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getPointConfigList();
            }
        },
        computed: commonMethods.selectAll('this.PointConfigList', function (item) {
            return item.DistributorIntroducerPointConfigID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            datePicker: require('../../../components/date_picker.vue'),
        },
        ready: function () {
            this.getPointConfigType ();
            this.getCustomerGradeList();
            this.getPointConfigList();
        }
    };

</script>

<style rel="stylesheet/less" lang="less" >

</style>

