<template>
    <div class="print-buttons">
        <a @click="print" href="javascript:void(0)" class="noprint btn btn-default">打印</a>
    </div>
    <div class="printMain" v-bind:style="pattern.paper.style" v-for="code in codeLists" :class="{'page-next': $index < codeLists.length -1 }">
        <img class="printMain-background-img" :src="pattern.paper.style.imgUrl" alt="">
        <div class="print-fields" v-for="editField in pattern.editField">
            <div class="formHead" v-bind:style="editField.style">
                <div class="formHeadField" v-if="!formHeadField.isBarcode" v-bind:style="formHeadField.style" v-for="formHeadField in editField.fields">{{{$interpolate(formHeadField.content) | lineBreak}}}</div>
                <div class="formHeadField barcodeField" v-if="formHeadField.isBarcode" v-bind:style="{left: formHeadField.style.left,top:formHeadField.style.top}" v-for="formHeadField in editField.fields">{{$interpolate(formHeadField.content)}}</div>
                <div class="formHeadField qrCodeField" v-if="formHeadField.isQrCode" v-bind:style="{left: formHeadField.style.left,top:formHeadField.style.top,width:formHeadField.style.width,height:formHeadField.style.height}" v-for="formHeadField in editField.fields">{{$interpolate(formHeadField.content)}}</div>
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
    var QRCode = require('../../../js/plugins/qrcode');
    module.exports = {
        data: function () {
            return {
                isAutoPrint: false,
                printCodeList: [],
                codeLists: [],
                pattern: {},
            }
        },
        methods: {
            //打印
            print: function () {
                window.print();
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
            getCodeData: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryQrCodeData',
                    data: {
                        Sheet: self.printCodeList,
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.codeLists = result.Data;
                    }
                })
            },
            getPrintPattern: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryPrintTemplate',
                    data: {
                        PrintTemplateType: {
                            BusinessType: 4,
                        }
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.pattern = JSON.parse(result.Data.replace(/\\/ig,''));
                    }
                })
            },
            /**
             * 生成二维码
             * @param el {dom} 需要生成二维码的DOM节点
             */
            generateCode: function (el) {
                var codeText = el.innerText;
                el.innerText = '';
                new QRCode(el,{
                    text: codeText,
                    width: parseInt(el.style.width,10),
                    height: parseInt(el.style.height,10),
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            },
            autoPrint: function () {
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
                var fileName = 'code' + year + month + day + hours + minutes + seconds + '.html';
                a.download = fileName;
                a.style.opacity = 0;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

//                var printData = '<data>' + document.querySelector('html').innerHTML + '</data>';
                servers.postAjax.bind(this)({
                    url: '?PrintType=4',
                    async: false,
                    data: '<file>' + fileName + '</file>',
                    dataType: 'jsonp',
                    timeout: 1000,
                    jsonpCallback: 'success_jsonpCallback'
                },'http://127.0.0.1:8100').done(function (result) {
                    window.opener=null;
                    window.open('','_self');
                    window.close();
                }).fail(function (error) {
                    alert('自动打印失败')
                });
            }
        },
        computed: {
            createBarcode: {
                get: function () {
                    if (this.pattern && this.codeLists.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
        },
        watch: {
            //创建barcode和二维码,如果有选自动打印,则在barcode创建完后自动打印
            createBarcode: function (val) {
                if (val) {
                    require('../../../js/plugins/jquery-barcode');
                    var barcodeField = $('.barcodeField');
                    var qrCodeField = document.querySelectorAll('.qrCodeField');
                    for (var i = 0, len=barcodeField.length; i < len; i++) {
                        var barcodeText = barcodeField.eq(i).text();
                        barcodeField.eq(i).empty().barcode(barcodeText, "code128",{showHRI:true,barWidth: 2});
                    }
                    for (var i = 0, qrLen = qrCodeField.length; i < qrLen; i++) {
                        this.generateCode(qrCodeField[i]);
                    }
                    if (this.isAutoPrint == 'true') {
                        this.autoPrint();
                    }
                }
            }

        },
        route: {
            data: function (transition) {
                if (localStorage.printCodeList) {
                    this.printCodeList = JSON.parse(localStorage.printCodeList);
                    this.isAutoPrint = transition.to.query.autoPrint;
                    this.getPrintPattern();
                    this.getCodeData();
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