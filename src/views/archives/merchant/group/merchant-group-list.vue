<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">

                    </label>
                    <div class="checkbox-list">

                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" data-target="#query-detail">收起多余选项<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >编码</label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >组合名称</label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >SKU</label>
                        <input v-model="query.CustomBC" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品货号</label>
                        <input v-model="query.CustomNo" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >商品名称</label>
                        <input v-model="query.GoodsName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label >状态</label>
                        <select v-model="query.Status" class="form-control">
                            <option value="">不限</option>
                            <option value="1">启用</option>
                            <option value="0">禁用</option>
                        </select>
                    </div>
                </div>
                <div class="query-button-group">
                    <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resetForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a v-link="{name: 'merchant-group-add'}" class="btn btn-default">新增</a>
                            <a @click="groupStatusEnable('')" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <a @click="groupStatusDisable('')" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>编码</th>
                                    <th>组合名称</th>
                                    <th>组合价</th>
                                    <th>状态</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="group in merchantGroup" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td class="sheet-item-state"><input type="checkbox" v-model="group.checked"></td>
                                    <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{group.GoodsSetID}}"><span class="iconfont"></span><span>{{group.Code}}</span></td>
                                    <td>{{group.Name}}</td>
                                    <td>{{group.Price}}</td>
                                    <td>{{group.Status ? '已启用' : '已禁用'}}</td>
                                    <td>{{group.Note}}</td>
                                    <td>
                                        <a v-link="{
                                                name:'merchant-group-edit',
                                                query: {
                                                    GoodsSetID: group.GoodsSetID
                                                }}" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                        <a v-if="group.Status == 0" @click="groupStatusEnable(group.GoodsSetID)" href="javascript:void(0)" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                        <a v-if="group.Status == 1" @click="groupStatusDisable(group.GoodsSetID)" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                    </td>
                                </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="7">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{group.GoodsSetID}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th>SKU</th>
                                                        <th>商品货号</th>
                                                        <th>商品名称</th>
                                                        <th>尺码</th>
                                                        <th>颜色</th>
                                                        <th>基本价格</th>
                                                        <th>单品价格</th>
                                                        <th>组合数量</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="GoodsSetSku in group.BasGoodsSetSku_View">
                                                        <td>{{GoodsSetSku.CustomBC}}</td>
                                                        <td>{{GoodsSetSku.CustomNo}}</td>
                                                        <td>{{GoodsSetSku.Name}}</td>
                                                        <td>{{GoodsSetSku.SizeName}}</td>
                                                        <td>{{GoodsSetSku.ColorName}}</td>
                                                        <td>{{GoodsSetSku.BasePrice}}</td>
                                                        <td>{{GoodsSetSku.Price}}</td>
                                                        <td>{{GoodsSetSku.Qty}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../../js/common');
    module.exports = {
        data: function () {
            return {
                query: {
                    Code: '',
                    CustomBC: '',
                    CustomNo: '',
                    GoodsName: '',
                    Name: '',
                    Status: ''
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                merchantGroup: []
            }
        },
        methods: {
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
                        contentText: '请至少选中一个组合'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //获取商品组合
            getMerchantGroup: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasGoodsSet/ErpQueryBasGoodsSet',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        var merchantGroup = result.Data.PageData;
                        self.merchantGroup = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (merchantGroup.length > 0) {
                            merchantGroup.forEach(function (merchantGroupItem) {
                                merchantGroupItem.checked = false;
                            });
                            self.merchantGroup = merchantGroup;
                        }
                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getMerchantGroup();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //启用
            groupStatusEnable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceGroup = self.getIDGroup(ItemID);
                if (choiceGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要启用这些组合吗?',
                        btnName: '启用',
                        events: {
                            confirm: 'groupStatusEnable'
                        }
                    });
                    self.$off('groupStatusEnable');

                    self.$once('groupStatusEnable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasGoodsSet/ErpStart',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '启用成功!'
                                });
                                self.getMerchantGroup();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            groupStatusDisable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceGroup = self.getIDGroup(ItemID);
                if (choiceGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要禁用这些组合吗?',
                        btnName: '禁用',
                        events: {
                            confirm: 'groupStatusDisable'
                        }
                    });
                    self.$off('groupStatusDisable');

                    self.$once('groupStatusDisable',function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasGoodsSet/ErpEnable',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '禁用成功!'
                                });
                                self.getMerchantGroup();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            resetForm: function () {
                this.query = {
                    Code: '',
                    CustomBC: '',
                    CustomNo: '',
                    GoodsName: '',
                    Name: '',
                    Status: ''
                }
            }
        },
        //在进入页面的时候先获取数据
        route: {
            data: function (transition) {
                //获取角色列表
                this.getMerchantGroup();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getMerchantGroup();
            }
        },
        computed: commonMethods.selectAll('this.merchantGroup', function (item) {
            return item.GoodsSetID;
        }),
        components: {
            pagination: require('../../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>