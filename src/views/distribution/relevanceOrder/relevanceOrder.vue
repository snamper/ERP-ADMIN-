<template>
    <div class="container-fluid">
        <div class="unify-head">
            关联销售订单
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        关联销售订单
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.SheetList | arrayToString" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">关联条码</label>
                        <select v-model="query.Flag" class="form-control">
                            <option value="null">不限</option>
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-start'>
                                <input v-model="query.BeginTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date | formatDate' id='edit-timepicker-end'>
                                <input v-model="query.EndTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>收货人</label>
                        <input v-model="query.LinkMan" type="text" class="form-control">
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <label>批量操作：</label>
                            <a @click="autoRelevance" href="javascript:void(0)" class="btn btn-default">自动匹配</a>
                            <!--<a href="javascript:void(0)" class="btn btn-default">打印标签</a>-->
                            <!--<a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">导入条码</a>-->
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>匹配订单（带扫描订单）</th>
                                    <th>SKU数</th>
                                    <th>明细数</th>
                                    <th>关联条码</th>
                                    <th>修改人</th>
                                    <th>修改时间</th>
                                    <th>收货人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="order in orderAfterCompletedSku" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state"><input type="checkbox" v-model="order.checked">
                                    </td>
                                    <td class="show-detail-ctrl collapsed"
                                        data-toggle="collapse" data-parent="#sheet-list"
                                        data-target="#{{order.Sheet}}"
                                        @click="queryDetail(order)"
                                    >
                                        <span class="iconfont icon-alter"></span><span>{{order.Sheet}}</span>
                                    </td>
                                    <td>{{order.Count}}</td>
                                    <td>{{order.Qty}}</td>
                                    <td class="state-forbid" >{{order.Flag ? '是' : '否'}}</td>
                                    <!--<td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>-->
                                    <td>{{order.Editor}}</td>
                                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>-->
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{order.EditTime | truncationTimeString}}">{{order.EditTime | formatDateFormShow}}</span></td>
                                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>-->
                                    <td>{{order.LinkMan}}</td>
                                    <td>
                                        <a @click="relevanceCode(order)" data-toggle="tooltip" data-placement="top" title="关联条码">
                                            <span class="click-element iconfont icon-combo"></span>
                                        </a>
                                        <a @click="modify(order)" data-toggle="tooltip" data-placement="top" title="批量关联">
                                            <span class="click-element iconfont icon-alter"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="16">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                             id="{{order.Sheet}}">
                                            <div class="sheet-detail-wrap">
                                                <table class="table">
                                                    <thead class="sheet-list-header">
                                                    <tr>
                                                        <th>SKU</th>
                                                        <th>商品名称</th>
                                                        <th>箱码</th>
                                                        <th>操作</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="saleOrder in order.SaleOrderItem | orderBy 'CustomBC'">
                                                            <td>{{saleOrder.CustomBC}}</td>
                                                            <td>{{saleOrder.GoodsName}}</td>
                                                            <td>{{saleOrder.BoxCode}}</td>
                                                            <td><a  href="javascript:void(0)" @click="searchBoxCode(saleOrder)" v-if="saleOrder.BoxCode">查看盒码和防伪码</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <model-relevance-code></model-relevance-code>
    <modify></modify>
    <model-box-code></model-box-code>
</template>


<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
                    BeginTime: '',
                    EndTime: '',
                    Editor: '',
                    Flag: 'null', // 0否,1不限,null不限
                    SheetList: [],  // 订单号
                    LinkMan:'',//收货人
                },
                orders: [],  // 订单列表
                pageInfo: {
                    fileType: 34
                }
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit', 'uploadModalShow', this.pageInfo.fileType);
            },
            // 获取列表
            getOrders: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQuerySaleOrder',
                    data: {
                        PageNumber: this.paginationOptions.cur,
                        PageSize: this.paginationOptions.pageSize,
                        SearchWhere: this.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.orders = [];
                        var orders = result.Data.PageData;
                        if (orders.length > 0) {
                            orders.forEach(function (order) {
                                order.checked = false;
                                order.SaleOrderItem = [];
                            })
                        }
                        self.orders = orders;
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    }
                })
            },
            // 获取详情
            queryDetail: function (order,callback) {
                if (order.SaleOrderItem && order.SaleOrderItem.length > 0) return;
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQueryDetail',
                    data: {
                        SheetID: order.SheetID
                    }
                }).then(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        order.SaleOrderItem = result.Data;
                        if (callback) {
                            callback();
                        }
                    }
                })
            },
            // 自动匹配
            autoRelevance: function () {
                var self = this;
                if (this.checkedGroups.length > 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要自动匹配吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'autoRelevance'
                        }
                    });
                    this.$off('autoRelevance');

                    this.$once('autoRelevance',function () {
                        var checkedGroups = this.checkedGroups;
                        var outStockIDList = checkedGroups.map(function (item) {
                            return item.OutStockID
                        });
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasQRCode/ErpMatchQRCodeByOutStockID',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockIDList)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '自动匹配成功!'
                                });
                            }
                        })
                    });

                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一张订单!'
                    });
                }
            },
            //关联订单
            upBalance: function () {
                var self = this;
                self.modal.show = true;
                self.modal.title = '关联订单';

            },
            //查看盒码和防伪码
            searchBoxCode: function (saleOrder) {
                this.$broadcast('model-box-code', saleOrder);
            },
            // 关联订单
            relevanceCode: function (order) {
                var self = this;
                if (order.SaleOrderItem && order.SaleOrderItem.length > 0) {
                    self.$broadcast('model-relevance-code', order.SaleOrderItem, order.QRCodeID);
                } else {
                    this.queryDetail(order,function () {
                        self.$broadcast('model-relevance-code', order.SaleOrderItem, order.QRCodeID);
                    });
                }
            },
            // 获取关联条码信息
            queryDetailCode: function (order,callback) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQueryQrCodeDetail',
                    data: {
                        OutStockID: order.OutStockID
                    }
                }).then(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        order.SaleOrderItem = result.Data;
                        if (callback) {
                            callback();
                        }
                    }
                })
            },
            // 修改功能
            modify: function (order) {
                var self = this;
                // if (order.SaleOrderItem && order.SaleOrderItem.length > 0) {
                    this.queryDetailCode(order,function () {
                        self.$broadcast('modify', order.SaleOrderItem, order.OutStockID);
                    });
                // } 
            },
            // 重置表单
            resetForm: function () {
                this.query = {
                    BeginTime: '',
                    EndTime: '',
                    Editor: '',
                    Flag: null, // 0否,1不限,null不限
                    SheetList: []  // 订单号
                };
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getOrders();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getOrders();
            }
        },
        computed: {
            //全选
            selectAll: {
                get: function() {
                    return this.selectCount == this.orders.length;
                },
                set: function(value) {
                    this.orders.forEach(function(item) {
                        item.checked = value;
                    });
                    return value;
                }
            },
            //选中的数量
            selectCount: {
                get: function() {
                    var i = 0;
                    this.orders.forEach(function(item) {
                        if (item.checked) {
                            i++;
                        }
                    });
                    return i;
                }
            },
            //选中的订单数组
            checkedGroups: {
                get: function() {
                    var checkedGroups = [];
                    this.orders.forEach(function(item) {
                        if (item.checked) {
                            checkedGroups.push(item);
                        }
                    });
                    return checkedGroups;
                }
            },
            // 补全SKU
            orderAfterCompletedSku: {
                get: function () {
                    var orders = this.orders;
                    orders.forEach(function (order) {
                        var skus = [];   // 所有不同的SKU
                        var saleOrderItem = order.SaleOrderItem;
                        if (saleOrderItem && saleOrderItem.length > 0) {
                            saleOrderItem.forEach(function (saleOrder) {
                                if (!saleOrder.BoxCode) {
                                    saleOrder.IsNewBoxCode = true;
                                }
                                var inSkuLength = skus.filter(function (sku) {  // 在skus中的数量
                                    if (sku.CustomBC === saleOrder.CustomBC) {
                                        sku.HasQty++;   // 相同SKU的数量计数器
                                    }
                                    return sku.CustomBC === saleOrder.CustomBC;
                                }).length;
                                if (inSkuLength === 0) {   // 如果skus中不存在
                                    skus.push({
                                        CustomBC: saleOrder.CustomBC,
                                        HasQty: 1,
                                        Qty: saleOrder.Qty,
                                        BoxCode: '',
                                        GoodsName: saleOrder.GoodsName,
                                        BarcodeID: saleOrder.BarcodeID,
                                        Sheet: saleOrder.Sheet,
                                        SheetID: saleOrder.SheetID,
                                        CustomerID: saleOrder.CustomerID,
                                        Note: saleOrder.Note,
                                    });
                                }
                            });
                            // 补全SKU
                            skus.forEach(function (sku) {
                                for (var i = 0, len = sku.Qty - sku.HasQty; i < len; i++) {
                                    saleOrderItem.push({
                                        CustomBC: sku.CustomBC,
                                        Qty: sku.Qty,
                                        BoxCode: '',
                                        _BoxCode: '',
                                        GoodsName: sku.GoodsName,
                                        BarcodeID: sku.BarcodeID,
                                        Sheet: sku.Sheet,
                                        SheetID: sku.SheetID,
                                        CustomerID: sku.CustomerID,
                                        Note: sku.Note,
                                        IsNewBoxCode: true
                                    })
                                }
                            })
                        }
                    });
                    return orders;
                },
                set: function (orders) {
                    this.orders = orders;
                }
            }
        },
        route: {
            data(transition) {
                this.getOrders();
                transition.next();
            }
        },
        ready: function () {
            //dateTimePicker
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#edit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#edit-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#edit-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#edit-timepicker-start').datetimepicker('setEndDate',e.date);
            });
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            modelBoxCode:require('./modelBoxCode.vue'),
            modelRelevanceCode:require('./modelRelevanceCode.vue'),
            modify:require('./modify.vue'),
//            modalClientBalance: require('./components/modal-balance-account.vue'),
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    .order-tip {
        .top-text {
            padding-left: 15px;
        }
        .detail {
            margin-top: 20px;
        }
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>

