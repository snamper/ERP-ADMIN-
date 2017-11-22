<!--suppress CheckTagEmptyBody -->
<template>
    <div class="modal-wrap" v-show="show">
        <div class="image-config-modal">
            <div class="modal-header">
                <span>图片配置</span>
            </div>
            <div class="modal-body">
                <form class="report-essential-form row operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">图片位置</label>
                        <input class="form-control" type="text" v-model="newForm.ImageTypeID" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分辨率</label>
                        <input class="form-control" type="text" v-model="newForm.Resolution" disabled>
                    </div>
                    <div class="form-group form-limit-width" v-if="!disabled">
                        <label class="form-group-text">上传图片</label>
                        <span class="btn btn-default uploadImageBtn" @click="showImageUpload">选择图片</span>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">外部链接</label>
                        <input class="form-control" type="text" v-model="newForm.Url">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea class="form-control" type="text" v-model="newForm.Note" disabled v-if="disabled"></textarea>
                        <textarea class="form-control" type="text" v-model="newForm.Note" v-if="!disabled"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a v-if="!disabled" @click="submit" href="javascript:void(0)" class="btn btn-default">提交</a>
                <a @click="cancel" href="javascript:void(0)" class="btn btn-default">关闭</a>
            </div>
            <image-upload @cb-image-url="setUrl"></image-upload>
        </div>
    </div>
</template>
<style lang="less" type="text/less" scoped>
    .modal-wrap {
        background: rgba(0,0,0,0.3);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .image-config-modal {
        position: absolute;
        left: 20%;
        top: 15%;
        background-color: #FFFFFF;
        width: 60%;
        height: 80%;
        border: 1px solid #ccc;
        .modal-body {
            overflow: auto;
        }
        .modal-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 40px;
            border-top: 1px solid #ccc;
            padding:  6px;
            width: 100%;
        }
        .uploadImageBtn {
            margin-left: 24px;
            width: 150px;
            height: 28px;
        }
    }
</style>
<script>
    import { clone } from 'lodash';
    import servers from '../../../js/servers/servers';
    import imageUpload from '../../../components/imgUpload.vue';
    export default{
        data() {
            return {
                newForm: {}
            }
        },
        components: {
            imageUpload,
        },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            form: {
                type: Object,
                default: {},
            },
            disabled: {
                default: false
            }
        },
        watch: {
            show() {
                if (this.show) {
                    this.newForm = clone(this.form);
                    this.newForm.imagePath = '';
                }
            }
        },
        methods: {
            /**
             * 设置图片链接
             * @param {String} url 图片的链接
             */
            setUrl(url) {
                this.newForm.imagePath = url;
            },
            showImageUpload() {
                this.$broadcast('imgUploadModalShow', null, []);
            },
            submit() {
                var self = this;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasResourceConfig/ErpSaveResourceConfig',
                    data: {
                        NewPath: self.newForm.imagePath || '',
                        Note: self.newForm.Note,
                        ResourceConfigID: self.newForm.ResourceConfigID,
                        ImageTypeID: self.newForm.ImageTypeID,
                        Url: self.newForm.Url,
                    }
                }).then(function(result) {
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {
                        debugger
//                        this.form.Note = this.newForm.Note;
                        self.$dispatch('transmit', 'tip', {contentText: '修改成功'});
                        setTimeout(function() {
                            self.cancel();
                        },500);
                    }
                })
            },
            cancel() {
                this.show = false;
            },
        }
    }
</script>
