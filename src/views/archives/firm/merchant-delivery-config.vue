<template>
    <div class="query-form">
        <div class="query-header">
          <h3>配置接口</h3>
        </div>
        <div class="query-body form-inline query-detail">

            <div class="row" v-for="api in form.Params">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>参数名称 {{$index}}</label>
                    <input type="text" class="form-control" placeholder="" v-model="api.name">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>值</label>
                    <input type="text" class="form-control" placeholder="" v-model="api.value">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>描述</label>
                    <input type="text" class="form-control" placeholder="" v-model="api.note">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <button @click="addApi" style="margin: 0 auto 10px; display: block;" type="button" name="button" class="btn btn-defult">新增API</button>
                </div>
            </div>
            <div class="query-button-group">
                <a @click="submit" href="javascript:void(0)" class="btn btn-default">保存</a>
                <a href="#!/merchant-deliveries" class="btn btn-default">返回列表</a>
            </div>
        </div>
    </div>
    <!-- <div class="show-json">
        {{form | json}}
    </div> -->
</template>
<script>
    var servers = require('../../../js/servers/servers');
    module.exports = {
        methods: {
            // 提交接口配置项
            submitData: function () {
                var self = this,
                    data = {
                        Params: []
                    };

                data.MerchantDeliveryID = self.form.MerchantDeliveryID;
                for (var i in self.form.Params){
                    if (self.form.Params[i].name != '') {
                        data.Params.push(self.form.Params[i]);
                    }
                }
                data.Params = JSON.stringify(data.Params);

                servers.NProgress.start();
                servers.postAjax({
                    url: '/BasMerchantDelivery/ErpSaveInterface',
                    data: data,
                    success: function (data) {
                        servers.NProgress.done();
                        self.$dispatch('transmit', 'tip', {contentText: '配置成功!'});
                    }
                });
            },
            submit: function () {
                this.submitData();
            },
            addApi: function () {
                this.form.Params.push({
                    name: '',
                    value: '',
                    note: ''
                })
            }
        },
        data: function () {
            return {
                form: {
                    MerchantDeliveryID : '',
                    Params : []
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                this.form.MerchantDeliveryID = transition.to.query.MerchantDeliveryID;
                console.log(this.form.MerchantDeliveryID);    
                // 先获取本来的接口
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMerchantDelivery/ErpQueryInterface',
                    data: {
                        MerchantDeliveryID: this.form.MerchantDeliveryID
                    },
                    success: function (data) {
                        if (data.ResultCode == 1) {
                            servers.NProgress.done();
                            data.Data.Params = JSON.parse(data.Data.Params)
                            self.form = data.Data;
                            if (!self.form.Params) self.form.Params = [];
                        }
                    }
                })
            },
        },
    }
</script>
