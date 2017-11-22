var types = require('./mutation-types');

module.exports = {
    //增加tab
    addTab: function (store,routeObj) {
        store.dispatch(types.ADDTAB,routeObj)
    },
    //删除tab
    removeTab: function (store, routeObj) {
        store.dispatch(types.REMOVETAB,routeObj)
    },
    //清除tab
    clearTab: function (store) {
        store.dispatch(types.CLEARTAB);
    },

    //更新账号信息
    updateAccount: function (store, account) {
        store.dispatch(types.UPDATEACCOUNT,account);
    },
    //更新菜单
    updateNavLists: function (store, navLists) {
        store.dispatch(types.UPDATENAVLISTS,navLists);
    },
    //清除菜单
    clearNavLists: function (store) {
        store.dispatch(types.CLEARNAVLISTS);
    },
    // 更新使用者信息
    updateWebUser: function (store, webUser) {
        store.dispatch('UPDATEWEBUSER', webUser);
    },
    // 扫描
    updateScanAutoPrint: function (store,autoPrint) {
        store.dispatch('UPDATESCANAUTOPRINT',autoPrint);
    },
    updateScanQuery: function (store, query) {
        store.dispatch('UPDATESCANQUERY',query);
    },
    updateScanPrintType: function (store,printType) {
        store.dispatch('UPDATESCANPRINTTYPE',printType);
    },
    updateScanIsPrintDelivery: function (store, isPrintDelivery) {
        store.dispatch('UPDATESCANISPRINTDELIVERY',isPrintDelivery);
    },
    updateScanIsPrintPack: function (store, isPrintPack) {
        store.dispatch('UPDATESCANISPRINTPACK',isPrintPack);
    },
    updateScanHasScan: function (store, hasScan) {
        store.dispatch('UPDATESCANHASSCAN',hasScan);
    },
    updateScanCustomerOrders: function (store, customerOrders) {
        store.dispatch('UPDATESCANCUSTOMERORDERS',customerOrders);
    },
    updateScanAllCustomerOrders: function (store, allCustomerOrders) {
        store.dispatch('UPDATESCANALLCUSTOMERORDERS',allCustomerOrders);
    },
    updateScanBaseLookUp: function (store, baseLookUp) {
        store.dispatch('UPDATESCANBASELOOKUP',baseLookUp);
    },
    // 入库扫描
    updateInstorageScanQuery: function (store, query) {
        store.dispatch('UPDATEINSTORAGESCANQUERY',query);
    },
    updateInstorageScanHasScan: function (store, hasScan) {
        store.dispatch('UPDATEINSTORAGESCANHASSCAN',hasScan);
    },
    updateInstorageScanCustomerOrders: function (store, customerOrders) {
        store.dispatch('UPDATEINSTORAGESCANCUSTOMERORDERS',customerOrders);
    },
    updateInstorageScanAllCustomerOrders: function (store, allCustomerOrders) {
        store.dispatch('UPDATEINSTORAGESCANALLCUSTOMERORDERS',allCustomerOrders);
    },
    updateInstorageScanBaseLookUp: function (store, baseLookUp) {
        store.dispatch('UPDATEINSTORAGESCANBASELOOKUP',baseLookUp);
    },
    // 装箱
    updatePackAutoPrint: function (store, autoPrint) {
        store.dispatch('UPDATEPACKAUTOPRINT',autoPrint);
    },
    updatePackQuery: function (store, query) {
        store.dispatch('UPDATEPACKQUERY',query);
    },
    updatePackScanQty: function (store, scanQty) {
        store.dispatch('UPDATEPACKSCANQTY',scanQty);
    },
    updatePackCurrentOutBox: function (store, currentOutBox) {
        store.dispatch('UPDATEPACKCURRENTOUTBOX',currentOutBox);
    },
    updatePackCurrentBox: function (store, currentBox) {
        store.dispatch('UPDATEPACKCURRENTBOX',currentBox);
    },
    updatePackOutBoxes: function (store, outBoxes) {
        store.dispatch('UPDATEPACKOUTBOXES',outBoxes);
    },
    updatePackBaseLookUp: function (store, baseLookUp) {
        store.dispatch('UPDATEPACKBASELOOKUP',baseLookUp);
    },
    // 称重出库
    updateWeighingOrderDetails: function (store, orderDetails) {
        store.dispatch('UPDATEWEIGHINGORDERDETAILS',orderDetails);
    },
    updateWeighingWeigh: function (store, weigh) {
        store.dispatch('UPDATEWEIGHINGWEIGH',weigh);
    },
    updateWeighingHasWeighed: function (store, hasWeighed) {
        store.dispatch('UPDATEWEIGHINGHASWEIGHED',hasWeighed);
    },
    updateWeighingQuery: function (store, query) {
        store.dispatch('UPDATEWEIGHINGQUERY',query);
    },
    updateWeighingBaseLookUp: function (store, baseLookUp) {
        store.dispatch('UPDATEWEIGHINGBASELOOKUP',baseLookUp);
    },
    // 录入订单
    updateTypeOrderIsManualChangeStock: function (store, isManualChangeStock) {
        store.dispatch('UPDATETYPEORDERISMANUALCHANGESTOCK',isManualChangeStock);
    },
    updateTypeOrderIsManualChangeLinkMan: function (store, isManualChangeLinkMan) {
        store.dispatch('UPDATETYPEORDERISMANUALCHANGELINKMAN',isManualChangeLinkMan);
    },
    updateTypeOrderIsManualChangeMobile: function (store, isManualChangeMobile) {
        store.dispatch('UPDATETYPEORDERISMANUALCHANGEMOBILE',isManualChangeMobile);
    },
    updateTypeOrderIsManualChangePhone: function (store, isManualChangePhone) {
        store.dispatch('UPDATETYPEORDERISMANUALCHANGEPHONE',isManualChangePhone);
    },
    updateTypeOrderIsManualChangeAddress: function (store, isManualChangeAddress) {
        store.dispatch('UPDATETYPEORDERISMANUALCHANGEADDRESS',isManualChangeAddress);
    },
    updateTypeOrderBaseLookUp: function (store, baseLookUp) {
        store.dispatch('UPDATETYPEORDERBASELOOKUP',baseLookUp);
    },
    updateTypeOrderCustomerOrderItem: function (store, customerOrderItem) {
        store.dispatch('UPDATETYPEORDERCUSTOMERORDERITEM',customerOrderItem);
    },
    resetCustomerOrderItem: function (store) {
        store.dispatch('RESETCUSTOMERORDERITEM');
    },
    // 报表
    /**
     * 添加报表
     */
    addReportTable: function (store, table) {
        store.dispatch('ADDTABLE', table);
    }
};
