<template>
	<div class="container-fluid" style="width: 50%">
        <div class="unify-head">
            回复消息
        </div>

        <div class="query-form bom20 clearfix">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        回复消息
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
                			<td title="{{channelMessageDetailList.Subject}}">{{channelMessageDetailList.Subject | truncationString 40}}</td>
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
                    <div class="buyer" v-if="contenList0.Content">
                        
                        <span>{{channelMessageDetailList.Subject | truncationString 40}}</span>
                        <span data-toggle="modal" data-target=".bs-example-modal-lg">【<a href="javascript:;">打开页面</a>】</span>
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
			    	<span @click="onClickShow(1)" :class="{'active':showIndex ==1}">回复消息</span>
			    	<span style="width: 34%" @click="onClickShow(2)" :class="{'active':showIndex ==2}">关联订单</span>
			    	<span @click="onClickShow(1)" :class="{'active':showIndex ==3}">操作日志</span>
			    </div>

			    <div class="tab-div">
			    	<div class="container-fluid clearfix dis-hide" :class="{'show-hide':showIndex ==1}">

					<textarea name="" placeholder="请输入您要回复的内容" v-model="Content"></textarea>

					<!-- <button type="" class="btn btn-default pull-left disabled">插入图片</button> -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <select  class="form-control" @change="obnChangeMsg($event,value)">
                            <option value="">快捷回复</option>
                            <option  v-for="item in QuickReply" v-bind:value="item.Content">{{item.Title}}</option>}
                            option
                        </select>
                    </div> 


							<button type="" @click="erpSaveChannelMessage" class="btn btn-default pull-right ">回复</button>
				    </div>


			    	<div class="container-fluid dis-hide" :class="{'show-hide':showIndex ==2}">
                        <div v-if="order.Shop == ''">                       
    			    	    <div class="pad10px">业务类型</div>
    			    		<table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td class="bg5">订单类型</td>
                                        <td title="order.OrderTypeDesc">{{order.OrderTypeDesc | truncationString }}</td>
                                        <td  class="bg5">业务类型</td>
                                        <td title="order.PurchaseFlagDesc">{{order.PurchaseFlagDesc | truncationString }}</td>                                 
                                    </tr>
                                </tbody>
    			    		</table>
    			    		<div class="pad10px">订单信息</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td  class="bg5">外部单号</td>
                                        <td title="order.OutSheetID">{{order.OutSheetID | truncationString }}</td>
                                        <td  class="bg5">销售渠道</td>
                                        <td title=""></td>
                                        <td  class="bg5">店铺</td>
                                        <td title="order.Shop.Name">{{order.Shop.Name | truncationString }}</td>

                                    </tr>
                                    <tr>
                                        <td  class="bg5">仓库</td>
                                        <td title="">{{order.Stock.Name}}</td>
                                        <td  class="bg5">快递</td>
                                        <td title="">{{order.OrderFlag.MerchantDelivery ? order.OrderFlag.MerchantDelivery.Name :'' | truncationString }}</td>
                                        <td  class="bg5">买家姓名</td>
                                        <td title="">{{order.LinkMan}}</td>
                                    </tr>
                                </tbody>
                            </table>

    			    		<div class="pad10px">支付信息</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr> 
                                        <td  class="bg5">支付方式</td>
                                        <td>{{order.PayModeDesc | truncationString }}</td>
                                        <td  class="bg5">支付流水</td>
                                        <td>{{order.BusCustomerOrderDetail ? order.BusCustomerOrderDetail.AlipayNo : ''}}</td>
                                        <td  class="bg5">支付时间</td>
                                        <td>{{order.PayTime | truncationString }}</td>
                                    </tr>
                                </tbody>
                            </table>
    			    		<div class="pad10px">
    			    			其他信息
    			    		</div>
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td  class="bg5">买家留言</td>
                                        <td>{{order.OrderBusiness.BuyerMessage | truncationString }}</td>
                                        <td   class="bg5">买家备注</td>
                                        <td>{{order.OrderBusiness.BuyerMemo | truncationString }}</td>
                                    </tr>
                                    <tr>
                                        <td  class="bg5">卖家留言</td>
                                        <td>{{order.OrderBusiness.BuyerMessage | truncationString }}</td>
                                        <td  class="bg5">卖家备注</td>
                                        <td>{{order.OrderBusiness.SellerMemo | truncationString }}</td>
                                    </tr>
                                </tbody>
                            </table>
    			    		<div class="pad10px">
    			    			商品清单
    			    		</div>
    			    		<table class="table table-bordered table-hover">
    			    		     <thead>
    			    		     	<tr>
    			    		     		<th   class="bg5">SKU</th>
    			    		     		<th   class="bg5">商品名称</th>
    			    		     		<th   class="bg5">商品尺码</th>
    			    		     		<th   class="bg5">商品颜色</th>
    			    		     		<th   class="bg5">吊牌价</th>
    			    		     		<th   class="bg5">渠道价</th>
    			    		     		<th   class="bg5">可用库存</th>
    			    		     		<th   class="bg5">购买数量</th>
    			    		     		<th   class="bg5">实际售价</th>

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
                        <div v-else style="text-align: center;line-height:100px;height: 100px">                             

                            暂无关联订单！

                        </div>   
			    	</div>

			    </div>

			</div>

			<div class="clearfix query-detail">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <select  class="form-control" v-model="channelMessageDetailList.MessageClassID">
                            <option value="00000000-0000-0000-0000-000000000000">消息分类</option>
                            <option  v-for="item in MessageClasse" v-bind:value="item.MessageClassID">{{item.Name}}</option>}
                            option
                        </select>
                    </div> 

                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <select  class="form-control" v-model="channelMessageDetailList.CustomServiceID">
                            <option value="00000000-0000-0000-0000-000000000000">改派客服</option>
                            <option  v-for="item in CustomService" v-bind:value="item.CustomServiceID">{{item.Code}}</option>}
                        </select>
                    </div> 

				<button type="" @click="saveerpSaveChannelMessage" class="btn btn-default pull-left left-10p">保存</button>			
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
                Content:'',//回复消息内容
    			showIndex:1,
    			channelMessageID:'',//消息ID
    			channelMessage:{},//回复客户的全部信息
                CustomServiceID:'',//客服ID
                MessageClassID:'',//消息分类ID
    			Tid:'',//关联订单ID
    			channelMessageDetailList:{

                },//消息详情数据
    			customerOrderTemp:[],//关联订单数据
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
    			MessageClasse:[],//消息分类数据
    			QuickReply:[],//快捷回复数据
    			CustomService:[],//改派客服
    			Tid:'',
    			contenList0:{},
                contenList1:[],
    			queryData:{
					ID: "",
					Sheet: [
					    
					  ]
    			},
    		}
    	},
    	methods:{
            obnChangeMsg:function(e){
                var self = this;
                 self.Content = e.target.value
            },
    		//tab切换
    		onClickShow:function(index) {
    			this.showIndex = index;
    		},
    		//回复按钮
    		erpSaveChannelMessage:function(){
                var $this = this;
                $this.channelMessage.Content = $this.Content;//内容
                $this.channelMessage.OperType = 1;//内容
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysChannelMessage/ErpSaveChannelMessage',
                    data:$this.channelMessage
                                                                    
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.queryChannelMessageDetai();
                        $this.Content = '';//清空文本域中内容
	                    $this.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '回复成功!'
	                    });


                    }
                })    			
    		},
    		//保存
    		saveerpSaveChannelMessage:function(){
                var $this = this;
                $this.channelMessage.ChannelMessageID = $this.channelMessageID;//这条消息的ID
                //return;
                $this.channelMessage.OperType = 0;//保存
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysChannelMessage/ErpSaveChannelMessage',
                    data:$this.channelMessage
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.queryChannelMessageDetai();

	                    $this.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '保存成功!'
	                    });                        
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
                        if(result.Data.length>0) {
                            
                            $this.channelMessageDetailList = result.Data[0];
                            $this.channelMessage = result.Data[0];
                            $this.contenList0 = result.Data[0];


                            $this.contenList1 = result.Data;
                            $this.queryData.ID = result.Data[0].CustomerOrderID
                            $this.queryData.Sheet.push(result.Data[0].Tid);
                            $this.erpQueryCustomerOrderTempByID();
                            $this.erpQueryAllBasQuickReply();                       
                        }
                    }
                })
            },
            //获取系统时间
            getNowFormatDate :function() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
                return currentdate;
            },
            //消息分类下拉列表
            getMessageClasses:function(){
                var $this = this;
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasMessageClass/GetMessageClasses'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.MessageClasse = result.Data;
                    }
                })
            },
            //快捷回复下拉列表
            erpQueryAllBasQuickReply:function(){
                var $this = this;
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BasQuickReply/ErpQueryAllBasQuickReply'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.QuickReply = result.Data;
                        $this.QuickReply.forEach((obj)=>{//按照[买家姓名][客户编号][商家名称][系统日期]替换
                                obj.Content = obj.Content.replace('买家姓名',$this.channelMessageDetailList.Buyer)
                                obj.Content = obj.Content.replace('客户编号',$this.channelMessageDetailList.Code)
                                obj.Content = obj.Content.replace('商家名称',$this.channelMessageDetailList.ShopName)
                                obj.Content = obj.Content.replace('系统日期',$this.getNowFormatDate())
                        })                      
                    }
                })
            },
            //改派客服下拉列表
            erpQueryAllCustomService :function(){
                var $this = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCustomService/ErpQueryAllCustomService'
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        $this.CustomService = result.Data;
                    }
                })
            },                       
    	},
    	ready:function(){
    		var $this = this;
    		$this.erpQueryAllCustomService();
    		$this.getMessageClasses();

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
	width: 33%;
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
