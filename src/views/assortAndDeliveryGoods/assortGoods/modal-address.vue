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
                                <div class="form-group col-lg-12">
                                    <label >收货人</label>
                                    <input v-model="formData.LinkMan" type="text" class="form-control"  placeholder="">
                                </div>
                                <div class="form-group col-lg-12">
                                    <label >收货电话</label>
                                    <input v-model="formData.Phone" type="text" class="form-control"  placeholder="">
                                </div>
                                <div class="form-group col-lg-12">
                                    <label >收货手机</label>
                                    <input v-model="formData.Mobile" type="text" class="form-control"  placeholder="">
                                </div>
                                <div class="form-group col-lg-12 takeDelivery">
                                    <label >收货区域</label>
                                    <input v-model="formData.Country" type="text" class="form-control"  placeholder="国家">
                                    <!--新增国家-->
                                    <input v-model="formData.State" type="text" class="form-control"  placeholder="省">
                                    <input v-model="formData.City" type="text" class="form-control"  placeholder="市">
                                    <input v-model="formData.District" type="text" class="form-control"  placeholder="区">
                                    <!--<select-area v-if="customerIDGroup.length > 0" :state.sync="formData.State" :city.sync="formData.City" :district.sync="formData.District"></select-area>-->
                                </div>
                                <div class="form-group col-lg-12">
                                    <label >收货地址</label>
                                    <textarea v-model="formData.Address" class="form-control" rows="3"></textarea>
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
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示'
                },
                // 父级组件 单条 数据储存
                outStockIDGroup: [],
                formData: {
                    Address: '',
                    Phone: '',
                    Country:'',
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
                this.outStockIDGroup = [];
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
                this.updateAddress();
            },
            updateAddress: function () {
                var updateAddressData = [];
                var self = this;
                var formData = this.formData;
                self.outStockIDGroup.forEach(function (outStockID) {
                    updateAddressData.push({
                        OutStockID: outStockID,
                        Address: formData.Address,
                        Phone: formData.Phone,
                        Country:formData.Country,
                        State: formData.State,
                        City: formData.City,
                        LinkMan: formData.LinkMan,
                        Mobile: formData.Mobile,
                        District: formData.District
                    })
                });
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusOutStock/UpdateOutStockAddress',
                    contentType: 'application/json',
                    data: JSON.stringify(updateAddressData)
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '修改地址成功'
                        });
                        self.close();
                        self.$dispatch('transmit','refreshOutStockBatch');
                    }
                })
            }
        },
        events: {
            'modal-address': function (outStockIDGroup,customerOrder) {
                this.showModal();
//                console.log(customerOrder);
                if (customerOrder) {
                    this.formData = {
                        Address: customerOrder.Address,
                        Phone: customerOrder.Phone,
                        Country:customerOrder.Country,
                        State: customerOrder.State,
                        City: customerOrder.City,
                        District: customerOrder.District,
                        LinkMan: customerOrder.LinkMan,
                        Mobile: customerOrder.Mobile
                    }
                } else {
                    this.formData = {
                        Address: '',
                        Phone: '',
                        Country:'',
                        State: '',
                        City: '',
                        District: '',
                        LinkMan: '',
                        Mobile: ''
                    }
                }
                this.outStockIDGroup = outStockIDGroup;
            }
        },
        components: {
            selectArea: require('../../../components/select-area.vue')
        }
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
