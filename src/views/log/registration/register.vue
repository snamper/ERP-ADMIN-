<template>
    <div class="register_one_form clearfix" @keyup.enter.stop="SendSMSCode">
        <div class="re_tel_form">
            <span class="re_column_name">手机号码:</span>
            <span class="tel86">+86</span>
            <input v-model="phoneValidation.Mobile" class="tel_text" type="text" placeholder="请输入手机号码">
        </div>
        <div class="re_tel_form">
            <span class="re_column_name">验证码:</span>
            <input v-model="phoneValidation.ImageValidateCode"  class="code_text" type="text" placeholder="请输入验证码">
            <div @click="getValidateCode" class="re_code_img">
                <img class="validateCodeImg" :src="ValidateImg">
            </div>
        </div>
        <a @click="SendSMSCode" href="javascript:void(0)" class="register_next click-element"> 下一步 </a>
    </div>
    <div class="register_one_form register_one_after">
        <div class="register_skip">已有登录账号？您还可以 <a v-link="{ path: '/log/login'}"><span> 马上登陆</span></a></div>
        <!--<span>已有登录账号？您还可以</span>-->
        <!--<a href="" class="re_login">马上登录</a>-->
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['phoneValidation','validateSmscode'],
        data:function () {
            return {
                ValidateImg: ""
            }
        },
        methods: {
            getValidateCode: function () {
                var self = this;
                servers.postAjax({
                    url: '/Common/ErpGetValidateCode'
                }).done(function (result) {
                    console.log(result);
                    self.ValidateImg = 'data:image/png;base64,' + result.Data;
                })
            },
            SendSMSCode: function () {
                var self = this;
                var myreg = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/;
                console.log(!myreg.test(self.phoneValidation.Mobile));
//                var myreg =/^(((13[0-9]{1})|159|153)+\d{8})$/;

                NProgress.start();
                if (self.phoneValidation.Mobile.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入手机号'
                    });
                    return;
                }
                else if(!myreg.test(self.phoneValidation.Mobile)) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '手机格式不正确'
                    });
                    return;
                }
                else if (self.phoneValidation.ImageValidateCode.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入验证码'
                    });
                    return;
                }
                servers.postAjax.bind(this)({
                    url: '/Common/ErpSendSMSCode',
                    data: self.phoneValidation
                }).done(function (result) {
                    NProgress.done();
                    console.log(self);

                    if (result.ResultCode == 1){
                        self.$route.router.go({
                            name: 'account-information'
                        })
                    }

                    console.log(result);
                })
            }

        },
        ready: function () {
            this.getValidateCode();
//            this.SendSMSCode();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .register_one_form {
        width: 432px;
        height: auto;
        margin: 88px auto 0 auto;
        /*background-color: #00b3ee;*/
    .tel86{
        padding: 11px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
    }
    .re_column_name{
        line-height:45px;
        text-align: center;
        font-size: 16px;
    }
    .tel_text{
        width: 300px;
        height: 45px;
        border-radius: 6px;
        border: 1px solid #ccc;
        text-indent: 1em;
        font-size: 14px;
    }
    .code_text{
        width: 240px;
        height: 45px;
        border-radius: 6px;
        border: 1px solid #ccc;
        text-indent: 1em;
        font-size: 14px;
    }
    .re_code_img{
        width: 115px;
        height: 45px;
        float: right;
        border-radius: 6px;
    }
    .validateCodeImg{
        border-radius: 6px;
    }
    .register_next{
        display: block;
        width: 430px;
        height: 45px;
        margin-top: 29px;
        border-radius: 6px;
        line-height: 45px;
        text-align: center;
        font-size:16px;
        color: #ffffff;
        font-weight: bold;
        background-image: url("../../../images/reback.png");
    }
    }
    .register_skip {
        position: absolute;
        /*display: block;*/
        bottom: 56px;
        width: 100%;
        text-align: right;
        font-size: 14px;
        color: #666666;
    }
    .re_login{
        display: block;
        width: 100px;
        height: 41px;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        background-image: url("../../../images/LoginIcon/Login-im.png");
        border-radius: 6px;
        float: right;
    }
    .re_login:hover{
        background-image: url("../../../images/LoginIcon/Login-im.png");
        background-position: 0px -56px;
        color: #fff;
    }
    .re_login:active{
        background-image: url("../../../images/LoginIcon/Login-im.png");
        background-position: 0px 40px;
        color: #fff;
    }

    .re_tel_form{
        width: 432px;
        height: 45px;
        margin: 0 auto 20px auto;
    }

    .re_input_text{
        width:290px;
        height: 45px;
        border: solid 1px #ccc;
        border-radius: 6px;
        float:right;
    }
    .account_next_div{
        width: 432px;
        height: 48px;
        margin: 50px auto 0 auto;
    }
    .account_next{
        width: 432px;
        height: 48px;
        margin: 0 auto;
        border-radius: 6px;
        background-image: url("../../../images/reback.png");
        line-height: 48px;
        text-align: center;
        font-size:16px;
        color: #ffffff;
        font-weight: bold;
    }
    .register_one_after {
        position: relative;
    }
    .re_agreement{
        width: 1200px;
        height: 70px;
        margin: 0 auto;
        line-height: 70px;
        text-align: center;
        color:#999999;
        font-size: 14px;
    }
    .re_service_agreement{
        color: #387bd1;
    }

    @media screen and (max-width: 359px) {
        .register_one_form {
            width: 90%;
            .re_tel_form {
                width: 100%;
            }
            .re_column_name{
                font-size: 14px;
            }
            .tel86{
                font-size: 14px;
            }
            .tel_text{
                width: 58%;
                float: right;
            }
            .code_text {
                width: 38%;
                /*float: left;*/
            }
            .register_next{
                width: 100%;
                padding: 20px;
                line-height: 5px;
            }
        }
    }

    @media screen and (max-width: 410px) and (min-width: 360px) {
        .register_one_form {
            width: 90%;
            .re_tel_form {
                width: 100%;
            }
            .re_column_name{
                font-size: 14px;
            }
            .tel86{
                font-size: 14px;
            }
            .tel_text{
                width: 63%;
                float: right;
            }
            .code_text {
                width: 45%;
            }
            .register_next{
                width: 100%;
                padding: 20px;
                line-height: 5px;
            }
        }
    }
    @media screen and (max-width: 435px) and (min-width: 411px) {
        .register_one_form {
            width: 90%;
            .re_tel_form {
                width: 100%;
            }
            .re_column_name{
                font-size: 14px;
            }
            .tel86{
                font-size: 14px;
            }
            .tel_text{
                width: 68%;
                float: right;
            }
            .code_text {
                width: 50%;
            }
            .register_next{
                width: 100%;
                padding: 20px;
                line-height: 5px;
            }
        }
    }
</style>