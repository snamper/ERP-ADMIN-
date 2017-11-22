<style lang="less">

.transition-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    .editor-modal {
        width: 80%;
        margin: 70px auto 0;
        background: #fff;
        border: 1px solid #ccc;
        .header {
            height: 50px;
            padding-left: 20px;
            line-height: 50px;
            color: #4d68af;
            font-size: 14px;
        }
        .body {
            padding: 0 20px;
            .content {
                max-height: 400px;
            }
        }
        .footer {
            padding: 20px;
        }
    }
}

</style>

<template lang="html">

    <div class="transition-wrap" v-if="show">
        <div class="editor-modal">
            <div class="header">
                <span>提示</span>
            </div>
            <div class="body">
                <editor :content.sync="content"></editor>
            </div>
            <div class="footer">
                <div class="row">
                    <div class="col-lg-3"></div>
                    <div class="col-lg-2"><a href="https://tadget.taobao.com/redaction/manager.htm" target="_blank" class="btn btn-info">图片空间</a></div>
                    <div class="col-lg-2"><button class="btn btn-primary" @click="submit">提交</button></div>
                    <div class="col-lg-2"><button class="btn btn-default" @click="clone">关闭</button></div>
                    <div class="col-lg-3"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import servers from '../../../../js/servers/servers';

export default {
    data() {
            return {
                content: '',
                show: false,
            }
        },
        props: {
            goodsInfo: {
                type: Object,
                default: {
                    Content: '',
                    GoodsID: '',
                    GoodsInfoID: '',
                    InfoType: 1,
                }
            }
        },
        computed: {},
        ready() {
            if (!this.goodsInfo.Content) {
                this.goodsInfo.Content = '';
            }
            this.content = this.goodsInfo.Content;
        },
        attached() {},
        methods: {
            /**
             * 提交
             */
            submit() {
                this.show = false;
                this.goodsInfo.Content = this.content;
            },
            clone() {
                this.show = false;
                this.content = this.goodsInfo.Content;
            }
        },
        components: {},
        events: {
            modalShow(type) {
                if (type == this.goodsInfo.InfoType) {
                    this.show = !this.show;
                }
            }
        }
}

</script>
