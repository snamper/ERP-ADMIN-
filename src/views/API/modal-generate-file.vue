<template>
    <div class="modal fade" :class="{'in':modalWindow.show}" v-show="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="generate-tip col-md-12">
                                <!-- <p>需指定淘宝回传属性参数值,才可以快速创建商品属性档案</p> -->
                                <p>商品接口回传字段:<span class="form-required-mark">品牌;型号;</span></p>
                            </div>
                            <div class="form-group col-md-6">
                                <label>店铺<span class="form-required-mark">*</span></label>
                                <select v-model="query.ShopID" class="form-control">
                                    <option value="" selected>请选择</option>
                                    <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label>品牌<span class="form-required-mark">*</span></label>
                                <input v-model="query.BrandKey" type="text" class="form-control"  placeholder="">
                            </div>
                            <div class="form-group col-md-6">
                                <label>颜色<span class="form-required-mark">*</span></label>
                                <input v-model="query.ColorKey" type="text" class="form-control"  placeholder="">
                            </div>
                            <div class="form-group col-md-6">
                                <label>尺码<span class="form-required-mark">*</span></label>
                                <input v-model="query.SizeKey" type="text" class="form-control"  placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="close" type="button" class="btn btn-default"> 取消 </button>
                        <button @click="submit" type="button" class="btn btn-primary"> 保存 </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                count: 0,
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '提示',
                },
                query: {
                    BrandKey: '',
                    ColorKey: '',
                    SKU: '',
                    ShopID: '',
                    SizeKey: ''
                },
                // 父级组件 单条 数据储存
                baseLookUp: {}
            }
        },
        methods: {
            close: function () {
                this.modalWindow.show = false;
                var openModal = $('.modal.in');
                var modalInNum = openModal ? openModal.length : 0;
                if (modalInNum == 1) {
                    $('html,body').removeClass('bodyHeight');
                    $('body').removeClass('modal-open');
                }
            },
            showModal: function () {
                var openModal = $('.modal.in').length;
                if (!openModal) {
                    $('html,body').addClass('bodyHeight');
                    $('body').addClass('modal-open');
                }
                this.modalWindow.show = true;
            },
            submit: function () {
                this.generate();
            },
            generate: function () {
                var self = this;
                var brandKey = self.query.BrandKey;
                var colorKey = self.query.ColorKey;
                var shopID = self.query.ShopID;
                var sizeKey = self.query.SizeKey;
                if (!brandKey) {
                    self.$dispatch('transmit','tip',{name: '提示', contentText: '请输入品牌!'});
                    return ;
                } else if (!colorKey) {
                    self.$dispatch('transmit','tip',{name: '提示', contentText: '请输入颜色!'});
                    return ;
                } else if (!shopID) {
                    self.$dispatch('transmit','tip',{name: '提示', contentText: '请选择店铺!'});
                    return ;
                } else if (!sizeKey) {
                    self.$dispatch('transmit','tip',{name: '提示', contentText: '请输入尺码!'});
                    return ;
                }
                if (self.count == 0) {
                    NProgress.start();
                    self.count = 1;
                    servers.postAjax.bind(this)({
                        url: '/PlatFormAPI/BarCodeAdd',
                        data: self.query
                    }).done(function (result) {
                        self.count = 0;
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '档案生成成功'
                            });
                            self.$dispatch('transmit','page-change');
                            self.close();
                        }
                    }).fail(function (err) {
                        self.count = 0;
                    })
                }
            }
        },
        events: {
            /**
             * 自定义事件 修改条码
             * @param  {object} data sku 列表的其中一项，修改之
             */
            'modal-generate-file': function (baseLookUp) {
                this.baseLookUp = baseLookUp;
                this.showModal();
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .generate-tip {
        line-height: 24px;
    }
</style>
