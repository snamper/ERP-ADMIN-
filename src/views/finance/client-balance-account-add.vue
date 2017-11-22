<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">账户名称<span class="form-required-mark">*</span></label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结算方式</label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">请选择</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">审单控制</label>
                        <select class="form-control" v-model="query.ControlFlag">
                            <option value="">请选择</option>
                            <option v-for="opt in ControlFlagList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">外部编码</label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">开户行</label>
                        <input v-model="query.Bank" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">银行账号</label>
                        <input v-model="query.AcctNo" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">银行账号名</label>
                        <input v-model="query.AcctName" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">账户余额<span class="form-required-mark">*</span></label>
                        <input v-model="query.Account" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">信用额度<span class="form-required-mark">*</span></label>
                        <input v-model="query.CreditAccount" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value=1 :false-value=0 v-model="query.Status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>
                        <a v-link="{name:'client-balance-account'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    isEdit: 'false',
                    title: '',
                },
                query: {
                    Name: '',
                    PayTypeID: '', //结算方式
                    Code: '', //外部编码
                    Bank: '', //开户行
                    AcctNo: '', //账户
                    AcctName: '', //账户名
                    ControlFlag: '', //审单控制
                    Account: '', //账户余额
                    CreditAccount: '', //信用额度
                    Note: '',
                    Status: '1',
                },
                PayTypeList: [],
                ControlFlagList: [],
            }
        },
        methods: {
            //获取结算方式
            getAccountType: function () {
                var self = this;
                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetBasPayTypeList',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.PayTypeList = result.Data;
                    }
                })
            },
            //获取审单控制
            getControlFlag: function () {
                var self = this;
                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetControlFlagList',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.ControlFlagList = result.Data;
                    }
                })
            },
            //获取价格信息
            getBalanceAccountByID: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasAccount/ErpBasAccountGetById',
                    data: {
                        AccountID: self.query.AccountID
                    }
                }).done(function (result) {
                    var query = result.Data;
                    console.log(query)
                    if (result.ResultCode == 1) {
                            self.query = query;
                    }
                })
            },
            //重置列表
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                } else {
                    this.query= {
                        AccountID: '',
                        Name: '',
                        PayTypeID: '', //结算方式
                        Code: '', //外部编码
                        Bank: '', //开户行
                        AcctNo: '', //账户
                        AcctName: '', //账户名
                        ControlFlag: '', //审单控制
                        Account: '', //账户余额
                        CreditAccount: '', //信用额度
                        Note: '',
                        Status: '1',
                    };
                }
            },
            //保存
            save: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this) ({
                    url: '/BasAccount/ErpSaveBasAccount',
                    data: self.query
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.resetForm();
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '成功保存'
                        });

                    }
                });
            },
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'balance-account-edit') {
                    self.pageInfo.title = '修改结算账户';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if (query.AccountID) {
                        self.query.AccountID = query.AccountID;
                        this.getBalanceAccountByID();
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建结算账户';
                    self.resetForm();
                }
            }
        },
        ready: function () {
            this.getAccountType();
            this.getControlFlag();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>