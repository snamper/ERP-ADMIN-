<template id="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="operate-form-title">
                        <p>新建货位</p>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                        <input v-model="form.Name" type="text" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">所属仓库<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="form.StockID">
                            <option value="">请选择</option>
                            <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">父级库位</label>
                        <select class="form-control" v-model="form.ParentID">
                            <option value="">不限</option>
                            <option v-for="opt in parentListAfterFilter" value="{{opt.SpaceID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">业务类型</label>
                        <select class="form-control" v-model="form.SpaceTransferID">
                            <option value="">请选择</option>
                            <option v-for="opt in spaceTransferList" value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">用途类型</label>
                        <select class="form-control" v-model="form.SpaceUseTypeID">
                            <option value="">请选择</option>
                            <option v-for="opt in spaceUseTypeList" value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">搜索顺序</label>
                        <input v-model="form.SpaceOrder" type="text" class="form-control" placeholder="" required="">
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">默认出货</label>
                        <select class="form-control" v-model="form.SpaceDetail.DefaultOut">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">默认入货</label>
                        <select class="form-control" v-model="form.SpaceDetail.DefaultIn">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">默认拣货</label>
                        <select class="form-control" v-model="form.SpaceDetail.DefaultPick">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="form.SpaceDetail.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">设置状态</label>
                        <div class="status">
                            <status-checkbox :status.sync="form.Status"></status-checkbox>
                        </div>

                    </div>
                    <div class="operate-form-buttons">
                        <a @click="submit" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a class="btn btn-default" href="#!/space">返回列表&gt;&gt;</a>
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

    module.exports =
        props: ['list']
        data: () ->
            return data =
                form:
                    Status: 1
                    StockID: ''
                    ParentID: ''
                    SpaceTransferID: ''
                    SpaceUseTypeID: ''
                    SpaceDetail:
                        DefaultOut: ''
                        DefaultIn: ''
                        DefaultPick:''

                parentList: []
                parentListAfterFilter: []
                stockList: []
                # 货位业务类型列表
                spaceTransferList: []
                # 货位用途类型编码列表
                spaceUseTypeList: []
                # 货位搜索顺序列表
                spaceOrderList: []
        components:

            'status-checkbox': require '../../../components/status-checkbox.vue'
        methods:
            ###*
             * 获取list
             * @param  {string} name 储存键值
             * @param  {string} url  获取地址
             * @return {null}
             *###
            getList: (name, url) ->
                self = this

                servers.getAjax.bind(this)
                    url: url
                    success: (data) ->
                        self[name] = data.Data
#            #父级仓库的选择
#            selectParent: ->
#                self = this
#                console.log(self.form.StockID)
#                if self.form.StockID.length > 0
#                    self.form.ParentID == ''

            # 提交修改数据
            submit: () ->
                self = this

                # return this.$dispatch 'transmit', 'tip', contentText: '编码为空' if not this.form.Code

                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasSpace/ErpSaveSpace'
                    data: this.form
                    success: (data) ->

                        if data.ResultCode is 1

                            self.$dispatch 'transmit','tip', contentText: '添加成功！'

            getParentList: () ->
                self = this

                servers.getAjax
                    url: '/BaseLookup/GetSpaceList'
                    success: (data) ->
                        data.Data.unshift
                            SpaceID: "a12eb38f-71a2-4d13-a824-c178cec3144c"
                            MerchantID: "00000000-0000-0000-0000-000000000000"
                            StockID: ""
                            Name: "不限"
                            ParentID: "10c29655-fba7-46b5-a72a-51c911cb4922"
                            SpaceUseTypeID: 0
                            SpaceOrder: 200
                            SpaceTransferID: 0
                            Status: 1
                        self.parentList = data.Data
        computed:
            parentListAfterFilter:
                get: (val) ->
                    self = this
                    if this.form.StockID
                        parentListAfterFilter = []
                        for parent in self.parentList
                            if self.form.StockID == parent.StockID
                                parentListAfterFilter.push(parent)
                        return parentListAfterFilter
                    else
                        return this.parentList
        ready: () ->
            this.getParentList()
            # 获取所有列表
            this.getList 'spaceTransferList', '/BaseLookup/GetSpaceTransferID'
            this.getList 'spaceUseTypeList', '/BaseLookup/GetSpaceUseTypeID'
            this.getList 'spaceOrderList', '/BaseLookup/GetSpaceOrder'
            this.getList 'stockList', '/BaseLookup/GetStockList'
            this.getList 'parentList', '/BaseLookup/GetSpaceList'

</script>

<style type="text/css" lang="less">
    .status{
        display:inline-block;
        .checkbox-group{
            padding:0;
        }
    }
</style>

