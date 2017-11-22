<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                   <p>{{title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">外部单号</label>
                        <span class="form-control" v-if="title === '查看退货单'">{{form.OutSheet}}</span>
                        <input v-if="title !== '查看退货单'" v-model="form.OutSheet" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">仓库<span class="form-required-mark">*</span></label>
                        <span class="form-control" v-if="title === '查看退货单'">{{form.StockName}}</span>
                        <select v-if="title !== '查看退货单'" v-model="form.StockID" class="form-control">
                            <option v-for="stock in stockList" value="{{stock.StockID}}">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">退货日期<span class="form-required-mark">*</span></label>
                        <div class='input-group date busret-date' id='PurDate-timepicker'>
                            <input v-model="form.PurDate | formatDate" type='text' class="form-control" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                        <span class="form-control" v-if="title === '查看退货单'">{{form.VenderName}}</span>
                        <select v-if="title !== '查看退货单'" v-model="form.VenderID" class="form-control">
                            <option v-for="stock in venderList" value="{{stock.VenderID}}">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <span class="form-control" v-if="title === '查看退货单'">{{form.Note}}</span>
                        <textarea v-if="title !== '查看退货单'" v-model="form.Note" class="form-control" rows="3" style="padding:8px;margin-bottom:15px;"></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                        <div class="form-group-list">
                            <jxc-detail v-if="title === '修改退货单'" :type="1" :list.sync="form.RetItems" del-url="/BusRet/ErpDelBusRetItem" model-name="sales-return"></jxc-detail>
                            <jxc-detail v-if="title === '添加退货单'" :type="2" :list.sync="form.RetItems" del-url="/BusRet/ErpDelBusRetItem" model-name="sales-return"></jxc-detail>
                            <div v-if="title === '查看退货单'" class="panel-collapse sheet-retItems-collapse collapse in tra col-lg-12">
                                <div class="sheet-list-table table-responsive">
                                    <table class="table table-condensed panel-group">
                                        <thead class="sheet-list-header">
                                            <tr>
                                                <th>商品</th>
                                                <th>SKU</th>
                                                <th>商品名称</th>
                                                <th>尺码</th>
                                                <th>颜色</th>
                                                <th>供货成本</th>
                                                <th>退货数量</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="tr in form.BusRetGoodInfo_Views">
                                                <td>
                                                    {{tr.CustomNo}}
                                                </td>
                                                <td>
                                                    {{tr.CustomBC}}
                                                </td>
                                                <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.Name}}">
                                                    {{tr.Name  | truncationString }} </span>
                                                </td>
                                                <td><span data-toggle="tooltip" data-placement="top" title="{{tr.SizeName}}">
                                                    {{tr.SizeName  | truncationString }} </span>
                                                </td>
                                                <td><span data-toggle="tooltip" data-placement="top" title="{{tr.ColorName}}">
                                                    {{tr.ColorName  | truncationString }} </span>
                                                </td>
                                                <td>
                                                    {{tr.Price}}
                                                </td>
                                                <td>
                                                    {{tr.Qty}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a v-if="title != '查看退货单'" href="javascript:void(0)" class="btn btn-default" @click="submit">保存</a>
                        <a v-link="{name: 'sales-return'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="">
        {{query|json}}
    </div> -->
    <plan-list></plan-list>
</template>
<script lang="coffee">
    # 全局服务模块
    servers = require '../../../js/servers/servers'
    URL = 'http://192.168.88.20:8088/Api'


    module.exports =
        # 数据
        data: () ->
            return {
                # 页面模型
                form :
                    RetItems: []
                    PurDate: ''
                stockList : []
                returnTypeList : []
                venderList : []
                pageType: '',
                title: ''
            }
        components:
            'jxc-detail': require './JXC-detail.vue'
        # 事件列表
        methods:
            ###*
             * 获取可选列表
             * @param  {string} name 储存键值
             * @param  {string} url  接口地址
             * @return {null}
             *###
            getList: (name, url) ->
                relf = this

                servers.getAjax
                    url: url
                    success: (data) ->
                        relf[name] = data.Data

            ###*
             * 提交当前添加的数据
             * @return {null}
             *###
            submit: () ->
                self = this

                data =

                    RetID: @form.RetID
                    OutSheet: @form.OutSheet
                    StockID: @form.StockID
                    VenderID: @form.VenderID
                    PurDate: @form.PurDate
                    Note: @form.Note
                    RetItems: []

                return @$dispatch 'transmit', 'tip', contentText: '请选择供应商！' if not @form.VenderID? or @form.VenderID is ''

                @$broadcast 'submit-before', (submitType) ->

                    if submitType

                        for item in self.form.RetItems

                            data.RetItems.push

                                BarcodeID: item.BarcodeID
                                Qty: item.Qty
                                RetID: item.RetID
                                RetItemID: item.RetItemID
                                Price: item.Price

                        servers.postAjax.bind(self)
                            url: '/BusRet/ErpSaveBusRet'
                            data: data
                            success: (data) ->
                                if data.ResultCode is 1
                                    if self.title is '添加退货单'
                                        self.$dispatch 'transmit', 'tip', contentText: '添加成功'
                                    if self.title is '修改退货单'
                                        self.$dispatch 'transmit', 'tip', contentText: '修改成功'
                                        
            getReturn: (id) ->
                self = this
                # return alert '出错' if this.pageType not 1
                servers.postAjax
                    url: '/BusRet/ErpBusRetGetById'
                    data:
                        RetID: id
                    succes: (data) ->
                        data.Data.RetItems = data.Data.BusRetGoodInfo_Views
                        self.form = data.Data
        route:
            data: (transition) ->
                # 确定标题
                @title = '修改退货单' if transition.to.params.pageType is 'edit'
                @title = '查看退货单' if transition.to.params.pageType is 'see'
                @title = '添加退货单' if transition.to.params.pageType is 'add'

                @getReturn transition.to.query.id

            activate: () ->
                # 获取仓库列表
                this.getList 'stockList', '/BaseLookup/GetStockList'
                # 获取退货类型列表
                this.getList 'returnTypeList', '/BaseLookup/GetBusPetType'
                # 获取供应商列表
                this.getList 'venderList', '/BaseLookup/GetVenderList'
        ready: () ->

            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#PurDate-timepicker').datetimepicker({});

</script>
<style type="text/less">
.operate-form-list .form-group > .form-control{
    line-height:22px;
}
    .busret-date{
        margin-left:25px;
        width: 375px;
    }
</style>
