<template>
    <div class="container-fluid">
        <div v-for="opt in pic" class="auto-pic" v-show="pic.length > 0"><img :src="opt"></div>
        <div class="auto-pic" v-show="pic.length === 0">没有上传凭证</div>
    </div>
</template>


<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                pic: [], //凭证路径
                href: '', //当前域名
                show: false, //是否没有上传凭证
            }
        },
        methods: {
            //查看充值凭证
            view(id) {
                var self = this;
                servers.postAjax.bind(this)({
                    url: 'ImportImage/QueryImages',
                    data: {ID: id}
                },'/').done(function(result) {
                    debugger
                    if (result.ResultCode == 1) {
                        if(result.Data) {
                            var strs = result.Data.split(","); //字符分割
                            var i=0;
                            for (i=0;i<strs.length ;i++ )
                            {
                                self.pic.push(strs[i]); //分割后的字符输出
                            }
                            this.show = true;
                        } else {
                            self.pic = [];
                            this.show = false;
                        }
//                        self.pic = ['80957596-5375-4b67-b69c-3e02604696b6.jpg','80957596-5375-4b67-b69c-3e02604696b5.jpg'];
                        console.log(self.pic);
                    }
                });
            }

        },
        route: {
            data({to}) {
                var id = to.query.id;
                this.view(id);
                this.href = window.location.host
//                this.href = 'http://192.168.88.25:888/'

            }
        },
    };

</script>
-
<style rel="stylesheet/less" lang="less" >
.auto-pic{
    width: 50%;
    margin: 0 auto;
    img {
        width: 100%;
        height: auto;
        margin-bottom: 30px;
    }
}
</style>

