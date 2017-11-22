<template>
    <div class="container-fluid">
        <label class="form-group-text" style="margin-right: 24px;">{{title}}</label>
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章标题<span class="form-required-mark">*</span></label>
                        <input v-model="information.Subject" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text" style="margin-right: 24px;">文章内容</label>
                        <!-- 富文本编辑器 -->
                        <editor name="test-editor" :content.sync="information.Body"></editor>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 15px;">
                        <a v-if="showButton"  class="btn btn-default" @click="save(information.Flag)">保存</a>
                        <a v-if="showButton && showAndButton" class="btn btn-default" @click="save(100)">发送</a>
                        <a  class="btn btn-default" v-link="{name: 'information-list'}">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var ColorPicker = require('../../../js/colorpicker');
    module.exports = {
        data: function () {
            return {
                information: {
                    Subject: '', //标题
                    Body: '', //正文
                    Flag: '', //发送状态
                    MsgOutID: '', //新增不传，修改则传
                },
                title: '',
                showButton: false,
                showAndButton: false,
            }

        },
        methods: {
            resetForm() {
                this.information = {
                    Subject: '', //标题
                    Body: '', //正文
                }
            },
            //保存
            save(flag) {
                var self = this;
                var text = '';
                if (flag == 100) {
                    text = "发送";
                } else {
                    text = "保存";
                }
                self.information.Flag = flag;
                NProgress.start();
                if (self.information.Subject.length == 0) {
                    NProgress.done();
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填写标题'
                    });
                    return;
                }
                console.log(self.information)
                var baseData = {
                    Subject: self.information.Subject,
                    Body: self.information.Body,
                    MsgOutID: self.information.MsgOutID,
                    Flag: flag,
                    SysMsgIn: {
                        Flag: flag,
                    }
                }
                debugger
                servers.postAjax.bind(this) ({
                    url: '/SysNotice/ErpSaveMsg',
                    data: baseData
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        if (self.showButton) {
                            self.resetForm();
                        }
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: text + '成功'
                        });
                    }
                });
            },

        },
        route: {
            data: function (transition) {
                var self = this;
                var query = transition.to.query;
                if (query.Flag == 0 || query.Flag == 95) {
                    self.showAndButton = true
                }
                if (query) {
                    self.information = {
                        Subject: query.Subject, //标题
                        Body: query.Body, //正文
                        Flag: query.Flag, //发送状态
                        MsgOutID: query.MsgOutID, //新增不传，修改则传
                    }
                    if (transition.to.name == 'information-see') {
                        self.title = "查看消息";
                        self.showButton = false;
                    } else if (transition.to.name == 'information-edit') {
                        self.title = "修改消息";
                        self.showButton = true;
                    } else if (transition.to.name == 'information-add') {
                        self.title = "新增消息";
                        self.showButton = true;
                        self.showAndButton = true
                    }

                } else {
//                    abort();
                }


            }
        },
        watch: {
//            'color.themeColor': function (val,oldVal) {
//                if (val) {
//                    if(!this.color.matchColor) {
//                        this.color.matchColor = this.color.themeColor;
//                    }
//                }
//            },
//            'color.matchColor': function (val,oldVal) {
//                if (!val) {
//                    this.color.matchColor = this.color.themeColor;
//                }
//            },
        },
        ready: function () {

        }
    };
</script>

<style rel="stylesheet/less" lang="less" >

</style>