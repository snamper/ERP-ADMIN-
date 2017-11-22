//var apiPath = 'http://gzwolfsoft.oicp.net:8088/Api';
//var dePath = 'http://it-dl.loonxierp.com/Api';
//var dePath = 'http://ziyunlai.loonxierp.com/Api';
// var dePath = 'http://192.168.88.14:8002/Api';//何伟
//var dePath = 'http://192.168.88.133:8011/Api';//熊文
// var dePath = 'http://it-dl.loonxierp.net/Api';//公共
var dePath = '/api';
// var enPath = 'http://192.168.88.146:8096/api';
// var ali = 'http://121.199.167.19';
var NProgress = require('nprogress');

var cookie = require('js-cookie');

// 请求栈 request the stack
var reqStack = {};

/**
 *  ajax Post方法
 * @param opt {object}  ajax配置
 * @param url {string}  path
 * @returns {*}
 */
function postAjax(opt, url) {
    var options = $.extend({
        type: 'post',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    },opt);
    options.url = url ? url + options.url : dePath + options.url;
    var urlName = options.url;

    // options.url = url ? url + options.url : dePath + options.url;
    var scope = this;

    //每次请求都重新更新一次cookie,避免登录过期
    // var userName = cookie.get('userName');
    // var userID = cookie.get('userID');

    // var date = new Date( new Date().getTime() + 30*60*1000 );  //30分钟后过期

    // if (userName && userID) {
    //     cookie.set('userName',userName);
    //     cookie.set('userID',userID);
    // } else {
    //     if (scope.$route) {
    //         scope.$route.router.go({name:'login'});
    //     } else {
    //         alert('你的登录已经过期,请重新登录');
    //     }
    // }

    // 请求栈载入当前请求
    // 不断累积请求次数
    // 当前请求未返回数据时不可继续提交
    // 当未返回数据前，累积三次或以上提示用户请勿重复提交！
    // if (reqStack[urlName]) {
    //     var len = reqStack[urlName];
    //     if (len < 3 && len > 0) {
    //         reqStack[urlName] ++;
    //     } else if (len >= 3) {
    //         reqStack[urlName] ++;
    //         if (this.$dispatch) return this.$dispatch('transmit', 'tip', {contentText: '请勿多次重复提交!'});
    //         return alert('请勿多次重复提交!');
    //     } else {
    //         reqStack[urlName] ++;
    //     }
    // } else {
    //     reqStack[urlName] = 1;
    // }

    return $.ajax(options).fail(function (error) {

        NProgress.done();
        // 在请求栈内重置该请求次数
        // reqStack[urlName] = 0;
        if (error.status == 401) {
            cookie.remove('userName');
            cookie.remove('userID');
            window.location = '/#!/log/login';
            // alert('你的登录已经过期,请先登录!;
        } else if (scope.$dispatch) {
            scope.$dispatch('transmit', 'tip', {
                name: '提示:',
                contentText: '服务器错误'
            });
        }
    }).done(function(result) {
        // 在请求栈内重置该请求次数
        // reqStack[urlName] = 0;
        if (scope.$dispatch) {
            if (result.ResultCode == -1)
                scope.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: result.ErrorMessage
                });
        }
    })
}

/**
 * ajax Get方法
 * @param opt {object} ajax配置
 * @param url {string} path
 * @returns {*}
 */
function getAjax(opt, url) {
    var options = $.extend({
        type: 'get',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    },opt);
    options.url = url ? url + options.url : dePath + options.url;

    //每次请求都重新更新一次cookie,避免登录过期

    // var userName = cookie.get('userName');
    // var userID = cookie.get('userID');
    // var date = new Date( new Date().getTime() + 30*60*1000 );

    // console.log(userName);
    // console.log(userID);
    // if (userName && userID) {
    //     cookie.set('userName',userName);
    //     cookie.set('userID',userID);
    // }

    return $.ajax(options).fail(function(error) {
        if (error.status == 401) {
            cookie.remove('userName');
            cookie.remove('userID');
            window.location = '/#!/log/login';
            // alert('你的登录已经过期,请先登录!');
        }
        NProgress.done();
    })
}
/**
 * 获取常用基础数据,并将其存在localStorage中
 * @param baseDataName {string} 接口方法名,也用作localStorage中的键名
 * @param isStorageInLocal {boolean} 是否存诸在本地
 * @param callback {function} 回调函数
 */

function getBaseData(baseDataName,isStorageInLocal,callback,url) {
    var baseData = {};
    if ( isStorageInLocal ) {   //如果要存诸在本地
        if ( localStorage.baseData ) {         //检查localStorage中是否已经有baseData的值,如果有,则将其格式化成JSON格式
            baseData = JSON.parse(localStorage.baseData);
        }
        //如果baseData里已经存在对应的值,则返回localStorage里的值,如果没有,则请求ajax,并将值存诸在localStorage中
        if ( baseData[baseDataName] ) {
            callback(baseData[baseDataName]);
        } else {
            getAjax({
                url: '/BaseLookup/Get' + baseDataName
            }, url).done(function (result) {
                if ( result == null ) {
                    var baseDataReturnValue = '';
                    callback(baseDataReturnValue);
                } else {
                    baseData[baseDataName] = result.Data;
                    localStorage.baseData = JSON.stringify(baseData);
                    callback(baseData[baseDataName]);
                }
            });
        }
    } else {     //如果不需要存诸,则直接发请求返回对应的值
        getAjax({
            url: '/BaseLookup/Get' + baseDataName
        }, url).done(function (result) {
            if ( result == null ) {
                var baseDataReturnValue = '';
                callback(baseDataReturnValue);
            } else {
                baseData[baseDataName] = result.Data;
                callback(baseData[baseDataName]);
            }
        })
    }
}

/**
 * 过滤属性下拉列表
 * 如果 vue 对象下面没有 属性相关的数据模型 则新建
 * 数据模型 数组 Size Color Season
 * @param  {[object]} _vue [当前vue对象]
 * @param  {[string]} _url  [替补链接，调试用的比较多]
 */
var filterList = function (_vue, _url) {
    var apiUrl = 'PropertyList',
        SAVE = false,
        save = function (data) {
            var regList = require('./../../globalConstants').propertyPageInfo;
            for (var i in data) {
                var id = data[i].PropertyTypeID;
                for (var j in regList) {
                    var _id = regList[j].propertyTypeID;
                    if (id == _id) {
                        if (!_vue[regList[j].KeyName]) _vue[regList[j].KeyName] = [];
                        data[i].active = false;
                        _vue[regList[j].KeyName].push(data[i]);
                    }
                }
            }
        };

        getBaseData(apiUrl, SAVE, save, _url);
};

/**
 * get 店铺分类列表
 * @param  {object} obj 保存的对象
 * @param  {string} key 保存的对象属性键
 * @param  {string}   _url     可用的替补连接
 * @return {null}
 */
getShopKindList = function (obj, key, _url) {
    getAjax({
        url: '/BaseLookup/GetShopKindList',
        success: function (data) {
            obj[key] = data.Data;
        }
    }, _url);
}

/**
 * get 渠道列表
 * @param  {object} obj 保存的对象
 * @param  {string} key 保存的对象属性键
 * @param  {string}   _url     可用的替补连接
 * @return {null}
 */
getChannelList = function (obj, key, _url) {
    getAjax({
        url: '/BaseLookup/GetChannelList',
        success: function (data) {
            obj[key] = data.Data;
        }
    }, _url);
}

/**
 * get 仓库列表
 * @param  {object} obj 保存的对象
 * @param  {string} key 保存的对象属性键
 * @param  {string} _url 可用的替补连接
 * @return {null}
 */
getStockList = function (obj, key, _url) {
    getAjax({
        url: '/BaseLookup/GetStockList',
        success: function (data) {
            obj[key] = data.Data;
        }
    }, _url);
}

/**
 * get 供应商列表
 * @param  {object} obj 保存的对象
 * @param  {string} key 保存的对象属性键
 * @param  {string} _url 可用的替补连接
 * @return {null}
 */
getVenderList = function (obj, key, _url) {
    getAjax({
        url: '/BaseLookup/GetVenderList',
        success: function (data) {
            obj[key] = data.Data;
        }
    }, _url);
};

function downloadFile(type,url) {
    var method = url ? url : '/Import/ErpGetExcelFile';
    var $iframe = $("<iframe id='download_iframe'" +
        " style='display: none' src='about:blank'></iframe>"
    ).appendTo("body");
    var iframe_doc = ($iframe[0]).contentWindow || ($iframe[0]).contentDocument;
    var iframe_html;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }
    iframe_html = "<html><head></head><body><form method='POST' action='" + method + "' target='_top'>";
    iframe_html += "<input type='hidden' name='ImportType' value='" + type + "'>";
    iframe_html += "</form></body></html>";
    iframe_doc.open();
    iframe_doc.write(iframe_html);
    $(iframe_doc).find('form').submit();
}

module.exports = {
    postAjax: postAjax,
    getAjax: getAjax,
    getBaseData: getBaseData,
	filterList: filterList,
    getShopKindList: getShopKindList,
    getChannelList: getChannelList,
    getStockList: getStockList,
    getShopKindList: getShopKindList,
    getChannelList: getChannelList,
    getStockList: getStockList,
    getVenderList: getVenderList,

    downloadFile: downloadFile,

    NProgress: NProgress
};
