<template>
    <div class="sell-hd-fz">
        <h3>添加来货计划</h3>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p></p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">生产订单编号</label>
                        <input v-model="query.Sheet" v-on:focus="showPlanList" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group inform-limit-width">
                        <label class="form-group-text">交货日期</label>
                        <div class='input-group date input-group-plan' id='recDate-timepicker'>
                            <input v-model="query.RecDate | formatDate" type='text' class="form-control" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                        <select v-model="query.VenderID" class="form-control">
                            <option v-for="vender in venderList" value="{{vender.VenderID}}">{{vender.Name}}</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">送货单号</label>
                        <input v-model="query.OutSheetID" type="text" class="form-control" placeholder="" >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">来货日期</label>
                        <div class='input-group date input-group-plan' id='PurDate-timepicker'>
                            <input v-model="query.PurDate | formatDate" type='text' class="form-control" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">收货仓库<span class="form-required-mark">*</span></label>
                        <select v-model="query.StockID" class="form-control">
                            <option v-for="stock in stockList" value="{{stock.StockID}}">{{stock.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class=" form-group_table destroy-layout">

                        <label class="form-group-text">商品清单</label>
                        <div class="form-group-list">
                            <jxc-detail :vender-id.sync="query.VenderID" :ban-refresh-details.sync="banRefreshDetails" :list.sync="query.PlanReceiptItems" :type="1" model-name="inform" submit-url="/BusPlanReceipt/ErpSaveBusPlanReceiptItem" del-url="/BusPlanReceipt/ErpDelBusPlanReceiptItem"></jxc-detail>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="submit">保存</a>
                        <a  class="btn btn-default" v-link="{name:'inform'}">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <plan-list></plan-list>
</template>
<script>
    // 信息
    module.exports = {
        data: function () {
            return {
                query: {
                    Sheet: '',
                    VenderID: '',
                    StockID: '',
                    RecDate: '',
                    PurDate: '',
                    FinishFlag: '',
                    PlanReceiptID: '',
                    PlanReceiptItems: []
                },
                tableList: [],
                venderList: [],
                stockList: [],
                banRefreshDetails: false
            }
        },
        components: {
            'planList': require('./plan-list.vue'),
            'jxc-detail': require('./JXC-detail.vue'),
            'date-picker': require('../../../components/date_picker.vue')
        },
        methods: {

            // 提交 query 数据
            postQuery: function () {
                var self = this,
                    data = {
                        Note: this.query.Note,
                        RecDate: this.query.RecDate,
                        VenderID: this.query.VenderID,
                        Sheet: this.query.Sheet,
                        OutSheetID: this.query.OutSheetID,
                        ManuOrderID: this.query.ManuOrderID,
                        PurDate: this.query.PurDate,
                        StockID: this.query.StockID,
                        PlanReceiptItems: []
                    }
                if (this.query.VenderID === '') return this.$dispatch('transmit', 'tip', {contentText: '请选择供应商！'})
                var self = this;
                this.$broadcast('submit-before', function (submitType) {
                    self.query.PlanReceiptItems.forEach(function (o, i) {
                        data.PlanReceiptItems.push({
                            BarcodeID: o.BarcodeID,
                            PlanReceiptID: o.PlanReceiptID,
                            PlanReceiptItemID: o.PlanReceiptItemID,
                            Qty: o.Qty,
                            Price: o.Price
                        })
                    })
                    if (submitType) {
                        require('../../../js/servers/servers').postAjax.bind(self)({
                            url: '/BusPlanReceipt/ErpSaveBusPlanReceip',
                            data: data,
                            success: function (data) {
                                if (data.ResultCode === 1) self.$dispatch('transmit', 'tip', {contentText: '保存成功'});
                                if (data.ResultCode === 1) self.query = {PlanReceiptItems: []};
                                if (data.ResultCode === -1) self.banRefreshDetails = true;
                            }
                        });
                    }
                })
            },

            getVenderList: function () {
                var relf = this;
                require('../../../js/servers/servers').getAjax({
                    url: '/BaseLookup/GetVenderList',
                    success: function (data) {
                        relf.venderList = data.Data;
                    }
                });
            },

            getStockList: function () {
                var relf = this;
                require('../../../js/servers/servers').getAjax({
                    url: '/BaseLookup/GetStockList',
                    success: function (data) {
                        relf.stockList = data.Data;
                    }
                });
            },

            // 保存
            submit: function () {
                this.postQuery();
            },

            showPlanList: function () {
                this.$broadcast('show-plan-list', this.query);
            }
        },
        ready: function () {
            this.getVenderList();
            this.getStockList();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#recDate-timepicker').datetimepicker({});
            $('#PurDate-timepicker').datetimepicker({});
        }
    }
</script>
<style type="text/css" lang="less">
.sheet-list-table-bd{
    border: 1px solid #e5e5e5;
    margin-top:10px;
}
.slide-click-element{
    cursor: pointer;
}
.slide-click-element:hover{
    border-radius: 5px 5px 0 0;
    background: #8996b0;
    color: #fff;
    padding: 5px 14px 5px 10px;
    vertical-align: middle;
}
.slide-click-element.click{
    border-radius: 5px 5px 0 0;
    background: #8996b0;
    color: #fff;
    padding: 5px 14px 5px 10px;
    vertical-align: middle;
}
.tra{
    transition: all .5s;
}
</style>
