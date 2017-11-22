<template>
    <div class="sheet-list-table table-responsive">
        <table class="table table-condensed ">
            <thead class="sheet-list-header">
            <tr>
                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                <th>防伪码</th>
                <th v-if="pageInfo.status == 'small'">小码</th>
                <th>大码</th>
                <th>是否关联</th>
                <th>关联订单</th>
                <th>商品Sku</th>
                <th>交易备注</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr class="sheet-list-item" v-for="qrcode in qrcodes">
                <td class="sheet-item-state"><input type="checkbox" v-model="qrcode.checked"></td>
                <td><span>{{qrcode.DetectCode}}</span></td>
                <td v-if="pageInfo.status == 'small'"><span>{{qrcode.BoxCode==="" ? '' : qrcode.Code}}</span></td>
                <td><span>{{qrcode.BoxCode==="" ? qrcode.Code : qrcode.BoxCode}}</span></td>
                <td :class="[qrcode.Flag == 1 ? '' : 'state-forbid']">{{qrcode.Flag == 1 ? '是' :'否'}}</td>
                <td><span>{{qrcode.Sheet}}</span></td>
                <td><span>{{qrcode.Sku}}</span></td>
                <td><span data-toggle="tooltip" data-placement="top" title="{{qrcode.Note}}">{{qrcode.Note  | truncationString }} </span>
                </td>
                <td><span>{{qrcode.Creater}}</span></td>
                <td><span v-if="qrcode.CreateTime" data-toggle="tooltip" data-placement="top"
                          title="{{qrcode.CreateTime | truncationTimeString}}">{{qrcode.CreateTime | formatDateFormShow}}</span>
                </td>
                <td :class="[ qrcode.Status == 0 ? 'state-forbid' : '']">{{ qrcode.StatusDesc}}</td>
                <td>
                    <a v-link="{name:'qrcodeFlow',query:{orCodeID:qrcode.QRCodeID}}" class="sheet-list-delete" data-toggle="tooltip" data-placement="top" title="查看扫码流水"><span class="iconfont icon-look"></span></a>
                    <a @click="StatusChange(1,qrcode.QRCodeID)" href="javascript:void(0)" v-if="qrcode.Status == 0" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                    <a @click="StatusChange(0,qrcode.QRCodeID)" href="javascript:void(0)" v-if="qrcode.Status != 0  " data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="qrcodes.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
        <pagination :pagination-options="paginationOptions"></pagination>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        props: ['qrcodes','paginationOptions','query','pageInfo','checkedItems'],


        watch: {
            'checkedGroups': function (val) {
                this.checkedItems = val;
            }
        },
        methods: {
            getIDGroup: function (ItemID) {
                var IDGroup = [];
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                console.log(IDGroup);
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个组合'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            StatusChange(status,id) {
                this.$dispatch('transmit','statusChange', status, id);
            },

//            uploadFile: function () {
//                this.$dispatch('transmit', 'uploadModalShow', this.pageInfo.fileType);
//            },
//            //导出
//            exportFile: function () {
//                var self = this;
//                NProgress.start();
//                servers.postAjax.bind(this)({
//                    url: '/ExportExcel/ExportExcelQRCode',
//                    data: {
//                        pageSize: 10000,
//                        pageNumber: 1,
//                        SearchWhere: self.query
//                    }
//                }).done(function (result) {
//                    NProgress.done();
//                    if (result.ResultCode == 1) {
//                        var url = `http://${location.host}${result.Data}`;
//                        console.log(url);
//
//                        //document.querySelector('.downloadurl').href=this.url;
//                        //document.querySelector('.downloadurl').href='http://127.0.0.1:8088/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls';
//                        //document.querySelector('.downloadurl').click()
//
//                        window.open(url);
//
//                        //window.open('http://127.0.0.1:8088/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls');
//                        //window.open('http://127.0.0.1:9000/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls');
//                    }
//                });
//            },


        },
        computed: commonMethods.selectAll('this.qrcodes', function (item) {
            return item.QRCodeID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        },
    }
</script>
<style rel="stylesheet/less" lang="less">

</style>
