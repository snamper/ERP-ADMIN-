<template>
    <div class="modal fade" :class="{'in':modalWindow.show}" v-if="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="form-group col-lg-6">
                                    <label>{{isIncrease ? '增加' : '减少'}}的数量</label>
                                    <input v-model="qty" @keyup.enter="submit" type="text" class="form-control"  placeholder="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消</button>
                        <button @click="submit" type="button" class="btn btn-primary btn-primarybd"> 保存</button>

                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                // 父级组件 单条 数据储存
                qty: 0,  //数量
                packItem: {},  //需要修改数量的项目
                isIncrease: true //是否为新增
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modalWindow.show = true;
            },
            submit: function () {
                if (parseInt(this.qty,10) <= 0 ) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入大于0的数字'
                    });
                    return false;
                }
                if (this.isIncrease) {
                    this.$dispatch('transmit','increase',this.packItem,this.qty);
                } else {
                    this.$dispatch('transmit','decrease',this.packItem,this.qty);
                }
            }
        },
        events: {
            'modal-increase': function (boxItem) {
                this.showModal();
                this.packItem = boxItem;
                this.isIncrease = true;
            },
            'modal-decrease': function (boxItem) {
                this.showModal();
                this.packItem = boxItem;
                this.isIncrease = false;
            },
            "modal-number-close": function () {
                this.close();
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
