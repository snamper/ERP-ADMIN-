<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="batch-operation">
                <label class="batch-operation-title">批量操作:</label>
                <div class="batch-operation-group">
                    <a v-if="code == 1" @click="getDeliverySheet" href="javascript:void(0)" class="btn btn-default">获取运单号</a>
                    <a @click="getIDGroupPrint(1)" href="javascript:void(0)" class="btn btn-default">打印快递单</a>
                    <a @click="getIDGroupPrint(2)"  href="javascript:void(0)" class="btn btn-default">打印订单</a>
                    <a @click="getIDGroupPrint(3)" href="javascript:void(0)" class="btn btn-default">打印拣货单</a>
                    <a @click="checkOutStockBatch" v-if="code == 1" href="javascript:void(0)" class="btn btn-default">拣货完成</a>
                    <a @click="cancelOutStockBatch('')" href="javascript:void(0)" class="btn btn-default">取消拣货单</a>
                    <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                    <a href="javascript:void(0)" v-if="code == 1 || code == 2" @click="onClickBackOrder" class="btn btn-default" >回写</a>
                    <label for="autoPrint">
                        <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                    </label>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive pick-table">
                <table class="table table-condensed" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                            <th>拣货单号</th>
                            <th>业务类型</th>
                            <th>获取运单号</th>
                            <th>打印次数</th>
                            <!--<th>渠道</th>-->
                            <th>发货仓库</th>
                            <th>快递公司</th>
                            <!--<th>店铺</th>-->
                            <!--<th>发票</th>-->
                            <th>支付方式</th>
                            <th>修改人</th>
                            <th>审核时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="sheet-list-item" v-for="outStockBatchItem in outStockBatch">
                            <td class="sheet-item-state"><input type="checkbox" v-model="outStockBatchItem.checked"></td>
                            <td><span>{{outStockBatchItem.Sheet}}</span></td>
                            <td><span>{{outStockBatchItem.TransferTypeDesc}}</span></td>
                            <td>{{outStockBatchItem.IsGetDeliverySheetID ? '√ ': '×'}}</td>
                            <td>{{outStockBatchItem.PrintTimes}}</td>
                            <!--<td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.Shop.NetShop.Channel.Name}}">{{outStockBatchItem.Shop.NetShop.Channel.Name | truncationString}}</span></td>-->
                            <td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.Stock.Name}}">{{outStockBatchItem.Stock.Name | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.MerchantDelivery.Name}}">{{outStockBatchItem.MerchantDelivery.Name | truncationString}}</span></td>
                            <!--<td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.Shop.Name}}">{{outStockBatchItem.Shop.Name | truncationString}}</span></td>-->
                            <!--<td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.InvoiceFlagDesc}}">{{outStockBatchItem.InvoiceFlagDesc | truncationString}}</span></td>-->
                            <td><span data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.PayModeDesc}}">{{outStockBatchItem.PayModeDesc}}</span></td>
                            <td><span>{{outStockBatchItem.Editor}}</span></td>
                            <td><span v-if="outStockBatchItem.EditTime" data-toggle="tooltip" data-placement="top" title="{{outStockBatchItem.EditTime | truncationTimeString}}">{{outStockBatchItem.EditTime | formatDateFormShow}}</span></td>
                            <td>
                                <a v-link="{name:'assort-pick-edit-list',params:{outStockBatchID:outStockBatchItem.OutStockBatchID},query:{code: code}}" data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>

                                <a href="javascript:void(0)" @click="updateDeliverySheet(outStockBatchItem,outStockBatchItem.OutStockBatchID)" data-toggle="tooltip" data-placement="top" title="配置运单号"><span class="iconfont icon-setting delivery"></span></a>

                                <a @click="cancelOutStockBatch(outStockBatchItem.OutStockBatchID)"  data-toggle="tooltip" data-placement="top" title="取消拣货单"><span class="iconfont icon-invalid"></span></a>

                                 <a v-link="{name:'assort-pick-back-list',params:{outStockBatchID:outStockBatchItem.OutStockBatchID},query:{code: code}}" data-toggle="tooltip" data-placement="top" title="查看"><span class="glyphicon glyphicon-eye-open iocn-yj"></span></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="outStockBatch.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                <pagination :pagination-options.sync="paginationOptions"></pagination>
            </div>
        </div>
    </div>
    <modal-delivery-sheet></modal-delivery-sheet>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                autoPrint: false
            }
        },
        props: ['outStockBatch','paginationOptions','code','back'],
        computed: commonMethods.selectAll('this.outStockBatch', function (item) {
            return item
        }),
        methods: {
            /*
             * 手工回写订单
            */
            onClickBackOrder:function(){
                
                var self = this;
                var outStockBatchIDGroup = this.getIDGroup('','OutStockBatchID');
                if (outStockBatchIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要回写订单吗?',
                        btnName: '回写',
                        events: {
                            confirm: 'getDeliverySheet'
                        }
                    });
                    self.$off('getDeliverySheet');

                    self.$once('getDeliverySheet',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusOutStockBatch/ErpWriteBackOutStockByBatch',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockBatchIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '回写成功!'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    })
                }           
                
            },
            /**
             * 获取拣货单订单的方法
             * @param scope  {object} 作用域
             * @param method {string} 对应的获取方法
             */
            getOutStockBatchAjax: function (outStockBatch,id,method,callback) {
                if (outStockBatch.OutStockBatchItems.length > 0) {
                    callback(outStockBatch.OutStockBatchItems);
                } else {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusOutStockBatch/' + method,
                        data: {
                            ID: id
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            var outStockBatchFromServer = result.Data;
                            outStockBatch.OutStockBatchItems = outStockBatchFromServer.OutStockBatchItems;
                            callback(outStockBatch.OutStockBatchItems);
                        }
                    })
                }
            },
            //查询拣货单
            getOutStockBatch: function (outStockBatch,id,callback) {
                console.log(this.code);
                if ([3,4].indexOf(this.code) > -1) { //已完成或已取消状态的获取方法
                    this.getOutStockBatchAjax(outStockBatch,id,'ErpQueryOutStockBatchDoneByID',callback);
                } else if ([1,2].indexOf(this.code) > -1) {   //未完成状态查询
                    this.getOutStockBatchAjax(outStockBatch,id,'ErpQueryOutStockBatchTempByID',callback);
                } else {   //其他状态查询
                    this.getOutStockBatchAjax(outStockBatch,id,'ErpQueryOutStockBatchAllByID',callback);
                }
            },
            //批量修改运单号
            updateDeliverySheet: function (outStockBatch,id) {
                var self = this;
                //如果没有快递单号,则不能修改运单号
                if (!outStockBatch.MerchantDeliveryID) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该拣货单没有配置快递公司,不可修改运单号'
                    });
                    return;
                }
                this.getOutStockBatch(outStockBatch,id,function (OutStockBatchItems) {
                    var isDealOrders = false;
                    if (OutStockBatchItems.length > 0) {
                        OutStockBatchItems.forEach(function (item) {
                            if ([97,98,100].indexOf(item.OutStock.OutStockFlag.Flag) > -1) {
                                isDealOrders = true;
                            }
                        });
                        if (isDealOrders) {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '该订单包含已完成或已取消的订单,请重新选择'
                            });
                        } else {
                            self.$dispatch('transmit','modal-delivery-sheet',OutStockBatchItems);
                        }
                    } else {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '该拣货单没有订单'
                        });
                    }

                });
            },
            getIDGroup: function (ItemID,key) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    ItemGroup.forEach(function (item) {
                        IDGroup.push(item[key]);
                    });
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //新增
            getIDGroupPrint: function (key) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                var $this = this;
                var sheetArray = [];
                console.log(ItemGroup)
                if(ItemGroup.length > 0) {
                    ItemGroup.forEach(function (item) {
                        if (item.PrintTime) {
                            sheetArray.push(item.Sheet)
                            $this.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '已存在打印的订单有:' + sheetArray.join(',') + '是否确认打印?',
                                btnName: '确定',
                                events: {
                                    confirm: 'cancelOutStockBatch'
                                }
                            });

                            $this.$off('cancelOutStockBatch');

                            $this.$once('cancelOutStockBatch',function () {
                                //打印快递单
                                if(key == 1) {
                                    $this.printDelivery();
                                }
                                //打印订单 
                                if(key == 2) {
                                    $this.printPack()
                                }
                                //打印揽活单
                                if(key == 3) {
                                    $this.printPick();
                                }                              
                                
                            });


                        }else {
                                //打印快递单
                                if(key == 1) {
                                    $this.printDelivery();
                                }
                                //打印订单 
                                if(key == 2) {
                                    $this.printPack()
                                }
                                //打印揽活单
                                if(key == 3) {
                                    $this.printPick();
                                }  
                        }
                    });
                };

                if (ItemGroup.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                }
            },            
            // 取消拣货单
            cancelOutStockBatch: function (OutStockBatchID) {
                var self = this;
                var outStockBatchIdGroup = this.getIDGroup(OutStockBatchID,'OutStockBatchID');
                if (outStockBatchIdGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消拣货单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'cancelOutStockBatch'
                        }
                    });
                    self.$off('cancelOutStockBatch');

                    self.$once('cancelOutStockBatch',function () {
                        servers.postAjax.bind(this)({
                            url: '/BusOutStockBatch/ErpCancelOutStockBatch',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockBatchIdGroup)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '取消成功'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    });
                }
            },
            //获取快递单Sheet列表
            getDeliverySheetGroup: function () {
                if (this.checkedGroups) {
                    var IDGroup = [];
                    var ItemGroup = this.checkedGroups;
                    var ShopID = ItemGroup[0].Shop ? ItemGroup[0].Shop.ShopID : '';
                    var PayMode = ItemGroup[0].PayMode;
                    var MerchantDeliveryID = ItemGroup[0].MerchantDeliveryID;
                    var isTheSameShop = true;
                    var isTheSamePayMode = true;
                    var isTheSameDelivery = true;
                    ItemGroup.forEach(function (item) {
                        //是否相同快递
                        if (MerchantDeliveryID !== item.MerchantDeliveryID) {
                            isTheSameDelivery = false;
                        }
                        //是否相同店铺
                        if (item.Shop) {
                            if (ShopID !== item.Shop.ShopID) {
                                isTheSameShop = false;
                            }
                        } else {
                            isTheSameShop = false;
                        }
                        //是否相同支付方式
                        if (PayMode !== item.PayMode) {
                            isTheSamePayMode = false;
                        }
                        IDGroup.push(item.Sheet);
                    });
                    if (IDGroup.length === 0) {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请至少选中一个订单'
                        });
                        return {
                            ShopID: '',
                            IDGroup: [],
                            PayMode: '',
                            MerchantDeliveryID: ''

                        };
                    } else {
                        if (isTheSameDelivery) {
                            if (!isTheSamePayMode) {
                                PayMode = '';
                            }
                            if (!isTheSameShop) {
                                ShopID = '';
                            }
                            return {
                                ShopID: ShopID,
                                IDGroup: IDGroup,
                                PayMode: PayMode,
                                MerchantDeliveryID: MerchantDeliveryID
                            };
                        } else {
                            this.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '请选择相同快递公司的订单'
                            });
                            return {
                                ShopID: '',
                                IDGroup: [],
                                PayMode: '',
                                MerchantDeliveryID: ''
                            };
                        }
                    }
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                }

            },
            print: function (type,localStorageName,printUrl,IDlist) {
                var outStockBatchIDGroup = this.getIDGroup('','OutStockBatchID');   
                
                var deliveryParams = {};
                var sheetList = [];
                var ShopID = '';
                var PayMode = '';
                var MerchantDeliveryID = '';
                if (type == 3) {   //如果为快递单,则判断是否为同一个店铺或同样的支付方式和快递公司
                    deliveryParams = this.getDeliverySheetGroup();
                    sheetList = deliveryParams.IDGroup;
                    ShopID = deliveryParams.ShopID || '';
                    PayMode = typeof(deliveryParams.PayMode) == 'number' ? deliveryParams.PayMode : '';
                    MerchantDeliveryID = deliveryParams.MerchantDeliveryID || '';
                    if (MerchantDeliveryID) {
                        if (sheetList.length > 0) {
                            var sheetListStr = JSON.stringify(sheetList);
                            localStorage[localStorageName] = sheetListStr;
                            localStorage[IDlist] = JSON.stringify(outStockBatchIDGroup)


                            window.open(printUrl + '?BusinessType=' + type + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint);
                        }
                    } else {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '选中的订单中没有选择快递公司!'
                        });
                    }

                } else {
                    sheetList = this.getIDGroup('','Sheet');
                    if (sheetList.length > 0) {
                        var sheetListStr = JSON.stringify(sheetList);
                        localStorage[localStorageName] = sheetListStr;
                        localStorage[IDlist] = JSON.stringify(outStockBatchIDGroup)
                        if (type == 2) {   //装箱单
                            localStorage.upSheetList = JSON.stringify([]);
                        }
                        window.open(printUrl + '?BusinessType=' + type + '&autoPrint=' + this.autoPrint);
                    }
                }
            },
            //打印拣货单
            printPick: function () {

                var type = 1;
                this.print(type,'printPickSheetList','#!/print-pick');
            },
            printPack: function () {
                var type = 2;
                this.print(type,'printPackSheetList','#!/print-pack');
            },
            //打印快递单
            printDelivery: function () {             
                var type = 3;
                this.print(type,'printDeliveryList','#!/print-delivery');//,'IDlist'
            },
            //获取运单号
            getDeliverySheet: function () {
                var self = this;
                var outStockBatchIDGroup = this.getIDGroup('','OutStockBatchID');
                if (outStockBatchIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要获取运单号吗?',
                        btnName: '获取',
                        events: {
                            confirm: 'getDeliverySheet'
                        }
                    });
                    self.$off('getDeliverySheet');

                    self.$once('getDeliverySheet',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusOutStockBatch/ErpGetDeliverySheet',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockBatchIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '获取成功!'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    })
                }
            },
            //拣货完成
            checkOutStockBatch: function () {
                var self = this;
                var outStockBatchIDGroup = this.getIDGroup('','OutStockBatchID');
                if (outStockBatchIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要拣货完成吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'checkOutStockBatch'
                        }
                    });
                    self.$off('checkOutStockBatch');

                    self.$once('checkOutStockBatch',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BusOutStockBatch/ErpCheckOutStockBatch',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockBatchIDGroup)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '拣货完成成功!'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    })
                }
            },
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            modalDeliverySheet: require('./modal-delivery-sheet.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.pick-table{
    width: 97%;
    border-right:1px solid #e5e5e5;
    border-left:1px solid #e5e5e5;

    margin:0 auto;
}
.delivery {
    &.icon-setting {
        &:before {
            background: #8280d1;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            line-height: 18px;
            text-align: center;
        }
    }
}
.iocn-yj:before{
    /*content: '\E637';*/
    background: #ccc;
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    line-height: 18px;  
}

</style>