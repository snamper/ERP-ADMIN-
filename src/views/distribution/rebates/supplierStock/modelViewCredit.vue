<template>
<div class="modal fade order-tip model-view" :class="{'in':modal.show}" v-show="modal.show">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-content-wrap">
                <div class="modal-header" v-drag parent=".modal-content-wrap">
                    <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                    <h4 class="modal-title">{{modal.title}}</h4>
                </div>
                <div class="modal-body clearfix">
                    <div class="client-row-fluid">
                        <div class="client-account-content">
                            <h class="account-margin top-text">箱码： 123456001</h><br/><br/>
                        </div>
                        <div class="col-lg-12 detail">
                            <table class="table table-bordered table-hover">
                                <thead>
                                <tr class="bgcolor">
                                    <th>操作时间</th>
                                    <th>操作人</th>
                                    <th>影响库存</th>
                                    <th>结存库存</th>
                                    <th>关联订单</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="opt in 15">
                                    <td>12345645987201</td>
                                    <td>admin</td>
                                    <td>+9</td>
                                    <td>65</td>
                                    <td>1002345546000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="modal.show = false" type="button" class="btn btn-default"> 取消 </button>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>
<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                modal: {
                    show: false,
                    title: '库存流水'
                },
                // 父级组件 单条 数据储存
//                baseLookUp: {},
            }
        },
        methods: {
            close: function () {
                this.modal.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                console.log(openModal)
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modal.show = true;
            },

        },
        events: {
            /**
             * 自定义事件 库存流水
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'model-view-credit': function () {
                this.showModal();
            }
        },
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .model-view {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>