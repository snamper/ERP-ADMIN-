<template>
    <div class="container-fluid">
        <div class="unify-head">
            全局配置
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>模块</label>
                        <input v-model="query.Module" type="text" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>配置名称</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="">
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>配置编码</th>
                                <th>模块</th>
                                <th>配置名称</th>
                                <th>配置值</th>
                                <th>修改时间</th>
                                <th>修改人</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="config in configs">
                                <td>{{config.Code}}</td>
                                <td>{{config.Module}}</td>
                                <td>{{config.Name}}</td>
                                <td>{{config.ValueDesc}}</td>
                                <td><span v-if="config.CreateTime" data-toggle="tooltip" data-placement="top" title="{{config.CreateTime | truncationTimeString}}">{{config.CreateTime | formatDateFormShow}}</span></td>
                                <td>{{config.Creater}}</td>
                                <td>{{config.Note}}</td>
                                <td>
                                    <a @click="editConfig(config)" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="roles.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-setting></modal-setting>
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
                    pageSize: 100,
                    totalRecords: 0
                },
                query: {
                    MerchantID: '',
                    Module: '', // 配置编号
                    Name: '', // 配置名称
                },
                configs: []
            }
        },
        methods: {
            /**
             * 获取全部配置
             */
            getGlobalConfig: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysGlobalConfig/ErpQuerySysGlobalConfig',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.configs = result.Data.PageData;
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    }
                });
            },
            /**
             * 搜索
             */
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getGlobalConfig();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            /**
             * 重置表单
             */
            resetForm: function () {
                this.query = {
                    Module: '', // 配置编号
                    Name: '', // 配置名称
                }
            },
            /**
             * 打开修改配置弹层
             * @param config {object} 需要修改的配置项
             */
            editConfig: function (config) {
                this.$broadcast('modal-config', config);
            }
        },
        route: {
            data: function (transition) {
                this.query.MerchantID = transition.to.query.id
                this.getGlobalConfig();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getGlobalConfig();
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            modalSetting: require('./modal-setting.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .config-checkbox {
        input {
            border: none;
            box-shadow: none;
            &:focus {
                border: none;
                box-shadow: none;
            }
        }
    }
    .config-pagination {
        padding: 0 32px;
        .pagination-group {
            background: #fafafa;
        }
    }
</style>
