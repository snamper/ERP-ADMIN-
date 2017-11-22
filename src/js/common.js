/**
 * 显示提示内容,1s后自动消失
 * @param scope  {object} 作用域
 * @param warmTitle {string} 标题
 * @param warmText {string} 提示内容
 */
function showWarmModal(scope, warmTitle, warmText) {
    var options = scope.modalOptions;
    options.id = 'modal-warm';
    options.isSmallModal = true;
    options.isShowCloseButton = false;
    options.modalTitle = warmTitle;
    options.isShowButtons = false;
    scope.pageInfo.modalText = warmText;
    scope.$nextTick(function() {
        var modalWarm = $('#modal-warm');
        modalWarm.modal('show');
        setTimeout(function() {
            modalWarm.modal('hide');
        }, 1000);
    });
}
/**
 * 显示错误提示
 * @param scope {object} 作用域
 * @param errorTitle {string} 标题
 * @param errorText {string} 提示内容
 */
function showErrorModal(scope, errorTitle, errorText) {
    var options = scope.modalOptions;
    options.id = 'modal-error';
    options.isSmallModal = true;
    options.isShowCloseButton = true;
    options.modalTitle = errorTitle;
    options.isShowButtons = true;
    options.isShowCloseButton = false;
    options.isShowSubmitButton = true;
    scope.pageInfo.modalText = errorText;
    scope.$nextTick(function() {
        var modalError = $('#modal-error');
        modalError.modal('show');
        modalError.find('.btn-success').click(function() {
            $('#modal-error').modal('hide');
        })
    });
}

function showConfirmModal(scope, modalID, confirmTitle, confirmText, closeButtonName, submitButtonName, callback) {
    var options = scope.modalOptions;
    options.id = modalID;
    options.isSmallModal = true;
    options.isShowCloseButton = true;
    options.modalTitle = confirmTitle;
    options.isShowButtons = true;
    options.submitButtonName = submitButtonName;
    options.cancelButtonName = closeButtonName;
    options.isShowSubmitButton = true;
    options.isShowCancelButton = true;
    scope.pageInfo.modalText = confirmText;
    scope.$nextTick(function() {
        var id = '#' + modalID;
        var modalConfirm = $(id);
        modalConfirm.modal('show');
        var confirmButton = modalConfirm.find('.btn-success');
        confirmButton.unbind('click');
        confirmButton.bind('click', function() {
            callback();
            modalConfirm.modal('hide');
        });
    });
}
/**
 * 将PID ID形式的数组转换为树状JSON格式
 * @param a {Array} 需要转换的数组
 * @param idStr {string}   ID
 * @param pidStr {string} PID
 * @param chindrenStr {string} 子键名
 * @returns {Array} 数组只有一个元素,为树状JSON格式
 */

function transArrayToJson(a, idStr, pidStr, chindrenStr) {
    var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j],
            hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}
/**
 * 生成14位单据编码  业务码(2位) + 商家编码(5位) + 时间(14位) + 随机数(2位)
 * @param serviceCode {string} 业务码
 * @param merchantCode {string} 商家编码
 * @returns {string} 14位单据编码
 */
function generateCode(serviceCode, merchantCode) {
    var date = new Date(),
        year = date.getFullYear(),
        month = doubleDigit(date.getMonth()),
        day = doubleDigit(date.getDay()),
        hours = doubleDigit(date.getHours()),
        minutes = doubleDigit(date.getMinutes()),
        second = doubleDigit(date.getSeconds());
    return serviceCode + merchantCode + year + month + day + hours + minutes + second + rndNum(2);
}
/**
 *  将1位数,变成'02'的形式
 * @param number {string | int} 数字或者字符串
 * @returns {string}
 */
function doubleDigit(number) {
    
    var numString = number.toString();
    if (numString.length == 1) {
        numString = '0' + numString;
    }
    return numString;
}
/**
 *  生成指定位数的随机数
 * @param number  {int} 随机数的位数
 * @returns {string}
 */
function rndNum(number) {
    var randomNum = '';
    for (var i = 0; i < number; i++) {
        randomNum += Math.floor(Math.random() * 10);
    }
    return randomNum;
}

/**
 *  全选和反选,用在computed中
 * @param selectItems  {string} 具有全选特性的数据
 * @param callback   {function} 回调函数
 * @returns {object}
 */

function selectAll(selectItems, callback) {
    return {
        //全选
        selectAll: {
            get: function() {
                return this.selectCount == eval(selectItems).length;
            },
            set: function(value) {
                eval(selectItems).forEach(function(item) {
                    item.checked = value;
                });
                return value;
            }
        },
        //选中的数量
        selectCount: {
            get: function() {
                var i = 0;
                eval(selectItems).forEach(function(item) {
                    if (item.checked) {
                        i++;
                    }
                });
                return i;
            }
        },
        //选中的订单数组
        checkedGroups: {
            get: function() {
                var checkedGroups = [];
                eval(selectItems).forEach(function(item) {
                    if (item.checked) {
                        checkedGroups.push(callback(item));
                    }
                });
                return checkedGroups;
            }
        }
    }
}
/**
 * 获取平台的ID和名字
 * @param channelList 平台列表
 * @param code  平台代码
 */
function getChannelNameAndID(channelList,code) {
    var channelNameAndID = {};
    channelList.forEach(function (channel) {
        if (channel.Code == code) {
            channelNameAndID = {
                channelID: channel.ChannelID,
                channelName: channel.Name
            }
        }
    });
    return channelNameAndID;
}
/**
 * 判断两个对象是否相等
 * @param a {object}
 * @param b {object}
 * @returns {boolean} true表示两个对象相等
 */
function isObjectSame(a, b) {
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {   //对比key的数量是否相等,如果key不等,则两个对象不等
        return false;
    }
    for (var i = 0; i < aKeys.length; i++) {  //判断相同的key的value是否相等,如果有不相等的情况,则两个对象不相等
        var keyName = aKeys[i];
        if (a[keyName] !== b[keyName]) {
            return false;
        }
    }
    return true;
}
/**
 * 将毫秒转换为时间格式
 * @param val {number} 毫秒
 * @returns {*} 返回 yyyy-mm-dd hh:mm:ss 格式
 */
function numberTimeToString(val) {
    if (val) {
        var date = new Date(parseInt(val));
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    } else {
        return '';
    }
}

function exportFile(type, query, url) {
    const method = url ? url : '/Export/ErpExport';

    var $iframe = document.createElement('iframe');
    $iframe.setAttribute('id', 'download_iframe');
    $iframe.setAttribute('style', 'display: none');
    $iframe.setAttribute('src', 'about:blank');
    document.body.appendChild($iframe);

    var iframe_doc = $iframe.contentWindow || $iframe.contentDocument;
    var iframe_html;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }
    iframe_html = "<html><head></head><body><form method='POST' action='" + method + "' target='_top'>";
    iframe_html += "<input type='hidden' name='ExportType' value='" + type + "'>";
    iframe_html += "<input type='hidden' name='SearchWhere' value='" + JSON.stringify(query) + "'>";
    iframe_html += "</form></body></html>";
    iframe_doc.open();
    iframe_doc.write(iframe_html);
    iframe_doc.querySelector('form').submit();
}

module.exports = {
    showWarmModal: showWarmModal,
    showErrorModal: showErrorModal,
    showConfirmModal: showConfirmModal,
    transArrayToJson: transArrayToJson,
    generateCode: generateCode,

    selectAll: selectAll,
    getChannelNameAndID: getChannelNameAndID,
    isObjectSame: isObjectSame,
    numberTimeToString: numberTimeToString,
    exportFile: exportFile,

    // cookie: cookie
};
