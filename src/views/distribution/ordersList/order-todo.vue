
<template>
    <div class="container-fluid container-fluid-margin">
        <div class="unify-head">
            分销订单处理
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >订单编号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >订单状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option v-for="flag in status" value="{{flag.code}}">{{flag.text}}</option>
                        </select>
                    </div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >出库状态</label>
                        <select v-model="query.Flag" class="form-control">
                            <option v-for="flag in flags" value="{{flag.code}}">{{flag.text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >手机号</label>
                        <input v-model="query.Mobile" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >代理商姓名</label>
                        <input v-model="query.CustomerName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >代理编号</label>
                        <input v-model="query.CustomerCode" type="text" class="form-control">
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list order-margin">
            <div class="row ">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a @click ="queryList('0')" v-bind:class="{'active':isAll}" class="sheet-tab-link">全部</a>
                            <a @click ="queryList('1')" v-bind:class="{'active':isSH}" class="sheet-tab-link">待审核</a>
                            <a @click ="queryList('2')" v-bind:class="{'active':isDFH}" class="sheet-tab-link">待发货</a>
                            <a @click ="queryList('3')"  v-bind:class="{'active':isYFH}" class="sheet-tab-link">已完成</a>
                            <a @click ="queryList('4')" v-bind:class="{'active':isQX}" class="sheet-tab-link">已取消</a>
                        </div>
                    </div>
                    <div class="batch-operation">
                        <label v-if="isSH||isDFH" class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                             <a v-if="isPreCheck&&isSH" class="btn btn-default" @click="preCheck('')">确认</a>
                             <a v-if="isSH" class="btn btn-default" @click="operateCheckList(1)">转订单处理</a>
                             <a v-if="isSH" class="btn btn-default" @click="operateCheckList(3)">转直接发货</a>
                             <a v-if="isSH" class="btn btn-default" @click="operateCheckList(2)">驳回</a>
                             <a v-if="isDFH" class="btn btn-default" @click="importDeliverySheet">导入运单</a>
                             <a v-if="isDFH" class="btn btn-default" @click="directOutStock">直接发货</a>
                             <a v-if="isDFH" class="btn btn-default" @click="cancelOrder">取消订单</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>订单状态</th>
                                <th>出库状态</th>
                                <!--<th>订单类型</th>-->
                                <th>订单号</th>
                                <!--<th>上级编码</th>-->
                                <th>物流</th>
                                <th>运单号</th>
                                <th>代理编码</th>
                                <th>代理等级</th>
                                <th>代理商姓名</th>
                                <th>收货人</th>
                                <th>联系电话</th>
                                <th>收货区域</th>
                                <th>订单金额</th>
                                <th>修改时间</th>
                                <th>审核时间</th>
                                <th>出库时间</th>
                                <th>留言</th>
                                <!--<th>备注</th>-->
                                <!--<th>操作</th>-->
                            </tr>
                            </thead>
                            <tbody v-for="order in distributorOrder" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="order.checked"></td>
                                    <td>{{order.Flag | flagToName}}</td>
                                    <td>{{order.OutFlag | outFlagToName}}</td>
                                    <!--<td>{{order.OrderType ? '实物订单': '非实物订单'}}</td>-->
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{order.DistributorOrderID}}"><span class="iconfont"></span><span>{{order.Sheet}}</span></td>
                                    <!--<td>{{order.ParentCustomerCode}}</td>-->
                                    <td>{{order.DeliveryName}}</td>
                                    <td>{{order.DeliverySheetID}}</td>
                                    <td>{{order.CustomerCode}}</td>
                                    <td>{{order.GradeName}}</td>
                                    <td>{{order.Name}}</td>
                                    <td>{{order.LinkMan}}</td>
                                    <td>{{order.Mobile}}</td>
                                    <td><span>{{order.Country?order.Country+',':''}}{{order.State ? order.State + ',' : ''}}{{order.City ? order.City + ',' : ''}}{{order.District ? order.District : ''}}</span></td>
                                    <td>{{order.TotalAmount.toFixed(2)}}</td>
                                    <td><span v-if="order.EditTime" data-toggle="tooltip" data-placement="top" title="{{order.EditTime | truncationTimeString}}">{{order.EditTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="order.CheckTime" data-toggle="tooltip" data-placement="top" title="{{order.CheckTime | truncationTimeString}}">{{order.CheckTime | formatDateFormShow}}</span></td>
                                    <td><span v-if="order.OutTime" data-toggle="tooltip" data-placement="top" title="{{order.OutTime | truncationTimeString}}">{{order.OutTime | formatDateFormShow}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{order.Message}}">{{order.Message | truncationString}}</span></td>
                                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{order.Note}}">{{order.Note | truncationString}}</span></td>-->
                                    <td>
                                        <a v-if="order.PicPath" :href="order.PicPath" target="_blank" data-toggle="tooltip" data-placement="top" title="查看支付凭证"><span class="iconfont icon-pic"></span></a>
                                    </td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="14">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{order.DistributorOrderID}}">
                                            <div class="sheet-detail-wrap">
                                                <table class="table table-condensed">
                                                    <thead>
                                                    <tr>
                                                        <th>商品名称</th>
                                                        <th>品牌名称</th>
                                                        <th>商品价格</th>
                                                        <th>数量</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="list in order.BusDistributorOrderGoodInfo_Views">
                                                        <td><span data-toggle="tooltip" data-placement="top" title="{{order.GoodsName}}">{{list.GoodsName}}</span></td>
                                                        <td><span data-toggle="tooltip" data-placement="top" title="{{order.BrandIDName}}">{{list.BrandIDName}}</span></td>
                                                        <td>{{list.Price.toFixed(2)}}</td>
                                                        <td>{{list.Qty}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var getters = require('../../../js/vuex/getters');
    var actions = require('../../../js/vuex/actions');
    module.exports = {
        data: function () {
            return {
                isPreCheck: false,
                query: {
                    Flag: 0,
                    GoodsName: '',
                    Mobile: '',
                    CustomerName: '', //代理商姓名
                    CustomerCode: '', //代理编号
                    Sheet: [],
                    Status: 0,

                },
                isAll:true,//全部
                isSH:false,//审核
                isYFH:false,//已发货
                isDFH:false,//待发火
                isQX:false,//取消
                flags: [
                    {
                        code: 0,
                        text: '全部'
                    },
                    {
                        code: 1, // OutFlag <= -1
                        text: '待审核'
                    },
                    {
                        code: 2,
                        text: '待发货'
                    },
                    {
                        code: 3,
                        text: '已完成'
                    },
                    {
                        code: 4,
                        text: '已取消'
                    },
                    {
                        code: 5,   // Flag == 30
                        text: '公司审核'
                    },
                    {
                        code: 6,   // Flag == 40
                        text: '复审核'
                    },
                ],
                // status: [
                //     {
                //         code: 0,
                //         text: '全部'
                //     },
                //     {
                //         code: 1,
                //         text: '待确认'
                //     },
                //     {
                //         code: 2,
                //         text: '待审核'
                //     },
                //     {
                //         code: 3,
                //         text: '已完成'
                //     },
                //     {
                //         code: 4,
                //         text: '已取消'
                //     },
                //     {
                //         code: 5,
                //         text: '已发货'
                //     },
                // ],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                distributorOrder: [],
            }
        },
        computed: commonMethods.selectAll('this.distributorOrder', function (item) {
            return item.DistributorOrderID;
        }),
        vuex: {
            getters: {
                account: getters.getAccount
            },
            actions: {
                updateAccount: actions.updateAccount
            }
        },
        methods: {
            queryList(flag){
                if(flag == '0'){
                    this.isAll = true;//全部
                    this.isSH=false//审核
                    this.isYFH=false//已发货
                    this.isDFH=false//待发火
                    this.isQX=false//取消
                    this.query.Status = 0
                }else if(flag =='1'){
                    this.isAll = false;//全部
                    this.isSH=true//审核
                    this.isYFH=false//已发货
                    this.isDFH=false//待发火
                    this.isQX=false//取消
                    // this.showTY = true
                    // this.showBH = true
                    // this.showDR = false
                    // this.showFH = false
                    this.query.Status = 2
                }else if(flag=='2'){
                    this.isAll = false;//全部
                    this.isSH=false//审核
                    this.isYFH=false//已发货
                    this.isDFH=true//待发火
                    this.isQX=false//取消
                    // this.showTY = false
                    // this.showBH = false
                    // this.showDR = true
                    // this.showFH = true
                    this.query.Status = 6
                }else if(flag=='3'){
                    this.isAll = false;//全部
                    this.isSH=false//审核
                    this.isYFH=true//已发货
                    this.isDFH=false//待发火
                    this.isQX=false//取消
                    // this.showTY = false
                    // this.showBH = false
                    // this.showDR = false
                    // this.showFH = false
                    this.query.Status = 3
                }else if(flag=='4'){
                    this.isAll = false;//全部
                    this.isSH=false//审核
                    this.isYFH=false//已发货
                    this.isDFH=false//待发火
                    this.isQX=true//取消
                    // this.showTY = false
                    // this.showBH = false
                    // this.showDR = false
                    // this.showFH = false
                    this.query.Status = 4
                }
                this.search();
            },
            // 获取账号信息
            getUserInfo: function () {
                var self = this;
                servers.postAjax({
                    url: '/Login/ErpGetUserInfo',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.updateAccount(result.Data);
                        self.isPreCheck = parseInt(result.Data.SysGlobalConfigs['201004'],10) === 1
                    }
                })
            },
            //重置列表
            resetting: function () {
                this.query = {
                    Flag: 0,
                    GoodsName: '',
                    Mobile: '',
                    CustomerName: '', //代理商姓名
                    CustomerCode: '', //代理编号
                    Sheet: [],
                    Status: 0,
                }
            },
            // 获取所有订单
            getDistributorOrder: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BusDistributorOrder/ErpQueryBusDistributorOrderComPany',
                    data: {
                        PageNumber: this.paginationOptions.cur,
                        PageSize: this.paginationOptions.pageSize,
                        SearchWhere: this.query
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        for (var i = result.Data.PageData.length - 1; i >= 0; i--) {
                            result.Data.PageData[i].checked = false;
                        }
                        self.distributorOrder = result.Data.PageData;
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    }
                })
            },
            preCheck: function (id) {
                var self = this;
                var checkedGroups = id ? [id] : this.checkedGroups
                if (this.checkedGroups.length === 0) {
                    this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                    return
                }
                var notItemList = this.distributorOrder.filter(function(item){
                    return checkedGroups.indexOf(item.DistributorOrderID) > -1
                }).filter(function (item) {
                    return item.Flag != 30
                })
                if (notItemList.length > 0) {
                    this.$dispatch('transmit', 'tip', {contentText: '包含不需要确认订单,请重新选择'});
                    return
                }
                this.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确认订单吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'preCheck'
                    }
                });
                this.$off('preCheck');
                this.$once('preCheck',function () {
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorOrder/ErpComputerCheckBatch',
                        contentType: 'application/json',
                        data: JSON.stringify(checkedGroups)
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                contentText: "确认订单成功"
                            });
                            self.$dispatch('transmit','page-change');
                        }
                    })
                })
            },
            operateCheckList (type) {
                var text = '';
                var url = '';
                if(type == 1){
                    text = '同意';
                    url = '/BusDistributorOrder/ErpComputerCompleteBatch';
                }else if(type == 2) {
                    text = '驳回';
                    url = '/BusDistributorOrder/ErpComputerCancelBatch';
                } else if(type == 3){
                    text = '确定';
                    url = '/BusDistributorOrder/ErpCheckBusDistributorOrder';
                }
                if (this.checkedGroups.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                this.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: `${text}订单吗?`,
                    btnName: '确定',
                    events: {
                        confirm: 'cancelOrder'
                    }
                });
                this.$off('cancelOrder');

                this.$once('cancelOrder',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: url,
                        data: JSON.stringify(this.checkedGroups),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).done((result) => {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            this.$dispatch('transmit','tip',{
                                contentText: `${text}订单成功`
                            });
                            this.$dispatch('transmit','page-change');
                        }
                    })
                })
            },
            // 取消订单
            cancelOrder: function (id,flag) {
                if (this.checkedGroups.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一张提货单',
                    });
                    return
                }
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '取消订单吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'cancelOrder'
                    }
                });
                self.$off('cancelOrder');

                self.$once('cancelOrder',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorOrder/ErpCancelBatchOrder',
                        data: JSON.stringify(this.checkedGroups),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                contentText: '取消订单成功'
                            });
                            self.$dispatch('transmit','page-change');
                        }
                    })
                })
            },
            checkOrder: function (id,flag) {
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定审核订单吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'checkOrder'
                    }
                });
                self.$off('checkOrder');
                self.$once('checkOrder', function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorOrder/ErpComputerComplete',
                        data: {
                            DistributorOrderID: id,
                            Flag: flag
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                contentText: '审核订单成功'
                            });
                            self.$dispatch('transmit', 'page-change');
                        }
                    })
                })
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getDistributorOrder();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            importDeliverySheet: function() {
                this.$dispatch('transmit','uploadModalShow',39);
            },
            directOutStock: function() {
                var self = this;
                if (this.checkedGroups.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一张提货单',
                    });
                    return
                }
                if (this.distributorOrder.some(function(order) {
                            return self.checkedGroups.indexOf(order.DistributorOrderID) > -1 && (!order.DeliverySheetID || !order.DeliveryName)
                        })) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请先更新物流信息',
                    });
                    return
                }
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定对勾选的订单直接出库吗？该操作无法恢复。',
                    btnName: '确定',
                    events: {
                        confirm: 'directOutStock'
                    }
                });
                self.$off('directOutStock');

                self.$once('directOutStock',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorOrder/ErpDistributorOrderSendGoods',
                        data: JSON.stringify(this.checkedGroups),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                contentText: '发货成功'
                            });
                            self.$dispatch('transmit','page-change');
                        }
                    })
                })
            },

        },
        filters: {
            outFlagToName: {
                read: function (val) {
                    var outFlag = parseInt(val, 10);
                    if (outFlag <= -1) {
                        return '待审核';
                    } else if (outFlag >= 0 && outFlag <= 94) {
                        return '待发货';
                    } else if (outFlag >= 100) {
                        return '已完成';
                    } else if (outFlag >= 95 && outFlag <= 99) {
                        return '已取消';
                    } else {
                        return '已完成';
                    }
                }
            },
            flagToName: {
                read: function (val) {
                    var flag = parseInt(val, 10);
                    if (flag === 30) {
                        return '待确认';
                    }
                    if (flag === 40) {
                        return '审核';
                    }
                    if (flag === 100) {
                        return '已完成';
                    }
                    if ( flag == 90) {
                        return '已确认';
                    }
                    if (flag === 95 || flag === 97) {
                        return '已取消';
                    }
                    if (flag === 110) {
                        return '已发货';
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                if (!this.account.Login) {
                    this.getUserInfo();
                } else {
                    this.isPreCheck = parseInt(this.account.SysGlobalConfigs['201004'],10) === 1
                }
                this.query.Status = 0
                this.getDistributorOrder();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getDistributorOrder();
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .icon-pic {
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

</style>
