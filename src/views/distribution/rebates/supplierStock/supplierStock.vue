<template>
    <div class="container-fluid">
        <div class="operate-form-title">
            <p>供应商库存</p>
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>经销商</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">已全部返点</label>
                        <select class="form-control">
                            <option value="">不限</option>
                            <option v-for="opt in 3 " value="{{opt.PayTypeID}}">是</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-start'>
                                <input type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                            <!--<div class='input-group date' id='pay-editTime-start'>-->
                            <!--<input v-model="query.EditTime | formatDate" type='text' class="form-control" />-->
                            <!--<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>-->
                            <!--</span>-->
                            <!--</div>-->
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-end'>
                                <input type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <label>批量操作：</label>
                            <a @click="StatusEnable( )" href="javascript:void(0)" class="btn btn-default">导出代理商</a>
                            <!--<a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">批量禁用</a>-->
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>代理</th>
                                <th>代发金额</th>
                                <th>累计返还</th>
                                <th>已全部返点</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in 3" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td class="show-detail-ctrl collapsed"
                                    @click=""
                                    data-toggle="collapse" data-parent="#sheet-list"
                                    data-target="#12">
                                    <span class="iconfont icon-alter"></span><span>0020154256</span>
                                </td>
                                <td>2000</td>
                                <td>1000</td>
                                <td class="state-forbid" >否</td>
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                <td>黄龙席</td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="2016-09-08">2016-09-08</span></td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
                                <td>
                                    <a v-link="{name: 'productStock'}" data-toggle="tooltip" data-placement="top" title="商品库存">
                                        <span class="click-element iconfont icon-look"></span>
                                    </a>
                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="16">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                         id="12">
                                        <div class="sheet-detail-wrap">
                                            <table class="table">
                                                <thead class="sheet-list-header">
                                                <tr>
                                                    <th>代理等级</th>
                                                    <th>微信号</th>
                                                    <th>真实姓名</th>
                                                    <th>手机号</th>
                                                    <th>身份证</th>
                                                    <th>代理地区</th>
                                                    <th>收款银行</th>
                                                    <th>收款账号</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>ceo</td>
                                                    <td>15113738155</td>
                                                    <td>黄龙席</td>
                                                    <td>151137387155</td>
                                                    <td>440115657484</td>
                                                    <td>天河</td>
                                                    <td>招商银行</td>
                                                    <td>444466661144854</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="clientBalanceList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            // 获取返点列表
            getrebatesList: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasDistributorPoint/ErpQueryDistributorPoint',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: {

                        }
                    }
                })
            },
        },
        computed: commonMethods.selectAll('this.clientBalanceList', function (item) {
            return item.AccountID;
        }),
        components: {
            pagination: require('../../../../components/pagination.vue'),
//            modalClientBalance: require('./components/modal-balance-account.vue'),
        },
        ready: function () {
            this.getrebatesList();

            require('../../../../css/bootstrap-datetimepicker.css');
            require('../../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-editTime-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-editTime-end').datetimepicker('setStartDate',e.date);
            });
            $('#pay-editTime-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-editTime-start').datetimepicker('setEndDate',e.date);
            });
        }
    };

</script>

<style rel="stylesheet/less" lang="less" >

</style>

