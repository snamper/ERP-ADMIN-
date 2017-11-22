<template>
    <div class="re_container">
        <div class="register_header">
            <div class="register_top"></div>
            <div class="register_logo">
                <img src="../../../images/re_logo.png">
                <p>龙席沃佛电子商务零售管理系统</p>
            </div>
        </div>
        <div class="register_state clearfix">
            <div id="first" :class="{'re_stating_ing':state.first}" class="re_stating">
                <div class="state_01 stating1" :class="{'hover':state.one}" id="one">1
                    <span class="registerT re_text">手机验证</span>
                </div>
            </div>
            <div id="second" :class="{'re_stating_ing':state.second}" class="re_stating">
                <div class="state_01 stating1" :class="{'hover':state.two}" id="two">2
                    <span class="re_text registerT">账号信息</span>
                </div>
            </div>
            <div id="third" :class="{'re_stating_ing':state.third}" class="re_stating">
                <div class="state_01 stating1" :class="{'hover':state.three}" id="three">3
                    <span class="re_text registerT">企业信息</span>
                </div>
                <div class="state_04 stating1" :class="{'hover'

                :state.four}" id="four">4
                    <span class="re_text registerT ">注册成功</span>
                </div>
            </div>
        </div>
        <div class="register_content_form">
            <router-view :phone-validation.sync="phoneValidation" :validate-smscode.sync="validateSmscode"></router-view>
        </div>
        <div class="re_footer">
            <div class="re_footer_text">
                <p>百图之上位，业内之首席， 成就客户在互联网领域的新发展、新成功</p>
                <p>Copyright 2012 杭州龙席网络科技股份有限公司 All Right Reserved 浙ICP备12042137号-2      友情链接： <a target="_black" href="http://www.ju53.com/" class="re_footer_a">JU53</a>
                    <a target="_black" href="http://www.mojingonline.com/" class="re_footer_a">魔镜在线</a>
                </p>
            </div>
        </div>
    </div>
    <!--<div>{{phoneValidation | json}}</div>-->
</template>
<script type="text/javascript">
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                phoneValidation: {
                    Mobile: "",
                    ImageValidateCode: ""
                },
                validateSmscode: {
                    SMSValidateCode: '',
                    Password: '',
                    ConfirmPassword: '',
                },
                state: {
                    first: false,
                    second: false,
                    third: false,
                    one: false,
                    two: false,
                    three: false,
                    four: false
                }
            }
        },
        ready: function () {
            var  _hmt  =  _hmt  ||  [];
            (function()  {
                var  hm  =  document.createElement("script");
                hm.src  =  "//hm.baidu.com/hm.js?3d9f9bb85e5b6ee1cef41943f116ac06";
                var  s  =  document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm,  s);
            })();
        },
        route: {
            data: function (transition) {
                var self = this;
                switch (transition.to.name) {
                    case 'register':
                        self.state = {
                            first: false,
                            second: false,
                            third: false,
                            one: true,
                            two: false,
                            three: false,
                            four: false
                        };
                        break;
                    case  'account-information' :
                        self.state = {
                            first: true,
                            second: false,
                            third: false,
                            one: true,
                            two: true,
                            three: false,
                            four: false
                        };
                        break;
                    case  'register-next' :
                        self.state = {
                            first: true,
                            second: true,
                            third: false,
                            one: true,
                            two: true,
                            three: true,
                            four: false
                        };
                        break;
                    case  'register-success' :
                        self.state = {
                            first: true,
                            second: true,
                            third: true,
                            one: true,
                            two: true,
                            three: true,
                            four: true
                        };
                        break;
                    default:
                        self.state = {
                            first: false,
                            second: false,
                            third: false,
                            one: false,
                            two: false,
                            three: false,
                            four: false
                        };


                }
            }
        }

    };
</script>

<style rel="stylesheet/less" lang="less">
    .re_container {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        font-family: "Microsoft YaHei" ! important;
        /* background-color:pink;*/
        background-size: cover;
        /*height:800px;*/
        height: auto;
        overflow: auto;

    .registration {
    }

    .register_header {
        /*position: fixed;*/
        top: 90px;
        width: 100%;
        border-bottom: solid 1px #ccc;
    }

    /*.register_top {*/
        /*width: 100%;*/
        /*height: 17px;*/
    /*}*/

    .register_logo {
        width: 1200px;
        padding-left: 30px;
        height: 73px;
        margin: 35px auto 0 auto;
        background-color: #ffffff;
    }



    .register_logo img {
        width: 73px;
        height: 73px;
        float: left;
    }

    .register_logo p {
        float: left;
        width: 370px;
        height: 73px;
        font-size: 20px;
        color: #434A54;
        font-weight: bold;
        /*text-align: center;*/
        padding-top: 38px;
        padding-left: 10px;
        margin: 0;
    }

    .register_state {
        width: 980px;
        height: 60px;
        padding-left: 40px;
        padding-right: 40px;
        margin: 150px auto 0 auto;
        /*background-color: #e7e7e7;*/
        /*position: relative;*/
    }

    .re_stating {
        width: 300px;
        height: 12px;
        background-color: #e7e7e7;
        position: relative;
        float: left;
    }

    .re_stating_ing {
        width: 300px;
        height: 12px;
        background-color: #ed5565;
        position: relative;
        float: left;
    }

    .stating {
        border-radius: 50%;
        width: 36px;
        height: 36px;
        background-color: #ed5565;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
    }

    .stating1 {
        border-radius: 50%;
        width: 36px;
        height: 36px;
        background-color: #e7e7e7;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
    }

    .state_01 {
        position: absolute;
        top: -12px;
        left: -12px;
    }

    .state_04 {
        position: absolute;
        top: -12px;
        left: 288px;
    }

    .re_text {
        color: #e7e7e7;
    }

    .registerT {
        width: 100px;
        height: 30px;
        position: absolute;
        top: 36px;
        left: -30px;
        line-height: 30px;
        /*	background-color: red;*/
        color: #434A54;
        font-size: 18px;
        text-align: center;
    }

    .register_form {
        width: 432px;
        height: 193px;
        margin: 88px auto 0 auto;
        /*background-color: red;*/
    }

    .tel861 {
        position: relative;
        border-radius: 6px;
    }

    .register_content_form {
        width: 100%;
        height: auto;
    }

    .re_footer {
        /*background-color: #ffffff;*/
        width: 100%;
        height: auto;
        margin-top: 50px;
        padding-bottom:30px;

    }

    .re_footer_text {
        width: 1200px;
        margin: 0 auto;
        border-top: solid 1px #cccccc;
        padding-top: 30px;
        text-align: center;
        padding: 10px;
        margin-bottom: 30px;
    }

    .re_footer p {
        line-height: 150%;
        font-size: 14px;
        color: #A4AEB9;
    }

    .footer_line {
        width: 1200px;
        height: 30px;
        border-top: solid 1px #ccc
    }

    .hover {
        background-color: #ed5565;
    }
    .re_footer_a {
        color: #666666;
    }
    }

    @media only screen and (min-height: 980px) {
        .re_container {
            .re_footer {
                position: fixed;
                bottom: 50px;
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        .re_container {
            .register_logo {
                width: 100%;
                padding-left: 10px;
            }
            /*.re_footer_text {*/
               /*margin: 0 auto;*/
            /*}*/

            .register_logo img {
                width: 53px;
                height: 53px;
                margin-top: 20px;
            }

            .register_logo p {
                width: 235px;
                font-size: 16px;
                padding-top: 49px;
            }

            .register_state {
                width: 100%;
                margin: 95px auto 0 auto;
                padding-left: 14%;
                /*padding-right: 20px;*/
            }

            .re_stating {
                width: 30%;
            }
            .state_04 {
                left: 92%;
                top: -7px;
            }
            .state_01 {
                left: -7px;
                top: -7px;
            }
            .stating1 {
                width: 25px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                font-size: 14px;
            }
            .registerT {
                width: 85px;
                font-size: 12px;
            }


            .re_footer_text {
                width: 100%;
                /*margin: 90px auto 0 auto;*/
                /*border-top: solid 1px #cccccc;*/
                /*padding-top: 30px;*/
                /*text-align: center;*/
            }
        }
        @media only screen and (max-width: 780px) {
            .re_container {
                .register_content_form{
                    width: 90%;
                }
            }
            }
    }
</style>