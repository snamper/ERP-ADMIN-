<template>
    <div class="sell-hd-fz">
        <h3>新增留言</h3>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户姓名<span class="form-required-mark">*</span></label>
                        <input v-model="form.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户电话<span class="form-required-mark">*</span></label>
                        <input v-model="form.Phone" type='text' class="form-control" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户留言<span class="form-required-mark">*</span></label>
                        <div class='input-group date input-group-plan'>
                            <textarea class="form-control" v-model="form.Message" style="margin: 5px 0;"></textarea>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <div class='input-group date input-group-plan'>
                            <textarea class="form-control" v-model="form.Note" style="margin: 5px 0;"></textarea>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="postMessage">保存</a>
                        <a href="#!/message" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
var servers = require('../../js/servers/servers');
var URL = 'http://192.168.88.47:888/Api';
module.exports = {
    data: function () {
        return {
            form: {
                Status: 1
            }
        }
    },
    ready: function () {
        // # recDate-timepicker
    },
    methods: {
        postMessage: function () {
            var self = this;

            if (this.form.Name == null) return this.$dispatch('transmit', 'tip', {contentText: '请填写姓名'});
            if (this.form.Phone == null) return this.$dispatch('transmit', 'tip', {contentText: '请填写电话'});

            servers.postAjax.bind(this)({
                url: '/BusTrialApply/ErpSaveTrialApply',
                data: this.form,
                success: function (result) {
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {contentText: '保存成功!'});
                    }
                }
            })
        }
    }
};
</script>
