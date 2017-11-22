<template id="essential-attribute">
    <div class="report-container">
        <form class="report-essential-form row operate-form-list">
            <div class="form-group form-limit-width">
                <label class="form-group-text">报表名称</label>
                <input class="form-control" type="text" v-model="form.ReportTitle | reportFormName"
                v-validtor="form.ReportTitle"
                exp="p|t"
                errormessage="请输入正确的手机号码|请输入正确的电话号码">
                <label class="form-group-text" style="text-align:left; margin-left: 5px;">报表</label>
            </div>
            <div class="form-group form-limit-width">
                <label class="form-group-text">报表编码</label>
                <input class="form-control" type="text" v-model="form.ReportCode">
            </div>
            <div class="form-group form-limit-width">
                <label class="form-group-text">报表所属分类</label>
                <select class="form-control" type="text" v-model="form.ReportGroupID">
                    <option v-for="reportGroup in reportGroupList" value="{{reportGroup.ReportGroupID}}">{{reportGroup.Name}}</option>
                </select>
            </div>
            <!-- <div class="form-group form-limit-width">
                <label class="form-group-text">报表类型</label>
                <select class="form-control" type="text" v-model="form.Type">
                    <option value=0>公用</option>
                    <option value=1>自定义</option>
                </select>
            </div> -->
            <div class="form-group form-limit-width">
                <status-checkbox :status.sync="form.ReportStatus">
            </div>
            <div class="form-group form-limit-width">
                <label class="form-group-text">报表备注</label>
                <textarea class="form-control" type="text" v-model="form.ReportMemo"></textarea>
            </div>
            <div class="form-group form-limit-width">
                <label class="form-group-text">颜色设置</label>
                <div class="color-setting-box">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="detail">
                                <h6 class="h6"> 奇数行 </h6>
                                <div class="clear">
                                    <label> 字体颜色 </label>
                                    <input type="text" id="odd-font-color-picker" v-model="form.OddRowFontColor">
                                    <div class="color-show"></div>
                                </div>
                                <div class="clear">
                                    <label> 背景颜色 </label>
                                    <input type="text" id="odd-back-color-picker" v-model="form.OddRowBackColor">
                                    <div class="color-show"></div>
                                </div>
                            </div>
                            <div class="detail">
                                <h6 class="h6"> 偶数行 </h6>
                                <div class="clear">
                                    <label> 字体颜色 </label>
                                    <input type="text" id="even-font-color-picker" v-model="form.EvenRowFontColor">
                                    <div class="color-show"></div>
                                </div>
                                <div class="clear">
                                    <label> 背景颜色 </label>
                                    <input type="text" id="even-back-color-picker" v-model="form.EvenRowBackColor">
                                    <div class="color-show"></div>
                                </div>
                            </div>
                            <div class="detail">
                                <h6 class="h6"> 合计 </h6>
                                <div class="clear">
                                    <label> 字体颜色 </label>
                                    <input type="text" id="total-font-color-picker" v-model="form.SumFontColor">
                                    <div class="color-show"></div>
                                </div>
                                <div class="clear">
                                    <label> 背景颜色 </label>
                                    <input type="text" id="total-back-color-picker" v-model="form.SumBackColor">
                                    <div class="color-show"></div>
                                </div>
                            </div>
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
</template>
<script lang="coffee">
    # 全局服务
    servers = require '../../js/servers/servers'
    # 全局可替换链接
    URL = 'http://192.168.88.99:999/Api'
    module.exports =
        data: () ->
            return data =
                # 报表分类列表
                reportGroupList: []
        ready: () ->
            @getReportGroupList ''
            @form.ReportStatus = 1
            @form.Type = 1
            # 引入颜色选取插件脚本和样式
            require '../../css/colpick.css'
            require '../../js/plugins/colpick.js'
            # 为element绑定颜色选取插件
            # 奇数
            @bindColpick '#odd-font-color-picker', @form.OddRowFontColor
            @bindColpick '#odd-back-color-picker', @form.OddRowBackColor
            # 偶数
            @bindColpick '#even-font-color-picker', @form.EvenRowFontColor
            @bindColpick '#even-back-color-picker', @form.EvenRowBackColor
            # 合计
            @bindColpick '#total-font-color-picker', @form.SumFontColor
            @bindColpick '#total-back-color-picker', @form.SumBackColor
        components:
            'status-checkbox': require '../../components/status-checkbox.vue'

        events:
            "set-color": (form) ->
                # 为element绑定颜色
                # 奇数
                @setColor '#odd-font-color-picker', form.OddRowFontColor
                @setColor '#odd-back-color-picker', form.OddRowBackColor
                # 偶数
                @setColor '#even-font-color-picker', form.EvenRowFontColor
                @setColor '#even-back-color-picker', form.EvenRowBackColor
                # 合计
                @setColor '#total-font-color-picker', form.SumFontColor
                @setColor '#total-back-color-picker', form.SumBackColor

        props: ['form']
        methods:
            ###*
             * 获取报表分类列表
             *###
            getReportGroupList: () ->
                self = this
                servers.getAjax.bind(this)
                    url: '/BaseLookup/GetReportGroup'
                    success: (data) ->
                        self.reportGroupList = data.Data
                    # , URL
            ###*
             * 为element绑定颜色插件
             * @param  {string} id element的id
             *###
            bindColpick: (id, value) ->
                $ id
                .colpick
                    layout: 'hex'
                    submit: true
                    colorScheme: 'dark'
                    onChange: (hsb, hex, rgb, el, bySetColor) ->
                        $ id
                        .next ''
                        # 设置元素样式，hex为选中的颜色16进制编码
                        .css 'background-color', '#' + hex

                        if not bySetColor
                            $ el
                            .val hex
                .keyup ->
                    $ @
                    .colpickSetColor @value
            setColor: (id, color) ->

                $(id).colpickSetColor color
</script>
<style media="screen" lang="less">
    .report-container {
        padding: 15px;
        .report-essential-form {
            .form-group-text {
                line-height: 24px;
                width: 80px;
                min-width: 80px;
            }
            textarea {
                height: 100px;
                padding: 5px;
                margin: 0;
                margin-left: 24px;
            }
            .color-setting-box {
                margin-left: 24px;
                .detail {
                    border: 1px solid #ccc;
                    padding: 10px;
                    line-height: 24px;
                    margin-top: 10px;
                    .clear {
                        margin-top: 10px;
                    }
                    input {
                        height: 24px;
                        line-height: 24px;
                        padding: 0 5px;
                        float: left;
                        margin-left: 4px;
                    }
                    .color-show {
                        float: left;
                        width: 24px;
                        height: 24px;
                        background-color: #fff;
                        margin-left: 4px;
                    }
                    label {
                        font-weight: normal;
                        float: left;
                    }
                }
                .clear:after{
                    display: block;
                    content: "";
                    clear: both;
                }
            }
        }
    }
    .essential-btns {
        padding: 15px 10px;
        .btn{
            margin-left: 10px;
        }
    }
</style>
