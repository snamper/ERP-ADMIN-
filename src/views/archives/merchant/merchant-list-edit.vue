<template>

<div class="unify-head">修改商品</div>
<div class="query-form last-parse merchant-list-edit">
    <div id="query-detail" class="form-inline query-detail collapse in" aria-expanded="true">
        <div class="row">
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.CustomNo" :input-text="'商品货号'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.Name" :input-text="'名称'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.ShortName" :input-text="'简称'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.EName" :input-text="'英文名'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Origin" :input-text="'产地'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Years" :input-text="'年份'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Series" :input-text="'系列'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Spec" :input-text="'规格'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Designer" :input-text="'设计师'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Unit" :input-text="'包装单位'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.SaleTaxRate" :input-text="'销项税率'" :input-after="'%'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.KeepDays" :input-text="'保质日期'" :input-after="'天'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.DistributePrice" :input-text="'分销价'" :input-after="'元'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.BasePrice" :input-text="'吊牌价'" :input-after="'元'" :can-mark="true"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.MarketPrice" :input-text="'建议售价'" :input-after="'元'" :can-mark="false"></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Cost" :input-text="'成本价'" :input-after="'元'" :can-mark="false   "></input-welter>
            <input-welter :page-type="$route.params.pagetype" :input-value.sync="merchantObj.GoodsDetail.Note" :input-text="'备注'" :can-mark="false"></input-welter>

            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>分类<span  v-if="$route.params.pagetype != 'see'" class="form-required-mark">*</span></label>
                <div class="monad" v-if="$route.params.pagetype != 'see'">
                    <select class="form-control" v-model="merchantObj.DeptID">
                        <option v-for="attr in deptList" value="{{attr.DeptID}}">{{attr.Name}}</option>
                    </select>
                </div>
                <div v-if="$route.params.pagetype == 'see'" class="monad" v-text="merchantObj.Dept.Name"></div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>品牌<span  v-if="$route.params.pagetype != 'see'" class="form-required-mark">*</span></label>
                <div class="monad" v-if="$route.params.pagetype != 'see'">
                    <select class="form-control" v-model="merchantObj.BrandID">
                        <option v-for="attr in brandList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                    </select>
                </div>
                <div v-if="$route.params.pagetype == 'see'" class="monad" v-text="merchantObj.Brand.Name"></div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>季节<span  v-if="$route.params.pagetype != 'see'" class="form-required-mark">*</span></label>
                <div class="monad" v-if="$route.params.pagetype != 'see'">
                    <select class="form-control" v-model="merchantObj.SeasonID">
                        <option v-for="attr in seasonList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                    </select>
                </div>
                <div v-if="$route.params.pagetype == 'see'" class="monad" v-text="merchantObj.Season.Name"></div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>性别<span  v-if="$route.params.pagetype != 'see'" class="form-required-mark">*</span></label>
                <div class="monad" v-if="$route.params.pagetype != 'see'">
                    <select class="form-control" v-model="merchantObj.SexID">
                        <option v-for="attr in sexList" value="{{attr.PropertyID}}">{{attr.Name}}</option>
                    </select>
                </div>
                <div v-if="$route.params.pagetype == 'see'" class="monad" v-text="merchantObj.Sex.Name"></div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>默认供应商</label>
                <div class="monad" v-if="$route.params.pagetype != 'see'">
                    <select class="form-control" v-model="merchantObj.GoodsDetail.VenderID">
                        <option v-for="attr in venderList" value="{{attr.VenderID}}">{{attr.Name}}</option>
                    </select>
                </div>
                <div v-if="$route.params.pagetype == 'see'" class="monad" v-text="
                    merchantObj.GoodsDetail.Vender.Name
                "></div>
            </div>

            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label class="form-group-text">状态</label>
                <div class="monad state-btn">
                    <div v-if="$route.params.pagetype != 'see'">
                        <status-checkbox :status.sync="merchantObj.Status"></status-checkbox>
                    </div>
                    <div v-if="$route.params.pagetype == 'see'" class="monad">{{merchantObj.Status == 1 ? '启用' : '禁用'}}</div>
                </div>
            </div>

            <div class="form-group col-lg-12 col-md-12 col-sm-12" v-if="$route.params.pagetype != 'see'">
                <label>产品图</label>
                <div class="productImg monad" id="productImg">
                    <input type="button" name="name" value="上传图片" class="btn btn-default" @click="uploadImage" >
                    {{mercahntObj.Files | json }}
                     <img class="img-interval" v-for="url in merchantObj.Files" :src="url" />

                </div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="$route.params.pagetype != 'see'">
                <label>商品详情</label>
                <div>
                    <button class="btn btn-default" @click="showEditor(1)">编辑内容</button>
                </div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6" v-if="$route.params.pagetype != 'see'">
                <label>质检报告</label>
                <div>
                    <button class="btn btn-default" @click="showEditor(2)">编辑内容</button>
                </div>
            </div>
            <div class="query-button-group form-group col-lg-12 query-btn-group" v-if="isShow">
                <a v-if="$route.params.pagetype != 'see'" @click="postMerchant" href="javascript:void(0)" class="btn btn-default">保存</a>
                <a class="btn btn-default" href="#!/merchant/list">返回列表&gt;&gt;</a>
            </div>
            <div class="query-button-group form-group col-lg-12 query-btn-group" v-else>
                <span  v-if="$route.params.pagetype != 'see'" class="btn btn-default" style="background: #E5E5E5;color: white;" >保存</span>
            <a class="btn btn-default" href="#!/merchant/list">返回列表&gt;&gt;</a></div>
        </div>
    </div>
    <!-- 质检报告 商品详情 编辑组件 -->
    <div v-for="goodsInfo in merchantObj.GoodsInfo">
        <modal-editor :goods-info.sync="goodsInfo"></modal-editor>
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
                CustomNo: '',
                Status: 1,
                GoodsDetail: {},
                Files: [],
                GoodsInfo: [
                    {
                        Content: '',
                        GoodsID: '',
                        GoodsInfoID: '',
                        InfoType: 1
                    },
                    {
                        Content: '',
                        GoodsID: '',
                        GoodsInfoID: '',
                        InfoType: 2
                    }
                ],
            },
            isShow:true,//是否显示保存按钮
        }
    },
    components:{
        // 子组件： 选择区域
        'select-area': require('../../../components/select-area.vue'),
        'imgUpload': require('../../../components/imgUpload.vue'),
        'status-checkbox': require('../../../components/status-checkbox.vue'),
        'input-welter': require('../../../components/form/input_welter.vue'),
        'modal-editor': require('./components/modal-editor.vue'),
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
        getMerchant: function(id) {
            var self = this;
            this.servers.postAjax.bind(this)({
                url: '/BasGoods/GetGoodsDetails',
                data: {
                    GoodsID: id
                },
                success: function(data) {
                    if (!data.Data[0].GoodsInfo || !data.Data[0].GoodsInfo.length) {
                        data.Data[0].GoodsInfo = [
                            {
                                Content: '',
                                GoodsID: data.Data[0].GoodsID,
                                GoodsInfoID: data.Data[0].GoodsID,
                                InfoType: 1
                            },
                            {
                                Content: '',
                                GoodsID: data.Data[0].GoodsID,
                                GoodsInfoID: data.Data[0].GoodsID,
                                InfoType: 2
                            }
                        ];
                    } else if (data.Data[0].GoodsInfo.length < 2) {
                        data.Data[0].GoodsInfo.push({
                            Content: '',
                            GoodsID: data.Data[0].GoodsID,
                            GoodsInfoID: data.Data[0].GoodsID,
                            InfoType: data.Data[0].GoodsInfo[0].InfoType === 1 ? 2 : 1,
                        })
                    }
                    self.merchantObj = data.Data[0];
                }
            })
        },
        postMerchant: function() {
            var self = this;
            if(!self.isShow ) {
                return 
            }
            self.isShow = false
            this.servers.NProgress.start();
            this.servers.postAjax.bind(this)({
                url: '/BasGoods/ErpSaveGoods',
                data: this.merchantObj,
                success: function(data) {
                    self.servers.NProgress.done();
                    var canEdit = self.$route.params.pagetype == 'edit';
                    if (data.ResultCode === 1) {
                        var text = canEdit ? '修改成功！' : '添加成功！';
                        self.$dispatch('transmit', 'tip', {
                            contentText: text
                        })
                        
                        //重置表单
                        if (!canEdit) {
                            self.merchantObj = {
                                CustomNo: '',
                                Status: 1,
                                GoodsDetail: {},
                                Files: [],
                                GoodsInfo: [
                                    {
                                        Content: '',
                                        GoodsID: '',
                                        GoodsInfoID: '',
                                        InfoType: 1
                                    },
                                    {
                                        Content: '',
                                        GoodsID: '',
                                        GoodsInfoID: '',
                                        InfoType: 2
                                    }
                                ],
                            };
                        }
                    }
                    self.isShow = true
                }
            })
        },
        uploadImage: function() {
            this.$dispatch('transmit', 'imgUploadModalShow',this.id,this.merchantObj.Files)
        },
        showEditor: function (type) {
            this.$broadcast('modalShow', type);
        }
    },
    events: {
        'uploadImgSuccess': function (imgUrls) {
            this.merchantObj.Files = imgUrls;
        }
    },
    ready: function() {
        this.id = this.$route.params.id;
        this.getAttribute();
        this.getDeptList();
        this.servers.getVenderList(this, 'venderList');
    },
    route: {
        data: function (transition) {
            if (this.$route.params.pagetype != 'add') {
                this.getMerchant(transition.to.query.id);
            }
        }
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

.input-group-center {
    width: 100%;
}

.form-control-align {
    margin-right: -10px;
}

.input-group-addonbg {
    background: none;
    border: none;
}
.query-btn-group{
    a,span{
        margin-top:20px;
    }
}
.query-button-group{

    a,span{
        margin-right:10px;
    }
}
.thumbnailImg{
    display:inline-block;
    padding-left: 102px;
    width: 100%;
    margin-top:4px;
    padding-right:10px;
    img{
        width: 60px;height: 60px;margin:4px;    }
}


.merchant-list-edit{
    .input-group-center{
        margin-left:0;
    }
    .img-interval {
        margin-left: 10px;
    }
}
.state-btn{
    .checkbox{
        margin-top:-35px;
        margin-left:-20px;
    }
}
.productImg-show{

    .productImg{
        cursor:pointer;
    }
}

</style>
