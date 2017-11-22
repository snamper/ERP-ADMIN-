var state = {
    autoPrint: false,
    query: {
        MerchantID: '',
        Sheet: '',
        CustomBC: '',
        BoxCode: '',
        UpSheetID: '',
        MerchantDeliveryID: ''
    },
    printType: 'common',
    isPrintDelivery: true,
    isPrintPack: true,
    hasScan: [],  //已经扫描的商品
    customerOrders: {},
    allCustomerOrders: [],
    baseLookUp: {
        payLists: [],
        transferType: [],
        merchantDeliveryLists: []
    }
};
var mutations = {
    UPDATESCANAUTOPRINT: function (state,autoPrint) {
        state.autoPrint = autoPrint;
    },
    UPDATESCANQUERY: function (state, query) {
        state.query = query;
    },
    UPDATESCANPRINTTYPE: function (state,printType) {
        state.printType = printType;
    },
    UPDATESCANISPRINTDELIVERY: function (state, isPrintDelivery) {
        state.isPrintDelivery = isPrintDelivery;
    },
    UPDATESCANISPRINTPACK: function (state, isPrintPack) {
        state.isPrintPack = isPrintPack;
    },
    UPDATESCANHASSCAN: function (state, hasScan) {
        state.hasScan = hasScan;
    },
    UPDATESCANCUSTOMERORDERS: function (state, customerOrders) {
        state.customerOrders = customerOrders;
    },
    UPDATESCANALLCUSTOMERORDERS: function (state, allCustomerOrders) {
        state.allCustomerOrders = allCustomerOrders;
    },
    UPDATESCANBASELOOKUP: function (state, baseLookUp) {
        state.baseLookUp = baseLookUp;
    }
};
module.exports = {
    state: state,
    mutations: mutations
};