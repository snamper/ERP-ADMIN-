<template>
    <div class="container-fluid">
        <div class="row">
            <div class="operate-form-title">
                <p>{{pageInfo.title}}</p>
            </div>
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.CustomerID">
                            <option value="">请选择</option>
                            <option v-for="opt in CustomerList " value="{{opt.CustomerID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">客户<span class="form-required-mark">*</span></label>-->
                        <!--<select class="form-control" v-model="query.CustomerID">-->
                            <!--<option value="">请选择</option>-->
                            <!--<option v-for="option in CustomerList" value="{{option.CustomerID}}">{{option.Name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">商品货号<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.GoodsID">
                            <option value="">请选择</option>
                            <option v-for="opt in BrandList " value="{{opt.GoodsID}}">{{opt.CustomNo}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">价格类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.PriceType">
                            <option value="">请选择</option>
                            <option v-for="opt in PriceType" value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width" v-if="query.PriceType == 0 || query.PriceType == ''">
                        <label class="form-group-text">固定价格<span class="form-required-mark">*</span></label>
                        <input v-model="query.Price" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width" v-if="query.PriceType == 1 || query.PriceType == ''">
                        <label class="form-group-text">折扣(%)<span class="form-required-mark">*</span></label>
                        <input v-model="query.PriceRate" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value="1" :false-value="0" v-model="query.Status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>


                    <!--<div class="form-group form-limit-width">-->
                    <!--<status-checkbox :status.sync="query.Status">启用</status-checkbox>-->
                    <!--</div>-->
                    <div class="operate-form-buttons">
                        <a @click="save" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a class="btn btn-default" v-link="{name: 'client-product-price'}">返回列表&gt;&gt;</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                query: {
                    CustomerPriceID: '',
                    CustomerID: '', //	客户ID	string
                    GoodsID: '', //	商品ID	string	必传
                    Note: '', //	备注	string
                    PriceType: '',
                    Price: '', //	固定价格	number	必传
                    PriceRate: '', //	客户折扣	number	必传
                    Status: 1 //	状态	number	1在用，0停用
                },
                CustomerList: [],
                PriceType: [],
                BrandList: [],
            }
        },
        methods: {
            // 获取客户列表
            getCustomerList: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetCustomerList'
                }).done(function (result) {
                    self.CustomerList = result.Data;
                })
            },
            //获取价格类型列表
            getPriceType: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetBasCustomerPriceType'
                }).done(function (result) {
                    self.PriceType = result.Data;
                })
            },
            //获取商品货号列表
            getBrandList: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetGoodsList'
                }).done(function (result) {
                    self.BrandList = result.Data;
                })
            },
            //保存新增客户商品价
            save: function () {
                var self = this;
                NProgress.start();

                if (self.query.CustomerID.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择客户'
                    });
                    return;
                }
                else if (self.query.GoodsID.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择商品货号'
                    });
                    return;
                }
                else if (self.query.PriceType.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择价格类型'
                    });
                    return;
                }
                else if (!self.query.Price || parseFloat(self.query.Price < 0 )) {
                    if (self.query.PriceType == 0) {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示:',
                            contentText: '固定价格不能为空'
                        });
                        return;
                    }
                }
                else if (!self.query.PriceRate || parseFloat(self.query.PriceRate) < 0) {
//                    console.log(self.query.PriceRate);
                    if (self.query.PriceType == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示:',
                            contentText: '折扣不能为空！'
                        });
                        return;
                    }
                }
                servers.postAjax.bind(this)({
                    url: '/BasCustomerPrice/ErpSaveBasCustomerPrice',
                    data: self.query,

                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.resetForm();
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '保存成功'
                        });
                    }
                });
            },
            //清空数据表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                }
                else {
                    this.query = {
                        CustomerID: '',
                        GoodsID: '',
                        Note: '',
                        PriceType: '',
                        PriceTypeID: '',
                        Price: '',
                        PriceRate: '',
                        Status: 1
                    }
                }
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        },

        route: {

            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'client-product-price-edit') {
                    self.pageInfo.title = '修改客户商品价';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if ( query.GoodsID ) {

                        var delivery = self.query;
                        console.log(query.Code);
                        delivery.CustomerPriceID = query.CustomerPriceID;
                        delivery.CustomerID = query.CustomerID;
                        delivery.GoodsID = query.GoodsID;
                        delivery.PriceType = query.PriceType;
                        delivery.Price = query.Price;
                        delivery.PriceRate = query.PriceRate;
                        delivery.Note = query.Note;
                        delivery.Status = query.Status;
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建客户商品价';
                    self.resetForm();
                }
            }
        },
        ready: function () {
            this.getCustomerList();
            this.getPriceType();
            this.getBrandList();
        },
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>