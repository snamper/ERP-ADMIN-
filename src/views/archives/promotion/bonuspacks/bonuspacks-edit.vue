<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.text}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">店铺<span class="form-required-mark">*</span></label>
                        <select v-model="payPresent.ShopID" class="form-control">
                            <option value="">请选择</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">活动名<span class="form-required-mark">*</span></label>
                        <input v-model="payPresent.Name" class="form-control" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">活动时间<span class="form-required-mark">*</span></label>
                        <div class="date-wrap" style="margin-left: 24px">
                            <div class='input-group date' id='active-timepicker-start'>
                                <input v-model="payPresent.BeginTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='active-timepicker-end'>
                                <input v-model="payPresent.EndTime" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">价格范围</label>
                        <input v-model="payPresent.BeginPay" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="payPresent.EndPay" type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">操作类型<span class="form-required-mark">*</span></label>
                        <select v-model="payPresent.OperType" class="form-control">
                            <option value="">不限</option>
                            <option v-for="payPresentOperType in baseLookUp.payPresentOperType" value="{{payPresentOperType.Code}}">{{payPresentOperType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">金额数量<span class="form-required-mark">*</span></label>
                        <select v-model="payPresent.PayFlag" class="form-control">
                            <option value="">请选择</option>
                            <option value="{{payPresentPayFlag.Code}}" v-for="payPresentPayFlag in baseLookUp.payPresentPayFlag">{{payPresentPayFlag.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">会员等级</label>
                        <select v-model="payPresent.MemberGradeID" class="form-control">
                            <option value="">请选择</option>
                            <option value="{{memberGradeList.MemberGradeID}}" v-for="memberGradeList in baseLookUp.memberGradeList">{{memberGradeList.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">最大赠送数</label>
                        <input v-model="payPresent.MaxQty" class="form-control" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">最低购买订单</label>
                        <input v-model="payPresent.BeginOrder" class="form-control" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">最高购买订单</label>
                        <input v-model="payPresent.EndOrder" class="form-control" />
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">多买多送</label>
                        <select v-model="payPresent.IsMultiPresent" class="form-control">
                            <option value="">请选择</option>
                            <option value="{{payPresentIsMulti.Code}}" v-for="payPresentIsMulti in baseLookUp.payPresentIsMulti">{{payPresentIsMulti.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="payPresent.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">指定购买</label>
                        <div class="form-group-list">
                            <sheet-list :sheet-list.sync="payPresent.PayPresentPaySku" type="PayPresentPaySku"></sheet-list>
                        </div>
                    </div>
                    <div class="form-group form-group_table">
                        <label class="form-group-text">赠品清单</label>
                        <div class="form-group-list">
                            <sheet-list :sheet-list.sync="payPresent.PayPresentSku" type="PayPresentSku"></sheet-list>
                        </div>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input v-model="payPresent.Status" type="checkbox" :true-value=1 :false-value=0 >
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a @click="savePayPresent" href="javascript:void(0)" class="btn btn-default">保存</a>
                        <a v-link="{name: 'bonuspacks'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    text: '',
                    isEdit: false
                },
                baseLookUp: {
                    shopLists: [],  //店铺
                    payPresentOperType: [], //操作类型
                    payPresentIsMulti: [], //多买多送
                    payPresentPayFlag: [], //金额数量
                    memberGradeList: [] //会员等级

                },
                payPresent: {
                    BeginOrder: '', //最低购买订单
                    BeginPay: '', //价格开始
                    BeginTime: '', //活动开始
                    EndOrder: '', //最高购买订单
                    EndPay: '', //价格结束
                    EndTime: '', //活动结束
                    IsMultiPresent: 1, //多买多送
                    MaxQty: '', //最大赠送数
                    MemberGradeID: '', //会员等级
                    Name: '', //活动名
                    Note: '', //备注
                    OperType: '', //操作类型
                    PayFlag: '', //金额数量
                    PayPresentID: '', //买满送活动ID
                    ShopID: '', //店铺
                    Status: 1, //状态
                    PayPresentPaySku: [], //购买商品信息
                    PayPresentSku: []  //赠品信息
                }
            }
        },
        methods: {
            //获取买满送活动
            getPayPresent: function () {
                var self = this;
                var payPresent = self.payPresent;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusPayPresent/ErpQueryBusPayPresentById',
                    data: {
                        PayPresentID : payPresent.PayPresentID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var payPresent = result.Data;
                        payPresent.BeginTime  = self.formateDate(payPresent.BeginTime);
                        payPresent.EndTime = self.formateDate(payPresent.EndTime);
                        var payPresentPaySku = payPresent.PayPresentPaySku || [];
                        var payPresentSku = payPresent.PayPresentSku || [];
                        if (payPresentPaySku.length > 0) {
                            payPresentPaySku.forEach(function (payPresentPaySkuItem) {
                                payPresentPaySkuItem.isSaved = true;
                            })
                        }
                        if (payPresentSku.length > 0) {
                            payPresentSku.forEach(function (payPresentSkuItem) {
                                payPresentSkuItem.isSaved = true;
                            })
                        }
                        payPresent.PayPresentPaySku = payPresentPaySku;
                        payPresent.PayPresentSku = payPresentSku;
                        self.payPresent = payPresent;
                    }
                })
            },
            //保存买满送活动
            savePayPresent: function () {
                var self = this;
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '保存',
                    events: {
                        confirm: 'saveMerchant'
                    }
                });
                self.$off('saveMerchant');

                self.$once('saveMerchant', function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BusPayPresent/ErpSaveBusPayPresent',
                        data: self.payPresent
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '成功:',
                                contentText: '保存商品组合成功'
                            });
                            self.resetForm();
                        }
                    });
                });
            },
            //重置表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.payPresent = {
                        BeginOrder: '', //最低购买订单
                        BeginPay: '', //价格开始
                        BeginTime: '', //活动开始
                        EndOrder: '', //最高购买订单
                        EndPay: '', //价格结束
                        EndTime: '', //活动结束
                        IsMultiPresent: 1, //多买多送
                        MaxQty: '', //最大赠送数
                        MemberGradeID: '', //会员等级
                        Name: '', //活动名
                        Note: '', //备注
                        OperType: '', //操作类型
                        PayFlag: '', //金额数量
                        PayPresentID: '', //买满送活动ID
                        ShopID: '', //店铺
                        Status: 1, //状态
                        PayPresentPaySku: [], //购买商品信息
                        PayPresentSku: []
                    }
                }
            },
            formateDate: function (val) {
                var date = new Date(val);
                var year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate(),
                        hours = date.getHours(),
                        minutes = date.getMinutes(),
                        seconds = date.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            },
            //获取基础数据
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取店铺
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取操作类型
                servers.getBaseData('BusPayPresentOperType',false,function (val) {
                    baseLookUp.payPresentOperType = val;
                });
                //获取多买多送下拉
                servers.getBaseData('BusPayPresentIsMulti',false,function (val) {
                    baseLookUp.payPresentIsMulti = val;
                });
                //获取金额数量下拉
                servers.getBaseData('BusPayPresentPayFlag',false,function (val) {
                    baseLookUp.payPresentPayFlag = val;
                });
                //会员等级
                servers.getBaseData('BusMemberGradeList',false,function (val) {
                    baseLookUp.memberGradeList = val;
                });
            }
        },
        route: {
            data: function (transition) {
                var name = transition.to.name;
                this.getBaseData();
                if (name == 'bonuspacks-edit') {
                    this.pageInfo.text = '修改买满送活动';
                    this.pageInfo.isEdit = true;
                    var payPresentID = transition.to.query.PayPresentID;
                    if (payPresentID) {
                        this.payPresent.PayPresentID = payPresentID;
                        this.getPayPresent();
                    } else {
                        transition.abort();
                    }
                } else {
                    this.pageInfo.text = '新增买满送活动';
                    this.pageInfo.isEdit = false;
                    this.resetForm();
                }
                transition.next();
            }
        },
        components: {
            sheetList: require('./components/sheet-list.vue')
        },
        ready: function () {
            //dateTimePicker
            require('../../../../css/bootstrap-datetimepicker.css');
            require('../../../../js/plugins/bootstrap-datetimepicker');
            $('#active-timepicker-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#active-timepicker-end').datetimepicker('setStartDate',e.date);
            });
            $('#active-timepicker-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#active-timepicker-start').datetimepicker('setEndDate',e.date);
            });
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>