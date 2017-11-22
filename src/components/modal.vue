<template>
    <div class="modal fade" id="{{modalOptions.id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
        <div class="modal-dialog" :class="[modalOptions.isSmallModal ? 'modal-sm' : 'modal-lg']">
            <div class="modal-content">
                <div class="modal-header">
                    <button v-if="modalOptions.isShowCloseButton" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" v-text="modalOptions.modalTitle"></h4>
                </div>
                <div class="modal-body">
                    <slot name="modelText"></slot>
                </div>
                <div class="modal-footer" v-if="modalOptions.isShowButtons">
                    <button type="button" class="btn btn-negative" data-dismiss="modal" v-if="modalOptions.isShowCancelButton">{{modalOptions.cancelButtonName || '取消'}}</button>
                    <button type="button" class="btn btn-success" v-if="modalOptions.isShowSubmitButton">{{modalOptions.submitButtonName || '确定'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        /**
         * modalOptions {object}
         * {
         *      id {string}: 模态框ID
         *      isSmallModal {boolean} : 是否为小模态框
         *      isShowCloseButton {boolean} : 是否显示关闭按钮
         *      modalTitle {string} : 模态框标题
         *      isShowButtons {boolean} : 是否显示按钮
         *      submitButtonName {string} : 确定按钮文字
         *      cancelButtonName {string} : 取消按钮文字
         *      isShowSubmitButton {boolean} : 是否显示确定按钮
         *      isShowCancelButton {boolean} : 是否显示取消按钮
         * }
         * */
        props: ['modalOptions'],
        methods: {
            /**
             *  向父级和子级组件传递confirm-msg事件，父级和子级组件可以监听该事件，以进行响应
             */
//            confirm: function () {
//                this.$dispatch('confirm-msg');
//                this.$broadcast('confirm-msg');
//            }

        },
        ready: function () {

        }
    }
</script>
<style rel="stylesheet/less" lang="less">
    .modal-body {
        ul {
            li {
                word-wrap:break-word;
                word-break:break-all;
            }
        }
    }
</style>
