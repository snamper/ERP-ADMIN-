<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">回复编码<span class="form-required-mark">*</span></label>
                        <input v-model="submit.Code" type="text" class="form-control" placeholder="" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">回复标题<span class="form-required-mark">*</span></label>
                        <input v-model="submit.Title" type="text" class="form-control" placeholder="" required >
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">回复内容<span class="form-required-mark">*</span></label>
                        <textarea v-model="submit.Content" class="form-control" rows="10"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">常用字段</label>
                        <div class="insertDiv">
                            <ul>
                                <li><a href="javascript:void(0)" @click="insertToContent('1')">[插入]</a> {{insertContent.buyerName}}</li>
                                <li><a href="javascript:void(0)" @click="insertToContent('2')">[插入]</a> {{insertContent.customServiceCode}}</li>
                                <li><a href="javascript:void(0)" @click="insertToContent('3')">[插入]</a> {{insertContent.solderName}}</li>
                                <li><a href="javascript:void(0)" @click="insertToContent('4')">[插入]</a> {{insertContent.date}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea  class="form-control" rows="10" v-model="submit.Note"></textarea>
                    </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="saveBtn btn btn-success" @click="saveMsg">保存</a>
                        <!--<a href="javascript:void(0)" style="margin-left: 270px" class="btn btn-warning" >清空</a>-->
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
                title:'',
                QuickReplyID:"",
                submit:{ 
                    Code: "",
                    Title: "",
                    Content: "",
                    Status: 0,
                    Note: ""
                },
                insertContent:{
                    buyerName:'[买家姓名]',
                    customServiceCode:'[客户编号]',
                    solderName:'[商家名称]',
                    date:'[系统日期]',
                },
                
            }
        },
        methods: {
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
             //清空数据
            resetForm: function () {
                this.submit= {
                    Code: "",
                    Title: "",
                    Content: "",
                    Status: 0,
                    Note: ""
                };
                // this.insertContent={
                //     buyerName:'',
                //     customServiceCode:'',
                //     solderName:'',
                //     date:'',
                // }
            },
            //保存新增快递及修改快递
            saveMsg: function () {
                var self = this;
                var errorMsg ='';
                var errorFlag =false;
                //以下内容为淡心芜添加得,徐经纬进行了修改
                if(self.submit.Note==null){
                    self.submit.Note='';
                }
                if(self.submit.Code.length>16 || self.submit.Title.length>16) {
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-16个字符！'
                    })
                    return
                }
                if(self.submit.Content.length>1000) {
                    console.info("内容长度："+self.submit.Content.length)
                    self.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请输入2-1000个字符！'
                    })
                    return
                }
                // if(self.submit.Note.length>255) {
                //     alert(self.submit.Note.length)
                //     self.$dispatch('transmit','tip',{
                //         name: '提示',
                //         contentText: '请输入1-255个字符！'
                //     })
                //     return
                // }
                //以上内容为淡心芜添加得 
                if(self.submit.Code==''){
                    errorMsg+='回复编码不能为空  ',
                    errorFlag = true;
                }else if(self.submit.Title==''){
                    errorMsg+='回复标题不能为空  ',
                    errorFlag = true;
                }else if(self.submit.Content==''){
                    errorMsg+='回复内容不能为空  ',
                    errorFlag = true;
                }
                if(errorFlag){
                    self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: errorMsg
                        });
                    return false;
                }
                var data = self.submit;
                data.QuickReplyID= self.QuickReplyID;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQuickReply/SaveBasQuickReply',
                    data: data
                }).done(function (result) {
                    NProgress.done();
                    if ( result.ResultCode == 1 ) {
                        self.resetForm();
                        self.$dispatch('transmit','tip',{
                            name: '成功保存:',
                            contentText: '成功保存!'
                        });
                    }
                });
            },
            //把相关数据插入到content里面
            insertToContent: function(number){
                var param ='';
                if(number=='1'){
                    param = this.insertContent.buyerName;

                }
                if(number=='2'){
                    param = this.insertContent.customServiceCode;
                }
                if(number=='3'){
                    param = this.insertContent.solderName;
                }
                if(number=='4'){
                    param = this.insertContent.date;
                }
                this.submit.Content+=param;
            },
            
           
        },

        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                var query = transition.to.query;
                console.info(query.replyId);
                self.title='新增回复'; 
                if(query.replyId){
                    self.title='修改回复';       
                    self.QuickReplyID = query.replyId;
                    servers.getAjax.bind(this)({
                    url: '/BasQuickReply/QueryBasQuickReplyById',
                    data: {
                        Id: self.QuickReplyID
                    }
                }).done(function(result) {
                    if (result.ResultCode == 1 ) {
                        let data = result.Data
                        console.info(result.Data);
                        self.submit.Code = data.Code
                        self.submit.Title = data.Title
                        self.submit.Content = data.Content
                        self.submit.Status = data.Status
                        self.submit.Note = data.Note
                    }
                });
                }
                 
                
            }
        },
        ready: function () {
            //this.getBaseLookUp();
        },
        components: {
            statusCheckbox: require('../../../components/status-checkbox.vue'),
            modal: require('../../../components/modal.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
.form-group  {
    margin: 20px 0;
}
.form-control {
    margin-top:6px; 
}
.insertDiv{
    flex: 1;
    width: 100%;
    margin-left: 24px;
}
.insertDiv ul li{
 margin:0 0 10px 0; 
}
.saveBtn{
    width: 150px;
    height: 42px;
    margin: 0 0 0 110px;
    line-height: 31px;
}
</style>
