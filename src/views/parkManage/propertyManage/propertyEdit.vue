<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>新增商户</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>商户编号</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>商铺名称</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>联系电话</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>店主姓名</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>身份证号</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>商铺地址</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>营业开始时间</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>营业结束时间</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>租赁开始时间</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>租赁结束时间</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>面积</label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required> 
                        <span class="dan">m<sup>2</sup></span> 
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"><span class="form-required-mark">*</span>租赁总价</label>
                        <input v-model="employee.login" style="width: 100px;" type="text" class="form-control" placeholder="" required>
                        <span class="dan">元</span> 
                    </div>
                    <div class="operate-form-buttons">
                        <!-- <a href="javascript:void(0)" class="btn btn-default" @click="saveEmployee">保存</a> -->
                        <a href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a v-link="{path:'/propertyList'}" class="btn btn-default">返回</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div>{{employee | json}}</div>-->
    <!--<div>{{allRoles | json}}</div>-->
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers= require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    text: '',
                    isEdit: false
                },
                employee: {
                    loginID: '',
                    login: '',
                    name: '',
                    password: '',
                    status: 1,
                    note: '',
                    loginRoles: []
                },
                allRoles: []
            }
        },
        methods: {
            //保存员工信息
            saveEmployee: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/ErpSaveLogin',
                    data: {
                        LoginID: self.employee.loginID,
                        Login: self.employee.login,
                        Name: self.employee.name,
                        Password: self.employee.password,
                        Status: self.employee.status,
                        Note: self.employee.note,
                        LoginRoleStr: self.employee.loginRoles
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.$dispatch('transmit','tip',{
                            name: '成功:',
                            contentText: '成功保存'
                        });
                        self.resetForm();
                    }
                });
            },
            //修改查询
            getLoginByID: function (loginID) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/ErpGetByIdLogin',
                    data: {
                        LoginID: loginID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var employee = self.employee;
                        var data = result.Data;
                        employee.loginID = data.LoginID;
                        employee.login = data.Login;
                        employee.name = data.Name;
                        employee.password = data.Password;
                        employee.status = data.Status;
                        employee.note = data.Note;
                        data.SysLoginRoles.forEach(function (role) {
                            employee.loginRoles.push(role.RoleID);
                        })
                    }
                });
            },
            //清空表单数据
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.employee = {
                        loginID: '',
                        login: '',
                        name: '',
                        password: '',
                        status: 1,
                        note: '',
                        loginRoles: []
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                //根据ID查询操作员的信息
                if (name == 'employee-edit') {
                    this.pageInfo.text = '修改操作员';
                    var loginID = transition.to.query.loginID;
                    if (loginID) {
                        this.pageInfo.isEdit = true;
                        this.getLoginByID(loginID);
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新建操作员';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
                //获取所属角色
                servers.postAjax({
                    url: '/Account/ErpQueryGetAll'
                }).done(function (result) {
                    self.allRoles = result.Data;
                    transition.next();
                });
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.dan {
    margin-top: 8px;
    margin-left: 5px;
}
</style>