<template>
    <div class="container-fluid">
        <div class="row">
            <div class="operate-form-title">
                <p>{{pageInfo.title}}</p>
            </div>
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户等级<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.CustomerGradeID">
                            <option value="">请选择</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">层级<span class="form-required-mark">*</span></label>
                        <input v-model="list.Level" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">业绩类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.ConditionType">
                            <option value="">请选择</option>
                            <option v-for="opt in ConditionTypeList " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">开始业绩<span class="form-required-mark">*</span></label>
                        <input v-model="list.BeginValue" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结束业绩<span class="form-required-mark">*</span></label>
                        <input v-model="list.EndValue" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">设置类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.ConfigType">
                            <option value="">请选择</option>
                            <option v-for="opt in PointConfigType " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">价格/折扣(%)<span class="form-required-mark">*</span></label>
                        <input v-model="list.Point" type="text" class="form-control" placeholder="选择订单金额时，输入价格百分比">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">含本人<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.InCludeSelf">
                            <option value="2">仅本人</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">同等级<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.NeedSameGrade">
                            <option value="">不限</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="list.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                        <div class="checkbox">
                        <label>
                        <input type="checkbox" :true-value="1" :false-value="0" v-model="list.Status">
                        启用
                        </label>
                        </div>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                    <!--<status-checkbox :status.sync="list.Status">启用</status-checkbox>-->
                    </div>
                    <div class="operate-form-buttons">
                        <a v-if="pageInfo.isButton" @click="save" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a class="btn btn-default" v-link="{name: 'results-rebates'}">返回列表&gt;&gt;</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false,
                    isButton: false
                },
                list: {

                    CustomerGradeID: '', //	客户等级ID	string
                    ConditionType: '', //业绩类型
                    ConfigType: '', //	设置类型	number
                    Level: 0,// 层级
                    DistributorAmountPointConfigID: '', //	ID	string	新增为null，否则不为null
                    BeginValue: '', //	开始业绩	number
                    EndValue: '', //	结束业绩	number
                    Point: '', //	折扣	number
                    InCludeSelf: '', //	包含本人	number
                    NeedSameGrade: '', //	同等级	number
                    Note: '',
                    Status: '', //	状态	number



////                    IntroducerGradeID: '', //	推荐人等级ID	string
//                    CustomerGradeID: '', //	被推荐人等级ID	string
//                    ConfigType: 'null', //设置类型
////                    OperType: 'null', //操作类型
////                    Status: '', //	状态	number
//                    BeginValue: '', //开始范围
//                    EndValue: '', //结束范围
//                    Point: '', //折扣/金额
//                    Oneself: '', //是否含本人 0否  1是
//                    Equality: '', //是否同等级  0否 1是
//                    Note: ''
                },
                Type: '', //判断是新增还是修改状态
                ID: '',
                CustomerGradeList: [],
                PointConfigType: [], //设置类型
                ConditionTypeList:[], //业绩类型
//                ConfigType: [] //操作类型
            }
        },
        methods: {
            // 获取客户等级列表
            customerGradeList() {
                var self = this
                servers.getAjax({
                    url: '/BaseLookup/GetBasCustomerGradeList'
                }).done(function (result) {
                    self.CustomerGradeList = result.Data;
                })
            },
            //获取设置类型下拉列表 BaseLookup/GetDistributorIntroducerPointConfigType
            getPointConfigType() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorIntroducerPointConfigType'
                }).then(function (result) {
                    if (result.ResultCode == 1) {
                        self.PointConfigType = result.Data;
                    }
                })
            },
//            //获取操作类型下拉列表
//            getOperType() {
//                var self = this;
//                servers.getAjax.bind(this)({
//                    url: '/BaseLookup/GetDistributorIntroducerPointOperType'
//                }).then(function (result) {
//                    if(result.ResultCode == 1) {
//                        self.ConfigType = result.Data;
//                    }
//                })
//            },
            //保存新增育成配置
            save: function () {
                var self = this;
                if (self.list.CustomerGradeID.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择客户等级'
                    });
                    return;
                }
                else if (self.list.ConfigType.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择设置类型'
                    });
                    return;
                }
                else if (self.list.BeginValue.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填写开始业绩'
                    });
                    return;
                }
                else if (self.list.EndValue.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填写结束业绩'
                    });
                    return;
                }
                else if (self.list.Point.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填写折扣/金额'
                    });
                    return;
                }
//                InCludeSelf: '', //	包含本人	number
//                        NeedSameGrade: '', //	同等级	number
                else if (self.list.InCludeSelf.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填选择是否含本人'
                    });
                    return;
                }
                else if (self.list.NeedSameGrade.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填选择是否同等级'
                    });
                    return;
                }
                NProgress.start();
//                if (self.Type) {
//
//                }
                servers.postAjax.bind(this)({
                    url: '/BasDistributorAmountPointConfig/ErpSaveBasDistributorAmountPointConfig',
                    data: self.list,
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '提交成功'
                        });
                        if (!self.pageInfo.isEdit) {
                            self.resetForm();
//                            self.$route.router.go({name: 'rebates-set-up-list'});
                        }
                    }
                });
            },
            //清空数据表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return;
                }
                else {
                    this.list = {
                        IntroducerGradeID: '', //	推荐人等级ID	string
                        CustomerGradeID: '', //	被推荐人等级ID	string
                        ConditionType: '', //业绩类型
                        ConfigType: '', //设置类型
                        OperType: '',//操作类型
//                    Status: '', //	状态	number
                        BeginValue: '', //开始范围
                        EndValue: '', //结束范围
                        Point: '', //折扣/金额
                        Note: ''
                    }
                }
            },
            //获取业绩类型下拉列表
            getConditionTypeList() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorConditionType'
                }).done(function(result) {
                    if (result.ResultCode == 1) {
                        self.ConditionTypeList = result.Data;
                    }
                })
            },
        },
        components: {
            pagination: require('../../components/pagination.vue')
        },

        route: {
            data: function (transition) {
                console.log(transition);
                var self = this;
                var name = transition.to.name;
                var query = self.Type = transition.to.query;
                if ( query.id ) {
                    if (name == 'results-rebates-edit') {
                        self.pageInfo.title = '修改业绩奖励设置';
                        self.pageInfo.isButton = true;
                        self.pageInfo.isEdit = true;
                    }
                    else if (name == 'results-rebates-see') {
                        self.pageInfo.title = '查看育成设置';
                        self.pageInfo.isEdit = false;
//                    self.getPointConfigList(query.id);
                    }
                    self.list.DistributorAmountPointConfigID = query.id;
                    self.list.CustomerGradeID = query.CustomerGradeID;
                    self.list.ConditionType = query.ConditionType;
                    self.list.ConfigType = query.ConfigType;
                    self.list.Level = query.Level,
                    self.list.BeginValue = query.BeginValue;
                    self.list.EndValue = query.EndValue;
                    self.list.Point = query.Point;
                    self.list.InCludeSelf = query.InCludeSelf;
                    self.list.NeedSameGrade = query.NeedSameGrade;
                    self.list.Note = query.Note;
                    self.list.Status = query.Status;
                } else {
                    if (name == 'results-rebates-edit' || name == 'results-rebates-see') {
                        transition.abort();
                    }
                    else {
                        self.pageInfo.isButton = true;
                        self.pageInfo.isEdit = false;
                        self.pageInfo.title = '新建业绩奖励设置';
//                        self.resetForm();
                        transition.next();
                    }
//                    transition.abort();
                };
//                transition.next();
//                console.log(transition);
            }
        },
        ready: function () {
            this.customerGradeList();
            this.getPointConfigType();
            this.getConditionTypeList();
//            this.getOperType();
        },
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>