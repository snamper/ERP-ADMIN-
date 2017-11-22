<template>
    <div class="print-buttons">
        <a @click="print" href="javascript:void(0)" class="noprint btn btn-default">打印</a>
    </div>
    <div class="printMain" v-bind:style="pattern.paper.style" v-for="order in packLists" :class="{'page-next': $index < packLists.length -1 }">
        <img class="printMain-background-img" :src="pattern.paper.style.imgUrl" alt="">
        <div class="print-fields"  v-for="editField in pattern.editField  | orderBy 'type'">
            <div class="formTable" v-if="editField.type==3">
                <table :style="pattern.detailsList.style">
                    <thead>
                    <tr v-bind:style="pattern.detailsList.thead.style">
                        <th v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{list.name | nullToString}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="orderDetail in order.ManuOrderDetail">
                        <td v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{$interpolate(list.content) | nullToString  | joinToParent order list.content}}</td>
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
                    <tr v-for="orderDetail in order.ManuOrderDetail">
                        <td v-for="list in pattern.detailsList.fields" v-bind:style="list.style">{{$interpolate(list.content) | nullToString | joinToParent order list.content}}</td>
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
                packSheetList: [],
                packUpSheetList: [],
                packLists: [],
                pattern: {},
                BusinessType: ''
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
                        Sheet: self.packSheetList
                    }
                }).done(function (result) {

                })
            },
            //获取拣货单列表
            getPackSheetData: function () {
                var self = this;
//                var result = {"Data":[{"Sheet":"BO16080609231789386","UpSheet":"BC16071414185663700","OutSheetID":"1676092742438875","SerialID":"2","InID":"欧培旗舰店","State":"江苏省","City":"无锡市","District":"江阴市","Address":"澄江街道香叶路177弄6号","State_City_District_Address":"江苏省无锡市江阴市澄江街道香叶路177弄6号","Phone":"","Mobile":"18795675305","Mobile_Phone":"18795675305_","LinkMan":"吴芝恒","OrderNo":"BC16071414185663700","BuyerNick":null,"PriceCount":null,"Count":null,"orderDetail":[{"GoodsName":"BB霜","CustomBC":"20160716201601223TEST_DEMENTIONS_SHORT","Barcode":"","Color":"绿色","Size":"短","Qty":1.000,"Price":null}]},{"Sheet":"BO16080609243534001","UpSheet":"BC16071413335654300","OutSheetID":"1371716203972853","SerialID":"2","InID":"欧培旗舰店","State":"浙江省","City":"金华市","District":"永康市","Address":"唐先镇叶宅村191号","State_City_District_Address":"浙江省金华市永康市唐先镇叶宅村191号","Phone":"","Mobile":"13735705980","Mobile_Phone":"13735705980_","LinkMan":"陈丽芬","OrderNo":"BC16071413335654300","BuyerNick":null,"PriceCount":null,"Count":null,"orderDetail":[{"GoodsName":"TEST商品","CustomBC":"TEST_CODETEST_COLOR_BLACKTEST_DEMENTIONS_LONG","Barcode":"","Color":"黑色","Size":"中","Qty":1.000,"Price":null},{"GoodsName":"TEST商品","CustomBC":"TEST_CODETEST_COLOR_REDTEST_DEMENTIONS_LONG","Barcode":"","Color":"红色","Size":"中","Qty":1.000,"Price":null}]}],"ResultCode":1,"OperationTime":"2016-08-19T20:39:17.18245+08:00","ErrorMessage":null}
//                setTimeout(function () {
//                    self.packLists = result.Data;
//                },500);
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Print/ErpQueryManuOrderData',
                    data: {
                        // Print: {Sheet:self.packSheetList},
                        Sheet:self.packSheetList
                        //UpSheet: self.packUpSheetList
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.packLists = result.Data;
                    }
                })
            },
            //获取格式
            getPrintPattern: function () {
                var self = this;
//                var result = {"Data":"{\"type\":1,\"paper\":{\"style\":{\"width\":\"595.266px\",\"height\":\"841.8762px\",\"imgUrl\":\"\"}},\"editField\":[{\"type\":0,\"style\":{\"height\":\"180px\"},\"fields\":[{\"content\":\"销售明细单\",\"text\":\"销售明细单\",\"type\":1,\"style\":{\"width\":\"127px\",\"height\":\"26px\",\"left\":\"208px\",\"top\":\"18px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"16px\",\"fontWeight\":\"bold\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.OutSheetID}}\",\"text\":\"OutSheetID\",\"name\":\"网店单号\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"200px\",\"height\":\"24px\",\"left\":\"1px\",\"top\":\"80px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.InID}}\",\"text\":\"InID\",\"name\":\"店铺\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"200px\",\"height\":\"24px\",\"left\":\"3px\",\"top\":\"111px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.LinkMan}}\",\"text\":\"LinkMan\",\"name\":\"联系人\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"169px\",\"height\":\"24px\",\"left\":\"219px\",\"top\":\"80px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.State}}{{pack.City}}{{pack.District}}{{pack.Address}}\",\"text\":\"State_City_District_Address\",\"name\":\"收货地址\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"382px\",\"height\":\"28px\",\"left\":\"215px\",\"top\":\"141px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.Mobile}}\",\"text\":\"Mobile\",\"name\":\"手机\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"200px\",\"height\":\"24px\",\"left\":\"388px\",\"top\":\"109px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.Phone}}\",\"text\":\"Phone\",\"name\":\"电话\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"166px\",\"height\":\"22px\",\"left\":\"218px\",\"top\":\"112px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.SerialID}}\",\"text\":\"SerialID\",\"name\":\"序列号\",\"isBarcode\":false,\"type\":0,\"style\":{\"width\":\"200px\",\"height\":\"24px\",\"left\":\"385px\",\"top\":\"17px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}},{\"content\":\"{{pack.Sheet}}\",\"text\":\"Sheet\",\"name\":\"出库单\",\"isBarcode\":true,\"type\":0,\"style\":{\"width\":\"200px\",\"height\":\"24px\",\"left\":\"4px\",\"top\":\"141px\",\"border\":\"none\",\"background\":null,\"fontSize\":\"14px\",\"fontWeight\":\"normal\",\"fontFamily\":\"inherit\",\"fontStyle\":\"normal\",\"textAlign\":\"left\"}}],\"customImg\":[]}],\"detailsList\":{\"style\":{},\"thead\":{\"style\":{\"height\":\"36px\"}},\"fields\":[{\"text\":\"GoodsName\",\"name\":\"商品名称\",\"content\":\"{{orderDetail.GoodsName}}\",\"style\":{\"width\":\"90px\",\"fontSize\":\"12px\",\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textAlign\":\"center\",\"border\":\"1px solid #E5E5E5\"}},{\"text\":\"Color\",\"name\":\"颜色\",\"content\":\"{{orderDetail.Color}}\",\"style\":{\"width\":\"90px\",\"fontSize\":\"12px\",\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textAlign\":\"center\",\"border\":\"1px solid #E5E5E5\"}},{\"text\":\"Size\",\"name\":\"尺码\",\"content\":\"{{orderDetail.Size}}\",\"style\":{\"width\":\"90px\",\"fontSize\":\"12px\",\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textAlign\":\"center\",\"border\":\"1px solid #E5E5E5\"}},{\"text\":\"Qty\",\"name\":\"数量\",\"content\":\"{{orderDetail.Qty}}\",\"style\":{\"width\":\"90px\",\"fontSize\":\"12px\",\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textAlign\":\"center\",\"border\":\"1px solid #E5E5E5\"}}]}}","ResultCode":1,"OperationTime":"2016-08-19T20:39:16.9168335+08:00","ErrorMessage":null}
//                setTimeout(function () {
//                    self.pattern = JSON.parse(result.Data.replace(/\\/ig,''));
//                },1000);
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
                var fileName = 'order' + year + month + day + hours + minutes + seconds + '.html';
                a.download = fileName;
                a.style.opacity = 0;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

//                var printData = '<data>' + document.querySelector('html').innerHTML + '</data>';
                servers.postAjax.bind(this)({
                    url: '?PrintType=2',
                    async: false,
                    data: '<file>' + fileName + '</file>',
                    dataType: 'jsonp',
                    timeout: 1000,
                    jsonpCallback: 'success_jsonpCallback'
                },'http://127.0.0.1:8100').done(function (result) {
                    alert('9999')
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
                    if (this.pattern && this.packLists.length > 0) {
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
                this.BusinessType = transition.to.query.BusinessType;
                this.isAutoPrint = transition.to.query.autoPrint;
                if (localStorage.printPackSheetList) {
                    this.packSheetList = JSON.parse(localStorage.printPackSheetList);
                    this.packUpSheetList =JSON.parse(localStorage.upSheetList || []);
//                    this.pickSheetList = ['BC20160607172231227797','BC160608110814087075','BC20160607154248425810'];
//                    localStorage.removeItem('printPickSheetList');
                    this.getPrintPattern();
                    this.getPackSheetData();
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