<template>
    <div class="reset_password_content">
        <div class="login_form">
            <input  class="code" type="text" value="" placeholder="请输入您的手机号">
            <div class="code_img click-element">发送验证码</div>
            <input v-model="account" class="user" type="text" placeholder="请输入您的短信验证码">
            <input v-model="password" class="user" type="password" placeholder="请输入新密码" @keyup.enter="login">

            <a @click="reset-password" href="javascript:void(0)" class="login_button click-element">找回密码</a>
        </div>
    </div>
</template>
<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var cookie = require('js-cookie');
    module.exports = {
        data: function () {
            return {
                password: '',
                account: ''
            }
        },
        methods: {
            login: function () {
                var self = this;
                NProgress.start();
                if ( self.account.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请输入账号'
                    });
                    return;
                }
                else if (self.password.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入密码'
                    });
                    return;
                }
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
                        if (self.redirect) {
                            self.$route.router.go(self.redirect);
                        } else {
                            self.$route.router.go({path:'/'});
                        }
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                this.redirect = transition.to.query.redirect;
            }
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .reset_password_content {

        .user{
            width: 100%;
            height: 47px;
            text-indent:1em;
            font-size: 14px;
        }
        .code{
            width: 60%;
            height: 47px;
            text-indent:1em;
            font-size: 14px;
        }
        .code_img{
            width: 35%;
            height: 47px;
            float: right;
            margin-top: 20px;
            /*border: solid 1px #cccccc;*/
            border-radius: 6px;
            line-height: 47px;
            font-size: 14px;
            color: #fff;
            text-align: center;
            background-image: url("../../images/LoginIcon/button-icon.png");
            background-position: 0px 166px;
        }
        .code_img:hover{
            background-image: url("../../images/LoginIcon/button-icon.png");
            background-position: 0px 106px;
        }
        .code_img:active{
            background-image: url("../../images/LoginIcon/button-icon.png");
            background-position: 0px 47px;
        }
        /*.login_content_all{*/
            /*!*width: 1200px;*!*/
            /*!*height: 628px;*!*/
            /*!*margin:0 auto;*!*/
            /*!*background-color: #f0f0f0*!*/
        /*}*/
        .left_bg_left{
            width:100%;
            height: 628px;
            float: left;
            background-image: url('../../images/LoginIcon/dave.png');
        }

        .descriptor{
            width: 100%;
            height: auto;
            margin-top: 50px;
        }
        .descriptor img{
            width: 100%;
            height: auto;
        }
        .descriptor p{
            width: 100%;
            display: block;
            margin: 0;
            padding-top: 15px;
            text-align: right;
            color: #23446E;
        }

        .login_form input{
            border-radius: 6px;
            border: solid 1px #cccccc;;
            margin-top: 20px;
        }
        .login_button{
            display: block;
            width: 100%;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            text-align: center;
            color: #ffffff;
            border-radius: 6px;
            margin-top: 20px;
            background-image: url('../../images/LoginIcon/button-icon.png');
            background-position: 0px 0px;
        }
        .login_button:hover{
            background-image: url('../../images/LoginIcon/button-icon.png');
            background-position: 0px -60px;
        }
        .login_button:active{
            background-image: url('../../images/LoginIcon/button-icon.png');
            background-position: 0px 240px;
        }
        .login_buttom_comm:hover{
            border-radius: 6px;
            background-color: #387BD1;
            color: #fff;
        }

        }
        @media only screen and (min-width: 360px) {
            .left_bg_right{
                width: 350px;
                height: auto;
                margin: 0 auto;
            }
            .login_form{
                width: 100%;
                margin:20px auto 0 auto;
            }
        }

        @media only screen and (max-width: 360px) {
            .left_bg_right{
                width: 100%;
                height: auto;
                margin: 0 auto;
            }
            .descriptor{
                width: 100%;
                height: auto;
                margin-top: 50px;
            }
            .descriptor img{
                width: 100%;
                height: auto;
            }
            .descriptor p{
                width: 100%;
                display: block;
                margin: 0;
                padding-top: 15px;
                text-align: right;
                color: #23446E;
            }
            .login_form{
                width: 100%;
                margin:20px auto 0 auto;
            }
            .login_form input{
                border-radius: 6px;
                border: solid 1px #cccccc;;
                margin-top: 20px;
            }

        }


</style>