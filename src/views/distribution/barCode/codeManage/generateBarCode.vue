<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>生成条码</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">条码长度<span class="form-required-mark">*</span></label>
                        <input v-model="" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分隔符</label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">请选择</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照对象1<span class="form-required-mark">*</span></label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照对象2</label>
                        <input v-model="query.Bank" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照对象3</label>
                        <input v-model="query.AcctNo" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照对象4</label>
                        <input v-model="query.AcctName" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照对象5</label>
                        <input v-model="query.Account" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结果补全<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">随机数</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">小码<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">+3位随机数</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">防伪码<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">+3位随机数</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">生成数量<span class="form-required-mark">*</span></label>
                        <input v-model="query.Account" type="text" class="form-control">
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default">执行</a>
                        <a  class="btn btn-default">重置</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {

            }
        },
        methods: {

        },
        route: {

        },
        ready: function () {

        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>