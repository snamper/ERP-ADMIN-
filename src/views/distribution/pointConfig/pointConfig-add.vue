<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width stock-upsheet">
                        <label class="form-group-text">商品货号<span class="form-required-mark">*</span></label>
                        <input v-model="pointConfigs.CustomNo" type="text" class="form-control" placeholder="" required @keyup="getGoodsList" @focus="showGoodsList" @blur="hideGoodsList">
                        <div class="stock-upsheet-wrap" v-show="isShowGoodsList">
                            <ul class="stock-upsheet-list">
                                <li class="stock-upsheet-item" @click.stop="selectGood(good)" v-for="good in  goodsList">
                                    <label>
                                        <input type="radio" name="customNo">
                                        <span>{{good.CustomNo}}</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">参照等级<span class="form-required-mark"></span></label>
                        <select v-model="pointConfigs.OrderCustomerGradeID" class="form-control">
                            <option value="">请选择参照等级</option>
                            <option v-for="grade in orderCustomerGradeList" value="{{grade.CustomerGradeID}}">{{grade.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客户等级<span class="form-required-mark"></span></label>
                        <select v-model="pointConfigs.CustomerGradeID" class="form-control">
                            <option value="">请选择客户等级</option>
                            <option v-for="grade in customerGradeList" value="{{grade.CustomerGradeID}}">{{grade.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">返点类型<span class="form-required-mark">*</span></label>
                        <select v-model="pointConfigs.PriceType" class="form-control" @change="changePriceType">
                            <option v-for="priceType in baseLookUp.priceType" value="{{priceType.code}}">{{priceType.text}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">金额/折扣</label>
                        <input v-model="pointConfigs.Point" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">层级<span class="form-required-mark">*</span></label>
                        <input v-model="pointConfigs.Level" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="pointConfigs.Note" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox" v-if="pageInfo.isEdit">
                                <label>
                                    <input v-model="pointConfigs.Status" type="checkbox" :true-value="1" :false-value="0">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="savePointConfig">保存</a>
                        <a v-link="{name: 'pointConfig'}" class="btn btn-default">返回列表>></a>
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
                pointConfigs: {
                    DistributorPointConfigID: '',
                    CustomerGradeID: '',  // 等级ID（可有可无）
                    OrderCustomerGradeID: '', //参照等级
                    GoodsID: '', // 商品ID （必填）
                    CustomNo: '', // 商品货号
                    Level: 1, // 层级 （必填）
                    Note: '', // 备注
                    Point: 100, // 价格/折扣
                    PriceType: 1, // 返点类型 0 固定金额，1 订单返点 2 商品折扣 null 不限
                    Status: 1, // 0禁止 1启用
                },
                customNo: '',  // 商品货号
                isBusy: false, // 是否正在请求
                goodsList: [], // 商品列表
                currentGood: {}, // 当前选中的商品
                isShowGoodsList: false,
                customerGradeList: [],
                orderCustomerGradeList: [],
                baseLookUp: {
                    priceType: [
                        {
                            code: 0,
                            text: '固定金额'
                        },
                        {
                            code: 1,
                            text: '订单返点'
                        },
                        {
                            code: 2,
                            text: '商品折扣'
                        }						
                    ]
                },
            }
        },
        methods: {
            // 商品货号
            showGoodsList: function () {
                this.isShowGoodsList = true;
            },
            hideGoodsList: function () {
                var self = this;
                setTimeout(function () {
                    self.isShowGoodsList = false;
                },200);
            },
            //  获取商品列表
            getGoodsList: function () {
                var self = this;
                if (this.isBusy) return;
                var customNo = self.pointConfigs.CustomNo;
                if (customNo) {
                    this.isBusy = true;
                    servers.postAjax({
                        url: '/BasDistributorPointConfig/ErpGetGoodsList',
                        data: {
                            CustomNo: customNo
                        }
                    }).done(function (result) {
                        self.isBusy = false;
                        self.goodsList = [];
                        if (result.Data.length > 0) {
                            self.goodsList = result.Data;
                        }
                    }).fail(function (err) {
                        self.isBusy = false;
                    })
                }
            },
            // 获取客户等级列表
            getCustomerGrade: function () {
                var self = this;
                servers.getAjax({
                    url: '/BaseLookup/GetBasCustomerGradeList'
                }).done(function (result) {
                    self.customerGradeList = result.Data;
                    self.orderCustomerGradeList = result.Data;
                })
            },
            // 选择商品货号
            selectGood: function (good) {
                this.currentGood = good;
                this.pointConfigs.CustomNo = good.CustomNo;
                this.pointConfigs.GoodsID = good.GoodsID;
                if (this.pointConfigs.PriceType == 0) {
                    this.pointConfigs.Point = good.BasePrice;
                }
            },
            // 更改返点类型
            changePriceType: function () {
                if (this.pointConfigs.PriceType == 0) {
                    this.pointConfigs.Point = this.currentGood.BasePrice;
                } else {
                    this.pointConfigs.Point = 100
                }
            },
            // 保存表单
            savePointConfig: function () {
                var self = this;
                if (!this.pointConfigs.CustomNo) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请填写商品货号!'
                    });
                    return ;
                }
                else if (!this.pointConfigs.PriceType) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请填返点类型!'
                    });
                    return ;
                }
                else if (!this.pointConfigs.Level) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请填写层级!'
                    });
                    return ;
                }
                else if (this.pointConfigs.PriceType == 1 && (this.pointConfigs.Point > 100 || this.pointConfigs.Point < 0)) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请填写0到100之间的折扣!'
                    });
                    return ;
                }
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要保存吗?',
                    btnName: '保存',
                    events: {
                        confirm: 'savePointConfig'
                    }
                });
                self.$off('savePointConfig');

                self.$once('savePointConfig',function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasDistributorPointConfig/ErpSavePointConfig',
                        data: this.pointConfigs
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.resetForm();   //清空表单
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '提交成功!'
                            });
                        }
                    });
                })
            },
            // 重置表单
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.pointConfigs = {
                        DistributorPointConfigID: '',
                        CustomerGradeID: '',  // 等级ID（可有可无）
                        OrderCustomerGradeID: '', //参照等级ID
                        GoodsID: '', // 商品ID （必填）
                        Level: 1, // 层级 （必填）
                        Note: '', // 备注
                        Point: 100, // 价格/折扣
                        PriceType: 1, // 返点类型 0 固定金额，1 折扣 null 不限
                        Status: 1, // 0禁止 1启用
                        CustomNo: '',
                    };
                }
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'pointConfigEdit') {
                    self.pageInfo.title = '修改返点配置';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
                    if ( query.DistributorPointConfigID ) {
                        self.pointConfigs.DistributorPointConfigID = query.DistributorPointConfigID;
                        self.pointConfigs.CustomerGradeID = query.CustomerGradeID;
                        self.pointConfigs.OrderCustomerGradeID = query.OrderCustomerGradeID;
                        self.pointConfigs.GoodsID = query.GoodsID;
                        self.pointConfigs.Level = query.Level;
                        self.pointConfigs.Note = query.Note;
                        self.pointConfigs.Point = query.Point;
                        self.pointConfigs.PriceType = query.PriceType;
                        self.pointConfigs.Status = query.Status;
                        self.pointConfigs.CustomNo = query.CustomNo;
                    } else {
                        transition.abort();
                    }
                } else if (name == 'pointConfigAdd'){
                    self.pageInfo.title = '新建返点配置';
                    self.pageInfo.isEdit = false;
                    self.resetForm();
                }
            }
        },
        ready() {
            this.getCustomerGrade();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .stock-upsheet {
        position: relative;
    }
    .stock-upsheet-wrap {
        position: absolute;
        width: 100%;
        left: 0;
        top: 24px;
        flex: 1;
        padding-left: 144px;
        ul.stock-upsheet-list {
            padding: 5px;
            border: 1px solid #ccc;
            background: #fff;
            max-height: 200px;
            overflow-y: scroll;
        }
        .stock-upsheet-item {
            white-space: nowrap;
            overflow: hidden;
            line-height: 24px;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover {
                background: #ccc;
            }
        }
    }
</style>