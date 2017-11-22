<template>
    <div class="container-fluid">
        <div class="row">
            <div class="operate-form-title">
                <p>{{pageInfo.title}}</p>
            </div>
            <div class="col-sm-12">
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">推荐等级<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.IntroducerGradeID">
                            <option value="">请选择</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">被推荐等级<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.CustomerGradeID">
                            <option value="">请选择</option>
                            <option v-for="opt in CustomerGradeList " value="{{opt.CustomerGradeID}}">{{opt.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">设置类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.ConfigType">
                            <option value="null">请选择</option>
                            <option v-for="opt in PointConfigType " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">操作类型<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="list.OperType">
                            <option value="null">请选择</option>
                            <option v-for="opt in ConfigType " value="{{opt.Code}}">{{opt.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">开始范围<span class="form-required-mark">*</span></label>
                        <input v-model="list.BeginValue" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">结束范围<span class="form-required-mark">*</span></label>
                        <input v-model="list.EndValue" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">价格/折扣<span class="form-required-mark">*</span></label>
                        <input v-model="list.Point" type="text" class="form-control" placeholder="折扣时，请填写%格式">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="list.Note" class="form-control" rows="3"></textarea>
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


                    <!--<div class="form-group form-limit-width">-->
                    <!--<status-checkbox :status.sync="query.Status">启用</status-checkbox>-->
                    <!--</div>-->
                    <div class="operate-form-buttons">
                        <a v-if="pageInfo.isButton" @click="save" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a class="btn btn-default" v-link="{name: 'rebates-set-up-list'}">返回列表&gt;&gt;</a>
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
                    isEdit: false,
                    isButton: false
                },
                list: {
                    IntroducerGradeID: '', //	推荐人等级ID	string
                    CustomerGradeID: '', //	被推荐人等级ID	string
                    ConfigType: 'null', //设置类型
                    OperType: 'null', //操作类型
//                    Status: '', //	状态	number
                    BeginValue: '', //开始范围
                    EndValue: '', //结束范围
                    Point: '', //折扣/金额
                    Note: ''
                },
                Type: '', //判断是新增还是修改状态
                ID: '',
                CustomerGradeList: [],
                PointConfigType: [], //设置类型
                ConfigType: [] //操作类型
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
            //获取操作类型下拉列表
            getOperType() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetDistributorIntroducerPointOperType'
                }).then(function (result) {
                    if(result.ResultCode == 1) {
                        self.ConfigType = result.Data;
                    }
                })
            },
            // 获取育成配置信息（查看或修改）
            getPointConfigList(id) {
                var self = this;
                servers.postAjax.bind(this)({
                    url: '/BasDistributorIntroducerPointConfig/ErpQueryBasDistributorIntroducerPointConfigByID',
                    data: {
                        DistributorIntroducerPointConfigID: id
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        var date = result.Data;
                        var list = self.list;
                        list.IntroducerGradeID = date.IntroducerGradeID;
                        list.CustomerGradeID = date.CustomerGradeID;
                        list.ConfigType = date.ConfigType;
                        list.OperType = date.OperType;
                        list.Status = date.Status;
                        list.BeginValue = date.BeginValue;
                        list.EndValue = date.EndValue; //结束范围
                        list.Point = date.Point; //折扣/金额
                        list.Note = date.Note;
                        list.DistributorIntroducerPointConfigID = date.DistributorIntroducerPointConfigID
                        console.log(list);
                    }
                });
            },
            //保存新增育成配置
            save: function () {
                var self = this;

                if (self.list.IntroducerGradeID.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择推荐等级'
                    });
                    return;
                }
                else if (self.list.CustomerGradeID.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请选择被推荐等级'
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
                        contentText: '请填写开始范围'
                    });
                    return;
                }
                else if (self.list.EndValue.length == 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请填写结束范围'
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
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDistributorIntroducerPointConfig/ErpSaveBasDistributorIntroducerPointConfig',
                    data: self.list,
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '成功保存'
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
                        ConfigType: '', //设置类型
                        OperType: '',//操作类型
//                    Status: '', //	状态	number
                        BeginValue: '', //开始范围
                        EndValue: '', //结束范围
                        Point: '', //折扣/金额
                        Note: ''
                    }
                }
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        },

        route: {
            data: function (transition) {
                console.log(transition);
                var self = this;
                var name = transition.to.name;
                var query = self.Type = transition.to.query;
                if ( query.id ) {
                if (name == 'rebates-set-up-edit') {
                    self.pageInfo.title = '修改育成设置';
                    self.pageInfo.isButton = true;
                    self.pageInfo.isEdit = true;
//                    self.getPointConfigList(query.id);
                }
                else if (name == 'rebates-set-up-see') {
                    self.pageInfo.title = '查看育成设置';
                    self.pageInfo.isEdit = false;
//                    self.getPointConfigList(query.id);
                }
                    self.getPointConfigList(query.id);
                } else {
                    if (name == 'rebates-set-up-edit' || name == 'rebates-set-up-see') {
                        transition.abort();
                    }
                    else {
                        self.pageInfo.isButton = true;
                        self.pageInfo.isEdit = false;
                        self.pageInfo.title = '新建育成设置';
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
            this.getOperType();
        },
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>