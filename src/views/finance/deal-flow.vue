<template>
    <div class="sheet-list sell-scanning-show row deal-flow">
        <div class="headline-hd scan-record flow-hd12">
            <span>交易流水</span><br/>
            <span>账户名称:{{query.Name}}</span>

        </div>
            <div class="col-lg-12">
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr class="bgcolor">
                        <th>产生时间</th>
                        <th>业务类型</th>
                        <th>业务单号</th>
                        <th>方向</th>
                        <th>发生金额</th>
                        <th>结存金额</th>
                        <th>业务发生时间</th>
                        <th>记账时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="opt in dealFlowList">
                        <td>{{opt.CreateTime | formatDateFormShow}}</td>
                        <td>{{opt.SheetTypeName}}</td>
                        <td>{{opt.Sheet}}</td>
                        <td>{{opt.DirectFlagName}}</td>
                        <td>{{opt.AccValue? opt.AccValue.toFixed(2) : '0.00'}}</td>
                        <td>{{opt.CloseAccValue? opt.CloseAccValue.toFixed(2) : '0.00'}}</td>
                        <td>{{opt.SheetTime | formatDateFormShow}}</td>
                        <td>{{opt.BusiTime | formatDateFormShow}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" v-link="{name: 'client-balance-account'}">返回列表>></a>
        </div>
    </div>

</template>

<script>
    var servers = require('../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
                query:{
                    Name: '' ,
                    AccountID: '',
                    DirectFlag: '',
                    AccValue: '',
                    CloseAccValue: '',
                    Sheet: '',
                    SheetType: '',
                    CreateTime: '',
                    SheetTime: '',
                    BusiTime: ''
                },
                dealFlowList: [],
            }
        },
        methods: {
            getDealFlow: function () {
                var self = this;
                servers.postAjax.bind(this) ({
                    url: '/BasAccount/GetBasAccountBookList',
                    data: {
                        AccountID: self.query.AccountID
                    }
//                    contentType: 'application/json',
//                    data:  JSON.stringify(AccountID),
                }).done(function (result) {
                    self.dealFlowList = result.Data;

                })
            },
        },
        route: {
            data: function (transition) {
                var self = this;
                var query = transition.to.query;
                if (query.AccountID) {
                self.query.AccountID = query.AccountID;
                self.query.Name = query.Name;
                this.getDealFlow();
                } else {
                    transition.abort();
                }
            }
        },
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .deal-flow {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>