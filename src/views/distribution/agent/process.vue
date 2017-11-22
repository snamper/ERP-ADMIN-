<template>
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>状态</th>
                    <th>上级ID</th>
                    <th>上级姓名</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in recordList">
                    <td>{{opt.CheckTime | readFormDate}}</td>
                    <td>{{opt.Status === 0 && '申请' || opt.Status === 1 && '通过' || opt.Status === 2 && '拒绝'}}</td>
                    <td>{{opt.UpCode}}</td>
                    <td>{{opt.UpCustomerName}}</td>
                </tr>
                </tbody>
            </table>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" v-link="{name: 'agentSuperiorCheckList'}">返回列表>></a>
        </div>
</template>

<script>
    import servers from '../../../js/servers/servers';
    module.exports = {
        data() {
            return {
                recordList: [],
                title: '',
            };
        },
        methods: {
            query(data) {
                servers.postAjax.bind(this)({
                    url: '/BusDistributorUpgradeApply/ErpCompanyQueryUpgradeApply',
                    data: data,
                }).then((result) => {
                    if (result.ResultCode == 1) {
                        this.recordList = result.Data;
                    }
                });
            },
        },
        route: {
            data({ to: { query } }) {
                this.query(query);
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
