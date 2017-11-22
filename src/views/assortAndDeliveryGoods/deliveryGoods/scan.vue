<template>
    <div class="container-fluid sell-scanning">
        <div class="unify-head">
            扫描出库
        </div>
        <div class="query-form">
            <didi v-ref:didi></didi>
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group checkbox">
                        <label>扫描方式</label>
                        <div class="radio">
                            <label class="radio-inline">
                                <input v-model="printType" value="common" type="radio" name="scanType"> 普通打单
                            </label>
                            <label class="radio-inline">
                                <input v-model="printType" value="back" type="radio" name="scanType"> 后置打单(适用于一单一货,自动打印快递单)
                            </label>
                            <label class="radio-inline">
                                <input v-model="printType" value="three" type="radio" name="scanType"> 分销出货
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="printType == 'common'">
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>出库单号</label>
                        <input id="sheetOrDeliverySheet" v-model="query.Sheet" type="text" class="form-control" placeholder="按Enter搜索" @keyup.stop @keyup.enter.stop="searchBySheet">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商品条码</label>
                        <input id="scan-customeBC"  @keyup.enter.stop="scan" :disabled="hasNotScanNumber==0" v-model="query.CustomBC" type="text" class="form-control" placeholder="用回车确认">
                    </div>
                </div>
                <div class="row" v-if="printType == 'back'">                
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商家快递</label>
                        <select class="form-control" v-model="query.MerchantDeliveryID">
                            <option value="">请选择快递公司</option>
                            <option value="{{merchantDeliveryList.MerchantDeliveryID}}" v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">{{merchantDeliveryList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商品条码</label>
                        <input  @keyup.enter.stop="searchByCustomBC"  v-model="query.CustomBC" type="text" class="form-control" placeholder="用回车确认">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>快递单</label>
                        <input v-model="customerOrders.DeliverySheetID" type="text" class="form-control" disabled="disabled">
                    </div>
                    <div class="form-group checkbox">
                        <div class="checkbox">
                            <label class="checkbox-inline">
                                <input v-model="isPrintDelivery" type="checkbox"> 打印快递单
                            </label>
                            <label class="checkbox-inline">
                                <input v-model="isPrintPack" type="checkbox"> 打印装箱单
                            </label>
                            <label for="autoPrint" class="checkbox-inline">
                                <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="printType == 'three'">
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>出库单号</label>
                        <input id="sheetOrDeliverySheet" v-model="query.Sheet" type="text" class="form-control" placeholder="按Enter搜索" @keyup.stop @keyup.enter.stop="searchBySheet">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商品条码</label>
                        <input id="scan-customeBC" @keyup.enter.stop="toCodeB"  :disabled="hasNotScanNumber==0" v-model="query.CustomBC" type="text" class="form-control" placeholder="用回车确认">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>关联大/小码</label>
                        <input id="scan-codeB"  @keyup.enter.stop="RCode"  v-model="query.BoxCode | scanBoxCode" type="text" class="form-control" placeholder="用回车确认">
                    </div>
                </div>
                <div class="query-button-group">
                    快捷操作：
                    <a href="javascript:void(0)" class="btn btn-default" @click="skipScan" :class="{'disabled': !customerOrders.OutStockID }">跳过扫描</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default" @click="cancelOrder" :class="{'disabled': !customerOrders.OutStockID}" >取消订单Ctrl+Q</a>-->
                    <a href="javascript:void(0)" class="btn btn-default" @click="reScan" @keyup.s="reScan" >重新扫描</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="pauseScan"  :class="{'disabled': !customerOrders.OutStockID }">暂停扫描</a>
                    <!--<span v-if="customerOrders.hasScaned" class="form-required-mark">扫描完成</span>-->
                    <a @click="printPack" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': allCustomerOrders.length == 0 }">打印装箱单</a>
                    <a @click="printDelivery" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': allCustomerOrders.length == 0 }">打印快递单</a>
                    <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
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
                            <tr class="sheet-list-item" :class="{'hasFinish': customerOrderDetail.Qty == 0}" v-for="customerOrderDetail in customerOrders.OutStockItem">
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
            <div class="headline-hd scan-record">
                <span>扫描记录</span>
                <a @click="clearRecord" href="javascript:void(0)" class="btn btn-default btn-clear">清空记录</a>
            </div>
            <div class="row col-lg-12 col-md-12  col-sm-12">
                <div class="col-lg-12"></div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>出库单号</th>
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
                                <td>{{customerOrder.Country ? customerOrder.Country+',' : ''}}{{customerOrder.State ? customerOrder.State : ''}}{{customerOrder.City ? ',' + customerOrder.City : ''}}{{customerOrder.District ? ',' + customerOrder.District : ''}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Address}}">{{customerOrder.Address  | truncationString }} </span></td>
                                <td>{{customerOrder.Name}}</td>
                                <td>{{customerOrder.DeliverySheetID}}</td>
                                <td>{{customerOrder.PayMode | payModelCodeToText baseLookUp.payLists}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var Didi = require('../../../components/didi.vue');
    import { cloneDeep } from 'lodash'
    module.exports = {
        vuex: {
            actions: {
                updateScanAutoPrint: actions.updateScanAutoPrint,
                updateScanQuery: actions.updateScanQuery,
                updateScanPrintType: actions.updateScanPrintType,
                updateScanIsPrintDelivery: actions.updateScanIsPrintDelivery,
                updateScanIsPrintPack: actions.updateScanIsPrintPack,
                updateScanHasScan: actions.updateScanHasScan,
                updateScanCustomerOrders: actions.updateScanCustomerOrders,
                updateScanAllCustomerOrders: actions.updateScanAllCustomerOrders,
                updateScanBaseLookUp: actions.updateScanBaseLookUp
            },
            getters: {
                getScanAutoPrint: getters.getScanAutoPrint,
                getScanQuery: getters.getScanQuery,
                getScanPrintType: getters.getScanPrintType,
                getScanIsPrintDelivery: getters.getScanIsPrintDelivery,
                getScanIsPrintPack: getters.getScanIsPrintPack,
                getScanHasScan: getters.getScanHasScan,
                getScanCustomerOrders: getters.getScanCustomerOrders,
                getScanAllCustomerOrders: getters.getScanAllCustomerOrders,
                getScanBaseLookUp: getters.getScanBaseLookUp
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
                //商家快递
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
            },
            focusCustomBCForm: function () {
                document.getElementById('scan-customeBC').focus();
            },
            focusOderForm: function() {
                document.getElementById('sheetOrDeliverySheet').focus();
            },
            focusCodeBForm: function() {
                document.getElementById('scan-codeB').focus();
            },
            toCodeB: function() {
                var self = this;
                if (this.query.CustomBC) {
//                    debugger;
//                    self.scanCustomBC = self.query.CustomBC;
                    self.focusCodeBForm();
                    self.playNoticeGoodSuccess()
                } else {
                    self.playNoticeError()
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请填写商品条码'
                    });
                }
//                document.getElementById('scan-codeB').focus();

            },
            //打印订单
            printPack: function () {
                var sheetList = [];
                if (this.customerOrders && this.customerOrders.OutStockBatchSheet) {
                    sheetList.push(this.customerOrders.OutStockBatchSheet);
                    var sheetListStr = JSON.stringify(sheetList);
                    localStorage.printPackSheetList = sheetListStr;
                    localStorage.upSheetList = [];
                    window.open('#!/print-pack?BusinessType=1' + '&autoPrint=' + this.autoPrint);
                } else {
                    this.$dispatch('transmit','tip',{contentText: '请选中订单后再打印'});
                }
            },
            //打印快递单
            printDelivery: function () {
                if (this.customerOrders) {
                    var sheet = this.customerOrders.OutStockBatchSheet;
                    var DeliverySheetID = this.customerOrders.DeliverySheetID;
                    var MerchantDeliveryID = this.customerOrders.MerchantDeliveryID;
                    var PayMode = this.customerOrders.PayMode;
                    var ShopID = this.customerOrders.InID;
                    var sheetList = [];
                    if (sheet) {
                        if (DeliverySheetID) {
                            if (MerchantDeliveryID) {
                                sheetList.push(sheet);
                                var sheetListStr = JSON.stringify(sheetList);
                                localStorage.printDeliveryList = sheetListStr;
                                window.open('#!/print-delivery?BusinessType=3' + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint);
                            } else {
                                this.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '选中的订单中没有选择快递公司!'
                                });
                            }

                        } else {
                            this.$dispatch('transmit','tip',{contentText: '没有运单号,不可打印'});
                        }
                    } else {
                        this.$dispatch('transmit','tip',{contentText: '请选中需要打印的订单'});
                    }
                } else {
                    this.$dispatch('transmit','tip',{contentText: '请选中需要打印的订单'});
                }
            },
            //打印
            print: function () {
                this.scan();
                if (this.isPrintDelivery) {
                    this.printDelivery();
                }
                if (this.isPrintPack) {
                    this.printPack();
                }
            },
            //获取后置打单数据
            searchByCustomBC: function () {
                var url = '/DeliverGoods/ErpQueryOutStock';
                var query = this.query;
                if (!query.MerchantDeliveryID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请选择快递!'
                    });
                    this.playNoticeError()
                    return ;
                }
                if (!query.CustomBC) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入商品条码!'
                    });
                    this.playNoticeError()
                    return ;
                }
                var searchData = {
                    MerchantDeliveryID: query.MerchantDeliveryID,
                    CustomBC: query.CustomBC
                };
                this.searchAjax(url,searchData,this.print);
            },
            //获取前置打单数据
            searchBySheet: function () {
                var url = '/DeliverGoods/ErpSheetOrDeliveryQuery';
                var query = this.query;
                if (!query.Sheet) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入订单号!'
                    });
                    this.playNoticeError()
                    return ;
                }
                var searchData = {
                    Sheet: query.Sheet
                };
                this.searchAjax(url,searchData,this.focusCustomBCForm);
            },
            //搜索请求
            searchAjax: function (method,data,callback) {
                var self = this;
                //清空数据
                self.hasScan = [];                
                self.customerOrders = {};
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: method,
                    data: data
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        if (result.Data) {
                            var customerOrders = result.Data;
                            if (customerOrders.Flag == 92) {
                                self.playNoticeError()
                                self.$dispatch('transmit','tip',{contentText: '该订单已完成扫描，请确认订单号/运单号后，再重新输入！'});
                            } else if (customerOrders.Flag == 0 || customerOrders.Flag == 10 || customerOrders.Flag == 97 || customerOrders.Flag == 100) {
                                self.playNoticeError()
                                self.$dispatch('transmit','tip',{contentText: '暂无该订单，请确认订单号/运单号正后，再重新输入'});
                            } else {
                                var customerDetail = customerOrders.OutStockItem;
                                customerDetail.forEach(function (item) {
                                    item._Qty = item.Qty;
                                    item.ScanQty = 0;
                                    item.hasScaned = false;
                                });

                                customerOrders.hasScanItem = [];
//                                self.allCustomerOrders.push(customerOrders);
                                self.customerOrders = customerOrders;
                                callback();
                                self.playNoticeOrderSuccess()
                            }
                        }
                    } else {
                        self.playNoticeError()
                    }
                }).fail(function () {
                    self.playNoticeError()
                })
            },
            oSearch: function () {
//                var self = this;
//                console.log(self.barDataList);
//                var barID = self.barDataList.filter((item) => {
//                    return item.CustomBC == self.query.CustomBC;
//                })
//                self.data.BarcodeID = barID[0].BarcodeID
//                console.log(self.BarcodeID);
            },
            RCode: function () {
                var self = this;
//                var OutStockItem = this.customerOrders.OutStockItem
                var OutStock = self.customerOrders;
                var Sheet = OutStock.UpSheet;
                var SheetID = OutStock.UpSheetID;
                var barID = OutStock.OutStockItem.filter((item) => {
                    return item.CustomBC == self.query.CustomBC
                });
                var id = barID[0].BarcodeID;
                var data = [{
                    BarcodeID: id,
                    BoxCode: self.query.BoxCode,
                    Sheet: Sheet,
                    SheetID: SheetID,
                    Note:''
                }]
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpOrderMatch',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                            self.scan();
                            self.playNoticeOrderSuccess()
//                        if
                    } else {
                        self.playNoticeError()
                    }
                }).fail(function() {
                    self.playNoticeError()
                })

            },
            //通过商品条码扫描,扫描后将商品条码置空
            scan: function () {
//                debugger;
                var self = this;
                self.scanCustomBC = self.query.CustomBC;
                self.scanCustomBC = self.query.CustomBC = '';


//                if (self.printType == 'three' || self.printType == 'common') {
//                    if (self.hasNotScanNumber == 0) {
//                        self.resetData();
//                        self.scanCustomBC = '';
//                        self.focusOderForm();
//                    } else {
//
//                        this.query = {
//                            Sheet: this.query.Sheet,
//                            CustomBC: '',
//                            UpSheet: this.query.UpSheet,
//                            BoxCode: '',
//                            MerchantDeliveryID: this.query.MerchantDeliveryID,
//                        };
//                        console.log(self.query + 'ceshi2');
//                        self.focusCustomBCForm();
//                    }
//                }


            },
            scanSuccess: function () {
                this.playNoticeGoodSuccess()
                var self = this;
                if (self.hasNotScanNumber == 0) {
                    self.$nextTick(function () {
                        self.resetData();
                        self.focusOderForm();
                    })
                } else if (self.printType == 'three') {
                    this.query = {
                        Sheet: this.query.Sheet,
                        CustomBC: '',
                        UpSheet: this.query.UpSheet,
                        BoxCode: '',
                        MerchantDeliveryID: this.query.MerchantDeliveryID,
                    };
                    self.$nextTick(function () {
                        self.focusCustomBCForm();
                    })
                }
            },
            //重新扫描,将已扫描置空,将未扫描的数量置为初始数量
            reScan: function () {
                let self = this 
                
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要重新扫描吗?',
                        btnName: '重新扫描',
                        events: {
                            confirm: 'reScan'
                        }
                    });
                    self.$off('reScan');

                    self.$once('reScan',function () {
                        // this.hasScan = [];
                        // this.customerOrders.OutStockItem.forEach(function (item) {
                        //     item.Qty = item._Qty;
                        //     item.hasScaned = false;
                        // });
                        // this.customerOrders.hasScanItem = [];

                        servers.getAjax({
                            url: '/BasQRCode/ErpRecoverOrderMatch?sheetId='+self.customerOrders.UpSheetID,
                        }).done(function (result) {
                            self.hasScan = []; //已经扫描的商品
                            self.query.Sheet =''
                            self.customerOrders = {};
                            self.$dispatch('transmit','tip',{contentText: '原有数据已清空，请重新输入出库单号开始扫描！'});
                        })
                        // NProgress.start();
                        // servers.getAjax.bind(self)({
                        //     url: '/BasQRCode/ErpRecoverOrderMatch',
                        //     contentType: 'application/json',
                        //     data: JSON.stringify({sheetId:self.customerOrders.UpSheetID}),
                        // }).done(function (result) {
                        //     NProgress.done();
                        //     self.$dispatch('transmit','tip',{contentText: '重新扫描完成'});
                        // })
                        
                    })
                // } else {
                //     this.$dispatch('transmit','tip',{
                //         name: '提示:',
                //         contentText: '没有需要重新扫描的订单?',
                //         btnName: '确定'
                //     });
                // }
            },

            //重置数据
            resetData: function () {
                this.query = {
                    Sheet: '',
//                    Delivery: '',
//                    Type: 1,
                    CustomBC: '',
                    UpSheet: '',
                    BoxCode: '',
                    MerchantDeliveryID: '',
                };
                this.hasScan = []; //已经扫描的商品
                this.customerOrders = {};
            },
            //取消订单
            cancelOrder: function () {
                var self = this;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要取消订单吗?',
                    btnName: '取消订单',
                    events: {
                        confirm: 'cancelOrder'
                    }
                });
                self.$off('cancelOrder');
                self.$once('cancelOrder',function () {
                    var outStockIDGroup = [];
                    if (self.customerOrders.OutStockID) {
                        outStockIDGroup.push(self.customerOrders.OutStockID);
                    }
                    NProgress.start();
                    if (outStockIDGroup.length > 0) {
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpStockOrderSave_Cancel',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.hasScan = [];
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '取消成功',
                                    cancelBtnShow: false
                                });
                                self.$route.router.go({name:'delivery-pick'});
                            }
                        })
                    }
                });
            },
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
                var outStockIDGroup = [];
                outStockIDGroup.push(self.customerOrders.OutStockID);
                var customerOrders = cloneDeep(self.customerOrders)
                NProgress.start();
                if (outStockIDGroup.length == 0) {
                    return ;
                }
                servers.postAjax.bind(this)({
                    url: '/DeliverGoods/ErpStockOrderSave_Weigh',
                    contentType: 'application/json',
                    data: JSON.stringify(outStockIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        customerOrders.hasScaned = true;
                        self.allCustomerOrders.push(customerOrders);
                        self.$nextTick(function() {
                            self.resetData();
                            self.focusOderForm();
                        })
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
            },
            //清空记录
            clearRecord: function () {
                this.allCustomerOrders = [];
            },
            /**
             * 错误声音提示
             */
            playNoticeError: function() {
                console.log(this.$refs)
                this.$refs.didi.playError()
            },
            /**
             * 扫描商品成功提示
             */
            playNoticeGoodSuccess: function() {
                this.$refs.didi.playGoodSuccess()
            },
            /**
             * 扫描订单成功提示
             */
            playNoticeOrderSuccess: function() {
                this.$refs.didi.playOrderSuccess()
            },
        },
        computed: {
            autoPrint: {
                get: function () {
                    return this.getScanAutoPrint;
                },
                set: function (autoPrint) {
                    this.updateScanAutoPrint(autoPrint);
                }
            },
            query: {
                get: function () {
                    return this.getScanQuery;
                },
                set: function (query) {
                    this.updateScanQuery(query);
                }
            },
            printType: {
                get: function () {
                    return this.getScanPrintType;
                },
                set: function (printType) {
                    this.updateScanPrintType(printType);
                }
            },
            isPrintDelivery: {
                get: function () {
                    return this.getScanIsPrintDelivery;
                },
                set: function (isPrintDelivery) {
                    this.updateScanIsPrintDelivery(isPrintDelivery);
                }
            },
            isPrintPack: {
                get: function () {
                    return this.getScanIsPrintPack;
                },
                set: function (isPrintPack) {
                    this.updateScanIsPrintPack(isPrintPack);
                }
            },
            hasScan: {
                get: function () {
                    return this.getScanHasScan;
                },
                set: function (hasScan) {
                    this.updateScanHasScan(hasScan);
                }
            },
            customerOrders: {
                get: function () {
                    return this.getScanCustomerOrders;
                },
                set: function (customerOrders) {
                    this.updateScanCustomerOrders(customerOrders);
                }
            },
            allCustomerOrders: {
                get: function () {
                    return this.getScanAllCustomerOrders;
                },
                set: function (allCustomerOrders) {
                    this.updateScanAllCustomerOrders(allCustomerOrders);
                }
            },
            baseLookUp: {
                get: function () {
                    return this.getScanBaseLookUp;
                },
                set: function (baseLookUp) {
                    this.updateScanBaseLookUp(baseLookUp);
                }
            },
            //更改已扫描和未扫描数量
            scanCustomBC: {
                set: function (value) {
                    if ( value ) {
                        var isHasCustomBC = false;  //是否存在该CustomBc
                        var self = this;
                        var isInHasScan = false;   //该SKU是否已经存在于已扫描明细中
                        var customerDetail = this.customerOrders.OutStockItem;
                        customerDetail.forEach(function (item) {      //遍历未扫描明细                        
                            if (item.CustomBC == value || item.Barcode == value) {    //如果输入的SKU存在于未扫描明细中,且数量大于0,则数量减1
                                isHasCustomBC = true;
                                if ( item.Qty > 0 ) {
                                    item.Qty--;                                                                        
                                    self.hasScan.forEach(function (hasScanItem) {   //遍历已扫描明细
                                        if ( hasScanItem.CustomBC == value || item.Barcode == value) {   //如果已扫描明细已经存在该SKU,则数量加1,并将状态设为true
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
                                    self.playNoticeError()
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '此商品已经扫描完毕'
                                    });
                                }
                                self.scanSuccess()
                            }
                        });
                        if (!isHasCustomBC) {
                            self.playNoticeError()
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
                    var customerDetail = this.customerOrders.OutStockItem;
//                    debugger;
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
                    console.log(totalNum);
                    return totalNum;
                }
            }
        },
        watch: {
            'hasNotScanNumber': function (val,oldVal) {
                if (val == 0) {
                    this.stockOrderSavesWeigh();
                }
            },
            'printType': function (val) {
                this.resetData();
            }
        },
        filters: {
            scanBoxCode: {
                write: function (boxCode) {
                    if (boxCode) {
                        var scanBoxCode = boxCode.match(/c=(.*)$/);  // 通过扫描二维码得到的boxCode
                        scanBoxCode = scanBoxCode ? scanBoxCode[1] : '';
                        return scanBoxCode || boxCode || '';
                    } else {
                        return ''
                    }

                }
            }
        },
        route: {
            data: function (transition) {
                // 如果有传递单号,则直接查询
                var sheet = transition.to.query.Sheet;
                if (sheet && sheet !== this.query.Sheet) {
                    this.query.Sheet = sheet;
                    this.searchBySheet();
                }
                transition.next();
            }
        },
        ready: function () {
            var self = this;
            this.getBaseData();

            $(document).on('keydown',function (event) {
                if (event.ctrlKey && event.keyCode == 13) {
                    if (!self.hasNotScanNumber && self.customerOrders.OutStockID) {
                        self.stockOrderSavesWeigh();
                    }
                } else if (event.ctrlKey && event.keyCode == 81) {
                    if (self.customerOrders.OutStockID) {
                        self.cancelOrder();
                    }
                }
            })
        },
        components: {
            Didi,
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
        .scan-record {
            position: relative;
        }
        .btn-clear {
            position: absolute;
            top: 5px;
            right: 46px;
        }

    }

</style>