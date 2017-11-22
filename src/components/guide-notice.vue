<template>
    <div v-if="account.Guide" class="guide-notice" transition="expand">
        <div class="guide-content">
            <p>欢迎使用龙席沃弗ERP,您还没添加商铺吗?马上去<a @click="hideGuide" v-link="{name:'commodity-index'}">添加</a>吧</p>
        </div>
        <div class="guide-close">
            <a @click="neverGuide" href="javascript:void(0)" class="btn btn-warning">不再显示</a>
        </div>
    </div>
</template>

<script>
    var getters = require('../js/vuex/getters');
    var actions = require('../js/vuex/actions');
    var servers = require('../js/servers/servers');
    module.exports = {
        vuex: {
            getters: {
                account: getters.getAccount
            },
            actions: {
                updateAccount: actions.updateAccount
            }
        },
        methods: {
            hideGuide: function () {
                this.account.Guide = 0;
                this.updateAccount(this.account);
            },
            neverGuide: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpDoNotGuide'
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.hideGuide();
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .guide-notice {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 36px;
        background: rgba(0,0,0,0.6);
        z-index: 101;
        color: #fff;
        overflow: hidden;
        transition: height linear 0.5s;
        &.expand-leave {
            height: 0;
        }
        .guide-content {
            line-height: 36px;
            text-align: center;
        }
        .guide-close {
            position: absolute;
            right: 120px;
            top: 50%;
            transform: translate(0,-50%);
        }
    }
</style>