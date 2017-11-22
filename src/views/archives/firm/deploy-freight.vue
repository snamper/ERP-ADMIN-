<template id="deploy-freight">
    <div class="container-fluid freight">
        <div class="checkbox-group">
            <label class="checkbox-title">
                配置运费
            </label>
        </div>
        <div class="sheet-list form-inline query-detail">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-courier">
                        <div class="batch-operation-group">
                            <label class="checkbox-title">
                                续重规则:
                            </label>
                            <select class="form-control" v-model="IDs">
                                <option v-for="opt in merchantDeliveryList" value="{{opt.MerchantDeliveryID}},{{opt.DeliveryID}}" >({{opt.Code}}){{opt.Name}}</option>
                            </select>
                            <a href="javascript:void(0)" class="btn btn-default" @click="newDelivery">新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="submitList">保存新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" v-link="'../entrepot'">返回列表</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th>(编码)快递</th>
                                    <th>指定地区</th>
                                    <th>首重(g)</th>
                                    <th>首重价格</th>
                                    <th>续重(g)</th>
                                    <th>续费(元)</th>
                                    <th>开始重量(g)</th>
                                    <th>结束重量(g)</th>
                                    
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody class="panel panel-default" v-for="t in deliveryList">
                                <tr class="sheet-list-item">
                                    <td><span data-toggle="tooltip" data-placement="top" title="{{t.MerchantDeliveryName}}">{{t.Delivery.Code ? '(' + t.Delivery.Code + ')' : ''}}{{t.Delivery.Name}}</td>
                                    <td>{{t.State}}{{t.City}}{{t.District === '空' ? '' : t.District}}</td>
                                    <td><input type="text" name="name" v-model="t.FirstWeight"></td>
                                    <td><input type="text" name="name" v-model="t.FirstPrice"></td>
                                    <td><input type="text" name="name" v-model="t.NextWeight"></td>
                                    <td><input type="text" name="name" v-model="t.NextPrice"></td>
                                    <td><input type="text" name="name" v-model="t.BeginWeight"></td>
                                    <td><input type="text" name="name" v-model="t.EndWeight"></td>
                                    <td>
                                        <a vv-if="t.DeliveryPriceID !== ''" data-toggle="tooltip" data-placement="top" title="修改" @click="editItem(t)">
                                            <span class="click-element iconfont icon-alter"></span>
                                        </a>
                                        <!--<span v-if="t.DeliveryPriceID !== ''" class="click-element" @click="editItem(t)">修改</span>-->
                                        <!--<span class="click-element" >删除</span>-->
                                        <span class="click-element iconfont icon-delete courier-delete" data-toggle="tooltip" data-placement="top" title="删除" @click="delItem(t)"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <select-area></select-area>
</template>
<script lang="coffee" type="text/coffeescript">
    # 全局替换接口地址
    URL = 'http://192.168.88.47:888/API'
    # 全局服务
    servers = require '../../../js/servers/servers'

    module.exports =
        data: () ->
            return {
                IDs: ''
                deliveryList: []
                merchantDeliveryList: []
                newItems: []
                stockID: ''
            }

        components:
            'select-area': require './select-area.vue'

        events:

            'post-area-list': (list) ->

                this.newItems.push o for o in list
                this.deliveryList.push o for o in list

        methods:
            ###*
             * 获取快递列表
             * @param  {string} id 仓库的id
             *###
            getDeliveryList: (id) ->

                self = this

                servers.postAjax

                    url: '/BasDeliveryPrice/ErpGetDeliveryPriceByID'
                    data:
                        StockID: id
                    success: (data) ->

                        self.deliveryList = data.Data

            getMerchantDeliveryList: () ->

                self = this

                servers.getAjax

                    url: '/BaseLookup/GetBasDeliveryList'
                    success: (data) ->

                        self.merchantDeliveryList = data.Data



            newDelivery: () ->

                return this.$dispatch 'transmit', 'tip', contentText: '请先选择商家快递' if this.IDs is ''

                this.$broadcast 'show-select-area', this.IDs.split ','


            submitList: () ->

                self = this

                return self.$dispatch 'transmit', 'tip', contentText: '没有新增列表可以提交' if this.newItems.length is 0
                # 项目缺少仓库ID
                item.StockID = this.stockID for item in this.newItems

                servers.postAjax.bind(this)

                    url: '/BasDeliveryPrice/ErpSaveBasDeliveryPrice'
                    contentType: 'application/json',
                    data: JSON.stringify(this.newItems)
                    success: (data) ->

                        if data.ResultCode is 1
                            self.$dispatch 'transmit' , 'tip', contentText: '添加成功!'
                            self.getDeliveryList(self.stockID)


            editItem: (item) ->

                self = this

                servers.postAjax.bind(this)

                    url: '/BasDeliveryPrice/ErpSaveBasDeliveryPrice'
                    contentType: 'application/json',
                    data: JSON.stringify([item])
                    success: (data) ->

                        if data.ResultCode is 1
                            self.$dispatch 'transmit' , 'tip', contentText: '修改成功!'
                            # self.getDeliveryList(self.stockID)


            delItem: (item) ->

                self = this
                self.$dispatch 'transmit', 'tip', contentText: '确定要删除吗？', events:
                    confirm: 'delItemConfirm'
                @$off 'delItemConfirm'
                @$once 'delItemConfirm', () ->
                    servers.postAjax.bind(self)
                        url: '/BasDeliveryPrice/ErpDeleteDeliveryPrice'
                        contentType: 'application/json',
                        data: JSON.stringify([item.DeliveryPriceID])
                        success: (data) ->
                            if data.ResultCode is 1
                                self.deliveryList.$remove item
                                self.$dispatch 'transmit', 'tip', contentText: '删除成功!'

        route:
            data: (transition) ->
                # 获取当前的快递列表
                this.getDeliveryList transition.to.query.id
                this.getMerchantDeliveryList ''
                this.stockID = transition.to.query.id

</script>
<style media="screen" rel="stylesheet/less" lang="less">

    .freight {
        .batch-courier {
            padding-left: 19px;
            padding-bottom: 19px;

        }
        .padding-left {
            padding-left: 20px;
        }
        .courier-delete {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            line-height: 18px;
            background-color: #bbbbbb;
        }
    }
</style>
