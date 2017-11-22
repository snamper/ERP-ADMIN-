<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="operate-form-title" style="margin-bottom: 20px">
                <p>消息分类</p>
            </div>
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">分类编码</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Code">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">分类名称</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Name">
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改人</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Editor">
                        </div>
                       <!--  <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改时间</label>
                            <date-picker :start-date.sync='query.EditTimeBegin' :end-date.sync='query.EditTimeEnd'></date-picker>
                        </div>  -->
                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label class="form-group-text">修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.EditTimeBegin"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <span style="margin:5px 10px 0 10px;">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.EditTimeEnd"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div> 
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">备注</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Note">
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
                                <a v-link="{name: 'classify-add'}" class="btn btn-default">新增</a>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>分类编码</th>
                                    <th>分类名称</th>
                                    <th>修改时间</th>
                                    <th>修改人</th>
                                    <th>备注</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="opt in articleConfigList" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="opt.checked"></td>
                                    <td>{{opt.Code | limitBy 10}}</td>
                                    <td>{{opt.Name | limitBy 10}}</td>
                                    <td title="{{opt.EditTime}}">{{opt.EditTime  | limitBy 9 2}}</td>
                                    <!-- <td>{{opt.EditTime.split('T')[0]}}1</td> -->
                                    <td :title="opt.Editor ">{{opt.Editor  | limitBy 10}}</td>
                                    <td :title="opt.Note">{{opt.Note == null ?  "" : opt.Note | limitBy 30}}</td>
                                    <td :class="[opt.Status == 1 ? '' : 'state-forbid']">{{opt.Status === 1 ? '启用' : '禁用'}}</td>
                                    <td class="state-forbid">
                                        <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
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
                    Code: "",
                    Name: "",
                    Editor: "",
                    Note: "",
                    EditTimeBegin: "",
                    EditTimeEnd: "",
                    Status: -1,
                },
                articleConfigList: [], // 查询到的数据列表
            };
        },
        computed: commonMethods.selectAll('this.articleConfigList', function (item) {
            return item.MessageClassID;
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
                    Code: "",
                    Name: "",
                    Editor: "",
                    Note: "",
                    EditTimeBegin: "",
                    EditTimeEnd: "",
                    Status: -1,
                };
            },
            /**
             * 查询数据
             */
            queryList(type) {
                var self = this;
                if (!type && self.paginationOptions.cur !== 1) return self.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageClass/QueryMessageClasses',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query,
                    },
                }).then(function (result) {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {                       
                        if (data.length) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            self.articleConfigList = data;
                        } else {
                            self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                            self.articleConfigList = '';
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
                    self.$dispatch('transmit', 'tip', {contentText: '请先选择分类项，再进行操作!'});
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
                            url: '/BasMessageClass/UpdateStatus',
                            data: {
                                Ids: self.checkedGroups,
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
        ready () {
            this.queryList(true);
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').datetimepicker({});
            $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').datetimepicker({});
            $("#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start").on("dp.change", function (e) {
                $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end").on("dp.change", function (e) {
                $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
            //启动toolTip
            $('.toolTip-ctrl').tooltip();
        },
    };

</script>
