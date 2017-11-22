<template id="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="operate-form-title">
                        <p>修改货位</p>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                        <input v-model="form.Name" type="text" class="form-control" placeholder="" required="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">所属仓库</label>
                        <select class="form-control" v-model="form.StockID">
                            <option value="">请选择</option>
                            <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">父级库位</label>
                        <select class="form-control" v-model="form.ParentID">
                            <option value="">请选择</option>
                            <option v-for="opt in parentList" value="{{opt.SpaceID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">业务类型</label>
                        <select class="form-control" v-model="form.SpaceTransferID">
                            <option value="null">请选择</option>
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
                    <div class="form-group form-limit-width form-limit-margin">
                        <label class="form-group-text">设置状态</label>
                        <div class="checkbox"><status-checkbox :status.sync="form.Status"></status-checkbox></div>
                    </div>
                    <div class="operate-form-buttons ">
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
    # 区域选择组件
    selectArea = require '../../../components/select-area.vue'


    module.exports =
        props: ['list']
        data: () ->
            return data =
                form: {}
                parentList: []
                stockList: []
                # 货位业务类型列表
                spaceTransferList: []
                # 货位用途类型编码列表
                spaceUseTypeList: []
                # 货位搜索顺序列表
                spaceOrderList: []
        components:
            'select-area': selectArea
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

            # 提交修改数据
            submit: () ->
                self = this
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasSpace/ErpSaveSpace'
                    data: this.form
                    success: (data) ->
                        servers.NProgress.done ''
                        if data.ResultCode is 1

                            self.$dispatch 'transmit','tip', contentText: '修改成功！'

            getParentList: () ->
                self = this

                servers.postAjax
                    url: '/BaseLookup/GetSpaceList'
                    data:
                        SpaceID: self.$route.params.id
                    success: (data) ->
                        self.parentList = data.Data

            getSpace: (id) ->

                self = this
                servers.NProgress.start ''
                servers.postAjax.bind(this)

                    url: '/BasSpace/GetSpaceDetailByID'
                    data:

                        SpaceID: id

                    success: (data) ->
                        servers.NProgress.done ''
                        if data.ResultCode is 1

                            self.form = data.Data[0]


        ready: () ->
            this.getParentList()
            # 获取所有列表
            this.getList 'spaceTransferList', '/BaseLookup/GetSpaceTransferID'
            this.getList 'spaceUseTypeList', '/BaseLookup/GetSpaceUseTypeID'
            this.getList 'spaceOrderList', '/BaseLookup/GetSpaceOrder'
            this.getList 'stockList', '/BaseLookup/GetStockList'
        route:
            data: (transition) ->
                this.getSpace transition.to.query.id
</script>

<style rel="stylesheet/less" lang="less">
.form-limit-margin{
    .checkbox{
        margin-top: -8px;
        line-height: 10px;


    }
}


</style>
