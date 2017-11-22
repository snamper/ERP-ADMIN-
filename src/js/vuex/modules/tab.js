var state = {
    tabLinks: [],
};

var isObjectSame = require('../../common').isObjectSame;

var mutations = {
    //增加tab连接
    ADDTAB: function (state, routeObj) {
        var tabLinks = state.tabLinks;
        if (tabLinks.length == 0) {
            tabLinks.push(routeObj)
        } else {
            var isDifferentName = true;   //name是否不一样
            var isHasSameParams = false;  //参数是否相同
            var theSameParamsLink = {};   //在tabLinks中与传过来的路由值相同参数的item
            tabLinks.forEach(function (link) {
                if (link.group && routeObj.group && link.group == routeObj.group) {   //如果在同一组,则更新(将name视为相同)
                    isDifferentName = false;
                    isHasSameParams = true;
                    link.path = routeObj.path;
                    link.query = routeObj.query;
                    link.name = routeObj.name;
                } else if (link.name == routeObj.name) {   //如果路由的name值相同,则将判断params是否相同
                    isDifferentName = false;
                    if (isObjectSame(routeObj.params,link.params)) {  //判断是否参数相同,如果参数相同
                        isHasSameParams = true;
                        theSameParamsLink = link;
                    }
                }
            });
            if (isDifferentName || !isHasSameParams) {  //如果为不同的name或不同的参数,刚新增一个tab
                tabLinks.push(routeObj);
            } else if (isHasSameParams) {   //如果参数相同,则更新对应的path query 和text
                theSameParamsLink.path = routeObj.path;
                theSameParamsLink.query = routeObj.query;
                theSameParamsLink.text = routeObj.text;
            }
        }
    },
    //删除某个链接
    REMOVETAB: function (state, routeObj) {
        state.tabLinks.$remove(routeObj);
    },
    //清除所有tab
    CLEARTAB: function (state) {
        state.tabLinks = [];
    }
};
module.exports = {
    state: state,
    mutations: mutations
};