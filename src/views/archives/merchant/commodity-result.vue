<template>
  <!--<div class="result">
      <div class="message">
        <h1>授权成功</h1>
      </div>
      <table>
        <tr>
          <td>
            key
          </td>
          <td>
            value
          </td>
        </tr>
        <tr>
          <td>
            key
          </td>
          <td>
            value
          </td>
        </tr>
        <tr>
          <td>
            key
          </td>
          <td>
            value
          </td>
        </tr>
      </table>
  </div>-->
  <div >
    <h1 class="title">{{message}}</h1>
 </div>
<div class="sheet-detail-wrap">
  <table class="keyValue table-condensed" >                       
      <tbody>
        <tr>
            <td><span>AppID</span></td>
            <td>{{form.AppID}}</td>
        </tr>
        <tr>
            <td><span>AuthenticateUrl</span></td>
            <td>{{form.AuthenticateUrl}}</td>
        </tr>
        <tr>
            <td><span>CertID</span></td>
            <td>{{form.CertID}}</td>
        </tr>
        <tr>
            <td><span>DevID</span></td>
            <td>{{form.DevID}}</td>
        </tr>
        <tr>
            <td><span>RuName</span></td>
            <td>{{form.RuName}}</td>
        </tr>
        <tr>
            <td><span>SessionID</span></td>
            <td>{{form.SessionID}}</td>
        </tr>
        <tr>
            <td><span>Token</span></td>
            <td>{{form.Token}}</td>
        </tr>
        <tr>
            <td><span>UserID</span></td>
            <td>{{form.UserID}}</td>
        </tr>
      </tbody>
    </table>
</div>
                                
</template>
<style>
  .title{
    margin: 0 auto;
    width: 20%;
    text-align: center;
    }
  .keyValue{
      margin: 0 auto;
      width: 40%;
    }
  td{border:solid #B0E2FF 0.5px; padding-left:10px;}

</style>
<script>

    var commonMethods = require('../../../js/common');
    var cookie = require('js-cookie');

    module.exports = {
        data: function () {
            return {
                form: [],
                shopkindList: [],
                message:'',
                server: require('../../../js/servers/servers')
            };
        },
        methods: {
            //查询
            querys: function (type) {
                var self = this;
                let ShopID = cookie.get('ShopID_cookie');
                let sessionId = cookie.get('sessionId_cookie');
                
                this.server.postAjax({
                     url: '/BasShop/ErpQueryEbayAutoToken',
                     data: {
                         SessionID : sessionId,
                         ShopID: ShopID
                     },
                     success: function (data) {
                       console.log(data)
                       if(data.ResultCode == '1') {
                          self.message='授权成功';
                          self.form = data.Data;
                       }else {
                         self.message='授权失败';
                       }
                        //  if (data.ResultCode === 1) {
                        //      self.$dispatch('transmit', 'tip', {contentText: '修改成功！'});
                        //     self.querys();
                        //  }
                     }
                 });
            }
        },

        ready: function () {
            this.querys();
        },

    }

</script>
