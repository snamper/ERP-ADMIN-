<template>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                    <tr>
                        <th>订单号</th>
                        <th>外部单号</th>
                        <th>店铺</th>
                        <th>运单号</th>
                        <th>收货人</th>
                        <th>收货人手机</th>
                        <th>收获地址</th>
                        <th>回写结果</th>
                        <th>拣货打印时间</th>
                    </tr>
                </thead>
                <tbody v-for="item in outStockBatchItem.OutStockBatchItems" class="panel panel-default">
                    <tr class="sheet-list-item">                    
                        <td  class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"><span>{{item.Sheet}}</span></td>
                        <td>{{item.OutStock.OutSheetID}}</td>
                        <td>{{item.OutStock.ShopName}}</td>
                        <td>{{item.OutStock.DeliverySheetID}}</td>
                        <td>{{item.OutStock.LinkMan}}</td>
                        <td>{{item.OutStock.Mobile}}</td>
                        <td>{{item.OutStock.Address}}</td>
                        <td>{{item.OutStock.Result}}</td>
                        <td>{{outStockBatchItem.PrintTime}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var commonMethods = require('../../../js/common');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                autoPrint: false,
                outStockBatchItem:[]
            }
        },
        props: ['outStockBatchItems','code','sheet','merchantDeliveryId','shopId','payMode'],
        methods: {
            /**
             * 获取拣货单订单详情数据
             * @param outStockBatchItem {object} 拣货单对象
             * @param method  {string} 请求的方法
             */
            getOutStockBatchDetailMethod: function (id,method) {

                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BusOutStockBatch/' + method,
                    data: {
                        batchID : id
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        //outStockBatchItem.OutStock.OutStockItems = result.Data;
                        this.outStockBatchItem = result.Data;
                        console.log(this.outStockBatchItem.OutStockBatchItems)
                    }
                })
            },
        },
        route: {
            data: function (transition) {
                this.$dispatch('getoutStockBatch');
                this.OutStockBatchID = transition.to.params.outStockBatchID;
            }
        },
        computed: commonMethods.selectAll('this.outStockBatchItems', function (item) {
            return item;
        }),
        ready: function () {
        	this.getOutStockBatchDetailMethod(this.OutStockBatchID,'ErpQueryWriteBackResult')
            //显示详情页
            $(document).on('show.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });
        },
        components: {
            modalJoinOrders: require('./modal-join-orders.vue'),
            modalDeliverySheet: require('./modal-delivery-sheet.vue'),
            modalAddress: require('./modal-address.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.sheet-list {
	padding-bottom: 0px;
}
</style>