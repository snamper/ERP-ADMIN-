<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">{{pageInfo.text}}编码<span class="form-required-mark">*</span></label>
                        <input v-model="property.Code" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">{{pageInfo.text}}名称<span class="form-required-mark">*</span></label>
                        <input v-model="property.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="property.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value="1" :false-value="0" v-model="property.Status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveProperty">保存</a>
                        <a v-link="'/property/' + pageInfo.propertyName" class="btn btn-default">返回列表>></a>
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
                    title: '新建',
                    propertyName: '',
                    text: '',
                    isEdit: false
                },
                //属性字段
                property: {
                    PropertyID: '',
                    Name: '',
                    Code: '',
                    PropertyTypeID: '',
                    Status: 1,
                    Note: ''
                }
            }
        },
        methods: {
            //保存属性
            saveProperty: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasProperty/ErpSaveProperty',
                    data: self.property
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.$dispatch('transmit','tip',{
                            name: '成功保存:',
                            contentText: '成功保存'
                        });
                        self.resetForm();
                    }
                });
            },
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.property = {
                        PropertyID: '',
                        Name: '',
                        Code: '',
                        PropertyTypeID: this.property.PropertyTypeID,
                        Status: 1,
                        Note: ''
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                var propertyName = transition.to.params.propertyName;  //获取属性类型名

                if (name == 'property-edit') {
                    this.pageInfo.isEdit = true;
                    this.pageInfo.title = '修改';
                    var query = transition.to.query;
                    if ( query.PropertyID ) {    //如果链接带参数,则将参数赋给属性的对应字段
                        this.property.PropertyID = query.PropertyID;
                        this.property.Name = query.Name;
                        this.property.Code = query.Code;
                        this.property.Status = query.Status;
                        this.property.Note = query.Note;
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.title = '新增';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }

                this.pageInfo.propertyName = propertyName;    //保存属性类型名
                var propertyTypeAndText = propertyPageInfo[propertyName];
                if ( propertyTypeAndText ) {
                    this.pageInfo.text = propertyTypeAndText.text;
                    this.property.PropertyTypeID = propertyTypeAndText.propertyTypeID;    //属性类型ID
                } else {
                    transition.redirect('/')
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>