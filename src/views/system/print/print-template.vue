<template>
    <div class="erp-print container-fluid" @mouseup="dragEnd()" @click="resetToolBar">
        <div class="erp-print-setting">
            <div class="print-select-type">
                <div class="row form-inline">
                    <div class="form-group">
                        <label class="form-group-text">选择打印类型<span class="form-required-mark">*</span>:</label>
                        <select class="form-control" v-model="printTemplateType.BusinessType" @change="changePrintType">
                            <option value="{{businessType.Code}}" v-for="businessType in baseLookUp.businessType">{{businessType.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="printTemplateType.BusinessType == 3">
                        <label class="form-group-text">快递<span class="form-required-mark">*</span>:</label>
                        <select v-model="printTemplateType.MerchantDeliveryID" class="form-control" @change="getPrintTemplate">
                            <option value="">不限</option>
                            <option value="{{merchantDeliveryList.MerchantDeliveryID}}" v-for="merchantDeliveryList in baseLookUp.merchantDeliveryLists">{{merchantDeliveryList.Name}}({{merchantDeliveryList.Code}})</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="printTemplateType.BusinessType == 3">
                        <label class="form-group-text">支付方式<span class="form-required-mark">*</span>:</label>
                        <select v-model="printTemplateType.PayMode" class="form-control" @change="getPrintTemplate">
                            <option value="">不限</option>
                            <option value="{{payList.Code}}" v-for="payList in baseLookUp.payLists">{{payList.Text}}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="printTemplateType.BusinessType == 3">
                        <label class="form-group-text">店铺:</label>
                        <select v-model="printTemplateType.ShopID" class="form-control" @change="getPrintTemplate">
                            <option value="">不限</option>
                            <option value="{{shopList.ShopID}}" v-for="shopList in baseLookUp.shopLists">{{shopList.Name}}({{shopList.Code}})</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="print-setting-paper  print-setting print-template-monroe">
                <div class="row form-inline">
                    <div class="form-group page-width">
                        <label class="form-group-text">纸张大小:</label>
                        <input v-model="printTemplate.paper.style.width | mmToPX" type="text" class="form-control" placeholder="宽,单位mm">
                        <span>X</span>
                        <input v-model="printTemplate.paper.style.height | mmToPX" type="text" class="form-control" placeholder="高,单位mm">
                    </div>
                    <div class="form-group page-width">
                        <label class="form-group-text">选择纸张:</label>
                        <select v-model="customPaper" class="form-control" @change="selectCustomPaper(customPaper)">
                            <option :value="{width:0,height:0}">自定义</option>
                            <option :value="{width:210,height:127}">纸质快递面单-申通</option>
                            <option :value="{width:210,height:127}">纸质快递面单-圆通</option>
                            <option :value="{width:218,height:127}">纸质快递面单-顺丰</option>
                            <option :value="{width:100,height:150}">电子快递面单-申通</option>
                            <option :value="{width:100,height:180}">电子快递面单-圆通</option>
                            <option :value="{width:100,height:180}">电子快递面单-中通</option>
                            <option :value="{width:100,height:113}">电子快递面单-京东</option>
                            <option :value="{width:100,height:113}">电子快递面单-韵达</option>
                            <option :value="{width:100,height:113}">电子快递面单-天天快递</option>
                            <option :value="{width:100,height:113}">电子快递面单-邮政小包</option>
                            <option :value="{width:100,height:170}">电子快递面单-百世</option>
                            <option :value="{width:210,height:297}">A4</option>
                        </select>
                    </div>
                    <div class="form-group page-bg-width">
                        <label class="form-group-text">背景图</label>
                        <input v-model="printTemplate.paper.style.imgUrl" type="text" class="form-control" placeholder="请填写背景图的图片链接">
                    </div>
                    <div class="form-group page-bg-dt" v-if="printTemplateType.BusinessType && printTemplateType.BusinessType != 3 && printTemplateType.BusinessType != 4">
                        <label class="checkbox-inline print-checkbox">
                            <input v-model="paperSetting.isShowHead1" type="checkbox" @change="changePrintArea(paperSetting.isShowHead1,0)"> 单头一
                        </label>
                        <label class="checkbox-inline print-checkbox">
                            <input v-model="paperSetting.isShowHead2" type="checkbox" @change="changePrintArea(paperSetting.isShowHead2,1)"  > 单头二
                        </label>
                        <label class="checkbox-inline print-checkbox">
                            <input v-model="paperSetting.isShowFoot" type="checkbox" @change="changePrintArea(paperSetting.isShowFoot,2)"  > 单尾
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div  id="erp-print-edit" class="erp-print-show">
            <div class="erp-print-edit clearfix" @mousemove="dragMove($event)">
                <div class="print-editor">
                    <div class="print-editor-toolbar" @click.stop="">
                        <ul>
                            <li class="editor-toolbar-item">
                                <label>字体大小</label>
                                <select v-model="toolBar.fontSize">
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px">16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                    <option value="22px">22px</option>
                                    <option value="24px">24px</option>
                                    <option value="26px">26px</option>
                                    <option value="28px">28px</option>
                                    <option value="30px">30px</option>
                                    <option value="32px">32px</option>
                                    <option value="32px">32px</option>
                                    <option value="34px">34px</option>
                                    <option value="36px">36px</option>
                                </select>
                            </li>
                            <li class="editor-toolbar-item" v-bind:style="{fontWeight:toolBar.fontWeight}" @click.stop="changeFontWeight">
                                <a data-toggle="tooltip" data-placement="top" title="加粗"><span class="iconfont icon-overstriking">  </span></a>
                            </li>
                            <li class="editor-toolbar-item" v-bind:style="{fontWeight:toolBar.fontStyle}" @click.stop="changeFontStyle">
                                <a data-toggle="tooltip" data-placement="top" title="倾斜"><span class="iconfont icon-tilt"></span></a>
                            </li>
                            <li class="editor-toolbar-item" @click.stop="changeTextAlign('left')">
                                <a data-toggle="tooltip" data-placement="top" title="左对齐"><span class="iconfont icon-left-align"></span></a>
                            </li>

                            <li class="editor-toolbar-item" @click.stop="changeTextAlign('center')">
                                <a data-toggle="tooltip" data-placement="top" title="居中"><span class="iconfont icon-center-align"></span></a>
                            </li>
                            <li class="editor-toolbar-item" @click.stop="changeTextAlign('right')">
                                <a data-toggle="tooltip" data-placement="top" title="右对齐"><span class="iconfont icon-right-align"></span></a>
                            </li>
                        </ul>
                    </div>
                    <div class="print-editor-area" tabindex="0" id="edit-field" @keydown.stop="setPosition">
                        <div class="print-editor-paper" v-bind:style="printTemplate.paper.style">
                            <img class="background-img" :src="printTemplate.paper.style.imgUrl" alt="">
                            <!--快递单-->
                            <div class="delivery-paper" v-if="printTemplateType.BusinessType == 3 || printTemplateType.BusinessType == 4">
                                <div class="formHead" v-bind:style="editField.style">
                                    <div v-for="field in printTemplate.editField[0].fields">
                                        <div class="formHeadField edit-field"
                                             v-bind:style="field.style"
                                             @mousedown.stop="dragStart($event,field,{horizonStyle: 'left', verticalStyle: 'top',direction: 'rb'})"
                                             v-if="field.type !== 4 && !field.isQrCode"
                                        >
                                            <div class="editFieldWrap">
                                            <span class="field-item-form"
                                                  contenteditable="{{writable == field && (field.type == 1 || field.type == 3 )? true: false}}"
                                                  @dblclick="editFieldState(field)"
                                                  @click.stop="focusField(field)"
                                                  @keyup="getContent(field,$event)">{{field.type == 0 ? field.name : field.text}}</span>
                                                <span class="iconfont field-item-ctrl" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'rb'})"></span>
                                            </div>
                                            <div class="tooltip top">
                                                <div class="tooltip-arrow"></div>
                                                <div class="tooltip-inner">宽:{{field.style.width | mmToPX}},高:{{field.style.height | mmToPX}},左边距:{{field.style.left | mmToPX}},上边距:{{field.style.top | mmToPX}}</div>
                                            </div>
                                            <div class="closeField" @click.stop="removeField(printTemplate.editField[0].fields,field)"><span class="iconfont icon-close"></span></div>
                                        </div>

                                        <!--横线-->
                                        <div class="formHeadField edit-field"
                                             v-bind:style="field.style"
                                             @click.stop="focusField(field)"
                                             @mousedown.stop="dragStart($event,field,{horizonStyle: 'left',horizonMin: -1000,verticalMin: -1000, verticalStyle: 'top',direction: 'rb'})"
                                             v-if="field.type == 4"
                                        >
                                            <span class="field-line-ctrl"  v-bind:style="{height:parseInt(field.style.borderWidth)>10 ? field.style.borderWidth : '10px'}" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width',verticalStyle: 'height',direction: 'r'})"></span>
                                            <div class="closeField" @click.stop="removeField(editField.fields,field)"><span class="iconfont icon-close"></span></div>
                                        </div>
                                        <!--二维码-->
                                        <div class="formHeadField edit-field"
                                             v-bind:style="field.style"
                                             @mousedown.stop="dragStart($event,field,{horizonStyle: 'left', verticalStyle: 'top',direction: 'rb'})"
                                             v-if="field.isQrCode"
                                        >
                                            <div class="editFieldWrap">
                                            <span class="field-item-form"
                                                  >{{field.type == 0 ? field.name : field.text}}</span>
                                                <span class="iconfont field-item-ctrl" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'rb'})"></span>
                                            </div>
                                            <div class="tooltip top">
                                                <div class="tooltip-arrow"></div>
                                                <div class="tooltip-inner">宽:{{field.style.width | mmToPX}},高:{{field.style.height | mmToPX}},左边距:{{field.style.left | mmToPX}},上边距:{{field.style.top | mmToPX}}</div>
                                            </div>
                                            <div class="closeField" @click.stop="removeField(printTemplate.editField[0].fields,field)"><span class="iconfont icon-close"></span></div>
                                        </div>
                                    </div>

                                    <div class="formHeadImg edit-field"
                                         v-for="img in printTemplate.editField[0].customImg"
                                         v-bind:style="img.style"
                                         @mousedown.stop="dragStart($event,img,{horizonStyle: 'left', verticalStyle: 'top',direction: 'rb'})"
                                         @dblclick.stop="editImgUrl(img)"
                                    >
                                        <div class="editFieldWrap" @selectStart.stop="return false;">
                                            <img v-bind:src="img.url" alt="" ondragstart="return false;">
                                            <span class="formHeadImgNotice">双击选择图片</span>
                                            <span class="iconfont field-item-ctrl" @mousedown.stop="dragStart($event,img,{horizonStyle: 'width', verticalStyle: 'height',direction: 'rb'})"></span>
                                        </div>
                                        <div class="tooltip top">
                                            <div class="tooltip-arrow"></div>
                                            <div class="tooltip-inner">宽:{{img.style.width | mmToPX}},高:{{img.style.height | mmToPX}},左边距:{{img.style.left | mmToPX}},上边距:{{img.style.top | mmToPX}}</div>
                                        </div>
                                        <div class="closeField" @click.stop="removeField(printTemplate.editField[0].customImg,img)"><span class="iconfont icon-close"></span></div>
                                    </div>


                                    <div class="editField-height-ctrl" onselectstart="return false;"
                                         @mousedown.stop="dragStart($event,editField,{horizonStyle: 'width', verticalStyle: 'height',direction: 'b'})">

                                    </div>
                                </div>
                            </div>
                            <!--快递单结束-->
                            <!--装箱单和捡货单-->
                            <div class="contain-table-paper" v-else>
                                <!--表格,如果没有单头和单尾显示-->
                                <div class="formTable" v-if="printTemplate.editField.length == 0" @click="focusArea(3)">
                                    <span v-if="printTemplate.detailsList.fields.length == 0">表格区</span>
                                    <table v-bind:style="printTemplate.detailsList.style">
                                        <thead>
                                            <tr v-bind:style="printTemplate.detailsList.thead.style">
                                                <th class="edit-field" v-for="field in printTemplate.detailsList.fields" v-bind:style="field.style" @click.stop="focusField(field)">
                                                    <div class="thCtrl edit-field" v-bind:style="{height:printTemplate.detailsList.thead.style.height,lineHeight:printTemplate.detailsList.thead.style.height}">
                                                        {{field.name}}
                                                        <span class="thCtrlWidth" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'r'})"></span>
                                                        <div class="closeField" @click.stop="removeField(printTemplate.detailsList.fields,field)"><span class="iconfont icon-close"></span></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colspan="{{printTemplate.detailsList.fields.length}}">
                                                    <div class="theadCtrl">
                                                        <span class="theadCtrlHeight" @mousedown.stop="dragStart($event,printTemplate.detailsList.thead,{horizonStyle: 'width', verticalStyle: 'height',direction: 'b'})"></span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-for="editField in printTemplate.editField | orderBy 'type'">
                                    <!--表格,如果有单尾时显示-->
                                    <div class="formTable" v-if="editField.type == 2" @click="focusArea(3)">
                                        <span v-if="printTemplate.detailsList.fields.length == 0">表格区</span>
                                        <table v-bind:style="printTemplate.detailsList.style">
                                            <thead>
                                                <tr v-bind:style="printTemplate.detailsList.thead.style">
                                                    <th class="edit-field" v-for="field in printTemplate.detailsList.fields" v-bind:style="field.style" @click.stop="focusField(field)">
                                                        <div class="thCtrl edit-field" v-bind:style="{height:printTemplate.detailsList.thead.style.height,lineHeight:printTemplate.detailsList.thead.style.height}">
                                                            {{field.name}}
                                                            <span class="thCtrlWidth" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'r'})"></span>
                                                            <div class="closeField" @click.stop="removeField(printTemplate.detailsList.fields,field)"><span class="iconfont icon-close"></span></div>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th colspan="{{printTemplate.detailsList.fields.length}}">
                                                        <div class="theadCtrl">
                                                            <span class="theadCtrlHeight" @mousedown.stop="dragStart($event,printTemplate.detailsList.thead,{horizonStyle: 'width', verticalStyle: 'height',direction: 'b'})"></span>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--单头单尾编辑区-->
                                    <div v-bind:class="{'formHeadType0':editField.type==0,'formHeadType1':editField.type==1,'formHeadType2':editField.type==2}" class="formHead" v-bind:style="editField.style" @click="focusArea(editField.type)">
                                        <!--文本字段编辑-->
                                        <div class="formHeadField edit-field"
                                             v-for="field in editField.fields"
                                             v-bind:style="field.style"
                                             @click.stop="focusField(field)"
                                             @mousedown.stop="dragStart($event,field,{horizonStyle: 'left', verticalStyle: 'top',direction: 'rb'})"
                                             v-if="field.type != 4"
                                        >
                                            <!--文本字段编辑-->
                                            <div class="editFieldWrap">
                                                <span class="field-item-form"
                                                      contenteditable="{{writable == field && (field.type == 1 || field.type == 3 )? true: false}}"
                                                      @dblclick="editFieldState(field)"
                                                      @keyup="getContent(field,$event)">{{field.type == 0 ? field.name : field.text}}</span>
                                                <span class="iconfont field-item-ctrl" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'rb'})"></span>
                                            </div>
                                            <div class="tooltip top">
                                                <div class="tooltip-arrow"></div>
                                                <div class="tooltip-inner">宽:{{field.style.width | mmToPX}},高:{{field.style.height | mmToPX}},左边距:{{field.style.left | mmToPX}},上边距:{{field.style.top | mmToPX}}</div>
                                            </div>

                                            <span v-if="field.type == 4" class="field-line-ctrl"  v-bind:style="{height:parseInt(field.style.borderWidth)>10 ? field.style.borderWidth : '10px'}" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width',horizonMin: -1000,verticalMin: -1000, verticalStyle: 'height',direction: 'r'})"></span>
                                            <div class="closeField" @click.stop="removeField(editField.fields,field)"><span class="iconfont icon-close"></span></div>
                                        </div>
                                        <!--横线-->
                                        <div class="formHeadField edit-field"
                                             v-for="field in editField.fields"
                                             v-bind:style="field.style"
                                             @click.stop="focusField(field)"
                                             @mousedown.stop="dragStart($event,field,{horizonStyle: 'left',horizonMin: -1000,verticalMin: -1000, verticalStyle: 'top',direction: 'rb'})"
                                             v-if="field.type == 4"
                                        >
                                            <span class="field-line-ctrl"  v-bind:style="{height:parseInt(field.style.borderWidth)>10 ? field.style.borderWidth : '10px'}" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width',verticalStyle: 'height',direction: 'r'})"></span>
                                            <div class="closeField" @click.stop="removeField(editField.fields,field)"><span class="iconfont icon-close"></span></div>
                                        </div>

                                        <!--图片字段编辑-->
                                        <div class="formHeadImg edit-field"
                                             v-for="img in editField.customImg"
                                             v-bind:style="img.style"
                                             @mousedown.stop="dragStart($event,img,{horizonStyle: 'left', verticalStyle: 'top',direction: 'rb'})"
                                             @dblclick.stop="editImgUrl(img)"
                                        >
                                            <div class="editFieldWrap">
                                                <img v-bind:src="img.url" alt="" ondragstart="return false;">
                                                <span class="formHeadImgNotice">双击选择图片</span>
                                                <span class="iconfont field-item-ctrl" @mousedown.stop="dragStart($event,img,{horizonStyle: 'width', verticalStyle: 'height',direction: 'rb'})"></span>
                                            </div>
                                            <div class="tooltip top">
                                                <div class="tooltip-arrow"></div>
                                                <div class="tooltip-inner">宽:{{img.style.width | mmToPX}},高:{{img.style.height | mmToPX}},左边距:{{img.style.left | mmToPX}},上边距:{{img.style.top | mmToPX}}</div>
                                            </div>
                                            <div class="closeField" @click.stop="removeField(editField.customImg,img)"><span class="iconfont icon-close"></span></div>
                                        </div>


                                        <div class="editField-height-ctrl" onselectstart="return false;"
                                             @mousedown.stop="dragStart($event,editField,{horizonStyle: 'width', verticalStyle: 'height',direction: 'b'})">

                                        </div>
                                    </div>
                                    <!--没有单尾,并且在单头的最后显示-->
                                    <div class="formTable" v-if="editField.type != 2 && $index == printTemplate.editField.length - 1" @click="focusArea(3)">
                                        <span v-if="printTemplate.detailsList.fields.length == 0">表格区</span>
                                        <table v-bind:style="printTemplate.detailsList.style">
                                            <thead>
                                            <tr v-bind:style="printTemplate.detailsList.thead.style">
                                                <th class="edit-field" v-for="field in printTemplate.detailsList.fields" v-bind:style="field.style" @click.stop="focusField(field)">
                                                    <div class="thCtrl edit-field" v-bind:style="{height:printTemplate.detailsList.thead.style.height,lineHeight:printTemplate.detailsList.thead.style.height}">
                                                        {{field.name}}
                                                        <span class="thCtrlWidth" @mousedown.stop="dragStart($event,field,{horizonStyle: 'width', verticalStyle: 'height',direction: 'r'})"></span>
                                                        <div class="closeField" @click.stop="removeField(printTemplate.detailsList.fields,field)"><span class="iconfont icon-close"></span></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colspan="{{printTemplate.detailsList.fields.length}}">
                                                    <div class="theadCtrl">
                                                        <span class="theadCtrlHeight" @mousedown.stop="dragStart($event,printTemplate.detailsList.thead,{horizonStyle: 'width', verticalStyle: 'height',direction: 'b'})"></span>
                                                    </div>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="print-fields">
                    <div class="print-fields-head">
                        <span class="iconfont icon-list"></span><h1>插入模块</h1>
                    </div>
                    <ul>
                        <li v-for="field in fields[printTemplateType.BusinessType]" v-if="field.Type == 2 || (field.Type == 1 ? paperSetting.focusArea == 3 : paperSetting.focusArea != 3)" @click="choiceField(0,field)">{{field.Code}}:{{field.Text}}</li>
                        <li @click="choiceField(1)" v-if="paperSetting.focusArea != 3">自由文本</li>
                        <li @click="choiceField(2)" v-if="paperSetting.focusArea != 3">图片</li>
                        <!--<li @click="choiceField(3)" v-if="paperSetting.focusArea != 3">条码</li>-->
                        <li @click="choiceField(4)" v-if="paperSetting.focusArea != 3">横线</li>
                        <!--<li @click="choiceField(5)" v-if="printTemplateType.BusinessType == 4">二维码</li>-->
                    </ul>
                </div>
            </div>
        </div>
        <div class="print-btn-group">
            <a href="javascript:void(0)" class="btn btn-import btn-default">
                导入模板
                <input @change="importTemplate" id="importTemplate" type="file">
            </a>
            <a href="javascript:void(0)" @click="exportTemplate" class="btn btn-default">导出模板</a>
            <a href="javascript:void(0)" class="btn btn-default" @click="savePrintTemplate">保存</a>
            <!--<a href="javascript:void(0)" class="btn btn-default">返回</a>-->
        </div>
    </div>
    <modal-img></modal-img>
    <!--<a href="{{downLink}}"></a>-->
</template>

<script>
    var servers = require('../../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
                downLink: '',
                baseLookUp: {
                    shopLists: [],  //销售平台
                    payLists: [],   // 支付方式
                    merchantDeliveryLists: [], //快递公司
                    businessType: []   //模板类型
                },
                //打印类型
                printTemplateType: {
                    BusinessType: '1',    //1拣货单  2装箱单 3快递单 4fg
                    MerchantDeliveryID: '',
                    ShopID: '',
                    PayMode: ''
                },
                toolBar: {
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    textAlign: 'left'
                },
                currentField: {},
                timer: null,
                //纸张设置
                paperSetting: {
                    isShowHead1: true,   //是否显示表头1
                    isShowHead2: true,  //是否显示表头2
                    isShowFoot: true,    //是否显示表尾
                    focusArea: 0      //聚焦的区域 0表示单头1,1表示单头2,2表示单尾,3表示表格,4表示快递单
                },
                //字段
                fields: {},
                //打印模板
                printTemplate: {
                    type: 1,    //类型
                    paper: {    //纸张
                        style: {
                            width: '800px',
                            height: '800px',
                            imgUrl: '',
                        }
                    },
                    editField: [],//编辑区域
                    detailsList: {  //表格区域
                        style: {},   //表格样式
                        thead: {     //表头
                            style: {
                                height: '36px',
                            }
                        },
                        fields: []     //table
                    }
                },
                //更改大小
                drag: {
                    dragStart: false,
                    dragMoving: null,
                    startX: 0,
                    startY: 0,
                    moveToX: 0,
                    moveToY: 0,
                },
                writable: '', //可编辑的字段
            }
        },
        filters: {
            mmToPX: {
                read: function (val) {
                    return (parseFloat(val)/3.76).toFixed(1) + 'mm';
                },
                write: function (val) {
                    if (parseFloat(val) > 0) {
                       return (parseFloat(val) * 3.76).toFixed(1) + 'px';
                    }
                }
            }
        },
//        watch: {
//            currentField() {
//                console.log('change')
//                document.getElementById('edit-field').focus()
//            }
//        },
        methods: {
            setPosition(e) {
                var self = this;
                var style = this.currentField.style
                if (!style) return
                switch(e.keyCode) {
                    case 37: // left
                        e.preventDefault();
                        style.left = (parseInt(style.left,10) - 1) + 'px';
                        break;
                    case 38:  // up
                        e.preventDefault();
                        style.top = (parseInt(style.top,10) - 1) + 'px';
                        break;
                    case 39: // right
                        e.preventDefault();
                        style.left = (parseInt(style.left,10) + 1) + 'px';
                        break;
                    case 40: // down
                        e.preventDefault();
                        style.top = (parseInt(style.top,10) + 1) + 'px';
                        break;
                }
            },
//            setPositionUp() {
//                this.clearTimeout(this.timer)
//            },
            getBaseData: function () {
                var baseLookUp = this.baseLookUp;
                //获取销售平台
                servers.getBaseData('ShopList',false,function (val) {
                    baseLookUp.shopLists = val;
                });
                //获取支付方式
                servers.getBaseData('PayModel',false,function (val) {
                    baseLookUp.payLists = val;
                });
                //获取所有快递公司
                servers.getBaseData('MerchantDeliveryList',false,function (val) {
                    baseLookUp.merchantDeliveryLists = val;
                });
                //获取模板类型
                servers.getBaseData('BusinessType',false,function (val) {
                    baseLookUp.businessType = val;
                })
            },
            // 更改纸张
            selectCustomPaper: function (customPaper) {
                this.printTemplate.paper.style.width = parseFloat(customPaper.width) * 3.76 + 'px';
                this.printTemplate.paper.style.height = parseFloat(customPaper.height) * 3.76 + 'px';
            },
            //获取字段
            getFields: function () {
                var businessType = parseInt(this.printTemplateType.BusinessType,10);
                var fields = this.fields;
                var self = this;
                if (typeof(businessType) == 'number') {
                    if (!fields[businessType] || (fields[businessType] && fields[businessType].length == 0)) {
                        servers.postAjax.bind(this)({
                            url: '/Print/ErpQueryFields',
                            data: {
                                PrintTemplateType: {
                                    BusinessType: businessType
                                }
                            }
                        }).done(function (result) {
                            self.fields[businessType] = [];
                            if (result.ResultCode == 1) {
                                var tempObj = {};
                                tempObj[businessType] = result.Data;
                                self.fields = Object.assign({},self.fields,tempObj);
                            }
                        })
                    }
                }
            },
            //获取打印模板,如果在服务器上的打印模板不存在,则新建一个模板
            getPrintTemplate: function () {
                var printTemplateType = this.printTemplateType;
                //如果为快递单
                this.resetPrintTemplate();
                if (printTemplateType.BusinessType == 3) {
                    //如果有店铺或者存在支付方式及快递公司,则请求模板
                    if (printTemplateType.MerchantDeliveryID) {
                        this.getPrintTemplateAjax();
                    }
                } else {
                    this.getPrintTemplateAjax();
                }
            },
            //获取打印模板接口
            getPrintTemplateAjax: function () {
                var self = this;
                servers.postAjax({
                    url: '/Print/ErpQueryPrintTemplate',
                    data: {
                        PrintTemplateType: self.printTemplateType
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1 && result.Data) {
                        self.printTemplate = JSON.parse(result.Data.replace(/\\/ig,''));
                        //如果不是快递单,则显示对应的
                        if (self.printTemplateType.BusinessType != 3 && self.printTemplateType.BusinessType != 4) {
                            var editField = self.printTemplate.editField;
                            self.paperSetting = {
                                isShowHead1: false,
                                isShowHead2: false,
                                isShowFoot: false,
                                focusArea: self.paperSetting.focusArea
                            };
                            editField.forEach(function (item) {
                                if (item.type == 0) {
                                    self.paperSetting.isShowHead1 = true;
                                } else if (item.type == 1 ){
                                    self.paperSetting.isShowHead2 = true;
                                } else if (item.type == 2 ) {
                                    self.paperSetting.isShowFoot = true;
                                }
                            })
                        }
                    }
                })
            },
            //导入模板
            importTemplate: function (event) {
                var self = this;
                var files = event.target.files || event.dataTransfer.files;
                var reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = function () {
                    var importText = this.result;
                    var printTemplate = JSON.parse(importText.replace(/\\/ig,''));
                    var editField = printTemplate.editField;
                    var detailsList = printTemplate.detailsList;
                    //如果不是快递单,则显示对应的
                    if (self.printTemplateType.BusinessType != 3 && self.printTemplateType.BusinessType != 4) {
                        if (!detailsList) {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '请导入正确的模板'
                            });
                            return ;
                        }
                        self.paperSetting = {
                            isShowHead1: false,
                            isShowHead2: false,
                            isShowFoot: false,
                            focusArea: self.paperSetting.focusArea
                        };
                        editField.forEach(function (item) {
                            if (item.type == 0) {
                                self.paperSetting.isShowHead1 = true;
                            } else if (item.type == 1 ){
                                self.paperSetting.isShowHead2 = true;
                            } else if (item.type == 2 ) {
                                self.paperSetting.isShowFoot = true;
                            }
                        })
                    } else {
                        if (detailsList || editField.length > 1) {
                            self.$dispatch('transmit','tip',{
                                name: '提示',
                                contentText: '请导入正确的模板'
                            });
                            return ;
                        }
                    }
                    self.printTemplate = printTemplate;
                    reader = null;
                    document.getElementById('importTemplate').value = '';   // 清空file,避免选同一个文件时不触发change事件
                }
            },
            //导出模板
            exportTemplate: function () {
                var printTemplate = this.printTemplate;
                if (this.checkIfIsEmptyPrintTemplate(printTemplate)) {
                    this.$dispatch('transmit','tip',{
                        name: '提示',
                        contentText: '请先填充模板再导出'
                    });
                    return ;
                }
                var printTemplateType = this.printTemplateType;
                var businessType = printTemplateType.BusinessType;
                var merchantDeliveryID = printTemplateType.MerchantDeliveryID;
                var shopID = printTemplateType.ShopID;
                var payMode = printTemplateType.PayMode;
                var exportFileName = '';
                debugger;
                switch (parseInt(businessType,10)) {
                    case 1:
                        exportFileName = '拣货单打印模板';
                        break;
                    case 2:
                        exportFileName = '装箱单打印模板';
                        break;
                    case 3:
                        exportFileName = '快递单打印模板';
                        break;
                    case 4:
                        exportFileName = '二维码打印模板';
                        break;
                    case 6:
                        exportFileName = '生产订单打印';
                        break;
                }
                if (businessType == 3) {
                    var baseLookUp = this.baseLookUp;
                    var merchantDeliveryLists = baseLookUp.merchantDeliveryLists;
                    var shopLists = baseLookUp.shopLists;
                    var payLists = baseLookUp.payLists;
                    if (merchantDeliveryID) {
                        merchantDeliveryLists.forEach(function (merchantDelivery) {
                            if (merchantDelivery.MerchantDeliveryID == merchantDeliveryID) {
                                exportFileName = exportFileName + '-' + merchantDelivery.Name;
                            }
                        })

                    }
                    if (shopID) {
                        shopLists.forEach(function (shop) {
                            if (shop.ShopID == shopID) {
                                exportFileName = exportFileName + '-' + shop.Name;
                            }
                        })
                    }
                    if (typeof(payMode) == 'number') {
                        payLists.forEach(function (pay) {
                            if (pay.Code == payMode) {
                                exportFileName = exportFileName + '-' + pay.Text;
                            }
                        })
                    }
                }
                var printTemplateString = JSON.stringify(printTemplate);
                var blob = new Blob([printTemplateString]);
                var a = document.createElement("a");
                this.downLink = window.URL.createObjectURL(blob);
                a.href = window.URL.createObjectURL(blob);
                a.download = exportFileName + '.json';
                a.style.opacity = 0;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

            },
            //检查是否为空白模板
            checkIfIsEmptyPrintTemplate: function (printTemplate) {
                var isEmptyPrintTemplate = true;    //是否为空模板
                var editField = printTemplate.editField;    //模板自由区字段
                if (editField.length > 0) {
                    //如果自由选择区中存在字段,则不为空模板
                    editField.forEach(function (item) {
                        if (item.fields.length > 0) {
                            isEmptyPrintTemplate = false;
                        }
                    })
                }
                //如果不为快递模板和二维码模板,并且表格区存在字段,则不为空模板
                if (this.printTemplateType.BusinessType != 3 && this.printTemplateType.BusinessType != 4 && isEmptyPrintTemplate) {
                    if (printTemplate.detailsList && printTemplate.detailsList.fields.length > 0) {
                        isEmptyPrintTemplate = false;
                    }
                }
                return isEmptyPrintTemplate;
            },
            //保存打印格式
            savePrintTemplateAjax: function () {
                var self = this;
                var printTemplate = self.printTemplate;
                var isEmptyPrintTemplate = this.checkIfIsEmptyPrintTemplate(printTemplate);    //是否为空模板
                var printTemplateString = '';

                //如果为空模板,则传空值给后端,否则将模板传递过去
                if (isEmptyPrintTemplate) {
                    printTemplateString = '';
                } else {
                    printTemplateString = JSON.stringify(printTemplate)
                }

                servers.postAjax.bind(this)({
                    url: '/Print/ErpSavePrintTemplate',
                    data: {
                        Type: 0,
                        PrintTemplateType: self.printTemplateType,
                        PrintTemplate: printTemplateString
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '保存模板成功'
                        });
                    }
                })
            },
            savePrintTemplate: function () {
                var printTemplateType = this.printTemplateType;
                if (printTemplateType.BusinessType == 3) {
                    if (printTemplateType.MerchantDeliveryID) {
                        this.savePrintTemplateAjax();
                    } else {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请选择快递公司'
                        });
                    }
                } else {
                    this.savePrintTemplateAjax();
                }
            },
            //重置打印格式
            resetPrintTemplate: function () {
                //如果是快递单
                if (this.printTemplateType.BusinessType == 3 || this.printTemplateType.BusinessType == 4) {
//                    this.delete(this.printTemplate,'detailsList');
                    this.printTemplate = {
                        type: 0,    //类型
                        paper: {    //纸张
                            style: {
                                width: this.printTemplate.paper.style.width,
                                height: this.printTemplate.paper.style.height,
                                imgUrl: ''
                            }
                        },
                        editField: [
                            {
                                style: {},
                                fields: [],
                                customImg: []
                            }
                        ]//编辑区域
                    };
                    this.focusArea(4);
                } else {
                    this.printTemplate = {
                        type: 1,    //类型
                        paper: {    //纸张
                            style: {
                                width: this.printTemplate.paper.style.width,
                                height: this.printTemplate.paper.style.height,
                                imgUrl: ''
                            }
                        },
                        editField: [],//编辑区域
                        detailsList: {  //表格区域
                            style: {},   //表格样式
                            thead: {     //表头
                                style: {
                                    height: '36px',
                                }
                            },
                            fields: []     //table
                        }
                    };
                    this.resetPrintArea();
                }
            },
            //编辑区域标准格式
            editFieldStyle: function (type) {
                return {
                    type: type,
                    style: {
                        height: '200px'
                    },
                    fields: [],
                    customImg: []
                }
            },
            //重置表头表尾格式
            resetPrintArea: function () {
                var paperSetting = this.paperSetting;
                var isShowHead1 = paperSetting.isShowHead1;
                var isShowHead2 = paperSetting.isShowHead2;
                var isShowFoot = paperSetting.isShowFoot;
                var editField = this.printTemplate.editField = [];
                var allAreaCode = [];
                if (isShowHead1) {
                    editField.push(this.editFieldStyle(0));
                    allAreaCode.push(0);
                }
                if (isShowHead2) {
                    editField.push(this.editFieldStyle(1));
                    allAreaCode.push(1);
                }
                if (isShowFoot) {
                    editField.push(this.editFieldStyle(2));
                    allAreaCode.push(2);
                }
                if (allAreaCode.length == 0) {
                    this.focusArea(3);
                } else {
                    this.focusArea(allAreaCode[0]);
                }
            },
            //选择及取消表头表尾
            changePrintArea: function (isShow,type) {
                var editField = this.printTemplate.editField;
                if (isShow) {
                    editField.push(this.editFieldStyle(type));
                    this.paperSetting.focusArea = type;  //如果显示,则将焦点聚焦到新增显示的区域
                } else {
                    editField.forEach(function (item) {
                        if (item.type == type) {
                            editField.$remove(item);
                        }
                    });
                    this.paperSetting.focusArea = 3;   //如果取消,则将焦点聚焦到表格
                }
            },
            //更改打印类型
            changePrintType: function () {
                if (this.printTemplateType.BusinessType != 3) {  //如果不是快递单,清空快递 店铺 和 支付方式的数据
                    this.printTemplateType = {
                        BusinessType: this.printTemplateType.BusinessType,
                        MerchantDeliveryID: '',
                        ShopID: '',
                        PayMode: ''
                    };
                }
                this.getFields();   //获取字段
                this.printTemplate.type = this.printTemplateType.BusinessType;  //更新打印类型
                console.log(this.printTemplate.type)
                this.getPrintTemplate();   //获取打印模板
                
            },
            //聚焦的区域,以显示对应区域的字段
            focusArea: function (type) {
                this.paperSetting.focusArea = type;
            },
            //鼠标按下
            dragStart: function (event, item,options) {
                options = $.extend({
                    horizonMin: 0,
                    verticalMin: 0,
                    horizonStyle: 'width',
                    verticalStyle: 'height',
                    direction: 'rb'
                },options);
                var drag = this.drag;
                this.dragEnd();
                drag.startX = event.x;
                drag.startY = event.y;
                drag.moveToX = event.x;
                drag.moveToY = event.y;
                var self = this;
                drag.dragMoving = setInterval(function () {
                    self.dragMoveTo(item,options);
                },10);
                drag.dragStart = true;
            },
            dragMove: function (event) {
                var drag = this.drag;
                drag.moveToX = event.x;
                drag.moveToY = event.y;
            },
            dragMoveTo: function (item,options) {
                var drag = this.drag;
                if (drag.dragStart) {
                    var horizonMin = options.horizonMin || 0;
                    var verticalMin = options.verticalMin || 0;
                    var distanceX = drag.moveToX - drag.startX;
                    var distanceY = drag.moveToY - drag.startY;
                    drag.startX = drag.moveToX;
                    drag.startY = drag.moveToY;
                    var horizonStyleValue = distanceX + parseInt(item.style[options.horizonStyle]);
                    var verticalStyleValue = distanceY + parseInt(item.style[options.verticalStyle]);
                    horizonStyleValue = horizonStyleValue > horizonMin ? horizonStyleValue : horizonMin;
                    verticalStyleValue = verticalStyleValue > verticalMin ? verticalStyleValue : verticalMin;
                    switch ( options.direction ) {
                        case 'r':
                            item.style[options.horizonStyle] = horizonStyleValue + 'px';
                            break;
                        case 'b':
                            item.style[options.verticalStyle] = verticalStyleValue + 'px';
                            break;
                        case 'rb':
                            item.style[options.horizonStyle] = horizonStyleValue + 'px';
                            item.style[options.verticalStyle] = verticalStyleValue + 'px';
                            break;
                    }
                }
            },
            dragEnd: function () {
                this.drag.dragStart = false;
                this.drag.dragMoving = clearInterval(this.drag.dragMoving);
            },
            /**
             * 选择需要编辑的文本
             * @param type  0字段 1自由文本 2图片 3条码 4 横线
             */
            choiceField: function (type,field) {
                var focusArea = this.paperSetting.focusArea;
                var printTemplate = this.printTemplate;
                var printTemplateType = this.printTemplateType;
                var editFieldTemplate = this.editFieldTemplate(type,field,focusArea);
                if (focusArea == 3) {   //如果是表格
                    printTemplate.detailsList.fields.push(editFieldTemplate);
                } else if (focusArea == 4) {   //如果为快递单
                    if (this.printTemplateType.BusinessType == 3 && !printTemplateType.MerchantDeliveryID) {
                        this.$dispatch('transmit','tip',{
                            name: '提示',
                            contentText: '请先选择快递公司'
                        });
                    } else {
                        if (type == 2) {  //如果为图片
                            printTemplate.editField[0].customImg.push(editFieldTemplate);
                        } else {
                            printTemplate.editField[0].fields.push(editFieldTemplate);
                        }
                    }
                } else {   //如果为其他区域
                    printTemplate.editField.forEach(function (editField) {
                        if (editField.type == focusArea) {
                            if (type == 2) {
                                editField.customImg.push(editFieldTemplate);
                            } else {
                                editField.fields.push(editFieldTemplate);
                            }
                        }
                    })
                }
            },
            /**
             * 字段类型初始格式
             * @param type 0字段 1自由文本 2图片 3条码(此字段作费,用后台传过来的IsBarcode来判定是否为条码) 4横线
             */
            editFieldTemplate: function (type,field,focusArea) {
                var self = this;
                switch (type) {
                    case 0:
                        if (focusArea == 3) {
                            return {
                                text: field.Text,
                                name: field.Code,
                                content:  self.editFieldContent(field.Text),
                                isBarcode: field.IsBarcode,
                                isQrCode: field.IsQrCode,
                                style: {
                                    width: '90px',
                                    fontSize: '12px',
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    textAlign: 'center',
                                    border: '1px solid #E5E5E5'
                                }
                            }
                        } else {
                            return {
                                content: self.editFieldContent(field.Text),
                                text: field.Text,
                                name: field.Code,
                                isBarcode: field.IsBarcode,
                                isQrCode: field.IsQrCode,
                                type: type,
                                style: {
                                    width: '200px',
                                    height: '24px',
                                    left: '0',
                                    top: '0',
                                    border: 'none',
                                    background: null,
                                    fontSize: '14px',
                                    fontWeight: 'normal',
                                    fontFamily: 'inherit',
                                    fontStyle: 'normal',
                                    textAlign: 'left'
                                }
                            };
                        }
                    case 1:
                        return {
                            content: '自由文本,双击编辑',
                            text: '自由文本,双击编辑',
                            type: type,
                            isBarcode: false,
                            isQrCode: false,
                            style: {
                                width: '200px',
                                height: '24px',
                                left: '0',
                                top: '0',
                                border: 'none',
                                background: null,
                                fontSize: '14px',
                                fontWeight: 'normal',
                                fontFamily: 'inherit',
                                fontStyle: 'normal',
                                textAlign: 'left'
                            }
                        };
                    case 2:
                        return {
                            style: {
                                width: '100px',
                                height: '100px',
                                left: '0',
                                top: '0'
                            },
                            url: '',
                            text: '双击更改图片地址',
                        };
                    case 3:
                        return {
                            content: '请输入条码,双击编辑',
                            text: '请输入条码,双击编辑',
                            type: type,
                            style: {
                                width: '200px',
                                height: '24px',
                                left: '0',
                                top: '0',
                                border: 'none',
                                background: null,
                                fontSize: '14px',
                                fontWeight: 'normal',
                                fontFamily: 'inherit',
                                fontStyle: 'normal',
                                textAlign: 'left'
                            }
                        };
                    case 4:
                        return {
                            content: '',
                            text: '',
                            type: type,
                            isBarcode: false,
                            isQrCode: false,
                            style: {
                                width: '200px',
                                height: 0,
                                left: '10px',
                                top: '10px',
                                borderWidth: '1px',
                                borderColor: '#000',
                                borderStyle: 'solid',
                                transform: 'scale(0.5,0.5)'
                            }
                        };
                }
            },
            editFieldContent: function (fieldContent) {
                var fieldContents = fieldContent.split('_');
                var fieldContentString = '';
                var BusinessType = parseInt(this.printTemplateType.BusinessType);
                var preField = '';
                switch (BusinessType) {
                    case 1:
                        preField = 'pick';
                        break;
                    case 2:
                        preField = 'pack';
                        break;
                    case 3:
                        preField = 'delivery';
                        break;
                    case 4:
                        preField = 'code';
                        break;
                    case 6:
                        preField = "order";
                        break;
                }
                var focusArea = this.paperSetting.focusArea;
                if (focusArea == 3) {   //如果为表格
                    preField = preField + 'Detail';
                }
                fieldContents.forEach(function (item) {
                    fieldContentString += '{{' + preField + '.' + item +  '}}';
                });
                return fieldContentString;
            },
            //编辑自由文本及条码
            editFieldState: function (field) {
                this.writable = field;
            },
            //对于自由文本及条码
            getContent: function (field,event) {
                if (field.type == 1 || field.type == 3) {
                    field.content = field.text = event.srcElement.innerHTML;
                }
            },
            //编辑图片
            editImgUrl: function (field) {
                this.$broadcast('modal-img',field);
            },
            //字段编辑聚焦
            focusField: function (field) {
                this.currentField = field
                if (field.type == 3) {
                    this.toolBar = {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        textAlign: 'left'
                    }
                } else {
                    this.toolBar = field.style;
                }
            },
            //改变字体粗细
            changeFontWeight: function () {
                if (this.toolBar.fontWeight == 'normal') {
                    this.toolBar.fontWeight = 'bold';
                } else {
                    this.toolBar.fontWeight = 'normal'
                }
            },
            //改变字体倾斜
            changeFontStyle: function () {
                if (this.toolBar.fontStyle == 'normal') {
                    this.toolBar.fontStyle = 'italic';
                } else {
                    this.toolBar.fontStyle = 'normal'
                }
            },
            //改变字体对齐方式
            changeTextAlign: function (value) {
                this.toolBar.textAlign = value;
            },
            resetToolBar: function () {
                this.toolBar = {
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    textAlign: 'left'
                }
            },
            removeField: function (parentArray, field) {
                parentArray.$remove(field);
            },
            // 按上下左右键阻止浏览器默认事件
            arrowKeysHandler: function (e) {
                switch(e.keyCode){
                    case 37:
                    case 39:
                    case 38:
                    case 40:
                        e.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        },

        route: {
            data: function (transition) {
                var query = transition.to.query;
                this.printTemplateType = {
                    BusinessType: query.businessType || 1,
                    MerchantDeliveryID: query.merchantDeliveryID || '',
                    ShopID: query.shopID || '',
                    PayMode: query.payMode || ''
                };
                this.getBaseData();   //获取基础数据
                this.getFields();   //获取对应字段
                transition.next();
            }
        },
        ready: function () {
            this.getPrintTemplate(); //获取对应的打印模板
            window.addEventListener("keydown", this.arrowKeysHandler, false);
        },
        beforeDestroy: function () {
            window.removeEventListener("keydown", this.arrowKeysHandler, false);
        },
        components: {
            modalImg: require('./modal-img.vue')
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .print-editor {
        width: 800px;
        height: 800px;
        float: left;
        border: 1px solid #E5E5E5;
        overflow: scroll;
    }
    .print-fields {
        width: 220px;
        height: 800px;
        float: left;
        border: 1px solid #E5E5E5;
        overflow: scroll;
    }
    .erp-print-edit {
        .editFieldWrap {
            border: 1px dashed #000;
            height: 100%;
            color:#000;
        }
        margin-top: 20px;
        width: 1050px;
        .print-editor-paper {
            position: relative;
            border: 1px solid #E5E5E5;
            border-top:none;
            .background-img {
                position: absolute;
                left: 0;
                top: 0;
            }
            .delivery-paper {
                height: 100%;
                .formHead {
                    height: 100%;
                    border: none;
                }
            }
        }
        .formHead {
            position: relative;
            border-bottom: 1px solid #E5E5E5;
            &.formHeadType0 {
                background: rgba(146, 165, 211, 0.5);
            }
            &.formHeadType1 {
                background: rgba(211, 146, 166, 0.5);
            }
            &.formHeadType2 {
                background: rgba(146, 198, 211, 0.5);
            }
            .formHeadField {
                position: absolute;
                /*border: 1px dashed #E5E5E5;*/
                cursor: move;
                z-index: 1;
                .field-item-form {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                .field-item-ctrl {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 14px;
                    color: #000;
                    display: inline-block;
                    cursor: se-resize;
                    padding: 0 0 0 1px;
                    &:before {
                        content: '\e644';
                    }
                }
                .field-line-ctrl {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 10px;
                    cursor: ew-resize;
                }
            }
            .formHeadImg {
                position: absolute;
                border: 1px dashed #E5E5E5;
                cursor: move;
                z-index: 1;
                .formHeadImgNotice {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    text-align: center;
                }
                .field-item-ctrl {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 14px;
                    color: #000;
                    display: inline-block;
                    padding: 0 0 0 1px;
                    cursor: se-resize;
                    &:before {
                        content: '\e644';
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .editField-height-ctrl {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 3px;
                cursor: ns-resize;
            }
        }
        .formTable {
            border-collapse: collapse;
            table-layout: fixed;
            border-bottom: 1px solid #E5E5E5;
            width: 100%;
            table {
                margin: 0 auto;
            }
        }
        .thCtrl {
            position: relative;
            .thCtrlWidth {
                position: absolute;
                width: 3px;
                height: 100%;
                right: 0;
                top: 0;
                cursor: ew-resize;
            }
        }
        .theadCtrl {
            position: relative;
            width: 100%;
            height: 3px;
            .theadCtrlHeight {
                position: absolute;
                width: 100%;
                height: 3px;
                left: 0;
                top: -3px;
                cursor: ns-resize;
            }
        }
    }
    .editor-toolbar-item {
        display: inline-block;
        cursor: pointer;
    }
    .edit-field {
        &.formHeadField,
        &.formHeadImg {
            position: relative;
        }
        .tooltip {
            display: none;
            opacity: 0;
            top: -36px;
            left: 50%;
            transition: opacity 0.2s linear;
            transform: translate(-50%, 0);
        }
        .tooltip-inner {
            white-space: nowrap;
        }
        .editFieldWrap {
            &:hover ~ .tooltip {
                display: block;
                opacity: 1;
            }
        }
        &:hover {

            .closeField {
                display: block;
            }
        }
        .closeField {
            display: none;
            position: absolute;
            left: -7px;
            top: -7px;
            width: 14px;
            height: 14px;
            text-align: center;
            line-height: 14px;
            cursor: pointer;
        }
    }

    .print-template-monroe{
        margin-top:20px;
        margin-bottom:10px;
        .form-group{
            margin-right:10px;
        }
        .page-width{
            input{
                width: 70px;

            }
        }
        .page-bg-width{
            input{
                width:166px;
                padding-left:8px;
            }

        }
        .print-checkbox{
            input{
                vertical-align: middle;
                margin-top:-3px;
            }
            line-height:4px;

        }

    }
    .erp-print-show{
        .print-editor-area{
            margin-top:36px;

        }
        .erp-print-edit{
            .formTable{
                padding:10px;
            }
        }
        .print-fields{
            ul{
                li{
                    line-height:34px;
                    text-align: left;
                    padding-left:10px;
                    cursor:pointer;
                    white-space: inherit;
                    border-bottom:1px dashed #e5e5e5;
                    h1{
                        font-weight:bold;
                        font-size:16px;
                        display:inline-block;

                    }
                }
                li:hover{
                    background: #FAFAFA;
                }


            }
        }
        .formHead{
            padding:8px;
        }
        .editFieldWrap{
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;


            span{
                padding:5px 10px;

            }

        }
        margin-left:-15px;
        .print-editor-toolbar{
            border-left:1px solid #e5e5e5;
            border-top:none;
            border-bottom:none;
            background: #FAFAFA;
            height: 35px;
            font-size:14px;
            line-height:35px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            position: absolute;
            width: 782px;
            z-index:5;
            ul{
                padding:0 10px;

            }
            select{
                border:1px solid #E5E5E5;
                border-radius: 4px;
                height: 24px;
                line-height: 24px;
                margin:0 8px;
            }

        }

        .print-editor{
            border:none;
            border-top:1px solid #e5e5e5;
        }
    }

    .print-btn-group{
        margin-top:20px;
        a{
            margin-right:10px;
        }
    }
    .page-bg-dt{
        margin-top:-5px;
    }
    .formTable{
        z-index:5;
    }
    .erp-print-show{
        .erp-print-edit{

            .formHead{
                border-bottom:1px solid #000;
            }
            .print-editor-paper{
                .background-img{
                    z-index:-7;
                }
            }
        }
    }
    .print-fields-head{
        background: #FAFAFA;
        border-bottom:1px dashed #E5E5E5;
        width: 100%;
        h1{
            font-size:16px;
            font-weight:bold;
            margin-top:9px;
            margin-bottom:10px;
            display: inline-block;

        }

   }
    .btn-import {
        position: relative;
        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }


</style>