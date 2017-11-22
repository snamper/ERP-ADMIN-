<template>
    <div class="modal fade order-tip" :class="{'in':modal.show}" v-show="close">
        <div class="modal-dialog">
            <div class="modal-content  transform-box">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">设置红包</h4>
                    </div>
                    <div class="content-padding clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <!--<label class="control-label">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</label>-->
                                <h class="account-margin top-text">请设置红包范围</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail  stock-upsheet">
                                <div class="item-list form-limit-width stock-upsheet col-md-6">
                                    <input v-model="BeginRedPack"  type="text" class="form-control" placeholder="最小红包" ><span class="fenT">分</span>
                                    <span class="hx">——</span>
                                    <input v-model="EndRedPack" type="text" class="form-control" placeholder="最大红包" ><span class="fenT">分</span>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="save()" type="button" class="btn btn-primary"> 确定 </button>
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
//        props: ['BarcodeID'],
        data: function () {
            return {
                modal: {
                    show: false,
                    title: '设置sku包装数'
                },
                BeginRedPack:0,
                EndRedPack:0,
                BarcodeID:'',
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




//            // 保存
            save: function () {
                var self = this;
                if(self.BeginRedPack ==''||self.BeginRedPack ==null||self.EndRedPack ==''||self.EndRedPack ==null) {
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '红包范围不能为空!'
                    });
                    return 
                }
                if(self.BeginRedPack>20000||self.EndRedPack>20000){
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '最大限额20000分!'
                    });
                    return 
                }
                if(self.BeginRedPack > self.EndRedPack) {
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '请填写正确的金钱范围!'
                    });
                    return 
                }
                NProgress.start();
                var data = {
                        BeginRedPack:this.BeginRedPack,
                        EndRedPack:this.EndRedPack,
                        BarcodeID:this.BarcodeID
                    }
                servers.postAjax.bind(this)({
                    url: '/BasBarcode/ErpSetBarCodeRedPack',
                    data: data
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '设置成功!'
                        });
                        self.$dispatch('page-change');
                        self.close();
                    }
                })
            },
//            // 输入下一条数据
//            nextBoxCode: function (index) {
//                if (index < this.saleOrders.length) {
//                    document.querySelector("[index='boxCodeForm" + (index + 1) + "']").focus();
//                }
//            }
        },
        events: {
            'setting-redpackge': function (param) {
                debugger
                this.BarcodeID = param.id
                this.BeginRedPack = param.begin
                this.EndRedPack= param.end
                this.showModal();
//                this.saleOrders = saleOrders;
//                this.qrCodeID = qrCodeID;

            }
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    .transform-box{
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
        .item-list {
            display: flex;
            .hx{
                display: inline-block;
                line-height: 21px;
                margin: 0 21px;
            }
        }
        .content-padding {
            padding: 40px;
            padding-bottom: 154px;
        }
        .sku-number {
            width: 53px;
            line-height: 20px;
            text-align: center;
        }
        .padding {
            margin-right: 8px;
        }
        .stock-upsheet {
            position: relative;
            .fenT{
                line-height: 22px;
            }
        }
        .stock-upsheet-wrap {
            position: absolute;
            width: 67%;
            left: 65px;
            top: 24px;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            ul.stock-upsheet-list {
                padding: 5px;
                border: 1px solid #ccc;
                background: #fff;
                max-height: 155px;
                overflow-y: scroll;
            }
            .stock-upsheet-item {
                white-space: nowrap;
                overflow: hidden;
                line-height: 24px;
                text-overflow: ellipsis;
                cursor: pointer;
                &:hover {
                    background: #ccc;
                }
            }
        }
    }
</style>