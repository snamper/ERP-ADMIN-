<template>
    <div class="container-fluid">
        <div class="unify-head">
            {{pageInfo.text}}订单
        </div>
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>订单号</label>
                        <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label >外部交易号</label>
                        <input v-model="query.OutSheetID | arrayToString" type="text" class="form-control"  placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label>渠道</label>
                        <select v-model="query.ChannelID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{channelList.ChannelID}}" selected v-for="channelList in baseLookUp.channelList">{{channelList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label >店铺</label>
                        <select v-model="query.ShopID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >支付方式</label>
                        <select v-model="query.PayMode" class="form-control">
                            <option value="">不限</option>
                            <option value="{{payList.Code}}" v-for="payList in baseLookUp.payLists">{{payList.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label >支付流水</label>
                        <input v-model="query.AlipayNo" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货人</label>
                        <input v-model="query.LinkMan" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货区域</label>
                        <select-area :state.sync="query.State" :city.sync="query.City" :district.sync="query.District" ></select-area>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >收货地址</label>
                        <input v-model="query.Address" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >联系电话</label>
                        <input v-model="query.Phone" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >出库仓库</label>
                        <select v-model="query.StockID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{stockList.StockID}}"  v-for="stockList in baseLookUp.stockLists">{{stockList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >快递公司</label>
                        <select v-model="query.MerchantDeliveryID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{merchantDeliveryList.DeliveryID}}" v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">{{merchantDeliveryList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >运单号</label>
                        <input v-model="query.DeliverySheetID" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >购买者姓名</label>
                        <input v-model="query.BuyerNick" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>需要发票</label>
                        <select v-model="query.InvoiceFlag" class="form-control">
                            <option selected value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品编码</label>
                        <input v-model="query.CustomNo | arrayToString" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>颜色</label>
                        <input v-model="query.ColorName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>尺码</label>
                        <input v-model="query.SizeName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>交易备注</label>
                        <input v-model="query.TradeMemo" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label>买家留言</label>
                        <input v-model="query.BuyerMemo" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.isCallback">
                        <label>商家留言</label>
                        <input v-model="query.SellerMemo" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>拣货单号</label>
                        <input v-model="query.StockBatchSheet | arrayToString" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6"  v-if="!pageInfo.isCallback">
                        <label>上游单号</label>
                        <input v-model="query.UpSheet | arrayToString" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6"  v-if="!pageInfo.isCallback">
                        <label>业务单号</label>
                        <input v-model="query.OutStockBatchSheet | arrayToString" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="!pageInfo.isCallback">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6"  v-if="!pageInfo.isCallback">
                        <label>业务类型</label>
                        <select v-model="query.TransferType" class="form-control">
                            <option value="">不限</option>
                            <option value="{{transferType.Code}}" v-for="transferType in baseLookUp.transferType">{{transferType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6"  v-if="!pageInfo.isCallback">
                        <label>外部机构</label>
                        <select v-model="query.InID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{inID.OrginID}}" v-for="inID in baseLookUp.inID">{{inID.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12" v-if="pageInfo.isCallback">
                        <label >付款时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-start'>
                                <input v-model="query.PayTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-timepicker-end'>
                                <input v-model="query.PayTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12" v-if="pageInfo.isCallback">
                        <label >通知配货</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='assorting-timepicker-start'>
                                <input v-model="query.EditTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='assorting-timepicker-end'>
                                <input v-model="query.EditTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12" v-if="pageInfo.isCallback">
                        <label>生成拣货单</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='delivery-timepicker-start'>
                                <input v-model="query.UpCheckTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='delivery-timepicker-end'>
                                <input v-model="query.UpCheckTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-12 col-sm-12" v-if="!pageInfo.isCallback">
                        <label>修改时间 </label>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-start'>
                                <input v-model="query.EditTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-end'>
                                <input v-model="query.EditTime_to | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetQueryForm">重置</a>
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                    <!--<a href="javascript:void(0)" class="btn btn-default">导出商品明细</a>-->
                </div>
            </div>
        </div>
        <slot name="tableList"></slot>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var globalConstants = require('../../../globalConstants');
    require('../../../css/bootstrap-datetimepicker.css');
    require('../../../js/plugins/bootstrap-datetimepicker');
    module.exports = {
        props: ['paginationOptions','deliverGoods','baseLookUp'],
        data: function () {
            return {
                show: {
                    flog: false
                },
                query: {
                    Flag: '',
                    Sheet: [],
                    OutSheetID: [],
                    CustomBC: [],
                    StockBatchSheet: [],
                    CustomNo: [],

                    ChannelID: '',
                    ShopID: '',
                    StockID: '',
                    MerchantID: '',

                    PayMode: '',
                    MerchantDeliveryID: '',
                    InvoiceFlag: '',

                    AlipayNo: '',
                    LinkMan: '',
                    State: '',
                    City: '',
                    District: '',
                    Address: '',
                    Phone: '',
                    DeliverySheetID: '',
                    BuyerNick: '',
                    Note: '',
                    GoodsName: '',
                    ColorName: '',
                    SizeName: '',
                    BuyerMemo: '',
                    SellerMemo: '',
                    TradeMemo: '',

                    PayTime: '',
                    PayTime_to: '',
                    EditTime: '',
                    EditTime_to: '',
                    UpCheckTime: '',
                    UpCheckTime_to: '',

                    OutStockBatchSheet: [],
                    UpSheet: [],
                    TransferType: '',
                    InID: '',

                    Editor: '',
                },
                pageInfo: {
                    status: '',
                    text: '',
                    isCallback: false
                },
                deliverGoods: [],
//                baseLookUp: {
//                    stockLists: [],
//                    merchantDeliveryLists: [],
//                    shopLists: [],
//                    channelList: [],
//                    payLists: [],   // 支付方式
//                }
            }
        },
        activate: function (done) {
            var status = this.pageInfo.status = this.$router._currentRoute.name.slice(9);
            this.query.Flag = globalConstants.deliveryFlag[status].code;
            if (this.query.Flag == 100) {
                this.pageInfo.isCallback = true;
            } else {
                this.pageInfo.isCallback = false;
            }
            this.pageInfo.text = globalConstants.deliveryFlag[status].text;
            this.getDeliverGoods();
            setTimeout(function () {
                $('#pay-timepicker-start,#assorting-timepicker-start,#delivery-timepicker-start,#edit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
                });
                $('#pay-timepicker-end,#assorting-timepicker-end,#delivery-timepicker-end,#edit-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
                });
                $("#pay-timepicker-start,#assorting-timepicker-start,#delivery-timepicker-start,#edit-timepicker-start").on("dp.change",function (e) {
                    $('#pay-timepicker-end,#assorting-timepicker-end,#delivery-timepicker-end,#edit-timepicker-end').data("DateTimePicker").minDate(e.date);
                });
                $("#pay-timepicker-end,#assorting-timepicker-end,#delivery-timepicker-end,#edit-timepicker-end").on("dp.change",function (e) {
                    $('#pay-timepicker-start,#assorting-timepicker-start,#delivery-timepicker-start,#edit-timepicker-start').data("DateTimePicker").maxDate(e.date);
                });


                $('#pay-timepicker-start,#assorting-timepicker-start,#delivery-timepicker-start,#edit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
                }).on('changeDate',function (e) {
                    $('#pay-timepicker-end,#assorting-timepicker-end,#delivery-timepicker-end,#edit-timepicker-end').datetimepicker('setStartDate',e.date);
                });
                $('#pay-timepicker-end,#assorting-timepicker-end,#delivery-timepicker-end,#edit-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
                }).on('changeDate',function (e) {
                    $('#pay-timepicker-start,#assorting-timepicker-start,#delivery-timepicker-start,#edit-timepicker-start').datetimepicker('setEndDate',e.date);
                });

            },500);
            done();
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //待称重和待扫描
            getWeighOrPick: function () {
                var self = this;
                var pageStatus = self.pageInfo.status;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/DeliverGoods/ErpDeliverQuery',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var deliverGoods = result.Data.PageData;
                        self.deliverGoods = [];
                        if (deliverGoods.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            deliverGoods.forEach(function (item) {
                                item.checked = false;
                            });
                            self.deliverGoods = deliverGoods;
                        }
                    }
                })
            },
            //待回写
            getCallback: function () {
                var self = this;
                var pageStatus = self.pageInfo.status;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/DeliverGoods/ErpDeliverGoodsQuery',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var deliverGoods = result.Data.PageData;
                        self.deliverGoods = [];
                        if (deliverGoods.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            deliverGoods.forEach(function (item) {
                                item.checked = false;
                            });
                            self.deliverGoods = deliverGoods;
                        }
                    }
                })
            },
            //查询
            getDeliverGoods: function () {
                if (this.query.Flag == 100) {  //待回写
                    this.getCallback();
                } else {
                    this.getWeighOrPick();
                }
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getDeliverGoods();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //重置搜索条件
            resetQueryForm: function () {
                this.query = {
                    Flag: this.query.Flag,
                    Sheet: [],
                    OutSheetID: [],
                    CustomBC: [],
                    StockBatchSheet: [],
                    CustomNo: [],

                    ChannelID: '',
                    ShopID: '',
                    StockID: '',
                    MerchantID: '',

                    PayMode: '',
                    MerchantDeliveryID: '',
                    InvoiceFlag: '',

                    AlipayNo: '',
                    LinkMan: '',
                    State: '',
                    City: '',
                    District: '',
                    Address: '',
                    Phone: '',
                    DeliverySheetID: '',
                    BuyerNick: '',
                    Note: '',
                    GoodsName: '',
                    ColorName: '',
                    SizeName: '',
                    BuyerMemo: '',
                    SellerMemo: '',
                    TradeMemo: '',

                    PayTime: '',
                    PayTime_to: '',
                    EditTime: '',
                    EditTime_to: '',
                    UpCheckTime: '',
                    UpCheckTime_to: '',

                    OutStockBatchSheet: [],
                    UpSheet: [],
                    TransferType: '',
                    InID: '',

                    Editor: ''
                };
                this.$broadcast('resetArea');
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockLists = val;
                });
                //快递公司
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
                //店铺列表
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                //平台
                servers.getBaseData('ChannelList',false,function (val) {
                    baseLookUp.channelList = val;
                });
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.payLists = val;
                });
                //业务类型
                servers.getBaseData('TransferType',false,function (val) {
                    baseLookUp.transferType = val;
                });
                //外部机构
                servers.getBaseData('VOrginList',false,function (val) {
                    baseLookUp.inID = val;
                })
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getDeliverGoods();
            },
            'searchGoods': function () {
                this.getDeliverGoods();
            }
        },
        ready: function () {
            this.getBaseLookUp();
            //dateTimePicker
        },
        components: {
            selectArea: require('../../../components/select-area.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>