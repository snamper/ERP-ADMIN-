<template>
	<div class="container-fluid" style="width: 50%">
        <div class="unify-head">
            查看消息
        </div>

        <div class="query-form bom20 clearfix">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        查看消息
                    </label>
                    <div class="checkbox-list">
                    </div>
                </div>
            </div>
            <div id="query-detail" class="form-inline collapse in query-detail">
                <table class="table table-bordered table-hover">
                	<tbody>
                        <tr>
                            <td class="tdRight">买家 </td>
                            <td title="{{channelMessageDetailList.Buyer}}">{{channelMessageDetailList.Buyer | truncationString 50 }}</td>
                        </tr>
                        <tr>
                            <td class="tdRight">平台 </td>
                            <td title="{{channelMessageDetailList.ChannelName}}">{{channelMessageDetailList.ChannelName | truncationString 50 }}</td>
                        </tr>
                        <tr>
                            <td class="tdRight">店铺 </td>
                            <td title="{{channelMessageDetailList.ShopName}}">{{channelMessageDetailList.ShopName | truncationString 50 }}</td>
                        </tr>
                        <tr>
                            <td class="tdRight">主题 </td>
                            <td title="{{channelMessageDetailList.Subject}}">
                                <span>{{channelMessageDetailList.Subject | truncationString 10}}</span>
                                <span v-if="channelMessageDetailList.Subject">【<a href="https://signin.ebay.com.hk/ws/eBayISAPI.dll?SellItem">跳转平台</a>】</span>
                            </td>
                        </tr>   
                        <tr>
                            <td class="tdRight">接收时间</td>
                            <td title="{{channelMessageDetailList.ReceiveDate}}">{{channelMessageDetailList.ReceiveDate }}</td>
                        </tr>   
                        <tr>
                            <td class="tdRight">到期时间</td>
                            <td title="{{channelMessageDetailList.ExpirationDate}}">{{channelMessageDetailList.ExpirationDate}}</td>
                        </tr>                   		                		                		                		                		
                	</tbody>
                </table>
            </div>
            
            <div class="query-detail mes">
                <div class="container-fluid" v-if="contenList0.Content">
                    <div>
                        {{'[' +  contenList0.Buyer + ']' + contenList0.ReceiveDate}}
                    </div>
                    <div class="buyer" v-if="contenList0.Subject">
                        
                        <span>{{channelMessageDetailList.Subject }}</span>
                    </div>
                <!-- Large modal -->
                    

                    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content" v-html="contenList0.Content">
                          ...
                        </div>
                      </div>
                    </div>

                </div>
                <div class="container-fluid" style="margin-left: 168px;" v-if="index" v-for="(index,item) in contenList1">
                    <div v-if="item.Code || item.ReplyDate" style="text-align: right">
                            {{'[' +  item.Code + ']' + item.ReplyDate}}
                    </div>
                    <div class="server" v-if="item.Content" v-html="item.Content">                  
                    </div>                  
                </div>
            </div>

			<div class="query-detail liebiao">
			    <div class="nav-span clearfix">
			    	<span @click="onClickShow(1)" :class="{'active':showIndex ==1}">关联订单</span>
			    	<span @click="onClickShow(1)" :class="{'active':showIndex ==2}">操作日志</span>
			    </div>

			    <div class="tab-div">
			    	<div class="container-fluid dis-hide" :class="{'show-hide':showIndex ==1}">
                        <div v-if="order.Shop == ''">
                            
                        
    			    	    <div class="pad10px">业务类型</div>
    			    		<table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>订单类型</td>
                                        <td>{{order.OrderTypeDesc}}</td>
                                        <td>业务类型</td>
                                        <td>{{order.PurchaseFlagDesc}}</td>
                                    </tr>
                                </tbody>
    			    		</table>
    			    		<div class="pad10px">订单信息</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>外部单号</td>
                                        <td>{{order.OutSheetID}}</td>
                                        <td>销售渠道</td>
                                        <td>{{order.NetShop ? order.NetShop.Channel.Name : ''}}</td>
                                        <td>店铺</td>
                                        <td>{{order.Shop.Name}}</td>
                                    </tr>
                                    <tr>
                                        <td>仓库</td>
                                        <td>{{order.Stock.Name}}</td>
                                        <td>快递</td>
                                        <td>{{order.OrderFlag.MerchantDelivery ? order.OrderFlag.MerchantDelivery.Name :''}}</td>
                                        <td>买家姓名</td>
                                        <td>{{order.LinkMan}}</td>
                                    </tr>
                                </tbody>
                            </table>

    			    		<div class="pad10px">支付信息</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr> 
                                        <td>支付方式</td>
                                        <td>{{order.PayModeDesc}}</td>
                                        <td>支付流水</td>
                                        <td>{{order.BusCustomerOrderDetail ? order.BusCustomerOrderDetail.AlipayNo : ''}}</td>
                                        <td>支付时间</td>
                                        <td>{{order.PayTime}}</td>
                                    </tr>
                                </tbody>
                            </table>
    			    		<div class="pad10px">
    			    			其他信息
    			    		</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>买家留言</td>
                                        <td>{{order.OrderBusiness.BuyerMessage}}</td>
                                        <td>买家备注</td>
                                        <td>{{order.OrderBusiness.BuyerMemo}}</td>
                                    </tr>
                                    <tr>
                                        <td>卖家留言</td>
                                        <td>{{order.OrderBusiness.BuyerMessage}}</td>
                                        <td>卖家备注</td>
                                        <td>{{order.OrderBusiness.SellerMemo}}</td>
                                    </tr>
                                </tbody>
                            </table>
    			    		<div class="pad10px">
    			    			商品清单
    			    		</div>
    			    		<table class="table table-bordered table-hover">
    			    		     <thead>
    			    		     	<tr>
    			    		     		<th>SKU</th>
    			    		     		<th>商品名称</th>
    			    		     		<th>商品尺码</th>
    			    		     		<th>商品颜色</th>
    			    		     		<th>吊牌价</th>
    			    		     		<th>可用库存</th>
    			    		     		<th>购买数量</th>
    			    		     		<th>实际售价</th>
    			    		     	</tr>
    			    		     </thead>
                                <tbody>
                                    <tr v-for="item in order.OrderItems">
                                        <td>data</td>
                                        <td>{{item.Barcode.Goods.Name}}</td>
                                        <td>{{item.Barcode.Size.Name}}</td>
                                        <td>{{item.Barcode.Color.Name}}</td>
                                        <td>{{item.Barcode.Goods.BasePrice}}</td>
                                        <td>{{item.InventoryQty}}</td>                                  
                                        <td>{{item.OrderQty}}</td>
                                        <td>{{item.Price}}</td>
                                    </tr>
                                </tbody>
    			    		</table>			    		
    			    		<span class="pull-right">订单金额：{{order.TotalAmount}}</span>
                        </div>
                        <div v-else style="text-align: center;line-height:100px;height: 100px;">
                            暂无关联订单！
                        </div>
			    	</div>
			    	<div class="container-fluid dis-hide" :class="{'show-hide':showIndex ==2}">
			    		<table style="margin-top: 20px" class="table table-bordered table-hover">
			    		     <thead>
			    		     	<tr>
			    		     		<th>操作时间</th>
			    		     		<th>操作人</th>
			    		     		<th>操作记录</th>
			    		     	</tr>
			    		     </thead>
			    			<tbody>
			    				<tr v-for="n in 5">
			    					<td>data</td>
			    					<td>data</td>
			    					<td>data</td>
			    				</tr>
			    			</tbody>
			    		</table>			    		
			    	</div>

			    </div>

			</div>

			<div class="clearfix query-detail">
				<!-- <button type="" class="btn btn-default pull-left left-10p">关闭</button>	 -->			
			</div>


        </div>        
	</div>
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var megManageCode = require('../../../globalConstants').megManageCode;
    module.exports = {
    	data:function(){
    		return {
    			showIndex:1,
    			channelMessageID:'',//消息ID
    			channelMessageDetailList:{},//查看消息数据
    			contenList:'',
    			queryData:{
					ID: "",
					Sheet: [
					    
					  ]
    			}, 
                //关联订单数据danxinwu  
                order: {
                    Shop:{},
                    Stock:{},
                    OrderFlag:{
                        MerchantDelivery:{
                            Name: ''
                        }
                    },
                    OrderBusiness: {}
                },
                contenList0:{},
                contenList1:[],    			
    		}
    	},
    	methods:{
    		onClickShow:function(index) {
    			console.log(index)
    			this.showIndex = index;
    		},
    		//查询回复详情页面
            queryChannelMessageDetai(){
                var $this = this;

                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/SysChannelMessage/ErpQueryChannelMessageDetail',
                    data: {
                        channelMessageID:$this.channelMessageID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.channelMessageDetailList = result.Data[0];
                        $this.Tid = result.Data.Tid;
                        $this.queryData.ID = result.Data[0].CustomerOrderID
                        $this.queryData.Sheet.push(result.Data[0].Tid);
                        $this.erpQueryCustomerOrderTempByID();


                        $this.contenList0 = result.Data[0];
                        $this.contenList1 = result.Data;
                    }
                })
            },
    		//关联订单
    		erpQueryCustomerOrderTempByID:function(){
                var $this = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpQueryCustomerOrderTempByID',
                    data: $this.queryData
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.customerOrderTemp = result;
                        $this.order = result.Data;
                    }
                })
    		},
    	},
        route: {
            data: function (transition) {
                this.channelMessageID = transition.to.query.channelMessageID;
                this.queryChannelMessageDetai();
            }
        },      	



    }	


</script>
<style>
.btn {
    margin-left: 0px !important;
    margin-top: 0px !important;
}
.bg5 {
background-color: #f5f5f5;    
}
.active {
    background-color: #ccc;
}
.dis-hide {
    display: none;
}
.show-hide {
    display: block;
}
.active {
    background-color: #ddd;
}
.pad10px {
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;
}
.left-10p {
    margin-left: 10px;
}
.bom20 {
    padding-bottom: 20px;
}
.foat-left {
    float: left;
}
.container-fluid>textarea {
    border: 1px solid #ddd;
    outline: none;
    width: 100%;
    min-height: 150px;
    padding: 10px;
    resize:none;
}
.nav-span {
    height: 30px;

}
.nav-span>span {
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 30px;

}
.container-fluid {
    margin-left: 0;
    margin-right: 0;
    background-color: #fff;
}
.query-form {
    background-color: #fff;
}
.query-header {
    border-bottom: none; 
}
.query-detail {
    padding-top: 20px;
    margin-left: 20px;
}
.tdRight {
    text-align: right;
    font-weight: bold;
background-color: #f5f5f5;
    width: 30%;
}
.liebiao {
    border: 1px solid #ddd;
    margin-top: 20px;
    padding-top: 0px;
    padding-bottom: 10px;
}
.mes {
    border:1px solid #ddd;
    max-height: 300px;
    overflow: auto;
    padding: 20px 15px 20px 15px;
}
.buyer {
    width: 530px;
    border:1px solid #ddd;
    border-radius: 5px;
    padding: 10px 10px;
    overflow: auto;
}
.buyer {
    width: 530px;
    border:1px solid #ddd;
    border-radius: 5px;
    padding: 10px 10px;
    margin-top: 5px;
}
.server {
    overflow: auto;
    width: 530px;
    border:1px solid #ddd;
    border-radius: 5px;
    padding: 10px 10px; 
    margin-top: 5px;

}   
</style>

