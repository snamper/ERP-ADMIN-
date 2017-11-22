<template>
    <div class="compass-market compass-sell-shop row col-lg-12">
        <div class="compass-market-hd">
            <span><img src="../../../../images/compass-icon01.png" alt=""></span>热销商品
            <ul>
                <li @click="changeDateType('day')" :class="{'compass-time-current':dateType=='day'}">日</li>
                <li @click="changeDateType('week')" :class="{'compass-time-current':dateType=='week'}">周</li>
                <li @click="changeDateType('month')" :class="{'compass-time-current':dateType=='month'}">月</li>
            </ul>
            <!--<div class="export-more">更多可导出</div>-->
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>颜色</th>
                                <th>尺码</th>
                                <th>建议售价</th>
                                <th>销量</th>
                                <th>库存</th>
                                <th>周转率</th>
                            </tr>
                            </thead>
                            <tbody v-for="hotSales in hotSales[dateType]" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td>{{hotSales.CustomBC}}</td>
                                <td>{{hotSales.CustomNo}}</td>
                                <td>{{hotSales.GoodsName}}</td>
                                <td>{{hotSales.GoodsColor}}</td>
                                <td>{{hotSales.GoodsSize}}</td>
                                <td>{{hotSales.Price}}</td>
                                <td>{{hotSales.Qty}}</td>
                                <td>{{hotSales.UseInventoryQty}}</td>
                                <td>{{hotSales.TurnoverRate}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['currentType','hotSales'],
        data: function () {
            return {
                dateType: 'day'
            }
        },
        methods: {
            changeDateType: function (dateType) {
               this.currentType = this.dateType = dateType;
            }
        },
        ready: function () {
            this.dateType = this.currentType;
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>