<template>
    <div class="wolf-modal-wrap" v-show="modalWindow.show">
        <div class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-inline" style="margin-bottom: 10px;">
                            <label>生产订单号:</label>
                            <input type="text" class="form-control" v-model="sheet">
                            <a href="javascript:void(0)" class="btn btn-default" @click="getPlanList()">搜索</a>
                        </div>
                        <div class="scrollscroll">
                            <div class="table-responsive">
                                <table class="table table-bordered table-condensed table-model-margin">
                                    <thead>
                                    <tr>
                                        <th>
                                            状态
                                        </th>
                                        <th>生产订单号</th>
                                        <th>供应商</th>
                                        <th>下单号</th>
                                        <th>下单日期</th>
                                        <th>交货日期</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr v-for="plan in tableList">
                                        <td>
                                            <input type="radio" value="{{$index}}" v-model="selectPlanIndex">
                                        </td>
                                        <td>{{plan.Sheet}}</td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{plan.VenderName}}">{{plan.VenderName| truncationString}}</span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{plan.OrderSheetID}}">{{plan.OrderSheetID | truncationString}}</span></td>
                                        <td>{{plan.OrderDate | formatDateFormShow}}</td>
                                        <td>{{plan.RecDate | formatDateFormShow}}</td>
                                    </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                        <!-- <ul>
                          <li v-for="li in tableList"><span @click="click(li)">{{li.Sheet}}</span></li>
                        </ul> -->
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="submit" type="button" class="btn btn-primary"> 保存 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                sheet: '',
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '选择生产订单编号'
                },
                tableList: [],
                obj: {},
                selectPlanIndex: 0
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
            },
            // 获取订单编码list
            getPlanList: function () {
                var relf = this

                // if (this.sheet === '')
                // {
                //     this.$dispatch('transmit', 'tip', {
                //         contentText: '请输入文字后进行搜索'
                //     })
                // }

                require('../../../js/servers/servers').postAjax.bind(this)({
                    url: '/BusManuOrder/GetBySheet',
                    data: {
                        Sheet: this.sheet
                    },
                    success: function (data) {
                        relf.tableList = data.Data;
                    }
                });
            },
            submit: function () {
                var obj = this.tableList[this.selectPlanIndex];

                this.click(obj);
                this.close();
            },
            click: function (obj) {

                this.obj.ManuOrderID = obj.ManuOrderID;
                this.obj.Sheet = obj.Sheet;
                this.obj.RecDate = obj.RecDate;
                this.obj.PlanReceiptItems = obj.BusManuOrderGoodInfo_Views;
                this.obj.VenderID = obj.VenderID;
                this.modalWindow.show = false;
            }
        },
        events: {
            /**
             * 自定义事件 修改条码
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'show-plan-list': function (obj) {
                this.modalWindow.show = true;
                this.obj = obj;
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
.table-responsive{
    max-height: 300px;
    overflow-y: auto;
    .table-model-margin{
        thead{
            tr{
                th{
                    text-align:center;
                }
            }
        }
        tbody{
            tr{
                td{
                    text-align:center;
                }
            }
        }
    }
}
</style>
