<template>
<div class="change-orders-show" v-show="pageInfo.editShow">
    <div class="edit-order-close">
        <a href="javascript:void(0)" @click="closeEditOrder" class="btn btn-default">关闭</a>
    </div>
    <div class="container-fluid sell-lineitem change-orders">
        <div class="sell-lineitem-hd">
            <i>订单详情</i>
        </div>
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-12 form-group-margin">
                        <label>订单编号</label>
                        {{customerOrder.Sheet}}
                    </div>
                    <div class="form-group col-lg-12 form-group-margin">
                        <label>订单状态</label>
                        {{customerOrder.OrderFlag.FlagDesc}}
                    </div>
                </div>
            </div>
        </div>
        <div class="sell-lineitem-process">
            <div class="sell-progress">
                <div class="sell-progress-img"><img src="../../../images/progress.png" alt="" style="position:relative" :style="{left:pageInfo.orderProgress*110 - 400 + 'px' }" /></div>
            </div>
            <div class="sell-progress-text">
                <ul>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.EditTime}">{{customerOrder.OrderBusiness.SheetFlag | orderStateText}}</span><br /><em >{{customerOrder.EditTime | truncationTimeString}}</em></li>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.OrderFlag.CheckTime}">订单审核</span><br /><em>{{customerOrder.OrderFlag.CheckTime | truncationTimeString}}</em></li>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.OutStockBatchTime}">生成拣货单</span><br /><em>{{customerOrder.OutStockBatchTime | truncationTimeString}}</em></li>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.OutStockScanTime}">扫描出库</span><br /><em>{{customerOrder.OutStockScanTime | truncationTimeString}}</em></li>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.OutStockWeighTime}">称重出库</span><br /><em>{{customerOrder.OutStockWeighTime | truncationTimeString}}</em></li>
                    <li class="col-lg-2"><span :class="{'active':customerOrder.OutStockCallbackTime}">网单回写</span><br /><em>{{customerOrder.OutStockCallbackTime | truncationTimeString}}</em></li>
                </ul>
            </div>
        </div>
        <div class="headline-hd sell-operational sell-blurb">基础信息  <span  class="btn btn-primary iconfont icon-arrow-up" role="button" data-toggle="collapse" href="#collapseExample0" aria-expanded="false" aria-controls="collapseExample"></span></div>
            <div class="collapse in" id="collapseExample0">
                <div class="well">
        <div class="sell-lineitem-show">
            <div class="query-form">
        <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">外部交易号 </label>
                        {{customerOrder.OutSheetID}}
                    </div>
                 
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">销售平台 </label>
                        {{customerOrder.Shop.NetShop.Channel.Name}}
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            店铺名称
                        </label>
                        {{customerOrder.Shop.Name}}
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            重量
                        </label>
                        {{customerOrder.OrderFlag.Weigh}}g
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            订单类型
                        </label>
                        {{customerOrder.OrderTypeDesc}}

                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            支付时间
                        </label>
                        <span v-if="customerOrder.PayTime" data-toggle="tooltip" data-placement="top" title="{{customerOrder.PayTime | truncationTimeString}}">{{customerOrder.PayTime | formatDateFormShow}}</span>
                    </div>
                   
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            支付方式
                        </label>
                        {{customerOrder.PayModeDesc}}
                        
                    </div>
                  
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            支付流水
                        </label>
                        {{customerOrder.OrderDetail.AlipayNo}}
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            购买者昵称
                        </label>
                        {{customerOrder.BuyerNick}}
                    </div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            包裹重量
                        </label>
                        {{customerOrder.OrderFlag.Weigh}}

                    </div>-->
                   <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            运费
                        </label>
                        {{customerOrder.OrderFlag.MerchantDelivery.DeliveryPrices}}
                    </div>-->
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            订单回写
                        </label>
                        {{customerOrder.}}
                    </div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            备注旗帜
                        </label>
                        <select v-model="customerOrder.OrderBusiness.SellerFlag" class="form-control ">
                                <option v-for="sellerFlag in baseLookUp.sellerFlags" value="{{sellerFlag.Code}}">{{sellerFlag.Text}}</option>
                            </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            商家备注
                        </label>
                        <input v-model="customerOrder.OrderBusiness.SellerMemo" type="text" value="{{customerOrder.OrderBusiness.SellerMemo}}" />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            发货仓库
                        </label>
                        <select v-model="customerOrder.StockID" class="form-control">
                                <option v-for="stock in baseLookUp.stockLists" value="{{stock.StockID}}">{{stock.Name}}</option>
                            </select>

                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            快递公司
                        </label>
                        <select v-model="customerOrder.OrderFlag.MerchantDeliveryID" class="form-control">
                                <option v-for="merchantDelivery in baseLookUp.merchantDeliveryLists" value="{{merchantDelivery.MerchantDeliveryID}}">{{merchantDelivery.Name}}</option>
                            </select>

                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            快递单号
                        </label>
                        <input v-model="customerOrder.OrderFlag.DeliverySheetID" type="text" value="{{customerOrder.OrderFlag.DeliverySheetID}}"/>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            收货人
                        </label>
                        <input v-model="customerOrder.LinkMan" type="text" value="{{customerOrder.LinkMan}}"/>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            联系电话
                        </label>
                        <input v-model="customerOrder.Phone" type="text" value="{{customerOrder.Phone}}"/>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            联系手机
                        </label>
                         <input v-model="customerOrder.Mobile" type="text" value="{{customerOrder.Mobile}}"/>   
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 takeDelivery">
                        <label class="form-group-text ">
                            收货区域
                        </label>
                        <input v-model="customerOrder.Country" type="text"  class="form-control" placeholder="国家"/> 
                        <!-- 新增国家-->   
                        <input v-model="customerOrder.State" type="text"  class="form-control" placeholder="省"/>
                        <input v-model="customerOrder.City" type="text"  class="form-control" placeholder="市"/>
                        <input v-model="customerOrder.District" type="text"  class="form-control" placeholder="区"/>
                        <!--<div class="form-control-select">-->
                            <!--<select-area v-if="pageInfo.editShow" :state.sync="customerOrder.State" :city.sync="customerOrder.City" :district.sync="customerOrder.District" :options="{isShowCity:true,isShowDistrict:true}" ></select-area>-->
                        <!--</div>-->
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            邮政编码
                        </label>
                        <input v-model="customerOrder.OrderDetail.ZipCode" type="text" value=""/>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            收货地址
                        </label>
                        <input v-model="customerOrder.Address" type="text" value="" />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">
                            客户备注
                        </label>
                        {{customerOrder.OrderBusiness.BuyerMemo || customerOrder.OrderBusiness.BuyerMessage}}

                    </div>
                    </div>
        </div>

    </div>
          
            <div class="lineitem-operation clearfix" v-if="!([97,98,100].indexOf(customerOrder.OrderFlag.Flag) > -1)">
                <a @click="saveCustomerOrder('')" href="javascript:void(0)" class="btn btn-default">保存</a>
            </div>
            </div></div></div>
        <div class="headline-hd sell-operational sell-blurb">商品信息  <span  class="btn btn-primary iconfont icon-arrow-up" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></span></div>
            <div class="collapse in" id="collapseExample">
                <div class="well">
                <div class="sell-blurb-show">
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                            <tr>
                                <td class="col-lg-1 col-md-1 col-sm-1">商品总价</td>
                                <td class="col-lg-3 col-md-3 col-sm-3">{{customerOrder.TotalAmount}}</td>
                                <td class="col-lg-1 col-md-1 col-sm-1">商品数</td>
                                <td class="col-lg-3 col-md-3 col-sm-3">{{customerOrder.OrderItems.length}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-responsive">
                        <order-detail :shop-id="customerOrder.ShopID" :order-id="customerOrder.CustomerOrderID" :is-order-done="[97,98,100].indexOf(customerOrder.OrderFlag.Flag) > -1" :order-items="customerOrder.OrderItems"></order-detail>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!([97,98,100].indexOf(customerOrder.OrderFlag.Flag) > -1)" class="headline-hd sell-operational sell-operational-true">操作区 <span  class="btn btn-primary iconfont icon-arrow-up" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"></span>
            <div class="collapse in" id="collapseExample1">
                <div class="well">
                    <div class="sell-operational-show">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <a v-if="!customerOrder.HoldFlag && !customerOrder.IsProblem && !customerOrder.IsOutStock" @click="checkCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">审核确认</a>
                                <!--<a href="javascript:void(0)" class="btn btn-default">生成拣货单</a>-->
                                <!--<a href="javascript:void(0)" class="btn btn-default">直接发货</a>-->
                                <a @click="cancelCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">取消发货</a>
                                <!--<a href="javascript:void(0)" class="btn btn-default">回写订单</a>-->
                                <a v-if="!customerOrder.HoldFlag && !customerOrder.IsProblem && !customerOrder.IsOutStock" @click="splitOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">拆分订单</a>
                                <a v-if="!customerOrder.HoldFlag && !customerOrder.IsProblem && !customerOrder.IsOutStock" @click="pauseCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">暂停</a>
                                <a v-if="customerOrder.HoldFlag" @click="recoveryCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">恢复暂停</a>
                                <a v-if="!customerOrder.IsProblem && !customerOrder.HoldFlag && !customerOrder.IsOutStock" @click="setProblemCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">设为问题单</a>
                                <a v-if="customerOrder.IsProblem" @click="recoveryCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">置为正常单</a>
                                <a @click="cancelCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                                <!--<a href="javascript:void(0)" class="btn btn-default">导出订单</a>-->
                                <!--<a href="javascript:void(0)" class="btn btn-default">导出订单明细</a>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <!--<div>{{customerOrder | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
//                customerOrder: {},
                firstIn: false,
                needSave: false,
                pageInfo: {
                    orderProgress: 0,
                    editShow: false
                },
                baseLookUp: {
                    sellerFlags: [],  //淘宝旗帜
                    stockLists: [],   //仓库
                    merchantDeliveryLists: []   //快递公司
                }
            }
        },
        methods: {
            closeEditOrder: function () {
                this.pageInfo.editShow = false;
            },
            //查看订单流程状态,以更改订单状态进度条
            checkOrderProgress: function () {                      
                var customerOrder = this.customerOrder;
                if (customerOrder.OutStockCallbackTime) {   //网单回写
                    return 5;
                } else if (customerOrder.OutStockWeighTime) {  //称重出库
                    return 4;
                } else if (customerOrder.OutStockScanTime) {  //扫描出库
                    return 3;
                } else if (customerOrder.OutStockBatchTime) {  //生成拣货单
                    return 2;
                } else if (customerOrder.OrderFlag.CheckTime) { //订单审核
                    return 1;
                } else if (customerOrder.EditTime) {   //系统转单
                    return 0
                }
            },
            saveCustomerOrder: function (callback) {
                var customerOrder = this.customerOrder;
                var orderItems = this.customerOrder.OrderItems;
                var self = this;
                var needSave = this.needSave;
                var hasNotCompleteItem = false;
                orderItems.forEach(function (orderItem) {
                    if (!orderItem.isSaved && !orderItem.isNotSelected) {
                        orderItem.Qty = orderItem._Qty;
                        orderItem.Price = orderItem._Price;
                        orderItem.isSaved = true;
                    } else if (orderItem.isNotSelected) {
                        hasNotCompleteItem = true;
                    }
                });
                if (needSave) {
                    if (hasNotCompleteItem) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请先完善订单明细!'
                        });
                        return ;
                    } else {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpSaveCustomerOrder',
                            data: customerOrder
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('page-change');
                                if (callback) {
                                    callback();
                                } else {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示',
                                        contentText: '保存成功'
                                    });
                                }
                            }
                        })
                    }
                } else {
                    if (callback) {
                        callback();
                    }
                }
            },
            //审核客户订单
            checkCustomerOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('check',customerID);
                })
            },
            //取消客户订单
            cancelCustomerOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('cancel',customerID);
                });
            },
            //暂停客户订单
            pauseCustomerOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('pause',customerID);
                });
            },
            //恢复客户订单
            recoveryCustomerOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('recovery',customerID);
                });
            },
            //置为问题单
            setProblemCustomerOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('set-problem',customerID);
                });
            },
            //拆分订单
            splitOrder: function (customerID) {
                var self = this;
                self.saveCustomerOrder(function () {
                    self.$dispatch('split',customerID);
                });
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
            }
        },
        ready: function () {
            this.getBaseData();

        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            orderDetail: require('./order-detail.vue'),
            selectArea: require('../../../components/select-area.vue')
        },
        events: {
            'edit-order': function (customerOrder) {
                this.firstIn = true;
                this.customerOrder = customerOrder;
                this.needSave = false;
                this.pageInfo.orderProgress = this.checkOrderProgress();
                this.pageInfo.editShow = true;
            },
            'closeEdit': function () {
                this.closeEditOrder();
            }
        },
        watch: {
            'customerOrder':{
                handler: function (newVal,oldVal) {
                    console.log(newVal);
                    if (this.firstIn) {
                        this.firstIn = false;
                    } else {
                        this.needSave = true;
                    }
                },
                deep: true
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">


    

    .sell-lineitem{
        width: 100%;
        padding-right:35px;
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
            label{
                color:#4D68AD;
                line-height:32px;
            }
            line-height:32px;
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
                width: 636px;
                height:56px;
                margin:0 auto;
                overflow:hidden;
                margin-top:48px;
                position: relative;
                .sell-progress-img{
                    width: 1222px;
                    display:block;
                    position: absolute;
                    left:-118px;
                    top:0;

                }


            }



        }
        .sell-progress-text{
            width: 660px;
            margin: 0 auto;

            ul{
                margin:0 auto;
                li{
                    width: 100px;
                    height:50px;
                    margin-right:10px;
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
            border-radius:5px;
            border: 1px solid #E5E5E5;
            border-top:none;

            .col-lg-1{
                min-width:40px;
                text-align:right;
            }
        }
        input{
            padding-left:8px;
            font-size: 12px;
            border-radius:5px;
            border: 1px solid #CCCCCC;
            line-height:24px;
            height: 24px;
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
        .table{
            margin-bottom:0;
        }

        .sell-otl-hd{
            margin:20px 0;
            font-size: 14px;
            color:#526BAF;

        }
        .sell-otl-show{
            border: 1px solid #E9E8E5;
            td{
                border-right: 1px dashed #E5E5E5;
                border-bottom: 1px dashed #E5E5E5;

                border-top:none;
                text-align:center;
                i{
                    color:#FF7E7E;
                    font-style:normal;
                }
            }
            tr:nth-of-type(1){
                background: #F7F8FC;
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
            background: #fff;
            padding:10px;
            text-align:center;

            margin: 0px auto;


        }
        .table-responsive-compile{
            border-radius:5px;
            border: 1px solid #E5E5E5;
            margin-top:10px;
            text-align:center;

            th{
                text-align:center;
                border:none;
            }
            td,th{
                border-top:1px dashed #E9E9E9;
                border-right: 1px dashed #E9E9E9;

            }

            thead{
                border:none;
            }
        }
        .headline-hd {
            border-bottom:1px solid #E5E5E5;
            border-radius:5px;
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
        z-index:97;


        }

.w-content{
    position: relative;
    min-height: 100%;
}

.sell-lineitem{
    background:#f7f8fd;
    .query-form{
        background:#fff;
    }
    .headline-hd{
        background:#fff;
        box-shadow: 3px 3px 3px #EAEBF0;

    }
    .lineitem-operation{
        /*float: right;*/
        /*margin-top: -37px;*/
        /*margin-right: 31px;*/
        a {
            float: right;
        }
    }
    .sell-lineitem-show{
        background:#fff;
        padding:10px;
    }
    .sell-operational-true{
        margin-bottom:60px;
    }
    .well{
        background: #fff;
        padding:0;

    }
    .sell-blurb-show{
        background: #fff;
        .table-condensed{
            border: 1px solid #EBEAE9;

        }
        th{
            text-align:center;
            border:none;
             background:#fff;
            line-height:30px;
            border-right: 1px dashed #E9E7E5;
            font-weight:300;
            color:#333333;

        
        }

        th:nth-of-type(1){
            min-width:100px;
        }
    }

    .table-responsive{
            td{
                border-top:none;
            }
            .col-lg-1{
                text-align:right;
            }
            .col-lg-3{
                text-align:left;
            }
    }
    .form-inlinecenter{
        min-width:142px;
        input{

            float: left;
            width: 90px;
        }
        a{
            width: 30%;
            float: right;
            width: 49px;
        }
    }
    .table-responsivebd{
        border: 1px solid #EBEAE9;
        margin:20px 0;
        td{
            border-right: 1px dashed #E9E7E5;
            border-bottom: 1px dashed #E9E7E5;

        }
    }
    .well{
        border:none;
    }
    .well .batch-operation{
        padding:16px 0;
    }

 

}
.form-group-margin{
    margin-left:14px;
    padding:0;
}
 


.edit-order-close {
      position: absolute;
      right: 14px;
      top: 5px;
      z-index: 100;

}
  .query-detail{
    .form-control-select{
 
        .form-control{
            width: 76px;
            float:left;
            margin-bottom:5px;
            margin-right:5px;
        }
    }
} 
.sell-lineitem{
    .form-group{
        label{
            line-height:32px;
        }
    }
}
  
.sheet-list{
    .btn-primary{
        color:#9FB7F3;
        border:none;
        float:right;
    }
    .btn-primarybd{
        color:#fff;
        border: 1px solid transparent;
    }

}   
#collapseExample{
    .well{
        .sell-blurb-show{

            background: #fff;
            border: 1px solid #e5e5e5;
            border-top:none;
            .table-responsive{
                border-bottom:1px solid #e5e5e5;
                table{
                    tr{
                        td{
                            text-align:center;
                            border:none;
                        }
                    }
                    tr{
                        th{
                            border:none;
                            text-align:center;
                        }
                        th:nth-of-type(1){
                            width: 100px;
                            .new-newly{
                                margin-left:15px;
                            }
                        }
                    }
                }
            }
        }
    }



}
.change-orders-show{
    input{
    width: 100%;
        
}
}
.change-orders-show{
        padding-left:20px;
        position: absolute;
        left:0;
        top:32px;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.26);
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
            z-index:98;
}
</style>