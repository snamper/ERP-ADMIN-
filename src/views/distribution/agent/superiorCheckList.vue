
<template>
    <!-- <div class="operate-form-title">
        <p>
            升级审核
        </p>
    </div> -->
    <div class="container-fluid container-fluid-margin">
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>微信号</label>
                        <input v-model="query.Wechat" type="text" class="form-control" placeholder="微信号">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">发展等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="customerGrade in customerGradeList" value="{{customerGrade.CustomerGradeID}}">{{customerGrade.Name}}</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group">
                    <a @click="queryList" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a class="sheet-tab-link" v-for="tab in checkListTabs" :class="{'active': $index === tabIndex}" @click="changeTabIndex($index)" href="javascript:void (0)">{{tab.name}}</a>
                        </div>
                    </div>
                </div>
                <div v-for="checkTab in checkListTabs">
                    <super-table :index="$index" :query.sync="query" :table="checkTab" :chooses="tabIndex"></super-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import commonMethods from '../../../js/common';

import servers from '../../../js/servers/servers';

import pagination from '../../../components/pagination.vue';

import table from './superiorCheckListTable.vue';

export default {
    name: 'superiorCheckList',
    data() {
        return {
            // 审核的某一个项目的商品库存列表
            checkInventorys: [],
            customerGradeList: [],
            query: {
            },
            tabIndex: 0,
            checkListTabs: [{
                tables: [],
                name: '申请中',
            }, {
                tables: [],
                name: '上级已审',
            }, {
                tables: [],
                name: '已完成',
            }, {
                tables: [],
                name: '已取消',
            }],
        };
    },
    ready() {
        this.getCustomerGradeList();
    },
    components: {
        superTable: table,
    },
    methods: {
        changeTabIndex(index) {
            this.tabIndex = index;
        },
        getCustomerGradeList() {
            servers.getAjax({
                url: '/BaseLookup/GetBasCustomerGradeList',
            }).then((result) => {
                this.customerGradeList = result.Data;
            })
        },
        resultForm() {
            this.query = {};
        },
        queryList() {
            this.$broadcast('page-change');
        },
    },
};

</script>
