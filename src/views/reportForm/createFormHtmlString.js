/**
 * 创建表单的html字符串，直接插入html
 * @param  {String} id       html元素的id属性
 * @param  {Object} formData 表单的数据
 */
exports.createFormHtmlString = function (id, formData) {
  "use strict";
  // 表格字符串需要插入的元素
  let formHtmlWrap = $(id);
  let formTableHeaderHtml = '';
  // 表格盒子，装载整个表格数据渲染出的字符串
  let formBoxHtmlStrings = [
    `<div class="col-lg-12 overflow-auto">`,
      `<div class="report-table clearfix" style="width: ${formData.tableHeaderWidth + 51}px;border-left: 1px solid #ccc;border-bottom: 1px solid #ccc;margin-top: 20px;">`,
        `<div class="table-header-row" style="width: 50px; float: left; border-left: 1px solid #ccc; border-top: 1px solid #ccc;"></div>`,
        formTableheaderHtml,
      `</div>`,
    `</div>`
  ];

  let formBoxHtml = $(formBoxHtmlStrings.join('')).find('.table-header-row').css({
    height: formData.bleHeader.length === formData.bleHeader.subList.length ? '33px' : '66px',
    lineHeight: formData.bleHeader.length === formData.bleHeader.subList.length ? '13px' : '46px',
  });
  console.log('中间到底发生了什么');
  console.log(formBoxHtml);
};

function makeTableHeaderTd() {
  let
};
