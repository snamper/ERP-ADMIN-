<template>
    <div class="erp-print">
        <div class="printMain">
            <div class="print-option clearfix">
                <label>纸张大小:</label>
                <div class="input-group form-group ctrWidth">
                    <span class="input-group-addon">长</span>
                    <input type="text" class="form-control" placeholder="长" v-model="printSize.width">
                </div>
                <label>X</label>
                <div class="input-group form-group ctrWidth">
                    <span class="input-group-addon">宽</span>
                    <input type="text" class="form-control" placeholder="宽" v-model="printSize.height">
                </div>
                <button class="btn btn-info" @click="print">打印</button>
            </div>
            <div class="print-content" id="printContent" :style="printSize">
                <div class="field-item" v-for="item in printMsg" :style="item.fieldStyle" @mousedown="dragStart(item,$event)" @mousemove="dragMove(item,$event)" @mouseup="dragEnd" @mouseout="dragEnd">
                    <span class="field-item-form" contenteditable="{{writable == item ? true: false}}" @dblclick="editField(item)" @keyup="getContent(item,$event)" >{{item.field}}</span>
                    <span class="iconfont field-item-ctrl" @mousedown.stop="changSizeDown(item,$event)" @mousemove.stop="changeSizeMove(item,$event)" @mouseup.stop="changeSizeUp" @mouseout.stop="changeSizeUp"></span>
                </div>
            </div>
        </div>
        <div class="print-fields">
            <ul>
                <li v-for="item in fields" @click="selectFields(item)">{{item}}</li>
            </ul>
        </div>
    </div>
    <!--<div>{{printMsg | json}}</div>-->
</template>

<script>
    module.exports = {
        data: function () {
            return {
                fields: '',
                printMsg: [],
                writable: false,
                printSize: {width:'800px',height:'800px'},
                drag: {
                    dragStart: false,
                    startX: 0,
                    startY: 0,
                    changeSize: false,
                    changeStartX: 0,
                    changeStartY: 0
                }
            }
        },
        methods: {
            /**
             * 选择需要打印的字段,将字段放入需要打印的字段数组,在打印区域显示出来
             * @param field {string} 字段ID
             */
            selectFields: function (field) {
                var item = {};
                item.field = field;
                item.fieldStyle = {left:'',top:'',width:'200px',height:'24px'};
                this.printMsg.push(item);
            },
            /**
             * 将打印的字段设置成可编辑状态
             * @param field {string} 字段ID
             */
            editField: function (field) {
                this.writable = field;
            },
            /**
             * 获取字段输入的内容
             * @param item {object} 字段对象
             * @param event {object} 事件对象
             */
            getContent: function (item,event) {
                item.field = event.srcElement.innerHTML;
            },
            /**
             * 拖动开始时,将拖动状态置为真,记录开始时鼠标的位置和当前字段所在的位置信息
             * @param item {object} 字段对象
             * @param event {object} 事件对象
             */
            dragStart: function (item,event) {
                this.drag.dragStart = true;
                this.drag.startX = event.x;
                this.drag.startY = event.y;
                item.fieldStyle.left = event.currentTarget.offsetLeft + 'px';
                item.fieldStyle.top = event.currentTarget.offsetTop + 'px';
            },
            /**
             * 拖动时,计算鼠标移动的距离,重置当前字段的位置
             * @param item {object} 字段对象
             * @param event {object} 事件对象
             */
            dragMove: function (item,event) {
                if(this.drag.dragStart) {
                    var distanceX = event.x - this.drag.startX;
                    var distanceY = event.y - this.drag.startY;
                    this.drag.startX = event.x;
                    this.drag.startY = event.y;
                    item.fieldStyle.left = distanceX + parseInt(item.fieldStyle.left) + 'px';
                    item.fieldStyle.top = distanceY + parseInt(item.fieldStyle.top) + 'px';
                }
            },
            /**
             * 拖动结束,将拖动状态设为false
             */
            dragEnd: function () {
                this.drag.dragStart = false;
            },
            /**
             * 改变字段的大小,开始时将拖动状态设为false,禁止拖动,将改变大小状态设为true,并记录鼠标开始位置
             * @param item {object} 字段对象
             * @param event {object} 事件对象
             */
            changSizeDown: function (item, event) {
                this.drag.dragStart = false;
                this.drag.changeSize = true;
                this.drag.changeStartX = event.x;
                this.drag.changeStartY = event.y;
            },
            /**
             * 计算鼠标移动的距离,并根据距离改变字段的大小
             * @param item {object} 字段对象
             * @param event {object} 事件对象
             */
            changeSizeMove: function (item, event) {
                if(this.drag.changeSize) {
                    var distanceX = event.x - this.drag.changeStartX;
                    var distanceY = event.y - this.drag.changeStartY;
                    this.drag.changeStartX = event.x;
                    this.drag.changeStartY = event.y;
                    item.fieldStyle.width = distanceX + parseInt(item.fieldStyle.width) + 'px';
                    item.fieldStyle.height = distanceY + parseInt(item.fieldStyle.height) + 'px';
                }
            },
            /**
             * 改变大小结束,将状态设为false
             */
            changeSizeUp: function () {
                this.drag.changeSize = false;
            },
            print: function () {
                document.body.innerHTML=document.getElementById('printContent').innerHTML;
                window.print();
            }
        },
        ready: function () {
            var self = this;
            $.ajax({
                url: '../src/data/print.json',
                success: function (printFields) {
                    self.fields = printFields.fields;
                }
            })
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .print-option label {
        line-height: 36px;
        float: left;
    }
    .ctrWidth {
        width: 200px;
        float: left;
    }
    .print-content {
        background: linen;
        width: 800px;
        height: 800px;
        float: left;
    }
    .print-fields {
        float: left;
    }
    .field-item {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        height: 24px;
        border: 1px dashed #ccc;
        .field-item-form {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .field-item-ctrl {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 14px;
            display: inline-block;
            &:before {
                content: '\e601';
            }
        }
    }
</style>