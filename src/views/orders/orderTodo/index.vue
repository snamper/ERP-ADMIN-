<template>
    <!--<div>{{customerOrder | json}}</div>-->
    <router-view :customer-order-id="customerOrderID"></router-view>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                customerOrderID: ''
            }
        },
        events: {
            //复制订单事件,将CustomerOrderID传递给录入订单页面
            'copy-order': function (data) {
                this.customerOrderID = data;
                this.$router.go({
                    name: 'type-order'
                })
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">


</style>