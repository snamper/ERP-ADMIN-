/**
 * 创建人：DomenLee
 * 创建时间：2016/7/7
 */

/**
 * 根据当前需要返回动态的正则表达式
 * @param  {String} type     当前需要验证的类型，也可以是一个正则表达式，将直接返回。
 * @param  {Number} startNum 至少有几位可以匹配正确的字符
 * @param  {Number} endNum   最多有几位可以匹配的字符
 * @return {RegExp}          根据条件生成的正则表达式
 */
exports = function (type, startNum, endNum) {
  switch (type) {
    case '*':
      // * 代表所有类型的字符都可以验证通过。
      return /^.*{startNum, endNum}$/;
      break;
    case 's':
      // s 代表只有字符串格式才能通过，包括字母、汉字、下划线和数字
      return /^\w{startNum, endNum}$/;
      break;
    case 'n':
      // n 代表数字，只有数字能通过
      return /^\d{startNum, endNum}$/;
      break;
    case 'p':
      // p 代表手机号码验证
      // 号段：
      // 13*
      // 14*
      // 15*
      // 17*
      // 18*
      return /^1[34578]\d{9}$/;
      break;
    case 'e':
      // e 代表邮箱的格式验证，不会验证属于哪个邮箱
      // 任意数字大小写字母下划线@任意数字大小写字母下划线.任意数字大小写字母下划线
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      break;
    case 't':
      // t 代表固定电话格式的验证
      // 任意数字的号段3-4位加七位号码
      return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      break;
    default:
      return null
  }
};
