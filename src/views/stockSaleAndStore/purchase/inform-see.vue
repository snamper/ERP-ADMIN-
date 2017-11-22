<template>
<div class="sell-hd-fz">
    <h3>来货计划单查看</h3>
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
                        <input v-model="query.BusManuOrderSheet" v-on:focus="showPlanList" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">交货日期</label>
                        <input v-model="query.RecDate" v-on:focus="showPlanList" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                        <input v-model="query.VenderName" v-on:focus="showPlanList" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">送货单号</label>
                        <input v-model="query.OutSheetID" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">来货日期</label>
                        <input v-model="query.PurDate" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">收货仓库<span class="form-required-mark">*</span></label>
                        <input v-model="query.StockName" type="text" class="form-control" placeholder="" disabled>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note" class="form-control" rows="3" disabled></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                        <div class="panel-collapse sheet-retItems-collapse collapse in tra col-lg-12">
                            <div class="sheet-list-table table-responsive">
                                <table class="table table-condensed panel-group">
                                    <thead class="sheet-list-header">
                                        <tr>
                                            <th>商品</th>
                                            <th>SKU</th>
                                            <th>商品名称</th>
                                            <th>尺码</th>
                                            <th>颜色</th>
                                            <th>建议售价</th>
                                            <th>退货数量</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tr in query.BusPlanReceiptGoodInfo_View">
                                            <td>
                                                <span>{{tr.CustomNo}}</span>
                                            </td>
                                            <td>
                                                <span>{{tr.CustomBC}}</span>
                                            </td>
                                            <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.Name}}">{{tr.Name  | truncationString }} </span>
                                            </td>
                                            <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.SizeName}}">{{tr.SizeName  | truncationString }} </span>
                                            </td>
                                            <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.ColorName}}">{{tr.ColorName  | truncationString }} </span>
                                            </td>
                                            <td>
                                                {{tr.Price}}
                                            </td>
                                            <td>
                                                <span>{{tr.Qty}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a  class="btn btn-default" v-link="'../inform'">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="">
        {{query|json}}
    </div> -->
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
                    FinishFlag: 10,
                    BusPlanReceiptGoodInfo_View: [],
                    ManuOrderID: ''
                },
                tableList: [],
                venderList: [],
                stockList: [],
                informTransitionToQueryID: null
            }
        },
        components: {
            'planList': require('./plan-list.vue')
        },
        methods: {
            // 提交 query 数据
            postQuery: function () {
                var relf = this;

                require('../../../js/servers/servers').postAjax({
                    url: '/BusPlanReceipt/ErpSaveBusPlanReceip',
                    data: relf.query,
                    success: function (data) {
                        alert('修改成功');
                    }
                });
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
            },
            getData:function () {
                var relf = this;
                require('../../../js/servers/servers').postAjax({
                    url: '/BusPlanReceipt/ErpBusPlanReceiptGet',
                    data: {
                        PlanReceiptID: this.informTransitionToQueryID
                    },
                    success:function (data) {
                        relf.query = data.Data;
                    }
                })
            }
        },
        route: {
            activate: function () {
                this.getVenderList();
                this.getStockList();
                this.getData();
            },
            data: function (transition) {
                this.informTransitionToQueryID = transition.to.query.id;
            }
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
.operate-form-buttons{
    margin-top:20px;
}
.form-control[disabled]{
    background: #fff;
}
.operate-form-list .form-group > .form-control{
    padding:10px;
    margin-bottom:10px;
}
</style>
