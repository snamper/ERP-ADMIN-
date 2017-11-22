<template>
    <div class="container-fluid">
        <div class="unify-head">
            条码接口管理
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                    </label>
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品标题</label>
                        <input v-model="query.GoodsName" type="text" class="form-control">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >商品编码</label>-->
                        <!--<input v-model="query.CustomNo | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品数字ID</label>
                        <input v-model="query.ItemID | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >SKU数字ID</label>-->
                        <!--<input v-model="query.SkuID | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.CustomBC | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >国标码</label>-->
                        <!--<input v-model="query.BarCode | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >颜色</label>
                        <input v-model="query.ColorName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >尺码</label>
                        <input v-model="query.SizeName" type="text" class="form-control" >
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>库存</label>
                        <input v-model="query.StockCount" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.StockCount_to" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>价格</label>
                        <input v-model="query.Price" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.Price_to" type="number" min="0" class="form-control" placeholder="">
                    </div>
                </div>
                <div class="query-button-group">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出商品</a>-->
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a @click="downGoods" href="javascript:void(0)" class="btn btn-default">更新信息</a>
                            <a @click="allowUpdate('')" href="javascript:void(0)" class="btn btn-default">SKU库存同步</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input v-model="selectAll" type="checkbox"></th>
                                    <th>店铺</th>
                                    <th>SKU数字ID</th>
                                    <th>SKU</th>
                                    <th>颜色</th>
                                    <th>尺码</th>
                                    <th>SKU库存</th>
                                    <th>商品编码</th>
                                    <th>商品数字ID</th>
                                    <!--<th>商品标题</th>-->
                                    <th>渠道售价</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="skuStock in skuStocks" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input v-model="skuStock.checked" type="checkbox" style="margin-right:8px;"></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.ShopName | baseLookUp.shopLists}}">{{skuStock.ShopName | baseLookUp.shopLists  | truncationString }} </span></td>
                                    <td>{{skuStock.SkuID}}</td>
                                    <td>{{skuStock.CustomBC}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.ColorName}}">{{skuStock.ColorName  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.SizeName}}">{{skuStock.SizeName  | truncationString }} </span></td>
                                    <td>{{skuStock.StockCount}}</td>
                                    <td>{{skuStock.CustomNo}}</td>
                                    <td>{{skuStock.ItemID}}</td>
                                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{skuStock.PropsName}}">{{skuStock.PropsName  | truncationString }} </span></td>-->
                                    <td><span v-if="skuStock.Price">￥</span>{{skuStock.Price}}</td>
                                    <td>
                                        <a @click="allowUpdate(skuStock)" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="库存同步"><span class="iconfont icon-sync"></span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="skuStocks.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-update-stock></modal-update-stock>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        props: ['baseLookUp'],
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    ShopID: '',
                    SkuID: [],
                    ItemID: [],
                    CustomBC: [],
                    CustomNo: [],
                    BarCode: [],
                    GoodsName: '',
                    ColorName: '',
                    SizeName: '',
                    StockCount: '',
                    StockCount_to: '',
                    Price: '',
                    Price_to: ''
                },
                skuStocks: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                }
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //重置
            resetForm: function () {
                this.query = {
                    ShopID: '',
                    SkuID: [],
                    ItemID: [],
                    CustomBC: [],
                    CustomNo: [],
                    BarCode: [],
                    GoodsName: '',
                    ColorName: '',
                    SizeName: '',
                    StockCount: '',
                    StockCount_to: '',
                    Price: '',
                    Price_to: ''
                }
            },
            getSkuGroup: function (sku) {
                var SkuGroup = [];
                if (sku) {
                    SkuGroup.push(sku);
                } else {
                    SkuGroup = this.checkedGroups;
                }
                if (SkuGroup.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个角色'
                    });
                    return [];
                } else {
                    return SkuGroup;
                }
            },
            //更新库存
            downGoods: function () {
                this.$broadcast('modal-update-stock',this.baseLookUp);
            },
            //获取SKU列表
            getSkuStocks: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/PlatFormAPI/QuerySKuStock',
                    data: {
                        PageNumber: self.paginationOptions.cur,
                        PageSize: self.paginationOptions.pageSize,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var skuStocks = result.Data.PageData;
                        self.skuStocks = [];
                        if (skuStocks.length> 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            skuStocks.forEach(function (item) {
                                item.checked = false;
                            });
                            self.skuStocks = skuStocks;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                })
            },
            //允许库存同步
            allowUpdate: function (sku) {
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要把库存进行同步?同步成功后,将会更新各大店铺的SKU库存',
                    btnName: '允许库存同步',
                    events: {
                        confirm: 'confirm-allowUpdate'
                    }
                });

                self.$off('confirm-allowUpdate');
                self.$once('confirm-allowUpdate',function () {
                    var skuGroup = self.getSkuGroup(sku);
                    var skuStockIDGrop = [];
                    if (skuGroup.length > 0) {
                        skuGroup.forEach(function (skuItem) {
                            skuStockIDGrop.push(skuItem.SkuStockID);
                        });
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/PlatFormAPI/UpdateStock',
                            contentType: 'application/json',
                            data: JSON.stringify(skuStockIDGrop)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '成功允许库存同步'
                                });
                            }
                        })
                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getSkuStocks();
                } else {
                    this.paginationOptions.cur = 1;
                }
            }
        },
        events: {
            'page-change': function () {
                this.getSkuStocks();
            }
        },
        route: {
            data: function (transition) {
                this.getSkuStocks();
                transition.next();
            }
        },
        computed: commonMethods.selectAll('this.skuStocks', function (item) {
            return item
        }),
        ready: function () {

        },
        components: {
            pagination: require('../../components/pagination.vue'),
            modalUpdateStock: require('./modal-update-stock.vue')
        }
    }
</script>





<style rel="stylesheet/less" lang="less">

</style>