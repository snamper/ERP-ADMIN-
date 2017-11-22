<template>
    <div class="container-fluid">
        <div class="unify-head">
            查看库存
        </div>
        <div class="row">
            <h4 class="col-lg-12 table-detail">
                <span>商品编号： {{$route.params.code}}</span>
                <span>商品名称：{{$route.params.name}}</span>
            </h4>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-bordered detail-table" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                            <tr>
                                <th>SKU编码</th>
                                <th>颜色</th>
                                <th>尺码</th>
                                <th>重量</th>
                                <th>所属仓库</th>
                                <th>可用库存</th>
                                <th>可用小计</th>
                                <th>真实库存</th>
                                <th>真实小计</th>
                            </tr>
                        </thead>
                        <tbody v-for="merchants in totalList">
                            <tr v-for="merchant in merchants">
                                <td>{{merchant.Sku}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Color}}">{{merchant.Color  | truncationString }} </span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Size}}">{{merchant.Size  | truncationString }} </span></td>
                                <td>{{merchant.Weigh}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Stock}}">{{merchant.Stock  | truncationString }} </span></td>
                                <td>{{merchant.UseQty}}</td>
                                <td rowspan="{{merchants.length}}" v-if="$index === 0">
                                    {{merchant.useTotal}}
                                </td>

                                <td>{{merchant.Qty}}</td>
                                <td rowspan="{{merchants.length}}" v-if="$index === 0">
                                    {{merchant.total}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="operate-form-buttons col-lg-12">
                <a class="btn btn-default btn-back-list" href="#!/merchant/list">返回列表<i class="icon-arrow-right iconfont"></i></a>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                tableList: [],
                totalList: []
            }
        },
        watch: {
            'tableList': function () {
                // 分解tableList暂时储存的对象
                var filterTableListBearObject = {};
                // 分解后存放的数组
                var totalList = [];
                if (this.tableList.length === 0) {
                    return this.totalList = totalList;
                }
                // 分解tabliList
                for (var merchantIndex in this.tableList) {
                    if (filterTableListBearObject[this.tableList[merchantIndex].StockID]) {
                        filterTableListBearObject[this.tableList[merchantIndex].StockID].push(merchantIndex);
                    }else {
                        filterTableListBearObject[this.tableList[merchantIndex].StockID] = [merchantIndex];
                    }
                }
                // 分解过程中的索引值
                var filterCourseIndex = 0;
                for (var filter in filterTableListBearObject) {
                    totalList.push([]);
                    var total = 0, useTotal = 0;
                    for (var filters in filterTableListBearObject[filter]) {
                        totalList[filterCourseIndex].push(this.tableList[filterTableListBearObject[filter][filters]]);
                        total += this.tableList[filterTableListBearObject[filter][filters]].Qty || 0;
                        useTotal += this.tableList[filterTableListBearObject[filter][filters]].UseQty || 0;
                    }
                    for (var merchantIndex in totalList[filterCourseIndex]) {
                        totalList[filterCourseIndex][merchantIndex].total = total;
                        totalList[filterCourseIndex][merchantIndex].useTotal = useTotal;
                    }
                    filterCourseIndex += 1;
                }
                return this.totalList = totalList;
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
            },
            submit: function () {
                this.postSku();
            },
            // 提交 sku
            getStock: function (GoodsID) {
                var self = this;

                require('../../../js/servers/servers').postAjax.bind(this)({
                    url: '/BasGoods/ErpQueryInventory',
                    data: {
                        GoodsID: GoodsID
                    },
                    success: function (data) {

                        if ( data.ResultCode === 1 ) {
                            self.tableList = data.Data.PageData;
                            if (self.tableList.length == 0) return self.$dispatch('transmit', 'tip', {contentText: '没有查询到相应的数据！'})
                        }

                    }
                });
            },
        },
        ready: function () {
            this.getStock( this.$route.query.id );
        }
    }
</script>
<style rel="stylesheet/less" lang="less">
    .table-detail{
        margin: 0 0 12px 0;
        span{
            margin-right: 20px;
        }
    }
</style>
