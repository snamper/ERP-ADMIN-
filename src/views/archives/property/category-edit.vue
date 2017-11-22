<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类编码<span class="form-required-mark">*</span></label>
                        <input v-model="category.Code" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类名称<span class="form-required-mark">*</span></label>
                        <input v-model="category.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">上级分类</label>
                        <select v-model="category.ParentID" class="form-control">
                            <option value="null">顶级分类</option>
                            <option v-for="parentCategory in parentCategories" value="{{parentCategory.DeptID}}" >{{parentCategory.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="category.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input v-model="category.Status" type="checkbox" :true-value="1" :false-value="0">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveCategory">保存</a>
                        <a v-link="{path: '/categories'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var globalConstants = require('../../../globalConstants');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                //所有分类
                parentCategories: [],
                category: {
                    Name: '',
                    Code: '',
                    ParentID: '',
                    Status: 1,
                    Note: '',
                    DeptID: ''
                }
            }
        },
        methods: {
            //保存更改
            saveCategory: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDept/ErpSaveDept',
                    data: self.category
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.$dispatch('transmit','tip',{
                            name: '成功保存',
                            contentText: '成功保存啦'
                        });
                        self.resetForm()
                    }
                });
            },
            //获取所有分类
            getCategoryList: function () {
                if (this.category.DeptID) {
                    this.getCategoryListByIdAjax();
                } else {
                    this.getCategoryListAjax();
                }
            },
            //查询所有分类
            getCategoryListAjax: function () {
                var self = this;
                servers.getAjax({
                    url: '/BasDept/GetList'
                }).done(function (result) {
                    self.parentCategories = result.Data;
                });
            },
            //通过ID查询所有父级分类
            getCategoryListByIdAjax: function () {
                var self = this;
                servers.postAjax({
                    url: '/BaseLookup/GetDeptList',
                    data: {
                        DeptID: self.category.DeptID
                    }
                }).done(function (result) {
                    self.parentCategories = result.Data;
                })
            },
            //清空表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return '';
                } else {
                    this.category = {
                        Name: '',
                        Code: '',
                        ParentID: '',
                        Status: 1,
                        Note: '',
                        DeptID: ''
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'category-edit') {
                    self.pageInfo.title = '修改商品分类';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if ( query.DeptID ) {
                        self.category.ParentID = query.ParentID;
                        self.category.Name = query.Name;
                        self.category.Code = query.Code;
                        self.category.Status = query.Status;
                        self.category.Note = query.Note;
                        self.category.DeptID = query.DeptID;
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.title = '新建商品分类';
                    self.pageInfo.isEdit = false;
                    self.resetForm();
                }
            }
        },
        ready: function () {
            //获取所有分类
            this.getCategoryList();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>