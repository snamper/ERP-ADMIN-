<template>
    <div class="container-fluid">
        <div class="unify-head">
            条码管理
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        条码管理
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>防伪码</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>小码</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>大码</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">是否关联</label>
                        <select class="form-control">
                            <option value="">不限</option>
                            <option v-for="opt in 3 " value="{{opt.PayTypeID}}">是</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>关联订单</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>创建人</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >创建时间</label>
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
                            <a @click="StatusEnable( )" href="javascript:void(0)" class="btn btn-default">导入</a>
                            <a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">导出</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>防伪码</th>
                                <th>小码</th>
                                <th>大码</th>
                                <th>是否关联订单</th>
                                <th>交易备注</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in 3" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td>0020154256</td>
                                <td>2000</td>
                                <td>1000</td>
                                <td class="state-forbid" >否</td>
                                <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="备注">备注</span></td>
                                <td>黄龙席</td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="2016-09-08">2016-09-08</span></td>
                                <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
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
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
            }
        },
        methods: {

        },

        components: {
            pagination: require('../../../components/pagination.vue'),
//            modalClientBalance: require('./components/modal-balance-account.vue'),
        },
        ready: function () {
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
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

