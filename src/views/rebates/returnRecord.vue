<template>
    <div class="sheet-list sell-scanning-show row return-record">
        <div class="headline-hd scan-record flow-hd12">
            <span>返还记录</span><br/>
            <span>代理代码:{{query.Name}}</span>

        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>操作人</th>
                    <th>返还金额</th>
                    <th>累计返还</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in dealFlowList">
                    <td>{{opt.CreateTime | formatDateFormShow}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" v-link="{name: 'rebates'}">返回列表>></a>
        </div>
    </div>

</template>

<script>
    var servers = require('../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
            }
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .return-record {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>