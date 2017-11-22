<template id="">
    <div class="container-fluid">
        <div class="operate-form-title">
            <p v-if="pageType == 'add'">客户等级添加</p>
            <p v-if="pageType == 'edit'">客户等级修改</p>
        </div>
        <div class="row">
            <div class="col-sm-12">
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
                        <label class="form-group-text">设置权重</label>
                        <input v-model="form.Power" type="number" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">可发展下级层次</label>
                        <input v-model="form.LevelQty" type="number" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">升级层次</label>
                        <input v-model="form.UpLevelQty  " type="number" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">升级标准</label>
                        <input v-model="form.UpgradeAmount" type="text" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">补货标准</label>
                        <input v-model="form.OrderAmount" type="text" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户折扣</label>
                        <input v-model="form.PriceRate" type="text" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">加盟费</label>
                        <input v-model="form.GuaranteeMoney" type="number" class="form-control" placeholder="" required="required">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">最低充值</label>
                        <input v-model="form.ChargeAmount" type="number" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">注册公司审核</label>
                        <select v-model="form.IsNeedCheck" class="form-control">
                            <option value=1>是</option>
                            <option value=0>否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">允许发展平级</label>
                        <select v-model="form.IsExpCurr" class="form-control">
                            <option value=1>是</option>
                            <option value=0>否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">升级公司审核</label>
                        <select v-model="form.ChildCheck" class="form-control">
                            <option value=1>公司和上级审</option>
                            <option value=0>公司和直属上级审</option>
                            <option value=2>原上级和升级后上级审</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">变动审核</label>
                        <select v-model="form.ChangeCheck" class="form-control">
                            <option value=1>需要</option>
                            <option value=0>不需要</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="form.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <status-checkbox :status.sync="form.Status"></status-checkbox>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="submit">保存</a>
                        <a  class="btn btn-default" v-link="{name:'client-grade'}">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="coffee">
    # 全局替换接口地址
    URL = 'http://192.168.88.5:999/API'
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 区域选择组件
    selectArea = require '../../../components/select-area.vue'

    module.exports =
        data: () ->
            return {
                form: {
                    Status: 1
                    UpgradeAmount: ''
                    OrderAmount: ''
                    PriceRate: ''
                    LevelQty: ''
                    UpLevelQty: ''
                    GuaranteeMoney: 0
                    IsNeedCheck: 1
                    IsExpCurr: 1
                    ChildCheck: 1
                    ChangeCheck: 0
                    ChargeAmount: ''
                }
                customerTypeList: []
                customerGradeList: []
                pageType: ''
            }
        components:
            'select-area': selectArea
            'status-checkbox': require '../../../components/status-checkbox.vue'
        methods:
            # 获取客户类型列表
            getCustomerTypeList: () ->
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



            # 修改当前模态窗口显示状态
            setShow: () ->
                this.modal.show = !this.modal.show

            # 提交修改数据
            submit: () ->
                relf = this

                relf.form.GuaranteeMoney = parseInt(relf.form.GuaranteeMoney,10) || 0;

                servers.postAjax.bind(this)
                    url: '/BasCustomerGrade/ErpSaveBasCustomerGrade'
                    data: this.form
                    success: (data) ->
                        if data.ResultCode is 1
                            if relf.pageType is 'add'
                                relf.$dispatch 'transmit', 'tip', contentText: '添加成功'
                                relf.form = 
                                    Status: 1
                                    PriceRate: ''
                                    LevelQty: ''
                                    UpLevelQty: ''
                                    GuaranteeMoney: 0
                                    IsNeedCheck: 1
                                    IsExpCurr: 1
                                    ChildCheck: 1
                                    ChangeCheck: 0
                            else if relf.pageType is 'edit'
                                relf.$dispatch 'transmit', 'tip',
                                    contentText: '修改成功'
            ###*
             * 获取客户等级对象
             * @param  {string} id 客户等级对象id
             * @return {null}
             *###
            getCustomerGradeObj: (id) ->
                relf = this
                servers.postAjax.bind(this)
                    url: '/BasCustomerGrade/ErpQueryBasCustomerGrade'
                    data:
                        PageSize: 10
                        PageNumber: 1
                        SearchWhere:
                            CustomerGradeID: id
                    success: (data) ->
                        relf.form = data.Data.PageData[0]
        events:
            'show-client-edit': (obj) ->
                this.setShow()
                this.form = obj
        route:
            data: (transition) ->
                pageType = transition.to.name
                id = transition.to.query.id

                if pageType is 'client-grade-add'
                    this.pageType = 'add'
                else if pageType is 'client-grade-edit'
                    this.pageType = 'edit'
                    this.getCustomerGradeObj id

                this.getCustomerTypeList()
                this.getCustomerGradeList()
</script>
