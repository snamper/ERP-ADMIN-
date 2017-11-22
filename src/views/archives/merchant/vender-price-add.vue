<template>
    <div class="container-fluid">
        <div class="row">
            <div class="operate-form-title">
                <p>{{pageInfo.title}}</p>
            </div>
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">商品货号<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.GoodsID" @change="GoodsSelectChange(query.GoodsID)">
                            <option value="">请选择</option>
                            <option v-for="option in GoodsList" value="{{option.GoodsID}}">{{option.CustomNo}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">店铺</label>
                        <select class="form-control" v-model="query.ShopID">
                            <option value="">请选择</option>
                            <option v-for="opt in ShopList " value="{{opt.ShopID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.VenderID">
                            <option value="">请选择</option>
                            <option v-for="opt in VenderList" value="{{opt.VenderID}}">{{opt.Name}}</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">正常进价</label>
                        <input v-model="query.ContractCost" type="text" readonly class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">执行进价</label>
                        <input v-model="query.Cost" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">进项税率</label>
                        <input v-model="query.CostTaxRate" type="text" class="form-control">
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
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" @click="save" class="btn btn-default">保存</a>
                        <a class="btn btn-default" v-link="{name: 'vender-price'}">返回列表&gt;&gt;</a>
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
                    GoodsID: '', //	商品ID	string	必传
                    ContractCost: '',	//正常进价	number	根据商品货号下拉框取值（必填）
                    Cost: '',	       //执行进价	number	（必填）
                    CostTaxRate: '',	   //销税率	number	（必填）
                    GoodsID: '',	      //商品ID	string	下拉框商品货号对应的商品ID（必填）
                    Note: '',	      //备注	string	（非必填）
                    ShopID: '',	      //店铺ID	string	下拉框店铺对应的店铺ID（必填）
                    Status: '1',	      //状态	number	（必填）默认启用
                    VenderID: '',	  //供应商ID	string	下拉框供应商对应的供应商ID（必填）
                    CostID: '',
                },
                GoodsList: [],
                VenderList: [],
                ShopList: [],
            }
        },
        methods: {
            //选取商品货号，获取对应的成本价
            GoodsSelectChange: function (ID) {
                var self = this;
                var GoodsList = self.GoodsList
                GoodsList.forEach(function (item) {
                    if (item.GoodsID == ID) {
                        self.query.ContractCost = item.BasePrice;
                    }
                })


            },
            //获取商品货号列表
            getGoodsList: function () {
                var self = this;
                servers.getAjax({
                    url: '/BasCost/GetGoodsList'
                }).done(function (result) {
                    self.GoodsList = result.Data;
                })
            },
            //获取供应商列表
            getVenderList: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetVenderList'
                }).done(function (result) {
                    self.VenderList = result.Data;
                })
            },
            //获取店铺列表
            getShopList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetShopList'
                }).done(function (result) {
                    self.ShopList = result.Data;
                })
            },
            //重置列表
            resetForm:function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.query = {
                        GoodsID: '', //	商品ID	string	必传
                        ContractCost: '',	//正常进价	number	根据商品货号下拉框取值（必填）
                        Cost: '',	       //执行进价	number	（必填）
                        CostTaxRate: '',	   //销税率	number	（必填）
                        GoodsID: '',	      //商品ID	string	下拉框商品货号对应的商品ID（必填）
                        Note: '',	      //备注	string	（非必填）
                        ShopID: '',	      //店铺ID	string	下拉框店铺对应的店铺ID（必填）
                        Status: '1',	      //状态	number	（必填）默认启用
                        VenderID: '',	  //供应商ID	string	下拉框供应商对应的供应商ID（必填）
                        CostID: '',
                    };
                }
            },
            //获取价格信息
            getPriceByID: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasCost/GetCostDetail',
                    data: {
                        CostID: self.query.CostID
                    }
                }).done(function (result) {
                    var query = result.Data[0];
                    console.log(query)
                    if (result.ResultCode == 1) {
                        self.query.GoodsID = query.GoodsID,
                        console.log(query.GoodsID),
                        self.query.ContractCost = query.ContractCost,
                        self.query.Cost = query.Cost,
                        self.query.CostTaxRate = query.CostTaxRate,
//                        self.query.GoodsID = query.GoodsID,
                        self.query.Note = query.Note,
                        self.query.ShopID = query.ShopID,
                        self.query.Status = query.Status,
                        self.query.VenderID  = query.VenderID,
                        self.query.CostID = query.CostID,
                        self.query.EditTime = query.EditTime,
                        self.query.Editor = query.Editor,
                        self.query.CreateTime = query.CreateTime,
                        self.query.Creater = query.Creater
                    }
                })
            },
            //保存
            save: function () {
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要保存吗？',
                    events: {
                        confirm: 'save'
                    }
                });
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCost/ErpSaveCost',
                    data: self.query
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.resetForm();
                        self.$dispatch('transmit', 'tip', {
                        name: '成功:',
                        contentText: '成功保存'
                    });

                    }
                });
            },
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'vender-price-edit') {
                    self.pageInfo.title = '修改供应价';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    var CostID = this.query.CostID = transition.to.query.CostID;   //获取价格ID
//                    console.log( transition.to.query);
                    if (CostID) {
                        this.getPriceByID();
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建商品等级价';
                    self.resetForm();
                }
            }
        },
        ready: function () {
            this.getGoodsList();
            this.getVenderList();
            this.getShopList();
        },
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>