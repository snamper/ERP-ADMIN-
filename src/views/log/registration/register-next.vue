<template>
    <div class="account_next_form" @keyup.enter.stop="submit">
        <div class="sms_form">
            <span class="register_sms">公司名:</span>
            <input v-model="registerSysMerchant.Name" class="sms_text" type="text" value="" placeholder="请输入公司名">
        </div>
        <div class="sms_form">
            <span class="register_sms">所在行业:</span>
            <select class="sms_text" v-model="registerSysMerchant.Trade" v-if="tradeList.length > 0">
                <option v-for="trade in tradeList" :value="trade" :selected="$index == 1">{{trade.Name}}</option>
            </select>
        </div>
        <div class="sms_form">
            <span class="register_sms">联系人:</span>
            <input v-model="registerSysMerchant.LinkMan" class="sms_text" type="text" value="" placeholder="请输入联系人">
        </div>
        <div class="sms_form">
            <span class="register_sms">联系电话:</span>
            <input v-model="registerSysMerchant.LinkTel" class="sms_text" type="text" value="" placeholder="请输入联系电话">
        </div>
        <div class="sms_form">
            <span class="register_sms">电子邮箱:</span>
            <input v-model="registerSysMerchant.Email" class="sms_text" type="text" value="" placeholder="请输入电子邮箱">
        </div>
        <div class="clear"></div>
        <!--<div class="account_next_div"><a @click="registerskip" href="javascript:void(0)" class="register_skip re_next_and_skip register_next_and_skip  click-element"> 跳过此步 </a></div>-->
        <div class="account_next_div">
            <a @click="submit"　href="javascript:void(0)" class="account_next re_next_and_skip click-element"> 下一步 </a>
            <a @click="registerskip" href="javascript:void(0)" class="register_skip click-element">跳过此步</a>
        </div>
    </div>
    <!--{{registerSysMerchant | json}}-->
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['phoneValidation','validateSmscode'],
        data: function () {
            return{
                registerSysMerchant: {
                    Password: '',
                    ConfirmPassword: '',
                    Mobile: '',
                    Name: '',
                    TradeID: '',
                    TradeName: '',
                    Trade:{
                        Name: '',
                        TradeID: ''
                    },
                    LinkMan: '',
                    LinkTel: '',
                    Email: ''
                },
                tradeList: [],
            }
        },
        methods: {
            submit: function () {
                var self = this;
                var registerSysMerchant = self.registerSysMerchant;
                registerSysMerchant.TradeName = registerSysMerchant.Trade.Name;
                registerSysMerchant.TradeID = registerSysMerchant.Trade.TradeID;
                var myreg = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/; //手机格式的正则表达式
                var mytel = /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/; //电话号码的正则表达式
                var myemail = /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i; //邮箱的正则表达式
                // 将上面两个的组件的值复制到当前组件的属性
                this.registerSysMerchant.Password = self.validateSmscode.Password;
                this.registerSysMerchant.ConfirmPassword = self.validateSmscode.ConfirmPassword;
                this.registerSysMerchant.Mobile = self.phoneValidation.Mobile;
                if (self.registerSysMerchant.Name.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入公司名'
                    });
                    return;
                }
                else if (self.registerSysMerchant.LinkMan.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入联系人'
                    });
                    return;
                }
                else if (self.registerSysMerchant.LinkTel.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入联系电话'
                    });
                    return;
                }
                else if(!myreg.test(self.registerSysMerchant.LinkTel) && !mytel.test(self.registerSysMerchant.LinkTel)) {

                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '联系方式格式不正确'
                    });
                    return;
                }
                else if (self.registerSysMerchant.Email.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入电子邮箱'
                    });
                    return;
                }
                else if (!myemail.test(self.registerSysMerchant.Email)) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '电子邮箱格式不正确'
                    });
                    return;
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpRegisterSysMerchant',
                    data: self.registerSysMerchant
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1){
                        self.$route.router.go({
                            name: 'register-success'
                        })
                    }
                })
            },
            registerskip: function () {
                var self = this;
                this.registerSysMerchant.Password = self.validateSmscode.Password;
                this.registerSysMerchant.ConfirmPassword = self.validateSmscode.ConfirmPassword;
                this.registerSysMerchant.Mobile = self.phoneValidation.Mobile;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpRegisterSysMerchant',
                    data:{
                        Password: self.registerSysMerchant.Password,
                        ConfirmPassword: self.registerSysMerchant.ConfirmPassword,
                        Mobile:  self.registerSysMerchant.Mobile
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1){
                        self.$route.router.go({
                            name: 'register-success'
                        })
                    }
                })
            },
            getTrade: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetTradeList'
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.tradeList = result.Data;
                    }
                })
            }
        },
        ready: function () {
            this.getTrade();
        },
    };
</script>

<style  rel="stylesheet/less" lang="less" >
    .account_next_form {
        height: 450px;
        margin: 88px auto 0 auto;
        .sms_form{
            width: 385px;
            height: 45px;
            margin: 0 auto 20px auto;
        }
        .register_sms{
            line-height:45px;
            text-align: center;
            font-size: 16px;
        }
        .sms_text{
            width:290px;
            height: 45px;
            border: solid 1px #ccc;
            border-radius: 6px;
            float:right;
            text-indent: 1em;
        }
        .account_next_div{
            position: relative;
            width: 430px;
            height: auto;
            margin: auto;
        }
        .re_next_and_skip{
            display: block;
            width: 100%;
            height: 45px;
            border-radius: 6px;
            line-height: 45px;
            text-align: center;
            font-size:16px;
            color: #ffffff;
            font-weight: bold;
            }
            .register_skip {
                position: absolute;
                top: 65px;
                width: 95%;
                text-align: right;
                font-size: 14px;
                color: #387BD1;
            }
        .account_next{
            margin:0 auto;
            background-image: url("../../../images/reback.png");
        }
    }
    @media screen and (max-width: 389px) {
        .account_next_form {
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
                width: 100%;
            }
            .re_next_and_skip {
                width: 90%;
            }

        }
    }
    @media screen and (min-width: 390px) and (max-width: 481px) {
        .account_next_form {
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
            .account_next_div {
                width: 100%;
            }
            .re_next_and_skip {
                width: 90%;
            }

        }
    }
  </style>