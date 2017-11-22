<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="query-form">
                <div class="form-inline query-detail">
<!--                     <div class="operate-form-title" style="margin-left:20px;">
                        <p>新增收费管理</p>
                    </div> -->
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>商家</label>
                            <select class="form-control" v-model="query.Status">
                                <option value="">紫云来旗舰店</option>
                                <option value=1>紫云来茶叶店</option>
                                <option value=0>紫云来超市</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row"> 
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">店铺名</label>
                            <input type="text" disabled="disabled"  class="form-control" placeholder="" v-model="query.Code">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">手机号</label>
                            <input type="text" disabled="disabled"  class="form-control" placeholder="" v-model="query.Name">
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">合计</label>
                            <input type="text" disabled="disabled"  class="form-control" placeholder="" v-model="query.Name">
                        </div>
                    </div> 
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                             <label>收讫</label>
                             <select class="form-control">
                                 <option value=1>是</option>
                                 <option value=0>否</option>
                             </select>
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-4">
                            <label class="form-group-text">收讫时间</label>
                            <div class="date-wrap">
                                <div class='input-group date' id='create-timepicker-start'>
                                    <input v-model="query.EditTimeBegin" disabled="disabled"  type='text' class="form-control"/>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div>
<!--                             <span style="margin:5px 10px 0 10px;">至</span>
                            <div class="date-wrap">
                                <div class='input-group date' id='create-timepicker-end'>
                                    <input v-model="query.EditTimeEnd"  type='text' class="form-control"/>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div> -->
                        </div> 
                    </div>
                    <div class="query-button-group">
                        <a  href="javascript:void(0)" class="btn btn-default">新增</a>
                        <!-- <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a> -->
                    </div>
                </div>
            </div>
            <div class="sheet-list ">
                <div class="row">
<!--                     <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <a v-link="{name: 'classify-add'}" class="btn btn-default">费用录入</a>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div> -->
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" ></th>
                                    <th>收费类型</th>
                                    <th>金额</th>
                                    <th>说明</th>
                                </tr>
                                </thead>
                      <!--           <tbody v-for="opt in articleConfigList" class="panel panel-default"> -->
                      <tbody v-for="n in 2" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td>
                                        <button>删除</button>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form1.name'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form1.title'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form1.age'>
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td>
                                        <button>删除</button>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form2.name'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form2.title'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form2.age'>
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td>
                                        <button>删除</button>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form3.name'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form3.title'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form3.age'>
                                    </td>
                                </tr>
                                <tr class="sheet-list-item">
                                    <td>
                                        <button>删除</button>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form4.name'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form4.title'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='form4.age'>
                                    </td>
                                </tr>
<!--                                 <tr class="sheet-list-item">
                                    <td>
                                        <button>删除</button>
                                    </td>
                                    <td>
                                        <input type="text" v-model='opt.Code'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='opt.Code'>
                                    </td>
                                    <td>
                                        <input type="text" v-model='opt.Name'>
                                    </td>
                                </tr> -->
                                </tbody>
                            </table>
<!--                             <div v-if="articleConfigList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果
                            </div> -->
                            <!-- <pagination :pagination-options="paginationOptions"></pagination> -->
                        </div>
                    <div class="operate-form-buttons" style="margin-top: 20px">
                        <a href="javascript:void(0)" class="btn btn-success">保存</a>
                        <a v-link="{name : 'shopList'}" style="margin-left: 20px" class="btn btn-warning">返回</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="less">
td {
    input {
        text-indent: 1em;
    }
}
    .danbtn {
        a {
            display: inline-block;
            width: 100px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid #000;
            margin-right: 20px;
            margin-top: 50px;
        }
    }
    .image-config-list-icon {
        &:before {
            background: #96dde7;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            line-height: 18px;
        }
    }
    .sheet-tab {
        a {
            cursor: pointer;
        }
    }
</style>

<script type="text/babel">
    import commonMethods from '../../../js/common';
    import servers from '../../../js/servers/servers';
    import pagination from '../../../components/pagination.vue';
    import datePicker from '../../../components/date_picker.vue';
    export default {
        data() {
            return {
                form1: {
                    name: '物业管理费',
                    title: '300',
                    age: '每月物业管理费300元',
                },
                form2: {
                    name: '其他',
                    title: '110',
                    age: '每月的杂费110元',
                },
                form3: {
                    name: '水电费',
                    title: '150',
                    age: '每月的水电费150元',
                },
                form4: {
                    name: '租金',
                    title: '1000',
                    age: '每月的租金1000元',
                },
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 15,
                    totalRecords: 0
                },
                query: {
                    Code: "",
                    Name: "",
                    Editor: "",
                    Note: "",
                    EditTimeBegin: "",
                    EditTimeEnd: "",
                    Status: -1,
                },
                articleConfigList: [], // 查询到的数据列表
            };
        },
        computed: commonMethods.selectAll('this.articleConfigList', function (item) {
            return item.MessageClassID;
        }),
        components: {
            datePicker,
            pagination,
        },
        events: {
            'page-change': function () {
                if (this.chooses == this.index) {
                    this.queryList(true);
                }
            },
        },
        methods: {
            /**
             * 重置表单
             */
            resultForm() {
                this.query = {
                    Code: "",
                    Name: "",
                    Editor: "",
                    Note: "",
                    EditTimeBegin: "",
                    EditTimeEnd: "",
                    Status: -1,
                };
            },
            /**
             * 查询数据
             */
            queryList(type) {
                var self = this;
                if (!type && self.paginationOptions.cur !== 1) return self.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMessageClass/QueryMessageClasses',
                    data: {
                        PageSize: self.paginationOptions.pageSize,
                        PageNumber: self.paginationOptions.cur,
                        SearchWhere: self.query,
                    },
                }).then(function (result) {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode == 1) {                       
                        if (data.length) {
                            self.paginationOptions.all = result.Data.TotalPages;
                            self.paginationOptions.totalRecords = result.Data.TotalRecords;
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            self.articleConfigList = data;
                        } else {
                            self.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                            self.articleConfigList = '';
                        }
                    }
                });
            },

            /**
             * 操作
             * @param {Boolean} 启用 1 禁用 0
             */
            operate(type) {
                var self = this;
                let tipText = '';
                if (type) {
                    tipText = '启用';
                } else {
                    tipText = '禁用';
                }
                if (self.checkedGroups.length === 0) {
                    self.$dispatch('transmit', 'tip', {contentText: '请先选择分类项，再进行操作!'});
                } else {
                    self.$dispatch('transmit', 'tip', {
                        contentText: `确定${tipText}该选项吗？`,
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    self.$off('operate-confirm');
                    self.$once('operate-confirm', function() {
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasMessageClass/UpdateStatus',
                            data: {
                                Ids: self.checkedGroups,
                                Status: type,
                            }
                        }).then(function(result) {
                            if (result.ResultCode === 1) {
                                self.$dispatch('transmit', 'tip', {contentText: `${tipText}成功`});
                                self.queryList(true);
                            }
                            servers.NProgress.done();
                        });
                    });
                }
            },
        },
        ready () {
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
    };

</script>
