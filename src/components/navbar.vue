<template>
    <nav class="sidebar" :class="{'slidebar-full':full}">
        <div class="sidebar-container">
            <a href="javascript:void(0)" class="iconfont slideBarSize" @click="toggleSlideBarSize"></a>
            <ul class="sidebar-list">
                <li class="sidebar-item-first" v-for="navList in navLists">
                    <a href="javascript:void(0)" class="item-first-ctrl" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="{{navList.Text}}">
                        <span class="iconfont sidebar-icon icon-icon_xiaoxi-weidu" @click="toggleSecondMenuSize(navList.ID, navList.Text, navList.Sub)" v-if="navList.Text == '消息'"></span>
                        <span class="iconfont sidebar-icon {{navList.ClassName}}"  @click="toggleSecondMenuSize(navList.ID,navList.Text,navList.Sub)" v-if="navList.Text != '消息'"></span>
                        <!--<span v-show="first">{{navList.Text}}</span>-->
                    </a>

                </li>
            </ul>
        </div>
    </nav>
    <div v-show="second" class="navright">
        <ul v-show="second" :class="{'show':second}" class="sidebar-second-list collapse" id="nav{{navSubList.ID}}">
            <li class="sidebar-item-second nav-text">{{navSubList.Text}}</li>
            <li class="sidebar-item-second" v-for="linkList in navSub">
                <a class="item-second-ctrl" href="javascript:void(0)"  data-toggle="collapse" data-target="#nav{{linkList.ID}}">
                    <span class="item-second-text">{{linkList.Text}}</span>
                    <span class="iconfont sidebar-icon-arrow"></span>
                </a>
                <ul class="collapse in sidebar-last-list" id="nav{{linkList.ID}}">
                    <li class="sidebar-item-last" v-for="link in linkList.Sub" @click="check(link.ID)" :class="{'active': (link.ID === thirdID)}">
                        <a v-link="{path:link.Path}">{{link.Text}}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    var servers = require('../js/servers/servers');
    var getters = require('../js/vuex/getters');
    module.exports = {
        props: ['links','full','first','second','third','linkPath'],
        data: function () {
            return {
                thirdID: '',
                navSubList: {
                    ID: '',
                    Text: '',
                },
                navSub: []
            }
        },
        vuex: {
            getters: {
                navLists: getters.getNavLists
            }
        },
        ready: function () {
            if (this.navLists.length>0) {
                this.toggleSecondMenuSize(this.navLists[0].ID, this.navLists[0].Text, this.navLists[0].Sub);
            }
            else {
                this.second = false;
            }
        },
        methods: {
            toggleSlideBarSize: function () {
                this.full = !this.full;
                if (this.navSubList.ID) {
                    this.second = !this.second;
                }
            },
            toggleSecondMenuSize: function (ID,Text,Sub) {
                    this.second = true;
                    this.navSubList.ID = ID;
                    this.navSubList.Text = Text;
                    this.navSub = Sub;
            },
//            toggleSecondMenuSizeTo: function (ID,Text,Sub) {
//                if (this.full == false) {
//                   this.second = !this.second;
//                    this.navSubList.ID = ID;
//                    this.navSubList.Text = Text;
//                    this.navSub = Sub;
//                }
//            },
            check: function (ID) {
                this.thirdID = ID;
            }
        },
        watch: {

        }
    }
</script>

<style rel="stylesheet/less" lang="less">
        .navright {
            position: fixed;
            width: 150px;
            height: 100%;
            padding-right: 20px;
            background-color: #f2f2f2;
            top: 0px;
            left: 50px;
            padding-top: 50px;
            transition: width 0.2s linear;
            overflow: hidden;

            &.test1 {
                left: 200px;
            }
            &.show {
                width: 150px;
            }
            /*&.test2 {*/
            /*left: 200px;*/
            /*}*/
            .nav-text {
                /*background: #29344a;*/
                text-align: left;
                padding-left: 27px;
                color: #666666;
                font-weight: bold;
            }
            .item-second-text {
                display: block;
                text-align: left;
                padding-left: 50px;
            }
        }
    .sidebar {
        position: fixed;
        top: 0px;
        bottom: 0;
        padding-top: 50px;
        width: 50px;
        background: #29344a;
        transition: width 0.2s;
        z-index: 99;
        /*overflow: hidden;*/  // 为了显示标题提示先注释啦
        .sidebar-container {
            position: relative;
            width: 67px;
            height: 100%;
            /*overflow: hidden;*/  // 为了显示标题提示先注释啦
            /*overflow-y: scroll;*/  // 为了显示标题提示先注释啦
            padding-right: 20px;
        }
        &.slidebar-full {
            width: 50px;
            overflow: visible;
            .sidebar-container {
                width: 100%;
                padding-right: 0;
                overflow: visible;
            }
            .slideBarSize {
                width: 100%;
                top: -40px;
            }
            .sidebar-list {
                width: 100%;
            }
            .sidebar-second-list {
                /*border-right: ;*/
                padding-top: 50px;
                color: #282828;
                width: 100%;
                text-align: center;
                background: #f2f2f2;
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: 9999;
                transition: width 0.2s linear;
                &.show {
                    width: 150px;
                }
            }

            &.sidebar-second-list:hover {
                color: #758DCE;
            }
        }
    }
    .slideBarSize {
        position: absolute;
        left: 0;
        top: -40px;
        display: inline-block;
        width: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 30px;
        background: #283349;
        z-index: 1;
        &:before {
            content: '\e604';
            color:#A4B4D2;
        }
    }
    .sidebar-list {
        margin-top: 40px;
        width: 50px;
        background: #232b3a;
    }
    .sidebar-second-list {
        /*border-right: ;*/
        padding-top: 50px;
        width: 168px;
        height: 100%;
        overflow-y: scroll;
        text-align: center;
        background: #f2f2f2;
        position: absolute;
        left: 0px;
        top: 0px;
    }
    .sidebar-last-list {
        color: #555555;
        /*background: #4e5d7c;*/
    }
    .sidebar-item-first {
        line-height: 50px;
        .item-first-ctrl {
            display: block;
            width: 100%;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            &:hover{
                background: #1c2432;
            }
        }
        .item-first-ctrl[aria-expanded="true"] {
            background: #1c2432;
        }
        .sidebar-icon {
            position: relative;
            display: inline-block;
            width: 50px;
            text-align: center;
        }
    }
    .sidebar-item-second {
        line-height: 42px;
        box-sizing: border-box;
        /*border-bottom: 1px solid #344057;*/
        .item-second-ctrl {
            /*padding-left: 50px;*/
            color: #666666;
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100%;
            &:hover {
                background: #EAEDF1;
            }
            &[aria-expanded="true"],
            /*&:hover {*/
                /*color: #fff;*/
                /*.sidebar-icon-arrow {*/
                    /*color: #fff;*/
                /*}*/
            /*}*/
            &[aria-expanded="true"] {
                .sidebar-icon-arrow {
                    top: -2px;
                    transform: rotate(180deg);
                }
            }
            .sidebar-icon-arrow {
                position: absolute;
                left: 27px;
                top: 5px;
                color: #999999;
                font-size: 12px;
                width: 14px;
                vertical-align: middle;
                transition: transform 0.2s, vertical-align 0.2s;
                &:before {
                    content: '\e603';
                }
            }
        }
    }
    .sidebar-item-last {
        /*&.visited {*/
            /*background: #fff;*/
        /*}*/
        &.active {
            background: #fff;
            a {
                color: #425994;
            }
        }
        &:hover {
            background: #EAEDF1;
            color:#758DCE;
            a {
                color: #425994;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        &.checkThird {
            background: #fff;
        }
        a {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            padding-left: 50px;
            line-height: 40px;
            color: #555555;
            text-align: left;
        }
    }
.sidebar{
    .tooltip-inner {
        white-space: nowrap;
    }
}
</style>