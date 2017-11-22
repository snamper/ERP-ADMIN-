<template>
    <div class="print-buttons">
        <a @click="print" href="javascript:void(0)" class="noprint btn btn-default">打印</a>
    </div>
    <div class="printMain" v-bind:style="pattern.paper.style" v-for="pick in pickLists" :class="{'page-next': $index < pickLists.length -1 }">
        <img class="printMain-background-img" :src="pattern.paper.style.imgUrl" alt="">
        <div class="print-fields" v-for="editField in pattern.editField | orderBy 'type'">
            <div class="formTable" v-if="editField.type==3">
                <table :style="pattern.detailsList.style">
                    <thead>
                        <tr v-bind:style="pattern.detailsList.thead.style">
                            <th v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{list.name | nullToString}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pickDetail in pick.pickDetail">
                            <td v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{$interpolate(list.content) | lineBreak | joinToParent pick list.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="formHead" v-bind:style="editField.style">
                <div class="formHeadField" v-if="!formHeadField.isBarcode" v-bind:style="formHeadField.style" v-for="formHeadField in editField.fields">{{$interpolate(formHeadField.content) | nullToString}}</div>
                <div class="formHeadField barcodeField" v-if="formHeadField.isBarcode" v-bind:style="{left: formHeadField.style.left,top:formHeadField.style.top}" v-for="formHeadField in editField.fields">{{$interpolate(formHeadField.content) | nullToString}}</div>
                <img class="formHeadField" :src="img.url" alt="" v-bind:style="img.style" v-for="img in editField.customImg">
            </div>
            <div class="formTable" v-if="$index == pattern.editField.length - 1">
                <table :style="pattern.detailsList.style">
                    <thead>
                    <tr v-bind:style="pattern.detailsList.thead.style">
                        <th v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{list.name | nullToString}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="pickDetail in pick.pickDetail">
                        <td v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{$interpolate(list.content) | lineBreak | joinToParent pick list.content}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--{{pattern | json}}-->
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                isAutoPrint: false,
                pickSheetList: [],
                pickLists: [],
                pattern: {},
                BusinessType: ''
            }
        },
        methods: {
            //打印
            print: function (e) {
                window.print();
                this.updatePrintCount();
            },
            //获取拣货单列表
            getPickSheetData: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryPickSheetData',
                    data: {
                        Sheet: self.pickSheetList
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.pickLists = result.Data;
                    }
                })
            },
            //更新打印次数
            updatePrintCount: function () {
                var self = this;
                servers.postAjax({
                    url: '/Print/ErpUpdatePrintTime',
                    data: {
                        Sheet: self.pickSheetList
                    }
                }).done(function (result) {

                })
            },
            //获取格式
            getPrintPattern: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryPrintTemplate',
                    data: {
                        PrintTemplateType: {
                            BusinessType: self.BusinessType
                        }
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.pattern = JSON.parse(result.Data.replace(/\\/ig,''));
                    }
                })
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
                var fileName = 'pick' + year + month + day + hours + minutes + seconds + '.html';
                a.download = fileName;
                a.style.opacity = 0;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

//                var printData = '<data>' + document.querySelector('html').innerHTML + '</data>';
                servers.postAjax.bind(this)({
                    url: '?PrintType=0',
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
                    if (this.pattern && this.pickLists.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        watch: {
            createBarcode: function (val) {
                if (val) {
                    require('../../../js/plugins/jquery-barcode');
                    var barcodeField = $('.barcodeField');
                    for (var i = 0, len=barcodeField.length; i < len; i++) {
                        var barcodeText = $.trim(barcodeField.eq(i).text());
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
                this.BusinessType = transition.to.query.BusinessType;
                this.isAutoPrint = transition.to.query.autoPrint;
                if (localStorage.printPickSheetList) {
                    this.pickSheetList = JSON.parse(localStorage.printPickSheetList);
//                    this.pickSheetList = ['BC20160607172231227797','BC160608110814087075','BC20160607154248425810'];
//                    localStorage.removeItem('printPickSheetList');
                    this.getPrintPattern();
                    this.getPickSheetData();
                    require('../../../js/plugins/jquery-barcode');

                } else {
                    alert('没有打印的数据');
                }
                transition.next();
            }
        },
        ready: function () {

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
        .formTable {
            border-collapse: collapse;
            table-layout: fixed;
            td {
                padding: 8px;
            }
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