<template>
    <div class="sheet-list sell-scanning-show row calculate-flow">
        <div class="headline-hd scan-record flow-hd12">
            <span>提出记录</span><br/>
            <span>代理商代码:{{CustomerCode}}</span>
        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>操作人</th>
                    <th>订单金额</th>
                    <th>被育成人</th>
                    <th>关联订单</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in culaculateList">
                    <td>{{opt.OutTime | formatDateFormShow}}</td>
                    <td>{{opt.Editor}}</td>
                    <td>{{opt.OrderMoney ? opt.OrderMoney.toFixed(2) : '0.00'}}</td>
                    <td>{{opt.CustomerName}}</td>
                    <td>{{opt.Sheet}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" v-link="{name: 'rebates-calculate'}">返回列表>></a>
        </div>
    </div>

</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                query: {
                    CustomerID: '',
                    Month: ''
                },
                culaculateList: [],
                CustomerCode: ''

            }
        },
        methods: {
            getCalculateFlow() {
                NProgress.start();
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasDistributorIntroducerCalculate/ErpQueryCustomerDistributorIntroducerOrderInfo',
                    data: this.query
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.culaculateList = result.Data;
                    }
                    NProgress.done();
                })
            }
        },
        route: {
            data: function (transition) {
                var data = transition.to.query;
                this.query.CustomerID = data.CustomerID;
                this.query.Month = data.Month;
                this.CustomerCode = data.CustomerCode;
//                console.log(this.query.CustomerID);
            }
        },
        ready() {
            this.getCalculateFlow();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .calculate-flow {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>