<template>
    <div class="container-fluid">
        <div class="unify-head">
            添加商品
        </div>
    </div>
    <div class="query-form">
        <div id="query-detail" class="form-inline collapse in query-detail">
            <div class="row">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">登陆账号 <span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.Login" type="text" class="form-control ">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">登陆密码 <span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.Pwd" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">公司名称 <span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.Name" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">公司简称 <span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.ShortName" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">商家编号 <span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.Code" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">所在行业<span class="form-required-mark">*</span></label>
                    <select class="form-control" v-model="tradeObj.TradeID">
                        <option v-for="tradeIndustry in tradeIndustrys" value="{{tradeIndustry.TradeID}}">
                            {{tradeIndustry.Name}}
                        </option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">合作类型<span class="form-required-mark">*</span></label>
                    <select class="form-control" v-model="tradeObj.CooperationType">
                        <option v-for="jointype in joinType" value="{{jointype.Code}}">{{jointype.Text}}</option>
                    </select>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">注册时间<span class="form-required-mark">*</span></label>
                    <div class='input-group date' id='trade-begin-timepicker'>
                        <input v-model="tradeObj.BeingDate | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group form-limit-width col-lg-3">
                    <label class="form-group-text">过期时间<span class="form-required-mark">*</span></label>
                    <div class='input-group date' id='trade-enddate-timepicker'>
                        <input v-model="tradeObj.EndDate | formatDate" type='text' class="form-control"/>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">联系人<span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.LinkMan" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">办公电话<span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.LinkTel" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">手机<span class="form-required-mark">*</span></label>
                    <input v-model="tradeObj.Mobile" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">Email</label>
                    <input v-model="tradeObj.Email" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">传真</label>
                    <input v-model="tradeObj.Fax" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">商家域名</label>
                    <input v-model="tradeObj.WebSite" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">微信端域名</label>
                    <input v-model="tradeObj.SecurityWebSite" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6 form-limit-width">
                    <label class="form-group-text">所在区域</label>
                    <select-area :state.sync="tradeObj.State" :city.sync="tradeObj.City"
                                 :district.sync="tradeObj.District"
                                 :options="{isShowCity:true,isShowDistrict:true}"></select-area>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6 form-limit-width">
                    <label class="form-group-text">详细地址</label>
                    <textarea v-model="tradeObj.Address" class="form-control" rows="3"></textarea>
                </div>

                <div class="form-group col-lg-3 col-md-4 col-sm-6 form-limit-width">
                    <label class="form-group-text">备注</label>
                    <textarea v-model="tradeObj.Note" class="form-control" rows="3"></textarea>
                </div>


            </div>
            <div class="query-button-group">
                <div class="form-group form-limit-width startUsing ">
                    <status-checkbox :status.sync="tradeObj.Status"></status-checkbox>
                </div>
                <a @click="postMerchant" href="javascript:void(0)" class="btn btn-default">保存</a>
                <a class="btn btn-default" href="#!/trade-manage/index">返回列表&gt;&gt;</a>
            </div>
        </div>
    </div>

    </div>


    <img-upload></img-upload>
</template>

<script>

    module.exports = {
        data: function () {
            return {
                servers: require('../../../js/servers/servers'),
                id: '',
                deptList: [],
                sizeList: [],
                colorList: [],
                seasonList: [],
                brandList: [],
                tradeIndustrys: [],
                joinType: [],
                sexList: [],
                tradeObj: {
                    Status: 1
                }
            }
        },
        components: {
            // 子组件： 选择区域
            'select-area': require('../../../components/select-area.vue'),
            'imgUpload': require('../../../components/imgUpload.vue'),
            'status-checkbox': require('../../../components/status-checkbox.vue'),
        },
        methods: {
            getAttribute: function () {
                this.servers.filterList(this);
            },


            getTrade: function () {
                var relf = this;

                this.servers.getBaseData('TradeList', false, function (val) {
                    relf.tradeIndustrys = val;
                })
            },
            getJoinType: function () {
                var relf = this;

                this.servers.getBaseData('CooperationType', false, function (val) {
                    relf.joinType = val;
                })
            },


            postMerchant: function () {
                var relf = this;
                this.servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpSaveSysMerchant',
                    data: relf.tradeObj,
                    success: function (data) {
                        if (data.ResultCode === 1) {
                            relf.$dispatch('transmit', 'tip', {
                                contentText: '添加成功!'
                            })

                            self.tradeObj = {
                                Status: 1
                            }
                        }
                    }
                })
            },
            uploadImage: function () {
                this.$dispatch('transmit', 'imgUploadModalShow')

            }
        },
        events: {
            'uploadImgSuccess': function (response) {
                this.tradeObj.GoodsDetail.BigPic = this.tradeObj.GoodsDetail.SmallPic = response.ErrorMessage;
            }
        },
        ready: function () {
            this.getAttribute();
            this.getTrade();
            this.getJoinType();
            //this.servers.getTrade(this, 'tradeIndustrys');
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#trade-begin-timepicker,#trade-enddate-timepicker').datetimepicker({});

        }
    }

</script>
<style rel="stylesheet/less" lang="less">

    .input-group-btn-bdnone {
        .form-control {
            border-right: none;
            border-radius: 5px 5px 5px 0;
            background: #ccc;
            border-radius: 4px;
        }
        .btn-default {
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            border-left: none;
            line-height: 1.458571;
        }
    }

    .input-group-addonbg {
        background: none;
        border: none;
    }

    .uploading-img {
        height: 26px;
        border: 1px solid #CCCCCC;
        color: #666666;
    }

    .remark-text {
        border: 1px solid #CCCCCC;
        color: #666666;
        border-radius: 4px;
        margin-left: 0;

    }

    .query-button-group {
        clear: both;
    }

    .input-group-w {
        width: 83%;
    }

    .checkbox-group-btn {
        display: inline-block;
    }

    .merchand-edit {
        .checkbox-group {
            margin-top: -11px;

            padding-top: 0;
            label {
                text-align: left;

            }
        }
    }

    .startUsing {
        margin-left: -130px;
        margin-top: -20px;
    }
</style>
