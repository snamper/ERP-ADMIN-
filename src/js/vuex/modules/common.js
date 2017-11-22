var state = {
    webUser: 'wolf',   //使用者信息
};
var mutations = {
    //更新账号信息
    UPDATEWEBUSER: function (state,webUser) {
        state.webUser = webUser;
    },
};
module.exports = {
    state: state,
    mutations: mutations
};