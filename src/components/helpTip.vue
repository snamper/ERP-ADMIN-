<template>
    <div class="helpWindow" v-if="isShowBrowserHelp">
        有问题请联系：<div class="browserBtn" ><a :href="downloadLink" >4009615377</a></div>
        <span class="iconfont icon-closeBrower"  @click="closeBrowTitle" ></span>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                isShowBrowserHelp: false,
                downloadLink: ''
            }
        },
        methods: {
            fGetQuery: function (name) {
                var sUrl=window.location.search.substr(1);
                var r = sUrl.match(new RegExp("(^|&)"+name+"=([^&]*)(&|$)"));
                return (r==null ? null : unescape(r[2]));
            },
            fBrowserRedirect: function () {
                var bForcepc=this.fGetQuery("dv")=="pc";
                var sUserAgent=navigator.userAgent.toLowerCase();
                var bIsIpad=sUserAgent.match(/ipad/i)=="ipad";
                var bIsIphoneOs=sUserAgent.match(/iphone os/i)=="iphone os";
                var bIsMidp=sUserAgent.match(/midp/i)=="midp";
                var bIsUc7=sUserAgent.match(/rv:1.2.3.4/i)=="rv:1.2.3.4";
                var bIsUc=sUserAgent.match(/ucweb/i)=="ucweb";
                var bIsAndroid=sUserAgent.match(/android/i)=="android";
                var bIsCE=sUserAgent.match(/windows ce/i)=="windows ce";
                var bIsWM=sUserAgent.match(/windows mobile/i)=="windows mobile";
                if(bIsIpad||bIsIphoneOs||bIsAndroid||bIsMidp||bIsUc7||bIsUc||bIsCE||bIsWM) {
                    this.isMobile = true;
                    if(!bForcepc){
                        this.isMobile = true;
                    }
                }
            },
        },
        ready: function () {
            this.fGetQuery();
            this.fBrowserRedirect();

        }
    };
</script>
<style rel="stylesheet/less" lang="less">

    .helpWindow {
        width: 100%;
        height: 50px;
        color: #fff;
        background: #287be6;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 5000;

        .browserBtn {
            width: 100px;
            height: 30px;
            line-height: 25px;
            border: 2px solid #fff;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
            a {
                color: #fff;
            }

        }
    }
</style>
