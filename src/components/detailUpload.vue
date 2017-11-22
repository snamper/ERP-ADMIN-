<template>
    <div id="upload" class="modal fade" :class="{'in':modalWindow.show}" v-if="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div id="uploader" class="fileupload-button">
                            <span id="picker">选择文件</span>
                        </div>

                        <div class="download-btn">
                            <a @click="downTemplate" href="javascript:void(0)">下载模板</a>
                        </div>
                        <div class="fileUploadText">
                            <p>文件名: {{file[0].name}}</p>
                            <p>文件大小: {{(file[0].size/1024).toFixed(2)}}<span v-if="file[0].size">kb</span></p>
                            <p>上传进度：{{progress.toFixed(2)*100}}%</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消</button>
                        <button @click="submit" type="button" class="btn btn-primary"> 上传</button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
    //    require('!style!css!less!../js/plugins/webuploader/webuploader.css');
    var WebUploader = require('../js/plugins/webuploader/webuploader');
    var servers = require('../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                progress: 0,
                type: '',
                file: []
            }
        },
        methods: {
            close: function () {
                this.uploader.destroy();
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
            submit: function () {
                this.uploader.upload();
            },
            resetForm: function () {
                this.file = [];
                this.type = '';
                this.progress = 0;
            },
            downTemplate: function () {

                servers.downloadFile(this.type)
            }
        },
        events: {
            'detailUploadModalShow': function (type) {
                var self = this;
                this.showModal();
                this.resetForm();
                this.type = type;

                self.$nextTick(function () {
                    var uploader = self.uploader = WebUploader.create({

                        // swf文件路径
                        swf: '../../js/plugins/webuploader/Uploader.swf',

                        // 文件接收服务端。
                        server: '/Import/ErpGetImportData',

                        // 选择文件的按钮。可选。
                        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                        pick: '#picker',
                        formData: {
                            ImportType: type
                        },
                        fileNumLimit: 1,
                        accept: {
                            title: 'excel',
                            extensions: 'xlsx,xls'
                        }
                    });
                    // 当有文件添加进来的时候
                    uploader.on('fileQueued', function (file) {
                        self.file.push(file);
                        self.progress = 0;

                        file.on('statuschange',function (cur, prev) {
                            if (cur == 'error' || cur == 'invalid') {
                                self.progress = 1;
                                self.$dispatch('transmit','tip',{contentText: '上传失败'});
                            } else if (cur == 'queued') {
                                self.progress = 0;
                            }
                        })
                    });
                    // 文件上传过程中创建进度条实时显示。
                    uploader.on('uploadProgress', function (file, percentage) {
                        self.progress = percentage;
                    });
                    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                    uploader.on('uploadSuccess', function (file,response) {
                        self.progress = 1;
                        if (response.ResultCode == -1) {
                            self.$dispatch('transmit','tip',{contentText: response.ErrorMessage});
                        } else if (response.ResultCode == 1) {
                            self.$dispatch('detailUploadSuccess',response.Data);
                            self.close();
                        }
                    });

                    // 文件上传失败，显示上传出错。
                    uploader.on('uploadError', function (file) {
                        self.progress = 1;
                    });

                    uploader.on('error',function (type) {
                        switch (type) {
                            case 'Q_EXCEED_NUM_LIMIT':
                                self.$dispatch('transmit','tip',{contentText: '超出限制文件个数'});
                                break;
                            case 'Q_EXCEED_SIZE_LIMIT ':
                                self.$dispatch('transmit','tip',{contentText: '超出文件限制大小'});
                                break;
                            case 'Q_TYPE_DENIED':
                                self.$dispatch('transmit','tip',{contentText: '文件类型不对'});
                                break;
                        }
                    });
                });
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .download-show {
        display: inline-block;
        vertical-align: middle;
    }

    .download-btn {
        width: 80px;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        background: #3DB1FD;
        margin-top: 5px;
        text-align: center;
        a {
            font-size: 14px;
            color: #fff;
        }
    }

    .fileUploadText {

        margin-top: 10px;
        p {
            line-height: 20px;
            font-size: 14px;
        }
    }

    .uploading-img-down {
        ul {
            margin: 5px 0;
            li {
                position: relative;
                width: 70px;
                height: 70px;
                float: left;
                border: 1px solid #e5e5e5;
                margin: 5px;
                margin-left: 0;
                cursor: pointer;
                img {
                    width: 70px;
                    height: 70px;

                }
                .img-selected-wrap {
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    text-align: center;
                    line-height: 70px;
                    .iconfont {
                        color: #fff;
                        font-size: 24px;
                    }
                    &.checked {
                        display: block;
                    }
                }
            }
        }
    }

    .delete-unploading {
        clear: both;
        text-align: center;
        line-height: 30px;
        span {
            cursor: pointer;
        }
        span:nth-of-type(1) {
            color: red;
        }
    }

    .fileupload-button {
        position: relative;
        overflow: hidden;
        display: inline-block;
        color: #fff;
        padding: 6px 12px;
        background-color: #5cb85c;
        border-color: #4cae4c;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
    }

    .fileupload-button input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        font-size: 200px;
        direction: ltr;
        cursor: pointer;
    }

</style>