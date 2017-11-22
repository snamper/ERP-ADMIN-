<template>
    <div class="app-body">
        <guide-notice></guide-notice>
        <v-header></v-header>
        <nav-bar :links.sync="links" :full.sync="full" :second.sync="second" :first.sync="first" :linkPath.sync="linkPath"></nav-bar>
        <div class="main-page" :class="{'main-full':(full&&second),'main-full':second}">
            <tab></tab>
            <div class="w-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../js/servers/servers');
    var cookie = require('js-cookie');
    module.exports = {
        data: function () {
            return {
                linkPath: '',
                links: [],
                full: true,
                first: true,
                second: true,
                third: false,
            }
        },
        methods: {
            onlineHeartBeat: function () {
                servers.getAjax({
                    url: '/Login/ErpUserOnlineHeartBeat'
                }).done(function (result) {
//                    console.log('ok');
                })
            },
//            logout: function () {
//                $.ajax({
//                    type: 'get',
//                    url: '/Login/ErpLogout',
//                    async: false
//                });
////                cookie.remove('userName');
////                cookie.remove('userID');
//                this.clearTab();
//            }
        },
        ready: function () {
            var self = this;
//            console.log(this.$refs.upload);
//            console.log(self);
            //心跳 8分钟查询一次
            setInterval(this.onlineHeartBeat,1*60*1000);
            window.top.onbeforeunload = function (event) {
                if (typeof event == 'undefined') {
                    event = window.event;
                }
                //有上传的地方不会弹出提示,因为图片下载的时候会刷新iframe
                if (event && !document.getElementById('upload')) {
                    return '为确保内容不丢失，建议点击页面左上角退出登录后再离开\n-----------------------------------------';
                }
            };
        },
        route: {
            data: function (transition) {
                if (transition.to.name === 'index') {
                    this.$route.router.go({ name: 'dashboard' });
                }
                transition.next();
            }
        },
        components: {
            vHeader: require('../components/header.vue'),
            navBar: require('../components/navbar.vue'),
            tab: require('../components/tab.vue'),
            pagination: require('../components/pagination.vue'),
            guideNotice: require('../components/guide-notice.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .app-body {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    .main-page {
        position: absolute;
        left: 50px;
        top: 0;
        right: 0;
        bottom: 0;
        transition: left 0.2s;
        min-width: 600px;
        &.main-full {
            left: 200px;
        }
        /*&.main-second {*/
            /*left: 350px;*/
        /*}*/
        &.main-second-icon {
            left: 200px;
        }
        /*&.main-first-second {*/
        /*left: 350px;*/
        /*}*/
    }
    .w-content {
        width: 100%;
        padding: 20px;
        padding-top:50px;
    }
</style>
