<template>
    <div id="upload" class="modal fade" :class="{'in':modalWindow.show}" v-if="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header"  v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <file-upload :files.sync="files" :filters="filters" :events="cbEvents" :request-options="reqopts"
                                     url="/Import/ErpImport"></file-upload>
                        <div class="download-show">
                            <div class="download-btn">
                                <a @click="getExcelFile(type)" href="javascript:void(0)">下载模板</a>
                            </div>
                        </div>
                        <div class="modal-tip" v-if="modalWindow.isShowTip">
                            <p>注意：两次导入如果存在相同的外部单号，则订单数据（包含明细）会更新为最后一次导入的数据。（例如订单明细原先有的SKU，第二次导入如果没有则原先的记录会被删除）</p>
                        </div>
                        <div class="fileUploadText">
                            <p>文件名:{{files[files.length-1].name}}</p>
                            <p>文件大小:{{files[files.length-1].size}}</p>
                            <p>上传进度:{{files[files.length-1].progress + '%'}}</p>
                            <p>{{onStatus(files[files.length-1])}}</p>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消</button>
                        <button @click="uploadItem(files[files.length-1])" type="button" class="btn btn-primary"> 上传
                        </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
        <modal-tip></modal-tip>
    </div><!-- /.modal -->
</template>

<script>
    var servers = require('../js/servers/servers');
    module.exports = {
        data: function () {
            var self = this;
            return {
                modalWindow: {
                    show: false,
                    title: '提示',
                    isShowTip: false
                },

                uploadedFiles: [],
                fileProgress: 0,
                allFilesUploaded: false,

                files: [],
                //文件过滤器，只能上传图片
//            filters:[
//                {
//                    name:"fileFilter",
//                    fn(file){
//                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
//                        return '|xlsx|xls|'.indexOf(type) !== -1;
//                    }
//                }
//            ],
                //回调函数绑定
                cbEvents: {
                    onCompleteUpload: function (file, response, status, header) {
                        if (status == 200) {
                            if (response.ResultCode == 1) {
                                var insertCount = parseInt(response.Data.InsertCount, 10) || 0;
                                var updateCount = parseInt(response.Data.UpdateCount, 10) || 0;
                                if (insertCount || updateCount) {
                                    self.$broadcast('tip', {
                                        name: '提示:',
                                        contentText: '上传' + (insertCount + updateCount) + '条,其中新增' + insertCount + '条,更新' + updateCount + '条'
                                    });
                                } else {
                                    self.$broadcast('tip', {
                                        name: '提示:',
                                        contentText: '上传成功'
                                    });
                                }

                                self.$dispatch('transmit', 'page-change');
                            } else {
                                self.$broadcast('tip', {
                                    name: '提示:',
                                    contentText: response.ErrorMessage
                                });
                            }
                        } else {
                            self.$broadcast('tip', {
                                name: '提示:',
                                contentText: '服务器错误'
                            });
                        }

                    }
                },
                //xhr请求附带参数
                reqopts: {
                    formData: {
//                    tokens:'tttttttttttttt'
                        ImportType: 2
                    },
                    responseType: 'json',

                    withCredentials: false
                }
            }
        },
        methods: {
            getExcelFile: function () {
                servers.downloadFile(this.reqopts.formData.ImportType);
            },
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
//            submit: function () {
//                this.updateMerchantDelivery();
//            },
            onStatus(file){
                if (file.isSuccess) {
                    return "上传成功";
                } else if (file.isError) {
                    return "上传失败";
                } else if (file.isUploading) {
                    return "正在上传";
                } else {
                    return "待上传";
                }
            },
            uploadItem(file){
                //单个文件上传
                file.upload();
            },
            uploadAll(){
                //上传所有文件
                this.$broadcast('DO_POST_FILE');
            }
        },
        events: {
            'uploadModalShow': function (type, isShowTip) {
                this.showModal();
                this.reqopts.formData.ImportType = type;
                this.uploadedFiles = [];
                this.fileProgress = 0;
                this.allFilesUploaded = false;
                this.modalWindow.isShowTip = isShowTip;
                this.files = [];
            }
        },
        components: {
            fileUpload: require('vue-file-upload'),
            modalTip: require('../components/tip.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .download-show {
        display: inline-block;
        vertical-align: middle;
        margin-top: -5px;
    }

    .download-btn {
        width: 80px;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        background: #3DB1FD;
        text-align: center;
        margin-top: 10px;
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

    .modal-tip {
        margin-top: 12px;
        line-height: 1.5;
        color: #eb8678;
    }

    /*#upload {*/
        /*.modal-content-wrap {*/
            /*position: absolute;*/
            /*background: #fff;*/
            /*box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);*/
            /*width: 100%;*/
            /*left: 0;*/
            /*top: 0;*/
        /*}*/
        /*.modal-content {*/
            /*position: relative;*/
            /*border: none;*/
            /*box-shadow: none;*/

        /*}*/
    /*}*/

</style>