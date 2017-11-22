<template id="">
    <div class="operate-form-title">
        <p>消息</p>
    </div>
    <div class="query-form" @keyup.enter.stop="search">
        <div class="query-body form-inline query-detail">
            <div class="row expand-show" :class="{'show-expand' : show.flog}" style="overflow: inherit;">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>录入时间</label>
                    <date-picker :start-date.sync="query.BeginTime" :end-date.sync="query.EndTime"></date-picker>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>发送状态</label>
                    <select class="form-control" name="" v-model="query.MsgOutFlag">
                        <option value="">不限</option>
                        <option v-for="status in statusList" value="{{status.Code}}">{{status.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>接收状态</label>
                    <select class="form-control" name="" v-model="query.MsgInFlag">
                        <option value="">不限</option>
                        <option v-for="status in receiveStatus" value="{{status.Code}}">{{status.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>消息标题</label>
                    <input v-model="query.Subject" type="text" class="form-control" placeholder="请填写消息标题">
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list" style="margin-top: 20px;">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <div class="batch-operation-group">
                        <span>批量操作：</span>
                        <a v-link="{name: 'information-add'}" class="btn btn-default">新增</a>
                        <!-- <a href="javascript:void(0)" class="btn btn-default" @click="dispatch('transmit', 'uploadModalShow', '')">批量导入</a> -->
                        <!--<a @click="disposeNoticeList([], 'check')" href="javascript:void(0)" class="btn btn-default">批量发布</a>-->
                        <!--<a @click="disposeNoticeList([], 'cancel')" href="javascript:void(0)" class="btn btn-default">批量取消</a>-->
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive table-responsive-margin">
                    <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state">
                                <input type="checkbox" v-model="selectAll">
                            </th>
                            <th>发送状态</th>
                            <th>接收状态</th>
                            <th>文章标题</th>
                            <th>录入时间</th>

                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody v-for="infor in informationList">
                        <tr class="sheet-list-item">
                            <td class="sheet-header-state">
                                <input type="checkbox" v-model="infor.checked">
                            </td>
                            <td>
                                <!-- 通过判断的出公告显示文本 -->
                                 <!--{{infor.Flag == 0 ? '未发送' : ''}} {{infor.Flag == 95 ? '删除' : ''}} {{infor.Flag == 100 ? '已读' : ''}} {{infor.Flag == 10 ? '未读' : ''}}-->
                                <!-- 公告显示文本 -->
                                {{infor.SysMsgOut.MsgOutFlagDesc}}
                            </td>
                            <td>{{infor.MsgInFlagDesc}}</td>
                            <td>{{infor.SysMsgOut.Subject}}</td>
                            <td>{{infor.CreateTime.split('T')[0]}}</td>
                            <td>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="发送">
                                    <span @click="UpdateMsgFlag(infor.SysMsgOut.MsgOutID, 100, infor.SysMsgOut.Body, infor.SysMsgOut.Subject)" class="click-element iconfont icon-verify" v-if="infor.SysMsgOut.Flag == 0 || infor.SysMsgOut.Flag == 95"></span></a>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="删除">
                                    <span @click="UpdateMsgFlag(infor.SysMsgOut.MsgOutID, 95, infor.SysMsgOut.Body, infor.SysMsgOut.Subject)" class="click-element iconfont icon-cancel" v-if="infor.SysMsgOut.Flag == 100"></span>
                                </a>
                                <a href="javascript:void(0)" v-link="{name: 'information-see' ,query: {Subject: infor.SysMsgOut.Subject , Body: infor.SysMsgOut.Body}}" data-toggle="tooltip" data-placement="top" title="查看">
                                    <span class="click-element iconfont icon-look"></span>
                                </a>
                                <a href="javascript:void(0)" v-link="{name: 'information-edit' ,query: {Subject: infor.SysMsgOut.Subject , Body: infor.SysMsgOut.Body , MsgOutID: infor.MsgOutID ,Flag: infor.SysMsgOut.Flag}}" data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="click-element iconfont icon-alter"></span>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
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
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0,
                },
                query: {
                    BeginTime: '', //开始时间
                    EndTime: '', //结束时间
                    MsgInFlag: '', //接收状态
                    MsgOutFlag: '', //发送状态
                    Subject: '', //标题
                },
                informationList:[], //消息列表
                statusList: [],  //发送状态
                receiveStatus: [] // 接收状态

            }

        },
        methods: {
            //搜索
            search() {
                if (this.paginationOptions.cur == 1) {
                    this.getInformationList();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //获取消息列表
            getInformationList() {
//                debugger
                var self = this;
                NProgress.start();
                var data = {
                    PageNumber: self.paginationOptions.cur,
                    PageSize: self.paginationOptions.pageSize,
                    SearchWhere: self.query
                }
                servers.postAjax.bind(this) ({
                    url: '/SysNotice/ErpQueryMsg',
                    data: data
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.informationList = result.Data.PageData;
                    }
                });
            },
            //改变状态
            UpdateMsgFlag(id,flag,Body,Subject) {
                var self = this;
                var text = '';
                var baseData = {
                    Subject: Subject,
                    Body: Body,
                    MsgOutID: id,
                    Flag: flag,
                    SysMsgIn: {
                        Flag: flag,
                    }
                }
                if (flag == 100) {
                    text = "发送";
                } else if (flag == 95) {
                    text = "删除";
                }
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要' + text + '吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'UpdateMsgFlag'
                    }
                });
                self.$off('UpdateMsgFlag');
                self.$once('UpdateMsgFlag',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/SysNotice/ErpSaveMsg',
                        data:baseData
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: text + '成功!'
                            });
                            self.getInformationList();
                        }
                    });
                })
            },
            //获取发送状态
            getStatusList() {
                var self = this;
                servers.getAjax.bind(this) ({
                    url:'/BaseLookup/GetMsgOutFlag',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.statusList = result.Data;
                        console.log(self.statusList)
                    }
                })
            },
            //获取接受状态
            getReStatusList() {
                var self = this;
                servers.getAjax.bind(this) ({
                    url:'/BaseLookup/GetMsgInFlag',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.receiveStatus = result.Data;
                    }
                })
            },

        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getProductPrice();
            }
        },
        computed: commonMethods.selectAll('this.allClientProductPrice', function (item) {
            return item.CustomerPriceID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            datePicker: require('../../../components/date_picker.vue')
        },
        route: {
            data: function (transition) {

            }
        },
        watch: {
//            'color.themeColor': function (val,oldVal) {
//                if (val) {
//                    if(!this.color.matchColor) {
//                        this.color.matchColor = this.color.themeColor;
//                    }
//                }
//            },
//            'color.matchColor': function (val,oldVal) {
//                if (!val) {
//                    this.color.matchColor = this.color.themeColor;
//                }
//            },
        },
        ready() {
            this.getReStatusList();
            this.getStatusList();
            this.getInformationList();
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>