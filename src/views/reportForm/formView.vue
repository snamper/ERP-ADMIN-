<style lang="less">

#formView {
    width: 100%;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    .fl {
        float: left;
        box-sizing: border-box;
    }
    .fixation {
        width: 50px;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
    }
    .fixation-header {
        width: 100%;
        padding-left: 50px;
        border-left: none;
        overflow: hidden;
        ul {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        li {
            border-right: 1px solid #ccc;
            text-align: center;
            span {
                border-right: 1px solid #ccc;
                overflow: hidden;
            }
            span:first-child {
                border-right: none;
            }
            span:last-child {
                border-right: none;
                margin-right: -1px;
            }
        }
    }
    .fixation-left {
        width: 50px;
        overflow: hidden;
        li {
            border: 1px solid #ccc;
            border-top: none;
            width: 50px;
            height: 33px;
            text-align: center;
            line-height: 32px;
            background: #fff;
        }
    }
    .fixation-body {
        overflow: auto;
        width: 100%;
        padding-left: 50px;
        margin-left: -50px;
        border-top: none;
        border-left: none;
        li {
            border-bottom: 1px solid #ccc;
            span {
                height: 32px;
                border-right: 1px solid #ccc;
                line-height: 25px;
                text-align: center;
                overflow: hidden;
                padding: 4px;
            }
            span:last-child {
                // border-right: none;
            }
        }
        li:last-child {
            // border-bottom: none;
        }
    }
    .fixation-body::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;
        background-color: #F5F5F5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    .fixation-body::-webkit-scrollbar-track
    {
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 3px;
        // background-color: #F5F5F5;
        background: none;
    }
    /*定义滑块 内阴影+圆角*/
    .fixation-body::-webkit-scrollbar-thumb
    {
        border-radius: 3px;
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #ccc;
    }
}

</style>

<template lang="html">

<div id="formView" class="clearfix"></div>

</template>

<script>
    'use strict';
    export default {
        data () {
            return {
                // 内容是否显示
                // show: false,
            }
        },
        props: ['formData', 'sqlIndex', 'table'],
        methods: {
            /**
             * 计算出列表头部
             */
            formHeader() {
                let numType, // 数字类型，奇数或者偶数，约定，1为奇数，2为偶数；
                    len, // 有多少个标题；
                    label, // 遍历中的某个标签
                    reg, // 用来测试是否有子属性的标签
                    stag, // 暂存对象 计算出汇总对象
                    labels, // 将label拆分成数组时放在里面
                    width; // 头部的宽度

                len = 0;
                width = 0;
                reg = /[|]/;
                stag = {};
                numType = 1;
                //
                //
                // 遍历自定义设置，找出所有标签
                //
                //
                const list = this.formData.DisplayFieldList;
                const index = this.sqlIndex;
                // 遍历显示标签列表
                for (var displayFieldIndex in list) {
                    // 当前标签
                    label = list[displayFieldIndex].DisplayLabel;
                    // 标签是否存在
                    if (list.hasOwnProperty(displayFieldIndex) && label) {
                        // 当前标签对象是否是当前主查询需要的
                        if (list[displayFieldIndex].SQLIndex === index) {
                            // 没检测到适合当前sql索引值的查询条件则加一次
                            len ++;
                            // 判断是否有父级标签
                            if (reg.test(label)) {
                                // 具有子标签的时候
                                numType = 2;
                                // 分离父子标签
                                labels = label.split('|');
                                // 判断 标签集合是否已有当前的标签
                                if (!stag[labels[0]]) {
                                    // 父级标题
                                    stag[labels[0]] = {
                                        list: [], // 子列表
                                        index: 0, // 排序索引
                                        width: 0, // 宽度
                                    };
                                }
                                width += parseInt(list[displayFieldIndex].DisplayWidth, 10) || 200;
                                // 每次新增一个子标签的时候，宽度累加新的子标签的宽度
                                stag[labels[0]].width += parseInt(list[displayFieldIndex].DisplayWidth, 10) || 200;
                                // 将子标签添加到父级标签的子列表中
                                stag[labels[0]].list.push({
                                    label: labels[1],
                                    index: parseInt(list[displayFieldIndex].SortIndex, 10), // 子标签的索引值
                                    width: parseInt(list[displayFieldIndex].DisplayWidth, 10) || 200, // 子标签自己的宽度
                                    expr: list[displayFieldIndex].DisplayExpr, // 显示格式
                                    name: list[displayFieldIndex].FieldName, // 显示属性名称
                                });
                            } else {
                                stag[label] = {
                                    list: [],
                                    index: parseInt(list[displayFieldIndex].SortIndex, 10), // 子标签的索引值
                                    width: parseInt(list[displayFieldIndex].DisplayWidth, 10) || 200, // 子标签自己的宽度
                                    expr: list[displayFieldIndex].DisplayExpr, // 显示格式
                                    name: list[displayFieldIndex].FieldName, // 显示属性名称
                                }
                                width += parseInt(list[displayFieldIndex].DisplayWidth, 10) || 200;
                            }
                        }
                    }
                }
                return {
                    numType: numType,
                    len: len,
                    list: stag,
                    width: width,
                    fontColor: this.formData.SumFontColor,
                    backgroundColor: this.formData.SumBackColor,
                    oddFontColor: this.formData.OddRowFontColor,
                    oddBackgroundColor: this.formData.OddRowBackColor,
                    evenFontColor: this.formData.EvenRowFontColor,
                    evenBackgroundColor: this.formData.EvenRowBackColor,
                };
            },
            /**
             * 绘制表格
             */
            draw() {
                const formHeader = this.formHeader();
                // 表格header部分的高度
                // 主要是看所有表格标题是否存在是否有子属性
                // 如果有子属性，则应该是66的高度
                // 如果没有子属性，则应该是33的高度
                const headerHeight = formHeader.numType == 1 ? 33 : 66;
                // 表格内容视窗
                const formView = $('#formView');
                // 视窗内的各个组件
                const rowView = $('.fixation');
                const headerView = $('.fixation-header');
                const leftView = $('.fixation-left');
                const bodyView = $('.fixation-body');
                const bodyHeight = ($(window).height() - 299) <= this.table.length * 33 ? $(window).height() - 299 : this.table.length * 33;
                // 行 固定元素样式定义
                rowView.css({
                    'height': headerHeight,
                    'line-height': headerHeight + 'px',
                });
                // 头部渲染开始
                const headerWidth = formView.outerWidth() - rowView.outerWidth();
                let html = `<ul style="width: ${formHeader.width}px; height: ${headerHeight}px; transform: translate3d(0, 0, 0);">`;
                for (let name in formHeader.list) {
                    if (formHeader.list[name].list.length > 0) {
                        html += `<li class="fl" style="height: ${headerHeight - 2}px; width: ${formHeader.list[name].width}px">
                            <span class="fl" style="width: 100%; height: 32px; line-height: 32px;border-bottom: 1px solid #ccc;">${name}</span>`;
                        for (let itemName in formHeader.list[name].list) {
                            html += `<span class="fl" style="height: 33px; width: ${formHeader.list[name].list[itemName].width}px; line-height: 32px;">${formHeader.list[name].list[itemName].label}</span>`;
                        }
                        html += '</li>' ;
                    } else {
                        html += `<li class="fl" style="height: ${headerHeight - 2}px; width: ${formHeader.list[name].width}px; line-height: ${headerHeight - 2}px">${name}</li>`;
                    }
                }
                html += '</ul>';
                headerView.html(html);
                // 头部渲染结束
                // 左侧渲染开始
                leftView.css({
                    height: bodyHeight,
                });
                let leftViewHeight = this.table.length * 33;
                html = `<ul style="${leftViewHeight}px">`;
                for (let i in this.table) {
                    html += `<li>${parseInt(i, 10) + 1}</li>`;
                }
                html += '</ul>';
                leftView.html(html);
                // 左侧渲染结束
                // 内容渲染开始
                bodyView.css({
                    height: bodyHeight,
                });
                html = `<ul style="width: ${formHeader.width}px; height: ${this.table.length * 33}px;">`
                let j;
                let fontColor, backgroundColor;
                for (var item in this.table) {
                    if (item % 2 === 0) {
                        fontColor = formHeader.evenFontColor;
                        backgroundColor = formHeader.evenBackgroundColor;
                    } else {
                        fontColor = formHeader.oddFontColor;
                        backgroundColor = formHeader.oddBackgroundColor;
                    }
                    html += `<li class="clearfix" style="color: #${fontColor}; background-color: #${backgroundColor}">`;
                    for (var headerIndex in formHeader.list) {
                        if (formHeader.list[headerIndex].list.length > 0) {
                            j = formHeader.list[headerIndex].list;
                            for (var i in j) {
                                html += this.crateBodySpan(this.table[item], j[i]);
                            }
                        } else {
                            j = formHeader.list;
                            html += this.crateBodySpan(this.table[item], j[headerIndex]);
                        }
                    }
                    html += '</li>';
                }
                bodyView.html(html);
                this.bindEvent();
            },
            /**
             * 创建span元素
             * @param {Object} tableItem 后端查询返回的报表列表中的某个项目
             * @param {Object} headerObj 计算出的formHeader对象中的每一个头部对象
             */
            crateBodySpan(tableItem, headerObj) {
                let exprs = {};
                let l = [];
                let val = '';
                if (headerObj.expr) {
                    l = headerObj.expr.split(',');
                    for (var i in l) {
                        exprs[l[i].split('=')[0]] = l[i].split('=')[1];
                    }
                    val = exprs[tableItem[headerObj.name]] || '';
                } else {
                    val = tableItem[headerObj.name] || '';
                    //if (/T/.test(val)) val = val.split('T')[0]; //芜芯注释的,用于解决MOTO显示不全的问题
                }
                return `<span class="fl" style="width:${headerObj.width}px">${val}</span>`;
            },
            /**
             * 绑定事件
             */
            bindEvent() {
                const view = $('.fixation-body');
                const header = $('.fixation-header ul');
                const rows = $('.fixation-left ul');
                view.scroll((e) => {
                    let top = view.scrollTop();
                    let left = view.scrollLeft();
                    header.css('transform', 'translate3d(-'+ left + 'px, 0, 0)');
                    rows.css('transform', 'translate3d(0, -'+ top + 'px, 0)');
                });
            },
            /**
             * 清空视图
             */
            clearView() {
                $('#formView').html('<div class="clearfix"><div class="fixation fl">行</div><div class="fixation-header fl"></div></div><div class="clearfix"><div class="fixation-left fl"></div><div class="fixation-body fl"></div></div>');
            }
        },
        events: {
            changeTable(table) {
                // 一旦报表数据更新之后，立刻重绘整个表格
                if (table.length == 0) {
                    return $('#formView').html('');
                }
                this.table = table;
                this.clearView();
                this.$nextTick(() => {
                    this.draw();
                });
            },
            clearFormView() {
                this.clearView();
            }
        },
    }
</script>
