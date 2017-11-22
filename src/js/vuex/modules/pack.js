var state = {
    autoPrint: false,
    query: {
        Sheet: '',
        CustomBC: '',
    },
    scanQty: 1, // 扫描数量
    currentOutBox: {},  //当前装箱单
    currentBox: {},   //当前箱子
    outBoxes: [],    //所有装箱单
    baseLookUp: {
        payLists: [],
        transferType: []
    }
};
var mutations = {
    UPDATEPACKAUTOPRINT: function (state, autoPrint) {
        state.autoPrint = autoPrint;
    },
    UPDATEPACKQUERY: function (state, query) {
        state.query = query;
    },
    UPDATEPACKSCANQTY: function (state, scanQty) {
        state.scanQty = scanQty;
    },
    UPDATEPACKCURRENTOUTBOX: function (state, currentOutBox) {
        state.currentOutBox = currentOutBox;
    },
    UPDATEPACKCURRENTBOX: function (state, currentBox) {
        state.currentBox = currentBox;
    },
    UPDATEPACKOUTBOXES: function (state, outBoxes) {
        state.outBoxes = outBoxes;
    },
    UPDATEPACKBASELOOKUP: function (state, baseLookUp) {
        state.baseLookUp = baseLookUp;
    }
};
module.exports = {
    state: state,
    mutations: mutations
};