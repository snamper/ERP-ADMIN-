<template>
    <div class="container-fluid">
        <div class="unify-head">
            关联销售订单
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        关联销售订单
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">关联条码</label>
                        <select class="form-control">
                            <option value="">不限</option>
                            <option v-for="opt in 3 " value=""></option>
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
                            <a href="javascript:void(0)" class="btn btn-default">自动匹配</a>
                            <a href="javascript:void(0)" class="btn btn-default">打印标签</a>
                            <a href="javascript:void(0)" class="btn btn-default">导入条码</a>
                            <!--<a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">批量禁用</a>-->
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>匹配订单（带扫描订单）</th>
                                <th>SKU数</th>
                                <th>明细数</th>
                                <th>关联条码</th>
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
                                    <a @click="upBalance" data-toggle="tooltip" data-placement="top" title="关联条码">
                                        <span class="click-element iconfont icon-combo"></span>
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
                                                    <th>SKU</th>
                                                    <th>商品名称</th>
                                                    <th>箱码</th>
                                                    <th>操作</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>10010</td>
                                                    <td>爱蓓洁</td>
                                                    <td>1001</td>
                                                    <td @click="searchBoxCode()"><a>查看盒码和防伪码</a></td>
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
    <div class="modal fade order-tip" :class="{'in':modal.show}" v-show="modal.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.title}}</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <!--<label class="control-label">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</label>-->
                                <h class="account-margin top-text">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr class="bgcolor">
                                        <th>SKU</th>
                                        <th>产品名称</th>
                                        <th>大码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="opt in 2">
                                        <td>123456459872016-10-15{{opt.CreateTime | formatDateFormShow}}</td>
                                        <td>huanglongxi</td>
                                        <td> <input type='text' class="form-control" /></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="modal.show = false" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="upAccountSave()" type="button" class="btn btn-primary"> 确定 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal fade order-tip" :class="{'in':BoxCode.show}" v-show="BoxCode.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="BoxCode.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{BoxCode.title}}</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <h class="account-margin top-text">箱码： 123456001</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr class="bgcolor">
                                        <th>盒码</th>
                                        <th>防伪码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="opt in 2">
                                        <td>12345645987201</td>
                                        <td>1002345546000</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="BoxCode.show = false" type="button" class="btn btn-default"> 取消 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
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
                modal: {
                    show: false,
                    title: ''
                },
                BoxCode: {
                    show: false,
                    title: ''
                }
        }
        },
        methods: {
            //调整余额
            upBalance: function () {
                var self = this;
                self.modal.show = true;
                self.modal.title = '关联订单';

            },
            searchBoxCode: function () {
                var self = this;
                self.BoxCode.show = true;
                self.BoxCode.title = '盒码和防伪码';
            }
        },
        computed: commonMethods.selectAll('this.clientBalanceList', function (item) {
            return item.AccountID;
        }),
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
    .order-tip {
        .top-text {
            padding-left: 15px;
        }
        .detail {
            margin-top: 20px;
            margin-top: 20px;
        }
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>

