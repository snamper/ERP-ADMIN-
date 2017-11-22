<template>
    <table class="table table-condensed">
        <thead>
            <tr>
                <th>SKU</th>
                <th>商品</th>
                <th>商品名称</th>
                <th>尺码</th>
                <th>颜色</th>
                <!--<th>吊牌价</th>-->
                <th>数量</th>
                <th>建议售价</th>
                <th>实际售价</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="assortDetail in assortDetails">
                <td>{{assortDetail.CustomBC}}</td>
                <td>{{assortDetail.CustomNo}}</td>
                <td>
                    <span data-toggle="tooltip" data-placement="top" title="{{assortDetail.Name}}">{{assortDetail.Name  | truncationString}}</span>
                </td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{assortDetail.SizeName}}">{{assortDetail.SizeName | truncationString}} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{assortDetail.ColorName}}">{{assortDetail.ColorName| truncationString }}</span></td>
                <!--<td><span v-if="assortDetail.BasePrice">￥</span>{{assortDetail.MarketPrice}}</td>-->
                <td>{{assortDetail.Qty}}</td>
                <td><span v-if="assortDetail.MarketPrice">￥</span>{{assortDetail.MarketPrice}}</td>
                <td><span v-if="assortDetail.Price">￥</span>{{assortDetail.Price}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    module.exports = {
        props: ['assortDetails']
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>