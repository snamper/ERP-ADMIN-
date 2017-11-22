<template>
    <!-- 仓库浏览及操作 -->
    <div class="container-fluid entrepot-show">
        <div class="query-form">
            <div class="query-header">
              <h3>仓库</h3>
            </div>
            <div class="query-body form-inline query-detail" @keyup.enter.stop="search">
                <div class="row">
                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                        <label >编码</label>
                        <input type="text" class="form-control"  placeholder="" v-model="query.code">
                    </div>
                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                        <label >名称</label>
                        <input type="text" class="form-control"  placeholder=""  v-model="query.name">
                    </div>
                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                        <label >状态</label>
                        <select class="form-control"  v-model="query.status">
                            <option value="">不限</option>
                            <option value="1">已启用</option>
                            <option value="0">已禁用</option>
                        </select>
                    </div>
                    <div class="query-button-group query-button-group-pd">
                        <button @click="search" type="button" name="button" class="btn btn-default">搜索</button>
                        <button @click="resetting" type="button" name="button" class="btn btn-default">重置</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a href="#!/entrepot-add" class="btn btn-default">新增</a>
                            <a @click="$dispatch('transmit', 'uploadModalShow', 17)" href="javascript:void(0)" class="btn btn-default">批量导入</a>
                            <a @click="setStatus(false, 1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                            <!-- <a @click="setStatus(false, 0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            <a @click="bulkDelete" href="javascript:void(0)" class="btn btn-default">加入回收站</a>
                            <a @click="goDelete" href="javascript:void(0)" class="btn btn-default">前往回收站</a> -->
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll" ></th>
                                <th>仓库编码</th>
                                <th>仓库名称</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="tr in tableList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="tr.checked" /></td>
                                <td><span>{{tr.Code}}</span></td>
                                <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"  data-target="#sheet-list-detail{{$index}}">
                                    <span class="iconfont"></span>
                                    <span>{{tr.Name}}</span>
                                </td>
                                <td><span>{{tr.Status ? "启用" : "禁用"}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{tr.StockDetail.Note}}">{{tr.StockDetail.Note | truncationString}}</span></td>
                                <td>
                                    <a v-link="'entrepot-edit?id=' + tr.StockID" data-toggle="tooltip" data-placement="top" title="编辑">
                                    <span class="click-element iconfont icon-alter"></span>
                                    </a>
                                    <a href="javascript:;"  data-toggle="tooltip" data-placement="top" title="{{tr.Status ? '禁用' : '启用'}}">
                                    <span class="click-element iconfont" @click="setStatus([tr.StockID], tr.Status ? 0 : 1)" :class="[tr.Status ? 'icon-forbid' : 'icon-play']"></span>
                                    </a>

                                    <a v-link="'deploy-freight?id=' + tr.StockID"  data-toggle="tooltip" data-placement="top" title="配置运费">
                                        <span class="click-element iconfont icon-interface"></span>
                                    </a>
                                    <a v-link="'deploy-courier?id=' + tr.StockID"  data-toggle="tooltip" data-placement="top" title="配置快递">
                                        <span class="click-element iconfont icon-courier courire-color"></span>
                                    </a>
                                    <a v-link="'entrepot-api?id='+tr.StockID"  data-toggle="tooltip" data-placement="top" title="api配置">
                                        <span class="click-element iconfont icon-buyapply"></span>
                                    </a>
                                    <!--<a v-link="entrepot-api"  data-toggle="tooltip"
                                   data-placement="top" title="api配置">
                                    <span class="click-element iconfont icon-buyapply"></span>
                                    </a>-->

                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="12">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="sheet-list-detail{{$index}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table table-condensed">
                                                <thead>
                                                <tr>
                                                    <th>编码</th>
                                                    <th>名称</th>
                                                    <th>负责人</th>
                                                    <th>联系电话</th>
                                                    <th>联系手机</th>
                                                    <th>Email</th>
                                                    <th>默认管理区域</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{{tr.Code}}</td>
                                                    <td><span data-toggle="tooltip" data-placement="top" title="{{tr.Name}}">{{tr.Name  | truncationString }} </span></td>
                                                    <td><span data-toggle="tooltip" data-placement="top" title="{{tr.StockDetail.LinkMan}}">{{tr.StockDetail.LinkMan  | truncationString }} </span></td>
                                                    <td>{{tr.StockDetail.LinkTel}}</td>
                                                    <td>{{tr.StockDetail.Mobile}}</td>
                                                    <td>{{tr.StockDetail.Email}}</td>
                                                    <td>{{tr.StockDetail.StateInfo.Name}}/{{tr.StockDetail.CityInfo.Name}}/{{tr.StockDetail.DistrictInfo.Name}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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

<script lang="coffee">
    ### 仓库列表 ###
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.47:888/API'

    commonMethods = require '../../../js/common'

    module.exports =
    #数据
        data: () ->
            return {
                query: {
                    code: ''
                    name: ''
                    status: ''

                }
                selectList: []
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 1
                    pageSize: 15
                    totalRecords: 0
            }
    #事件
        events:

            'page-change': () ->

                this.search true
    #组件
        components:
            #分页
            'pagination': require '../../../components/pagination.vue'
    #计算
        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item.StockID

    #方法
        methods:
            search: (type) ->
                self = this
                # 当从搜索按钮进入，页码不为 1 时退出函数，并设置页码为 1
                return this.paginationOptions.cur = 1 if this.paginationOptions.cur isnt 1 and type isnt true

                servers.NProgress.start ''
                servers.postAjax
                    url: '/BasStock/ErpQueryStock'
                    data:
                        PageSize: this.paginationOptions.pageSize
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->

                        o.checked = false for o in data.Data.PageData

                        self.tableList = data.Data.PageData
                        self.paginationOptions.all = data.Data.TotalPages
                        self.paginationOptions.totalRecords = data.Data.TotalRecords
                        servers.NProgress.done ''
                    # URL

            #重置
            resetting: ->
                @query =
                    code: ''
                    name: ''
                    status: ''

            setStatus: (arr, status) ->
                self = this

                arr = this.checkedGroups if arr is false

                servers.postAjax
                    url: '/BasStock/UpdateStatus'
                    data:
                        StockIDList: arr
                        Status: status
                    success: (data) ->
                        self.search ''
                        text = if status is 0 then '禁用成功' else '启用成功'
                        self.$dispatch 'transmit', 'tip', contentText: text
                    # URL
#            resetting: ->
#                @query =
#                    name: ''

         ready: () ->
            this.search()


</script>

<style rel="stylesheet/less" lang="less">
    .entrepot-show{
        padding-left:0;
        padding-right:0;
        /*头部查询条件区域*/
        .query-form {
            padding-left: 20px;
            padding-right: 20px;
            background: #fafafa;
            border: 1px solid #e5e5e5;
        }

        .query-header {
            border-bottom: 1px solid #e5e5e5;
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
            .btn-blue-circle {
                margin-top: -4px;
            }
        }

        .checkbox-group {
            display: flex;
            padding-top: 10px;
            .checkbox-title {
                padding-left: 10px;
            }
            .checkbox-list {
                flex: 1;
                .checkbox-inline {
                    margin-left: 12px;
                    margin-bottom: 10px;
                    input {
                        position: relative;
                        margin: 0;
                    }
                }
            }
        }

        .radio-group {
            display: flex;
            padding-top: 10px;
            .radio-title {
                padding-left: 10px;
            }
            .radio-list {
                flex: 1;
                .radio-inline {
                    margin-left: 12px;
                    margin-bottom: 10px;
                    input {
                        position: relative;
                        margin: 0;
                    }
                }
            }
        }

        .query-detail {
            padding-top: 20px;
            .form-group {
                display: flex;
                /*margin-bottom: 12px;*/
                label {
                    min-width: 80px;
                    text-align: right;
                    line-height: 34px;
                    margin-right: 12px;
                    color: #666;
                    font-weight: normal;
                }
                .form-control {
                    flex: 1;
                    width: 100%;
                    &.form-control-multiple {
                        margin-left: 10px;
                    }
                }
            }
        }

        .form-required-mark {
            color: #ff5252;
        }

        .date-wrap {
            flex: 1;
            width: 100%;
            .input-group {
                width: 100%;
            }
        }

        .date-link {
            padding-left: 5px;
            padding-right: 5px;
            line-height: 34px;
        }

        .query-button-group {
            padding-left: 92px;
            margin-bottom: 20px;
            margin-top: 20px;
        }

        /*订单列表区域*/
        .sheet-list {
            margin-top: 20px;
            border: 1px solid #e5e5e5;
        }

        .sheet-tab {
            display: flex;
            border-bottom: 1px solid #e5e5e5;
            .sheet-state {
                width: 100%;
                font-size: 0;
            }
            .sheet-tab-link {
                display: inline-block;
                background: #fafafa;
                line-height: 50px;
                border: 1px solid #e5e5e5;
                color: #999;
                font-size: 14px;
                margin-left: -1px;
                margin-bottom: -1px;
                margin-top: -1px;
                width: 148px;
                text-align: center;
                &.active {
                    border-bottom: 1px solid transparent;
                    color: #666;
                    background: #fff;
                }
            }
            .btn-blue-circle {
                margin-top: 4px;
                margin-right: 20px;
            }
        }

        .batch-operation {
            display: flex;
            padding: 16px 20px;
            .batch-operation-title {
                display: inline-block;
                padding: 6px 14px 6px 10px;
                color: #666;
                font-weight: normal;
                white-space: nowrap;
            }
            .btn {
                margin-left: 10px;
                margin-bottom: 10px;
            }
        }

        .sheet-list-table {
            .table > tbody + tbody {
                border-top: none;
            }
            tbody {
                border: none;
            }
            .table {
                border-collapse: separate;
                > thead {
                    > tr {
                        > th {
                            border: none;
                            white-space: nowrap;
                            vertical-align: middle;
                            color: #626e8e;
                            font-weight: normal;
                        }
                    }
                }
            }
            > .table {
                > thead {
                    th {
                    }
                }
            }
            td {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.collapse {
                    user-select: none;
                }
                &.sheet-item-remark {
                    max-width: 100px;
                    span {
                        display: inline-block;
                        max-width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                    }
                    .tooltip {
                        transform: translate(-100px, 100px);
                    }
                    .tooltip-inner {
                        white-space: pre-wrap;
                        left: 0;
                    }
                }
                &.show-detail-ctrl {
                    color: #4167cc;
                    background: #fff;
                }
            }
            .sheet-list-item {
                &.detail-opened {
                    td {
                        &.show-detail-ctrl {
                            border-top-left-radius: 5px;
                            border-top-right-radius: 5px;
                            color: #fff;
                            background: #8996b0;
                        }
                        &:not(.show-detail-ctrl) {
                            background: #fff;
                        }
                    }
                }
                &:hover {
                    td {
                        background: #F7F7F7;
                    }
                }
                &.selected {
                    td {
                        background: darken(#8996b0, 20%);
                    }
                }
                .courire-color {
                    color: #fff;
                    width: 18px;
                    height: 18px;
                    border-radius: 2px;
                    display: inline-block;
                    text-align: center;
                    line-height: 18px;
                    background-color: #8280d1;

                }
            }
            .table-condensed {
                margin-bottom: 0;
                > tbody {
                    > .sheet-list-detail {
                        background: #8996b0;
                        > td {
                            padding: 0;
                            border-top: none;
                        }
                    }
                }
                .sheet-detail-wrap {
                    padding: 18px;
                }
            }
            .table > tbody > .sheet-list-item {
                &.detail-opened {
                    > td {
                        border-bottom: none;
                    }
                }
                > td {
                    border-bottom: 1px dashed #ccc;
                    border-top: none;
                }
            }
            .table > tbody > tr > td {
                padding: 5px 14px 5px 10px;
                vertical-align: middle;
                &.detail-btn-group {
                    padding: 0;
                }
            }
            .table > thead > tr > th {
                padding: 5px 14px 5px 10px;
            }
            .sheet-list-detail {
                .table {
                    > thead {
                        > tr {
                            > th {
                                background: #a6b2c9;
                                color: #fff;
                            }
                        }
                    }
                }
            }
            .list-detail-operation {
                background: #8996b0;
                .btn {
                    margin-top: 10px;
                }
            }
            .sheet-list-item {
                .show-detail-ctrl {
                    .iconfont {
                        font-size: 12px;
                        border-radius: 3px;
                        border: 2px solid #4167cc;
                        color: #4167cc;
                        background: #fff;
                        margin-right: 3px;
                        padding: 3px;
                        line-height: 1;
                        display: inline-block;
                        vertical-align: middle;
                        transform: scale(0.6);
                        font-weight: bold;
                        &:before {
                            content: '\e609';
                        }
                    }
                }
                &.detail-opened {
                    .show-detail-ctrl {
                        .iconfont {
                            &:before {
                                content: '\e60a';
                            }
                        }
                    }
                }
            }
            .sheet-header-state,
            .sheet-item-state {
                input {
                    margin-right: 36px;
                    vertical-align: middle;
                }
            }
            .btn-change {
                color: #96bee7;
            }
            .btn-delete {
                color: #eb8678;
            }
            .btn-save {
                color: #84cd84;
            }
            .sheet-list-delete,
            .sheet-list-edit {
                .iconfont {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 3px;
                    color: #fff;
                }
            }
            .sheet-list-delete {
                margin-right: 10px;
                .iconfont {
                    background: #96bee7;
                    &:before {
                        content: '\e60b';
                    }
                }
            }
            .sheet-list-edit {
                .iconfont {
                    background: #eb8678;
                    &:before {
                        content: '\e60c';
                    }
                }
            }

        }
        .query-button-group-pd{
            padding-left:107px;
        }
    }
</style>
