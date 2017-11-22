<template>
  <div class="browserWindow" v-if="isShowBrowserDownload">
      您目前使用的浏览器可能无法得到最佳浏览效果，建议使用chrome谷歌浏览器。
          <div class="browserBtn" ><a :href="downloadLink" >chrome下载</a></div>
      <span class="iconfont icon-closeBrower"  @click="closeBrowTitle" ></span>
  </div>
</template>
<style rel="stylesheet/less" lang="less">

    .browserWindow{
        width: 100%;
        height:50px;
        color:#fff;
        background: #287be6;
        line-height:50px;
        text-align:center;
        font-size:14px;
        position:fixed;
        left:0;
        bottom:0;
        z-index:5000;

    }

    .browserBtn {
        width: 100px;
        height: 30px;
        line-height:25px;
        border: 2px solid #fff;
        display: inline-block;
        margin-left:10px;
        cursor:pointer;
        a{
            color:#fff;
        }

    }
</style>
<script>
    module.exports = {
        data: function () {
            return {
                isShowBrowserDownload: false,
                downloadLink: '',
                isMobile: false
            }
        },
        methods: {
            closeBrowTitle:function(){
                this.isShowBrowserDownload = false;
            },
            validataOS:function(){

                if(navigator.userAgent.indexOf("Window")>0){
                    this.downloadLink = 'http://sw.bos.baidu.com/sw-search-sp/software/fc14f1545b7/ChromeStandalone_51.0.2704.106_Setup.exe';

                }else if(navigator.userAgent.indexOf("Mac OS X")>0) {
                    this.downloadLink  = 'http://sw.bos.baidu.com/sw-search-sp/software/441142fc7c4/googlechrome_mac_50.0.2661.102.dmg';


                }else{
                    this.downloadLink  = 'http://sw.bos.baidu.com/sw-search-sp/software/fc14f1545b7/ChromeStandalone_51.0.2704.106_Setup.exe';
                }

            },
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
            userAgent: function (link) {
                var userAgent=navigator.userAgent.toLowerCase(), s, o = {};
                var browser={
//                    version:(userAgent.match(/(?:firefox|opera|safari|chrome|msie)[\/: ]([\d.]+)/))[1],
                    safari:/version.+safari/.test(userAgent),
                    chrome:/chrome/.test(userAgent),
                    firefox:/firefox/.test(userAgent),
                    ie:/msie/.test(userAgent),
                    opera: /opera/.test(userAgent )
                }; /* 获得浏览器的名称及版本信息 */

                this.fBrowserRedirect();

                if (browser.chrome || this.isMobile) {
                    this.isShowBrowserDownload = false;
                }else{
                    this.isShowBrowserDownload = true;
                }
            }
        },
        ready: function () {
            this.userAgent();
            this.validataOS();

        }
    }

</script>

