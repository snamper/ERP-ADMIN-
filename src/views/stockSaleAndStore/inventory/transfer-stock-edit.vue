<template>
<div class="query-header" style="border-bottom:none;"><h3>{{pageInfo.text}}</h3></div>

    <div class="container-fluid">

        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p></p>
                </div>
                <div class="operate-form-list">
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">计划单</label>-->
                        <!--<select v-model="busTransfer.OutSheetID" class="form-control">-->
                            <!--<option value="2">d</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">移入仓库<span class="form-required-mark">*</span></label>
                        <select v-model="busTransfer.InStockID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">移出仓库<span class="form-required-mark">*</span></label>
                        <select v-model="busTransfer.OutStockID" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="busTransfer.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-group_table"  style="margin:15px 0;">
                        <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                        <div class="form-group-list" >
                            <div class="sheet-list-table table-responsive sheet-list-tablebd" style="border-left:1px solid #e5e5e5;margin-left:24px;">
                                <table class="table table-condensed">
                                    <thead class="sheet-list-header">
                                    <tr>
                                        <th class="new-newlybtn" style="    width: 53px;
    padding-left: 19px;"><a href="javascript:void(0)" @click="addMerchant" class="btn btn-default new-newly new-newly-inv" style="line-height:17px;">+ &nbsp;新增</a></th>
                                        <th>商品</th>
                                        <th>SKU</th>
                                        <th>商品名称</th>
                                        <th>尺码</th>
                                        <th>颜色</th>
                                        <th>建议售价</th>
                                        <th>数量</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="sheet-list-item" v-for="merchant in busTransfer.TransferItems">
                                        <td>
                                            <a @click="editMerchant(merchant)" href="javascript:void(0)" v-if="merchant.isSaved">修改</a>
                                            <a @click="deleteMerchant(merchant)" href="javascript:void(0)">删除</a>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.CustomNo}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.CustomNo">
                                                <a @click="choiceCustomNo(merchant.CustomNo,merchant,busTransfer.OutStockID)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.CustomBC}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.CustomBC">
                                                <a @click="choiceCustomBC(merchant.CustomBC,merchant,busTransfer.OutStockID)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Name}}">{{merchant.Name  | truncationString }} </span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.SizeName}}">{{merchant.SizeName  | truncationString }} </span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.ColorName}}">{{merchant.ColorName  | truncationString }} </span></td>
                                        <td><span v-if="merchant.MarketPrice">￥</span>{{merchant.MarketPrice}}</td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.Qty > 0 ? '移入' + merchant.Qty : '移出' + Math.abs(merchant.Qty)}}</span>
                                            <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.Qty" @change="changeQty(merchant)">
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="detailUpload" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveInvTransfer">保存</a>
                        <a v-link="{name:'transfer-stock'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-size-color></modal-size-color>
    <detail-upload></detail-upload>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    text: '',
                    isEdit: false
                },
                busTransfer: {
                    TransferID: '',
//                    OutSheetID: '',
                    InStockID: '',
                    OutStockID: '',
                    Note: '',
                    TransferItems: [
//                        {
//                            BarcodeID: '',
//                            Qty: 3,
//                            FactQty: 3
//                        }
                    ]
                },
                baseLookUp: {
                    stockList: []
                }
            }
        },
        methods: {
            saveInvTransfer: function () {
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
                        url: '/BusTransfer/ErpSaveTransfer',
                        data: self.busTransfer
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            var saveNoticeText = '保存';
                            if (self.busTransfer.TransferID) {
                                saveNoticeText = '修改';
                            }
                            self.$dispatch('transmit','tip',{
                                name: '成功:',
                                contentText: saveNoticeText + '商品调仓单成功'
                            });
                            self.resetForm();
                        }
                    });
                });
            },
            //清空表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.busTransfer = {
                        TransferID: '',
                        InStockID: '',
                        OutStockID: '',
                        Note: '',
                        TransferItems: []
                    };
                }
            },
            changeQty: function (merchant) {
                merchant.FactQty = merchant.Qty;
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockList = val;
                });
            },
            getInvTransfer: function () {
                var self = this;
                var busTransfer = self.busTransfer;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusTransfer/ErpQueryTransfer',
                    data: {
                        PageSize: 1,
                        PageNumber: 1,
                        SearchWhere: {
                            TransferID: self.busTransfer.TransferID
                        }
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var transferData = result.Data.PageData[0];
                        transferData.Transfer_Item_Views.forEach(function (transferItem) {
                            transferItem.isSaved = true;
                        });
                        busTransfer.InStockID = transferData.InStockID;
                        busTransfer.OutStockID = transferData.OutStockID;
                        busTransfer.Note = transferData.Note;
                        busTransfer.TransferItems = transferData.Transfer_Item_Views;
                    }
                })
            },
            choiceCustomNo: function (CustomNo,merchant,OutStockID) {
                var queryData = {
                    customNo: CustomNo,
//                    customBC: '',
                    merchant: merchant
                };
                this.$broadcast('choice-customNo',queryData,OutStockID);
            },
            choiceCustomBC: function (customBC,merchant,OutStockID) {
                var self = this;
//                if (CustomNo) {
                    var queryData = {
//                        customNo: CustomNo,
                        customBC: customBC,
                        merchant: merchant
                    };

                    this.$broadcast('choice-sku',queryData,OutStockID);
//                } else {
//                    self.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请先选择商品编码'
//                    });
//                }
            },
            editMerchant: function (merchant) {
                merchant.isSaved = false;
            },
            addMerchant: function () {
                if (this.busTransfer.OutStockID) {
                    var newMerchant = {
                        isSaved: false,   //是否已经保存
                        isNewMerchant: true,   //是否为未保存的新增
                        isNotSelected: true,    //是否未选择颜色尺码表
                        TransferItemID: '',
                        TransferID: this.busTransfer.TransferID,
                        BarcodeID: '',
                        CustomBC: '',
                        CustomNo: '',
                        Name: '',
                        ColorName: '',
                        SizeName: '',
                        MarketPrice: 0,
//                        BasePrice: 0,
                        Price: 0,
                        Qty: 0,
                        FactQty: 0
                    };
                    this.busTransfer.TransferItems.push(newMerchant);
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请先选择出库仓库再选商品'
                    });
                }
            },
            deleteMerchant: function (merchant) {
                var transferItems = this.busTransfer.TransferItems;
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
                        transferItems.$remove(merchant);
                        self.$dispatch('transmit','tip',{
                            name: '成功:',
                            contentText: '删除商品调仓单成功'
                        });
                    } else {
                        var transferItemsID = [];
                        transferItemsID.push(merchant.TransferItemID);
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusTransfer/ErpDelTransferItem',
                            contentType: 'application/json',
                            data: JSON.stringify(transferItemsID)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                transferItems.$remove(merchant);
                                self.$dispatch('transmit','tip',{
                                    name: '成功:',
                                    contentText: '删除商品调仓单成功'
                                });
                            }
                        })
                    }
                });
            },
            //批量新增明细
            detailUpload: function () {
                this.$dispatch('transmit', 'detailUploadModalShow',26);
            }
        },
        ready: function () {
            this.getBaseLookUp();
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                if (name == 'transfer-stock-edit') {
                    this.pageInfo.text = '修改商品调仓单';
                    this.pageInfo.isEdit = true;
                    var transferID = transition.to.query.transferID;
                    if (transferID) {
                        this.busTransfer.TransferID = transferID;
                        this.getInvTransfer();
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新增商品调仓单';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
            }
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant,index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.busTransfer.TransferItems.forEach(function (TransferItem) {
                        if (TransferItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
//                            originMerchant.BasePrice = merchant.BasePrice;
                            originMerchant.Price = merchant.Price;
                            originMerchant.MarketPrice = merchant.MarketPrice;
                            originMerchant.CustomNo = merchant.CustomNo;
                            originMerchant.Name = merchant.GoodsName;
                            originMerchant.SizeName = merchant.Size;
                            originMerchant.ColorName = merchant.Color;
                            originMerchant.CustomBC = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.busTransfer.TransferItems.push({
                                isSaved: false,
                                isNotSelected: false,
                                Qty: 0,
                                FactQty: 0,
                                InAdjustID: '',
//                                BasePrice: merchant.BasePrice,
                                Price: merchant.Price,
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
                    self.busTransfer.TransferItems.forEach(function (oldItem) {
                        if (oldItem.BarcodeID == newOrderItems.BarcodeID) {
                            newOrderItems.isSaved = false;
                            newOrderItems.isNotSelected = false;
                            newOrderItems.TransferItemID = oldItem.TransferItemID;
                            oldItem = newOrderItems;
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        newOrderItems.isSaved = false;
                        newOrderItems.isNotSelected = false;
                        self.busTransfer.TransferItems.push(newOrderItems);
                    }
                })
            }
        },
        components: {
            modalSizeColor: require('../../../components/modal-size-color.vue'),
            detailUpload: require('../../../components/detailUpload.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.new-newly-transfer{
    display:inline-block;
    width: 60px;
    height: 26px;
    line-height:26px;
    text-align:center;
    border-radius:3px;
    margin:0 5px;
}
.sheet-list-tablebd{
    border-right:1px solid #e5e5e5;
}

</style>