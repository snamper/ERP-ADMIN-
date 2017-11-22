<template>
    <div class="container-fluid">
        <div class="unify-head">
            会员信息
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
                        <label class="form-group-text">性别</label>
                        <select class="form-control" v-model="query.Sex">
                            <option value="">不限</option>
                            <option v-for="opt in SexList" value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">会员种类</label>
                        <select class="form-control" v-model="query.CustomerType">
                            <option value="">不限</option>
                            <option v-for="opt in MemberCustomerTypeList " value={{opt.Code}}>{{opt.Text}}</option>
                        </select>
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
                            <a v-link="{name:'member-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="StatusEnable( )" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="$dispatch('transmit', 'uploadModalShow', 29)">导入</a>
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
                                <th>性别</th>
                                <th>手机</th>
                                <th>会员种类</th>
                                <th>会员等级</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="opt in memberList">
                                <td class="sheet-item-state"><input type="checkbox" value="opt.MemberID" v-model="opt.checked"></td>
                                <!--<td><span>{{role.RoleID}}</span></td>-->
                                <td>{{opt.Code }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Name}}">{{opt.Name | truncationString}}</span></td>
                                <td>{{opt.SexName}}</td>
                                <td>{{opt.Mobile}}</td>
                                <td>{{opt.CustomerTypeName}}</td>
                                <td>{{opt.MemberGradeName }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note}}">{{opt.Note | truncationString}}</span></td>
                                <td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>
                                <td>
                                    <a data-toggle="tooltip" data-placement="top" title="查看订单">
                                        <span v-link="{name: 'member-order', query: {MemberID: opt.MemberID}}" class="click-element iconfont icon-look"></span>
                                    </a>
                                    <a v-link="'/member-edit?MemberID= '+ opt.MemberID" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="StatusEnable(opt.MemberID)" href="javascript:void(0)" v-if="opt.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="StatusDisable(opt.MemberID)" href="javascript:void(0)" v-if="opt.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="memberList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
                    fileType: 29
                },
                query: {
                    Code: '',
                    Name: '',
                    Sex: '',
                    CustomerType: '',
                    MemberGradeID: '',
                    Status: '',
                    Note: '',
                    MemberID: ''
                },
                paginationOptions:{
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                memberList: [],
                MemberCustomerTypeList: [],
                SexList: []
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            //性别列表
            getSexList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetSexList',
                }).done(function (result) {
                    self.SexList = result.Data;
//                    console.log();
                })
            },
            // 获取会员信息
            getMember: function () {
               var self = this;
                NProgress.start();
                servers.postAjax.bind(this) ({
                    url: '/BasMember/ErpQueryBasMember',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: {
                            Code: self.query.Code,
                            Name: self.query.Name,
                            Sex: self.query.Sex,
                            CustomerType: self.query.CustomerType,
                            Status: self.query.Status
                        }
                    }
                }).done(function (result) {
                    var member = result.Data.PageData;
                    self.memberList = [];
                    if (member.length > 0) {
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        member.forEach(function (item) {
                            item.checked = false;
                        });
                        self.memberList = member;
                    }
                    NProgress.done();

                })
            },
            //获取会员种类
            getMemberCustomerTypeList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetMemberCustomerTypeList',
                }).done(function (result) {
                    self.MemberCustomerTypeList = result.Data;
                })
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getMember();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //重置列表
            resetting: function () {
                var self = this;
                self.query = {
                    Code: '',
                    Name: '',
                    Sex: '',
                    CustomerType: '',
                    MemberGradeID: '',
                    Status: '',
                    Note: '',
                    MemberID: ''
                }
            },
            getIDGroup: function (MemberID) {
                var IDGroup = [];
                if (MemberID) {
                    IDGroup.push(MemberID);
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
            StatusEnable: function (MemberID) {
                var self = this;
                var text = '启用';
                var choiceMember = self.getIDGroup(MemberID);
                if (choiceMember.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些会员吗?',
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
                            url: '/BasMember/ErpStart',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceMember),

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
            // 禁用
            StatusDisable: function (MemberID) {
                var self = this;
                var text = '禁用';
                var choiceMember = self.getIDGroup(MemberID);
                if (choiceMember.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些会员吗?',
                        btnName: text,
                        events: {
                            confirm: 'StatusDisable'
                        }
                    });
                    self.$off('StatusDisable');

                    self.$once('StatusDisable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasMember/ErpEnable',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceMember),
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
                this.getMember();
            }
        },
        computed: commonMethods.selectAll('this.memberList', function (item) {
            return item.MemberID;
        }),
//        computed: commonMethods.selectAll('this.allVenderPrice', function (item) {
//            return item.CostID;
//        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getMember();
            this.getMemberCustomerTypeList();
            this.getSexList();
        },
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>