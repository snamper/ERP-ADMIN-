<template>
    <div class="modal fade order-tip box-code" :class="{'in':modal.show}" v-show="modal.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{BoxCode.title}}</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <h class="account-margin top-text">箱码： {{saleOrder.BoxCode}}</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr class="bgcolor">
                                        <th>盒码</th>
                                        <th>防伪码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="code in codes">
                                        <td>{{code.CaseCode}}</td>
                                        <td>{{code.DetectCode}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>


<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                modal: {
                    show: false,
                    title: '盒码和防伪码'
                },
                saleOrder: {},
                codes: [],
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
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modal.show = true;
            },
            // 查询
            queryCode: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQueryCode',
                    data: {
                        BoxCode: this.saleOrder.BoxCode,
                        QRCodeID: this.saleOrder.QRCodeID,
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.codes = result.Data;
                    }
                })
            }
        },
        events: {

            'model-box-code': function (saleOrder) {
                this.showModal();
                this.saleOrder = saleOrder;
                this.queryCode();
            }
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    .box-code {
        .top-text {
            padding-left: 15px;
        }
        .detail {
            margin-top: 20px;
        }
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>

