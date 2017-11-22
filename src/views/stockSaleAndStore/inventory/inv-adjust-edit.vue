<template>
    <div class="query-header" style="border-bottom:none;"></div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">仓库<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="invAdjust.StockID">
                            <option value="">不限</option>
                            <option value="{{stock.StockID}}" v-for="stock in baseLookUp.stockList">{{stock.Name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">调整类型<span class="form-required-mark">*</span></label>
                        <select v-model="invAdjust.Type" class="form-control">
                            <!--<option value="null">请选择</option>-->
                            <option value="0">期初</option>
                            <option value="1">其他</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="invAdjust.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                        <div class="form-group-list">
                            <div class="sheet-list-table table-responsive sheet-list-table-inv">
                                <table class="table table-condensed table-condensedbd ">
                                    <thead class="sheet-list-header">
                                    <tr>
                                        <th class="new-newlybtn" style="    width: 53px;
    padding-left: 19px;"><a href="javascript:void(0)" @click="addMerchant" class="btn btn-default new-newly "
                            style="line-height:17px;">+ &nbsp;新增</a></th>
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
                                    <tr class="sheet-list-item" v-for="merchant in invAdjust.InvAdjustItems">
                                        <td>
                                            <a @click="editMerchant(merchant)" href="javascript:void(0)"
                                               v-if="merchant.isSaved">修改</a>
                                            <a @click="deleteMerchant(merchant)" href="javascript:void(0)">删除</a>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.CustomNo}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.CustomNo">
                                                <!--<input type="text" class="form-control" v-model="merchant.CustomNo">-->
                                                <a @click="choiceCustomNo(merchant.CustomNo,merchant)"
                                                   href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.CustomBC}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.CustomBC">
                                                <a @click="choiceCustomBC(merchant.CustomBC,merchant)"
                                                   href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Name}}">{{merchant.Name  | truncationString }} </span>
                                        </td>
                                        <td><span data-toggle="tooltip" data-placement="top"
                                                  title="{{merchant.SizeName}}">{{merchant.SizeName  | truncationString }} </span>
                                        </td>
                                        <td><span data-toggle="tooltip" data-placement="top"
                                                  title="{{merchant.ColorName}}">{{merchant.ColorName  | truncationString }} </span>
                                        </td>
                                        <td><span v-if="merchant.MarketPrice">￥</span>{{merchant.MarketPrice}}</td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.Qty > 0 ? '增加' + merchant.Qty : '减少' + merchant.Qty}}</span>
                                            <input v-if="!merchant.isSaved" type="text" class="form-control"
                                                   v-model="merchant.Qty" @change="changeQty(merchant)">
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="detailUpload" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveInvAdjust">保存</a>
                        <a v-link="{name:'inv-adjust'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-size-color></modal-size-color>
    <detail-upload></detail-upload>
    <!--<div>{{invAdjust | json}}</div>-->
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
                invAdjust: {
                    Sheet: '', //订单编码
                    InvAdjustID: '', //库存调整单ID
                    StockID: '', //仓库ID
                    Type: 1, //调整类型
                    Note: '', //备注
                    InvAdjustItems: [] //库存调整单
                },
                baseLookUp: {
                    stockList: []
                }
            }
        },
        methods: {
            getInvAdjust: function () {
                var self = this;
                var invAdjust = self.invAdjust;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusInvAdjust/ErpQueryInvAdjust',
                    data: {
                        PageSize: 1,
                        PageNumber: 1,
                        SearchWhere: {
                            InvAdjustID: self.invAdjust.InvAdjustID
                        }
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var invAdjustData = result.Data.PageData[0];
                        invAdjustData.GoodInfo_View.forEach(function (invAdjustItem) {
                            invAdjustItem.isSaved = true;
                        });
                        invAdjust.Sheet = invAdjustData.Sheet;
                        invAdjust.Type = invAdjustData.Type;
                        invAdjust.Note = invAdjustData.Note;
                        invAdjust.StockID = invAdjustData.StockID;
                        invAdjust.Note = invAdjustData.Note;
                        invAdjust.InvAdjustItems = invAdjustData.GoodInfo_View;
                    }
                })
            },
            changeQty: function (merchant) {
                merchant.NotifyQty = merchant.Qty;
            },
            saveInvAdjust: function () {
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '保存',
                    events: {
                        confirm: 'saveMerchant'
                    }
                });
                self.$off('saveMerchant');

                self.$once('saveMerchant', function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusInvAdjust/ErpSaveInvAdjust',
                        data: self.invAdjust
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '成功:',
                                contentText: '保存库存调整单成功'
                            });
                            self.resetForm();
                        }
                    });
                });
            },
            choiceCustomNo: function (CustomNo, merchant) {
                var queryData = {
                    customNo: CustomNo,
//                    customBC: '',
                    merchant: merchant
                };
                this.$broadcast('choice-customNo', queryData);
            },
            choiceCustomBC: function (customBC, merchant) {
                var self = this;
//                if (CustomNo) {
                var queryData = {
//                        customNo: CustomNo,
                    customBC: customBC,
                    merchant: merchant
                };

                this.$broadcast('choice-sku', queryData);
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
                var newMerchant = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    InAdjustItemID: '',
                    InAdjustID: this.invAdjust.InAdjustID,
                    BarcodeID: '',
                    CustomBC: '',
                    CustomNo: '',
                    Name: '',
                    ColorName: '',
                    SizeName: '',
                    MarketPrice: 0,
//                    BasePrice: 0,
                    Price: 0,
                    Qty: 0,
                    NotifyQty: 0
                };
                this.invAdjust.InvAdjustItems.push(newMerchant);
            },
            deleteMerchant: function (merchant) {
                var InvAdjustItems = this.invAdjust.InvAdjustItems;
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要删除该条明细?',
                    btnName: '删除',
                    events: {
                        confirm: 'deleteMerchant'
                    }
                });
                self.$off('deleteMerchant');

                self.$once('deleteMerchant', function () {
                    if (merchant.isNewMerchant) {
                        InvAdjustItems.$remove(merchant);
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '删除明细成功'
                        });
                    } else {
                        var InvAdjustItemsID = [];
                        InvAdjustItemsID.push(merchant.InvAdjustItemID);
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusInvAdjust/ErpDelInvAdjustItem',
                            contentType: 'application/json',
                            data: JSON.stringify(InvAdjustItemsID)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                InvAdjustItems.$remove(merchant);
                                self.$dispatch('transmit', 'tip', {
                                    name: '成功:',
                                    contentText: '删除明细成功'
                                });
                            }
                        })
                    }
                });
            },
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockList = val;
                });
            },
            //重置表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                } else {
                    this.invAdjust = {
                        Sheet: '', //订单编码
                        InvAdjustID: '', //库存调整单ID
                        StockID: '', //仓库ID
                        Type: '', //调整类型
                        Note: '', //备注
                        InvAdjustItems: [] //库存调整单
                    }
                }
            },
            //批量新增明细
            detailUpload: function () {
                this.$dispatch('transmit', 'detailUploadModalShow', 25);
            }
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                if (name == 'inv-adjust-edit') {
                    this.pageInfo.text = '修改调整单';
                    this.pageInfo.isEdit = true;
                    var invAdjustID = transition.to.query.invAdjustID;
                    if (invAdjustID) {
                        this.invAdjust.InvAdjustID = invAdjustID;
                        this.getInvAdjust();
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新增调整单';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
            }
        },
        ready: function () {
            this.getBaseLookUp();
        },
        events: {
            'size-color-commit': function (data) {
                var self = this;
                var sizeColorLists = data.sizeColorList;    //根据颜色尺码表选出来的结果
                var originMerchant = data.merchant;       //操作行的商品订单明细
                var isFirstNotInOrder = true;
                sizeColorLists.forEach(function (merchant, index) {   //遍历颜色尺码表
                    var isInOderItem = false;    //所选的结果是否已经存在于订单明细中
                    self.invAdjust.InvAdjustItems.forEach(function (InvAdjustItem) {
                        if (InvAdjustItem.BarcodeID == merchant.BarcodeID) {
                            isInOderItem = true;
                        }
                    });
                    if (!isInOderItem) {    //如果所选的不存在于订单明细中
                        if (isFirstNotInOrder) {     //将第一个不存在于订单明细中的订单替换当前订单
                            originMerchant.BarcodeID = merchant.BarcodeID;
                            originMerchant.MarketPrice = merchant.MarketPrice;
                            originMerchant.Price = merchant.Price;
                            originMerchant.CustomNo = merchant.CustomNo;
                            originMerchant.Name = merchant.GoodsName;
                            originMerchant.SizeName = merchant.Size;
                            originMerchant.ColorName = merchant.Color;
                            originMerchant.CustomBC = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.invAdjust.InvAdjustItems.push({
                                isSaved: false,
                                isNotSelected: false,
                                Qty: 0,
                                NotifyQty: 0,
                                InAdjustID: '',
                                MarketPrice: merchant.MarketPrice,
                                Price: merchant.Price,
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
                    self.invAdjust.InvAdjustItems.forEach(function (oldItem) {
                        if (oldItem.BarcodeID == newOrderItems.BarcodeID) {
                            newOrderItems.isSaved = false;
                            newOrderItems.isNotSelected = false;
                            newOrderItems.InvAdjustItemID = oldItem.InvAdjustItemID;
                            oldItem = newOrderItems;
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        newOrderItems.isSaved = false;
                        newOrderItems.isNotSelected = false;
                        self.invAdjust.InvAdjustItems.push(newOrderItems);
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


    .sheet-list-table {
        .new-newlybtn {
            background: #ccc;
            min-width: 100px;
            height: 32px;
            margin: 0 auto;
            .new-newly {
                display: inline-block;
                width: 68px;
                margin: 0 auto;
            }

        }
    }

    .sheet-list-table {
        .table-condensedbd {
            margin-bottom: 10px;
        }
    }

    .sheet-list-table-inv {
        margin-left: 24px;
        margin-top: 8px;
        border: 1px solid #e5e5e5;
        border-bottom: none;
        margin-bottom: 15px;
    }

</style>