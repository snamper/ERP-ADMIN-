<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>活动名称</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Name">
                        </div>
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
                        <a @click="queryList" href="javascript:void(0)" class="btn btn-default">搜索</a>
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
                                <a v-link="{name: 'poster-add'}" href="javascript:void(0)" class="btn btn-default">新增</a>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>活动名称</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>修改人</th>
                                    <th>修改时间</th>
                                    <th>备注</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="opt in posterList" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="opt.checked"></td>
                                    <td>{{opt.Name}}</td>
                                    <td>{{opt.BeginTime.split('T')[0]}}</td>
                                    <td>{{opt.EndTime.split('T')[0]}}</td>
                                    <td>{{opt.Editor}}</td>
                                    <td>{{opt.EditTime.split('T')[0]}}</td>
                                    <td>{{opt.Note}}</td>
                                    <td :class="[opt.Status == 1 ? '' : 'state-forbid']">{{opt.Status === 1 ? '启用' : '禁用'}}</td>
                                    <td class="state-forbid">
                                        <a v-link="{name: 'agent-team',query: {id: opt.FissionPosterID}}" data-toggle="tooltip" data-placement="top"
                                           title="参加人员">
                                            <span class="click-element iconfont icon-vip image-config-see-icon"></span>
                                        </a>
                                        <a v-link="{name: 'poster-edit',query: {id: opt.FissionPosterID, isUse: opt.IsUse, name: opt.Name, beginTime: opt.BeginTime, endTime: opt.EndTime, note: opt.Note}}" data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <a @click="seeImage(opt.Files[0])" data-toggle="tooltip" data-placement="top"
                                           title="查看图片 ">
                                            <span class="click-element iconfont icon-look image-config-see-icon" ></span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-if="posterList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果
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
            background: #96BEE7;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            line-height: 18px;
        }
    }
    .image-config-see-icon {
        &:before {
            /*content: '\E623';*/
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

<script>

    import commonMethods from '../../../js/common';

    import servers from '../../../js/servers/servers';

    import pagination from '../../../components/pagination.vue';

    import datePicker from '../../../components/date_picker.vue';

    var numberTimeToString = require('../../../js/common').numberTimeToString;

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
                    Name: '', //活动名称
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
                }, // 查询表单
                posterList: [], // 查询到的数据列表

                modalShow: false, // 模态窗口是否显示
                formDisabled: false, // 是否禁止更改表单
            };
        },
        computed: commonMethods.selectAll('this.posterList', function (item) {
            return item.FissionPosterID;
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
                    Name: '', //活动名称
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
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
                    url: '/BasFissionPoster/ErpQueryFissionPoster',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query,
                    },
                }).then((result) => {
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {
                        const data = result.Data.PageData;
                        var reg = /\/Date\(([0-9]+)\)\/$/ig;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (data.length) {
                            for (let i in data) {
                                data[i].checked = false;
                            }
//                            data.forEach(function(item) {
//                                console.log(item)
//                                if (item.BeginTime) {
//                                    var BenginT = reg.exec(item.BeginTime);
//                                    item.BeginTime = numberTimeToString(BenginT[1]);
//                                }
//                                if (item.EndTime) {
//                                    var EndT = reg.exec(item.EndTime);
//                                    item.EndTime = numberTimeToString(EndT[1]);
//                                }
//                                if (item.EditTime) {
//                                    var EditT = reg.exec(item.EditTime);
//                                    item.EditTime = numberTimeToString(EditT[1]);
//                                }
//                            })
                            self.posterList = data;
                        } else {
                            self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                        }
                    }
                });
            },
            //查看图片
            seeImage(Files) {
                if (Files) {
                    const time = new Date().getTime();
                    window.open(Files.split(',')[0] + '?v=' + time);
                }
            },
            /**
             * 操作
             * @param {Boolean} 启用 1 禁用 0
             */
            operate(type) {
                let tipText = '';
                if (type) {
                    tipText = '启用';
                } else {
                    tipText = '禁用';
                }
                if (this.checkedGroups.length === 0) {
                    this.$dispatch('transmit', 'tip', {contentText: '请先选择海报配置项，再进行操作'});
                } else {
                    this.$dispatch('transmit', 'tip', {
                        contentText: `确定${tipText}该选项吗？`,
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    this.$off('operate-confirm');
                    this.$once('operate-confirm', () => {
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasFissionPoster/UpdateStatus',
                            data: {
                                IDList: this.checkedGroups,
                                Status: type,
                            }
                        }).then((result) => {
                            if (result.ResultCode === 1) {
                                this.$dispatch('transmit', 'tip', {contentText: `${tipText}成功`});
                                this.queryList(true);
                            }
                            servers.NProgress.done();
                        });
                    })
                }
            },
        },
        ready() {
            this.queryList();
        }
    };

</script>
