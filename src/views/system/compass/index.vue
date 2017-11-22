<template>
    <div class="compass-show row">
        <div class="compass-left col-lg-9 col-md-6 col-sm-6">
            <div class="compass-header row col-lg-12">
                <!--用户信息区-->
                <user></user>
                <!--订单信息区-->
                <order-info></order-info>
            </div>
            <!--销售报告-->
            <sales-report :hot-sales.sync="hotSales" :show-loading.sync="showLoading" :current-type.sync="currentType"></sales-report>
            <!--热销商品-->
            <hot-sales  :hot-sales.sync="hotSales"  :current-type.sync="currentType"></hot-sales>
        </div>
        <div class="compass-right col-lg-3 col-md-3 col-sm-3">
            <!--公告-->
            <notice></notice>
            <!--快捷登录-->
            <!--<widget-login></widget-login>-->
            <!--邀请注册-->
            <!--<widget-register></widget-register>-->
            <!--联系客服-->
        </div>
    </div>
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                currentType: 'day', //day表示日 week表示周 month表示月
                hotSales: {
                    day: [],
                    week: [],
                    month: []
                },
                showLoading: false
            }
        },
        watch: {
            currentType: function (newDataType) {
                this.getHotSales();
            }
        },
        ready: function () {
            var self = this;
            this.getHotSales();
        },
        methods: {
            //获得dateType的代码
            getDateTypeCode: function () {
                var dateType = this.currentType;
                var dateTypeCode;
                switch(dateType) {
                    case 'day':
                        dateTypeCode = 0;
                        break;
                    case 'week':
                        dateTypeCode = 1;
                        break;
                    case 'month':
                        dateTypeCode = 2;
                        break;
                    default:
                        dateTypeCode = 0;
                }
                return dateTypeCode;
            },
            //获取热销商品
            getHotSales: function () {
                var self = this;
                var hotSales = this.hotSales;
                var dateType = this.currentType;
                var dateTypeCode = this.getDateTypeCode();
                if (hotSales[dateType].length == 0) {
                    NProgress.start();
                    self.showLoading = true;
                    servers.postAjax({
                        url: '/Dashboard/ErpQueryHotGoodsInfo',
                        data: {
                            DateType: dateTypeCode
                        }
                    }).done(function (result) {
                        NProgress.done();
                        self.showLoading = false;
                        if (result.ResultCode == 1) {
                            self.hotSales[dateType] = result.Data;
                        }
                    }).fail(function (error) {
                        self.showLoading = false;
                    })
                }
            }
        },
        components: {
            user: require('./components/user.vue'),
            orderInfo: require('./components/orderInfo.vue'),
            salesReport: require('./components/salesReport.vue'),
            hotSales: require('./components/hotSales.vue'),
            notice: require('./components/notice.vue'),
            widgetLogin: require('./components/widgetLogin.vue'),
            widgetRegister: require('./components/widgetRegister.vue')
        }
    }
</script>
<style  rel="stylesheet/less" lang="less">
    .compass-show{
        input{
            outline:none;
        }
        button{
            outline:none;
        }
        padding:15px;
        min-width:1050px;
        .compass-left{
            min-width:760px;

            .compass-header{
                min-width:830px;
            }
            .personal-one{
                min-width: 343px;
                padding-left:0;
                padding-right:0;
                border: 1px solid #EEEEEE;
                box-shadow: 0px 5px 15px #F0F0F0;
                height: 246px;
                .personal-one-left{
                    min-width:142px;
                    padding-top:48px;
                    padding-left:0;
                    padding-right:0;
                    padding-bottom:46px;
                    background: #F8FAFC;
                    border-right: 1px solid #EEEEEE;
                    .portarit-name{
                        color:#4560A5;
                        font-size:14px;
                        text-align: center;
                        line-height:40px;
                    }


                    .head-portrait{

                        width: 110px;
                        height: 110px;
                        overflow:hidden;
                        margin:0 auto;
                        border: 1px solid #E6E7E7;
                        border-radius:50px;
                        .head-portrait-bd{
                            border: 3px solid #fff;
                            width: 107px;
                            height: 107px;
                            border-radius:50px;
                            overflow:hidden;
                            img{
                                width: 100%;
                                height: 100%;
                                margin:0 auto;
                            }
                        }
                    }
                }
                .personal-one-right{
                    padding:0;
                    ul.portarit-show{
                        width: 128px;
                        height: 130px;
                        margin:0 auto;
                        margin-top:64px;

                        li{
                            margin:20px 0;
                            font-size:14px;
                            color:#323232;

                            span{
                                font-size:14px;
                                color:#989898;
                                display: inline-block;
                                margin-right:8px;
                            }
                        }


                    }
                }

            }
            .personal-two{
                margin-left:12px;
                min-width:489px;
                .personal-two-top{
                    box-shadow: 0px 5px 15px #F0F0F0;
                    border: 1px solid #E9E9E9;
                    height: 118px;
                    border-radius: 5px;
                    padding:25px 15px;
                    min-width:170px;
                    margin-bottom:10px;
                    margin-right:10px;
                    box-sizing: border-box;
                    .personal-text{
                        float:left;
                        span{
                            color:#545454;
                            font-size:40px;
                        }
                        i{
                            display: block;
                            font-size:14px;
                            color:#656565;
                            font-style: normal;
                            margin-top:5px;
                            margin-left:2px;
                        }
                    }
                    .personal-icon{
                        float:right;
                    }

                }
            }

        }
        .compass-right{
            background: #EFF1F6;
            border-left:1px solid #EDEDED;
            height:100%;
            padding-bottom: 24px;
            .system-notice{
                line-height:38px;
                font-size:18px;
                color:#AFB7CC;
                margin-top:15px;
                border-bottom:2px solid #D1D9E1;
                span{
                    display:inline-block;
                    vertical-align: middle;
                    margin-top:-4px;
                    margin-right:6px;
                }
            }
            .system-login{
                ul{
                    width: 215px;
                    margin:0 auto;
                    li{
                        float:left;
                        margin:20px 10px;
                        cursor:pointer;
                        span{
                            width: 44px;
                            height: 44px;
                            font-size:22px;
                            text-align: center;
                            line-height:38px;
                            background: #F0F1F6;
                            border: 3px solid #8F99B7;
                            border-radius: 30px;
                            color:#8E99B7;
                        }
                    }
                    li:hover{
                        span{
                            background: #7CD22A;
                            color:#fff;
                            border:none;
                        }
                    }
                }
            }
            .system-register{
                clear:both;
            }
            .system-serveice-contact{
                font-size:14px;
                padding-top:10px;
                color:#586578;
                h1{
                    font-size:24px;
                    color:#546CA9;
                    display: inline-block;
                }

                button{
                    width: 49%;
                    height: 40px;
                    line-height:40px;
                    background: #FFFFFF;
                    border: 1px solid #BABABA;
                    color:#656565;
                    font-size:14px;
                    color:#656565;
                    border-radius:25px;
                    margin:10px 0;
                    display:inline-block;
                    .iconfont{
                        color:#989898;
                        line-height:36px;
                        vertical-align: middle;
                        margin-top:-5px;
                        margin-right:5px;
                        display: inline-block;
                        font-size:14px;
                    }
                }
                button:hover{
                    background: #66ACC0;
                    color:#fff;
                    border:none;
                    .iconfont{
                        color:#fff;
                    }
                }
            }
            .activity-list-hd{
                h1{
                    color:#AEB7CC;
                    font-size:16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                p{
                    font-size:14px;
                    color:#586578;
                    text-indent:2em;
                    line-height:20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }


            }
            .system-register-hd{
                padding-top:10px;
                .register-email{
                    input{
                        width: 100%;
                        background: #fff;
                        border: 2px solid #C4CBDE;
                        border-radius: 5px;
                        height: 40px;
                        font-size:14px;
                        color:#989898;
                        padding:10px;
                        margin:10px 0;
                    }
                    button{
                        width: 100%;
                        color:#fff;
                        border:none;
                        height: 45px;
                        background: #6780BF;
                        line-height:45px;
                        text-align: center;
                        font-size:14px;
                        border-radius: 5px;

                    }

                }
            }
            .activity-list{
                background: #FFFFFF;
                border-radius: 5px;
                padding:10px;
                li{
                    margin:5px 0;
                    line-height:22px;
                    cursor:pointer;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    a {
                        display: inline-block;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        &:before {
                            display: inline-block;
                            content: '';
                            width: 10px;
                            height:10px;
                            border-radius: 15px;
                            background: #E4E6ED;
                            margin-right:5px;
                        }
                    }
                }

            }
        }
        .compass-market{
            padding:0;
            .sheet-list{
                margin:0;
                .sheet-list-table{
                    border-top:none;
                }
            }
            .compass-market-hd{
                span{
                    margin-right:5px;
                }
                line-height:40px;
                font-size:16px;
                color:#8E99B7;
                height:40px;
                margin:10px 0 20px;
                ul{
                    display: inline-block;
                    vertical-align: middle;

                    border: 1px solid #E1E6EB;
                    border-radius: 20px;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    -o-box-sizing:border-box;
                    li:nth-of-type(1){
                        border-radius: 20px 0 0 20px ;

                    }
                    li:nth-of-type(3){
                        border-radius:0 20px  20px 0  ;

                    }
                    li{
                        float:left;
                        width: 48px;
                        height: 30px;

                        -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        -o-box-sizing:border-box;
                        border: 1px solid #E1E6EB;

                        line-height: 30px;
                        text-align:center;
                        color:#656565;
                        font-size:14px;
                        cursor:pointer;

                    }
                    li.compass-time-current{
                        background: #86A2E9;
                        color:#fff;
                        border:none;
                    }
                }
                .export-more{
                    width: 120px;
                    border: 1px solid #989898;
                    height: 30px;
                    border-radius: 15px;
                    float:right;
                    line-height:30px;
                    font-size:14px;
                    cursor:pointer;
                    color:#323232;
                    text-align: center;
                }
            }
            .compass-market-img{
                height: 500px;
                padding:0;
            }
        }

    }
</style>