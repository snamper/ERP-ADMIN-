<template>
    <div class="container-fluid">
        <div class="unify-head">
            商户管理
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商户名</label>
                        <input v-model="query.Login" type="text" class="form-control" placeholder="请输入商户名">
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
                            <a v-link="{name: 'propertyEdit'}" class="btn btn-default">新增商户</a>
<!--                             <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="loginStatusEnable('')" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="loginStatusDisable('')" href="javascript:void(0)" class="btn btn-default">禁用</a> -->
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed ">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>商户编号</th>
                                <th>商户</th>
                                <th>手机号</th>
                                <th>面积</th>
                                <th>租赁总价</th>
                                <th>起止时间</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="n in 1">
                                <td class="sheet-item-state"><input type="checkbox" v-model="checked"></td>
                                <td><span>18888</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">紫云来旗舰店100</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >17191061931</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >5000</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >60000</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2016-10-10</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2016-8-15</span></td>
                                <td>
                                    <a v-link="'/propertyEdit'"  data-toggle="tooltip" data-placement="top"
                                       title="修改">
                                        <span class="">修改</span>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <span>|</span>
                                    </a>
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="删除">
                                        <span class="">删除</span>
                                    </a>
                              
                                </td>
                            </tr>
                            <tr class="sheet-list-item" v-for="n in 2">
                                <td class="sheet-item-state"><input type="checkbox" v-model="checked"></td>
                                <td><span>210365</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">紫云来药店</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >18516435465</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >150</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >5000</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2017-5-10</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2017-3-15</span></td>
                                <td>
                                    <a v-link="'/propertyEdit'"  data-toggle="tooltip" data-placement="top"
                                       title="修改">
                                        <span class="">修改</span>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <span>|</span>
                                    </a>
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="删除">
                                        <span class="">删除</span>
                                    </a>
                              
                                </td>
                            </tr>
                            <tr class="sheet-list-item" v-for="n in 1">
                                <td class="sheet-item-state"><input type="checkbox" v-model="checked"></td>
                                <td><span>266852</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">紫云来古琴店666</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >18513754968</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >6666</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >888888</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2017-3-10</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" >2016-9-25</span></td>
                                <td>
                                    <a v-link="'/propertyEdit'"  data-toggle="tooltip" data-placement="top"
                                       title="修改">
                                        <span class="">修改</span>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <span>|</span>
                                    </a>
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="删除">
                                        <span class="">删除</span>
                                    </a>
                                </td>
                            </tr>
                            <tr class="sheet-list-item" v-for="employee in employees">
                                <td class="sheet-item-state"><input type="checkbox" v-model="employee.checked"></td>
                                <td><span>16666</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">紫云来古玩店</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">13213759865</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">600</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">10000</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">2017-7-31</span></td>
                                <td><span data-toggle="tooltip" data-placement="top">2017-6-31</span></td>
                                <td>
                                    <a v-link="'/propertyEdit'"  data-toggle="tooltip" data-placement="top"
                                       title="修改">
                                        <span class="">修改</span>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <span>|</span>
                                    </a>
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="删除">
                                        <span class="">删除</span>
                                    </a>
                              
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
    var commonMethods = require('../../../js/common');
    var servers= require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                //所有操作员
                employees: [],
                //所有角色
                roles: [],
                //查询条件
                query: {
                    Role: '',
                    Status: '',
                    Login: '',
                    Name: ''
                },
                pageInfo: {
                    fileType: 8
                }
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            getIDGroup: function (DeptID) {
                var IDGroup = [];
                if (DeptID) {
                    IDGroup.push(DeptID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个员工'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //重置列表
            resetting: function () {
                this.query = {
                    Role: '',
                    Status: '',
                    Login: '',
                    Name: ''
                }
            },
            //获取员工列表
            getEmployee: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/ErpQueryLogin',
                    data: {
                        pageSize: self.paginationOptions.pageSize,
                        pageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1 ) {
                        var employees = result.Data.PageData;
                        self.employees = [];
                        if (employees.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            employees.forEach(function (item) {
                                item.checked = false;
                                item.RolesList = [];
                            });
                            self.employees = employees;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getEmployee();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //启用
            loginStatusEnable: function (LoginID) {
                var self = this;
                //确认提示
                var choiceLogin = self.getIDGroup(LoginID);
                if (choiceLogin.length > 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要启用这些员工吗?',
                        btnName: '启用',
                        events: {
                            confirm: 'loginStatusEnable'
                        }
                    });
                    self.$off('loginStatusEnable');
                    self.$once('loginStatusEnable', function () {

                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/Account/ErpLoginStatusEnable',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceLogin)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '启用成功!'
                                });
                                self.getEmployee();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            loginStatusDisable: function (LoginID) {
                var self = this;
                //确认提示
                var choiceLogin = self.getIDGroup(LoginID);
                if (choiceLogin.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要禁用这些员工吗?',
                        btnName: '禁用',
                        events: {
                            confirm: 'loginStatusDisable'
                        }
                    });
                    self.$off('loginStatusDisable');

                    self.$once('loginStatusDisable',function () {

                            //发送启用禁用请求
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/Account/ErpLoginStatusDisable',
                                contentType: 'application/json',
                                data: JSON.stringify(choiceLogin)
                            }).done(function (result) {
                                NProgress.done();
                                if ( result.ResultCode == 1 ) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '禁用成功!'
                                    });
                                    self.getEmployee();    //禁用成功,重新刷新列表
                                }
                            });
                    });
                }
            },
            resetPassword: function (LoginID) {
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '请与账号所有者沟通后再点击确认!',
                    btnName: '重置',
                    events: {
                        confirm: 'resetPassword'
                    }
                });
                self.$off('resetPassword');

                self.$once('resetPassword',function () {
                    var choiceLogin = self.getIDGroup(LoginID);
                    if (choiceLogin.length > 0) {
                        //发送重置请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/Account/ErpLoginResetPassword',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceLogin)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '重置成功!密码被重置为123456'
                                });
                                self.getEmployee();    //禁用成功,重新刷新列表
                            }
                        });
                    }
                });
            }
        },
        route: {
            data: function (transition) {
                this.getEmployee();
                transition.next();
            },
            activate: function (transition) {
                var self = this;
                //获取所有角色
                servers.postAjax({
                    url: '/Account/ErpQueryGetAll'
                }).done(function (result) {
                    self.roles = result.Data;
                    transition.next();
                });
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getEmployee();
            }
        },
        computed: commonMethods.selectAll('this.employees', function (item) {
            return item.LoginID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.batch-operation{
    border:none;
}
.icon-power {
    &:before {
        background: #d18080;
        color: #fff;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        display: inline-block;
        text-align: center;
        line-height: 18px;
    }
}
td,th {
    text-align: center;
}

</style>