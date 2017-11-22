<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>微信配置</p>
                </div>
                <div class="operate-form-list">
                    <div class="operate-form-title">
                        <label class="form-group-text weight">通用设置</label>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">AppSecret:<span class="form-required-mark">*</span></label>
                        <input v-model="weChat.AppSecret" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">Appkey:<span class="form-required-mark">*</span></label>
                        <input v-model="weChat.Appkey" type="text" class="form-control">
                    </div>
                    <div class="operate-form-title">
                        <label class="form-group-text weight">支付配置</label>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">MchID:<span class="form-required-mark"></span></label>
                        <input v-model="weChat.MchID" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">Key:<span class="form-required-mark"></span></label>
                        <input v-model="weChat.Key" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>

                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>
                        <a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    isEdit: 'false',
                    title: '',
                },
                weChat: {
                    AppSecret: '',	//微信公众平台密码	string
                    Appkey: '',  //	微信公众平台ID	string
                    InfOauthDetailID: '',  //	Id	string	空则新增，反之修改
                    Key: '', //支付Key	string
                    MchID: '',  //	商户ID	string
                    MerchantID:'',  //	商家ID
                },
            }
        },
        methods: {
            //获取微信配置信息
            getWeChatList: function () {
                var self = this;
                servers.postAjax.bind(this) ({
                    url: '/Wechat/ErpGetWechatConfig',
                    data: {
                        MerchantID: self.weChat.MerchantID
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.weChat.AppSecret = result.Data.AppSecret
                        self.weChat.Appkey = result.Data.Appkey
                        self.weChat.Key = result.Data.Key
                        self.weChat.MchID = result.Data.MchID
                        self.weChat.InfOauthDetailID = result.Data.InfOauthDetailID
                    }
                })
            },
            //信息清空
            resetForm:function () {
                weChat = {
                    AppSecret: '',	//微信公众平台密码	string
                    Appkey: '',  //	微信公众平台ID	string
                    InfOauthDetailID: '',  //	Id	string	空则新增，反之修改
                    Key: '', //支付Key	string
                    MchID: '',  //	商户ID	string
                    MerchantID:'',  //	商家ID
                }
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
                        url: '/Wechat/ErpSaveWechatConfig',
                        data: self.weChat
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
                var self = this;
                var MerchantID = transition.to.query.id;
                console.log(MerchantID);
                self.weChat.MerchantID = MerchantID;
            }
        },
        ready: function () {
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