<template>
    <router-view :base-look-up="baseLookUp"></router-view>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var commonMethods = require('../../js/common');
    module.exports = {
        data: function () {
            return {
                baseLookUp: {
                    shopLists: [],  //店铺
                    orderStatus: [], //订单状态
                    orderFlag: [], //是否已经处理状态
                    iRefundStatus: [], //退单状态
                    iOrderStatus: [] //订单状态
                }
            }
        },
        methods: {
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                var channel = this.channel;
                //获取销售平台
//                servers.getBaseData('ShopList',false,function (val) {
//                    baseLookUp.shopLists = val;
//                });
                //获取订单状态
//                servers.getBaseData('OrderStatus',false,function (val) {
//                    baseLookUp.orderStatus = val;
//                });
                //获取已经处理状态
                servers.getBaseData('OrderFlag',false,function (val) {
                    baseLookUp.orderFlag = val;
                });
                //店铺列表
                servers.getBaseData('NetShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                //订单状态
                servers.getBaseData('IOrderStatus',false,function (val) {
                    baseLookUp.iOrderStatus = val;
                });
                //退单状态
                servers.getBaseData('IRefundStatus',false,function (val) {
                    baseLookUp.iRefundStatus = val;
                })
            }
        },
        route: {
            data: function (transition) {
                this.getBaseData();
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>