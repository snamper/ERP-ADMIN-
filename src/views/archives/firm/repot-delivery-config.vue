<template>
    <div class="query-form">
        <div class="query-header">
          <h3>配置接口</h3>
        </div>
        <div class="query-body form-inline query-detail" style='border-bottom: 1px dashed gray;'>
            <div class="row" >
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>库存类型</label>
                    <input type="text" class="form-control" placeholder="" v-model="form.StockType">
                </div>
            </div>
        </div>
        <div class="query-body form-inline query-detail">
            
            <div class="row" v-for="api in form.Params">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>参数名称</label>
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
            </div>
        </div>
    </div>
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

                data.StockID = self.form.StockID;
                for (var i in self.form.Params){
                    if (self.form.Params[i].name != '') {
                        data.Params.push(self.form.Params[i]);
                    }
                }
                data.Params = JSON.stringify(data.Params);
                data.StockType = self.form.StockType;
                servers.NProgress.start();
                servers.postAjax({
                    url: '/BasStock/ErpSaveStockDetail',
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
                    StockID : '',
                    Params : [] ,
                    StockType:'',
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                this.form.StockID = transition.to.query.id; 
                // 先获取本来的接口
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasStock/ErpQueryStockDetail?StockID='+this.form.StockID,
                    success: function (data) {
                        console.info(data);
                        if(data.Data.Params!=null){
                            self.form.StockType = data.Data.StockType
                            var array = eval ("(" + data.Data.Params + ")");
                            self.form.Params= array
                        }
                        // if (data.ResultCode == 1) {
                        //     servers.NProgress.done();
                        //     data.Data.Params = JSON.parse(data.Data.Params)
                        //     self.form = data.Data;
                        //     if (!self.form.Params) self.form.Params = [];
                        // }
                    }
                })
            },
        },
    }
</script>
