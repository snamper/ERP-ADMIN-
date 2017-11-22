<template>
    <div class="modal fade order-tip " :class="{'in':modal.show}"  v-show="close">
        <div class="modal-dialog" style="width:800px">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modal.title}}</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="client-row-fluid">
                            <div class="client-account-content">
                                <!--<label class="control-label">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</label>-->
                                <h class="account-margin top-text">请输入条码或使用扫码枪扫描空箱码，关联后系统会自动匹配该箱码的盒码和防伪码</h><br/><br/>
                            </div>
                            <div class="col-lg-12 detail">
                                <table class="table table-hover">
                                    <thead>
                                    <tr class="bgcolor">
                                        <th>SKU</th>
                                        <th>商品名称</th>
                                        <th>数量</th>
                                        <th>已绑定防伪码数量</th>
                                        <th>起始防伪码</th>
                                        <th>终止防伪码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(index,saleOrder) in saleOrders">
                                        <td>{{saleOrder.CustomBC}}</td>
                                        <td>{{saleOrder.GoodsName}}</td>
                                        <td>{{saleOrder.Qty}}</td>
                                        <td>{{saleOrder.Count}}</td>
                                        <td>
                                            <input type='text' class="form-control"  v-model="saleOrder.StartCode"/>
                                        </td>
                                        <td>
                                            <input type='text' class="form-control" v-model="saleOrder.EndCode"/>
                                        </td>
                                        <td>
                                            <button @click="binding(index)" type="button" class="btn btn-default"> 绑定 </button>
                                        </td>
                                        <td>
                                            <button @click="reset(index)" type="button" class="btn btn-default"> 清空 </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="matchOrder()" type="button" class="btn btn-primary"> 确定 </button>
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
                    title: '关联条码'
                },
                saleOrders: [],
                OutStockID: ''
            }
        },
        computed: {
//             relevanceOrders: {
//                 get: function () {
//                     var saleOrders = [];
//                     this.saleOrders.forEach(function (saleOrder) {
//                         if (saleOrder.IsNewBoxCode && saleOrder._BoxCode) {
//                             saleOrders.push({
//                                 BarcodeID: saleOrder.BarcodeID,
//                                 CustomBC: saleOrder.CustomBC,
// //                            QRCodeID: self.qrCodeID,
//                                 CustomerID: saleOrder.CustomerID,
//                                 SheetID: saleOrder.SheetID,
//                                 GoodsName: saleOrder.GoodsName,
//                                 Qty:saleOrder.Qty,
//                                 Count:saleOrder.Count,
//                                 StartCode:saleOrder.StartCode,
//                                 EndCode:saleOrder.EndCode,
//                             });
//                         }
//                     });
//                     return saleOrders;
//                 }
//             }
        },
        filters: {
            scanBoxCode: {
                write: function (boxCode) {
                    var scanBoxCode = boxCode.match(/c=(.*)$/);  // 通过扫描二维码得到的boxCode
                    scanBoxCode = scanBoxCode ? scanBoxCode[1] : '';
                    return scanBoxCode || boxCode || '';
                }
            }
        },
        methods: {
            relevanceOrders(orders){
                let self = this;
                console.info(orders)
                self.saleOrders = [];
                orders.forEach(function (saleOrder) {
                    console.info(saleOrder);
                    if (saleOrder.BarcodeID) {
                        self.saleOrders.push({
                            BarcodeID: saleOrder.BarcodeID,
                            CustomBC: saleOrder.CustomBC,
//                            QRCodeID: self.qrCodeID,
                            CustomerID: saleOrder.CustomerID,
                            SheetID: saleOrder.SheetID,
                            GoodsName: saleOrder.GoodsName,
                            Qty:saleOrder.Qty,
                            Count:saleOrder.Count,
                            StartCode:saleOrder.StartCode,
                            EndCode:saleOrder.EndCode,
                        });
                    }
                });

            },
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
            // 关联订单
            matchOrder: function () {
                var self = this;
                let data = {OutStockID:self.OutStockID}
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpSaveQrCodeBinding',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功!'
                        });
                        self.$dispatch('page-change');
                        self.close();
                    }
                })
                
            },
            //绑定
            binding: function(index){
                var self = this;
                console.info("binding")
                console.info(index)
                let data = {
                    SheetID:self.saleOrders[index].SheetID,
                    StartCode:self.saleOrders[index].StartCode,
                    EndCode:self.saleOrders[index].EndCode,
                    BarcodeID:self.saleOrders[index].BarcodeID,
                }
                var reg = /^[0-9]*[1-9][0-9]*$/;
                if(!reg.test(data.StartCode)||!reg.test(data.EndCode)) {
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '请输入正确的防伪码!'
                            });
                    return  false
                }
                if(parseInt(data.StartCode) > parseInt(data.EndCode)){
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '起始防伪码不能大于终止防伪码!'
                            });
                    return  false
                }
                let count = parseInt(data.EndCode) - parseInt(data.StartCode)+1;
                if(self.saleOrders[index].Qty<count){
                    self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '已绑定防伪码超过需求数量!'
                            });
                    return  false
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQrCodeBinding',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                }).done(function (result) {
                    NProgress.done();
                    console.log(result);
                    if(result.ResultCode&&result.ResultCode>0){
                        let data = result.Data;
                        self.saleOrders[index].Count = self.saleOrders[index].Count+data.SuccessQty;
                        self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText:data.ErrMsg
                            });
                    }
                    
                })
            },
            //重置
            reset: function(index){
                let self = this ;
                console.info("reset")
                console.info(index)
                let data = {
                    SheetID:self.saleOrders[index].SheetID,
                    BarcodeID:self.saleOrders[index].BarcodeID,
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpClearBinding',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                }).done(function (result) {
                    NProgress.done();
                    if(result.ResultCode == 1) {
                        self.saleOrders[index].Count = 0 ;
                        self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText:'清空完成'
                            });
                    }
                    console.log(result);
                })
            },
        },
        events: {
            'modify': function (saleOrders, OutStockID) {
                this.showModal();
                this.relevanceOrders(saleOrders);
                this.OutStockID = OutStockID;

            }
        },
    };

</script>

<style rel="stylesheet/less" lang="less" >
    tr{
        border: none;
    }
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