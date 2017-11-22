<template>

    <div class="container-fluid" style="padding-left:0;padding-right:0;">
        <div class="unify-head">
            商品分类
        </div>
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>编码</label>
                        <input v-model="query.Code" type="text" class="form-control" placeholder="名称/关键词">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control" placeholder="名称/关键词">
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
                </div>
            </div>
        </div>
        <div class="sheet-list" style="background:#F9F9F9;">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-hd">
                        批量操作：</div>
                        <div class="batch-operation-group">
                            <a v-link="{name:'category-add'}" class="btn btn-default">新增</a>
                            <a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="updateStatus(1)">启用</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="updateStatus(0)">禁用</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="showAllCategories">全部分类</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 sheet-categories">
                    
                    <div class="sheet-list-table commodity-categories clearfix" style="margin:0 17px;">
                        <div class="col-lg-4 col-md-4  col-sm-4"  style="padding-left:0;margin-bottom:15px;">
                        <div class="w-tree">

                        <div class="sheet-categories-hd">
                        分类列表
                    </div>
                            <ul v-for="category in categories">
                                <categories-tree :categories="category" :dept-id.sync="categoryDeptID"></categories-tree>
                            </ul>
                        </div>
                        </div>
                        <div class="commodity-categories-list col-lg-6 col-md-4 col-sm-4" v-if="categoryList.length != 0" style="padding:0;">
                            <table class="table table-responsive">
                                <thead class="sheet-list-header">
                                    <tr>
                                        <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"/></th>
                                        <th>编码</th>
                                        <th>名称</th>
                                        <th>状态</th>
                                        <th>上级分类</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="sheet-list-item" v-for="category in categoryList">
                                        <td class="sheet-item-state"><input v-model="category.checked"  type="checkbox"/></td>
                                        <td>{{category.Code}}</td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{category.Name}}">{{category.Name | truncationString}}</span></td>
                                        <td :class="{ 'state-forbid': category.Status != 1 }">
                                            {{ category.Status == 1 ? '已启用' : '已禁用' }}
                                        </td>
                                        <td>
                                        <span data-toggle="tooltip" data-placement="top" title="{{category.ParentDept ? category.ParentDept.Name : '无'}}">
                                            {{category.ParentDept ? category.ParentDept.Name : '无'  | truncationString}}
                                        </span>
                                        </td>
                                        <td>
                                            <a class="toolTip" v-link="{name:'category-edit',
                                                query: {
                                                    ParentID: category.ParentID,
                                                    DeptID: category.DeptID,
                                                    Code: category.Code,
                                                    Name: category.Name,
                                                    Note: category.Note,
                                                    Status: category.Status
                                                }
                                            }" style="background:#96BEE7;" data-toggle="tooltip" data-placement="top" title="编辑"><span class="iconfont icon-alter"></span></a>
                                            <a @click="updateStatus(0,category.DeptID)" href="javascript:void(0)" v-if="category.Status==1" style="background:#BBBBBB;" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                            <a @click="updateStatus(1,category.DeptID)" href="javascript:void(0)" v-if="!category.Status==1" style="background:#7DD89D; " data-toggle="tooltip" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
    </div>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                //从接口获得的所有原始分类数据
                categoriesArray: [],
                //将从接口获得的数据转化树状JSON之后的数据
                categories: [],
                categoryDeptID: '',
                //查询条件
                query: {
                    Code: '',
                    Name: '',
                    Status: '',
                    ParentID: '',
                    DeptID: ''
                },
                //查询出来的分类结果
                categoryList: [],
                pageInfo: {
                    fileType: 10
                }
            }
        },
        methods: {
            //显示全部分类
            showAllCategories: function () {
                this.resetForm();
                this.search();
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
                        contentText: '请至少选中一个分类'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            //搜索分类
            getCategories: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDept/ErpQueryDept',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        var categoryList = result.Data.PageData;
                        self.categoryList = [];
                        if (categoryList.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            categoryList.forEach(function (item) {
                                item.checked = false;
                            });
                            self.categoryList = categoryList;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }
                    }
                });
            },
            search: function () {
                this.query.ParentID = '';
                this.query.DeptID = '';
                if (this.paginationOptions.cur == 1) {
                    this.getCategories();
                } else {
                    this.paginationOptions.cur = 1;
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
                var choiceCategory = self.getIDGroup(DeptID);
                if (choiceCategory.length > 0) {
                    //确认提示
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要' + text + '这些分类吗?',
                        btnName: text,
                        events: {
                            confirm: 'updateStatus'
                        }
                    });
                    self.$off('updateStatus');

                    self.$once('updateStatus',function () {
                            //发送启用禁用请求
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/BasDept/UpdateStatus',
                                data: {
                                    DeptIDList: choiceCategory,
                                    Status: status
                                }
                            }).done(function (result) {
                                NProgress.done();
                                if ( result.ResultCode == 1 ) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: text + '成功!'
                                    });
                                    self.getCategories();    //启用禁用成功,重新刷新列表
                                }
                            });
                    });
                }
            },
            resetForm: function () {
                //重置搜索条件
                this.query = {
                    Code: '',
                    Name: '',
                    Status: '',
                    ParentID: '',
                    DeptID: ''
                };
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                //获取分类列表
                servers.getAjax({
                    url: '/BasDept/GetList'
                }).done(function (result) {
                    self.categoriesArray = result.Data;   //保存原始数据
                    self.categories = commonMethods.transArrayToJson(result.Data,'DeptID','ParentID','children');  //将原始数据转换成树状JSON格式
                    transition.next();
                });
            }
        },
        ready: function () {
            //获取分类列表
            this.getCategories();
        },
        events: {
            /**
             * 点击左侧树状分类,获取子分类
             * @param categories {object} 点击时获取到的对应树状分类对象
             */
            'getCategoriesList': function (categories) {
                this.resetForm();
                if (categories.children) {    //如果有子分类,则用ID作为PID进行搜索,获取其分类
                    this.query.ParentID = categories.DeptID;
                } else {                    //如果没有子分类,则用ID搜索
                    this.query.DeptID = categories.DeptID;
                }
                if (this.paginationOptions.cur == 1) {
                    this.getCategories();
                } else {
                    this.paginationOptions.cur = 1;
                }
            },
            //页面改变,获取数据
            'page-change': function () {
                this.getCategories();
            }
        },
        computed: commonMethods.selectAll('this.categoryList', function (item) {
            return item.DeptID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue'),
            categoriesTree: require('../../../components/categories-tree.vue')
        }
    }
</script>




<style rel="stylesheet/less" lang="less">
    .sheet-categories {
    min-width  :870px;
    padding-top:15px;
        .pagination-group {
            margin-left: 15px;
            margin-right:15px;
        }
    }
    .commodity-categories {
        /*display: flex;*/
    }
    .commodity-categories-list {
        min-width:540px;
        border: 1px solid #E9E9E9;
        border-radius:5px;
        td{
                        a{
                            width: 20px;text-align:center;line-height:20px;border-radius:2px;height: 20px;background: #ccc;display:inline-block;color:#fff;
                        }
                    }
       
        table {
            background: #fff;
            width: 100%;
            margin: 0 auto;
                .sheet-list-header{
                    th{
                        line-height:34px;

                    }
                    
                    
                }
                

        }
    }
    .w-tree {
        /*flex: 1;*/
        background: #fff;
        padding:0;
        white-space: nowrap;
        ul {
            padding-left: 20px;
            background: #fff;
        }
        li {
            position: relative;
            padding: 10px 5px 0 5px;
            &:before,
            &:after {
                position: absolute;
                left: -20px;
                right: auto;
                content: '';
            }
            &:before {
                border-left: 1px dotted #6A91FD;
                width: 1px;
                top: -5px;
                bottom: 50px;
                height: 100%;
            }
            &:after {
                border-top: 1px dotted #6A91FD;
                height: 20px;
                top: 25px;
                width: 25px;
            }

            .commodity-categories-item {
                font-size: 14px;
                color:#4D68AD;
                display: inline-block;
                line-height: 20px;
                padding: 0 20px;
                border-radius: 5px;
                cursor: pointer;
                &.pitch-off{
                    color:#6991FF;
                }
                &.pitch-on{
                    color:#4D68AF;
                }
                em{
                    display: inline-block;
                        padding: 2px 5px;
                        border-radius: 5px;
                    border: 1px solid transparent;
                        margin-left:5px;

                }
                &.selected {
                    em{
                        border: 1px solid #BDCEFE;
                        display: inline-block;
                        padding: 2px 5px;
                        border-radius: 5px;
                }
                }

                .icon-file {
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 12px;
                    transition: 0.2s;
                    &.collapsed {
                        transform: rotate(-90deg);
                    }
                }

                
                
            }
        }
        >ul {
            >li {
                &:before,
                &:after {
                    border: none;
                }
            }
        }


        .commodity-categories-info {
            display: inline-block;
            span {
                padding-left: 15px;
            }
            a {
                padding-left: 15px;
            }
        }
    }
.batch-operation{
    border-bottom: 1px solid #E5E5E5;
    padding: 16px 20px 6px;
}
.batch-operation-hd{
    color:#4D68AD;
    font-size: 14px;
    line-height:29px;
}
.sheet-categories-hd{
    font-size: 14px;
    color:#222939;
    line-height:44px;
    text-indent:1em;
    background: #E3F0FE;
    margin-bottom:10px;

}
.w-tree{
    border: 1px solid #E9E9E9;
    border-radius:5px;

}


.w-tree{
    .iconfont{
    margin-left:-26px;
    margin-top:7px;
}
}


.pagination .iconfont{
    margin-left:-5px;

}

.sheet-list-header tr{
    background: #ecefff;
}

.sheet-list-item td{
    background:none;
}
.pagination-perPageNum select{
    border: 1px solid #E4E4E4;
}



</style>