<template>
    <table class="table">
        <thead class="sheet-list-header">
            <tr>
                <th v-if="isShowOperateButtons">
                    <a href="javascript:void(0)" class="btn btn-default new-newly new-newly-lh" @click="addMerchant">新增</a>
                    <a v-if="type == 'typeOrder'" href="javascript:void(0)" class="btn btn-default new-newly new-newly-lh new-newly-width" @click="detailUpload">导入订单明细</a>
                </th>
                <th>商品</th>
                <th>SKU</th>
                <th>商品名称</th>
                <th>尺码</th>
                <th>颜色</th>
                <th>建议售价</th>
                <th>数量</th>
                <th>可用库存</th>
                <th>渠道售价</th>
                <th>实际售价</th>
                <th>备注</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="merchant in orderItems">
                <td v-if="isShowOperateButtons">
                    <a href="javascript:void(0)" class="btn-change" v-if="merchant.isSaved && (type != 'typeOrder')" @click="merchant.isSaved = false">修改</a>
                    <a href="javascript:void(0)" class="btn-delete" v-if="merchant.isSaved" @click="deleteMerchant(merchant)">删除</a>
                    <a href="javascript:void(0)" class="btn-change" v-if="!merchant.isSaved && type != 'typeOrder'" @click="saveChange(merchant)">保存</a>
                    <a href="javascript:void(0)" class="btn-delete" v-if="!merchant.isSaved" @click="cancelChange(merchant)">取消</a>
                </td>
                <td>
                    <span v-if="merchant.isSaved">{{merchant.Barcode.Goods.CustomNo}}</span>
                    <div class="form-inline form-inlinecenter" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant.Barcode.Goods.CustomNo">
                        <a href="javascript:void(0)" class="btn btn-default" @click="choiceCustomNo(merchant.Barcode.Goods.CustomNo,merchant)">选择</a>
                    </div>
                </td>
                <td>
                    <span v-if="merchant.isSaved">{{merchant.Barcode.CustomBC}}</span>
                    <div class="form-inline form-inlinecenter" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant.Barcode.CustomBC">
                        <a href="javascript:void(0)" class="btn btn-default" @click="choiceCustomBC(merchant.Barcode.CustomBC,merchant)">选择</a>
                    </div>
                </td>
                <td>{{merchant.Barcode.Goods.Name}}</td>
                <td>{{merchant.Barcode.Size.Name}}</td>
                <td>{{merchant.Barcode.Color.Name}}</td>
                <td><span v-if="merchant.Barcode.Goods.BasePrice">￥</span>{{merchant.Barcode.Goods.BasePrice ? merchant.Barcode.Goods.BasePrice : ''}}</td>
                <td>
                    <span v-if="merchant.isSaved">{{merchant.Qty}}</span>
                    <div class="form-inline" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant._Qty" value="{{merchant.Qty}}">
                    </div>
                </td>
                <td>{{merchant.InventoryQty}}</td>
                <td>
                    <span v-if="merchant.OrderItemDetail.SalePrice">￥{{merchant.OrderItemDetail.SalePrice}}</span>
                    <!--<div class="form-inline" v-if="!merchant.isSaved">-->
                        <!--<input type="text" class="form-control" v-model="merchant.OrderItemDetail._SalePrice" value="{{merchant.OrderItemDetail.SalePrice}}">-->
                    <!--</div>-->
                </td>
                <td>
                    <span v-if="merchant.isSaved && merchant.Price">￥{{merchant.Price}}</span>
                    <div class="form-inline" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant._Price" value="{{merchant.Price}}">
                    </div>
                </td>
                <td>
                    <div class="form-inline" v-if="!merchant.isSaved"> 
                        <input type="text" class="form-control" v-model="merchant.OrderItemDetail.Note" value="{{merchant.OrderItemDetail.Note}}">
                    </div>
                    <span v-else>{{merchant.OrderItemDetail.Note}}</span>
                </td>
            </tr>
        </tbody>
    </table>
    <modal-size-color></modal-size-color>
    <detail-upload></detail-upload>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['orderItems','orderId','type','isOrderDone','shopId'],
        data: function () {
            return {
                isShowOperateButtons: true
            }
        },
        methods: {
            choiceCustomNo: function (CustomNo,merchant) {
                var queryData = {
                    customNo: CustomNo,
                    shopID: this.shopId,
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
                        shopID: this.shopId,
                        merchant: merchant
                    };

                    this.$broadcast('choice-sku',queryData);
//                } else {
//                    this.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请先选择商品编码'
//                    });
//                }
            },
            //取消保存
            cancelChange: function (merchant) {
                this.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要取消吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'cancelChange'
                    }
                });
                this.$off('cancelChange');

                this.$once('cancelChange',function () {
                    if ( merchant.isNewMerchant ) {
                        this.orderItems.$remove(merchant);
                    } else {
                        merchant.isSaved = true;
                        merchant._Qty = merchant.Qty;
//                    merchant.OrderItemDetail._SalePrice = merchant.OrderItemDetail.SalePrice;
                        merchant._Price = merchant.Price;

                    }
                })
            },
            //保存更改
            saveChange: function (merchant) {
                var CustomerOrderID = this.checkCustomerOrderID();
                var self = this;
                var saveCustomerOrderItemLists = [];
//                this.$dispatch('transmit','tip',{
//                    name: '提示:',
//                    contentText: '确定要保存吗?',
//                    btnName: '确定',
//                    events: {
//                        confirm: 'saveChange'
//                    }
//                });
//                this.$once('saveChange',function () {
                    if (!merchant.isNotSelected) {
                        saveCustomerOrderItemLists.push({
                            CustomerOrderItemID: merchant.CustomerOrderItemID,
                            CustomerOrderID: CustomerOrderID,
                            Qty: merchant._Qty,
                            BarcodeID: merchant.BarcodeID,
                            OrderItemDetail:{
                                SalePrice: merchant.OrderItemDetail.SalePrice,
                                Note:merchant.OrderItemDetail.Note,
                            },   
                            Price: merchant._Price,
                            
                        });
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpSaveCustomerOrderItem',
                            contentType: 'application/json',
                            data: JSON.stringify(saveCustomerOrderItemLists)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
//                                self.$dispatch('transmit','tip',{
//                                    name: '提示',
//                                    contentText: '保存成功'
//                                });
                                merchant.CustomerOrderItemID = result.Data[0].CustomerOrderItemID;
                                merchant.isNewMerchant = false;    //将新增状态设为false
                                merchant.isSaved = true;
                                merchant.Qty = merchant._Qty;
//                            merchant.OrderItemDetail.SalePrice = merchant.OrderItemDetail._SalePrice;
                                merchant.Price = merchant._Price
                            }
                        });
                    }
//                })
            },
            //删除明细
            deleteMerchant: function (merchant) {
                var self = this;
                var deleteCustomerItemLists = [];
                this.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要删除吗?',
                    btnName: '确定',
                    events: {
                        confirm: 'deleteMerchant'
                    }
                });
                self.$off('deleteMerchant');

                self.$once('deleteMerchant',function () {
                    if ( merchant.isNewMerchant ) {    //如果是新添加的明细,则直接删除
                        this.orderItems.$remove(merchant);
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '删除成功'
                        });
                    } else {
                        deleteCustomerItemLists.push(merchant.CustomerOrderItemID);
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpDeleteCustomerOrderItem',
                            contentType: 'application/json',
                            data: JSON.stringify(deleteCustomerItemLists)

                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.orderItems.$remove(merchant);
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '删除成功'
                                });
                            }
                        })
                    }
                });
            },
            checkCustomerOrderID: function () {
                var customerOrderID = '';
                if (this.orderItems && this.orderItems.length > 0) {
                    customerOrderID = this.orderItems[0].CustomerOrderID
                } else {
                    customerOrderID = ''
                }
                return this.orderId || customerOrderID
            },
            //新增
            addMerchant: function () {
                var CustomerOrderID = this.checkCustomerOrderID();
                var newMerchant = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    Qty: 0,
                    _Qty: 0,
                    InventoryQty: 0,
                    Price: 0,
                    _Price: 0,
                    BarcodeID: '',
                    CustomerOrderItemID: '',
                    CustomerOrderID: CustomerOrderID,
                    OrderItemDetail: {
                        SalePrice: 0
                    },
                    Barcode: {
                        Goods: {
                            CustomNo: '',
                            Name: '',
                            BasePrice: 0,
                            GoodsDetail: {
                                MarketPrice: 0
                            }
                        },
                        Size: {
                            Name: ''
                        },
                        Color: {
                            Name: ''
                        },
                        CustomBC: ''
                    }
                };
                this.orderItems.push(newMerchant);
            },
            //批量新增明细
            detailUpload: function () {
                this.$dispatch('transmit', 'detailUploadModalShow',20);
            }
        },
//        watch: {
//            'isOrderDone': function (val) {
//                console.log(val);
//                if (typeof(val) == 'boolean') {
//                    this.isShowOperateButtons = !val;
//                }
//            }
//        },
        computed: {
            'isShowOperateButtons': {
                get: function (val) {
                    if (typeof(this.isOrderDone) == 'boolean') {
                        return !this.isOrderDone;
                    } else {
                        return true;
                    }
                }
            }
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var CustomerOrderID = this.checkCustomerOrderID();
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant,index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.orderItems.forEach(function (orderItem) {
                        if (orderItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
                            originMerchant.Price = merchant.CustomerPrice;
                            originMerchant._Price = merchant.CustomerPrice;
                            originMerchant.OrderItemDetail.SalePrice = merchant.SalePrice;
                            originMerchant.Barcode.Goods.CustomNo = merchant.CustomNo;
                            originMerchant.Barcode.Goods.Name = merchant.GoodsName;
                            originMerchant.Barcode.Goods.BasePrice = merchant.BasePrice;
//                            originMerchant.Barcode.Goods.GoodsDetail.MarketPrice = merchant.MarketPrice;
                            originMerchant.Barcode.Size.Name = merchant.Size;
                            originMerchant.Barcode.Color.Name = merchant.Color;
                            originMerchant.Barcode.CustomBC = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            originMerchant.InventoryQty = merchant.UseQty || 0;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.orderItems.push({
                                isSaved: false,
                                isNotSelected: false,
                                Qty: 0,
                                _Qty: 0,
                                InventoryQty: merchant.UseQty || 0,
                                CustomerOrderItemID: '',
                                CustomerOrderID: CustomerOrderID,
                                Price: merchant.CustomerPrice,
                                _Price: merchant.CustomerPrice,
                                BarcodeID: merchant.BarcodeID,
                                isNewMerchant: true,
                                OrderItemDetail: {
                                    SalePrice: merchant.SalePrice
                                },
                                Barcode: {
                                    Goods: {
                                        CustomNo: merchant.CustomNo,
                                        Name: merchant.GoodsName,
                                        BasePrice: merchant.BasePrice,
                                        GoodsDetail: {
                                            Base: 0
                                        }
                                    },
                                    Size: {
                                        Name: merchant.Size
                                    },
                                    Color: {
                                        Name: merchant.Color
                                    },
                                    CustomBC: merchant.Sku
                                }
                            })
                        }

                    }
                });
            },
            'detailUploadSuccess': function (response) {
                var self = this;
                response.forEach(function (newOrderItems) {
                    var isExist = false;
                    self.orderItems.forEach(function (oldItem) {
                        if (oldItem.BarcodeID == newOrderItems.BarcodeID) {
                            newOrderItems.isSaved = false;
                            newOrderItems.isNotSelected = false;
                            newOrderItems.isNewMerchant = false;
                            newOrderItems._Qty = newOrderItems.Qty;
                            newOrderItems._Price = newOrderItems.Price;
                            oldItem = newOrderItems;
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        newOrderItems.isSaved = false;
                        newOrderItems.isNotSelected = false;
                        newOrderItems.isNewMerchant = true;
                        newOrderItems._Qty = newOrderItems.Qty;
                        newOrderItems._Price = newOrderItems.Price;
                        self.orderItems.push(newOrderItems);
                    }
                })
            }
        },
        components: {
            modalSizeColor: require('./../../../components/modal-size-color.vue'),
            detailUpload: require('../../../components/detailUpload.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.new-newly-lh{
    line-height:18px;
}
</style>