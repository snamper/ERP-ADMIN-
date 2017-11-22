var state = {
    query: {
        MerchantID: '',
        Sheet: '',
        CustomBC: '',
        UpSheet: '',
    },
    hasScan: [],  //已经扫描的商品
    customerOrders: {},
    allCustomerOrders: [],
    baseLookUp: {
        payLists: [],
        transferType: [],
    }
};
var mutations = {
    UPDATEINSTORAGESCANQUERY: function (state, query) {
        state.query = query;
    },
    UPDATEINSTORAGESCANHASSCAN: function (state, hasScan) {
        state.hasScan = hasScan;
    },
    UPDATEINSTORAGESCANCUSTOMERORDERS: function (state, customerOrders) {
        state.customerOrders = customerOrders;
    },
    UPDATEINSTORAGESCANALLCUSTOMERORDERS: function (state, allCustomerOrders) {
        state.allCustomerOrders = allCustomerOrders;
    },
    UPDATEINSTORAGESCANBASELOOKUP: function (state, baseLookUp) {
        state.baseLookUp = baseLookUp;
    }
};
module.exports = {
    state: state,
    mutations: mutations
};