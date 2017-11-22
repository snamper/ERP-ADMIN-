<template>

    <div class="container-fluid" style="padding-left:0;padding-right:0;">
        <div class="unify-head">
            代理商档案
        </div>
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>编码</label>
                        <input v-model="query.Code" type="text" class="form-control" placeholder="编码/关键词">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>姓名</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="姓名/关键词">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>微信号</label>
                        <input v-model="query.Wechat" type="text" class="form-control" placeholder="微信号/关键词">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>手机号</label>
                        <input v-model="query.Mobile" type="text" class="form-control" placeholder="手机号/关键词">
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
                        <label class="form-group-text">代理地区</label>
                        <select-area :state-id.sync="query.State" :city-id.sync="query.City" :district-id.sync="query.District"></select-area>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>详细地址</label>
                        <input v-model="query.Address" type="text" class="form-control" placeholder="详细地址">
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list" style="background:#F9F9F9;">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-hd">
                            批量操作：</div>
                        <div class="batch-operation-group">
                            <a v-link="{name:'agentArchivesAdd'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="updateStatus(1)">启用</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="updateStatus(0)">禁用</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="showAllAgents">全部代理</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 sheet-categories">
                    <div class="sheet-list-table commodity-categories clearfix" style="margin:0 17px;">
                        <div class="col-lg-4 col-md-4  col-sm-4"  style="padding-left:0;margin-bottom:15px;">
                            <div class="w-tree">
                                <div class="sheet-categories-hd">
                                    代理商团队
                                </div>
                                <ul v-for="agent in agents">
                                    <agents-tree :agents="agent" :customer-id.sync="agentCustomerID"></agents-tree>
                                </ul>
                            </div>
                        </div>
                        <div class="commodity-categories-list col-lg-6 col-md-4 col-sm-4" v-if="agentList.length != 0" style="padding:0;">
                            <table class="table table-responsive">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"/></th>
                                    <th>编码</th>
                                    <th>真实姓名</th>
                                    <th>代理等级</th>
                                    <th>上级代理</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="sheet-list-item" v-for="agent in agentList">
                                    <td class="sheet-item-state"><input v-model="agent.checked"  type="checkbox"/></td>
                                    <td>{{agent.Code}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{agent.Name}}">{{agent.Name | truncationString}}</span></td>
                                    <td>{{agent.CustomerGradeName}}</td>
                                    <td>{{agent.ParentName ? agent.ParentName : ''}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{agent.BeingDate}}">{{agent.BeingDate | formatDateFormShow}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{agent.EndDate}}">{{agent.EndDate | formatDateFormShow}}</span></td>
                                    <td :class="{ 'state-forbid': agent.Status != 1 }">
                                        {{ agent.Status == 1 ? '已启用' : '已禁用' }}
                                    </td>
                                    <td>
                                        <a class="toolTip" v-link="{name:'agentArchivesEdit',
                                                query: {
                                                    CustomerID: agent.CustomerID,
                                                }
                                            }" style="background:#96BEE7;" data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                                        <a @click="updateStatus(0,agent.CustomerID)" href="javascript:void(0)" v-if="agent.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                        <a @click="updateStatus(1,agent.CustomerID)" href="javascript:void(0)" v-if="!agent.Status==1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
    </div>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                //从接口获得的所有原始代理数据
                agentsArray: [],
                //将从接口获得的数据转化树状JSON之后的数据
                agents: [],
                agentCustomerID: '',
                //查询条件
                query: {
                    Code: '', // 编码
                    Name: '',  // 名称
                    Status: '',
                    ParentID: '', // 父级ID
                    CustomerID: '', // 代理商ID
                    Wechat: '', // 微信号
                    Mobile: '', // 手机号
                    IncludeChild: 1,
                    Address: '', //详细地址
                    State: '', // 省
                    City: '', // 市
                    District: '', // 区
                },
                //查询出来的代理结果
                agentList: [],
                pageInfo: {
                    fileType: 37
                }
            }
        },
        methods: {
            //显示全部代理
            showAllAgents: function () {
                this.resetForm();
                this.search();
            },
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            getIDGroup: function (CustomerID) {
                var IDGroup = [];
                if (CustomerID) {
                    IDGroup.push(CustomerID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个代理'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //搜索代理
            getAgents: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributor/ErpQueryDistributor',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        var agentList = result.Data.PageData;
                        self.agentList = [];
                        if (agentList.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            agentList.forEach(function (item) {
                                item.checked = false;
                            });
                            self.agentList = agentList;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }
                    }
                });
            },
            search: function () {
                this.query.ParentID = '';
                this.query.CustomerID = '';
                if (this.paginationOptions.cur == 1) {
                    this.getAgents();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            //启用禁用
            updateStatus: function (status,CustomerID) {
                var self = this;
                var text = '';
                if (status == 1) {
                    text = '启用';
                } else {
                    text = '禁用';
                }
                var choiceAgent = self.getIDGroup(CustomerID);
                if (choiceAgent.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些代理吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatus'
                        }
                    });
                    self.$off('updateStatus');
                    self.$once('updateStatus',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasDistributor/UpdateStatus',
                            data: {
                                IDList: choiceAgent,
                                Status: status
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.getAgents();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            resetForm: function () {
                //重置搜索条件
                this.query = {
                    Code: '', // 编码
                    Name: '',  // 名称
                    Status: '',
                    ParentID: '', // 父级ID
                    CustomerID: '' // 代理商ID
                };
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                //获取代理列表
                servers.getAjax({
                    url: '/BasDistributor/ErpGetDistributorList'
                }).done(function (result) {
                    self.agentsArray = result.Data;   //保存原始数据
                    self.agents = commonMethods.transArrayToJson(result.Data,'CustomerID','ParentID','children');  //将原始数据转换成树状JSON格式
                    transition.next();
                });
            }
        },
        ready: function () {
            //获取代理列表
            //this.getAgents();
        },
        events: {
            /**
             * 点击左侧树状代理,获取子代理
             * @param agents {object} 点击时获取到的对应树状代理对象
             */
            'getAgentsList': function (agents) {
                this.resetForm();
                if (agents.children) {    //如果有子代理,则用ID作为PID进行搜索,获取其代理
                    this.query.ParentID = agents.CustomerID;
                } else {                    //如果没有子代理,则用ID搜索
                    this.query.CustomerID = agents.CustomerID;
                }
                if (this.paginationOptions.cur == 1) {
                    this.getAgents();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            //页面改变,获取数据
            'page-change': function () {
                this.getAgents();
            }
        },
        computed: commonMethods.selectAll('this.agentList', function (item) {
            return item.CustomerID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            agentsTree: require('./components/tree.vue'),
            selectArea: require('../../../components/select-area.vue'),
        }
    }
</script>




<style rel="stylesheet/less" lang="less">
    .sheet-categories {
        min-width  :870px;
        padding-top:15px;
        .pagination-group {
            margin-left: 15px;
            margin-right:15px;
        }
    }
    .commodity-categories {
        /*display: flex;*/
    }
    .commodity-categories-list {
        min-width:540px;
        border: 1px solid #E9E9E9;
        border-radius:5px;
        td{
            a{
                width: 20px;text-align:center;line-height:20px;border-radius:2px;height: 20px;background: #ccc;display:inline-block;color:#fff;
            }
        }

        table {
            background: #fff;
            width: 100%;
            margin: 0 auto;
            .sheet-list-header{
                th{
                    line-height:34px;
                }
            }


        }
    }
    .w-tree {
        /*flex: 1;*/
        background: #fff;
        padding:0;
        white-space: nowrap;
        ul {
            padding-left: 20px;
            background: #fff;
        }
        li {
            position: relative;
            padding: 10px 5px 0 5px;
            &:before,
            &:after {
                position: absolute;
                left: -20px;
                right: auto;
                content: '';
            }
            &:before {
                border-left: 1px dotted #6A91FD;
                width: 1px;
                top: -5px;
                bottom: 50px;
                height: 100%;
            }
            &:after {
                border-top: 1px dotted #6A91FD;
                height: 20px;
                top: 25px;
                width: 25px;
            }

            .commodity-categories-item {
                font-size: 14px;
                color:#4D68AD;
                display: inline-block;
                line-height: 20px;
                padding: 0 20px;
                border-radius: 5px;
                cursor: pointer;
                &.pitch-off{
                    color:#6991FF;
                }
                &.pitch-on{
                    color:#4D68AF;
                }
                em{
                    display: inline-block;
                    padding: 2px 5px;
                    border-radius: 5px;
                    border: 1px solid transparent;
                    margin-left:5px;

                }
                &.selected {
                    em{
                        border: 1px solid #BDCEFE;
                        display: inline-block;
                        padding: 2px 5px;
                        border-radius: 5px;
                    }
                }

                .icon-file {
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 12px;
                    transition: 0.2s;
                    &.collapsed {
                        transform: rotate(-90deg);
                    }
                }



            }
        }
        >ul {
            >li {
                &:before,
                &:after {
                    border: none;
                }
            }
        }


        .commodity-categories-info {
            display: inline-block;
            span {
                padding-left: 15px;
            }
            a {
                padding-left: 15px;
            }
        }
    }
    .batch-operation{
        border-bottom: 1px solid #E5E5E5;
        padding: 16px 20px 6px;
    }
    .batch-operation-hd{
        color:#4D68AD;
        font-size: 14px;
        line-height:29px;
    }
    .sheet-categories-hd{
        font-size: 14px;
        color:#222939;
        line-height:44px;
        text-indent:1em;
        background: #E3F0FE;
        margin-bottom:10px;

    }
    .w-tree{
        border: 1px solid #E9E9E9;
        border-radius:5px;

    }
    .w-tree{
        .iconfont{
            margin-left:-26px;
            margin-top:7px;
        }
    }


    .pagination .iconfont{
        margin-left:-5px;

    }

    .sheet-list-header tr{
        background: #ecefff;
    }

    .sheet-list-item td{
        background:none;
    }
    .pagination-perPageNum select{
        border: 1px solid #E4E4E4;
    }
</style>