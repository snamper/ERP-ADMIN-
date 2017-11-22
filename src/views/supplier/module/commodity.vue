<style rel="stylesheet/less" lang="less">



</style>

<template>

    <div class="query-form">
        <div class="query-header">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    商品资料下发门店
                </label>
                <div class="checkbox-list">
                </div>
                <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" data-target="#query-detail">收起多余选项<span class="iconfont icon-up"></span></a>
            </div>
        </div>
        <div id="query-detail" class="form-inline query-detail collapse in" aria-expanded="true">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>状态</label>
                    <select class="form-control" v-model='query.Status'>
                        <option value="">全部</option>
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>分类</label>
                    <select v-model="query.DeptID" class="form-control">
                        <option value="">不限</option>
                        <option v-for="o in deptList" value="{{o.DeptID}}">{{o.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>品牌</label>
                    <select v-model="query.BrandID" class="form-control">
                        <option value="">不限</option>
                        <option v-for="o in brandList" value="{{o.PropertyID}}">{{o.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品货号</label>
                    <input v-model="query.CustomNo" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品名称</label>
                    <input v-model="query.Name" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>规格</label>
                    <input v-model="query.Spec" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>产地</label>
                    <input v-model="query.Origin" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>系列</label>
                    <input v-model="query.Series" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>年份</label>
                    <input v-model="query.Years" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>SKU</label>
                    <input v-model="query.Sku" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>季节</label>
                    <select v-model="query.SeasonID" class="form-control">
                        <option value="">不限</option>
                        <option v-for="o in seasonList" value="{{o.PropertyID}}">{{o.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>尺码</label>
                    <select v-model="query.SizeID" class="form-control">
                        <option value="">不限</option>
                        <option v-for="o in sizeList" value="{{o.PropertyID}}">{{o.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>颜色</label>
                    <select v-model="query.ColorID" class="form-control">
                        <option value="">不限</option>
                        <option v-for="o in colorList" value="{{o.PropertyID}}">{{o.Name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="query-footer">
            <div class="query-button-group">
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
                <!--<a href="javascript:void(0)" class="btn btn-default">导出商品资料</a>-->
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title scroll-list-title">商品列表</label>
                    <div class="batch-operation-group">

                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive sheet-list-table-Issued">
                    <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state">
                                <input type="checkbox" v-model="selectAll">
                            </th>
                            <th>商品货号</th>
                            <th>商品名称</th>
                            <th>分类</th>
                            <th>品牌</th>
                            <th>建议售价</th>
                            <th>状态</th>

                        </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr>
                            <td>
                                <input type="checkbox" v-model="t.checked">
                            </td>
                            <td>

                                {{t.CustomNo}}
                            </td>
                            <td>
                            <span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">
                            {{t.Name | truncationString}}
                            </span>
                            </td>
                            <td>
                            <span data-toggle="tooltip" data-placement="top" title=" {{t.Dept.Name}}">
                            {{t.Dept.Name | truncationString}}</span></td>

                            <td>
                            <span data-toggle="tooltip" data-placement="top" title=" {{t.Brand.Name}}">
                            {{t.Brand.Name | truncationString}}</span></td>
                            <td>{{t.GoodsDetail.MarketPrice}}</td>
                            <td>{{t.Status == 0 ? '禁用' : '启用'}}</td>

                        </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
        <!--<div>{{colorList | json }}</div>-->
    </div>
</template>

<script>

    var commonMethods = require('../../../js/common');


    // 商品列表
    module.exports = {
        props: ['goodsIdList'],
        data: function() {
            return {
                selectAll: false,
                server: require('../../../js/servers/servers'),
                deptList: [],
                sizeList: [],
                colorList: [],
                seasonList: [],
                brandList: [],
                query: {
                    Status: '',
                    BrandID: "",
                    ColorID: "",
                    DeptID: "",
                    SeasonID: "",
                    SizeID: "",
                },
                tableList: [],
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 15,
                    totalRecords: 0
                }
            }
        },
        ready: function() {
            this.getAttribute();
            this.getDeptList();
            this.search();
        },
        components: {
            // seeStock: require('./merchant-stock.vue'),
            // seeMerchant: require('./merchant-list-see.vue')
            'pagination': require('../../../components/pagination.vue')
        },
        watch: {
            'checkedGroups': function (newValue) {
                this.goodsIdList = newValue;
            }
        },
        computed: commonMethods.selectAll('this.tableList', function(item) {
            return item.GoodsID;
        }),

        events: {

            'page-change': function() {
                this.erpQueryGoods(true);
            }

        },

        methods: {
            /**
             * 搜索商品接口请求
             * 将 this.query 的数据传到服务器得到相应的商品列表
             * 将返回的商品列表复制到 tableList 对象
             */
            erpQueryGoods: function() {
                var self = this;

                this.server.postAjax.bind(this)({
                    url: '/BasGoods/ErpQueryGoods',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: this.query
                    },
                    success: function(data) {

                        if (data.ResultCode === 1) {

                            for (var i in data.Data.PageData) {
                                // 将每条选项的勾选状态设置为false
                                data.Data.PageData[i].checked = false;

                            }

                            self.tableList = data.Data.PageData;

                            self.paginationOptions.all = data.Data.TotalPages;
                            self.paginationOptions.totalRecords = data.Data.TotalRecords;

                        }

                    }
                });
            },
            resetting: function () {
                this.query = {
                    Status: '',
                    BrandID: "",
                    ColorID: "",
                    DeptID: "",
                    SeasonID: "",
                    SizeID: "",
                }
            },
            getAttribute: function() {
                this.server.filterList(this);
            },

            getDeptList: function() {
                var relf = this;

                relf.server.getAjax({
                    url: '/BaseLookup/GetDeptList',
                    success: function(data) {
                        relf.deptList = data.Data;
                    }
                });
            },
            /**
             * 搜索
             */
            search: function() {
                this.erpQueryGoods();
            },

            // 启用与禁用
            disable: function(arr, status) {

                var self = this;

                if (arr.length === 0) {
                    arr = this.checkedGroups;
                }

                if (arr.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '请先选择商品!'});
                }

                this.server.postAjax.bind(this)({
                    url: '/BasGoods/UpdateStatus',
                    data: {
                        Status: status,
                        GoodsIDList: arr
                    },
                    success: function(data) {
                        if (data.ResultCode === 1) {
                            self.$dispatch('transmit', 'tip', {
                                contentText: '成功!'
                            })
                            self.erpQueryGoods();
                        }
                    }
                });
            }
        }
    }

</script>
