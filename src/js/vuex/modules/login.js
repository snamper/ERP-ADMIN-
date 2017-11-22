var state = {
    account: {},   //账号信息
    navLists: []   //菜单信息
};
var mutations = {
    //更新账号信息
    UPDATEACCOUNT: function (state,account) {
        state.account = account;
    },
    //更新菜单信息
    UPDATENAVLISTS: function (state, navlists) {
        state.navLists = navlists;
    },
    CLEARNAVLISTS: function (state) {
        state.navLists = [];
    }
};
module.exports = {
    state: state,
    mutations: mutations
};