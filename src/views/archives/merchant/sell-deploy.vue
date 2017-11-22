<template>
    <div class="container-fluid container-fluid-margin" >
        <div class="headline-hd">配置SKU</div>

        <div class="query-form sell-deploy" style="padding-left:20px;">
            <div class="form-inline query-detail">
                <div class="row" style="margin-bottom: 10px;">
                    <div class="col-sm-6">名称：{{merchantName}}</div>
                    <div class="col-sm-6">编码：{{merchantNo}}</div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-12 sell-deploy-half">
                            <div class="row">
                                <div class="form-group col-lg-12 col-md-12  col-sm-12">
                                    <input v-model="color" type="text" class="form-control" placeholder="颜色名称/编码">
                                    <a href="javascript:void(0)" class="btn btn-default" @click="search('color')">搜索</a>
                                </div>

                                <div class="row">
                                    <div class="form-group  sell-deploy-width">
                                        <div class="sell-deploy-list">
                                            <div class="sell-deploy-list-hd">
                                                <span>颜色备选列表</span>
                                            </div>
                                            <div class="sell-deploy-list-ul">
                                                <ul>
                                                    <li v-for="i in colorSearchList" class="click-element" @click="clickItem(i, 0)" :class="{'active': i.active}">{{i.Name}}({{i.Code}})</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-lg-1 sell-deploy-arr">
                                    <span @click="setSelect('color')" class="iconfont icon-arrow-right"></span><br />
                                    <span @click="delSelect('color')" class="iconfont icon-arrow-left"></span>
                                    </div>
                                    <div class="form-group  sell-deploy-width">
                                    <div class="sell-deploy-list sell-deploy-listbg">
                                            <div class="sell-deploy-list-hd">
                                                <span>颜色已选列表</span>
                                            </div>
                                            <div class="sell-deploy-list-ul">
                                                <ul>
                                                    <li v-for="i in colorSelectList" class="click-element" @click="clickItem(i, 1)" :class="{'active': i.active}">{{i.Name}}({{i.Code}})</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 sell-deploy-half">
                            <div class="row">
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                <input v-model="size" type="text" class="form-control" placeholder="尺码名称/编码">
                                <a href="javascript:void(0)" class="btn btn-default" @click="search('size')">搜索</a>
                                </div>
                                <div class="row">
                                    <div class="form-group  sell-deploy-width">
                                        <div class="sell-deploy-list">
                                            <div class="sell-deploy-list-hd">
                                                <span>尺码备选列表</span>
                                            </div>
                                            <div class="sell-deploy-list-ul">
                                                <ul>
                                                    <li v-for="i in sizeSearchList" class="click-element" @click="clickItem(i, 2)" :class="{'active': i.active}">{{i.Name}}({{i.Code}})</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-lg-1 sell-deploy-arr">
                                        <span @click="setSelect('size')" class="iconfont icon-arrow-right"></span><br />
                                        <span @click="delSelect('size')" class="iconfont icon-arrow-left"></span>
                                    </div>
                                    <div class="form-group  sell-deploy-width">
                                    <div class="sell-deploy-list sell-deploy-listbg">
                                            <div class="sell-deploy-list-hd">
                                                <span>尺码已选列表</span>
                                            </div>
                                            <div class="sell-deploy-list-ul">
                                                <ul>
                                                    <li v-for="i in sizeSelectList" class="click-element" @click="clickItem(i, 3)" :class="{'active': i.active}">{{i.Name}}({{i.Code}})</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

            </div>
            <div class="sell-deploy-btn">
                <a class="btn btn-default" @click="crossID">保存生成SKU</a><a class="btn btn-default" v-link="{name: 'merchant-list'}">返回列表&gt;</a>
            </div>
        </div>
</template>

<script lang="coffee" >
    # 全局替换接口地址
    URL = 'http://192.168.88.47:888/API'
    # 全局服务
    servers = require '../../../js/servers/servers'

    module.exports=
        data: () ->
            return {
                # 商品的ID
                merchantID: ''
                # 商品名称
                merchantName: ''
                # 商品编码
                merchantNo: ''
                # 最后生成的sku列表
                skuList: []

                # 搜索栏里面颜色的值
                color: ''
                # 搜索栏里面尺寸的值
                size: ''

                # 从服务器拉取颜色列表时的临时存放数组
                colorList: []
                # 本身列表
                colorListSlide: []
                # 显示出来的列表，经过搜索查询可变
                colorSearchList: []
                # 在显示出来的列表中选取的条例集合
                colorSearchListSlide: []
                # 选择的列表
                colorSelectList: []
                # 选择的列表里面用户选择的条例集合
                colorSelectListSlide: []


                # 从服务器拉取尺寸列表时的临时存放数组
                sizeList: []
                # 本身列表
                sizeListSlide: []
                # 显示出来的列表，经过搜索查询可变
                sizeSearchList: []
                # 在显示出来的列表中选取的条例集合
                sizeSearchListSlide: []
                # 选择的列表
                sizeSelectList: []
                # 选择的列表里面用户选择的条例集合
                sizeSelectListSlide: []
            }

        watch:

            'colorList': () ->

                this.setSearchList 'color'

            'sizeList': () ->

                this.setSearchList 'size'

        route:

            data: (transition) ->

                @merchantName = transition.to.query.name
                @merchantNo = transition.to.query.num
                @merchantID = transition.to.query.id
                console.log @merchantID, @merchantName, @merchantNo

        methods:
            ###*
             * 搜索颜色或者尺寸
             * 基于页面加载时拉取的颜色或者尺寸列表进行搜索
             * @param  {string} name 搜索的类型，color 颜色， size 尺寸
             *###
            search: (name) ->

                # 搜索结果文本
                searchValue = this[name]
                # 等待被搜索的列表
                penSearchList = this[name + 'ListSlide']
                # 等待搜索结果储存的列表,并清空
                penSetList = this[name + 'SearchList'] = []
                # 选择之后的列表
                SelectList = this[name + 'SelectList']

                # 当搜索文本为空时返回待搜索列表
                return this.setSearchList name if searchValue is ''

                # 搜索结果正则
                searchValueReg = new RegExp searchValue, 'i'
                # 推导所有颜色列表
                for o in penSearchList
                    # 如果匹配到对应的选项
                    if searchValueReg.test o.Code
                        # 设置添加阀门
                        addFix = true
                        # 推导已选择的列表
                        for b in SelectList
                            # 如果在已选择的列表中找到当前选择项，阀门关闭，设置为false
                            addFix = false if b.Name is o.Name
                        # 如果未找到，阀门开，添加至搜索显示结果列表
                        penSetList.push o if addFix

                    if searchValueReg.test o.Name
                        # 设置添加阀门
                        addFix = true
                        # 推导已选择的列表
                        for b in SelectList
                            # 如果在已选择的列表中找到当前选择项，阀门关闭，设置为false
                            addFix = false if b.Name is o.Name
                        # 如果未找到，阀门开，添加至搜索显示结果列表
                        penSetList.push o if addFix

            ###*
             * 设置待搜索列举表
             * @param  {string} name 当前设置属性的列表， color，size
             *###
            setSearchList: (name) ->

                for o in this[name + 'List']

                    this[name + 'ListSlide'].$remove o
                    this[name + 'SearchList'].$remove o
                    o.active = false
                    this[name + 'ListSlide'].push o
                    this[name + 'SearchList'].push o

            ###*
             *	将服务器拉取的列表填充到待搜索列表
             *###
            setList: () ->

                servers.filterList this
            ###*
             * 点击待选列表里面的选项时
             * @param  {string} item 当前选项对象
             * @param  {number} type 页面上共有四个列表，每个列表分别为 0， 1， 2， 3
             *###
            clickItem: (item, type) ->

                item.active = not item.active

                switch type

                    when 0

                        this.setSlideList 'colorSearch'

                    when 1

                        this.setSlideList 'colorSelect'

                    when 2

                        this.setSlideList 'sizeSearch'

                    when 3

                        this.setSlideList 'sizeSelect'


            ###*
             * 设置选择的列表
             * @param  {string} name 选择的列表键
             *###
            setSlideList: (name) ->
                # 当前搜索结果列表
                list = this[name + 'List']
                # 当前选择的列表
                slideList = this[name + 'ListSlide'] = []
                # 将以选择的添加到选择列表
                slideList.push this.newItem o for o in list when o.active


            ###*
             * 创建新的选项，active初始化为false
             * @param  {object} item 选项对象
             * @return {object}      根据选项对象生成的新的对象，active属性为false
             *###
            newItem: (item) ->
                # 返回新的对象
                return obj =
                    PropertyID: item.PropertyID
                    MerchantID: item.MerchantID
                    Name: item.Name
                    PropertyTypeID: item.PropertyTypeID
                    Status: item.Status
                    Code: item.Code
                    Creater: item.Creater
                    CreateTime: item.CreateTime
                    Editor: item.Editor
                    EditTime: item.EditTime
                    Note: item.Note
                    BasPropertyType: item.BasPropertyType
                    active: false

            ###*
             * 将选择选项添加到选择列表并从显示搜索结果中删除
             * @param  {string} name 列表类型， color， size
             * @return {false}      当列表长度为0时返回
             *###
            setSelect: (name) ->

                searchListSlide = this[name + 'SearchListSlide']
                searchList = this[name + 'SearchList']
                selectList = this[name + 'SelectList']
                # 当选择结果列表长度为零时，退出
                return false if searchListSlide.length is 0
                # 将选择结果添加到选择列表
                selectList.push o for o in searchListSlide
                # 将选择搜索列表设置为空
                this[name + 'SearchListSlide'] = []
                # 将用户已选择的选项从搜索列表中删除
                searchList.splice i, 1 for i in [(searchList.length - 1)..0] when searchList[i].active

            ###*
             * 将选择选项选择列表删除并添加到搜索结果显示列表中
             * @param  {string} name 列表类型， color， size
             * @return {false}      当列表长度为0时返回
             *###
            delSelect: (name) ->

                selectList = this[name + 'SelectList']
                selectListSlide = this[name + 'SelectListSlide']
                searchList = this[name + 'SearchList']
                # 当选择结果列表长度为零时，退出
                return false if selectListSlide.length is 0
                # 将选择结果添加到选择列表
                searchList.push o for o in selectListSlide
                # 将选择搜索列表设置为空
                this[name + 'SelectListSlide'] = []
                # 将用户已选择的选项从搜索列表中删除
                selectList.splice i, 1 for i in [(selectList.length - 1)..0] when selectList[i].active

            ###*
             * 交叉id，生成sku列表
             *###
            crossID: () ->
                # 当颜色选择列表和尺寸选择列表为空时提示用户选择
                return alert '请选择颜色或者尺寸并填充到相应已选列表' if this.colorSelectList.length is 0 or this.sizeSelectList.length is 0

                this.skuList = []

                for color in this.colorSelectList

                    for size in this.sizeSelectList
                        this.skuList.push
                            GoodsID: @merchantID
                            ColorID: color.PropertyID
                            SizeID: size.PropertyID
                            CustomBC: @merchantNo + color.Code + size.Code

                this.postSkuList this.skuList

            ###*
             * 上传sku列表
             * @param  {Array} list sku列表
             *###
            postSkuList: (list) ->

                relf = this

                servers.postAjax.bind(this)

                    url: '/BasGoods/ErpSkuConfig'
                    data:

                        basBarcode: list

                    success: (data) ->

                        if data.ResultCode is 1

                            relf.$dispatch 'transmit', 'tip',

                                contentText: '添加成功'

                        if data.ResultCode is -1

                            relf.$dispatch 'transmit', 'tip',

                                contentText: data.ErrorMessage

        ready: () ->

            console.log '进入sell-deploy'
            this.setList ''

</script>

<style rel="stylesheet/less" lang="less">

.sell-deploy{
    .sell-deploy-btn a{
        margin-left:20px;

    }
    .query-detail{
        padding-bottom:30px;
    }

    .container-fluid{
        padding-left:0;
    }
    .form-group{
        margin-bottom:20px;
        input{
            margin-right:15px;
        }

    }

    .sell-deploy-list{
        width: 100%;
        border-radius:5px;
        border: 1px solid #e5e5e5;
        margin-lefT:14px;
        text-indent:2em;
        line-height:30px;
        .sell-deploy-list-hd{
            color:#4E5C7B;
            font-size: 14px;
            background: #E3F0FE;
            line-height:40px;
        }

        .sell-deploy-list-ul{
           height:270px;
           background:#fff;
            overflow-y:scroll;

            li:hover{
                // background: #9DB8FD;
                color:#fff;
            }

            li.active {
                background: #9DB8FD;
                color:#fff;
            }
        }

    }
}
.sell-deploy{
    .sell-deploy-listbg{
        .sell-deploy-list-hd{
            background: #ECEFFF;

        }
    }
    .sell-deploy-list-ul{
        li:hover{
            background: pink;
        }
    }
}
.sell-deploy .sell-deploy-listbg .sell-deploy-list-ul li:hover{
    background: #A6A7FE;
}

.sell-deploy .sell-deploy-listbg .sell-deploy-list-ul li.click{
    background: #A6A7FE;
}

.sell-deploy-arr{

    padding-top:150px;
    span{
        display:block;
        width: 30px;height: 20px;
        text-align:center;
        line-height:20px;
        border: 1px solid #B5CDFF;
        background: #E3F0FE;
        color:#739FEF;
        border-radius:3px;
        cursor:pointer;

    }
    span:hover{
        background: #6896EE;
        color:#fff;
        border:none;
    }
    .icon-arrow-right:before{
        width: 100%;
        height: 100%;
    }
}
.query-detail{

    .sell-deploy-arr{
    width: 30px;margin:0 auto;
        display:block;
    }

}
.sell-deploy-half{
   margin-bottom:40px;
}
.sell-deploy-list{

    width: 500px;
    .form-group{

        display:block;
    }

}
.sell-deploy-width{
    width: 40%;
    float:left;
    margin-left:20px;
}

.sell-deploy-arr{
    width: 5%;
    float:left;

}
</style>
