<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章位置<span class="form-required-mark"></span></label>
                        <input v-model="article.PosIDDesc" type="text" class="form-control" readonly="yes">
                    </div>
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">文章类型</label>-->
                        <!--<select class="form-control" v-model="article.ArticleType">-->
                            <!--<option value="">不限</option>-->
                            <!--<option v-for="opt in ArticleTypeList" value="{{opt.Code}}">{{opt.Text}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章标题<span class="form-required-mark">*</span></label>
                        <input v-model="article.Name" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width articleC">
                        <label class="form-group-text" style="margin-right: 24px;">文章内容</label>
                        <!-- 富文本编辑器 -->
                        <editor name="test-editor" :content.sync="article.Content"></editor>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">外部链接<span class="form-required-mark"></span></label>
                        <input v-model="article.Url" type="text" class="form-control" placeholder="请输http://格式" >
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 15px;">
                        <a  class="btn btn-default" @click="save()">保存</a>
                        <a  class="btn btn-default" v-link="{name: 'articleConfig'}">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" type="text/less" scoped>
    .articleC {
        margin-bottom: 12px;
    }
</style>
<script>
    import servers from '../../../js/servers/servers';
    var NProgress = servers.NProgress;
    export default {
        data() {
            return {
                article: {
                    PosIDDesc: '', //文章位置
//                    ArticleType: '', //文章类型
                    ArticleID: '', //文章id
                    Name: '',  //	文章标题	string
                    Content: '', //	内容	string
                    Url: '', //外部链接

                },
                ArticleTypeList: [], //文章类型下拉列表
            }
        },
        methods: {
            save() {
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    contentText: "确定保存吗？",
                    events: {
                        confirm: 'save',
                    },
                });
                self.$off('save');
                self.$once('save', function() {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasArticle/ErpSaveArticle',
                        data: self.article,
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示',
                                contentText: '保存成功'
                            });
                            self.resetForm();

                        }
                    });
                });
            },
            /**
             * 获取文章类型下拉列表
             *
             */
//            getArticleTypeList() {
//                servers.getAjax.bind(this) ({
//                    url: '/BaseLookup/GetArticleType'
//                }).then(function(result) {
//                    this.ArticleTypeList = result.Data;
//                })
//            },
        },
        route: {
            data: function (transition) {
                var query = transition.to.query;
                this.article.ArticleID = query.id;
                this.article.Content = query.content;
                this.article.Name = query.title;
                this.article.Url = query.url;
//                this.article.PosIDDesc = query.posIDDesc;
                this.article.PosIDDesc = query.ArticleTypeDesc;
            },

        },
    }

</script>

