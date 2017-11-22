<template>
    <!--<div class="login1_content">-->
        <!--<div class="login_content_all clearfix">-->
            <!--&lt;!&ndash;<div class="left_bg_left"></div>&ndash;&gt;-->
            <!--<div class="left_bg_right">-->
                <!--<div class="descriptor">-->
                    <!--<img src="../../images/LoginIcon/wflogo.png">-->
                    <!--&lt;!&ndash;<p class="descriptor_01">WOLF-ERP 让我随时高效管理网店</p>&ndash;&gt;-->
                    <!--&lt;!&ndash;<p class="descriptor_02">店铺发货速度提高150%</p>&ndash;&gt;-->
                    <!--&lt;!&ndash;<p class="descriptor_03">客户购物满意度增加400%</p>&ndash;&gt;-->
                <!--</div>-->
                <div class="login1_content">
                    <div class="login_form">
                        <input v-model="account" class="user" type="text" placeholder="请输入您的账号">
                        <input v-model="password" class="user" type="password" placeholder="请输入您的密码" @keyup.enter="login">
                        <!--<input  class="code" type="text" value="" placeholder="请输入右侧验证码">-->
                        <!--<div class="code_img"></div>-->
                        <a @click="login" href="javascript:void(0)" class="login_button">登 录</a>
                        <a v-link="{ name: 'reset-password' }" class="code_tip">忘记密码？</a>
                        <span class="login_tip_text">还没注册账号？您还可以 >></span>
                        <div class="login_reands_buttom clearfix">
                            <a v-link="{ path: '/registration/register'}"><span class="login_register_buttom login_buttom_comm">马上注册</span></a>
                            <a target="_blank" href="tencent://message/?uin=3487759902&Site=http://erp.gzwolf.com/&Menu=yes">
                                <span class="login_service_buttom login_buttom_comm">联系客服</span>
                            </a>
                        </div>
                        <span class="login_tip_text">第三方登录</span>
                        <div class="login_social">
                        <!--<span class="btn_share_name">社交登录账号：</span>-->
                        <a href="javascript:void(0)"><span class="btn_share_icon btn_share_icon_qq iconfont">&#xe600;</span></a>
                        <a href="javascript:void(0)"><span class="btn_share_icon btn_share_icon_sina iconfont">&#xe601;</span></a>
                        <a href="javascript:void(0)"><span class="btn_share_icon btn_share_icon_weChat iconfont">&#xe602;</span></a>
                        </div>
                    </div>
                </div>
            <!--</div>-->
        <!--</div>-->
        <!--<div class="re_footer">-->
            <!--<div class="re_footer_text">-->
                <!--<p>百图之上位，业内之首席， 成就客户在互联网领域的新发展、新成功</p>-->
                <!--<p>Copyright 2012 杭州龙席网络科技股份有限公司 All Right Reserved 浙ICP备12042137号-2      友情链接： JU53  魔镜在线</p>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
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
    .login1_content {
        .login_tip_text {
            display: block;
            width: 100%;
            height: 20px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            color: #575757;
            margin-top: 15px;
            margin-bottom: 35px;
        }
        /*.re_footer {*/
        /*background-color: #ffffff;*/
        /*width: 100%;*/
        /*height: auto;*/

        /*}*/

        /*.re_footer p {*/
        /*line-height: 150%;*/
        /*font-size: 14px;*/
        /*color: #A4AEB9;*/
        /*}*/
        /*.login_buttom_comm:hover{*/
        /*border-radius: 6px;*/
        /*background-color: #387BD1;*/
        /*color: #fff;*/
        /*}*/
        .user{
            width: 100%;
            height: 45px;
            text-indent:1em;
            font-size: 14px;
        }
        .code{
            width: 60%;
            height: 45px;
            text-indent:1em;
            font-size: 14px;
        }
        .code_img{
            width: 35%;
            height: 45px;
            float: right;
            margin-top: 20px;
            border: solid 1px #cccccc;
            border-radius: 6px;
            line-height: 45px;
            font-size: 14px;
            text-align: center;
        }
        .login_button {
            display: block;
            width: 65%;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            text-align: center;
            color: #ffffff;
            border-radius: 6px;
            margin-top: 20px;
            background-image: url('../../images/LoginIcon/login_go_icon.png');
        }

        .code_tip {
            display: block;
            width: 30%;
            height: 45px;
            float: right;
            line-height: 45px;
            text-align: center;
            font-size: 14px;
            color: #387BD1;
            margin-top: -45px;
        }


        .btn_share_icon {
            display: block;
            float: right;
            width: 36px;
            height: 36px;
            line-height: 30px;
            text-align: center;
            font-size: 30px;
            color: #f0f0f0;
            margin-right: 20px;
            border-radius: 50%;
            background-color: #9da1a8;
        }

        .btn_share_icon_qq:hover {
            background-color: #3399ff;
        }

        .btn_share_icon_sina:hover {
            background-color: #ff4d4d;
        }

        .btn_share_icon_weChat:hover {
            background-color: #17ce4b;
        }

        @media only screen and (min-width: 360px) {
            /*.user {*/
                /*width: 100%;*/
                /*height: 45px;*/
                /*text-indent: 1em;*/
                /*font-size: 14px;*/
            /*}*/

            /*.code {*/
                /*width: 230px;*/
                /*height: 45px;*/
                /*text-indent: 1em;*/
                /*font-size: 14px;*/
            /*}*/

            /*.left_bg_right {*/
                /*width: 350px;*/
                /*height: auto;*/
                /*margin: 0 auto;*/
            /*}*/

            /*.descriptor {*/
                /*width: 350px;*/
                /*height: auto;*/
                /*margin-top: 50px;*/
            /*}*/

            /*.descriptor img {*/
                /*width: 100%;*/
                /*height: auto;*/
            /*}*/

            /*.descriptor p {*/
                /*width: 350px;*/
                /*display: block;*/
                /*margin: 0;*/
                /*padding-top: 15px;*/
                /*text-align: right;*/
                /*color: #23446E;*/
            /*}*/

            /*.descriptor_01 {*/
                /*font-size: 30px;*/
            /*}*/

            /*.descriptor_02 {*/
                /*font-size: 36px;*/
            /*}*/

            /*.descriptor_03 {*/
                /*font-size: 42px;*/
            /*}*/

            .login_form {
                width: 350px;
                margin: 20px auto 0 auto;
            }

            .login_form input {
                border-radius: 6px;
                border: solid 1px #cccccc;;
                margin-top: 20px;
            }

            .code_img {
                width: 115px;
                height: 45px;
                float: right;
                margin-top: 20px;
                border: solid 1px #cccccc;
                border-radius: 6px;
            }

            /*.login_button {*/
                /*display: block;*/
                /*width: 250px;*/
                /*height: 45px;*/
                /*line-height: 45px;*/
                /*font-size: 16px;*/
                /*text-align: center;*/
                /*color: #ffffff;*/
                /*border-radius: 6px;*/
                /*margin-top: 20px;*/
                /*background-image: url('../../images/LoginIcon/login_go_icon.png');*/
            /*}*/
            /*.code_tip {*/
                /*display: block;*/
                /*width: 90px;*/
                /*height: 45px;*/
                /*float: right;*/
                /*line-height: 45px;*/
                /*text-align: center;*/
                /*font-size: 14px;*/
                /*color: #387BD1;*/
                /*margin-top: -45px;*/
            /*}*/

            .login_social {
                height: 36px;
                width: 185px;
                line-height: 36px;
                text-align: center;
                font-size: 14px;
                color: #387BD1;
                margin: 30px auto 50px auto;
            }

            .btn_share_name {
                width: 81px;
            }

            .login_reands_buttom {
                width: 230px;
                height: 40px;
                margin: 0 auto;
            }

            .login_register_buttom {
                float: left;
            }

            .login_service_buttom {
                float: right;
            }

            .login_buttom_comm {
                display: block;
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #387BD1;
                border-radius: 6px;
                border: solid 1px #387BD1;
            }

        }

        @media only screen and (max-width: 360px) {
            .login1_content {
                width: 100%;
                height: auto;
                background-color: #f0f0f0;
                font-family: "Microsoft YaHei" ! important;
            }
            /*.left_bg_right {*/
                /*width: 100%;*/
                /*height: auto;*/
                /*margin: 0 auto;*/
            /*}*/

            /*.descriptor {*/
                /*width: 100%;*/
                /*height: auto;*/
                /*margin-top: 50px;*/
            /*}*/
            /*.descriptor img {*/
                /*width: 100%;*/
                /*height: auto;*/
            /*}*/
            /*.descriptor p {*/
                /*width: 100%;*/
                /*display: block;*/
                /*margin: 0;*/
                /*padding-top: 15px;*/
                /*text-align: right;*/
                /*color: #23446E;*/
            /*}*/

            /*.descriptor_01{*/
            /*font-size: 30px;*/
            /*}*/
            /*.descriptor_02{*/
            /*font-size: 36px;*/
            /*}*/
            /*.descriptor_03{*/
            /*font-size: 42px;*/
            /*}*/
            .login_form {
                width: 100%;
                /*float: right;*/
                /*margin-top: 20px;*/
                margin: 20px auto 0 auto;
            }

            .login_form input {
                border-radius: 6px;
                border: solid 1px #cccccc;;
                margin-top: 20px;
            }

            .code_img {
                width: 115px;
                height: 45px;
                float: right;
                margin-top: 20px;
                border: solid 1px #cccccc;
                border-radius: 6px;
            }



            .login_social {
                margin-top: 30px;
                height: 36px;
                width: 185px;
                line-height: 36px;
                text-align: center;
                font-size: 14px;
                color: #387BD1;
                margin: 30px auto 50px auto;
            }

            .btn_share_name {
                width: 81px;
            }

            .login_reands_buttom {
                width: 100%;
                height: 40px;
                margin: 0 auto;
            }

            .login_register_buttom {
                float: left;
            }

            .login_service_buttom {
                float: right;
            }

            .login_buttom_comm {
                display: block;
                width: 45%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #387BD1;
                border-radius: 6px;
                border: solid 1px #387BD1;
            }

            .btn_share_icon {
                display: block;
                float: right;
                width: 36px;
                height: 36px;
                line-height: 30px;
                text-align: center;
                font-size: 30px;
                color: #f0f0f0;
                margin-right: 20px;
                border-radius: 50%;
                background-color: #9da1a8;
            }
            .btn_share_icon_qq:hover {
                background-color: #3399ff;
            }
            .btn_share_icon_sina:hover {
                background-color: #ff4d4d;
            }
            .btn_share_icon_weChat:hover {
                background-color: #17ce4b;
            }
        }
    }



</style>