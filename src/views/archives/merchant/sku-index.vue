<style type="text/css" lang="less">



</style>

<template>

<div class="container-fluid">
    <div class="query-form">
        <div class="query-header query-header-margin">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    sku 列表
                </label>
                <div class="checkbox-list">
                </div>
                <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
            </div>
        </div>
        <div id="query-detail " class="form-inline query-detail">
            <div class="row expand-show" :class="{'show-expand' : show.flog}">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>状态</label>
                    <select class="form-control" v-model="query.Status">
                        <option value="0">禁用</option>
                        <option value="1">启用</option>
                        <option value="">不限</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>分类</label>
                    <select class="form-control" v-model="query.DeptID">
                        <option value="">不限</option>
                        <option v-for="option in deptList" value="{{option.DeptID}}">{{option.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>品牌</label>
                    <select class="form-control" v-model="query.BrandID">
                        <option value="">不限</option>
                        <option v-for="option in brandList" value="{{option.PropertyID}}">{{option.Name}}</option>
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
                    <label>季节</label>
                    <select class="form-control" v-model="query.SeasonID">
                        <option value="">不限</option>
                        <option v-for="opt in seasonList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>SKU</label>
                    <input v-model="query.Sku" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>尺码</label>
                    <select class="form-control" v-model="query.SizeID">
                        <option v-for="opt in sizeList" value="{{opt.PropertyID ? opt.PropertyID : ''}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>颜色</label>
                    <select class="form-control" v-model="query.ColorID">
                        <option v-for="opt in colorList" value="{{opt.PropertyID ? opt.PropertyID : ''}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>国际码</label>
                    <input v-model="query.Barcode" type="text" class="form-control" placeholder="">
                </div>
            </div>
            <div class="query-button-group">
                <a @click="submit" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                <!--<a href="javascript:void(0)" class="btn btn-default">导出商品明细</a>-->
            </div>
        </div>
    </div>
    <div class="sheet-list ">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title">批量操作:</label>
                    <div class="batch-operation-group">
                        <a href="javascript:void(0)" class="btn btn-default" @click="$dispatch('transmit', 'uploadModalShow', 1)">导入国标码</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="postStatus({BarcodeIDList: [], Status: 1}, {})">启用</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="postStatus({BarcodeIDList: [], Status: 0}, {})">禁用</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive sku-index-bd">
                    <table class="table  table-condensed panel-group" id="sheet-list" role="tablist">
                        <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state">
                                    <input type="checkbox" v-model="selectAll">
                                </th>
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>颜色</th>
                                <th>尺码</th>
                                <th>国标码</th>
                                <th>包装数</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="n in tableList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state">
                                    <input type="checkbox" v-model="n.checked">
                                </td>
                                <td>{{n.CustomBC}}</td>
                                <td>{{n.Goods.CustomNo}}</td>
                                <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{n.Goods.Name}}">
                                {{n.Goods.Name | truncationString}}</span></td>
                                <td>
                                <!--<span data-toggle="tooltip" data-placement="top" title="{{n.Color.Name}}({{n.Color.Code}})">-->

                                {{n.Color.Name  }}({{n.Color.Code }})
                                    <!--</span>-->
                                </td>
                                <td>
                                    <!--<span data-toggle="tooltip" data-placement="top" title="{{n.Size.Name}}({{n.Size.Code}})">-->
                                        {{n.Size.Name  }}({{n.Size.Code }})
                                <!--</span>-->
                                </td>
                                <td>{{n.Barcode}}</td>
                                <td>{{n.BarcodeDetail.PackQty}}</td>
                                <td>{{n.Status == 0 ? '禁用' : '启用'}}</td>
                                <td>
                                    <a data-toggle="tooltip" data-placement="top" title="修改" v-link="{name: 'sku-edit',
                                        query: {
                                            BarcodeID: n.BarcodeID,
                                            CustomBC: encodeURIComponent(n.CustomBC),
                                            Barcode: encodeURIComponent(n.Barcode),
                                            ColorID: n.ColorID,
                                            SizeID: n.SizeID,
                                            Weigh: n.BarcodeDetail ? n.BarcodeDetail.Weigh : '',
                                            Note: encodeURIComponent(n.BarcodeDetail ? n.BarcodeDetail.Note : ''),
                                            MerchantID: n.BarcodeDetail ? n.BarcodeDetail.MerchantID : '',
                                            Creater: n.BarcodeDetail ? n.BarcodeDetail.Creater : '',
                                            CreateTime: n.BarcodeDetail ? n.BarcodeDetail.CreateTime : '',
                                            Editor: n.BarcodeDetail ? n.BarcodeDetail.Editor : '',
                                            EditTime: n.BarcodeDetail ? n.BarcodeDetail.EditTime : '',
                                            PackQty: n.BarcodeDetail.PackQty,
                                            Status: n.Status
                                        }
                                    }"><span class="btn-change iconfont icon-alter"></span></a>
                                    <!-- sku 对象 n.CustomBC 值为空时 取值为 0 不然接收不到参数的路由对象找不到页面 -->
                                <a href="#!/sku/see?id={{n.BarcodeID}}&code={{encodeURIComponent(n.Goods.CustomNo)}}&name={{encodeURIComponent(n.Goods.Name)}}&sku={{encodeURIComponent(n.CustomBC || 0)}}" class="click-element" data-toggle="tooltip" data-placement="top" title="查看库存">

                                        <span class="iconfont icon-inventory"></span>
                                    </a>
                                    <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="设置">
                                        <span @click="setting(n.BarcodeID)" class="iconfont settingt"></span>
                                    </a>
                                    <a v-if="n.Status" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="禁用">
                                        <span @click="setStatus(n)" class="iconfont icon-bearsell"></span>
                                    </a>
                                    <a v-if="!n.Status" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="启用">
                                        <span @click="setStatus(n)" class="iconfont icon-play"></span>
                                    </a>
                                    <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="红包设置">
                                        <span @click="redpackge(n.BarcodeID,n.BarcodeDetail.BeginRedPack,n.BarcodeDetail.EndRedPack)" class="iconfont icon-template"></span>
                                    </a>
                                </td>
                            </tr>
                            <!-- <tr class="sheet-list-detail"> -->
                            <td colspan="12">
                                <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="sheet-list-detail{{n}}">
                                    <div class="sheet-detail-wrap">
                                        <table class="table table-condensed ">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <a href="javascript:void(0)" class="btn btn-default">+新增</a>
                                                    </th>
                                                    <th>商品名称</th>
                                                    <th>SKU</th>
                                                    <th>尺码</th>
                                                    <th>颜色</th>
                                                    <th>条形码</th>
                                                    <th>价格</th>
                                                    <th>市场价</th>
                                                    <th>单价</th>
                                                    <th>数量</th>
                                                </tr>
                                            </thead>

                                        </table>
                                    </div>
                                </div>
                            </td>
                            <!--</tr>-->
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>
</div>
    <setting-sku :></setting-sku>
    <setting-redpackge :></setting-redpackge>
</template>

<script>

var commonMethods = require('../../../js/common');

module.exports = {
    data: function() {
        return {
            server: require('../../../js/servers/servers'),
            tableList: [],
            deptList: [],
            show: {
                flog: false
            },

            colorList: [{
                Name: '不限',
                PropertyID: null
            }],
            seasonList: [{
                Name: '不限',
                PropertyID: null
            }],
            sizeList: [{
                Name: '不限',
                PropertyID: null
            }],
            query: {
                Name: '',
                CustomNo: '',
                BrandID: '',
                DeptID: '',
                SeasonID: '',
                Years: '',
                Sku: '',
                Barcode: '',
                ColorID: '',
                SizeID: '',
                Spec: '',
                Origin: '',
                Series: '',
                PackQty: '',
                Status: '',
                BarCodeIDList: []
            },
            paginationOptions: {
                cur: 1,
                all: 0,
                pageSize: 15,
                totalRecords: 0
            }
        }
    },

    computed: commonMethods.selectAll('this.tableList', function(item) {
        return item.BarcodeID;
    }),

    events: {

        'page-change': function() {
            this.postQuery();
        }

    },
    methods: {
        //收展多余的选项
        toggleItem: function () {
            this.show.flog = !this.show.flog;
        },
        // 获取分类
        getDeptList: function () {
            var relf = this;

            relf.server.getAjax({
                url: '/BaseLookup/GetDeptList',
                success: function (data) {
                    for (var i in data.Data) {
                        relf.deptList.push(data.Data[i]);
                    }
                }
            });
        },
        // 获取属性（包括颜色、尺码、季节等）
        getPropertyList: function () {
            this.server.filterList(this);
        },
        // 提交查询数据
        postQuery: function () {
            var self = this;

            this.server.postAjax({
                url: '/BasBarcode/ErpQueryBarcode',
                data: {
                    PageSize: this.paginationOptions.pageSize,
                    PageNumber: this.paginationOptions.cur,
                    SearchWhere: this.query
                },
                success: function (data) {
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
            })
        },
        postStatus: function (data, obj) {
            var self = this;

            if (data.BarcodeIDList.length === 0) data.BarcodeIDList = this.checkedGroups;
            if (data.BarcodeIDList.length === 0) return this.$dispatch('transmit', 'tip', {contentText: '请先选择SKU!'});

            this.server.postAjax.bind(this)({
                url: '/BasBarcode/UpdateStatus',
                data: data,
                success: function (data) {
                    if (data.ResultCode == 1) {
                        obj.Status = !obj.Status;
                        self.$dispatch('transmit', 'tip', {contentText: '修改成功！'});
                        self.postQuery();
                    }
                }
            });
        },
        // 点击查询按钮
        submit: function () {
            if (this.paginationOptions.cur == 1) {
                this.postQuery();
            } else {
                this.paginationOptions.cur = 1;
            }

        },
        // 修改条码
        editBarcode: function (data) {
            this.$broadcast('edit-barcode', data);
        },
        setStatus: function (obj) {
            var data = {
                BarcodeIDList: [obj.BarcodeID],
                Status: obj.Status ? 0 : 1
            };

            this.postStatus(data, obj);
        },
        resultForm: function () {
            this.query = {
                Name: '',
                CustomNo: '',
                BrandID: '',
                DeptID: '',
                SeasonID: '',
                Years: '',
                Sku: '',
                Barcode: '',
                ColorID: '',
                SizeID: '',
                Spec: '',
                Origin: '',
                Series: '',
                Status: '',
                BarCodeIDList: []
            }
        },
        //配置盒码
        setting: function (id) {
            var self = this;
            self.$broadcast('setting-sku',id);
        },
        redpackge:function(id ,begin, end){
            var self = this;
            self.$broadcast('setting-redpackge',{id,begin,end});
        },
    },
    components: {
        'editBarcode': require('./sku-edit-barcode.vue'),
        'pagination': require('../../../components/pagination.vue'),
        'settingSku': require('./setting-sku.vue'),
        'settingRedpackge': require('./setting-redpackge.vue'),
    },
    ready: function() {
        this.getDeptList();
        this.getPropertyList();
        this.submit();
    }
};



</script>
<style type="text/css" lang="less">

        .sku-index-bd{
            .table{

                tbody{
                    .sheet-list-item{
                        td{
                            border-bottom:none;
                        }
                    }

                }
            }
            .settingt:after {
                content: '\E65A';
                background: #96BEE7;
                color: #fff;
                width: 18px;
                height: 18px;
                border-radius: 2px;
                display: inline-block;
                text-align: center;
                line-height: 18px;
            }

}
</style>
