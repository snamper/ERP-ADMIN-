<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>功能配置</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">商家名称<span class="form-required-mark">*</span></label>
                        <div class="monad">{{tradeEdit.Name}}</div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">功能菜单<span class="form-required-mark">*</span></label>
                        <div class="checkbox-group checkbox-group_member">
                            <div class="checkbox">
                                <label class="checkbox-inline" v-for="item in tradeEdit.MerchantMobileMenu">
                                    <input type="checkbox" v-model="item.IsHave">
                                    {{item.Name}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons tradFun-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveMenu">保存</a>
                        <a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var commonMethods = require('../../../js/common');
    var servers= require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                tradeEdit:{
                    MerchantID: '',
                    Name:'',
                    MerchantMobileMenu: []
                }

            }
        },
        methods: {
            queryMenuById: function () {
                var self = this;
                self.isDataReady =false;
                servers.postAjax({
                    url: '/SysMerchant/ErpQuerySysMerchantMobileMenuByID',
                    data: {
                        MerchantID: self.tradeEdit.MerchantID
                    }
                }).done(function(result) {
                    self.MerchantMobileMenu = []
                    if (result.ResultCode == 1) {
                        self.tradeEdit.MerchantMobileMenu = result.Data.MerchantMobileMenu;
                        self.tradeEdit.Name = result.Data.Name;
                    }
                    self.isDataReady = true;
                })
            },
            saveMenu: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpSaveSysMerchantMobileMenu',
                    data: self.tradeEdit
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功!'
                        });
                    }
                })
            }
        },

        route: {
            data: function (transition) {
                var MerchantID = transition.to.query.id;
                this.tradeEdit.MerchantID = MerchantID;

                this.queryMenuById();
            }


        },


    }
</script>

<style rel="stylesheet/less" lang="less">
    .checkbox-group_member{
        .checkbox{
            .checkbox-inline{
                input{
                    width: 20px;
                }
                margin:5px;
                line-height:18px;
                height: 28px;
            }
        }
    }
    .tradFun-form-buttons{
        margin-top:40px;
    }
</style>