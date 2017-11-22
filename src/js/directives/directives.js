// 'use strict';
// // required 验证类型解析器
// let exp = require('./validtor/exps.js');
// /**
//  * 验证函数
//  * @param  {String} value 需要验证的值
//  * @param  {RegExp} reg   验证的正则
//  * @return {null}
//  */
// var valid = function (value, reg) {
//   if (reg.test(value)) {
//   } else {
//     this.vm.validtor.submit = false
//   }
// }
//
// /**
//  * 创建人：DomenLee
//  * 创建时间： 2017/7/7
//  * 作用：验证表单元素绑定的数据模型是否正确格式
//  * 使用：
//  * 1, 验证不包含特殊字符，限制在2-8位，在标签内加上 validExp="s2-8" :validModel="model" errorMessage="请正确填写姓名"
//  * 2, 验证电话号码或者手机号码，在标签内加上 validExp＝"p|t" :validModel = "model.phone" errorMessage="请正确填写手机号码|请正确填写电话号码"
//  */
// let validtor = {
//   params: ['exp', 'errormessage '],
//   bind () {
//     console.log('已经绑定');
//   },
//   splitExp (str) {
//     console.log(str);
//   },
//   update (value) {
//     if (this.params.exp && value) {
//       if (/\|/.test(this.params.exp)) {
//         var expregs = this.params.exp.split('|');
//         for (let expregsIndex = 0; expregsIndex < expregs.length; expregsIndex++) {
//           if (typeof expregs[expregsIndex] == 'regexp') {
//             valid.bind(this)(value, expregs[expregsIndex])
//           } else {
//             this.splitExp(expregs[expregsIndex]);
//           }
//         }
//       } else {
//         if (typeof value == 'regthis.validExp') {
//           valid.bind(this)(value, this.params.exp);
//         } else {
//           this.splitExp(this.params.exp);
//         }
//       }
//     } else {
//       console.log(this.params.exp);
//     }
//   }
// };
//
// let tableHead = {
//     bind() {
//         let tableHead = {};
//         console.log('测试dom ', $('.sidebar-container').length);
//         // /**
//         //  * 获取tableHead元素上部和右部的距离
//         //  * @param  {Elemen} element 元素节点
//         //  * @param  {Object} offset  坐标值对象
//         //  * @return {Functi}         继续递归当前函数或者最终的结果
//         //  */
//         // function getMarginTop (element, offset) {
//         //     console.log(element);
//         //     if (element.parentNode) {
//         //         offset.top += element.offsetTop;
//         //         offset.left += element.offsetLeft;
//         //         if (element.parentNode.className === 'w-content') {
//         //             return offset;
//         //         }
//         //     } else {return offset;}
//         //     console.log('recurring', offset);
//         //     return getMarginTop(element.parentNode, offset);
//         // }
//         // tableHead.offset = getMarginTop(this.el.parentNode, {top: this.el.offsetTop, left: this.el.offsetLeft});
//         // window.onscroll = function () {
//         //     tableHead.bodyScrollTop = window.scrollTop;
//         //     console.log(tableHead);
//         // }
//     }
// }

var drag = require('./drag');

module.exports = {
    // validtor: validtor,
    drag: drag,
    // 暂停列表头固定的研发，vue指令限制
    // tableHead: tableHead
};
