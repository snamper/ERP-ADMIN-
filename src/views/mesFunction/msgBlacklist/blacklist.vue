<template>
     <div class="operate-form-title" style="margin-bottom: 20px">
        <p>
            黑名单管理
        </p>
    </div> 
    <div class="container-fluid container-fluid-margin">
        <div class="query-form">
            <div class="form-inline query-detail">
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>买家</label>
                        <input v-model="querys.Buyer" type="text" class="form-control" placeholder="买家">
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>店铺</label>
                        <select class="form-control" v-model="querys.NetShopID">
                            <option value="">不限</option>
                            <option :value="item.NetShopID" v-for="item in shopList">{{item.Name}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label>处理人</label>
                        <input v-model="querys.Editor" type="text" class="form-control" placeholder="处理人">
                    </div>
<!--                     <div class="form-group col-lg-3 col-md-4 col-sm-6">
                        <label class="form-group-text">处理时间</label>
                        <date-picker :start-date.sync='querys.EditTimeBegin' :end-date.sync='querys.EditTimeEnd'></date-picker>
                    </div> -->
                    <div class="form-group col-lg-6 col-md-8 col-sm-12">
                        <label class="form-group-text">修改时间</label>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-start'>
                                <input v-model="querys.EditTimeBegin"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <span style="margin:5px 10px 0 10px;">至</span>
                        <div class="date-wrap">
                            <div class='input-group date' id='create-timepicker-end'>
                                <input v-model="querys.EditTimeEnd"  type='text' class="form-control"/>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="query-button-group">
                    <a @click="serarch" href="javascript:void(0)" class="btn btn-default">搜索</a>
                    <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                </div>
            </div>
        </div>
        <div class="sheet-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="batch-operation">
                        <label class="batch-operation-title">批量操作:</label>
                        <div class="batch-operation-group">
                            <a class="btn btn-default" @click="restoreBlackList">恢复</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="sheet-list-table table-responsive">
                        <table class="table table-condensed">
                            <thead class="sheet-list-header">
                                <tr>
                                    <th><input type="checkbox" name="" value="" v-model="selectAll"></th>
                                    <th>店铺</th>
                                    <th>买家</th>
                                    <th>处理时间</th>
                                    <th>处理人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="item in blackList">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" value="" v-model="item.checked"></td>
                                    <td :title="item.NetShopName">
                                        {{item.NetShopName | limitBy 10}}
                                    </td>
                                    <td :title="item.Buyer">
                                        {{item.Buyer | limitBy 10}}
                                    </td>
                                    <td title="{{item.EditTime}}">{{item.EditTime  | limitBy 9 2}}</td>
                                    <td :title="item.Editor">
                                        {{item.Editor | limitBy 10}}
                                    </td>
                                    <td>
                                        <a v-link="'msgBlacklist-detail?Buyer='+item.Buyer">查看消息</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :pagination-options.sync="paginationOptions"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style rel="stylesheet/less" lang="less">
th,td  {
    text-align: center;
}
</style>
<script>
import commonMethods from '../../../js/common';
import servers from '../../../js/servers/servers';
var NProgress = servers.NProgress;
import pagination from '../../../components/pagination.vue';
import datePicker from '../../../components/date_picker.vue';
export default {
    data() {
            return {
                shopList: [],//店铺下拉菜单
                blackList: [],//黑名单列表
                checkList: [],
                selectAll: false,
                // 审核的某一个项目的商品库存列表
                checkInventorys: [],
                customerGradeList: [],
                paginationOptions: {
                    all: 0,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0,
                },
                querys: {
                    Buyer: "",//买家
                    NetShopID: "",//店铺编号
                    Editor: "",//处理人
                    EditTimeBegin: "",//处理时间开始
                    EditTimeEnd: ""//处理时间结束
                }
            };
        },
       computed: commonMethods.selectAll('this.blackList', function (item) {
            return item.BuyerBlackListID;
        }),
        ready () {
            this.queryShopList();
            this.queryBlackList(true);
            //this.queryList(true);
            require('../../../css/bootstrap-datetimepicker.css');
            require('../../../js/plugins/bootstrap-datetimepicker');
            $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').datetimepicker({});
            $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').datetimepicker({});
            $("#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start").on("dp.change", function (e) {
                $('#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end').data("DateTimePicker").minDate(e.date);
            });
            $("#pay-timepicker-end,#circular-timepicker-end,#create-timepicker-end").on("dp.change", function (e) {
                $('#pay-timepicker-start,#circular-timepicker-start,#create-timepicker-start').data("DateTimePicker").maxDate(e.date);
            });
            //启动toolTip
            $('.toolTip-ctrl').tooltip();
        },
        attached() {},
        components: {
            pagination,
            datePicker
        },
        events: {
            'page-change': function() {
                this.queryBlackList(true);
            }
        },
        methods: {
            //查询店铺下拉列表dan
            queryShopList() {
                const self = this;
                servers.NProgress.start();
                servers.getAjax.bind(this)({
                    url: '/BaseLookup/GetNetShopList',
                    success(result) {
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            self.shopList = result.Data
                        }
                    }
                })

            },
            //搜索
            serarch() {
               this.queryBlackList(true); 
            },
            //查询黑名单列表
            queryBlackList(type) {
                if (!type && this.paginationOptions.cur !== 1) return this.paginationOptions.cur = 1;
                const self = this;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasBuyerBlackList/QueryBuyerBlackList',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: self.querys
                    },
                    success(result) {
                        const data = result.Data.PageData;
                        servers.NProgress.done();
                        if (result.ResultCode === 1) {
                            //self.blackList = data;
                            self.paginationOptions.all = result.Data.TotalPages;   
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            //console.log(data)                        
                            if (data.length) {
                                for (let i in data) {
                                    data[i].checked = false;
                                }
                                self.blackList = data;
                            } else {
                                self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                                self.blackList = '';
                            }
                        }
                    }
                })
            },
/*            restoreBlackLists() {
                if (this.checkedGroups.length === 0) {
                    return this.$dispatch('transmit', 'tip', {contentText: '未有选中项'});
                }
                const list = this.checkedGroups;
                this.$dispatch('transmit', 'tip', {
                    contentText: '确定恢复勾选的黑名单信息吗？',
                    events: {
                        confirm: 'restoreBlackList',
                    },
                });
                this.$off('operate-confirm');
                this.$once('operate-confirm', () => {
                    console.log(this.checkedGroups)
                    servers.NProgress.start();
                    servers.postAjax.bind(this)({
                        url: '/BasBuyerBlackList/DelBuyerBlackList',
                        data: {
                            buyerBlackListIds:''
                        }
                      
                    }).then((result) => {
                        servers.NProgress.done();
                        if (result.ResultCode == 1) {
                            this.queryBlackList(true);
                            this.$dispatch('transmit', 'tip', {
                                contentText: '恢复成功！',
                            });
                        }
                    });
                });
            },*/
            restoreBlackList() {
               // return                
                var self = this;
                if (self.checkedGroups.length === 0) {
                    self.$dispatch('transmit', 'tip', {contentText: '请先选择恢复项，再进行操作'});
                } else {
                    self.$dispatch('transmit', 'tip', {
                        contentText: '确定恢复以下名单吗？',
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    self.$off('operate-confirm');
                    self.$once('operate-confirm', function() {
                        console.log(self.checkedGroups)
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasBuyerBlackList/DelBuyerBlackList',
                            //contentType: 'application/json',
                            //data:JSON.stringify(self.checkedGroups)
                            data: {
                                Ids: self.checkedGroups,
                                Status: 0,
                            }
                        }).then(function(result) {
                            if (result.ResultCode === 1) {
                                self.$dispatch('transmit', 'tip', {contentText: '恢复成功'});
                                self.queryBlackList(true);
                            }
                            servers.NProgress.done();
                        });
                    });
                }
            },
            resultForm() {
                this.querys = {
                    Buyer: "",//买家
                    NetShopID: "",//店铺编号
                    Editor: "",//处理人
                    EditTimeBegin: "",//处理时间开始
                    EditTimeEnd: ""//处理时间结束
                };
            },
        },
};

</script>
