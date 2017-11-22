<template lang="html">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">活动名称<span class="form-required-mark">*</span></label>
                        <input v-model="poster.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text margin">时间范围<span class="form-required-mark">*</span></label>
                        <date-picker :start-date.sync="poster.BeginTime" :end-date.sync="poster.EndTime"></date-picker>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">上传海报<span class="form-required-mark">*</span></label>
                        <span class="btn btn-default uploadImageBtn" @click="showImageUpload">选择图片</span>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="poster.Note" class="form-control" rows="6"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <!--<div class="checkbox-group">-->
                        <!--<div class="checkbox">-->
                        <!--<label>-->
                        <!--<input type="checkbox" :true-value="1" :false-value="0" v-model="query.Status">-->
                        <!--启用-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>
                        <a v-link="{name: 'fission-poster'}" class="btn btn-default">返回列表>></a>
                    </div>
                    <image-upload @cb-image-url="setUrl"></image-upload>
                </div>

            </div>
        </div>
    </div>
</template>

<script type="text/script">
    var servers = require('../../../js/servers/servers.js');
//    import servers from '../../../js/servers/servers';
    import imageUpload from '../../../components/imgUpload.vue';
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                isDataReady: false,
                isUse: '', //是否已使用活动海报
                poster: {
                    Name: '', // 活动名称  string
                    BeginTime: '', // 开始时间 string
                    EndTime: '', //    结束时间   string
                    Files: '', //  上传图片路径 array<string>
                    FissionPosterID: '', //    海报ID
                    Note: '', // 备注
                },
            }
        },
        components: {
            datePicker: require('../../../components/date_picker.vue'),
            imageUpload,
        },
        methods: {
            /**
             * 设置图片链接
             * @param {String} url 图片的链接
             */
            setUrl(url) {
                this.poster.Files = url;
            },
            //选择上传图片
            showImageUpload() {
                if (this.isUse) {
                    this.$dispatch('transmit','tip',{
                        contentText: '该海报已经使用，不能再修改图片!'
                    });
                    return ;
                }
                this.$broadcast('imgUploadModalShow', null, []);
            },
            //保存更改
            save: function () {
                var self = this;
                var poster = this.poster;
                if (!poster.Name) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写活动名称!'
                    });
                    return ;
                }
                if (!poster.BeginTime) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请选择时间!'
                    });
                    return ;
                }
//                if (!poster.Files) {
//                    self.$dispatch('transmit','tip',{
//                        contentText: '请上传海报!'
//                    });
//                    return ;
//                }
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要保存吗？',
                    events: {
                        confirm: 'save'
                    }
                });
                self.$off('save');
                self.$once('save', function() {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasFissionPoster/ErpSaveFissionPoster',
                        data: self.poster
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            if (self.pageInfo.isEdit) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '修改成功!'
                                });
                            } else {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '新增成功!'
                                });
                            }

                            self.resetForm()
                        }
                    });
                });

            },
            //清空表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return '';
                } else {
                    $('.data_picker').val('');
                    this.poster = {
                        Name: '', // 活动名称  string
                        BeginTime: '', // 开始时间 string
                        EndTime: '', //    结束时间   string
                        Files: '', //  上传图片路径 array<string>
                        FissionPosterID: '', //    海报ID
                        Note: '', // 备注
                    };
                }
            }
        },
        computed: {

        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'poster-edit') {
                    self.pageInfo.title = '修改裂变海报';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if ( query) {
                        console.log(query)
                        self.poster.FissionPosterID = query.id;
                        self.isUse = query.isUse;
                        self.poster.Name = query.name // 活动名称  string
                        self.poster.BeginTime = query.beginTime, // 开始时间 string
                        self.poster.EndTime = query.endTime, //    结束时间   string
                        self.poster.Note = query.note, // 备注
                        transition.next();
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.title = '新建裂变海报';
                    self.pageInfo.isEdit = false;
                    self.resetForm();
                    transition.next();
                }
            }
        },
    }
</script>

<style rel="stylesheet/less" lang="less">
    .container-fluid {
        .margin {
            margin-right: 22px;
        }
        .uploadImageBtn {
            margin-left: 24px;
            width: 75px;
            height: 25px;
        }
    }
</style>
<!--<script>
//    import { clone } from 'lodash';
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
        }
    }
</script>-->
