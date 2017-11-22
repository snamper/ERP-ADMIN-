

<template>

    <div class="query-form">
        <div class="query-header">
            <div class="checkbox-group">
                <label class="checkbox-title">
                店铺列表
            </label>
            <div class="checkbox-list">
            </div>
            <!--<a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" data-target="#query-detail">收起多余选项<span class="iconfont icon-up"></span></a>-->
        </div>
    </div>
    <div id="query-detail" class="form-inline query-detail commoditybd" @keyup.enter.stop="querys">
        <div class="row">
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>关键词</label>
                <input v-model="query.KeyWord" type="text" class="form-control" placeholder="名称/编码">
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>状态</label>
                <select class="form-control" v-model="query.Status">
                    <option value="">不限</option>
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>店铺种类</label>
                <select class="form-control" v-model="query.ShopKind">
                    <option value="">不限</option>
                    <option v-for="option in shopkindList" value="{{option.Code}}">{{option.Text}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>渠道</label>
                <select class="form-control" v-model="query.ChannelID">
                    <option value="">不限</option>
                    <option v-for="option in channelList" value="{{option.ChannelID}}">{{option.Name}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>所属仓库</label>
                <select class="form-control" v-model="query.StockID">
                    <option value="">不限</option>
                    <option v-for="option in stockList" value="{{option.StockID}}">{{option.Name}}</option>
                </select>
            </div>
        </div>
        <div class="query-button-group">
            <a @click="querys" href="javascript:void(0)" class="btn btn-default">搜索</a>
            <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            <!-- <a href="javascript:void(0)" class="btn btn-default">重置</a>
            <a href="javascript:void(0)" class="btn btn-default">导出订单</a>
            <a href="javascript:void(0)" class="btn btn-default">导出商品明细</a> -->
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title scroll-list-title">店铺列表</label>
                    <div class="batch-operation-group">

                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                        <tr>
                            <th>
                            <th class="sheet-header-state">
                                <input type="checkbox" v-model="selectAll">
                            </th>
                            </th>
                            <th>编码</th>
                            <th>名称</th>
                            <th>店铺种类</th>
                            <th>渠道</th>
                            <th>所属仓库</th>
                            <th>状态</th>
                            <th>备注</th>
                            <!--<th>操作</th>-->
                        </tr>
                        </thead>
                        <tbody v-for="t in tableList" class="panel panel-default">
                        <tr class="sheet-list-item">
                            <td>
                            <td class="sheet-item-state">
                                <input type="checkbox" v-model="t.checked" />
                            </td>
                            </td>
                            <td>{{t.Code}}</td>
                            <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">
                                {{t.Name | truncationString}}
                                </span>
                            </td>
                            <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{t.ShopKindDesc | truncationString}}">
                                {{t.ShopKindDesc}}</span>
                            </td>
                            <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{t.NetShop.Channel.Name}}">
                                {{t.NetShop.Channel.Name | truncationString}}
                                </span>
                            </td>
                            <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{t.Stock.Name}}">
                                {{t.Stock.Name | truncationString}}
                                </span>
                            </td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>

                            <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{t.ShopDetail.Note}}">
                                {{t.ShopDetail.Note | truncationString}}</span>
                            </td>
                            <!--<td>-->
                            <!--<a href="#!/commodity/edit/{{t.ShopID}}" data-toggle="tooltip" data-placement="top" title="修改">-->
                            <!--<span class="click-element iconfont icon-alter"></span>-->
                            <!--</a>-->
                            <!--<a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="配置接口">-->
                            <!--<span v-link="{name: 'merchant-list-config', params: {id: t.ShopID}}" class="click-element iconfont icon-interface"></span>-->
                            <!--</a>-->


                            <!--<a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="禁用">-->
                            <!--<span v-if="t.Status" class="click-element iconfont icon-forbid" @click="setStatus([t.ShopID], 0)"></span>-->
                            <!--</a>-->

                            <!--<a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="启用">-->
                            <!--<span v-if="!t.Status" class="click-element iconfont icon-play" @click="setStatus([t.ShopID], 1)"></span>-->
                            <!--</a>-->

                            <!--&lt;!&ndash; <a :href="t.NetShop.Channel.url || ''" target="view_window" data-toggle="tooltip" data-placement="top" title="查看">-->
                            <!--<span v-if="t.Status" class="click-element iconfont icon-play"></span>-->
                            <!--</a> &ndash;&gt;-->

                            <!--<a @click="setBuyApplyCookie(t.ShopID,t.NetShop.Channel.AppUrl)" href="javascript:void(0)" target="view_window" data-toggle="tooltip" data-placement="top" title="购买应用">-->
                            <!--<span class="click-element iconfont icon-buyapply"></span>-->
                            <!--</a>-->

                            <!--</td>-->
                        </tr>
                        <tr class="sheet-list-detail">
                            <td colspan="12">
                                <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="sheet-list-detail{{n}}">
                                    <div class="sheet-detail-wrap">
                                        <table class="table table-condensed">
                                            <thead>
                                            <tr>
                                                <th>
                                                    <a href="javascript:void(0)" class="btn btn-default">+新增</a>
                                                </th>
                                                <th>商品名称</th>
                                                <th>SKU</th>
                                                <th>尺码</th>
                                                <th>颜色</th>
                                                <th>条形码</th>
                                                <th>数量</th>
                                                <th>市场价</th>
                                                <th>单价</th>
                                                <th>价格</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <a href="javascript:void(0)" class="btn-change">修改</a>
                                                    <a href="javascript:void(0)" class="btn-delete">删除</a>
                                                </td>
                                                <td>LV0020-04手表</td>
                                                <td>
                                                    <span>LV00200401</span>
                                                    <!--<input type="text">-->
                                                </td>
                                                <td>无</td>
                                                <td>白色</td>
                                                <td>6902480075353</td>
                                                <td><span>1</span>/<span>2230</span></td>
                                                <td>￥298.00</td>
                                                <td><span>￥198.00</span></td>
                                                <td>￥198.00</td>
                                            </tr>
                                            </tbody>
                                            <tbody class="list-detail-operation">
                                            <tr>
                                                <td colspan="10" class="detail-btn-group">
                                                    <a href="javascript:void(0)" class="btn btn-default">修改收货信息</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">修改仓库</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">修改快递</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">订单备注</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">审核确认</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">暂  停</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">恢复暂停</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">设为问题单</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">置为正常单</a>
                                                    <a href="javascript:void(0)" class="btn btn-default">订单无效</a>
                                                </td>
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
</template>

<script>

    var commonMethods = require('../../../js/common');
    var cookie = require('js-cookie');

    module.exports = {
        props: ['refShopId'],
        data: function() {
            return {
                _url: 'http://192.168.88.47:888/API',
                tableList: [],
                shopkindList: [],
                channelList: [],
                stockList: [],
                query: {
                    KeyWord: '',
                    Status: '',
                    ShopKind: '',
                    ChannelID: '',
                    StockID: ''
                },
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                },
                server: require('../../../js/servers/servers')
            };
        },
        components: {
            'pagination': require('../../../components/pagination.vue')
        },
        computed: commonMethods.selectAll('this.tableList', function(item) {
            return item.ShopID;
        }),
        watch: {
            'checkedGroups': function (newValue) {
                this.refShopId = newValue;
            }
        },
        methods: {
            // 启用与禁用
            setStatus: function(arr, status) {
                var self = this;

                if (arr === false) arr = this.checkedGroups;

                this.server.postAjax({
                    url: '/BasShop/UpdateStatus',
                    data: {
                        Status: status,
                        ShopIDList: arr
                    },
                    success: function(data) {
                        if (data.ResultCode === 1) {
                            self.$dispatch('transmit', 'tip', {contentText: '修改成功！'});
                            self.querys();
                        }
                    }
                });
            },
            // 重置
            resetting: function () {
                this.query = {
                    KeyWord: '',
                    Status: '',
                    ShopKind: '',
                    ChannelID: '',
                    StockID: ''
                }
            },
            setBuyApplyCookie: function (shopID,url) {
                cookie.set('ShopID_cookie',shopID, { expires: 7, path: '/' });
                if (url) {
                    window.open(url)
                } else {
                    this.$dispatch('transmit', 'tip', {contentText: '没有此购买应用'});
                }
            },
            querys: function(type) {
                var self = this;

                if (type !== true && this.paginationOptions.cur !== 1) {

                    return this.paginationOptions.cur = 1;

                }

                this.server.postAjax.bind(this)({
                    url: '/BasShop/ErpQueryShop',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: this.query
                    },
                    success: function(data) {
                        if (data.ResultCode === 1) {
                            var list = data.Data.PageData;

                            self.paginationOptions.all = data.Data.TotalPages;
                            self.paginationOptions.totalRecords = data.Data.TotalRecords;

                            for (var i in list) {

                                list[i].checked = false;

                            }

                            self.tableList = list;
                        }
                    }
                })
            }
        },
        getShop: function() {
            var relf = this;
            if (relf.checkedGroups.length > 0) {
                servers.postAjax.bind(this)({
                    url: '/Mis/GetMISGoods',
                    data: {
                        MerchantID:relf.checkedGroups,
                        ExistUpdate: relf.ExistUpdate
                    },
                    success: function(data) {
                        relf.MerchantID= data.Data;
                    }
                });
            } else {
                relf.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '请至少选择一个商品!'
                });
            }

        },

        ready: function() {
            this.server.getShopKindList(this, 'shopkindList');
            this.server.getChannelList(this, 'channelList');
            this.server.getStockList(this, 'stockList');
            this.querys();
        },

        events: {

            'page-change': function() {
                this.querys(true);
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">

    .commoditybd {
        border: 1px solid #e5e5e5;
        padding-right: 20px;
        box-sizing: border-box;
        background: #fafafa;
    }
    .batch-operation-group{
        .getShopBtn{
            margin-top:3px;
        }


    }

</style>
