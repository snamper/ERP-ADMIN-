<template>
    <div class="account_form clearfix">
        <div class="re_tip">
            <div class="re_tip_img"></div>
            <div class="re_tip_text">恭喜您，授权成功！</div>
        </div>
        <div class="empower_all_li">
            <ul class="clearfix">
                <li class="empower_li_left empower_li">APPKey：</li>
                <li class="empower_li_right empower_last">APPSsecretPSsecr etPSsecret</li>
                <li class="empower_li_left empower_li">APPSsecret:</li>
                <li class="empower_li_right empower_last"></li>
                <li class="empower_li_left empower_li"></li>
                <li class="empower_li_right empower_last"></li>
            </ul>
        </div>
        <div class="empower_btn_div"><a type="button" class="empower_btn">授权保存</a></div>
    </div>
</template>

<script>
    module.exports = {

    };
</script>

<style lang="less" rel="stylesheet/less" >
    .account_form {
        width: 1200px;
        height: auto;
        margin: 88px auto 0 auto;

    }
    .re_tip{
        width: 363px;
        height: 53px;
        margin: 0 auto 17px auto;
    }
    .re_tip_img{
        width:53px;
        height: 53px;
        float: left;
        background-image:url("../../images/LoginIcon/empower_yes.png") ;
    }
    .re_tip_text{
        width:310px;
        height:53px;
        float: right;
        line-height: 53px;
        text-align: center;
        color: #13c824;
        font-size: 34px;
    }
    .empower_all_li{
        width: 600px;
        height: auto;
        margin: 0 auto;
    }
    .empower_all_li ul li:nth-of-type(1){
        border-radius:10px 0 0 0;
        border-top: solid 1px #b8d4f9;

    }
    .empower_all_li ul li:nth-of-type(2){
        border-radius:0 10px 0 0;
        border-top: solid 1px #b8d4f9;
        border-right: solid 1px #b8d4f9;
    }
    .empower_all_li ul li:nth-last-child(2){
        border-radius: 0 0  0 10px;
    }
    .empower_all_li ul li:nth-last-child(1){
        border-radius: 0 0 10px 0;
    }
    .empower_all_li ul li:nth-of-type(odd){
        background: #EDF6FF;
    }

    .empower_li{
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        text-indent:2em;
        float: left;
    }
    .empower_last{
        width: 397px;
        height: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        text-indent:2em;
        float: left;
    }
    .empower_li_left{
        border-left: solid 1px #b8d4f9;
        border-bottom: solid 1px #b8d4f9;
    }
    .empower_li_right{
        border-right: solid 1px #b8d4f9;
        border-left: solid 1px #b8d4f9;
        border-bottom: solid 1px #b8d4f9;
    }
    .empower_btn_div{
        display: block;
        width: 432px;
        height: 48px;
        margin: 0 auto;
    }
    .empower_btn{
        width: 432px;
        height: 48px;
        margin-top: 40px;
        border-radius: 6px;
        background-image: url("../../images/re_buttom.png");
        line-height: 48px;
        text-align: center;
        font-size:16px;
        color: #ffffff;
    }
</style>