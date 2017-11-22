<template>
    <div class="sheet-list sell-scanning-show row product-stock">
        <div class="headline-hd scan-record flow-hd12">
            <span>商品库存</span><br/>
            <span>代理代码:{{query.Name}}</span>
        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>SKU</th>
                    <th>商品货号</th>
                    <th>商品名称</th>
                    <th>可用库存</th>
                    <th>锁定库存</th>
                    <th>实际库存</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="opt in 3">
                    <td>110010{{opt.CreateTime | formatDateFormShow}}</td>
                    <td>100</td>
                    <td>黄龙席</td>
                    <td>12</td>
                    <td>02</td>
                    <td>02</td>
                    <td href="javascript:void(0)"><a @click="view">库存流水</a></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" v-link="{name: 'supplierStock'}">返回列表>></a>
        </div>
    </div>
    <model-view-credit></model-view-credit>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    module.exports = {
//        props: ['baseLookUp'],
        data: function () {
            return {
                modal: {
                    show: false,
                    title: ''
                },
            }
        },
        methods: {
            view: function () {
//                console.log('01');
                this.$broadcast('model-view-credit');
            },
        },
    components: {
        modelViewCredit: require('./modelViewCredit.vue'),
    }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .product-stock {
        .bgcolor {
            background-color: #f7f9fd;
            color: #626e8e;
        }
        .btu-left {
            margin-left: 15px;
        }
    }
</style>