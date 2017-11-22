<template>
    <div class="sheet-list sell-scanning-show row return-record">
        <div class="headline-hd scan-record flow-hd12">
            <span>{{title}}</span><br/>
            <!-- <span>代理代码:{{query.Name}}</span> -->

        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>操作人</th>
                    <th>{{query.SheetType === '0' ? '返还' : '提成'}}金额</th>
                    <th>{{query.SheetType === '0' ? '累积返还' : '关联订单'}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in recordList">
                    <!--<td><span data-toggle="tooltip" data-placement="right" title="{{opt.CreateTime | truncationTimeString}}">{{opt.CreateTime | formatDateFormShow}}</span></td>-->
                    <td>{{opt.CreateTime | truncationTimeString}}</td>
                    <td>{{opt.Creater}}</td>
                    <td>{{opt.AccValue || 0}}</td>
                    <td>{{query.SheetType === '0' ? opt.TotalAmount :  opt.Sheet}}</td>
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
    import servers from '../../../../js/servers/servers';
    module.exports = {
        data() {
            return {
                recordList: [],
                title: '',
                query: {},
            };
        },
        methods: {
            queryList(data) {
                servers.postAjax.bind(this)({
                    url: '/BasDistributorPoint/ErpQueryDistributorPointBook',
                    data: data,
                }).done((result) => {
                    if (result.ResultCode == 1) {
                        this.recordList = result.Data;
                    }
                });
            },
        },
        route: {
            data({ to: { query } }) {
                this.title = query.SheetType === '0' ? '返点记录' : '提成记录';
                this.query = query;
                this.queryList(query);
            },
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
