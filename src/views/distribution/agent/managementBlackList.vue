
<template>
    <!-- <div class="operate-form-title">
        <p>
            黑名单管理
        </p>
    </div> -->
    <div class="container-fluid container-fluid-margin">
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>手机</label>
                        <input v-model="query.Mobile" type="text" class="form-control" placeholder="手机号">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>微信</label>
                        <input v-model="query.Wechat" type="text" class="form-control" placeholder="微信号">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control" placeholder="修改人">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>身份证</label>
                        <input v-model="query.CertNo" type="text" class="form-control" placeholder="身份证">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改时间</label>
                        <date-picker :start-date.sync="query.BeginEditTime" :end-date.sync="query.EndEditTime"></date-picker>
                    </div>
                </div>
                <div class="query-button-group">
                    <a @click="queryList" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resultForm()" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a class="btn btn-default" @click="restoreBlackList">恢复</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                                    <th>手机</th>
                                    <th>微信号</th>
                                    <th>身份证</th>
                                    <th>修改时间</th>
                                    <th>修改人</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody v-for="check in checkList">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="check.checked"></td>
                                    <td>
                                        {{check.Mobile}}
                                    </td>
                                    <td>
                                        {{check.Wechat}}
                                    </td>
                                    <td>
                                        {{check.CertNo}}
                                    </td>
                                    <td>
                                        {{check.EditTime.split('T')[0]}}
                                    </td>
                                    <td>
                                        {{check.Editor}}
                                    </td>
                                    <td>
                                        {{check.Note}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import commonMethods from '../../../js/common';

import servers from '../../../js/servers/servers';

import pagination from '../../../components/pagination.vue';

import datePicker from '../../../components/date_picker.vue';

export default {
    data() {
            return {
                checkList: [],
                selectAll: false,
                // 审核的某一个项目的商品库存列表
                checkInventorys: [],
                customerGradeList: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0,
                },
                query: {
                    BeginEditTime: '', //开始时间
                    EndEditTime: '', // 结束时间
                    CertNo: '', // 证件
                    Editor: '', // 修改人
                    Mobile: '', // 手机
                    Wechat: '', // 微信
                },
            };
        },
        computed: commonMethods.selectAll('this.checkList', function (item) {
            return item.BlackListID;
        }),
        ready() {
            this.queryList(true);
        },
        attached() {},
        components: {
            pagination,
            datePicker
        },
        events: {
            'page-change': function() {
                this.queryList(true);
            }
        },
        methods: {
            queryList(type) {
                if (!type && this.paginationOptions.cur !== 1) return this.paginationOptions.cur = 1;
                const self = this;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusDistributorApply/ErpQueryBlackList',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: self.query
                    },
                    success(result) {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            for (var index = 0; index < result.Data.PageData.length; index++) {
                                result.Data.PageData[index].checked = false;
                            }
                            self.checkList = result.Data.PageData;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            self.paginationOptions.all = result.Data.TotalPages;
                        }
                    }
                })
            },
            filterList() {
                const list = [];
                for (let j in this.checkList) {
                    for (let i in this.checkedGroups) {
                        if (this.checkList[j].BlackListID === this.checkedGroups[i]) {
                            list.push({
                                BlackListID: this.checkList[j].BlackListID || '',
                                CertNo: this.checkList[j].CertNo || '',
                                Mobile: this.checkList[j].Mobile || '',
                                Name: this.checkList[j].Name || '',
                                Status: 0,
                                Wechat: this.checkList[j].Wechat || '',
                            });
                        }
                    }
                }
                return list;
            },
            restoreBlackList() {
                if (this.checkedGroups.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                const list = this.filterList();
                this.$dispatch('transmit', 'tip', {
                    contentText: '确定恢复勾选的黑名单信息吗？',
                    events: {
                        confirm: 'restoreBlackList',
                    },
                });
                this.$off('restoreBlackList');
                this.$once('restoreBlackList', () => {
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusDistributorApply/ErpSaveBlackList',
                        data:  {
                            Entitys: list,
                        },
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode == 1) {
                            this.queryList(false);
                            this.$dispatch('transmit', 'tip', {
                                contentText: '恢复成功！',
                            });
                        }
                    });
                });
            },
            resultForm() {
                this.query = {
                    BeginEditTime: '', //开始时间
                    EndEditTime: '', // 结束时间
                    CertNo: '', // 证件
                    Editor: '', // 修改人
                    Mobile: '', // 手机
                    Wechat: '', // 微信
                };
            },
        },
};

</script>
