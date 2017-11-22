<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a v-link="{name:'purchase-instock-add'}" class="btn btn-default">新增</a>
                <!--<a href="javascript:void(0)" class="btn btn-default">批量导入</a>-->
                <a @click="checkInStock({})" href="javascript:void(0)" class="btn btn-default">仓库审核</a>
                <a @click="cancelInStock('')" href="javascript:void(0)" class="btn btn-default">取消订单</a>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive table-responsivebd">
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <th>状态</th>
                    <th>订单编码</th>
                    <th>通知单</th>
                    <th>供应商</th>
                    <th>收货仓库</th>
                    <th>入库SKU</th>
                    <th>入库名细</th>
                    <th>实际入库时间</th>
                    <th>审核时间</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-for="inStock in inStocks" class="panel panel-default">
                <tr class="sheet-list-item">
                    <td class="sheet-item-state"><input type="checkbox" v-model="inStock.checked"></td>
                    <td><span>{{inStock.Flag | flagCodeToText baseLookUp.inStockFlag}}</span></td>
                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{inStock.InStockID}}"><span class="iconfont"></span><span>{{inStock.Sheet}}</span></td>
                    <td>{{inStock.UpSheet}}</td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{inStock.OutID | venderIDToName baseLookUp.venderList}}">{{inStock.OutID | venderIDToName baseLookUp.venderList}}</span></td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{inStock.StockName}}">{{inStock.StockName | truncationString}}</span></td>
                    <td>{{inStock.BarCodeNum}}</td>
                    <td>{{inStock.Qty}}</td>
                    <td><span v-if="inStock.EditTime" data-toggle="tooltip" data-placement="top" title="{{inStock.EditTime | truncationTimeString}}">{{inStock.EditTime | formatDateFormShow}}</span></td>
                    <td><span v-if="inStock.CheckTime" data-toggle="tooltip" data-placement="top" title="{{inStock.CheckTime | truncationTimeString}}">{{inStock.CheckTime | formatDateFormShow}}</span></td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{inStock.Note}}">{{inStock.Note  | truncationString}}</span></td>
                    <td>
                        <a @click="checkInStock({inStockItems:inStock.InStock_Item_Views,inStockID:inStock.InStockID})" v-if="inStock.Flag == 0" href="javascript:void(0)" class=""  data-toggle="tooltip" data-placement="top" title="审核"><span class="iconfont icon-verify"></span></a>
                        <a v-if="inStock.Flag == 0 || inStock.Flag == 10" v-link="{name:'purchase-instock-edit',query:{inStockID:inStock.InStockID}}" href="javascript:void(0)" class="sheet-list-edit"  data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                    </td>
                </tr>
                <tr class="sheet-list-detail">
                    <td colspan="12">
                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{inStock.InStockID}}">
                            <div class="sheet-detail-wrap">
                                <table class="table table-condensed">
                                    <thead>
                                    <tr>
                                        <th v-if="inStock.Flag == 0 || inStock.Flag == 10">操作</th>
                                        <th>SKU</th>
                                        <th>商品名称</th>
                                        <th>尺码</th>
                                        <th>颜色</th>
                                        <th>建议售价</th>
                                        <!--<th>基本价格</th>-->
                                        <th>入库数量</th>
                                        <th>通知数量</th>
                                        <th>供货价格</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="goodInfo in inStock.InStock_Item_Views">
                                        <td v-if="inStock.Flag == 0 || inStock.Flag == 10">
                                            <a @click="goodInfo.isSaved = false" v-if="goodInfo.isSaved" href="javascript:void(0)" class="btn-change">修改</a>
                                            <a @click="saveInStockItemByGroup({inStockItemDetail:goodInfo})" v-if="!goodInfo.isSaved" href="javascript:void(0)" class="btn-delete">保存</a>
                                            <a @click="cancelInStockItemByGroup(goodInfo)" v-if="!goodInfo.isSaved" href="javascript:void(0)">取消</a>
                                        </td>
                                        <td>{{goodInfo.CustomBC}}</td>
                                        <td>{{goodInfo.Name}}</td>
                                        <td>{{goodInfo.SizeName}}</td>
                                        <td>{{goodInfo.ColorName}}</td>
                                        <td>{{goodInfo.MarketPrice}}</td>
                                        <!--<td>{{goodInfo.BasePrice}}</td>-->
                                        <td>
                                            <span v-if="goodInfo.isSaved">{{goodInfo.Qty}}</span>
                                            <input v-if="!goodInfo.isSaved" v-model="goodInfo._Qty" type="text" class="form-control">
                                        </td>
                                        <td>
                                            <span v-if="goodInfo.isSaved">{{goodInfo.NotifyQty}}</span>
                                            <input type="text" v-if="!goodInfo.isSaved" v-model="goodInfo._NotifyQty" class="form-control">
                                        </td>
                                        <td>
                                            <span v-if="goodInfo.isSaved">{{goodInfo.Price}}</span>
                                            <input v-if="!goodInfo.isSaved" v-model="goodInfo._Price" type="text" class="form-control">
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tbody class="list-detail-operation" v-if="inStock.Flag == 0 || inStock.Flag == 10">
                                    <tr>
                                        <td colspan="10" class="detail-btn-group">
                                            <a @click="checkInStock({inStockItems:inStock.InStock_Item_Views,inStockID:inStock.InStockID})" href="javascript:void(0)" class="btn btn-default">仓库审核</a>
                                            <a @click="cancelInStock(inStock.InStockID)" href="javascript:void(0)" class="btn btn-default">取消订单</a>
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
            <div v-if="inStocks.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
            <pagination :pagination-options = "paginationOptions"></pagination>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        props: ['baseLookUp','paginationOptions','inStocks'],
        methods: {
            inStockGroupSelected: function () {
                var  inStockGroup = this.checkedGroups;
                if (inStockGroup.length === 0) {
                    var modalMessage = {
                        name: '提示:',
                        contentText: '请至少选中一个入库单'
                    };
                    this.$dispatch('transmit','tip',modalMessage);
                    return [];
                } else {
                    return inStockGroup;
                }
            },
            saveInStockItemAjax: function (data,inStockItemDetailWaitSaved,callback) {
                var self = this;
                if (callback && data.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '你尚有入库单没有保存,确定要先保存入库单吗?',
                        btnName: '保存',
                        events: {
                            confirm: 'checkInStockItemSave'
                        }
                    })
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要保存吗?',
                        btnName: '保存',
                        events: {
                            confirm: 'checkInStockItemSave'
                        }
                    })
                }
                self.$off('checkInStockItemSave');

                self.$once('checkInStockItemSave',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusInStock/ErpSaveInStockItem',
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            if (callback) {
                                callback;
                            } else {
                                var modalMessage = {
                                    name: '成功:',
                                    contentText: '保存成功'
                                };
                                self.$dispatch('transmit','tip',modalMessage);
                                inStockItemDetailWaitSaved.forEach(function (inStockItemDetail) {
                                    inStockItemDetail.isSaved = true;
                                    inStockItemDetail.Price = inStockItemDetail._Price;
                                    inStockItemDetail.Qty = inStockItemDetail._Qty;
                                    inStockItemDetail.NotifyQty = inStockItemDetail._NotifyQty;
                                })
                            }
                        }
                    })
                });
            },
            //取消修改
            cancelInStockItemByGroup: function (goodInfo) {
                goodInfo.isSaved = true;
                goodInfo._Price = goodInfo.Price;
                goodInfo._Qty = goodInfo.Qty;
                goodInfo._NotifyQty = goodInfo.NotifyQty
            },
            //批量明细修改
            saveInStockItemByGroup: function (options,callback) {
                var saveInStockItemList = [];
                var inStockItemDetail = options.inStockItemDetail || '';   //入库单单条明细
                var inStockItems = options.inStockItems || '';    //单条入库单明细组
                var inStockID = options.inStockID || '';   //入库单ID
                var inStockItemDetailWaitSaved = [];   //等待保存的明细
                var inStockIDGroup =  []; //入库单ID


                if (inStockID) {
                    inStockIDGroup.push(inStockID);
                }

                if (inStockItemDetail) {    //如果是单条入库单明细
                    if (!inStockItemDetail.isSaved) {
                        getSaveInStockItemList(inStockItemDetail);
                    }
                } else if (inStockItems) {    //如果是单条入库单,则检查该入库单下的明细是否已经保存,如果没有保存,则保存
                    inStockItems.forEach(function (inStockItem) {
                        if (!inStockItem.isSaved) {
                            getSaveInStockItemList(inStockItem);
                        }
                    })
                } else {    //否则,将选中的入库单下明细全部保存
                    var checkedGroups = this.inStockGroupSelected();
                    if (checkedGroups.length > 0) {
                        checkedGroups.forEach(function (inStocks) {
                            inStockIDGroup.push(inStocks.InStockID);
                            var inStockItems = inStocks.InStock_Item_Views;
                            inStockItems.forEach(function (detail) {
                                if (!detail.isSaved) {
                                    getSaveInStockItemList(detail);
                                }
                            })
                        });
                    } else {
                        return ;
                    }
                }

                //如果有待保存列表,则保存
                if (saveInStockItemList.length > 0) {
                    if (callback) {
                        this.saveInStockItemAjax(saveInStockItemList,inStockItemDetailWaitSaved,callback(inStockIDGroup));
                    } else {
                        this.saveInStockItemAjax(saveInStockItemList,inStockItemDetailWaitSaved);
                    }
                } else {
                    callback(inStockIDGroup);
                }
                //保存明细


                function getSaveInStockItemList(inStockItemDetail) {
                    inStockItemDetailWaitSaved.push(inStockItemDetail);
                    saveInStockItemList.push({
                        Qty: inStockItemDetail._Qty || inStockItemDetail.Qty,
                        Price: inStockItemDetail._Price || inStockItemDetail.Price,
                        InStockItemID: inStockItemDetail.InStockItemID,
                        NotifyQty: inStockItemDetail._NotifyQty || inStockItemDetail.NotifyQty
                    });
                }
            },
            //批量审核
            checkInStock: function (options) {
                var self = this;
                this.saveInStockItemByGroup(options,function (inStockIDGroup) {
                    if (inStockIDGroup.length > 0) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定要审核通过这些入库单吗?',
                            btnName: '审核通过',
                            events: {
                                confirm: 'checkInStock'
                            }
                        });
                        self.$off('checkInStock');

                        self.$once('checkInStock',function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusInStock/ErpCheckInStock',
                                contentType: 'application/json',
                                data: JSON.stringify(inStockIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功:',
                                        contentText: '审核通过'
                                    });
                                    self.$dispatch('transmit','page-change')
                                }
                            })
                        });
                    }
                });

            },
            //取消订单
            cancelInStock: function (inStockID) {
                var self = this;
                var inStockIDGroup = [];
                if (inStockID) {
                    inStockIDGroup.push(inStockID);
                } else {
                    var inStockGroupSelected =  this.inStockGroupSelected();
                    if (inStockGroupSelected.length > 0) {
                        inStockGroupSelected.forEach(function (item) {
                            inStockIDGroup.push(item.InStockID);
                        })
                    }
                }
                if (inStockIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消这些入库单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'cancelInStock'
                        }
                    });
                    self.$off('cancelInStock');

                    self.$once('cancelInStock',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusInStock/ErpSave_Cancel',
                            contentType: 'application/json',
                            data: JSON.stringify(inStockIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','page-change');
                                self.$dispatch('transmit','tip',{
                                    name: '成功:',
                                    contentText: '成功取消订单'
                                })
                            }
                        })
                    });
                }
            }
        },
        computed: commonMethods.selectAll('this.inStocks', function (item) {
            return item;
        }),
        components: {
            pagination: require('../../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>