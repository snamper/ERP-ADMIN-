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
                        <label class="form-group-text">商品货号 <span class="form-required-mark">*</span></label>
                        <input v-model="merchantObj.CustomNo" type="text" class="form-control ">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">名称 <span class="form-required-mark">*</span></label>
                        <input v-model="merchantObj.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">简称</label>
                        <input v-model="merchantObj.GoodsDetail.ShortName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">英文名</label>
                        <input v-model="merchantObj.GoodsDetail.EName" type="text" class="form-control">
                    </div>

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text ">分类 <span class="form-required-mark">*</span></label>

                        <select class="form-control" v-model="merchantObj.DeptID">
                            <option v-for="attr in deptList" value="{{attr.DeptID}}">{{attr.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">品牌 <span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="merchantObj.BrandID">
                            <option v-for="attr in brandList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">产地</label>
                        <!--<select-area  :state-id.sync="merchantObj.GoodsDetail.State" :city-id.sync="merchantObj.GoodsDetail.City" :district-id.sync="merchantObj.GoodsDetail.District" :options="{isShowCity:true,isShowDistrict:true}"></select-area>-->
                        <input v-model="merchantObj.GoodsDetail.Origin" type="text" class="form-control ">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">季节<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="merchantObj.SeasonID">
                            <option v-for="attr in seasonList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">性别<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="merchantObj.SexID">
                            <option v-for="attr in sexList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">年份</label>
                        <input v-model="merchantObj.GoodsDetail.Years" type="text" class="form-control ">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">系列</label>
                        <input v-model="merchantObj.GoodsDetail.Series" type="text" class="form-control ">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">规格</label>
                        <input v-model="merchantObj.GoodsDetail.Spec" type="text" class="form-control ">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">设计师</label>
                        <input v-model="merchantObj.GoodsDetail.Designer" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">默认供应商</label>
                        <select class="form-control" v-model="merchantObj.GoodsDetail.VenderID">
                            <option v-for="attr in venderList" value="{{attr.VenderID}}">{{attr.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">销项税率<span class="form-required-mark">*</span></label>
                        <div class="input-group input-group-w">

                            <input v-model="merchantObj.GoodsDetail.SaleTaxRate" type="text" class="form-control " style="border-radius:4px;">
                            <span class="input-group-addon input-group-addonbg">%</span>

                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">包装单位 <span class="form-required-mark">*</span></label>
                        <input v-model="merchantObj.GoodsDetail.Unit" type="text" class="form-control">
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">重量</label>
                        <div class="input-group">
                          <input v-model="merchantObj.GoodsDetail.Designer" type="text" class="form-control"  style="border-radius:4px;">
                          <span class="input-group-addon input-group-addonbg">%</span>
                        </div>
                    </div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">保质日期</label>
                        <div class="input-group input-group-w" >
                            <input v-model="merchantObj.GoodsDetail.KeepDays" type="text" class="form-control" style="border-radius:4px;">
                            <span class="input-group-addon input-group-addonbg">天</span>
                        </div>
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">销售价</label>
                        <div class="input-group input-group-w">
                          <input v-model="merchantObj.GoodsDetail.Designer" type="text" class="form-control" style="border-radius:4px;">
                          <span class="input-group-addon input-group-addonbg">%</span>
                        </div>
                    </div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">吊牌价<span class="form-required-mark">*</span></label>
                        <div class="input-group input-group-w">
                            <input v-model="merchantObj.GoodsDetail.BasePrice" type="text" class="form-control" style="border-radius:4px;">
                            <span class="input-group-addon input-group-addonbg">元</span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">建议售价<span class="form-required-mark">*</span></label>
                        <div class="input-group input-group-w">
                            <input v-model="merchantObj.GoodsDetail.MarketPrice" type="text" class="form-control" style="border-radius:4px;">
                            <span class="input-group-addon input-group-addonbg">元</span>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">成本价<span class="form-required-mark">*</span></label>
                        <div class="input-group input-group-w">
                            <input v-model="merchantObj.GoodsDetail.Cost" type="text" class="form-control" style="border-radius:4px;">
                            <span class="input-group-addon input-group-addonbg">元</span>
                        </div>
                    </div>
                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label class="form-group-text">分销价<span class="form-required-mark">*</span></label>-->
                        <!--<div class="input-group input-group-w">-->
                            <!--<input v-model="merchantObj.GoodsDetail.DistributePrice" type="text" class="form-control" style="border-radius:4px;">-->
                            <!--<span class="input-group-addon input-group-addonbg">元</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">备注</label>

                        <input  v-model="merchantObj.GoodsDetail.Note"type="text" class="form-control"  style="border-radius:4px;">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 uploadingImg ">
                        <label class="form-group-text ">产品图</label>
                        <!--<img :src="merchantObj.GoodsDetail.SmallPic" />-->
                        <input type="button" name="name" value="上传图片" class="btn btn-default uploading-img" @click="uploadImage">



                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6 merchand-edit">
                        <label class="form-group-text">状态</label>
                        <div class="span" >
                            <status-checkbox :status.sync="merchantObj.Status" ></status-checkbox>
                        </div>

                    </div>
                    <div class="form-group col-lg-12">
                        <div class="uploadingImgShow">
                            <img v-for="url in merchantObj.Files" :src="url" alt="">
                        </div>
                    </div>

                    </div>



                </div>
                <div class="query-button-group">

                    <a @click="postMerchant" href="javascript:void(0)" class="btn btn-default">保存</a>
                    <a class="btn btn-default" href="#!/merchant/list">返回列表&gt;&gt;</a>
                </div>
            </div>
        </div>

    </div>


    <img-upload></img-upload>
</template>

<script>

module.exports = {
    data: function() {
        return {
            servers: require('../../../js/servers/servers'),
            id: '',
            deptList: [],
            sizeList: [],
            colorList: [],
            seasonList: [],
            brandList: [],
            venderList: [],
            sexList: [],
            merchantObj: {
                Status: 1,
                Files: []
            }
        }
    },
    components:{
        // 子组件： 选择区域
        'select-area': require('../../../components/select-area.vue'),
        'imgUpload': require('../../../components/imgUpload.vue'),
        'status-checkbox': require('../../../components/status-checkbox.vue'),

    },
    methods: {
        getAttribute: function() {
            this.servers.filterList(this);
        },

        getDeptList: function() {
            var self = this;

            self.servers.getAjax({
                url: '/BaseLookup/GetDeptList',
                success: function(data) {
                    self.deptList = data.Data;
                }
            });
        },

        postMerchant: function() {
            var self = this;


                this.servers.postAjax.bind(this)({
                    url: '/BasGoods/ErpSaveGoods',
                    data: self.merchantObj,
                    success: function(data) {
                        if (data.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                contentText: '添加成功!'
                            });

                            self.resetForm();
                        }
                    }
                })


        },
        resetForm: function () {
            this.merchantObj = {
                Status: 1,
                Files: []
            }
        },
        uploadImage: function() {
            this.$dispatch('transmit', 'imgUploadModalShow',this.merchantObj.Files)

        }
    },
    events: {
        'uploadImgSuccess': function (imgUrls) {
            this.merchantObj.Files = imgUrls;
        }
    },
    ready: function() {
        this.getAttribute();
        this.getDeptList();
        this.servers.getVenderList(this, 'venderList');
    }
}

</script>
<style rel="stylesheet/less" lang="less">

.uploadingImg{
    display:block;
    padding-left:30px;
    .uploadingImgShow{
    }
    &.form-group{
         display: block;
     }
    img{
        margin:5px;
        width: 70px;
        height: 70px;
    }

}


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
.uploading-img{
    height: 26px;
    border: 1px solid #CCCCCC;
    color:#666666;
}
.remark-text{
    border: 1px solid #CCCCCC;
    color:#666666;
    border-radius:4px;
    margin-left:0;

}
.query-button-group{
    clear:both;
}
.input-group-w{
    width: 83%;
}
.checkbox-group-btn{
    display:inline-block;
}
.merchand-edit{
    .checkbox-group{
             margin-top:-11px;

        padding-top:0;
        label{
             text-align:left;

        }
    }
}
</style>
