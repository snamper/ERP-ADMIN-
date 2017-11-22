<template>
    <!--<div class="wolf-modal-wrap" v-show="modalWindow.show">-->
        <div class="modal fade" :class="{'in':modal.show}"  v-show="modalWindow.show">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        {{data.CustomNo}}
                        <div class="form-group">
                            <label>条形码</label>
                            <input v-model="form.CustomBC" type="text" class="form-control" placeholder="条形码">
                        </div>
                        <div class="form-group">
                            <label>国标码</label>
                            <input v-model="form.Barcode" type="text" class="form-control" placeholder="国标码">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="submit" type="button" class="btn btn-primary"> 保存 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    <!--</div>-->
</template>
<script>
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '修改条形码'
                },
                // 模态窗 表单数据
                form: {
                    Barcode: '',
                    CustomBC: ''
                },
                // 父级组件 单条 数据储存
                data: {},
            }
        },
        computed: {
            postData: function () {
                return {
                    BarcodeID: this.data.BarcodeID,
                    // MerchantID: this.data.MerchantID,
                    // GoodsID: this.data.GoodsID,
                    CustomBC: this.form.CustomBC,
                    Barcode: this.form.Barcode
                }
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
            },
            submit: function () {
                this.postSku();
            },
            // 提交 sku
            postSku: function () {
                var self = this,
                    barcode =  this.data.Barcode,
                    customBC =  this.data.CustomBC;
                require('../../../js/servers/servers').postAjax.bind(this)({
                    url: '/BasBarcode/ErpSaveBarCode',
                    data: self.postData,
                    success: function (data) {
                        if (data.ResultCode === -1) {
                            self.data.Barcode = barcode;
                            self.data.CustomBC = customBC;
                        }else if (data.ResultCode === 1){
                            self.data.Barcode = self.form.Barcode;
                            self.data.CustomBC = self.form.CustomBC;
                            self.modalWindow.show = false;
                            self.$dispatch('transmit', 'tip', {contentText: '修改成功!'});
                        }
                    },
                    error: function (data) {
                        self.$dispatch('transmit', 'tip', {contentText: data.ErrorMessage});
                    }
                })
            }
        },
        events: {
            /**
             * 自定义事件 修改条码
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'edit-barcode': function (data) {
                this.modalWindow.show = true;
                this.form.Barcode = data.Barcode;
                this.form.CustomBC = data.CustomBC;
                this.data = data;
            }
        }
    }
</script>
