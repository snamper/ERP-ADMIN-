<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>新增分类</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类编码<span class="form-required-mark">*</span></label>
                        <input v-model="save.Code" type="text" class="form-control dan" placeholder="" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类名称<span class="form-required-mark">*</span></label>
                        <input v-model="save.Name" type="text" class="form-control dan" placeholder="" required >
                    </div>
                     <div class="form-group form-limit-width">
                        <label class="form-group-text">关键词</label>
                        <input v-model="save.KeyWords" type="text" class="form-control dan" placeholder="多个关键词；隔开" required>
                    </div>
                     <div class="form-group form-limit-width danform">
                        <label class="form-group-text"></label>
                        <p class="form-control dan" style="border:none">根据关键词归类消息分类</p>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="save.Note" class="form-control" rows="10"></textarea>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="btn btn-success" @click="saveDelivery">保存</a>
                        <a v-link="{name : 'classify'}" style="margin-left: 270px" class="btn btn-warning">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .form-group {
        .dan{
            height: 34px;
        }
    }
    .danform {
        margin: 0;
    }
</style>  
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                save: {
                    MessageClassID: "",
                    MerchantID: "",
                    Code: "",
                    Name: "",
                    KeyWords: "",
                    Status: 0,
                    Creater: "",
                    CreateTime: "",
                    Editor: "",
                    EditTime: "",
                    Note: ""
                },
            }
        },
        methods: {
            //保存新增
            saveDelivery: function () {
                var self = this;
                if(self.save.Code.length>16 || self.save.Name.length>16) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-16个字符！'

                    })
                    return
                }
                if(self.save.KeyWords.length>125) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-255个字符！'

                    })
                    return
                }
                if(self.save.Note.length>125) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入1-255个字符！'

                    })
                    return
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageClass/SaveMessageClass',
                    data: self.save
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.resetForm();
                        self.$dispatch('transmit','tip',{
                            name: '成功保存:',
                            contentText: '成功保存!'
                        });
                    }
                });
            },
            //清空数据
            resetForm: function () {
                this.save = {
                    MessageClassID: "",
                    MerchantID: "",
                    Code: "",
                    Name: "",
                    KeyWords: "",
                    Status: 0,
                    Creater: "",
                    CreateTime: "",
                    Editor: "",
                    EditTime: "",
                    Note: ""
                };
            }
        },
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue'),
            modal: require('../../../components/modal.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.form-group  {
    margin: 20px 0;
}
</style>
