<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>操作员权限管理</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-limit-width col-sm-12 col-md-6">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>店铺</th>
                                <th>查看</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="shopPower in power.SysShopPowers">
                                <td>{{shopPower.ShopName}}</td>
                                <td>
                                    <div>
                                        <input v-model="shopPower.IsCheck" type="checkbox">
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="form-limit-width col-sm-12 col-md-6">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>仓库</th>
                                <th>查看</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="stockPower in power.SysStockPowers">
                                <td>{{stockPower.StockName}}</td>
                                <td>
                                    <div>
                                        <input v-model="stockPower.IsCheck" type="checkbox" placeholder="">
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="operate-form-buttons employee col-sm-12">
                        <a href="javascript:void(0)" class="btn btn-default" @click="savePower">保存</a>
                        <a v-link="{path:'/employees'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers= require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                power: {},
                loginID: ''
            }
        },
        methods: {
            //获取操作员数据权限
            getPowerByLoginID: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/GetDataPowerByLoginID',
                    data: {
                        LoginID: this.loginID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.power = result.Data;
                    }
                })
            },
            //保存操作员数据权限
            savePower: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Account/ErpSaveDataPower',
                    data: self.power
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '配置成功!'
                        });
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                var loginID = transition.to.query.loginID;
                if (loginID) {
                    this.loginID = loginID;
                    this.getPowerByLoginID();
                } else {
                    transition.abort();
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .operate-form-list {
        .operate-form-buttons {
            &.employee {
                padding-left: 0;
            }
        }
    }
</style>