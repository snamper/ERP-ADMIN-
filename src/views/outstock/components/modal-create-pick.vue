<template>
    <div class="modal fade pick" :class="{'in':modalWindow.show}" v-show="modalWindow.show">
        <div class="modal-dialog model-allocation">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body modal-body-show modal-body-modal">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="form-group">
                                    <label>业务类型<span class="form-required-mark">*</span></label>
                                    <select v-model="query.TransferType" class="form-control">
                                        <option value="21">客户出货</option>
                                        <option value="22">网店出货</option>
                                        <option value="23">分销出货</option>
                                        <option value="24">采购退货出库</option>
                                        <option value="31">调拨出库</option>
                                    </select>
                                    <label>仓库<span class="form-required-mark">*</span></label>
                                    <select v-model="query.StockID" class="form-control" v-if="baseLookUp.stockLists.length > 0">checkStockList
                                        <!--<option value="{{stockList.StockID}}" v-for="stockList in baseLookUp.stockLists" :selected="$index == 0">-->
                                        <option value="{{stockList.StockID}}" v-for="stockList in checkStockList" :selected="$index == 0">
                                            {{stockList.Name}}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="checkbox-inline">
                                        <input v-model="query.ExcludeShopID" type="checkbox" class="checkbox-width"> 排除
                                    </label>
                                    <label>店铺</label>
                                    <select v-model="query.ShopID" class="form-control">
                                        <option value="" selected>不限</option>
                                        <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">
                                            {{shopList.Name}}
                                        </option>
                                    </select>
                                    <label>货区</label>
                                    <input v-model="query.Space" type="text" class="form-control model-input-width">
                                </div>
                                <div class="form-group">
                                    <label>快递公司</label>
                                    <select v-model="query.MerchantDeliveryID" class="form-control express-select-width">
                                        <option value="" selected>不限</option>
                                        <option value="{{merchantDeliveryList.MerchantDeliveryID}}"
                                                v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">
                                            {{merchantDeliveryList.Name}}
                                        </option>
                                    </select>
                                    <label> 每批单据数量</label>
                                    <input v-model="query.BatchCount" type="text" class="form-control model-input-width">
                                </div>

                                <div class="form-group ">
                                    <label>多明细单据数量</label>
                                    <input v-model="query.MultiBatchCount" type="text" class="form-control"  :disabled="isPostconditions? 'disabled' : false">
                                    <label>分批数</label>
                                    <input v-model="query.TotalCount" type="text" class="form-control">
                                </div>

                                <div class="form-group form-group-date">
                                    <label>指定单据时间
                                    </label>

                                    <div class="date-wrap">
                                        <div class='input-group date' id='order-timepicker-start'>
                                            <input v-model="query.BeginTime | formatDate" type='text' class="form-control"/>
                                            <span class="input-group-addon"><span
                                                    class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <span class="date-link">至</span>
                                    <div class="date-wrap">
                                        <div class='input-group date' id='order-timepicker-end'>
                                            <input v-model="query.EndTime | formatDate" type='text' class="form-control"/>
                                            <span class="input-group-addon"><span
                                                    class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <select v-model="query.TimeType" class="form-control" style="width:150px">
                                        <option value="0">付款时间</option>
                                        <option value="1">订单审核时间</option>
                                    </select>
                                </div>
                                <div class="form-group itemNum">
                                    <label class="checkbox-inline" for="L_ItemNum">
                                        <input v-model="query['L_ItemNum']" id="L_ItemNum" type="checkbox"
                                               class="checkbox-width"> 按明细
                                    </label>
                                    <label class="checkbox-inline" for="L_Addressee">
                                        <input v-model="query['L_Addressee']" id="L_Addressee" type="checkbox"
                                               class="checkbox-width"> 按收件人
                                    </label>
                                    <label class="checkbox-inline" for="L_Delivery">
                                        <input v-model="query['L_Delivery']" id="L_Delivery" type="checkbox"
                                               class="checkbox-width"> 按快递
                                    </label>
                                    <label class="checkbox-inline" for="L_Shop">
                                        <input v-model="query['L_Shop']" id="L_Shop" type="checkbox" class="checkbox-width">
                                        按店铺
                                    </label>
                                    <label class="checkbox-inline " for="L_PayMode">
                                        <input v-model="query['L_PayMode']" id="L_PayMode" type="checkbox"
                                               class="checkbox-width"> 按支付模式
                                    </label>
                                    <label class="checkbox-inline" for="L_Invoice">
                                        <input v-model="query['L_Invoice']" id="L_Invoice" type="checkbox"
                                               class="checkbox-width"> 按发票
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label class="checkbox-inline">
                                        <input v-model="query.ExcludeZone" type="checkbox" class="checkbox-width"> 排除
                                    </label>
                                    <label>地区</label>
                                    <input v-model="query.Zone" type="text" class="form-control">
                                    <label class="checkbox-inline">
                                        <input v-model="query.ExcludeTitle" type="checkbox" class="checkbox-width"/> 排除
                                    </label>
                                    <label>商品标题</label>
                                    <input v-model="query.Title" type="text" class="form-control">
                                </div>

                                <div class="form-group select-border">
                                    <label>
                                        <select v-model="query.SKUPrefix">
                                            <option value="">包含</option>
                                            <option value="!">不包含</option>
                                            <option value="=">仅包含</option>
                                        </select>
                                    </label>
                                    <label>SKU</label>
                                    <input v-model="query.SKU" type="text" class="form-control">
                                </div>
                                <div class="form-group select-border">
                                    <label>
                                        <select v-model="query.ItemCountType"  :disabled="isPostconditions? 'disabled' : false">
                                            <option value="0">明细数</option>
                                            <option value="1">商品数</option>
                                        </select>
                                    </label>
                                    <label>
                                        <select v-model="query.ItemCountLogic"  :disabled="isPostconditions? 'disabled' : false">
                                            <option value="=">=</option>
                                            <option value="&gt;">&gt;</option>
                                            <option value="&lt;">&lt;</option>
                                            <option value="&gt;=">&gt;=</option>
                                            <option value="&lt;=">&lt;=</option>
                                            <option value="&lt;&gt;">&lt;&gt;</option>
                                        </select>
                                    </label>
                                    <input v-model="query.ItemCount" type="text" class="form-control"  :disabled="isPostconditions? 'disabled' : false">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label for="autoPrint" v-if="isPostconditions">
                            <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                        </label>
                        <button @click="close" type="button" class="btn btn-default"> 取消</button>
                        <button @click="submit" type="button" class="btn btn-primary"> 确定</button>
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
        data: function () {
            return {
                autoPrint: false,
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '自动分配批次'
                },
                isPostconditions: false,   //是否为后置分批打印
                baseLookUp: {
                    shopLists: [],  //店铺列表
                    stockLists: [], // 仓库
                    merchantDeliveryLists: [] //快递公司
                },
                checkStockList: [], // 启用的仓库
                query: {
                    'L_ItemNum': false,
                    'L_Addressee': false,
                    'L_Delivery': true,
                    'L_Shop': false,
                    'L_PayMode': true,
                    'L_Invoice': true,
                    ExcludeZone: false,
                    ExcludeShopID: false,
                    ItemCountType: 0,
                    SKUPrefix: '',
                    ExcludeTitle: false,
                    MerchantID: '',
                    StockID: '',
                    TransferType: 23,
                    TimeType: '',
                    BeginTime: '',
                    EndTime: '',
                    MerchantDeliveryID: '',
                    Zone: '',
                    BatchCount: '',
                    TotalCount: '',
                    MultiBatchCount: '',
                    ItemCount: '',
                    ItemCountLogic: '',
                    SKU: '',
                    Title: '',
                    Space: ''
                }
                // 父级组件 单条 数据储存
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
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
                this.modalWindow.show = true;
            },
            submit: function () {
                this.assignOutBatch();
            },
            assignOutBatch: function () {
                var self = this;
                if (this.query.StockID) {
                    if (self.isPostconditions) {
                        this.assignOutBatchAjax('ErpBehindAssignOutBatch');  //后置分批打印
                    } else {
                        this.assignOutBatchAjax('ErpAssignOutBatch');
                    }
                } else {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请选择仓库!'
                    });
                }
            },
            assignOutBatchAjax: function (method) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStockBatch/' + method,
                    data: self.query
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示',
                            contentText: '生成拣货单成功!'
                        });
                        if (self.isPostconditions) {
                            self.print(result.Data);
                        }
                        self.close();
                        self.$dispatch('transmit', 'page-change');
                    }
                })
            },
            //打印
            print: function (sheetList) {
                var sheetListStr = JSON.stringify(sheetList);
                localStorage.printPickSheetList = sheetListStr;
                window.open('#!/print-pick?BusinessType=1' + '&autoPrint=' + this.autoPrint);
            },
            getBaseData: function () {
                var self = this;
                var baseLookUp = self.baseLookUp;
                //店铺列表
                servers.getBaseData('ShopList', false, function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取仓库
                servers.getBaseData('StockList', false, function (val) {
                    val.forEach(function (item) {
                        item.Status == 1 ? self.checkStockList.push(item) : null
                    });
                    baseLookUp.stockLists = val;
                });
                //快递公司
                servers.getBaseData('MerchantDeliveryList', false, function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
            }
        },
        events: {
            'modal-create-pick': function (isPostconditions) {
                this.showModal();
                this.isPostconditions = isPostconditions;
                if (this.baseLookUp.shopLists.length == 0) {
                    this.getBaseData();
                }
            }
        },
        ready: function () {
            //dateTimePicker
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#order-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            });
            $('#order-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            });
            $("#order-timepicker-start").on("dp.change", function (e) {
                $('#order-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#order-timepicker-end").on("dp.change", function (e) {
                $('#order-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .modal-dialog-pick {
        .checkbox-inline {
            line-height: 20px;
            input {
                margin-left: 5px;

            }

        }

    }

    .modal {
        &.pick {
            .modal-content {
                .modal-body-modal {
                    overflow: hidden;
                    overflow-y: hidden;
                    padding: 10px 40px;
                    .form-group {
                        margin-bottom: 0;

                    }
                }
            }
        }
    }

    .modal-body-show {
        height: 380px;
        overflow-x: hidden;
        overflow-y: hidden;

        .wolf-modal-wrap {
            .modal {
                .modal-content {
                    .modal-body {
                        .form-group {
                            input {
                                width: auto;
                            }
                        }
                    }
                }
            }
        }
        .form-group {
            input {
                width: auto;
            }
        }

    }

    .checkbox-width {
        background: #ccc;
        width: 20px !important;
        margin-top: 12px !important;

        &input {
            width: 20px;
            margin: 0;
        }
    }

    .model-allocation {
        .form-group {
            input {
                margin-top: 5px;
            }
            select {
                margin-top: 5px;
            }
        }
        .form-group-date {
            .date {
                margin-top: 5px;
            }
            input {
                margin-top: 0;
            }
            select {
                margin-left: 5px;
            }

        }
    }

    .modal {
        &.pick {
            .itemNum {
                label {
                    min-width: 10px !important;
                    margin: 5px !important;
                }

            }
        }

    }

    .modal {
        &.pick {
            .modal-content {
                .modal-body {
                    .form-group {
                        .model-input-width {
                            width: 200px;
                        }
                        .express-select-width {
                            margin-right: 15px;
                            width: 200px;
                        }

                    }
                    .select-border {
                        select {
                            border-radius: 5px;
                            border: 1px solid #ccc;
                            padding: 0 5px;
                            line-height: 24px;
                            height: 24px;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }

    }

</style>
