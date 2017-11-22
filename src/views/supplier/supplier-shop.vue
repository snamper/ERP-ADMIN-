<template>

        <create-commodity :ref-goods-id.sync="refGoodsID" :merchant-id.sync="merchantID"></create-commodity>

    <div class="commodityIssuedBtn">
        <a href="javascript:void(0)" class="btn btn-default getShopBtn" @click="getShop">生成商品</a>
        <input type="checkbox" v-model="existUpdate" :true-value=1 :false-value=0 /> <span>存在是否更新</span>

    </div>


</template>
<style rel="stylesheet/less" lang="less">

</style>
<script>
    var commonMethods = require('../../js/common');
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                existUpdate: 0,
                refGoodsID: [],
                merchantID: [],
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                },
            };
        },
        components: {
            'createCommodity': require('./module/createCommodity.vue')

        },
        methods: {
            getShop: function () {
                var relf = this;
                var refGoodsIDLength = this.refGoodsID.length;
                var refMerchantIDLength = this.merchantID.length;
                if (refGoodsIDLength) {
                    servers.postAjax.bind(this)({
                        url: '/BasGoods/ErpCreateGoodsByMerchantID',
                        data: {
                            ExistUpdate: relf.existUpdate,
                            RefGoodsID: relf.refGoodsID,
                            RefMerchantID: relf.merchantID
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            relf.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '生成商品成功!'
                            });
                        }
                    });
                } else if (refMerchantIDLength === 0) {
                    relf.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请先选择一个供应商!'
                    });
                } else if (refGoodsIDLength === 0) {
                    relf.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请至少选择一个商品!'
                    });
                }

            },
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

    .shopIssued {
        margin-top: 10px;
    }

    .sheet-list-table-Issued {
        border-top: none;
    }

    .commodityIssuedBtn {
        margin-top: 10px;
    }

</style>
