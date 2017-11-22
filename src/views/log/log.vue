<template>
    <div class="login-container">
        <div class="login-main">
            <div class="login-header">
                <img class="login-logo" src="../../images/logo-big.png" alt="wolf ERP"/>
                <span class="welcome-word">欢迎使用电子商务零售管理系统</span>
            </div>
            <div class="login-filed clearfix">
                <router-view></router-view>
                <!--<div class="login-third-part login-third-part-monroe">-->
                    <!--<a href="javascript:void(0)" class="btn-share btn-qq"><span class="iconfont">&#xe600;</span>使用QQ账号登录</a>-->
                    <!--<a href="javascript:void(0)" class="btn-share btn-weChat"><span class="iconfont">&#xe602;</span>使用微信账号登录</a>-->
                    <!--<a href="javascript:void(0)" class="btn-share btn-sina"><span class="iconfont">&#xe601;</span>使用新浪微博登录</a>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
//        props: ['showHeader','showNavBar'],
        ready: function () {

//            this.showHeader = false;
//            this.showNavBar = false;
        }
    };
</script>

<style rel="stylesheet/less"  lang="less">

    .login-container {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: url(../../images/bg/bg-login.jpg) no-repeat;
        background-size: cover;
    }
    .login-main {
        width: 600px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .login-logo {
        vertical-align: bottom;
    }
    .welcome-word {
        font-size: 16px;
        color: #425994;
    }
    .login-filed {
        margin-top: 86px;
    }
    .login-third-part {
        float: left;
        box-sizing: border-box;
        padding-left: 42px;
        .btn-share {
            display: block;
            height: 50px;
            width: auto;
            padding-left: 12px;
            padding-right: 12px;
            border-radius: 25px;
            font-size: 14px;
            margin-bottom: 12px;
            line-height: 50px;
            color: #fff;
            &:hover {
                text-decoration: none;
                 opacity: 0.8;
             }
        }
        span {
            padding-right: 12px;
            font-size: 28px;
        }
        .btn-qq {
            background: #009ed6;
        }
        .btn-weChat {
            background: #08c310;
        }
        .btn-sina {
            background: #ff4a4a;
        }
    }
    .login-form {
        float: left;
        width: 360px;
        box-sizing: border-box;
        padding-right: 52px;
        border-right: 1px solid #c0cded;
        .form-control {
            background: #8c98b8;
            border: 1px solid #8c98b8;
            color: #fff;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #fff;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #fff;
        }

        input:-ms-input-placeholder {
            color: #fff;
        }

        input::-webkit-input-placeholder {
            color: #fff;
        }
        .input-group-addon {
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid #8c98b8;
        }
        .btn-link {
            float: right;
            font-size: 14px;
            color: #7385b8;
        }
    }
    .login-third-part-monroe{
        .btn-share{
            line-height:42px;
        }
    }
</style>