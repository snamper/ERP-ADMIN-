<template>
    <div class="compass-market  row col-lg-12">
        <div class="compass-market-hd">
            <span class="title-icon"><img src="../../../../images/compass-icon.png" alt=""></span>
            <span class="title">销售业绩</span>
            <div class="picker">
                <date-picker @selected="getHotSales" :start-date.sync="BegDate" :end-date.sync="EndDate"></date-picker>
            </div>
        </div>
        <div id="sale-report" class="compass-market-img col-lg-12">

        </div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var numberTimeToString = require('../../../../js/common').numberTimeToString;
    module.exports = {
        props: ['currentType','hotSales','showLoading'],
        data: function () {
            return {
                BegDate: numberTimeToString(new Date().getTime() - 1000*60*60*24*2),
                EndDate: numberTimeToString(new Date().getTime() - 1000*60*60*24),
                salesReport: [],
                chart: {},
            }
        },
        methods: {
            /**
             * 获取热销商品
             */
            getHotSales: function () {
                var self = this;
                NProgress.start();
                this.chart.showLoading();
                servers.postAjax.bind(this)({
                    url: '/Dashboard/ErpQueryHotGoodsInfoByDate',
                    data: {
                        BegDate: this.BegDate,
                        EndDate: this.EndDate
                    }
                }).done(function (result) {
                    NProgress.done();
                    self.chart.hideLoading();
                    if (result.ResultCode == 1) {
                        self.salesReport = result.Data;
                    }
                }).catch(function (err) {
                    self.chart.hideLoading();
                })
            },
            initChart: function () {
                var salesReport = this.salesReport;
                if (salesReport.length > 0) {
                    this.chart.setOption({
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['周转率', '销售量']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        dataZoom: {
                            show: false,
                            start: 0,
                            end: 100
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisLabel: {
                                    show: false,
                                },
                                data: (function (){
                                    var skus = [];
                                    salesReport.forEach(function (sale) {
                                        skus.push(sale.CustomBC);
                                    });
                                    return skus;
                                })()
                            },
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisLabel: {
                                    show: false,
                                },
                                data: (function (){
                                    var skus = [];
                                    salesReport.forEach(function (sale) {
                                        skus.push(sale.CustomBC);
                                    });
                                    return skus;
                                })()
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                scale: true,
                                name: '销量',
                                max: (function () {
                                    var qtys = [];
                                    salesReport.forEach(function (sale) {
                                        qtys.push(sale.Qty);
                                    });
                                    return Math.max.apply(null, qtys) * 1.3;
                                })(),
                                min: 0,
                                boundaryGap: [0.2, 0.2]
                            },
                            {
                                type: 'value',
                                scale: true,
                                name: '周转率',
                                max: (function () {
                                    var turnoverRates = [];
                                    newCurrentSales.forEach(function (sale) {
                                        turnoverRates.push(sale.TurnoverRate);
                                    });
                                    return Math.max.apply(null, turnoverRates) * 1.3;
                                })(),
                                min: 0,
                                boundaryGap: [0.2, 0.2]
                            }
                        ],
                        series: [
                            {
                                name:'周转率(单位%)',
                                type:'bar',
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                data:(function (){
                                    var turnoverRates = [];
                                    newCurrentSales.forEach(function (sale) {
                                        turnoverRates.push(sale.TurnoverRate);
                                    });
                                    return turnoverRates;
                                })()
                            },
                            {
                                name:'	销量',
                                type:'line',
                                data:(function (){
                                    var qtys = [];
                                    newCurrentSales.forEach(function (sale) {
                                        qtys.push(sale.Qty);
                                    });
                                    return qtys;
                                })()
                            }
                        ]
                    })
                }
            }
        },
        ready: function () {
            this.dateType = this.currentType;
            this.chart = echarts.init(document.getElementById('sale-report'));
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['周转率', '销售量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: (function (){
                            var skus = [];
                            return skus;
                        })()
                    },
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: (function (){
                            var skus = [];
                            return skus;
                        })()
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: '销量',
                        max: 1200,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '周转率',
                        max: 100,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name:'周转率(单位%)',
                        type:'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data:(function (){
                            var turnoverRates = [];
                            return turnoverRates;
                        })()
                    },
                    {
                        name:'	销量',
                        type:'line',
                        data:(function (){
                            var qtys = [];
                            return qtys;
                        })()
                    }
                ]
            });
            this.chart.showLoading();
        },
        components: {
            datePicker: require('../../../../components/date_picker.vue'),
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
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