<template>
    <div     class="container-fluid container-fluid-margin">
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
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >状态</label>
                        <select v-model="query.Flag" class="form-control">
                            <option v-for="flag in flags" value="{{flag.code}}">{{flag.text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                </div>
            </div>
        </div>
        <div class="sheet-list order-margin">
            <div class="row ">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>订单状态</th>
                                <th>订单号</th>
                                <!-- <th>上级编码</th> -->
                                <th>代理编码</th>
                                <th>代理等级</th>
                                <th>代理姓名</th>
                                <th>收货人</th>
                                <th>联系电话</th>
                                <th>详细地址</th>
                                <th>订单金额</th>
                                <th>创建时间</th>
                                <th>留言</th>
                                <!-- <th>备注</th> -->
                            </tr>
                            </thead>
                            <tbody v-for="order in distributorOrder" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td>{{order.OutFlag | outFlagToName}}</td>
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{order.GetDistributorOrderID}}"><span class="iconfont"></span><span>{{order.Sheet}}</span></td>
                                    <!-- <td>{{order.ParentCustomerCode}}</td> -->
                                    <td>{{order.CustomerCode}}</td>
                                    <td>{{order.GradeName}}</td>
                                    <td>{{order.Editor}}</td>
                                    <td>{{order.LinkMan}}</td>
                                    <td>{{order.Mobile}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{order.Country ? order.Country  + ',' : ''}}{{order.State ? order.State + ',' : ''}}{{order.City ? order.City + ',' : ''}}{{order.District ? order.District + ',' : ''}}{{order.Address ? order.Address : ''}}">{{order.Country ? order.Country  + ',' : ''}}{{order.State ? order.State + ',' : ''}}{{order.City ? order.City + ',' : ''}}{{order.District ? order.District + ',' : ''}}{{order.Address ? order.Address : ''  | truncationString}}</span></td>
                                    <td>{{order.TotalAmount.toFixed(2)}}</td>
                                    <td><span v-if="order.EditTime" data-toggle="tooltip" data-placement="top" title="{{order.EditTime | truncationTimeString}}">{{order.EditTime | formatDateFormShow}}</span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{order.Message}}">{{order.Message | truncationString}}</span></td>
                                    <!-- <td><span data-toggle="tooltip" data-placement="top" title="{{order.Note}}">{{order.Note | truncationString}}</span></td> -->
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="14">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{order.GetDistributorOrderID}}">
                                            <div class="sheet-detail-wrap">
                                                <table class="table table-condensed">
                                                    <thead>
                                                    <tr>
                                                        <th>商品名称</th>
                                                        <th>品牌名称</th>
                                                        <th>SKU</th>
                                                        <th>商品货号</th>
                                                        <th>商品价格</th>
                                                        <th>数量</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="list in order.BusGetDistributorOrderGoodInfo_Views">
                                                        <td><span>{{list.GoodsName}}</span></td>
                                                        <td><span>{{list.BrandIDName}}</span></td>
                                                        <td><span>{{list.CustomBC}}</span></td>
                                                        <td><span>{{list.CustomNo}}</span></td>
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
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                query: {
                    Flag: 0,
                    GoodsName: '',
                    Sheet: [],
                },
                flags: [
                    {
                        code: 0,
                        text: '全部'
                    },
                    {
                        code: 1,
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
                    }
                ],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                distributorOrder: [],
            }
        },
        methods: {
            // 获取所有订单
            getDistributorOrder: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BusGetDistributorOrder/ErpQueryBusGetDistributorOrderCompany',
                    data: {
                        PageNumber: this.paginationOptions.cur,
                        PageSize: this.paginationOptions.pageSize,
                        SearchWhere: this.query
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.distributorOrder = result.Data.PageData;
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    }
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

<style rel="stylesheet/less" lang="less">

</style>
