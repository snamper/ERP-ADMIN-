<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                        <input class="form-control" v-model="merchantGroup.Code" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">套餐名称<span class="form-required-mark">*</span></label>
                        <input class="form-control" v-model="merchantGroup.Name" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">组合价<span class="form-required-mark">*</span></label>
                        <input class="form-control" v-model="merchantGroup.Price" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="merchantGroup.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">组合明细<span class="form-required-mark">*</span></label>
                        <div class="form-group-list">
                            <div class="sheet-list-table table-responsive sheet-list-table-inv">
                                <table class="table table-condensed table-condensedbd ">
                                    <thead class="sheet-list-header">
                                    <tr>
                                        <th class="new-newlybtn" style="    width: 53px;
    padding-left: 19px;"><a href="javascript:void(0)" @click="addMerchant" class="btn btn-default new-newly " style="line-height:17px;">+ &nbsp;新增</a></th>
                                        <th>商品货号</th>
                                        <th>SKU</th>
                                        <th>商品名称</th>
                                        <th>尺码</th>
                                        <th>颜色</th>
                                        <th>基本售价</th>
                                        <th>组合数量</th>
                                        <th>单品单价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="sheet-list-item" v-for="merchant in merchantGroup.GoodsSetSkus">
                                        <td>
                                            <a @click="editMerchant(merchant)" href="javascript:void(0)" v-if="merchant.isSaved">修改</a>
                                            <a @click="deleteMerchant(merchant)" href="javascript:void(0)">删除</a>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.CustomNo}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.CustomNo">
                                                <!--<input type="text" class="form-control" v-model="merchant.CustomNo">-->
                                                <a @click="choiceCustomNo(merchant.CustomNo,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.SkuCode}}</span>
                                            <div class="form-inline" v-if="!merchant.isSaved">
                                                <input type="text" class="form-control" v-model="merchant.SkuCode">
                                                <a @click="choiceCustomBC(merchant.SkuCode,merchant)" href="javascript:void(0)" class="btn btn-default">选择</a>
                                            </div>
                                        </td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.Name}}">{{merchant.Name  | truncationString }} </span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.SizeName}}">{{merchant.SizeName  | truncationString }} </span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{merchant.ColorName}}">{{merchant.ColorName  | truncationString }} </span></td>
                                        <td>
                                            <span v-if="merchant.BasePrice">￥</span>{{merchant.BasePrice}}</span>
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.Qty}}</span>
                                            <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.Qty">
                                        </td>
                                        <td>
                                            <span v-if="merchant.isSaved">{{merchant.Price}}</span>
                                            <input v-if="!merchant.isSaved" type="text" class="form-control" v-model="merchant.Price">
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input v-model="merchantGroup.Status" type="checkbox" :true-value=1 :false-value=0 >
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="saveGroup" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a v-link="{name: 'merchant-group-list'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-size-color></modal-size-color>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    text: '',
                    isEdit: false
                },
                merchantGroup: {
                    Code: '',
                    GoodsSetID: '',
                    Name: '',
                    Note: '',
                    Price: '',
                    Status: 1,
                    GoodsSetSkus: []
                },
                baseLookUp: {
                    stockList: []
                }
            }
        },
        methods: {
            //查询组合
            getGroup: function () {
                var self = this;
                var merchantGroup = self.merchantGroup;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasGoodsSet/ErpQueryBasGoodsSet',
                    data: {
                        PageSize: 1,
                        PageNumber: 1,
                        SearchWhere: {
                            GoodsSetID: merchantGroup.GoodsSetID
                        }
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var merchantGroupData = result.Data.PageData[0];
                        var BasGoodsSetSku = merchantGroupData.BasGoodsSetSku_View;
                        if (BasGoodsSetSku && BasGoodsSetSku.length > 0) {
                            BasGoodsSetSku.forEach(function (merchantGroupItem) {
                                merchantGroupItem.isSaved = true;
                                merchantGroupItem.SkuCode = merchantGroupItem.CustomBC;
                            });
                        }
                        merchantGroup.Code = merchantGroupData.Code;
                        merchantGroup.GoodsSetID = merchantGroupData.GoodsSetID;
                        merchantGroup.Name = merchantGroupData.Name;
                        merchantGroup.Note = merchantGroupData.Note;
                        merchantGroup.Price = merchantGroupData.Price;
                        merchantGroup.Status = merchantGroupData.Status;
                        merchantGroup.GoodsSetSkus = BasGoodsSetSku || [] ;
                    }
                })
            },
            //保存组合
            saveGroup: function () {
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
                        url: '/BasGoodsSet/ErpSaveBasGoodsSet',
                        data: self.merchantGroup
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '成功:',
                                contentText: '保存商品组合成功'
                            });
                            self.resetForm();
                        }
                    });
                });
            },
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
            addMerchant: function () {
                var newMerchant = {
                    isSaved: false,   //是否已经保存
                    isNewMerchant: true,   //是否为未保存的新增
                    isNotSelected: true,    //是否未选择颜色尺码表
                    BasePrice: 0,
                    ColorName: '',
                    SkuCode: '',
                    CustomNo: '',
                    GoodsSetSkuID: '',
                    Name: '',
                    Price: 0,
                    Qty: 0,
                    SizeName: ''
                };
                this.merchantGroup.GoodsSetSkus.push(newMerchant);
            },
            deleteMerchant: function (merchant) {
                var goodsSetSkus = this.merchantGroup.GoodsSetSkus;
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
                        goodsSetSkus.$remove(merchant);
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '删除明细成功'
                        });
                    } else {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasGoodsSet/ErpDelBasGoodsSetSku',
                            data: {
                                GoodsSetSkuID: merchant.GoodsSetSkuID
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                goodsSetSkus.$remove(merchant);
                                self.$dispatch('transmit', 'tip', {
                                    name: '成功:',
                                    contentText: '删除明细成功'
                                });
                            }
                        })
                    }
                });
            },
            //重置表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                } else {
                    this.merchantGroup = {
                        Code: '',
                        GoodsSetID: '',
                        Name: '',
                        Note: '',
                        Price: '',
                        Status: 1,
                        GoodsSetSkus: []
                    }
                }
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
                    self.merchantGroup.GoodsSetSkus.forEach(function (goodsSetSkuItem) {
                        if (goodsSetSkuItem.BarcodeID == merchant.BarcodeID) {
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
                            originMerchant.SkuCode = merchant.Sku;
                            originMerchant.isNotSelected = false;
                            isFirstNotInOrder = false;
                        } else {   //将余下的订单添加入订单明细中
                            self.merchantGroup.GoodsSetSkus.push({
                                isSaved: false,
                                isNotSelected: false,
                                isNewMerchant: true,
                                Qty: 0,
                                GoodsSetSkuID: '',
                                BasePrice: merchant.BasePrice,
                                Price: merchant.BasePrice,
                                BarcodeID: merchant.BarcodeID,
                                Name: merchant.GoodsName,
                                SizeName: merchant.Size,
                                ColorName: merchant.Color,
                                CustomNo: merchant.CustomNo,
                                SkuCode: merchant.Sku
                            })
                        }

                    }
                });
            },
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                if (name == 'merchant-group-edit') {
                    this.pageInfo.text = '修改组合';
                    this.pageInfo.isEdit = true;
                    var goodsSetID = transition.to.query.GoodsSetID;
                    if (goodsSetID) {
                        this.merchantGroup.GoodsSetID = goodsSetID;
                        this.getGroup();
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新增组合';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
            }
        },
        components: {
            modalSizeColor: require('../../../../components/modal-size-color.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>