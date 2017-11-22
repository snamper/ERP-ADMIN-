<!-- 代理审核 -->
<template>
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
        <div class="sheet-list" style="border-top: none;">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a class="sheet-tab-link" v-for="tab in checkListTabs" :class="{'active': $index === tabIndex}" @click="changeTabIndex($index)">{{tab.name}}</a>
                        </div>
                    </div>
                </div>
                <div v-for="checkTab in checkListTabs">
                    <tables :index="$index" :query.sync="query" :table="checkTab" :chooses="tabIndex"></tables>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import servers from '../../../js/servers/servers';

import tables from './checkListTable.vue';

export default {
    data() {
        return {
            customerGradeList: [],
            query: {
                CustomerGradeID: '',
                Flag: '',
                Wechat: '',
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
        tables,
    },
    methods: {
        changeTabIndex(index) {
            this.tabIndex = index;
        },
        resultForm() {
            this.query = {
                CustomerGradeID: '',
                Flag: '',
                Wechat: '',
            };
        },
        getCustomerGradeList() {
            servers.NProgress.start();
            servers.getAjax({
                url: '/BaseLookup/GetBasCustomerGradeList',
            }).then((result) => {
                this.customerGradeList = result.Data;
                servers.NProgress.done();
            });
        },
        queryList() {
            this.$broadcast('page-change');
        },
    },
};

</script>

<style lang="less">
    .sheet-tab{
        a {
            cursor: pointer;
        }
    }
</style>
