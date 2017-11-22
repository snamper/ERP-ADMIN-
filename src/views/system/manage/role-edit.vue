<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">角色名称<span class="form-required-mark">*</span></label>
                        <input v-model="role.name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group">
                        <label class="form-group-text">选择功能</label>
                        <div class="form-group-list">
                            <table class="table">
                                <tbody>
                                    <tr v-for="menu in allMenus">
                                        <td is="power-list" :menu.sync="menu | menuChecked role.funcList"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="role.note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value=1 :false-value=0 v-model="role.status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveRole">保存</a>
                        <a v-link="{name:'role'}" class="btn btn-default">返回列表>></a>
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
                    title: '',
                    isEdit: false
                },
                role: {
                    roleID: '',
                    name: '',
                    status: 1,
                    note: '',
                    funcList: []
                },
                allMenus: [],
            }
        },
        methods: {
            //更新角色功能列表
            updateRoleFunc: function () {
                var allMenus = this.allMenus;
                var funcList = this.role.funcList;

                allMenus.forEach(function (menu) {
                    var isInRoleFunc = false;
                    if (menu.checked) {    //如果功能被选中
                        funcList.forEach(function(funcItem) {
                            if (menu.ModuleID == funcItem.ModuleID) {    //角色中的原来的功能包含选中的功能
                                isInRoleFunc = true;
                                var FuncPointArray = funcItem.FuncPointArray = [];
                                menu.MenuPowerJson.forEach(function (menuPower) {    //则将新选中的功能替换原来的功能
                                    if (menuPower.checked) {
                                        FuncPointArray.push(menuPower.Text)
                                    }
                                })
                            }
                        });
                        if (!isInRoleFunc) {   //如果角色中的功能不包含原来的功能
                            var roleFunList = {
                                ModuleID: menu.ModuleID,
                                IsShowMenu: true,
                                FuncPointArray: []
                            };
                            var FuncPointArray = roleFunList.FuncPointArray;
                            menu.MenuPowerJson.forEach(function (menuPower) {   //将此功能点新增进角色的功能中
                                if (menuPower.checked) {
                                    FuncPointArray.push(menuPower.Text);
                                }
                            });
                            funcList.push(roleFunList);
                        }

                    } else {   //如果功能没被选中
                        funcList.forEach(function(funcItem) {  //角色的功能中包含未被选中的功能,则将角色的功能删除
                            if (menu.ModuleID == funcItem.ModuleID) {
                                funcItem.IsShowMenu = false;
                                console.log(funcItem);
//                                funcList.$remove(funcItem);
                            }
                        })
                    }
                });
            },

            //保存角色
            saveRole: function () {
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '保存',
                    events: {
                        confirm: 'saveRole'
                    }
                });
                self.$off('saveRole');

                self.$once('saveRole',function () {
                    NProgress.start();
                    self.updateRoleFunc();
                    servers.postAjax.bind(this)({
                        url: '/Account/ErpSaveRole',
                        data: {
                            RoleID: self.role.roleID,
                            Name: self.role.name,
                            Status: self.role.status,
                            Note: self.role.note,
                            SysRoleFuncList: self.role.funcList
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.resetForm();   //清空表单
                            console.log('ok');
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '保存成功!'
                            });
                        }
                    });
                })
            },
            //获取角色信息
            getRoleByID: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/Account/ErpQueryRoleByID',
                    data: {
                       ID: self.role.roleID
                    }
                }).done(function (result) {
                    var role = result.Data;
                    if (result.ResultCode == 1) {
                        self.role.name = role.Name;
                        self.role.status = role.Status;
                        self.role.note = role.Note;
                        self.role.funcList = role.SysRoleFuncList;
                    }
                })
            },
            //获取所有菜单
            getAllMenu: function () {
                var self = this;
                servers.getAjax({
                    url: '/Login/ErpGetAllMenu'
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        var allMenus = result.Data.Data;
                        allMenus.forEach(function (allMenu) {
                            allMenu.checked = false;
                            var menuPower = allMenu.MenuPower;
                            var menuPowerJson = allMenu.MenuPowerJson = [];
                            menuPower.forEach(function (menu) {
                                menuPowerJson.push({
                                    Text: menu,
                                    checked: false,
                                    ModuleID: allMenu.ModuleID
                                });
                            })
                        });
                        self.allMenus = allMenus
                    }
                });
            },
            //清空表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.role = {
                        roleID: '',
                        name: '',
                        status: 1,
                        note: '',
                        funcList: []
                    };
                    this.allMenus.forEach(function (allMenu) {
                        allMenu.checked = false;
                        var menuPower = allMenu.MenuPower;
                        var menuPowerJson = allMenu.MenuPowerJson = [];
                        menuPower.forEach(function (menu) {
                            menuPowerJson.push({
                                Text: menu,
                                checked: false,
                                ModuleID: allMenu.ModuleID
                            });
                        })
                    });
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if ( name == 'role-edit' ) {
                    self.pageInfo.title = '修改角色';
                    self.pageInfo.isEdit = true;
                    var RoleID = this.role.roleID = transition.to.query.RoleID;   //获取角色ID
                    if (RoleID) {
                        this.getRoleByID();
                    } else {
                        transition.abort();
                    }
                } else {   //否则为新建角色
                    self.pageInfo.title = '新建角色';
                    self.pageInfo.isEdit = false;
                    self.resetForm();
                }
                this.getAllMenu();
                transition.next();
            }
        },
        components: {
            powerList: require('./power-list.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .role-edit {
        .table {
            width: auto;
            border: 1px solid #e5e5e5;
            .role-first-category {
                width: 150px;
                border-right: 1px solid #e5e5e5;
                background: #FAFAFA;
            }
            .checkbox-inline {
                margin-left: 10px;
            }
        }
        .checkbox-inline{
            margin:5px;
            line-height: 18px;
        }
        .role-first-category{
            padding-top: 56px;
            padding-left:38px;
            input{
                vertical-align: middle;
                margin-top:1px;
            }
        }
    }
</style>