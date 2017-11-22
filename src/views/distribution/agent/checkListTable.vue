<template lang="html">
    <div class="col-lg-12" v-show="index === chooses">
        <div class="batch-operation">
            <label class="batch-operation-title">批量操作:</label>
            <div class="batch-operation-group">
                <a class="btn btn-default" @click="checkAgents" v-if="index == 1">同意</a>
                <a class="btn btn-default" @click="cancelAgents" v-if="index == 1">驳回</a>
                <a class="btn btn-default" @click="addBlackList">加入黑名单</a>
            </div>
        </div>
    </div>
    <div class="col-lg-12" v-show="index === chooses">
        <div class="sheet-list-table table-responsive">
            <table class="table table-condensed">
                <thead class="sheet-list-header">
                    <tr>
                        <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                        <th>申请等级</th>
                        <th>发展等级</th>
                        <th>上级编号</th>
                        <th>真实姓名</th>
                        <th>黑名单</th>
                        <th>微信号</th>
                        <th>手机</th>
                        <th>身份证</th>
                        <th>代理地区</th>
                        <th>创建时间</th>
                        <th>推荐人</th>
                    </tr>
                </thead>
                <tbody v-for="check in checkList">
                    <tr class="sheet-list-item">
                        <td><input type="checkbox" name="" value="" v-model="check.checked"></td>
                        <td>
                            {{check.GradeName}}
                        </td>
                        <td>
                            {{check.ParentGradeName}}
                        </td>
                        <td>
                            {{check.ParentCode}}
                        </td>
                        <td>
                            {{check.LinkMan}}
                        </td>
                        <td :style="{color: check.IsBlackList == '是' ? 'red' : ''}">
                            {{check.IsBlackList}}
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
                            {{(check.StateInfo ? check.StateInfo.Name : '') + (check.CityInfo ? check.CityInfo.Name : '') + (check.DistrictInfo ? check.DistrictInfo.Name : '') + (check.Address || '')}}
                        </td>
                        <td>
                            {{check.ApplyTime.split('T')[0]}}
                        </td>
                        <td>
                            {{check.Introducer}}
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :pagination-options.sync="paginationOptions"></pagination>
        </div>
    </div>
</template>

<script type="text/javascript">
    import commonMethods from '../../../js/common';

    import servers from '../../../js/servers/servers';

    import pagination from '../../../components/pagination.vue';

    export default {
        data() {
            return {
                // 分页对象
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0,
                },
                checkList: [],
            };
        },
        props: [
            'index', // 当前表格的索引
            'table', // 表格对象
            'chooses', // 选择的索引
            'query', // 查询表单对象
        ],
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
                    this.queryList(false, false);
                }
            }
        },
        components: {
            pagination,
        },
        computed: commonMethods.selectAll('this.checkList', function (item) {
            return item.DistributorApplyID;
        }),
        methods: {
            /**
             * 查询列表
             * @param {Boolea} type 是否是通过点击页码查询
             */
            queryList(type, isClickQueryBtn = true) {
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
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusDistributorApply/ErpCompanyBusDistributorApply',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: {
                            CustomerGradeID: this.query.CustomerGradeID,
                            Wechat: this.query.Wechat,
                            Flag: flag,
                        }
                    },
                }).then((result) => {
                    servers.NProgress.done();
                    if (result.ResultCode === 1) {
                        this.checkList = [];
                        if (result.Data.PageData.length == 0 && isClickQueryBtn) {
                            return this.$dispatch('transmit', 'tip', {contentText: '没有搜索到结果'});
                        }
                        for (let i in result.Data.PageData) {
                            result.Data.PageData[i].checked = false;
                            this.checkList.push(result.Data.PageData[i]);
                        }
                        this.paginationOptions.totalRecords = result.Data.TotalRecords;
                        this.paginationOptions.all = result.Data.TotalPages;
                    }
                })
            },
            filterList(type) {
                const list = [];
                for (let j in this.checkList) {
                    for (let i in this.checkedGroups) {
                        if (this.checkList[j].DistributorApplyID === this.checkedGroups[i]) {
                            if (type == 'blackList') {
                                if (this.checkList[j].IsBlackList === '否') {
                                    list.push({
                                        BlackListID: this.checkList[j].BlackListID || '',
                                        CertNo: this.checkList[j].CertNo || '',
                                        Mobile: this.checkList[j].Mobile || '',
                                        Name: this.checkList[j].Name || '',
                                        Status: 1,
                                        Wechat: this.checkList[j].Wechat || '',
                                    });
                                }
                            } else if (type == 'checkAgents') {
                                list.push({
                                    DistributorApplyID: this.checkList[j].DistributorApplyID,
                                });
                            } else if (type == 'cancelAgents')  {
                                list.push({
                                    DistributorApplyID: this.checkList[j].DistributorApplyID,
                                })
                            }
                        }
                    }
                }
                return list;
            },
            addBlackList() {
                const list = this.filterList('blackList');
                if (list.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项或者没有选中不在黑名单内的'});
                }
                this.$dispatch('transmit', 'tip', {
                    contentText: '确定把勾选的代理商信息加入黑名单吗？',
                    events: {
                        confirm: 'addBlackList',
                    },
                });
                this.$off('addBlackList');
                this.$once('addBlackList', () => {
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorApply/ErpSaveBlackList',
                        data:  {
                            Entitys: list,
                        },
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode == 1) {
                            this.queryList(false, false);
                            this.$dispatch('transmit', 'tip', {
                                contentText: '加入成功！',
                            });
                        }
                    });
                });
            },
            cancelAgents(arr, status) {
                const list = this.filterList('cancelAgents');
                if (list.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                this.$dispatch('transmit', 'tip', {
                    contentText: '确定驳回勾选的代理商申请吗？',
                    events: {
                        confirm: 'cancelAgents',
                    },
                });
                this.$off('cancelAgents');
                this.$once('cancelAgents', () => {
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorApply/ErpBusDisCancelBath',
                        data: {
                            DistributorApply: list,
                        },
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode == 1) {
                            this.queryList(false, false);
                            this.$dispatch('transmit', 'tip', {
                                contentText: '驳回成功！',
                            });
                        }
                    });
                });
            },
            checkAgents(arr, status) { 
                const list = this.filterList('checkAgents');
                if (list.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                this.$dispatch('transmit', 'tip', {
                    contentText: '确定同意勾选的代理商申请吗？',
                    events: {
                        confirm: 'checkAgents',
                    },
                });
                this.$off('checkAgents');
                this.$once('checkAgents', () => {
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorApply/ErpCompanyCheckBatch',
                        data: {
                            DistributorApply: list,
                        },
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode == 1) {
                            this.queryList(false, false);
                            this.$dispatch('transmit', 'tip', {
                                contentText: '已审核通过！',
                            });
                        }
                    });
                });
            },
        }
    }
</script>
