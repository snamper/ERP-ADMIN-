<template>
    <div class="sheet-list sell-scanning-show row return-record">
        <div class="headline-hd scan-record flow-hd12">
            <span>扫码流水</span>
        </div>
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="bgcolor">
                    <th>操作时间</th>
                    <th>SKU</th>
                    <th>商品名称</th>
                    <th>收货人编码</th>
                    <th>收货人姓名</th>
                    <th>收货代理地区</th>
                    <th>发货代理编码</th>
                    <th>发货代理姓名</th>
                    <th>发货代理地区</th>
                    <th>是否异常</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orCodeFlow in orCodeFlows" :class="[orCodeFlow.IsProblem === 1 ? 'iProblem' : '']">
                    <td><span v-if="orCodeFlow.EditTime" data-toggle="tooltip" data-placement="top" title="{{orCodeFlow.EditTime | truncationTimeString}}">{{orCodeFlow.EditTime | formatDateFormShow}}</span></td>
                    <td>{{orCodeFlow.CustomBC}}</td>
                    <td>{{orCodeFlow.GoodsName}}</td>
                    <td>{{orCodeFlow.Code}}</td>
                    <td>{{orCodeFlow.Name}}</td>
                    <td>{{orCodeFlow.State ? orCodeFlow.State + ',' : ''}}{{orCodeFlow.City ? orCodeFlow.City + ',' : ''}}{{orCodeFlow.District ? orCodeFlow.District : ''}}</td>
                    <td>{{orCodeFlow.ParentCode}}</td>
                    <td>{{orCodeFlow.ParentName}}</td>
                    <td>{{orCodeFlow.ParentState ? orCodeFlow.ParentState + ',' : ''}}{{orCodeFlow.ParentCity ? orCodeFlow.ParentCity + ',' : ''}}{{orCodeFlow.ParentDistrict ? orCodeFlow.ParentDistrict : ''}}</td>
                    <td>{{orCodeFlow.IsProblem === 0 ? '否' : '是'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="batch-operation-group">
            <a href="javascript:void(0)" class="btn btn-default btu-left" @click="back()">返回列表>></a>
        </div>
    </div>

</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data() {
            return {
                orCodeFlows: [],
                orCodeID: '',
            };
        },
        methods: {
            getCodeFlow: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasQRCode/ErpQueryQRCodeFlow',
                    data: {
                        QRCodeID: self.orCodeID
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.orCodeFlows = result.Data;
                    }
                })
            },
            back: function () {
                history.go(-1);
            }
        },
        route: {
            data: function (transition) {
                this.orCodeID = transition.to.query.orCodeID;
                if (this.orCodeID) {
                    this.getCodeFlow();
                    transition.next();
                } else {
                    transition.abort();
                }
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
        /*.iProblem {*/
            /*background-color: #f7e1e6;*/
            /*color: red;*/
            /*&:hover {*/
                /*background-color: #f7e1e6;*/
                /*color: red;*/
            /*}*/
        /*}*/
        .iProblem {
            background-color: #e27676;
            color: #fff;
            &:hover {
                background-color: #e27676;
                color: #fff;
            }
        }
    }
</style>
