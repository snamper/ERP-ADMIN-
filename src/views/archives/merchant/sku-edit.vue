<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>修改SKU</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">SKU</label>
                        <input v-model="sku.CustomBC" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">包装数</label>
                        <input v-model="sku.BarcodeDetail.PackQty" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">国标码</label>
                        <input v-model="sku.Barcode" type="text" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">颜色<span class="form-required-mark">*</span></label>
                          <select class="form-control" v-model="sku.ColorID">
                              <option value="">不限</option>
                              <option v-for="color in colorList" value="{{color.PropertyID}}">{{color.Name}}</option>
                          </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">尺寸</label>
                        <select class="form-control" v-model="sku.SizeID">
                            <option value="">不限</option>
                            <option v-for="size in sizeList" value="{{size.PropertyID}}">{{size.Name}}</option>
                        </select>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">重量</label>
                        <input v-model="sku.BarcodeDetail.Weigh" type="text" class="form-control" placeholder="" required>
                        <span class="sku-addonbg">g</span>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="sku.BarcodeDetail.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">设置状态</label>
                        <div class="sku-edit-span">
                            <status-checkbox :status.sync="sku.Status">

                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveSku">保存</a>
                        <a v-link="{name:'sku-index'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div>{{sku | json}}</div>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                sku: {
                    BarcodeID: '',
                    CustomBC: '',
                    Barcode: '',
                    ColorID: '',
                    SizeID: '',
                    BarcodeDetail: {
                        PackQty: '',
                        Weigh: '',
                        Note: '',
                        BarcodeID: '',
                        MerchantID: '',
                        Creater: '',
                        CreateTime: '',
                        Editor: '',
                        EditTime: ''
                    },
                    Status: ''
                },
                sizeList: [],
                colorList: [],
            }
        },
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue')
        },
        methods: {
            getAttribute: function() {
                servers.filterList(this);
            },
            saveSku: function () {
                var self = this;
                if (self.sku.ColorID.length == 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '颜色不能为空，请选择颜色'
                    });
                } else {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasBarcode/ErpSaveBarcode',
                        data: self.sku
                    }).done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '修改成功!'
                            });
                        }
                    })
                }

            }
        },
        route: {
            data: function (transition) {
                var query = transition.to.query;
                if (query.BarcodeID) {
                    this.sku = {
                        BarcodeID: query.BarcodeID,
                        CustomBC: decodeURIComponent(query.CustomBC),
                        Barcode: decodeURIComponent(query.Barcode),
                        ColorID: query.ColorID,
                        SizeID: query.SizeID,
                        BarcodeDetail: {
                            Weigh: query.Weigh,
                            Note: decodeURIComponent(query.Note),
                            BarcodeID: query.BarcodeID,
                            MerchantID: query.MerchantID,
                            Creater: query.Creater,
                            CreateTime: query.CreateTime,
                            Editor: query.Editor,
                            EditTime: query.EditTime,
                            PackQty: query.PackQty
                        },
                        Status: query.Status
                    };
                    transition.next();
                } else {
                    transition.abort();
                }
            }
        },
        ready: function () {
            this.getAttribute();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.sku-edit-span{
    margin-top:-10px;
}
.sku-addonbg{
    width: 30px;
    height: 18px;
    text-align: center;
    line-height:18px;
}
</style>
