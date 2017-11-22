<template>
    <div class="personal personal-two row col-lg-7 col-md-5 col-sm-5">
        <div class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitConfirmedQty}}</span>
                <i>未转单</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon01.png" alt="">
                </span>
            </div>
        </div>
        <div class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitSendQty}}</span>
                <i>待发货</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon02.png" alt="">
                </span>
            </div>
        </div>

        <div class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitCheckQty}}</span>
                <i>审核</i>
            </div>
            <div class="personal-icon">
                <span>
                    <img src="../../../../images/personal-icon03.png" alt="">
                </span>
            </div>
        </div>
        <div class="personal-two-top col-lg-5 col-md-5 col-sm-5">
            <div class="personal-text">
                <span>{{orderInfo.WaitSendQty}}</span>
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

<script>
    var servers = require('../../../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
                orderInfo: {
                    WaitCheckQty: 0, //待审核
                    WaitConfirmedQty: 0, //待转单
                    WaitReturnQty: 0, //待退货
                    WaitSendQty: 0 //待发货
                }
            }
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
            }
        },
        ready: function () {
            this.getOrderInfo();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>