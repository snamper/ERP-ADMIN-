<template>
    <div class="re_container">
        <div class="register_header">
            <div class="register_logo">
                <img src="../../images/re_logo.png">
                <p>龙席沃佛电子商务零售管理系统</p>
                <div class="login_top_right">
                    <ul>
                        <a href=""><li class="contact_qq_img iconfont">&#xe600;</li></a>
                        <li class="contact_service">联系客服：400-123-1234</li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="re_footer">
            <div class="re_footer_text">
                <p>已有登录账号？您还可以已有登录账号？您还可以已有登录账号</p>
                <p>已有登录账号？您还可以已有登录账号？您还可以已有登录账号您还可以已有登录账号</p>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        
    };
</script>

<style lang="less" rel="stylesheet/less" >
    *{
        margin: 0;
        padding: 0;
    }
    .clear{clear:both}
    .re_container{
        width: 100%;
    }
    .register_header{
        width: 100%;
        border-bottom: solid 1px #cccccc;
    }
    .register_logo{
        width: 1200px;
        height: 73px;
        margin: 17px auto 0 auto;
        background-color: #ffffff;
    }
    .register_logo img{
        width: 73px;
        height: 73px;
        float: left;
    }
    .register_logo p{
        float: left;
        width:300px;
        height: 73px;
        font-size: 20px;
        color:#434A54;
        font-weight: bold;
        text-align: center;
        padding-top: 35px;
        margin: 0;
    }
    .login_top_right {
        margin: 0 auto;
        padding:0;
        width: 300px;
        height:73px;
        float: right;
    }
    .login_top_right li{
        float: right;
        line-height: 22px;
        text-align: center;
    }
    .contact_qq_img{
        width:30px;
        height: 30px;
        border-radius: 50%;
        font-size: 20px;
        margin-top: 35px;
        background-color: #3399ff;
        color:#f0f0f0;
    }
    .contact_service{
        width:185px;
        height: 19px;
        font-size: 14px;
        margin-top: 39px;
        color:#434A54;
    }
    .re_footer{
        background-color: #ffffff;
        width: 100%;
        height: auto;
        text-align: center;
    }
    .re_footer_text{
        width: 1200px;
        margin:90px auto 0 auto;
        padding-top: 30px;

        border-top: solid 1px #cccccc;
    }
    .re_footer p{
        line-height: 150%;
        font-size: 14px;
        color: #A4AEB9;
    }
</style>