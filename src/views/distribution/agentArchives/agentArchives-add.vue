<template lang="html">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">真实姓名<span class="form-required-mark">*</span></label>
                        <input v-model="agent.Name" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">微信号<span class="form-required-mark">*</span></label>
                        <input v-model="agent.CustomerDetail.Wechat" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">手机<span class="form-required-mark">*</span></label>
                        <input v-model="agent.CustomerDetail.Mobile" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">上级代理</label>
                        <select v-model="agent.ParentID" class="form-control" @change="clearGrade">
                            <option value="">不限</option>
                            <option v-for="parent in parentAgent" value="{{parent.CustomerID}}" >{{parent.Code}}({{parent.Name}}，{{parent.CustomerGradeName}})</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">代理等级<span class="form-required-mark">*</span></label>
                        <select v-model="agent.CustomerGradeID" class="form-control">
                            <option v-for="grade in currentGradeList" value="{{grade.CustomerGradeID}}" >{{grade.Name}}</option>
                        </select>
                    </div>
                    <!--<div class="form-group form-limit-width">-->
                        <!--<label class="form-group-text">代理商账户<span class="form-required-mark">*</span></label>-->
                        <!--<select v-model="agent.AccountID" class="form-control">-->
                            <!--<option v-for="account in accountList" value="{{account.AccountID}}" >{{account.Name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group form-limit-width">
                        <label class="form-group-text margin">时间范围<span class="form-required-mark">*</span></label>
                        <date-picker :start-date.sync="agent.CustomerDetail.BeingDate" :end-date.sync="agent.CustomerDetail.EndDate"></date-picker>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">身份证号<span class="form-required-mark">*</span></label>
                        <input v-model="agent.CustomerDetail.CertNo" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">代理地区<span class="form-required-mark">*</span></label>
                        <select-area v-if="isDataReady || !pageInfo.isEdit" :state-id.sync="agent.CustomerDetail.State" :city-id.sync="agent.CustomerDetail.City" :district-id.sync="agent.CustomerDetail.District"></select-area>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">详细地址<span class="form-required-mark">*</span></label>
                        <input v-model="agent.CustomerDetail.Address" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">推荐人</label>
                        <select v-model="agent.IntroducerID" class="form-control">
                            <option v-for="parent in parentAgent" value="{{parent.CustomerID}}" >{{parent.Code}}（{{parent.Name}}，{{parent.CustomerGradeName}})</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="agent.CustomerDetail.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <!--<div class="checkbox-group">-->
                        <!--<div class="checkbox">-->
                        <!--<label>-->
                        <!--<input type="checkbox" :true-value="1" :false-value="0" v-model="query.Status">-->
                        <!--启用-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveAgent">保存</a>
                        <a v-link="{name: 'agentArchives'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/script">
    var servers = require('../../../js/servers/servers.js');
    var NProgress = servers.NProgress;
    module.exports = {
        name:'dsdsd',
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                isDataReady: false,
                agent: {
                    //AccountID: '', // 代理商账户
                    CustomerGradeID: '', // 代理等级ID
                    CustomerID: '', //
                    Name: '', // 真实姓名
                    ParentID: '', // 上级代理CustomerID
                    IntroducerID: '',
//                    BegEditTime: new Date(), //开始时间
//                    EndEditTime: new Date(), //结束时间
                    CustomerDetail: {
                        BeingDate: '',
                        EndDate: '',
                        Address: '',
                        State: '', // 省
                        City: '', // 市
                        District: '', // 区
                        Mobile: '', // 手机
                        CertNo: '', // 身份证号
                        Note: '', // 备注
                        Wechat: '', // 微信
                        CustomerID: ''
                    }
                },
                // 上级代理
                parentAgent: [],
                // 代理商等级列表
                gradeList: [],
                // 代理账户
                accountList: []

            }
        },
        methods: {
            //保存更改
            saveAgent: function () {
                var self = this;
                var agent = this.agent;
                if (!agent.Name) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写真实姓名!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.Wechat) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写微信号!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.Mobile) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写手机号!'
                    });
                    return ;
                } else if (!(/^1[0-9]{10}$/.test(agent.CustomerDetail.Mobile))){
                    self.$dispatch('transmit','tip',{
                        contentText: '手机号格式不正确!'
                    });
                    return ;
                }
                if (!agent.CustomerGradeID) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请选择代理等级!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.BeingDate) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请选择时间!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.CertNo) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写身份证号码!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.State) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请选择代理地区!'
                    });
                    return ;
                }
                if (!agent.CustomerDetail.Address) {
                    self.$dispatch('transmit','tip',{
                        contentText: '请填写详细地址!'
                    });
                    return ;
                }

                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributor/ErpSaveDistributor',
                    data: self.agent
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.getParentAgents();
                        if (self.pageInfo.isEdit) {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '修改成功!'
                            });
                        } else {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: result.ErrorMessage
                            });
                        }

                        self.resetForm()
                    }
                });
            },
            // 获取上级代理
            getParentAgents: function () {
                var self = this;
                servers.postAjax({
                    url: '/BasDistributor/ErpGetDistributorById',
                    data: {
                        CustomerID: this.agent.CustomerID
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        const defaultCode = []
                        const list = []
                        result.Data.forEach((item) => {
                            if (item.Code.length === 1) {
                                defaultCode.push(item)
                            }
                            else {
                                list.push(item)
                            }
                        })
                        list.sort((a, b) => {
                            return parseInt(a.Code.substring(3)) - parseInt(b.Code.substring(3))
                        })
                        list.unshift(...defaultCode)
                        self.parentAgent = list
                    }
                })
            },
            // 根据ID查询
            getAgentById: function () {
                var self = this;
                NProgress.start();
                self.isDataReady = false;
                servers.postAjax.bind(this)({
                    url: '/BasCustomer/GetCustomerDetail',
                    data: {
                        CustomerID: this.agent.CustomerID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        if (result.Data.length > 0) {
                            self.agent = result.Data[0];
                            $('.data_picker').val(`${self.agent.CustomerDetail.BeingDate.split('T')[0]} 至 ${self.agent.CustomerDetail.EndDate.split('T')[0]}`);
                        }
                    }
                    self.isDataReady = true;
                }).fail(function (err) {
                    self.isDataReady = false;
                })
            },
            // 代理商等级列表
            getGradeList: function () {
                var self = this;
                servers.getBaseData('BasCustomerGradeList',false, function (val) {
                    self.gradeList = val;
                });
            },
            // 代理账户列表
            getAccountList: function () {
                var self = this;
                servers.getBaseData('BasAccounts',false, function (val) {
                    self.accountList = val;
                })
            },
            // 上级代理变动,清空等级
            clearGrade: function () {
                debugger
                this.agent.CustomerGradeID = '';
            },
            //清空表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return '';
                } else {
                    $('.data_picker').val('');
                    this.agent = {
                        //AccountID: '', // 代理商账户
                        CustomerGradeID: '', // 代理等级ID
                        CustomerID: '', //
                        Name: '', // 真实姓名
                        ParentID: '', // 上级代理CustomerID
                        IntroducerID: '',
                        CustomerDetail: {
                            Address: '',
                            State: '', // 省
                            City: '', // 市
                            District: '', // 区
                            Mobile: '', // 手机
                            CertNo: '', // 身份证号
                            Note: '', // 备注
                            Wechat: '', // 微信
                            BeingDate: '',
                            EndDate: '',
                        }
                    };
                    this.$broadcast('resetArea');
                }
            }
        },
        computed: {
            // 筛选代理等级
            currentGradeList: {
                get: function () {
                    var ParentID = this.agent.ParentID;
                    if (ParentID) {
                        var parent = this.parentAgent.filter(function (item) {
                            return item.CustomerID === ParentID;
                        });
                        if (parent.length > 0) {
                            return this.gradeList.filter(function (item) {
                                return item.Power >= parent[0].Power;
                            })
                        } else {
                            return [];
                        }

                    } else {
                        return this.gradeList
                    }
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'agentArchivesEdit') {
                    self.pageInfo.title = '修改代理商档案';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if ( query.CustomerID ) {
                        self.agent.CustomerID = query.CustomerID;
                        self.getAgentById();
                        transition.next();
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.title = '新建代理商档案';
                    self.pageInfo.isEdit = false;
                    self.resetForm();
                    transition.next();
                }
            }
        },
        ready: function () {
            //获取所有上级代理
            this.getParentAgents();
            // 获取代理等级
            this.getGradeList();
            // 获取账户列表
//            this.getAccountList();
        },
        components: {
            selectArea: require('../../../components/select-area.vue'),
            datePicker: require('../../../components/date_picker.vue'),
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
 .container-fluid {
     .margin {
         margin-right: 22px;
     }
 }
</style>