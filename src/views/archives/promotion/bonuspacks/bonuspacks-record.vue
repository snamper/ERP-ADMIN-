<template>
    <div class="container-fluid">
        <div class="unify-head">
            赠送记录
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-bordered detail-table">
                        <thead class="sheet-list-header">
                            <tr>
                                <th>活动名称</th>
                                <th>SKU</th>
                                <th>数量</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="payPresentItem in payPresent">
                                <td><span data-toggle="tooltip" data-placement="top" title="{{payPresentItem.Name}}">{{payPresentItem.Name  | truncationString }} </span></td>
                                <td>{{payPresentItem.Sku}}</td>
                                <td>{{payPresentItem.Qty}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="operate-form-buttons col-lg-12">
                <a class="btn btn-default" v-link="{name:'bonuspacks'}">返回列表</a>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                payPresentID: '',
                payPresent: []
            }
        },
        methods: {
            getPayPresentRecord: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusPayPresent/ErpQueryBusPayPresentQty',
                    data: {
                        PayPresentID: self.payPresentID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.payPresent = result.Data;
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                var payPresentID = transition.to.query.PayPresentID;
                if (payPresentID) {
                    this.payPresentID = payPresentID;
                    this.getPayPresentRecord();
                    transition.next();
                } else {
                    transition.abort();
                }
            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">

</style>