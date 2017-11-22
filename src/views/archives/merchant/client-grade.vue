<template id="">
    <div class="operate-form-title">
        <p>客户等级</p>
    </div>
    <div class="container-fluid container-fluid-align">
    <div class="query-form">
        <div class="form-inline query-detail" @keyup.enter.stop="search">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>编码</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.Code">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>名称</label>
                    <input v-model="query.Name" type="text" class="form-control" placeholder="">
                </div>
                <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                    <!--<label>客户折扣</label>-->
                    <!--<input v-model="query.PriceRate" type="text" class="form-control" placeholder="">-->
                <!--</div>-->
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>客户折扣</label>
                    <input type="text" class="form-control" placeholder="" v-model="query.PriceRate">
                    <span style="line-height: 31px;"> ~ </span>
                    <input type="text" class="form-control" placeholder="" v-model="query.PriceRate_To">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">状态</label>
                    <select class="form-control" v-model="query.Status">
                        <option value="">不限</option>
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>权重</label>
                    <input v-model="query.Power" type="text" class="form-control" placeholder="">
                </div>
                <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">客户种类</label>
                    <select class="form-control" v-model="query.CustomerType">
                        <option v-for="opt in customerType" value="{{opt.Code}}">{{opt.Text}}</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">客户等级</label>
                    <select class="form-control" v-model="query.CustomerGradeID">
                        <option v-for="opt in customerGradeList" value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                    </select>
                </div> -->
            </div>
            <div class="query-button-group">
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>
    <div class="sheet-list">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <div class="batch-operation-group">
                        <a class="btn btn-default" href="#!/client-grade-add">新增</a>
                        <a href="javascript:void(0)" @click="$dispatch('transmit', 'uploadModalShow', 16)" class="btn btn-default">批量新增</a>
                        <a href="javascript:void(0)" @click="setStatus([], 1)" class="btn btn-default">启用</a>
                        <a href="javascript:void(0)" @click="setStatus([], 0)" class="btn btn-default">禁用</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed">
                        <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll" ></th>
                                <th>编码</th>
                                <th>名称</th>
                                <th>权重</th>
                                <th>升级标准</th>
                                <th>补货标准</th>
                                <th>客户折扣</th>
                                <th>可发展下级层次</th>
                                <th>升级层次</th>
                                <th>注册公司审核</th>
                                <th>升级公司审核</th>
                                <th>允许发展平级</th>
                                <!--<th>升级审核</th>
                                <th>变动审核</th>-->
                                <th>加盟费</th>
                                <th>最低充值</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="t in tableList">
                        <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="t.checked" /></td>
                            <td>{{t.Code}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Name}}">{{t.Name | truncationString}}</span></td>
                            <td>{{t.Power}}</td>
                            <td>{{t.UpgradeAmount}}</td>
                            <td>{{t.OrderAmount}}</td>
                            <td>{{t.PriceRate}}</td>
                            <td>{{t.LevelQty}}</td>
                            <td>{{t.UpLevelQty}}</td>
                            <td>{{t.IsNeedCheck ? '是' : '否'}}</td>
                            <td v-if="t.ChildCheck==0">公司和直属上级审</td> <td v-if="t.ChildCheck==1">公司和上级审</td> <td v-if="t.ChildCheck==2">原上级和升级后上级审</td>
                            <td>{{t.IsExpCurrDesc}}</td>
                            <!--<td>{{t.ChildCheckDesc}}</td>
                            <td>{{t.ChangeCheckDesc}}</td>-->
                            <td>{{t.GuaranteeMoney || 0.00}}</td>
                            <td>{{t.ChargeAmount ? t.ChargeAmount.toFixed(2) : 0.00}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{t.Note}}">{{t.Note | truncationString}}</span></td>
                            <td>{{t.Status ? '启用' : '禁用'}}</td>
                            <td>
                                <a href="#!/client-grade-edit?id={{t.CustomerGradeID}}" data-toggle="tooltip" data-placement="top" title="编辑">
                                <span class="click-element iconfont icon-alter"></span></a>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="{{t.Status ? '禁用' : '启用'}}">
                                <span @click="setStatus([t.CustomerGradeID], t.Status ? 0 : 1)" class="iconfont click-element" :class="[t.Status ? 'icon-forbid':'icon-play']"></span>
                                </a>
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
<edit-modal></edit-modal>
</template>
<script lang="coffee">
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 当前对接地址
    URL = 'http://192.168.88.5:999/API'

    commonMethods = require '../../../js/common'

    # 页面模型
    pageData =
        selectAll: false
        query:
            Status: ''
            PriceRate: ''
            PriceRate_To: ''
        customerType: []
        customerGradeList: []
        tableList: []
        paginationOptions:
            cur: 1
            all: 1
            pageSize: 15
            totalRecords: 0

    module.exports =
        data: () ->
            return pageData

        components:

            'pagination': require '../../../components/pagination.vue'

        computed: commonMethods.selectAll 'this.tableList', (item) ->

            return item.CustomerGradeID

        methods:
            # 获取客户可选类型列表
            getClientTypeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetCustomerType'
                    success: (data) ->
                        relf.customerType = data.Data


            # 获取客户可选等级列表
            getCustomerGradeList: () ->
                relf = this

                servers.getAjax
                    url: '/BaseLookup/GetBasCustomerGradeList'
                    success: (data) ->
                        relf.customerGradeList = data.Data

            #重置
            resetting: ->
                @query =
                    Code: ''
                    Name: ''
                    Status: ''
                    Power: ''
            # 搜索
            search: () ->
                self = this

                servers.postAjax.bind(this)
                    url: '/BasCustomerGrade/ErpQueryBasCustomerGrade'
                    data:
                        PageSize: this.paginationOptions.pageSize
                        PageNumber: this.paginationOptions.cur
                        SearchWhere: this.query
                    success: (data) ->
                        if data.ResultCode is 1

                            o.checked = false for o in data.Data.PageData

                            self.tableList = data.Data.PageData

                            self.paginationOptions.all = data.Data.TotalPages
                            self.paginationOptions.totalRecords = data.Data.TotalRecords


            ###*
             * 启用与禁用
             * @param  {Array} arr    VenderIDList
             * @param  {Number} status 当前状态
             * @return {null}
             *###
            setStatus: (arr, status) ->
                self = this

                arr = this.checkedGroups if arr.length is 0
                return @$dispatch 'transmit', 'tip', contentText: '请先选择客户等级列表!' if arr.length is 0

                servers.postAjax.bind(this)
                    url: '/BasCustomerGrade/ErpUpdateStatus'
                    data:
                        CustomerGradeIDList: arr,
                        Status: status
                    success: (data) ->

                        if data.ResultCode is 1

                            text = if status then '启用' else '禁用'

                            self.$dispatch 'transmit', 'tip', contentText: text + '成功！'

                            self.search()



        ready: () ->
            this.getClientTypeList()
            this.getCustomerGradeList()
            this.search()

        events:

            'page-change': () ->

                this.search true

</script>
<style rel="stylesheet/less" lang="less">


</style>
