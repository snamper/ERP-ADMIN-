<template id="jxc-detail">
    <div class="form-group-list" style="width: 100%;">
        <div class="sheet-list-table table-responsive sheet-list-margin">
            <table class="table table-condensed">
                <thead class="sheet-list-header">
                    <tr>
                        <th class="new-newly-instorck">
                            <a v-if="isHandle || type != 3" href="javascript:void(0)" @click="added" class="btn btn-default new-newly " style="line-height:16px;">+ &nbsp;新增</a>
                            <a v-if="!isHandle && type == 3" href="javascript:void(0)" class="btn btn-default new-newly " style="line-height:16px; background: #999; color: #ccc;">+ &nbsp;新增</a>
                        </th>
                        <th>商品</th>
                        <th>SKU</th>
                        <th>商品名称</th>
                        <th>尺码</th>
                        <th>颜色</th>
                        <th>供货成本</th>
                        <th>计划数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="sheet-list-item" v-for="detail in details">
                        <td>
                            <!-- <a @click="editDetail(detail)" href="javascript:void(0)" v-if="!detail.editStatus && type == 3">修改</a> -->
                            <a v-if="isHandle || type != 3" @click="confirmDel(detail)" href="javascript:void(0)">删除</a>
                            <a v-if="!isHandle && type == 3" href="javascript:void(0)" style="color: #ccc;">删除</a>
                            <!-- <a @click="submitDetail(detail)" href="javascript:void(0)" v-if="detail.editStatus && type == 3">保存</a>
                            <a @click="closeEdit(detail)" href="javascript:void(0)" v-if="detail.editStatus && type == 3">取消</a> -->
                        </td>
                        <td>
                            <span v-if="!detail.editStatus">{{detail.CustomNo}}</span>
                            <div class="form-inline" v-if="detail.editStatus">
                                <input type="text" class="form-control form-control-width" v-model="detail.CustomNo">
                                <a @click="choiceSku(detail, 0)" href="javascript:void(0)" class="btn btn-default">选择</a>
                            </div>
                        </td>
                        <td>
                            <span v-if="!detail.editStatus">{{detail.CustomBC}}</span>
                            <div class="form-inline" v-if="detail.editStatus">
                                <input type="text" class="form-control form-control-width" v-model="detail.CustomBC">
                                <a @click="choiceSku(detail, 1)" href="javascript:void(0)" class="btn btn-default">选择</a>
                            </div>
                        </td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{detail.Name}}">{{detail.Name  | truncationString }} </span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{detail.SizeName}}">{{detail.SizeName  | truncationString }} </span></td>
                        <td><span data-toggle="tooltip" data-placement="top" title="{{detail.ColorName}}">{{detail.ColorName  | truncationString }} </span></td>
                        <td>
                            <span v-if="!detail.editStatus">{{detail.Price}}</span>
                            <input v-if="detail.editStatus" type="text" class="form-control" v-model="detail.Price">
                        </td>
                        <td>
                            <span v-if="!detail.editStatus">{{detail.Qty}}</span>
                            <input v-if="detail.editStatus" type="text" class="form-control" v-model="detail.Qty">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <modal-size-color></modal-size-color>
</template>
<script lang="coffee" type="text/coffeescript">
    servers = require '../../../js/servers/servers'

    module.exports =

        data: () ->

            return data =
                # 当前明细列表
                details: []
                # 提交之前的回调函数
                submitBeforeCallback: null
                # 是否执行删除
                isRunDel: false

        # 当前组件调用时所需要的一些基本参数
        # list 当前明细列表
        # delUrl 删除时调用的服务器接口
        # submit 提交时调用的服务器接口
        # type 页面当前需要展示的类型 1添加 2修改 3综合 三种状态
        # modelName 当前引入模块的名称
        # banRefreshDetails 提交失败时禁止刷新明细列表
        # isHandle 是否可操作，比如新增按钮
        props: ['list', 'delUrl', 'type', 'modelName', 'index', 'banRefreshDetails', 'isHandle','venderId']

        watch:
            # 监听父级的明细列表
            # 当有改变时动态添加到当前组件的明细列表
            'list': () ->
                # 是否刷新明细列表
                return @banRefreshDetails = false if @banRefreshDetails

                @details = []
                for detail in @list
                    detail.editStatus = true
                    # 来货计划，根据生产订单查询的数据明细库存初始化为0
                    @details.push detail

        components:

            'modal-size-color': require '../../../components/modal-size-color.vue'

        ready: () ->

            @details = @list

            detail.editStatus = true for detail in @details

        events:

            'submit-before': (callback, index) ->

                return false if index isnt @index and index?

                list = []

                for detail in @details
                    if detail.BarcodeID? and detail.BarcodeID isnt ''

                        list.push detail

                @list = list

                if @list.length is 0

                    @submitBeforeCallback = callback

                    @$dispatch 'transmit', 'tip',

                        contentText: '当前明细已经删除完毕或者没有添加一条,是否继续提交?'
                        events:

                            confirm: 'submit-before-confirm'
                            cancel: 'submit-before-canncel'

                        , @index

                else

                    callback true

            'submit-before-confirm': (index) ->
                if not index? or index is @index
                    if @submitBeforeCallback
                        @submitBeforeCallback true

            'submit-before-canncel': (index) ->

                @submitBeforeCallback false if not index? or index is @index

            'del-detail': (detail) ->
                @delDetail detail if @isRunDel

        methods:
            confirmDel: (detail) ->

                @isRunDel = true;
                @$dispatch('transmit', 'tip', {name: '警告', contentText: '确定删除该条明细吗？', events: {confirm: 'del-detail'}}, detail)

            # 添加单个明细
            added: () ->

                newDetail = {}

                switch @modelName

                    when 'plan'

                        newDetail =

                            BarCode: ''
                            BarcodeID: null
                            ColorName: ''
                            CustomBC: ''
                            CustomNo: ''
                            ManuOrderID: ''
                            ManuOrderItemID: ''
                            Name: ''
                            Price: null
                            PropertyID: ''
                            Qty: null
                            SizeName: ''
                            # 是否处于修改的状态
                            editStatus: true

                    when 'inform'

                        newDetail =

                            BarCode: ''
                            BarcodeID: null
                            ColorName: ''
                            CustomBC: ''
                            CustomNo: ''
                            PlanReceiptID: ''
                            PlanReceiptItemID: ''
                            Name: ''
                            Price: null
                            PropertyID: ''
                            Qty: null
                            SizeName: ''
                            # 是否处于修改的状态
                            editStatus: true

                    when 'sales-return'

                        newDetail =

                            BarCode: ''
                            BarcodeID: null
                            ColorName: ''
                            CustomBC: ''
                            CustomNo: ''
                            RetID: ''
                            RetItemID: ''
                            Name: ''
                            Price: null
                            PropertyID: ''
                            Qty: null
                            SizeName: ''
                            # 是否处于修改的状态
                            editStatus: true

                @details.push newDetail

            # 删除单个明细
            delDetail: (detail) ->

                self = this

                switch @modelName

                    when 'plan'

                        data =

                            BarcodeID: detail.BarcodeID
                            ManuOrderID: detail.ManuOrderID
                            ManuOrderItemID: detail.ManuOrderItemID
                            Qty: detail.Qty

                        itemId = detail.ManuOrderItemID

                    when 'inform'

                        data =

                            BarcodeID: detail.BarcodeID
                            PlanReceiptID: detail.PlanReceiptID
                            PlanReceiptItemID: detail.PlanReceiptItemID
                            Qty: detail.Qty

                        itemId = detail.PlanReceiptItemID

                    when 'sales-return'

                        data =

                            BarcodeID: detail.BarcodeID
                            RetID: detail.RetID
                            RetItemID: detail.RetItemID
                            Qty: detail.Qty

                        itemId = detail.RetItemID

                if @type is 1

                    @$dispatch 'transmit', 'tip', contentText: '删除成功！'
                    @details.$remove detail

                else if @type is 2 or @type is 3

                    if itemId? and itemId isnt ''

                        servers.postAjax.bind(this)

                            url: @delUrl
                            data: data
                            success: (data) ->

                                if data.ResultCode is 1

                                    self.$dispatch 'transmit', 'tip', contentText: '删除成功！'
                                    self.details.$remove detail

                    else

                        self.$dispatch 'transmit', 'tip', contentText: '删除成功！'
                        self.details.$remove detail

            # 修改明细
            editDetail: (detail) ->

                detail.editStatus = true

            # 取消修改
            closeEdit: (detail) ->

                if detail.BarcodeID? and detail isnt ''

                    detail.editStatus = false

                else

                    @details.$remove detail


            # 选择Sku
            choiceSku: (detail, type) ->

                self = this

                queryData =

                    customNo: detail.CustomNo
                    customBC: ''
                    VenderID: self.venderId
                    merchant: detail

                if type is 0

                    @$broadcast 'choice-customNo', queryData

                else if type is 1

                    if  detail.CustomNo?

                        queryData.customBC = detail.CustomBC
                        @$broadcast 'choice-sku', queryData

                @$once 'size-color-commit', (data) ->

                    isFirstNotInOrder = true
                    isExist = false

                    for newDetail in data.sizeColorList

                        for oldDetail in @details

                            isExist = true if oldDetail.BarcodeID is newDetail.BarcodeID

                        if not isExist

                            if isFirstNotInOrder

                                data.merchant.BarcodeID = newDetail.BarcodeID
                                data.merchant.Price = newDetail.Cost
                                data.merchant.CustomNo = newDetail.CustomNo
                                data.merchant.Name = newDetail.GoodsName
                                data.merchant.SizeName = newDetail.Size
                                data.merchant.ColorName = newDetail.Color
                                data.merchant.CustomBC = newDetail.Sku
                                data.merchant.Qty = 0
                                data.merchant.editStatus = true

                                isFirstNotInOrder = false

                            else

                                self.details.push

                                    Qty: 0
                                    Price: newDetail.Cost
                                    BarcodeID: newDetail.BarcodeID
                                    Name: newDetail.GoodsName
                                    SizeName: newDetail.Size
                                    ColorName: newDetail.Color
                                    CustomNo: newDetail.CustomNo
                                    CustomBC: newDetail.Sku
                                    editStatus: true

                        isExist = false

</script>

<style media="screen">
    .query-detail{
        &.lifeng-css{
            .form-group .form-control {
                flex: auto;
                width: auto;
            }
        }
    }
    .query-detail .form-group .form-control-width{
        width:auto;
    }
</style>
