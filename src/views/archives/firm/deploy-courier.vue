<template>
    <div class="container-fluid courier">
        <div class="checkbox-group">
            <label class="checkbox-title">
                配置快递
            </label>
        </div>
        <div class="sheet-list form-inline query-detail">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-courier">
                        <div class="batch-operation-group">
                            <label class="checkbox-title">
                                编码(快递)：
                            </label>
                            <select class="form-control" v-model="selectIndex" >
                                <option value='请选择快递'>请选择快递</option>
                                <option v-for="opt in merchantDeliveryList" value="{{$index}}"  >({{opt.Code}}){{opt.Name}}</option>
                            </select>
                            <a href="javascript:void(0)" class="btn btn-default" @click="newCourier">新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" @click="saveNewList()">保存新增</a>
                            <a href="javascript:void(0)" class="btn btn-default" v-link="'../entrepot'">返回列表</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group">
                            <thead class="sheet-list-header">
                            <tr>
                                <th>(编码)快递</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody class="panel panel-default">
                                <tr class="sheet-list-item" v-for="list in CourierList">
                                    <td>{{list.MerchantDelivery.Code}}{{list.MerchantDelivery.Name}}</td>
                                    <td>
                                        <span class="click-element iconfont icon-delete courier-delete" data-toggle="tooltip" data-placement="top" title="删除" @click="delItem(list.StockDeliveryID)"></span>
                                        <!--<a v-link="deploy-place" ><span class="click-element iconfont icon-courier courire-color" data-toggle="tooltip" data-placement="top" title="配置快递"></span></a>-->
                                        <a v-link="'deploy-place?id='+list.MerchantDeliveryID"  data-toggle="tooltip" data-placement="top" title="配置快递">
                                            <span class="click-element iconfont icon-courier courire-color"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="sheet-list-item" v-for="item in newDeliveryList">
                                    <td>{{item.Code}}{{item.Name}}</td>
                                    <td>
                                        <span class="click-element iconfont icon-delete courier-delete" data-toggle="tooltip" data-placement="top" title="删除" @click="delNewDelivery(item.MerchantDeliveryID)"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .courire-color{
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
    background-color: #8280d1;
    }
</style>
<script>
    var servers= require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
//                MerchantDeliveryID: '',  //商家快递ID	string
//                MerchantID: '',  //商家ID	string
//                StockDeliveryID: '',  //仓库快递公司流水ID	string
                StockID: '', //仓库ID	string
                selectIndex: '请选择快递',
                CourierList: [], // 快递信息列表
                merchantDeliveryList: [], // 快递下拉列表
                newDeliveryList: [], // 新增的快递信息
            }
        },
        computed: {
            // 已选中的当前快递信息
            activeItem() {
                return this.merchantDeliveryList[this.selectIndex];
            },
            // 新增的快递数组
            newList() {
                var list = [];
                for (var i in this.newDeliveryList) {
                    list.push({
                        MerchantDeliveryID: this.newDeliveryList[i].MerchantDeliveryID,
                        MerchantID: this.newDeliveryList[i].MerchantID,
                        StockDeliveryID: null,
                        StockID: this.StockID,
                    });
                }
                return list;
            }
        },
        methods: {
            // 获取编码快递列表
            getMerchantDeliveryList: function() {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetMerchantDeliveryList',
                    data: {
                        StockID: self.StockID
                    }
                }).done(function(result) {
                    if (result.ResultCode == 1 ) {
                        self.merchantDeliveryList = result.Data
                    }
                });
            },

        // 获取配置快递列表
            getCourier: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasDeliveryPrice/ErpGetStockDeliveryByStockID',
                    data: {
                        StockID: self.StockID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1 ) {
                        var courier = result.Data;
                        self.CourierList = [];
                        self.CourierList = courier;
                        } else {
//                            self.$dispatch('transmit','tip',{
//                                name: '提示',
//                                contentText: '结果为空'
//                            });
                        }

                });
            },
            // 根据id删除快递信息
            delItem: function (id) {
                var self = this ;
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要删除该快递信息吗!',
                    btnName: '确定',
                    events: {
                        confirm: 'delItem'
                    }
                });
                self.$off('delItem');
                self.$once('delItem',function () {
                        //发送删除请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasDeliveryPrice/ErpDeleteStockDelivery',
                            contentType: 'application/json',
                            data: JSON.stringify([id])
                        }).done(function (result) {
                            NProgress.done();
                            if ( result.ResultCode == 1 ) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '删除成功！'
                                });
                                self.getCourier();    //删除成功,重新刷新列表
                            }
                        });
                });

            },
            delNewDelivery: function (id) {
                for (var i in this.newDeliveryList) {
                    if (this.newDeliveryList[i].MerchantDeliveryID == id) {
                        return this.newDeliveryList.splice(i, 1);
                    }
                }
            },
            // 新增快递
            newCourier: function() {
                if (this.selectIndex == "请选择快递") {
                    this.activeItem = [];
                }
                if (!this.activeItem) return this.$dispatch('transmit','tip',{contentText: '请先选择商家快递'});
                for (var i in this.newDeliveryList) {
                    if (this.newDeliveryList[i].MerchantDeliveryID == this.activeItem.MerchantDeliveryID) {
                        return this.$dispatch('transmit','tip',{
                            contentText: '当前选择的快递已经新增，未保存'
                        });
                    }
                }
                for (var i in this.CourierList) {
                    if (this.CourierList[i].MerchantDeliveryID == this.activeItem.MerchantDeliveryID) {
                        return this.$dispatch('transmit','tip',{
                            contentText: '当前选择的快递已经存在'
                        });
                    }
                }
                this.$dispatch('transmit', 'tip', {contentText: '新增成功，未保存'});
                this.newDeliveryList.push(this.activeItem);
            },
            // 保存新增
            saveNewList: function () {
                var self = this;
                var date = this.newList;
                servers.postAjax.bind(this) ({
                    url: '/BasDeliveryPrice/ErpSaveStockDelivery',
                    contentType: 'application/json',
                    data: JSON.stringify(date)
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功！'
                        });
                        self.newList = [];
                        self.newDeliveryList = [];
                        self.selectIndex = 0;
                        self.getCourier();    //保存成功,重新刷新列表
                    }
                })
            },

        },

//        ready() {
//            this.getCourier();
//            this.getMerchantDeliveryList();
//        },
        route: {
            data: function (transition) {
                this.StockID = transition.to.query.id;
                this.getCourier();
                this.getMerchantDeliveryList();
                transition.next();
            },
        }

    }
</script>
<style media="screen" rel="stylesheet/less" lang="less">
    .courier {
        .batch-courier {
            padding-left: 19px;
            padding-bottom: 19px;

        }
        .padding-left {
            padding-left: 20px;
        }
        .courier-delete {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            line-height: 18px;
            background-color: #bbbbbb;
        }
    }
</style>
