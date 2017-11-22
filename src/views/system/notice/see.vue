<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章标题</label>
                        <input v-model="notice.Title" type="text" class="form-control" placeholder="" disabled="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">文章作者</label>
                        <input v-model="notice.Editor" type="text" class="form-control" placeholder="" disabled="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text" style="margin-right: 24px;">文章内容</label>
                        <!-- 文章置放域 -->
                        <div class="notice-view">
                        </div>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 15px;">
                        <a class="btn btn-default" @click="back">返回列表>></a>
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
            # 文章
            notice: {}
    methods:
        querySysNoticeByID: (ID) ->
            self = @
            servers.NProgress.start()
            servers.postAjax.bind(@)
                url: '/SysNotice/ErpQuerySysNoticeByID'
                data: NoticeID: ID
                success: (resolve) ->
                    if resolve.ResultCode is 1
                        self.notice = resolve.Data
                        $('.notice-view').html(self.notice.Content)
                        servers.NProgress.done()
        back: () ->
             history.back(-1)

    route:
        data: (transition) ->
            debugger
            console.log transition
            @querySysNoticeByID transition.to.query.noticeID

</script>
