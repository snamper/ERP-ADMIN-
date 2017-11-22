<template>
    <div class="login-form find-password login-form-monroe">
        <form>
            <div class="input-group form-group">
                <span class="input-group-addon">邮箱地址</span>
                <input type="text" class="form-control" placeholder="请输入邮箱地址">
            </div>
            <div class="form-inline id-code form-group">
                <div class="input-group">
                    <span class="input-group-addon">&nbsp;&nbsp;验证码&nbsp;&nbsp;</span>
                    <input type="password" class="form-control" placeholder="请输入密码">
                </div>
                <a href="javascript:void(0)" class="btn-id-code btn btn-info"><img src="../../images/dynamic/id-code.png"/></a>
            </div>
            <a href="javascript:void(0)" class="btn btn-warning btn-full">发送重置邮件</a>
            <a v-link="{ name: 'login' }" class="btn btn-link">已有账号？立即登录>></a>
        </form>
    </div>
</template>

<script>

</script>

<style lang="less" rel="stylesheet/less">
    .find-password {
        .id-code {
            .form-control {
                width: 108px;
            }
            .btn-id-code {
                background: #ff9000;
                border: 1px solid #ff9000;
                &:hover {
                    opacity: 0.8;
                 }
            }
        }
    }
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

    .btn-id-code{
        margin-top:-16px;
    }

}
</style>
