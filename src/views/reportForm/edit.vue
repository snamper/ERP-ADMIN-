<template id="report-form-add">
    <div class="operate-form-title">
        <p>报表设计器</p>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="sheet-tab">
                    <div class="sheet-state">
                        <a v-for="a in tab.list" class="click-element sheet-tab-link" :class="{'active': tab.index === $index}" @click="tab.index = $index">{{a.text}}</a>
                    </div>
                </div>
            </div>

            <div class="col-lg-12" v-show="tab.index === 0">
                <essential-attribute :form.sync="form"></essential-attribute>
            </div>
            <div class="col-lg-12" v-show="tab.index === 1">
                <sql-statement :form.sync="form"></sql-statement>
            </div>
            <div class="col-lg-12" v-show="tab.index === 2">
                <column-select :form.sync="form"></column-select>
            </div>
            <div class="col-lg-12" v-show="tab.index === 3">
                <query-condition :form.sync="form"></query-condition>
            </div>
            <div class="col-lg-12" v-show="tab.index === 4">
                <graph-settings :form.sync="form"></graph-settings>
            </div>
            <preview :show.sync="previewShow" :form.sync="form" :no-can-run="true">
        </div>
    </div>
</template>
<script lang='coffee'>
    ### 报表设计器 添加 ###
    # 全局服务
    servers = require '../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.99:999/Api'

    module.exports =
        data: () ->
            # 当前模块数据
            return data =
                previewShow: false
                form:
                    SQLRunFieldList: [
                        {
                            FieldName: ''
                            SQL: ''
                            FieldNo: 0
                        },{
                            FieldName: ''
                            SQL: ''
                            FieldNo: 1
                        },{
                            FieldName: ''
                            SQL: ''
                            FieldNo: 2
                        },{
                            FieldName: ''
                            SQL: ''
                            FieldNo: 3
                        }
                    ]
                    DisplayFieldList: [
                        {
                            FieldName: ''
                            SQLIndex: '0'
                            DisplayLabel: ''
                            DisplayWidth: ''
                            DisplayMask: ''
                            SortIndex: '0'
                        }
                        {
                            FieldName: ''
                            SQLIndex: '1'
                            DisplayLabel: ''
                            DisplayWidth: ''
                            DisplayMask: ''
                            SortIndex: '0'
                        }
                        {
                            FieldName: ''
                            SQLIndex: '2'
                            DisplayLabel: ''
                            DisplayWidth: ''
                            DisplayMask: ''
                            SortIndex: '0'
                        }
                        {
                            FieldName: ''
                            SQLIndex: '3'
                            DisplayLabel: ''
                            DisplayWidth: ''
                            DisplayMask: ''
                            SortIndex: '0'
                        }
                    ]
                    FindFieldList: [
                        {
                            FieldName: ''
                            FindType: 0
                            FindExpr: ''
                            Condition: 0
                            DefaultValue: ''
                            Required: 0
                            MainFindUse: 0
                            DisplayExpr: ''
                            OtherExpr: ''
                            SQLUseTo: ''
                            Width: ''
                            SortIndex: 0
                        }
                    ]
                # 页面tab对象
                tab:
                    # 当前用户浏览tab的索引
                    index: 0
                    # tab列表
                    list: [
                        {
                            text: '基本属性'
                        }
                        {
                            text: 'SQL语句'
                        }
                        {
                            text: '列选择'
                        }
                        {
                            text: '查询条件'
                        }
                        # {
                        #     text: '图表设置'
                        # }
                    ]

        components:
            #页面 tab 5个模块
            # 基本属性模块
            'essential-attribute': require './essential-attribute.vue'
            # SQL语句
            'sql-statement': require './SQL-statement.vue'
            # 列选择
            'column-select': require './column-select.vue'
            # 查询条件
            'query-condition': require './query-condition.vue'
            # 图表设置
            'graph-settings': require './graph-settings.vue'
            # 预览
            'preview': (resolve) ->

                require ['./preview.vue'], resolve

        events:

            'post-report': () ->

                this.postReport ''

            'preview-show': () ->

                this.previewShow = true;

        route:

            data: (transition) ->

                @ReportID = transition.to.query.ReportID
                @ReportGroupID = transition.to.query.ReportGroupID
                @Code = transition.to.query.Code
                @ReportStatus = transition.to.query.Status
                @ReportType = transition.to.query.ReportType

                @getReport @ReportID, @ReportGroupID, @Code, @ReportType
                $('.w-content').css 'overflow', 'auto'

        methods:

            postReport: () ->

                self = this

                servers.postAjax.bind(this)

                    url: '/Report/ErpSaveReportTemplate'
                    data: @form
                    success: (data) ->

                        self.$dispatch 'transmit', 'tip',
                            contentText: '保存成功！'
                            cancelBtnShow: false

            getReport: (ReportID, ReportGroupID, Code, ReportType) ->

                self = this

                servers.postAjax.bind(this)

                    url: '/Report/ErpQueryReportTemplate'
                    data:
                        ReportID: ReportID
                        ReportGroupID: ReportGroupID
                        Code: Code
                        ReportStatus: 1
                        Type: ReportType
                    success: (result) ->

                        if result.ResultCode is 1

                            self.form = result.Data
                            self.form.ReportID = self.ReportID
                            self.form.ReportGroupID = self.ReportGroupID
                            self.form.ReportCode = self.Code
                            self.form.ReportStatus = self.ReportStatus
                            self.form.Type = self.Type
                            self.$broadcast 'set-color', self.form

                            for findField in self.form.FindFieldList
                                findField.SortIndex = parseInt findField.SortIndex
                            for sql in self.form.DisplayFieldList
                                sql.SortIndex = parseInt sql.SortIndex
                                sql.SQLIndex  = parseInt sql.SQLIndex

</script>
