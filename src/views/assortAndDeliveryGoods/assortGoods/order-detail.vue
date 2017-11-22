<template>
    <table class="table table-condensed">
        <thead class="sheet-list-header">
            <tr>
                <th>商品</th>
                <th>SKU</th>
                <th>商品名称</th>
                <th>尺码</th>
                <th>颜色</th>
                <th>建议售价</th>
                <th>数量</th>
                <th>渠道售价</th>
                <th>实际售价</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="merchant in orderItems">
                <td>
                    <span>{{merchant.Barcode.Goods.CustomNo}}</span>
                </td>
                <td>
                    <span>{{merchant.Barcode.CustomBC}}</span>
                </td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Barcode.Goods.Name}}">{{merchant.Barcode.Goods.Name  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Barcode.Size.Name}}">{{merchant.Barcode.Size.Name  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Barcode.Color.Name}}">{{merchant.Barcode.Color.Name  | truncationString }} </span></td>
                <td><span v-if="merchant.Barcode.Goods.BasePrice">￥{{merchant.Barcode.Goods.GoodsDetail.MarketPrice}}</span></td>
                <td>
                    <span>{{merchant.Qty}}</span>
                </td>
                <td>
                    <span v-if="merchant.OrderItemDetail.SalePrice">￥{{merchant.OrderItemDetail.SalePrice}}</span>
                </td>
                <td><span v-if="merchant.Price">￥{{merchant.Price}}</span></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    module.exports = {
        props: ['orderItems']
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>