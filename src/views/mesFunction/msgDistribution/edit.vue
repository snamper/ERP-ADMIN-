<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>新增首字母</p>
                </div>

                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">首字母<span class="form-required-mark">*</span></label>
                        <input v-model="form.FirstWord" type="text" class="form-control dan" placeholder="首字母必须为大写英文字母，多个首字母分号(;)隔开" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">指定客服<span class="form-required-mark">*</span></label>
                        <select class="form-control dan" v-model="form.CustomServiceID">
                            <option v-for="item in servers" :value="item.CustomServiceID">{{item.Code}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="form.Note" class="form-control" rows="10"></textarea>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="btn btn-success" @click="save">保存</a>
                        <a v-link="{name : 'distribution'}" style="margin-left: 270px" class="btn btn-warning">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                servers: [],//客服列表
                //保存时的参数
                form: {
                    MessageRuleID: "",
                    MerchantID: "",
                    FirstWord: "",
                    CustomServiceID: "",
                    CustomServiceCode: "",
                    Note: ""
                },
            }
        },
        methods: {
            //查询客服下拉列表
            queryservers() {
                const self = this;
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasCustomService/GetCustomServiceList',
                    success(result) {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            self.servers = result.Data
                        }
                    }
                })

            },
            //保存新增快递及修改快递
            save: function () {
                var self = this;
                var errorMsg ='';
                var errorFlag =false;
                if(self.form.FirstWord.length>16) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-16个字符！'

                    })
                    return
                }
                if(self.form.Note.length>125) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入1-255个字符！'

                    })
                    return
                }
                if(self.form.FirstWord==''){
                    errorMsg+='首字母不能为空  ',
                    errorFlag = true;
                }else if(self.form.CustomServiceID == ''){
                    errorMsg+='指定客服不能为空  ',
                    errorFlag = true;
                }
                if(errorFlag){
                    self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: errorMsg
                        });
                    return false;
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageRule/AddMessageRule',
                    data: self.form,
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.$dispatch('transmit','tip',{
                            name: '成功保存:',
                            contentText: '成功保存!'
                        });
                        self.resetForm();

                    }
                });
            },
            //清空数据
            resetForm: function () {
                this.form = {
                    MessageRuleID: "",
                    MerchantID: "",
                    FirstWord: "",
                    CustomServiceID: "",
                    CustomServiceCode: "",
                    Note: ""
                };
            }
        },
        ready: function () {
            //this.getBaseLookUp();
            this.queryservers()
        },
        components: {
            //statusCheckbox: require('../../../components/status-checkbox.vue'),
            //modal: require('../../../components/modal.vue')
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .form-group {
        margin: 20px 0;
        .dan{
            height: 34px;
        }
    }
    .danform {
        margin: 0;
    }
</style>  