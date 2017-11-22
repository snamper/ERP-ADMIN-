<template>
    <div class="container-fluid">
    <div class="row">
        <div class="col-sm-12">
            <div class="operate-form-title">
                <p>新建供应商</p>
            </div>
            <div class="operate-form-list vender-margin">
                <div class="form-group form-limit-width">
                    <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                    <input v-model="form.Code" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                    <input v-model="form.Name" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">供应商种类<span class="form-required-mark">*</span></label>
                    <select class="form-control" v-model="form.VenderType">
                        <option value=""> 默认</option>
                        <option v-for="option in venderTypeList" value="{{option.Code}}">{{option.Text}}</option>
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
                    <input v-model="form.VenderDetail.LinkMan" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">英文名</label>
                    <input v-model="form.VenderDetail.EName" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">联系电话</label>
                    <input v-model="form.VenderDetail.LinkTel" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">联系手机</label>
                    <input v-model="form.VenderDetail.Mobile" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">Email</label>
                    <input v-model="form.VenderDetail.Email" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">传真</label>
                    <input v-model="form.VenderDetail.Fax" type="text" class="form-control" placeholder="" required="">
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">所在区域</label>
                    <select-area :state.sync="form.VenderDetail.State" :city.sync="form.VenderDetail.City" :district.sync="form.VenderDetail.District" :options="{isShowCity:true,isShowDistrict:true}"></select-area>
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">详细地址</label>
                    <textarea v-model="form.VenderDetail.Address" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">备注</label>
                    <textarea v-model="form.VenderDetail.Note" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group form-limit-width">
                    <status-checkbox :status.sync="form.Status"></status-checkbox>
                </div>
                <div class="operate-form-buttons">
                    <a @click="submit" href="javascript:void(0)" class="btn btn-default">保存</a>
                    <a class="btn btn-default" href="#!/vender">返回列表&gt;&gt;</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="coffee">
    URL = 'http://192.168.88.47:888/API'
    servers = require '../../../js/servers/servers'
    selectArea = require '../../../components/select-area.vue'

    module.exports =
        data: () ->
            return pageData =
                form: {
                    Status: 1
                    VenderType: ''
                }
                venderTypeList: []
                accountList: []
        components:
            'select-area': selectArea
            'status-checkbox': require '../../../components/status-checkbox.vue'
        methods:
            # 获取供应商类型
            getVenderList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetVenderType'
                    success: (data) ->
                        relf.venderTypeList = data.Data

            # 提交修改数据
            submit: () ->
                self = this
                servers.NProgress.start ''

                servers.postAjax.bind(this)
                    url: '/BasVender/ErpSaveVender'
                    data: this.form
                    success: (data) ->

                        if data.ResultCode is 1
                            self.$dispatch 'transmit', 'tip', contentText: '添加成功!'
                            servers.NProgress.done ''

            # 获取账户列表
            getAccountList: () ->
                self = this

                servers.getAjax
                    url: '/BaseLookup/GetBasAccountList'
                    success: (data) ->
                        self.accountList = data

        ready: () ->
            this.getVenderList ''
            this.getAccountList ''

</script>

<style type="text/css" lang="less">
    .vender-margin{
        textarea{
        margin-top:5px;
        margin-bottom:5px;
        }
    }
</style>
