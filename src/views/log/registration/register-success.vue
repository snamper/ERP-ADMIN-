<template>
    <div class="account_success_form clearfix">
        <div class="re_tip">
            <div class="re_tip_img"></div>
            <div class="re_tip_text">恭喜您，注册成功！</div>
        </div>
        <div class="sms_form">
            <span class="register_sms">登录账号:</span>
            <span class="sms_text">{{phoneValidation.Mobile}}</span>
        </div>
        <div class="sms_form">
            <span class="register_sms">使用期限:</span>
            <span class="sms_text">{{today}}  -  {{lastday}}</span>
        </div>
        <div class="clear"></div>
        <!--<div class="account_next_div account_next_div_go"><a type="button" class="account_next re_go click-element"> 马上付费，即可免费使用 >> </a></div>-->
        <div class="account_next_div account_next_div_next"><a @click="login" href="javascript:void(0)" class="account_next re_next click-element"> 进入系统 </a></div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var cookie = require('js-cookie');
    var actions = require('../../../js/vuex/actions');
    module.exports = {
        props: ['phoneValidation','validateSMSCode'],
        data: function () {
            return {
                password: '',
                account: '',
                today: "",
                lastday: ""
            }
        },
        vuex: {
            actions: {
                clearTab: actions.clearTab
            }
        },
        methods: {
            day: function () {
                var myDate = new Date();
                var day = myDate.toLocaleDateString();//获取当前日期
                var a = myDate.setMonth(myDate.getMonth() + 1);
                var d2=new Date(a);//格式化时间戳
                var y = d2.getFullYear()+'年';//获取年份
                var m = d2.getMonth()+'月';//获取月份
                var addm = d2.getMonth()+1+'月';//获取月份加一
                var d = d2.getDate()+'日';//获取日期
                var today = y+m+d;
                var lastday = y+addm+d;
                this.today = today;
                this.lastday = lastday;
            },
            login: function () {
                var self = this;
                NProgress.start();
              this.account = self.phoneValidation.Mobile;
              this.password = self.validateSMSCode.Password;
                servers.postAjax.bind(this)({
                    url: '/Login/ErpLogin',
                    data: {
                        Login: self.account,
                        Password: self.password
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var userMessage = result.Data;
//                        var date = new Date( new Date().getTime() + 30*60*1000 );   //30分钟后过期
                        cookie.set('userName',userMessage.Name);
                        cookie.set('userID',userMessage.LoginID);
                        self.clearTab();
                        if (self.redirect) {
                            self.$route.router.go(self.redirect);
                        } else {
                            self.$route.router.go({path:'/'});
                        }
                    }
                })
            }
        },
        ready: function () {
            this.day();
        },
        route: {
            data: function (transition) {
                this.redirect = transition.to.query.redirect;
            }
        }
    };
</script>

<style  rel="stylesheet/less" lang="less" >
    .account_success_form {
        width: 450px;
        height: auto;
        margin: 88px auto 0 auto;
        .register_sms{
            line-height:45px;
            text-align: center;
            font-size: 16px;
        }
        .re_tip{
            width: 81%;
            height: 53px;
            margin: 0 auto 30px auto;
        }
        .re_tip_img{
            width:14%;
            height: 53px;
            float: left;
            background-image:url("../../../images/re_tipimg.png") ;
        }
        .re_tip_text{
            width:84%;
            height:53px;
            float: right;
            line-height: 53px;
            text-align: center;
            color: #ed5565;
            font-size: 34px;

        }
        .re_success{
            width: 30px;
            height: 30px;
            background-color: #00b3ee;
        }
        .sms_form{
            width: 81%;
            height: 45px;
            margin: 0 auto 20px auto;
        }
        .sms_text{
            display: block;
            width:79%;
            height: 45px;
            border: none;
            border-radius: 6px;
            line-height: 45px;
            /*text-align: center;*/
            float:right;
            font-size: 16px;
            color:#00b3ee;
        }
        .account_next_div{
            width: 90%;
            height: 48px;
            margin: 0 auto;
        }
        .account_next_div_go{
            margin-top: 50px;
        }
        .account_next_div_next{
            margin-top: -20px;
        }
        .account_next{
            display: block;
            width: 90%;
            height: 45px;
            margin: 0 auto;
            border-radius: 6px;
            line-height: 45px;
            text-align: center;
            font-size:16px;
            color: #ffffff;
            font-weight: bold;
        }
        .re_go{
            background-image: url("../../../images/re_buttom.png");
        }
        .re_next{
            margin-top:35px;
            background-image: url("../../../images/reback.png");
        }
    }
    @media screen and (max-width: 360px) {
        .account_success_form {
            width: 100%;
            .re_tip_text {
                width: 71%;
                float: left;
                font-size: 18px;
            }
            .re_tip_img {
                width: 18%;
            }
            .register_sms {
                font-size: 14px;
            }
            .sms_text {
                width: 75%;
                font-size: 10px;
            }
        }
    }
    @media screen and (min-width: 361px) and (max-width: 430px) {
        .account_success_form {
            width: 100%;
            .re_tip_text {
                width: 71%;
                float: left;
                font-size: 21px;
            }
            .register_sms {
                font-size: 15px;
            }
            .sms_text {
                width: 76%;
                font-size: 10px;
            }
        }
    }
</style>