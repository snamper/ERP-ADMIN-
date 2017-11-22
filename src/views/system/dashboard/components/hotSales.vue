<template>
    <div class="compass-market compass-sell-shop row col-lg-12">
        <div class="compass-market-hd clearfix">
            <span class="title-icon"><img src="../../../../images/compass-icon01.png" alt=""></span>
            <span class="title">热销商品</span>
            <!--<ul>-->
                <!--<li @click="changeDateType('day')" :class="{'compass-time-current':dateType=='day'}">日</li>-->
                <!--<li @click="changeDateType('week')" :class="{'compass-time-current':dateType=='week'}">周</li>-->
                <!--<li @click="changeDateType('month')" :class="{'compass-time-current':dateType=='month'}">月</li>-->
            <!--</ul>-->
            <!--<div class="export-more">更多可导出</div>-->
            <div class="picker">
                <date-picker @selected="getHotSales" :start-date.sync="BegDate" :end-date.sync="EndDate"></date-picker>
            </div>
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
                                <th>订货量</th>
                                <th>提货量</th>
                                <th>结余库存</th>
                            </tr>
                            </thead>
                            <tbody v-for="hotSales in hotSales" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td>{{hotSales.CustomBC}}</td>
                                <td>{{hotSales.CustomNo}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{hotSales.GoodsName}}">{{hotSales.GoodsName | truncationString}}</span></td>
                                <td>{{hotSales.GoodsColor}}</td>
                                <td>{{hotSales.GoodsSize}}</td>
                                <td>{{hotSales.Price}}</td>
                                <td>{{hotSales.DistributorQty}}</td>
                                <td>{{hotSales.Qty}}</td>
                                <td>{{hotSales.UseInventoryQty}}</td>
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
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var numberTimeToString = require('../../../../js/common').numberTimeToString;
    module.exports = {
        data: function () {
            return {
                BegDate: numberTimeToString(new Date().getTime() - 1000*60*60*24*2),
                EndDate: numberTimeToString(new Date().getTime() - 1000*60*60*24*1),
                hotSales: [],
            }
        },
        methods: {
            /**
             * 获取热销商品
             */
            getHotSales: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Dashboard/ErpQueryHotGoodsInfoByDate',
                    data: {
                        BegDate: this.BegDate,
                        EndDate: this.EndDate
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.hotSales = result.Data;
                    }
                })
            }
        },
        ready: function () {
            this.getHotSales();
        },
        components: {
            datePicker: require('../../../../components/date_picker.vue')
        },
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .title,
    .title-icon {
        float: left;
        line-height: 40px;
        margin-right: 5px;
    }
    .picker {
        float: left;
        height: 40px;
        padding-top: 6px;
    }
</style>