<template>
    <div v-show="index === chooses">
        <div class="col-lg-12">
            <div class="batch-operation">
                <label v-if="index === 1" class="batch-operation-title">批量操作:</label>
                <div class="batch-operation-group">
                    <a v-if="index === 1" @click="operationAgents(100)" class="btn btn-default" href="javascript:void(0)">同意</a>
                    <a v-if="index === 1" @click="operationAgents(97)" class="btn btn-default" href="javascript:void(0)">驳回</a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive">
                <table class="table table-condensed">
                    <thead class="sheet-list-header">
                    <tr>
                        <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                        <!-- <th>客户ID</th> -->
                        <th>申请等级</th>
                        <th>发展等级</th>
                        <th>上级编号</th>
                        <th>真实姓名</th>
                        <th>微信号</th>
                        <th>手机</th>
                        <th>身份证</th>
                        <th>代理地区</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-for="check in checkList">
                    <tr class="sheet-list-item">
                        <td><input type="checkbox" name="" value="" v-model="check.checked"></td>
                        <!-- <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{check.CustomerID}}"></td> -->
                        <td class="show-detail-ctrl collapsed" @click="queryCheckInventorys(check.CustomerID, $index)" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{check.CustomerID + $index}}">
                            <span class="iconfont"></span><span>{{check.CustomerGradeName}}</span>

                        </td>
                        <td>
                            {{check.ParentCustomerGradeName}}
                        </td>
                        <td>
                            {{check.ParentCustomerCode}}
                        </td>
                        <td>
                            {{check.LinkMan}}
                        </td>
                        <td>
                            {{check.Wechat}}
                        </td>
                        <td>
                            {{check.Mobile}}
                        </td>
                        <td>
                            {{check.CertNo}}
                        </td>
                        <td>
                            {{check.Country||''}}{{(check.State || '') + (check.City || '') + (check.District || '') + (check.Address || '')}}
                        </td>
                        <td>
                            {{check.ApplyTime.split('T')[0]}}
                        </td>
                        <td>
                            <!-- 当状态为1时，上级分销商通过，显示操作按钮 -->
                            <a @click="seeProcess(check.DistributorUpgradeApplyID)" href="javascript:void(0)" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="流程"><span class="iconfont icon-look"></span></a>
                        </td>
                    </tr>
                    <tr class="sheet-list-detail">
                        <td colspan="14">
                            <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{check.CustomerID + $index}}">
                                <div class="sheet-detail-wrap">
                                    <table class="table table-condensed">
                                        <thead>
                                        <tr>
                                            <th>商品</th>
                                            <th>SKU</th>
                                            <th>商品名称</th>
                                            <th>尺码</th>
                                            <th>颜色</th>
                                            <th>现有库存</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="inventory in check.inventorys">
                                            <!-- <td><span data-toggle="tooltip" data-placement="top" title="{{order.GoodsName}}">{{list.GoodsName | truncationString}}</span></td> -->
                                            <!-- <td><span data-toggle="tooltip" data-placement="top" title="{{order.BrandIDName}}">{{list.BrandIDName | truncationString}}</span></td> -->
                                            <td>{{inventory.CustomNo}}</td>
                                            <td>{{inventory.SKU}}</td>
                                            <td>{{inventory.GoodsName}}</td>
                                            <td>{{inventory.Size}}</td>
                                            <td>{{inventory.Color}}</td>
                                            <td>{{inventory.Qty}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <pagination :pagination-options.sync="paginationOptions"></pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import commonMethods from '../../../js/common';

    import servers from '../../../js/servers/servers';

    import pagination from '../../../components/pagination.vue';

    export default{
        name: 'superiorCheckListTable',
        data(){
            return{
                selectAll: false,
                checkList: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0,
                },
            }
        },
        props: [
            'index', // 当前表格的索引
            'table', // 表格对象
            'chooses', // 选择的索引
            'query', // 查询表单对象
        ],
        computed: commonMethods.selectAll('this.checkList', function (item) {
            return item.DistributorUpgradeApplyID;
        }),
        components:{
            pagination,
        },
        events: {
            'page-change': function () {
                if (this.chooses == this.index) {
                    this.queryList(true);
                }
            },
        },
        watch: {
            'chooses': function () {
                if (this.chooses == this.index) {
                    this.queryList(false);
                }
            }
        },
        methods: {
            /**
             * 查询审核的商品库存列表
             * @param {String} customerID 客户ID
             * @param {Number} index      索引
             */
            queryCheckInventorys(customerID, index) {
                if (this.checkList[index].inventorys.length !== 0 ) return;
                if (!this.checkList[index].canQueryInventorys) return;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusDistributorCart/ErpBusRepGoodsListByCustomerID',
                    data: {
                        CustomerID: customerID,
                    },
                }).then((result) => {
                    servers.NProgress.done();
                    if (result.ResultCode === 1) {
                        this.checkList[index].inventorys = result.Data;
                        this.checkList[index].canQueryInventorys = false;
                    }
                });
            },
            /**
             * 操作代理单条或者列表
             * @param {Number} status 状态码
             */
            operationAgents(status) {
                const list = this.checkedGroups;
                if (list.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                const text = status === 97 ? '驳回' : '同意';
                const url = status === 97 ? '/BusDistributorUpgradeApply/ErpCompanyCancelBatch' : '/BusDistributorUpgradeApply/ErpCompanyCheckBatch';
                // 如果没有勾选任何一项时提示用户应该勾选一项再进行相关操作
                // 如果有勾选的项目时，则警告用户是否继续操作，因为当前操作不可逆
                // 警告之后，用户点击同意则派发事件返回此处，将数据提交至后端
                if (list.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '您没有勾选任何需要审核的项目, 无法继续操作',
                    });
                } else {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: `确定${text}这个吗？`,
                        events: {
                            confirm: 'cancelAgents',
                        }
                    });
                }
                console.log(typeof JSON.stringify(list));
                this.$off('cancelAgents');
                this.$once('cancelAgents', () => {
                    // 展示进度条
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: url,
                        contentType: 'application/json',
                        data: JSON.stringify(list)
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            this.$dispatch('transmit', 'tip', {
                                name: '提示',
                                contentText: `${text}成功！`,
                            });
                            this.queryList(true);
                        };
                    });
                })
            },
            queryList(type) {
                if (!type && this.paginationOptions.cur !== 1) return this.paginationOptions.cur = 1;
                let flag = 0;
                switch (this.index) {
                    case 0:
                        flag = 0;
                        break;
                    case 1:
                        flag = 1;
                        break;
                    case 2:
                        flag = 100;
                        break;
                    case 3:
                        flag = 97;
                        break;
                }
                this.query.Flag = flag;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusDistributorUpgradeApply/ErpCompanyBusDistributorApply',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: this.query
                    },
                }).then((result) => {
                    servers.NProgress.done();
                    if (result.ResultCode === 1) {
                        for (var index = 0; index < result.Data.PageData.length; index++) {
                            result.Data.PageData[index].checked = false;
                            result.Data.PageData[index].inventorys = [];
                            result.Data.PageData[index].canQueryInventorys = true;
                        }
                        this.checkList = result.Data.PageData;
                        this.paginationOptions.totalRecords = result.Data.TotalRecords;
                        this.paginationOptions.all = result.Data.TotalPages;
                    }
                });
            },
            seeProcess(distributorUpgradeApplyID) {
                this.$route.router.go({
                    name: 'agentSuperiorCheckProcess',
                    query: {
                        DistributorUpgradeApplyID: distributorUpgradeApplyID,
                    },
                });
            },
        },
    }
</script>
