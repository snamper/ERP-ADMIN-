<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a v-if="['outstockNotify'].indexOf(status) > -1" @click="updateMerchantDelivery" href="javascript:void(0)" class="btn btn-default">修改快递</a>
                <a v-if="['outstockScan'].indexOf(status) > -1"  v-link="{name:'delivery-scan'}" class="btn btn-default">出库扫描</a>
                <a v-if="['outstockWeigh'].indexOf(status) > -1" v-link="{name:'delivery-weighed'}" class="btn btn-default">称重出库</a>
                
                <a v-if="['outstockNotify'].indexOf(status) > -1 && account.SysGlobalConfigs['201231']!='1'" @click="createPick(false)" href="javascript:void(0)" class="btn btn-default">普通分批</a>
                <a v-if="['outstockNotify'].indexOf(status) > -1 && account.SysGlobalConfigs['201231']!='1'"  @click="createPick(true)" href="javascript:void(0)" class="btn btn-default">后置分批</a>
                <!-- <a v-if="['outstockNotify'].indexOf(status) > -1"  @click="pauseOrder" href="javascript:void(0)" class="btn btn-default">暂停</a> -->
                <a v-if="['outstockNotify'].indexOf(status) > -1"  @click="setOutOfStockCustomerOrder" href="javascript:void(0)" class="btn btn-default">置为缺货</a>
                <a v-if="['outstockScan','outstockWeigh'].indexOf(status) > -1"  @click="cancelOrder" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                <a v-if="['outstockNotify', 'outstockPick', 'outstockScan', 'outstockWeigh'].indexOf(status) > -1" @click="$dispatch('transmit', 'uploadModalShow', 44)" href="javascript:void(0)" class="btn btn-default">导入运单</a>
                <a v-if="['outstockScan'].indexOf(status) > -1"  href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                <a v-if="['outstockNotify'].indexOf(status) > -1 && account.SysGlobalConfigs['201231']=='1'" @click="getDeliverySheet" href="javascript:void(0)" class="btn btn-default">获取运单号</a>
                <a v-if="['outstockNotify'].indexOf(status) > -1 && account.SysGlobalConfigs['201231']=='1'" @click="printDelivery" href="javascript:void(0)" class="btn btn-default">打印快递单</a>
                <a v-if="['outstockNotify'].indexOf(status) > -1 && account.SysGlobalConfigs['201231']=='1'" @click="printPack" href="javascript:void(0)" class="btn btn-default">打印订单</a>
                <a v-if="['outstockNotify','outstockScan','outstockWeigh'].indexOf(status) > -1" @click="skipWeighing" href="javascript:void(0)" class="btn btn-default">确认出库</a>
                <label v-if="['outstockScan'].indexOf(status) > -1"  for="autoPrint">
                    <input v-model="autoPrint" id="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                </label>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <th>出库单号</th>
                    <th>业务类型</th>
                    <th>上游单号</th>
                    <th>外部交易号</th>
                    <th>出库仓库</th>
                    <th>店铺</th>
                    <th>总数量</th>
                    <th>快递公司</th>
                    <th>运单号</th>
                    <th>支付方式</th>
                    <th>收货人</th>
                    <th>收货地</th>
                    <th>修改人</th>
                    <th>修改时间</th>
                    <th>卖家备注</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-for="outstock in outstockLists" class="panel panel-default">
                <tr class="sheet-list-item">
                    <td class="sheet-item-state"><input type="checkbox" v-model="outstock.checked">
                    </td>
                    <td class="show-detail-ctrl collapsed"
                        @click="queryOutStockItemByID(outstock,outstock.OutStockID,outstock.OutStockFlag.Flag)"
                        data-toggle="collapse" data-parent="#sheet-list"
                        data-target="#{{outstock.OutStockID}}">
                        <span class="iconfont icon-alter"></span></a><span>{{outstock.Sheet}}</span>
                    </td>
                    <td><span>{{outstock.TransferTypeDesc}}</span></td>
                    <td><span>{{outstock.UpSheet}}</span></td>
                    <td><span>{{outstock.OutSheetID}}</span></td>
                    <td><span>{{outstock.Stock.Name}}</span></td>
                    <td><span>{{outstock.Code}}</span></td>
                    <td><span>{{outstock.TotalQty}}</span></td>
                    <td><span>{{outstock.MerchantDelivery.Name}}</span></td>
                    <td><span>{{outstock.OutStockFlag.DeliverySheetID}}</span></td>
                    <td><span>{{outstock.PayModeDesc}}</span></td>
                    <td><span>{{outstock.LinkMan}}</span></td>
                    <td><span>{{outstock.Address}}</span></td>
                    <td><span>{{outstock.Editor}}</span></td>
                    <td><span v-if="outstock.EditTime" data-toggle="tooltip" data-placement="top"
                              title="{{outstock.EditTime | truncationTimeString}}">{{outstock.EditTime | formatDateFormShow}}</span>
                    </td>
                    <td><span>{{outstock.SellerMemo}}</span></td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{outstock.Note}}">{{outstock.Note | truncationString}}</span>
                    </td>
                    <td>
                        <a v-if="status === 'outstockScan'" v-link="{name:'delivery-scan',query:{Sheet:outstock.Sheet}}" class="sheet-list-delete" data-toggle="tooltip"
                           data-placement="top" title="出库扫描"><span
                                class="iconfont icon-scan"></span></a>
                        <a v-if="status === 'outstockWeigh'" v-link="{name:'delivery-weighed',query:{Delivery:outstock.Sheet}}" class="sheet-list-delete" data-toggle="tooltip"
                           data-placement="top" title="出库称重"><span
                                class="iconfont icon-weigh"></span></a>
                        <a href="javascript:void(0)" @click="updateDeliverySheet(outstock,outstock.OutStockID)" data-toggle="tooltip" data-placement="top" title="配置运单号">
                            <span class="iconfont icon-setting delivery"></span>
                        </a>
                    </td>
                </tr>
                <tr class="sheet-list-detail">
                    <td colspan="12">
                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                             id="{{outstock.OutStockID}}">
                            <div class="sheet-detail-wrap">
                                <table class="table table-condensed">
                                    <thead class="sheet-list-header">
                                    <tr>
                                        <th>SKU</th>
                                        <th>商品货号</th>
                                        <th>商品名称</th>
                                        <th>尺码</th>
                                        <th>颜色</th>
                                        <th>通知数</th>
                                        <th>出库数</th>
                                        <th>备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="outStockItem in outstock.OutStockItems">
                                        <td>
                                            <span>{{outStockItem.Barcode.CustomBC}}</span>
                                        </td>
                                        <td>
                                            <span>{{outStockItem.Barcode.Goods.CustomNo}}</span>
                                        </td>
                                        <td>
                                            <span data-toggle="tooltip" data-placement="top" title="{{outStockItem.Barcode.Goods.Name}}">{{outStockItem.Barcode.Goods.Name | truncationString}}</span>
                                        </td>
                                        <td>
                                            <span data-toggle="tooltip" data-placement="top" title="{{outStockItem.Barcode.Size.Name}}">{{outStockItem.Barcode.Size.Name | truncationString}}</span>
                                        </td>
                                        <td>
                                            <span data-toggle="tooltip" data-placement="top" title="{{outStockItem.Barcode.Color.Name}}">{{outStockItem.Barcode.Color.Name | truncationString}}</span>
                                        </td>
                                        <td>
                                            <span>{{outStockItem.NotifyQty}}</span>
                                        </td>
                                        <td>
                                            <span>{{outStockItem.Qty}}</span>
                                        </td>
                                        <td>
                                            <span>{{outStockItem.Note}}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <pagination :pagination-options.sync="paginationOptions"></pagination>
        </div>
    </div>
    <modal-delivery></modal-delivery>
    <modal-create-pick></modal-create-pick>
    <modal-delivery-sheet></modal-delivery-sheet>
</template>

<script>
    var commonMethods = require('../../js/common');
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var getters = require('../../js/vuex/getters');
    var actions = require('../../js/vuex/actions');
    module.exports = {
        /**
         * @param isChangeTab {boolean} tab是否切换,如果是tab切换,则不响应'page-change'事件,避免页面刷新
         * @param outstockLists {array} 出库单列表数据
         * @param baseLookUp {object} 下拉列表数据
         * @param paginationOptions {object} 分页配置
         * @param status {string} 当前页面
         */
        props: ['isChangeTab', 'outstockLists', 'baseLookUp', 'paginationOptions', 'status'],
        data: function () {
            return {
                autoPrint: false,
            }
        },
        vuex: {
            getters: {
                account: getters.getAccount
            },
            actions: {
                updateAccount: actions.updateAccount
            }
        },
        methods: {
            //批量修改运单号
            updateDeliverySheet: function (outStockBatch,id) {
                var self = this;
                self.$dispatch('transmit','modal-delivery-sheet',outStockBatch);
                //如果没有快递单号,则不能修改运单号
                // if (!outStockBatch.MerchantDeliveryID) {
                //     self.$dispatch('transmit','tip',{
                //         name: '提示',
                //         contentText: '该拣货单没有配置快递公司,不可修改运单号'
                //     });
                //     return;
                // }
                // NProgress.start();
                // servers.postAjax.bind(this)({
                //     url: '/BusOutStock/ErpQueryOutStockItemTempByID',
                //     data: {
                //         ID: id
                //     }
                // }).done(function (result) {
                //     NProgress.done();
                //     if (result.ResultCode == 1) {
                //         var list = result.Data;
                //         if (list.length > 0) {
                //             self.$dispatch('transmit','modal-delivery-sheet',list);
                //         } else {
                //             self.$dispatch('transmit','tip',{
                //                 name: '提示',
                //                 contentText: '该出库单没有订单'
                //             });
                //         }
                //     }
                // })
                
            },
            /**
             * 获取选中项对应的key字段
             * @param key  需要获取的key
             * @returns {Array}
             */
            getIDGroup: function (key) {
                var checkedGroup = this.checkedGroups;
                var idGroup = [];
                if (checkedGroup.length > 0) {
                    idGroup = checkedGroup.map(function (item) {
                        return item[key];
                    });
                }
                return idGroup;
            },
            //获取运单号
            getDeliverySheet: function () {
                var self = this;
                var outStockBatchIDGroup = this.getIDGroup('OutStockID');
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
                            url: '/BusOutStockBatch/ErpGetDeliveryOutStockSheet',
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
                } else {
                    self.$dispatch('transmit', 'tip', {contentText: '请至少选择一个出库单'});
                }
            },
            /**
             * 修改快递
             */
            updateMerchantDelivery: function () {
                var self = this;
                var idGroup = this.getIDGroup('OutStockID');
                if (idGroup.length > 0) {
                    var modalMerchantDeliveryData = {
                        merchantDeliveryLists: self.baseLookUp.merchantDeliveryLists,
                        idGroup: idGroup
                    };
                    self.$broadcast('modal-delivery', modalMerchantDeliveryData);
                } else {
                    self.$dispatch('transmit', 'tip', {contentText: '请至少选择一个出库单'});
                }
            },
            /**
             * 直接出库,不扫描不称重直接出库
             */
            skipWeighing: function () {
                var self = this;
                // var outStockIDGroups = this.getIDGroup('OutStockID');
                const outStockIDGroups = this.checkedGroups.map((item) => {
                    return {
                        OutStockID: item.OutStockID,
                        Sheet: item.Sheet
                    }
                })
                if (outStockIDGroups.length === 0) {
                    self.$dispatch('transmit', 'tip', {contentText: '请选择需要出库的订单!'});
                    return;
                }
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要出库吗?',
                    btnName: '出库',
                    events: {
                        confirm: 'skipWeighing'
                    }
                });
                self.$off('skipWeighing');
                self.$once('skipWeighing', function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/DeliverGoods/ErpBackWriteWeighList',
                        contentType: 'application/json',
                        data: JSON.stringify(outStockIDGroups)
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {contentText: '出库成功!'});
                            self.$dispatch('transmit','page-change');    //重新刷新列表
                        }
                    })
                })
            },
            /**
             * 分批
             * @param isPostconditions {boolean} 是否为后置分批
             */
            createPick: function (isPostconditions) {
                this.$broadcast('modal-create-pick',isPostconditions);
            },
            /**
             * 获取UpSheetID和OutStockID,并且判断选中的出库单是否为完成单,是否可以进行删除操作,是否可以暂停和更改运单号
             * @returns {{upSheetIDGroup: Array, isDealOrders: boolean, isCanDelete: boolean, isCanPauseAndChangeDeliverySheetID: boolean, outStockIDGroup: Array}}
             */
            getIDGroupAndFilter: function () {
                var upSheetIDGroup = [];
                var outStockIDGroup = [];
                var isDealOrders = false;  //是否为完成单
                var isCanDelete = true;  //是否可以删除
                var isCanPauseAndChangeDeliverySheetID = true; //是否可以暂停和更改运单号
                var checkedGroups = this.checkedGroups;
                checkedGroups.forEach(function (checkedGroup) {
                    var flag = checkedGroup.OutStockFlag.Flag;
                    var transferType = checkedGroup.TransferType;
                    if (transferType != 21) {
                        isCanPauseAndChangeDeliverySheetID = false;
                    }
                    if ([100].indexOf(flag) > -1) {
                        isDealOrders = true;
                        isCanDelete = false;
                    } else if ([97,98].indexOf(flag) > -1) {
                        isDealOrders = true;
                    }
                    upSheetIDGroup.push(checkedGroup.UpSheetID);
                    outStockIDGroup.push(checkedGroup.OutStockID);
                });
                return {
                    upSheetIDGroup:upSheetIDGroup,
                    isDealOrders: isDealOrders,
                    isCanDelete: isCanDelete,
                    isCanPauseAndChangeDeliverySheetID: isCanPauseAndChangeDeliverySheetID,
                    outStockIDGroup: outStockIDGroup
                };
            },
            /**
             * 暂停客户订单
             */
            pauseOrder: function () {
                var self = this;
                var idGroupsAndFilters = this.getIDGroupAndFilter();
                var upSheetIDGroup = idGroupsAndFilters.upSheetIDGroup;


                if (idGroupsAndFilters.isDealOrders) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (!idGroupsAndFilters.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，暂时无法暂停，请重新选择。'
                    });
                } else {
                    postPause();
                }

                function postPause() {
                    if (upSheetIDGroup.length > 0) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '您确定要暂停该订单吗?暂停后该订单将无法继续流转,直至你对它重新启动',
                            btnName: '暂停',
                            events: {
                                confirm: 'confirm-pause'
                            }
                        });

                        self.$off('confirm-pause');

                        self.$once('confirm-pause', function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusCustomerOrder/ErpPauseCustomerOrder',
                                contentType: 'application/json',
                                data: JSON.stringify(upSheetIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示',
                                        contentText: '暂停客户订单成功'
                                    });
                                    self.$dispatch('transmit','page-change');
                                }
                            })
                        });
                    }
                }
            },
            /**
             * 置为缺货
             */
            setOutOfStockCustomerOrder: function () {
                var self = this;
                if (this.checkedGroups.length === 0) {
                    self.$dispatch('transmit', 'tip', {contentText: '请选择需要置为缺货的订单!'});
                    return;
                }
                var idGroupsAndFilters = this.getIDGroupAndFilter();
                var upSheetIDGroup = idGroupsAndFilters.upSheetIDGroup;


                if (idGroupsAndFilters.isDealOrders) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (idGroupsAndFilters.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，无法置为缺货，请重新选择。'
                    });
                } else {
                    setOutOfStock();
                }

                function setOutOfStock() {
                    if (upSheetIDGroup.length > 0) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定要置为缺货吗?',
                            btnName: '设为缺货',
                            events: {
                                confirm: 'confirm-setOutOfStock'
                            }
                        });
                        self.$off('confirm-setOutOfStock');
                        self.$once('confirm-setOutOfStock', function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BusCustomerOrder/ErpSetOutOfStockCustomerOrder',
                                contentType: 'application/json',
                                data: JSON.stringify(upSheetIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '置为缺货成功'
                                    });
                                    self.$dispatch('transmit','page-change');
                                }
                            })
                        });
                    }
                }
            },
            //取消订单
            cancelOrder: function () {
                var self = this;
                var idGroupsAndFilters = this.getIDGroupAndFilter();
                var outStockIDGroup = idGroupsAndFilters.outStockIDGroup;


                if (idGroupsAndFilters.isDealOrders) {

                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '已选择的订单中包含已完成或已取消的订单,请重新选择'
                    });
                } else if (idGroupsAndFilters.isCanPauseAndChangeDeliverySheetID) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '该订单为供应退货订单，无法取消，请重新选择。'
                    });
                } else {
                    postCancel();
                }

                function postCancel() {
                    if (outStockIDGroup.length > 0) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '确定要取消订单吗?',
                            btnName: '取消订单',
                            events: {
                                confirm: 'confirm-cancel'
                            }
                        });
                        self.$off('confirm-cancel');
                        self.$once('confirm-cancel', function () {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/DeliverGoods/ErpStockOrderSave_Cancel',
                                contentType: 'application/json',
                                data: JSON.stringify(outStockIDGroup)
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '成功',
                                        contentText: '取消订单成功'
                                    });
                                    self.$dispatch('transmit','page-change');
                                }
                            })
                        });
                    }
                }
            },
            /**
             * 通过OutStockID查询出库单明细
             * @param outstock {object} 需要请求明细的出库单
             * @param outStockID {string} 请求参数OutStockID
             * @param flag {number} 订单状态,97/98/100为已取消或已完成
             */
            queryOutStockItemByID(outstock,outStockID,flag) {
                if (!outstock.OutStockItems || outstock.OutStockItems.length === 0) {  // 如果明细没有,则请求明细
                    if ([97,98,100].indexOf(parseInt(flag,10)) > -1) {   // 已完成或已取消查询
                        this.queryOutStockItemByIDAjax(outstock,outStockID,'Done');
                    } else {   // 其他状态查询
                        this.queryOutStockItemByIDAjax(outstock,outStockID,'Temp');
                    }
                }
            },
            /**
             * 查询出库单明细的ajax请求
             * @param outstock {object} 需要请求明细的出库单
             * @param outStockID {string} 请求参数OutStockID
             * @param status {string} 包括Done/Temp/All 三种情况,如果为Done,用来查询已取消或已完成的出库单,为Temp则查询除已取消和已完成外的所有订单,为All,则查询所有订单
             */
            queryOutStockItemByIDAjax(outstock,outStockID,status) {
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/ErpQueryOutStockItem' + status +'ByID',
                    data: {
                        ID: outStockID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        outstock.OutStockItems = result.Data;
                    }
                })
            },
            //获取快递单Sheet列表
            getDeliverySheetGroup: function () {
                if (this.checkedGroups.length > 0) {
                    var IDGroup = [];
                    var ItemGroup = this.checkedGroups;
                    var PayMode = ItemGroup[0].PayMode;
                    var MerchantDeliveryID = ItemGroup[0].MerchantDeliveryID;
                    var isTheSamePayMode = true;
                    var isTheSameDelivery = true;
                    ItemGroup.forEach(function (item) {
                        //是否相同快递
                        if (MerchantDeliveryID !== item.MerchantDeliveryID) {
                            isTheSameDelivery = false;
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
                            return {
                                ShopID: '',
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
                    return {
                        ShopID: '',
                        IDGroup: [],
                        PayMode: '',
                        MerchantDeliveryID: ''
                    }
                }
            },
            print: function (type,localStorageName,printUrl ,flag) {
                var deliveryParams = this.getDeliverySheetGroup();
                var sheetList = deliveryParams.IDGroup;
                var ShopID = deliveryParams.ShopID || '';
                var PayMode = typeof(deliveryParams.PayMode) == 'number' ? deliveryParams.PayMode : '';
                var MerchantDeliveryID = deliveryParams.MerchantDeliveryID || '';
                if (MerchantDeliveryID) {
                    if (sheetList.length > 0) {
                        var sheetListStr = JSON.stringify(sheetList);
                        localStorage[localStorageName] = sheetListStr;
                        if(flag&& flag=="out") {
                            window.open(printUrl + '?BusinessType=' + type + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint+"&flag="+flag);
                        } else {
                            window.open(printUrl + '?BusinessType=' + type + '&ShopID=' + ShopID + '&PayMode=' + PayMode + '&MerchantDeliveryID=' + MerchantDeliveryID + '&autoPrint=' + this.autoPrint);
                        }
                        
                    }
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '选中的订单中没有选择快递公司!'
                    });
                }

            },
            //打印快递单
            printDelivery: function () {
                this.print(3,'printDeliveryList','#!/print-delivery','out');
            },
            //打印订单
            printPack: function () {
                this.print(2,'printPackSheetList','#!/print-pack','out');
            }

        },
        route: {
            data: function (transition) {
                if (this.outstockLists.length > 0) {
                    this.isChangeTab = true;
                }
                transition.next();
            }
        },
        computed: commonMethods.selectAll('this.outstockLists', function (item) {
            return item;
        }),
        components: {
            pagination: require('../../components/pagination.vue'),
            modalDelivery: require('./components/modal-delivery.vue'),
            modalCreatePick: require('./components/modal-create-pick.vue'),
            modalDeliverySheet: require('./components/modal-delivery-sheet.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .icon-weigh,
    .icon-scan {
        &:before {
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            line-height: 18px;
        }
    }
    .icon-scan {
        &:before {
            background: #96dde7;
            color: #fff;
        }
    }
    .icon-weigh {
        background: #8edb14;
        color: #fff;
    }
</style>