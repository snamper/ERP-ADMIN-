<template id="select-area">
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
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-4 state-box" v-for="state in stateList">
                                    <label @click="getCityList(state)">
                                        <input type="checkbox" v-model="state.active">
                                        <span>{{state.Name}}</span>
                                    </label>
                                    <div class="slide-city row" v-show="state.active" v-if="state.showCity">
                                        <span v-if="state.cityList.length == 0">正在加载...</span>
                                        <div class="col-sm-4" style="padding: 0 5px;" v-for="city in state.cityList">
                                            <label>
                                                <input type="checkbox" v-model="city.active">
                                                <span>{{city.Name}}</span>
                                            </label>
                                        </div>
                                        <button @click="state.showCity = false" type="button" class="btn btn-default"> 确定 </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="setShow" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="selectArea" type="button" class="btn btn-primary"> 选择 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    <!--</div>-->
</template>
<script lang="coffee">
    # 全局替换接口地址
    URL = 'http://192.168.88.47:888/API'
    # 全局服务
    servers = require '../../../js/servers/servers'

    module.exports =
        props: ['stock', 'deliveryPrice']

        data: () ->
            return {
                modal:
                    name: '选择地区'
                    show: false
                stateList: []
                MerchantDeliveryID: ''
                DeliveryID: ''
            }
        ready: () ->

            this.getStateList()

        events:

            'show-select-area': (IDs) ->

                this.setShow ''
                this.MerchantDeliveryID = IDs[0]
                this.DeliveryID = IDs[1]


        methods:

            setShow: () ->

                this.modal.show  = not this.modal.show



            getStateList: () ->
                self = this

                servers.postAjax
                    url: '/BaseLookup/GetRegionList'
                    data:
                        parentID: '00000000-0000-0000-0000-000000010001'
                    success: (data) ->

                        for o in data.Data
                            o.active = false
                            o.showCity = true
                            o.cityList = []

                        self.stateList = data.Data

                    # URL

            getCityList: (state) ->
                self = this

                if state

                    state.showCity = true

                # o.active = false for o in this.stateList when o.RegionID isnt state.RegionID

                return if state.cityList.length > 0

                servers.postAjax
                    url: '/BaseLookup/GetRegionList'
                    data:
                        parentID: state.RegionID
                    success: (data) ->

                        state.cityList = data.Data

                    # URL

            selectArea: () ->

                areaArray = []

                for state in this.stateList

                    if state.active

                        isPushCity = true

                        if state.cityList.length isnt 0

                            for city in state.cityList

                                if city.active

                                    isPushCity = false
                                    areaArray.push this.makeArea state.Name, city.Name


                        areaArray.push this.makeArea state.Name if isPushCity or state.cityList.length is 0

                this.postAreaList areaArray


            makeArea: (state, city) ->

                return obj =

                    DeliveryPriceID: ''
                    MerchantDeliveryID: this.MerchantDeliveryID
                    MerchantID: null
                    StockID: this.$route.params.id
                    DeliveryID: this.DeliveryID
                    State: state
                    City: city
                    District: ''
                    FirstWeight: null
                    FirstPrice: null
                    NextWeight: null
                    NextPrice: null
                    BeginTime: null
                    EndTime: null
                    BeginWeight: null
                    EndWeight: null
                    Delivery: null


            postAreaList: (list) ->

                this.setShow ''
                this.$dispatch 'post-area-list', list



</script>
