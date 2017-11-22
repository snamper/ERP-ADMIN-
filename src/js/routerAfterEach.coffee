###
Auchor DomenLee
设置全局页面元素按照规则定位
搜索结果列表高度等于浏览器窗口的高度
头部固定在顶部，分页组件固定在尾部
中间的结果列表滚动
###
###
2016.9.12
Auchor DomenLee
由于页面内容底部可能出现部分其他模块
之前的处理逻辑在于固定列表头部至窗口顶部，导致页面不能继续向下滚动
现在的处理方法是，只固定一次，用户继续向下滚动时，即滚动
###
module.exports = (transition) ->
    # 自动设置元素位置
    class AutoPosition
        ###
        @param routeName {String} 当前路由的名称属性
        ###
        constructor: (@routeName) ->
            # 路由名称的禁忌
            # 遇到以下路由名称时，自动跳过自动设置
            @tabooRouteNames = [
                ''
            ]
        ###
        初始化
        @param bindType {String} 绑定类型 on 绑定 off 解绑
        ###
        init: (bindType) ->
            @eventsElements =
                # 当前 main 元素
                main:
                    ele: $ '.sheet-list'
                # 滚动中的元素
                content:
                    ele: $ '.main-page'
            # 设置main部分元素距离顶部的距离
            @eventsElements.main.ele.attr 'offsetTop', @eventsElements.main.ele.offset().top
            @eventsElements.main.ele.attr 'canScroll', true
            # 是否绑定事件
            if bindType is 'on'
                # 判断当前路径的路由名称属性是否属于禁忌路由名称
                # 如果是则退出自动时间设置和事件绑定
                return false for name in @tabooRouteNames when name is @routeName
                # 定时器的作用是让页面充分渲染元素
                setTimeout @handleElementHeight, 500
                @bindEvents()
            else if bindType is 'off'
                @unBindEvents()
        ###
        绑定事件
        ###
        bindEvents: () ->
            @eventsElements.content.ele.on 'scroll', @eventsFun
        ###
        解绑事件
        ###
        unBindEvents: () ->
            @eventsElements.content.ele.off 'scroll', @eventsFun
        ###
        事件绑定的函数
        ###
        eventsFun: (event) ->
            main = $ '.sheet-list'
            content = $ '.main-page'
            canScroll = main.attr 'canScroll'
            scrollTop = content.scrollTop()
            # Elements from the top of the distance
            offsetTop = parseInt main.attr 'offsetTop'
            # Add the upper margin
            offsetTop = offsetTop + 30
            # Document the head height
            documentHeaderHeight = $('.topbar').height() + $('.w-router-tab').height()
            # if scrollTop > offsetTop - documentHeaderHeight
            #     console.log canScroll
            #     content.scrollTop offsetTop - documentHeaderHeight if canScroll
            #     main.attr 'canScroll', false
            # else
            #     main.attr 'canScroll', true
        ###
        处理元素的高度
        ###
        handleElementHeight: () ->
            # 计算出基本属性
            height = $('.main-page').outerHeight()
            header = $ '.sheet-list .row .col-lg-12:eq(0)'
            body = $ '.sheet-list .row .sheet-list-table:eq(0)'
            footer = body.find('.pagination-group')
            # Set default height
            $('.sheet-list').css('padding', 0)
            bodyHeight = height - header.outerHeight() - footer.outerHeight()
            footer.remove().css('margin', 0)
            body.height(bodyHeight).after(footer).css 'padding-top', 28
            tableHeader = $('.sheet-list-header')
            tableHeader.css
                position: 'absolute'
                top: 0
            th = tableHeader.children('tr').children('th').css 'padding-left', 5
            th.find('input').css 'margin', 0
            td = body.children('table').children('tbody').eq(0).children('tr').children('td')
            th.eq(index).width(td.eq(index).width()) for eleName, index in td
    # 实例化 AutoPosition Class
    autoPosition = new AutoPosition transition.to.name
    ###
    是否自动设置
    ###
    # setTimeout () ->
    #     # 延迟 100 ms 可以获取到动态组件内的元素
    #     main = $('.sheet-list .sheet-list-item')
    #     # 判断是否具有需要定位的main元素的数量
    #     console.log main.length
    #     if main.length > 0
    #         autoPosition.init 'on'
    #     else
    #         setTimeout () ->
    #             # 再次延迟判断
    #             if main.length > 0 then autoPosition.init 'on'
    #         , 400
    # , 1000
