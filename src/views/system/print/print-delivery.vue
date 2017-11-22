<template>
    <div class="print-buttons">
        <a @click="print" href="javascript:void(0)" class="noprint btn btn-default">打印</a>
    </div>
    <div class="printMain" v-bind:style="pattern.paper.style" v-for="delivery in deliveryLists" :class="{'page-next': $index < deliveryLists.length -1 }">
        <img class="printMain-background-img" :src="pattern.paper.style.imgUrl" alt="">
        <div class="print-fields" v-for="editField in pattern.editField">
            <div class="formHead" v-bind:style="editField.style">
                <div class="formHeadField" v-if="!formHeadField.isBarcode" v-bind:style="formHeadField.style" v-for="formHeadField in editField.fields">{{{$interpolate(formHeadField.content) | lineBreak}}}</div>
                <div class="formHeadField barcodeField" v-if="formHeadField.isBarcode" v-bind:style="{left: formHeadField.style.left,top:formHeadField.style.top}" v-for="formHeadField in editField.fields">{{$interpolate(formHeadField.content)}}</div>
                <img class="formHeadField" :src="img.url" alt="" v-bind:style="img.style" v-for="img in editField.customImg">
            </div>
        </div>
        <!--{{pickLists | json}}-->
    </div>
    <!--<div>{{pattern.type}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                isAutoPrint: false,
                printDeliveryList: [],
                deliveryLists: [],
                pattern: {},
                ShopID: '',
                PayMode: '',
                MerchantDeliveryID: '',
                printDeliveryUrlList:[],//返回URL集合
                // IDlist:[],//OutStockBatchID集合
                // urlList:[],//
                // currentPrint: 0
                getDataUrl:'/Print/ErpQueryDeliverySheetData',
            }
        },
        methods: {
            //打印
            print: function () {
                window.print();
                //this.currentPrint = 0
                //this.autoPrint()
                this.updatePrintCount();
            },
            //更新打印次数
            updatePrintCount: function () {
                var self = this;
                servers.postAjax({
                    url: '/Print/ErpUpdatePrintTime',
                    data: {
                        Sheet: self.printDeliveryList
                    }
                }).done(function (result) {

                })
            },
            //获取打印数据
            getDeliveryData: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: self.getDataUrl,
                    data: {
                        Sheet: self.printDeliveryList,
//                        ShopID: self.ShopID,
//                        PayMode: self.PayMode,
//                        MerchantDeliveryID: self.MerchantDeliveryID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.deliveryLists = result.Data;
                        console.log(result.Data)
                    }
                })
            },
            //获取打印数据的URL集合//pdf
            // getDeliveryUrlData: function () {
            //     var self = this; 
            //     console.log(self.printDeliveryList)
            //     NProgress.start();
            //     servers.postAjax.bind(this)({
            //         url: '/Print/ErpQueryEpacketPrintUrl',
            //         data:{
            //             Ids:self.IDlist,
            //             Status:0
            //         }
            //     }).done(function (result) {
            //         NProgress.done();
            //         if (result.ResultCode == 1) {
            //             self.printDeliveryUrlList = result.Data;
            //         }
            //     })
            // },            
            //请求打印模版
            getPrintPattern: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryPrintTemplate',
                    data: {
                        PrintTemplateType: {
                            BusinessType: 3,
                            ShopID: self.ShopID,
                            PayMode: self.PayMode,
                            MerchantDeliveryID: self.MerchantDeliveryID
                        }
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.pattern = JSON.parse(result.Data.replace(/\\/ig,''));
                        console.log(result)
                    }
                })
            },
            autoPrint: function () {
                //console.log(this.printDeliveryUrlList)
                var self = this;
                var blob = new Blob(['<html>' + document.querySelector('html').innerHTML + '</html>']);
                var a = document.createElement("a");
                this.test = window.URL.createObjectURL(blob);
                a.href = window.URL.createObjectURL(blob);
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDay();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var fileName = 'delivery' + year + month + day + hours + minutes + seconds + '.html';
                //var fileName = self.printDeliveryUrlList[self.currentPrint]//pdf
                a.download = fileName;
                a.style.opacity = 0;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

//                var printData = '<data>' + document.querySelector('html').innerHTML + '</data>';
                servers.postAjax.bind(this)({
                    url: '?PrintType=1',
                    async: false,
                    data:'<file>'+ fileName +'</file>',
                    //data:'<pdf>'+ fileName +'</pdf>',//pdf
                    dataType: 'jsonp',
                    timeout: 1000,
                    jsonpCallback: 'success_jsonpCallback'
                },'http://127.0.0.1:8100').done(function (result) {
                    window.opener=null;
                    window.open('','_self');
                    window.close();
                    // if (self.currentPrint < self.printDeliveryUrlList.length) {//pdf
                    //     self.currentPrint++
                    //     self.autoPrint()
                    // }

                }).fail(function (error) {
                    alert('自动打印失败')
                });
            }
        },
        computed: {
            createBarcode: {
                get: function () {
                    if (this.pattern && this.deliveryLists.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        watch: {
            //创建barcode,如果有选自动打印,则在barcode创建完后自动打印
            createBarcode: function (val) {
                if (val) {
                    require('../../../js/plugins/jquery-barcode');
                    var barcodeField = $('.barcodeField');
                    for (var i = 0, len=barcodeField.length; i < len; i++) {
                        var barcodeText = barcodeField.eq(i).text();
                        barcodeField.eq(i).empty().barcode(barcodeText, "code128",{showHRI:true,barWidth: 2});
                    }
                    if (this.isAutoPrint == 'true') {
                        this.autoPrint();
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                console.log(localStorage.printDeliveryList)
                var flag = transition.to.query.flag;
                self.getDataUrl='/Print/ErpQueryDeliverySheetData'
                if(flag &&flag =='out'){
                    this.getDataUrl="/Print/ErpQueryDeliveryStockSheetData"
                }
                if (localStorage.printDeliveryList) {
                    this.printDeliveryList = JSON.parse(localStorage.printDeliveryList);
                    //this.IDlist = JSON.parse(localStorage.IDlist);//获取订单outStockBatchIDGroupID//pdf
                    this.ShopID = transition.to.query.ShopID;
                    this.PayMode = transition.to.query.PayMode;
                    this.isAutoPrint = transition.to.query.autoPrint;
                    this.MerchantDeliveryID = transition.to.query.MerchantDeliveryID;
//                    localStorage.removeItem('printPickSheetList');
                    this.getPrintPattern();
                    this.getDeliveryData();
                    //this.getDeliveryUrlData();//pdf

                } else {
                    alert('没有打印的数据');
                }
                transition.next();
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .page-next {
        page-break-after: always;
    }
    @media print {
        .noprint {
            display:none;
        }
    }
    .printMain {
        position: relative;
        margin: 0 auto;
        .printMain-background-img {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .print-fields {
            z-index: 2;
        }
        .formHead {
            position: relative;
            .formHeadField {
                position: absolute;
                &.barcodeField {
                    overflow: inherit!important;
                }
            }
        }
    }
</style>