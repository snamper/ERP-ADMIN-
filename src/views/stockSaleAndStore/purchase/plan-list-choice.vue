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
                        <input v-modal="sheet" type="text" name="name" value="">
                        <button type="button" name="button" @click="getPlanList(sheet)">搜索</button>
                        <ul>
                            <li v-for="li in tableList"><label style="color:{{li.color}};"><input type="checkbox" name="name" value="" v-model="li.checked">{{li.Sheet}}</label></li>
                        </ul>
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
                    title: '选择生产订单条码'
                },
                tableList: [],
                obj: {},
                select: []
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
            },
            // 获取 sku
            getPlanList: function (sheet) {
                var relf = this

                require('../../../js/servers/servers').postAjax({
                    url: '/BusManuOrder/ErpQueryManuOrder',
                    data: {
                        PageSize: 10,
                        PageNumber: 1,
                        SearchWhere: {
                            Sheet: sheet
                        }
                    },
                    success: function (data) {
                        relf.tableList = data.Data.PageData;
                        for (var i = 0; i < relf.tableList.length; i++) {
                            relf.tableList[i].checked = false;
                        }
                    }
                });
            },
            submit: function () {
                this.select = [];
                for (var i = 0; i < this.tableList.length; i++) {
                    if (this.tableList[i].checked) {
                        this.select.push(this.tableList[i].Sheet);
                    }
                }
                this.obj.BusManuOrderSheet = this.select.join(';');
                this.close();
            }
        },
        events: {
            /**
             * 自定义事件 修改条码
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'show-plan-list-choice': function (obj) {
                this.modalWindow.show = true;
                this.obj = obj;
            }
        }
    }
</script>
