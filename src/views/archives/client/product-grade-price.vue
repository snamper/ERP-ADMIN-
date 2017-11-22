<template>
    <div class="container-product-vevel">
        <div class="operate-form-title">
            <p>商品等级价</p>
        </div>
        <div class="query-form" @keyup.enter.stop="search">
            <div class="query-header">
                <div class="checkbox-group">
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >序号</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.SerialID">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >客户等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in customerGradeList" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品货号</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.CustomNo">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >商品名称</label>
                        <input type="text" class="lxz-clo form-control" v-model="query.GoodsName">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label >品牌</label>
                        <select class="form-control" v-model="query.brandID">
                            <option value="">不限</option>
                            <option v-for="opt in brandList" value='{{opt.PropertyID}}'>{{opt.Name}}</option>
                        </select>
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
                            <a class="btn btn-default" v-link="{name:'product-grade-add'}">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量导入</a>
                            <a @click="updateStatusStart()" href="javascript:void(0)" class="btn btn-default">批量启用</a>
                            <a @click="updateStatusEnd()" href="javascript:void(0)" class="btn btn-default">批量禁用</a>
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
                                <th>客户等级</th>
                                <th>品牌</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>价格类型</th>
                                <th>固定价格</th>
                                <th>折扣</th>
                                <th>基本价格</th>
                                <th>价格</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="option in allProductPrice">
                                <td class="sheet-item-state"><input type="checkbox" v-model="option.checked" /></td>
                                <td>{{option.SerialID}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.CustomerGradeName}}">{{option.CustomerGradeName  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.PropertyName}}">{{option.PropertyName  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.CustomNo}}">{{option.CustomNo  | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.GoodsName}}">{{option.GoodsName  | truncationString}}</span></td>
                                <td>{{option.PriceTypeName}}</td>
                                <td>{{option.Price}}</td>
                                <td>{{option.PriceRate}}</td>
                                <td>{{option.BasePrice}}</td>
                                <td>{{option.CalPrice}}</td>
                                <td>{{option.Status ? '启用' : '禁用'}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.Note}}">{{option.Note  | truncationString}}</span></td>
                                <td>{{option.Creater}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.CreateTime | truncationTimeString}}">{{option.CreateTime   | formatDateFormShow}}</span></td>
                                <td>{{option.Editor}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{option.EditTime | truncationTimeString}}">{{option.EditTime   | formatDateFormShow}}</span></td>
                                <!--<td>{{t.Status ? '启用' : '禁用'}}</td>-->
                                <td>
                                    <a class="toolTip" v-link="{name:'product-grade-edit',
                                                query: {
                                                    CustomerGradeID: option.CustomerGradeID,
                                                    GoodsID: option.GoodsID,
                                                    PriceType: option.PriceType,
                                                    Price: option.Price,
                                                    PriceRate: option.PriceRate,
                                                    Note: option.Note,
                                                    Status: option.Status,
                                                    CustomerGradePriceID:option.CustomerGradePriceID
                                                }
                                            }" style="background:#96BEE7;" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="updateStatusStart(option.CustomerGradePriceID)" href="javascript:void(0)" v-if="!option.Status==1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用">
                                        <span class="iconfont icon-play"></span>
                                    </a>
                                    <a @click="updateStatusEnd(option.CustomerGradePriceID)" href="javascript:void(0)" v-if="option.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用">
                                        <span class="iconfont icon-forbid"></span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="allProductPrice.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--{{$data | json}}-->
    <!--{{colorList}}-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                pageInfo: {
                    fileType: 31
                },
                brandList: [],
                paginationOptions:{
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
                    SerialID: '', //序号
                    CustomerGradeID: '',
                    customerGradePriceID: '', //	客户商品等级价ID	string	新增时不传，修改时传该参数
                    GoodsID: '', //	商品ID	string	必传
                    CustomNo: '', //商品货号
                    GoodsName: '', //商品名称
                    brandID: '', //品牌id
                    Code: '',
                    Status: '', //	状态	number	1在用，0停用
                },
                PriceType: [], //	价格类型	number	0按固定价格，1按比例
                customerGradeList: [], //	客户等级
                allProductPrice: []
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
            // 获取客户等级列表
            getCustomerGradeList: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetBasCustomerGradeList'
                }).done(function (result) {
//                    console.log(result);
                    self.customerGradeList = result.Data;
//                    console.log(self.customerGradeList);
                })
            },
            //获取价格类型列表
            getPriceType: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetBasCustomerGradePriceType'
                }).done(function (result) {

                    self.PriceType = result.Data;
                })
            },
            //搜索
            getProductPrice: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCustomerGradePrice/ErpQueryBasCustomerGradePrice',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
//                    self.allProductPrice = result.Data.PageData;
//                    NProgress.done();

                    var allProductPrice = result.Data.PageData;
                    self.allProductPrice = [];
                    if (allProductPrice.length > 0) {
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        allProductPrice.forEach(function (item) {
                            item.checked = false;
                        });
                        self.allProductPrice = allProductPrice;
                    }
                    NProgress.done();

                })
            },
//
//getProductPrice
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getProductPrice();
                } else {
                    this.paginationOptions.cur = 1
                }
            },



            //重置列表
            resetting: function () {
                var self = this;
                self.query = {
                    SerialID: '', //序号
                    CustomerGradeID: '',
                    customerGradePriceID: '', //	客户商品等级价ID	string	新增时不传，修改时传该参数
                    GoodsID: '', //	商品ID	string	必传
                    CustomNo: '', //商品货号
                    GoodsName: '', //商品名称
                    brandID: '', //品牌id
                    Status: '', //	状态	number	1在用，0停用
                }
            },
            getIDGroup: function (CustomerGradePriceID) {
                var IDGroup = [];
                if (CustomerGradePriceID) {
                    IDGroup.push(CustomerGradePriceID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //启用
            updateStatusStart: function (CustomerGradePriceID) {
                var self = this;
                var text = '启用';
                var choiceProductGrade = self.getIDGroup(CustomerGradePriceID);
                if (choiceProductGrade.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些商品等级价吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatusStart'
                        }
                    });

                    self.$off('updateStatusStart');
                    self.$once('updateStatusStart',function () {

                        //发送启用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasCustomerGradePrice/ErpStart',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceProductGrade),

                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },

            //禁用
            updateStatusEnd: function (CustomerGradePriceID) {
                var self = this;
                var text = '';
//                if (status == 1) {
//                    text = '启用';
//                } else {
                text = '禁用';
//                }
                var choiceCategory = self.getIDGroup(CustomerGradePriceID);
                if (choiceCategory.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些商品等级价吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatusEnd'
                        }
                    });

                    self.$off('updateStatusEnd');

                    self.$once('updateStatusEnd',function () {

                        //发送禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasCustomerGradePrice/ErpEnable',
                            contentType: 'application/json',
                            data:  JSON.stringify(choiceCategory),

                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.search();    //启用禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            },

            //获取商品等级价格列表
//            getSaveBasCustomerGradePrice: function () {
//                var self = this;
//                servers.postAjax({
//                    url: '/BasCustomerGradePrice/ErpSaveBasCustomerGradePrice',
//                    data: {
//                        customerGradeList: self.customerGradeList,
//                        customerGradePriceID:self.customerGradePriceID, //	客户商品等级价ID	string	新增时不传，修改时传该参数
//                        GoodsID: self.GoodsID, //	商品ID	string	必传
//                        Note: self.Note, //	备注	string
//                        Price: self.Price, //	固定价格	number	必传
//                        PriceRate: self.PriceRate, //	客户折扣	number	必传
//                        PriceType: self.PriceType, //	价格类型	number	0按固定价格，1按比例
//                        Status: self.Status, //	状态	number	1在用，0停用
//
//                    },
//
//                }).done(function (result) {
//                    console.log(result);
//                    self.query = result.Data;
//                })
//            },
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getProductPrice();
            }
        },
        computed: commonMethods.selectAll('this.allProductPrice', function (item) {
            return item.CustomerGradePriceID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getCustomerGradeList();
//            this.getSaveBasCustomerGradePrice();
            this.getPriceType();
            servers.filterList(this);
            this.getProductPrice();
        }
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>