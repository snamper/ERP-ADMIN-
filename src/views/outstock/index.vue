<template>
    <div class="container-fluid container-fluid-margin">
        <div class="unify-head">
            出库订单
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        出库订单
                    </label>
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >出库单号</label>
                        <input v-model="query.Sheets | arrayToString" type="text" class="form-control" placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >上游单号</label>
                        <input v-model="query.UpSheet | arrayToString" type="text" class="form-control"  placeholder="多个订单用；隔开">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >外部交易号</label>
                        <input v-model="query.OutSheetID" type="text" class="form-control" >
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >业务类型</label>
                        <select v-model="query.TransferType" class="form-control">
                            <option value="">不限</option>
                            <option value="{{transferType.Code}}" v-for="transferType in baseLookUp.transferType">{{transferType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >出库仓库</label>
                        <select v-model="query.StockID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{stockList.StockID}}"  v-for="stockList in baseLookUp.stockLists">{{stockList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >快递公司</label>
                        <select v-model="query.MerchantDeliveryID" class="form-control">
                            <option value="">不限</option>
                            <option value="{{merchantDeliveryList.MerchantDeliveryID}}" v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">{{merchantDeliveryList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >运单号</label>
                        <input v-model="query.DeliverySheet" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.CustomBC" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品货号</label>
                        <input v-model="query.GoodsCode" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >支付方式</label>
                        <select v-model="query.PayMode" class="form-control">
                            <option value="">不限</option>
                            <option value="{{payList.Code}}" v-for="payList in baseLookUp.payLists">{{payList.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >备注</label>
                        <input v-model="query.Note" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control"  placeholder="">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label >外部交易号</label>-->
                        <!--<input v-model="query.UpSheet | arrayToString" type="text" class="form-control"  placeholder="多个订单用；隔开">-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >修改时间</label>
                        <date-picker :start-date.sync="query.EditTimeBeg" :end-date.sync="query.EditTimeEnd"></date-picker>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list order-margin">
            <div class="row ">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a v-link="{name:'outstockNotify', activeClass: 'active'}"  class="sheet-tab-link" >通知拣货</a>
                            <a v-link="{name:'outstockPick', activeClass: 'active'}" v-if="account.SysGlobalConfigs['201231']!='1'" class="sheet-tab-link">待拣货</a>
                            <a v-link="{name:'outstockScan', activeClass: 'active'}" v-if="account.SysGlobalConfigs['201231']!='1'" class="sheet-tab-link">待扫描</a>
                            <a v-link="{name:'outstockWeigh', activeClass: 'active'}" v-if="account.SysGlobalConfigs['201231']!='1'" class="sheet-tab-link">待称重</a>
                            <a v-link="{name:'outstockFinish', activeClass: 'active'}" class="sheet-tab-link">已完成</a>
                            <a v-link="{name:'outstockCancel', activeClass: 'active'}" class="sheet-tab-link">已取消</a>
                            <!--<a v-link="{name:'outstockPause', activeClass: 'active'}" class="sheet-tab-link">暂停</a>-->
                            <!--<a v-link="{name:'outstockException', activeClass: 'active'}" class="sheet-tab-link">问题单</a>-->
                        </div>
                    </div>
                </div>
                <router-view :is-change-tab.sync="pageInfo.isChangeTab" :outstock-lists="outstockLists[status]" :base-look-up="baseLookUp" :pagination-options.sync="pagination[status]" :status="status"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var getters = require('../../js/vuex/getters');
    var actions = require('../../js/vuex/actions');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                // 页面信息
                pageInfo: {
                    isChangeTab: false,
                },
                // 列表数据
                outstockLists: {},
                // 下拉列表数据
                baseLookUp: {
                    transferType: [], // 业务类型
                    payLists: [], // 支付方式
                    stockLists: [], // 仓库
                    merchantDeliveryLists: [], // 快递公司
                },
                // 分页
                pagination: {},
                // 查询条件
                query: {
                    CustomBC: '', // SKU，货号
                    DeliverySheet: '', // 运单号
                    OutSheetID:'',//外部交易号
                    EditTimeBeg: '', // 编辑开始时间
                    EditTimeEnd: '', // 编辑结束时间
                    Editor: '', // 编辑人
                    GoodsCode: '', // 商品编号
                    GoodsName: '', // 商品名称
                    ID: '', // 出库单ID
                    MerchantDeliveryID: '', // 快递公司ID
                    Note: '', // 备注
                    PayMode: '', // 支付方式
                    Sheets: [], // 出库单号，数组
                    Status: [10], // 10:待拣货,90:待扫描,92:待称重，97和98:取消，100：完成
                    StockID: '', // 出库仓库ID
                    TransferType: '', // 出库单业务类型
                    UpSheet: [], // 上游单据编号，数组
                },
                initQuery: '',   // 将查询条件储存为字符串,方便切断与query的联系,并重置
            }
        },
        vuex: {
            getters: {
                account: getters.getAccount
            },
            actions: {
                updateAccount: actions.updateAccount
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
                this.status = 'dsdsds';
            },
            /**
             * 如果当前页面没有保存数据,则切换时初始化数据
             * @param name 路由name值
             */
            initData: function (name) {
                // 初始化分页信息
                if (!this.pagination[name]) {
                    this.$set('pagination.' + name,{
                        all: 0,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                    });
                }
                // 初始化数据
                if (!this.outstockLists[name]) {
                    this.$set('outstockLists.' + name, []);
                }
            },
            /**
             * 查询出库单
             */
            queryOutStockInfo: function () {
                var self = this;
                var status = this.status;
                var pagination = this.pagination[status];
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/ErpQueryOutStockInfo',
                    data: {
                        PageSize: pagination.pageSize,
                        PageNumber: pagination.cur,
                        SearchWhere: this.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.outstockLists[status] = [];
                        var outstockLists = result.Data.PageData;
                        if (outstockLists.length > 0) {
                            pagination.all = result.Data.TotalPages;
                            pagination.totalRecords = result.Data.TotalRecords;
                            outstockLists.forEach(function (item) {
                                item.checked = false;
                            });
                            self.outstockLists[status] = outstockLists;
                        }
                    }
                })
            },
            /**
             * 搜索
             */
            search: function () {
                var status = this.status;
                if (this.pagination[status].cur == 1) {
                    this.queryOutStockInfo();
                } else {
                    this.pagination[status].cur = 1
                }
            },
            /**
             * 重置表单
             */
            resetForm: function () {
                var status = this.query.Status;
                this.query = JSON.parse(this.initQuery);
                this.query.Status = status;
            },
            //获取基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                //获取所有仓库
                servers.getBaseData('StockList', false, function (val) {
                    baseLookUp.stockLists = val;
                });
                //快递公司
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.payLists = val;
                });
                //业务类型
                servers.getBaseData('TransferType',false,function (val) {
                    baseLookUp.transferType = val;
                });
            }
        },
        events: {
            'page-change': function () {
                if (this.pageInfo.isChangeTab) {
                    this.pageInfo.isChangeTab = false;
                } else {
                    this.queryOutStockInfo();
                }
            },
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                // 如果不是定义好的路由,不能进入页面
                if (['outstockNotify','outstockPick','outstockScan','outstockWeigh','outstockFinish','outstockCancel'].indexOf(name) > -1) {
                    // 将初始值传换为字符串保存到initQuery,以便reset恢复
                    this.initQuery = JSON.stringify(this.query);
                    // 初始化数据
                    this.initData(name);
                    this.status = name;
                    if (this.outstockLists[name].length == 0) {
                        this.queryOutStockInfo();
                    }
                    transition.next();
                } else {
                    transition.abort();
                }
            },
        },
        ready: function () {
            // 获取基础数据
            this.getBaseLookUp();
        },
        computed: {
            status: {
                get: function () {
                    return this.$route.name;
                },
                set: function (status) {
                    var query = this.query;
                    switch (status) {
                        case 'outstockNotify':
                            query.Status = [0];
                            break;
                        case 'outstockPick':      // 拣货单
                            query.Status = [10];
                            break;
                        case 'outstockScan':   // 扫描
                            query.Status = [90];
                            break;
                        case 'outstockWeigh':   // 称重
                            query.Status = [92];
                            break;
                        case 'outstockFinish':   // 已完成
                            query.Status = [100];
                            break;
                        case 'outstockCancel':   // 已取消
                            query.Status = [97,98];
                            break;
                        default:
                                query.Status = [10];
                    }
                }
            }
        },
        watch: {
            status: function (status) {
//                console.log(status);
            }
        },
        components: {
            datePicker: require('../../components/date_picker.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .order-margin{
        border: 1px solid #e5e5e5;
        border-top:none;
        .table-condensed{
            border-left:1px solid #e5e5e5 ;
            border-right:1px solid #e5e5e5 ;

        }
        .row{
            margin:0;
        }
        .sheet-tab{
            margin-left:-15px;
        }
    }
</style>
