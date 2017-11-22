<template id="choose-shelves">
    <!--<div class="wolf-modal-wrap">-->
        <div class="modal fade" :class="{'in':modal.show}" v-show="modal.show">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="setShow" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group">
                                <label class=" form-group-text">选择仓库</label>
                                <select class="form-control" v-model="stockID" @change="">
                                    <option v-for="opt in stockList" value="{{opt.StockID}}">{{opt.Name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class=" form-group-text">选择货架</label>
                                <select class="form-control" v-model="index">
                                    <option v-for="opt in list" value="{{opt.index}}">{{opt.Name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="cancel" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="confirm" type="button" class="btn btn-primary"> 确定 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    <!--</div>-->
</template>
<script lang="coffee" type="text/coffeescript">
    # 全局服务
    servers = require '../../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.47:888/API'
    # 当前页面数据模型
    module.exports =
        data: () ->
            return {
                stockList: []
                modal:
                    name: '提示'
                    show: false
                list: []
                _list: []
                _name: ''
                index: 1
                stockID: ''
            }

        watch:

            'stockID': () ->

                @getList @stockID


        methods:
            setShow: (show) ->
                if not show?
                    this.modal.show = not this.modal.show
                else
                    this.modal.show = show

            cancel: () ->
                this.setShow false

            confirm: () ->
                this.select this.list[parseInt this.index]
                this.setShow false

            getList: (stockID) ->
                relf = this

                servers.postAjax
                    url: '/BaseLookup/GetSpaceList'
                    data: {
                        StockID: stockID
                    }
                    success: (data) ->
                        obj.index = index for obj, index in data.Data
                        relf.list = data.Data

            getStockList: () ->

                self = this
                servers.getAjax.bind(this)

                    url: '/BaseLookup/GetStockList'
                    success: (data) ->

                        if data.ResultCode is 1

                            self.stockList = data.Data


            select: (obj) ->
                for o in this._list
                    o.SpaceID = obj.SpaceID
                    o.StockID = obj.StockID
                this.postChoose this._list

            postChoose: (arr) ->
                relf = this

                servers.postAjax.bind(this)
                    url: '/BasSpaceGoods/ErpSaveSpaceGoods'
                    data:
                        List: arr
                        Status: 1
                    success: (data) ->
                        if data.ResultCode is 1
                            relf.$dispatch 'transmit', 'tip', contentText: '绑定成功'
                            relf.setShow false
                            relf.$dispatch 'choose-shelves-success'
                    # , URL

        events:
            'choose-shelves': (arr) ->
                this._list = arr
                this.setShow true
                # 只有StockID一样时才可以批量
                # this.getList arr[0].StockID
                @getStockList ''


</script>
