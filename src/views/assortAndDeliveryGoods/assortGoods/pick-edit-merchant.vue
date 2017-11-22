<template>
    <div class="col-lg-12 outStockBatchMerchant">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                    <tr>
                        <th>序号</th>
                        <th>SKU</th>
                        <th>商品名称</th>
                        <th>尺码</th>
                        <th>颜色</th>
                        <th>国标码</th>
                        <th>商品数</th>
                        <th>商品货架</th>
                        <th>实际售价</th>
                    </tr>
                </thead>
                <tbody class="panel panel-default">
                    <tr class="sheet-list-item" v-for="merchant in outStockBatchMerchant">
                        <td>{{$index + 1}}</td>
                        <td>{{merchant.CustomBC}}</td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.GoodsName}}">{{merchant.GoodsName  | truncationString }}</span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.SizeName}}">{{merchant.SizeName  | truncationString }} </span></td>
                        <td>{{merchant.ColorName}}</td>
                        <td>{{merchant.Barcode}}</td>
                        <td>{{merchant.Qty}}</td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.SpaceNameList}}">{{merchant.SpaceNameList  | truncationString }} </span></td>
                        <td>{{merchant.Price}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--<div>{{outStockBatchMerchant | json}}</div>-->
</template>

<script>
    module.exports = {
        props: ['outStockBatchMerchant'],
        route: {
            data: function (transition) {
                this.$dispatch('get-merchant');
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .outStockBatchMerchant {
        margin-top: 16px;
    }
</style>