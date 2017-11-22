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
                            <span id="picker">选择图片</span>
                        </div>

                        <div class="download-btn">
                            <a @click="downloadImg" href="javascript:void(0)">下载图片</a>
                        </div>
                        <div class="prompt">
                            *请上传大小≤500K，尺寸500*500以内的图片。
                        </div>
                        <div class="fileUploadText">
                            <p>上传文件:{{fileCount}}个图片</p>
                            <p>上传进度:{{progress.toFixed(2) * 100}}%</p>
                            <p>状态：{{fileStatus.successNum}}张图片上传成功,{{fileStatus.uploadFailNum}}张图片上传失败</p>
                        </div>
                        <div class="uploading-img-true">
                            <span>已上传图片：</span>
                            <div class="uploading-img-down">
                                <ul>
                                    <li class="img-list" v-for="img in fileUploadedUrl"  @click="changeImgSelectState(img)">
                                        <img :src="img.url">
                                        <div class="img-selected-wrap" :class="{'checked': img.checked}"><span class="iconfont icon-right"></span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="delete-unploading">

                            <span @click="deleteImg">删除</span>
                            <span>|</span>
                            <span @click="downloadImg">下载</span>
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
                fileCount: 0,
                fileStatus: {
                    cancelNum: 0,
                    interruptNum: 0,
                    invalidNum: 0,
                    progressNum: 0,
                    queueNum: 0,
                    successNum: 0,
                    uploadFailNum: 0
                },
                progress: 0,
                fileUploadedUrl: [],
                isDeleting: false
            }
        },
        methods: {
            close: function () {
                this.uploader.destroy();
                var fileUploadedUrl = this.fileUploadedUrl;
                var uploadedImg = [];
                fileUploadedUrl.forEach(function (img) {
                    uploadedImg.push(img.url);
                });
                this.$dispatch('uploadImgSuccess',uploadedImg);
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
            getStatus: function () {
                this.fileStatus = this.uploader.getStats();
            },
            changeImgSelectState: function (img) {
                if (this.isDeleting) return;
                img.checked = !img.checked;
            },
            //选中的图片
            selectedImg: function () {
                var fileUploadedUrl = this.fileUploadedUrl;
                var imgGroup = [];
                fileUploadedUrl.forEach(function (img) {
                    if (img.checked) {
                        imgGroup.push(img.url);
                    }
                });
                return imgGroup;
            },
            //删除图片
            deleteImg: function () {
                var self = this;
                var fileUploadedUrl = this.fileUploadedUrl;
                var deleteImgGroup = this.selectedImg();
                if (deleteImgGroup.length == 0) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请选中需要删除的图片!'
                    });
                    return ;
                }
                self.$dispatch('transmit','tip',{
                    contentText: '确定要删除图片吗?删除后不可以再恢复!',
                    btnName: '删除',
                    events: {
                        confirm: 'deleteImg'
                    }
                });
                self.$off('deleteImg');
                self.$once('deleteImg',function () {
                    NProgress.start();
                    self.isDeleting = true;
                    servers.postAjax.bind(this)({
                        url: 'ImportImage/ErpRemoveImages',
                        contentType: 'application/json',
                        data: JSON.stringify(deleteImgGroup)
                    },'/').done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            var notDeleteImgArray = [];
                            fileUploadedUrl.forEach(function (img) {
                                if (!img.checked) {
                                    notDeleteImgArray.push(img);
                                }
                            });
                            self.fileUploadedUrl = [];
                            self.fileUploadedUrl = notDeleteImgArray;
                            self.isDeleting = false;
                        }
                    })
                });
            },
            //下载图片
            downloadImg: function () {
                var fileUploadedUrl = this.fileUploadedUrl;
                if (fileUploadedUrl.length == 0) {
                    this.$dispatch('transmit','tip',{contentText: '没有可供下载的文件'});
                    return;
                } else {
                    var downloadImgGroup = this.selectedImg();
                    //如果没有选择图片,则默认下载所有图片
                    if (downloadImgGroup.length == 0) {
                        fileUploadedUrl.forEach(function (img) {
                            downloadImgGroup.push(img.url);
                        });
                    }
                    servers.downloadFile(JSON.stringify(downloadImgGroup),'/ImportImage/ErpDownLoadImages');
                }


//                NProgress.start();
//                servers.postAjax.bind(this)({
//                    url: 'ImportImage/ErpDownLoadImages',
//                    contentType: 'application/json',
//                    data: JSON.stringify(downloadImgGroup)
//                },'/').done(function (result) {
//                    NProgress.done();
//                    if (result.ResultCode == 1) {
//                        window.open(result.ErrorMessage);
//                    }
//                })

            },
            resetForm: function () {
                this.fileCount = 0;
                this.fileStatus =  {
                    cancelNum: 0,
                    interruptNum: 0,
                    invalidNum: 0,
                    progressNum: 0,
                    queueNum: 0,
                    successNum: 0,
                    uploadFailNum: 0
                };
                this.progress =  0;
                this.fileUploadedUrl = [];
            }
        },
        events: {
            'imgUploadModalShow': function (GoodsID,imgUrls) {
                var self = this;
                this.showModal();
                this.resetForm();
                if (imgUrls) {
                    imgUrls.forEach(function (img) {
                        self.fileUploadedUrl.push({
                            url: img,
                            checked: false
                        })
                    })
                }
                self.$nextTick(function () {

                    var percentages = {};

                    function statusChnage(file) {
                        file.on('statuschange',function (cur, prev) {
                            if (cur == 'error' || cur == 'invalid') {
                                percentages[file.id][1] = 1;
                            } else if (cur == 'queued') {
                                percentages[file.id][1] = 0;
                            }
                        })
                    }

                    function updateTotalProgress() {
                        var loaded = 0,
                            total = 0;
                        $.each(percentages,function (k, v) {
                            total += v[0];
                            loaded += v[0] * v[1];
                        });

                        self.progress = total ? loaded / total : 0;

                    }

                    var uploader = self.uploader = WebUploader.create({

                        // swf文件路径
                        swf: '../../js/plugins/webuploader/Uploader.swf',

                        // 文件接收服务端。
                        server: '/ImportImage/ErpUploadImages',

                        // 选择文件的按钮。可选。
                        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                        pick: '#picker',
                        formData: {
                            GoodsID: GoodsID
                        },
                        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                        accept: {
                            title: 'Images',
                            extensions: 'gif,jpg,jpeg,bmp,png',
                            mimeTypes: 'image/*'
                        }
                    });

                    //上传
//                    $('#uploadImg').on('click',function () {
//                        uploader.upload();
//                    });

                    // 当有文件添加进来的时候
                    uploader.on('fileQueued', function (file) {
                        self.fileCount++;
                        percentages[file.id] = [file.size, 0];
                        self.getStatus();
                        statusChnage(file);
                        updateTotalProgress();
//                        var $li = $(
//                                        '<li id="' + file.id + '">' +
//                                        '<img>' +
//                                        '</li>'
//                                ),
//                                $img = $li.find('img');
//
//                        // $list为容器jQuery实例
//                        var $list = $('.uploading-img-down ul');
//                        $list.append( $li );
//
//                        // 创建缩略图
//                        // 如果为非图片文件，可以不用调用此方法。
//                        // thumbnailWidth x thumbnailHeight 为 100 x 100
//                        uploader.makeThumb( file, function( error, src ) {
//                            if ( error ) {
//                                $img.replaceWith('<span>不能预览</span>');
//                                return;
//                            }
//                            $img.attr( 'src', src );
//                        }, 100, 100 );
                    });


                    // 文件上传过程中创建进度条实时显示。
                    uploader.on('uploadProgress', function (file, percentage) {
                        self.getStatus();
                        console.log('uploadProgress',percentage);
                        percentages[file.id][1] = percentage.toFixed(2);
                        updateTotalProgress();
//                        var $li = $( '#'+file.id ),
//                                $percent = $li.find('.progress span');
//
//                        // 避免重复创建
//                        if ( !$percent.length ) {
//                            $percent = $('<p class="progress"><span></span></p>')
//                                    .appendTo( $li )
//                                    .find('span');
//                        }
//
//                        $percent.css( 'width', percentage * 100 + '%' );

                    });
                    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                    uploader.on('uploadSuccess', function (file,response) {
                        self.getStatus();
                        updateTotalProgress();
                        self.fileUploadedUrl.push({
                            url: response.ErrorMessage,
                            checked: false
                        });
                        self.$emit('cb-image-url', response.ErrorMessage);
                    });

                    // 文件上传失败，显示上传出错。
                    uploader.on('uploadError', function (file) {
                        self.getStatus();
                        updateTotalProgress();
//                        var $li = $( '#'+file.id ),
//                                $error = $li.find('div.error');
//
//                        // 避免重复创建
//                        if ( !$error.length ) {
//                            $error = $('<div class="error"></div>').appendTo( $li );
//                        }
//
//                        $error.text('上传失败');
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


//                    uploader.on('all', function (type, arg1, arg2) {
//
//                    })
                });
            }
        },
        components: {
            fileUpload: require('vue-file-upload')
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