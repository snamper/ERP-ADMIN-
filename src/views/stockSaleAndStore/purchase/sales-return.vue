<template>
    <div class="operate-form-title">
        <p>采购退货单</p>
    </div>
    <div class="query-form" @keyup.enter.stop="search">
    <div class="query-header query-header-margin ">
        <div class="checkbox-group">
            <label class="checkbox-title">
                订单状态:
            </label>
            <div class="checkbox-list">
                <label class="checkbox-inline" v-for="label in statusList">
                    <input v-model="query.Flag" type="checkbox" value="{{label.Code}}" code="{{label.Code}}"><span>{{label.Text}}</span>
                </label>
            </div>
            <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
        </div>
    </div>
    <div class="query-body form-inline query-detail">
        <div class="row expand-show" :class="{'show-expand' : show.flog}">
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 退货单号</label>
                <input v-model="query.Sheet | arrayToString" type="text" class="form-control" placeholder="多个单号之间用;隔开">
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 供应商</label>
                <select class="form-control" name="" v-model="query.VenderID">
                    <option value="">不限</option>
                    <option v-for="opt in venderList" value="{{opt.VenderID}}">{{opt.Name}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 退货仓库</label>
                <select class="form-control" name=""  v-model="query.StockID">
                    <option value="">不限</option>
                    <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                </select>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6" style="width: 500px;">
                <label> 退货时间</label>
                <div class='input-group date' id='PurDate-timepicker'>
                    <input v-model="query.PurDate | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <span style="line-height:23px;"> ~ </span>
                <div class='input-group date' id='PurDate-to-timepicker'>
                    <input v-model="query.PurDate_To | formatDate" type='text' class="form-control" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label> 订单备注</label>
                <input v-model="query.Note" type="text" class="form-control" placeholder="">
            </div>
        </div>
        <div class="query-button-group">
            <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
            <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
        </div>
    </div>
    <div class="sheet-list sheet-list-margin">
    <div class="row">
        <div class="col-lg-12">
            <div class="batch-operation">
                <div class="batch-operation-group">
                    <span>批量操作：</span>
                    <a href="#!/JXC/sales-return/add" class="btn btn-default">新增</a>
                    <!-- <a href="javascript:void(0)" class="btn btn-default" @click="dispatch('transmit', 'uploadModalShow', '')">批量导入</a> -->
                    <a @click="checkList([], 30)" href="javascript:void(0)" class="btn btn-default">批量审核</a>
                    <a @click="checkList([], 97)" href="javascript:void(0)" class="btn btn-default">取消订单</a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive table-responsive-margin">
                <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                            <th>状态</th>
                            <th>订单编号</th>
                            <th>供应商</th>
                            <th>退货仓库</th>
                            <th>商品数</th>
                            <th>明细数</th>
                            <th>下单时间</th>
                            <th>修改人</th>
                            <th>修改时间</th>
                            <th>审核人</th>
                            <th>审核时间</th>
                            <th>退货日期</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                            <td class="sheet-header-state"><input type="checkbox" v-model="t.checked"></td>
                            <td>
                                {{t.Flag == 100 ? '已完成' : ''}}
                                {{t.Flag == 97 ? '已取消' : ''}}
                                {{t.Flag == 30 ? '已审核' : ''}}
                                {{t.Flag == 0 ? '未审核' : ''}}
                            </td>
                            <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list" data-target="#{{t.RetID}}"><span class="iconfont"></span><span>{{t.Sheet}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.VenderName}}">{{t.VenderName | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.StockName}}">{{t.StockName | truncationString }} </span></td>
                            <td>{{t.BarCodeNum}}</td>
                            <td>{{t.Qty}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.EditTime | truncationTimeString}}">{{t.EditTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Editor}}">{{t.Editor | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.EditTime | truncationTimeString}}">{{t.EditTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Checker }}">{{t.Checker | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.CheckTime | truncationTimeString}}">{{t.CheckTime | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.PurDate | truncationTimeString  }}">{{t.PurDate | formatDateFormShow}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Note}}">{{t.Note | truncationString}}</td>
                            <td>
                                <!-- <span class="click-element" v-if="t.Flag === 0" @click="edit">修改</span>
                                <span class="click-element" v-if="t.Flag === 0">|</span> -->
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="审核">
                                <span @click="checkList([t], 30)" class="click-element iconfont icon-verify" v-if="t.Flag === 0"></span></a>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="取消">
                                <span @click="checkList([t], 97)" class="click-element iconfont icon-cancel" v-if="t.Flag === 0"></span>
                                </a>
                                <a href="#!/JXC/sales-return/see?id={{t.RetID}}" data-toggle="tooltip" data-placement="top" title="查看">
                                <span class="click-element iconfont icon-look" v-if="t.Flag == 97 || t.Flag == 100 || t.Flag == 30"></span>
                                </a>
                                <a href="#!/JXC/sales-return/edit?id={{t.RetID}}" data-toggle="tooltip" data-placement="top" title="修改">
                                <span class="click-element iconfont icon-alter" v-if="t.Flag === 0"></span>
                                </a>
                            </td>
                        </tr>
                        <tr class="sheet-list-detail">
                            <td colspan="12">
                                <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel" id="{{t.RetID}}">
                                    <jxc-detail :is-handle="getIsHandle(t.Flag)" :index = "$index" :list.sync="t.BusRetGoodInfo_Views" :type="3" model-name="inform" del-url="/BusPlanReceipt/ErpDelBusRetItem"></jxc-detail>
                                    <div style="padding: 0 18px 10px;" v-if="getIsHandle(t.Flag)">
                                        <a @click.stop="submitItem(t, $index)" href="javascript:void(0)" class="btn btn-default">保存</a>
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
<script lang="coffee" type="text/coffeescript">
    servers = require '../../../js/servers/servers'
    commonMethods = require '../../../js/common'
    module.exports =
        data: () ->
            return {
                show:
                    flog: false
                selectAll: false
                query:
                    Sheet: ''
                    VenderID: ''
                    StockID: ''
                    Note: ''
                    Flag: []
                    PurDate: ''
                    PurDate_To: ''
                returnList: []
                stockList: []
                venderList: []
                statusList: []
                tableList: []
                paginationOptions:
                    cur: 1
                    all: 0
                    pageSize: 15
                    totalRecords: 0
                cancelList: []
            }
        components:
            'jxc-detail': require './JXC-detail.vue'

            'pagination': require '../../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item

        events:
            'refresh-list': () ->
                this.search ''

            'page-change': () ->

                this.search true

            'cancel-list': () ->
                self = this
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BusRet/CheckBusRet'
                    data:
                        BusRetList: @cancelList
                        Flag: 97
                    success: (data) ->
                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '操作成功！'
                            self.search ''
                            self.NProgress.done ''

        methods:

            #  收展多余的选项
            toggleItem: ->
                this.show.flog = !this.show.flog;

            #  重置列表
            resetting: ->
                @query = {
                    Sheet: ''
                    VenderID: ''
                    StockID: ''
                    Flag: []
                    PurDate: ''
                    PurDate_To: ''
                    Note: ''
                }

            ###*
             * 获取可选列表
             * @param  {string} name 储存地址
             * @param  {string} url  接口地址
             * @return {null}
             *###
            getList: (name, url) ->
                relf = this

                servers.getAjax
                    url: url
                    success: (data) ->
                        relf[name] = data.Data

            submitItem: (obj, index) ->

                self = this
                list = []

                @$broadcast 'submit-before', (submitType) ->

                    if submitType
                        items = obj.BusRetGoodInfo_Views
                        for item in items

                            list.push

                                RetID: item.RetID || obj.RetID,
                                BarcodeID: item.BarcodeID,
                                Qty: item.Qty,
                                RetItemID: item.RetItemID,
                                Price: item.Price

                        servers.postAjax.bind(self)

                            url: '/BusRet/ErpSaveBusRetItemList'
                            data: BusRetItemList: list
                            success: (data) ->

                                if data.ResultCode is 1

                                    self.$dispatch 'transmit', 'tip', contentText: '保存成功！'
                                    self.search ''
                , index

            ###*
             * 搜索退货列表
             * @return {null}
             *###
            search: (type) ->
                self = this

                # 当从搜索按钮进入，页码不为 1 时退出函数，并设置页码为 1
                return this.paginationOptions.cur = 1 if this.paginationOptions.cur isnt 1 and type isnt true

                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BusRet/ErpQueryBusRet'
                    data:
                        PageSize: this.paginationOptions.pageSize
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->

                        if data.ResultCode is 1

                            for o in data.Data.PageData

                                o.slideList = false
                                o.checked = false

                            servers.NProgress.done ''

                            self.tableList = data.Data.PageData

                            self.paginationOptions.all = data.Data.TotalPages
                            self.paginationOptions.totalRecords = data.Data.TotalRecords;

            setStatusList: (code) ->
                this.query.Flag

            checkList: (arr, code) ->

                self = this
                list = []

                arr = this.checkedGroups if arr.length is 0
                return @$dispatch 'transmit', 'tip', contentText: '请先选择订单!' if arr.length is 0

                # 状态为0时填充到list数组
                list.push orderForm for orderForm in arr when orderForm.Flag is 0

                return @$dispatch 'transmit', 'tip', contentText: '当前选择的所有订单已经完成相关操作' if list.length is 0

                @cancelList = arr;

                return @$dispatch 'transmit', 'tip', contentText: '您确定取消当前选择订单?', events: confirm: 'cancel-list' if code is 97

                servers.postAjax.bind(this)
                    url: '/BusRet/CheckBusRet'
                    data:
                        BusRetList: list
                        Flag: code
                    success: (data) ->
                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '操作成功！'
                            self.search ''

            # 显示与隐藏slide
            slideList: (obj) ->

                obj.slideList = not obj.slideList


            getIsHandle: (flag) ->
                return flag isnt 100 and flag isnt 97 and flag isnt 30

        ready: () ->
            # 获取退货类型
            this.getList 'returnList', '/BaseLookup/GetBusPetType'
            # 获取仓库列表
            this.getList 'stockList', '/BaseLookup/GetStockList'
            # 获取供应商列表
            this.getList 'venderList', '/BaseLookup/GetVenderList'
            # 获取状态列表
            this.getList 'statusList', '/BaseLookup/GetBusRetFlag'
            this.search false

            require '../../../css/bootstrap-datetimepicker.css'
            require '../../../js/plugins/bootstrap-datetimepicker'

            $('#PurDate-timepicker').datetimepicker().on "changeDate", (e) ->
                $('#PurDate-to-timepicker').datetimepicker('setStartDate',e.date);

            $('#PurDate-to-timepicker').datetimepicker().on "changeDate", (e) ->

                $('#PurDate-timepicker').datetimepicker('setEndDate',e.date);




</script>
<style media="screen" lang="less">
    .slide-click-element{
        cursor: pointer;
    }
    .slide-click-element:hover{
        border-radius: 5px 5px 0 0;
        background: #8996b0;
        color: #fff;
        padding: 5px 14px 5px 10px;
        vertical-align: middle;
    }
    .slide-click-element.click{
        border-radius: 5px 5px 0 0;
        background: #8996b0;
        color: #fff;
        padding: 5px 14px 5px 10px;
        vertical-align: middle;
    }
    .tra{
        transition: all .5s;
    }
</style>
