<template>
    <div class="query-form ">
        <div id="query-detail" class="query-detail form-inline collapse in query-detail trade-manage-width">

            <div class="row trade-edit-margin">
                <div class="col-lg-12">

                    <div class="operate-form-list">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                            <label class="form-group-text">系统套餐</label>
                            <select class="form-control" v-model="systemCombo" @change="selectSystemCombo">
                                <option v-for="comboList in comboShow" :value="comboList">{{comboList.Name}}</option>
                            </select>
                        </div>

                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">套餐名称 <span class="form-required-mark">*</span></label>
                            <input v-model="combo.Name" type="text" class="form-control">
                        </div>



                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">操作员数量 <span class="form-required-mark">*</span></label>
                            <input v-model="combo.LoginQty" type="text" class="form-control">
                        </div>


                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">店铺数量 <span class="form-required-mark">*</span></label>
                            <input v-model="combo.ShopQty" type="text" class="form-control">
                        </div>


                        <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                            <status-checkbox :status.sync="combo.Status">
                        </div> -->
                        <div class="operate-form-buttons col-lg-12 col-md-12 col-sm-12 saveBtn comboSaveBtn">
                            <a href="javascript:void(0)" class="btn btn-default" @click="saveCombo">保存</a>
                            <a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div>{{systemCombo.LoginQty}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                comboLists: [],
                comboShow:[],
                ConstantModelas: [],
                isDataReady: false,
                systemCombo: {},
                combo: {
                    MerchantID: '',
                    LoginQty: '',
                    Status: '',
                    ShopQty: '',
                    Name: ''
                }
            }
        },

        components: {
            'select-area': require('../../../components/select-area.vue'),
            statusCheckbox: require('../../../components/status-checkbox.vue')
        },
        methods: {
            getAttribute: function() {
                servers.filterList(this);
            },
            selectSystemCombo: function () {
                var combo = this.combo;
                var systemCombo = this.systemCombo;
                combo.Name = systemCombo.Name;
                combo.LoginQty = systemCombo.LoginQty;
                combo.ShopQty = systemCombo.ShopQty;


            },
            getComboName: function () {
                var relf = this;

                servers.getBaseData('SysPriceLevelList',false,function(val){
                    relf.comboShow = val;
                })
            },
            queryComboByID: function () {
                var self = this;
                self.isDataReady =false;
                servers.postAjax({
                    url: '/SysMerchant/ErpQuerySysMerchantPriceLevelByID',
                    data: {
                        MerchantID: self.combo.MerchantID
                    }
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.combo = result.Data;
                    }
                    self.isDataReady = true;
                })
            },

            saveCombo: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpSaveSysMerchantPriceLevel',
                    data: self.combo
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功!'
                        });
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                var MerchantID = transition.to.query.id;
                this.combo.MerchantID = MerchantID;
            }
        },
        ready: function () {
            this.getAttribute();
            this.getComboName();
            this.queryComboByID();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

.comboSaveBtn{
    margin-top:20px;
}
</style>
