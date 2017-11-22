<template>
    <create-store :ref-shop-Id.sync="refShopID"></create-store>
    <div class="shopIssued">
        <create-merchant :merchant-Id-List.sync="merchantIDList"></create-merchant>
    </div>
    <div class="commodityIssuedBtn">
        <a href="javascript:void(0)" class="btn btn-default getShopBtn" @click="getShop">生成店铺</a>
        <input type="checkbox" v-model="existUpdate" :true-value=1 :false-value=0> <span>存在是否更新</span>
        <!--<a href="javascript:void(0)" class="btn btn-default" @click="getCommodityIssued">下发</a>-->
        <!--<input type="checkbox" v-model="existUpdate" :true-value=1 :false-value=0> <span>存在是否更新</span>-->

    </div>



</template>
<style  rel="stylesheet/less" lang="less">

</style>
<script>
    var commonMethods = require('../../js/common');
    var servers= require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function() {
            return {
                existUpdate:0,
                merchantIDList:[],
                refShopID:[],
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                },
            };
        },
        components: {
            'createStore': require('./module/createStore.vue'),
            'createMerchant': require('./module/createMerchant.vue')

        },
        methods: {
            getShop: function() {
                var relf = this;
                var merchantIDListLength = this.merchantIDList.length;
                var refShopIDLength = this.refShopID.length;
                if (merchantIDListLength&&refShopIDLength) {
                    servers.postAjax.bind(this)({
                        url: '/BasShop/ErpCreateShopByMerchantID',
                        data: {
                            ExistUpdate: relf.existUpdate,
                            MerchantIDList: relf.merchantIDList,
                            RefShopID: relf.refShopID
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            relf.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '生成店铺成功!'
                            });
                        }
                    });
                } else if (merchantIDListLength === 0) {
                    relf.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一个商家!'
                    });
                } else if (refShopIDLength === 0) {
                    relf.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一个店铺!'
                    });
                }

            },
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

    .shopIssued {
        margin-top:10px;
    }
    .sheet-list-table-Issued{
        border-top:none;
    }
    .commodityIssuedBtn{
        margin-top:10px;
    }

</style>
