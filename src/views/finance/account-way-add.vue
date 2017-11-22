<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结算名称<span class="form-required-mark">*</span></label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结算天数<span class="form-required-mark">*</span></label>
                        <input v-model="query.PayTypeDay" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结算类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.Style">
                            <option value="">请选择</option>
                            <option v-for="opt in accountTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
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
                        <a v-link="{name:'account-way'}" class="btn btn-default">返回列表>></a>
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
                    PayTypeID: '',
                    Name: '',
                    PayTypeDay: '',
                    Style: '',
                    Note: '',
                    Status: '1'
                },
                accountTypeList: []
            }
        },
        methods: {
            // 重置列表
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                } else {
                    this.query= {
                        PayTypeID: '',
                        Name: '',
                        PayTypeDay: '',
                        Style: '',
                        Status: '1'
                    };
                }
            },
            //获取结算方式信息
            getAccountWay: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasMember/ErpGetBasMemberById',
                    data: {
                        MemberID: self.query.MemberID
                    }
                }).done(function (result) {
                            //var query = result.Data;
//                    console.log(query)
                            if (result.ResultCode == 1) {
                                self.query = result.Data;
                                self.query.Creater = query.Creater
                            }
                })
            },
            //获取结算类型
            getAccountType: function () {
                var self =this;

                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetBasPayTypeStyleList',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.accountTypeList = result.Data;
                        //console.log(result.Data)
                    }
                })
            },
            // 保存
            save: function () {
                var self = this;
                NProgress.start();``
                servers.postAjax.bind(this) ({
                    url: '/BasPayType/ErpSaveBasPayType',
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
                if (name == 'account-way-edit') {
                    self.pageInfo.title = '修改结算方式';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
//                    var PayTypeID = this.query.PayTypeID = transition.to.query.PayTypeID;   //获取价格ID
//                    console.log( transition.to.query);
                    if (query.PayTypeID) {
                      var account = self.query;
                        account.Name = query.Name;
                        account.PayTypeID = query.PayTypeID;
                        account.PayTypeDay = query.PayTypeDay;
                        account.Style = query.Style
                        account.Status = query.Status;
                        account.Note = query.Note
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建结算方式';
                    self.resetForm();
                }
            }
        },
        ready: function () {
            this.getAccountType();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>