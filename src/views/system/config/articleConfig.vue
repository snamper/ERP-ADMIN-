<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                            <!--<label>文章类型</label>-->
                            <!--<select class="form-control" v-model="query.ArticleType">-->
                                <!--<option value="">不限</option>-->
                                <!--<option v-for="opt in ArticleTypeList" value="{{opt.Code}}">{{opt.Text}}</option>-->
                            <!--</select>-->
                        <!--</div>-->
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>状态</label>
                            <select class="form-control" v-model="query.Status">
                                <option value="">不限</option>
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改时间</label>
                            <date-picker :start-date.sync='query.BeginEditTime' :end-date.sync='query.EndEditTime'></date-picker>
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改人</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Editor">
                        </div>
                    </div>
                    <div class="query-button-group">
                        <a @click="queryList()" href="javascript:void(0)" class="btn btn-default">搜索</a>
                        <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    </div>
                </div>
            </div>
            <div class="sheet-list ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <label>批量操作：</label>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>文章位置</th>
                                    <!--<th>文章类型</th>-->
                                    <th>标题</th>
                                    <th>修改时间</th>
                                    <th>修改人</th>
                                    <th>备注</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="opt in articleConfigList" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="opt.checked"></td>
                                    <!--<td>{{-->
                                        <!--opt.PosID === 1 && '微官网' ||-->
                                        <!--opt.PosID === 0 && '其他' || ''-->
                                        <!--}}</td>-->
                                    <td>{{opt.ArticleTypeDesc}}</td>
                                    <td>{{opt.Name}}</td>
                                    <td>{{opt.EditTime.split('T')[0]}}</td>
                                    <td>{{opt.Editor}}</td>
                                    <td>{{opt.Note}}</td>
                                    <td :class="[opt.Status == 1 ? '' : 'state-forbid']">{{opt.Status === 1 ? '启用' : '禁用'}}</td>
                                    <td class="state-forbid">
                                        <a v-link="{name: 'articleEdite',query: {id: opt.ArticleID, title: opt.Name, content: opt.Content, url: opt.Url, posIDDesc: opt.PosIDDesc, ArticleTypeDesc: opt.ArticleTypeDesc}}" data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-if="articleConfigList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果
                            </div>
                            <pagination :pagination-options="paginationOptions"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="less">
    .image-config-list-icon {
        &:before {
            background: #96dde7;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            line-height: 18px;
        }
    }
    .sheet-tab {
        a {
            cursor: pointer;
        }
    }
</style>

<script type="text/babel">

    import commonMethods from '../../../js/common';

    import servers from '../../../js/servers/servers';

    import pagination from '../../../components/pagination.vue';

    import datePicker from '../../../components/date_picker.vue';

    export default {
        data() {
            return {
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
//                    ArticleType: '',
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
                }, // 查询表单
                articleConfigList: [], // 查询到的数据列表
//                ArticleTypeList: [],
            };
        },
        computed: commonMethods.selectAll('this.articleConfigList', function (item) {
            return item.ArticleID;
        }),
        components: {
            datePicker,
            pagination,
        },
        events: {
            'page-change': function () {
                if (this.chooses == this.index) {
                    this.queryList(true);
                }
            },
        },
        methods: {
            /**
             * 重置表单
             */
            resultForm() {
                this.query = {
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
                };
            },
            /**
             * 获取文章类型下拉列表
             *
             */
//            getArticleTypeList() {
//                var self = this;
//                servers.getAjax.bind(this) ({
//                    url: '/BaseLookup/GetArticleType'
//                }).then(function (result) {
//                    if (result.ResultCode == 1) {
//                    self.ArticleTypeList = result.Data;
//                }
//                })
//            },
            /**
             * 查询数据
             */
            queryList(type) {
                var self = this;
                if (!type && self.paginationOptions.cur !== 1) return self.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasArticle/ErpQueryArticle',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query,
                    },
                }).then(function (result) {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {

                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (data.length) {
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            self.articleConfigList = data;
                        } else {
                            self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                        }
                    }
                });
            },

            /**
             * 操作
             * @param {Boolean} 启用 1 禁用 0
             */
            operate(type) {
                var self = this;
                let tipText = '';
                if (type) {
                    tipText = '启用';
                } else {
                    tipText = '禁用';
                }
                if (self.checkedGroups.length === 0) {
                    self.$dispatch('transmit', 'tip', {contentText: '请先选择文章配置项，再进行操作'});
                } else {
                    self.$dispatch('transmit', 'tip', {
                        contentText: `确定${tipText}该选项吗？`,
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    self.$off('operate-confirm');
                    self.$once('operate-confirm', function() {
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasArticle/UpdateStatus',
                            data: {
                                IDList: self.checkedGroups,
                                Status: type,
                            }
                        }).then(function(result) {
                            if (result.ResultCode === 1) {
                                self.$dispatch('transmit', 'tip', {contentText: `${tipText}成功`});
                                self.queryList(true);
                            }
                            servers.NProgress.done();
                        });
                    });
                }
            },
        },
        ready() {
            this.queryList();
//            this.getArticleTypeList();
        }
    };

</script>
