<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">登录帐号<span class="form-required-mark">*</span></label>
                        <input v-model="employee.login" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div v-if="!employee.loginID" class="form-group form-limit-width">
                        <label class="form-group-text">登录密码<span class="form-required-mark">*</span></label>
                        <input v-model="employee.password" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">真实姓名<span class="form-required-mark">*</span></label>
                        <input v-model="employee.name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">所属角色<span class="form-required-mark">*</span></label>
                        <div class="checkbox-group checkbox-group_member">
                            <div class="checkbox">
                                <label class="checkbox-inline" v-for="role in allRoles">
                                    <input type="checkbox" value="{{role.RoleID}}" v-model="employee.loginRoles">
                                    {{role.Name}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="employee.note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value=1 :false-value=0 v-model="employee.status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveEmployee">保存</a>
                        <a v-link="{path:'/employees'}" class="btn btn-default">返回列表>></a>
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
.checkbox-group_member{
    .checkbox{
        .checkbox-inline{
            input{
                width: 20px;
            }
            margin:5px;
            line-height:18px;
            height: 28px;
        }
    }
}
</style>