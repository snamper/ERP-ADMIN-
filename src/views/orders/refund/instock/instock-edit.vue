<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">店铺<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="busInStock.OutID">
                            <option value="">不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width stock-upsheet">
                        <label class="form-group-text">入库单</label>
                        <input v-model="busInStock.UpSheet" type="text" class="form-control" placeholder="" required @keyup="getSheetList" @focus="showUpSheetList" @blur="hideUpSheetList">
                        <div class="stock-upsheet-wrap" v-if="isShowUpSheetList">
                            <ul class="stock-upsheet-list">
                                <li class="stock-upsheet-item" @click="selectUpSheet(upSheet)" v-for="upSheet in  upSheetList">{{upSheet.Sheet}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">退货仓库<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="busInStock.StockID">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">入库时间<span class="form-required-mark">*</span></label>
                        <div class="date-wrap plan-timepicker">
                            <div class='input-group date' id='plan-timepicker'>
                                <input v-model="busInStock.PurDate | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">入库类型<span class="form-required-mark">*</span></label>-->
                        <!--<select class="form-control" v-model="busInStock.TransferType">-->
                            <!--<option value="" selected>不限</option>-->
                            <!--<option value="{{customerOrderType.Code}}" v-for="customerOrderType in baseLookUp.customerOrderType">{{customerOrderType.Text}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="busInStock.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                        <div class="form-group-list">
                            <div class="sheet-list-table table-responsive sheet-list-margin">
                                <table class="table table-condensed">
                                    <thead class="sheet-list-header">
                                        <tr>
                                            <th class="new-newly-instorck">
                                                <a href="javascript:void(0)" @click="addMerchant" class="btn btn-default new-newly " style="line-height:16px;">+ &nbsp;新增</a>
                                            </th>
                                            <th>商品</th>
                                            <th>SKU</th>
                                            <th>商品名称</th>
                                            <th>尺码</th>
                                            <th>颜色</th>
                                            <th>建议售价</th>
                                            <th>供货价格</th>
                                            <th>退货数量</th>
                                            <th>通知数量</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="sheet-list-item" v-for="merchant in busInStock.InStockItems">
                                            <td>
                                                <a @click="editMerchant(merchant)" href="javascript:void(0)" v-if="merchant.isSaved">修改</a>
                                                <a @click="deleteMerchant(merchant)" href="javascript:void(0)">删除</a>
                                                <a v-if="!merchant.isSaved" @click="cancelMerchant(merchant)" href="javascript:void(0)">取消</a>
                                            </td>
                                            <td>
                                                <span v-if="merchant.isSaved">{{merchant.CustomNo}}</span>
                                                <div class="form-inline" v-if="!merchant.isSaved">
                                                    <input type="text" class="form-control" v-model="merchant.CustomNo">
                                                    <a @click="choiceCustomNo(merchant.CustomNo,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                                </div>
                                            </td>
                                            <td>
                                                <span v-if="merchant.isSaved">{{merchant.CustomBC}}</span>
                                                <div class="form-inline" v-if="!merchant.isSaved">
                                                    <input type="text" class="form-control" v-model="merchant.CustomBC">
                                                    <a @click="choiceCustomBC(merchant.CustomBC,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                                </div>
                                            </td>
                                            <td>{{merchant.Name}}</td>
                                            <td>{{merchant.SizeName}}</td>
                                            <td>{{merchant.ColorName}}</td>
                                            <td><span v-if="merchant.MarketPrice">￥</span>{{merchant.MarketPrice}}</td>
                                            <td>
                                                <span v-if="merchant.Price && merchant.isSaved">￥{{merchant._Price}}</span>
                                                <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.Price">
                                            </td>
                                            <td>
                                                <span v-if="merchant.isSaved">{{merchant._Qty}}</span>
                                                <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.Qty">
                                            </td>
                                            <td>
                                                <span v-if="merchant.isSaved">{{merchant._NotifyQty}}</span>
                                                <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.NotifyQty">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="detailUpload" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveInStock">保存</a>
                        <a v-link="{name:'refund-instock'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-size-color></modal-size-color>
    <detail-upload></detail-upload>
</template>

<script>
    var commonMethods = require('../../../../js/common');
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    text: '',
                    isEdit: false
                },
                busInStock: {
                    InStockID: '',
                    Sheet: '',   //订单编码
                    UpSheet: '', //上游单据
                    OutID: '', //供应商
                    StockID: '', //收货仓库
                    TransferType: 12,   //入库类型
                    Note: '',
                    PurDate: '',
                    InStockItems: []
                },
                baseLookUp: {
                    stockList: [],
//                    venderList: [],
                    shopLists: [],
//                    customerOrderType: []
                },
                isShowUpSheetList: false,  //是否显示上游单据列表
                upSheetList: [],   //上游单据
            }
        },
        methods: {
            choiceCustomNo: function (CustomNo,merchant) {
                var queryData = {
                    customNo: CustomNo,
//                    customBC: '',
                    merchant: merchant
                };
                this.$broadcast('choice-customNo',queryData);
            },
            choiceCustomBC: function (customBC,merchant) {
//                if (CustomNo) {
                    var queryData = {
//                        customNo: CustomNo,
                        customBC: customBC,
                        merchant: merchant
                    };

                    this.$broadcast('choice-sku',queryData);
//                } else {
//                    self.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请先选择商品编码'
//                    });
//                }
            },
            addMerchant: function () {
                var newMerchant = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    InStockItemID: '',
                    InStockID: this.busInStock.InStockID,
                    BarcodeID: '',
                    CustomBC: '',
                    CustomNo: '',
                    Name: '',
                    ColorName: '',
                    SizeName: '',
                    MarketPrice: 0,
                    Price: 0,
                    _Price: 0,
                    NotifyQty: 0,
                    _NotifyQty: 0,
                    Qty: 0,
                    _Qty: 0
                };
                this.busInStock.InStockItems.push(newMerchant);
            },
            editMerchant: function (merchant) {
                merchant.isSaved = false;
            },
            cancelMerchant: function (merchant) {
                merchant.isSaved = true;
                if (merchant.isNewMerchant) {
                    var InStockItems = this.busInStock.InStockItems;
                    InStockItems.$remove(merchant);
                } else {
                    merchant.NotifyQty = merchant._NotifyQty;
                    merchant.Qty = merchant._Qty;
                }
            },
            deleteMerchant: function (merchant) {
                var InStockItems = this.busInStock.InStockItems;
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要删除该条明细?',
                    btnName: '删除',
                    events: {
                        confirm: 'deleteMerchant'
                    }
                });
                self.$off('deleteMerchant');

                self.$once('deleteMerchant',function () {
                    if (merchant.isNewMerchant) {
                        InStockItems.$remove(merchant);
                        self.$dispatch('transmit','tip',{
                            name: '成功:',
                            contentText: '删除订单成功'
                        });
                    } else {
                        var InStockItemID = [];
                        InStockItemID.push(merchant.InStockItemID);
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusInStock/ErpDelInStockItem',
                            contentType: 'application/json',
                            data: JSON.stringify(InStockItemID)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                InStockItems.$remove(merchant);
                                self.$dispatch('transmit','tip',{
                                    name: '成功:',
                                    contentText: '删除订单成功'
                                });
                            }
                        })
                    }
                });
            },
            getInStock: function () {
                var self = this;
                var busInStock = self.busInStock;
                servers.postAjax.bind(this)({
                    url: '/BusInStock/ErpQueryInStock',
                    data: {
                        PageSize: 1,
                        PageNumber: 1,
                        SearchWhere: {
                            InStockID: self.busInStock.InStockID
                        }
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        var inStock = result.Data.PageData[0];
                        if (inStock) {
                            inStock.InStock_Item_Views.forEach(function (InStockItem) {
                                InStockItem.isSaved = true;
                                InStockItem._NotifyQty = InStockItem.NotifyQty;
                                InStockItem._Qty = InStockItem.Qty;
                                InStockItem._Price = InStockItem.Price;

                            });
                            busInStock.Sheet = inStock.Sheet;
                            busInStock.UpSheet = inStock.UpSheet;
                            busInStock.OutID = inStock.OutID;
                            busInStock.StockID = inStock.StockID;
                            busInStock.TransferType = inStock.TransferType;
                            busInStock.Note = inStock.Note;
                            busInStock.InStockItems = inStock.InStock_Item_Views;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                })
            },
            saveInStock: function () {
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '保存',
                    events: {
                        confirm: 'saveMerchant'
                    }
                });
                self.$off('saveMerchant');

                self.$once('saveMerchant',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusInStock/ErpSaveInStock',
                        data: self.busInStock
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '成功:',
                                contentText: '保存订单成功'
                            });
                            self.resetForm();
                        }
                    })
                })
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockList = val;
                });
                //获取所有店铺
                servers.getBaseData('ShopList', false, function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取所有入库类型
//                servers.getBaseData('CustomerOrderType', true, function (val) {
//                    baseLookUp.customerOrderType = val;
//                });
            },
            //获取上游单据
            getSheetList: function () {
                var self = this;
                var UpSheet = self.busInStock.UpSheet;
                if (UpSheet) {
                    servers.postAjax({
                        url: '/BusCustomerOrder/GetBusRefundSheet',
                        data: {
                            Sheet: self.busInStock.UpSheet
                        }
                    }).done(function (result) {
                        self.upSheetList = [];
                        if (result.length > 0) {
                            self.upSheetList = result;
                        }
                    })
                }
            },
            //选择上游单据
            selectUpSheet: function (upSheet) {
                var upSheetItems = upSheet.BusRefundGoodInfo_View;
                upSheetItems.forEach(function (item) {
                    item.isSaved = false;
                    item.isNotSelected = false;
                    item.isNewMerchant = true;
                    item._NotifyQty = item.Qty;
                    item.NotifyQty = item.Qty;
                    item.Qty = item.Qty;
                    item._Qty = item.Qty;
                    item._Price = item.Price;
                });
                this.busInStock = {
                    Sheet: '',   //订单编码
                    UpSheet: upSheet.Sheet, //上游单据
                    OutID: upSheet.ShopID, //供应商
                    StockID: upSheet.StockID, //收货仓库
                    TransferType: this.busInStock.TransferType,   //入库类型
                    Note: upSheet.Note,
                    InStockItems: upSheetItems
                };
            },
            //显示上游单据
            showUpSheetList: function () {
                this.isShowUpSheetList = true;
            },
            hideUpSheetList: function () {
                var self = this;
                setTimeout(function () {
                    self.isShowUpSheetList = false;
                },100);
            },
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.busInStock = {
                        InStockID: '',
                        Sheet: '',   //订单编码
                        UpSheet: '', //上游单据
                        OutID: '', //供应商
                        StockID: '', //收货仓库
                        TransferType: this.busInStock.TransferType,   //入库类型
                        Note: '',
                        InStockItems: []
                    };
                }
            },
            //批量新增明细
            detailUpload: function () {
                this.$dispatch('transmit', 'detailUploadModalShow',24);
            }
        },
        ready: function () {
            this.getBaseLookUp();
            require('../../../../css/bootstrap-datetimepicker.css');
            require('../../../../js/plugins/bootstrap-datetimepicker');
            $('#plan-timepicker').datetimepicker({
//                locale: 'zh-cn'
            });
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant,index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.busInStock.InStockItems.forEach(function (InStockItem) {
                        if (InStockItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
                            originMerchant.Price = merchant.Price;
                            originMerchant._Price = merchant.Price;
                            originMerchant.MarketPrice = merchant.MarketPrice;
                            originMerchant.CustomNo = merchant.CustomNo;
                            originMerchant.Name = merchant.GoodsName;
                            originMerchant.SizeName = merchant.Size;
                            originMerchant.ColorName = merchant.Color;
                            originMerchant.CustomBC = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.busInStock.InStockItems.push({
                                isSaved: false,
                                isNotSelected: false,
                                NotifyQty: 0,
                                _NotifyQty: 0,
                                Qty: 0,
                                _Qty: 0,
                                InStockItemID: '',
                                Price: merchant.Price,
                                _Price: merchant.Price,
                                MarketPrice: merchant.MarketPrice,
                                BarcodeID: merchant.BarcodeID,
                                isNewMerchant: true,
                                Name: merchant.GoodsName,
                                SizeName: merchant.Size,
                                ColorName: merchant.Color,
                                CustomNo: merchant.CustomNo,
                                CustomBC: merchant.Sku
                            })
                        }

                    }
                });
            },
            'detailUploadSuccess': function (response) {
                var self = this;
                response.forEach(function (newOrderItems) {
                    var isExist = false;
                    self.busInStock.InStockItems.forEach(function (oldItem) {
                        if (oldItem.BarcodeID == newOrderItems.BarcodeID) {
                            newOrderItems.isSaved = false;
                            newOrderItems.isNotSelected = false;
                            newOrderItems.InStockItemID = oldItem.InStockItemID;
                            newOrderItems._Qty = newOrderItems.Qty;
                            newOrderItems._Price = newOrderItems.Price;
                            newOrderItems._NotifyQty = newOrderItems.NotifyQty;
                            oldItem = newOrderItems;
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        newOrderItems.isSaved = false;
                        newOrderItems.isNotSelected = false;
                        newOrderItems._Qty = newOrderItems.Qty;
                        newOrderItems._Price = newOrderItems.Price;
                        newOrderItems._NotifyQty = newOrderItems.NotifyQty;
                        self.busInStock.InStockItems.push(newOrderItems);
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                if (name == 'refund-instock-edit') {
                    this.pageInfo.text = '修改退货入库单';
                    this.pageInfo.isEdit = true;
                    var inStockID = transition.to.query.inStockID;
                    if (inStockID) {
                        this.busInStock.InStockID = inStockID;
                        this.getInStock();
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新增退货入库单';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
            }
        },
        components: {
            modalSizeColor: require('../../../../components/modal-size-color.vue'),
            detailUpload: require('../../../../components/detailUpload.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .new-newly-instorck{
        width: 100px;
        .new-newly{
            margin-left:5px;
        }

    }
    .operate-form-list{
        .form-controlbg{
            background: #fff;
        }
    }
    .stock-upsheet {
        position: relative;
    }
    .stock-upsheet-wrap {
        position: absolute;
        width: 100%;
        left: 0;
        top: 24px;
        flex: 1;
        padding-left: 144px;
        ul.stock-upsheet-list {
            padding: 5px;
            border: 1px solid #ccc;
            background: #fff;
            max-height: 200px;
            overflow-y: scroll;
        }
        .stock-upsheet-item {
            white-space: nowrap;
            overflow: hidden;
            line-height: 24px;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover {
                background: #ccc;
            }
        }
    }
</style>
