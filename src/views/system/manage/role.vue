<template>
    <div class="container-fluid">
        <div class="unify-head">
            角色管理
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="">
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
                            <a v-link="{name:'role-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="roleStatusEnable('')" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="roleStatusDisable('')" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <!--<th>角色编码</th>-->
                                    <th>角色名称</th>
                                    <th>状态</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="role in roles">
                                <td class="sheet-item-state"><input type="checkbox" value="role.RoleID" v-model="role.checked"></td>
                                <!--<td><span>{{role.RoleID}}</span></td>-->
                                <td>{{role.Name}}</td>
                                <td :class="[ role.Status == 1 ? '' : 'state-forbid']" >{{ role.Status == 1 ? '启用' : '禁用' }}</td>
                                <td class="state-forbid"><span data-toggle="tooltip" data-placement="top" title="{{role.Note}}">{{role.Note  | truncationString }} </span></td>
                                <td>
                                    <a v-link="'/role-edit?RoleID=' + role.RoleID" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="roleStatusEnable(role.RoleID)" href="javascript:void(0)" v-if="role.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="roleStatusDisable(role.RoleID)" href="javascript:void(0)" v-if="role.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="roles.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
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
                    fileType: 7
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                roles: [],
                query: {
                    RoleID: '',
                    Name: '',
                    Status: ''
                }
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
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
                        contentText: '请至少选中一个角色'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //重置列表
            resetting: function () {
                this.query = {
                    RoleID: '',
                    Name: '',
                    Status: ''
                }
            },
            //搜索角色
            getRoles: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/ErpQueryRole',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        var roles = result.Data.PageData;
                        self.roles = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (roles.length > 0) {
                            roles.forEach(function (role) {
                                role.checked = false;
                            });
                            self.roles = roles;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示:',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getRoles();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //启用
            roleStatusEnable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceRole = self.getIDGroup(ItemID);
                if (choiceRole.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要启用这些角色吗?',
                        btnName: '启用',
                        events: {
                            confirm: 'roleStatusEnable'
                        }
                    });
                    self.$off('roleStatusEnable');

                    self.$once('roleStatusEnable',function () {
                            //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/Account/ErpRoleStatusEnable',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceRole)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '启用成功!'
                                });
                                self.getRoles();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            roleStatusDisable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceRole = self.getIDGroup(ItemID);
                if (choiceRole.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要禁用这些角色吗?',
                        btnName: '禁用',
                        events: {
                            confirm: 'roleStatusDisable'
                        }
                    });
                    self.$off('roleStatusDisable');

                    self.$once('roleStatusDisable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/Account/ErpRoleStatusDisable',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceRole)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '禁用成功!'
                                });
                                self.getRoles();    //禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            }
        },
        //在进入页面的时候先获取数据
        route: {
            data: function (transition) {
                //获取角色列表
                this.getRoles();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getRoles();
            }
        },
        computed: commonMethods.selectAll('this.roles', function (item) {
            return item.RoleID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
