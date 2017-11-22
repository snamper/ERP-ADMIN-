<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>新增客服</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">客服编码<span class="form-required-mark">*</span></label>
                        <input v-model="delivery.Code" type="text" class="form-control" placeholder="" required >
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">对应员工<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="delivery.LoginID">
                            <option value="">不限</option>
                            <option v-for="item in loginList" v-bind:value="item.LoginID">{{item.Name}}</option>
                        </select>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text">负责平台<span class="form-required-mark">*</span></label>
                        <select class="form-control" v-model="delivery.ChannelID">
                            <option value="">不限</option>
                            <option v-for="item in channelList" v-bind:value="item.ChannelID">{{item.Name}}</option>
                        </select>
                    </div>
                <div class="dade">
                    
                
                    <div class="divFloat min520">
                        <label class="form-group-text leftFloat">负责店铺<span class="form-required-mark">*</span></label>

                        <div class="positi">
                            <span v-for="(index,item) in NetShopIDLIts" class="check-span" @click="onClickShift(index)">{{item.value}} &times;</span>
                        </div>

                        <div class="form-control myDiv">
                          <button class="dropdown-toggle btnXiaLa" type="button" id="dropdownMenu1" style="text-align: left;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          请先选择负责店铺 
                            <span class="caret rightPosition"></span>
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li v-for="item in shopList"><a href="javascript:void(0)" @click="chooseMedicine(item)">{{item.Name}}</a></li>
                          </ul>
                        </div>

                    </div>

                </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="delivery.Note" class="form-control" rows="10"></textarea>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="btn btn-success" @click="erpSaveCustomService">保存</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                delivery: {
                    Code: '',//客服编号
                    LoginID: '',//对应员工
                    ChannelID: '',//平台
                    ShopIDList: [],//店铺
                    Note: ''//备注
                },
                loginList:[],//对应员工下拉
                channelList:[],//负责平台希腊
                shopList:[],//负责店铺下拉
                NetShopIDLIts:[],//负责店铺多选
            }
        },
        methods: {
            chooseMedicine: function(obj){
                var $this = this;
                $this.NetShopIDLIts.push({
                    NetShopID:obj.ShopID,
                    value:obj.Name
                })
            },
            onClickShift:function(index){
                console.log(index)
                var $this = this;
                $this.NetShopIDLIts.splice(index,1);
            },  
            /**
             * 查询数据
             */       
            //保存新增客服
            erpSaveCustomService : function () {

                var self = this;

                if(self.NetShopIDLIts) {
                    self.NetShopIDLIts.forEach(function(obj){
                        self.delivery.ShopIDList.push(obj.NetShopID)
                    })
                }
                if(self.delivery.Code.length<2 || self.delivery.Code.length>16) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入2-16个字符！!'
                    });     
                    return;                      
                }


                

                if(self.delivery.Code == '' || self.delivery.LoginID == '' || self.delivery.ChannelID == '' || self.delivery.ShopIDList.length == 0 ) {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '必填项不能为空!'
                    });     
                    return;               
                }

                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasCustomService/ErpSaveCustomService',
                    data: self.delivery
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.resetForm();
                        self.NetShopIDLIts = [];
                        self.$dispatch('transmit','tip',{
                            name: '新增成功:',
                            contentText: '新增成功!'
                        });
                    }
                });
            },
            //对应员工下拉
            getLoginerList(){
                var $this = this;
                //this.choiceParams();
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetLoginerList'
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        $this.loginList = result.Data;
                        
                    }
                });
            },          
            //负责平台下拉
            getChannelList (){
                var $this = this;
                //this.choiceParams();
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetChannelList'
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        $this.channelList = result.Data;
                        
                    }
                });
            },
            //负责店铺下拉
            getShopList  (){
                var $this = this;
                //this.choiceParams();
                NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetNetShopList'
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        $this.shopList = result.Data;
                        
                    }
                });
            },
            //清空数据
            resetForm: function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.delivery = {
                    Code: '',//客服编号
                    LoginID: '',//对应员工
                    ChannelID: '',//平台
                    customServiceShopList: [],//店铺
                    Note: ''//备注
                    };
                }
            }
        },
        ready: function () {
            //this.getBaseLookUp();
            this.getLoginerList();
            this.getChannelList();
            this.getShopList();
        },
        route: {
            data: function (transition) {

            }
        },  
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue'),
            modal: require('../../../components/modal.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 5px dashed;
    border-top: 4px solid \9;
    border-right: 3px solid transparent;
    border-left: 3px solid transparent;
}

.leftFloat {
    float: left;
}
.dade:after {
    content: '';
    display: block;
    clear: both;
}
.min520 {
    min-width: 520px !important;
}
.dropdown-menu {
    top: 20px;
    left: 0;
    width: 100%;
}
.rightPosition {
    position: absolute;
    right: 7px;
    top: 7px;
}
.btnXiaLa {
    width: 100%;
    border: none;
    height: 20px;
    background-color: #fff;
    position: relative;
}
.myDiv:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
    background-color: #fff;
}
.myDiv {
    margin-left: 0px !important;
    float: left;
    width: 23%;
    position: relative;
}
.form-group  {
    margin: 20px 0;
}
.operate-form-list .form-limit-width {
    position: relative;
    min-width: 520px;
}
.positi {
    /* position: absolute; */
    float: left;
    min-width: 0px !important;
    height: 22px;
    border: none;
    margin-left: 24px;
    line-height: 22px;
    z-index: 999;
/*     top: 1px; */
    margin-top: 1px;
    .check-span {
        height: 20px;
        padding: 0px 10px;
        font-size: 12px;
        color: #555555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;        
    }
}
</style>
