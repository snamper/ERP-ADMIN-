<template>
    <div class="container-fluid">
    <div class="query-form">
        <div class="query-header">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    配置接口
                </label>
            </div>
        </div>
        <div id="query-detail" class="form-inline query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>允许合单</label>
                    <select class="form-control" v-model="form.NetShop.CanMerge">
                        <option value="">请选择</option>
                        <option value="1">允许</option>
                        <option value="0">不允许</option>
                        <option value="2">其他</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>库存分配比例</label>
                    <input type="text" class="form-control" placeholder="" v-model="form.NetShop.SynRate">
                    %
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>允许同步库存</label>
                    <select class="form-control" v-model="form.NetShop.IsUpdateStock">
                        <option value="1">允许</option>
                        <option value="0">不允许</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>默认快递</label>
                    <select class="form-control" v-model="form.NetShop.DefDelivery">
                        <option v-for="option in basDeliveryList" value="{{option.DeliveryID}}">{{option.Name}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>允许拆单</label>
                    <select class="form-control" v-model="form.NetShop.CanSeparate">
                        <option value="">请选择</option>
                        <option value="1">允许</option>
                        <option value="0">不允许</option>
                        <option value="2">其他</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>安全库存个数</label>
                    <input type="text" class="form-control" placeholder="" v-model="form.NetShop.SafeQty">
                </div>
                <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>定时更新库存</label>
                    <select class="form-control">
                        <option value="1">允许</option>
                        <option value="0">不允许</option>
                    </select>
                </div> -->
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>货到付款快递</label>
                    <select class="form-control" v-model="form.NetShop.CODDefDelivery">
                        <option v-for="option in basDeliveryList" value="{{option.DeliveryID}}">{{option.Name}}</option>
                    </select>
                </div>
        </div>
        <div style="height: 20px; width: 100%; border-top: 1px dashed #ccc; margin-top: 10px;">
        </div>
        {{form.Params|json}}
        <div class="row" v-for="i in list">
            <div class="form-group col-lg-4 col-md-4 col-sm-4">
                <label>参数名称{{$index+1}}</label>
                <input v-model="i.name" type="text" class="form-control" placeholder="">
            </div>
            <div class="form-group col-lg-4 col-md-4 col-sm-4">
                <label>值</label>
                <input v-model="i.value" type="text" class="form-control" placeholder="">
            </div>
            <div class="form-group col-lg-4 col-md-4 col-sm-4">
                <label>描述</label>
                <input v-model="i.note" type="text" class="form-control" placeholder="">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <button @click="addApi" style="margin: 0 auto 10px; display: block;" type="button" name="button" class="btn btn-defult">新增API</button>
            </div>
        </div>
    </div>
</div>
<div class="query-button-group">
    <a @click="submit" href="javascript:void(0)" class="btn btn-default">提交</a>
    <a v-link="{name: 'commodity-index'}" href="javascript:void(0)" class="btn btn-default">返回列表</a>
</div>
</template>
<script lang="coffee" type="text/coffeescript">

    server = require '../../../js/servers/servers'
    URL = 'http://192.168.88.47:888/API'

    # 平台api
    APIAttr =
        # 京东
        JD:
            id: 'ea381c5a-f19d-434d-b51c-b0fa4fba327e'
            attr: [
                {name: 'app_key', value: '', note: ''}
                {name: 'app_secret', value: '', note: ''}
                {name: 'access_token', value: '', note: ''}
                {name: 'venderType', value: 'FBP、LBP、SOP、SOPL', note: '商家类型'}
                {name: 'customer_code', value: '', note: '客户类型'}
                {name: 'is_check_shipping_area', value: '', note: '如果要验证京东的订单可达区域,请设为1'}
                {name: 'buid', value: '', note: ''}
            ]
        # 淘宝
        TB:
            id: 'a911dce1-ae37-4cfa-95c1-be126ede1f6d'
            attr: [
                {name: 'app_key', value: '123456', note: ''}
                {name: 'app_secret', value: '11b9128693bfb83ddd5ad559f98f2b07', note: ''}
                {name: 'app_session', value: '700001010121903688c6d1d56dkfj230sdfd4956a790ae1174a9edd04150264d19713422229230', note: ''}
                {name: 'seller_nick', value: 'XXX时尚旗舰店', note: '店铺名称'}
                {name: 'app_type', value: 'b或者c', note: '淘宝或者天猫'}
                {name: 'refresh_token', value: '', note: '刷新token'}
                {name: 'expires_in', value: '', note: 'token有效期'}
                {name: 'taobao_trade_source', value: '填写taobao或者rds', note: '从哪里取订单'}
            ]

    module.exports =
        data: () ->
            return {
                # 表单数据
                form: {
                    NetAddr: ''
                    Params: []
                    NetShop:
                        # 库存分配比例 默认 100%
                        SafeQty: 100
                }

                basDeliveryList: []

                list: []
            }

        methods:
            ###*
             * 获取快递列表
             * @return {object} 返回vue。
             *###
            getBasDeliveryList: () ->
                self = this

                server.getAjax
                    url: '/BaseLookup/GetBasDeliveryList'
                    success: (data) ->
                        self.basDeliveryList = data.Data


                return self

            ###*
             * 查找当前 ShopID 所在的商铺 *
             * @return {null}    *
             *###
            search: () ->
                self = this

                server.postAjax
                    url: '/BasShop/GetShopDetails'
                    data:
                        ShopID: this.form.ShopID
                    success: (data) ->
                        self.form = data.Data[0]

                        if self.form.NetShop isnt null

                            if self.form.NetShop.Params is null
                                self.form.NetShop.Params = []
                            else
                                self.form.NetShop.Params = JSON.parse self.form.NetShop.Params
                            # 由于 this.form.Params 页面遍历的列表不能实时更新，所以新建 list 数组进行绑定
                            if self.form.NetShop.ChannelID isnt null
                                self.list = self.form.NetShop.Params

                                self.setParams self.form.NetShop.Params, self.form.NetShop.ChannelID

                            else
                                self.addApi()

                        else

                            self.$dispatch 'transmit', 'tip', contentText: '请选择渠道后再进行接口配置。'

            ###*
             * 根据netshop下id获取平台参数，并将缺少参数新增至当前店铺接口
             * @param  {Array} array 当前店铺接口列表
             * @param  {String} id    当前店铺的netshop下的id
             *###
            setParams: (array, id) ->

                for KeyName, attrs  of APIAttr

                    if id is attrs.id

                        for attr in attrs.attr

                            pushFix = true

                            for obj in array

                                if obj.name is attr.name

                                    pushFix = false

                            array.push attr if pushFix

            ###*
             * 添加 API 条例
             * @return {null}
             *###
            addApi: () ->
                this.list.push
                    name: ''
                    value: ''
                    note: ''
            submit: () ->
                self = this
                replaceList = []

                for o in self.list
                    replaceList.push o if o.name isnt ''

                self.form.NetShop.Params = JSON.stringify replaceList
                server.postAjax.bind(this)
                    url: '/BasShop/ErpSaveNetShop'
                    data: this.form
                    success: (data) ->
                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '配置成功!'
        # 当前组件的路由对象
        route:
            data: (transition) ->
                @form.ShopID = transition.to.query.id
                @getBasDeliveryList().search()
</script>
