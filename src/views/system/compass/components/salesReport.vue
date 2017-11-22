<template>
    <div class="compass-market  row col-lg-12">
        <div class="compass-market-hd">
            <span><img src="../../../../images/compass-icon.png" alt=""></span>销售业绩
            <ul>
                <li @click="changeDateType('day')" :class="{'compass-time-current':dateType=='day'}">日</li>
                <li @click="changeDateType('week')" :class="{'compass-time-current':dateType=='week'}">周</li>
                <li @click="changeDateType('month')" :class="{'compass-time-current':dateType=='month'}">月</li>
            </ul>
        </div>
        <div id="sale-report" class="compass-market-img col-lg-12">

        </div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    module.exports = {
        props: ['currentType','hotSales','showLoading'],
        data: function () {
            return {
                dateType: 'day',
                currentSales: [],
                chart: {},
            }
        },
        methods: {
            changeDateType: function (dateType) {
                this.currentType = this.dateType = dateType;
            }
        },
        computed: {
            currentSales: {
                get: function () {
                    return this.hotSales[this.dateType];
                }
            }
        },
        watch: {
            'hotSales': function (newHotSales) {
                this.currentSales = newHotSales[this.dateType];
            },
            'currentSales': function (newCurrentSales) {
                var self = this;
                if (newCurrentSales.length > 0) {
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
                                    newCurrentSales.forEach(function (sale) {
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
                                    newCurrentSales.forEach(function (sale) {
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
                                    newCurrentSales.forEach(function (sale) {
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
            },
            'showLoading': function (newValue) {
                if (newValue) {
                    this.chart.showLoading();
                } else {
                    this.chart.hideLoading();
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
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>