<template>
<div class="container-fluid">
  <div class="row">
      <div class="col-sm-12">
          <div class="operate-form-title">
              <p>修改店铺</p>
          </div>
          <div class="operate-form-list">
              <div class="form-group form-limit-width">
                  <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                  <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                  <input v-model="form.Name" type="text" class="form-control" placeholder="" required="">
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">客户<span class="form-required-mark"></span></label>
                  <select class="form-control" v-model="form.CustomerID">
                      <option v-for="option in customerList" value="{{option.CustomerID}}">{{option.Name}}</option>
                  </select>
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">店铺种类</label>
                  <select class="form-control" v-model="form.ShopKind">
                      <option v-for="option in shopKindList" value="{{option.Code}}">{{option.Text}}</option>
                  </select>
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">渠道</label>
                  <select class="form-control" v-model="form.NetShop.ChannelID">
                      <option value="" selected>网店</option>
                      <option v-for="option in channelList" value="{{option.ChannelID}}">{{option.Name}}</option>
                  </select>
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">默认发货仓库</label>
                  <select class="form-control" v-model="form.StockID">
                      <option v-for="option in stockList" value="{{option.StockID}}">{{option.Name}}</option>
                  </select>
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">默认退货仓库</label>
                  <select class="form-control" v-model="form.RetStockID">
                      <option v-for="option in stockList" value="{{option.StockID}}">{{option.Name}}</option>
                  </select>
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">负责人</label>
                  <input v-model="form.ShopDetail.LinkMan" type="text" class="form-control" placeholder="" required="">
              </div>
              <!-- <div class="form-group form-limit-width">
                  <label class="form-group-text">联系电话</label>
                  <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">联系手机</label>
                  <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">Email</label>
                  <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
              </div>
              <div class="form-group form-limit-width">
                  <label class="form-group-text">传真</label>
                  <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
              </div> -->
              <div class="form-group form-limit-width">
                  <label class="form-group-text">所在区域</label>
                  <select-area v-if="isDataReady" :state-id.sync="form.ShopDetail.State" :city-id.sync="form.ShopDetail.City" :district-id.sync="form.ShopDetail.District" :options="{isShowCity:true,isShowDistrict:true}"></select-area>
              </div>
              <div class="form-group form-limit-width address-margin">
                  <label class="form-group-text">详细地址</label>
                  <textarea v-model="form.ShopDetail.Address" class="form-control " rows="3"></textarea>
              </div>
              <!-- <div class="form-group form-limit-width">c
                  <label class="form-group-text">备注</label>
                  <textarea v-model="form.Code" class="form-control" rows="3"></textarea>
              </div> -->
              <div class="form-group form-limit-width">
                  <label class="form-group-text">备注</label>
                  <textarea v-model="form.ShopDetail.Note" class="form-control" rows="3"></textarea>
              </div>
              <div class="form-group form-limit-width">
                  <status-checkbox :status.sync="form.Status"></status-checkbox>
              </div>
              <div class="operate-form-buttons">
                  <a @click="submit" href="javascript:void(0)" class="btn btn-default">保存</a>
                  <a class="btn btn-default" href="#!/commodity">返回列表&gt;&gt;</a>
              </div>
          </div>
      </div>
  </div>
</div>

</template>
<script lang="coffee" type="text/coffeescript">

    servers = require '../../../js/servers/servers'

    module.exports =
        data: () ->
            form: {}
            shopKindList: []
            channelList: []
            stockList: []
            customerList: []
            isDataReady: false
        methods:

            submit: () ->
                self = this

                servers.postAjax.bind(this)
                    url: '/BasShop/ErpSaveShop'
                    data: this.form
                    success: (data) ->
                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '修改成功!'

            getShop: (id) ->

                self = this
                self.isDataReady = false
                servers.postAjax.bind(this)

                    url: '/BasShop/GetShopDetails'
                    data:
                        ShopID: id

                    success: (data) ->
                        self.isDataReady = true
                        if data.ResultCode is 1

                            self.form = data.Data[0]
                            self.form.NetShop.ChannelID = if self.form.NetShop.ChannelID then self.form.NetShop.ChannelID else '';

        components:
            # 子组件： 选择区域
            'select-area': require '../../../components/select-area.vue'
            'status-checkbox': require '../../../components/status-checkbox.vue'

        route:
            # 进入路由页面
            data: (transition) ->
                # 获取shopID
                # 获取shop对象
                ID = transition.to.query.id;
                @getShop ID
        ready: () ->
            self = this
            servers.getShopKindList this, 'shopKindList'
            servers.getChannelList this, 'channelList'
            servers.getStockList this, 'stockList'
            servers.getBaseData('CustomerList',false,(val) ->
                self.customerList = val
            )
</script>
<style type="text/less" >
    .address-margin{
        margin-bottom:8px;
    }
</style>
