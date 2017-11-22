<template>
    <div class="personal personal-one row col-lg-5 col-md-3 col-sm-2">
        <div class="personal-one-left col-lg-5 col-md-5 col-sm-5">
            <div class="head-portrait">
                <div class="head-portrait-bd">
                    <img src="../../../../images/compass-portrait.png" alt="">
                </div>
            </div>
            <div class="portarit-name">{{account.Name}}</div>
        </div>
        <div class="personal-one-right col-lg-7 col-md-7 col-sm-7">
            <ul class="portarit-show">
                <li><span>账号：</span>{{account.Login}}</li>
                <li><span>套餐：</span>{{account.PriceLevelName}}</li>
                <li><span>有限期：</span>{{account.OverDay}}天</li>
            </ul>
        </div>
    </div>
</template>

<script>
    var getters = require('../../../../js/vuex/getters');
    var actions = require('../../../../js/vuex/actions');
    var servers = require('../../../../js/servers/servers');
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
            // 获取账号信息
            getUserInfo: function () {
                var self = this;
                servers.postAjax({
                    url: '/Login/ErpGetUserInfo',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.updateAccount(result.Data);
                    }
                })
            }
        },
        ready: function () {
            if (!this.account.Login) {
                this.getUserInfo();
            }
        },
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>