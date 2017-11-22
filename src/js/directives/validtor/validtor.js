/**
 * 创建人：DomenLee
 * 创建时间： 2017/7/7
 * 作用：验证表单元素绑定的数据模型是否正确格式
 * 使用：
 * 1, 验证不包含特殊字符，限制在2-8位，在标签内加上 validExp="s2-8" :validModel="model" errorMessage="请正确填写姓名"
 * 2, 验证电话号码或者手机号码，在标签内加上 validExp＝"p|t" :validModel = "model.phone" errorMessage="请正确填写手机号码|请正确填写电话号码"
 */
var Vue = require('vue');
var xps = require('./exps');

var valid = function (value, reg) {
  if (reg.test(value)) {

  } else {
    this.vm.validtor.submit = false
  }
};

Vue.directive('validtor', {
});
