<template>
    <!-- 标题 -->
    <!-- <div class="sell-hd-fz">
        <h3>{{reportTitle}}</h3>
    </div> -->
    <div class="tip" v-if="!previewShow">
        {{tipText}}
    </div>
    <preview :show.sync="previewShow" :form.sync="reportForm" :no-can-run="false" :id="$route.params.ReportID">
</template>
<script lang="coffee">
# 服务脚本文件
servers = require '../../js/servers/servers'
module.exports =
    data: () ->
        return data =
            # 提示文字
            tipText: '正在获取报表数据...'
            # 报表的数据
            reportForm: {}
            # 需要获取报表的ID
            reportID: ''
            # 需要获取报表的分类ID
            reportGroupID: ''
            # 需要获取报表的编码
            code: ''
            # 需要获取的报表的状态
            ReportStatus: ''
            # 报表预览是否显示，显示预览即可执行
            previewShow: false
            # 报表的标题
            reportTitle: ''
    ###*
     * 当前vue的函数集合
     * @type {object}
     *###
    methods:
        ###*
         * 获取报表数据
         * @param  {string} reportID      报表的id
         * @param  {string} reportGroupID 报表类型的id
         * @param  {string} code          报表编码
         *###
        getReportForm: (reportID, reportGroupID, code, reportStatus, type) ->
            self = @
            servers.postAjax.bind(@)
                url: '/Report/ErpQueryReportTemplate'
                data:
                    ReportID: reportID
                    ReportGroupID: reportGroupID
                    Code: code
                    ReportStatus: 1
                    Type: type
                success: (result) ->
                    if result.ResultCode is 1
                        # 当接受数据正确时，将获取到的数据赋值到当前页面的报表数据模型
                        self.reportForm = result.Data
                        # 立即显示报表预览，即执行报表
                        self.previewShow = true
                        # 设置标题
                        self.reportTitle = result.Data.ReportTitle
                    else
                        self.tipText = '出错：' + result.ErrorMessage + ' 请您返回其他页面或者联系开发维护人员为您调试数据库数据！'
    ###*
     * 当前路由对象
     * @type {object}
     *###
    route:
        ###*
         * 当前路由对象的数据处理函数
         * @param  {object} transition 路由对象方法
         *###
        data: (transition) ->
            # 当路由发生变化时，退出预览，然后获取报表数据，再调出预览组件
            @$broadcast 'quit-preview'
            @$broadcast 'clear-table'
            # 切换路由时清空页面数据
            # 提示文字
            @tipText = '正在获取报表数据...'
            # 报表的数据
            @reportForm = {}
            # 需要获取报表的ID
            @reportID = ''
            # 需要获取报表的分类ID
            @reportGroupID = ''
            # 需要获取报表的编码
            @code = ''
            # 需要获取的报表的状态
            @ReportStatus = ''
            # 报表预览是否显示，显示预览即可执行
            @previewShow = false
            # 报表的标题
            @reportTitle = ''

            reportID = transition.to.params.ReportID
            reportGroupID = transition.to.query.ReportGroupID
            ReportStatus = transition.to.query.Status
            code = transition.to.query.Code
            type = transition.to.query.ReportType
            # 获取到相应的值之后调用函数获取相应的报表数据
            @getReportForm reportID, reportGroupID, code, ReportStatus, type
            $('.w-content').css 'overflow', 'auto'
            #
            # console.log 'test'
            # self = @
            # setInterval () ->
            #     self.$dispatch 'transmit', 'tip',
            #         contentText: '测试'
            #         events:
            #             confirm: 'sdfa'
            #
            #     test = self.$once 'sdfa', () ->
            #         console.log 'tst'
            #     console.log test
            # , 3000

    # 组件
    components:
        # 懒加载预览组件，实现执行
        'preview': require './preview.vue'
</script>
