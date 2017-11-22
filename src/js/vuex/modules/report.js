var state = {
    // 报表数据集合
    tables: {},
};
var mutations = {
    'ADDTABLE': function (state, table) {
        state.tables[table.name] = table.report;
    },
};
module.exports = {
    state: state,
    mutations: mutations
};
