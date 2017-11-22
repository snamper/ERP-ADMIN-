<template>
    <div class="container-fluid">
        <div class="unify-head">
            查看拣货单
        </div>
        <div class="row pick-header choosegoods-edit">
            <div class="pick-table-header col-lg-12">
                <div class="pick-header-title-list">
                    <span class="pick-table-header-title">拣货单号:</span>
                    <span>{{outStockBatch.Sheet}}</span>
                </div>
                <div class="pick-header-title-list">
                    <span class="pick-table-header-title">拣货单状态:</span>
                    <span>{{outStockBatch.FlagDesc}}</span>
                </div>
                <div class="pick-header-title-list">
                    <span class="pick-table-header-title">发货仓库:</span>
                    <span>{{outStockBatch.Stock.Name}}</span>
                </div>
                <div class="pick-header-title-list">
                    <span class="pick-table-header-title">快递公司:</span>
                    <span>{{outStockBatch.MerchantDelivery.Name}}</span>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <router-view :pay-mode="outStockBatch.PayMode" :merchant-delivery-id="outStockBatch.MerchantDelivery.MerchantDeliveryID" :shop-id="outStockBatch.Shop.ShopID" :sheet="outStockBatch.Sheet" 
                	:code="pageStatusCode" :out-stock-batch-items.sync="outStockBatch.OutStockBatchItems" :out-stock-batch-merchant.sync="outStockBatchMerchant"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                outStockBatch: {}, //拣货单
                outStockBatchMerchant: [], //商品清单
                pageStatusCode: '',
                outStockBatchID: ''
            }
        },
        methods: {
            /**
             * 获取拣货单订单的方法
             * @param scope  {object} 作用域
             * @param method {string} 对应的获取方法
             */
            getOutStockBatchAjax: function (scope,method) {
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStockBatch/' + method,
                    data: {
                        ID: scope.outStockBatchID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var outStockBatch = result.Data;
                        console.log(outStockBatch)
                        var outStockBatchItems = outStockBatch.OutStockBatchItems;
                        outStockBatchItems.forEach(function (item) {
                            item.checked = false;
                        });
                        scope.outStockBatch = outStockBatch;
                    }
                })
            },
            //查询商品清单
            getoutStockBatchMerchantAjax: function (scope, method) {
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStockBatch/' + method,
                    data: {
                        ID: scope.outStockBatchID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        scope.outStockBatchMerchant = result.Data.Data;
                    }
                })
            },
            //查询拣货单
            getOutStockBatch: function () {
                if (['3','4'].indexOf(this.pageStatusCode) > -1) { //已完成或已取消状态的获取方法
                    this.getOutStockBatchAjax(this,'ErpQueryOutStockBatchDoneByID');
                } else if (['1','2'].indexOf(this.pageStatusCode) > -1) {   //未完成状态查询
                    this.getOutStockBatchAjax(this,'ErpQueryOutStockBatchTempByID');
                } else {   //其他状态查询
                    this.getOutStockBatchAjax(this,'ErpQueryOutStockBatchAllByID');
                }
            },
            //查询商品清单
            getoutStockBatchMerchant: function () {
                if (['3','4'].indexOf(this.pageStatusCode) > -1) { //已完成或已取消状态的获取方法
                    this.getoutStockBatchMerchantAjax(this,'ErpQueryDoneBatchGoodsDetailByID');
                } else if (['1','2'].indexOf(this.pageStatusCode) > -1) {   //未完成状态查询
                    this.getoutStockBatchMerchantAjax(this,'ErpQueryTempBatchGoodsDetailByID');
                } else {   //其他状态查询
                    this.getoutStockBatchMerchantAjax(this,'ErpQueryAllBatchGoodsDetailByID');
                }
            }
        },
        events: {
            //获取拣货单
            'getoutStockBatch': function () {
                if (this.outStockBatch.OutStockBatchID) {
                    return ;
                } else {
                    this.getOutStockBatch();
                }
            },
            //刷新捡货单列表
            'refreshOutStockBatch': function () {
                this.getOutStockBatch();
            },
            'get-merchant': function () {
                if (this.outStockBatchMerchant.length > 0) {
                    return ;
                } else {
                    this.getoutStockBatchMerchant();
                }
            }
        },
        route: {
            data: function (transition) {
                var params = transition.to.params;
                var querys = transition.to.query;
                this.pageStatusCode = querys.code;  //页面状态
                this.outStockBatchID = params.outStockBatchID;  //拣货单ID
                console.log(params)
            }
        },
        ready: function () {

        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.choosegoods-edit{
    span{
        line-height:30px;
    }
   
}
</style>