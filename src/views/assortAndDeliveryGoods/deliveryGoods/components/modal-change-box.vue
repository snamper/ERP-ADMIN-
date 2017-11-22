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
                                    <label >选择箱子</label>
                                    <select class="form-control" v-model="targetBoxSheet">
                                        <option v-for="OutBoxupBox in currentOutBox.OutBoxup.OutBoxupBox" value="{{OutBoxupBox.Sheet}}">{{OutBoxupBox.Sheet}}</option>
                                    </select>
                                </div>
                                <div class="form-group col-lg-6" v-if="changeItem">
                                    <label >数量</label>
                                    <input v-model="changeNumber" type="text" class="form-control" @keyup.enter="submit"  placeholder="">
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
                customerIDGroup: [],
                changeItem: '',    //需要换箱子的明细
                currentOutBox: {},   //当前订单
                targetBoxSheet: '',   //变换后的箱子编号
                changeNumber: '',  //变换的数量
                formData: {
                    Address: '',
                    Phone: '',
                    State: '',
                    City: '',
                    District: '',
                    LinkMan: '',
                    Mobile: ''
                }
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
                var changeData = {
                    changeItem: this.changeItem,    //需要换箱子的明细
                    targetBoxSheet: this.targetBoxSheet,   //变换后的箱子编号
                    changeNumber: this.changeNumber  //变换的数量
                };
                this.$dispatch('transmit','change-box',changeData);
            }
        },
        events: {
            'modal-change-box': function (changeData) {
                var changeData = changeData;
                this.changeItem = changeData.changeItem;
                this.currentOutBox = changeData.currentOutBox;
                this.targetBoxSheet = changeData.currentBox.Sheet;
                this.showModal();
            },
            "modal-change-box-close": function () {
                this.close();
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
