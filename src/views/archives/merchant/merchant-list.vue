<style rel="stylesheet/less" lang="less">



</style>

<template>

<div class="query-form">
    <div class="query-header">
        <div class="checkbox-group">
            <label class="checkbox-title">
                商品列表
            </label>
            <div class="checkbox-list">
            </div>
            <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
        </div>
    </div>
    <div id="query-detail" name="query-detail" class="form-inline query-detail collapse in min-height" aria-expanded="true">
        <div class="row expand-show" :class="{'show-expand' : show.flog}">
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
                <label class="batch-operation-title">批量操作:</label>
                <div class="batch-operation-group">
                    <a v-link="{path: './add'}" href="javascript:void(0)" class="btn btn-default">新增</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="$dispatch('transmit', 'uploadModalShow', 9)">批量导入</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="disable([], 1)">启用</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="disable([], 0)">禁用</a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive">
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
                            <th>操作</th>
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
                            <td>
                                <a href="#!/merchant/see?id={{t.GoodsID}}" data-toggle="tooltip" data-placement="top" title="查看"><span class="iconfont icon-look"></span></a>

                                <a href="#!/merchant/edit?id={{t.GoodsID}}" data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="btn-change iconfont icon-alter"></span>
                                </a>

                                <a href="#!/merchant/sell-deploy?id={{t.GoodsID}}&num={{t.CustomNo || ' '}}&name={{t.Name}}" data-toggle="tooltip" data-placement="top" title="配置SKU">
                                    <span class="iconfont icon-sku"></span>
                                </a>

                                <a href="#!/merchant/stock?id={{t.GoodsID}}&code={{t.CustomNo || ' '}}" data-toggle="tooltip" data-placement="top" title="查看库存">
                                    <span class="iconfont icon-inventory"></span>
                                </a>

                                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="禁售">
                                    <span v-if="t.Status == 1" @click="disable([t.GoodsID], 0)" class="iconfont icon-bearsell"></span>
                                </a>

                                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="启用">
                                    <span v-if="t.Status == 0" @click="disable([t.GoodsID], 1)" class="iconfont icon-play"></span>
                                </a>
                            </td>
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
    data: function() {
        return {
            selectAll: false,
            server: require('../../../js/servers/servers'),
            deptList: [],
            sizeList: [],
            colorList: [],
            seasonList: [],
            brandList: [],
            show: {
                flog: false
            },
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

    computed: commonMethods.selectAll('this.tableList', function(item) {
        return item.GoodsID;
    }),

    events: {

        'page-change': function() {
            this.erpQueryGoods(true);
        }

    },

    methods: {
        //收展多余的选项
        toggleItem: function () {
            this.show.flog = !this.show.flog;
        },
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
<style rel="stylesheet/less" lang="less">
    /*.min-height {*/
        /*min-height: 200px;*/
    /*}*/
</style>
