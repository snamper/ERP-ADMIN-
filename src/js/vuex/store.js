var Vue = require('vue');
var Vuex = require('vuex');
var tab = require('./modules/tab');
var login = require('./modules/login');
var scan = require('./modules/scan');
var instorageScan = require('./modules/instorageScan');
var pack = require('./modules/pack');
var weighing = require('./modules/weighing');
var typeOrder = require('./modules/typeOrder');
var common = require('./modules/common');
var report = require('./modules/report');
Vue.use(Vuex);

module.exports = new Vuex.Store({
    modules: {
        tab: tab,
        login: login,
        scan: scan,
        instorageScan: instorageScan,
        pack: pack,
        weighing: weighing,
        typeOrder: typeOrder,
        common: common,
        report: report
    }
});
