<template id="SQL-statement">
    <div class="container-fluid">
        <div class="row">
            <form>
                <div class="col-lg-12">
                    <div class="panel panel-default panel-statement">
                        <div class="panel-heading"> SQL语句选择 </div>
                        <div class="panel-body">
                            <div class="checkbox-list">
                                <label class="checkbox-inline">
                                    <input v-model="selectSql" type="radio" value="0"><span>预处理SQL</span>
                                </label>
                                <label class="checkbox-inline">
                                    <input v-model="selectSql" type="radio" value="1"><span>数据清理SQL</span>
                                </label>
                                <label class="checkbox-inline" v-for="radio in radioNames">
                                    <input v-model="selectSql" type="radio" value="{{$index + 2}}"><span>{{radio}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default panel-statement" v-show="selectSql == 0">
                        <div class="panel-heading">
                            <span>预处理SQL语句</span>
                            <span class="text-danger">注意：每条SQL语句之间使用单独的一行“GO”语句分开，报表会忽略其中的SQL语句执行错误</span>
                        </div>
                        <div class="panel-body">
                            <textarea rows="150" cols="190" class="report-textarea" v-model="form.SQLBefore"></textarea>
                        </div>
                    </div>
                    <div class="panel panel-default panel-statement" v-show="selectSql == 1">
                        <div class="panel-heading">
                            <span>预处理SQL语句</span>
                            <span class="text-danger">注意：每条SQL语句之间使用单独的一行“GO”语句分开，报表会忽略其中的SQL语句执行错误</span>
                        </div>
                        <div class="panel-body">
                            <textarea rows="150" cols="190" class="report-textarea" v-model="form.SQLAfter"></textarea>
                        </div>
                    </div>
                    <div class="panel panel-default panel-statement" v-for="sql in form.SQLRunFieldList" v-show="selectSql == ($index + 2)">
                        <div class="panel-heading">
                            <label style="margin-right: 50px;">
                                <span>{{radioNames[$index]}}名称</span>
                                <input type="text" v-model="sql.FieldName">
                            </label>
                            <span>正式查询SQL语句[展示用]</span>
                            <span class="text-danger">（只能包含一条SQL语句）</span>
                        </div>
                        <div class="panel-body">
                            <textarea rows="150" cols="190" class="report-textarea" v-model="sql.SQL"></textarea>
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
    .report-textarea{
        margin: 0;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 300px;
    }
</style>
<script lang="coffee">
    # 全局服务
    servers = require '../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.5:999/API'


    module.exports =
        data: () ->
            return data =
                selectSql: 0
                radioNames: ['主查询1', '主查询2', '主查询3', '主查询4']
        props: ['form']
</script>
<style media="screen" lang="less">
    .panel-statement {
        margin: 10px 0;
    }
</style>
