<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{ pageType == 1? '修改' : '新建'}}仓库</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                        <input v-model="form.Code" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                        <input v-model="form.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-with form-group-select">
                        <label class="form-group-text">地区</label>
                        <div class="entrepot-select"><select-area v-if="pageType == 0 || isDataReady" :state-id.sync="form.StockDetail.State" :city-id.sync="form.StockDetail.City" :district-id.sync="form.StockDetail.District"></select-area></div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">详细地址</label>
                        <input v-model="form.StockDetail.Address" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">强制扫描出库<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="form.StockDetail.CanNegativeOut">
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">负责人<span class="form-required-mark">*</span></label>
                        <input v-model="form.StockDetail.LinkMan" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">联系电话</label>
                        <input v-model="form.StockDetail.LinkTel" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">联系手机</label>
                        <input v-model="form.StockDetail.Mobile" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">Email</label>
                        <input v-model="form.StockDetail.Email" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">传真</label>
                        <input v-model="form.StockDetail.Fax" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="form.StockDetail.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <status-checkbox :status.sync="form.Status">
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="submitForm" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a v-link="'../entrepot'" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="coffee" type="text/coffeescript">
servers = require '../../../js/servers/servers'
### 添加仓库模块 ###
# 全局替换接口地址
URL = 'http://192.168.88.47:888/API'
module.exports =
    data: () ->
        return data =
            form:
                Status: 1
                StockDetail:
                    State: ''
                    City: ''
                    District: ''
                    CanNegativeOut: 1
            isDataReady: false
            pageType: 0

    components:
        'select-area': require '../../../components/select-area.vue'
        'status-checkbox': require '../../../components/status-checkbox.vue'
    methods:
        # 通过接口上传新建仓库的数据
        addEntrepot: ()->
            self = this;

            servers.postAjax.bind(this)
                url: '/BasStock/ErpSaveStock'
                data: self.form
                success: (data) ->
                    tipText = if self.pageType is 1 then '修改成功！' else '添加成功！'
                    self.$dispatch 'transmit', 'tip', contentText: tipText if data.ResultCode is 1

                # URL

        # 提交表单
        submitForm: () ->

            this.addEntrepot();

        ###*
         * 获取单个仓库对象
         * @param  {string} id 仓库的id
         * @return {null}
         *###
        getEntrepot: (id) ->

            relf = this
            relf.isDataReady = false
            servers.postAjax
                url: '/BasStock/GetStockDetailByID'
                data:
                    StockID: id
                success: (data) ->
                    relf.isDataReady = true
                    relf.form = data.Data[0]
    route:
        data: (transition) ->
            name = transition.to.name

            if name is 'entrepot-add'
                @pageType = 0
            else if name is 'entrepot-edit'
                @pageType = 1
                @getEntrepot transition.to.query.id
</script>

<style rel="stylesheet/less" lang="less">

.operate-form-list{
   .form-group-select{
    &.form-group{
        display:inline-block;
    }
    .entrepot-select{
            float:right;
            margin-left:10px;
        .form-control{
                width: 115px;
                float:left;
                margin-left:15px;
        }
    }
}
}
.checkbox-btn{
    margin-left:22px;
    line-height:42px;

}
</style>
