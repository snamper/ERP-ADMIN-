var state = {
    orderDetails: [],
    weigh: '',
    hasWeighed: true,
    query: {
        Delivery: '',
    },
    baseLookUp: {
        payLists: [],
        merchantDeliveryLists: [],
        transferType: []
    }
};
var mutations = {
    UPDATEWEIGHINGORDERDETAILS: function (state, orderDetails) {
        state.orderDetails = orderDetails;
    },
    UPDATEWEIGHINGWEIGH: function (state, weigh) {
        state.weigh = weigh;
    },
    UPDATEWEIGHINGHASWEIGHED: function (state, hasWeighed) {
        state.hasWeighed = hasWeighed;
    },
    UPDATEWEIGHINGQUERY: function (state, query) {
        state.query = query;
    },
    UPDATEWEIGHINGBASELOOKUP: function (state, baseLookUp) {
        state.baseLookUp = baseLookUp;
    },
};
module.exports = {
    state: state,
    mutations: mutations
};