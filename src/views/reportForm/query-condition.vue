<script lang="coffee">
    # 全局服务
    servers = require '../../js/servers/servers'

    module.exports =
        props: ['form']
        data: () ->
            return data =
                ActiveSQL: {}
        watch:
            'form': (form) ->
                if form.FindFieldList.length is 0
                    form.FindFieldList.push
                        SortIndex: 0
                        FieldName: ''
                        FindType: 0
                        FindExpr: ''
                        Condition: 0
                        DefaultValue: ''
                        Required: 0
                        MainFindUse: 0
                        DisplayExpr: ''
                        OtherExpr: ''
                        SQLUseTo: ''
                        Width: ''
        methods:
            moveSQL: (count) ->
                return @$dispatch 'transmit', 'tip', contentText: '请选择一列!' if not @ActiveSQL.SortIndex?
                len = @form.FindFieldList.length
                sortIndex = @ActiveSQL.SortIndex
                return @$dispatch 'transmit', 'tip', contentText: '当前的列已经置顶,不能上移!' if sortIndex is 0 and count is -1
                return @$dispatch 'transmit', 'tip', contentText: '当前的列已经在末尾,不能下移!' if sortIndex is len - 1 and count is 1
                newIndex = @ActiveSQL.SortIndex + count
                oldSQL = SQL for SQL in @form.FindFieldList when SQL.SortIndex is newIndex
                oldSQL.SortIndex = @ActiveSQL.SortIndex
                @ActiveSQL.SortIndex = newIndex
            ###*
             * 插入SQL
             * @param  {object} SQL 当前选中的SQL
             *###
            insertSQL: (SQL) ->
                return @$dispatch 'transmit', 'tip', contentText: '请先选择一行!' if not @ActiveSQL.SortIndex?
                activeIndex = SQL.SortIndex
                sql.SortIndex = sql.SortIndex + 1 for sql in @form.FindFieldList when sql.SortIndex >= activeIndex
                @form.FindFieldList.push
                    SortIndex: activeIndex
                    FieldName: ''
                    FindType: 0
                    FindExpr: ''
                    Condition: 0
                    DefaultValue: ''
                    Required: 0
                    MainFindUse: 0
                    DisplayExpr: ''
                    OtherExpr: ''
                    SQLUseTo: ''
                    Width: ''
            ###*
             * 选择SQL
             * @param  {object} SQL 当前选中的SQL
             *###
            selectSQL: (SQL) ->
                @ActiveSQL = SQL
            ###*
             * 删除SQL
             * @param  {object} SQL 需要删除的SQL
             *###
            deleteSQL: (SQL) ->
                len = 0
                len = len + 1 for sql in @form.DisplayFieldList when sql.SQLIndex is @ActiveSQL.SQLIndex
                return @$dispatch 'transmit', 'tip', contentText: '当前列表长度为1，不能删除！' if len is 1
                @form.FindFieldList.$remove @ActiveSQL
                findField.SortIndex = findField.SortIndex - 1 for findField in @form.FindFieldList when findField.SortIndex > @ActiveSQL.SortIndex
                @ActiveSQL = {}
</script>
<template id="query-condition">
    <div class="container-fluid">
        <div class="row">
            <form>
                <div class="col-lg-12">
                    <div class="panel panel-default panel-statement">
                        <div class="panel-heading">
                            <span style="float: left; margin: 6px 30px 0 0;">查询条件设置</span>
                            <button class="btn btn-default" role="button" @click="moveSQL(-1)">上移</button>
                            <button class="btn btn-default" role="button" @click="moveSQL(1)">下移</button>
                            <button class="btn btn-default" role="button" @click="insertSQL(ActiveSQL)">插入</button>
                            <button class="btn btn-default" role="button" @click="deleteSQL">删除</button>
                            <span class="text-danger">对于非主查询语句（预处理、数据处理）的数值请使用[条件提示名称]代替！</span>
                        </div>
                        <div class="panel-body">
                            <div class="checkbox-list">
                                <div class="tabble-wrap" style="overflow-x: auto; width: 100%;">
                                    <table class="table table-bordered table-query-condition">
                                        <thead>
                                            <tr>
                                                <td>条件提示</td>
                                                <td>条件类型</td>
                                                <td>查询字段</td>
                                                <td>比较条件</td>
                                                <td>默认值</td>
                                                <!-- <td>条件提示</td> -->
                                                <td>必须？</td>
                                                <td>主查询用</td>
                                                <td>显示表达式</td>
                                                <td>查询替换值</td>
                                                <td>适用主查询</td>
                                                <td>宽度</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="findfield in form.FindFieldList | orderBy 'SortIndex'" @click="selectSQL(findfield)" :class="{'active': findfield.SortIndex == ActiveSQL.SortIndex}">
                                                <td>
                                                    <input type="text" v-model="findfield.FieldName">
                                                </td>
                                                <td>
                                                    <select v-model="findfield.FindType">
                                                        <option value="0">数字</option>
                                                        <option value="1">字符</option>
                                                        <option value="2">日期</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="input" v-model="findfield.FindExpr">
                                                </td>
                                                <td>
                                                    <select v-model="findfield.Condition">
                                                        <option value="0">枚举</option>
                                                        <option value="1">等于</option>
                                                        <option value="2">范围</option>
                                                        <option value="3">在之间</option>
                                                        <option value="4">包含</option>
                                                        <option value="5">不等于</option>
                                                        <option value="6">大于</option>
                                                        <option value="7">大于等于</option>
                                                        <option value="8">小于等于</option>
                                                        <option value="9">不在之间</option>
                                                        <option value="10">不包含</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" v-model="findfield.DefaultValue" style=" margin-top: -3px;" placeholder="默认值">
                                                    <select v-model="findfield.DefaultValue" style="width: 20px;">
                                                        <option value="{{findfield.DefaultValue}}">手动输入</option>
                                                        <option value="昨天">昨天</option>
                                                        <option value="今天">今天</option>
                                                        <option value="明天">明天</option>
                                                        <option value="本年月">本年月</option>
                                                        <option value="月初">月初</option>
                                                        <option value="第一条">第一条</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="checkbox" :true-value="1" :false-value="0" v-model="findfield.Required">
                                                </td>
                                                <td>
                                                    <input type="checkbox" :true-value="1" :false-value="0" v-model="findfield.MainFindUse">
                                                </td>
                                                <td>
                                                    <input type="text" v-model="findfield.DisplayExpr">
                                                </td>
                                                <td>
                                                    <input type="text" v-model="findfield.OtherExpr">
                                                </td>
                                                <td>
                                                    <input type="text" v-model="findfield.SQLUseTo">
                                                </td>
                                                <td>
                                                    <input type="text" v-model="findfield.Width">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p class="bg-warning" style="padding: 10px;">显示标签：设置列的显示名称，如果要显示双表头，请使用“|”分隔</p>
                                <p class="bg-warning" style="padding: 10px; line-height: 1.8;">
                                    对于非主查询（预处理、数据处理）SQL语句中的条件值请使用[条件提示]来代替查询条件，对于“在之间”等有两个值的查询条件请使用[条件提示1]和[条件提示2]代替。
                                    <br>
                                    如果要设置复杂的预处理语句，请设置“查询替换值”，其格式为“变量名=SQL语句+[条件提示]”，当有多个变量时使用“|”分隔，具体实例为：%T%= and sheettype=[条件提示]或 %D1%='[条件提示1]' | %D2%='[条件提示2]'
                                 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group form-limit-width essential-btns">
                    <a href="javascript:void(0)" @click="$dispatch('post-report')" class="btn btn-primary"> 保存 </a>
                    <a href="#!/report-form" class="btn btn-primary"> 返回列表 </a>
                    <a href="javascript:void(0)" @click="$dispatch('preview-show')" class="btn btn-primary"> 预览 </a>
                </div>
            </form>
        </div>
    </div>
</template>
<style media="screen">
    .table-query-condition {
        text-align: center;
        max-height: 300px;
        overflow-y: auto;
    }
</style>
