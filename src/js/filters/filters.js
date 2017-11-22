    //将数组格式化成字符串,
var arrayToString = {
    read: function (val) {
        if (val) {
            return val.join(';');
        } else {
            return val;
        }
    },
    write: function (val, oldVal) {
        if (val) {
            return val.split(';');
        } else {
            return [];
        }
    }
};
//格式化日期格式yyyy-mm-dd hh:mm:ss
var formatDate = {
    read: function (val) {
        return val;
        // if (val) {
        //     var date = new Date(val);
        //     console.log(val);
        //     var year = date.getFullYear(),
        //         month = date.getMonth() + 1,
        //         day = date.getDate(),
        //         hours = date.getHours(),
        //         minutes = date.getMinutes(),
        //         seconds = date.getSeconds();
        //     return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        // } else {
        //     return '';
        // }
    },
    write: function (val,oldval) {
        if (val) {
            var date = new Date(val);
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
};

var readFormDate = {
    read: function (val) {
        if (val) {
            var reg = /\.\d{0,3}/;
            val = val.replace(reg, '');
            reg = /T/;
            return val = val.replace(reg, ' ');
        } else {
            return '';
        }
    },
};

var formatDateFromServer = {
    read: function (val) {
        if (val) {
           return val.replace(/T/ig,' ');
        }
    }
};

var formatDateFormShow = {
    read: function (val) {
        if (val) {
            val = val.split('T')[0];
            return val.slice(2);
        }
    }
};

//订单状态代码转文字
var flagCodeToText = {
    read: function (val,flagList) {
        var flagText = '';
        flagList.forEach(function (flag) {
            if (flag.Code == val) {
                flagText = flag.Text;
            }
        });
        return flagText;
    }
};
//交易状态代码转文字
var orderStatusCodeToText = {
    read: function (val, orderStatusList) {
        var orderStatusText = '';
        orderStatusList.forEach(function (orderStatus) {
            if (orderStatus.Code == val) {
                orderStatusText = orderStatus.Text;
            }
        });
        return orderStatusText;
    }
};
//店铺ID转店铺名字
var shopCodeToName = {
    read: function (val, shopList) {
        var shopName = '';
        shopList.forEach(function (shop) {
            if(shop.ShopID == val) {
                shopName = shop.Name;
            }
        });
        return shopName;
    }
};
//供应商ID转名字
var venderIDToName = {
    read: function (val, venderList) {
        var venderName = '';
        venderList.forEach(function (vender) {
            if (vender.VenderID == val) {
                venderName = vender.Name;
            }
        });
        return venderName
    }
};

//支付方式Code转文字
var payModelCodeToText = {
    read: function (val, payModelList) {
        var payModelName = '';
        payModelList.forEach(function (payModel) {
            if (payModel.Code == val) {
                payModelName = payModel.Text;
            }
        });
        return payModelName
    }
};
// 快递ID转公司名字
var merchantDeliveryIDToName = {
    read: function (val,deliveryList) {
        var deliveryName = '';
        deliveryList.forEach(function (delivery) {
            if (val == delivery.MerchantDeliveryID) {
                deliveryName = delivery.Name;
            }
        });
        return deliveryName;
    }
};
//将前置字符串合并(字符串)
var preJoin = {
    write: function (value, oldVal,joinString) {
        if (joinString) {
            return joinString + value;
        } else {
            return value;
        }
    }
};
//选中角色权限
var menuChecked = {
    read: function (menu,funcs) {
        if (funcs.length > 0) {
            funcs.forEach(function (func) {
                if (menu.ModuleID == func.ModuleID) {
                    menu.checked = true;
                    menu.MenuPowerJson.forEach(function (menuPower) {
                        if (func.FuncPointArray.indexOf(menuPower.Text) > -1) {
                            menuPower.checked = true;
                        }
                    })
                }
            });
        }
        return menu;
    }
};
//将null转化为空字符串
var nullToString = {
    read: function (val) {
        if (val == 'null') {
            return '';
        } else {
            return val;
        }
    }
};
//将修改订单时的订单状态转换成文字
var orderStateText = {
    read: function (val) {
        switch (val) {
            case 1:
                return '手工转单';
            case 2:
                return '手工录入';
            case 3:
                return '导入生成';
            case 4:
                return '退货生成';
            default:
                return '生成时间';
        }
    }
};

// 截取字符串。默认从零开始，默认截取5个字符。可附带一个参数设置截取多少个。
var truncationString = {
    read: function (val, len) {
        if (val) {
            val = val.toString();
            var lent = len || 5;
            if (val.length <= lent) return val;
            return val.slice(0, lent) + '...';
        }
    }
};

// 截取时间字符串，去掉毫秒字段和‘T’
var truncationTimeString = {
    read: function (val) {
        if (val) {
            var reg = /\.\d{0,3}$/i;
            return val.replace(reg, '').replace('T', ' ');
        }
    }
};

//    一个月后的时间
var addMouth   = {
    read: function (val) {
        var myDate = new Date(); //格式化当前时间
        var a = myDate.setMonth(myDate.getMonth() + 1);
        // 这个是时间戳
        // alert(a);
        var d2=new Date(a);//格式化时间戳
        var y = d2.getFullYear()+'年';//获取年份
        var m = d2.getMonth()+1+'月';//获取月份
        var d = d2.getDate()+'日';//获取日期
        // alert(y+m+d);
    }
};

//打印模板,加样式单位
var addUnit = {
    read: function (val,unit) {
        if (val) {
            console.log(val);
            return val.replace(unit,'');
        }
    },
    write: function (val, oldValue,unit) {
        if (val) {
            return val.toString() + unit;
        }
    }
};

var backgroundImg = {
    read: function (val) {
        if (val) {
            return val.slice(5,-26);
        }
        return val;
    },
    write: function (val) {
        if (val) {
              return "url('" + val + "') no-repeat center center"
        }
        return val;
    }
};

// var reportFormShowDefaultValue = {
//     /**
//      * 报表显示默认值（时间的时候会用到，开始时间和结束时间）
//      * @param  {object} val   当前需要过滤的值
//      * @param  {string} input 当前所处位置，start，end
//      */
//     read: function (val, input) {
//         if (val) {
//             if (input == 'end') {
//                 return val.split(',')[1];
//             }
//
//             return val.split(',')[0];
//         }
//     }
// }

// var reportFormSetDefaultValue = {
//     /**
//      * 报表写入默认值（时间的时候会用到，开始时间和结束时间）
//      * @param  {object} val   当前需要过滤的值
//      * @param  {string} input 当前所处位置，start，end
//      */
//     read: function (val, input) {
//         if (val) {
//             if (input == 'end') {
//                 if (/,/.test(val)) {
//                     return val.split(',')[1] + ' ';
//                 }
//             } else {
//                 if (/,/.test(val)) {
//                     return ' ' + val.split(',')[0];
//                 }
//             }
//             return val;
//         }
//     },
//     write: function (val, oldVal) {
//         if (/\s$/.test(oldVal)) {
//             if (oldVal) {
//                 var newVal = oldVal.split(',');
//                 newVal[1] = val.replace(' ', '');
//                 return newVal.join(',');
//             }
//             return val = ',' + val.replace(' ', '');
//         } else {
//             if (oldVal) {
//                 var newVal = oldVal.split(',');
//                 if (!newVal[1]) newVal[1] = "";
//                 newVal[0] = val.replace(' ', '');
//                 return newVal.join(',');
//             }
//             return val = val.replace(' ', '') + ',';
//         }
//     }
// }

var approveStatusToText = {
    read: function (val) {
        var approveStatusText = '';
        if (val) {
            if (val == 'onsale') {
                approveStatusText = '出售中';
            } else {
                approveStatusText = '库中';
            }
        }
        return approveStatusText;
    }
};

//业务类型Code转Text
var transferTypeToName = {
    read: function (val,transferTypeList) {
        var transferName = '';
        if (val) {
            transferTypeList.forEach(function (transferType) {
                if (val == transferType.Code) {
                    transferName = transferType.Text;
                }
            })
        }
        return transferName;
    }
};
//小数转整数
var decimalToInteger = {
    read: function (val) {
        return val;
    },
    write: function (val) {
        return Math.round(parseInt(val));
    }
};
//将/n替换成换行符
var lineBreak = {
  read: function (val) {
      if (val) {
         return val.replace(/\/n/g,'<br />')
      } else {
          return ''
      }
  }
};
// 将数字加小数
var toFixed = {
    read: function (val,limit) {
        var number = parseInt(val, 10) || 0;
        return number.toFixed(limit || 2);
    }
};
// 报表名称新增修改
var reportFormName = {
    read: function (val) {
        if (val) {
            return val.replace(/报表$/, '');
        }
    },
    //去掉自动加报表两个字
    // write: function (val) {
    //     return val + '报表';
    // }
};
var joinToParent = {
    read: function (val,parent,content) {
        if (val && val !== 'undefined') {
            return val
        } else {
            var key = content.match(/Detail\.(.+)\}\}$/)
            if (key) {
                return parent[key[1]]
            }
        }
    }
}
module.exports =  {
    arrayToString: arrayToString,
    formatDate: formatDate,
    flagCodeToText: flagCodeToText,
    orderStatusCodeToText: orderStatusCodeToText,
    shopCodeToName: shopCodeToName,
    venderIDToName: venderIDToName,
    payModelCodeToText: payModelCodeToText,
    preJoin: preJoin,
    menuChecked: menuChecked,
    nullToString: nullToString,
    formatDateFromServer: formatDateFromServer,
    orderStateText: orderStateText,
    formatDateFormShow: formatDateFormShow,
    truncationString: truncationString,
    truncationTimeString: truncationTimeString,
    merchantDeliveryIDToName: merchantDeliveryIDToName,
    addUnit: addUnit,
    backgroundImg: backgroundImg,
    // reportFormSetDefaultValue: reportFormSetDefaultValue,
    // reportFormShowDefaultValue: reportFormShowDefaultValue,
    approveStatusToText: approveStatusToText,
    transferTypeToName: transferTypeToName,
    decimalToInteger: decimalToInteger,
    lineBreak: lineBreak,
    toFixed: toFixed,
    reportFormName: reportFormName,
    readFormDate: readFormDate,
    joinToParent: joinToParent,
};
