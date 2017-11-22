<template id="storage-see">
    <div class="operate-form-title">
        <p>查看货位商品</p>
    </div>
    <div class="container-fluid">
    <div class="query-form">
        <div class="form-inline query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>SKU</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Sku">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品货号</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.CustomNo">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品名称</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.GoodsName">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>颜色</label>
                    <select class="form-control" v-model="query.ColorID">
                        <option v-for="opt in colorList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>尺码</label>
                    <select class="form-control" v-model="query.SizeID">
                        <option v-for="opt in sizeList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search()" href="javascript:void(0)" class="btn btn-default">搜索</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <div class="batch-operation-group">
                        <span>当前货位：{{$route.params.name}}</span>
                        <a @click="show" href="javascript:void(0)" class="btn btn-default">清点库存商品</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <!-- <th><input type="checkbox" name="" value="" v-model="selectAll"></th> -->
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>颜色</th>
                                <th>尺码</th
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <!-- <td><input type="checkbox" name="" value="" v-model="t.checked"></td> -->
                            <td>{{t.Sku}}</td>
                            <td>{{t.CustomNo}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.GoodsName}}">{{t.GoodsName  | truncationString }} </span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Color}}">{{t.Color  | truncationString }} </span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Size}}">{{t.Size}}  | truncationString }} </span></td>
                        </tr>
                        </tbody>
                    </table>
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>
</div>
<clear-list></clear-list>
</template>
<script lang="coffee">
    ### 仓库货位管理 ###
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.47:888/API'

    commonMethods = require '../../../js/common'

    module.exports =
        data: () ->
            return data =
                selectAll: false
                query:
                    SpaceName: '',
                    SpaceID:''
                sizeList: []
                colorList: []
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 1
                    pageSize: 15
                    totalRecords: 0

        components:
            "clear-list": require './clear-list.vue'
            'pagination': require '../../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item

        events:
            # 清除成功时重新搜索一次，更新列表
            'clear-list-success': () ->
                this.search()

            'page-change': () ->

                this.search true


        methods:
            ###*
             * 获取list
             * @param  {string} name 储存键值
             * @param  {string} url  获取地址
             * @return {null}
             *###
            getList: (name, url) ->
                relf = this

                servers.getAjax
                    url: url
                    success: (data) ->
                        relf[name] = data.Data

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
                    url: '/BasSpaceGoods/ErpQuerySpaceGoods'
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
                            self.paginationOptions.totalRecords = data.Data.TotalRecords

            ###*
             * 显示 清点库存商品
             * @return {null}
             *###
            show: () ->
                # 当前id父级页面路由传入
                this.$broadcast 'show-clear-list', this.$route.params.id

            getQueryString:(name)->                
                reg=new RegExp('(^|&)id=([^&]*)(&|$)')
                r=window.location.search.substr(1).match(reg)
                if(r!=null)
                    return unescape(r[2])
                return null

        ready: () ->                                    
            this.search()
            # 获取所有属性
            servers.filterList this
        route:
            data: (transition) ->
                this.query.SpaceID=transition.to.query.id                
                
</script>
