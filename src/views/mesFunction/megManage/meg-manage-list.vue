<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="batch-operation">
                <div class="batch-operation-group">
                    <a href="javascript:void(0)"  class="btn btn-default" @click="erpSetBlackList">置为黑名单</a>

                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sheet-list-table table-responsive pick-table">
                <table class="table table-condensed" id="sheet-list" role="tablist">
                    <thead class="sheet-list-header">
                        <tr>
                            <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                            <th>状态</th>
                            <th>店铺</th>
                            <th>买家</th>
                            <th>消息分类</th>
                            <th>内容</th>
                            <th>接收时间</th>
                            <th>到期时间</th>
                            <th>操作客服</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="sheet-list-item" v-for="item in outStockBatch">
                            <td><input type="checkbox" v-model="item.checked"></td>
                            <td><span v-if="item.Status == 1">已回复</span><span v-if="item.Status == 0">未回复</span></td>
                            <td title="{{item.ShopName}}">{{item.ShopName}}</td>
                            <td>
                                <span v-if="item.IsBlackList == 1">
                                   <span title="{{item.Buyer | truncationString 6}}" style="color: rgb(255, 0, 0);">[黑]</span> {{ item.Buyer}}
                                </span>
                                <span title="{{item.Buyer | truncationString 6}}" v-if="item.IsBlackList == 0">
                                    {{item.Buyer }}
                                </span>                                
                            </td>
                            <td title="{{item.MessageClassName}}">{{item.MessageClassName | truncationString }}</td>
                            <td title="{{item.Content}}">{{item.Content | truncationString 20}}</td>
                            <td title="{{item.ReceiveDate}}">{{item.ReceiveDate | limitBy 9 2 }}</td>
                            <td title="{{item.ExpirationDate}}">{{item.ExpirationDate | limitBy 9 2 }}</td>
                            <td title="{{item.Code}}">{{item.Code }}</td>
                            <td>                         
                                <a v-if="code ==100"  v-link="{name:'meg-manage-back',query:{channelMessageID: item.ChannelMessageID},params:{channelMessageID:item.channelMessageID }}" class="sheet-tab-link" title="回复">
                                    <span class="glyphicon glyphicon-edit"></span>                                   
                                </a>
                                <a v-if="code ==200"  v-link="{name:'meg-manage-check',query:{channelMessageID: item.ChannelMessageID},params:{channelMessageID:item.channelMessageID},activeClass:'active'}" class="sheet-tab-link">
                                    <span class="glyphicon glyphicon-eye-open iocn-yj"></span> 
                                </a>                               
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div  class="no-data" v-if="outStockBatch.length == 0 && !$loadingRouteData ">没有可供显示的结果</div>
            </div>
            <pagination :pagination-options.sync="paginationOptions"></pagination>
        </div>
    </div>
</template>


<script>
    var commonMethods = require('../../../js/common');
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                autoPrint: false
            }
        },
        props: ['outStockBatch','paginationOptions','code'],
        computed: commonMethods.selectAll('this.outStockBatch', function (item) {
            return item
        }),
        methods: {
            /*
             * 置为黑名单
            */
            erpSetBlackList:function(){
                
                var self = this;
                var outStockBatchIDGroup = this.getIDGroup('','ChannelMessageID');
                if (outStockBatchIDGroup.length > 0) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要置为黑名单吗?',
                        btnName: '确定',
                        events: {
                            confirm: 'getDeliverySheet'
                        }
                    });
                    self.$off('getDeliverySheet');

                    self.$once('getDeliverySheet',function () {
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasBuyerBlackList/ErpSetBlackList',
                            contentType: 'application/json',
                            data: JSON.stringify(outStockBatchIDGroup)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit','tip',{
                                    name: '提示:',
                                    contentText: '置为黑名单成功!'
                                });
                                self.$dispatch('transmit','page-change');
                            }
                        })
                    })
                }           
                
            },
            getIDGroup: function (ItemID,key) {
                var IDGroup = [];
                var ItemGroup = this.checkedGroups;
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    ItemGroup.forEach(function (item) {
                        IDGroup.push(item[key]);
                    });
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请至少选中一条消息'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
        },       
        components: {
            pagination: require('../../../components/pagination.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

.sheet-list-table .table > tbody > .sheet-list-item > td {
    border-bottom: 1px dashed #ccc;
    border-top: none;
}
.pick-table{
    width: 97%;
    border-right:1px solid #e5e5e5;
    border-left:1px solid #e5e5e5;

    margin:0 auto;
}
.delivery {
    &.icon-setting {
        &:before {
            background: #8280d1;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            line-height: 18px;
            text-align: center;
        }
    }
}
.iocn-yj:before{
    /*content: '\E637';*/
    background: #ccc;
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    line-height: 18px;  
}

</style>