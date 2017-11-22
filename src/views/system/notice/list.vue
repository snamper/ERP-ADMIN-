

<template id="">

<div class="operate-form-title">
    <p>公告</p>
</div>
<div class="query-form" @keyup.enter.stop="search">
    <div class="query-body form-inline query-detail">
        <div class="row expand-show" :class="{'show-expand' : show.flog}" style="overflow: inherit;">
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>发布时间</label>
                <date-picker :start-date.sync="query.BegDate" :end-date.sync="query.EndDate"></date-picker>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>状态</label>
                <select class="form-control" name="" v-model="query.Status">
                    <option value="">不限</option>
                    <option v-for="status in statusList" value="{{status.Code}}">{{status.Text}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>公告标题</label>
                <input v-model="query.Title" type="text" class="form-control" placeholder="请填写公告标题">
            </div>
        </div>
        <div class="query-button-group">
            <a @click="queryNoticeList" href="javascript:void(0)" class="btn btn-default">搜索</a>
            <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
        </div>
    </div>
</div>
<div class="sheet-list" style="margin-top: 20px;">
    <div class="row">
        <div class="col-lg-12">
            <div class="batch-operation">
                <div class="batch-operation-group">
                    <span>批量操作：</span>
                    <a href="#!/notice/add" class="btn btn-default">新增</a>
                    <!-- <a href="javascript:void(0)" class="btn btn-default" @click="dispatch('transmit', 'uploadModalShow', '')">批量导入</a> -->
                    <a @click="disposeNoticeList([], 'check')" href="javascript:void(0)" class="btn btn-default">批量发布</a>
                    <a @click="disposeNoticeList([], 'cancel')" href="javascript:void(0)" class="btn btn-default">批量取消</a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive table-responsive-margin">
                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state">
                                <input type="checkbox" v-model="selectAll">
                            </th>
                            <th>状态</th>
                            <!-- <th>序号</th> -->
                            <th>文章标题</th>
                            <th>文章作者</th>
                            <th>录入时间</th>
                            <!-- <th>审核数</th>
                            <th>审核时间</th> -->
                            <!-- <th>备注</th> -->
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-for="notice in list">
                        <tr class="sheet-list-item">
                            <td class="sheet-header-state">
                                <input type="checkbox" v-model="notice.checked">
                            </td>
                            <td>
                                <!-- 通过判断的出公告显示文本 -->
                                <!-- {{t.Flag == 0 ? '待发布' : ''}} {{t.Flag == 1 ? '已发布' : ''}} {{t.Flag == -1 ? '已取消' : ''}} -->
                                <!-- 公告显示文本 -->
                                {{notice.FlagDesc}}
                            </td>
                            <td>{{notice.Title}}</td>
                            <td>{{notice.Editor}}</td>
                            <td>{{notice.EditTime.split('T')[0]}}</td>
                            <td>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="发布">
                                    <span @click="disposeNoticeList([notice.NoticeID], 'check')" class="click-element iconfont icon-verify" v-if="notice.Flag === 0"></span></a>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="取消">
                                    <span @click="disposeNoticeList([notice.NoticeID], 'cancel')" class="click-element iconfont icon-cancel" v-if="notice.Flag === 0"></span>
                                </a>
                                <a href="javascript:void(0)" @click="seeNotice(notice.NoticeID)" data-toggle="tooltip" data-placement="top" title="查看">
                                    <span class="click-element iconfont icon-look"></span>
                                </a>
                                <a href="javascript:void(0)" @click="editNotice(notice.NoticeID)" data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="click-element iconfont icon-alter" v-if="notice.Flag === 0"></span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination :pagination-options="paginationOptions"></pagination>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="coffee">

servers = require '../../../js/servers/servers'
commonMethods = require '../../../js/common'
module.exports =
    data: () ->
        return data =
            list: []
            statusList: []
            selectAll: false
            paginationOptions:
                cur: 1
                all: 0
                pageSize: 15
                totalRecords: 0
            query:
                # 发布时间开始
                BegDate: ''
                # 发布时间结束
                EndDate: ''
                # 状态
                Status: ''
                # 公告标题
                Title: ''
    components:
        datePicker: require '../../../components/date_picker.vue'
        pagination: require '../../../components/pagination.vue'
    events:
        'page-change': () ->
            @queryNoticeList true
    computed: commonMethods.selectAll 'this.list', (item) ->
        return item.NoticeID
    methods:
        ###
        查询公告列表
        @param {Boolean} type 查询状态，是否是点击页码进行翻页查询
        ###
        queryNoticeList: (type) ->
            self = this
            @paginationOptions.cur = 1 if @paginationOptions.cur isnt 1 and !type
            servers.postAjax
                url: '/SysNotice/ErpQuerySysNotice'
                data:
                    PageSize: this.paginationOptions.pageSize
                    PageNumber: this.paginationOptions.cur
                    SearchWhere: this.query
                success: (result) ->
                    if result.ResultCode is 1
                        notice.checked = false for notice in result.Data.PageData
                        self.list = result.Data.PageData
                        self.paginationOptions.totalRecords = result.Data.totalRecords
                        self.paginationOptions.all = result.Data.TotalPages
        ###
        获取公告状态类型集合
        ###
        getStutasLsit: () ->
            self = this
            servers.getAjax
                url: '/BaseLookup/GetSysNoticeFlagList',
                success: (result) ->
                    if result.ResultCode is 1
                        self.statusList = result.Data
        ###
        @param {Array} IDs 需要处理的公告ID列表
        @param {String} type 需要进行处理的类型
                            cancel: 取消
                            check:  发布
        ###
        disposeNoticeList: (IDs, type) ->
            self = this
            # 根据传入的ID列表判断是直接取用还是引入多选结果
            if IDs.length > 0 then IDList = IDs else IDList = this.checkedGroups
            if type is 'check' then url = '/SysNotice/ErpPublishNotice' else url = '/SysNotice/ErpCancelNotice'
            if type is 'check' then text = '发布' else text = '取消'
            servers.postAjax
                url: url
                contentType: 'application/json'
                data: JSON.stringify IDList
                success: (result) ->
                    if result.ResultCode is 1
                        self.$dispatch 'transmit', 'tip', contentText: text + '成功！'
                        self.queryNoticeList true
        # 修改 公告
        editNotice: (noticeID) ->
            @$route.router.go
                name: 'notice-edit',
                query:
                    noticeID: noticeID
        # 查看 公告
        seeNotice: (noticeID) ->
            @$route.router.go
                name: 'notice-see',
                query:
                    noticeID: noticeID
        ###
        重置
        ###
        resetting: () ->
            @$broadcast 'clearDate'
            @query =
                # 发布时间开始
                BegDate: ''
                # 发布时间结束
                EndDate: ''
                # 状态
                Status: ''
                # 公告标题
                Title: ''
    ready: () ->
        # 获取公告状态类型集合，供用户搜索用
        @getStutasLsit()
</script>
