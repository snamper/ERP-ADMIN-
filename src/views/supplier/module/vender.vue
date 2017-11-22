<template id="">


    <div class="container-fluid container-fluid-align ">


    <div class="query-form">
        <div class="query-header">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    供应商资料下发门店
                </label>
                <div class="checkbox-list">
                </div>
                <!--<a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" data-target="#query-detail">收起多余选项<span class="iconfont icon-up"></span></a>-->
            </div>
        </div>
        <div class="form-inline query-detail" @keyup.enter.stop="search">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>编码</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Code">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>名称</label>
                    <input v-model="query.Name" type="text" class="form-control" placeholder="">
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
                    <label class="form-group-text">供应商种类</label>
                    <select class="form-control" v-model="query.VenderType">
                        <option value="">不限</option>
                        <option v-for="opt in venderTypeList" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title scroll-list-title">供应商列表</label>
                    <div class="batch-operation-group">

                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table sheet-list-table-Issued table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll" ></th>
                                </th>
                                <th>供应商编码</th>
                                <th>供应商名称</th>
                                <th>供应商种类</th>
                                <th>备注</th>
                                <th>状态</th>
                                <!--<th>操作</th>-->
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td>
                                <td class="sheet-item-state"><input type="checkbox" v-model="t.checked" /></td>
                            </td>
                            <td>{{t.Code}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">{{t.Name | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.VenderTypeDesc}}">{{t.VenderTypeDesc | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.VenderDetail.Note}}">{{t.VenderDetail.Note | truncationString}}</span></td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>
                            <!--<td>-->
                                <!--<a href="#!/vender/edit/{{t.VenderID}}" data-toggle="tooltip" data-placement="top" title="修改">-->
                                    <!--<span class="click-element iconfont icon-alter"></span>-->
                                <!--</a>-->
                                <!--<a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="{{t.Status ? '禁用' : '启用'}}">-->
                                <!--<span class="iconfont" @click="setStatus([t.VenderID], t.Status ? 0 : 1)" class="click-element" :class="[t.Status ? 'icon-forbid':'icon-play']"></span>-->
                                <!--</a>-->
                            <!--</td>-->
                        </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>
</div>
<edit-modal></edit-modal>
</template>
<script lang="coffee" type="text/coffeescript">
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 当前对接地址
    URL = 'http://192.168.88.47:888/API'

    commonMethods = require '../../../js/common'

    module.exports =
        props: ['idList']
        data: () ->
            return data =
                selectAll: false
                query:
                    Status: ''
                    VenderType: ''
                venderTypeList: []
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 0
                    pageSize: 15
                    totalRecords: 0

        components:

            'pagination': require '../../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item.VenderID
        watch:
            'checkedGroups': (newValue) ->

                this.idList=newValue
        events:

            'page-change': () ->

                this.search true

        methods:
            # 获取供应商可选类型列表
            getVenderTypeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetVenderType'
                    success: (data) ->
                        relf.venderTypeList = data.Data
                    # , URL
            # 搜索
            search: () ->
                self = this

                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasVender/ErpQueryVender'
                    data:
                        PageSize: this.paginationOptions.pageSize
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->

                        if data.ResultCode is 1

                            o.checked = false for o in data.Data.PageData
                            self.tableList = data.Data.PageData
                            self.paginationOptions.all = data.Data.TotalPages
                            self.paginationOptions.totalRecords = data.Data.TotalRecords;
                            servers.NProgress.done ''
                    # , URL

            ###*
             * 重置表单
             * @return {null}
             *###
            resetting: () ->

                @query =

                    Status: ''
                    VenderType: ''


            ###*
             * 启用与禁用
             * @param  {Array} arr    VenderIDList
             * @param  {Number} status 当前状态
             * @return {null}
             *###
            setStatus: (arr, status) ->
                self = this

                arr = this.checkedGroups if arr.length is 0

                return this.$dispatch 'transmit', 'tip', contentText: '请选择要启用或者禁用的供应商!' if arr.length is 0

                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasVender/UpdateStatus'
                    data:
                        VenderIDList: arr,
                        Status: status
                    success: (data) ->

                        if data.ResultCode is 1

                            text = if status then '启用' else '禁用'
                            self.$dispatch 'transmit', 'tip', contentText: text + '成功！'
                            servers.NProgress.done ''
                            self.search()
                    # , URL


        ready: () ->
            this.getVenderTypeList()
            this.search()
</script>



<style rel="stylesheet/less" lang="less">

</style>
