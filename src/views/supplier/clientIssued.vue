<template>
    <client :id-list.sync="idList"></client>
    <div class="shopIssued">
        <shop :shop-id-list.sync="shopIdList"></shop>
    </div>
    <div class="commodityIssuedBtn">
        <a href="javascript:void(0)" class="btn btn-default" @click="getCommodityIssued">下发</a>
        <input type="checkbox" v-model="existUpdate" :true-value=1 :false-value=0> <span>存在是否更新</span>

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
                idList:[],
                shopIdList:[],
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                },
            };
        },
        components: {
            'client': require('./module/client.vue'),
            'shop': require('./module/shop.vue')

        },
        methods: {
            getCommodityIssued: function() {
                var relf = this;
                var idsList = this.idList.length;
                var shopsLength = this.shopIdList.length;
                if (idsList&&shopsLength) {
                    servers.postAjax.bind(this)({
                        url: '/BasCustomer/ErpDownMisCustomer',
                        data: {
                            ExistUpdate: relf.existUpdate,
                            IDList: relf.idList,
                            ShopIDList: relf.shopIdList
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            relf.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '下发成功!'
                            });
                        }
                    });
                } else if (idsList === 0) {
                    relf.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一个客户!'
                    });
                } else if (shopsLength === 0) {
                    relf.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一个门店!'
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
