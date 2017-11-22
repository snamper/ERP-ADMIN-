<template>
    <div class="log_login1_content">
        <div class="login_content_all clearfix">
            <div class="left_bg_right">
                <div class="descriptor">
                    <img :src="logoUrl">
                    <router-view></router-view>
                </div>
            </div>
            <div class="re_footer">
                <div class="re_footer_text" v-html="copyright">

                </div>
                <!--<div class="re_footer_text" v-show="webUser != 'inet'">-->
                    <!--<p>百图之上位，业内之首席， 成就客户在互联网领域的新发展、新成功</p>-->
                    <!--<p>Copyright 2012 杭州龙席网络科技股份有限公司 All Right Reserved 浙ICP备12042137号-2      友情链接：-->
                        <!--<a target="_black" href="http://www.loonxi.com/" class="re_footer_a">龙席网络</a>-->
                        <!--<a target="_black" href="http://www.onloon.net/" class="re_footer_a">盈店通</a>-->
                    <!--</p>-->
                <!--</div>-->
                <!--<div class="re_footer_text" v-show="webUser == 'inet'">-->
                    <!--<p>品牌企业移动互联网转型倡导者，为品牌插上移动分销的翅膀，飞的更高更远</p>-->
                    <!--<p>粤ICP备15090072号-1 艾网信息</p>-->
                <!--</div>-->
            </div>

        </div>
    </div>
</template>

<script>
    var getters = require('../../js/vuex/getters');
    var servers = require('../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
                logoUrl: '',
                copyright: '',
            }
        },
        vuex: {
            getters: {
                webUser: getters.getWebUser,
            }
        },
        ready: function () {
            var self = this;
            debugger
            servers.getAjax.bind(this)({
                url: '/Login/GetLoginPageResource'
            }).done(function(result) {
                if (result.ResultCode == 1) {
                    debugger
                    var loginResult = result.Data;
                    self.logoUrl = loginResult.LogoUrl;
                    self.copyright = loginResult.CopyrightDesc;
                    if (!self.logoUrl) {
//                        let logName = this.webUser == '@ViewBag.User' ? 'loonxi' : this.webUser;
//                        logName = logName == 'wolf' ? 'loonxi' : logName;// 本次调整发布时后端没有测试，暂时没有发布，所以先人为处理一下
                        self.logoUrl = require('../../images/LoginIcon/logo_loonxi.png');
                    }
                    if (!self.copyright) {
                        self.copyright = "<p>百图之上位，业内之首席， 成就客户在互联网领域的新发展、新成功</p><p>Copyright 2012 杭州龙席网络科技股份有限公司 All Right Reserved 浙ICP备12042137号-2      友情链接：<a href='http://www.onloon.net'>盈店通</a></p>"
                    }
                }
            })
//            let logName = this.webUser == '@ViewBag.User' ? 'loonxi' : this.webUser
//            logName = logName == 'wolf' ? 'loonxi' : logName // 本次调整发布时后端没有测试，暂时没有发布，所以先人为处理一下
            //                        this.logoUrl = require('../../images/LoginIcon/logo_' + logName + '.png');
//

        }
    }
</script>

<style rel="stylesheet/less" lang="less" >
    .log_login1_content {
        width: 100%;
        height: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: #f0f0f0;
        font-family: "Microsoft YaHei" ! important;
        overflow:auto;
        padding: 10px;

        .descriptor{
            width: 100%;
            height: auto;
            margin-top: 50px;
        }
        .descriptor img{
            width: 100%;
            height: auto;
        }
        /*.descriptor p{*/
            /*width: 100%;*/
            /*display: block;*/
            /*margin: 0;*/
            /*padding-top: 15px;*/
            /*text-align: right;*/
            /*color: #23446E;*/
        /*}*/

        .re_footer p {
            line-height: 150%;
            font-size: 14px;
            color: #A4AEB9;
        }
        .login_buttom_comm:hover{
            border-radius: 6px;
            background-color: #387BD1;
            color: #fff;
        }
        .re_footer_text {
            width: 100%;
            margin: 0 auto;
            padding-top: 90px;
            text-align: center;
        }
        .re_footer_a {
            color: #666666;
        }

        @media only screen and (min-height: 750px) {
            .re_footer_text {
                width: 94%;
                margin: 0 auto;
                padding-top: 30px;
                text-align: center;
                position: fixed;
                bottom: 50px;
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
                /*float: right;*/
                /*margin-top: 20px;*/
                margin:20px auto 0 auto;
            }


        }

        @media only screen and (max-width: 360px) {
            /*.login1_content {*/
                /*width: 100%;*/
                /*height: auto;*/
                /*position: fixed;*/
                /*background-color: #f0f0f0;*/
                /*font-family: "Microsoft YaHei" ! important;*/
            /*}*/

            .left_bg_right{
                width: 100%;
                height: auto;
                margin: 0 auto;
            }
            /*.descriptor{*/
                /*width: 100%;*/
                /*height: auto;*/
                /*margin-top: 50px;*/
            /*}*/
            /*.descriptor img{*/
                /*width: 100%;*/
                /*height: auto;*/
            /*}*/
            /*.descriptor p{*/
                /*width: 100%;*/
                /*display: block;*/
                /*margin: 0;*/
                /*padding-top: 15px;*/
                /*text-align: right;*/
                /*color: #23446E;*/
            /*}*/

        }
    }


</style>