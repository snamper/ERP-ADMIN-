<template>
    <div class="query-form plan-see-adjust">
        <div class="query-header">
          <h3>生产订单查看</h3>
        </div>
        <div class="query-body form-inline query-detail ">
            <div class="row">
                <div class="form-group form-limit-width">
                    <label class="form-group-text">供应商</label>
                    <span class="plan-see-lh">{{vender}}</span>
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">下单号</label>
                    <span class="plan-see-lh">{{plan.OrderSheetID}}</span>
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">交货日期</label>
                    <span class="plan-see-lh">{{plan.RecDate}}</span>
                </div>
                <div class="form-group form-limit-width">
                    <label class="form-group-text">备注</label>
                    <span class="plan-see-lh">{{plan.Note}}</span>
                </div>
                <div class="form-group form-group_table">
                    <label class="form-group-text">商品清单<span class="form-required-mark">*</span></label>
                    <div class="form-group-list col-lg-12">
                        <div class="panel-collapse sheet-retItems-collapse collapse in tra col-lg-12 plan-see-padding">
                            <div class="sheet-list-table table-responsive">
                                <table class="plan-see-bd table table-condensed panel-group">
                                    <thead class="sheet-list-header">
                                        <tr>
                                            <th>商品</th>
                                            <th>SKU</th>
                                            <th>商品名称</th>
                                            <th>尺码</th>
                                            <th>颜色</th>
                                            <th>供货成本</th>
                                            <th>退货数量</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tr in plan.BusManuOrderGoodInfo_Views">
                                            <td>
                                                {{tr.CustomNo}}
                                            </td>
                                            <td>
                                                {{tr.CustomBC}}
                                            </td>
                                            <td>
                                            <span data-toggle="tooltip" data-placement="top" title="{{tr.Name}}">{{tr.Name}}</span>
                                            </td>
                                            <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.SizeName}}">{{tr.SizeName | truncationString }} </span>
                                            </td>
                                            <td>
                                                <span data-toggle="tooltip" data-placement="top" title="{{tr.ColorName}}">
                                                {{tr.ColorName  | truncationString }} </span>
                                            </td>
                                            <td>
                                                {{tr.Price}}
                                            </td>
                                            <td>
                                                {{tr.Qty}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <a type="button" name="button" class="plan-see-btn btn btn-default btn-block" v-link="{name : 'plan'}">返回</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                id: '',
                vender: '',
                plan: {}
            }
        },
        methods: {
            getPlan: function (id) {
                var relf = this

                    require('../../../js/servers/servers').postAjax({
                        url: '/BusManuOrder/ErpManuOrderGetById',
                        data: {
                            ManuOrderID: id
                        },
                        success: function (data) {
                            relf.getVender(data.Data.VenderID);
                            relf.plan = data.Data;
                        }
                    });
            },
            getVender: function (id) {
                var relf = this;

                require('../../../js/servers/servers').getAjax({
                    url: '/BaseLookup/GetVenderList',
                    success: function (data) {
                        for (var i in data.Data) {
                            if (data.Data[i].VenderID === id){
                                relf.vender = data.Data[i].Name;
                            }
                        }
                    }
                });
            }
        },
        route: {
            data: function (transition) {
                this.getPlan(transition.to.query.id);
            }
        }
    }
</script>

<style type="text/less">


   .plan-see-lh{
        line-height:30px;
   }
   .plan-see-bd{
       border: 1px solid #e5e5e5;
       margin-bottom:30px;
       margin-top:10px;
   }
   .sheet-list-table{
            border-top:none;
    }
   .plan-see-btn{
        margin:20px 7px;
        width:60px;
   }
   .form-group-list{
        padding-left:0;
   }
   .plan-see-padding{
        padding-left:0;
   }


</style>
