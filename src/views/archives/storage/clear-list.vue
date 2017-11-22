<template id="clear-list">
    <!--<div class="wolf-modal-wrap" v-show="modal.show">-->
        <div class="modal fade" :class="{'in':modal.show}" v-show="modal.show">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="setShow" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group" v-if="list.length > 0">
                            <li v-for="i in list" class="list-group-item click-element center-text" :class="{'click': i.click}" @click="addItem(i, $index)">{{i.Sku}}({{i.CustomNo}},{{i.GoodsName}},{{i.Color}},{{i.Size}})</li>
                        </ul>
                        <span v-if="list.length == 0"><h4>{{tipText}}</h4></span>
                    </div>
                    <div class="modal-footer">
                        <button @click="setShow" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="submit(selectList, 0)" type="button" class="btn btn-primary"> 清除 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>
<script lang="coffee">
    # 全局替换接口地址
    URL = 'http://192.168.88.47:888/API'
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 区域选择组件
    selectArea = require '../../../components/select-area.vue'
    # 页面模型
    pageData =
        selectList: []
        list: []
        tipText: ''
        modal:
            show: false
            name: '提示'

    module.exports =
        props: ['list']
        data: () ->
            return pageData
        components:
            'select-area': selectArea
        methods:
            # 修改当前模态窗口显示状态
            setShow: () ->
                this.modal.show = !this.modal.show
                @selectList = []

            ###*
             * 设置绑定状态
             * @param  {Array} arr     SpaceIDList
             * @param  {Number} status 需要修改成什么状态 0： 解除绑定 1： 绑定
             * @return {null}
             *###
            submit: (arr, status) ->
                relf = this
                # arr = JSON.stringify arr
                return alert '请先选择某项继续下一步' if not arr.length

                servers.postAjax.bind(this)
                    comtentType: 'application/json'
                    url: '/BasSpaceGoods/ErpSaveSpaceGoods'
                    data:
                        List: arr
                        Status: status
                    success: (data) ->

                        if data.ResultCode is 1
                            text = if status then '绑定' else '解除'

                            relf.$dispatch 'transmit', 'tip', contentText: text + '成功！'

                            relf.setShow()
                            relf.$dispatch 'clear-list-success'

                    # , URL

            # 获取货位列表
            getList: (id) ->
                self = this
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/BasSpace/ErpQueryInventory'
                    data:
                        SpaceID: id
                    success: (data) ->

                        if data.ResultCode is 1
                            servers.NProgress.done ''
                            if data.Data.PageData.length is 0

                                self.tipText = '没有多余的可清空数据'
                                return self.list = data.Data.PageData

                            # 先改变数据结构
                            # 再复制到页面模型
                            # 遍历时才会对新增属性监听
                            for i in data.Data.PageData
                                i.click = false

                            self.list = data.Data.PageData


                    # ,URL

            ###*
             * 添加条例
             * @param  {object} obj 当前条例对象
             * @return {null}
             *###
            addItem: (obj, index) ->
                # 查询条例是否点击过
                # 点击过意味着当前体例已经添加到选择的列表中
                # 点击过： 去掉当前选择列表里的当前条例
                # 已点击： 将当前条例添加到选择列表
                if not obj.click
                    this.selectList.push obj
                    obj.pushIndex = this.selectList.length - 1
                else
                    this.selectList.splice obj.pushIndex, 1

                # 设置点击状态
                obj.click = not obj.click
                # 当新增属性不被for循环输出时。绑定set方法
                # this.list.$set index, {click: not obj.click, GoodsID: obj.GoodsID, BarcodeID: obj.BarcodeID, SpaceID: obj.SpaceID, StockID: obj.StockID}

        events:
            'show-clear-list': (id) ->
                this.setShow()
                this.getList(id)




</script>
<style lang="less" rel="stylesheet/less">
    .center-text {
        text-align: center;
    }

    .list-group-item.click{
        transition: all .4s;
        background: #ebebeb;
    }
</style>
