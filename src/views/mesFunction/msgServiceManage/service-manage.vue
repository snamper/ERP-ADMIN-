<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="operate-form-title" style="margin-bottom: 20px">
                <p>客服管理</p>
            </div>
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">客服编码</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Code">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>负责平台</label>
                            <select class="form-control" v-model="query.ChannelID">
                                <option value="">不限</option>
                                <option v-for="item in ArticleTypeList" v-bind:value="item.ChannelID">{{item.Name}}</option>
                                <option value="0">xin</option>
                            </select>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">对应员工</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.LoginName">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改人</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Editor">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.BeginEditTime"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.EndEditTime"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>

                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">备注</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Note">
                        </div>
                    </div>
                    <div class="query-button-group">
                        <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                        <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    </div>
                </div>
            </div>
            <div class="sheet-list ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                               <!--  <a @click="operate(2)" href="javascript:void(0)" class="btn btn-default">新增dan</a> -->
                                <a v-link="{name: 'msgServiceManage-add'}" class="btn btn-default">新增</a>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>客服编号</th>
                                    <th>对应员工</th>
                                    <th>负责平台</th>
                                    <th>修改时间</th>
                                    <th>修改人</th>
                                    <th>备注</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="item in articleConfigList" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="item.checked"></td>

                                    <td title="{{item.Code}}">{{item.Code | truncationString }}</td>
                                    <td title="{{item.LoginName}}">{{item.LoginName | truncationString }}</td>
                                    <td title="{{item.ChannelName}}">{{item.ChannelName | truncationString }}</td>
                                    <td title="{{item.EditTime}}">{{item.EditTime | limitBy 9 2 }}</td>
                                    <td title="{{item.Editor}}">{{item.Editor | truncationString }}</td>
                                    <td title="{{item.Note}}">{{item.Note | truncationString }}</td>
                                    <td :class="[item.Status == 1 ? '' : 'state-forbid']">{{item.Status === 1 ? '启用' : '禁用'}}</td>
                                    <td class="state-forbid">
                                        <a v-link="{name: 'msgServiceManage-update',query:{CustomServiceID:item.CustomServiceID}}"  data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-if="articleConfigList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                                                   
                        </div>
                         <pagination :pagination-options="paginationOptions"></pagination>    
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
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
                    Code: '',//客服编码
                    ChannelID: '',//平台ID
                    LoginName: '',//对应员工
                    Editor: '',//修改人
                    Note:'',//备注
                    BeginEditTime:'',//修改时间
                    EndEditTime:''//修改时间
                }, // 查询表单
                articleConfigList: [], // 查询到的数据列表
                ArticleTypeList: [],//平台下拉数据列表
            };
        },
        //复选框
        computed: commonMethods.selectAll('this.articleConfigList', function (item) {
            return item.CustomServiceID;
        }),
        //组件
        components: {
            datePicker,
            pagination,
        },
        //分页选择
        events: {
            'page-change': function () {
                if (this.chooses == this.index) {
                    this.erpQueryCustomService(true);
                }
            },
        },
        methods: {
            /**
             * 重置表单
             */
            resultForm() {
                this.query = {
                    Code: '',//客服编码
                    ChannelID: '',//平台ID
                    LoginName: '',//对应员工
                    Editor: '',//修改人
                    Note:'',//备注
                    BeginEditTime:'',//修改时间
                    EndEditTime:''//修改时间
                };
            },
            //搜索
            search: function () {

                if (this.paginationOptions.cur == 1) {
                    this.erpQueryCustomService();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            /**
             * 负责平台下拉累额表
             *
             */
            getChannelList () {
               var $this = this;
               servers.getAjax.bind(this) ({
                   url: '/BaseLookup/GetChannelList'
               }).then(function (result) {
                   if (result.ResultCode == 1) {
                   $this.ArticleTypeList = result.Data;
               }
               })
           },
            /**
             * 查询数据
             */
            erpQueryCustomService(type) {
                console.log(this.query)
                var $this = this;
                if (!type && $this.paginationOptions.cur !== 1) return $this.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCustomService/ErpQueryCustomService',
                    data: {
                        PageSize: $this.paginationOptions.pageSize,
                        PageNumber: $this.paginationOptions.cur,
                        SearchWhere: $this.query,
                    },
                }).then(function (result) {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.paginationOptions.all = result.Data.TotalPages;
                        $this.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (data.length) {
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            $this.articleConfigList = data;
                            console.log($this.articleConfigList)
                        } else {
                            $this.articleConfigList = data;
                            $this.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                        }
                    }
                });
            },
            /**
             * 操作
             * @param {Boolean} 启用 1 禁用 0
             */
            operate(type) {

                var $this = this;
                let tipText = '';
                let urlS = '';
                if (type) {
                    tipText = '启用';
                    urlS = '/BasCustomService/EnableStatus';//启用请求地址
                } else {
                    tipText = '禁用';
                    urlS = '/BasCustomService/UnEnableStatus';//禁用请求地址
                }
                console.log($this.checkedGroups)

                if ($this.checkedGroups.length === 0) {
                    $this.$dispatch('transmit', 'tip', {contentText: '请先选择客服，再进行操作'});
                } else {
                    $this.$dispatch('transmit', 'tip', {
                        contentText: `确定${tipText}该选项吗？`,
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    $this.$off('operate-confirm');
                    $this.$once('operate-confirm', function() {
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: urlS,
                            contentType: 'application/json',
                            data: JSON.stringify($this.checkedGroups)
                        }).then(function(result) {
                            if (result.ResultCode === 1) {
                                $this.$dispatch('transmit', 'tip', {contentText: `${tipText}成功`});
                                $this.erpQueryCustomService(true);
                            }
                            servers.NProgress.done();
                        });
                    });
                }
            },
        },
        ready() {
            this.erpQueryCustomService();//查询到的数据列表
            this.getChannelList();//平台下拉数据

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

        }
    };

</script>
