<template>
<div class="container-fluid container-fluid-margin entering-order">
<div class="unify-head">
            基础信息
        </div>
    <div class="query-form">

        <div class="query-header query-header-margin">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    录入订单
                </label>
                <div class="checkbox-list">
                </div>
                <!--<a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>-->
            </div>
        </div>
        <div id="query-detail" class="form-inline collapse in query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>外部交易号<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.OutSheetID" type="text" class="form-control"/>
                </div>

                <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>渠道</label>
                        <select v-model="customerOrder.Shop.NetShop.Channel.Name" class="form-control">
                            <option value="" selected>不限</option>
                            <option value="{{channelList.ChannelID}}" selected v-for="channelList in baseLookUp.channelList">{{channelList.Name}}</option>
                    </select>
                </div> -->

                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>店铺<span class="form-required-mark">*</span></label>
                    <select v-model="customerOrder.ShopID" class="form-control" @change="relativeChange">
                            <option v-for="ShopList in baseLookUp.ShopList" value="{{ShopList.ShopID}}">{{ShopList.Name}}</option>
                        </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>订单类型<span class="form-required-mark">*</span></label>
                    <select v-model="customerOrder.OrderType" class="form-control">

                        <option v-for="customerOrderType in baseLookUp.customerOrderType" value="{{customerOrderType.Code}}">{{customerOrderType.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>购买者姓名<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.BuyerNick" type="text"  class="form-control"/>
                </div>

                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>支付方式<span class="form-required-mark">*</span></label>
                    <select v-model="customerOrder.PayMode" class="form-control">
                            <option v-for="PayModel in baseLookUp.PayModel" value="{{PayModel.Code}}" >{{PayModel.Text}}</option>
                        </select>
                </div>

                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>支付流水</label>
                    <input v-model="customerOrder.OrderDetail.AlipayNo" type="text"  class="form-control"/>
                </div>

                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>买家留言</label>
                    <input v-model="customerOrder.OrderBusiness.BuyerMemo" type="text"  class="form-control"/>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>备注旗帜</label>
                    <select v-model="customerOrder.OrderBusiness.SellerFlag" class="form-control">
                            <option v-for="sellerFlag in baseLookUp.sellerFlags" value="{{sellerFlag.Code}}">{{sellerFlag.Text}}</option>
                        </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>卖家备注</label>
                    <input v-model="customerOrder.OrderBusiness.SellerMemo" type="text"  class="form-control"/>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>发货仓库</label>
                    <select v-model="customerOrder.StockID" class="form-control" @change="manualChangeStock(true)">
                        <option v-for="stock in baseLookUp.stockLists" value="{{stock.StockID}}">{{stock.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>快递公司<span class="form-required-mark">*</span></label>
                    <select v-model="customerOrder.OrderFlag.MerchantDeliveryID" class="form-control">
                        <option v-for="merchantDelivery in baseLookUp.merchantDeliveryLists" value="{{merchantDelivery.MerchantDeliveryID}}">{{merchantDelivery.Name}}</option>
                    </select>
                </div>
                <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>快递单号</label>
                        <input v-model="customerOrder.OrderFlag.DeliverySheetID" type="text"  class="form-control"/>
                    </div> -->
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>收货人<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.LinkMan" @change="manualChangeState(customerOrder.LinkMan,'isManualChangeLinkMan')" type="text"  class="form-control"/>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>联系电话<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.Phone" @change="manualChangeState(customerOrder.Phone,'isManualChangePhone')" type="text"  class="form-control"/>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>联系手机<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.Mobile" type="text" @change="manualChangeState(customerOrder.Mobile,'isManualChangeMobile')" class="form-control"/>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>邮政编码</label>
                    <input v-model="customerOrder.OrderDetail.ZipCode" type="text" value="" class="form-control"/>
                </div>
                 <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>收货区域<span class="form-required-mark">*</span></label>
                    <select-area :state-id.sync="customerOrder.StateID" :city-id.sync="customerOrder.CityID" :district-id.sync="customerOrder.DistrictID" :state.sync="customerOrder.State" :city.sync="customerOrder.City" :district.sync="customerOrder.District"></select-area>
                </div>
                <!--<div class="form-group col-lg-3 col-md-4 col-sm-6 takeDelivery">-->
                    <!--<label>收货区域</label>-->
                    <!--<input v-model="customerOrder.State" type="text"  class="form-control" placeholder="省"/>-->
                    <!--<input v-model="customerOrder.City" type="text"  class="form-control" placeholder="市"/>-->
                    <!--<input v-model="customerOrder.District" type="text"  class="form-control" placeholder="区"/>-->
                <!--</div>-->
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>收货地址<span class="form-required-mark">*</span></label>
                    <input v-model="customerOrder.Address" @change="manualChangeState(customerOrder.Address,'isManualChangeAddress')" type="text" value=""  class="form-control" />
                </div>
                <div class="form-group col-lg-3 col-md-6 col-sm-6">
                    <label >支付时间</label>
                    <div class="date-wrap">
                        <div class='input-group date' id='pay-timepicker-start'>
                            <input v-model="customerOrder.PayTime" @mouseover="updateTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="headline-hd sell-operational sell-blurb type-order-margin">商品信息  <span class="btn btn-primary iconfont icon-arrow-up" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></span></div>
        <div class="collapse in" id="collapseExample">
            <div class="well type-order-well">
                <div class="sell-blurb-show">
                    <order-detail :order-items="customerOrder.OrderItems" :type="typeOrder" :shop-id="customerOrder.ShopID"></order-detail>
                </div>
            </div>
        </div>
        <div class="lineitem-operation lineitem-operation-margin">

            <a @click="saveCustomerOrder" href="javascript:void(0)" class="btn btn-default" v-if="isShowSave">保存</a>
            <span  class="btn btn-default" style="background: #E5E5E5;color: white;" v-else>保存</span>
            <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
        </div>
    </div>
    <!--</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    module.exports = {
        props: ['customerOrderId'],
        data: function () {
            return {
                show: {
                    flog: false
                },
                isShowSave:true,
                typeOrder: 'typeOrder',
//                isManualChangeStock: false,  //是否手动更改仓库
//                isManualChangeLinkMan: false, //是否手动更改联系人
//                isManualChangeMobile: false,  //是否手动更改手机
//                isManualChangePhone: false, //是否手动更改电话
//                isManualChangeAddress: false, //是否手动更改地址
////                isShowSelectArea: true,
//                baseLookUp: {
//                    sellerFlags: [],  //淘宝旗帜
//                    stockLists: [],   //仓库
//                    merchantDeliveryLists: [],  //快递公司
//                    PayModel: [], //支付方式
//                    ChannelList: [], //渠道
//                    ShopList: [], //店铺
//                    channelList: [], //网店平台
//                    customerOrderType: [] //获取订单类型
//                },
//                customerOrderItem: {
//                    OutSheetID: '',
//                    BuyerNick: '',
//                    PayModeDesc: '',
//                    PayMode: '',
//                    State: '',
//                    StateID: '',
//                    City: '',
//                    CityID: '',
//                    District: '',
//                    DistrictID: '',
//                    Address: '',
//                    OrderItems: [],
//                    ShopID: '',
//                    StockID: '',
//                    LinkMan: '',
//                    Mobile: '',
//                    Phone: '',
//                    OrderType: '',
//                    PayTime: new Date(),
//                    Shop: {
//                        Name: '',
////                        NetShop: {
////                            Channel: {
////                                Name: ''
////                            }
////                        }
//                    },
//                    OrderDetail: {
//                        AlipayNo: '',
//                        ZipCode: '',
//                    },
//                    OrderBusiness: {
//                        BuyerMemo: '',
//                        SellerFlag: '',
//                        SellerMemo: '',
//                    },
//                    Stock: {
//                        StockID: ''
//                    },
//                    OrderFlag: {
//                        MerchantDeliveryID: '',
//                        DeliverySheetID: '',
//                        MerchantDelivery: {
//                            LinkMan: '',
//                            LinkTel: '',
//                            Name: ''
//                        }
//                    }
//                }
            }
        },
        vuex: {
           actions: {
               updateTypeOrderIsManualChangeStock: actions.updateTypeOrderIsManualChangeStock,
               updateTypeOrderIsManualChangeLinkMan: actions.updateTypeOrderIsManualChangeLinkMan,
               updateTypeOrderIsManualChangeMobile: actions.updateTypeOrderIsManualChangeMobile,
               updateTypeOrderIsManualChangePhone: actions.updateTypeOrderIsManualChangePhone,
               updateTypeOrderIsManualChangeAddress: actions.updateTypeOrderIsManualChangeAddress,
               updateTypeOrderBaseLookUp: actions.updateTypeOrderBaseLookUp,
               updateTypeOrderCustomerOrderItem: actions.updateTypeOrderCustomerOrderItem,
               resetCustomerOrderItem: actions.resetCustomerOrderItem
           },
            getters: {
                getTypeOrderIsManualChangeStock: getters.getTypeOrderIsManualChangeStock,
                getTypeOrderIsManualChangeLinkMan: getters.getTypeOrderIsManualChangeLinkMan,
                getTypeOrderIsManualChangeMobile: getters.getTypeOrderIsManualChangeMobile,
                getTypeOrderIsManualChangePhone: getters.getTypeOrderIsManualChangePhone,
                getTypeOrderIsManualChangeAddress: getters.getTypeOrderIsManualChangeAddress,
                getTypeOrderBaseLookUp: getters.getTypeOrderBaseLookUp,
                getTypeOrderCustomerOrderItem: getters.getTypeOrderCustomerOrderItem,
            }
        },
        computed: {
            isManualChangeStock: {
                get: function () {
                    return this.getTypeOrderIsManualChangeStock;
                },
                set: function (isManualChangeStock) {
                    this.updateTypeOrderIsManualChangeStock(isManualChangeStock);
                }
            },
            isManualChangeLinkMan: {
                get: function () {
                    return this.getTypeOrderIsManualChangeLinkMan;
                },
                set: function (isManualChangeLinkMan) {
                    this.updateTypeOrderIsManualChangeLinkMan(isManualChangeLinkMan);
                }
            },
            isManualChangeMobile: {
                get: function () {
                    return this.getTypeOrderIsManualChangeMobile;
                },
                set: function (isManualChangeMobile) {
                    this.updateTypeOrderIsManualChangeMobile(isManualChangeMobile);
                }
            },
            isManualChangePhone: {
                get: function () {
                    return this.getTypeOrderIsManualChangePhone;
                },
                set: function (isManualChangePhone) {
                    this.updateTypeOrderIsManualChangePhone(isManualChangePhone);
                }
            },
            isManualChangeAddress: {
                get: function () {
                    return this.getTypeOrderIsManualChangeAddress;
                },
                set: function (isManualChangeAddress) {
                    this.updateTypeOrderIsManualChangeAddress(isManualChangeAddress);
                }
            },
            baseLookUp: {
                get: function () {
                    return this.getTypeOrderBaseLookUp;
                },
                set: function (baseLookUp) {
                    this.updateTypeOrderBaseLookUp(baseLookUp);
                }
            },
            customerOrderItem: {
                get: function () {
                    return this.getTypeOrderCustomerOrderItem;
                },
                set: function (customerOrderItem) {
                    this.updateTypeOrderCustomerOrderItem(customerOrderItem);
                }
            },
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //选择店铺时，将默认仓库带出
            relativeChange: function () {
                var self = this;
                var customerOrder = this.customerOrder;
                var shopID = customerOrder.ShopID;
                var stockID = customerOrder.StockID;
                var linkMan = customerOrder.LinkMan;
                var mobile = customerOrder.Mobile;
                var phone = customerOrder.Phone;
                var address = customerOrder.Address;
                var ShopList = this.baseLookUp.ShopList;
                ShopList.forEach(function (item) {
                    if (item.ShopID == shopID) {
                        if (!stockID || !self.isManualChangeStock) {  //如果为手动更改的仓库，则不带出默认仓库
                            customerOrder.StockID = item.Stock.StockID;
                        }
                        if (!linkMan || !self.isManualChangeLinkMan) {
                            customerOrder.LinkMan = item.ShopDetail.LinkMan || '';
                        }
                        if (!mobile || !self.isManualChangeMobile) {
                            customerOrder.Mobile = item.ShopDetail.Mobile || '';
                        }
                        if (!phone || !self.isManualChangePhone) {
                            customerOrder.Phone = item.ShopDetail.LinkTel || '';
                        }
                        if (!address || !self.isManualChangeAddress) {
                            customerOrder.Address = item.ShopDetail.Address || '';
                        }
                        customerOrder.StateID = item.ShopDetail.State || '';
                        customerOrder.CityID = item.ShopDetail.City || '';
                        customerOrder.DistrictID = item.ShopDetail.District || '';
                        self.$broadcast('newProp');
                    }
                })
            },
            //仓库更改时，如果是手动更改仓库，则将isManualChangeStock设为true
            manualChangeStock: function (isManualChangeStock) {
                this.isManualChangeStock = isManualChangeStock;
            },
            //手动更改联系人
            manualChangeState: function (val,statusName) {
                if (val) {
                    this[statusName] = true;
                } else {
                    this[statusName] = false;
                }
            },
            //获取下拉列表数据
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取淘宝旗帜
                servers.getBaseData('SellerFlag',true,function (val) {
                    baseLookUp.sellerFlags = val;
                });
                //获取仓库
                servers.getBaseData('StockList',false,function (val) {
                    baseLookUp.stockLists = val
                });
                //获取快递公司
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.PayModel = val;
                });
                //获取店铺
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.ShopList = val;
                });
                //渠道
                servers.getBaseData('ChannelList',false,function (val) {
                    baseLookUp.channelList = val;
                });
                //获取订单类型
                servers.getBaseData('CustomerOrderType',false,function (val) {
                    baseLookUp.customerOrderType = val;
                })
            },
            //保存
            saveCustomerOrder: function () {
                var self = this;
                var orderItems = this.customerOrder.OrderItems;
                this.customerOrder.CustomerOrderItemID = '';
                this.customerOrder.CustomerOrderID = '';
                var hasNotCompleteItem = false;
                if (orderItems.length == 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请先完善订单明细'
                    });
                } else {
                    orderItems.forEach(function (orderItem) {
                        if (!orderItem.isSaved && !orderItem.isNotSelected) {
                            orderItem.Qty = orderItem._Qty;
                            orderItem.Price = orderItem._Price;
                        } else if (orderItem.isNotSelected) {
                            hasNotCompleteItem = true;
                        }
                    });
                    if (hasNotCompleteItem) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请先完善订单明细'
                        });
                        return ;
                    }else if(this.customerOrder.PayMode===''){
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请选择支付方式！'
                        });
                        return ;
                    }else {
                        self.isShowSave = false
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpSaveCustomerOrder',
                            data: self.customerOrder
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '保存成功'
                                });
                                self.isShowSave = true
                                self.resetForm();
                            }
                        });
                    }
                }


            },
            resetForm: function () {
                this.$broadcast('resetArea');
                this.resetCustomerOrderItem();
                this.customerOrder = {
                    OutSheetID: '',
                    BuyerNick: '',
                    PayModeDesc: '',
                    PayMode: '1',
                    State: '',
                    City: '',
                    District: '',
                    Address: '',
                    OrderItems: [],
                    ShopID: '',
                    StockID: '',
                    PayTime: this.formateDate(new Date()),
                    OrderType: '1',
                    LinkMan: '',
                    Phone: '',
                    Mobile: '',
                    Shop: {
                        Name: '',
//                        NetShop: {
//                            Channel: {
//                                Name: ''
//                            }
//                        }
                    },
                    OrderDetail: {
                        AlipayNo: '',
                        ZipCode: ''
                    },
                    OrderBusiness: {
                        BuyerMemo: '',
                        SellerFlag: '',
                        SellerMemo: ''
                    },
                    Stock: {
                        StockID: ''
                    },
                    OrderFlag: {
                        MerchantDeliveryID: '',
                        DeliverySheetID: '',
                        MerchantDelivery: {
                            LinkMan: '',
                            LinkTel: '',
                            Name: ''
                        }
                    }
                };
            },
            //复制的时候获取订单
            getCustomerOrder: function(customerID) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpQueryCustomerOrderTempByID',
                    data: {
                        ID: customerID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        result.Data.OrderItems.forEach(function (item) {
                            item.isSaved = true;
                        });
                        result.Data.PayTime = result.Data.PayTime || self.formateDate(new Date());
                        self.customerOrder = $.extend(self.customerOrderItem,result.Data);
                        self.customerOrderItem = self.customerOrder;
                    }
                });
            },
            formateDate: function (val) {
                var date = new Date(val);
                var year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate(),
                        hours = date.getHours(),
                        minutes = date.getMinutes(),
                        seconds = date.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            }
        },
        components: {
            orderDetail: require('./order-detail.vue'),
            selectArea: require('../../../components/select-area.vue'),
        },

        ready: function () {
            var self = this;
            this.getBaseData();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');

            if (this.customerOrderId) {
                this.getCustomerOrder(this.customerOrderId);
            } else {
                this.customerOrder = this.customerOrderItem;
                this.customerOrder.PayMode = this.customerOrder.PayMode==''? 1:this.customerOrder.PayMode;
                this.customerOrder.OrderType= this.customerOrder.OrderType==''?1:this.customerOrder.OrderType;
                this.customerOrder.PayTime = this.formateDate(new Date());
            }
            $('#pay-timepicker-start').datetimepicker({
                todayBtn: true,
                minView: 2
            });
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.entering-order{
    .sell-lineitem{

        .sell-lineitem-hd{
            border-bottom: 1px solid #E0E0E0;
            line-height:38px;
            font-size: 16px;
            font-weight:bold;
            color:#38455E;
            margin-bottom:15px;

            i{
                font-style:normal;
                border-left:5px solid #FF8596;
                padding-left:10px;
            }

        }
        .query-form{
            border-radius:5px;
            box-shadow:3px 3px 3px #EAEBF0;

        }
        .query-detail{
            padding-top:0;
        }
        .form-group:nth-of-type(2){
            border:none;

        }
        .form-group {
            margin-bottom:0;
            border-bottom:1px solid #E5E5E5;
            label{
                color:#4D68AD;
                line-height:45px;
            }
            line-height:45px;
        }
        .sell-lineitem-process{
            border-radius:5px;
            border: 1px solid #E5E5E5;
            box-shadow:3px 3px 3px #EAEBF0;
            background: #fff;
            width: 100%;
            height: 216px;
            margin:20px 0;

            .sell-progress{
                width: 1034px;
                height:56px;
                margin:0 auto;
                overflow:hidden;
                margin-top:48px;
                position: relative;
                .sell-progress-img{
                    display:block;
                    position: absolute;
                    left:-601px;
                    top:0;
                }


            }


        }
        .sell-progress-text{
            ul{
                width: 1200px;
                margin:0 auto;
                li{
                    width: 200px;
                    height:50px;

                    float:left;
                    text-align:center;
                    span{
                        font-size: 14px;
                        &.active {
                            color:#FF8A85;
                        }
                    }
                    em{
                        font-style:normal;
                        color:#869FDF;
                    }
                }
            }
        }

        .sell-lineitem-show{
            border: 1px solid #E5E5E5;
            padding:15px;
            white-space: nowrap;
            border-top:none;
            .col-lg-1{
                min-width:60px;
                text-align:left;
                line-height: 28px;
            }
            .col-lg-5{


            }
        }
        input{
            padding-left:8px;
            font-size: 12px;
            border-radius:5px;
            border: 1px solid #CCCCCC;
            line-height:24px;
            margin-top:5px 0;
            width: 100%;

        }
        select{
            margin:5px 0;
        }


        .sell-operational{
            margin:40px 0 0;
            .well{
                color:#333333;
            }
        }
        .sell-operational-show{

            .batch-operation-group{
                a{
                    color:#5F7CB6;
                    border: 1px solid #5F7CB6;
                    line-height:18px;

                }
                a:hover{
                    background: #5F7CB6;
                    color:#fff;
                }

            }
        }

        .sell-otl-hd{
            margin:20px 0;
            font-size: 14px;
            color:#526BAF;

        }
        .sell-otl-show{

            td{
                border: 1px dashed #E5E5E5;
                border-top:none;
                text-align:center;
                i{
                    color:#FF7E7E;
                    font-style:normal;
                }
            }

        }



        .sell-operational-true,.sell-blurb{
            span{
                display:block;
                width: 20px;
                height: 20px;
                float:right;
                margin-top:8px;

            }

        }


        .sell-blurb-show{
            border-top:none;
            padding:10px;
            text-align:center;

        }

        .headline-hd {
            border-bottom:1px solid #E5E5E5;
            margin-top:15px;

        }
        .icon-arrow-up{
            line-height:10px;padding:0;
            line-height:20px;
        }

    }

    .change-orders{
        position: absolute;
        left:20px;
        top:0;
        background: #fff;

    }

    .w-content{
        position: relative;
    }
    .select-min{
        select{
            min-width:80px;
            float:left;
        }
    }
    .type-order-well{
        background: #fff;
        padding:5px;

        table{
            border:1px solid #e5e5e5;
            thead{
                border-top: 1px solid #e5e5e5;
                tr{
                    th{
                        border-top:1px solid #e5e5e5;
                        border-bottom:1px solid #e5e5e5;
                        line-height:2.028571;
                        text-align:center;
                    }

                    th:nth-of-type(1){
                        width:90px;
                    }
                }

            }
            tbody{
                tr{
                    td{
                        border-bottom:1px solid #e5e5e5;
                        border-right:1px solid #e5e5e5;
                    }
                }
            }


        }
    }
    .lineitem-operation-margin{
        margin-top:15px;

    }
    .type-order-row{
        min-width:500px;

    }
    .type-order-margin{
        margin-top:20px;
        border-bottom: 1px solid #e5e5e5;
        .btn {
            float:right;
            margin-top:5px;
        }
    }
}




</style>