<template>
    <div class="container-fluid container-fluid-margin">
        <div class="unify-head">
            返点设置
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品货号</label>
                        <input v-model="query.CustomNo" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>返点类型</label>
                        <select v-model="query.PriceType" class="form-control">
                            <option v-for="priceType in baseLookUp.priceType" value="{{priceType.code}}">{{priceType.text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>备注</label>
                        <input v-model="query.Note" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option v-for="status in baseLookUp.status" value="{{status.code}}">{{status.text}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-start'>
                                <input v-model="query.BeginTime | formatDate" type='text' class="form-control"/>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='edit-timepicker-end'>
                                <input v-model="query.EndTime | formatDate" type='text' class="form-control"/>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
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
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <a v-link="{name:'pointConfigAdd'}" class="btn btn-default">新增</a>
                            <!--<a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>-->
                            <a @click="toggleStatus(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="toggleStatus(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>层级</th>
                                <th>参照等级</th>
                                <th>客户等级</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>基本售价</th>
                                <th>返点类型</th>
                                <th>价格/折扣</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="point in pointConfigs" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state"><input type="checkbox"  v-model="point.checked"></td>
                                    <td>{{point.Level}}</td>
                                    <td>{{point.OrderGradeName}}</td>
                                    <td>{{point.GradeName}}</td>
                                    <td>{{point.CustomNo}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{point.GoodsName}}">{{point.GoodsName | truncationString}}</span></td>
                                    <td>{{point.BasePrice}}</td>
									<td>{{baseLookUp.priceType[point.PriceType+1].text}}</td>
                                    <!-- <td>{{point.PriceType ? '折扣': '固定金额'}}</td> -->
									<!-- <td>{{point.PriceType ?  (point.PriceType===1 ? '订单返点' : 商品折扣) : '固定金额'}}</td> -->
                                    <td>{{point.PriceType ? point.Point + '%': point.Point + '元'}}</td>
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{point.Note}}">{{point.Note | truncationString}}</span></td>
                                    <td>{{point.Status ? '已启用': '已禁用'}}</td>
                                    <td>{{point.Editor}}</td>
                                    <td><span v-if="point.EditTime" data-toggle="tooltip" data-placement="top" title="{{point.EditTime | truncationTimeString}}">{{point.EditTime | formatDateFormShow}}</span></td>
                                    <td>
                                        <a v-link="{name:'pointConfigEdit',query:{
                                            OrderCustomerGradeID: point.OrderCustomerGradeID || '',
                                            DistributorPointConfigID: point.DistributorPointConfigID,
                                            CustomerGradeID: point.CustomerGradeID || '',
                                            GoodsID: point.GoodsID,
                                            Level: point.Level,
                                            Note: point.Note,
                                            Point: point.Point,
                                            PriceType: point.PriceType,
                                            Status: point.Status,
                                            CustomNo: point.CustomNo
                                        }}" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                        <a @click="toggleStatus(1,point.DistributorPointConfigID)" href="javascript:void(0)" v-if="point.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                        <a @click="toggleStatus(0,point.DistributorPointConfigID)" href="javascript:void(0)" v-if="point.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                query: {
                    BeginTime: '',
                    EndTime: '',
                    CustomNo: '', // 商品货号
                    Editor: '', // 修改人
                    GoodsName: '', // 商品名称
                    Note: '', // 备注
                    PriceType: '', // 返点类型 0 固定金额，1 折扣 null 不限
                    Status: '', // 状态(0 禁用 1 启用 null 不限)
                },
                baseLookUp: {
                    status: [
                        {
                            code: '',
                            text: '不限'
                        },
                        {
                            code: 0,
                            text: '禁用'
                        },
                        {
                            code: 1,
                            text: '启用'
                        }
                    ],
                    priceType: [
                        {
                            code: '',
                            text: '不限'
                        },
                        {
                            code: 0,
                            text: '固定金额'
                        },
                        {
                            code: 1,
                            text: '订单返点'
                        },
                        {
                            code: 2,
                            text: '商品折扣'
                        }
                    ]
                },
                pointConfigs: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
            }
        },
        methods: {
            // 获取所有配置
            getPointConfig: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorPointConfig/ErpQueryPointConfig',
                    data: {
                        PageNumber: this.paginationOptions.cur,
                        PageSize: this.paginationOptions.pageSize,
                        SearchWhere: this.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.pointConfigs = [];
                        var pointConfigs = result.Data.PageData;
                        if (pointConfigs.length > 0) {
                            pointConfigs.forEach(function (item) {
                                item.checked = false;
                            })
                        }
                        self.pointConfigs = pointConfigs;
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    }
                })
            },
            // 启用禁用
            toggleStatus: function (status,ItemID) {
                var self = this;
                var choiceList = [];
                var text = '';
                //确认提示
                if (ItemID) {
                    choiceList.push(ItemID);
                } else {
                    choiceList = this.checkedGroups;
                }
                if (status == 0) {
                    text = '禁用';
                } else if (status == 1) {
                    text = '启用';
                }
                if (choiceList.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要对勾选的数据进行' + text + '吗?',
                        btnName: text,
                        events: {
                            confirm: 'toggleStatus'
                        }
                    });
                    self.$off('toggleStatus');
                    self.$once('toggleStatus',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasDistributorPointConfig/UpdateStatus',
                            data: {
                                IDList: choiceList,
                                Status: status
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.$dispatch('transmit','page-change');    //启用成功,重新刷新列表
                            }
                        });
                    });
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请至少选择一项!'
                    });
                }
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getPointConfig();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            resetForm: function () {
                this.query = {
                    BeginTime: '',
                    EndTime: '',
                    CustomNo: '', // 商品货号
                    Editor: '', // 修改人
                    GoodsName: '', // 商品名称
                    Note: '', // 备注
                    PriceType: '', // 返点类型 0 固定金额，1 折扣 null 不限
                    Status: '', // 状态(0 禁用 1 启用 null 不限)
                };
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getPointConfig();
            }
        },
        route: {
            data: function (transition) {
                this.getPointConfig();
                transition.next();
            }
        },
        ready: function () {
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#edit-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            });
            $('#edit-timepicker-end').datetimepicker({
            });
            $("#edit-timepicker-start").on("dp.change",function (e) {
                $('#edit-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#edit-timepicker-end").on("dp.change",function (e) {
                $('#edit-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        computed: commonMethods.selectAll('this.pointConfigs', function (item) {
            return item.DistributorPointConfigID;
        })
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>