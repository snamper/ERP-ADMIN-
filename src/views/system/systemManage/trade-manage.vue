<template>
    <div class="unify-head">
        <p>商家管理</p>
    </div>
    <div class="query-form">
        <div class="query-header">
            <div class="checkbox-group">
                <label class="checkbox-title">
                    商家管理
                </label>
                <div class="checkbox-list">
                </div>
                <a href="javascript:void(0)" class="btn btn-blue-circle" data-toggle="collapse" @click="toggleItem">{{show.flog
                    ? '收起多余选项':'展开全部选项'}}<span class="iconfont icon-up"></span></a>
            </div>
        </div>
        <div id="query-detail" class="form-inline collapse in query-detail">
            <div class="row expand-show" :class="{'show-expand' : show.flog}" @keyup.enter.stop="search">
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>手机号码</label>
                    <input v-model="query.Mobile" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>商家编号</label>
                    <input v-model="query.Code" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>公司名</label>
                    <input v-model="query.Name" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label class="form-group-text">所在行业<span class="form-required-mark">*</span></label>
                    <select class="form-control" v-model="query.TradeID">
                        <option v-for="tradeIndustry in tradeIndustrys" value="{{tradeIndustry.TradeID}}">
                            {{tradeIndustry.Name}}
                        </option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>联系人</label>
                    <input v-model="query.LinkMan" type="text" class="form-control">
                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>状态</label>

                    <select class="form-control" v-model="query.Status">
                        <option value="">不限</option>
                        <option v-for="option in ConstantModelas" value="{{option.Code}}">{{option.Text}}</option>
                    </select>

                </div>
                <div class="form-group col-lg-3 col-md-4 col-sm-6">
                    <label>合作类型</label>

                    <select class="form-control" v-model="query.CooperationType">
                        <option value="">不限</option>
                        <option v-for="option in joinType" value="{{option.Code}}">{{option.Text}}</option>
                    </select>

                </div>
                <div class="form-group col-lg-3 col-md-12 col-sm-12">
                    <label>注册时间</label>
                    <div class="date-wrap">
                        <div class="input-group date" id="check-manage-start">
                            <input type="text" class="form-control" v-model="query.RegsterTimeBeg">
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"> 
            </span> 
          </span>
                        </div>
                    </div>
                    <span class="date-link">至</span>
                    <div class="date-wrap">
                        <div class="input-group date" id="check-manage-end">
                            <input type="text" class="form-control" v-model="query.RegsterTimeEnd">
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"> 
            </span> 
          </span>
                        </div>


                    </div>
                </div>
                <div class="form-group col-lg-3 col-md-12 col-sm-12">
                    <label>过期时间</label>
                    <div class="date-wrap">
                        <div class="input-group date" id="check-pastdue-start">
                            <input type="text" class="form-control" v-model="query.OverTimeBeg">
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"> 
            </span> 
          </span>
                        </div>
                    </div>
                    <span class="date-link">至</span>
                    <div class="date-wrap">
                        <div class="input-group date" id="check-pastdue-end">
                            <input type="text" class="form-control" v-model="query.OverTimeEnd">
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"> 
            </span> 
          </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="query-button-group" style="clear:both;">
                <a @click="search" href="javascript:void(0)" class="btn btn-default">搜索</a>
                <a @click="resetting" href="javascript:void(0)" class="btn btn-default">重置</a>
            </div>
        </div>
    </div>


    <div class="sheet-list ">
        <div class="row">
            <div class="col-lg-12">
                <div class="batch-operation">
                    <label class="batch-operation-title">批量操作:</label>
                    <div class="batch-operation-group">
                        <a v-link="{name: 'trade-manage-add'}" href="javascript:void(0)" class="btn btn-default">新增</a>

                        <a @click="tradeStatusEnable('')" href="javascript:void(0)" class="btn btn-default">启用</a>
                        <a @click="tradeStatusDisable('')" href="javascript:void(0)" class="btn btn-default">禁用</a>
                        <a class="btn btn-default" @click="createSupplier">生成供应商</a>
                        <a class="btn btn-default" @click="createEntrepot">生成仓库</a>


                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="sheet-list-table table-responsive">
                    <table class="table table-condensed panel-group" id="sheet-list" trade="tablist">
                        <thead class="sheet-list-header">
                        <tr>

                            <th class="sheet-header-state">
                                <input type="checkbox" v-model="selectAll">
                            </th>

                            <th>公司名</th>
                            <th>联系人</th>
                            <th>联系手机</th>
                            <th>所在行业</th>
                            <th>合作类型</th>
                            <th>注册时间</th>
                            <th>过期时间</th>
                            <th>商家域名</th>
                            <th>微信端域名</th>
                            <th>商家编号</th>
                            <th>备注</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody v-for="trade in trades" class="panel panel-default">
                        <tr class="sheet-list-item">

                            <td class="sheet-item-state">
                                <input type="checkbox" v-model="trade.checked"/>
                            </td>

                            <td>{{trade.Name}}</td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.LinkMan}}">
                            {{trade.LinkMan | truncationString}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.Mobile}}">
                            {{trade.Mobile  | truncationString 13}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.Trade.Name}}">
                            {{trade.Trade.Name | truncationString}}</span></td>
                            <td>{{ trade.CooperationTypeDesc }}</td>
                            <td><span data-toggle="tooltip" data-placement="top"
                                      title="{{trade.BeingDate | truncationTimeString}}">{{trade.BeingDate | formatDateFormShow }}
                            </span></td>

                            <td><span data-toggle="tooltip" data-placement="top"
                                      title="{{trade.EndDate | truncationTimeString}}">{{trade.EndDate | formatDateFormShow}}
                            </span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.WebSite}}">
                            {{trade.WebSite | truncationString}}</span>
                            </td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.SecurityWebSite}}">
                            {{trade.SecurityWebSite | truncationString}}</span>
                            </td>
                            <td><span>{{trade.Code}}</span></td>
                            <td><span data-toggle="tooltip" data-placement="top" title="{{trade.Note}}">
                            {{trade.Note | truncationString}}</span>
                            </td>
                            <td>{{trade.StatusDesc}}</td>
                            <td>
                                <a v-link="{name: 'trade-manage-edit',query: { id:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="修改">
                                    <span class="click-element iconfont icon-alter"></span>
                                </a>
                                <a v-link="{name: 'trade-manage-combo-edit',query: { id:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="套餐管理">
                                    <span class="click-element iconfont icon-combo"></span>
                                </a>
                                <a v-link="{name: 'trade-manage-function',query: { id:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="功能配置">
                                    <span class="click-element iconfont icon-trade-function"></span>
                                </a>
                                <a v-link="{name: 'trade-manage-menu',query: { id:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="微信菜单">
                                    <span class="click-element iconfont icon-trade-menu"></span>
                                </a>
                                <a v-link="{name: 'wechat-config',query: { id:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="微信配置">
                                    <span class="click-element iconfont icon-weixin"></span>
                                </a>
                                <a v-link="{name: 'wechat-model',query: { WebSite:trade.SecurityWebSite,MerchantID:trade.MerchantID}}"
                                   data-toggle="tooltip" data-placement="top" title="微信模式配置">
                                    <span class="click-element iconfont icon-kucunliang"></span>
                                </a>

                                <a v-if="trade.Status == 1" href="javascript:void(0)" data-toggle="tooltip"
                                   data-placement="top" title="禁用">
                                    <span class="click-element iconfont icon-forbid"
                                          @click="tradeStatusDisable(trade.MerchantID)"></span>
                                </a>

                                <a v-if="trade.Status == -1" href="javascript:void(0)" data-toggle="tooltip"
                                   data-placement="top" title="启用">
                                    <span class="click-element iconfont icon-play"
                                          @click="tradeStatusEnable(trade.MerchantID)"></span>
                                </a>
                                <a v-link="{name:'global-config',query:{id:trade.MerchantID}}" data-toggle="tooltip"
                                   data-placement="top" title="全局配置">
                                    <span class="click-element iconfont icon-interface"></span>
                                </a>
                            </td>

                        </tr>
                        <tr class="sheet-list-detail">
                            <td colspan="12">
                                <div class="panel-collapse collapse sheet-list-collapse" trade="tabpanel"
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
                                                <th>数量</th>
                                                <th>市场价</th>
                                                <th>单价</th>
                                                <th>价格</th>
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
                    <pagination :pagination-options="paginationOptions"></pagination>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var commonMethods = require('../../../js/common');
    module.exports = {
        data: function () {
            return {
                show: {
                    flog: false
                },
                pageInfo: {
                    modalText: '',
                    fileType: 7
                },
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                trades: [],
                tradeIndustrys: [],
                ConstantModelas: [],
                joinType: [],
                query: {
                    Status: '',
                    TradeID: '',
                    Name: '',
                    LinkMan: '',
                    Mobile: '',
                    CooperationType: '',
                    RegsterTimeBeg: '',
                    RegsterTimeEnd: '',
                    OverTimeBeg: '',
                    OverTimeEnd: '',
                    BeingDate: '',
                    EndDate: ''


                }
            }
        },
        methods: {
            //收展多余的选项
            toggleItem: function () {
                this.show.flog = !this.show.flog;
            },
            uploadFile: function () {
                this.$dispatch('transmit', 'uploadModalShow', this.pageInfo.fileType);
            },
            getIDGroup: function (ItemID) {
                var IDGroup = [];
                if (ItemID) {
                    IDGroup.push(ItemID);
                } else {
                    IDGroup = this.checkedGroups;
                }
                if (IDGroup.length === 0) {
                    this.$dispatch('transmit', 'tip', {
                        name: '提示',
                        contentText: '请至少选中一个商家'
                    });
                    return [];
                } else {
                    return IDGroup;
                }
            },
            getTrade: function () {
                var relf = this;

                servers.getBaseData('TradeList', false, function (val) {
                    relf.tradeIndustrys = val;
                })
            },
            getConstantModela: function () {
                var relf = this;

                servers.getBaseData('SysMerchantStatus', false, function (val) {
                    relf.ConstantModelas = val;
                })
            },
            getjoinType: function () {
                var relf = this;

                servers.getBaseData('CooperationType', false, function (val) {
                    relf.joinType = val;
                })
            },
            //重置列表
            resetting: function () {
                this.query = {
                    Status: '',
                    TradeID: '',
                    Name: '',
                    LinkMan: '',
                    Mobile: '',
                    CooperationType: '',
                    RegsterTimeBeg: '',
                    RegsterTimeEnd: '',
                    OverTimeBeg: '',
                    OverTimeEnd: '',
                    BeingDate: '',
                    EndDate: ''
                }
            },
            //搜索角色
            getTradeMenage: function () {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/SysMerchant/ErpQuerySysMerchant',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query
                    }
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        var trades = result.Data.PageData;
                        self.trades = [];
                        self.paginationOptions.all = result.Data.TotalPages;
                        self.paginationOptions.totalRecords = result.Data.TotalRecords;
                        if (trades.length > 0) {
                            trades.forEach(function (trade) {
                                trade.checked = false;
                            });
                            self.trades = trades;
                        } else {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '结果为空'
                            });
                        }
                    }
                });
            },


            //生成供应商
            createSupplier: function () {
                var relf = this;
                if (relf.checkedGroups.length > 0) {
                    servers.postAjax.bind(this)({
                        url: '/SysMerchant/ErpCreateVenderByMerchantID',
                        contentType: 'application/json',
                        data: JSON.stringify(relf.checkedGroups),
                        success: function (data) {
                            relf.IDList = data.Data;
                        }
                    });
                    relf.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '成功生成供应商!'
                    });
                } else {
                    relf.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '请至少选择一个商品!'
                    });
                }

            },
//            生成仓库
            createEntrepot: function () {
                var relf = this;
                if (relf.checkedGroups.length > 0) {
                    servers.postAjax.bind(this)({
                        url: '/SysMerchant/ErpCreateStockByMerchantID',
                        contentType: 'application/json',
                        data: JSON.stringify(relf.checkedGroups),
                        success: function (data) {
                            relf.IDList = data.Data;
                        }
                    });
                    relf.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '成功生成仓库!'
                    });
                } else {
//                    relf.$dispatch('transmit','tip',{
//                        name: '提示:',
//                        contentText: '请至少选择一个商品!'
//                    });
                }
            },

            //搜索
            search: function () {
                if (this.paginationOptions.cur == 1) {
                    this.getTradeMenage();
                } else {
                    this.paginationOptions.cur = 1
                }
            },



            //启用
            tradeStatusEnable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceTrade = self.getIDGroup(ItemID);
                if (choiceTrade.length > 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要启用这些角色吗?',
                        btnName: '启用',
                        events: {
                            confirm: 'tradeStatusEnable'
                        }
                    });
                    self.$off('tradeStatusEnable');

                    self.$once('tradeStatusEnable', function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/SysMerchant/ErpUseSysMerchant',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceTrade)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '启用成功!'
                                });
                                self.getTradeMenage();    //启用成功,重新刷新列表
                            }
                        });
                    });
                }
            },
            //禁用
            tradeStatusDisable: function (ItemID) {
                var self = this;
                //确认提示
                var choiceTrade = self.getIDGroup(ItemID);
                if (choiceTrade.length > 0) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '确定要禁用这些角色吗?',
                        btnName: '禁用',
                        events: {
                            confirm: 'tradeStatusDisable'
                        }
                    });
                    self.$off('tradeStatusDisable');

                    self.$once('tradeStatusDisable', function () {
                        //发送启用禁用请求
                        NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/SysMerchant/ErpDisabledSysMerchant',
                            contentType: 'application/json',
                            data: JSON.stringify(choiceTrade)
                        }).done(function (result) {
                            NProgress.done();
                            if (result.ResultCode == 1) {
                                self.$dispatch('transmit', 'tip', {
                                    name: '提示:',
                                    contentText: '禁用成功!'
                                });
                                self.getTradeMenage();    //禁用成功,重新刷新列表
                            }
                        });
                    });
                }
            }
        },
        //在进入页面的时候先获取数据
        route: {
            data: function (transition) {
                //获取角色列表
                this.getTradeMenage();
                transition.next();
            }
        },
        events: {
            //页面改变,获取数据
            'page-change': function () {
                this.getTradeMenage();
            }
        },
        computed: commonMethods.selectAll('this.trades', function (item) {
            return item.MerchantID;
        }),
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        ready: function () {
            this.getTrade();
            this.getConstantModela();
            this.getjoinType();
            this.createEntrepot();
            //dateTimePicker
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#check-manage-start,#check-pastdue-start').datetimepicker({
//                locale: 'zh-cn'
            });
            $('#check-manage-end,#check-pastdue-end').datetimepicker({
//                locale: 'zh-cn'
            });
            $("#check-manage-start,#check-pastdue-start").on("dp.change", function (e) {
                $('#check-manage-end,#check-pastdue-end').data("DateTimePicker").minDate(e.date);
            });
            $("#check-manage-end,#check-pastdue-end").on("dp.change", function (e) {
                $('#check-manage-start,#check-pastdue-start').data("DateTimePicker").maxDate(e.date);
            });


            $('#check-manage-start,#check-pastdue-start').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate', function (e) {
                $('#check-manage-end,#check-pastdue-end').datetimepicker('setStartDate', e.date);
            });
            $('#check-manage-end,#check-pastdue-end').datetimepicker({
//                locale: 'zh-cn'
            }).on('changeDate', function (e) {
                $('#check-manage-start,#check-pastdue-start').datetimepicker('setEndDate', e.date);
            });

        }


    }
</script>
<style type="text/css" lang="less">
    .query-button-search {
        padding-bottom: 20px;
    }
</style>
