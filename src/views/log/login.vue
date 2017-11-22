<template>
    <div class="login-form login-form-monroe">
        <form>
            <div class="input-group form-group">
                <span class="input-group-addon">账号</span>
                <input v-model="account" type="text" class="form-control" placeholder="请输入账号">
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">密码</span>
                <input v-model="password" type="password" class="form-control" placeholder="请输入密码" @keyup.enter="login">
            </div>
            <a @click="login" href="javascript:void(0)" class="btn btn-warning btn-full">登录</a>
            <a v-link="{ name: 'find-password' }" class="btn btn-link">忘记密码？找回密码>></a>
        </form>
    </div>
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var cookie = require('js-cookie');
    var actions = require('../js/vuex/actions');
    module.exports = {
        data: function () {
            return {
                password: '',
                account: ''
            }
        },
        vuex: {
            actions: {
                clearTab: actions.clearTab   //清除tab
            }
        },
        methods: {
            login: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/Login/ErpLogin',
                    data: {
                        Login: self.account,
                        Password: self.password
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var userMessage = result.Data;
//                        var date = new Date( new Date().getTime() + 30*60*1000 );   //30分钟后过期
                        cookie.set('userName',userMessage.Name);
                        cookie.set('userID',userMessage.LoginID);
                        self.clearTab();

                        if (self.redirect) {
                            self.$route.router.go(self.redirect);
                        } else {
                            self.$route.router.go({path:'/'});
                        }
                    }
                })
            }
        },
        route: {
            data: function (transition) {
                this.redirect = transition.to.query.redirect;
            }
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
.login-form-monroe{
    .input-group{
        height: 34px;
        margin-bottom:15px;
        input{
            height: 34px;
            line-height:34px;
        }

    }
    .btn-full{
            height: 34px;
            display:block;
            padding:0;
            line-height:34px;
            font-size: 14px;
            margin-bottom:10px;
        }

}
.login-form{

    .input-group-addon{
        background: #8C98B8;
        color:#fff;
    }

}


</style>