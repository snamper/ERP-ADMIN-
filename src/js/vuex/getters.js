module.exports = {
    //获取tab数据
    getTabLinks: function (state) {
        return state.tab.tabLinks;
    },
    //获取登录账号信息
    getAccount: function (state) {
        return state.login.account;
    },
    //获取菜单数据
    getNavLists: function (state) {
        return state.login.navLists;
    },
    // 获取使用者信息
    getWebUser: function (state) {
        return state.common.webUser;
    },

    // 扫描
    getScanAutoPrint: function (state) {
        return state.scan.autoPrint;
    },
    getScanQuery: function (state) {
        return state.scan.query;
    },
    getScanPrintType: function (state) {
        return state.scan.printType;
    },
    getScanIsPrintDelivery: function (state) {
        return state.scan.isPrintDelivery;
    },
    getScanIsPrintPack: function (state) {
        return state.scan.isPrintPack;
    },
    getScanHasScan: function (state) {
        return state.scan.hasScan;
    },
    getScanCustomerOrders: function (state) {
        return state.scan.customerOrders;
    },
    getScanAllCustomerOrders: function (state) {
        return state.scan.allCustomerOrders;
    },
    getScanBaseLookUp: function (state) {
        return state.scan.baseLookUp;
    },
    // 入库扫描
    getInstorageScanQuery: function (state) {
        return state.instorageScan.query;
    },
    getInstorageScanHasScan: function (state) {
        return state.instorageScan.hasScan;
    },
    getInstorageScanCustomerOrders: function (state) {
        return state.instorageScan.customerOrders;
    },
    getInstorageScanAllCustomerOrders: function (state) {
        return state.instorageScan.allCustomerOrders;
    },
    getInstorageScanBaseLookUp: function (state) {
        return state.instorageScan.baseLookUp;
    },
    // 装箱
    getPackAutoPrint: function (state) {
        return state.pack.autoPrint;
    },
    getPackQuery: function (state) {
        return state.pack.query;
    },
    getPackScanQty: function (state) {
        return state.pack.scanQty;
    },
    getPackCurrentOutBox: function (state) {
        return state.pack.currentOutBox;
    },
    getPackCurrentBox: function (state) {
        return state.pack.currentBox;
    },
    getPackOutBoxes: function (state) {
        return state.pack.outBoxes;
    },
    getPackBaseLookUp: function (state) {
        return state.pack.baseLookUp;
    },
    // 称重
    getWeighingOrderDetails: function (state) {
        return state.weighing.orderDetails;
    },
    getWeighingWeigh: function (state) {
        return state.weighing.weigh;
    },
    getWeighingHasWeighed: function (state) {
        return state.weighing.hasWeighed;
    },
    getWeighingQuery: function (state) {
        return state.weighing.query;
    },
    getWeighingBaseLookUp: function (state) {
        return state.weighing.baseLookUp;
    },
    // 录入订单
    getTypeOrderIsManualChangeStock: function (state) {
        return state.typeOrder.isManualChangeStock;
    },
    getTypeOrderIsManualChangeLinkMan: function (state) {
        return state.typeOrder.isManualChangeLinkMan;
    },
    getTypeOrderIsManualChangeMobile: function (state) {
        return state.typeOrder.isManualChangeMobile;
    },
    getTypeOrderIsManualChangePhone: function (state) {
        return state.typeOrder.isManualChangePhone;
    },
    getTypeOrderIsManualChangeAddress: function (state) {
        return state.typeOrder.isManualChangeAddress;
    },
    getTypeOrderBaseLookUp: function (state) {
        return state.typeOrder.baseLookUp;
    },
    getTypeOrderCustomerOrderItem: function (state) {
        return state.typeOrder.customerOrderItem;
    },
    // 报表
    // 获取报表数据对象
    getReportTable: function (state) {
        return state.report.tables;
    },
};
