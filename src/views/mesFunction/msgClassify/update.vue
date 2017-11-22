<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>修改分类</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类编码<span class="form-required-mark">*</span></label>
                        <input v-model="save.Code" type="text" class="form-control dan" placeholder="" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">分类名称<span class="form-required-mark">*</span></label>
                        <input v-model="save.Name" type="text" class="form-control dan" placeholder="" required >
                    </div>
                     <div class="form-group form-limit-width">
                        <label class="form-group-text">关键词</label>
                        <input v-model="save.KeyWords" type="text" class="form-control dan" placeholder="多个关键词；隔开" required>
                    </div>
                     <div class="form-group form-limit-width danform">
                        <label class="form-group-text"></label>
                        <p class="form-control dan" style="border:none">根据关键词归类消息分类</p>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="save.Note" class="form-control" rows="10"></textarea>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="btn btn-success" @click="saveDelivery">保存</a>
                        <a v-link="{name : 'classify'}" style="margin-left: 270px" class="btn btn-warning">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .form-group {
        .dan{
            height: 34px;
        }
    }
    .danform {
        margin: 0;
    }
</style>  
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                MessageClassID: '',//上面页面传过来的修改参数
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                save: {
                    MessageClassID: "",
                    MerchantID: "",
                    Code: "",
                    Name: "",
                    KeyWords: "",
                    Status: 0,
                    Creater: "",
                    CreateTime: "",
                    Editor: "",
                    EditTime: "",
                    Note: ""
                },
            }
        },
        methods: {
            //保存新增快递及修改快递
            queryMsg: function () {
                var self = this;
               // this.choiceParams();
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageClass/QueryMessageClassById',
                    data: {
                        id: self.MessageClassID
                    }
                }).then(function(result) {
                    if(result.ResultCode == 1) {
                        self.save = result.Data;
                    }
                })
            },
            //保存新增快递及修改快递
            saveDelivery: function () {
                var self = this;
                if(self.save.Code.length>16 || self.save.Name.length>16) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-16个字符！'
                    })
                    return
                }
                if(self.save.KeyWords.length>125) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-225个字符！'
                    })
                    return
                }
                if(self.save.Note.length>125) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入1-225个字符！'

                    })
                    return
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageClass/SaveMessageClass',
                    data: self.save
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
//             //获取下拉列表基础数据
//             getBaseLookUp: function () {
//                 var baseLookUp = this.baseLookUp;
//                 servers.getBaseData('BasDeliveryList',false,function (val) {
//                     baseLookUp.deliveryList = val;
//                 })
//             },
//             //选择所属快递时,获取对应的编码
//             deliverySelectChange: function (isChoiceDelivery) {
//                 this.DeliveryID = this.delivery.DeliveryID;
//                 this.isChoiceDelivery = isChoiceDelivery;
//                 var self = this;
//                 var deliveryList = self.baseLookUp.deliveryList;
//                 var DeliveryID = self.delivery.DeliveryID;
//                 deliveryList.forEach(function (item) {
//                     if (item.DeliveryID == DeliveryID) {
//                         if (isChoiceDelivery) {
//                             self.delivery.Code = item.Code;
//                         }
// //                        console.log(item.Params.replace(/\\/g,''));
//                         self.deliveryParams = JSON.parse(item.Params.replace(/\\/g,''));
//                     }
//                 })
//             },
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
        route:{
            data:function(transition){
                var self = this;
                var MessageClassID = transition.to.query.MessageClassID;
                self.MessageClassID = MessageClassID;
                console.info(self.MessageClassID);
                this.queryMsg()
            }
        },
        ready: function () {
            //this.queryMsg()
            //this.getBaseLookUp();
        },
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue'),
            modal: require('../../../components/modal.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.form-group  {
    margin: 20px 0;
}
</style>
