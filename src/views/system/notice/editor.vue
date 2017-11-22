<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章标题<span class="form-required-mark">*</span></label>
                        <input v-model="pageForm.Title" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章作者<span class="form-required-mark">*</span></label>
                        <input v-model="pageForm.Editor" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text" style="margin-right: 24px;">文章内容</label>
                        <!-- 富文本编辑器 -->
                        <editor name="test-editor" :content.sync="pageForm.Content"></editor>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 15px;">
                        <a  class="btn btn-default" @click="postPageForm()">保存</a>
                        <a  class="btn btn-default" href="#!/notice/list">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="coffee">
servers = require '../../../js/servers/servers'
module.exports =
    data: () ->
        return data =
            # 页面的编辑类型
            pageType: ''
            # 页面的表单
            pageForm: {}
            # 操作成功之后的提示
            tipText: ''
    route:
        data: (transition) ->
            # 通过路由的名称断定出当前页面的编辑类型
            if transition.to.name is 'notice-add'
                @pageType = '0'
                @tipText = '添加公告成功!'
            else if transition.to.name is 'notice-edit'
                @pageType = '1'
                @tipText = '修改公告成功!'
                # 当修改时，获取需要修改的公告
                @getPageForm transition.to.query.noticeID
    methods:
        ###*
         * 获取公告
         * @param  {String} ID 公告的唯一标识
         *###
        getPageForm: (ID) ->
            self = @
            servers.NProgress.start()
            servers.postAjax.bind(@)
                url: '/SysNotice/ErpQuerySysNoticeByID'
                data: NoticeID: ID
                success: (resolve) ->
                    if resolve.ResultCode is 1
                        self.pageForm = resolve.Data
                        servers.NProgress.done()
        ###*
         * Post 当前的公告
         *###
        postPageForm: () ->
            self = @
            servers.NProgress.start()
            servers.postAjax.bind(@)
                url: '/SysNotice/ErpSaveSysNotice'
                data: @pageForm
                success: (resolve) ->
                    if resolve.ResultCode is 1
                        self.$dispatch 'transmit', 'tip', contentText: self.tipText
                        servers.NProgress.done()
</script>
