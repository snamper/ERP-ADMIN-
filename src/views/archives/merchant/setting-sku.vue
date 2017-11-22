<template>
    <div class="modal fade order-tip" :class="{'in':modal.show}" v-show="close">
        <div class="modal-dialog">
            <div class="modal-content  transform-box">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.title}}</h4>
                    </div>
                    <div class="content-padding clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <!--<label class="control-label">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</label>-->
                                <h class="account-margin top-text">请录入盒SKU及对应箱的盒数</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail  stock-upsheet">
                                <div class="item-list form-limit-width stock-upsheet col-md-6">
                                    <span class="sku-number padding">盒SKU</span>
                                    <!--<select class="form-control" v-model="BasPackSubBarcode.BarcodeID">-->
                                        <!--<option v-for="opt in 20" value="1101112">不限</option>-->
                                    <!--</select>-->
                                    <input v-model="BasPackSubBarcode.Sku" value="{{BasPackSubBarcode.BarcodeID}}" type="text" class="form-control" placeholder="" required @keyup="getSkuList()" @focus="showSkuList" @blur="hideSkuList">
                                    <div class="stock-upsheet-wrap">
                                        <ul class="stock-upsheet-list" v-if="isShowSkuList">
                                            <li class="stock-upsheet-item" @click.stop="selectSkuList(list)" v-for="list in SkuList">{{list.Sku}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="item-list form-limit-width stock-upsheet col-md-6">
                                    <span class="sku-number">盒数</span>
                                    <input v-model="BasPackSubBarcode.Qty" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="save()" type="button" class="btn btn-primary"> 确定 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;

    module.exports = {
//        props: ['BarcodeID'],
        data: function () {
            return {
                modal: {
                    show: false,
                    title: '设置sku包装数'
                },
                isShowSkuList: false,  //是否显示盒sku列表
                SkuList: [],//盒sku列表
                BarcodeID: '',
                PackBarcodeID: '',
                BasPackSubBarcode: {
                    PackSubBarcodeID: '',
                    BarcodeID: '',
                    Sku: '',
                    Qty: ''

                },
                oldBarCode: []
            }
        },
//        computed: {
//            relevanceOrders: {
//                get: function () {
//                    var saleOrders = [];
//                    this.saleOrders.forEach(function (saleOrder) {
//                        if (saleOrder.IsNewBoxCode && saleOrder._BoxCode) {
//                            saleOrders.push({
//                                BarcodeID: saleOrder.BarcodeID,
//                                BoxCode: saleOrder._BoxCode,
////                            QRCodeID: self.qrCodeID,
//                                CustomerID: saleOrder.CustomerID,
//                                SheetID: saleOrder.SheetID,
//                                Note: saleOrder.Note || ''
//                            });
//                        }
//                    });
//                    return saleOrders;
//                }
//            }
//        },
//        filters: {
//            scanBoxCode: {
//                write: function (boxCode) {
//                    var scanBoxCode = boxCode.match(/c=(.*)$/);  // 通过扫描二维码得到的boxCode
//                    scanBoxCode = scanBoxCode ? scanBoxCode[1] : '';
//                    return scanBoxCode || boxCode || '';
//                }
//            }
//        },
        methods: {
            close: function () {
                this.modal.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modal.show = true;
            },
            //获取sku
            getSkuList: function() {
                debugger;
                var self = this;
                setTimeout(function() {
                    servers.postAjax.bind(this)({
                        url: '/BaseLookup/GetBarcodeList',
                        data: {
                            Sku: self.BasPackSubBarcode.Sku
                        }
                    }).done(function (result) {
                        self.SkuList = [];
                        if (result.ResultCode == 1) {
                            self.SkuList = result.Data;
//                            console.log(self.SkuList);
                        }
                    });
                },2000)

            },
            //显示盒sku列表
            showSkuList: function () {
                this.isShowSkuList = true;
            },
            hideSkuList: function () {
                var self = this;
                setTimeout(function () {
                    self.isShowSkuList = false;
                },300);
            },
            //选择盒sku
            selectSkuList: function (list) {
                var self = this;
                var sku = list;
//                if (self.oldBarCode) {
                    self.BasPackSubBarcode.BarcodeID = sku.BarcodeID;
//                    self.PackBarcodeID = self.oldBarCode.PackBarcodeID;
                    self.BasPackSubBarcode.Sku = sku.Sku;
                    self.hideSkuList();
//                } else {
//                    self.BasPackSubBarcode.BarcodeID = sku.BarcodeID;
////                    self.PackBarcodeID = '';
//                    self.BasPackSubBarcode.Sku = sku.Sku;
//                    self.hideSkuList();
//                }
//                    if (self.oldBarCode.BarcodeID != sku.BarcodeID) {
//                        self.BasPackSubBarcode.BarcodeID = sku.BarcodeID;
//                        self.BasPackSubBarcode.PackBarcodeID = '';
//                        self.BasPackSubBarcode.Sku = sku.Sku;
//                        self.hideSkuList();
//
//                    } else {

//                    }
//                }

            },
            searchSetting: function(ID) {
                debugger;
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasBarcode/ErpQueryPackSubBarcode',
                    data: {
                        BarcodeID: ID
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        var barCode = result.Data;
                        self.oldBarCode = result.Data[0];
                        if (barCode.length > 0) {
                            self.BasPackSubBarcode.PackSubBarcodeID = barCode[0].PackSubBarcodeID;
                            self.BasPackSubBarcode.BarcodeID = barCode[0].BarcodeID;
                            self.PackBarcodeID = barCode[0].PackBarcodeID;
                            self.BasPackSubBarcode.Sku = barCode[0].Sku;
                            self.BasPackSubBarcode.Qty = barCode[0].Qty;
                            console.log(barCode);
                        } else {
                            self.PackBarcodeID = '';
                            self.BasPackSubBarcode = {
                                PackSubBarcodeID: '',
                                BarcodeID: '',
                                Sku: '',
                                PackBarcodeID: '',
                                Qty: ''
                            }
                        }
                    } else {
                        self.PackBarcodeID = '';
                        self.BasPackSubBarcode = {
                            PackSubBarcodeID: '',
                            BarcodeID: '',
                            Sku: '',
                            Qty: ''
                        }
                    }
                })
            },

//            // 保存
            save: function () {
                var self = this;
                    NProgress.start();
                    var barCode = [{
                        PackSubBarcodeID: self.BasPackSubBarcode.PackSubBarcodeID,
                        BarcodeID: self.BasPackSubBarcode.BarcodeID,
                        Qty: self.BasPackSubBarcode.Qty
                    }]
                    servers.postAjax.bind(this)({
                        url: '/BasBarcode/ErpSavePackBarcode',
                        data: {
                            BarcodeID: self.BarcodeID,
                            PackBarcodeID: self.PackBarcodeID,
                            BasPackSubBarcode: barCode
                        }
//                        contentType: 'application/json',
//                        data: JSON.stringify(self.relevanceOrders)
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '设置成功!'
                            });
                            self.$dispatch('page-change');
                            self.close();
                        }
                    })
            },
//            // 输入下一条数据
//            nextBoxCode: function (index) {
//                if (index < this.saleOrders.length) {
//                    document.querySelector("[index='boxCodeForm" + (index + 1) + "']").focus();
//                }
//            }
        },
        events: {
            'setting-sku': function (id) {
                debugger
                this.BarcodeID = id;
                this.showModal();
                if (this.BarcodeID) {
                    this.searchSetting(this.BarcodeID);
                }
//                this.saleOrders = saleOrders;
//                this.qrCodeID = qrCodeID;

            }
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    .transform-box{
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
        .item-list {
            display: flex;
        }
        .content-padding {
            padding: 40px;
            padding-bottom: 154px;
        }
        .sku-number {
            width: 53px;
            line-height: 20px;
            text-align: center;
        }
        .padding {
            margin-right: 8px;
        }
        .stock-upsheet {
            position: relative;
        }
        .stock-upsheet-wrap {
            position: absolute;
            width: 67%;
            left: 65px;
            top: 24px;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            ul.stock-upsheet-list {
                padding: 5px;
                border: 1px solid #ccc;
                background: #fff;
                max-height: 155px;
                overflow-y: scroll;
            }
            .stock-upsheet-item {
                white-space: nowrap;
                overflow: hidden;
                line-height: 24px;
                text-overflow: ellipsis;
                cursor: pointer;
                &:hover {
                    background: #ccc;
                }
            }
        }
    }
</style>