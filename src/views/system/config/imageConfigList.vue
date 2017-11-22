<template>
    <div>
        <div class="container-fluid container-fluid-margin">
            <div class="query-form">
                <div class="form-inline query-detail">
                    <div class="row">
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label>状态</label>
                            <select class="form-control" v-model="query.Status">
                                <option value="">不限</option>
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改时间</label>
                            <date-picker :start-date.sync='query.BeginEditTime' :end-date.sync='query.EndEditTime'></date-picker>
                        </div>
                        <div class="form-group col-lg-3 col-md-4 col-sm-6">
                            <label class="form-group-text">修改人</label>
                            <input type="text" class="form-control" placeholder="" v-model="query.Editor">
                        </div>
                    </div>
                    <div class="query-button-group">
                        <a @click="queryList" href="javascript:void(0)" class="btn btn-default">搜索</a>
                        <a @click="resultForm" href="javascript:void(0)" class="btn btn-default">重置</a>
                    </div>
                </div>
            </div>
            <div class="sheet-list ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="batch-operation">
                            <div class="batch-operation-group">
                                <label>批量操作：</label>
                                <a @click="operate(1)" href="javascript:void(0)" class="btn btn-default">启用</a>
                                <a @click="operate(0)" href="javascript:void(0)" class="btn btn-default">禁用</a>
                            </div>
                        </div>
                        <div class="sheet-list-table table-responsive">
                            <table class="table table-condensed panel-group" id="sheet-list" role="tablist">
                                <thead class="sheet-list-header">
                                <tr>
                                    <th class="sheet-header-state"><input type="checkbox" v-model="selectAll"></th>
                                    <th>图片位置</th>
                                    <th>分辨率</th>
                                    <th>修改时间</th>
                                    <th>修改人</th>
                                    <th>备注</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody v-for="opt in imageConfigList" class="panel panel-default">
                                <tr class="sheet-list-item">
                                    <td><input type="checkbox" name="" value="" v-model="opt.checked"></td>
                                    <td>{{opt.ImageTypeDesc}}</td>
                                    <!-- <td>{{
                                        opt.ImageTypeID === 1 && '登录页logo' ||
                                        opt.ImageTypeID === 2 && '导航头部' ||
                                        opt.ImageTypeID === 3 && '微信关注' ||
                                        opt.ImageTypeID === 4 && '防伪查询' ||
                                        opt.ImageTypeID === 5 && '首页广告' ||
                                        opt.ImageTypeID === 6 && '微官网头部品牌' ||
                                        opt.ImageTypeID === 7 && '微官网宣传图1' ||
                                        opt.ImageTypeID === 8 && '微官网宣传图2' ||
                                        opt.ImageTypeID === 9 && '微官网宣传图3' ||
                                        opt.ImageTypeID === 10 && '微官网宣传图4' ||
                                        opt.ImageTypeID === 11 && '微官网宣传图5' || 
                                        opt.ImageTypeID === 12 && '微商城宣传图1' || 
                                        opt.ImageTypeID === 13 && '微商城宣传图2' || 
                                        opt.ImageTypeID === 14 && '微商城宣传图3' || 
                                        opt.ImageTypeID === 15 && '微商城宣传图4' || 
                                        opt.ImageTypeID === 16 && '微商城宣传图5' || 
                                        opt.ImageTypeID === 17 && '微商城全球闪购' || 
                                        opt.ImageTypeID === 18 && '微商城Top排行榜' || 
                                        opt.ImageTypeID === 19 && '微商城多件购买更优' || 
                                        opt.ImageTypeID === 20 && '微商城推荐商品1' || 
                                        opt.ImageTypeID === 21 && '微商城推荐商品2' || 
                                        opt.ImageTypeID === 22 && '微商城推荐商品3' || 
                                        opt.ImageTypeID === 23 && '微商城专题' || 
                                        ''
                                        }}</td> -->
                                    <td>{{opt.Resolution}}</td>
                                    <td>{{opt.EditTime.split('T')[0]}}</td>
                                    <td>{{opt.Editor}}</td>
                                    <td>{{opt.Note}}</td>
                                    <td>{{opt.Status === 1 ? '启用' : '禁用'}}</td>
                                    <td class="state-forbid">
                                        <a @click="edit(opt)" data-toggle="tooltip" data-placement="top"
                                           title="修改">
                                            <span class="click-element iconfont icon-edit image-config-list-icon"></span>
                                        </a>
                                        <!-- <a @click="see(opt)" data-toggle="tooltip" data-placement="top"
                                            title="查看">
                                            <span class="click-element iconfont icon-look"></span>
                                        </a> -->
                                        <a @click="seeImage(opt)" data-toggle="tooltip" data-placement="top"
                                            title="查看图片 ">
                                            <span class="click-element iconfont icon-image image-config-list-icon" ></span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-if="clientBalanceList.length == 0 && !$loadingRouteData " class="no-data">没有可供显示的结果
                            </div>
                            <pagination :pagination-options="paginationOptions"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改图片 -->
        <image-config-component 
        :show.sync="modalShow" 
        :form.sync="actionImageObject" 
        :disabled="formDisabled">
            
        </image-config-component>
    </div>

</template>

<style lang="less">
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

<script>

    import commonMethods from '../../../js/common';

    import servers from '../../../js/servers/servers';

    import pagination from '../../../components/pagination.vue';

    import datePicker from '../../../components/date_picker.vue';

    import ImageConfigComponent from './imageConfig.vue';

    export default {
        data() {
            return {
                imageConfigList: [], // 查询到的数据列表
                query: {
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
                }, // 查询表单
                actionImageObject: {}, // 当前选择的要进行修改的配置图片对象
                modalShow: false, // 模态窗口是否显示
                formDisabled: false, // 是否禁止更改表单
                paginationOptions: {
                    all: 1,
                    cur: 1,
                    pageSize: 100,
                    totalRecords: 0
                },
            };
        },
        computed: commonMethods.selectAll('this.imageConfigList', function (item) {
            return item.ResourceConfigID;
        }),
        components: {
            datePicker,
            ImageConfigComponent,
        },
        ready() {
//            this.resultForm();
            this.queryList(true);
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
                    BeginEditTime: '',
                    EndEditTime: '',
                    Editor: '',
                    Status: '',
                };
            },
            /**
             * 查询数据
             */
            queryList(type) {
                if (!type && this.paginationOptions.cur !== 1) return this.paginationOptions.cur = 1;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasResourceConfig/ErpQueryResourceConfig',
                    data: {
                        PageSize: this.paginationOptions.pageSize,
                        PageNumber: this.paginationOptions.cur,
                        SearchWhere: this.query,
                    },
                }).then((result) => {
                    const data = result.Data.PageData;
                    servers.NProgress.done();
                    if (result.ResultCode) {
                        if (data.length) {
                            for (let i in data) {
                                data[i].checked = false;
                            }
                            this.imageConfigList = data;
                        } else {
                            this.$dispatch('transmit', 'tip', {contentText: '未搜索到数据'});
                        }
                    }
                })
            },
            /**
             * 操作
             * @param {Boolean} 启用 1 禁用 0
             */
            operate(type) {
                let tipText = '';
                if (type) {
                    tipText = '启用';
                } else {
                    tipText = '禁用';
                }
                if (this.checkedGroups.length === 0) {
                    this.$dispatch('transmit', 'tip', {contentText: '请先选择图片配置项，再进行操作'});
                } else {
                    this.$dispatch('transmit', 'tip', {
                        contentText: `确定${tipText}该选项吗？`,
                        events: {
                            confirm: 'operate-confirm',
                        },
                    });
                    this.$off('operate-confirm');
                    this.$once('operate-confirm', () => {
                        servers.NProgress.start();
                        servers.postAjax.bind(this)({
                            url: '/BasResourceConfig/UpdateStatus',
                            data: {
                                IDList: this.checkedGroups,
                                Status: type,
                            }
                        }).then((result) => {
                            if (result.ResultCode === 1) {
                                this.$dispatch('transmit', 'tip', {contentText: `${tipText}成功`});
                                this.queryList(true);
                            }
                            servers.NProgress.done();
                        });
                    })
                }
            },
            edit(imageConfigObj) {
                this.actionImageObject = imageConfigObj;
                this.modalShow = true;
                this.formDisabled = false;
            },
            seeImage(imageConfigObj) {
                const id = imageConfigObj.ResourceConfigID;
                // 新窗口名称
                // const newWindowName = imageConfigObj.ImageTypeID === 1 
                // && '系统LOGO' || imageConfigObj.ImageTypeID === 2 
                // && '代理头部' || imageConfigObj.ImageTypeID === 3 
                // && '微信关注' || imageConfigObj.ImageTypeID === 4
                // && '首页广告' || imageConfigObj.ImageTypeID === 5
                // && '防伪查询' || null;
                servers.NProgress.start();
                servers.postAjax.bind(this)({
                    url: 'ImportImage/QueryImages',
                    data: {
                        ID: id,
                    }
                }, './').then((result) => {
                    debugger
                    const time = new Date().getTime();
                    if (result.ResultCode == 1) {
                        window.open(result.Data.split(',')[0] + '?v=' + time);
                    }
                    servers.NProgress.done();
                });
            },
            see(imageConfigObj) {
                this.actionImageObject = imageConfigObj;
                this.modalShow = true;
                this.formDisabled = true;
            },
        },
    };

</script>
