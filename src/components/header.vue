<template>
    <header class="topbar clearfix">
        <div class="topbar-logo">
            <a v-link="{name:'dashboard'}">
                <img :src="logoUrl" alt="wolf erp">
            </a>
        </div>
        <!--<div class="dropdown topbar-products">-->
            <!--<a href="javascript:void(0)" class="dropdown-toggle topbar-nav-link" data-toggle="dropdown">-->
                <!--<span>产品与服务</span>-->
                <!--<span class="icon-arrow-dropdown iconfont"></span>-->
            <!--</a>-->
            <!--<div class="dropdown-menu topbar-products-dropdown">-->
                <!--<div class="topbar-products-col" v-for="n in 3">-->
                    <!--<div class="topbar-products-items">-->
                        <!--<p class="products-category-title">分类{{2*n+1}}</p>-->
                        <!--<ul class="products-category-lists">-->
                            <!--<li class="products-category-item" v-for="i in 5"><a href="#">产品{{i}}</a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="topbar-products-items">-->
                        <!--<p class="products-category-title">分类{{2*n + 2}}</p>-->
                        <!--<ul class="products-category-lists">-->
                            <!--<li class="products-category-item" v-for="i in 3"><a href="#">产品{{i}}</a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="topbar-help">-->
            <!--<a href="#" class="topbar-nav-link">帮助文档</a>-->
        <!--</div>-->
        <div class="topbar-info clearfix">
            <!--<div class="topbar-info-item" v-for="item in count">-->
                <!--<div class="info-item-wrap">-->
                    <!--<p class="info-item-container">-->
                        <!--<span class="info-item-title">{{item.title}}</span>-->
                        <!--<span class="info-item-count">{{item.num}}</span>-->
                    <!--</p>-->
                <!--</div>-->
            <!--</div>-->
            <div class="topbar-info-user" v-if="loginName">
                <div class="dropdown">
                    <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle topbar-nav-link">
                        <span>{{loginName}}</span>
                        <span class="icon-arrow-dropdown iconfont"></span>
                    </a>
                    <ul class="dropdown-menu topbar-user-dropdown">
                        <li class="user-setting-item"><a v-link="{name:'reset-password'}">修改密码</a></li>
                        <!--<li @click="clearTab" class="user-setting-item"><a href="javascript:void(0)">关闭菜单</a></li>-->
                        <li class="user-setting-item"><a v-link="{name:'wechat-comfir'}">微信配置</a></li>
                        <li @click="logout" class="user-setting-item"><a href="javascript:void(0);">退出</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    var servers = require('../js/servers/servers');
    var cookie = require('js-cookie');
    var actions = require('../js/vuex/actions');
    var getters = require('../js/vuex/getters');
    module.exports = {
        data: function () {
            return {
                loginName: '',
                logoUrl: '',
            }
        },
        vuex: {
            actions: {
                clearTab: actions.clearTab,   //清除tab
                clearNavLists: actions.clearNavLists //清除菜单
            },
            getters: {
                webUser: getters.getWebUser
            }
        },
        methods: {
            //退出登录
            logout: function () {
                var self = this;
                if (cookie.get('isB2C')) {
                    if (!confirm("您确定要关闭本页吗？")) {
                        return;
                    }
                }
                servers.getAjax.bind(this)({
                    url: '/Login/ErpLogout'
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        cookie.remove('userName');
                        cookie.remove('userID');
                        self.clearTab();
                        self.clearNavLists();
                        if (cookie.get('isB2C')) {
                            location.href = 'http://shop.onloon.net/login.html'
                        } else {
                            self.$route.router.go('/log/login')
                        }
                    }
                })
            },
            test() {
                window.opener = null;
                window.open('http://www.baidu.com', '_self');
                window.close()
            },
        },
        ready: function () {

            let logName = this.webUser == '@ViewBag.User' ? 'loonxi' : this.webUser
            logName = logName == 'wolf' ? 'loonxi' : logName // 本次调整发布时后端没有测试，暂时没有发布，所以先人为处理一下

            this.logoUrl = require('../images/logo_' + logName + '.png');
            var loginName = cookie.get('userName');
            if (loginName) {
                this.loginName = loginName;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @headerHeight: 50px;
    .topbar {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: @headerHeight;
        background: #4560a7;
        z-index: 100;
    }
    .topbar-logo {
        float: left;
        width: 200px;
        text-align: center;
        background: #425994;
        height: @headerHeight;
        color: #fff;
    }
    .topbar-products,
    .topbar-info-user .dropdown {
        float: left;
        &.open {
            .topbar-nav-link {
                background: #fff;
                color: #232b3a;
            }
            .icon-arrow-dropdown {
                vertical-align: text-top;
                transform: rotate(180deg);
            }
        }
    }
    .topbar-help {
        float: left;
    }
    .topbar-nav-link {
        display: inline-block;
        height: @headerHeight;
        line-height: @headerHeight;
        color: #fff;
        padding-left: 40px;
        padding-right: 40px;
        font-size: 14px;
        &:hover,:focus {
            color: #fff;
        }
        border-right: 1px solid #637ab7;
        &:last-child {
            border: none;
        }
    }
    .icon-arrow-dropdown {
        display: inline-block;
        width: 10px;
        font-size: 8px;
        vertical-align: middle;
        text-align: center;
        line-height: 1;
        transition: transform 0.2s, vertical-align 0.2s;
        &:before {
            content: "\e603";
        }
    }
    .topbar-products-dropdown {
        border-radius: 0;
        border: none;
        padding: 5px 40px 5px 5px;
        white-space: nowrap;
    }
    .topbar-products-col {
        display: inline-block;
        margin-left: 40px;
        min-width: 212px;
    }
    .topbar-products-items {
        .products-category-title {
            font-size: 14px;
            color: #29344a;
            line-height: 50px;
            border-bottom: 1px solid #e5e5e5;
        }
        .products-category-item {
            line-height: 30px;
            a {
                color: #999;
                cursor: pointer;
                &:hover {
                    color: #eaa750;
                }
            }
        }
    }
    .topbar-info {
        position: absolute;
        top: 0;
        right: 0;
        height: @headerHeight;
        background: #4e68af;
    }
    .topbar-info-item,
    .topbar-info-user {
        float: left;
        height: @headerHeight;
    }
    .topbar-info-user {
        background: #4560a7;
        margin-left: -2px;
    }
    .topbar-info-item {
        display: table;
    }
    .info-item-wrap {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        font-size: 0;
    }
    .info-item-container {
        display: inline-block;
        padding-left: 20px;
        padding-right: 20px;
        border-right: 1px solid #6e82b8;
        margin: 0;
    }
    .info-item-title {
        display: block;
        font-size: 12px;
        color: #e5eeff;
    }
    .info-item-count {
        font-size: 24px;
        color: #fff;
        font-weight: normal;
    }
    .topbar-user-dropdown {
        border-radius: 0;
        width: 100%;
        box-shadow: none;
        padding: 0;
        >.user-setting-item {
            padding-left: 40px;
            &:hover {
                background: #fff;
                >a {
                    background: #fff;
                    color: #eaa750;
                }
            }
            >a {
                line-height: 44px;
                color: #29344a;
            }
        }
    }

</style>