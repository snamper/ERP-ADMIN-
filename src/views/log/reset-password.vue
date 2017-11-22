<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>重置登录密码</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">原密码<span class="form-required-mark">*</span></label>
                        <input v-model="orPassword" type="password" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">输入新密码<span class="form-required-mark">*</span></label>
                        <input v-model="password" type="password" class="form-control" placeholder="" required>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">确认密码<span class="form-required-mark">*</span></label>
                        <input v-model="rePassword" type="password" class="form-control" placeholder="" required>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="saveNewPassword">修改</a>
                        <!--<a @click="reLogin" href="javascript:void(0)" class="btn btn-default">重新登录</a>-->
                        <a @click="goBack" href="javascript:void(0)" class="btn btn-default">返回</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var cookie = require('js-cookie');
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                orPassword: '',
                password: '',
                rePassword: '',
                userID: '',
                redirect: ''
            }
        },
        methods: {
            //保存新密码
            saveNewPassword: function () {
                var self = this;
                var password = self.password;
                var rePassword = self.rePassword;
                var orPassword = self.orPassword; //原密码
                if (orPassword) {
                    if (password) {
                        if (password.length > 64) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '密码太长'
                            });
                        } else if (password == rePassword) {
                            NProgress.start();
                            servers.postAjax.bind(this)({
                                url: '/Account/ErpLoginUpdatePassword ',
                                data: {
                                    OldPassword: self.orPassword,
                                    LoginID: self.userID,
                                    Password: password,
                                    ConfirmPassword: rePassword
                                }
                            }).done(function (result) {
                                NProgress.done();
                                if (result.ResultCode == 1) {
                                    self.$dispatch('transmit','tip',{
                                        name: '提示:',
                                        contentText: '密码修改成功!'
                                    });
                                    cookie.remove('userName');
                                    cookie.remove('userID');
                                    self.$router.go({name:'login'});
                                }
                            })
                        } else {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: '两次输入的密码不一致'
                            });
                        }
                    } else {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '请输入新密码'
                        });
                    }
                } else {
                    self.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '请输入原密码'
                    });
                }

            },
            //重新登录
            reLogin: function () {
                cookie.remove('userName');
                cookie.remove('userID');
                this.$route.router.go({name:'login'});
            },
            //返回
            goBack: function () {
                if (this.redirect == 'undefined') {
                    this.$route.router.go({
                        path: '/'
                    });
                } else {
                    this.$route.router.go({
                        path:this.redirect
                    });
                }
            }
        },
        route: {
            data: function (transition) {
                this.userID = cookie.get('userID');
                this.redirect = transition.from.path;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>