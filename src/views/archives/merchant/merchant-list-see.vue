<template>
<div class="unify-head">查看商品</div>
<div class="query-form last-parse">
    <div id="query-detail" class="form-inline query-detail collapse in" aria-expanded="true">
        <div class="row">
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>状态</label>
                <div class="monad">{{merchantObj.Status == 1 ? '启用' : '禁用'}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>商品货号</label>
                <div class="monad">{{merchantObj.CustomNo}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>名称</label>
                <div class="monad"><span data-toggle="tooltip" data-placement="top" title="{{merchantObj.Name}}">{{merchantObj.Name | truncationString 12 }}</span></div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>简称</label>
                <div class="monad">{{merchantObj.GoodsDetail.ShortName}} </div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>英文名</label>
                <div class="monad">{{merchantObj.GoodsDetail.EName}}</div>
            </div>

            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>分类</label>
                <div class="monad">{{merchantObj.Dept.Name}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>品牌</label>
                <div class="monad">{{merchantObj.Brand.Name}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>产地</label>
                <div class="monad">{{merchantObj.GoodsDetail.Origin}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>季节</label>
                <div class="monad">{{merchantObj.Season}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>性别</label>
                <div class="monad">{{merchantObj.Sex}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>年份</label>
                <div class="monad">{{merchantObj.GoodsDetail.Years}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>系列</label>
                <div class="monad">{{merchantObj.GoodsDetail.Spec}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>规格</label>
                <div class="monad">{{merchantObj.GoodsDetail.Origin}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>设计师</label>
                <div class="monad">{{merchantObj.GoodsDetail.Designer}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>默认供应商</label>
                <div class="monad" v-for="attr in venderList" v-if="attr.VenderID === merchantObj.GoodsDetail.VenderID">{{attr.Name}}</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>销项税率</label>
                <div class="monad">{{merchantObj.GoodsDetail.SaleTaxRate}}%</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>包装单位</label>
                <div class="monad">{{merchantObj.GoodsDetail.Unit}}</div>
            </div>
            <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>重量</label>
                <div class="input-group monad">
                      <input v-model="merchantObj.GoodsDetail.Designer" type="text" class="form-control"  style="border-radius:4px;">
                      <i class="input-group-addon input-group-addonbg">%</i>
                    </div>
            </div> -->
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>保质日期</label>
                <div class="monad">{{merchantObj.GoodsDetail.KeepDays}}</div>
            </div>
            <!-- <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>销售价</label>
                <div  class="input-group menad">
                      <input v-model="merchantObj.GoodsDetail.Designer" type="text" class="form-control" style="border-radius:4px;">
                      <i class="input-group-addon input-group-addonbg">%</i>
                </div>
            </div> -->
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>建议售价</label>
                <div class="monad">{{merchantObj.GoodsDetail.MarketPrice}}元</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">
                <label>成本价</label>
                <div class="monad">{{merchantObj.GoodsDetail.Cost}}元</div>
            </div>
            <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                <!--<label>分销价</label>-->
                <!--<em>{{merchantObj.GoodsDetail.DistributePrice}}元</em>-->
            <!--</div>-->
            <div class="form-group col-lg-3 col-md-4 col-sm-6">

                <label>分销价</label>
                <div class="monad">{{merchantObj.GoodsDetail.DistributePrice}}元</div>
            </div>
            <div class="form-group col-lg-3 col-md-4 col-sm-6">

                <label>备注</label>
                <div class="monad">
                        {{merchantObj.GoodsDetail.Note}}
                    </div>
            </div>
            <div class="form-group col-lg-12 col-md-12 col-sm-12">
                <label>产品图</label>
                <div class="productImg menad">
                <img v-for="imgUrl in merchantObj.Files" :src="imgUrl" />
                </div>
            </div>

            <div class="query-button-group form-group col-lg-12"><a class="btn btn-default" href="#!/merchant/list">返回列表&gt;&gt;</a></div>
        </div>
    </div>
</div>



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
            merchantObj: {}
        }
    },
    methods: {
        getAttribute: function() {
            this.servers.filterList(this);
        },

        getDeptList: function() {
            var relf = this;

            relf.servers.getAjax({
                url: '/BaseLookup/GetDeptList',
                success: function(data) {
                    relf.deptList = data.Data;
                }
            });
        },
        getMerchant: function() {
            var relf = this;

            this.servers.postAjax({
                url: '/BasGoods/GetGoodsDetails',
                data: {
                    GoodsID: this.id
                },
                success: function(data) {
                    relf.merchantObj = data.Data[0];
                }
            })
        },
        postMerchant: function() {
            var relf = this;

            this.servers.postAjax.bind(this)({
                url: '/BasGoods/ErpSaveGoods',
                data: relf.merchantObj,
                function(data) {
                    if (data.ResultCode == 1) {
                        this.$dispatch('transmit', 'tip', {
                            contentText: '修改成功!'
                        })
                    }
                }
            })
        },
        uploadImage: function() {

            this.$dispatch('transmit', 'tip', {
                contentText: '该功能尚在完善！敬请期待！'
            })

        }
    },
    ready: function() {
        this.id = this.$route.params.id;
        this.getMerchant();
        this.getAttribute();
    }
}

</script>
<style type="text/css" lang="less">
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
    margin-left: 24px;
}

.form-control-align {
    margin-right: -10px;
}

.input-group-addonbg {
    background: none;
    border: none;
}


.operate-form-list{
    .form-limit-width{
        margin:8px 0;
        span{
                display:inline-block;
                width: 500px;
                line-height: 2.55571;
                padding:0 8px;
                border: 1px solid #e5e5e5;
                border-radius: 4px;
                margin-left: 10px;

        }
        .productImg{
            border:none;
            padding:0;
            img{
                width: 50px;height: 50px;
            }
        }
    }
    .operate-form-buttons{
        padding-left:129px;
        margin:10px 0;
    }
}

</style>
