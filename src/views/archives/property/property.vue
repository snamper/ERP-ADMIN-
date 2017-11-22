<template>
    <div class="container-fluid">
        <div class="unify-head">
            商品{{pageInfo.text}}
        </div>
        <div class="query-form">
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
                        <label class="form-group-text">状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value=1>启用</option>
                            <option value=0>禁用</option>
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
                            <a v-link="'/property-add/' + pageInfo.propertyName" class="btn btn-default">新增</a>
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
                                <th>{{pageInfo.text}}编码</th>
                                <th>{{pageInfo.text}}名称</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sheet-list-item" v-for="property in properties">
                                <td class="sheet-item-state"><input type="checkbox" v-model="property.checked"></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{ property.Code }}">{{ property.Code }}</span></td>
                                <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{ property.Name }}">
                                {{ property.Name | truncationString }}
                                </span>
                                </td>
                                <td>
                                <span data-toggle="tooltip" data-placement="top" title="{{ property.Note }}">{{ property.Note | truncationString }}
                                </span>
                                </td>
                                <td :class="{'state-forbid' : property.Status != 1 }" >{{ property.Status == 1 ? '启用' : '禁用' }}</td>
                                <td>
                                    <a v-link="'/property-edit/' + pageInfo.propertyName + '?PropertyID=' + property.PropertyID + '&Code=' + property.Code + '&Name=' + property.Name + '&Status=' + property.Status + '&Note=' + property.Note" data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                                    <a @click="updateStatus(1,property.PropertyID)" href="javascript:void(0)" v-if="property.Status != 1" data-toggle="tooltip" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="updateStatus(0,property.PropertyID)" href="javascript:void(0)" v-if="property.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="properties.length == 0 && $loadingRouteData " class="no-data">没有可供显示的结果</div>
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
    var globalConstants = require('../../../globalConstants');
    var commonMethods = require('../../../js/common');
    var propertyPageInfo = globalConstants.propertyPageInfo;
    module.exports = {
        data: function () {
            return {
                //页面信息
                pageInfo: {
                    propertyName: '',
                    text: '',
                    propertyTypeID: '',
                    fileType: ''  //批量新增文件类型
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                //查询条件
                query: {
                    PropertyTypeID: '',
                    Code: '',
                    Name: '',
                    Status: ''
                },
                properties: [],
            }
        },
        methods: {
            resetForm: function () {
                this.query = {
                    PropertyTypeID: this.query.PropertyTypeID,
                    Code: '',
                    Name: '',
                    Status: ''
                }
            },
            uploadFile: function () {
                this.$dispatch('transmit','uploadModalShow',this.pageInfo.fileType);
            },
            getIDGroup: function (DeptID) {
                var IDGroup = [];
                if (DeptID) {
                    IDGroup.push(DeptID);
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
            //获取分类数据
            getProperty: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasProperty/ErpQueryProperty',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.properties = [];
                        var properties = result.Data.PageData;
                        if (properties.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            properties.forEach(function (item) {
                                item.checked = false;
                            });
                            self.properties = properties;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                    }
                });
            },
            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getProperty();
                } else {
                    this.paginationOptions.cur = 1
                }
            },
            //启用禁用
            updateStatus: function (status,DeptID) {
                var self = this;
                var text = '';
                if (status == 1) {
                    text = '启用';
                } else {
                    text = '禁用';
                }
                //确认提示
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要' + text + '这些属性吗?',
                    btnName: text,
                    events: {
                        confirm: 'updateStatus'
                    }
                });
                self.$off('updateStatus');

                self.$once('updateStatus',function () {
                    var choiceProperty = self.getIDGroup(DeptID);
                    if (choiceProperty.length > 0) {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasProperty/UpdateStatus',
                            data: {
                                PropertyIDList: choiceProperty,
                                Status: status
                            }
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: text + '成功!'
                                });
                                self.getProperty();    //启用禁用成功,重新刷新列表
                            }
                        });
                    }
                });
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getProperty();
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var propertyName = transition.to.params.propertyName;   //获取商品属性名
                var propertyTypeAndText = propertyPageInfo[propertyName];   //获取此商品属性的类型ID和商品属性文本
                if ( propertyTypeAndText ) {                   //商品属性类型ID和商品属性文本存在
                    self.pageInfo.propertyName = propertyName;     //将商品属性名存入页面,方便写链接
                    self.paginationOptions.path =  propertyName;   //将路径设为当前商品属性的路径
                    self.pageInfo.text = propertyTypeAndText.text;  //根据商品属性名更改页面文字
                    self.query.PropertyTypeID = self.pageInfo.propertyTypeID = propertyTypeAndText.propertyTypeID;   //获取商品属性ID
                    self.pageInfo.fileType = propertyTypeAndText.type;  //上传文件的类型
                } else {  //如果该商品属性不存在,则跳转页面
                    transition.redirect('/')
                }

                //获取数据
                this.getProperty();
            }
        },
        computed: commonMethods.selectAll('this.properties', function (item) {
            return item.PropertyID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>