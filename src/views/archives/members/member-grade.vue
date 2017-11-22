<template>
    <div class="container-fluid">
        <div class="unify-head">
            会员等级
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>编码</label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>权重</label>
                        <input v-model="query.Power" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value=1>启用</option>
                            <option value=0>禁用</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <a v-link="{name:'member-grade-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="StatusEnable()" href="javascript:void(0)" class="btn btn-default">批量启用</a>
                            <a @click="StatusDisable()" href="javascript:void(0)" class="btn btn-default">批量禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>编码</th>
                                <th>名称</th>
                                <th>权重</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="opt in memberGradeList">
                                <td class="sheet-item-state"><input type="checkbox" value="opt.MemberGradeID" v-model="opt.checked"></td>
                                <!--<td><span>{{role.RoleID}}</span></td>-->
                                <td>{{opt.Code}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Name}}">{{opt.Name | truncationString}}</span></td>
                                <td>{{opt.Power}}</td>
                                <td :class="[opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note}}">{{opt.Note  | truncationString }} </span></td>
                                <td>
                                    <a v-link="{name: 'member-grade-edit',
                                         query: {
                                                MemberGradeID: opt.MemberGradeID,
                                                Code: opt.Code,
                                                Name: opt.Name,
                                                Power: opt.Power,
                                                Note: opt.Note,
                                                Status: opt.Status
                                                }
                                    }" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="StatusEnable(opt.MemberGradeID)" href="javascript:void(0)" v-if="opt.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="StatusDisable(opt.MemberGradeID)" href="javascript:void(0)" v-if="opt.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="memberGradeList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
                pageInfo: {
                    fileType: 28
                },
                query: {
                    Code: '',
                    Name: '',
                    Power: '',
                    Note: '',
                    Status: '',
                    MemberGradeID: '',
                },
                paginationOptions:{
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                memberGradeList: [],

            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            //获取会员等级信息
            getMemberGrade: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMemberGrade/ErpQueryBasMemberGrade',

                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
//                        SearchWhere:self.query
                        SearchWhere: {
                            Code: self.query.Code,
                            Name: self.query.Name,
                            Power: self.query.Power,
                            Status: self.query.Status
                        }
                    }
                }).done(function (result) {
                    var memberGrade = result.Data.PageData;
                    self.memberGradeList = [];
                    if (memberGrade.length > 0) {
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        memberGrade.forEach(function (item) {
                            item.checked = false;
                        });
                        self.memberGradeList = memberGrade;
                    }
                    NProgress.done();

                })
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getMemberGrade();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            getIDGroup: function (MemberGradeID) {
                var IDGroup = [];
                if (MemberGradeID) {
                    IDGroup.push(MemberGradeID);
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
            //重置列表
            resetting: function () {
                var self = this;
                self.query = {
                    Code: '',
                    Name: '',
                    Power: '',
                    Note: '',
                    Status: '',
                }

            },
            //启用
            StatusEnable: function (MemberGradeID) {
                var self = this;
                var text = '启用';
                var choiceMemberGrade = self.getIDGroup(MemberGradeID);
                if (choiceMemberGrade.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些商品等级价吗?',
                        btnName: text,
                        events: {
                            confirm: 'StatusEnable'
                        }
                    });
                    self.$off('StatusEnable');

                    self.$once('StatusEnable',function () {

                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasMemberGrade/ErpStart',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceMemberGrade),

                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            StatusDisable: function (MemberGradeID) {
                var self = this;
                var text = '禁用';
                var choiceMemberGrade = self.getIDGroup(MemberGradeID);
                if (choiceMemberGrade.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些商品等级价吗?',
                        btnName: text,
                        events: {
                            confirm: 'StatusEnable'
                        }
                    });
                    self.$off('StatusEnable');

                    self.$once('StatusEnable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasMemberGrade/ErpEnable',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceMemberGrade),
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
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
                this.getMemberGrade();
            }
        },
        computed: commonMethods.selectAll('this.memberGradeList', function (item) {
            return item.MemberGradeID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getMemberGrade();
        },
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>