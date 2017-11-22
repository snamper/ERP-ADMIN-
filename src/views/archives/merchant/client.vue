<template id="">
    <div class="operate-form-title">
        <p>客户</p>
    </div>
    <div class="container-fluid container-fluid-align">
    <div class="query-form">
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
                    <label class="form-group-text">客户种类</label>
                    <select class="form-control" v-model="query.CustomerType">
                        <option value="">不限</option>
                        <option v-for="opt in customerType" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">客户等级</label>
                    <select class="form-control" v-model="query.CustomerGradeID">
                        <option value="">不限</option>
                        <option v-for="opt in customerGradeList" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
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
                    <div class="batch-operation-group">
                        <a href="#!/client/add" class="btn btn-default" >新增</a>
                        <a href="javascript:void(0)" @click="$dispatch('transmit', 'uploadModalShow', 15)" class="btn btn-default">导入</a>
                        <a href="javascript:void(0)" @click="setStatus(false, 1)" class="btn btn-default">启用</a>
                        <a href="javascript:void(0)" @click="setStatus(false, 0)" class="btn btn-default">禁用</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll" ></th>
                                <th>编码</th>
                                <th>客户名称</th>
                                <th>客户种类</th>
                                <th>客户等级</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td class="sheet-item-state"><input type="checkbox" v-model="t.checked" /></td>
                            <td>{{t.Code}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">{{t.Name | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.CustomerTypeDesc}}">{{t.CustomerTypeDesc | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.CustomerGrade.Name}}">{{t.CustomerGrade.Name  | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.CustomerDetail.Note}}">{{t.CustomerDetail.Note | truncationString}}</span></td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>
                            <td>
                            <a href="#!/client/edit?id={{t.CustomerID}}" data-toggle="tooltip" data-placement="top" title="修改">
                                <span class="click-element iconfont icon-alter"></span>
                            </a>

                             <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="{{t.Status ? '禁用' : '启用'}}">
                                <span @click="setStatus([t.CustomerID], t.Status ? 0 : 1)" class="click-element iconfont" :class="[t.Status ? 'icon-forbid':'icon-play']"></span>
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
        data: () ->
            return data =
                selectAll: false
                query: {
                    Code: ''
                    Name: ''
                    Status: ''
                    CustomerType: ''
                    CustomerGradeID: ''
                }
                customerType: []
                customerGradeList: []
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 1
                    pageSize: 15
                    totalRecords: 0
        components:
            'pagination': require '../../../components/pagination.vue'
        computed: commonMethods.selectAll 'this.tableList', (item) ->
            return item.CustomerID
        methods:
            # 获取客户可选类型列表
            getClientTypeList: () ->
                relf = this
                servers.getAjax
                    url: '/BaseLookup/GetCustomerType'
                    success: (data) ->
                        relf.customerType = data.Data
            # 获取客户可选等级列表
            getCustomerGradeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetBasCustomerGradeList'
                    success: (data) ->
                        relf.customerGradeList = data.Data

            # 重置
            resetting: ->
                @query =
                    Code: ''
                    Name: ''
                    Status: ''
                    CustomerType: ''
                    CustomerGradeID: ''
            # 搜索
            search: (type) ->
                self = this
                # 当从搜索按钮进入，页码不为 1 时退出函数，并设置页码为 1
                return this.paginationOptions.cur = 1 if this.paginationOptions.cur isnt 1 and type isnt true
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasCustomer/ErpQueryCustomer'
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
            ###*
             * 启用与禁用
             * @param  {Array} arr    VenderIDList
             * @param  {Number} status 当前状态
             * @return {null}
             *###
            setStatus: (arr, status) ->
                self = this
                arr = this.checkedGroups if arr is false
                return @$dispatch 'transmit', 'tip', contentText: '请先选择客户' if arr.length is 0
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasCustomer/UpdateStatus'
                    data:
                        CustomerIDList: arr,
                        Status: status
                    success: (data) ->
                        if data.ResultCode is 1
                            text = if status then '启用' else '禁用'

                            self.$dispatch 'transmit', 'tip', contentText: text + '成功！'
                            servers.NProgress.done ''
                            self.search()
        events:
            'page-change': () ->
                this.search true
        ready: () ->
            this.getClientTypeList()
            this.getCustomerGradeList()
            this.search()
</script>
<style rel="stylesheet/less" lang="less">


</style>
