<template>
    <div class="container-fluid">
        <label class="form-group-text">微信模式配置</label>

    </div>
    <div class="query-form">
        <div id="query-detail" class="form-inline collapse in query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">微信端域名</label>
                    <input v-model="weChat.domainName" type="text" class="form-control" readonly="readonly">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">微信模式<span class="form-required-mark">*</span></label>
                    <select class="form-control" v-model="weChat.modelID">
                        <option v-for="model in modelList" value="{{model.Code}}">{{model.Text}}</option>
                    </select>
                </div>
            </div>
            <div class="query-button-group">
                <div class="form-group form-limit-width startUsing ">
                    <status-checkbox :status.sync="tradeObj.Status"></status-checkbox>
                </div>
                <a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>
                <a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>
            </div>
        </div>
    </div>



    <!--<div class="container-fluid role-edit">-->
        <!--<div class="row">-->
            <!--<div class="col-sm-12">-->
                <!--<div class="operate-form-title">-->
                    <!--<p>微信配置</p>-->
                <!--</div>-->
                <!--<div class="operate-form-list">-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label class="form-group-text">微信模式<span class="form-required-mark"></span></label>-->
                        <!--<select class="form-control" v-model="weChat.modelID">-->
                            <!--<option v-for="model in modelList" value="{{model.Code}}">{{model.Text}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">商家域名:<span class="form-required-mark"></span></label>-->
                        <!--<input v-model="weChat.domainName" type="text" class="form-control" readonly="readonly">-->
                    <!--</div>-->

                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text"></label>-->

                    <!--</div>-->
                    <!--<div class="operate-form-buttons">-->
                        <!--<a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>-->
                        <!--<a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                weChat: {
                    domainName: '', //域名
                    modelID: '', //模式id
                    MerchantID: ''
                },
                modelList:[], //模式下拉列表
            }
        },
        methods: {
            //获取微信模式列表
            getWeChatList: function () {
                var self = this;
                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetAllAppModule',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.modelList = result.Data
                    }
                })
            },
            //获取商家模式信息
            getWechatModel: function() {
              var self = this;
                servers.postAjax.bind(this) ({
                    url: '/SysMerchant/ErpGetSysMerchantAppModule',
                    data: {
                        MerchantID: self.weChat.MerchantID
                    }
                }).done(function (result) {
                    self.weChat.modelID = result.Data
                })
            },
                //保存
            save: function () {
//                debugger;
                var self = this;

                NProgress.start();
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'save'
                    }
                });
                self.$off('save');
                self.$once('save',function () {
                    servers.postAjax.bind(this)({
                        url: '/SysMerchant/ErpSaveSysMerchantAppModule',
                        data: {
                            DomainName: self.weChat.domainName,
                            MerchantID: self.weChat.MerchantID,
                            ModuleName: self.weChat.modelID
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
//                        self.resetForm();
//                        debugger;
                            self.$dispatch('transmit', 'tip', {
                                name: '成功:',
                                contentText: '成功保存'
                            });

                        }
                    });
                })
            },
        },
        route: {
            data: function (transition) {
                debugger
                var query = transition.to.query;
                this.weChat.domainName = query.WebSite;
                this.weChat.MerchantID = query.MerchantID
            }
        },
        ready: function () {
            this.getWechatModel();
            this.getWeChatList();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .container-fluid {
        .weight {
            font-weight: bold;
        }
    }

</style>