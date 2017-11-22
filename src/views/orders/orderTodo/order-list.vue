<template>
    <div class="col-lg-12">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a href="javascript:void(0)" class="btn btn-default" @click="checkCustomerOrder('')"
                   v-if="buttonStatus.isShowCheckButton">批量审核</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="recoveryCustomerOrder('')"
                   v-if="buttonStatus.isShowChangeNormalButton">转为正常单</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="recoveryCustomerOrder('')"
                   v-if="buttonStatus.isShowCancelPauseButton">取消暂停</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="purchase('')"
                   v-if="buttonStatus.isShowPurchaseButton">生成采购单</a>
                   <a href="javascript:void(0)" class="btn btn-default" @click="buyByOrder('')"
                   v-if="buttonStatus.isShowPurchaseButton">按单采购</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="recoveryCustomerOrder('')"
                   v-if="buttonStatus.isShowCancelLackButton">解除缺货</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="setOutOfStockCustomerOrder('')"
                   v-if="buttonStatus.isShowSetOutOfStockButton">置为缺货</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="updateStock('')"
                   v-if="buttonStatus.isShowChangeStockButton">修改仓库</a>
                <a href="javascript:void(0)" v-if="buttonStatus.isShowDelivery" class="btn btn-default" @click="dipaExpress('')"
                   >分配快递</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="updateMerchantDelivery('')"
                   v-if="buttonStatus.isShowChangeDeliveryButton">修改快递</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="updateRemark('')"
                   v-if="buttonStatus.isShowTradeMemoButton">备注</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="pauseCustomerOrder('')"
                   v-if="buttonStatus.isShowPauseButton">暂停</a>
                <a href="javascript:void(0)" class="btn btn-default"
                   @click="setProblemCustomerOrder('')" v-if="buttonStatus.isShowSetExceptionButton">设为问题单</a>
                <a href="javascript:void(0)" class="btn btn-default" @click="cancelCustomerOrder('')"
                   v-if="buttonStatus.isShowCancelOrderButton">取消订单</a>
                <a @click="copyCustomerOrder('')" href="javascript:void(0)" class="btn btn-default"
                   v-if="buttonStatus.isShowCopyOrderButton">复制订单</a>

                <a  @click="mergeOrder" href="javascript:void(0)" class="btn btn-default"
                   v-if="buttonStatus.isShowMergeOrderButton">合并订单</a>

                <em v-if="show">
                <a @click="splitOrder('')" href="javascript:void(0)" class="btn btn-default"
                   v-if="buttonStatus.isShowSplitOrderButton">明细拆单</a>
                <a @click="splitOrderByStock('')" href="javascript:void(0)" class="btn btn-default"
                   v-if="buttonStatus.isShowSplitOrderButton">库存拆单</a>
                    </em>
                <a @click="uploadFile" v-if="buttonStatus.isShowImportButton" href="javascript:void(0)"
                   class="btn btn-default">导入订单</a>
                <a v-if="buttonStatus.isShowCheckAllButton" @click="checkAll" href="javascript:void(0)"
                   class="btn btn-default">一键审核</a>
                   <a v-if="buttonStatus.isShowHoldOrderButton" @click="holdApply('')" href="javascript:void(0)" class="btn btn-default">截单申请</a>
                   <a v-if="buttonStatus.isShowCancelHoldOrderButton" @click="cancelHold('')" href="javascript:void(0)" class="btn btn-default">取消截单</a>
                <!--<a href="javascript:void(0)" class="btn btn-default"-->
                <!--v-if="buttonStatus.isShowExportOrderButton">导出订单</a>-->
                <!--<a href="javascript:void(0)" class="btn btn-default" v-if="buttonStatus.isShowExportOrderDetailButton">导出订单名细</a>-->
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="sheet-list-table table-responsive">
            <!--非问题单-->
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist"
                   v-if="pageInfo.customerOrderState !== 'exception'">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <th>状态</th>
                    <th>订单号</th>
                    <th v-if="pageInfo.customerOrderState !== 'empty'">买家备注</th>
                    <th v-if="pageInfo.customerOrderState !== 'empty'">买家留言</th>
                    <th v-if="pageInfo.customerOrderState !== 'empty'">卖家备注</th>
                    <th>店铺</th>
                    <th>订单类型</th>
                    <th>外部交易号</th>
                    <th>买家昵称</th>
                    <th>收货人</th>
                    <th>支付方式</th>
                    <th>总数量</th>
                    <th>总金额</th>
                    <th>发货仓库</th>
                    <th>快递公司</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-for="customerOrder in customerOrders" class="panel panel-default">
                <tr class="sheet-list-item">
                    <td class="sheet-item-state"><input type="checkbox" v-model="customerOrder.checked">
                    </td>
                    <td><span>{{customerOrder.StatusDesc}}</span></td>
                    <td class="show-detail-ctrl collapsed"
                        @click="getOrderItems(customerOrder.CustomerOrderID,customerOrder.OrderItems)"
                        data-toggle="collapse" data-parent="#sheet-list"
                        data-target="#{{customerOrder.CustomerOrderID}}">
                        <span class="iconfont icon-alter"></span><span>{{customerOrder.Sheet}}</span>

                    </td>
                    <td v-if="pageInfo.customerOrderState !== 'empty'">{{customerOrder.OrderBusiness.BuyerMemo}}</td>
                    <td v-if="pageInfo.customerOrderState !== 'empty'">{{customerOrder.OrderBusiness.BuyerMessage}}</td>
                    <td v-if="pageInfo.customerOrderState !== 'empty'">{{customerOrder.OrderBusiness.SellerMemo}}</td>
                    <td class="sheet-item-remark"><span class="toolTip-ctrl" data-toggle="tooltip" data-placement="top"
                                                        title="{{customerOrder.Shop.Name}}">{{customerOrder.Shop.Name}}</span>
                    </td>
                    <td>{{customerOrder.OrderTypeDesc}}</td>
                    
                    <td>{{customerOrder.OutSheetID}}</td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.BuyerNick}}">{{customerOrder.BuyerNick | truncationString}}</span>
                    </td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.LinkMan}}">{{customerOrder.LinkMan | truncationString}}</span>
                    </td>
                    <td>{{customerOrder.PayModeDesc}}</td>
                    <td>{{customerOrder.TotalQty}}</td>
                    <td>{{customerOrder.TotalAmount + customerOrder.OrderBusiness.PostFee || 0}}</td>
                    <td><span data-toggle="tooltip" data-placement="top" title="{{customerOrder.Stock.Name}}">{{customerOrder.Stock.Name | truncationString}}</span>
                    </td>
                    <td><span data-toggle="tooltip" data-placement="top"
                              title="{{customerOrder.OrderFlag.MerchantDelivery.Name}}">{{customerOrder.OrderFlag.MerchantDelivery.Name | truncationString}}</span>
                    </td>
                    <td><span v-if="customerOrder.EditTime" data-toggle="tooltip" data-placement="top"
                              title="{{customerOrder.EditTime | truncationTimeString}}">{{customerOrder.EditTime | formatDateFormShow}}</span>
                    </td>
                    <td>
                      <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderDetail.Note}}">
                    {{customerOrder.OrderDetail.Note  | truncationString 4}}
                      </span>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="sheet-list-delete"
                           @click="editCustomerOrder(customerOrder.CustomerOrderID)" data-toggle="tooltip"
                           data-placement="top"
                           title="{{['finish', 'invalid'].indexOf(pageInfo.customerOrderState) > -1 ? '查看' : '编辑'}}"><span
                                class="iconfont {{['finish', 'invalid'].indexOf(pageInfo.customerOrderState) > -1 ? 'icon-look' : 'icon-alter'}}"></span></a>
                    </td>
                </tr>
                <tr class="sheet-list-detail">
                    <td colspan="{{pageInfo.customerOrderState == 'empty' ? 14 : 17}}">
                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                             id="{{customerOrder.CustomerOrderID}}">
                            <div class="sheet-detail-wrap">
                                <order-detail
                                        :is-order-done="pageInfo.customerOrderState == 'invalid' || pageInfo.customerOrderState == 'finish'"
                                        :order-items="customerOrder.OrderItems"
                                        :order-id="customerOrder.CustomerOrderID"
                                        :shop-id="customerOrder.Shop.ShopID"></order-detail>
                                <div class="sheet-detail-operate">
                                    <a v-if="buttonStatus.isShowAddressButton"
                                       @click="updateAddress(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">修改收货信息</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="checkCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowCheckButton">审核确认</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="recoveryCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowChangeNormalButton">转为正常单</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="recoveryCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowCancelPauseButton">取消暂停</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       v-if="buttonStatus.isShowPurchaseButton">生成采购单</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="recoveryCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowCancelLackButton">解除缺货</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="setOutOfStockCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowSetOutOfStockButton">置为缺货</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="updateStock(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowChangeStockButton">修改仓库</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="updateMerchantDelivery(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowChangeDeliveryButton">修改快递</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="updateRemark(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowTradeMemoButton">备注</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="pauseCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowPauseButton">暂停</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="setProblemCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowSetExceptionButton">设为问题单</a>
                                    <a href="javascript:void(0)" class="btn btn-default"
                                       @click="cancelCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       v-if="buttonStatus.isShowCancelOrderButton">取消订单</a>
                                    <a @click="copyCustomerOrder(customerOrder.CustomerOrderID)"
                                       href="javascript:void(0)" class="btn btn-default"
                                       v-if="buttonStatus.isShowCopyOrderButton">复制订单</a>
                                    <a @click="splitOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)"
                                       class="btn btn-default"
                                       v-if="buttonStatus.isShowSplitOrderButton">拆分订单</a>
                                       <!-- <a v-if="buttonStatus.isShowHoldOrderButton" @click="holdApply(customerOrder.CustomerOrderID,customerOrder)" href="javascript:void(0)" class="btn btn-default">截单申请</a>
                                        <a v-if="buttonStatus.isShowCancelHoldOrderButton" @click="cancelHold(customerOrder.CustomerOrderID,customerOrder)" href="javascript:void(0)" class="btn btn-default">取消截单</a> -->
                                    <!--<a href="javascript:void(0)" class="btn btn-default"-->
                                    <!--v-if="buttonStatus.isShowExportOrderButton">导出订单</a>-->
                                    <!--<a href="javascript:void(0)" class="btn btn-default"-->
                                    <!--v-if="buttonStatus.isShowExportOrderDetailButton">导出订单名细</a>-->
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--问题单-->
            <table class="table table-condensed panel-group" id="sheet-list" role="tablist"
                   v-if="pageInfo.customerOrderState == 'exception'">
                <thead class="sheet-list-header">
                <tr>
                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                    <th>状态</th>
                    <th>订单号</th>
                    <th>买家备注</th>
                    <th>买家留言</th>
                    <th>卖家备注</th>
                    <th>发票抬头</th>
                    <th>店铺</th>
                    <th>订单类型</th>
                    <th>外部交易号</th>
                    <th>买家昵称</th>
                    <th>收货人</th>
                    <th>支付方式</th>
                    <th>总数量</th>
                    <th>实收款</th>
                    <th>发货仓库</th>
                    <th>快递公司</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-for="customerOrder in customerOrders" class="panel panel-default">
                <tr class="sheet-list-item">
                    <td class="sheet-item-state"><input type="checkbox" v-model="customerOrder.checked">
                    </td>
                    <td><span>{{customerOrder.StatusDesc}}</span></td>
                    <td class="show-detail-ctrl collapsed"
                        @click="getOrderItems(customerOrder.CustomerOrderID,customerOrder.OrderItems)"
                        data-toggle="collapse" data-parent="#sheet-list"
                        data-target="#{{customerOrder.CustomerOrderID}}"><span class="iconfont"></span><span>{{customerOrder.Sheet}}</span>
                    </td>
                    <td>{{customerOrder.OrderBusiness.BuyerMemo}}</td>
                    <td>{{customerOrder.OrderBusiness.BuyerMessage}}</td>
                    <td>{{customerOrder.OrderBusiness.SellerMemo}}</td>
                    <td>{{customerOrder.OrderBusiness.InvoiceTitle}}</td>
                    <td>{{customerOrder.Shop.Name}}</td>
                    <td>{{customerOrder.OrderTypeDesc}}</td>
                    
                    <!--<td>{{customerOrder.Shop.NetShop.Channel.Name}}</td>-->
                    <td>{{customerOrder.OutSheetID}}</td>
                    <td>{{customerOrder.BuyerNick}}</td>
                    <td>{{customerOrder.LinkMan}}</td>
                    <td>{{customerOrder.PayModeDesc}}</td>
                    <td>{{customerOrder.TotalQty}}</td>
                    <td>{{customerOrder.TotalAmount + customerOrder.OrderBusiness.PostFee || 0}}</td>
                    <td>{{customerOrder.Stock.Name}}</td>

                    <td>
                        {{customerOrder.OrderFlag.MerchantDelivery.Name}}
                    </td>
                    <td><span v-if="customerOrder.EditTime" data-toggle="tooltip" data-placement="top"
                              title="{{customerOrder.EditTime | truncationTimeString}}">{{customerOrder.EditTime | formatDateFormShow}}</span>
                    </td>
                    <td>
                      <span data-toggle="tooltip" data-placement="top" title="{{customerOrder.OrderDetail.Note}}">
                    {{customerOrder.OrderDetail.Note  | truncationString 4}}
                      </span>
                    </td>
                    <td>
                        <a @click="editCustomerOrder(customerOrder.CustomerOrderID)" href="javascript:void(0)"
                           class="sheet-list-edit" data-toggle="tooltip" data-placement="top" title="编辑"><span
                                class="iconfont  icon-alter"></span></a>

                    </td>
                </tr>
                <tr class="sheet-list-detail">
                    <td colspan="18">
                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                             id="{{customerOrder.CustomerOrderID}}">
                            <div class="sheet-detail-wrap">
                                <order-detail :order-items="customerOrder.OrderItems"
                                              :order-id="customerOrder.CustomerOrderID"
                                              :shop-id="customerOrder.Shop.ShopID"></order-detail>
                                <div class="sheet-detail-operate">
                                    <a @click="updateStock(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">修改仓库</a>
                                    <a @click="updateMerchantDelivery(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">修改快递</a>
                                    <a @click="updateRemark(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">订单备注</a>
                                    <!--<a @click="pauseCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"-->
                                    <!--href="javascript:void(0)" class="btn btn-default">暂 停</a>-->
                                    <a @click="recoveryCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">置为正常单</a>
                                    <a @click="cancelCustomerOrder(customerOrder.CustomerOrderID,customerOrder)"
                                       href="javascript:void(0)" class="btn btn-default">订单无效</a>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-if="customerOrders.length == 0 && !$loadingRouteData" class="no-data">没有可供显示的结果</div>
            <pagination :pagination-options.sync="paginationOptions"></pagination>
        </div>
    </div>
    <edit-order></edit-order>
    <modal-stock></modal-stock>
    <modal-remark></modal-remark>
    <modal-delivery></modal-delivery>
    <modal-address></modal-address>
    <modal-check></modal-check>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        props: ['customerOrders', 'baseData', 'paginationOptions', 'isChangeTab'],
        data: function () {
            return {
                pageInfo: {
                    modalText: '',
                    customerOrderState: '',
                    fileType: 27
                },
                show:false,
                //是否显示按钮
                buttonStatus: {
                    isShowCheckButton: false,  //批量审核
                    isShowChangeNormalButton: false, //转为正常单
                    isShowCancelPauseButton: false, //取消暂停
                    isShowPurchaseButton: false, //生成采购单
                    isShowCancelLackButton: false, //解除缺货
                    isShowChangeStockButton: false, //解除缺货
                    isShowChangeDeliveryButton: false, //修改快递
                    isShowTradeMemoButton: false, //备注
                    isShowPauseButton: false, //暂停
                    isShowSetExceptionButton: false, //设为问题单
                    isShowCancelOrderButton: false, //取消订单
                    isShowCopyOrderButton: false, //复制订单
                    isShowMergeOrderButton: false, //合并订单
                    isShowSplitOrderButton: false, //拆分订单
                    isShowExportOrderButton: false, //导出订单
                    isShowExportOrderDetailButton: false,  //导出订单名细
                    isShowAddressButton: false, //修改地址
                    isShowSetOutOfStockButton: false, //置为缺货
                    isShowImportButton: false, //导入订单
                    isShowCheckAllButton: false, // 一键审核,
                    isShowHoldOrderButton: false, // 截单申请
                    isShowCancelHoldOrderButton: false, // 取消截单
                    isShowDelivery:false,//分配快递
                }
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit', 'uploadModalShow', this.pageInfo.fileType, true);
            },
            /**
             *  获取对应ID订单的明细,并将其存入对应的对象中
             * @param customerOrderID  {string} 订单ID
             * @param orderItems   {Array} 存储改订单的明细
             */
            getOrderItems: function (customerOrderID, orderItems) {
                if (orderItems.length > 0) {
                    return;
                } else {
                    NProgress.start();
                    if (['finish', 'invalid'].indexOf(this.pageInfo.customerOrderState) > -1) {
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpQueryCustomerOrderItemDoneByID',
                            data: {
                                ID: customerOrderID
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                result.Data.forEach(function (item) {
                                    item.isSaved = true;
                                    orderItems.push(item);
                                });
                            }
                        })
                    } else {
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpQueryCustomerOrderItemTempByID',
                            data: {
                                ID: customerOrderID
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                result.Data.forEach(function (item) {
                                    item.isSaved = true;
                                    orderItems.push(item);
                                });
                            }
                        })
                    }

                }
            },
            //修改客户订单
            editCustomerOrder: function (CustomerOrderID) {
                var self = this;
                if (['finish', 'invalid'].indexOf(this.pageInfo.customerOrderState) > -1) {
                    servers.postAjax.bind(this)({
                        url: '/BusCustomerOrder/ErpQueryCustomerOrderDoneByID',
                        data: {
                            ID: CustomerOrderID
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            result.Data.OrderItems.forEach(function (item) {
                                item.isSaved = true;
                            });
                            self.$broadcast('edit-order', result.Data);
                        }
                    });
                } else {
                    servers.postAjax.bind(this)({
                        url: '/BusCustomerOrder/ErpQueryCustomerOrderTempByID',
                        data: {
                            ID: CustomerOrderID
                        }
                    }).done(function (result) {
                        if (result.ResultCode == 1) {
                            result.Data.OrderItems.forEach(function (item) {
                                item.isSaved = true;
                            });
                            self.$broadcast('edit-order', result.Data);
                        }
                    });
                }

            },
            //复制客户订单
            copyCustomerOrder: function (CustomerOrderID) {
                var customerIDGroup = this.getCustomerIDGroup(CustomerOrderID);
                var self = this;
                if (customerIDGroup.length > 1) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '每次只能复制一张订单'
                    });
                } else if (customerIDGroup.length == 1) {
                    self.$dispatch('copy-order', customerIDGroup[0]);
                }
            },
//            toggleCheckItem: function (customerOrder) {
//                customerOrder.checked = !customerOrder.checked;
//            },
            /**
             * 保存客户订单明细子表,如果传入订单详情,则保存该订单详情下的数据,如果没有指定详情(用于单条保存),则保存选中订单中被修改过的详情(用于整体保存)
             * @param customerIDGroup   {Array} 选中的订单ID
             * @param customerOrder   {object} 订单详情
             * @param callback {function} 保存成功后的回调函数
             * @param actionName {string} 回调函数的功能名
             */
            saveCustomerOrderItem: function (customerIDGroup, callback, actionName, customerOrder) {
                var self = this;
                var saveCustomerOrderItemLists = [];
                var isNeedSaveChange = false;
                //如果传入订单详情,则保存该详情被修改过的数据
                if (customerOrder) {
                    customerOrder.OrderItems.forEach(function (orderItem) {
                        if (!orderItem.isSaved && !orderItem.isNotSelected) {   //如果处于未保存状态,则将数据放入待保存数组saveCustomerOrderItemLists
                            getSaveItemsList(orderItem, customerOrder);
                        }
                    });
                } else {  //否则,保存选中的订单下被修改过的数据
                    var customerOrders = this.customerOrders;
                    customerOrders.forEach(function (customerOrder) {   //遍历所有订单
                        var customerOrderID = customerOrder.CustomerOrderID;
                        if (customerIDGroup.indexOf(customerOrderID) > -1) {    //如果选中的订单ID包含该订单ID
                            customerOrder.OrderItems.forEach(function (orderItem) {   //则遍历该订单下的所有详情
                                if (!orderItem.isSaved && !orderItem.isNotSelected) {   //如果处于未保存状态,则将数据放入待保存数组中
                                    getSaveItemsList(orderItem, customerOrder);
                                }
                            });
                        }
                    })
                }
                if (saveCustomerOrderItemLists.length > 0) {   //如果存在未保存数据
                    self.$dispatch('transmit', 'tip', {
                        contentText: '存在未保存订单,' + actionName + '前要先保存订单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'saveCustomerOrderItemLists'
                        }

                    });
                    self.$off('saveCustomerOrderItemLists');

                    self.$once('saveCustomerOrderItemLists', function () {
                        NProgress.start();
                        isNeedSaveChange = true;
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/ErpSaveCustomerOrderItem',
                            contentType: 'application/json',
                            data: JSON.stringify(saveCustomerOrderItemLists)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                if (callback) {
                                    callback(isNeedSaveChange);
                                }
                                self.$dispatch('transmit', 'refreshOrder');
                            }
                        })
                    });
                } else if (callback) {
                    callback(isNeedSaveChange);
                }

                function getSaveItemsList(orderItem, customerOrder) {
                    saveCustomerOrderItemLists.push({
                        CustomerOrderItemID: orderItem.CustomerOrderItemID,
                        CustomerOrderID: customerOrder.CustomerOrderID,
                        Qty: orderItem._Qty,
                        BarcodeID: orderItem.BarcodeID,
                        Price: orderItem._Price
                    });
                }
            },
            getCustomerIDGroup: function (customerID) {
                var customerIDGroup = [];
                if (customerID) {
                    customerIDGroup.push(customerID);
                } else {
                    var checkedGroups = this.checkedGroups;
                    var checkedGroupsID = [];
                    checkedGroups.forEach(function (checkedCustomer) {
                        checkedGroupsID.push(checkedCustomer.CustomerOrderID)
                    });
                    customerIDGroup = checkedGroupsID;
                }
                if (customerIDGroup.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请至少选中一个订单'
                    });
                    return [];
                } else {
                    return customerIDGroup;
                }
            },
            //审核客户订单
            checkCustomerOrder: function (customerID, customerOrder) {
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                var self = this;
                this.saveCustomerOrderItem(customerIDGroup, postCheck, '审核', customerOrder);

                function postCheck(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.checkCustomerOrderAjax(customerIDGroup)
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确认订单没有问题吗?审核后订单状态变为已确认',
                                btnName: '审核通过',
                                events: {
                                    confirm: 'confirm-check'
                                }
                            });
                        }
                        self.$off('confirm-check');

                        self.$once('confirm-check', function () {
                            self.checkCustomerOrderAjax(customerIDGroup);
                        });
                    }
                }

            },
            checkCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCheckCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    var msgText = '';
                    if(result.ErrorMessage == null ){
                        msgText = '审核成功';
                    } else {
                        msgText = result.ErrorMessage;
                    }
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示',
                            contentText: msgText
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            //取消客户订单
            cancelCustomerOrder: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postCancel, '取消订单', customerOrder);

                function postCancel(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.cancelCustomerOrderAjax(customerIDGroup)
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '无效操作无法恢复,订单设为无效后,将无法再对该订单进行任何操作,需要重新下载订单,你确定要继续吗?',
                                btnName: '设为无效',
                                events: {
                                    confirm: 'confirm-cancel'
                                }
                            });
                        }
                        self.$off('confirm-cancel');

                        self.$once('confirm-cancel', function () {
                            self.cancelCustomerOrderAjax(customerIDGroup)
                        });
                    }
                }
            },
            cancelCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCancelCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '取消客户订单成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            // 截单申请
            holdApply: function(customerID, customerOrder) {
              var self = this;
              var customerList = []
              this.checkedGroups.forEach(function(item) {
                customerList.push({
                  CustomerOrderID: item.CustomerOrderID,
                  Flag: item.OrderFlag.Flag,
                  Type: 1 // 1截单 2 取消截单
                })
              })
              var customerIDGroup = this.getCustomerIDGroup(customerID);
              this.saveCustomerOrderItem(customerIDGroup, postHold, '截单申请', customerOrder);

              function postHold(isNeedSave) {
                if (customerList.length > 0) {
                  if (isNeedSave) {
                    self.holdCustomerOrderAjax(customerList);
                  }
                  else {
                    self.$dispatch('transmit', 'tip', {
                      name: '提示',
                      contentText: '您确定要申请截单吗？',
                      btnName: '确定',
                      events: {
                        confirm: 'confirm-hold'
                      }
                    });
                  }
                  self.$off('confirm-hold');

                  self.$once('confirm-hold', function() {
                    self.holdCustomerOrderAjax(customerList);
                  })
                }
              }
            },
            holdCustomerOrderAjax: function(customerList) {
              var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpHoldCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerList)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '截单申请成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            // 取消截单
            cancelHold: function(customerID, customerOrder) {
              var self = this;
              var customerList = []
              this.checkedGroups.forEach(function(item) {
                customerList.push({
                  CustomerOrderID: item.CustomerOrderID,
                  Flag: item.OrderFlag.Flag,
                  Type: 1 // 1截单 2 取消截单
                })
              })
              var customerIDGroup = this.getCustomerIDGroup(customerID);
              this.saveCustomerOrderItem(customerIDGroup, postCancelHold, '截单申请', customerOrder);
      
              function postCancelHold(isNeedSave) {
                if (customerIDGroup.length > 0) {
                  if (isNeedSave) {
                    self.cancelHoldCustomerOrderAjax(customerList);
                  }
                  else {
                    self.$dispatch('transmit', 'tip', {
                      name: '提示',
                      contentText: '您确定要取消截单操作吗？',
                      btnName: '确定',
                      events: {
                        confirm: 'confirm-cancelhold'
                      }
                    });
                  }
                  self.$off('confirm-cancelhold');

                  self.$once('confirm-cancelhold', function() {
                    self.cancelHoldCustomerOrderAjax(customerList);
                  })
                }
              }
            },
            cancelHoldCustomerOrderAjax: function(customerList) {
              var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpCancelHoldCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerList)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '截单申请成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            //暂停客户订单
            pauseCustomerOrder: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postPause, '暂停订单', customerOrder);

                function postPause(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.pauseCustomerOrderAjax(customerIDGroup);
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确定要暂停该订单吗?暂停后该订单将无法继续流转,直至你对它重新启动',
                                btnName: '暂停',
                                events: {
                                    confirm: 'confirm-pause'
                                }
                            });
                        }
                        self.$off('confirm-pause');

                        self.$once('confirm-pause', function () {
                            self.pauseCustomerOrderAjax(customerIDGroup);

                        });
                    }
                }
            },
            pauseCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpPauseCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '暂停客户订单成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            // 生成采购单
            purchase: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postpurchase, '生成采购单', customerOrder);

                function postpurchase(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.purchaseCustomerOrderAjax(customerIDGroup);
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确定要生成采购单吗?',
                                btnName: '生成采购单',
                                events: {
                                    confirm: 'confirm-purchase'
                                }
                            });
                        }
                        self.$off('confirm-purchase');

                        self.$once('confirm-purchase', function () {
                            self.purchaseCustomerOrderAjax(customerIDGroup);

                        });
                    }
                }
            },
            purchaseCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusManuOrder/ErpCreateManuOrderByCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '生成采购单成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            /**
             * 按单购买
             */
            buyByOrder(customerID) {
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusManuOrder/ErpCreateManuOrderByOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '采购成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },

            //恢复客户订单
            recoveryCustomerOrder: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postRecovery, '恢复订单', customerOrder);

                function postRecovery(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.recoveryCustomerOrderAjax(customerIDGroup);
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确定要恢复该订单吗?',
                                btnName: '恢复',
                                events: {
                                    confirm: 'confirm-recovery'
                                }
                            });
                        }
                        self.$off('confirm-recovery');

                        self.$once('confirm-recovery', function () {
                            self.recoveryCustomerOrderAjax(customerIDGroup);

                        });
                    }
                }
            },
            recoveryCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpRecoveryCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '恢复客户订单成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            //置为缺货
            setOutOfStockCustomerOrder: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postRecovery, '置为缺货', customerOrder);

                function postRecovery(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.setOutOfStockCustomerOrderAjax(customerIDGroup);
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确定要将该订单置为缺货吗?',
                                btnName: '置为缺货',
                                events: {
                                    confirm: 'setOutOfStockCustomerOrder'
                                }
                            });
                        }

                        self.$off('setOutOfStockCustomerOrder');

                        self.$once('setOutOfStockCustomerOrder', function () {
                            self.setOutOfStockCustomerOrderAjax(customerIDGroup);
                        });
                    }
                }
            },
            setOutOfStockCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpSetOutOfStockCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '置为缺货成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            //修改仓库
            updateStock: function (customerID, customerOrder) {
                var self = this;
                console.info(self);
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postUpdateStock, '修改仓库', customerOrder);

                function postUpdateStock() {
                    if (customerIDGroup.length > 0) {
                        var modalStockData = {
                            stockLists: self.baseData.stockLists,
                            customerIDGroup: customerIDGroup
                        };
                        self.$broadcast('modal-stock', modalStockData, customerOrder);
                    }
                }
            },
            //
            //修改收货信息
            updateAddress: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postUpdateAddress, '修改收货信息', customerOrder);

                function postUpdateAddress() {
                    if (customerIDGroup.length > 0) {
                        self.$broadcast('modal-address', customerIDGroup, customerOrder);
                    }
                }
            },
            //合并订单
            mergeOrder: function () {
                var self = this;
                var checkedGroups = this.checkedGroups;

                if (checkedGroups.length >= 2) {
                    var checkedGroupsID = [];
                    var ShopID = checkedGroups[0].ShopID;
                    var PayMode = checkedGroups[0].PayMode;
                    var LinkMan = checkedGroups[0].LinkMan;
                    var Mobile = checkedGroups[0].Mobile;
                    var Phone = checkedGroups[0].Phone;
                    var Address = checkedGroups[0].Address;
                    var isShopIdSame = true;
                    var isPayModeSame = true;
                    var isLinkManSame = true;
                    var isMobileSame = true;
                    var isPhoneSame = true;
                    var isAddressSame = true;
                    if (isShopIdSame && isPayModeSame && isLinkManSame && isMobileSame && isPhoneSame) {
                        self.$dispatch('transmit', 'tip', {
                            name: '提示:',
                            contentText: '确定要合并勾选订单？请确认【店铺】【支付方式】【收货人】【收货电话】【收货手机】【收货地址】相同，否则会合并失败。',
                            btnName: '合并订单',
                            events: {
                                confirm: 'confirm-mergeOrder-select'
                            }
                        });
                        self.$off('confirm-mergeOrder-select');

                        self.$once('confirm-mergeOrder-select', function () {
                            checkedGroups.forEach(function (checkedCustomer) {
                                if (ShopID !== checkedCustomer.ShopID) {
                                    isShopIdSame = false;
                                }
                                if (PayMode !== checkedCustomer.PayMode) {
                                    isPayModeSame = false;
                                }
                                if (LinkMan !== checkedCustomer.LinkMan) {
                                    isLinkManSame = false;
                                }
                                if (Mobile !== checkedCustomer.Mobile) {
                                    isMobileSame = false;
                                }
                                if (Phone !== checkedCustomer.Phone) {
                                    isPhoneSame = false;
                                }
                                if (Address !== checkedCustomer.Address) {
                                    isAddressSame = false;
                                }
                                checkedGroupsID.push(checkedCustomer.CustomerOrderID)
                            });
                            if (isShopIdSame && isPayModeSame && isLinkManSame && isMobileSame && isPhoneSame) {
                                NProgress.start();
                                servers.postAjax.bind(this)({
                                    url: '/BusCustomerOrder/MergeOrder',
                                    contentType: 'application/json',
                                    data: JSON.stringify(checkedGroupsID)
                                }).done(function (result) {
                                    NProgress.done();
                                    if (result.ResultCode == 1) {
                                        var alertT;
                                        if (result.Data) {
                                            alertT = result.Data;
                                        } else {
                                            alertT = '合并成功!'
                                        }
                                        self.$dispatch('transmit', 'tip', {
                                            name: '成功',
                                            contentText: alertT,
                                            btnName: '知道'
                                        });
                                        self.$dispatch('transmit', 'refreshOrder');
                                    }
                                })
                            } else {
                                var notice = '';
                                if (!isShopIdSame) {
                                    notice += '【店铺】';
                                }
                                if (!isPayModeSame) {
                                    notice += '【支付方式】';
                                }
                                if (!isLinkManSame) {
                                    notice += '【收货人】';
                                }
                                if (!isMobileSame) {
                                    notice += '【收货手机】';
                                }
                                if (!isPhoneSame) {
                                    notice += '【收货电话】';
                                }
                                if (!isAddressSame) {
                                    notice += '【收货地址】';
                                }
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示',
                                    contentText: notice + '不一致,请重新选择!',
                                    btnName: '知道'
                                });
                            }
                        })
                    }
                } else {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请至少选择两张订单合并'
                    });
                }


//                if (checkedGroups.length == 0) {    //没选订单的时候,合并所有订单
//                    self.$dispatch('transmit','tip',{
//                        name: '提示:',
//                        contentText: '确定要合并所有订单吗?请确保[仓库][店铺][收货人][单据类型][收货地址][支付方式]一致,否则会合并失败!',
//                        btnName: '确定合并',
//                        events: {
//                            confirm: 'confirm-mergeOrder-all'
//                        }
//                    });
//                    self.$once('confirm-mergeOrder-all',function () {
//                        NProgress.start();
//                        servers.postAjax.bind(this)({
//                            url: '/BusCustomerOrder/BatchMergeOrder'
//                        }).done(function (result) {
//                            if (result.ResultCode == 1) {
//                                NProgress.done();
//                                self.$dispatch('transmit','tip',{
//                                    name: '成功',
//                                    contentText: '合并成功'
//                                });
//                                self.$dispatch('transmit','refreshOrder');
//                            }
//                        })
//                    })
//                } else if (checkedGroups.length > 2) {    //大于两张订单,不合并
//                    self.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '只能合并2张订单或合并所有订单'
//                    });
//                } else if (checkedGroups.length == 2) {   //两张订单合并
//                    self.$dispatch('transmit','tip',{
//                        name: '提示:',
//                        contentText: '确定要合并订单吗?请确保[仓库][店铺][收货人][单据类型][收货地址][支付方式]一致,否则会合并失败!',
//                        btnName: '确定合并',
//                        events: {
//                            confirm: 'confirm-mergeOrder-select'
//                        }
//                    });
//                    self.$once('confirm-mergeOrder-select',function () {
//                        NProgress.start();
//                        var checkedGroupsID = [];
//                        checkedGroups.forEach(function (checkedCustomer) {
//                            checkedGroupsID.push(checkedCustomer.CustomerOrderID)
//                        });
//                        servers.postAjax.bind(this)({
//                            url: '/BusCustomerOrder/MergeOrder',
//                            contentType: 'application/json',
//                            data: JSON.stringify(checkedGroupsID)
//                        }).done(function (result) {
//                            if (result.ResultCode == 1) {
//                                NProgress.done();
//                                self.$dispatch('transmit','tip',{
//                                    name: '成功',
//                                    contentText: '合并成功'
//                                });
//                                self.$dispatch('transmit','refreshOrder');
//                            }
//                        })
//                    })
//                } else {
//                    self.$dispatch('transmit','tip',{
//                        name: '提示',
//                        contentText: '请选择两张订单合并或者合并所有订单'
//                    });
//                }
            },
            //拆单
            splitOrder: function (customerID) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                if (customerIDGroup) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要拆分勾选的订单吗?拆分将按照商品的明细进行拆分,拆分成功后原订单会被取消!',
                        btnName: '确定拆分',
                        events: {
                            confirm: 'confirm-split'
                        }
                    });
                    self.$off('confirm-split');

                    self.$once('confirm-split', function () {
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/SplitOrder',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                NProgress.done();
                                self.$dispatch('transmit', 'tip', {
                                    name: '成功',
                                    contentText: '拆单成功'
                                });
                                self.$dispatch('transmit', 'refreshOrder');
                            }
                        })
                    })
                }
            },
            //库存拆单
            splitOrderByStock: function (customerID) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                if (customerIDGroup) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要拆分勾选的订单吗?拆分将按照商品的库存进行拆分,拆分成功后原订单会被取消!',
                        btnName: '确定拆分',
                        events: {
                            confirm: 'confirm-split-by-stock'
                        }
                    });
                    self.$off('confirm-split-by-stock');

                    self.$once('confirm-split-by-stock', function () {
                        servers.postAjax.bind(this)({
                            url: '/BusCustomerOrder/SplitOrderByInventory',
                            contentType: 'application/json',
                            data: JSON.stringify(customerIDGroup)
                        }).done(function (result) {
                            if (result.ResultCode == 1) {
                                NProgress.done();
                                self.$dispatch('transmit', 'tip', {
                                    name: '成功',
                                    contentText: '拆单成功'
                                });
                                self.$dispatch('transmit', 'refreshOrder');
                            }
                        })
                    })
                }
            },
            //修改备注
            updateRemark: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postUpdateRemark, '修改备注', customerOrder);

                function postUpdateRemark() {
                    if (customerIDGroup.length > 0) {
                        self.$broadcast('modal-remark', customerIDGroup, customerOrder);
                    }
                }
            },
            //分配快递
            dipaExpress: function (customerID, customerOrder) {
                var self = this;
                let customerIDGroup = this.getCustomerIDGroup(customerID);
                console.info(customerIDGroup);
                if(customerIDGroup.length<=0){
                    return false;
                }
                servers.postAjax.bind(this)({
                        url: '/BusCustomerOrder/ErpCustomerOrderAllocateDelivery',
                        contentType: 'application/json',
                        data:JSON.stringify(customerIDGroup)
                        
                    }).done(function (result) {
                        if (result.ResultCode == "1") {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '分配成功'
                            });
                            self.$dispatch('transmit', 'refreshOrder');
                        }
                        
                    });
            
            },
            //修改快递
            updateMerchantDelivery: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postUpdateMerchantDelivery, '修改快递', customerOrder);

                function postUpdateMerchantDelivery() {
                    if (customerIDGroup.length > 0) {
                        var modalMerchantDeliveryData = {
                            merchantDeliveryLists: self.baseData.merchantDeliveryLists,
                            customerIDGroup: customerIDGroup
                        };
                        self.$broadcast('modal-delivery', modalMerchantDeliveryData, customerOrder);
                    }
                }
            },
            //置为问题单
            setProblemCustomerOrder: function (customerID, customerOrder) {
                var self = this;
                var customerIDGroup = this.getCustomerIDGroup(customerID);
                this.saveCustomerOrderItem(customerIDGroup, postSetProblem, '设为问题单', customerOrder);
                function postSetProblem(isNeedSave) {
                    if (customerIDGroup.length > 0) {
                        if (isNeedSave) {
                            self.setProblemCustomerOrderAjax(customerIDGroup);
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '您确定要设为问题单吗?',
                                btnName: '设为问题单',
                                events: {
                                    confirm: 'confirm-problem'
                                }
                            });
                        }
                        self.$off('confirm-problem');

                        self.$once('confirm-problem', function () {
                            self.setProblemCustomerOrderAjax(customerIDGroup);
                        });
                    }
                }
            },
            setProblemCustomerOrderAjax: function (customerIDGroup) {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpSetProblemCustomerOrder',
                    contentType: 'application/json',
                    data: JSON.stringify(customerIDGroup)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功',
                            contentText: '设为问题单成功'
                        });
                        self.$dispatch('transmit', 'refreshOrder');
                    }
                })
            },
            // 一键审核
            checkAll: function () {
                this.$dispatch('transmit', 'modal-check', this.baseData);
            },
            //重置按钮状态
            resetButtonState: function () {
                this.buttonStatus = {
                    isShowCheckButton: false,  //批量审核
                    isShowChangeNormalButton: false, //转为正常单
                    isShowCancelPauseButton: false, //取消暂停
                    isShowPurchaseButton: false, //生成采购单
                    isShowCancelLackButton: false, //解除缺货
                    isShowChangeStockButton: false, //解除缺货
                    isShowChangeDeliveryButton: false, //修改快递
                    isShowTradeMemoButton: false, //备注
                    isShowPauseButton: false, //暂停
                    isShowSetExceptionButton: false, //设为问题单
                    isShowCancelOrderButton: false, //取消订单
                    isShowCopyOrderButton: false, //复制订单
                    isShowMergeOrderButton: false, //合并订单
                    isShowSplitOrderButton: false, //拆分订单
                    isShowExportOrderButton: false, //导出订单
                    isShowExportOrderDetailButton: false,  //导出订单名细
                    isShowAddressButton: false, //修改地址
                    isShowSetOutOfStockButton: false, //置为缺货
                    isShowImportButton: false, // 是否显示导入
                    isShowCheckAllButton: false, // 是否显示一键审核
                    isShowHoldOrderButton: false, // 截单申请
                    isShowCancelHoldOrderButton: false, // 取消截单
                    isShowDelivery: false,//分配快递
                }
            },
            //设置按钮状态
            setButtonsState: function () {

                this.resetButtonState();

                //不同状态显示不同的按钮
                var customerOrderState = this.pageInfo.customerOrderState;
                var buttonStatus = this.buttonStatus;
                //批量审核
                if (['empty'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowCheckButton = true;
                    buttonStatus.isShowAddressButton = true;
                    buttonStatus.isShowSetOutOfStockButton = true;
                    buttonStatus.isShowImportButton = true;
                    buttonStatus.isShowCheckAllButton = true;
                    buttonStatus.isShowDelivery = true; //配置快递
                }
                if (['pick'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowSetOutOfStockButton = true;
                    buttonStatus.isShowPauseButton = true;
                    buttonStatus.isShowCheckButton = false;
                    buttonStatus.isShowCopyOrderButton = true;
                    buttonStatus.isShowHoldOrderButton = true;
                    buttonStatus.isShowCancelHoldOrderButton = true;
                    buttonStatus.isShowDelivery = false;
                }
                //转为正常单
                if (['exception'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowChangeNormalButton = true;
                }
                //取消暂停
                if (['pause'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowCancelPauseButton = true;
                }
                //生成采购单
                if (['lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowPurchaseButton = true;
                }
                //解除缺货
                if (['lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowCancelLackButton = true;
                }
                //修改仓库
                if (['empty', 'exception', 'lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowChangeStockButton = true;
                }
                //修改快递
                if (['empty', 'exception'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowChangeDeliveryButton = true;
                }
               


                //备注
                if (['empty', 'exception', 'pause', 'lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowTradeMemoButton = true;
                }
                //暂停
                if (['empty'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowPauseButton = true;
                }
                //设为问题单
                if (['empty'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowSetExceptionButton = true;
                }
                //取消订单
                if (['empty', 'exception', 'pause', 'lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowCancelOrderButton = true;
                }
                //复制订单
                if (['empty', 'exception', 'pause', 'lack'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowCopyOrderButton = true;
                }
                //合并订单
                if (['empty'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowMergeOrderButton = true;
                }
                //拆分订单
                if (['empty'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowSplitOrderButton = true;
                }
                //导出订单
                if (['finish', 'invalid'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowExportOrderButton = true;
                }
                //导出订单名细
                if (['finish', 'invalid'].indexOf(customerOrderState) > -1) {
                    buttonStatus.isShowExportOrderDetailButton = true;
                }
            },
             // 获取账号信息
            getUserInfo: function () {
                console.log("userinfo");
                var self = this;
                servers.postAjax({
                    url: '/Login/ErpGetUserInfo',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        var user = result.Data;
                        console.info("test");
                        console.info(user.SysGlobalConfigs['101001'])
                        if(user.SysGlobalConfigs['101001']!="21"){
                            self.show = true;
                        }
                    }
                })
            }
        },
        computed: commonMethods.selectAll('this.customerOrders', function (item) {
            return item
        }),
        route: {
            data: function (transition) {
                this.pageInfo.customerOrderState = transition.to.name;
                console.log("inroute");
                this.getUserInfo();
//                this.paginationOptions.cur = transition.to.query.page || 1;
//                this.paginationOptions.path = this.pageInfo.customerOrderState;
//                console.log(this.pageInfo.customerOrderState);
                //设置按钮状态
                this.setButtonsState();
                if (this.customerOrders.length > 0) {
                    this.isChangeTab = true;
                }
                
            }
        },
        events: {
            //审核客户订单
            'check': function (customerID) {
                this.checkCustomerOrder(customerID)
            },
            //取消客户订单
            'cancel': function (customerID) {
                this.cancelCustomerOrder(customerID)
            },
            //暂停客户订单
            'pause': function (customerID) {
                this.pauseCustomerOrder(customerID)
            },
            //恢复客户订单
            'recovery': function (customerID) {
                this.recoveryCustomerOrder(customerID)
            },
            'set-problem': function (customerID) {
                this.setProblemCustomerOrder(customerID);
            },
            'split': function (customerID) {
                this.splitOrder(customerID);
            }
        },
        ready: function () {
            
            //显示详情页
            $(document).on('show.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse', '.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            orderDetail: require('./order-detail.vue'),
            modalSizeColor: require('../../../components/modal-size-color.vue'),
            editOrder: require('./edit-order.vue'),
            modalStock: require('./modal-stock.vue'),
            modalRemark: require('./modal-remark.vue'),
            modalDelivery: require('./modal-delivery.vue'),
            modalAddress: require('./modal-address.vue'),
            modalCheck: require('./modal-check.vue'),
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>