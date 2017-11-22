<template>
    <div class="container-fluid">
        <div class="unify-head">
            商品接口管理
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
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品货号</label>
                        <input v-model="query.ItemCode | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
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
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU数字ID</label>
                        <input v-model="query.SkuID | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >库存同步</label>
                        <select v-model="query.IsneedSyn" class="form-control">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.CustomBC | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >国标码</label>
                        <input v-model="query.BarCode | arrayToString" type="text" class="form-control"  placeholder="多个ID用；隔开">
                    </div>
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
                            <a @click="allowUpdate('')" href="javascript:void(0)" class="btn btn-default">允许库存同步</a>
                            <a @click="notAllowUpdate('')" href="javascript:void(0)" class="btn btn-default">取消库存同步</a>
                            <a @click="generateFile" href="javascript:void(0)" class="btn btn-default">商品档案生成</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>店铺</th>
                                    <th>商品编码</th>
                                    <th>商品数字ID</th>
                                    <th>商品标题</th>
                                    <th>状态</th>
                                    <th>价格</th>
                                    <th>库存同步</th>
                                </tr>
                            </thead>
                            <tbody v-for="spuStock in spuStocks" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input v-model="spuStock.checked" type="checkbox" style="margin-right:8px;"></td>
                                    <td>{{spuStock.ShopID | shopCodeToName baseLookUp.shopLists}}</td>
                                    <td class="show-detail-ctrl collapsed sheet-item-state" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{spuStock.SerialID}}"><span class="iconfont"></span><span>{{spuStock.ItemCode}}</span></td>
                                    <td>{{spuStock.ItemID}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{spuStock.Title}}">{{spuStock.Title  | truncationString }} </span></td>
                                    <td>{{spuStock.ApproveStatus | approveStatusToText }}</td>
                                    <td>{{spuStock.Price}}</td>
                                    <td>{{spuStock.IsneedSyn ? '&radic;': '&Chi;'}}</td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="12">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{spuStock.SerialID}}">
                                            <div class="sheet-detail-wrap">
                                                <merchant-detail :sku-stocks.sync="spuStock.SkuStock_Views" :serial-id="spuStock.SerialID"></merchant-detail>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="spuStocks.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-generate-file></modal-generate-file>
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
                    IsneedSyn: '',
                    Price: '',
                    Price_to: ''
                },
                spuStocks: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    totalRecords: 0,
                    pageSize: 15
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
                    IsneedSyn: '',
                    Price: '',
                    Price_to: ''
                }
            },
            getOrderIDGroup: function (orderId) {
                var orderIdGroup = [];
                if (orderId) {
                    orderIdGroup.push(orderId);
                } else {
                    orderIdGroup = this.checkedGroups;
                }
                if (orderIdGroup.length === 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return orderIdGroup;
                }
            },
            //获取所有商品列表
            getSpuStocks: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/PlatFormAPI/QuerySpuStock',
                    data: {
                        PageNumber: self.paginationOptions.cur,
                        PageSize: self.paginationOptions.pageSize,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var spuStocks = result.Data.PageData;
                        self.spuStocks = [];
                        if (spuStocks.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            spuStocks.forEach(function (item) {
                                item.checked = false;
                                item.SkuStock_Views.forEach(function (skuStock) {
                                    skuStock.checked = false;
                                })
                            });
                            self.spuStocks = spuStocks;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空!'
//                            });
                        }
                    }
                })
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getSpuStocks();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            //允许库存同步
            allowUpdate: function (orderId) {
                var self = this;

                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要允许库存同步?',
                    btnName: '允许库存同步',
                    events: {
                        confirm: 'confirm-allowUpdate'
                    }
                });

                self.$off('confirm-allowUpdate');
                self.$once('confirm-allowUpdate',function () {
                    var spuStockIDGroup = self.getOrderIDGroup(orderId);
                    if (spuStockIDGroup.length > 0) {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/PlatFormAPI/AllowUpdate',
                            contentType: 'application/json',
                            data: JSON.stringify(spuStockIDGroup)
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
            //不允许库存同步
            notAllowUpdate: function (orderId) {
                var self = this;

                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要不允许库存同步?',
                    btnName: '不允许库存同步',
                    events: {
                        confirm: 'confirm-notAllowUpdate'
                    }
                });
                self.$off('confirm-notAllowUpdate');
                self.$once('confirm-notAllowUpdate',function () {
                    var spuStockIDGroup = self.getOrderIDGroup(orderId);
                    if (spuStockIDGroup.length > 0) {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/PlatFormAPI/NotAllowUpdate',
                            contentType: 'application/json',
                            data: JSON.stringify(spuStockIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '成功',
                                    contentText: '不允许库存成功'
                                });
                            }
                        })
                    }
                });
            },
            //生成商品档案
            generateFile: function () {
                this.$broadcast('modal-generate-file',this.baseLookUp);
            }
        },
        route: {
          data: function (transition) {
              this.getSpuStocks();
              transition.next();
          }
        },
        events: {
            'page-change': function () {
                this.getSpuStocks();
            },
            //允许同步
            'allow-update': function (id) {
                this.allowUpdate(id);
            },
            'not-allow-update': function (id) {
                this.notAllowUpdate(id);
            }
        },
        computed: commonMethods.selectAll('this.spuStocks', function (item) {
            return item.SerialID
        }),
        ready: function () {

//            //显示详情页
//            $(document).on('show.bs.collapse','.sheet-list-collapse', function () {
//                var sheetListCollapseId = $(this).attr('id');
//                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');
//
//            });
//            $(document).on('hidden.bs.collapse','.sheet-list-collapse',function () {
//                var sheetListCollapseId = $(this).attr('id');
//                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
//            });

        },
        components: {
            pagination: require('../../components/pagination.vue'),
            merchantDetail: require('./merchant-detail.vue'),
            modalGenerateFile: require('./modal-generate-file.vue')
        }
    }
</script>





<style rel="stylesheet/less" lang="less">

</style>
