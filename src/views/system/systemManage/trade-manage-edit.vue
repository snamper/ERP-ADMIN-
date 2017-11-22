<template>
    <div class="query-form ">
        <div id="query-detail" class="query-detail form-inline collapse in query-detail trade-manage-width">

        <div class="row trade-edit-margin">
            <div class="col-lg-12">
               
                <div class="operate-form-list">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">状态</label>
                            <select class="form-control" v-model="tradeEdit.Status">
                                <option v-for="option in ConstantModelas" value="{{option.Code}}">{{option.Text}}</option>
                            </select>
                    </div>
                    
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">公司名称</label>
                        <input v-model="tradeEdit.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">公司简称 <span class="form-required-mark">*</span></label>
                        <input v-model="tradeEdit.ShortName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">商家编号 <span class="form-required-mark">*</span></label>
                        <input v-model="tradeEdit.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label class="form-group-text">所在行业<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="tradeEdit.TradeID">
                        <option v-for="tradeIndustry in tradeIndustrys" value="{{tradeIndustry.TradeID}}">{{tradeIndustry.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label class="form-group-text">合作类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="tradeEdit.CooperationType">
                            <option v-for="jointype in joinType" value="{{jointype.Code}}">{{jointype.Text}}</option>
                        </select>
                    </div>







                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label class="form-group-text">注册时间</label>
                        <div class='input-group date' id='trade-begin-timepicker'>
                            <input v-model="tradeEdit.BeingDate | formatDate" type='text' class="form-control" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">过期时间</label>
                        <div class='input-group date' id='trade-enddate-timepicker'>
                            <input v-model="tradeEdit.EndDate | formatDate" type='text' class="form-control" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>

                   
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label class="form-group-text">联系人</label>
                        <input v-model="tradeEdit.LinkMan" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">办公电话</label>
                        <input v-model="tradeEdit.LinkTel" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">联系手机</label>
                        <input v-model="tradeEdit.Mobile" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">Email</label>
                        <input v-model="tradeEdit.Email" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">传真</label>
                        <input v-model="tradeEdit.Fax" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">商家域名</label>
                        <input v-model="tradeEdit.WebSite" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">微信端域名</label>
                        <input v-model="tradeEdit.SecurityWebSite" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <label class="form-group-text">所在区域</label>
                        <select-area v-if="isDataReady" :state-id.sync="tradeEdit.State" :city-id.sync="tradeEdit.City" :district-id.sync="tradeEdit.District"></select-area>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                    <label class="form-group-text">详细地址</label>
                    <textarea v-model="tradeEdit.Address" class="form-control" rows="3"></textarea>
                    </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                    <label class="form-group-text">备注</label>
                    <textarea v-model="tradeEdit.Note" class="form-control" rows="3"></textarea>
                </div>


                    <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6 ">
                        <status-checkbox :status.sync="tradeEdit.Status">
                    </div> -->
                    <div class="operate-form-buttons col-lg-12 col-md-12 col-sm-12 saveBtn">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveTrade">保存</a>
                        <a v-link="{name:'trade-manage'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <!--<div>{{sku | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                tradeIndustrys: [],
                joinType:[],
                ConstantModelas: [],
                isDataReady: false,
                tradeEdit: {
                    MerchantID: '',
                    Status: '',
                    TradeID: '',
                    Name: '',
                    LinkMan: '',
                    Mobile: '',
                    ShortName: '',
                    LinkTel: '',
                    Email: '',
                    Fax: '',
                    State: '',
                    City: '',
                    District: '',
                    Address: '',
                    Note: '',
                    BeingDate : '',
                    EndDate : ''
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
            getTrade: function () {
                var relf = this;

                servers.getBaseData('TradeList',false,function(val){
                    relf.tradeIndustrys = val;
                })
            },
            getJoinType: function () {
                var relf = this;

                servers.getBaseData('CooperationType',false,function(val){
                    relf.joinType = val;
                })
            },
            querySysMerchantByID: function () {
                var self = this;
                self.isDataReady =false;
                servers.postAjax({
                    url: '/SysMerchant/ErpQuerySysMerchantByID',
                    data: {
                        MerchantID: self.tradeEdit.MerchantID
                    }
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.tradeEdit = result.Data;
                    }
                    self.isDataReady = true;
                })
            },
            getConstantModela: function () {
                var relf = this;

                servers.getBaseData('SysMerchantStatus',false,function(val){
                    relf.ConstantModelas = val;
                })
            },
            saveTrade: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpSaveSysMerchant',
                    data: self.tradeEdit
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '修改成功!'
                        });
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                var query = transition.to.query;
                if (query.id) {

                    this.tradeEdit.MerchantID = query.id;
                    transition.next();
                } else {
                    transition.abort();
                }
            }
        },
        ready: function () {
            this.getAttribute();
            this.getTrade();
            this.getJoinType();
            this.getConstantModela();
            this.querySysMerchantByID();
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#trade-begin-timepicker,#trade-enddate-timepicker').datetimepicker({});
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.trade-manage-width{
    .operate-form-list{
        .form-group-text{
            width:auto;
            .col-md-4{
                min-width:300px;
            }
        }
    }
}
.saveBtn{
    margin-top:20px;
}
.trade-edit-margin{
    .operate-form-list{
        .form-group{
            .form-control{
                margin-left:0;
            }
        }
    }  
}

</style>
