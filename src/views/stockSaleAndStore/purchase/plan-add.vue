<template>
    <div class="query-form">
        <div class="query-header plan-fontsize query-header-margin">
          <h3>新增生产订单</h3>
        </div>
        <div class="query-body form-inline query-detail query-detail-pd">
            <div class="row">
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">供应商<span class="form-required-mark">*</span></label>
                    <select v-model="query.VenderID" class="form-control">
                        <option v-for="vender in venderList" value="{{vender.VenderID}}">{{vender.Name}}</option>
                    </select>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">下单号</label>
                    <input v-model="query.OrderSheetID" type="text" class="form-control">
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">交货日期</label>
                    <div class='input-group date' id='recDate-add-timepicker'>
                        <input v-model="query.RecDate | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">备注</label>
                    <input type="text"  v-model="query.Note" class="form-control"/>
                </div>
                </div>
                <div class="plan-box col-lg-12 plan-shop-list">
                    <label class="form-group-text ">商品清单</label>
                    <div class="form-group form-limit-width col-lg-12">

                        <!-- <min-table :ret-items="query.ManuOrderItems" :submit-type="0" del-url="" submit-url="/BusManuOrder/ErpSaveManuOrderItem" del-url="/BusManuOrder/ErpDelManuOrderItem"></min-table> -->
                        <jxc-detail :vender-id.sync="query.VenderID" :list.sync="query.ManuOrderItems" :type="1" model-name="plan" submit-url="/BusManuOrder/ErpSaveManuOrderItem" del-url="/BusManuOrder/ErpDelManuOrderItem"></jxc-detail>
                    </div>
                    <div class="form-group plan-add-newbtn">
                        <button type="button" name="button" class="btn btn-default " @click="submit">保存</button>
                        <button type="button" name="button" class="btn btn-default " v-link="'./plan'">返回列表</button>
                    </div>

            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                query: {
                    Note: '',
                    ManuOrderID: null,
                    RecDate: '', //
                    VenderID: '', // 4 个 - 格式的编码
                    ManuOrderItems: []
                },
                tableList: [],
                venderList: []
            }
        },
        components: {
            // 'min-table': require('./min-table.vue')
            'jxc-detail': require('./JXC-detail.vue')
        },
        methods: {
            postPlan: function () {
                var self = this,
                    data = {
                        Note: this.query.Note,
                        RecDate: this.query.RecDate,
                        VenderID: this.query.VenderID,
                        OrderSheetID: this.query.OrderSheetID,
                        ManuOrderItems: []
                    };

                this.query.ManuOrderItems.forEach(function (o, i) {
                    data.ManuOrderItems.push({
                        BarcodeID: o.BarcodeID,
                        Qty: o.Qty,
                        Price: o.Price
                    })
                })

                require('../../../js/servers/servers').postAjax.bind(this)({
                    url: '/BusManuOrder/ErpSaveManuOrder',
                    data: data,
                    success: function (data) {

                        self.$dispatch('transmit', 'tip', {

                            contentText: '添加成功'

                        })

                        self.query = {
                            ManuOrderItems: []
                        }
                    }
                });
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
                var self = this;

                if (this.query.VenderID === '') return this.$dispatch('transmit', 'tip', {contentText: '请选择供应商！'})

                this.$broadcast('submit-before', function (submitType) {
                    if (submitType) self.postPlan();
                })
            }
        },
        ready: function () {
            this.getVender();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#recDate-add-timepicker').datetimepicker({});
        }
    }
</script>

<style type="text/css" lang="less">
.query-form{
    .plan-fontsize{
    h3{
        font-size: 14px;
        margin-top:10px;

    }
}
.plan-add-newbtn{
    width: 100px;
    margin-top:52px;
    margin-bottom:10px;
    button{
        margin-right:10px;
    }
}
}
.plan-box{
    margin-top:26px;
    border: 1px solid #e5e5e5;
    padding:15px;
    .form-limit-width{
        border: 1px solid #e5e5e5;
    }
    .sheet-list-table{
        border-top:none;
        .table{
            thead{
                tr{
                    th{
                        border-right:1px solid #e5e5e5;
        text-align:center;



                    }
                    th:nth-of-type(1){
                        width: 90px;
                    }
                }
            }
            tbody{
                tr{
                    td{
                        border-right:1px solid #e5e5e5;
                        border-bottom:1px solid #e5e5e5;
        text-align:center;




                    }
                }
            }

        }

    }
    .col-lg-12{
        padding-left:0;
        padding-right:0;
        margin-bottom:12px;

    }


}
.query-detail-pd{
        .form-group-text{
            font-weight:bold;
            margin-bottom:10px;
        }
        padding-bottom:20px;
}
.plan-shop-list{
    .table-condensed{
        border: 1px solid #e5e5e5;
        tr{
            border-bottom: 1px solid #e5e5e5;
        }
        tr:nth-last-child(1){
            border-bottom:none;
        }
    }
}

</style>
