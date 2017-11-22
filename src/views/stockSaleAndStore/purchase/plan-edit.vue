<template>
    <div class="query-form">
        <div class="query-header">
          <h3>修改生产订单</h3>
        </div>
        <div class="query-body form-inline query-detail">
            <div class="row">
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                    <select v-model="form.VenderID" class="form-control">
                        <option v-for="vender in venderList" value="{{vender.VenderID}}">{{vender.Name}}</option>
                    </select>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">下单号</label>
                    <input v-model="form.OrderSheetID" type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">交货日期</label>
                    <div class='input-group date' id='recDate-timepicker'>
                        <input v-model="form.RecDate | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">备注</label>
                    <textarea v-model="form.Note" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group form-limit-width col-lg-12">
                    <label class="form-group-text">商品清单</label>
                    <jxc-detail :vender-id.sync="form.VenderID" :list.sync="form.ManuOrderItems" :type="2" model-name="plan" submit-url="/BusManuOrder/ErpSaveManuOrderItem" del-url="/BusManuOrder/ErpDelManuOrderItem"></jxc-detail>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6 plan-edit-margin">
                    <button type="button" name="button" class="btn btn-default" @click="submit">修改</button>
                    <button type="button" name="button" class="btn btn-default" v-link="'../plan'">返回列表</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                form: {
                    RecDate: '',
                    ManuOrderItems:[]
                },
                tableList: [],
                venderList: [],
                transitionToQueryID: null
            }
        },
        components: {
            'jxc-detail': require('./JXC-detail.vue')
        },
        methods: {
            postPlan: function () {
                var self = this,
                    data = {
                        Note: this.form.Note,
                        RecDate: this.form.RecDate,
                        ManuOrderID: this.form.ManuOrderID,
                        VenderID: this.form.VenderID,
                        OrderSheetID: this.form.OrderSheetID,
                        ManuOrderItems: []
                    };

                if (this.form.VenderID === '') return this.$dispatch('transmit', 'tip', {contentText: '请选择供应商！'});

                this.$broadcast('submit-before', function (submitType) {
                    if (submitType) {
                        self.form.ManuOrderItems.forEach(function (o, i) {
                            data.ManuOrderItems.push({
                                BarcodeID: o.BarcodeID,
                                ManuOrderID: data.ManuOrderID,
                                ManuOrderItemID: o.ManuOrderItemID,
                                Qty: o.Qty,
                                Price: o.Price
                            })
                        })
                        // self.form.ManuOrderItems.forEach(function (o, i) {
                        //     o.ManuOrderID = self.form.ManuOrderID;
                        //
                        // })
                        require('../../../js/servers/servers').postAjax.bind(self)({
                            url: '/BusManuOrder/ErpSaveManuOrder',
                            data: data,
                            success: function (data) {
                                if (data.ResultCode == 1) {
                                    self.$dispatch('transmit', 'tip', {contentText: '修改成功！'});
                                }
                            }
                        });
                    }
                })
            },
            getVender: function () {
                var relf = this;

                require('../../../js/servers/servers').getAjax({
                    url: '/BaseLookup/GetVenderList',
                    success: function (data) {
                        relf.venderList = data.Data;
                    }
                });
            },
            submit: function () {
                this.postPlan();
            },
            getData:function () {
                var relf = this;
                require('../../../js/servers/servers').postAjax.bind(this)({
                    url: '/BusManuOrder/ErpManuOrderGetById',
                    data: {
                        ManuOrderID: this.transitionToQueryID
                    },
                    success:function (data) {
                        if (data.ResultCode  === 1) {
                            relf.form = data.Data;
                            relf.form.ManuOrderItems = data.Data.BusManuOrderGoodInfo_Views
                        }
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                this.transitionToQueryID = transition.to.query.id;
                this.getData();
            },
            activate: function () {
                this.getVender();

                require('../../../css/bootstrap-datetimepicker.css');
                require('../../../js/plugins/bootstrap-datetimepicker');
                $('#recDate-timepicker').datetimepicker({});
            }
        }
    }
</script>
<style type="text/less">
.plan-edit-margin{
    margin:20px 30px;
    padding-bottom:20px;


}
.btn{
    margin-right:10px;
}
.form-group-text .col-lg-12{
    padding-left:0;

}


</style>
