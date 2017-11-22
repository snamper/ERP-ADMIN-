<template>
    <div>
        <div class="container-fluid container-fluid-margin">
<!--             <div class="operate-form-title" style="margin-bottom: 20px">
                <p>水费</p>
            </div> -->
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>商家</label>
                            <select class="form-control" v-model="query.Status">
                                <option value="">紫云来1</option>
                                <option value=1>紫云来2</option>
                                <option value=0>紫云来3</option>
                            </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">手机号码</label>
                            <input type="text" class="form-control" placeholder="请输入手机号" v-model="query.Code">
                        </div>

                    </div>
                    <div class="row"> 
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">店铺名称</label>
                            <input type="text" class="form-control" placeholder="请输入店铺名称" v-model="query.Name">
                        </div>
                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label class="form-group-text">录入时间段</label>
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
                        <label>收费标准</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">其他</option>
                            <option value=1>物业管理费</option>
                            <option value=0>水电费</option>
                            <option value=2>租金</option>
                        </select>
                    </div>
                    </div>
                    <div class="query-button-group">
                       <!--  <a @click="queryList()" href="javascript:void(0)" class="btn btn-default">搜索</a> -->
                        <a  href="javascript:void(0)" class="btn btn-default">搜索</a>
                        <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    </div>
                </div>
            </div>
            <div class="sheet-list ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <a v-link="{name: 'waterRentEdit'}" class="btn btn-default">费用录入</a>
<!--                                 <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a> -->
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <!-- <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th> -->
                                    <th class="sheet-header-state"><input type="checkbox"></th>
                                    <th style="text-align:center;">商户</th>
                                    <th>手机号</th>
                                    <th>店铺名称</th>
                                    <th>店铺地址</th>
                                    <th>收费类型</th>
                                    <th>金额</th>
                                    <th>说明</th>
                                    <th>合计</th>
                                    <th>收讫</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="n in 3" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="checked"></td>
                                    <td style="text-align:center;">万客来一店</td>
                                    <td>171910619888</td>
                                    <td>万客来一店</td>
                                    <!-- <td>{{opt.EditTime.split('T')[0]}}1</td> -->
                                    <td >河南省洛阳市河南大学本区</td>
                                    <td >水费</td>
                                    <td >3950</td>
                                    <td >就是每月的水费为3950元</td>
                                    <td >3950</td>
                                    <td >3950</td>
                                    <td class="state-forbid">
                                        <a v-link="'/waterRentEdit'"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="">修改</span>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <span>|</span>
                                        </a>
                                        <a data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="">删除</span>
                                        </a>
<!--                                         <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="click-element iconfont icon-del image-config-list-icon"></span>
                                        </a> -->
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="checked"></td>
                                    <td style="text-align:center;">紫云来茶叶店100</td>
                                    <td>13213754209</td>
                                    <td>紫云来茶叶店</td>
                                    <!-- <td>{{opt.EditTime.split('T')[0]}}1</td> -->
                                    <td >北京市朝阳门外6号7弄</td>
                                    <td >水费</td>
                                    <td>260</td>
                                    <td >就是每月的水费为260元</td>
                                    <td >260</td>
                                    <td >260</td>
                                    <td class="state-forbid">
                                        <a v-link="'/waterRentEdit'"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="">修改</span>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <span>|</span>
                                        </a>
                                        <a data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="">删除</span>
                                        </a>
<!--                                         <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="click-element iconfont icon-del image-config-list-icon"></span>
                                        </a> -->
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="checked"></td>
                                    <td style="text-align:center;">海尔旗舰店</td>
                                    <td>13137088265</td>
                                    <td>海尔旗舰店</td>
                                    <!-- <td>{{opt.EditTime.split('T')[0]}}1</td> -->
                                    <td >福建省厦门市集美村</td>
                                    <td >水费</td>
                                    <td>1290</td>
                                    <td ></td>
                                    <td >1290</td>
                                    <td >1290</td>
                                    <td class="state-forbid">
                                        <a v-link="'/waterRentEdit'"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="">修改</span>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <span>|</span>
                                        </a>
                                        <a data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="">删除</span>
                                        </a>
<!--                                         <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="click-element iconfont icon-del image-config-list-icon"></span>
                                        </a> -->
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="checked"></td>
                                    <td style="text-align:center;">紫云来茶叶店001</td>
                                    <td>13137088265</td>
                                    <td>紫云来玉器店</td>
                                    <!-- <td>{{opt.EditTime.split('T')[0]}}1</td> -->
                                    <td >河南省郑州市二七广场</td>
                                    <td >水费</td>
                                    <td>1500</td>
                                    <td ></td>
                                    <td >1500</td>
                                    <td >1500</td>
                                    <td class="state-forbid">
                                        <a v-link="'/waterRentEdit'"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="">修改</span>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <span>|</span>
                                        </a>
                                        <a data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="">删除</span>
                                        </a>
<!--                                         <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <a v-link="'msgClassify-update?MessageClassID='+opt.MessageClassID"  data-toggle="tooltip" data-placement="top"
                                           title="删除">
                                            <span class="click-element iconfont icon-del image-config-list-icon"></span>
                                        </a> -->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                           <!--  <div v-if="articleConfigList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果 -->
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
    td,th {
        text-align: center;
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
            //this.queryList(true);
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
