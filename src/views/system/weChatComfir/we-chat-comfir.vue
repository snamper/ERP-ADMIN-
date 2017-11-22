<template>
    <div class="container-wechat role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>微信设置</p>
                </div>
                <div class="operate-form-list">
                    <div class="operate-form-title">
                        <label class="form-group-text weight">颜色设置</label>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">主色:<span class="form-required-mark">*</span></label>
                        <input @focus="focusForm('themeColor')" v-model="color.themeColor" type="text" id="theme" class="input-control">
                        <div @click="focusForm('themeColor')" class="color-confir" :style="{background: color.themeColor}"></div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">辅色1:<span class="form-required-mark">*</span></label>
                        <input @focus="focusForm('matchColor')" v-model="color.matchColor" type="text" class="input-control">
                        <div @click="focusForm('themeColor')" class="color-confir" :style="{background: color.matchColor}"></div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">辅色2:<span class="form-required-mark">*</span></label>
                        <input @focus="focusForm('matchTwo')" v-model="color.matchTwo" type="text" class="input-control">
                        <div @click="focusForm('themeColor')" class="color-confir" :style="{background: color.matchTwo}"></div>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">辅色3:<span class="form-required-mark">*</span></label>
                        <input @focus="focusForm('matchThree')" v-model="color.matchThree" type="text" class="input-control">
                        <div @click="focusForm('themeColor')" class="color-confir" :style="{background : color.matchThree}"></div>
                    </div>

                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>

                    </div>

                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" @click="save">提交</a>
                        <a href="javascript:void(0)" class="btn btn-default" @click="resetting">重置</a>
                        <a v-link="{name:'dashboard'}" class="btn btn-default">返回列表>></a>
                    </div>
                    <div id="picker-wrapper">
                        <div id="picker"></div>
                        <div id="picker-indicator"></div>
                        <div id="slider-wrapper">
                        <div id="slider"></div>
                        <div id="slider-indicator"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    var ColorPicker = require('../../../js/colorpicker');
    module.exports = {
        data: function () {
            return {
                color: {
                    themeColor: '',
                    matchColor: '',
                    matchTwo: '',
                    matchThree: '',
                },
                indexColor: ''
            }

        },
        methods: {
            focusForm(indexColor) {
                this.indexColor = indexColor;
                console.log(this.indexColor);
            },
            resetting() {
                this.color = {
                    themeColor: '',
                    matchColor: '',
                    matchTwo: '',
                    matchThree: '',
                }
            },
            save() {
                debugger;
                var self = this;
                if (!self.color.themeColor) {
                    self.$dispatch('transmit', 'tip', {
                        name: '提示:',
                        contentText: '主色不能为空'
                    });
                }
                self.$dispatch('transmit', 'tip', {
                    name: '提示:',
                    contentText: '确定提交吗',
                    btnName: '确定',
                    events: {
                        confirm: 'save'
                    }
                });
                self.$off('save');
                self.$once('save', function () {
                    NProgress.start();
                    servers.postAjax.bind(this)({
                        url: 'File/ErpSaveSkinColorConfig',
                        data: {
                            ThemeColor: self.color.themeColor,
                            MatchOne: self.color.matchColor,
                            MatchTwo: self.color.matchTwo,
                            MatchThree: self.color.matchThree,
                        }
                    },'/').done(function (result) {
                        NProgress.done();
                        if (result.ResultCode == 1) {
                            self.$dispatch('transmit', 'tip', {
                                name: '提示:',
                                contentText: '保存成功'
                            });
                        }

                    })
                })
            },
            getColorConfir() {
                var self = this;
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: 'File/ErpQuerySkinColorConfig'
                },'/').done(function (result) {
                    NProgress.done();
                    if(result.ResultCode == 1) {
                        var color = result.Data;
                        self.color.themeColor = color.ThemeColor,
                        self.color.matchColor = color.MatchOne,
                        self.color.matchTwo = color.MatchTwo,
                        self.color.matchThree = color.MatchThree
                    }
                });
            }
        },
        route: {
            data: function (transition) {

            }
        },
        watch: {
            'color.themeColor': function (val,oldVal) {
                if (val) {
                    if(!this.color.matchColor) {
                        this.color.matchColor = this.color.themeColor;
                    }
                }
            },
            'color.matchColor': function (val,oldVal) {
                if (!val) {
                        this.color.matchColor = this.color.themeColor;
                }
            },
        },
        ready: function () {
            var self = this;
            self.getColorConfir();
//            ColorPicker.fixIndicators(
//                    document.getElementById('slider-indicator'),
//                    document.getElementById('picker-indicator'));

            new ColorPicker(
                    document.getElementById('slider'),
                    document.getElementById('picker'),

                    function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {

                        ColorPicker.positionIndicators(
                                document.getElementById('slider-indicator'),
                                document.getElementById('picker-indicator'),
                                sliderCoordinate, pickerCoordinate
                        );
                        console.log(self.indexColor + '123');
                        if (!self.indexColor) {
                            console.log('请点击要选的颜色！')
                        } else {
                            self.color[self.indexColor] = hex;
                        }

                        console.log(self.color[self.indexColor]);
                    });


//            new ColorPicker(
//                    document.getElementById('slide'),
//                    document.getElementById('picker'),
//                    function(hex, hsv, rgb) {
//                        document.body.style.backgroundColor = hex;
//                    });
        }
    };
</script>

<style rel="stylesheet/less" lang="less" >
    .container-wechat {
        .a {
            background-color: #1A1B1D;
        }
        .weight {
            font-weight: bold;
        }
        .input-control {
            margin-left: 25px;
            height: 26px;
            border-radius: 5px;
            border: 1px solid #ccc;
            padding-left: 10px;

        }
        .color-confir {
            margin-left: 25px;
            width: 26px;
            height: 26px;
            border: 1px solid #ccc;
        }
        #picker-wrapper {
            width: 200px;
            height: 200px;
            position: relative;
            left: 417px;
            top: -205px;
        }
        #slider-wrapper {
            width: 30px;
            height: 200px;
            position: absolute;
            top: 0px;
            left: 200px;

        }
        #picker-indicator {
            width: 3px;
            height: 3px;
            position: absolute;
            border: 1px solid white;
        }
        #slider-indicator {
            width: 100%;
            height: 10px;
            position: absolute;
            border: 1px solid black;
        }
    }

</style>