<template>
    <div class="container-fluid sell-scanning  enchase-show">
        <div class="unify-head">
            出库装箱
        </div>
        <div class="query-form">
            <didi v-ref:didi></didi>
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>订单编号</label>
                        <input id="sheetOrDeliverySheet" v-model="query.Sheet" type="text" class="form-control" placeholder="按Enter搜索" @keyup.stop @keyup.enter.stop="getOutBoxUp">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>商品条码</label>
                        <input id="scan-customeBC" v-model="query.CustomBC" type="text" class="form-control" placeholder="按Enter搜索" @keyup.enter.stop="scan" :disabled="!currentOutBox.OutStock_View">
                    </div>
                    <div>
                        <label>扫描数量</label>
                        <input v-model="scanQty" type="text" class="form-control" placeholder="按Enter搜索" :disabled="!currentOutBox.OutStock_View">
                    </div>
                </div>
                <div class="row" v-if="currentOutBox.OutStock_View">
                    <p class="scanDetail col-md-12 col-lg-12 col-sm-12"><label>收货机构:</label><span class="count">{{currentOutBox.OutStock_View.InName}}</span><label>联系人:</label><span class="count">{{currentOutBox.OutStock_View.LinkMan}}</span><label>联系地址:</label><span class="count">{{currentOutBox.OutStock_View.Country ? currentOutBox.OutStock_View.Country : ''}}{{currentOutBox.OutStock_View.State ? currentOutBox.OutStock_View.State : ''}}{{currentOutBox.OutStock_View.City ? ',' + currentOutBox.OutStock_View.City : ''}}{{currentOutBox.OutStock_View.District ? ',' + currentOutBox.OutStock_View.District : ''}}{{currentOutBox.OutStock_View.Address ? ',' + currentOutBox.OutStock_View.Address : ''}}</span><label>联系电话:</label><span class="count">{{currentOutBox.OutStock_View.Mobile && currentOutBox.OutStock_View.Phone ? currentOutBox.OutStock_View.Mobile + ',' : ''}}{{currentOutBox.OutStock_View.Phone}}</span></p>
                </div>
                <div class="query-button-group">
                    快捷操作：
                    <a @click="getNextBox" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">下一箱</a>
                    <a @click="changeBox('')" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">换箱</a>
                    <a @click="resetBox" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">重装箱</a>
                    <a @click="printPack" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">打印装箱单</a>
                    <a @click="printPackAll" href="javascript:void(0)" class="btn btn-default">打印汇总单</a>
                    <a @click="skipWeighing" href="javascript:void(0)" class="btn btn-default">直接出库</a>
                    <a @click="saveBoxup" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">保存</a>
                    <a @click="checkOutBoxup" href="javascript:void(0)" class="btn btn-default" :class="{'disabled': !isHasCurrentPack}">审核通过</a>
                    <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                    <label for="autoPrint">
                        <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                    </label>
                </div>
            </div>
        </div>

        <div class="sheet-list sell-scanning-show row ">
            <!--<div class="headline-hd">订单明细</div>-->
            <div class="row col-lg-8 col-md-12  col-sm-12">
                <div class="col-lg-12">
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive currentBox">
                        <div class="table-hd">当前箱号：<span>{{currentBox.Sheet}}</span></div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>尺码</th>
                                <th>颜色</th>
                                <th>扫描数</th>
                                <th>通知数</th>
                                <th>装箱总数</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="box in currentBox.OutBoxupItem">
                                <td>{{box.CustomBC}}</td>
                                <td>{{box.CustomNo}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{box.Name}}">{{box.Name | truncationString }}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{box.SizeName}}">{{box.SizeName  | truncationString }} </span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{box.ColorName}}">{{box.ColorName  | truncationString }} </span></td>
                                <td>{{box.Qty}}</td>
                                <td>{{box.NotifyQty}}</td>
                                <td>{{box.HasPackQty}}</td>
                                <td>
                                    <a @click="increasePack(box)" href="javascript:void(0)">增加</a>
                                    <a @click="decreasePack(box)" href="javascript:void(0)">减少</a>
                                    <a @click="changeBox(box)" href="javascript:void(0)">换箱</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row col-lg-4 col-md-12 col-sm-12">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive boxes">
                        <div class="table-hd">装箱列表：总箱数 <span>{{currentOutBox.OutBoxup ? currentOutBox.OutBoxup.OutBoxupBox.length : 0}}</span>    装箱数 <span>{{currentOutBox.TotalPackQty || 0}}</span></div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th>序号</th>
                                    <th>箱号</th>
                                    <th>装箱数</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="OutBoxupBox in currentOutBox.OutBoxup.OutBoxupBox" :class="{'active': OutBoxupBox.Sheet == currentBox.Sheet}" @click="selectBox(OutBoxupBox)">
                                <td>{{OutBoxupBox.OrderNo}}</td>
                                <td>{{OutBoxupBox.Sheet}}</td>
                                <td>{{OutBoxupBox.TotalPackQty}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <div class="table-hd">商品明细</div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th>SKU</th>
                                    <th>商品货号</th>
                                    <th>商品名称</th>
                                    <th>尺码</th>
                                    <th>颜色</th>
                                    <th>通知数</th>
                                    <th>已装箱数</th>
                                    <th>未装箱数</th>
                                    <th>箱号</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="sheet-list-item" v-for="outStockItem in currentOutBox.OutStock_View.OutStockItem">
                                    <td>{{outStockItem.CustomBC}}</td>
                                    <td>{{outStockItem.CustomNo}}</td>
                                    <td>{{outStockItem.Name}}</td>
                                    <td>{{outStockItem.SizeName}}</td>
                                    <td>{{outStockItem.ColorName}}</td>
                                    <td>{{outStockItem.NotifyQty}}</td>
                                    <td>{{outStockItem.HasPackQty}}</td>
                                    <td>{{outStockItem.NotifyQty - outStockItem.HasPackQty}}</td>
                                    <td>{{outStockItem.Boxes | arrayToString}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <div class="table-hd">
                            <span>装箱记录</span>
                            <a @click="clearRecord" href="javascript:void(0)" class="btn btn-default">清空记录</a>
                        </div>
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>装箱时间</th>
                                <th>出库单号</th>
                                <th>业务类型</th>
                                <th>上游单号</th>
                                <th>外部机构</th>
                                <th>收货人</th>
                                <th>联系电话</th>
                                <th>联系地址</th>
                                <th>通知数</th>
                                <th>装箱数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="outBox in outBoxes" @click="selectOutBoxUp(outBox)" :class="{'active': outBox.Sheet == currentOutBox.Sheet}">
                                <td>{{outBox.PackTime}}</td>
                                <td>{{outBox.OutStock_View.Sheet}}</td>
                                <td>{{outBox.OutStock_View.TransferType}}</td>
                                <td>{{outBox.OutStock_View.UpSheet}}</td>
                                <td>{{outBox.OutStock_View.InName}}</td>
                                <td>{{outBox.OutStock_View.LinkMan}}</td>
                                <td>{{outBox.OutStock_View.Mobile && outBox.OutStock_View.Phone ? outBox.OutStock_View.Mobile + ',' : ''}}{{outBox.OutStock_View.Phone}}</td>
                                <td>{{outBox.OutStock_View.Country ? outBox.OutStock_View.Country : ''}}{{outBox.OutStock_View.State ? outBox.OutStock_View.State : ''}}{{outBox.OutStock_View.City ? ',' + outBox.OutStock_View.City : ''}}{{outBox.OutStock_View.District ? ',' + outBox.OutStock_View.District : ''}}{{outBox.OutStock_View.Address ? ',' + outBox.OutStock_View.Address : ''}}</td>
                                <td>{{outBox.TotalNotifyQty}}</td>
                                <td>{{outBox.TotalPackQty}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-number></modal-number>
    <modal-change-box></modal-change-box>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    var NProgress = servers.NProgress;
    var Didi = require('../../../components/didi.vue');
    module.exports = {
        data: function () {
            return {
//                autoPrint: false,
//                query: {
//                    Sheet: '',
//                    CustomBC: '',
//                },
//                scanQty: 1, // 扫描数量
//                currentOutBox: {},  //当前装箱单
//                currentBox: {},   //当前箱子
//                outBoxes: [],    //所有装箱单
                isBusy: false, // 是否正在请求
//                baseLookUp: {
//                    payLists: [],
//                    transferType: []
//                }
            }
        },
        vuex: {
            actions: {
                updatePackAutoPrint: actions.updatePackAutoPrint,
                updatePackQuery: actions.updatePackQuery,
                updatePackScanQty: actions.updatePackScanQty,
                updatePackCurrentOutBox: actions.updatePackCurrentOutBox,
                updatePackCurrentBox: actions.updatePackCurrentBox,
                updatePackOutBoxes: actions.updatePackOutBoxes,
                updatePackBaseLookUp: actions.updatePackBaseLookUp,
            },
            getters: {
                getPackAutoPrint: getters.getPackAutoPrint,
                getPackQuery: getters.getPackQuery,
                getPackScanQty: getters.getPackScanQty,
                getPackCurrentOutBox: getters.getPackCurrentOutBox,
                getPackCurrentBox: getters.getPackCurrentBox,
                getPackOutBoxes: getters.getPackOutBoxes,
                getPackBaseLookUp: getters.getPackBaseLookUp,
            }
        },
        methods: {
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取支付方式
                servers.getBaseData('PayModel', false, function (val) {
                    baseLookUp.payLists = val;
                });
                //业务类型
                servers.getBaseData('TransferType', false, function (val) {
                    baseLookUp.transferType = val;
                });
            },
            //出库装箱单查询
            getOutBoxUp: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/DeliverGoods/ErpQueryOutBoxup',
                    data: {
                        Sheet: self.query.Sheet
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.currentOutBox = {};
                        self.currentBox = {};
                        var outBoxFromServer = result.Data;
                        var sheet = self.query.Sheet;
                        var outBoxes = self.outBoxes;   //装箱单列表
                        var isRepeat = false;   //查询出来的装箱单是否已经在装箱单列表中

                        var OutStockItem = outBoxFromServer.OutStock_View.OutStockItem;  //出库单明细

                        var OutBoxupBox = outBoxFromServer.OutBoxup.OutBoxupBox;  //装箱单箱子
                        var totalNotifyQty = 0;    //总通知数
                        var totalPackQty = 0;     //总装箱数
                        outBoxFromServer.PackTime = '';   //装箱时间
                        outBoxFromServer.Sheet = sheet;   //将sheet放在最外层,方便调用
                        if (outBoxFromServer.OutBoxup.Flag == 100) {   //是否已经装箱审核完成
                            outBoxFromServer.isPacked = true;
                        } else {
                            outBoxFromServer.isPacked = false;
                        }
                        //遍历所有出库单明细
                        OutStockItem.forEach(function (item) {
                            totalNotifyQty += item.NotifyQty;
                            item.Boxes = [];    //箱号集合
                            item.HasPackQty = 0;   // 已装箱数量
                            //遍历所有箱子
                            OutBoxupBox.forEach(function (box) {
                                box.TotalPackQty = 0;
                                var OutBoxupItem = box.OutBoxupItem;
                                //遍历箱子下面的明细,如果CustomBC与出库单的CustomBC相同,则将对应的箱号放入Boxes中,用来做显示
                                OutBoxupItem.forEach(function (upItem) {
                                    box.TotalPackQty += upItem.Qty;
                                    if (item.CustomBC === upItem.CustomBC) {
                                        upItem.NotifyQty = item.NotifyQty;  // 通知数
                                        item.HasPackQty += upItem.Qty;
                                        totalPackQty += upItem.Qty;
                                        item.Boxes.push(box.Sheet);
                                    }
                                });
                            });
                            //遍历所有箱子,更新箱子中明细的装箱总数
                            OutBoxupBox.forEach(function (box) {
                                var OutBoxupItem = box.OutBoxupItem;
                                //遍历箱子下面的明细,如果CustomBC与出库单的CustomBC相同,则将对应的箱号放入Boxes中,用来做显示
                                OutBoxupItem.forEach(function (upItem) {
                                    if (item.CustomBC === upItem.CustomBC) {
                                        upItem.HasPackQty = item.HasPackQty;
                                    }
                                });
                            })
                        });

                        outBoxFromServer.OutStock_View.OutStockItem = OutStockItem;   //将构建好的数据重新赋值
                        outBoxFromServer.TotalNotifyQty = totalNotifyQty;
                        outBoxFromServer.TotalPackQty = totalPackQty;

                        //判断从数据库获取的装箱单是否已经在列表中,如果在,则替换列表中的数据,如果不在,则新增入列表
                        if (outBoxes.length > 0) {
                            outBoxes.forEach(function (outBox) {
                                if (outBox.OutStock_View.Sheet === sheet) {
                                    isRepeat = true;
                                    outBox.OutStock_View = outBoxFromServer.OutStock_View;
                                    outBox.OutBoxup = outBoxFromServer.OutBoxup;
                                    outBox.TotalNotifyQty = totalNotifyQty;
                                    outBox.TotalPackQty = totalPackQty;
                                    self.currentOutBox = outBox;
//                                    console.log(outBox);
                                }
                            })
                        }
                        if (!isRepeat) {
                            outBoxes.push(outBoxFromServer);
                            self.currentOutBox = outBoxes[outBoxes.length - 1];
                        }
                        //将聚焦的箱子默认为最后一个箱子
                        self.currentBox = self.currentOutBox.OutBoxup.OutBoxupBox[self.currentOutBox.OutBoxup.OutBoxupBox.length -1];
                        document.getElementById('scan-customeBC').focus();
                        self.playNoticeOrderSuccess()
//                        self.$nextTick();
                    } else {
                        self.playNoticeError()
                    }
                }).fail(function() {
                    self.playNoticeError()
                })
            },
            //选中需要装箱的订单
            selectOutBoxUp: function (outBox) {
                this.currentOutBox = outBox;
                this.currentBox = outBox.OutBoxup.OutBoxupBox[outBox.OutBoxup.OutBoxupBox.length - 1];
            },
            selectBox: function (box) {
                this.currentBox = box;
            },
            checkIfIsPacked: function () {
                if (this.currentOutBox.isPacked) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '改订单已经装箱审核完毕,不可以再进行装箱的操作!'
                    });
                    return false;
                }
                return true;
            },
            scan: function () {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    this.scanCustomBC = this.query.CustomBC;
                    this.scanCustomBC = this.query.CustomBC = '';
                }
            },
            //检查扫描的条码是否在当前的装箱单中,如果在,则返回该条码对应的信息
            getCustomBcInfo: function (customBC) {
                var outStockItem = this.currentOutBox.OutStock_View.OutStockItem;
                var outStockItemReturn;
                outStockItem.forEach(function (item) {
                    if (item.CustomBC === customBC) {
                        outStockItemReturn = item;
                    }
                });
                return outStockItemReturn;
            },
            //获取在箱子跟扫描条码相同的订单
            getCustomBCInPack: function (customBC,box) {
                var box = box || this.currentBox;
                var outBoxupItem = box.OutBoxupItem;
                var outBoxupItemReturn;
                outBoxupItem.forEach(function (item) {
                    if (item.CustomBC === customBC) {
                        outBoxupItemReturn = item;
                    }
                });
                return outBoxupItemReturn;
            },
            //根据箱号来获得对应的箱子
            getBoxBySheet: function (sheet) {
                var boxes = this.currentOutBox.OutBoxup.OutBoxupBox;
                var targetBox;
                boxes.forEach(function (box) {
                    if (box.Sheet === sheet) {
                        targetBox = box;
                    }
                });
                return targetBox;
            },
            //装箱
            putInBox: function (item,qty,outBoxupItem) {
                var outBoxupItem = outBoxupItem || this.currentBox.OutBoxupItem;
                var qty = qty || 1;
                outBoxupItem.push({
                    BarcodeID: item.BarcodeID,
                    ColorName: item.ColorName,
                    SizeName: item.SizeName,
                    CustomBC: item.CustomBC,
                    CustomNo: item.CustomNo,
                    MerchantID: this.currentBox.MerchantID,
                    Note: item.Note,
                    OutBoxupBoxID: this.currentBox.OutBoxupBoxID,
                    OutBoxupID: this.currentBox.OutBoxupID,
                    OutBoxupItemID: '',
                    Qty: qty,
                    NotifyQty: item.NotifyQty,
                    HasPackQty: item.HasPackQty,
                })
            },
            //获取对应customBC的明细已经装箱数量
            getPackedNumber: function (customBC) {
                var OutBoxupBox = this.currentOutBox.OutBoxup.OutBoxupBox;
                var totalPackedNum = 0;
                OutBoxupBox.forEach(function (box) {
                    var OutBoxupItem = box.OutBoxupItem;
                    OutBoxupItem.forEach(function (item) {
                        if (item.CustomBC === customBC) {
                            totalPackedNum += item.Qty;
                        }
                    })
                });
                return totalPackedNum;
            },
            // 更改box中的已经装箱数量
            changeBoxHasPackQty: function (customBC,addQty) {
                var OutBoxupBox = this.currentOutBox.OutBoxup.OutBoxupBox;
                OutBoxupBox.forEach(function (box) {
                    var OutBoxupItem = box.OutBoxupItem;
                    OutBoxupItem.forEach(function (item) {
                        if (item.CustomBC === customBC) {
                            item.HasPackQty += addQty;
                        }
                    })
                });
            },
            //清空记录
            clearRecord: function () {
                this.query = {
                    Sheet: '',
                    CustomBC: ''
                };
                this.currentOutBox = {};  //当前装箱单
                this.currentBox = {};   //当前箱子
                this.outBoxes = [];    //所有装箱单
            },
            //保存装箱单
            saveBoxup: function () {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    var self = this;
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/DeliverGoods/ErpOutBoxupSave',
                        data: self.currentOutBox.OutBoxup
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '保存成功!'
                            });
                            self.getOutBoxUp();
                        }
                    })
                }
            },
            //重新装箱
            resetBox: function () {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    var self = this;
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要重新装箱吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'resetBox'
                        }
                    });
                    self.$off('resetBox');

                    self.$once('resetBox', function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpOutBoxupRemove',
                            data: {
                                OutBoxupBoxID: self.currentBox.OutBoxupBoxID
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.getOutBoxUp();
                            }
                        })
                    });
                }
            },
            //获取下一个箱子
            getNextBox: function () {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    var self = this;
                    if (this.currentOutBox.Sheet) {
                        NProgress.start();
                        if (this.isBusy) return;
                        this.isBusy = true;
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpGetOutBoxupNo'
                        }).done(function (result) {
                            self.isBusy = false;
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                var newBox = result.Data;
                                newBox.OutBoxupItem = [];
                                newBox.TotalPackQty = 0;
                                self.currentOutBox.OutBoxup.OutBoxupBox.push(newBox);
                                self.currentBox = self.currentOutBox.OutBoxup.OutBoxupBox[self.currentOutBox.OutBoxup.OutBoxupBox.length - 1];
                            }
                        }).fail(function (err) {
                            self.isBusy = false;
                        });
                    } else {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示:',
                            contentText: '请先查询出库单!'
                        });
                    }
                }
            },
            //增加数量
            increasePack: function (packItem) {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    this.$dispatch('transmit', 'modal-increase', packItem);
                }
            },
            //减少数量
            decreasePack: function (packItem) {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    this.$dispatch('transmit', 'modal-decrease', packItem);
                }
            },
            //换箱
            changeBox: function (changeItem) {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    var changeData = {
                        changeItem: changeItem,
                        currentOutBox: this.currentOutBox,
                        currentBox: this.currentBox
                    };
                    this.$dispatch('transmit', 'modal-change-box', changeData);
                }
            },
            //审核装箱单
            checkOutBoxup: function() {
                var isPacked = this.checkIfIsPacked();
                if (isPacked) {
                    var self = this;
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要审核吗?',
                        btnName: '审核',
                        events: {
                            confirm: 'confirm-check'
                        }
                    });
                    self.$off('confirm-check');

                    self.$once('confirm-check',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpCheckOutBoxup',
                            data: {
                                OutBoxupID: self.currentOutBox.OutBoxup.OutBoxupID
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '装箱审核成功!'
                                });
                                self.currentOutBox.isPacked = true;
                            }
                        })
                    });
                }
            },
            //打印装箱单
            printPack: function() {
                if (this.currentOutBox.OutStock_View && this.currentOutBox.OutStock_View.OutStockBatchSheet) {
                    var sheetList = [];
                    sheetList.push(this.currentOutBox.OutStock_View.OutStockBatchSheet);
                    var sheetListStr = JSON.stringify(sheetList);
                    localStorage.printPackSheetList = sheetListStr;
                    localStorage.upSheetList = [];
                    window.open('#!/print-pack?BusinessType=2' + '&autoPrint=' + this.autoPrint);
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请选择需要打印的订单!'
                    });
                }

            },
            // 打印全部装箱单
            printPackAll: function () {
                if (this.outBoxes.length > 0) {
                    var sheetList = [];
                    this.outBoxes.forEach(function (currentOutBox) {
                        sheetList.push(currentOutBox.OutStock_View.OutStockBatchSheet);
                    });
                    var sheetListStr = JSON.stringify(sheetList);
                    localStorage.printPackSheetList = sheetListStr;
                    localStorage.upSheetList = [];
                    window.open('#!/print-pack?BusinessType=2' + '&autoPrint=' + this.autoPrint);
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '没有汇总单,请先装箱!'
                    });
                }
            },
            // 直接出库
            skipWeighing: function () {
                var self = this;
                var outStockIDGroups = [];
                if (this.currentOutBox.OutStock_View) {
                    outStockIDGroups.push(this.currentOutBox.OutStock_View.OutStockID);
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请选择需要自动出库的订单!'
                    });
                }
                if (outStockIDGroups.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要直接发货吗?',
                        btnName: '直接发货',
                        events: {
                            confirm: 'skipWeighing'
                        }
                    });
                    self.$off('skipWeighing');

                    self.$once('skipWeighing',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpBackWriteWeighList',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockIDGroups)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '直接发货成功!'
                                });
                            }
                        })
                    })
                }
            },
            /**
             * 错误声音提示
             */
            playNoticeError: function() {
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
            }
        },
        ready: function () {
            var self = this;
            this.getBaseData();
        },
        computed: {
            autoPrint: {
                get: function () {
                    return this.getPackAutoPrint;
                },
                set: function (autoPrint) {
                    this.updatePackAutoPrint(autoPrint);
                }
            },
            query: {
                get: function () {
                    return this.getPackQuery;
                },
                set: function (query) {
                    this.updatePackQuery(query);
                }
            },
            scanQty: {
                get: function () {
                    return this.getPackScanQty;
                },
                set: function (scanQty) {
                    this.updatePackScanQty(scanQty);
                }
            },
            currentOutBox: {
                get: function () {
                    return this.getPackCurrentOutBox;
                },
                set: function (currentOutBox) {
                    this.updatePackCurrentOutBox(currentOutBox);
                }
            },
            currentBox: {
                get: function () {
                    return this.getPackCurrentBox;
                },
                set: function (currentBox) {
                    this.updatePackCurrentBox(currentBox);
                }
            },
            outBoxes: {
                get: function () {
                    return this.getPackOutBoxes;
                },
                set: function (outBoxes) {
                    this.updatePackOutBoxes(outBoxes);
                }
            },
            baseLookUp: {
                get: function () {
                    return this.getPackBaseLookUp;
                },
                set: function (baseLookUp) {
                    this.updatePackBaseLookUp(baseLookUp);
                }
            },

            scanCustomBC: {
                set: function (newCustomBC) {
                    if (newCustomBC) {
                        var outStockItem = this.getCustomBcInfo(newCustomBC);   //根据CustomBC查出出库单明细
                        //如果存在该出库单明细
                        if (outStockItem) {
                            var packedNumber = this.getPackedNumber(newCustomBC);
                            if (outStockItem.NotifyQty >= packedNumber + (parseInt(this.scanQty) || 1) ) {
                                outStockItem.HasPackQty += parseInt(this.scanQty) || 1;
                                this.currentOutBox.TotalPackQty += parseInt(this.scanQty) || 1;
                                this.currentBox.TotalPackQty += parseInt(this.scanQty) || 1;
                                var outBoxupItem = this.getCustomBCInPack(newCustomBC);
                                this.changeBoxHasPackQty(newCustomBC,parseInt(this.scanQty) || 1);
                                if (outBoxupItem) {
                                    outBoxupItem.Qty += parseInt(this.scanQty) || 1;
                                } else {
                                    this.putInBox(outStockItem, parseInt(this.scanQty) || 1);
                                    outStockItem.Boxes.push(this.currentBox.Sheet);
                                }
                                this.playNoticeGoodSuccess()
                            } else {
                                this.playNoticeError()
                                this.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '已超出数量!'
                                });
                            }

                        } else {
                            this.playNoticeError()
                            this.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '出库单中不存在该商品,请重新扫描!'
                            });
                        }
                    }
                    return newCustomBC;
                }
            },
            //是否有当前出库单
            isHasCurrentPack: {
                get: function () {
                    return !!this.currentOutBox.Sheet
                }
            }
        },
        events: {
            //增加数量
            'increase': function (packItem, qty) {
                var customBC = packItem.CustomBC;   //packItem为需要增加数量的装箱单明细
                var qty = parseInt(qty,10);
                var outStockItem = this.getCustomBcInfo(customBC);   //根据CustomBC查出出库单明细
                var packedNumber = this.getPackedNumber(customBC);   //查出此CustomBC已经装箱的数量
                if (outStockItem.NotifyQty >= packedNumber + qty) {   //如果通知数量不小于增加后的装箱数量,就允许装箱,并更新总装箱数量,当前箱子的装箱数量
                    this.currentOutBox.TotalPackQty += qty;
                    this.currentBox.TotalPackQty += qty;
                    outStockItem.HasPackQty += qty;
                    packItem.Qty += qty;
                    this.changeBoxHasPackQty(customBC,qty);
                    this.$dispatch('transmit','modal-number-close');
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '总数量超出通知数量,请重新填写!'
                    });
                }
            },
            //减少数量
            'decrease': function (packItem, qty) {
                var customBC = packItem.CustomBC;
                var outStockItem = this.getCustomBcInfo(customBC);   //根据CustomBC查出出库单明细
                var qty = parseInt(qty,10);
                if (packItem.Qty >= qty) {   //如果减少的数量比在箱子中的数量小
                    this.currentOutBox.TotalPackQty -= qty;   //当前订单的已装箱数量减少对应的数量
                    this.currentBox.TotalPackQty -= qty;   //当前箱子的已装箱数量减少对应的数量
                    outStockItem.HasPackQty -= qty;
                    this.changeBoxHasPackQty(customBC,-qty);
                    if (packItem.Qty == qty) {    //如果减少的数量跟在箱子中的数量相等,刚将该明细从当前箱子中清除,并清除该明细的箱子编号
                        this.currentBox.OutBoxupItem.$remove(packItem);
                        var boxSheet = this.currentBox.Sheet;
                        var boxes = this.getCustomBcInfo(customBC).Boxes;
                        boxes.$remove(boxSheet);
                    } else {
                        packItem.Qty -= qty;
                    }
                    this.$dispatch('transmit','modal-number-close');
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '减少的数量大于已经装箱的数量,无法完成!'
                    });
                }
            },
            //换箱
            'change-box': function (changeData) {
                var self = this;
                var changeItem = changeData.changeItem;    //需要换箱子的明细
                var changeBoxSheet = changeData.targetBoxSheet;   //变换后的箱子编号
                var changeNumber = parseInt(changeData.changeNumber,10); //变换的数量
                var targetBox;
                if (this.currentBox.Sheet === changeBoxSheet) {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请选择跟当前箱子不一样的箱子换箱!'
                    });
                    return;
                } else {
                    targetBox = this.getBoxBySheet(changeBoxSheet);   //目标箱子
                }
                //如果是单条换箱
                if (changeItem) {
                    if (changeNumber <= 0 ) {
                        this.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '请填写大于0的换箱数量!'
                        });
                        return;
                    }
                    var targetCustomBC = changeItem.CustomBC;  //需要换箱子的明细的CustomBC
                    var theSameItemInTargetBox = this.getCustomBCInPack(targetCustomBC,targetBox); //目标箱子中与需要变换明细相同的明细
                    if (changeItem.Qty >= changeNumber) {
                        var originQty = changeItem.Qty;
                        this.currentBox.TotalPackQty -= changeNumber;   //减少当前箱子中的总装箱数量
                        targetBox.TotalPackQty += changeNumber;     //增加目标箱子中的总装箱数量
                        changeItem.Qty -= changeNumber;
                        var outStockItem = this.getCustomBcInfo(targetCustomBC);
                        if (theSameItemInTargetBox) {               //如果目标箱子中存在,则将目标箱子中的对应明细增加数量,原明细的数量减少
                            theSameItemInTargetBox.Qty += changeNumber;
                        } else {   //如果目标箱子中不存在该明细,则增加该明细
                            this.putInBox(changeItem,changeNumber,targetBox.OutBoxupItem);
                            outStockItem.Boxes.push(changeBoxSheet);
                        }
                        if (originQty == changeNumber) {   //如果换箱的数量与在当前箱子中的数量相等,则清空该明细
                            this.currentBox.OutBoxupItem.$remove(changeItem);
                            outStockItem.Boxes.$remove(this.currentBox.Sheet);
                        }
                    } else {   //如果换箱的数量比在当前箱子中的数量大
                        this.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '换箱的数量大于已经装箱的数量,请重新填写数量!'
                        });
                        return;
                    }
                } else {   //如果为整体换箱
                    this.currentBox.TotalPackQty = 0;
                    var OutBoxupItem = this.currentBox.OutBoxupItem;
                    OutBoxupItem.forEach(function (item) {   //遍历原箱子中的所有明细,如果目标箱子中存在该明细,则将对应明细的数量增加,否则在目标箱子中增加对应的明细
                        targetBox.TotalPackQty += item.Qty;
                        var theSameItemInTargetBox = self.getCustomBCInPack(item.CustomBC,targetBox); //目标箱子中与需要变换明细相同的明细
                        var outStockItem = self.getCustomBcInfo(item.CustomBC);
                        outStockItem.Boxes.$remove(self.currentBox.Sheet);   //将该箱子编号从明细中删除
                        if (theSameItemInTargetBox) {
                            theSameItemInTargetBox.Qty += item.Qty;
                        } else {  //如果该明细没有在箱子中,将箱子的编号push进明细的箱子字段中
                            outStockItem.Boxes.push(changeBoxSheet);
                            self.putInBox(item,item.Qty,targetBox.OutBoxupItem);
                        }
                    });
                    this.currentBox.OutBoxupItem = [];   //清空原箱子
                }
                this.$dispatch('transmit','modal-change-box-close');
            }
        },
        components: {
            modalNumber: require('./components/modal-number.vue'),
            modalChangeBox: require('./components/modal-change-box.vue'),
            Didi,
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .boxes,
    .currentBox {
        max-height: 500px;
        overflow-y: scroll;
    }
    .scanDetail {
        margin-left: 32px;
        .count {
            padding-right: 15px;
        }
    }
    .enchase-show{
        .sheet-list-table{
            border-top:none;
        }
    }
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