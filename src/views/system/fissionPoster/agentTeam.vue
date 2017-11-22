<template>
    <div class="container-fluid" style="padding-left:0;padding-right:0;">
        <div class="sheet-list" style="background:#F9F9F9;">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-hd">
                            批量操作：
                        </div>
                        <div class="batch-operation-group">
                            <a href="javascript:void(0)" class="btn btn-default" @click="exportFile">导出</a>
                        </div>
                        <div class="batch-operation-group">
                            <a href="javascript:void(0)" class="btn btn-default" @click="showAllAgents">全部人员</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 sheet-categories">
                    <div class="sheet-list-table commodity-categories clearfix" style="margin:0 17px;">
                        <div class="col-lg-4 col-md-4  col-sm-4"  style="padding-left:0;margin-bottom:15px;">
                            <div class="w-tree">
                                <div class="sheet-categories-hd">
                                    参加人员
                                </div>
                                <ul v-for="agent in agents">
                                    <agents-tree :agents="agent" :open-id.sync="openID"></agents-tree>
                                </ul>
                                <div class="no-agents" v-if="agents.length == 0">暂时没有参加人员</div>
                            </div>
                        </div>
                        <div class="commodity-categories-list col-lg-6 col-md-4 col-sm-4" v-if="agentList.length != 0" style="padding:0;">
                            <table class="table table-responsive">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th>用户头像</th>
                                    <th>用户昵称</th>
                                    <th>用户性别</th>
                                    <th>国家</th>
                                    <th>省份</th>
                                    <th>城市</th>
                                    <th>生成次数</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="sheet-list-item team-height" v-for="agent in agentList">
                                    <td>
                                        <span class="user-img"><img :src="agent.HeadImgurl" width="100%"></span>
                                    </td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{agent.NickName}}">{{agent.NickName | truncationString}}</span></td>
                                    <td>{{agent.Sex == 1 ? '男' : agent.Sex == 2 ? '女' : '不明'}}</td>
                                    <td>{{agent.Country}}</td>
                                    <td>{{agent.Province}}</td>
                                    <td>{{agent.City}}</td>
                                    <td>{{agent.CreateCount}}</td>
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
                openID: '',
                //查询条件
                query: {
                    FissionPosterID: '', //活动海报id
                    OpenID: '', // 当前顶级ID
                    ParentOpenID: '', //父级id
                },
                //查询出来的代理结果
                agentList: [],
                pageInfo: {
                    fileType: 10
                }
            }
        },
        methods: {
            //清空查询条件
            resetForm() {
                this.paginationOptions = {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                this.query.OpenID = ''; // 当前顶级ID
                this.query.ParentOpenID = ''; //父级id
            },
            //显示全部人员
            showAllAgents: function () {
                this.resetForm();
                this.getAgents();
            },
            //搜索人员
            getAgents: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasFissionPoster/ErpQueryFissionPosterCustomer',
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
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '暂时没有参加人员'
                            });
                        }
                    }
                });
            },
            // 导出
            exportFile() {
                commonMethods.exportFile(9, this.query);
            },
            search: function () {
                this.query.ParentID = '';
                this.query.OpenID = '';
                if (this.paginationOptions.cur == 1) {
                    this.getAgents();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
        },
        route: {
            data: function (transition) {
                var self = this;
                var query = transition.to.query;
                self.query.FissionPosterID= query.id;
                //获取参加活动人员
                servers.postAjax({
                    url: '/BasFissionPoster/ErpQueryFissionPosterCustomerList',
                    data:  {FissionPosterID: query.id,}
                }).done(function (result) {
                    self.agentsArray = result.Data;   //保存原始数据
                    self.agents = commonMethods.transArrayToJson(result.Data,'OpenID','ParentOpenID','children');  //将原始数据转换成树状JSON格式
                    console.log(self.agents);
                    transition.next();
                });
            }
        },
        ready: function () {
            //获取人员列表
            this.getAgents();
        },
        events: {
            /**
             * 点击左侧树状代理,获取子代理
             * @param agents {object} 点击时获取到的对应树状代理对象
             */
            'getAgentsList': function (agents) {
                this.resetForm();
                if (agents.children) {    //如果有子代理,则用ID作为PID进行搜索,获取其代理
                    this.query.ParentOpenID = agents.OpenID;
                } else {                    //如果没有子代理,则用ID搜索
                    this.query.OpenID = agents.OpenID;
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
            return item.OpenID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            agentsTree: require('./components/tree.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .sheet-categories {
        min-width:870px;
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
        .no-agents {
            padding: 50px;
        }
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
    .team-height {
        height: 40px;
    }
    .user-img {
        display: block;
        height: 40px;
        width: 40px;
        /*border-radius: 50%;*/
        border: 1px solid #ccc;
    }
</style>