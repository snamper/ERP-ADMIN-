<template>
    <table class="table table-condensed">
        <thead>
        <tr>
            <th>
                <input type="checkbox" v-model="selectAll">
            </th>
            <th>SKUID</th>
            <th>SKU商家编码</th>
            <th>国标码</th>
            <th>条形码</th>
            <th>颜色</th>
            <th>尺码</th>
            <th>SKU库存同步</th>
            <th>SKU库存</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="skuStock in skuStocks">
            <td class="sheet-header-state">
                <input v-model="skuStock.checked" type="checkbox">
            </td>
            <td>{{skuStock.SkuID}}</td>
            <td>{{skuStock.CustomBC}}</td>
            <td>{{skuStock.Barcode}}</td>
            <td>{{skuStock.CustomNo}}</td>
            <td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.ColorName}}">{{skuStock.ColorName  | truncationString }} </span></td>
            <td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.SizeName}}">{{skuStock.SizeName  | truncationString }} </span></td>
            <td></td>
            <td>{{skuStock.StockCount}}</td>
        </tr>
        </tbody>
    </table>
    <div class="sheet-detail-operate">
        <a @click="updateStock" href="javascript:void(0)" class="btn btn-default">同步</a>
        <a @click="allowUpdate" href="javascript:void(0)" class="btn btn-default">允许库存同步</a>
        <a @click="notAllowUpdate" href="javascript:void(0)" class="btn btn-default">取消库存同步</a>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        props: ['skuStocks','serialId'],
        methods: {
            getOrderIDGroup: function () {
                var orderIdGroup = this.checkedGroups;
                if (orderIdGroup.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return orderIdGroup;
                }
            },
            //同步
            updateStock: function () {
                var self = this;

                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要允许库存同步?',
                    btnName: '允许库存同步',
                    events: {
                        confirm: 'confirm-updateStock'
                    }
                });
                self.$off('confirm-updateStock');
                self.$once('confirm-updateStock',function () {
                    var spuStockIDGroup = self.getOrderIDGroup();
                    if (spuStockIDGroup.length > 0) {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/PlatFormAPI/UpdateStock',
                            contentType: 'application/json',
                            data: JSON.stringify(spuStockIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '成功同步'
                                });
                            }
                        })
                    }
                })
            },
            allowUpdate: function () {
                this.$dispatch('allow-update',this.serialId)
            },
            notAllowUpdate: function () {
                this.$dispatch('not-allow-update',this.serialId);
            }
        },
        computed: commonMethods.selectAll('this.skuStocks', function (item) {
            return item.SkuStockID
        }),
        components: {

        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>