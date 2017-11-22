<template>
    <div class="sheet-list sell-scanning-show row re-record">
        <div class="headline-hd scan-record flow-hd12">
            <span>提成记录</span><br/>
            <span>代理代码:{{query.Name}}</span>

        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>操作人</th>
                    <th>提成金额</th>
                    <th>关联订单</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in dealFlowList">
                    <!--<td><span data-toggle="tooltip" data-placement="top" title="{{opt.CreateTime | truncationTimeString}}">{{opt.CreateTime | formatDateFormShow}}</span></td>-->
                    <td>{{opt.CreateTime | truncationTimeString}}</td>
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

<style rel="stylesheet/less" lang="less" >
    .re-record {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>
