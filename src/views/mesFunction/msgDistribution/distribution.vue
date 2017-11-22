<template>
	<div class="distribution">
		<div class="title">消息分配</div>
		<div class="content">
			<!-- <div class="control">
                    <a href="javascript:void(0)"  @click="setType('00')" :class="{danactive : Data == 00}">未分配</a>
                    <a href="javascript:void(0)"  @click="setType('01')" :class="{danactive : Data == 01}">店铺分配</a>
                    <a href="javascript:void(0)"  @click="setType('10')"  :class="{danactive : Data == 10}">买家首字母分配</a>
			</div> -->
            <div class="control">
                <div>
                    <span>店铺分配</span>
                    <a href="javascript:void(0)" class="wuxin" @click="setType1('01',1)" :class="{active : Data == 01}" v-text="Data == 01 ? 'ON' : 'OFF'"></a>
                </div>
                <div>
                    <span>买家首字母分配</span>
                    <a href="javascript:void(0)" @click="setType1('10',2)" :class="{active : Data == 10}" v-text="Data == 10 ? 'ON' : 'OFF'" class="wuxin"></a>
                </div>
            </div>
            <div class="sheet-list" v-if="Data == 10">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <a v-link="{name: 'distribution-add'}" class="btn btn-default">添加</a>
                            </div>
                        </div>
                            <div v-if="articleConfigList.length" class="sheet-list-table table-responsive">
                                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                    <thead class="sheet-list-header">
                                    	<tr>
                                    	    <th>首字母</th>
                                    	    <th>指定客服</th>
                                    	    <th>操作</th>
                                    	</tr>
                                    </thead>
                                    <tbody v-for="item in articleConfigList" class="panel panel-default">
                                    <tr class="sheet-list-item">
                                        <td>{{item.FirstWord}}</td>
                                        <td>{{item.CustomServiceCode}}</td>
                                        <td><a href="javascript:void(0)" @click="delList(item.MessageRuleID)">删除</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <pagination :pagination-options.sync="paginationOptions"></pagination>
                            </div>
                            <div v-else class="sheet-list-table table-responsive">
                                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                    <thead class="sheet-list-header">
                                        <tr>
                                            <th>首字母</th>
                                            <th>指定客服</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody class="panel panel-default">
                                    <tr class="sheet-list-item">
                                        <td class="texy-center">暂无数据!</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>			
		</div>
	</div>
</template>
<script type="text/babel">
    import commonMethods from '../../../js/common';
    import servers from '../../../js/servers/servers';
    var NProgress = servers.NProgress;
    import pagination from '../../../components/pagination.vue';
    import datePicker from '../../../components/date_picker.vue';
    export default {
        data() {
            return {
                Data: '',//控制分配状态
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
            //删除
            delList(item) {
                var self = this;
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageRule/DelMessageRule',
                    data: {
                        Id:item
                    }
                }).done(function(result){
                    NProgress.done();
                    if(result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '删除成功',
                            contentText: '删除成功'
                        })
                    }
                    self.queryList(true)
                })
            },
            //获取消息分配原则
            getRype() {
                var self = this;
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageRule/GetMessageRuleType',
                }).done(function(result){
                    NProgress.done();
                    if(result.ResultCode == 1) {
                        self.Data = result.Data 
                    }
                })
            },
            setType1(item,flag) {
                var self = this;
                if(flag == 1) {
                    if(item == self.Data) {
                        self.Data = '00';
                    }else {
                        self.Data = '01';
                    }
                }else if(flag == 2) {
                    if(item == self.Data) {
                        self.Data = '00';
                    }else {
                        self.Data = '10';
                    }  
                }
                self.setType2()
            },
            //设置消息分配原则
            setType2() {
                var self = this
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageRule/SetMessageRuleType',
                    data: {
                        value: self.Data,
                    }
                }).done(function(result){
                    NProgress.done();
                    if(result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '设置成功',
                            contentText: '设置成功'
                        })
                    }
                })
            },
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
             * 查询数据
             */
            queryList(type) {
                var self = this;
                if (!type && self.paginationOptions.cur !== 1) return self.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageRule/QueryMessageRules',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: {},
                    },
                }).then(function (result) {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (data.length) {
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            self.articleConfigList = data;
                        } else {
                            self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                            self.articleConfigList = [];
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
            this.getRype()
        },
    };

</script>

<style rel="stylesheet/less" lang="less" scoped>
	 .distribution {
	 	padding: 10px;
	 	.title {
	 		font-size: 18px;
	 		font-weight: bold;
	 	}
	 	.content {
	 		margin-top: 20px;
	 		background-color: #fff;
	 		padding: 20px;
            .control {
                padding: 20px;
                // a {
                //     color: white;
                //     font-weight: bold;
                //     line-height: 1.5;
                //     border: 1px solid red;
                //     padding: 5px 20px;
                //     background-color: #ccc;
                //     margin-right: 50px;
                //     border: none;
                //     border-radius: 5px;
                // }
                .danactive {
                    background-color: #327ab7;
                }
                //自己写的开关
                span {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                }
                .wuxin {
                    display:inline-block;
                    padding: 0;
                    border-radius: 5px;
                    background-color: #ccc;
                    color: white;
                    font-weight: bold;
                    display: inline-block;
                    line-height: 25px;
                    padding: 0 20px;
                    font-size: 12px;
                    margin:10px 0 10px 10px;
                    &.active {
                        background-color: #337ab7;
                    }
                }
            }
	 	}
	 } 
	 .sheet-list-table {
	 	padding: 20px;
	 } 
	 th,td {
	 	font-size: 12px;
	 	height: 50px;
	 	line-height: 50px;
	 } 
	 .sheet-list-header {
	 	tr th {
	 		font-size: 16px;
	 		font-weight: bold;
	 	}
	 }
	 .danbtn.active {
	 	background-color: #327ab7;
	 	border-color:#327ab7;
	 }
	 .btn-primary {
	 	background-color: #ccc;
	 	border-color:#ccc;	 	
	 }
	 .btn-primary:hover {
	 	background-color: #ccc;
	 	border-color:#ccc;
	 }
	 .btn-group {
	 	margin: 25px 0;
	 }
</style>  