<template>
    <div class="container-fluid">
        <div class="unify-head">
            结算账户
        </div>
        <div class="query-form">
            <div class="query-header query-header-margin">
                <div class="checkbox-group">
                    <label class="checkbox-title">
                        结算账户
                    </label>
                    <div class="checkbox-list">
                    </div>
                    <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
                </div>
            </div>
            <div class="form-inline query-detail" @keyup.enter.stop="search">
                <div class="row expand-show" :class="{'show-expand' : show.flog}">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>编码</label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>名称</label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>信用额度</label>
                        <input v-model="query.CreditAccount" type="number" min="0" class="form-control" placeholder="">
                        <span class="form-control-link">~</span>
                        <input v-model="query.CreditAccount_To"  type="number" min="0" class="form-control" placeholder="">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>开户行</label>
                        <input v-model="query.Bank" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>银行账号</label>
                        <input v-model="query.AcctNo" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>银行账号名</label>
                        <input v-model="query.AcctName" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">结算方式</label>
                        <select class="form-control" v-model="query.PayTypeID">
                            <option value="">不限</option>
                            <option v-for="opt in PayTypeList " value="{{opt.PayTypeID}}">{{opt.Name}}</option>
                        </select>
                    </div>

                    <!--<div class="form-group col-lg-3 col-md-4 col-sm-6">-->
                        <!--<label class="form-group-text">会员种类</label>-->
                        <!--<select class="form-control" v-model="query.CustomerType">-->
                            <!--<option value="">不限</option>-->
                            <!--<option v-for="opt in MemberCustomerTypeList " value={{opt.Code}}>{{opt.Text}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">状态</label>
                        <select class="form-control" v-model="query.Status">
                            <option value="">不限</option>
                            <option value=1>启用</option>
                            <option value=0>禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>备注</label>
                        <input v-model="query.Note" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>创建人</label>
                        <input v-model="query.Creater" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>修改人</label>
                        <input v-model="query.Editor" type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >创建时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-createTime-start'>
                                <input v-model="query.CreateTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-createTime-end'>
                                <input v-model="query.CreateTime_To | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-12 col-sm-12">
                        <label >修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-start'>
                                <input v-model="query.EditTime | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                        <span class="date-link">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='pay-editTime-end'>
                                <input v-model="query.EditTime_To | formatDate" type='text' class="form-control" />
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-button-group">
                    <a href="javascript:void(0)" class="btn btn-default" @click="search">搜索</a>
                    <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <div class="batch-operation-group">
                            <a v-link="{name:'balance-account-add'}" class="btn btn-default">新增</a>
                            <!--<a @click="uploadFile" href="javascript:void(0)" class="btn btn-default">批量新增</a>-->
                            <a @click="StatusEnable( )" href="javascript:void(0)" class="btn btn-default">批量启用</a>
                            <a @click="StatusDisable( )" href="javascript:void(0)" class="btn btn-default">批量禁用</a>
                        </div>
                    </div>
                    <div class="sheet-list-table table-responsive">
                        <!--非问题单-->
                        <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                            <thead class="sheet-list-header">
                            <tr>
                                <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                <th>编号</th>
                                <th>名称</th>
                                <th>账户余额</th>
                                <th>信用额度</th>
                                <th>状态</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>修改人</th>
                                <th>修改时间</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-for="opt in clientBalanceList" class="panel panel-default">
                            <tr class="sheet-list-item">
                                <td class="sheet-item-state"><input type="checkbox" v-model="opt.checked">
                                </td>
                                <td class="show-detail-ctrl collapsed"
                                    @click=""
                                    data-toggle="collapse" data-parent="#sheet-list"
                                    data-target="#{{opt.AccountID}}">
                                    <span class="iconfont icon-alter"></span><span>{{opt.Code}}</span>
                                </td>
                                <td>
                                  <span data-toggle="tooltip" data-placement="top" title="{{opt.Name}}">
                                    {{opt.Name  | truncationString 4}}
                                  </span>
                                </td>
                                <td>{{opt.Account? opt.Account.toFixed(2) : '0.00'}}</td>
                                <td>{{opt.CreditAccount? opt.CreditAccount.toFixed(2) : '0.00'}}</td>
                                <td :class="[ opt.Status == 1 ? '' : 'state-forbid']" >{{ opt.Status == 1 ? '启用' : '禁用' }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Creater}}">{{opt.Creater | truncationString}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.CreateTime}}">{{opt.CreateTime | formatDateFormShow}}</span></td>
                                <td>{{opt.Editor }}</td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.EditTime}}">{{opt.EditTime | formatDateFormShow}}</span></td>
                                <td><span data-toggle="tooltip" data-placement="top" title="{{opt.Note }}">{{opt.Note  | truncationString}}</span></td>
                                <td>
                                    <a @click="upBalance(opt.AccountID,opt.Account)" data-toggle="tooltip" data-placement="top" title="调整余额">
                                        <span class="click-element iconfont icon-combo"></span>
                                    </a>
                                    <a data-toggle="tooltip" data-placement="top" title="交易流水">
                                        <span v-link="{name: 'deal-flow', query: {AccountID: opt.AccountID,Name: opt.Name}}" class="click-element iconfont icon-look"></span>
                                    </a>
                                    <a v-link="{name: 'balance-account-edit',query: {AccountID: opt.AccountID}}" data-toggle="tooltip" data-placement="top" title="修改"><span class="iconfont icon-alter"></span></a>
                                    <a @click="StatusEnable(opt.AccountID)" href="javascript:void(0)" v-if="opt.Status != 1" data-placement="top" title="启用"><span class="iconfont icon-play"></span></a>
                                    <a @click="StatusDisable(opt.AccountID)" href="javascript:void(0)" v-if="opt.Status == 1" data-toggle="tooltip" data-placement="top" title="禁用"><span class="iconfont icon-forbid"></span></a>
                                </td>
                            </tr>
                            <tr class="sheet-list-detail">
                                <td colspan="16">
                                    <div class="panel-collapse collapse sheet-list-collapse" role="tabpanel"
                                         id="{{opt.AccountID}}">
                                        <div class="sheet-detail-wrap">
                                            <table class="table">
                                                <thead class="sheet-list-header">
                                                <tr>
                                                    <th>开户行</th>
                                                    <th>银行账号</th>
                                                    <th>银行账号名</th>
                                                    <th>结算方式</th>
                                                    <th>审单控制</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{{opt.Bank}}</td>
                                                    <td>{{opt.AcctNo}}</td>
                                                    <td>{{opt.AcctName}}</td>
                                                    <td>{{opt.PayTypeName}}</td>
                                                    <td>{{opt.ControlFlagName}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="clientBalanceList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果</div>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </div>
                    </div>
                </div>
        </div>
    </div>
        <div class="modal fade" :class="{'in':modal.show}" v-show="modal.show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-content-wrap">
                        <div class="modal-header" v-drag parent=".modal-content-wrap">
                            <button @click="modal.show = false" type="button" class="close"><span>&times;</span></button>
                            <h4 class="modal-title">{{modal.title}}</h4>
                        </div>
                        <div class="modal-body clearfix">
                            <div class="client-row-fluid">
                                <div class="client-account-content">
                                    <!--<label class="control-label">当前余额:</label>-->
                                    <h class="account-margin">当前余额<span class="account-span">{{modal.queryAccount}}</span></h><br/><br/>
                                    <h class="account-margin">调整余额<span class="form-required-mark">*</span><input type="text" class="account-input" v-model="modal.amount"></h>
                                </div>
                                <div class="account-margin">
                                    <h>调整方向<span class="form-required-mark">*</span>
                                        <select class="client-form-control" v-model="modal.flag">
                                            <option value="">请选择</option>
                                            <option value="-1">减少</option>
                                            <option value="1">增加</option>
                                        </select>
                                    </h>
                                </div>
                                <div class="account-margin">
                                    <p>备 注<span class="form-required-mark">*</span></p>
                                    <textarea class="account-note" rows="5" v-model="modal.note"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="modal.show = false" type="button" class="btn btn-default"> 取消 </button>
                            <button @click="upAccountSave()" type="button" class="btn btn-primary " v-if="isSuccess" > 确定调整 </button>
                            <button  type="button" class="btn btn-default isNoCheck" style="color: white;" v-else > 稍后再点击 </button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
</template>

<script>
    var servers = require('../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../js/common');
    module.exports = {
        data: function () {
            return {
                isSuccess:true,
                show: {
                  flog: false
                },
                // 页面弹出框的模型
                modal: {
                    show: false,
                    title: '调整余额',
                    queryAccount: '', //当前余额
                    amount: '', //调整余额
                    flag: '', // 方向
                    note: '',
                    accountID: ''

                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
                    Name: '',
                    PayTypeID: '', //结算方式
                    Code: '', //外部编码
                    Bank: '', //开户行
                    AcctNo: '', //账户
                    AcctName: '', //账户名
                    ControlFlag: '', //审单控制
                    Account: '', //账户余额
                    Account_To: '',
                    CreditAccount: '', //信用额度
                    CreditAccount_To: '',
                    Note: '',
                    Creater: '',
                    CreateTime: '',
                    CreateTime_To: '',
                    Editor: '',
                    EditTime: '',
                    EditTime_To: '',
                    Status: '',

                },
                PayTypeList: [],
//                ControlFlagList: [],
                clientBalanceList: []
            };
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            //重置
            resetting: function () {
                var self = this;
                self.query = {
                    Name: '',
                    PayTypeID: '', //结算方式
                    Code: '', //外部编码
                    Bank: '', //开户行
                    AcctNo: '', //账户
                    AcctName: '', //账户名
                    ControlFlag: '', //审单控制
                    Account: '', //账户余额
                    Account_To: '',
                    CreditAccount: '', //信用额度
                    CreditAccount_To: '',
                    Note: '',
                    Creater: '',
                    CreateTime: '',
                    CreateTime_To: '',
                    Editor: '',
                    EditTime: '',
                    EditTime_To: '',
                    Status: '',
                }
            },
            //获取结算方式
            getAccountType: function () {
                var self = this;
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetBasPayTypeList',
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.PayTypeList = result.Data;
                    }
                })
            },
        //获取客户结算账号列表
        getBalanceAccount: function () {
            var self = this;
            NProgress.start();
            servers.postAjax.bind(this)({
                url: '/BasAccount/ErpQueryBasAccount',
                data: {
                    PageSize: self.paginationOptions.pageSize,
                    PageNumber: self.paginationOptions.cur,
                    SearchWhere: self.query
                }
            }).done(function (result) {
                var BalanceAccount = result.Data.PageData;
                self.clientBalanceList = [];
                if (BalanceAccount.length > 0) {
                    self.paginationOptions.all = result.Data.TotalPages;
                    self.paginationOptions.totalRecords = result.Data.TotalRecords;
                    BalanceAccount.forEach(function (item) {
                        item.checked = false;
                        var godObject = {
                            Bank: item.Bank
                        };
                        item.god = [];
                        item.god.push(godObject);
                    });
                    self.clientBalanceList = BalanceAccount;
                }
                NProgress.done();
            })
        },
        //搜索
        search: function () {
            if (this.paginationOptions.cur == 1) {
                this.getBalanceAccount();
            } else {
                this.paginationOptions.cur = 1
            }
        },
        //调整余额
            upBalance: function (AccountID,Account) {
            var self = this;
                    self.modal.queryAccount = Account;
                    self.modal.accountID = AccountID;
                    self.modal.show = true;
                    self.$broadcast('modal-client-balance', AccountID);
        },
        // 确定调整余额
            upAccountSave: function () {
                var self = this;
                
                if (self.modal.amount.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请填写调整余额'
                    });
                    return [];
                }
                else if (self.modal.flag.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请选择调整方向'
                    });
                    return [];
                }
                else if (self.modal.note.length == 0) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请填写备注'
                    });
                    return [];
                }
                self.isSuccess = false;
                console.log("111")
                servers.postAjax.bind(this) ({
                    url: '/BasAccount/CheckAccount',
                    data: {
                        Flag: self.modal.flag,
                        Amount: self.modal.amount,
                        Note: self.modal.note,
                        AccountID: self.modal.accountID,
                    }
                }).done(function (result) {
                    self.isSuccess = true;
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示:',
                            contentText: '调整成功！'
                        });
                        
                        self.modal = {
                            show: false,
                            title: '调整余额',
                            queryAccount: '', //当前余额
                            amount: '', //调整余额
                            flag: '', // 方向
                            note: '',
                            accountID: ''
                        }
                        self.search();    //调整成功,重新刷新列表

                    }
                })

            },
        getIDGroup: function (AccountID) {
            var IDGroup = [];
            if (AccountID) {
                IDGroup.push(AccountID);
            } else {
                IDGroup = this.checkedGroups;
            }
            if (IDGroup.length === 0) {
                this.$dispatch('transmit','tip',{
                    name: '提示',
                    contentText: '请至少选中一个分类'
                });
                return [];
            } else {
                return IDGroup;
            }
        },
        //启用
        StatusEnable: function (AccountID) {
            var self = this;
            var text = '启用';
            var choiceAccount = self.getIDGroup(AccountID);
            if (choiceAccount.length > 0) {
                //确认提示
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要' + text + '这些结算账户吗?',
                    btnName: text,
                    events: {
                        confirm: 'StatusEnable'
                    }
                });
                self.$off('StatusEnable');

                self.$once('StatusEnable',function () {
                    //发送启用禁用请求
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasAccount/ErpStart',
                        contentType: 'application/json',
                        data:  JSON.stringify(choiceAccount),
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: text + '成功!'
                            });
                            self.search();    //启用禁用成功,重新刷新列表
                        }
                    });
                });
            }
        },
        // 禁用
        StatusDisable: function (PayTypeID) {
            var self = this;
            var text = '禁用';
            var choiceAccount = self.getIDGroup(PayTypeID);
            if (choiceAccount.length > 0) {
                //确认提示
                self.$dispatch('transmit','tip',{
                    name: '提示:',
                    contentText: '确定要' + text + '这些结算账户吗?',
                    btnName: text,
                    events: {
                        confirm: 'StatusDisable'
                    }
                });
                self.$off('StatusDisable');

                self.$once('StatusDisable',function () {
                    //发送启用禁用请求
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasAccount/ErpEnable',
                        contentType: 'application/json',
                        data:  JSON.stringify(choiceAccount),
                    }).done(function (result) {
                        NProgress.done();
                        if ( result.ResultCode == 1 ) {
                            self.$dispatch('transmit','tip',{
                                name: '提示:',
                                contentText: text + '成功!'
                            });
                            self.search();    //启用禁用成功,重新刷新列表
                        }
                    });
                });
            }
        },
    },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getBalanceAccount();
            }
        },
        computed: commonMethods.selectAll('this.clientBalanceList', function (item) {
            return item.AccountID;
        }),
        components: {
            pagination: require('../../components/pagination.vue'),
//            modalClientBalance: require('./components/modal-balance-account.vue'),
        },
        ready: function () {
            this.getAccountType();
            this.getBalanceAccount();
            //dateTimePicker
            require('../../css/bootstrap-datetimepicker.css');
            require('../../js/plugins/bootstrap-datetimepicker');
            $('#pay-createTime-start,#pay-editTime-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-createTime-end,#pay-editTime-end').datetimepicker('setStartDate',e.date);
            });
            $('#pay-createTime-end,#pay-editTime-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate',function (e) {
                $('#pay-createTime-start,#pay-editTime-start').datetimepicker('setEndDate',e.date);
            });
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    /*.client-modal-content {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-color: #00b3ee;*/
        /*.client-modal-header {*/
            /*background:#F7F9FD;*/
        /*}*/
        /*.client-modal-header-title {*/
            /*color: #626e8e;*/
        /*}*/
        /*.modal-client {*/
            /*!*overflow: hidden;*!*/
            /*position: fixed;*/
            /*top: 35%;*/
            /*right: 35%;*/
            /*width: 460px;*/
            /*height: 220px;*/
            /*background-color: #ffffff;*/
            /*z-index: 1050;*/
            /*-webkit-overflow-scrolling: touch;*/
            /*outline: 0;*/
        /*}*/

    /*}*/
    .account-margin {
        margin-top: 12px;
        font-size: 14px;
    }
    .account-span {
        margin-left: 14px;
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .account-note {
        float: left;
        width: 500px;

        max-width: 500px;
        overflow-x:visible;
        overflow-y:visible;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .account-input {
        margin-left: 4px;
        width: 170px;
        height: 28px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    /*.account-margin-h {*/
        /*margin-top: 12px;*/
    /*}*/
    .client-form-control {
        width: 170px;
        height: 28px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .isNoCheck{
        background: #B3B3B3;
        border-color :#B3B3B3;
    }
    .isNoCheck:hover{
        background: #B3B3B3;
        border-color :#B3B3B3;
        
    }
</style>