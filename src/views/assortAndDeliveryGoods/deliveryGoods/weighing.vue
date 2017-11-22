<template>
    <div class="container-fluid sell-scanning">
        <div class="unify-head">
            称重出库
        </div>
        <div class="query-form">
            <didi v-ref:didi></didi>
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>运单号或订单号</label>
                        <input v-model="query.Delivery" @keyup.stop @keyup.enter.stop="search" type="text" class="form-control" placeholder="按Enter搜索">
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-3">
                        <label>重量（KG）</label>
                        <input v-model="weigh" @keyup.stop @keyup.stop.enter="backWriteWeigh" type="text" class="form-control" placeholder="">
                    </div>
                </div>
                <div class="query-button-group">
                    快捷操作：
                    <!--<a href="javascript:void(0)" class="btn btn-default" @click="backWriteWeigh">完成称重F</a>-->
                    <a href="javascript:void(0)" class="btn btn-default" @click="skipWeighing">直接发货</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="reWeigh">重新称重</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="pauseWeigh">暂停称重</a>
                    <a href="/App_File/电子秤服务.rar" target="_blank" class="btn btn-default" >下载电子秤程序</a>
                </div>
            </div>
        </div>
        <div class="sheet-list sell-scanning-show row ">
            <div class="headline-hd">扫描记录</div>
            <div class="row col-lg-12 col-md-12  col-sm-12" v-if="orderDetails.length > 0">
                <div class="col-lg-12"></div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th>出库单号</th>
                                    <th>出库类型</th>
                                    <th>业务单号</th>
                                    <th>外部机构</th>
                                    <th>支付方式</th>
                                    <th>快递公司</th>
                                    <th>运单号</th>
                                    <th>重量</th>
                                    <th>运费</th>
                                    <th>收货人</th>
                                    <th>收货电话</th>
                                    <th>收货区域</th>
                                    <th>收货地址</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="sheet-list-item" v-for="orderDetail in orderDetails">
                                    <td>{{orderDetail.Sheet}}</td>
                                    <td>{{orderDetail.TransferType | transferTypeToName baseLookUp.transferType}}</td>
                                    <td>{{orderDetail.UpSheet}}</td>
                                    <td>{{orderDetail.InName}}</td>
                                    <td>{{orderDetail.PayMode | payModelCodeToText baseLookUp.payLists}}</td>
                                    <td>{{orderDetail.MerchantDeliveryID | merchantDeliveryIDToName baseLookUp.merchantDeliveryLists}}</td>
                                    <td>{{orderDetail.DeliverySheetID}}</td>
                                    <td>{{orderDetail.Weigh}}</td>
                                    <td>{{orderDetail.Freight}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{orderDetail.LinkMan}}">{{orderDetail.LinkMan  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{orderDetail.Phone || orderDetail.Mobile}}">{{orderDetail.Phone || orderDetail.Mobile | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{orderDetail.Country ? orderDetail.Country +',': ''}}{{orderDetail.State ? orderDetail.State : ''}}{{orderDetail.City ? ',' + orderDetail.City : ''}}{{orderDetail.District ? ',' + orderDetail.District : ''}}">{{orderDetail.Country ? orderDetail.Country+',' : ''}}{{orderDetail.State ? orderDetail.State : ''}}{{orderDetail.City ? ',' + orderDetail.City : ''}}{{orderDetail.District ? ',' + orderDetail.District : ''  | truncationString }} </span></td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{orderDetail.Address}}">{{orderDetail.Address  | truncationString }} </span></td>
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
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    var Didi = require('../../../components/didi.vue');
    module.exports = {
//        data: function () {
//            return {
//                orderDetails: [],
//                weigh: '',
//                hasWeighed: true,
//                query: {
//                    Delivery: '',
//                },
//                baseLookUp: {
//                    payLists: [],
//                    merchantDeliveryLists: [],
//                    transferType: []
//                }
//            }
//        },
        vuex: {
            actions: {
                updateWeighingOrderDetails: actions.updateWeighingOrderDetails,
                updateWeighingWeigh: actions.updateWeighingWeigh,
                updateWeighingHasWeighed: actions.updateWeighingHasWeighed,
                updateWeighingQuery: actions.updateWeighingQuery,
                updateWeighingBaseLookUp: actions.updateWeighingBaseLookUp,
            },
            getters: {
                getWeighingOrderDetails: getters.getWeighingOrderDetails,
                getWeighingWeigh: getters.getWeighingWeigh,
                getWeighingHasWeighed: getters.getWeighingHasWeighed,
                getWeighingQuery: getters.getWeighingQuery,
                getWeighingBaseLookUp: getters.getWeighingBaseLookUp,
            }
        },
        computed: {
            orderDetails: {
                get: function () {
                    return this.getWeighingOrderDetails;
                },
                set: function (orderDetails) {
                    this.updateWeighingOrderDetails(orderDetails);
                }
            },
            weigh: {
                get: function () {
                    return this.getWeighingWeigh;
                },
                set: function (weigh) {
                    this.updateWeighingWeigh(weigh);
                }
            },
            hasWeighed: {
                get: function () {
                    return this.getWeighingHasWeighed;
                },
                set: function (hasWeighed) {
                    this.updateWeighingHasWeighed(hasWeighed);
                }
            },
            query: {
                get: function () {
                    return this.getWeighingQuery;
                },
                set: function (query) {
                    this.updateWeighingQuery(query);
                }
            },
            baseLookUp: {
                get: function () {
                    return this.getWeighingBaseLookUp;
                },
                set: function (baseLookUp) {
                    this.updateWeighingBaseLookUp(baseLookUp);
                }
            },
        },
        methods: {
            //获取扫描记录
            getOrderDetail: function () {
                var self = this;
                if (self.query.Delivery) {
                    if (!self.hasWeighed) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '你还有没有称重的订单,请先称重'
                        });
                        self.playNoticeError()
                        return ;
                    }
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/DeliverGoods/ErpWeighQuery',
                        data: self.query
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.orderDetails.forEach(function (orderDetail) {  //如果有已经扫描并称重的订单,则重新称重
                                if (orderDetail.OutStockID == result.Data.OutStockID) {
                                    self.orderDetails.$remove(orderDetail);
                                }
                            });
                            result.Data.Weigh = '';
                            result.Data.Freight = '';
                            self.orderDetails.push(result.Data);
                            self.hasWeighed = false;
                            self.getLagouData();   //扫描成功后,获取电子称重量
                            self.playNoticeOrderSuccess()
                        } else {
                            self.playNoticeError()
                        }
                    });
                } else if (!self.query.Delivery){
                    self.playNoticeError()
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入运单号'
                    });
                }
            },
            search: function () {
                this.getOrderDetail();
            },
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.payLists = val;
                });
                //快递公司
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
                //业务类型
                servers.getBaseData('TransferType',false,function (val) {
                    baseLookUp.transferType = val;
                });
            },
            //获取最新一条订单
            getTheLatestOrder: function () {
                var self = this;
                var orderDetailLength = self.orderDetails.length;
                if (orderDetailLength > 0) {
                    return self.orderDetails[orderDetailLength - 1];
                } else {
                    return {};
                }
            },
            //称重出库
            backWriteWeigh: function () {
                var self = this;
                var orderDetailLength = self.orderDetails.length;
                if (orderDetailLength > 0) {
                    if (parseInt(parseFloat(self.weigh) * 1000) > 0) {
                        var latestOrder = this.getTheLatestOrder();
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/DeliverGoods/ErpBackWriteWeigh',
                            data: {
                                OutStockID: latestOrder.OutStockID,
                                Country:latestOrder.Country,
                                State: latestOrder.State,
                                City: latestOrder.City,
                                District: latestOrder.District,
                                StockID: latestOrder.StockID,
                                InID: latestOrder.InID,
                                MerchantDeliveryID: latestOrder.MerchantDeliveryID,
                                OutStockFlag: {
                                    Weigh: parseInt(parseFloat(self.weigh) * 1000),
                                    DeliverySheetID: latestOrder.DeliverySheetID
                                }
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','autoHideTip',{
                                    name: '提示:',
                                    contentText: '出库成功',
                                    time: 1000
                                });
                                latestOrder.Weigh = self.weigh;
                                latestOrder.Freight = result.Data;
                                self.hasWeighed = true;
                                self.weigh = '';
                                self.query.Delivery = '';
                                latestOrder.hasWeighed = true;
                                self.playNoticeGoodSuccess()
                            } else {
                                self.playNoticeError()
                            }
                        }).fail(function() {
                            self.playNoticeError()
                        })
                    } else {
                        self.playNoticeError()
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '请先填写重量'
                        });
                    }

                } else {
                    self.playNoticeError()
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '没有需要称重的订单'
                    });
                }
            },
            //获取重量
            getLagouData: function () {
                var self = this;
                $.ajax({
                    async:false,
                    url: "http://127.0.0.1:8000",
//                    url: "http://192.168.88.201:8000",
                    data: "Param=weighValue",
                    type: "GET",
                    timeout: 1000,
                    dataType: "jsonp",
                    jsonpCallback: 'success_jsonpCallback',
                    contentType: "application/jsonp; charset=utf-8"
                }).done(function (result) {
                    if (parseFloat(result.weighValue) > 0) {   //如果查询出重量
                        self.weigh = parseFloat(result.weighValue);
                        //查询到重量马上稳重出库
                        self.backWriteWeigh();
                        self.playNoticeGoodSuccess()
                    } else {   //如果没有重量,则重新查询
                        self.getLagouData();
                    }
                }).fail(function (error) {
                    console.log(error);
                })
            },
            //不称重出库
            skipWeighing: function (ItemID) {
                var self = this;
                var latestOrder = this.getTheLatestOrder();
                var outStockIDGroups = [];
                if (latestOrder.OutStockID) {
                    outStockIDGroups.push(latestOrder.OutStockID);
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
            //重新称重
            reWeigh: function () {
                this.weigh = '';
                this.hasWeighed = false;
            },
            //暂停称重
            pauseWeigh: function () {
                var latestOrder = this.getTheLatestOrder();
                if (latestOrder.hasWeighed) {
                    return ;
                } else {
                    this.orderDetails.$remove(latestOrder);
                    this.hasWeighed = true;
                    this.query.Delivery = '';
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
        route: {
            data: function (transition) {
                // 如果有传递运单号,则直接查询
                var delivery = transition.to.query.Delivery;
                if (delivery) {
                    this.query.Delivery = delivery;
                    this.search();
                }
            }
        },
        ready: function () {
            var self = this;
            $(document).on('keyup',function (event) {
                if (event.keyCode == 70) {
//                    self.backWriteWeigh();
                }
            });
            this.getBaseData();
        },
        components: {
            Didi,
//            pagination: require('../components/pagination.vue')
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
    }
</style>