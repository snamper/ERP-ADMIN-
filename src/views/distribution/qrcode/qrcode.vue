<template>

    <div class="container-fluid qrcode">
        <div class="unify-head">
            条码管理
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>防伪码</label>
                        <input v-model="query.DetectCodeList | arrayToString" type="text" class="form-control" placeholder="多个防伪码用;隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="pageInfo.status == 'small'">
                        <label>小码</label>
                        <input v-model="query.CaseCodeList | arrayToString" type="text" class="form-control" placeholder="多个编码用;隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>大码</label>
                        <input v-model="query.BoxCodeList | arrayToString" type="text" class="form-control" placeholder="多个编码用;隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>是否关联</label>
                        <select class="form-control" v-model="query.Flag">
                            <option value="">不限</option>
                            <option value=1>是</option>
                            <option value=0>否</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>关联订单</label>
                        <input v-model="query.Sheet" type="text" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value={{status.Code}} v-for="status in statusList">{{status.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>创建人</label>
                        <input v-model="query.Creater" type="text" class="form-control" placeholder="">
                    </div>

                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>创建时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="query.BeginTime | formatDate" type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="query.EndTime | formatDate" type='text' class="form-control"/>
                                <span class="input-group-addon"><span
                                        class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="query-button-group ">
                        <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
						<!-- <a class="downloadurl" target="_blank"  href="{{url}}" >sss</a> -->
                    </div>


            </div>
        </div>
        <div class="sheet-list none-top">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a v-link="{name:'qrcode-large', activeClass: 'active'}" class="sheet-tab-link">大 码</a>
                            <a v-link="{name:'qrcode-small', activeClass: 'active'}" class="sheet-tab-link">小 码</a>
                        </div>
                    </div>
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <label>批量操作：</label>
                            <a @click="StatusChange(1)" href="javascript:void(0)" class="btn btn-default">批量启用</a>
                            <a @click="StatusChange(0)" href="javascript:void(0)" class="btn btn-default">批量禁用</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">导入</a>
                            <a @click="exportFile" href="javascript:void(0)" class="btn btn-default">导出</a>
                            <a @click="printCode" href="javascript:void(0)" class="btn btn-default">打印二维码</a>
                            <a href="/App_File/打印服务.rar" target="_blank" class="btn btn-default" >下载打印服务程序</a>
                            <label for="autoPrint">
                                <input id="autoPrint" v-model="autoPrint" type="checkbox"> 自动打印(如果勾选,请打开本地打印服务程序)
                            </label>
                        </div>
                    </div>
                    <router-view :qrcodes="qrcodes[pageInfo.status]" :pagination-options.sync="paginationOptions[pageInfo.status]" :query.sync="query" :page-info.sync="pageInfo" :checked-items.sync="checkedItems"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    large: {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    },
                    small: {
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    }
                },
                checkedItems: [], // 选中的项目
                autoPrint: false,
                //查询的二维码结果
                qrcodes: {
                    large: [],
                    small: []
                },
                statusList: [],
				//url: 'http://127.0.0.1:8088/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls',
                //查询条件
                query: {
                    DetectCodeList: [],
                    CaseCodeList: [],
                    BoxCodeList: [],
                    Flag: '',
                    Sheet: '',
                    Status: '',
                    Creater: '',
                    BeginTime: '',
                    EndTime: '',
                    CodeType: '1',
                },
                pageInfo: {
                    status: 'large',
                    isChangeTab: false,
                    fileType: 34
                }
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit', 'uploadModalShow', this.pageInfo.fileType);
            },

            //重置列表
            resetting: function () {
                this.query = {
                    DetectCodeList: [],
                    CaseCodeList: [],
                    BoxCodeList: [],
                    Flag: '',
                    Sheet: '',
                    Creater: '',
                    BeginTime: '',
                    EndTime: '',
                    CodeType: '1',
                }
            },
            //获取状态列表
            getStatusList: function() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetCodeStatus',
                }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.statusList = result.Data;
                            } })
            },
            //获取二维码数据
            getQRCode: function () {
                var status = this.pageInfo.status;
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQueryQRCode',
                    data: {
                        pageSize: self.paginationOptions[status].pageSize,
                        pageNumber: self.paginationOptions[status].cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var qrcodes = result.Data.PageData;
                        self.qrcodes[status] = [];
                        if (qrcodes.length > 0) {
                            self.paginationOptions[status].all = result.Data.TotalPages;
                            self.paginationOptions[status].totalRecords = result.Data.TotalRecords;
                            qrcodes.forEach(function (item) {
                                item.checked = false;
                                item.RolesList = [];
                            });
                            self.qrcodes[status] = qrcodes;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                });
            },
            //搜索
            search: function () {
                var status = this.pageInfo.status;
                var pagination = this.paginationOptions[status];
                if (status == 'large') {
                    this.query.CodeType = 1;
                    this.query.caseCode = [];
                } else if (status == 'small') {
                    this.query.CodeType = 100;
                }
                if (pagination.cur == 1) {
                    this.getQRCode();
                } else {
                    pagination.cur = 1
                }
            },
            //禁用启用
            StatusChange(status,id) {
                var self = this;
                var text = '使用';
                if (status == 0) {
                    text = '取消';
                }
                var data = [];
                var choiceCode = [];
                if (id != undefined) {
                    data = [{
                        QRCodeID: id,
                        status: status
                    }]
                } else {
                    choiceCode = self.checkedItems;
                    if (choiceCode.length > 0) {
                        data = choiceCode.map((item) => {
                            return {
                                QRCodeID: item,
                                status: status
                            }
                        })
                    } else {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请至少选中一个组合'
                        });
                        return;
                    }
                }
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些二维码吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'StatusChange'
                        }
                    });
                    self.$off('StatusChange');

                    self.$once('StatusChange',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasQRCode/UpdateStatus',
                            contentType: 'application/json',
                            data:  JSON.stringify(data),
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.search();
//                                self.$dispatch('transmit','refresh');
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                            }
                        });
                    });

            },
            //导出
            exportFile: function () {

                var self = this;
                NProgress.start();

                servers.postAjax.bind(this)({
                    url: '/ExportExcel/ExportExcelQRCode',
                    data: {
                        pageSize: 10000,
                        pageNumber: 1,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                    		var url = `http://${location.host}${result.Data}`;
							console.log(url);

							//document.querySelector('.downloadurl').href=this.url;
							//document.querySelector('.downloadurl').href='http://127.0.0.1:8088/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls';
							//document.querySelector('.downloadurl').click()

                    		window.open(url);

							//window.open('http://127.0.0.1:8088/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls');
							//window.open('http://127.0.0.1:9000/ExcelTemp/1de09427-c339-4894-9a1b-108c10a0a55f.xls');
                    }
                });
            },
            // 查看流水
            Record: function () {
                this.$route.router.go({
                    name: 'qrcoderedord',
                })
            },
            // 打印二维码
            printCode: function () {
                var checkedItems = this.checkedItems;
                if (checkedItems && checkedItems.length > 0) {
                    localStorage.printCodeList = JSON.stringify(checkedItems.map(function (item) {
                        return item.Sheet;
                    }));
                    this.$router.go({name:'print-code',query:{autoPrint: this.autoPrint}});
                } else {
                    this.$dispatch('transmit','tip',{
                        contentText: '请至少选择一条进行打印!'
                    });
                }
            },
        },
        route: {
            data: function (transition) {
                var status = this.pageInfo.status = transition.to.name.slice(7);
                var query = this.query;
                if (status == 'large') {
                    query.CodeType = 1;
                } else if (status == 'small') {
                    query.CodeType = 100;
                } else {
                    transition.abort();
                }
                if (this.qrcodes[status].length == 0) {
                    this.search();
                } else {
                    console.log('000000001');
                    this.pageInfo.isChangeTab = true;
                }
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                if (this.pageInfo.isChangeTab) {
                    this.pageInfo.isChangeTab = false;
                } else {
                    this.getQRCode();
                }
            },
            'statusChange': function(status,id) {
                this.StatusChange(status,id);
            }
        },

        components: {
            pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getStatusList();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');

            $('#create-timepicker-start,#create-timepicker-end').datetimepicker({
                todayBtn: true,
                minView: 2
            });
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .qrcode {
        .batch-operation {
            border: none;
        }
        .none-top {
            border-top: none;
        }
    }
</style>