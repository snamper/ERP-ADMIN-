<template>
    <div class="container-fluid sell-scanning">
        <div class="unify-head">
            入库扫描
        </div>
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>订单号</label>
                        <input id="sheetOrDeliverySheet" v-model="query.Sheet" type="text" class="form-control" placeholder="按Enter搜索" @keyup.stop @keyup.enter.stop="search">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商品条码</label>
                        <input id="scan-customeBC" v-model="query.CustomBC" type="text" class="form-control" placeholder="按Enter搜索" @keyup.enter.stop="scan" :disabled="hasNotScanNumber==0">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-3 col-sm-3">-->
                    <!--<label>运单号</label>-->
                    <!--<input v-model="query.Delivery" type="text" class="form-control" placeholder="按Enter搜索" @keyup.enter="search">-->
                    <!--</div>-->
                    <!--<div class="form-group col-lg-3 col-md-3 col-sm-3">-->
                    <!--<input v-model="query.Type" type="checkbox" :true-value="1" :false-value="0" />&nbsp;扫描快递单号-->
                    <!--</div>-->

                </div>
                <div class="query-button-group">
                    快捷操作：
                    <a href="javascript:void(0)" class="btn btn-default" @click="skipScan" :class="{'disabled': !customerOrders.InStockID }">跳过扫描</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default" @click="cancelOrder" :class="{'disabled': !customerOrders.InStockID}" >取消订单Ctrl+Q</a>-->
                    <a href="javascript:void(0)" class="btn btn-default" @click="reScan" @keyup.s="reScan" :class="{'disabled': hasScan.length == 0 }">重新扫描S</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="pauseScan"  :class="{'disabled': !customerOrders.InStockID }">暂停扫描</a>
                    <span v-if="customerOrders.hasScaned" class="form-required-mark">扫描完成</span>
                </div>
            </div>
        </div>

        <div class="sheet-list sell-scanning-show row ">
            <div class="headline-hd">订单明细</div>
            <div class="row col-lg-6 col-md-12  col-sm-12">
                <div class="col-lg-12">
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <div class="table-hd">未扫描明细</div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>数量</th>
                                <th>商品名称</th>
                                <th>尺码</th>
                                <th>颜色</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" :class="{'hasFinish': customerOrderDetail.Qty == 0}" v-for="customerOrderDetail in customerOrders.InStock_Item_Views">
                                <td>{{customerOrderDetail.CustomBC}}</td>
                                <td>{{customerOrderDetail.CustomNo}}</td>
                                <td>{{customerOrderDetail.Qty}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrderDetail.Name}}">{{customerOrderDetail.Name  | truncationString }} </span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrderDetail.SizeName}}">{{customerOrderDetail.SizeName  | truncationString }} </span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrderDetail.ColorName}}">{{customerOrderDetail.ColorName  | truncationString }} </span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row col-lg-6 col-md-12 col-sm-12">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <div class="table-hd">已扫描明细</div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>

                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>数量</th>
                                <th>商品名称</th>
                                <th>尺码</th>
                                <th>颜色</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="customerOrderDetail in hasScan">
                                <td>{{customerOrderDetail.CustomBC}}</td>
                                <td>{{customerOrderDetail.CustomNo}}</td>
                                <td>{{customerOrderDetail.ScanQty}}</td>
                                <td>{{customerOrderDetail.Name}}</td>
                                <td>{{customerOrderDetail.SizeName}}</td>
                                <td>{{customerOrderDetail.ColorName}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="sheet-list sell-scanning-show row ">
            <div class="headline-hd">扫描记录</div>
            <div class="row col-lg-12 col-md-12  col-sm-12">
                <div class="col-lg-12"></div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>入库单号</th>
                                <th>业务类型</th>
                                <th>上游单号</th>
                                <th>外部机构</th>
                                <th>收货人</th>
                                <th>联系电话</th>
                                <th>收货区域</th>
                                <th>收货地址</th>
                                <th>快递公司</th>
                                <th>运单号</th>
                                <th>支付方式</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="customerOrder in allCustomerOrders" @click="selectCustomerOrder(customerOrder)">
                                <td>{{customerOrder.Sheet}}</td>
                                <td>{{customerOrder.TransferType | transferTypeToName baseLookUp.transferType}}</td>
                                <td>{{customerOrder.UpSheet}}</td>
                                <td>{{customerOrder.InName}}</td>
                                <td>{{customerOrder.LinkMan}}</td>
                                <td>{{customerOrder.Mobile}}{{customerOrder.Mobile && customerOrder.Phone ? ',' : '' }}{{customerOrder.Phone}}</td>
                                <td>{{customerOrder.Country ? customerOrder.Country +',': ''}}{{customerOrder.State ? customerOrder.State : ''}}{{customerOrder.City ? ',' + customerOrder.City : ''}}{{customerOrder.District ? ',' + customerOrder.District : ''}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Address}}">{{customerOrder.Address  | truncationString }} </span></td>
                                <td>{{customerOrder.Name}}</td>
                                <td></td>
                                <td>{{customerOrder.PayMode | payModelCodeToText baseLookUp.payLists}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    var NProgress = servers.NProgress;
    module.exports = {
//        data: function () {
//            return {
//                query: {
//                    MerchantID: '',
//                    Sheet: '',
//                    CustomBC: '',
//                    UpSheet: ''
//                },
//                hasScan: [],  //已经扫描的商品
//                customerOrders: {},
//                allCustomerOrders: [],
//                baseLookUp: {
//                    payLists: [],
//                    transferType: []
//                }
//            }
//        },
        vuex: {
           actions: {
               updateInstorageScanQuery: actions.updateInstorageScanQuery,
               updateInstorageScanHasScan: actions.updateInstorageScanHasScan,
               updateInstorageScanCustomerOrders: actions.updateInstorageScanCustomerOrders,
               updateInstorageScanAllCustomerOrders: actions.updateInstorageScanAllCustomerOrders,
               updateInstorageScanBaseLookUp: actions.updateInstorageScanBaseLookUp
           },
            getters: {
                getInstorageScanQuery: getters.getInstorageScanQuery,
                getInstorageScanHasScan: getters.getInstorageScanHasScan,
                getInstorageScanCustomerOrders: getters.getInstorageScanCustomerOrders,
                getInstorageScanAllCustomerOrders: getters.getInstorageScanAllCustomerOrders,
                getInstorageScanBaseLookUp: getters.getInstorageScanBaseLookUp
            }
        },
        methods: {
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.payLists = val;
                });
                //业务类型
                servers.getBaseData('TransferType',false,function (val) {
                    baseLookUp.transferType = val;
                });
            },
            //获取订单数据
            getOrders: function () {
                var self = this;
                var query = self.query;
                //清空数据
                self.hasScan = [];
                self.customerOrders = {};
//                if (query.Flag == 1) {
                if (!query.Sheet) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入订单号!'
                    });
                    return ;
                }
//                } else {
//                    if (!query.Delivery) {
//                        if (!query.Sheet) {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示:',
//                                contentText: '请输入运单号!'
//                            });
//                            return ;
//                        }
//                    }
//                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusInStock/ErpQueryBySheet',
                    data: {
                        _Sheet: query.Sheet
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        if (result.Data) {
                            var customerOrders = result.Data;
                            if (customerOrders.Flag == 97 || customerOrders.Flag == 100) {
                                self.$dispatch('transmit','tip',{contentText: '该订单已完成扫描，请确认订单号后再重新输入！'});
                            } else {
                                var customerDetail = customerOrders.InStock_Item_Views;
                                customerDetail.forEach(function (item) {
                                    item._Qty = item.Qty;
                                    item.ScanQty = 0;
                                    item.hasScaned = false;
                                });
                                customerOrders.hasScanItem = [];
                                self.customerOrders = customerOrders;
//                                self.allCustomerOrders.push(customerOrders);
//                                self.customerOrders = self.allCustomerOrders[self.allCustomerOrders.length - 1];
                                document.getElementById('scan-customeBC').focus();
                            }
                        }
                    }
                })
            },
            //搜索,获取订单数据
            search: function () {
                this.getOrders();
            },
            //通过商品条码扫描,扫描后将商品条码置空
            scan: function () {
                this.scanCustomBC = this.query.CustomBC;
                this.scanCustomBC = this.query.CustomBC = '';
            },
            //重新扫描,将已扫描置空,将未扫描的数量置为初始数量
            reScan: function () {
                if (this.hasScan.length > 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要重新扫描吗?',
                        btnName: '重新扫描',
                        events: {
                            confirm: 'reScan'
                        }
                    });
                    this.$off('reScan');
                    this.$once('reScan',function () {
                        this.hasScan = [];
                        this.customerOrders.InStock_Item_Views.forEach(function (item) {
                            item.Qty = item._Qty;
                            item.hasScaned = false;
                        });
                        this.customerOrders.hasScanItem = [];
                    })
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '没有需要重新扫描的订单?',
                        btnName: '确定'
                    });
                }
            },
            //重置数据
            resetData: function () {
                this.query = {
                    MerchantID: '',
                    Sheet: '',
//                    Delivery: '',
//                    Type: 1,
                    CustomBC: '',
                    UpSheet: ''
                };
                this.hasScan = []; //已经扫描的商品
                this.customerOrders = {};
            },
            //取消订单
//            cancelOrder: function () {
//                var self = this;
//                self.$dispatch('transmit','tip',{
//                    name: '提示:',
//                    contentText: '确定要取消订单吗?',
//                    btnName: '取消订单',
//                    events: {
//                        confirm: 'cancelOrder'
//                    }
//                });
//                self.$once('cancelOrder',function () {
//                    var outStockIDGroup = [];
//                    if (self.customerOrders.InStockID) {
//                        outStockIDGroup.push(self.customerOrders.InStockID);
//                    }
//                    NProgress.start();
//                    if (outStockIDGroup.length > 0) {
//                        servers.postAjax.bind(this)({
//                            url: '/DeliverGoods/ErpStockOrderSave_Cancel',
//                            contentType: 'application/json',
//                            data: JSON.stringify(outStockIDGroup)
//                        }).done(function (result) {
//                            NProgress.done();
//                            if (result.ResultCode == 1) {
//                                self.hasScan = [];
//                                self.$dispatch('transmit','tip',{
//                                    name: '提示:',
//                                    contentText: '取消成功',
//                                    cancelBtnShow: false
//                                });
//                                self.$route.router.go({name:'delivery-pick'});
//                            }
//                        })
//                    }
//                });
//            },
            //确定出库
            stockOrderSavesWeigh: function () {
                var self = this;
//                debugger;
                if (self.hasNotScanNumber > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '还有没有扫描的订单'
                    });
                    return ;
                } else {
                    self.stockOrderSaveWeighAjax();
                }
            },
            stockOrderSaveWeighAjax: function () {
                var self = this;
//                var outStockIDGroup = [];
//                outStockIDGroup.push(self.customerOrders.InStockID);
                if (!self.customerOrders.InStockID) {
                    return ;
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusInStock/ScannInStock',
                    contentType: 'application/json',
                    data: {
                        InStockID: self.customerOrders.InStockID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.customerOrders.hasScaned = true;
                        self.allCustomerOrders.push(self.customerOrders);
                        self.resetData();
                        document.getElementById('sheetOrDeliverySheet').focus();
//                            self.$dispatch('transmit','tip',{
//                                name: '提示:',
//                                contentText: '扫描成功'
//                            });
                    }
                })
            },
            //跳过扫描
            skipScan: function () {
                this.stockOrderSaveWeighAjax();
            },
            //暂停扫描
            pauseScan: function () {
                if (this.customerOrders.hasScaned) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '此订单已经出库,不可以再暂停扫描!'
                    });
                } else {
//                    this.allCustomerOrders.$remove(this.customerOrders);
                    this.customerOrders = {};
                    this.resetData();
                }
            },
            //选择订单
            selectCustomerOrder: function (customerOrder) {
                this.customerOrders = customerOrder;
                this.hasScan = customerOrder.hasScanItem;
            }
        },
        computed: {
            query: {
                get: function () {
                    return this.getInstorageScanQuery;
                },
                set: function (query) {
                    this.updateInstorageScanQuery(query);
                }
            },
            hasScan: {
                get: function () {
                    return this.getInstorageScanHasScan;
                },
                set: function (hasScan) {
                    this.updateInstorageScanHasScan(hasScan);
                }
            },
            customerOrders: {
                get: function () {
                    return this.getInstorageScanCustomerOrders;
                },
                set: function (customerOrders) {
                    this.updateInstorageScanCustomerOrders(customerOrders);
                }
            },
            allCustomerOrders: {
                get: function () {
                    return this.getInstorageScanAllCustomerOrders;
                },
                set: function (allCustomerOrders) {
                    this.updateInstorageScanAllCustomerOrders(allCustomerOrders);
                }
            },
            baseLookUp: {
                get: function () {
                    return this.getInstorageScanBaseLookUp;
                },
                set: function (baseLookUp) {
                    this.updateInstorageScanBaseLookUp(baseLookUp);
                }
            },
            //更改已扫描和未扫描数量
            scanCustomBC: {
                set: function (value) {
                    if ( value ) {
                        var isHasCustomBC = false;  //是否存在该CustomBc
                        var self = this;
                        var isInHasScan = false;   //该SKU是否已经存在于已扫描明细中
                        var customerDetail = this.customerOrders.InStock_Item_Views;
                        customerDetail.forEach(function (item) {      //遍历未扫描明细
                            if (item.CustomBC == value) {    //如果输入的SKU存在于未扫描明细中,且数量大于0,则数量减1
                                isHasCustomBC = true;
                                if ( item.Qty > 0 ) {
                                    item.Qty--;
                                    self.hasScan.forEach(function (hasScanItem) {   //遍历已扫描明细
                                        if ( hasScanItem.CustomBC == value ) {   //如果已扫描明细已经存在该SKU,则数量加1,并将状态设为true
                                            hasScanItem.ScanQty++;
                                            isInHasScan = true;
                                        }
                                    });
                                    if (!isInHasScan) {             //如果该SKU没有存在于已扫描明细中,则将数量设为1,并将其存入已扫描明细
                                        var temp = item;
                                        temp.ScanQty = 1;
                                        self.hasScan.push(temp);
                                        self.customerOrders.hasScanItem.push(temp);
                                    }
                                } else {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '此商品已经扫描完毕'
                                    });
                                }
                            }
                        });
                        if (!isHasCustomBC) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '该订单中没有包含该商品'
                            });
                        }
                    }

                    return value;
                }
            },
            //还没有扫描的数量
            hasNotScanNumber: {
                get: function (val) {
                    var totalNum = 0;
                    var customerDetail = this.customerOrders.InStock_Item_Views;
                    if (this.customerOrders.hasScaned) {
                        return  ;
                    }
                    if (customerDetail && customerDetail.length > 0) {
                        customerDetail.forEach(function (item) {
                            totalNum = totalNum + item.Qty;
                        });
                    } else if (!customerDetail) {
                        return ;
                    }
                    return totalNum;
                }
            }
        },
        watch: {
            'hasNotScanNumber': function (val,oldVal) {
                if (val == 0) {
                    this.stockOrderSavesWeigh();
                }
            }
        },
        ready: function () {
            var self = this;
            this.getBaseData();

            $(document).on('keydown',function (event) {
                if (event.ctrlKey && event.keyCode == 13) {
                    if (!self.hasNotScanNumber && self.customerOrders.InStockID) {
                        self.stockOrderSavesWeigh();
                    }
                } else if (event.ctrlKey && event.keyCode == 81) {
                    if (self.customerOrders.InStockID) {
                        self.cancelOrder();
                    }
                } else if (event.keyCode == 83) {
                    if (self.hasScan.length > 0) {
                        self.reScan();
                    }
                }
            })
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .sell-scanning{
        .form-group{
            line-height:20px;
        }
        .sell-scanning-hd{
            font-size: 14px;
            color:#4D68AD;
            line-height:34px;
            text-indent:2em;
        }
        .query-button-group{
            padding-left: 32px;
            .btn-default{
                margin-right:5px;
            }
        }

        .sell-num{
            border: 1px solid #E5E5E5;
            margin-top:20px;
            .sell-num-hd{

                text-indent:2em;
                border-bottom: 1px solid #E5E5E5;
                line-height:38px;
                font-weight:bold;
                i{
                    margin-left:30px;
                    font-style:normal;
                }

                em{
                    font-weight:300;
                }

            }
            .sell-num-show{
                padding:20px;
                padding-bottom:5px;
                line-height:38px;
                table{
                    border: 1px solid #E5E5E5;
                }
                td{
                    border: 1px solid #E4E4E4;
                    border-bottom:1px dashed #E4E4E4;
                    border-top:1px dashed #E4E4E4;

                }
                .col-lg-1{
                    text-align:right;
                    color:#656565;
                }
                .col-lg-5{
                    color:#323232;
                }
            }
        }



        .sell-scanning-show{
            border: 1px solid #E5E5E5;
            margin: 20px 0px;

            .headline-hd{
                margin-bottom: 10px;
                border:none;
                border-bottom:1px solid #E5E5E5;


            }
            .table-hd{
                color:#323232;
                line-height:30px;
                font-size: 14px;
            }
            table{
                border:1px solid #E5E5E5;
                line-height:40px;
                margin-bottom:20px;
                text-align:center;
                border-left:none;
                border-bottom:none;

                td{
                    border: 1px solid #E4E4E4;
                    border-bottom:1px dashed #E4E4E4;
                    border-top:1px dashed #E4E4E4;
                    border-right:none;
                    color:#323232;
                    line-height:28px;

                }

            }
            .sheet-list-header{
                th{
                    border: 1px solid #E4E4E4;
                    text-align:center;
                    border-right:none;
                    color:#656565;
                }
            }
        }
        .hasFinish {
            background: #d8d8d8;
        }


    }

</style>