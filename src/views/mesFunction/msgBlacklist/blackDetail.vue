<template>
	<div class="container-fluid" style="width: 60%">
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
                			<td class="tdRight" style="width:35%">买家 </td>
                			<td>{{messages.BuyerMessage.Buyer}}</td>
                		</tr>
                		<tr>
                			<td class="tdRight">平台 </td>
                			<td>{{messages.BuyerMessage.ChannelName}}</td>
                		</tr>
                		<tr>
                			<td class="tdRight">店铺 </td>
                			<td>{{messages.BuyerMessage.ShopName}}</td>
                		</tr>
                		<tr>
                			<td class="tdRight">主题 </td>
                			<td :title="messages.BuyerMessage.Subject">{{messages.BuyerMessage.Subject | truncationString 40}}<a  style="margin-left: 10px" href="https://signin.ebay.com.hk/ws/eBayISAPI.dll?SellItem">跳转平台</a></td>
                		</tr>   
                		<tr>
                			<td class="tdRight">接收时间</td>
                			<td>{{messages.BuyerMessage.ReceiveDate}}</td>
                		</tr>   
                		<tr>
                			<td class="tdRight">到期时间</td>
                			<td>{{messages.BuyerMessage.ExpirationDate}}</td>
                		</tr>                   		                		                		                		                		
                	</tbody>
                </table>
            </div>
			<div class="query-detail mes">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12" style="line-height:3;"  v-if="messages.BuyerMessage.Buyer">[{{messages.BuyerMessage.Buyer}}] {{messages.BuyerMessage.ReceiveDate}}</div>
						<div class="col-lg-10" style="padding:10px;background:#ccc;margin-left:15px;line-height:1.5;"  v-if="messages.BuyerMessage.Subject">{{messages.BuyerMessage.Subject}}</div>
						<div class="col-lg-12 text-right" style="line-height:3;" v-for="item in messages.ReplyMessages">[{{item.Code}}] {{item.ReceiveDate}}</div>
						<div class="col-lg-10 col-lg-offset-2" style="padding:10px;background:#ccc;line-height:1.5;" v-for="item in messages.ReplyMessages">{{item.Subject}}</div>
					</div>
				</div>
			</div>
<!--             <div class="query-detail mes">
                <div class="container-fluid" v-if="messages.BuyerMessage.Content">
                    <div>
                        {{'[' +  messages.BuyerMessage.Buyer + ']' + messages.BuyerMessage.ReceiveDate}}
                    </div>
                    <div class="buyer" v-if="messages.BuyerMessage.Subject">
                        
                        <span>{{messages.BuyerMessage.Subject }}</span>
                    </div>
                    

                    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content" v-html="messages.BuyerMessage.Content">
                          ...
                        </div>
                      </div>
                    </div>

                </div>
                <div class="container-fluid" style="margin-left: 168px;" v-if="index" v-for="(index,item) in messages.ReplyMessages">
                    <div v-if="item.Code || item.ReceiveDate" style="text-align: right">
                            {{'[' +  item.Code + ']' + item.ReceiveDate}}
                    </div>
                    <div class="server" v-if="item.Content" v-html="item.Content">                  
                    </div>                  
                </div>
            </div> -->
			<div class="query-detail liebiao">
			    <div class="nav-span clearfix">
			    	<span style="width: 100%" @click="onClickShow(1)" :class="{'active':showIndex ==1}">关联订单</span>
			    	<!-- <span style="width: 50%" @click="onClickShow(2)" :class="{'active':showIndex ==2}">操作日志</span> -->
			    </div>
			    <div class="tab-div">
			    	<div class="container-fluid dis-hide text-center" :class="{'show-hide':showIndex ==1}">
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
				    					<!-- <td>{{order.PayTime | limitBy 9 2}}</td> -->
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
				    		<table class="table table-bordered table-hover text-center">
				    		     <tbody>
				    		     	<tr>
				    		     		<td class="text-center">SKU</td>
				    		     		<td>商品名称</td>
				    		     		<td>商品尺码</td>
				    		     		<td>商品颜色</td>
				    		     		<td>吊牌价</td>
				    		     		<td>可用库存</td>
				    		     		<td>购买数量</td>
				    		     		<td>实际售价</td>
				    		     	</tr>
				    		     </tbody>
				    			<tbody>
				    				<tr v-for="item in order.OrderItems">
				    					<td>{{item.Barcode.CustomBC}}</td>
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
			    		<div class="null" v-else>暂无关联订单</div>
			    	</div>
			    	<div class="container-fluid dis-hide" :class="{'show-hide':showIndex ==2}">
			    		<div class="null" v-else>暂无关联订单</div>
			    		<!-- <table class="table table-bordered" style="margin-top:20px;text-align:center">
			    			<thead>
			    				<tr>
			    					<td>操作时间</td>
			    					<td>操作人</td>
			    					<td>操作记录</td>
			    				</tr>			    				
			    			</thead>
			    			<tbody>
			    				<tr v-for="n in 1">
			    					<td>1</td>
			    					<td>1</td>
			    					<td>1</td>
			    				</tr>
			    			</tbody>

			    		</table> -->
					</div>
			    </div>

			</div>
			<div class="clearfix query-detail">
				<div class="dropdown pull-left left-10p">
				<a v-link="{name : 'msgBlacklist'}" class="btn btn-default pull-left left-10p">关闭</a>
						
			</div>
        </div>        
	</div>
</template>
<script>
import commonMethods from '../../../js/common';
import servers from '../../../js/servers/servers';
var megManageCode = require('../../../globalConstants').megManageCode;
    module.exports = {
    	data() {
    		return {
    			showIndex: 1,
    			messages: {
    				BuyerMessage: {
    					Buyer: '',
    					MessageID: '',
    					Subject: '',
    					ReceiveDate: '',
    					ExpirationDate: '',
    					ShopName:'',
    				},
    				ReplyMessages: [],
    			},
    			buyer:'',//卖家名称
    			order: {
    				Shop:{},
    				Stock:{},
    				OrderFlag:{
    					MerchantDelivery:{
    						Name: ''
    					}
    				},
    				OrderBusiness: {}
    			},//关联订单数据
    			Tid: '',
    			query: {
    				ID: '',
    				Sheet: []
    			},

    		}
    	},
    	ready() {
    		this.queryMessages()
    	},
    	methods:{
            queryMessages() {
                const self = this;
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasBuyerBlackList/QueryBuyerMessages',
                   data: {
                        buyer: self.buyer  
                    },
                    success(result) {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            self.messages = result.Data
                            self.queryOrder(self.messages.BuyerMessage)//执行关联订单并传Tid
                        }
                    }
                })

            },
            //关联订单
            queryOrder(tid) {
                const self = this;
                self.query.ID = tid.CustomerOrderID
                self.query.Sheet.push(tid.Tid) 
                if(self.query.ID ==null || self.query.Sheet == null) {
                	return
                }
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BusCustomerOrder/ErpQueryCustomerOrderTempByID',
                   	data: self.query,
                    success(result) {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            self.order = result.Data
                        }else{
                        	self.order = {}
                        }
                    }
                })

            },
    		onClickShow:function(index) {
    			this.showIndex = index;
    		},
    	},
    	route:{
    		data:function(transition){
    			var self = this;
    			var buyer = transition.to.query.Buyer;
    			self.buyer = buyer;
    		}
    	},
    }	

</script>
<style>
.null {
	height: 200px;
	font-size: 14px;
	text-align: center;
	line-height: 200px;
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
	border-bottom: 1px solid #ccc;

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
	background-color: #fff;
}
.liebiao {
	border: 1px solid #ddd;
	margin-top: 20px;
	padding-top: 0px;
	padding-bottom: 10px;
}
.mes {
	border:1px solid #ddd;
	max-height: 500px;
	overflow: auto;
	padding: 20px 15px 20px 15px;
}	
</style>
