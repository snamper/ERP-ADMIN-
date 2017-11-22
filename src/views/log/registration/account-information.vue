<template>
    <div class="account_form clearfix" @keyup.enter.stop="getValidateSMSCode">
        <div class="re_agreement">我们已向您手机号为<span class="re_service_agreement">{{phoneValidation.Mobile}}</span>的手机发送短信验证码，请注意查收 </div>
        <div class="sms_form">
            <span class="register_sms">短信验证码:</span>
            <input autocomplete="off"  v-model="validateSmscode.SMSValidateCode" class="sms_text" type="text" value="" placeholder="请输入短信验证码">
        </div>
        <div class="sms_form">
            <span class="register_sms">登录密码:</span>
            <input autocomplete="off"  v-model="validateSmscode.Password" class="sms_text" type="password" value="" placeholder="请输入密码">
        </div>
        <div class="sms_form">
            <span class="register_sms">再次确认:</span>
            <input autocomplete="off"  v-model="validateSmscode.ConfirmPassword" class="sms_text" type="password" value="" placeholder="请再次输入密码">
        </div>
        <div class="clear"></div>

        <div class="account_next_div"><a  @click="getValidateSMSCode"　href="javascript:void(0)" class="account_next click-element"> 注  册 </a></div>
        <div class="re_agreement re_agreemention">点击注册，即表示您已经阅读同意我们的<span class="re_service_agreement">《服务协议》</span>，请知悉 </div>
    </div>

</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['phoneValidation','validateSmscode'],
        data:function () {
            return{
                
            }
        },
        methods: {
            getValidateSMSCode: function () {
                var self = this;
                if (self.validateSmscode.SMSValidateCode.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入短信验证码！'
                    });
                    return;
                }
                else if (self.validateSmscode.Password.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入密码！'
                    });
                    return;
                }
                else if (self.validateSmscode.ConfirmPassword.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入确认密码！'
                    });
                    return;
                }
                else if (self.validateSmscode.Password != self.validateSmscode.ConfirmPassword) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '确认密码不一致，请重新确认！'
                    });
                    return;
                }
                servers.postAjax.bind(this)({
                    url: '/Common/ErpValidateSMSCode',
                    data: self.validateSmscode
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1){
                        self.$route.router.go({
                            name: 'register-next'
                        })
                    }
                })
            }
        }
    };
</script>

<style rel="stylesheet/less" lang="less">
    .account_form {
        width: 450px;
        height: auto;
        margin: 88px auto 0 auto;
        .register_sms {
            line-height: 45px;
            text-align: center;
            font-size: 16px;
        }

        .sms_form {
            width: 385px;
            height: 45px;
            margin: 0 auto 20px auto;
            input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px white inset;
            }
        }
        .sms_text {
            width: 75%;
            height: 45px;
            border: solid 1px #ccc;
            border-radius: 6px;
            float: right;
            text-indent: 1em;
            font-size: 14px;
        }
        .account_next_div {
            width: 432px;
            height: 48px;
            margin: 50px auto 0 auto;
        }
        .account_next {
            display: block;
            width: 432px;
            height: 45px;
            margin: 0 auto;
            border-radius: 6px;
            background-image: url("../../../images/reback.png");
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            font-weight: bold;
        }
        .re_agreement {
            width: 100%;
            height: 70px;
            margin: 0 auto;
            line-height: 20px;
            text-align: center;
            color: #999999;
            font-size: 14px;
        }
        .re_agreemention {
            margin-top: 50px;
        }
        .re_service_agreement {
            color: #387BD1;
            margin: 50px auto 0 auto;
        }
    }
    @media screen and (max-width: 389px) {
        .account_form {
            width: 100%;
            .register_sms {
            font-size: 14px;
            }

            .sms_form {
                width: 90%;
                height: 45px;
                margin: 0 auto 20px auto;
            }

            .sms_text {
                width: 72%;
                font-size: 12px;
            }
            .re_agreement {
                width: 90%;
                font-size: 14px;
            }
            .account_next_div {
                width: 90%;
            }
            .account_next {
                width: 100%;
            }

        }
    }
    @media screen and (min-width: 390px) and (max-width: 481px) {
        .account_form {
            width: 100%;
            .register_sms {
                font-size: 16px;
            }

            .sms_form {
                width: 90%;
                height: 45px;
                margin: 0 auto 20px auto;
            }

            .sms_text {
                width: 74%;
                font-size: 14px;
            }
            .re_agreement {
                width: 90%;
                font-size: 13px;
            }
            .account_next_div {
                width: 90%;
            }
            .account_next {
                width: 100%;
            }

        }
    }
</style>