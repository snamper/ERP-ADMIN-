<template id="STWarehouse">
    <div class="operate-form-title">
        <p>仓库货位管理</p>
    </div>
    <div class="container-fluid container-fluid-margin">
    <div class="query-form" @keyup.enter.stop="search(tableList)">
        <div class="form-inline query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>货位名称</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Name">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>所属仓库</label>
                    <select class="form-control" v-model="query.StockID">
                        <!--<option value="">不限</option>-->
                        <option value="">不限</option>
                        <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                    </select>
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
                    <label class="form-group-text">业务类型</label>
                    <select class="form-control" v-model="query.SpaceTransferID">
                        <option value="">不限</option>
                        <option v-for="opt in spaceTransferList" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">用途类型</label>
                    <select class="form-control" v-model="query.SpaceUseTypeID">
                        <option value="">不限</option>
                        <option v-for="opt in spaceUseTypeList" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">搜索顺序</label>
                    <select class="form-control" v-model="query.SpaceOrder">
                        <option value="">不限</option>
                        <option v-for="opt in spaceOrderList" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search(tableList)" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <div class="batch-operation-group">
                        <a class="btn btn-default" href="#!/space/add">新增</a>
                        <a @click="$dispatch('transmit', 'uploadModalShow', 18)" href="javascript:void(0)" class="btn btn-default">批量导入</a>
                        <a @click="setStatus([], 1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                        <a @click="setStatus([], 0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                                <th>货位名称</th>
                                <th>用途类型</th>
                                <th>业务类型</th>
                                <th>搜索顺序</th>
                                <th>所属仓库</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td><input type="checkbox" name="" value="" v-model="t.checked"></td>
                            <td>{{t.Name}}</td>
                            <td><span v-for="i in spaceUseTypeList" v-if="i.Code === t.SpaceUseTypeID">{{i.Text}}</span></td>
                            <td><span v-for="i in spaceTransferList" v-if="i.Code === t.SpaceTransferID">{{i.Text}}</span></td>
                            <td>{{t.SpaceOrder}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Stock.Name}}">{{t.Stock.Name | truncationString}}</span></td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.SpaceDetail.Note}}">{{t.SpaceDetail.Note | truncationString}}</span></td>
                            <td>
                                <a href="#!/space/edit?id={{t.SpaceID}}" data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="click-element click-element iconfont icon-alter"></span>
                                </a>
                                <a href="#!/space/see?id={{t.SpaceID}}&name={{t.Name}}"data-toggle="tooltip" data-placement="top" title="查看货位商品">
                                    <span class="click-element iconfont icon-look"></span>
                                </a>
                                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="{{t.Status ? '禁用' : '启用'}}">
                                <span class="iconfont click-element" @click="setStatus([t.SpaceID], t.Status ? 0 : 1)" :class="[t.Status ? 'icon-forbid':'icon-play']"></span>
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
</template>
<script lang="coffee" type="text/coffeescript">
    ### 仓库货位管理 ###
    # 全局服务
    servers = require '../../../js/servers/servers'

    commonMethods = require '../../../js/common'
    # 全局可替换链接
    URL = 'http://192.168.88.47:888/API'

    module.exports =

        data: () ->
            return data =
                query:
                    Name: ''
                    StockID: ''
                    Status: ''
                    SpaceTransferID: ''
                    SpaceUseTypeID: ''
                    SpaceOrder: ''
                selectAll: false
                # 货位业务类型列表
                spaceTransferList: []
                # 货位用途类型编码列表
                spaceUseTypeList: []
                # 货位搜索顺序列表
                spaceOrderList: []
                # 所属仓库列表
                stockList: []
                # 搜索结果存放地址
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 0
                    pageSize: 15
                    totalRecords: 0

        components:
            'pagination': require '../../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item.SpaceID

        methods:
            ###*
             * 获取list
             * @param  {string} name 储存键值
             * @param  {string} url  获取地址
             * @return {null}
             *###

            getList: (name, url) ->
                self = this

                servers.getAjax
                    url: url
                    success: (data) ->
                        self[name] = data.Data
            #重置
            resetting:  ->
                @query =
                    Name: ''
                    StockID: ''
                    Status: ''
                    SpaceTransferID: ''
                    SpaceUseTypeID: ''
                    SpaceOrder: ''



            ###*
             * 搜索仓库列表
             * @return {null}
             *###
            search: (type) ->
                self = this
                # 当从搜索按钮进入，页码不为 1 时退出函数，并设置页码为 1
                return this.paginationOptions.cur = 1 if this.paginationOptions.cur isnt 1 and type isnt true
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasSpace/ErpQuerySpace'
                    data:
                        PageSize: this.paginationOptions.pageSize
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->

                        if data.ResultCode is 1

                            o.checked = false for o in data.Data.PageData

                            self.tableList = data.Data.PageData

                            servers.NProgress.done ''

                            self.paginationOptions.all = data.Data.TotalPages
                            self.paginationOptions.totalRecords = data.Data.TotalRecords;

            ###*
             * 启用与禁用
             * @param  {Array} arr    VenderIDList
             * @param  {Number} status 当前状态
             * @return {null}
             *###
            setStatus: (arr, status) ->
                self = this

                arr = @checkedGroups if arr.length is 0
                if arr.length is 0 
                    return @$dispatch 'transmit', 'tip', contentText: '请勾选货位之后进行此操作'
                servers.NProgress.start()
                servers.postAjax.bind(this)
                    url: '/BasSpace/UpdateStatus'
                    data:
                        SpaceIDList: arr,
                        Status: status
                    success: (data) ->
                        servers.NProgress.done
                        if data.ResultCode is 1
                            text = if status then '启用' else '禁用'
                            self.$dispatch 'transmit', 'tip', contentText: text + '成功！'
                            self.search()

        events:
            'edit-storage-success': () ->
                this.search()
            'page-change': () ->
                this.search true


        ready: () ->
            # 获取所有列表
            this.getList 'spaceTransferList', '/BaseLookup/GetSpaceTransferID'
            this.getList 'spaceUseTypeList', '/BaseLookup/GetSpaceUseTypeID'
            this.getList 'spaceOrderList', '/BaseLookup/GetSpaceOrder'
            this.getList 'stockList', '/BaseLookup/GetStockList'
            this.search(this.tableList)
</script>

<style type="text/css" lang="less">

</style>
