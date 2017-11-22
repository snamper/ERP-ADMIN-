<template>
<div class="operate-form-title">
    <p>报表设计器</p>
</div>
<div class="container-fluid container-fluid-margin">
    <div class="query-form">
        <div class="form-inline query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>名称</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Name">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">状态</label>
                    <select class="form-control" v-model="query.Status">
                        <option value="">不限</option>
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">报表类型</label>
                    <select class="form-control" v-model="query.ReportGroupID">
                        <option v-for="opt in reportTypeList" value="{{opt.ReportGroupID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>备注</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Note">
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search()" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resultForm()" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title">批量操作:</label>
                    <div class="batch-operation-group">
                        <a class="btn btn-default" href="#!/report-form/add">新增</a>
                        <!-- 该功能尚在完善 -->
                        <!-- <a href="javascript:void(0)" class="btn btn-default">批量导入</a> -->
                        <!-- <a href="javascript:void(0)" class="btn btn-default">批量启用</a> -->
                        <!-- <a href="javascript:void(0)" class="btn btn-default">批量禁用</a> -->
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                                <th>编码</th>
                                <th>名称</th>
                                <th>报表类型</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td><input type="checkbox" name="" value="" v-model="t.checked"></td>
                            <td>{{t.Code}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">{{t.Name  | truncationString }} </span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.TypeName}}">{{t.TypeName  | truncationString }} </span></td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Note}}">{{t.Note  | truncationString }} </span></td>
                            <td>
                                <a href="#!/report-form/run/{{t.ReportID}}?Code={{t.Code}}&ReportGroupID={{t.ReportGroupID}}&Status={{t.Status}}&ReportType={{t.Type}}" data-toggle="tooltip" data-placement="top" title="执行">
                                <span class="click-element iconfont icon-execute"></span></a>
                                <a href="#!/report-form/edit?ReportID={{t.ReportID}}&Code={{t.Code}}&ReportGroupID={{t.ReportGroupID}}&Status={{t.Status}}&ReportType={{t.Type}}" class="click-element" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                <!-- <span>|</span>
                                <span class="click-element">导出</span>
                                <span>|</span>
                                <span class="click-element">禁用</span> -->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="coffee" type="text/coffeescript">
    ### 报表设计器搜索 ###
    # 全局服务
    servers = require '../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.99:999/Api'

    commonMethods = require '../../js/common'
    ### 报表设计器 ###
    module.exports =
        # 数据模型
        data: () ->
            return data =
                # 搜索条件表单
                query:
                    Status: ''
                    ReportGroupID: ''
                # 报表类型可选列表
                reportTypeList: []
                # 搜索结果列表
                tableList: []
                # 分页基本属性
                paginationOptions:
                    cur: 1
                    all: 0
                    pageSize: 15
                    totalRecords: 0
                # 列表全选的状态
                selectAll: false
        ready: () ->
            # 获取报表类型列表
            @getReportType ''
            # this.search()

        components:

            pagination: require '../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item.ReportID

        events:
            # 分页属性修改时
            'page-change': () ->

                @search true

        methods:
            ###*
             * 重置搜索条件
             *###
            resultForm: () ->
                # 重置query的属性
                @query =
                    Name: ''
                    Status: ''
                    ReportGroupID: ''
                    Note: ''

            ###*
             * 获取表单类型可选列表
             *###
            getReportType: () ->

                self = this

                servers.getAjax.bind(this)

                    url: '/BaseLookup/GetReportGroup'
                    success: (data) ->

                        self.reportTypeList = data.Data

            ###*
             * 更改部分表单数据，使其与服务器字段匹配
             * @return {object} 新的表单对象
             *###
            useForm: () ->

                return form =
                    # 将编码拆分成数组
                    # code: this.form.code.split ';'
                    Name: this.query.Name
                    Status: this.query.Status
                    Note: this.query.Note

            ###*
             * 查询报表设计器
             *###
            search: (type) ->

                self = this

                # 当从搜索按钮进入，页码不为 1 时退出函数，并设置页码为 1
                return this.paginationOptions.cur = 1 if this.paginationOptions.cur isnt 1 and type isnt true

                servers.NProgress.start ''
                servers.postAjax.bind(this)

                    url: '/Report/ErpQuerySysReport'
                    data:
                        PageSize: 10
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->

                        o.checked = false for o in data.Data.PageData
                        self.tableList = data.Data.PageData

                        # 如果获取的数据长度为0时,提示用户没有获取到相应的数据
                        if self.tableList.length is 0
                            self.$dispatch 'transmit', 'tip', contentText: '没有搜索到相关数据！'

                        self.paginationOptions.all = data.Data.TotalPages
                        self.paginationOptions.totalRecords = data.Data.TotalRecords
                        servers.NProgress.done ''
</script>
