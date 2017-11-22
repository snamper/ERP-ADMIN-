<template>
    <div class="modal fade modal-size-color" :class="{'in':modalWindow.show}" v-if="modalWindow.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content-wrap">
                    <div class="modal-header" v-drag parent=".modal-content-wrap">
                        <button @click="close" type="button" class="close"><span>&times;</span></button>
                        <h4 class="modal-title">{{modalWindow.title}}</h4>
                    </div>
                    <div class="modal-body model-shop">
                        <div class="form-inline">
                            <label>{{state == 'customNo' ? '商品货号:' : 'SKU:'}}</label>
                            <input type="text" @keyup.enter="search()" class="form-control" v-model="queryKey">
                            <label v-if="state == 'customNo'">商品名称</label>
                            <input v-if="state == 'customNo'" type="text" @keyup.enter="search()" class="form-control" v-model="GoodsName">
                            <a href="javascript:void(0)" class="btn btn-default" @click="search()">搜索</a>
                        </div>
                        <div class="scrollscroll">
                            <div class="table-responsive">
                                <table class="table table-bordered table-condensed table-model-margin">
                                    <thead>
                                    <tr>
                                        <th>
                                            <div class="checkbox ">
                                                <input type="checkbox" v-model="selectAll" class="modal-checkbox">
                                            </div>
                                        </th>
                                        <th v-if="state == 'customBC'">SKU</th>
                                        <th v-if="state == 'customNo'">商品货号</th>
                                        <th>商品名称</th>
                                        <th>颜色</th>
                                        <th>尺码</th>
                                        <th>实际库存</th>
                                        <th>可用库存</th>
                                        <th>成本价</th>
                                    </tr>
                                    </thead>

                                    <tbody >
                                    <tr v-for="sizeColorList in sizeColorLists">
                                        <td>
                                            <input type="checkbox" v-model="sizeColorList.checked">
                                        </td>
                                        <td v-if="state == 'customBC'">{{sizeColorList.Sku}}</td>
                                        <td v-if="state == 'customNo'">{{sizeColorList.CustomNo}}</td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{sizeColorList.GoodsName}}">{{sizeColorList.GoodsName | truncationString}}</span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{sizeColorList.Color}}">{{sizeColorList.Color  | truncationString }} </span></td>
                                        <td><span data-toggle="tooltip" data-placement="top" title="{{sizeColorList.Size}}">{{sizeColorList.Size  | truncationString }} </span></td>
                                        <td>{{sizeColorList.Qty ? sizeColorList.Qty : 0}}</td>
                                        <td>{{sizeColorList.UseQty ? sizeColorList.UseQty : 0}}</td>
                                        <td>{{sizeColorList.Cost}}</td>
                                    </tr>
                                    </tbody>

                                </table>
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
    <!--<div>{{sizeColorLists | json}}</div>-->
</template>
<script>
    var servers = require('../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../js/common');
    module.exports = {
        data: function () {
            return {
                // 模态窗口数据
                modalWindow: {
                    show: false,
                    title: '选择'
                },
                // 模态窗 表单数据
                query: {
                    customNo: '',
                    customBC: '',
                    outStockID: '',
                    shopID: '',
                    GoodsName:'',
                },
                queryKey: '',
                GoodsName:'',
                state: '',
                // 颜色尺码列表
                sizeColorLists: []
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
            search: function () {
                this.getBarCodeList();
            },
            submit: function () {
                if (this.checkedGroups.length > 0) {
                    this.$dispatch('size-color-commit',{
                        sizeColorList: this.checkedGroups,
                        merchant: this.merchant
                    });
                    this.close();
                } else {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选择一个商品'
                    });
                }
            },
            //获取颜色尺码列表
            getBarCodeList: function () {
                var self = this;
                var state = self.state;
                if (state == 'customNo') {
                    self.query.customNo = self.queryKey;
                    self.query.customBC = '';
                    self.query.GoodsName = self.GoodsName;
                } else if (state == 'customBC') {
                    self.query.customBC = self.queryKey;
                    self.query.customNo = '';
                    self.query.GoodsName ='';
                    
                }
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BaseLookup/GetBarcodeList',
                    data: {
                        CustomNo: self.query.customNo,
                        SKU: self.query.customBC,
                        VenderID: self.query.VenderID,
                        OutStockID: self.query.OutStockID,
                        ShopID: self.query.shopID,
                        GoodsName:self.query.GoodsName
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var sizeColorLists = result.Data;
                        self.sizeColorLists = [];
                        if (sizeColorLists.length > 0) {
                            sizeColorLists.forEach(function (item) {
                                item.checked = false;
                            });
                            self.sizeColorLists = sizeColorLists;
                        } else {
                            if (state == 'customNo') {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '该商品编码不存在'
                                });
                            } else {
                                self.$dispatch('transmit','tip',{
                                    name: '提示',
                                    contentText: '该SKU不存在'
                                });
                            }
                        }
                    }

                })
            }
            //保存颜色尺码列表

        },
        computed: commonMethods.selectAll('this.sizeColorLists',function (item) {
            return item;
        }),
        events: {
            /**
             *  通过商品编码搜索
             * @param  {object} data
             */
            'choice-customNo': function (data,OutStockID) {
                this.showModal();
//                this.query.customBC = data.customBC;
                this.query.customNo = data.customNo;
                this.query.VenderID = data.VenderID;
                this.query.shopID = data.shopID;
                this.state = 'customNo';
                this.queryKey = data.customNo;
                this.merchant = data.merchant;
                this.sizeColorLists = [];
                if (OutStockID) {
                    this.query.OutStockID = OutStockID;
                }
            },
            /**
             *  通过SKU搜索
             * @param data
             */
            'choice-sku': function (data,OutStockID) {
                this.showModal();
                this.query.customBC = data.customBC;
//                this.query.customNo = data.customNo;
                this.query.VenderID = data.VenderID;
                this.query.shopID = data.shopID;
                this.state = 'customBC';
                this.queryKey = data.customBC;
                this.merchant = data.merchant;
                this.sizeColorLists = [];
                if (OutStockID) {
                    this.query.OutStockID = OutStockID;
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .modal-size-color {
        .modal-header{
            padding:10px;
            /*background: #8996B0;*/
        }
        .modal-content{
            /*height: 500px;*/
            top: 10px;
            .form-inline{
                margin-bottom:5px;
                margin-top:-20px;

            }
        }

        .table-responsive{

            .checkbox{
                margin-bottom:5px;
                    label{
                        padding-left:0;
                    }
            }

            td{
                input{
                    vertical-align: middle;
                    margin-right: 5px;
                    margin-top: -1px;
                }


            }
        }
        .scrollscroll{
            overflow-y:scroll;
            height: 300px;
            thead{
                tr{
                    th:nth-of-type(1){
                        width:60px;
                    }
                    th{
                        .checkbox{
                            input{
                                margin-left: -44px;
                                margin-top: 0px;
                            }
                            .modal-checkbox{
                                margin-left: -9px;
                                margin-top: -11px;
                            }
                        }
                        line-height:2;
                        padding:0;
                        vertical-align: middle;
                    }
                }
            }

        }
    }
.table-responsive{
    .table-model-margin{
        thead{
            tr{
                th{
                    text-align:center;
                }
            }
        }
        tbody{
            tr{
                td{
                    text-align:center;
                }
            }
        }
}
 }


    .form-group{
        .model-shop{
            .form-control{
                width: 60%;
            }
            label{
                min-width:auto;
            }
        }
        }
        

      

</style>
