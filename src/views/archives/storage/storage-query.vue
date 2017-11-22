<template id="storage-query">
    <!--<div class="operate-form-title">-->
        <!--<p>商品货位管理</p>-->
    <!--</div>-->
    <div class="container-fluid container-fluid-margin">
    <div class="query-form" @keyup.enter.stop="search">
        <div class="query-header query-header-margin">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    商品货位管理
                </label>
                <div class="checkbox-list">
                </div>
                <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
            </div>
        </div>
        <div class="form-inline query-detail">
            <div class="row expand-show" :class="{'show-expand' : show.flog}">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>状态</label>
                    <select class="form-control" v-model="query.Status">
                    <option value="">不限</option>
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>分类</label>
                    <select class="form-control" v-model="query.DeptID">
                    <option value="">不限</option>
                        <option v-for="opt in deptList" value="{{opt.DeptID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>品牌</label>
                    <select class="form-control" v-model="query.BrandID">
                    <option value="">不限</option>
                        <option v-for="opt in brandList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>产地</label>
                    <input class="form-control" type="text" v-model="query.Orgin">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>年份</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Years">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>规格</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Spec">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>建议售价</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.MarketPriceMin">
                    <span style="
    line-height: 31px;
"> ~ </span>
                    <input type="text" class="form-control" placeholder="" v-model="query.MarketPriceMax">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>季节</label>
                    <select class="form-control" v-model="query.SeasonID">
                    <option value="">不限</option>
                        <option v-for="opt in seasonList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>系列</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Series">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>SKU</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Sku">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>性别</label>
                    <select class="form-control" v-model="query.SexID">
                    <option value="">不限</option>
                        <option v-for="opt in sexList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>设计师</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Designer">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>单位</label>
                    <input class="form-control" type="text" name="name" v-model="query.Unit">
                </div>
                <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>条形码</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.CustomBC">
                </div> -->
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>国际码</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Barcode">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>货位编码</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.SpaceName">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>所属仓库</label>
                    <select class="form-control" v-model="query.StockID">
                    <option value="">不限</option>
                        <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>颜色</label>
                    <select class="form-control" v-model="query.ColorID">
                    <option value="">不限</option>
                        <option v-for="opt in colorList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>尺码</label>
                    <select class="form-control" v-model="query.SizeID">
                    <option value="">不限</option>
                        <option v-for="opt in sizeList" value="{{opt.PropertyID}}">{{opt.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品名称</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.GoodsName">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商品货号</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.CustomNo">
                </div>
            </div>
            <div class="query-button-group">
                <a @click="search()" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <div class="batch-operation-group">
                        <span>批量操作：</span>
                        <a @click="setStatus([], 1)" href="javascript:void(0)" class="btn btn-default">绑定货位</a>
                        <a @click="setStatus([], 0)" href="javascript:void(0)" class="btn btn-default">解除绑定</a>
                        <a @click="$dispatch('transmit', 'uploadModalShow', 19)" href="javascript:void(0)" class="btn btn-default">导入商品货位</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                                <th>SKU</th>
                                <th>商品货号</th>
                                <th>商品名称</th>
                                <th>颜色</th>
                                <th>尺码</th>
                                <th>所属仓库</th>
                                <th>货位编码</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td><input type="checkbox" name="" value="" v-model="t.checked"></td>
                            <td>{{t.Sku}}</td>
                            <td>{{t.CustomNo}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.GoodsName}}">{{t.GoodsName | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Color}}">{{t.Color  | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Size}}">{{t.Size | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.StockName}}">{{t.StockName | truncationString}}</span></td>
                            <td>{{t.SpaceName}}</td>
                            <!-- 未绑定状态时为红色文字 -->
                            <td :class="{'red-text': t.BindStatus == '未绑定'}">{{t.BindStatus}}</td>
                            <td>
                            <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="解除绑定">
                                <span @click="t.BindStatus == '已经绑定' ? setStatus([t], 0) : $dispatch('transmit','tip',{contentText:'请先绑定'})" class="click-element iconfont icon-remove"></span>
                            </a>
                            <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="绑定货位">
                                <span @click="setStatus([{StockID: t.StockID, BarcodeID: t.BarcodeID, SpaceID: t.SpaceID}], 1)" class="click-element iconfont icon-binding"></span>
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
<choose-shelves></choose-shelves>
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
                show:
                    flog: false
                selectAll: false
                query:
                    Status: ''
                    DeptID: ''
                    BrandID: ''
                    Orgin: ''
                    Years: ''
                    Spec: ''
                    MarketPriceMin: ''
                    MarketPriceMax: ''
                    SeasonID: ''
                    Series: ''
                    SexID: ''
                    Designer: ''
                    Unit: ''
                    Barcode: ''
                    SpaceName:''
                    StockID: ''
                    ColorID: ''
                    SizeID: ''
                    GoodsName: ''
                    CustomNo: ''
                sizeList: []
                colorList: []
                brandList: []
                seasonList: []
                tableList: []
                stockList: []
                deptList: []
                relieveList: []
                sexList: []
                paginationOptions:
                    cur: 1
                    all: 1
                    pageSize: 15
                    totalRecords: 0

        components:
            'chooseShelves': require './choose-shelves.vue'
            'pagination': require '../../../components/pagination.vue'
        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return {
                StockID: item.StockID
                BarcodeID: item.BarcodeID
                SpaceID: item.SpaceID
                BindStatus: item.BindStatus
            }

        methods:
            # 收展多余的选项
            toggleItem:  ->
                this.show.flog = !this.show.flog

            # 重置列表
            resetting: ->
                @query =
                    Status: ''
                    DeptID: ''
                    BrandID: ''
                    Orgin: ''
                    Years: ''
                    Spec: ''
                    MarketPriceMin: ''
                    MarketPriceMax: ''
                    SeasonID: ''
                    Series: ''
                    SexID: ''
                    Designer: ''
                    Unit: ''
                    Barcode: ''
                    SpaceName:''
                    StockID: ''
                    ColorID: ''
                    SizeID: ''
                    GoodsName: ''
                    CustomNo: ''
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

                            self.paginationOptions.all = data.Data.TotalPages
                            self.paginationOptions.totalRecords = data.Data.TotalRecords
                            servers.NProgress.done ''

            ###*
             * @param  {string} name 储存键值
             * @param  {string} url  获取地址
             * @return {null}
             *###
            getList: (name, url) ->
                # 获取list
                relf = this

                servers.getAjax
                    url: url
                    success: (data) ->
                        relf[name] = data.Data

            ###*
             * 设置绑定状态
             * @param  {Array} arr     SpaceIDList
             * @param  {Number} status 需要修改成什么状态 0： 解除绑定 1： 绑定
             * @param  {string} name   当前货位名称
             * @return {null}
             *###
            setStatus: (arr, status, name) ->
                self = this
                arr = this.checkedGroups if arr.length is 0

                return this.$dispatch 'transmit', 'tip', contentText: '请先选择商品货位!' if arr.length is 0

                this.relieveList = []

                switch status
                    when 0
                        self.$dispatch 'transmit', 'tip',
                            name: '提示'
                            btnName: '解除绑定'
                            contentText: '解除绑定操作无法恢复？解除绑定后，商品在货架上的库存数量变为0，你确定要继续吗？'
                            events:
                                cancel: ''
                                confirm: 'relieve-bind'

                        for o in arr

                            if o.BindStatus is '已经绑定'

                                this.relieveList.push

                                    StockID: o.StockID
                                    BarcodeID: o.BarcodeID
                                    SpaceID: o.SpaceID


                    when 1

                        # 绑定时的提示。暂时用不到
                        # fix = {}
                        #
                        # for space, index in arr
                        #
                        #     if fix[space.StockID]
                        #
                        #         fix[space.StockID] += 1
                        #
                        #     else
                        #
                        #         if index > 0
                        #
                        #             return @$dispatch 'transmit', 'tip', contentText: '勾选存在两个或以上的不同仓库！'
                        #
                        #         fix[space.StockID] = 1

                        for o in arr

                            this.relieveList.push

                                StockID: o.StockID
                                BarcodeID: o.BarcodeID
                                SpaceID: o.SpaceID

                        self.$broadcast 'choose-shelves', this.relieveList

        events:
            'relieve-bind': () ->
                self = this

                return @$dispatch 'transmit', 'tip', contentText: '暂无已经绑定的货位' if @relieveList.length is 0

                servers.postAjax.bind(this)
                    url: '/BasSpaceGoods/ErpSaveSpaceGoods'
                    data:
                        List: this.relieveList
                        Status: 0
                    success: (data) ->

                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '解除绑定成功'
                            self.search ''

                    # , URL

            'choose-shelves-success': () ->
                this.search ''

            'page-change': () ->

                this.search true

        ready: () ->
            # 设置SpaceName
            # 搜索时需要的参数之一
            # 必要参数
            # 通过vue官方路由模块传入 params 共有两个属性 id name
            this.query.SpaceName = this.$route.params.name

            # 这里获取所有的可选列表
            # 获取所有属性
            servers.filterList this
            # 获取供应商可选列表
            servers.getVenderList this, 'venderList'
            # 获取分类可选列表
            this.getList 'deptList', '/BaseLookup/GetDeptList'
            # 获取仓库可选列表
            this.getList 'stockList', '/BaseLookup/GetStockList'
            # 进入页面自动查询
            this.search()




</script>
<style lang="less" media="screen">
    .red-text{
        color: red;
    }
</style>
