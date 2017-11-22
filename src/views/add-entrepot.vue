<template>
    <div class="container-fluid">
        <div class="query-form">
            <div class="query-header">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        状态:
                    </label>
                    <div class="checkbox-list">
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option1"> <span>启用</span>
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option2"> <span>禁用</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sheet-tab">
                        <div class="sheet-state">
                            <a href="javascript:void(0)" class="sheet-tab-link active">待 确 认</a>
                            <a href="javascript:void(0)" class="sheet-tab-link ">待通知配货</a>
                            <a href="javascript:void(0)" class="sheet-tab-link ">暂 停</a>
                            <a href="javascript:void(0)" class="sheet-tab-link ">问 题 单</a>
                            <a href="javascript:void(0)" class="sheet-tab-link ">无 效 单</a>
                        </div>
                        <a href="javascript:void(0)" class="btn btn-blue-circle">下载网店订单</a>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a href="javascript:void(0)" class="btn btn-default">批量确认</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量修改发货仓库</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量修改仓库留言</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量修改客服</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量修改快递方式</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量设置问题单</a>
                            <a href="javascript:void(0)" class="btn btn-default">批量审批发票</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox"><span>状态</span></th>
                                <th>订单号</th>
                                <th>订单备注</th>
                                <th>店铺</th>
                                <th>平台</th>
                                <th>外部交易号</th>
                                <th>收货人</th>
                                <th>收货区域</th>
                                <th>支付方式</th>
                                <th>实收款</th>
                                <th>快递公司</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="n in 10" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox"><span>未确认</span></td>
                                <td class="show-detail-ctrl collapsed" data-toggle="collapse" data-parent="#sheet-list"
                                    data-target="#sheet-list-detail{{n}}"><span
                                        class="iconfont"></span><span>0000100001</span></td>
                                <td class="sheet-item-remark"><span class="toolTip-ctrl" data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="收货地址改为广州市天河区地址改为广州市改为广州市。">收货地址改为广州市天河区地址改为广州市改为广州市。</span>
                                </td>
                                <td><span>迪士尼时尚专卖店</span></td>
                                <td><span>天猫</span></td>
                                <td><span>1723804344739519</span></td>
                                <td><span>小土豆</span></td>
                                <td><span>广东,中山</span></td>
                                <td>支付宝</td>
                                <td>￥198.00</td>
                                <td>顺丰速递</td>
                                <td>
                                    <a href="javascript:void(0)" class="sheet-list-delete"><span
                                            class="iconfont"></span></a>
                                    <a href="javascript:void(0)" class="sheet-list-edit"><span class="iconfont"></span></a>
                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="12">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                         id="sheet-list-detail{{n}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table table-condensed">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        <a href="javascript:void(0)" class="btn btn-default">+新增</a>
                                                    </th>
                                                    <th>商品名称</th>
                                                    <th>SKU</th>
                                                    <th>尺码</th>
                                                    <th>颜色</th>
                                                    <th>条形码</th>
                                                    <th>锁定/库存</th>
                                                    <th>市场价</th>
                                                    <th>单价</th>
                                                    <th>摊分金额</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <a href="javascript:void(0)" class="btn-change">修改</a>
                                                        <a href="javascript:void(0)" class="btn-delete">删除</a>
                                                    </td>
                                                    <td>LV0020-04手表</td>
                                                    <td>
                                                        <span>LV00200401</span>
                                                        <!--<input type="text">-->
                                                    </td>
                                                    <td>无</td>
                                                    <td>白色</td>
                                                    <td>6902480075353</td>
                                                    <td><span>1</span>/<span>2230</span></td>
                                                    <td>￥298.00</td>
                                                    <td><span>￥198.00</span></td>
                                                    <td>￥198.00</td>
                                                </tr>
                                                </tbody>
                                                <tbody class="list-detail-operation">
                                                <tr>
                                                    <td colspan="10" class="detail-btn-group">
                                                        <a href="javascript:void(0)" class="btn btn-default">修改收货信息</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">修改仓库</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">修改快递</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">订单备注</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">审核确认</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">暂 停</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">恢复暂停</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">设为问题单</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">置为正常单</a>
                                                        <a href="javascript:void(0)" class="btn btn-default">订单无效</a>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <pagination></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var server = require('../js/servers/servers');
    var globalUrl = 'http://192.168.88.47:888/API/BasStock/'
    module.exports = {
        //name: 'addEntrepot',
        data: function () {
            return {
                tableList: null,
                tablePage: 1,
                query: {
                    code: '',
                    name: '',
                    status: ''

                }
            }
        },
        methods: {
            /**
             * 请求并刷新表格列表
             */
            getTableList: function () {
                var relf = this;
                server.postAjax({
                    url: 'ErpQueryStock',
                    data: {
                        PageSize: 10,
                        PageNumber: relf.tablePage,
                        SearchWhere: {
                            Code: relf.query.code,
                            Name: relf.query.name,
                            Status: relf.query.status
                        }
                    },
                    success: function (data) {
                        relf.tableList = data;
                        console.log(data);
                    }
                }, globalUrl)
            }
        },
        ready: function () {
            this.getTableList()
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    /*头部查询条件区域*/
    .query-form {
        padding-left: 20px;
        padding-right: 20px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
    }

    .query-header {
        border-bottom: 1px solid #e5e5e5;
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 20px;
        padding-right: 20px;
        .btn-blue-circle {
            margin-top: -4px;
        }
    }

    .checkbox-group {
        display: flex;
        padding-top: 10px;
        .checkbox-title {
            padding-left: 10px;
        }
        .checkbox-list {
            flex: 1;
            .checkbox-inline {
                margin-left: 12px;
                margin-bottom: 10px;
                input {
                    position: relative;
                    margin: 0;
                }
            }
        }
    }

    .radio-group {
        display: flex;
        padding-top: 10px;
        .radio-title {
            padding-left: 10px;
        }
        .radio-list {
            flex: 1;
            .radio-inline {
                margin-left: 12px;
                margin-bottom: 10px;
                input {
                    position: relative;
                    margin: 0;
                }
            }
        }
    }

    .query-detail {
        padding-top: 20px;
        .form-group {
            display: flex;
            margin-bottom: 12px;
            label {
                min-width: 80px;
                text-align: right;
                line-height: 34px;
                margin-right: 12px;
                color: #666;
                font-weight: normal;
            }
            .form-control {
                flex: 1;
                width: 100%;
                &.form-control-multiple {
                    margin-left: 10px;
                }
            }
        }
    }

    .form-required-mark {
        color: #ff5252;
    }

    .date-wrap {
        flex: 1;
        width: 100%;
        .input-group {
            width: 100%;
        }
    }

    .date-link {
        padding-left: 5px;
        padding-right: 5px;
        line-height: 34px;
    }

    .query-button-group {
        padding-left: 92px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    /*订单列表区域*/
    .sheet-list {
        margin-top: 20px;
        border: 1px solid #e5e5e5;
    }

    .sheet-tab {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        .sheet-state {
            width: 100%;
            font-size: 0;
        }
        .sheet-tab-link {
            display: inline-block;
            background: #fafafa;
            line-height: 50px;
            border: 1px solid #e5e5e5;
            color: #999;
            font-size: 14px;
            margin-left: -1px;
            margin-bottom: -1px;
            margin-top: -1px;
            width: 148px;
            text-align: center;
            &.active {
                border-bottom: 1px solid transparent;
                color: #666;
                background: #fff;
            }
        }
        .btn-blue-circle {
            margin-top: 4px;
            margin-right: 20px;
        }
    }

    .batch-operation {
        display: flex;
        padding: 16px 20px;
        .batch-operation-title {
            display: inline-block;
            padding: 6px 14px 6px 10px;
            color: #666;
            font-weight: normal;
            white-space: nowrap;
        }
        .btn {
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }

    .sheet-list-table {
        margin-left: 24px;
        margin-right: 24px;
        .table > tbody + tbody {
            border-top: none;
        }
        tbody {
            border: none;
        }
        .table {
            border-collapse: separate;
            > thead {
                > tr {
                    > th {
                        border: none;
                        white-space: nowrap;
                        vertical-align: middle;
                        color: #626e8e;
                        font-weight: normal;
                    }
                }
            }
        }
        > .table {
            > thead {
                th {
                    background: #eff6ff;
                }
            }
        }
        td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &.collapse {
                user-select: none;
            }
            &.sheet-item-remark {
                max-width: 100px;
                span {
                    display: inline-block;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                }
                .tooltip {
                    transform: translate(-100px, 100px);
                }
                .tooltip-inner {
                    white-space: pre-wrap;
                    left: 0;
                }
            }
            &.show-detail-ctrl {
                color: #4167cc;
                background: #fff;
            }
        }
        .sheet-list-item {
            &.detail-opened {
                td {
                    &.show-detail-ctrl {
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                        color: #fff;
                        background: #8996b0;
                    }
                    &:not(.show-detail-ctrl) {
                        background: #fff;
                    }
                }
            }
            &:hover {
                td {
                    background: #8996b0;
                }
            }
            &.selected {
                td {
                    background: darken(#8996b0, 20%);
                }
            }
        }
        .table-condensed {
            margin-bottom: 0;
            > tbody {
                > .sheet-list-detail {
                    background: #8996b0;
                    > td {
                        padding: 0;
                        border-top: none;
                    }
                }
            }
            .sheet-detail-wrap {
                padding: 18px;
            }
        }
        .table > tbody > .sheet-list-item {
            &.detail-opened {
                > td {
                    border-bottom: none;
                }
            }
            > td {
                border-bottom: 1px dashed #ccc;
                border-top: none;
            }
        }
        .table > tbody > tr > td {
            padding: 5px 14px 5px 10px;
            vertical-align: middle;
            &.detail-btn-group {
                padding: 0;
            }
        }
        .table > thead > tr > th {
            padding: 5px 14px 5px 10px;
        }
        .sheet-list-detail {
            .table {
                > thead {
                    > tr {
                        > th {
                            background: #a6b2c9;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .list-detail-operation {
            background: #8996b0;
            .btn {
                margin-top: 10px;
            }
        }
        .sheet-list-item {
            .show-detail-ctrl {
                .iconfont {
                    font-size: 12px;
                    border-radius: 3px;
                    border: 2px solid #4167cc;
                    color: #4167cc;
                    background: #fff;
                    margin-right: 3px;
                    padding: 3px;
                    line-height: 1;
                    display: inline-block;
                    vertical-align: middle;
                    transform: scale(0.6);
                    font-weight: bold;
                    &:before {
                        content: '\e609';
                    }
                }
            }
            &.detail-opened {
                .show-detail-ctrl {
                    .iconfont {
                        &:before {
                            content: '\e60a';
                        }
                    }
                }
            }
        }
        .sheet-header-state,
        .sheet-item-state {
            input {
                margin-right: 36px;
                vertical-align: middle;
            }
        }
        .btn-change {
            color: #96bee7;
        }
        .btn-delete {
            color: #eb8678;
        }
        .btn-save {
            color: #84cd84;
        }
        .sheet-list-delete,
        .sheet-list-edit {
            .iconfont {
                display: inline-block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                text-align: center;
                border-radius: 3px;
                color: #fff;
            }
        }
        .sheet-list-delete {
            margin-right: 10px;
            .iconfont {
                background: #96bee7;
                &:before {
                    content: '\e60b';
                }
            }
        }
        .sheet-list-edit {
            .iconfont {
                background: #eb8678;
                &:before {
                    content: '\e60c';
                }
            }
        }
    }
</style>