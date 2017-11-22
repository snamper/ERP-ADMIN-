<template id="">

  <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12">

              <div class="operate-form-list">
                  <div class="operate-form-title">
                      <p>修改客户</p>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                      <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                      <input v-model="form.Name" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">客户种类<span class="form-required-mark">*</span></label>
                      <select class="form-control" v-model="form.CustomerType">
                          <option v-for="option in customerTypeList" value="{{option.Code}}">{{option.Text}}</option>
                      </select>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">客户等级<span class="form-required-mark">*</span></label>
                      <select class="form-control" v-model="form.CustomerGradeID">
                          <option v-for="opt in customerGradeList" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                      </select>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">结算账户<span class="form-required-mark">*</span></label>
                      <select class="form-control" v-model="form.AccountID">
                          <option v-for="opt in accountList" value="{{opt.AccountID}}">{{opt.Name}}</option>
                      </select>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">联系人</label>
                      <input v-model="form.CustomerDetail.LinkMan" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">英文名</label>
                      <input v-model="form.CustomerDetail.EName" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">联系电话</label>
                      <input v-model="form.CustomerDetail.LinkTel" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">联系手机</label>
                      <input v-model="form.CustomerDetail.Mobile" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">Email</label>
                      <input v-model="form.CustomerDetail.Email" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">传真</label>
                      <input v-model="form.CustomerDetail.Fax" type="text" class="form-control" placeholder="" required="">
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">所在区域</label>
                      <select-area v-if="isDataReady" :state-id.sync="form.CustomerDetail.State" :city-id.sync="form.CustomerDetail.City" :district-id.sync="form.CustomerDetail.District" :options="{isShowCity:true,isShowDistrict:true}"></select-area>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">详细地址</label>
                      <textarea v-model="form.CustomerDetail.Address" class="form-control" rows="3"></textarea>
                  </div>
                  <div class="form-group form-limit-width">
                      <label class="form-group-text">备注</label>
                      <textarea v-model="form.CustomerDetail.Note" class="form-control" rows="3"></textarea>
                  </div>
                  <div class="form-group form-limit-width">
                      <status-checkbox :status.sync="form.Status"></status-checkbox>
                  </div>
                  <div class="operate-form-buttons">
                      <a @click="submit" href="javascript:void(0)" class="btn btn-default">保存</a>
                      <a class="btn btn-default" href="#!/client">返回列表&gt;&gt;</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script lang="coffee" type="text/coffeescript">
    # 全局替换接口地址
    URL = 'http://192.168.88.47:888/API'
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 区域选择组件
    selectArea = require '../../../components/select-area.vue'
    # 页面模型
    pageData =
        form: {}
        customerTypeList: []
        customerGradeList: []
        accountList: []
        isDataReady: false
    module.exports =
        data: () ->
            return pageData
        components:
            'select-area': selectArea
            'status-checkbox': require '../../../components/status-checkbox.vue'
        methods:
            # 获取客户类型列表
            getcustomerTypeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetCustomerType'
                    success: (data) ->
                        relf.customerTypeList = data.Data

            # 获取客户等级列表
            getCustomerGradeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetBasCustomerGradeList'
                    success: (data) ->
                        relf.customerGradeList = data.Data

            # 获取账户列表
            getAccountList: () ->
                self = this

                servers.getAjax
                    url: '/BaseLookup/GetBasAccountList'
                    success: (data) ->
                        self.accountList = data

            # 提交修改数据
            submit: () ->
                self = this
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasCustomer/ErpSaveCustomer'
                    data: this.form
                    success: (data) ->

                        if data.ResultCode is 1

                            self.$dispatch 'transmit', 'tip', contentText: '修改成功！'

            getClient: (id) ->

                self = this
                self.isDataReady = false
                servers.NProgress.start ''

                servers.postAjax.bind(this)
                    url: '/BasCustomer/GetCustomerDetail'
                    data:
                        CustomerID: id
                    success: (data) ->
                        self.isDataReady = true
                        if data.ResultCode is 1
                            self.form = data.Data[0]
                            servers.NProgress.done ''

        route:
            data: (transition) ->
                this.getcustomerTypeList()
                this.getCustomerGradeList()
                this.getAccountList()
                this.getClient transition.to.query.id
</script>
