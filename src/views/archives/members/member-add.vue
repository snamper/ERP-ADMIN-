<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">编码</label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">英文名</label>
                        <input v-model="query.EName" type="text" class="form-control">
                    </div>
                    <!--<div class="form-group form-limit-width">-->
                    <!--<label class="form-group-text">平台编码</label>-->
                    <!--<input v-model="" type="text" class="form-control">-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">昵称</label>
                        <input v-model="query.Nick" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">性别<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.Sex">
                            <option value="">请选择</option>
                            <option v-for="opt in SexList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">证件类型</label>
                        <select class="form-control" v-model="query.CertType">
                            <option value="">请选择</option>
                            <option v-for="opt in CertTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">证件号</label>
                        <input v-model="query.CertNo" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">出生日期</label>
                        <input v-model="query.Birthday" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">会员种类<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="query.CustomerType">
                            <option value="">请选择</option>
                            <option v-for="opt in MemberCustomerTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">会员等级</label>
                        <select class="form-control" v-model="query.MemberGradeID">
                            <option value="">请选择</option>
                            <option v-for="opt in MemberGradeList " value="{{opt.MemberGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">店铺来源</label>
                        <select class="form-control" v-model="query.ShopID">
                            <option value="">请选择</option>
                            <option v-for="opt in ShopList " value="{{opt.ShopID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">办公电话</label>
                        <input v-model="query.LinkTel" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">手机<span class="form-required-mark">*</span></label>
                        <input v-model="query.Mobile" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">Email</label>
                        <input v-model="query.Email" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">传真</label>
                        <input v-model="query.Fax" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">所在区域</label>
                        <select-area :state-id.sync="customerOrder.StateID" :city-id.sync="customerOrder.CityID"
                                     :district-id.sync="customerOrder.DistrictID" :state.sync="customerOrder.State"
                                     :city.sync="customerOrder.City"
                                     :district.sync="customerOrder.District"></select-area>
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                    <!--<label>所在区域</label>-->
                    <!--<select-area :state-id.sync="customerOrder.StateID" :city-id.sync="customerOrder.CityID" :district-id.sync="customerOrder.DistrictID" :state.sync="customerOrder.State" :city.sync="customerOrder.City" :district.sync="customerOrder.District"></select-area>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">详细地址</label>
                        <textarea v-model="query.Address | nullToString" class="form-control form_text"
                                  rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value=1 :false-value=0 v-model="query.Status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="save">保存</a>
                        <a v-link="{name:'member'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                query: {
                    Code: '',
                    Name: '',
                    EName: '',
                    Nick: '',
                    Sex: '',
                    CertType: '',
                    CertNo: '',
                    Birthday: '',
                    CustomerType: '',
                    MemberGradeID: '',
                    ShopID: '',
                    LinkTel: '',
                    Mobile: '',
                    Email: '',
                    Fax: '',
                    State: '',
                    City: '',
                    District: '',
                    Address: '',
                    Status: '1',
                    Note: ''
                },
                SexList: [],
                CertTypeList: [],
                MemberCustomerTypeList: [],
                MemberGradeList: [],
                ShopList: [],
            }
        },
        methods: {
            //重置列表
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                } else {
                    this.query = {
                        Code: '',
                        Name: '',
                        EName: '',
                        Nick: '',
                        Sex: '',
                        CertType: '',
                        CertNo: '',
                        Birthday: '',
                        CustomerType: '',
                        MemberGradeID: '',
                        ShopID: '',
                        LinkTel: '',
                        Mobile: '',
                        Email: '',
                        Fax: '',
                        State: '',
                        City: '',
                        District: '',
                        Address: '',
                        Status: '1',
                        Note: '',
                        MemberID: ''
                    };
                }
            },

            //性别列表
            getSexList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetSexList',
                }).done(function (result) {
                    self.SexList = result.Data;
//                    console.log();
                })
            },
            //证件类型
            getCertTypeList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetCertTypeList',
                }).done(function (result) {
                    self.CertTypeList = result.Data;
                })
            },
            //获取会员种类
            getMemberCustomerTypeList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetMemberCustomerTypeList',
                }).done(function (result) {
                        self.MemberCustomerTypeList = result.Data;
                })
            },
            //获取会员等级
            getMemberGradeList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetBasMemberGradeList',
                }).done(function (result) {
                    self.MemberGradeList = result.Data;
                })
            },
            //获取店铺列表
            getShopList: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetShopList',
                }).done(function (result) {
                    self.ShopList = result.Data;
                })
            },
            //获取会员信息
            getMemberByID: function () {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasMember/ErpGetBasMemberById',
                    data: {
                        MemberID: self.query.MemberID
                    }
                }).done(function (result) {
                    //var query = result.Data;
//                    console.log(query)
                    if (result.ResultCode == 1) {
                        self.query = result.Data;

                        //querys = query;
//                        querys.Name = query.Name,
//                        querys.EName = query.EName,
//                        querys.Nick = query.Nick,
//                        querys.Sex = query.Sex,
//                        querys.CertType = query.CertType,
//                        querys.CertNo = query.CertNo,
//                        querys.Birthday = query.Birthday,
//                        querys.CustomerType = query.CustomerType,
//                        querys.MemberGradeID = query.MemberGradeID,
//                        querys.ShopID = query.ShopID,
//                        querys.LinkTel = query.LinkTel,
//                        querys.Mobile = query.Mobile,
//                        querys.Email = query.Email,
//                        querys.Fax = query.Fax,
//                        querys.State = query.State,
//                        querys.City = query.City,
//                        querys.District = query.District,
//                        querys.Address = query.Address,
//                        querys.Status = query.Status,
//                        querys.Note = query.Note,
//                        querys.MemberID = query.MemberID

//                        self.query.GoodsID = query.GoodsID,
////                                console.log(query.GoodsID),
//                                self.query.ContractCost = query.ContractCost,
//                                self.query.Cost = query.Cost,
//                                self.query.CostTaxRate = query.CostTaxRate,
////                        self.query.GoodsID = query.GoodsID,
//                                self.query.Note = query.Note,
//                                self.query.ShopID = query.ShopID,
//                                self.query.Status = query.Status,
//                                self.query.VenderID  = query.VenderID,
//                                self.query.CostID = query.CostID,
//                                self.query.EditTime = query.EditTime,
//                                self.query.Editor = query.Editor,
//                                self.query.CreateTime = query.CreateTime,
//                                self.query.Creater = query.Creater
                    }
                })
            },

//            getMemberByID: function () {
//                var self = this;
//                servers.postAjax.bind(this)({
//                    url: '/BasMember/ErpGetBasMemberById',
//                    data: {
//                        MemberID: self.query.MemberID
//                    }
//                }).done(function (result) {
//                    var query = result.Data[0];
//                    console.log(query)
//                    if (result.ResultCode == 1) {
//                        self.query.Code = quert.Code;
//                    }
//                })
//            },



            //保存
            save: function () {
                var self = this;
//                self.$dispatch('transmit', 'tip', {
//                    name: '提示:',
//                    contentText: '确定要保存吗？',
//                    events: {
//                        confirm: 'save'
//                    }
//                });
                if(self.query.Name =='' || self.query.Mobile==''){
                    self.$dispatch('transmit', 'tip', {
                            name:'提示',
                            contentText: '请填入必填项'
                        });
                    return 
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMember/ErpSaveBasMember',
                    data: self.query
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.resetForm();
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '成功保存'
                        });

                    }
                });
            },
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'member-edit') {
                    self.pageInfo.title = '修改会员';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    var MemberID = this.query.MemberID = transition.to.query.MemberID;   //获取价格ID
//                    console.log( transition.to.query);
                    if (MemberID) {
                        this.getMemberByID();
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建会员';
                    self.resetForm();
                }
            }
        },
        components: {
            selectArea: require('../../../components/select-area.vue'),
        },
        ready: function () {
            this.getSexList();
            this.getCertTypeList();
            this.getMemberCustomerTypeList();
            this.getMemberGradeList();
            this.getShopList();
        },
    };
</script>

<style rel="stylesheet/less" lang="less">
    .row {
        .form_text {
            margin-bottom: 15px;
        }
    }

</style>