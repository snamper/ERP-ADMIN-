<template>
    <table class="table table-condensed">
        <thead>
            <tr>
                <th v-if="state.isEmpty">
                    <a href="javascript:void(0)" class="btn btn-default new-newly new-newly-lh" @click="addMerchant">新增</a>
                </th>
                <th>商品</th>
                <th>SKU</th>
                <th>商品名称</th>
                <th>尺码</th>
                <th>颜色</th>
                <th>退货类型</th>
                <th>是否需要退货</th>
                <th>是否已退货</th>
                <th>实际售价</th>
                <th>退货数量</th>
                <th>退货价格</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="refundDetail in refundDetails">
                <td v-if="state.isEmpty">
                    <a href="javascript:void(0)" class="btn-change" v-if="refundDetail.isSaved" @click="refundDetail.isSaved = false">修改</a>
                    <a href="javascript:void(0)" class="btn-delete" v-if="refundDetail.isSaved" @click="deleteMerchant(refundDetail)">删除</a>
                    <a href="javascript:void(0)" class="btn-change" v-if="!refundDetail.isSaved" @click="saveChange(refundDetail)">保存</a>
                    <a href="javascript:void(0)" class="btn-delete" v-if="!refundDetail.isSaved" @click="cancelChange(refundDetail)">取消</a>
                </td>
                <!--<td>{{refundDetail.RefundItemID}}</td>-->
                <td>
                    <span v-if="refundDetail.isSaved">{{refundDetail.Barcode.Goods.CustomNo}}</span>
                    <div class="form-inline form-inlinecenter" v-if="!refundDetail.isSaved">
                        <input type="text" class="form-control" v-model="refundDetail.Barcode.Goods.CustomNo">
                        <a href="javascript:void(0)" class="btn btn-default" @click="choiceCustomNo(refundDetail.Barcode.Goods.CustomNo,refundDetail)">选择</a>
                    </div>
                </td>
                <td>
                    <span v-if="refundDetail.isSaved">{{refundDetail.Barcode.CustomBC}}</span>
                    <div class="form-inline form-inlinecenter" v-if="!refundDetail.isSaved">
                        <input type="text" class="form-control" v-model="refundDetail.Barcode.CustomBC">
                        <a href="javascript:void(0)" class="btn btn-default" @click="choiceCustomBC(refundDetail.Barcode.CustomBC,refundDetail)">选择</a>
                    </div>
                </td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{refundDetail.Barcode.Goods.Name}}">{{refundDetail.Barcode.Goods.Name  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{refundDetail.Barcode.Size.Name}}">{{refundDetail.Barcode.Size.Name  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{refundDetail.Barcode.Color.Name}}">{{refundDetail.Barcode.Color.Name  | truncationString }} </span></td>
                <!--退货类型-->
                <td>
                    <span v-if="refundDetail.isSaved">{{refundDetail.GetRefundOperTypeDesc}}</span>
                    <div class="form-inline" v-if="!refundDetail.isSaved">
                        <select class="form-control" v-model="refundDetail._GetRefundOperType">
                            <option value="{{refundOperType.Code}}" v-for="refundOperType in baseLookUp.refundOperType">{{refundOperType.Text}}</option>
                        </select>
                    </div>
                </td>
                <!--是否需要退货-->
                <td>
                    <span v-if="refundDetail.isSaved">{{refundDetail.HasGoodReturn ? '是' : '否'}}</span>
                    <div class="form-inline" v-if="!refundDetail.isSaved">
                        <select class="form-control" v-model="refundDetail._HasGoodReturn">
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                </td>
                <!--是否已退货-->
                <td>
                    <span>{{refundDetail.HadGoodReturnDesc}}</span>
                </td>
                <!--实际售价-->
                <td>
                    <span v-if="refundDetail.SalesPrice && refundDetail.isSaved">￥</span><span v-if="refundDetail.isSaved">{{refundDetail.SalesPrice}}</span>
                    <div class="form-inline" v-if="!refundDetail.isSaved">
                        <input type="text" class="form-control" v-model="refundDetail._SalesPrice" value="{{refundDetail.SalesPrice}}">
                    </div>
                </td>
                <!--退货数量-->
                <td>
                    <span v-if="refundDetail.isSaved">{{refundDetail.Qty}}</span>
                    <div class="form-inline" v-if="!refundDetail.isSaved">
                        <input type="text" class="form-control" v-model="refundDetail._Qty" value="{{refundDetail.Qty}}">
                    </div>
                </td>
                <!--退货价格-->
                <td>
                    <span v-if="refundDetail.RefundFee && refundDetail.isSaved">￥</span><span v-if="refundDetail.isSaved">{{refundDetail.RefundFee}}</span>
                    <div class="form-inline" v-if="!refundDetail.isSaved">
                        <input type="text" class="form-control" v-model="refundDetail._RefundFee" value="{{refundDetail.RefundFee}}">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <modal-size-color></modal-size-color>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['refundDetails','state','refundId','baseLookUp'],
        methods: {
            choiceCustomNo: function (CustomNo,refundDetail) {
                var queryData = {
                    customNo: CustomNo,
                    merchant: refundDetail
                };
                this.$broadcast('choice-customNo',queryData);
            },
            choiceCustomBC: function (customBC,refundDetail) {
                var queryData = {
                    customBC: customBC,
                    merchant: refundDetail
                };

                this.$broadcast('choice-sku',queryData);
            },
            //新增
            addMerchant: function () {
                var refundID = this.refundId;
                var newRefundDetail = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    RefundID: refundID,
                    RefundItemID: '',
                    BarcodeID: '',
                    GetRefundOperType: '',
                    _GetRefundOperType: '',
                    HasGoodReturn: 0,
                    _HasGoodReturn: 0,
                    HadGoodReturn: '',
                    SalesPrice: 0,
                    _SalesPrice: 0,
                    Qty: 0,
                    _Qty: 0,
                    RefundFee: 0,
                    _RefundFee: 0,
                    Barcode: {
                        CustomBC: '',
                        Goods: {
                            CustomNo: '',
                            Name: ''

                        },
                        Size: {
                            Name: ''
                        },
                        Color: {
                            Name: ''
                        }
                    }
                };
                this.refundDetails.push(newRefundDetail);
            },
            //取消保存
            cancelChange: function (refundDetail) {
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
                    if ( refundDetail.isNewMerchant ) {
                        this.refundDetails.$remove(refundDetail);
                    } else {
                        refundDetail.isSaved = true;
                        refundDetail._Qty = refundDetail.Qty;
                        refundDetail._GetRefundOperType = refundDetail.GetRefundOperType;
                        refundDetail._HasGoodReturn = refundDetail.HasGoodReturn;
                        refundDetail._SalesPrice = refundDetail.SalesPrice;
                        refundDetail._RefundFee = refundDetail.RefundFee;
                    }
                })
            },
            //保存更改
            saveChange: function (refundDetail) {
                var refundID = this.refundId;
                var self = this;
                var saveRefundDetailLists = [];
//                this.$dispatch('transmit','tip',{
//                    name: '提示:',
//                    contentText: '确定要保存吗?',
//                    btnName: '确定',
//                    events: {
//                        confirm: 'saveChange'
//                    }
//                });
//                this.$once('saveChange',function () {
                    if (!refundDetail.isNotSelected) {
                        saveRefundDetailLists.push({
                            RefundItemID: refundDetail.RefundItemID,
                            RefundID: refundID,
                            BarcodeID: refundDetail.BarcodeID,
                            Qty: refundDetail._Qty,
                            GetRefundOperType: refundDetail._GetRefundOperType,
                            HasGoodReturn: refundDetail._HasGoodReturn,
                            SalesPrice: refundDetail._SalesPrice,
                            RefundFee: refundDetail._RefundFee
                        });
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpSaveRefundItem',
                            contentType: 'application/json',
                            data: JSON.stringify(saveRefundDetailLists)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                var refundDetailFromServer = result.Data[0];
                                refundDetail.isSaved = true;
                                refundDetail.isNotSelected = false;
                                refundDetail.isNewMerchant = false;
                                refundDetail.RefundItemID = refundDetailFromServer.RefundItemID;
                                refundDetail.GetRefundOperTypeDesc = refundDetailFromServer.GetRefundOperTypeDesc;
                                refundDetail.HasGoodReturnDesc = refundDetailFromServer.HasGoodReturnDesc;
                                refundDetail.Qty = refundDetail._Qty;
                                refundDetail.GetRefundOperType = refundDetail._GetRefundOperType;
                                refundDetail.HasGoodReturn = refundDetail._HasGoodReturn;
                                refundDetail.SalesPrice = refundDetail._SalesPrice;
                                refundDetail.RefundFee = refundDetail._RefundFee;
                            }
                        });
                    }
//                })
            },
            //删除明细
            deleteMerchant: function (refundDetail) {
                var self = this;
                var deleteRefundDetailLists = [];
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
                    if ( refundDetail.isNewMerchant ) {    //如果是新添加的明细,则直接删除
                        this.refundDetails.$remove(refundDetail);
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '删除成功'
                        });
                    } else {
                        deleteRefundDetailLists.push(refundDetail.RefundItemID);
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusRefund/ErpDeleteRefundItem',
                            contentType: 'application/json',
                            data: JSON.stringify(deleteRefundDetailLists)

                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.refundDetails.$remove(refundDetail);
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '删除成功'
                                });
                            }
                        })
                    }
                });
            },
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var refundID = this.refundId;
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant,index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.refundDetails.forEach(function (orderItem) {
                        if (orderItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                            originMerchant.Barcode.Goods.CustomNo = merchant.CustomNo;
                            originMerchant.Barcode.CustomBC = merchant.Sku;
                            originMerchant.Barcode.Goods.Name = merchant.GoodsName;
                            originMerchant.Barcode.Size.Name = merchant.Size;
                            originMerchant.Barcode.Color.Name = merchant.Color;
                            originMerchant.SalePrice = merchant.SalePrice;

//                            refundDetail.Qty = refundDetail._Qty;
//                            refundDetail.OperType = refundDetail._OperType;
//                            refundDetail.HasGoodReturn = refundDetail._HasGoodReturn;
//                            refundDetail.SalesPrice = refundDetail._SalesPrice;
//                            refundDetail.RefundFee = refundDetail._RefundFee;
//
//                            originMerchant.Price = merchant.Price;
//                            originMerchant._Price = merchant.Price;
//
//                            originMerchant.Barcode.Goods.BasePrice = merchant.BasePrice;
//                            originMerchant.Barcode.Goods.GoodsDetail.MarketPrice = merchant.MarketPrice;

                        } else {   //将余下的订单添加入订单明细中
                            self.refundDetails.push({
                                isSaved: false,
                                isNotSelected: false,
                                isNewMerchant: true,
                                RefundItemID: '',
                                RefundID: refundID,
                                BarcodeID: merchant.BarcodeID,
                                Qty: 0,
                                _Qty: 0,
                                GetRefundOperType: '',
                                _GetRefundOperType: '',
                                HasGoodReturn: 0,
                                _HasGoodReturn: 0,
                                SalesPrice: merchant.SalePrice,
                                _SalePrice: merchant.SalePrice,
                                RefundFee: 0,
                                _RefundFee: 0,
                                Barcode: {
                                    Goods: {
                                        CustomNo: merchant.CustomNo,
                                        Name: merchant.GoodsName,
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
            }
        },
        components: {
            modalSizeColor: require('./../../../components/modal-size-color.vue'),
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>