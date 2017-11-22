<style rel="stylesheet/less" lang="less" >



</style>

<template>

    <div class="container-fluid">
        <div class="operate-form-title">
            <p>返点结算</p>
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">

                <div class="checkbox-group">

                    <div class="checkbox-list">
                    </div>
                    <!-- <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a> -->
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}" style="overflow: inherit;">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>经销商</label>
                        <input type="text" class="form-control" v-model="query.CustomerName">
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">已全部返点</label>
                        <select class="form-control" v-model="query.Flag">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">代理等级</label>
                        <select class="form-control" v-model="query.CustomerGradeID">
                            <option value="">不限</option>
                            <option v-for="opt in customerGradeList" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">直属公司</label>
                        <select class="form-control" v-model="query.IsCompany">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>发生时间</label>
                        <date-picker :start-date.sync="query.BeginTime" :end-date.sync="query.EndTime"></date-picker>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <label>批量操作：</label>
                            <a href="javascript:void(0)" class="btn btn-default" @click="rebatesOp([], 100)">批量返点</a>
                            <!--<a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">批量禁用</a>-->
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state">
                                        <input type="checkbox" v-model="selectAll">
                                    </th>
                                    <th>代理</th>
                                    <th>待返金额</th>
                                    <th>累计返还</th>
                                    <th>已全部返点</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="rebate in rebates" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state">
                                        <input type="checkbox" v-model="rebate.checked">
                                    </td>
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{rebate.CustomerID}}">
                                        <span class="iconfont icon-alter"></span><span>{{rebate.CustomerName}}</span>
                                    </td>
                                    <td>{{rebate.AccValue}}</td>
                                    <td>{{rebate.TotalAmount}}</td>
                                    <td class="state-forbid">{{rebate.Flag === 1 ? '是':'否'}}</td>
                                    <td>
                                        <a @click="returnRecord(rebate.CustomerID, 0)" data-toggle="tooltip" data-placement="top" title="返还记录">
                                            <span class="click-element iconfont icon-look"></span>
                                        </a>
                                        <a data-toggle="tooltip" data-placement="top" title="提成记录">
                                            <span @click="returnRecord(rebate.CustomerID, 1000)" class="click-element iconfont icon-combo"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="sheet-list-detail">
                                    <td colspan="14">
                                        <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{ rebate.CustomerID}}">
                                            <div class="sheet-detail-wrap">
                                                <table class="table table-condensed">
                                                    <thead>
                                                    <tr>
                                                        <th>代理等级</th>
                                                        <th>微信号</th>
                                                        <th>真实姓名</th>
                                                        <th>手机号</th>
                                                        <th>身份证</th>
                                                        <th>代理地区</th>
                                                        <th>收款银行</th>
                                                        <th>收款账号</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="item in rebate.DistributorPointInfoDetail">
                                                        <td>{{item.GradeName}}</td>
                                                        <td>{{item.Wechat}}</td>
                                                        <td>{{item.LinkMan}}</td>
                                                        <td>{{item.Mobile}}</td>
                                                        <td>{{item.CertNo}}</td>
                                                        <td>{{item.RegionName}}</td>
                                                        <td>{{item.Bank}}</td>
                                                        <td>{{item.AcctNo}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="rebates.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import servers from '../../../../js/servers/servers';

const NProgress = servers.NProgress;

import commonMethods from '../../../../js/common';

import datePicker from '../../../../components/date_picker.vue';

export default {
    data: function() {
        return {
            show: {
                flog: false
            },
            paginationOptions: {
                all: 1,
                cur: 1,
                pageSize: 15,
                totalRecords: 0
            },
            query: {
                CustomerName: '',
                BeginTime: '',
                EndTime: '',
                Flag: '',
                IsCompany: '',
                CustomerGradeID: ''
            },
            customerGradeList: [],
            rebates: []
        }
    },
    methods: {
        //收展多余的选项
        toggleItem() {
                this.show.flog = !this.show.flog;
            },

            // 代理等级
            getCustomerGradeList() {
                var self = this;
                servers.getAjax.bind(this) ({
                    url: '/BaseLookup/GetBasCustomerGradeList'
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.customerGradeList = result.Data;
                    }
                })
            },
            //重置列表
            resetting() {
                this.query = {
                    CustomerName: '',
                    BeginTime: '',
                    EndTime: '',
                    Flag: '',
                    IsCompany: '',
                    CustomerGradeID: ''

                }
            },
            //搜索
            getSearchList() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorPoint/ErpQueryDistributorPoint',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query,

                    }
                }).done(function(result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var rebates = result.Data.PageData;
                        self.rebates = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (rebates.length > 0) {
                            rebates.forEach(function(rebate) {
                                rebate.checked = false;
                            });
                            self.rebates = rebates;
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '结果为空'
                            });
                        }
                    }
                });
                // 伪造数据
                // this.rebates = [{
                //     AccValue: '123',
                //     CustomerName: '这是一个悲伤的故事',
                //     DistributorPointInfoDetail: {},
                //     Flag: 0,
                //     TotalAmount: '2344',
                // }]
            },
            //搜索
            search() {
                if (this.paginationOptions.cur == 1) {
                    this.getSearchList();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            /**
             * 返回记录或者提成记录
             * @param {String} customerID 明细id
             * @param {Number} type       需要进入的页面类型; 0: 返点记录 1000: 提成记录
             */
            returnRecord(customerID, type) {
                 const routeName = type === 0 ? 'returnRecord' : 'rebateRecord';
            //    const routeName = 'returnRecord';
                this.$route.router.go({
                    name: routeName,
                    query: {
                        BeginTime: this.query.BeginTime,
                        EndTime: this.query.EndTime,
                        CustomerID: customerID,
                        SheetType: type,
                    },
                });
            },

            //批量返点
            rebatesOp() {
                var self = this;
				this.$dispatch('transmit','tip',{
					name: '提示:',
					contentText: '确定要给勾选的代理返点吗?',
					btnName: '确定',
					events: {
						confirm: 'rebatesOp'
					}
				});
                this.$off('rebatesOp');

                this.$once('rebatesOp',function () {
					// 过滤之后的数组
					var list = [];


					var arr = this.checkedGroups;
					if (arr.length === 0) return this.$dispatch('transmit', 'tip', {
						contentText: '请先选择代理!'
					});

					// 批量审核时过滤掉状态不为零的订单
					var bt = this.query.BeginTime;
					var et = this.query.EndTime;

					if (bt===''){
						bt = null;
					}

					if (et===''){
						et = null;
					}


					for (var i in arr) {
						if (arr[i].Flag === 0) {
							arr[i].BeginTime = bt;
							arr[i].EndTime = et;
							list.push(arr[i]);

						}
					}

					if (list.length === 0) return this.$dispatch('transmit', 'tip', {
						contentText: '当前选择的所有代理已经完成相关操作'
					})
					servers.postAjax.bind(this)({
						url: '/BasDistributorPoint/ErpBatchSettlement',
						contentType: 'application/json',
						data: JSON.stringify(list),
					}).then((result) => {
                        if (result.ResultCode === 1) {
                            this.$dispatch('transmit', 'tip', {
                                contentText: '操作成功'
                            });
                            self.$dispatch('transmit', 'page-change');
                        }
                    })

				});



            },
    },
    computed: commonMethods.selectAll('this.rebates', function(item) {
        return item;
    }),
    events: {
        'page-change': function () {
            this.getSearchList();
        },
    },
    components: {
        pagination: require('../../../../components/pagination.vue'),
        datePicker,
    },
    //在进入页面的时候先获取数据
    route: {
        data(transition) {
            //获取列表
            this.getSearchList();
            this.getCustomerGradeList();
            transition.next();
        }
    },
};

</script>

<style rel="stylesheet/less" lang="less">
    .batch-operation {
        border: none;
    }
</style>
