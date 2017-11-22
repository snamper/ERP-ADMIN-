<template>
    <div class="personal personal-two row col-lg-7 col-md-5 col-sm-5">
        <div @click="gotoPath('/distribution/order-todo')" class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitDistributorQty}}</span>
                <i>订货订单</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon05.png" alt="">
                </span>
            </div>
        </div>
        <div @click="gotoPath('/order-todo/empty')"  class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitCheckQty}}</span>
                <i>提货订单</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon02.png" alt="">
                </span>
            </div>
        </div>

        <div @click="gotoPath('/order-todo/pick','/order-todo/empty')"  class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitSendQty}}</span>
                <i>待发货</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon06.png" alt="">
                </span>
            </div>
        </div>
        <div @click="gotoPath('/refund/empty')"  class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitReturnQty}}</span>
                <i>待退货</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon04.png" alt="">
                </span>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    var servers = require('../../../../js/servers/servers');
    var getters = require('../../../../js/vuex/getters');
    var actions = require('../../../../js/vuex/actions');
    module.exports = {
        data: function () {
            return {
                orderInfo: {
                    WaitCheckQty: 0, //待审核 （提货订单）
                    WaitConfirmedQty: 0, //待转单
                    WaitReturnQty: 0, //待退货
                    WaitSendQty: 0, //待发货
                    WaitDistributorQty: 0  // 订货订单数量
                }
            }
        },
        vuex: {
            getters: {
                navLists: getters.getNavLists
            },
        },
        computed: {
            navPaths: {
                get() {
                    const navLists = this.navLists
                    const navListsExtend = []
                    if (navLists.length > 0) {
                        const temp = [];
                        navLists.forEach((item) => {   // 展开二级菜单
                            if (item.Sub && item.Sub.length > 0) {
                            temp.push(...item.Sub)
                        }
                    })
                        temp.forEach((item) => {  // 展开三级菜单
                            if (item.Sub && item.Sub.length > 0) {
                            navListsExtend.push(...item.Sub)
                        }
                    })
                    }
                    return navListsExtend.map((item) => item.Path)
                }
            },

        },

        methods: {
            getOrderInfo: function () {
                var self = this;
                servers.postAjax({
                    url: '/Dashboard/ErpQueryOrderRemindInfo'
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.orderInfo = result.Data;
                    }
                })
            },
            gotoPath(path,authPath) {
                var navPath = authPath || path
                if (this.navPaths.indexOf(navPath) > -1) {
                    this.$route.router.go(path)
                }
            }
        },
        ready: function () {
            this.getOrderInfo();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>