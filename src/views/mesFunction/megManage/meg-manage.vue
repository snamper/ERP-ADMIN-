<template>
    <div class="container-fluid">
        <div class="unify-head">
            消息列表
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        消息管理
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog
                        ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>                    
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail" style="margin-bottom: 5px;">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>买家</label>
                        <input  type="text" v-model="query.Buyer" class="form-control">
                    </div>
                    <!-- 买家 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>店铺</label>
                        <select  class="form-control" v-model="query.NetShopID">
                            <option value="">不限</option>
                            <option v-bind:value="item.NetShopID" v-for="item in baseLookUp.shopLists">{{item.Name}}</option>}
                            option
                        </select>
                    </div> 
                    <!-- 店铺 -->  
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" style="visibility:hidden;">
                        <label>外部交易号</label>
                        <input  type="text" class="form-control"
                               placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" style="visibility:hidden;">
                        <label>外部交易号</label>
                        <input  type="text" class="form-control"
                               placeholder="多个订单用；隔开">
                    </div>
                    <!-- 隐藏占位 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select  class="form-control" v-model="query.Status">
                            <option value="-1">不限</option>
                            <option value="1">已回复</option>
                            <option value="0">未回复</option>
                        </select>
                    </div> 
                    <!-- 状态 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>平台</label>
                        <select  class="form-control" v-model="query.ChannelID">
                            <option value="">不限</option>
                            <option v-bind:value="item.ChannelID" v-for="item in baseLookUp.payLists">{{item.Name}}</option>                            
                        </select>
                    </div> 
                    <!-- 平台 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>消息分类</label>
                        <select  class="form-control" v-model="query.MessageClassID">
                            <option value="">不限</option>
                            <option v-bind:value="item.MessageClassID" v-for="item in baseLookUp.stockLists">{{item.Name}}</option>  
                        </select>
                    </div>
                    <!-- 消息分类 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>操作客服</label>
                        <input  type="text" v-model="query.Code" class="form-control">
                    </div>

                    <!-- 操作客服 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>接受时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.ReceiveDate"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>&nbsp;&nbsp;到期时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.ExpirationDate"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                    	
                    <!-- 接受到期时间 -->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>黑名单</label>
                        <select  class="form-control" v-model="query.IsBlackList">
                            <option value="-1">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>

                </div>

                <div class="query-button-group">
                    <a  href="javascript:void(0)" @click="search" class="btn btn-default">搜索</a>
                    <a  href="javascript:void(0)" @click="resetForm" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a  v-link="{name:'meg-manage-list',activeClass:'active'}"
                               class="sheet-tab-link">处理中</a>
                            <a  v-link="{name:'meg-manage-pick',activeClass:'active'}"
                               class="sheet-tab-link">已到期</a>
                        </div>
                    </div>
                </div>
            </div>

                <router-view :code="pageInfo.pageStatusCode"
                             :out-stock-batch.sync="outStockBatch[pageInfo.pageStatusName]"
                             :pagination-options.sync="pagination[pageInfo.pageStatusName]"></router-view>
        </div>


    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var megManageCode = require('../../../globalConstants').megManageCode;
    console.log(megManageCode)

    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                pageInfo: {
                    pageStatusName: '',
                    pageStatusCode: ''
                },
                query: {
                    Buyer:'',//买家
                    NetShopID:'',//店铺下拉ID
                    Status:-1,//状态已回复未回复
                    ChannelID:'',//平台下拉ID
                    MessageClassID:'',//消息分类下拉ID
                    Code:'',//操作客服
                    ReceiveDate:'',//接受时间
                    ExpirationDate:'',//到期时间
                    IsBlackList:-1,//是否黑名单
                    IsExpired:100//处理中/已到期
                },
                baseLookUp: {
                    shopLists: [],  //店铺下拉数据
                    payLists: [],   // 平台下拉数据
                    stockLists: [] // 消息分类下拉数据
                },
                outStockBatch: {
                    'meg-manage-list': [], //未确认
                    'meg-manage-pick': [], //已拣货
                },
                pagination: {
                    'meg-manage-list': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }, //未确认
                    'meg-manage-pick': {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }
                }
            }
        },
        methods: {
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },            
            //请求列表
            getOutStockBatch: function () {
                //console.log(this.query)
                var self = this;
                var pageStatusName = this.pageInfo.pageStatusName;
                var pagination = this.pagination[pageStatusName];
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysChannelMessage/ErpQueryChannelMessage',
                    data: {
                        PageSize: pagination.pageSize,
                        PageNumber: pagination.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var outStockBatch = result.Data.PageData;
                        self.outStockBatch[pageStatusName] = [];
                        if (outStockBatch.length > 0) {
                            self.pagination[pageStatusName].all = result.Data.TotalPages;
                            self.pagination[pageStatusName].totalRecords = result.Data.TotalRecords;
                            outStockBatch.forEach(function (item) {
                                item.checked = false;
                            });
                            self.outStockBatch[pageStatusName] = outStockBatch;

                        } else {
                            self.pagination[pageStatusName].all = result.Data.TotalPages;
                            self.pagination[pageStatusName].totalRecords = result.Data.TotalRecords;                            
                            
                        }

                    }
                })
            },
            //搜索
            search: function () {
                var pageStatusName = this.pageInfo.pageStatusName;
                var pagination = this.pagination[pageStatusName];
                if (pagination.cur == 1) {
                    this.getOutStockBatch();
                } else {
                    pagination.cur = 1;
                }
            },
            //重置
            resetForm: function () {
                this.query = {
                    Buyer:'',//买家
                    NetShopID:'',//店铺下拉ID
                    Status:-1,//状态已回复未回复
                    ChannelID:'',//平台下拉ID
                    MessageClassID:'',//消息分类下拉ID
                    Code:'',//操作客服
                    ReceiveDate:'',//接受时间
                    ExpirationDate:'',//到期时间
                    IsBlackList:-1,//是否黑名单
                    IsExpired:this.pageInfo.pageStatusCode,
                }
            },
            //店铺下拉列表
            getShopList:function(){
                var $this = this;
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetShopList'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.baseLookUp.shopLists = result.Data;
                    }
                })
            },
            //平台下拉列表
            getChannelList:function(){
                var $this = this;
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetChannelList'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.baseLookUp.payLists = result.Data;
                    }
                })
            },  
            //消息分类下拉列表
            getMessageClasses:function(){
                var $this = this;
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageClass/GetMessageClasses'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.baseLookUp.stockLists = result.Data;
                    }
                })
            },                       
        },
        route: {
            data: function (transition) {
                var pageStatusName = this.pageInfo.pageStatusName = transition.to.name;
                // console.log(pageStatusName)
                // console.log(transition)
                // console.log(megManageCode)
                this.query.IsExpired = this.pageInfo.pageStatusCode = megManageCode[pageStatusName].code;//已处理/未处理
                // console.log(this.pageInfo.pageStatusCode)
                // console.log(this.outStockBatch[pageStatusName])
                if (this.outStockBatch[pageStatusName].length > 0) {

                } else {
                    this.getOutStockBatch();
                    //console.log('222')
                }
                transition.next();
            }
        },
        events: {
            //获取消息管理列表
            'getoutStockBatch': function () {
                if (this.outStockBatch.OutStockBatchID) {
                    return ;
                } else {
                    this.getOutStockBatch();
                }
            },          
            'page-change': function () {
                this.getOutStockBatch();
            },
        },
        ready: function () {
            this.getShopList();//店铺下拉
            this.getChannelList();//平台下拉
            this.getMessageClasses();//消息分类
            //this.getOutStockBatch();//消息管理
            //dateTimePicker
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
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }





</script>



<style rel="stylesheet/less" lang="less">
.btn {
	margin-left: 10px;
	margin-top: 10px;
	position: relative;
}

</style>