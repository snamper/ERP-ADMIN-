        <script>
    import servers from '../../js/servers/servers'
    import getters from '../../js/vuex/getters';
    import actions from '../../js/vuex/actions';
    import datePicker from '../../components/date_picker.vue';
    // 利用表单数据生产html直接插入页面以达到节省性能的目的
    // import {createFormHtmlString} from './createFormHtmlString'
    import '../../css/bootstrap-datetimepicker.css';
    import '../../js/plugins/bootstrap-datetimepicker';
    const URL = 'http://192.168.88.99:999/Api';

    export default {
        data: function () {
            return {
                oldForm: {},
                SQLModel: false,
                tipShow: true,
                // show: false,
                queryTableWidth: 0,
                displayExprs: [],
                defaultValue: [],
                executeData: {},
                executeShow: false,
                executeTableShow: false,
                conditionShow: [],
                // 判断当前对象属性代表的元素是否已经绑定了时间插件
                judgeTimeBindEventObject: [],
                // 报表查询表单头部标题目前点击状态的索引
                reportTableHeaderIndex: 0,
                // 当前页数
                paginationOptions: {
                    cur: 1,
                    all: 0,
                    pageSize: 200,
                    totalRecords: 0
                },
                // 时间插件绑定模式，是两个还是一个，false 一个， true 两个。
                timePlugEven: [],
                table: []
            };
        },
        props: ['form', 'show', 'noCanRun', 'id'],
        vuex: {
            actions: {
                addReportTable: actions.addReportTable,
            },
            getters: {
                tables: getters.getReportTable,
            }
        },
        watch: {
            'show': function (show) {
                var id = this.$route.query.ReportID || this.$route.params.ReportID;

                if (show) {
                    if (this.tables[id]) {
                        this.conditionShow = this.tables[id].conditionShow;
                        this.displayExprs = this.tables[id].displayExprs;
                        this.defaultValue = this.tables[id].defaultValue;
                        this.executeData = this.tables[id].executeData;
                        this.oldForm = this.tables[id].oldForm;
                        this.executeTableShow = this.tables[id].executeTableShow;
                        this.queryTableWidth = this.tables[id].queryTableWidth;
                        this.timePlugEven = this.tables[id].timePlugEven;
                        this.SQLModel = this.tables[id].SQLModel;
                        this.noCanRun = this.tables[id].noCanRun;
                        this.executeShow = this.tables[id].executeShow;
                        this.table = this.tables[id].table;
                        this.reportTableHeaderIndex = this.tables[id].reportTableHeaderIndex;
                        this.paginationOptions = this.tables[id].paginationOptions;
                        this.form = this.tables[id].form;
                        this.tipShow = this.tables[id].tipShow;
                        this.$broadcast('changeTable', this.table);
                    } else {
                        this.showCore();
                    }
                } else {
                    this.noCanRun && this.hideCore();
                }
            }
        },
        components: {
            'pagination': require('../../components/pagination.vue'),
            'formView': require('./formView.vue'),
            'date-picker': datePicker,
        },
        events: {
            // 退出预览
            'quit-preview': function () {
                // 当不是从执行页面进入时，不能关闭
                if (this.noCanRun) this.show = false;
            },
            'page-change': function () {
                this.runReport(this.reportTableHeaderIndex, true);
            },
        },
        methods: {
            setTable: function () {
                var id = this.$route.query.ReportID || this.$route.params.ReportID;
                this.addReportTable({
                    name: id,
                    report: {
                        conditionShow: this.conditionShow,
                        displayExprs: this.displayExprs,
                        defaultValue: this.defaultValue,
                        executeData: this.executeData,
                        oldForm: this.oldForm,
                        executeTableShow: this.executeTableShow,
                        queryTableWidth: this.queryTableWidth,
                        timePlugEven: this.timePlugEven,
                        SQLModel: this.SQLModel,
                        noCanRun: this.noCanRun,
                        // executeShow: this.executeShow,
                        table: this.table,
                        reportTableHeaderIndex: this.reportTableHeaderIndex,
                        paginationOptions: this.paginationOptions,
                        form: this.form,
                        // tipShow: this.tipShow,
                    }
                });
            },
            /**
             * 绑定页面的按键事件
             */
            bindKeyEvents: function (event) {
                // keyCode
                // 该键盘监听事件监听ctrl键和字母的组合键
                // 69 E 键
                // 82 R 键
                // 88 X 键
                // 68 D 键
                // 阻止冒泡
                event.stopPropagation();
                // 阻止浏览器默认事件
                // event.preventDefault();
                if (event.ctrlKey) {
                    if (event.keyCode === 69) {
                        if (this.SQLModel === false) {
                            this.SQLModel = {
                                SQLBefore: this.form.SQLBefore,
                                SQLRunFieldList: this.form.SQLRunFieldList
                            };
                        } else {
                            this.SQLModel = false;
                        }
                    } else if (event.keyCode === 82) {
                        this.runReport();
                    } else if (event.keyCode === 88) {
                        if (this.noCanRun) this.show = false;
                    } else if (event.keyCode === 89) {
                        this.runReport(this.reportTableHeaderIndex, false)
                    }
                }
            },
            /**
             * 克隆对象
             * @param  {Object} obj 需要克隆的对象
             * @return {Object}     克隆出来的对象
             */
            clone: function (obj) {
                var o;
                switch(typeof obj){
                case 'undefined': break;
                case 'string'   : o = obj + '';break;
                case 'number'   : o = obj - 0;break;
                case 'boolean'  : o = obj;break;
                case 'object'   :
                    if(obj === null){
                        o = null;
                    }else{
                        if(obj instanceof Array){
                            o = [];
                            for(var i = 0, len = obj.length; i < len; i++){
                                o.push(this.clone(obj[i]));
                            }
                        }else{
                            o = {};
                            for(var k in obj){
                                o[k] = this.clone(obj[k]);
                            }
                        }
                    }
                    break;
                default:
                    o = obj;break;
                }
                return o;
            },
            /**
             * 开启预览的一系列处理
             */
            showCore: function () {
                let len = 0, findField = {}, wContentElement = $('.w-content');

                this.defaultValue = [];

                $('.preview-report-form').fadeIn(100);
                wContentElement.css('overflow', 'hidden').css('height', ($(window).height() - wContentElement.offset().top));
                $(document).on('keydown', this.bindKeyEvents);
                this.queryTableWidth = 100;
                this.oldForm = this.clone(this.form);

                for (let i in this.form.FindFieldList) {
                    findField = this.form.FindFieldList[i];

                    this.defaultValue.push({
                        startTime: '',
                        endTime: '',
                        DefaultValue: '',
                    });

                    if (/,/.test(findField.DefaultValue)) {
                        let defaultSplitValue = findField.DefaultValue.split(',');
                        this.defaultValue[i].startTime = defaultSplitValue[0];
                        this.defaultValue[i].endTime = defaultSplitValue[1];
                    } else {
                        this.defaultValue[i].DefaultValue = findField.DefaultValue;

                    }

                    if (findField.Width && parseInt(findField.Width) != 0) {
                        this.queryTableWidth += parseInt(findField.Width);
                    } else {
                        this.queryTableWidth += 150;
                    }

                    if (findField.FieldName !== '') {
                        len ++;
                    }
                }

                // 遍历出的查询条件为0时为用户提示相关信息
                if (len === 0 && this.noCanRun) {
                    return this.$dispatch('transmit', 'tip', {
                        contentText: '您没有任何查询条件，无法继续预览 | 请点击确认，返回上一级',
                        events: {
                            confirm: 'quit-preview'
                        }
                    })
                } else if (len === 0 && !this.noCanRun) {
                    return this.$dispatch('transmit', 'tip', {
                        contentText: '您没有任何查询条件，无法继续预览'
                    })
                }

                this.table = [];
                this.$broadcast('hideBody');
                this.paginationOptions = {
                    cur: 1,
                    all: 0,
                    pageSize: 200,
                    totalRecords: 0
                };

                this.exchangeReport();
            },
            /**
             * 关闭预览之前的一系列处理
             */
            hideCore: function () {
                $('.preview-report-form').fadeOut(200);
                $(document).off('keydown', this.bindKeyEvents);
                this.form = this.oldForm;
                this.table = [];
                this.tableHeader = {};
                this.defaultValue = [];
                this.executeShow = false;
                this.SQLModel = false;
                // 将判断绑定时间插件的数组清空，不然下次预览不能正常绑定时间插件。
                this.judgeTimeBindEventObject = [];
                this.paginationOptions = {
                    cur: 1,
                    all: 1,
                    pageSize: 200,
                };
                this.scroll = {
                    top: 0,
                    left: 0,
                    offsetLeft: 0,
                    offsetTop: 0
                }
                $('.w-content').css('height', 'auto')
            },
            /**
             * 执行报表。
             * @param  {number} index 当前主查询的索引值
             * @param  {Boolean} canRunReportForm 是否执行报表
             */
            runReport: function (index, canRunReportForm) {
                //if (this.form.FindFieldList[0].FieldName == '') return this.$dispatch('transmit', 'tip', {contentText: '请创建至少一个查询条件！'});
                // 创建一个新的查询条件列表
                let findFieldList = [];
                // 遍历当前的查询条件列表。将默认值归类。
                for (let i in this.form.FindFieldList) {
                    let findField = this.form.FindFieldList[i];
                    if (findField.DefaultValue == '' && findField.Required == '1' && !this.defaultValue[findField.SortIndex].DefaultValue) {
                        return this.$dispatch('transmit', 'tip', {
                            contentText: '" ' + findField.FieldName + ' "查询条件的值为必填项！'
                        })
                    } else {
                        let defaultValue = '';
                        let OtherExprReplaceReg = /\=.*/;

                        if (!/\|/.test(findField.OtherExpr)) {
                            defaultValue = this.defaultValue[findField.SortIndex].DefaultValue;
                            findField.OtherExpr = findField.OtherExpr.replace(OtherExprReplaceReg, '=' + defaultValue);
                        } else {
                            defaultValue = this.defaultValue[findField.SortIndex].startTime + ',' + this.defaultValue[findField.SortIndex].endTime;
                            findField.OtherExpr = findField.OtherExpr.split('|');
                            findField.OtherExpr[0] = findField.OtherExpr[0].replace(OtherExprReplaceReg, '=' + this.defaultValue[findField.SortIndex].startTime || '=');
                            findField.OtherExpr[1] = findField.OtherExpr[1].replace(OtherExprReplaceReg, '=' + this.defaultValue[findField.SortIndex].endTime || '=' );
                            findField.OtherExpr = findField.OtherExpr.join('|');
                        }
                        // 将符合条件的项push进新的查询条件列表
                        findFieldList.push({
                            Condition: findField.Condition,
                            DisplayExpr: findField.DisplayExpr,
                            FieldName: findField.FieldName,
                            FindExpr: findField.FindExpr,
                            FindType: findField.FindType,
                            MainFindUse: findField.MainFindUse,
                            OtherExpr: findField.OtherExpr,
                            Required: findField.Required,
                            SQLUseTo: findField.SQLUseTo,
                            SortIndex: findField.SortIndex,
                            Width: findField.Width,
                            DefaultValue: defaultValue || '',
                        })
                    }
                }
                // 判断index参数是否存在，并引用全局的主查询索引
                if (index) {
                    this.reportTableHeaderIndex = index;
                } else if (index === 0) {
                    this.reportTableHeaderIndex = index;
                }
                // 新建一个报表对象
                let reportFormObj = {
                        DisplayFieldList: this.form.DisplayFieldList,
                        EvenRowBackColor: this.form.EvenRowBackColor,
                        OddRowBackColor: this.form.OddRowBackColor,
                        SumBackColor: this.form.SumBackColor,
                        SumFontColor: this.form.SumFontColor,
                        ReportCode: this.form.ReportCode,
                        ReportGroupID: this.form.ReportGroupID,
                        ReportID: this.form.ReportID,
                        ReportMemo: this.form.ReportMemo,
                        ReportStatus: this.form.ReportStatus,
                        SQLAfter: this.form.SQLAfter,
                        SQLBefore: this.oldForm.SQLBefore,
                        SQLRunFieldList: this.oldForm.SQLRunFieldList,
                        FindFieldList: findFieldList,
                };
                // 是否执行报表
                if (canRunReportForm) {
                    this.postReport(this.reportTableHeaderIndex, reportFormObj);
                } else {
                    this.deriveReportForm(this.reportTableHeaderIndex, reportFormObj);
                }
            },
            /**
             * 导出报表
             */
            deriveReportForm: function (reportIndex, reportForm) {
                let self = this;
                servers.NProgress.start();
                this.tipShow= true;
                servers.postAjax.bind(this)({
                    url: '/ExportExcel/ReportExport',
                    data: {
                        MainSearch: reportIndex,
                        ReportEntity: reportForm,
                        PageIndex: this.paginationOptions.cur,
                        PageSize: 200,
                        ReportID: this.$route.params.ReportID || this.$route.query.ReportID,
                    },
                    success: function (result) {
                        self.tipShow = false;
                        servers.NProgress.done();
                        // 当服务器响应正确后 open 服务器返回的资源链接 供用户下载
                        if (result.ResultCode === 1) {
                            window.open(result.Data)
                        }
                    }
                });
            },
            /**
             * 与服务器交换报表数据
             */
            exchangeReport: function () {
                servers.NProgress.start();
                let self = this;
                servers.postAjax.bind(this)({
                    url: '/Report/ErpReportPreview',
                    data: this.form,
                    success: function (result) {
                        if (result.ResultCode == 1) {
                            let newFindFieldList = result.Data.FindFieldList;
                            let newDisplayExprs = [];
                            let conditionShow = [];
                            this.displayExprs = [];
                            this.conditionShow = [];
                            // 根据新的显示表达式返回的数据得到查询条件
                            for (let i in newFindFieldList) {
                                let displayExprStr = newFindFieldList[i].DisplayExpr;
                                // 拆分字符串变成下拉列表选项
                                if (displayExprStr) {
                                    let displayExprList = displayExprStr.split(',');
                                    let displayExprSelectList = [];
                                    // 将每个下拉选项的值分为value和name
                                    for (let displayExprIndex in displayExprList) {
                                        let displayExpr = {};
                                        if (/=/.test(displayExprList[displayExprIndex])) {
                                            let displayExprValues = displayExprList[displayExprIndex].split('=');
                                            displayExpr.name = displayExprValues[1];
                                            displayExpr.value = displayExprValues[0];
                                            displayExprSelectList.push(displayExpr);
                                        }
                                    }
                                    // 将新生成的数据结构，按照每个查询的SortIndex值的索引插入选项数组
                                    newDisplayExprs[newFindFieldList[i].SortIndex] = displayExprSelectList;
                                } else {
                                    // 没有显示表达式的时候，直接指定SortIndex索引位置为一个空的数组
                                    newDisplayExprs[newFindFieldList[i].SortIndex] = [];
                                }
                                // 替换查询值
                                let displayOtherExpr = newFindFieldList[i].OtherExpr;

                                if (displayOtherExpr) {
                                    if (/\|/.test(displayOtherExpr)) {
                                        // 此处需要调用日期插件
                                        conditionShow[newFindFieldList[i].SortIndex] = true;
                                    } else {
                                        // 此处只需要单选输入框或者下拉列表选项即可
                                        conditionShow[newFindFieldList[i].SortIndex] = false;
                                    }
                                }
                                let defaultValue = newFindFieldList[i].DefaultValue;
                                if (newFindFieldList[i].FieldName) {
                                        if (/index\:/.test(defaultValue)) {
                                        this.timePlugEven[newFindFieldList[i].SortIndex] = false;
                                        newFindFieldList[i].DefaultValue = newDisplayExprs[newFindFieldList.SortIndex].value;
                                    } else if (/\|/.test(defaultValue)) {
                                        this.defaultValue[newFindFieldList[i].SortIndex].startTime = defaultValue.split('|')[0];
                                        this.defaultValue[newFindFieldList[i].SortIndex].endTime = defaultValue.split('|')[1];
                                        this.timePlugEven[newFindFieldList[i].SortIndex] = true;
                                    } else {
                                        this.defaultValue[newFindFieldList[i].SortIndex].startTime = defaultValue;
                                        this.timePlugEven[newFindFieldList[i].SortIndex] = false;
                                    }
                                }
                            }
                            // 必须push，不然不会刷新视图
                            for (var i = 0; i < newDisplayExprs.length; i++) {
                                this.displayExprs.push(newDisplayExprs[i]);
                                this.conditionShow.push(conditionShow[i]);
                            }
                            this.tipShow = false;
                            // this.setTable();
                            servers.NProgress.done();
                            this.$broadcast('clearView');
                        }
                    }.bind(this)
                })
            },
            /**
             * 绑定时间插件
             * @param  {string} id 元素的id属性
            */
            bindTimePlug: function (id, time) {
                if (this.judgeTimeBindEventObject[id]) {
                    return;
                }
                this.judgeTimeBindEventObject[id] = true;
                $('#' + id).datetimepicker({
                    // format: 'dd MM yyyy - hh:ii:ss',
                    startDate: time,
                });
            },
            /**
             * 执行报表：提交报表数据的得到执行结果
             * @param  {number} mainQuery    当前的主查询项
             * @param  {object} reportObject 当前需要提交的报表查询数据对象
             */
            postReport: function (mainQuery, reportObject) {
                servers.NProgress.start();
                this.tipShow = true;
                servers.postAjax.bind(this)({
                    url: '/Report/ExecuteDataSet',
                    data: {
                        MainSearch: mainQuery,
                        ReportEntity: reportObject,
                        PageIndex: this.paginationOptions.cur,
                        PageSize: 200,
                        ReportID: this.$route.params.ReportID || this.$route.query.ReportID
                    },
                    success: function (result) {
                        servers.NProgress.done();
                        this.tipShow = false;
                        this.setExecuteData(result);
                    }.bind(this)
                })
            },
            /**
             * 写入交换数据
             * @param {Object} data 需要进行交换的数据，是从服务器返回的数据
             */
            setExecuteData: function (data) {
                let executeData = eval('(' + data + ')');
                this.executeData = executeData.report;
                // return console.log(executeData);
                let report = executeData.report;
                this.form.SQLRunFieldList = report.SQLRunFieldList;
                this.form.SQLBefore = report.SQLBefore;

                if (executeData.ResultCode === -1) {
                    this.table = [];
                    this.executeData = {};
                    this.tableHeader = {};
                    this.executeTableShow = false;
                    this.$broadcast('clearFormView');
                    return this.$dispatch('transmit', 'tip', {contentText: executeData.ErrorMessage})
                }

                this.executeTableShow = true;
                this.paginationOptions.cur = executeData.PageData.PageNumber;
                this.paginationOptions.all = executeData.PageData.TotalPages;
                this.paginationOptions.totalRecords = executeData.PageData.TotalRecords;
                this.executeShow = true;
                this.table = executeData.Table;
                this.setTable();
                this.$broadcast('changeTable', this.table);
            },
        }
    }
</script>
<template>
    <div class="preview-report-form" v-show="show" :style="
    {
        position: noCanRun ? 'fixed' : 'inherit',
    }
    ">
        <div class="click-element close-btn-wrap" @click="show = false" v-if="noCanRun">
            <span>关闭</span>
        </div>
        <div class="content">
            <header class="p-header" v-if="noCanRun">
                <h3>报表预览 <span v-if="tipShow">正在查询......</span></h3>

                    <!-- {{executeData | json}} -->
            </header>
            <section class="p-icons clearfix" :style="
            {
                padding: '10px',
                }">
                <span class="iconfont icon-play click-element" data-toggle="tooltip" data-placement="top" title="执行（ctrl + r）" @click="runReport(this.reportTableHeaderIndex, true)" style="background-color: #92a5d3"></span>
                <span class="iconfont icon-report-export click-element" data-toggle="tooltip" data-placement="top" title="导出（ctrl + y）" @click="runReport(this.reportTableHeaderIndex, false)" style="background-color: #92d3bf; font-size: 24px;"></span>
                <span class="iconfont icon-report-exit click-element" data-toggle="tooltip" data-placement="top" title="退出（ctrl + x）" @click="show = false" v-if="noCanRun" style="background-color: #92a5d3"></span>
                <span class="iconfont icon-look click-element" data-toggle="tooltip" data-placement="top" title="查看 SQL 语句（ctrl + e）" style="background-color: #d392a6" @click="SQLModel = {
                    SQLBefore: form.SQLBefore,
                    SQLRunFieldList: form.SQLRunFieldList
                    }"></span>
            </section>
            <section>
                <div class="SQL-box" v-if="SQLModel">
                    <div class="table-main">
                        <header>
                            <div class="header">
                                <span>查看 SQL 语句</span>
                                <div class="click-element close-btn-wrap" @click="SQLModel = false">
                                    <span>关闭</span>
                                </div>
                            </div>
                        </header>
                        <div class="main">
                            <header>
                                <p class="bg-info">预处理</p>
                            </header>
                            <div class="SQL">
                                <textarea readonly style="height: 300px;">{{SQLModel.SQLBefore}}</textarea>
                            </div>
                        </div>
                        <div class="main" v-for="SQL in SQLModel.SQLRunFieldList" v-if="SQL.SQL.length > 0">
                            <header>
                                <p class="bg-info">{{SQL.FieldName || '主查询' + ($index + 1)}}</p>
                            </header>
                            <div class="SQL">
                                <textarea readonly>{{SQL.SQL}}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="p-query-tabel">
                    <div class="row">
                        <div class="col-lg-12 wrap-slide">
                            <table class="table table-bordered" :style="'width:' + queryTableWidth + 'px;'">
                                <tbody>
                                    <tr>
                                        <th style="width: 100px">
                                            查询条件
                                        </th>
                                        <th v-for="findField in form.FindFieldList | orderBy 'SortIndex'" :style="'width:' + findField.Width + 'px;'" v-if="findField.FieldName != ''">
                                            {{findField.FieldName}}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="width: 100px">
                                            条件
                                        </td>
                                        <td v-for="findField in form.FindFieldList | orderBy 'SortIndex'" :style="'width:' + findField.Width + 'px;'" v-if="findField.FieldName != ''">
                                            <select v-model="defaultValue[$index].DefaultValue" v-if="displayExprs[findField.SortIndex].length > 0 && !conditionShow[$index]">
                                                <option v-for="displayExpr in displayExprs[findField.SortIndex]" value="{{displayExpr.value}}">{{displayExpr.name}}</option>
                                            </select>
                                        <input type="text" v-model="defaultValue[$index].DefaultValue" v-if="displayExprs[findField.SortIndex].length == 0 && !conditionShow[$index]">
                                            <!-- <div class='input-group date' v-if="conditionShow[$index]" @mouseover="bindTimePlug('timepicker-start_' + $index), defaultValue[$index].startTime " :id="'timepicker-start_' + $index">
                                                <input v-model="defaultValue[$index].startTime | formatDate" type='text' class="form-control" :placeholder=" timePlugEven[findField.SortIndex] ? '开始时间' : '时间'"/>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                            <div class='input-group date' v-if="conditionShow[$index] && timePlugEven[findField.SortIndex]" @mouseover="bindTimePlug('timepicker-end_' + $index, defaultValue[$index].endTime )" :id="'timepicker-end_' + $index">
                                                <input v-model="defaultValue[$index].endTime | formatDate" type='text' class="form-control" placeholder="结束时间"/>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div> -->
                                            <div v-if="conditionShow[$index] && timePlugEven[findField.SortIndex]">
                                                <date-picker :start-date.sync="defaultValue[$index].startTime" :end-date.sync="defaultValue[$index].endTime"></date-picker>
                                            </div>
                                            <div v-if="conditionShow[$index] && !timePlugEven[findField.SortIndex]">
                                                <date-picker :start-date.sync="defaultValue[$index].startTime"></date-picker>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <div class="col-lg-2">
                            暂未实现功能
                        </div> -->
                    </div>
                </div>
            </section>
            <div class="p-detail">
                <div class="row">
                    <section class="clearfix">
                        <div class="btn-group col-lg-12" role="group">
                          <button v-for="report in form.SQLRunFieldList" type="button" class="btn btn-default" :class="{'active': reportTableHeaderIndex === $index}"
                          @click="runReport($index, true)" v-if="report.SQL">
                              {{report.FieldName || '查询' + ($index + 1)}}
                          </button>
                        </div>
                    </section>
                    <section>
                        <form-view :form-data="executeData" :sql-index="reportTableHeaderIndex" :table="table"></form-view>
                        <pagination :pagination-options="paginationOptions"></pagination>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<style media="screen" lang="less">
    .preview-report-form {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #eee;
        z-index: 999;
        overflow: auto;

        .close-btn-wrap {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 10px;
            background: #ccc;
        }

        .p-header {
            height: 54px;
            width: 100%;
            background: #fff;

            h3 {
                margin: 0;
                height: 100%;
                line-height: 54px;
                padding-left: 20px;

                span {
                    font-size: 12px;
                    display: inline-block;
                    padding-left: 10px;
                }
            }
        }

        .p-icons {
            background: #ddd;
            padding: 0 20px;
            width: 100%;

            .iconfont {
                margin-right: 20px;
                font-size: 14px;
                width: 30px;
                height: 30px;
                display: block;
                float: left;
                background: #7dd89d;
                text-align: center;
                line-height: 30px;
            }

            .icon-quit {
                background: red;
            }

            .iconfont:before {
                color: #fff;
                background: none;
            }
        }

        .p-query-tabel {
            background: #fff;
            padding: 20px;
            margin-top: 20px;

            .wrap-slide {
                // overflow: auto;
            }
            table {
                max-width: auto;
                margin-bottom: 0;
                table-layout: fixed;

                th {
                    overflow: hidden;
                }

                td {
                    // overflow: hidden;

                    input {
                        max-width: 100%;
                    }

                    select {
                        max-width: 100%;
                    }
                }
            }
        }

        .p-detail {
            background: #fff;
            padding: 20px;
            margin-top: 20px;
            overflow: auto;

            .header {

                h4 {
                    background: #ededed;
                    padding: 10px;
                }
            }

            .tag {
                width: 200px;
                padding: 10px;
                text-align: center;
                overflow: hidden;
                background: #fff;
            }

            .overflow-auto {
                width: 100%;
                float: none;
                // max-height: 100px;
                overflow-x: scroll;
                // position: relative;

               .table-label-header {
                    top: 0;
                    left: 60px;
                    // position: absolute;
                }

            }

        }

        .SQL-box {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 10000;
            overflow-y: scroll;

            .table-main {
                width: 80%;
                margin: 100px auto;
                background-color: #fff;
                padding: 10px;
                border: 15px solid #333;


                .header {
                    height: 40px;
                    width: 100%;
                    position: relative;

                    span {
                        font-size: 16px;
                        line-height: 40px;
                    }

                    .close-btn-wrap {
                        top: 0px;
                        right: 0px;

                        span {
                            font-size: 12px;
                            line-height: normal;
                        }
                    }
                }

                textarea {
                    width: 100%;
                    margin: 0;
                    padding: 10px;
                    border: 0;
                    height: 60px;
                    resize: none;
                    font-size: 14px;
                    line-height: 1.5;
                    position: inherit;
                }
            }
        }
    }
</style>
