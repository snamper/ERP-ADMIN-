<template>
    <div class="container-fluid">
        <div class="unify-head">
            快递公司
        </div>
        <div class="query-form" @keyup.enter.stop="search">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>编码</label>
                        <input v-model="query.Code" type="text" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option value="" selected>不限</option>
                            <option value=1>启用</option>
                            <option value=0>禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>所属快递</label>
                        <select class="form-control" v-model="query.DeliveryID">
                            <option value="" selected>不限</option>
                            <option v-for="deliveryList in baseLookUp.deliveryList" value="{{deliveryList.DeliveryID}}">{{deliveryList.Name}}</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetForm">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <a v-link="{name:'merchant-delivery-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a @click="updateStatus(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="updateStatus(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th><span>快递编码</span></th>
                                <th>快递名称</th>
                                <th>所属快递</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="delivery in deliveries">
                                <td class="sheet-item-state"><input type="checkbox" v-model="delivery.checked"></td>
                                <td><span>{{delivery.Code}}</span></td>
                                <td class="sheet-item-remark" ><span data-toggle="tooltip" data-placement="top" title="{{delivery.Name}}">{{delivery.Name | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{delivery.Delivery.Name}}">{{delivery.Delivery.Name}}</span></td>
                                <td :class="[ delivery.Status == 1 ? '' : 'state-forbid']">{{delivery.Status == 1 ? '启用' : '禁用'}}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{delivery.Note}}">{{delivery.Note}}</span></td>
                                <td>
                                    <a v-link="'/merchant-delivery-edit?MerchantDeliveryID=' + delivery.MerchantDeliveryID + '&Code=' + delivery.Code + '&DeliveryID=' + delivery.DeliveryID + '&DeliveryType=' + delivery.DeliveryType + '&OrderNo=' + delivery.OrderNo + '&Name=' + delivery.Name + '&LinkMan='+ delivery.LinkMan +'&LinkTel='+ delivery.LinkTel +'&Note=' + delivery.Note + '&Status=' + delivery.Status" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>

                                   <!--  <a v-link="{name: 'merchant-delivery-edit', query:delivery}" data-toggle="tooltip" data-placement="top" title="修改">
                                        <span class="iconfont icon-alter"></span>
                                    </a> -->



                                    <a @click="updateStatus(0,delivery.MerchantDeliveryID)" href="javascript:void(0)" v-if="delivery.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                    <a @click="updateStatus(1,delivery.MerchantDeliveryID)" href="javascript:void(0)" v-if="!delivery.Status == 1" data-toggle="tooltip" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a v-link="'/merchant-delivery-config?MerchantDeliveryID=' + delivery.MerchantDeliveryID" data-toggle="tooltip" data-placement="top" title="配置接口"><span class="iconfont icon-interface"></span></a>
                                    <a v-link="{name: 'print-template', query:{businessType: 3,merchantDeliveryID:delivery.MerchantDeliveryID}}" data-toggle="tooltip" data-placement="top" title="运单模板"><span class="iconfont icon-template"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="deliveries.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
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
                pageInfo: {
                    fileType: 14
                },
                query: {
                    Code: '',
                    Name: '',
                    Status: '',
                    DeliveryID: ''
                },
                //快递类型
                deliveryIDs: [],
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                //所有快递公司
                baseLookUp: {
                    deliveryList: []
                },
                deliveries: []
            }
        },
        methods: {
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            getIDGroup: function (ItemID) {
                var IDGroup = [];
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一个属性'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //启用禁用
            updateStatus: function (status,ItemID) {
                var self = this;
                var text = '';
                if (status == 1) {
                    text = '启用';
                } else {
                    text = '禁用';
                }
                //确认提示
                var choiceMerchantDeliveries = self.getIDGroup(ItemID);
                if (choiceMerchantDeliveries.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些属性吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatus'
                        }
                    });
                }
                self.$off('updateStatus');

                self.$once('updateStatus',function () {
                        //发送启用禁用请求
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasMerchantDelivery/UpdateStatus',
                        data: {
                            IDList: choiceMerchantDeliveries,
                            Flag: status
                        }
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: text + '成功!'
                            });
                            self.getMerchantDelivery();    //启用禁用成功,重新刷新列表
                        }
                    });
                });
            },
            //获取所有快递公司列表
            getMerchantDelivery: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMerchantDelivery/ErpQueryMerchantDelivery',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var deliveries = result.Data.PageData;
                        self.deliveries = [];
                        if (deliveries.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            deliveries.forEach(function (item) {
                                item.checked = false;
                            });
                            self.deliveries = deliveries;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示:',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getMerchantDelivery();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //获取下拉列表基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                servers.getBaseData('BasDeliveryList',false,function (val) {
                    baseLookUp.deliveryList = val;
                })
            },
            resetForm: function () {
                this.query = {
                    Code: '',
                    Name: '',
                    Status: '',
                    DeliveryID: ''
                }
            }
        },
        route: {
            data: function (transition) {
                this.getMerchantDelivery();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getMerchantDelivery();
            }
        },
        ready: function () {
            this.getBaseLookUp();
        },
        computed: commonMethods.selectAll('this.deliveries', function (item) {
            return item.MerchantDeliveryID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
