<script lang="coffee">
# 时间选择 组件

# 加载依赖库 moment.js
moment = require 'moment'
# 加载core部分脚本
require '../js/plugins/es5'
module.exports =
    data: () ->
        return data =
            # 本地化语言
            locale: 'zh-cn'
            # 日期范围开始日期和结束日期连接符
            delimiter: ' 至 '
            # 显示的日期格式
            format: 'YYYY-MM-DD'
            # 每个星期开始的时间
            firstDayOfWeek: '1'
            # 当前组件的值
            value: ''
            # 应该绑定的input元素的id
            datePickerID: ''
            # 是否绑定时间选择插件
            bindDatePicker: true
            # 当前时间选择插件绑定之后的对象
            datePicker: {}
    # 组件相应接口
    # startDate: 开始时间
    # endData  : 结束时间
    props: ['startDate', 'endDate']
    events:
        'clearDate': () ->
            $(@datePickerID).val ''
            @startDate = ''
            @endDate = ''
    ready: () ->
        # 获取唯一ID
        @datePickerID = 'datePicker' + new Date().getTime()
    methods:
        ###*
         * 鼠标经过组件任意元素时
         *###
        elementHover: () ->
            # 是否进行绑定
            @bindDatePickerPlugin() if @bindDatePicker
            # 绑定成功后，将判断条件设置为false，防止二次绑定
            @bindDatePicker = false

        clearStartDate: () ->
            moment '1900-1-1'

        clearEndDate: () ->
            moment '3000-1-1'

        ###*
         * 绑定时间选择插件
         *###
        bindDatePickerPlugin: () ->
            self = this
            ranges  = [
                {
                    label: "昨天"
                    startDate: moment().subtract(1, 'day')
                    endDate: moment().subtract(1, 'day')
                }
                {
                    label: '星期天'
                    startDate: moment().startOf('week')
                    endDate: moment()
                }
                {
                    label: '2个星期'
                    startDate: moment().startOf('week').subtract(1, 'week')
                    endDate: moment()
                }
                {
                    label: '这个月'
                    startDate: moment().startOf('month')
                    endDate: moment()
                }
                {
                    label: '下个月'
                    startDate: moment().startOf('month').subtract(1, 'month')
                    endDate: moment().startOf('month')
                }
                {
                    label: '今年'
                    startDate: moment().startOf('year')
                    endDate: moment().startOf('moth')
                }
                {
                    label: '上下一千一百年'
                    startDate: @clearStartDate()
                    endDate: @clearEndDate()
                }
            ]
            self = @
            # 定制参数
            datePickerParams =
                # 类型默认为单个日期选择
                locale: @locale
                delimiter: @delimiter
                format: @format
                firstDayOfWeek: @firstDayOfWeek
                startDate: if @startDate? and @startDate isnt '' then moment(@startDate) else moment()
                ranges: ranges
                onShow: (startDate, endDate) ->
                    if self.$route.name is 'report-form-edit'
                        offset = $('.data_picker').offset()
                        $('.dt').css
                            top: offset.top + 34
                            left: offset.left
                            zIndex: 1000
                            position: 'fixed'
                    else
                        $('.dt').css
                            position: 'absolute'
                    # 开始和结束时间都要加上相应的时分秒
                    # 搜索时必要的格式，否则可能报错
                    self.startDate = startDate + ' 00:00:00.000'
                    self.endDate = endDate + ' 23:59:59.999'
                    # 返回事件做回调
                    self.$emit 'selected'
            # 判断是否存在结束时间
            datePickerParams.endDate = moment @endDate if @endDate? and @endDate isnt ''
            # 根据是否存在结束时间判断时间选择类型
            datePickerParams.type = 'rangedate' if @endDate?
            # 进行绑定
            @datePicker = $('#' + @datePickerID).DatePicker(datePickerParams)
</script>
<template id="data_picker">
    <div style="width: 100%;">
        <input @click="elementHover()" :id="datePickerID" class="data_picker form-control" type="text" :name="name" placeholder="点击选择时间"/>
    </div>
</template>
<style media="screen">
    .dt { position: absolute; background-color: #fff; top: 50px; left: 0; z-index: 100; transition: all 0.3s ease; opacity: 0.5; max-height: 0px; max-width: 0px; overflow: hidden; border-radius: 50%; box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.15); }

    .dt.show { overflow: inherit; max-width: 600px; max-height: 520px; opacity: 1; display: block; border-radius: 0; }

    .dt__head { background: #27ae60; color: #fff; padding: 0 10px; }

    .dt__head_year { color: #145730; display: block; font-size: 12px; line-height: 20px; }

    .dt__head .next, .dt__head .prev { display: inline-block; color: #fff; }

    .dt__footer_close { box-sizing: border-box; cursor: pointer; font-family: 'Roboto', 'Arial', sans-serif; font-weight: 300; display: inline-block; color: #000; background: #ecf0f1; letter-spacing: .5px; font-size: 15px; border-radius: 3px; line-height: 36px; height: 36px; padding: 0 10px; text-decoration: none !important; outline: 0; border: 0; -webkit-tap-highlight-color: transparent; vertical-align: middle; text-transform: uppercase; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; }

    .dt__footer_close:focus { outline: none; }

    .dt__footer_close:hover { background: #f8fcfd; }

    .dt__footer_close:active { box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15); }

    .dt__nav { text-align: center; }

    .dt__nav_prev_start, .dt__nav_prev_end, .dt__nav_next_start, .dt__nav_next_end { display: inline-block; width: 40px; height: 40px; line-height: 40px; text-align: center; border-radius: 50%; font-size: 18px; transition: all 0.3s ease; margin: 0 15px; cursor: pointer; }

    .dt__nav_prev_start:hover, .dt__nav_prev_end:hover, .dt__nav_next_start:hover, .dt__nav_next_end:hover { background: rgba(0, 0, 0, 0.15); }

    .dt__nav_prev { margin-right: 20px; }

    .dt__nav_next { margin-left: 20px; }

    .dt__nav_title { display: inline-block; }

    .dt__wrapper.rangedate { min-width: 571px; }

    .dt__wrapper.rangedate .dt__calendar:first-child .dt__calendar_start { border-right: 1px solid #eee; margin-right: 5px; padding-right: 5px; }

    .dt__rages { display: block; text-align: center; background-color: #ecf0f1; }

    .dt__rages_item { display: inline-block; font-size: 12px; color: #3498db; cursor: pointer; line-height: 30px; padding: 0 5px; }

    .dt__rages_item:hover { color: #27ae60; }

    .dt__calendar { font-size: 0px; display: inline-block; vertical-align: top; }

    .dt__calendar_nav { background-color: #ecf0f1; font-size: 18px; text-align: center; padding: 5px 0; }

    .dt__calendar_nav_prev_start, .dt__calendar_nav_prev_end, .dt__calendar_nav_next_start, .dt__calendar_nav_next_end { display: inline-block; width: 40px; height: 40px; line-height: 40px; text-align: center; border-radius: 50%; font-size: 18px; transition: all 0.3s ease; margin: 0 15px; cursor: pointer; }

    .dt__calendar_nav_prev_start:hover, .dt__calendar_nav_prev_end:hover, .dt__calendar_nav_next_start:hover, .dt__calendar_nav_next_end:hover { background: rgba(0, 0, 0, 0.15); }

    .dt__calendar_nav_title { font-size: 18px; font-weight: 200; display: inline-block; }

    .dt__calendar_head { font-size: 14px; background-color: #3498db; text-align: center; padding-bottom: 10px; }

    .dt__calendar_head_wday { line-height: 25px; color: #fff; display: block; width: 100%; font-size: 12px; background: rgba(0, 0, 0, 0.2); text-transform: uppercase; font-weight: 300; }

    .dt__calendar_head_month { color: #fff; font-size: 18px; display: block; height: 30px; font-weight: 300; opacity: 0.8; line-height: 30px; }

    .dt__calendar_head_day { color: #fff; font-size: 34px; display: block; height: 50px; line-height: 48px; }

    .dt__calendar_head_year { color: #fff; font-size: 14px; display: block; height: 20px; line-height: 20px; }

    .dt__calendar_head .next, .dt__calendar_head .prev { display: inline-block; width: 20px; height: 20px; margin: 0 10px; color: #fff; border-radius: 50%; vertical-align: middle; font-size: 14px; line-height: 20px; background: transparent; font-weight: 300; opacity: 0.7; cursor: pointer; transition: all 0.3 ease; }

    .dt__calendar_head .next:hover, .dt__calendar_head .prev:hover { background: rgba(0, 0, 0, 0.2); opacity: 1; }

    .dt__calendar_m { transition: all 0.3s ease; font-size: 0px; width: 280px; }

    .dt__calendar_m_w { width: 280px; font-size: 0; }

    .dt__calendar_m_w_n { width: 40px; height: 40px; line-height: 40px; font-size: 14px; text-align: center; color: #888; display: inline-block; border-radius: 50%; }

    .dt__calendar_m_d { transition: all 0.3s ease; border-radius: 50%; position: relative; vertical-align: top; display: inline-block; line-height: 34px; margin: 3px; width: 34px; text-align: center; height: 34px; font-size: 14px; cursor: pointer; font-weight: 300; }

    .dt__calendar_m_d:hover { background-color: #ecf0f1; }

    .dt__calendar_m_d_e { border-radius: 50%; display: inline-block; line-height: 40px; width: 40px; text-align: center; height: 40px; font-size: 16px; cursor: pointer; }

    .dt__calendar_m_d.active { background-color: #27ae60; color: #fff; }

    .dt__calendar_m_d.between { border: 1px solid #27ae60; box-sizing: border-box; position: relative; }
</style>
