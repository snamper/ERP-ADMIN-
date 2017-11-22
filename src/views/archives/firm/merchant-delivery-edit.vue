<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">所属快递<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="delivery.DeliveryID" @change="deliverySelectChange(true)">
                            <option v-for="deliveryList in baseLookUp.deliveryList" value="{{deliveryList.DeliveryID}}">{{deliveryList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">快递编码<span class="form-required-mark">*</span></label>
                        <input v-model="delivery.Code" type="text" class="form-control" placeholder="" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">快递名称<span class="form-required-mark">*</span></label>
                        <input v-model="delivery.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">快递类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="delivery.DeliveryType">
                            <option value=1>热敏</option>
                            <option value=2>菜鸟</option>
                            <option value=3>普通面单</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">优先级<span class="form-required-mark">*</span></label>
                        <input v-model="delivery.OrderNo" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">联系人<span class="form-required-mark">*</span></label>
                        <input v-model="delivery.LinkMan | nullToString" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">联系电话</label>
                        <input v-model="delivery.LinkTel | nullToString" type="text" class="form-control" placeholder="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="delivery.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <status-checkbox :status.sync="delivery.Status">
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveDelivery">保存</a>
                        <a v-link="{name:'merchant-deliveries'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                delivery: {
                    Code: '',
                    MerchantDeliveryID: '',
                    DeliveryID: '',
                    DeliveryType: '',
                    OrderNo: 0,
                    Name: '',
                    Note: '',
                    Status: 1,
                    Params: '',
                    LinkMan:'',
                    LinkTel:''
                },
                isChoiceDelivery: false,   //是否已经选择过了快递
                deliveryParams: {},
                //选中的快递
                baseLookUp: {
                    deliveryList: []
                }
            }
        },
        methods: {
            //根据快递类型,传递对应的参数
            choiceParams: function () {
                if (!this.isChoiceDelivery && this.delivery.DeliveryID) {
                    this.deliverySelectChange(false);
                }
                switch (this.delivery.DeliveryType) {
                    case '1':   //热敏
                        this.delivery.Params = JSON.stringify(this.deliveryParams ? this.deliveryParams.remin : []);
                        break;
                    case '2':  //菜鸟
                        this.delivery.Params = JSON.stringify(this.deliveryParams ? this.deliveryParams.cainiao : []);
                        break;
                    case '3':   //普通面单
                        this.delivery.Params = '';
                        break;
                    default:
                        this.delivery.Params = '';
                        break;
                }
            },
            //保存新增快递及修改快递
            saveDelivery: function () {
                var self = this;
                this.choiceParams();
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMerchantDelivery/ErpSaveMerchantDelivery',
                    data: self.delivery
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.resetForm();
                        self.$dispatch('transmit','tip',{
                            name: '成功保存:',
                            contentText: '成功保存!'
                        });
                    }
                });
            },
            //获取下拉列表基础数据
            getBaseLookUp: function () {
                var baseLookUp = this.baseLookUp;
                servers.getBaseData('BasDeliveryList',false,function (val) {
                    baseLookUp.deliveryList = val;
                })
            },
            //选择所属快递时,获取对应的编码
            deliverySelectChange: function (isChoiceDelivery) {
                this.DeliveryID = this.delivery.DeliveryID;
                this.isChoiceDelivery = isChoiceDelivery;
                var self = this;
                var deliveryList = self.baseLookUp.deliveryList;
                var DeliveryID = self.delivery.DeliveryID;
                deliveryList.forEach(function (item) {
                    if (item.DeliveryID == DeliveryID) {
                        if (isChoiceDelivery) {
                            self.delivery.Code = item.Code;
                        }
//                        console.log(item.Params.replace(/\\/g,''));
                        self.deliveryParams = JSON.parse(item.Params.replace(/\\/g,''));
                    }
                })
            },
            //清空数据
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.delivery = {
                        Code: '',
                        MerchantDeliveryID: '',
                        DeliveryID: '',
                        DeliveryType: '',
                        OrderNo: 0,
                        Name: '',
                        Note: '',
                        Status: 1,
                        Params: [],
                        LinkMan:'',
                        LinkTel:''
                    };
                }
            }
        },

        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'merchant-delivery-edit') {
                    self.pageInfo.title = '修改快递档案';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    var merchantDeliveryID = query.MerchantDeliveryID;
                    if ( merchantDeliveryID ) {
                        var delivery = self.delivery;
                        delivery.MerchantDeliveryID = merchantDeliveryID;
                        delivery.Code = query.Code;
                        self.deliveryID = delivery.DeliveryID = query.DeliveryID;
                        delivery.DeliveryType = query.DeliveryType;
                        delivery.OrderNo = query.OrderNo;
                        delivery.Name = query.Name;
                        delivery.Note = query.Note;
                        delivery.Status = query.Status;
                        delivery.LinkMan=query.LinkMan;
                        delivery.LinkTel=query.LinkTel;
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建快递档案';
                    self.resetForm();
                }
            }
        },
        ready: function () {
            this.getBaseLookUp();
        },
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue'),
            modal: require('../../../components/modal.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
