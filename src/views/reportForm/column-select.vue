<template id="column-select">
    <div class="container-fluid">
        <div class="row">
            <form>
                <div class="col-lg-12">
                    <div class="panel panel-default panel-statement">
                        <div class="panel-heading"> 主查询选择 </div>
                        <div class="panel-body">
                            <div class="checkbox-list">
                                <label class="checkbox-inline" v-for="radio in radioNames">
                                    <input v-model="selectIndex" type="radio" value="{{$index}}"><span>{{radio}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default panel-statement" v-for="queryFormTitle in radioNames" v-show="$index == selectIndex">
                        <div class="panel-heading">
                            <span style="float: left; margin: 6px 30px 0 0;">{{queryFormTitle}}显示列设置</span>
                            <button class="btn btn-default" role="button" @click="moveSQL(-1)">上移</button>
                            <button class="btn btn-default" role="button" @click="moveSQL(1)">下移</button>
                            <button class="btn btn-default" role="button" @click="insertSQL(ActiveSQL)">插入</button>
                            <button class="btn btn-default" role="button" @click="deleteSQL">删除</button>
                            <button class="btn btn-default" role="button" @click="autoSetting">自动设置</button>
                            <!-- 暂时不做 -->
                            <!-- <button class="btn btn-default" role="button">确认</button> -->
                            <span class="text-danger">列设置修改后，必须点击确认生效，否则忽略</span>
                        </div>
                        <div class="panel-body">
                            <div class="checkbox-list">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                字段名称
                                            </th>
                                            <th>
                                                显示标签
                                            </th>
                                            <th>
                                                显示宽度
                                            </th>
                                            <th>
                                                显示格式
                                            </th>
                                            <th>
                                                显示表达式
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="SQL in form.DisplayFieldList | orderBy 'SortIndex'" v-show="SQL.SQLIndex == selectIndex" @click="selectSQL(SQL)" :class="{'active': SQL.SortIndex == ActiveSQL.SortIndex && SQL.SQLIndex == ActiveSQL.SQLIndex}">
                                            <td>
                                                <input type="text" v-model="SQL.FieldName">
                                            </td>
                                            <td>
                                                <input type="text" v-model="SQL.DisplayLabel">
                                            </td>
                                            <td>
                                                <input type="text" v-model="SQL.DisplayWidth">
                                            </td>
                                            <td>
                                                <input type="text" v-model="SQL.DisplayMask">
                                            </td>
                                            <td>
                                              <input type="text" v-model="SQL.DisplayExpr">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p class="bg-warning" style="padding: 10px;">显示标签：设置列的显示名称，如果要显示双表头，请使用“|”分隔</p>
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
<script lang="coffee">
    # 全局服务
    servers = require '../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.99:999/Api'

    module.exports =
        data: () ->
            return data =
                selectIndex: 0
                # 固定四个查询
                radioNames: ['主查询1', '主查询2', '主查询3', '主查询4']
                # 当前选中的sql
                ActiveSQL: {}
        props: ['form']
        ready: () ->
            # 预加载sql列表
            for sql in @form.DisplayFieldList
                sql.SortIndex = parseInt sql.SortIndex
                sql.SQLIndex  = parseInt sql.SQLIndex
        methods:
            ###*
             * 选择SQL
             * @param  {object} SQL 选择的SQL对象
             *###
            selectSQL: (SQL) ->
                @ActiveSQL = SQL
            ###*
             * 插入SQL
             * @param  {object} SQL 在当前SQL前新增一条
             *###
            insertSQL: (SQL) ->
                return @$dispatch 'transmit', 'tip', contentText: '请先选择一行!' if not @ActiveSQL.SortIndex?
                # 当前选择的SQL对象的索引值
                index = SQL.SortIndex
                # 当前选择的SQL及后面所有的SQL索引值加一
                s.SortIndex = s.SortIndex + 1 for s in @form.DisplayFieldList when s.SQLIndex is SQL.SQLIndex and s.SortIndex >= index
                @form.DisplayFieldList.push
                    SQLIndex: SQL.SQLIndex
                    SortIndex: index
                    FieldName: ''
                    DisplayLabel: ''
                    DisplayWidth: ''
                    DisplayMask: ''
            ###*
             * 移动SQL
             * @param  {object} count 计算程式 1： 位置增加1 下移； -1： 位置减1 上移；
             *###
            moveSQL: (count) ->
                return @$dispatch 'transmit', 'tip', contentText: '请选择一列!' if not @ActiveSQL.SortIndex?
                len = 0
                len = len + 1 for sql in @form.DisplayFieldList when sql.SQLIndex is @ActiveSQL.SQLIndex
                sortIndex = @ActiveSQL.SortIndex
                # return console.log sortIndex is 0
                return @$dispatch 'transmit', 'tip', contentText: '当前的列已经置顶,不能上移!' if sortIndex is 0 and count is -1
                return @$dispatch 'transmit', 'tip', contentText: '当前的列已经在末尾,不能下移!' if sortIndex is len - 1 and count is 1
                index = sortIndex + count
                sql.SortIndex = sortIndex for sql in @form.DisplayFieldList when sql.SQLIndex is @ActiveSQL.SQLIndex and sql.SortIndex is index
                @ActiveSQL.SortIndex = index
            ###*
             * 删除SQL
             *###
            deleteSQL: () ->
                len = 0
                len = len + 1 for sql in @form.DisplayFieldList when sql.SQLIndex is @ActiveSQL.SQLIndex
                return @$dispatch 'transmit', 'tip', contentText: '当前列表长度为1，不能删除！' if len is 1
                @form.DisplayFieldList.$remove @ActiveSQL
                displayField.SortIndex = displayField.SortIndex - 1 for displayField in @form.DisplayFieldList when displayField.SQLIndex is @ActiveSQL.SQLIndex and displayField.SortIndex > @ActiveSQL.SortIndex
                @ActiveSQL = {}
            ###*
             * 自动设置
            ###
            autoSetting: () ->
                # 当前主查询的索引值
                index = parseInt @selectIndex
                # 当前主查询的SQL语句
                SQLString = @form.SQLRunFieldList[@selectIndex].SQL
                # 显示列列表
                displayFieldList = @form.DisplayFieldList
                self = this

                return @$dispatch 'transmit', 'tip', contentText: '当前主查询没有SQL语句' if SQLString.length is 0
                # 请求用来自动设置到列表的值
                servers.NProgress.start ''
                servers.postAjax.bind(this)
                    url: '/Report/GetAutoSet'
                    data: Sql: SQLString
                    success: (result) ->
                        result = eval('(' + result + ')');
                        if result.ResultCode is 1
                            servers.NProgress.done ''
                            # 清空当前主查询的列选择条件
                            newDisplayFieldList = []
                            newDisplayFieldList.push displayField for displayField in displayFieldList when displayField.SQLIndex isnt index
                            for displayFieldSpay, displayFieldIndex in result.Table
                                displayFieldSpay.SQLIndex = index
                                displayFieldSpay.SortIndex = displayFieldIndex
                                displayFieldSpay.DisplayMask = ''
                                displayFieldSpay.DisplayWidth = ''
                                newDisplayFieldList.push displayFieldSpay
                            self.form.DisplayFieldList = []
                            self.form.DisplayFieldList.push field for field in newDisplayFieldList
                            self.ActiveSQL = {}
</script>
