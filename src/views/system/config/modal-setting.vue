<template>
    <div class="modal fade" :class="{'in':modalWindow.show}"  v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="checkbox" v-if="config.ValueControl == 'C'">
                                    <label>
                                        <input type="checkbox" v-model="config.Value" :true-value=1 :false-value=0> {{config.Name}}
                                    </label>
                                </div>
                                <div class="form-group col-lg-12" v-if="config.ValueControl == 'T'">
                                    <label>{{config.Name}}:</label>
                                    <input type="text" v-model="config.Value" class="form-control">
                                </div>
                                <div class="form-group col-lg-12" v-if="config.ValueControl == 'R'">
                                    <label>{{config.Name}}:</label>
                                    <label class="radio-inline" v-for="choice in choiceList">
                                        <input type="radio" v-model="config.Value" name="choice-radio" value="{{choice.Code}}"> {{choice.Text}}
                                    </label>
                                </div>
                                <div class="form-group col-lg-12" v-if="config.ValueControl == 'D'">
                                    <label>{{config.Name}}:</label>
                                    <select class="form-control" v-model="config.Value">
                                        <option v-for="choice in choiceList" value="{{choice.Code}}">{{choice.Text}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="saveGlobalConfig" type="button" class="btn btn-primary"> 保存 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                count: 0,
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                config: {},
                choiceList: [],
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modalWindow.show = true;
            },
            /**
             * 保存配置
             */
            saveGlobalConfig: function () {
                var self = this;
                var config = this.config;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysGlobalConfig/ErpSaveSysGlobalConfig',
                    data: {
                        Code: config.Code,
                        GlobalConfigID: config.GlobalConfigID,
                        MerchantID: config.MerchantID,
                        Name: config.Name,
                        Value: config.Value
                    }
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.close();
                        self.$dispatch('transmit','page-change');
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功!'
                        });
                    }
                });
            },
            getChoiceList: function () {
                var self = this
                servers.postAjax.bind(this)({
                    url: '/SysGlobalConfig/ErpGetSysGlobalConfigValueList',
                    data: {
                        Code: this.config.Code,
                    }
                }).done(function (result) {
                    if ( result.ResultCode == 1 ) {
                        self.choiceList = result.Data
                    }
                });
            },
        },
        events: {
            /**
             * @param  {object} config 配置信息
             */
            'modal-config': function (config) {
                this.config = config;
                if (config.ValueControl === 'R' || config.ValueControl === 'D') {
                    this.getChoiceList()
                }
                this.modalWindow.title = '配置' + this.config.Name;
                this.showModal();
            }
        },
        ready: function () {

        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .checkbox {
        input[type="checkbox"] {
            margin-top: 0;
        }

    }
    .radio-inline {
        input {
            top: 3px;
            left: 2px;
        }
    }
    .modal {
        .modal-content {
            .modal-body {
                .form-group {
                    label {
                        line-height: 24px;
                    }
                }
            }
        }
    }
</style>
