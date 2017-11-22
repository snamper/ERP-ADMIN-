<template id="">
    <!--<div class="wolf-modal-wrap" v-show="modal.show">-->
        <div class="modal fade" :class="{'in':modal.show}"   v-show="modal.show">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="cancel" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <h4 v-if="!showArray">{{contentText}}</h4>
                        <ul v-if="showArray">
                            <li v-for="text in contentText">{{text}}</li>
                        </ul>
                    </div>
                    <div class="modal-footer" v-show="modal.bottomShow">
                        <button v-show="modal.cancelBtnShow" @click="cancel" type="button" class="btn btn-default"> 取消 </button>
                        <button id="confirm-element" @click="confirm" type="button" class="btn btn-primary"> {{modal.btnName}} </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    <!--</div>-->
</template>
<script lang="coffee" type="text/coffeescript">
    module.exports =
        data: () ->
            return {
                index: null
                showArray: false
                modal:
                    name: ''
                    btnName: ''
                    show: false
                    cancelBtnShow: true
                    bottomShow: true
                contentText: ''
                events:
                    cancel: null
                    confirm: null
            }
        created: ->
            window.addEventListener('keyup', this.myMethod)
        methods:
            myMethod: (e) ->
                if e.keyCode is 13
                    if this.modal.cancelBtnShow then this.cancel() else this.confirm()
            setShow: (show) ->
                if show?
                    this.modal.show = show
                else
                    this.modal.show = not this.modal.show

            cancel: () ->
                this.modal =
                    name: ''
                    btnName: ''
                    show: false
                    cancelBtnShow: true
                    bottomShow: true
                this.contentText = ''
                this.events =
                    cancel: null
                    confirm: null
                # 取消所有元素的按键绑定事件
                this.bindKeyEvents false
                this.$dispatch 'transmit', @events.cancel or 'tip-cancel', @index

            confirm: () ->
                this.setShow false
                this.bindKeyEvents false
                this.$dispatch 'transmit', @events.confirm or 'tip-confirm', @index

            makeArray: () ->

                this.contentText = this.contentText.split '|'
                this.showArray = true

            ###*
             * 绑定键盘按下事件 目前是 13 ，回车键
             * 不知道是不是vue本身的原因，在报表的预览页面按下enter键之后很久弹出框才会关闭
             * @param  {boolean} bind 绑定还是解绑，true 为绑定， false 为解绑
             * ###
            bindKeyEvents: (bind) ->
                self = this

                # 让页面所有元素失去焦点，防止按下enter键的时候提交表单或其他误操作
                $('*').blur()
                $('.modal').focus()
                # 当前绑定事件的函数
        events:
            'tip': (obj, index) ->
                this.modal.show = true
                this.modal.name = obj.name or '提示'
                this.modal.btnName = obj.btnName or '确定'
                this.contentText = obj.contentText
                this.events =
                    cancel: null
                    confirm: null

                @events = obj.events if obj.events?
                @index = index if index?

                if obj.events? then this.modal.cancelBtnShow = true else this.modal.cancelBtnShow = false
                
                reg = new RegExp '|'
                self = this
                focusRun = (event) ->
                    event.stopPropagation()

                if reg.test @contentText

                    @makeArray true

                else

                    @showArray = false

                @bindKeyEvents true

            'autoHideTip': (obj, index) ->
                this.modal.name = obj.name or '提示'
                this.modal.bottomShow = false
                this.contentText = obj.contentText
                this.modal.show = true
                this.showArray =false
                self = this
                timer = setTimeout(() ->
                    self.modal.show = false
                    self.modal.bottomShow = true
                    self.contentText = ''
                    self.$dispatch 'transmit', 'autoHideSuccess', index
                , if obj.time then obj.time else 3000)



</script>
<style lang="less" rel="stylesheet/less">
    // 主题模态窗口
    // 李冯
    // 2016.5.6
    // 基于 bootstrap 模态窗口更改
    .wolf-modal-wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1050;
        left: 0;
        top: 0;

        .modal {
            display: table;
            overflow: inherit;
            opacity: 1;
            position: static;
            margin: 0 auto;
            height: 100%;

            .modal-dialog {
                display: table-cell;
                vertical-align:middle;
                width: 800px;
                -webkit-transform: none;
                transform: none;
            }

            .modal-content {
                border-radius: 0;

                .modal-header {
                    background-color: #425994;
                    color: #fff;

                    .close {
                        color: #fff;
                        text-shadow: 0 1px 0 #333;
                    }
                }

                .modal-body {
                    padding: 40px;
                    max-height: 800px;
                    overflow: auto;
                    max-width: 800px;
                    word-wrap: break-word;
                    .form-group {
                        display: flex;
                        margin-bottom: 12px;

                        label {
                            min-width: 80px;
                            text-align: right;
                            line-height: 34px;
                            margin-right: 12px;
                            color: #666;
                            font-weight: normal;
                        }

                        input {
                            flex: 1;
                            width: 100%;
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                }

                .modal-footer {

                    .btn {
                        border-radius: 3px;
                        transition: all .3s;
                    }
                }
            }
        }
    }
</style>
