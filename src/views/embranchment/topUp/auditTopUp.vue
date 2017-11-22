<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        充值审核
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select class="form-control" v-model="query.Flag">
                            <option value="">不限</option>
                            <option value="0">待审核</option>
                            <option value="100">已同意</option>
                            <option value="97">已驳回</option>
                            <option value="95">已撤销</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>代理等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in grade" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>代理名称</label>
                        <input type="text" class="form-control" v-model="query.Name">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>微信号</label>
                        <input type="text" class="form-control" v-model="query.Wechat">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input type="text" class="form-control" v-model="query.Checker">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改时间</label>
                        <date-picker :start-date.sync="query.ApplyBeginTime" :end-date.sync="query.ApplyEndTime"></date-picker>

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
                            <a @click="cancel(100)" href="javascript:void(0)" class="btn btn-default">同意</a>
                            <a @click="cancel(97)" href="javascript:void(0)" class="btn btn-default">驳回</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>状态</th>
                                <th>代理编号</th>
                                <th>代理等级</th>
                                <th>代理姓名</th>
                                <th>充值金额</th>
                                <th>创建时间</th>
                                <th>修改时间</th>
                                <th>修改人</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in auditList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td>
                                    <span  :class="[ opt.Flag == 0 ? 'state-forbid' : '']" v-if="opt.Flag === 0">待审核</span>
                                    <span v-if="opt.Flag === 97">已驳回</span>
                                    <span v-if="opt.Flag === 95">已撤销</span>
                                    <span v-if="opt.Flag === 100">同意</span>
                                <!-- {{opt.Flag === 0 ? "待审核" : opt.Flag === 97 ? "已驳回" : "同意"}} -->
                                </td>
                                <td>{{opt.Code}}</td>
                                <td>{{opt.GradeName}}</td>
                                <!--<td class="state-forbid" >否</td>-->
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                <td>{{opt.Name}}</td>
                                <td>{{opt.Value}}</td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.ApplyTime}}">{{opt.ApplyTime | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.CheckTime}}">{{opt.CheckTime | formatDateFormShow}}</span></td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
                                <td>{{opt.Checker}}</td>
                                <td>
                                    <a v-if="opt.Flag == 0" @click="cancel(100,opt.DistributorPayApplyID)" href="javascript:void(0)" data-placement="top" title="审核"><span class="iconfont icon-verify"></span></a>
                                    <a v-if="opt.Flag == 0" @click="cancel(97,opt.DistributorPayApplyID)" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="驳回"><span class="iconfont icon-forbid"></span></a>
                                    <a v-link="{name: 'audit-view',query: {id: opt.DistributorPayApplyID}}" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="查看图片"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="auditList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
                    totalRecords: 0
                },
                query: {
                    Flag: '',
                    CustomerGradeID: '',
                    Name:'',
                    Wechat: '',
                    ApplyBeginTime: '',
                    ApplyEndTime: '',
                    Checker: '',
                    DistributorPayApplyID: '',
                    Power: 0,
                },
                grade:[],
                auditList: [],
                show: {
                    flog: false
                },
            }
        },
        methods: {
            //获取代理等级
            getGrade() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorGradeList'
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.grade = result.Data;
                        console.log(self.grade);
                    }
                });
            },
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            getIDGroup: function (id) {
                var auditListID = [];
                if (id) {
                    auditListID.push(id);
                } else {
                    auditListID = this.checkedGroups;
                }
                if (auditListID.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return auditListID;
                }
            },
            //重置列表
            resetting() {
                this.query = {
                    Flag: '',
                    CustomerGradeID: '',
                    Name:'',
                    ApplyBeginTime: '',
                    ApplyEndTime: '',
                    Checker: '',
                    Power: 0,

                }
            },
            //搜索
            getAuditList() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusDistributorPayApply/ErpQueryDistributorPayApply',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function(result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var date = result.Data.PageData;
                        self.auditList = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (date.length > 0) {
                            date.forEach(function(date) {
                                date.checked = false;
                            });
                            self.auditList = date;
//                            console.log(self.auditList);
                        }
                    }
                });
            },
            //搜索
            search() {
                if (this.paginationOptions.cur == 1) {
                    this.getAuditList();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //是否同意充值
            cancel(type,id) {
                var self = this;
                var text;
                if (type == 100) {
                    text = "同意";
                    var yes = "充值成功！"
                }else {
                    text = "驳回";
                    var no = "驳回成功！"
                }
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText:'确定要' + text + '充值吗？',
                    events: {
                        confirm: 'cancel'
                    }
                });
                self.$off('cancel');
                self.$once('cancel', function () {
                    var idGroup = self.getIDGroup(id);
                    if (idGroup.length > 0) {
                        var list = [];
                        idGroup.forEach(function (id) {
                            list.push({
                                Flag: type,
                                DistributorPayApplyID: id
                            })
                        })
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusDistributorPayApply/ErpCheckDistributorPayApply',
                            contentType: 'application/json',
                            data: JSON.stringify(list)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                if (type == 100) {
                                    self.$dispatch('transmit', 'tip', {
                                        name: '提示:',
                                        contentText: yes
                                    });
                                } else {
                                    self.$dispatch('transmit', 'tip', {
                                        name: '提示:',
                                        contentText: no
                                    });
                                }
                                self.getAuditList();
                            }
                        });
                    }
                });
            },
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getAuditList();
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            datePicker: require('../../../components/date_picker.vue'),
        },
        computed: commonMethods.selectAll('this.auditList', function (item) {
            return item.DistributorPayApplyID
        }),
        ready: function () {
            this.getGrade();
            this.getAuditList();
            require('../../../css/bootstrap-datetimepicker.css');
        }
    };

</script>

<style rel="stylesheet/less" lang="less" >

</style>
