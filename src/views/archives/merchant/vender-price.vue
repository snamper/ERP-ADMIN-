<template>
    <div class="container-product-vevel">
        <div class="unify-head">
            供应价管理
        </div>
        <div class="query-form" @keyup.enter.stop="search">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        供应价管理:
                    </label>
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >序号</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.SerialID">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品货号</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.CustomNo">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >商品名称</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.GoodsName">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >店铺</label>
                        <select class="form-control" v-model="query.ShopID">
                            <option value="">不限</option>
                            <option v-for="opt in ShopList" value="{{opt.ShopID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >供应商</label>
                        <select class="form-control" v-model="query.VenderID">
                            <option value="">不限</option>
                            <option v-for="opt in VenderList" value="{{opt.VenderID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>正常进价</label>
                        <input type="text" class="form-control" placeholder="" v-model="query.ContractCostFrom">
                        <span style="line-height: 31px;"> ~ </span>
                        <input type="text" class="form-control" placeholder="" v-model="query.ContractCost">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>执行进价</label>
                        <input type="text" class="form-control" placeholder="" v-model="query.CostFrom">
                        <span style="line-height: 31px;"> ~ </span>
                        <input type="text" class="form-control" placeholder="" v-model="query.Cost">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>进项税率</label>
                        <input type="text" class="form-control" placeholder="" v-model="query.CostTaxRateFrom">
                        <span style="line-height: 31px;"> ~ </span>
                        <input type="text" class="form-control" placeholder="" v-model="query.CostTaxRate">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >备注</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.Note">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value="1">启用</option>
                            <option value="0">禁用</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group" style="clear:both;">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a class="btn btn-default" v-link="{name: 'vender-price-add'}">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量导入</a>
                            <a @click="updateStatus(1)" href="javascript:void(0)" class="btn btn-default">批量启用</a>
                            <a @click="updateStatus(0)" href="javascript:void(0)" class="btn btn-default">批量禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>序号</th>
                                <!-- <th>序号</th> -->
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>店铺</th>
                                <th>供应商</th>
                                <th>正常进价</th>
                                <th>执行进价</th>
                                <th>进项税率</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="option in allVenderPrice">
                                <td class="sheet-item-state"><input type="checkbox" v-model="option.checked" /></td>
                                <td>{{option.}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.CustomNo}}">{{option.CustomNo  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.GoodsName}}">{{option.GoodsName  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option. ShopName}}">{{option.ShopName  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.VenderName}}">{{option.VenderName  | truncationString}}</span></td>
                                <td>{{option.ContractCost}}</td>
                                <td>{{option.Cost}}</td>
                                <td>{{option.CostTaxRate}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.Note}}">{{option.Note  | truncationString}}</span></td>
                                <td :class="[ option.Status == 1 ? '' : 'state-forbid']">{{option.Status ? '启用' : '禁用'}}</td>
                                <td>{{option.Creater}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.CreateTime | truncationTimeString}}">{{option.CreateTime   | formatDateFormShow}}</span></td>
                                <td>{{option.Editor}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.EditTime | truncationTimeString}}">{{option.EditTime   | formatDateFormShow}}</span></td>
                                <!--<td>{{t.Status ? '启用' : '禁用'}}</td>-->
                                <td>
                                    <a class="toolTip" v-link="'/vender-price-edit?CostID='+ option.CostID" style="background:#96BEE7;" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="updateStatus(1,option.CostID)" href="javascript:void(0)" v-if="!option.Status==1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用">
                                        <span class="iconfont icon-play"></span>
                                    </a>
                                    <a @click="updateStatus(0,option.CostID)" href="javascript:void(0)" v-if="option.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用">
                                        <span class="iconfont icon-forbid"></span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="allVenderPrice.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    fileType: 33
                },
                show: {
                    flog: false
                },
                query: {
                    ContractCost: '',	//正常进货价	number	正常进货价（大值）
                    ContractCostFrom: '',	//正常进货价（从）	number	正常进货价（小值）
                    Cost: '',	      //执行进货价	number	执行进货价（大值）
                    CostFrom: '',	  //执行进货价（从）	number	执行进货价（小值）
                    CostTaxRate: '',	//进项税率	number	进项税率（大值）
                    CostTaxRateFrom: '',	//进项税率（从）	number	进项税率（小值）
                    CustomNo: '',	  //商品货号	string
                    GoodsID: '',	 //商品货号ID	string	下拉框商品货号对应 的商品ID
                    GoodsName: '',	//商品名称	string
                    Note: '',	   //备注	string
                    ShopID: '',	   //店铺ID	string	下拉框店铺对应 的店铺ID
                    Status: '',	   //状态	number	0 禁用，1 启用
                    VenderID: '',	//供应商ID	string	下拉框供应商对应 的供应商ID
                    CreateTime: '',  //	创建时间	string
                    Creater: '',  //	创建人	string
                    EditTime: '',  //	修改时间	string
                    Editor: '',  //	修改人	string
                },
                VenderList: [],
                ShopList:[],
                paginationOptions:{
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                allVenderPrice: [],
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            getIDGroup: function (CostID) {
                var VenderPrice = [];
                if (CostID) {
                    VenderPrice.push(CostID);
                } else {
                    VenderPrice = this.checkedGroups;
                }
                if (VenderPrice.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return VenderPrice;
                }
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
            //获取数据
            getVenderPrice: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCost/ErpQueryCost',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
//                    self.allProductPrice = result.Data.PageData;
//                    NProgress.done();

                    var allVenderPrice = result.Data.PageData;
                    console.log(allVenderPrice);
                    self.allVenderPrice = [];
                    if (allVenderPrice.length > 0) {
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        allVenderPrice.forEach(function (item) {
                            item.checked = false;
                        });
                        self.allVenderPrice = allVenderPrice;
                    }
                    NProgress.done();

                })
            },
            //重置列表
            resetting: function () {
                this.query = {
                    ContractCost: '',	//正常进货价	number	正常进货价（大值）
                    ContractCostFrom: '',	//正常进货价（从）	number	正常进货价（小值）
                    Cost: '',	      //执行进货价	number	执行进货价（大值）
                    CostFrom: '',	  //执行进货价（从）	number	执行进货价（小值）
                    CostTaxRate: '',	//进项税率	number	进项税率（大值）
                    CostTaxRateFrom: '',	//进项税率（从）	number	进项税率（小值）
                    CustomNo: '',	  //商品货号	string
                    GoodsID: '',	 //商品货号ID	string	下拉框商品货号对应 的商品ID
                    GoodsName: '',	//商品名称	string
                    Note: '',	   //备注	string
                    ShopID: '',	   //店铺ID	string	下拉框店铺对应 的店铺ID
                    Status: '',	   //状态	number	0 禁用，1 启用
                    VenderID: '',	//供应商ID	string	下拉框供应商对应 的供应商ID
                    CreateTime: '',  //	创建时间	string
                    Creater: '',  //	创建人	string
                    EditTime: '',  //	修改时间	string
                    Editor: '',  //	修改人	string
                }
            },
            //搜索
            search: function (type) {
                if (type !== true && this.paginationOptions.cur !== 1) {

                    return this.paginationOptions.cur = 1;

                }
                this.getVenderPrice();
            },
            //启用禁用
            updateStatus: function (status,CostID) {
                var self = this;
                var text = '';
                if (status == 1) {
                    text = '启用';
                } else {
                    text = '禁用';
                }
                var choiceVenderPrice = self.getIDGroup(CostID);
//                console.log(CustomerGradePriceID);
//                console.log(choiceVenderPrice);
                if (choiceVenderPrice.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些供应价吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatus'
                        }
                    });
                    self.$off('updateStatus');

                    self.$once('updateStatus',function () {
                        //发送启用禁用请求
                        servers.postAjax.bind(this)({
                            url: '/BasCost/UpdateStatus',
//                            contentType: 'application/json',
//                            data:  JSON.stringify(choiceVenderPrice),
                            data: {
                                CostIDList: choiceVenderPrice,
                                Status: status
                            }

                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.getVenderPrice();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
        },

        events: {
        //页面改变,获取数据
        'page-change': function () {
            this.search(true);
        }
        },
        computed: commonMethods.selectAll('this.allVenderPrice', function (item) {
            return item.CostID;
        }),
        components: {
                pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getVenderList();
            this.getShopList();
            this.getVenderPrice();
        },
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>