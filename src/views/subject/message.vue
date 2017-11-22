<template>
    <div class="container-fluid">
        <div class="unify-head">
            留言
        </div>
        <div class="query-form" @keyup.enter.stop="search">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        状态:
                    </label>
                    <div class="checkbox-list">
                        <label class="checkbox-inline" v-for="check in statusList">
                            <input type="checkbox" v-model="check.model" @click="setStatus($index)"> <span>{{check.name}}</span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >客户姓名</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.Name">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >客户电话</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.Phone">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >留言内容</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.Message">
                    </div>
                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label>留言时间</label>
                        <div class='input-group date' id='message-timepicker-start'>
                            <input v-model="query.MessageTimeBegin | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                        <span style="line-height:23px;"> ~ </span>
                        <div class='input-group date' id='message-timepicker-end'>
                            <input v-model="query.MessageTimeEnd | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >跟进人</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.Checker">
                    </div>
                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label>跟进时间</label>
                        <div class='input-group date' id='up-timepicker-start'>
                            <input v-model="query.CheckTimeBegin | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                        <span style="line-height:23px;"> ~ </span>
                        <div class='input-group date' id='up-timepicker-end'>
                            <input v-model="query.CheckTimeEnd | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改人</label>
                        <input type="text" class="lxz-clo form-control " v-model="query.Editor">
                    </div>

                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label>修改时间</label>
                        <div class='input-group date' id='alter-timepicker-start'>
                            <input v-model="query.EditTimeBegin | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                        <span style="line-height:23px;"> ~ </span>
                        <div class='input-group date' id='alter-timepicker-end'>
                            <input v-model="query.EditTimeEnd | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>渠道</label>
                        <select v-model="query.Channel" class="form-control">
                            <option value="">不限</option>
                            <option value="1">百度</option>
                            <option value="2">360</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group" style="clear:both;">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a href="#!/message/add" class="btn btn-default">新增</a>
                            <a @click="updateStatus([], 2)" href="javascript:void(0)" class="btn btn-default">批量处理</a>
                            <a @click="updateStatus([], 0)" href="javascript:void(0)" class="btn btn-default">批量取消</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>状态</th>
                                <!-- <th>序号</th> -->
                                <th>客户姓名</th>
                                <th>客户电话</th>
                                <th>留言内容</th>
                                <th>留言时间</th>
                                <th>IP或地域</th>
                                <th>入口页面</th>
                                <th>渠道</th>
                                <th>跟进时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="message in messages">
                                    <td>
                                        <input type="checkbox" v-model="message.checked">
                                    </td>
                                    <td>
                                        {{message.Status == 0 ? '取消' : message.Status == 1 ? '未审核' : '已审核'}}
                                    </td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{message.Name}}">
                                        {{message.Name  | truncationString }} </span>
                                    </td>
                                    <td>
                                        {{message.Phone}}
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{message.Message}}">{{message.Message | truncationString}}</span>
                                    </td>

                                    <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{message.MessageTime | truncationTimeString}}">{{message.MessageTime | formatDateFormShow}}</span>
                                    </td>

                                    <!-- ip -->
                                    <td>
                                        {{message.IP}}
                                    </td>
                                    <td>
                                        {{message.EntrancePage}}
                                    </td>
                                    <td>
                                        {{message.Channel == 1 ? '百度' : message.Channel == 2 ? '360' : ''}}
                                    </td> 
                                    <!-- 渠道 -->


                                    <td>
                                        {{message.Checker}}
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{message.CheckTime | truncationTimeString}}">{{message.CheckTime | formatDateFormShow}}</span>
                                    </td>
                                    <td>
                                        {{message.Editor}}
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{message.EditTime | truncationTimeString}}">{{message.EditTime | formatDateFormShow}}</span>
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{message.Note}}">{{message.Note | truncationString}}</span>
                                    </td>
                                    <td>
                                        <a href="#!/message/edit?id={{message.TrialApplyID}}" data-toggle="tooltip" data-placement="top" title="修改留言"><i class="click-element iconfont icon-alter"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var commonMethods = require('../../js/common');
    var servers = require('../../js/servers/servers');
    var URL = 'http://192.168.88.47:888/Api';
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    Status: [],
                    Channel:""
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                messages: [],
                statusList: [
                    {
                        name: '未处理',
                        model: false,
                        value: 1
                    },
                    {
                        name: '已处理',
                        model: false,
                        value: 2
                    },
                    {
                        name: '已取消',
                        model: false,
                        value: 0
                    },
                ],
                selectAll: false
            }
        },
        ready: function () {
            this.search();
            // 时间选取插件
            require('../../css/bootstrap-datetimepicker.css');
            require('../../js/plugins/bootstrap-datetimepicker');
            $('#message-timepicker-start,#up-timepicker-start,#alter-timepicker-start').datetimepicker({
            });
            $('#message-timepicker-end,#up-timepicker-end,#alter-timepicker-end').datetimepicker({
            });
            $("#message-timepicker-start,#up-timepicker-start,#alter-timepicker-start").on("dp.change",function (e) {
                $('#message-timepicker-end,#up-timepicker-end,#alter-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#message-timepicker-end,#up-timepicker-end,#alter-timepicker-end").on("dp.change",function (e) {
                $('#message-timepicker-start,#up-timepicker-start,#alter-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });


            $('#message-timepicker-start,#up-timepicker-start,#alter-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#message-timepicker-end,#up-timepicker-end,#alter-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#message-timepicker-end,#up-timepicker-end,#alter-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#message-timepicker-start,#up-timepicker-start,#alter-timepicker-start').datetimepicker('setEndDate',e.date);
            });
        },
        components: {
            pagination: require('../../components/pagination.vue'),
        },
        computed: commonMethods.selectAll('this.messages', function (item) {
            return item.TrialApplyID;
        }),
        events: {
            'page-change': function () {
                this.search(true);
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            search: function (type) {
                var self = this;

                if ( this.paginationOptions.cur !== 1 && type !== true ) return this.paginationOptions.cur = 1;

                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusTrialApply/ErpQueryTrialApply',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: self.query
                    },
                    success: function (result) {
                        if (result.ResultCode == 1) {
                            for (var i = 0; i < result.Data.PageData.length; i++) {
                                result.Data.PageData[i].checked = false;
                            }
                            // self.paginationOptions.cur = resule.
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            self.messages = result.Data.PageData;
                            servers.NProgress.done();
                        }
                    }
                })
            },
            //重置列表
            resetting: function () {
                this.query = {
                    Name: '',
                    Phone: '',
                    Message: '',
                    MessageTimeBegin: '',
                    MessageTimeEnd: '',
                    Checker: '',
                    CheckTimeBegin: '',
                    CheckTimeEnd: '',
                    Editor: '',
                    EditTimeBegin: '',
                    EditTimeEnd: ''
                },
                this.statusList = [
                    {
                        name: '未处理',
                        model: false,
                        value: 1
                    },
                {
                    name: '已处理',
                            model: false,
                        value: 2
                },
                {
                    name: '已取消',
                            model: false,
                        value: 0
                },
                ]

            },
            setStatus: function (index) {
                var status = this.query.Status,
                    statusList = this.statusList;

                if (!statusList[index].model) {
                    status.push(statusList[index].value);
                } else {
                    status.$remove(statusList[index].value);
                }
            },
            updateStatus: function (arr, statusCode) {
                var self = this;

                if ( arr.length === 0 ) arr = this.checkedGroups;
                if ( arr.length === 0 ) return this.$dispatch('transmit', 'tip', {contentText: '请选择留言!'});

                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusTrialApply/UpdateStatus',
                    data: {
                        TrialApplyIDList: arr,
                        Status: statusCode
                    },
                    success: function (result) {
                        if (result.ResultCode == 1) {
                            servers.NProgress.done();
                            self.$dispatch('transmit', 'tip', {contentText: '更新状态成功！'});
                            self.search();
                        }
                    }
                })
            }
        },
    }

</script>





<style rel="stylesheet/less" lang="less">
.lxz-clo{
    width: 145px;
    height: 25px;
}
.lxz-con{
    font-family: 'Glyphicons Halflings';
}
</style>
