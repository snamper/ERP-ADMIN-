<template>
    <div class="w-router-tab" v-show="links.length > 0">
        <a @click="closeAllTab" class="closeAllTab" href="javascript:void(0)">X</a>
        <a class="w-router-link" v-bind:style="{width: tabWidth}" v-for="link in links" v-link="{path:link.path,activeClass: 'active',exact: true}"><span>{{link.text}}</span><span @click.stop.prevent="closeTab(link)" class="iconfont"></span></a>
    </div>
</template>

<script>
    var getters = require('../js/vuex/getters');
    var actions = require('../js/vuex/actions');
//    var store = require('../js/vuex/tab/store');
    module.exports = {
//        props: ['links'],
        data: function () {
            return {
                tabWidth: '100px'
            }
        },
        vuex: {
            getters: {
                links: getters.getTabLinks
            },
            actions: {
                removeTab: actions.removeTab,
                clearTab: actions.clearTab
            }
        },
//        store: store,
        methods: {
            /**
             * 关闭选项卡页面,如果关闭的页面是当前页,则跳转到前一个选项卡页面,如果当前页面是第一个,刚跳转到下一个页面,如果当前页面是最后一个页面,刚跳转到首页
             * @param link {object} 需要关闭的页面链接对象
             */
            closeTab: function (link) {
                if ( link.path == this.$route.path ) {   //判断是否为当前页
                    var index = this.links.indexOf(link);
                    if ( index > 0 ) {                  //如果不是第一个选项卡,则跳转到下一个选项卡页面
                        this.$route.router.go({path: this.links[index - 1].path});
                    } else if ( index == 0 && this.links.length > 1) {     //如果关闭的是第一个选项卡,且不为最后一个关闭的页面,则跳转至该选项卡的下一个页面
                        this.$route.router.go({path: this.links[index + 1].path});
                    } else {
                        this.$route.router.go({path: '/'});
                    }
                }
                this.removeTab(link);   //将该选项卡删除
            },
            /**
             * 关闭所有选项卡,中转到罗盘页
             */
            closeAllTab: function () {
                this.$route.router.go({name:'dashboard'});
                this.clearTab();
            }
        },
        watch: {
            links: function (newVal, oldVal) {
                var totalWidth = $('.w-router-tab').width();
                var tabLength = newVal.length;
                var tabWidth = 100 * tabLength;
                if (tabWidth > totalWidth) {
                    this.tabWidth = parseInt(totalWidth / tabLength - 20) + 'px';
                } else {
                    this.tabWidth = '80px';
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .w-router-tab {
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: fixed;
        background: #fff;
        z-index:99;
        margin-left:1px;
        font-size: 0;
        .closeAllTab {
            display: inline-block;
            width: 35px;
            line-height: 30px;
            text-align: center;
            background: #EAEDF1;
            color: #758dce;
            font-size: 12px;
            margin-top: -1px;
            margin-left: -1px;
        }
        .w-router-link {
            position: relative;
            display: inline-block;
            /*overflow: hidden;*/
            margin-left: -1px;
            padding-left: 10px;
            padding-right: 10px;
            line-height: 29px;
            text-align: left;
            margin-bottom: -1px;
            color: #999;
            border: 1px solid #ccc;
            background: #f5f8ff;
            font-size: 12px;
            span {
                display: inline-block;
                line-height: 1;
                max-width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right:8px;
            }
            .iconfont {
                position: absolute;
                right: 3px;
                top: 13px;
                width: 16px;
                height: 16px;
                border-radius: 8px;
                vertical-align: middle;
                transform: translate(0,-50%);
                color: #758dce;
                background: #fff;
                line-height: 16px;
                font-size: 12px;
                text-align: center;
                margin-right:0;
                &:before {
                    content: '\e605'
                }
            }
            &.active {
                background: #fff;
                color: #758dce;
                border: 1px solid #fff;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                .iconfont {
                    background: #758dce;
                    color: #fff;
                }
            }

        }
    }
</style>