<template>
    <div class="container-fluid">
        <div class="unify-head">
            结算方式
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        结算方式
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>结算天数</label>
                        <input v-model="query.PayTypeDay" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.PayTypeDay_To"  type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">结算类型</label>
                        <select class="form-control" v-model="query.Style">
                            <option value="">不限</option>
                            <option v-for="opt in accountTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value=1>启用</option>
                            <option value=0>禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>备注</label>
                        <input v-model="query.Note" type="text" class="form-control">
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>创建人</label>
                        <input v-model="query.Creater" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >创建时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-createTime-start'>
                                <input v-model="query.CreateTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-createTime-end'>
                                <input v-model="query.CreateTime_To | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-start'>
                                <input v-model="query.EditTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-end'>
                                <input v-model="query.EditTime_To | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label>结算天数</label>-->
                        <!--<input v-model="query.PayTypeDayBeg" type="number" min="0" class="form-control" placeholder="">-->
                        <!--<span class="form-control-link">~</span>-->
                        <!--<input v-model="query.PayTypeDayEnd"  type="number" min="0" class="form-control" placeholder="">-->
                    <!--</div>-->
                    <!---->



                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <a v-link="{name:'account-way-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="StatusEnable( )" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <!--<th>序号</th>-->
                                <th>名称</th>
                                <th>结算天数</th>
                                <th>结算类型</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="opt in accountWayList">
                                <td class="sheet-item-state"><input type="checkbox" value="opt.MemberID" v-model="opt.checked"></td>
                                <!--<td><span>{{role.RoleID}}</span></td>-->
                                <!--<td>{{opt.Name }}</td>-->
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Name}}">{{opt.Name | truncationString}}</span></td>
                                <td>{{opt.PayTypeDay}}</td>
                                <td>{{opt.StyleName}}</td>
                                <td>{{opt.Creater}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.CreateTime}}">{{opt.CreateTime | formatDateFormShow}}</span></td>
                                <td>{{opt.Editor }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>
                                <td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>
                                <td>
                                    <a v-link="{name: 'account-way-edit',
                                    query: {
                                        Name: opt.Name,
                                        PayTypeDay: opt.PayTypeDay,
                                        Style: opt.Style,
                                        Note: opt.Note,
                                        Status: opt.Status,
                                        PayTypeID: opt.PayTypeID
                                    }}" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="StatusEnable(opt.PayTypeID)" href="javascript:void(0)" v-if="opt.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="StatusDisable(opt.PayTypeID)" href="javascript:void(0)" v-if="opt.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="accountWayList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        data: function () {
          return {
              pageInfo: {
                  fileType: 30
              },
              show: {
                 flog: false
              },
              paginationOptions:{
                  all: 0,
                  cur: 1,
                  pageSize: 15,
                  totalRecords: 0
              },
              query: {
                  PayTypeID: '',
                  Name: '',
                  PayTypeDay: '',
                  PayTypeDay_To: '',
                  Style: '',
                  Creater: '',
                  CreateTime: '',
                  CreateTime_To: '',
                  Editor: '',
                  EditTime: '',
                  EditTime_To:'',
                  Note: '',
                  Status: ''
              },
              accountTypeList: [],
              accountWayList: []
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //获取结算类型
            getAccountType: function () {
                var self =this;
                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetBasPayTypeStyleList',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.accountTypeList = result.Data;
                        //console.log(result.Data)
                    }
                })
            },
            //获取结算方式列表
            getAccountWay: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this) ({
                    url: '/BasPayType/ErpQueryBasMember',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    var accountWay = result.Data.PageData;
                    self.accountWayList = [];
                    if (accountWay.length > 0) {
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        accountWay.forEach(function (item) {
                            item.checked = false;
                        });
                        self.accountWayList = accountWay;
                    }
                    NProgress.done();
                })
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getAccountWay();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //重置列表
            resetting: function () {
                var self = this;
                self.query = {
                    PayTypeID: '',
                    Name: '',
                    PayTypeDay: '',
                    PayTypeDay_To: '',
                    Style: '',
                    Creater: '',
                    CreateTime: '',
                    CreateTime_To: '',
                    Editor: '',
                    EditTime: '',
                    EditTime_To:'',
                    Note: '',
                    Status: ''
                }
            },
            getIDGroup: function (PayTypeID) {
                var IDGroup = [];
                if (PayTypeID) {
                    IDGroup.push(PayTypeID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //启用
            StatusEnable: function (PayTypeID) {
                var self = this;
                var text = '启用';
                var choiceAccountway = self.getIDGroup(PayTypeID);
                if (choiceAccountway.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些结算方式吗?',
                        btnName: text,
                        events: {
                            confirm: 'StatusEnable'
                        }
                    });
                    self.$off('StatusEnable');

                    self.$once('StatusEnable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasPayType/ErpStart',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceAccountway),

                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            // 禁用
            StatusDisable: function (PayTypeID) {
                var self = this;
                var text = '禁用';
                var choiceAccountway = self.getIDGroup(PayTypeID);
                if (choiceAccountway.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些结算方式吗?',
                        btnName: text,
                        events: {
                            confirm: 'StatusDisable'
                        }
                    });
                    self.$off('StatusDisable');

                    self.$once('StatusDisable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasPayType/ErpEnable',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceAccountway),
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },

        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getAccountWay();
            }
        },
        computed: commonMethods.selectAll('this.accountWayList', function (item) {
            return item.PayTypeID;
        }),
        components: {
            pagination: require('../../components/pagination.vue')
        },
        ready: function () {
            this.getAccountType();
            this.getAccountWay();



            //dateTimePicker
            require('../../css/bootstrap-datetimepicker.css');
            require('../../js/plugins/bootstrap-datetimepicker');
            $('#pay-createTime-start,#pay-editTime-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-createTime-end,#pay-editTime-end').datetimepicker('setStartDate',e.date);
            });
            $('#pay-createTime-end,#pay-editTime-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-createTime-start,#pay-editTime-start').datetimepicker('setEndDate',e.date);
            });
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>