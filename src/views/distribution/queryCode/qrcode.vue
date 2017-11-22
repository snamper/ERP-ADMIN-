<template>

    <div class="container-fluid qrcode">
        <div class="unify-head">
            条码管理
        </div>
        <div class="query-form">
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品名称</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="商品名称">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>sku</label>
                        <input v-model="query.Sku" type="text" class="form-control" placeholder="sku">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>防伪码</label>
                        <input v-model="query.DetectCode" type="text" class="form-control" placeholder="防伪码">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>手机号</label>
                        <input v-model="query.Mobile" type="text" class="form-control" placeholder="手机号">
                    </div>
                   
                    
                </div>
                    <div class="query-button-group ">
                        <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
						<!-- <a class="downloadurl" target="_blank"  href="{{url}}" >sss</a> -->
                    </div>


            </div>
        </div>
        <div class="sheet-list">
    <div class="row">
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive">
                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header">
                        <tr>
                            <th>商品信息</th>
                            <th>商品扫码次数</th>
                            <th>扫码会员</th>
                            <th>扫码地区</th>
                            <th>手机号</th>
                            <th>扫码时间</th>
                            <th>条形码</th>
                            <th>防伪码</th>
                            <th>发放红包</th>
                        </tr>
                    </thead>
                    <tbody v-for="t in tableList">
                        <tr>
                            <td>
                                {{t.GoodName}}
                            </td>
                            <td>
                            {{t.ScanTimes}}

                            </td>
                            <td>
                            {{t.MemberName}}
                            </td>
                            <td>
                            {{t.ScanZone}}
                            </td>
                            <td>{{t.Mobile}}</td>
                            <td>{{t.ScanTime}}</td>
                            <td>{{t.CustomBC}}</td>
                            <td>{{t.DetectCode}}</td>
                            <td>{{t.RedPackAmount}}</td>
                        </tr>
                    </tbody>
                </table>
                <pagination :pagination-options="paginationOptions"></pagination>
            </div>
        </div>
    </div>
    <!--<div>{{colorList | json }}</div>-->
</div>
    </div>
</template>

<script>

var commonMethods = require('../../../js/common');


// 商品列表
module.exports = {
    data: function() {
        return {
            server: require('../../../js/servers/servers'),
            query: {
                Name:'',
                Sku:'',
                DetectCode:'',
                Mobile:'',
            },
            tableList: [],
            paginationOptions: {
                cur: 1,
                all: 0,
                pageSize: 15,
                totalRecords: 0
            }
        }
    },
    ready: function() {
        this.search();
    },
    components: {
        // seeStock: require('./merchant-stock.vue'),
        // seeMerchant: require('./merchant-list-see.vue')
        'pagination': require('../../../components/pagination.vue')
    },


    events: {

        'page-change': function() {
            this.erpQuery(true);
        }

    },

    methods: {
        /**
         * 搜索商品接口请求
         * 将 this.query 的数据传到服务器得到相应的商品列表
         * 将返回的商品列表复制到 tableList 对象
         */
        erpQuery: function() {
            var self = this;

            this.server.postAjax.bind(this)({
                url: '/BasQRCode/ErpQueryQrCodeScan',
                data: {
                    PageSize: this.paginationOptions.pageSize,
                    PageNumber: this.paginationOptions.cur,
                    SearchWhere: this.query
                },
                success: function(data) {
                    console.log(data);
                    if (data.ResultCode === 1) {

                        self.tableList = data.Data.PageData;

                        self.paginationOptions.all = data.Data.TotalPages;
                        self.paginationOptions.totalRecords = data.Data.TotalRecords;

                    }

                }
            });
        },
        resetting: function () {
            this.query = {
                Status: '',
                BrandID: "",
                ColorID: "",
                DeptID: "",
                SeasonID: "",
                SizeID: "",
            }
        },
    
        /**
         * 搜索
         */
        search: function() {
            this.erpQuery();
        },

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