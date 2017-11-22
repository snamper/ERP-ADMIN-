<template>
    <div class="sheet-list-table table-responsive sheet-list-table-inv">
        <table class="table table-condensed table-condensedbd ">
            <thead class="sheet-list-header">
            <tr>
                <th class="new-newlybtn" style="width: 53px;padding-left: 19px;"><a href="javascript:void(0)" @click="addMerchant" class="btn btn-default new-newly " style="line-height:17px;">+ &nbsp;新增</a></th>
                <th>序号</th>
                <th>商品货号</th>
                <th>SKU</th>
                <th>商品名称</th>
                <th>尺码</th>
                <th>颜色</th>
                <th>建议售价</th>
                <th>{{qtyText}}数量</th>
            </tr>
            </thead>
            <tbody>
            <tr class="sheet-list-item" v-for="merchant in sheetList | orderBy 'SerialID'">
                <td>
                    <a @click="editMerchant(merchant)" href="javascript:void(0)" v-if="merchant.isSaved">修改</a>
                    <a @click="deleteMerchant(merchant)" href="javascript:void(0)">删除</a>
                </td>
                <td>{{merchant.SerialID}}</td>
                <td>
                    <span v-if="merchant.isSaved">{{merchant.CustomNo}}</span>
                    <div class="form-inline" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant.CustomNo">
                        <!--<input type="text" class="form-control" v-model="merchant.CustomNo">-->
                        <a @click="choiceCustomNo(merchant.CustomNo,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                    </div>
                </td>
                <td>
                    <span v-if="merchant.isSaved">{{merchant.PaySku}}</span>
                    <div class="form-inline" v-if="!merchant.isSaved">
                        <input type="text" class="form-control" v-model="merchant.PaySku">
                        <a @click="choiceCustomBC(merchant.PaySku,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                    </div>
                </td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Name}}">{{merchant.Name  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.SizeName}}">{{merchant.SizeName  | truncationString }} </span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.ColorName}}">{{merchant.ColorName  | truncationString }} </span></td>
                <td>
                    <span v-if="merchant.BasePrice">￥</span>{{merchant.BasePrice}}</span>
                </td>
                <td>
                    <span v-if="merchant.isSaved && type == 'PayPresentSku'">{{merchant.Qty}}</span>
                    <input v-if="!merchant.isSaved && type == 'PayPresentSku'" type="text" class="form-control" v-model="merchant.Qty">
                    <span v-if="merchant.isSaved && type == 'PayPresentPaySku'">{{merchant.PayQty}}</span>
                    <input v-if="!merchant.isSaved && type == 'PayPresentPaySku'" type="text" class="form-control" v-model="merchant.PayQty">
                </td>
            </tr>
            </tbody>
        </table>
        <modal-size-color></modal-size-color>
    </div>
</template>

<script>
    var servers = require('../../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['sheetList','type'],
        data: function () {
            return {
                qtyText: ''
            }
        },
        methods: {
            choiceCustomNo: function (CustomNo, merchant) {
                var queryData = {
                    customNo: CustomNo,
                    merchant: merchant
                };
                this.$broadcast('choice-customNo', queryData);
            },
            choiceCustomBC: function (customBC, merchant) {
                var queryData = {
                    customBC: customBC,
                    merchant: merchant
                };

                this.$broadcast('choice-sku', queryData);
            },
            editMerchant: function (merchant) {
                merchant.isSaved = false;
            },
            getMaxSerialID: function () {
                var sheetList = this.sheetList;
                var SerialID;
                if (sheetList && sheetList.length > 0) {
                    if (sheetList.length == 1) {
                        SerialID = sheetList[0].SerialID;
                    } else {
                        for (var i = 0; i < sheetList.length -1; i++) {
                            if (sheetList[i].SerialID > sheetList[i + 1]) {
                                SerialID = sheetList[i].SerialID;
                            } else {
                                SerialID = sheetList[i+1].SerialID;
                            }
                        }
                    }
                } else {
                    SerialID = 0;
                }
                return SerialID;
            },
            addMerchant: function () {
                var SerialID = this.getMaxSerialID() + 1;
                var newMerchant = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    BasePrice: 0,
                    ColorName: '',
                    PaySku: '',
                    CustomNo: '',
                    Name: '',
                    Price: 0,
                    SizeName: '',
                    SerialID: SerialID
                };
                if (this.type == 'PayPresentPaySku') {
                    newMerchant.PayPresentPaySkuID = '';
                    newMerchant.PayQty = 0;
                } else if (this.type == 'PayPresentSku') {
                    newMerchant.PayPresentSku = '';
                    newMerchant.Qty = 0;
                }
                this.sheetList.push(newMerchant);
            },
            deleteMerchant: function (merchant) {
                var sheetList = this.sheetList;
                var self = this;
                var url = '';
                var data = {};
                if (this.type == 'PayPresentPaySku') {
                    url = '/BusPayPresent/ErpDelPayPresentPaySku';
                    data = {
                        PayPresentPaySkuID: merchant.PayPresentPaySkuID
                    }
                } else if (this.type == 'PayPresentSku') {
                    url = '/BusPayPresent/ErpDelPayPresentSku';
                    data = {
                        PayPresentSKUID: merchant.PayPresentSKUID
                    }
                }
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要删除该条明细?',
                    btnName: '删除',
                    events: {
                        confirm: 'delete' + self.type
                    }
                });
                self.$off('delete' + self.type);

                self.$once('delete' + self.type, function () {
                    if (merchant.isNewMerchant) {
                        sheetList.$remove(merchant);
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '删除明细成功'
                        });
                    } else {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: url,
                            data: data
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                sheetList.$remove(merchant);
                                self.$dispatch('transmit', 'tip', {
                                    name: '成功:',
                                    contentText: '删除明细成功'
                                });
                            }
                        })
                    }
                });
            }
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant, index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.sheetList.forEach(function (sheetListItem) {
                        if (sheetListItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
                            originMerchant.BasePrice = merchant.BasePrice;
                            originMerchant.Price = merchant.BasePrice;
                            originMerchant.CustomNo = merchant.CustomNo;
                            originMerchant.Name = merchant.GoodsName;
                            originMerchant.SizeName = merchant.Size;
                            originMerchant.ColorName = merchant.Color;
                            originMerchant.PaySku = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.sheetList.push({
                                isSaved: false,
                                isNotSelected: false,
                                isNewMerchant: true,
                                Qty: 0,
                                PayQty: 0,
                                BasePrice: merchant.BasePrice,
                                Price: merchant.BasePrice,
                                BarcodeID: merchant.BarcodeID,
                                Name: merchant.GoodsName,
                                SizeName: merchant.Size,
                                ColorName: merchant.Color,
                                CustomNo: merchant.CustomNo,
                                PaySku: merchant.Sku
                            })
                        }

                    }
                });
            }
        },
        ready: function () {
            if (this.type == 'PayPresentPaySku') {
                this.qtyText = '指定';
            } else if (this.type == 'PayPresentSku') {
                this.qtyText = '赠送';
            }
        },
        components: {
            modalSizeColor: require('../../../../../components/modal-size-color.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>