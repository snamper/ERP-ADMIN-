<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        业绩奖励设置
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>客户等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">业绩类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.ConditionType">
                            <option value="">请选择</option>
                            <option v-for="opt in ConditionTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>含本人</label>
                        <select class="form-control" v-model="query.InCludeSelf">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
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
                        <label>是否同级</label>
                        <select class="form-control" v-model="query.NeedSameGrade">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
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
                        <label>修改人</label>
                        <input type="text" class="form-control" v-model="query.Editor">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改时间</label>
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
                            <a v-link="{name:'results-rebates-add'}" class="btn btn-default">新增</a>
                            <a @click="updateStatust(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="updateStatust(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>客户等级</th>
                                <th>层级</th>
                                <th>业绩类型</th>
                                <th>开始业绩</th>
                                <th>结束业绩</th>
                                <th>设置类型</th>
                                <th>折扣/金额</th>
                                <th>含本人</th>
                                <th>同等级</th>
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
                                <td>{{opt.CustomerGrade}}</td>
                                <td>{{opt.Level}}</td>
                                <td>{{opt.ConditionTypeDesc}}</td>
                                <td>{{opt.BeginValue}}</td>
                                <td>{{opt.EndValue}}</td>
                                <td>{{opt.ConfigTypeDesc}}</td>
                                <td>{{opt.Point}}</td>
                                <td>{{opt.InCludeSelfDesc}}</td>
                                <td>{{opt.NeedSameGradeDesc}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>
                                <td>{{opt.Editor}}</td>
                                <td :class="[ opt.Status == 1 ? '' : 'state-forbid']">{{opt.StatusDesc}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>
                                <td>
                                    <a v-link="{name:'results-rebates-see',query: {
                                        id: opt.DistributorAmountPointConfigID,
                                        CustomerGradeID: opt.CustomerGradeID,
                                        ConditionType: opt.ConditionType,
                                        ConfigType: opt.ConfigType,
                                        Level: opt.Level,
                                        BeginValue: opt.BeginValue,
                                        EndValue: opt.EndValue,
                                        Point: opt.Point,
                                        InCludeSelf: opt.InCludeSelf,
                                        NeedSameGrade: opt.NeedSameGrade,
                                        Note: opt.Note,
                                        Status: opt.Status
                                    }}"
                                       data-toggle="tooltip" data-placement="top" title="查看">
                                        <span class="btn-change iconfont icon-look"></span>
                                    </a>
                                    <a v-link="{name:'results-rebates-edit',query: {
                                        id: opt.DistributorAmountPointConfigID,
                                        CustomerGradeID: opt.CustomerGradeID,
                                        ConditionType: opt.ConditionType,
                                        ConfigType: opt.ConfigType,
                                        Level: opt.Level,
                                        BeginValue: opt.BeginValue,
                                        EndValue: opt.EndValue,
                                        Point: opt.Point,
                                        InCludeSelf: opt.InCludeSelf,
                                        NeedSameGrade: opt.NeedSameGrade,
                                        Note: opt.Note,
                                        Status: opt.Status
                                    }}"
                                    data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="btn-change iconfont icon-alter"></span>
                                    </a>
                                    <a @click="updateStatust(1,opt.DistributorAmountPointConfigID)" href="javascript:void(0)" v-if="opt.Status == 0" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用">
                                    <span class="iconfont icon-play"></span>
                                    </a>
                                    <a @click="updateStatust(0,opt.DistributorAmountPointConfigID)" href="javascript:void(0)" v-if="opt.Status == 1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用">
                                    <span class="iconfont icon-forbid"></span>
                                    </a>
                                </td>
                                <!--<td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">-->
                                <!--</td>-->
                                <!--<td>{{opt.IntroducerGrade.Name}}</td>-->
                                <!--<td>{{opt.CustomerGrade.Name}}</td>-->
                                <!--<td>{{opt.ConfigTypeDesc}}</td>-->
                                <!--<td>{{opt.BeginValue}}</td>-->
                                <!--&lt;!&ndash;<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>&ndash;&gt;-->
                                <!--<td>{{opt.EndValue}}</td>-->
                                <!--<td>{{opt.ConfigType == 0 ? opt.Point.toFixed(2) + '%' :  opt.Point.toFixed(2) }}</td>-->
                                <!--&lt;!&ndash;<td><span data-toggle="tooltip" data-placement="top" title="2016-09-08">2016-09-08</span></td>&ndash;&gt;-->
                                <!--&lt;!&ndash;<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>&ndash;&gt;-->
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <!--<td>{{opt.Editor}}</td>-->
                                <!--&lt;!&ndash;<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>&ndash;&gt;-->
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']">{{opt.Status == 1 ? "已启用" : "已禁用"}}</td>-->
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
                                <!--<td>-->
                                    <!--<a v-link="{name:'rebates-set-up-see',query: {id: opt.DistributorIntroducerPointConfigID}}"-->
                                       <!--data-toggle="tooltip" data-placement="top" title="查看"><span class="iconfont icon-look"></span></a>-->

                                    <!--<a v-link="{name:'rebates-set-up-edit',query: {id: opt.DistributorIntroducerPointConfigID}}"-->
                                       <!--data-toggle="tooltip" data-placement="top" title="修改">-->
                                        <!--<span class="btn-change iconfont icon-alter"></span>-->
                                    <!--</a>-->
                                    <!--<a @click="updateStatusStart(opt.DistributorIntroducerPointConfigID)" href="javascript:void(0)" v-if="opt.Status!=1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用">-->
                                        <!--<span class="iconfont icon-play"></span>-->
                                    <!--</a>-->
                                    <!--<a @click="updateStatusEnd(opt.DistributorIntroducerPointConfigID)" href="javascript:void(0)" v-if="opt.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用">-->
                                        <!--<span class="iconfont icon-forbid"></span>-->
                                    <!--</a>-->
                                <!--</td>-->
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
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        data: function () {
            return {
                query: {
//                    IntroducerGradeID: '', //	推荐人等级ID	string
                    CustomerGradeID: '', //	客户等级ID	string
                    ConditionType: '', //业绩类型
                    ConfigType: '', //设置类型
                    InCludeSelf: '', //	包含本人	string
                    NeedSameGrade: '', //是否同级
                    Status: '', //	状态	number
                    Editor: '', //	修改人	string
                    BegEditTime: '', //	开始修改时间	string
                    EndEditTime: '' //	结束修改时间	string
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
                ConditionTypeList: [] //业绩类型
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
            //获取业绩类型下拉列表
            getConditionTypeList() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorConditionType'
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.ConditionTypeList = result.Data;
                    }
                })
            },
            //重置列表
            resetting() {
                this.query = {
                    CustomerGradeID: '', //	客户等级ID	string
                    ConfigType: '', //设置类型
                    InCludeSelf: 'null', //	包含本人	string
                    NeedSameGrade: 'null', //是否同级
                    Status: '', //	状态	number
                    Editor: '', //	修改人	string
                    BegEditTime: '', //	开始修改时间	string
                    EndEditTime: '' //	结束修改时间	string
                }
            },
            //查询育成奖励配置档案信息
            getPointConfigList() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorAmountPointConfig/ErpQueryBasDistributorAmountPointConfig',
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
            updateStatust(status,id) {

                var self = this;
                var text = '';
                if(status == 0) {
                    text = "禁用"
                } else {
                    text = "启用"
                }
                var choiceMember = self.getIDGroup(id);
                if (choiceMember.length > 0) {
//                    var list = [];
//                    choiceMember.forEach(function (id,status) {
//                        list.push(id,status)
//                    });
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要' + text + '吗?',
                        events: {
                            confirm: 'updateStatusStart'
                        }
                    });
                    self.$off('updateStatusStart');
                    self.$once('updateStatusStart', function () {
                        servers.postAjax.bind(this)({
                            url: '/BasDistributorAmountPointConfig/UpdateStatus',
                            data: {
                                IDList: choiceMember,
                                Status: status
                            }
//                            contentType: 'application/json',
//                            data: JSON.stringify(list)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: text + '成功！'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });

                    });
                }
            },
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getPointConfigList();
            }
        },
        computed: commonMethods.selectAll('this.PointConfigList', function (item) {
            return item.DistributorAmountPointConfigID;
        }),
        components: {
            pagination: require('../../components/pagination.vue'),
            datePicker: require('../../components/date_picker.vue'),
        },
        ready: function () {
            this.getPointConfigType ();
            this.getCustomerGradeList();
            this.getPointConfigList();
            this.getConditionTypeList();
        }
    };

</script>

<style rel="stylesheet/less" lang="less" >

</style>

