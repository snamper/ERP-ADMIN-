<template>
    <div class="container-fluid">
        <div class="checkbox-group">
            <label class="checkbox-title">
                配置快递不到区域
            </label>
        </div>
        <div class="row">
            <div class="col-sm-12 mainContent">
                <div class="operate-form-buttons addDiv">
                        <a @click="addChoose" href="javascript:void(0)" class="btn btn-default addBtn">增加</a>     
                </div>
                <div class="operate-form-list ">
                    <div class="form-group form-limit-width">
                        <span class="rowTitle" style="font-weight: 900">不到地区</span>
                        <span class="rowTitle">关键字</span>
                        <span class="rowTitle" style="font-weight: 900">操作</span>
                        
                    </div>
                    <div class="form-group form-limit-width" style="border-bottom: 2px solid #d9d9d9;min-height: 0px;margin-bottom: 20px"></div>
                    <div class="place-content" >
                        <div v-for="(index,value) in gettedPlaceList" track-by="$index">
                            <div class="form-group form-limit-colum">
                                <!--<select class="colum form-colum select" v-model="value.select" >
                                    <option value="">请选择</option>
                                    <option v-for="one in options" value="{{one.age}}">{{one.name}}</option>
                                </select>-->
                                <div class="colum form-colum select">
                                <select-area :state-id.sync="value.StateID" :city-id.sync="value.CityID" :district-id.sync="value.DistrictID" :state.sync="value.State" :city.sync="value.City" :district.sync="value.District"></select-area>
                                <!--<select class="colum form-colum select" v-model="value.select" >
                                    <option value="">请选择</option>
                                    <option v-for="one in options" value="{{one.age}}">{{one.name}}</option>
                                </select>-->
                                </div>
                                <input  type="text" class="colum form-colum key" placeholder="" value="{{value.UnsendAddress}}" required>
                                <label class="colum delete" @click="remove(index,'get')">删除</label>
                            </div>
                        </div>
                        <div v-for="(index,value) in newPlaceCount" track-by="$index">
                            <div class="form-group form-limit-colum">
                                <!--<select class="colum form-colum select" v-model="value.select" >
                                    <option value="">请选择</option>
                                    <option v-for="one in options" value="{{one.age}}">{{one.name}}</option>
                                </select>-->
                                <div class="colum form-colum select">
                                <select-area :state-id.sync="value.StateID" :city-id.sync="value.CityID" :district-id.sync="value.DistrictID" :state.sync="value.State" :city.sync="value.City" :district.sync="value.District"></select-area>
                                <!--<select class="colum form-colum select" v-model="value.select" >
                                    <option value="">请选择</option>
                                    <option v-for="one in options" value="{{one.age}}">{{one.name}}</option>
                                </select>-->
                                </div>
                                <input  type="text" class="colum form-colum key" placeholder="" v-model="value.UnsendAddress" required>
                                <label class="colum delete" @click="remove(index,'new')">删除</label>
                            </div>
                    </div>
                    </div>
                    <div style="margin-left:24px ">
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="checkbox-group">
            <a @click="save" href="javascript:void(0)" style="margin: 0px 0 0 32px;" class="btn btn-default addBtn">保存</a>
        </div>
    </div>
</template>

<script >
    var servers= require('../../../js/servers/servers');
    var actions = require('../../../js/vuex/actions');
    var getters = require('../../../js/vuex/getters');
    var typeOrder = require('../../../js/vuex/modules/typeOrder');
    var NProgress = servers.NProgress;
    module.exports={
        data:function(){
            return {
                //记录查询数量
                count:0,
                gettedPlaceList:[
                    // //测试数据
                    // {
                    //     //StateID:1,
                    //     State:'湖北'
                    // },
                    // {
                    //     //StateID:2,
                    //     State:'广东'
                    // },
                ],
                newPlaceCount:[],
                MerchantDeliveryID:'',
                // place:{
                //     sel:'11',
                // },
                paginationOptions: {
                        all: 1,
                        cur: 1,
                        pageSize: 15,
                        totalRecords: 0
                },
            }
        },
        vuex: {
           actions: {
               updateTypeOrderCustomerOrderItem: actions.updateTypeOrderCustomerOrderItem,
               resetCustomerOrderItem: actions.resetCustomerOrderItem
           },
            getters: {
                getTypeOrderCustomerOrderItem: getters.getTypeOrderCustomerOrderItem,
            }
        },
        computed:{
            customerOrderItem: {
                get: function () {
                    return this.getTypeOrderCustomerOrderItem;
                },
                set: function (customerOrderItem) {
                    this.updateTypeOrderCustomerOrderItem(customerOrderItem);
                }
            },
        },
        methods:{
            //重置
            reset: function () {
                this.newPlaceCount=[];
                this.gettedPlaceList=[];
                this.paginationOptions={
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                }
            },
            //时间类型
            formateDate: function (val) {
                var date = new Date(val);
                var year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate(),
                        hours = date.getHours(),
                        minutes = date.getMinutes(),
                        seconds = date.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            },
            //新增
            addChoose:function(){
                var  object = new Object(); 
                //object.customerOrder = this.customerOrderItem;
                object.UnsendAddress='';
                object.DeliveryUnsendZoneID='';
                object.MerchantDeliveryID=this.MerchantDeliveryID;
                this.newPlaceCount.push(object); 
            },
            //删除
            remove:function(index,type){
                var self = this;
                var list=null;
                var flag =false;
                if(type=="get"){
                    list= this.gettedPlaceList;
                    var one = list[index];
                    servers.postAjax.bind(this)({
                        url: '/BasDelivery/ErpDelBasDeliveryUnsendZone',
                        contentType: 'application/json',
                        data: JSON.stringify(one),
                    }).done(function(result) {
                        console.info(result);
                        if (result.ResultCode == 1 ) {
                            self.getPlaceList();
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '删除成功'
                            });
                            //self.gettedPlaceList = result.Data.PageData;
                        }
                    });
                }else if(type=="new"){
                     flag =true;
                    list= this.newPlaceCount;
                }
                list.splice(index,1);
            },
            //保存
            save:function(){
                var self = this;
                let dataList= new Array();
                // data.push(this.newPlaceCount);
                // data.push(this.gettedPlaceList);
                if(this.newPlaceCount.length>=this.gettedPlaceList.length){
                    dataList=this.newPlaceCount.concat(this.gettedPlaceList);
                }else {
                   dataList=this.gettedPlaceList.concat(this.newPlaceCount);
                }
                if(!dataList.length>0){
                    self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '请添加地区信息'
                    });
                    return false;
                }
                console.info(dataList);
                var returnData= {"":'',"":'',"":'',"":'',"":'',"":''}
                servers.postAjax.bind(this)({
                        url: '/BasDelivery/ErpSaveBasDeliveryUnsendZone',
                        contentType: 'application/json',
                        data: JSON.stringify(dataList)
                    }).done(function(result) {
                        console.info(result);
                        if (result.ResultCode == 1 ) {
                            self.reset();
                            self.getPlaceList();
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '保存成功'
                            });
                            
                            //self.gettedPlaceList = result.Data.PageData;
                        }
                    });
            },
            //获取列表
            getPlaceList:function(){
                var self = this;
                console.info(this.MerchantDeliveryID);
                NProgress.start();
                servers.postAjax.bind(this)({
                    url:'/BasDelivery/GetBasDeliveryUnsendZoneList',
                    //contentType: 'application/json',
                    data: {
                        // MerchantDeliveryID: self.MerchantDeliveryID,
                        pageSize: self.paginationOptions.pageSize,
                        pageNumber: self.paginationOptions.cur,
                        SearchWhere:
                            {
                                "MerchantDeliveryID":self.MerchantDeliveryID
                            }
                    }
                }).done(function(result) {
                    NProgress.done();
                    console.info(result);
                    if (result.ResultCode == 1 ) {
                        let pageDataList = result.Data.PageData;
                        self.gettedPlaceList =pageDataList ;
                        if (pageDataList.length > 0) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        } else {
                             self.paginationOptions={
                                    all: 1,
                                    cur: 1,
                                    pageSize: 15,
                                    totalRecords: 0
                                };
                        //    self.$dispatch('transmit','tip',{
                        //        name: '提示',
                        //        contentText: '结果为空'
                        //    });
                        }
                    }
                });
            },

        },
        route: {
            data: function (transition) {
                console.info("data");
                this.MerchantDeliveryID = transition.to.query.id;
                this.getPlaceList();
                console.info(this.paginationOptions.totalRecords+2+"---")
                // this.getCourier();
                //this.getMerchantDeliveryList();
                transition.next();
            },
        },
        components: {
            pagination: require('../../../components/pagination.vue'),
            selectArea: require('../../../components/select-area.vue'),
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getPlaceList();
            },
            // 'statusChange': function(status,id) {
            //     this.StatusChange(status,id);
            // }
        },
        ready:function(){
            // console.info("ready");
            // console.info(this.paginationOptions.totalRecords);
            // if (this.customerOrderID) {
            //     console.info("if");
            //     this.getCustomerOrder(this.customerOrderID);
            // } else {
            //     console.info("else");  
            //     //this.customerOrder = this.getTypeOrderCustomerOrderItem;
            //     this.customerOrder = this.customerOrderItem;
            //     this.customerOrder.PayTime = this.formateDate(new Date());
            // }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">

.operate-form-list{
   .form-group-select{
    &.form-group{
        display:inline-block;
    }
    .entrepot-select{
            float:right;
            margin-left:10px;
        .form-control{
                float:left;
                margin-left:15px;
        }
    }
}
}
.checkbox-btn{
    margin-left:22px;
    line-height:42px;

}
.mainContent{
    width: 44%;
    min-width: 580px;
    border:2px solid #e5e5e5;
    border-radius: 7px;
}
.addDiv{
    width: 520px;
    height: 80px;
}
.addBtn{
    margin: 5% 0 0 32px;
    width: 100px;
    height: 30px;
    line-height: 1.5em;
}
.colum,.rowTitle{
    display: block;
    margin: 0 auto;
}
.form-limit-width{
    margin-left:17px;
    padding-left: 70px;
}
.form-limit-colum{
    width: 540px;
}
.form-colum{
    display: block;
    margin: 0 auto;
    height: 29px;
    padding: 2px 18px;
    font-size: 12px;
    line-height: 1.02857143;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.select{
    display: flex;
    border: none;
    width: 270px;
    margin-left: 16px;
    margin-right: 17px;
    margin-bottom: 10px;
}
.key{
    padding: 2px 0px;
    width: 119px ;
    margin-left: 0px;
    height: 25px;
}
.delete{
    line-height: 1.5em;
    margin-left: 29px;
    cursor:pointer;
}
</style>
