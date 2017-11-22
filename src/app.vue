<template>
<div class="productImg-show">
    <div class="productImg-li">

    </div>

</div>
  <div class="app">
      <router-view></router-view>
  </div>
  <tip></tip>
  <file-upload></file-upload>
    <browser></browser>
    <helptip></helptip>
    <table-header></table-header>
</template>

<script>
    var store = require('./js/vuex/store');
    var actions = require('./js/vuex/actions');
    var servers = require('./js/servers/servers');
    var cookie = require('js-cookie');
    module.exports = {
        components: {
            tip: require('./components/tip.vue'),
            browser: require('./components/browser.vue'),
            fileUpload: require('./components/fileUpload.vue'),
            tableHeader: require('./components/table_header.vue'),
            helpTip: require('./components/helpTip.vue')
        },
        events: {
            /**
             * 转发事件
             * @param  {string} eventName 事件名称
             * @param  {object} arg       事件参数
             * @param  {object} index     可以是任意值，相当于第二个参数，可以在回调时传回，以区分事件针对的对象
             * @return {null}
             */
            'transmit': function (eventName, arg, index) {
                this.$broadcast(eventName, arg, index);
            }
        },
        vuex: {
            actions: {
                updateWebUser: actions.updateWebUser,
            }
        },
        ready: function () {
            var webUser = document.getElementsByTagName('body')[0].attributes.user;
            if (webUser && webUser.nodeValue) {
                this.updateWebUser(webUser.nodeValue);
            }

            //启动toolTip
            $(document).on('mouseenter','[data-toggle="tooltip"]',function () {
                $('[data-toggle="tooltip"]').tooltip();
            });

            //显示详情
            $(document).on('show.bs.collapse','.sheet-list-collapse', function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').addClass('detail-opened');

            });
            $(document).on('hidden.bs.collapse','.sheet-list-collapse',function () {
                var sheetListCollapseId = $(this).attr('id');
                $('[data-target="#' + sheetListCollapseId + '"]').parents('.sheet-list-item').removeClass('detail-opened');
            });
        },
        store: store
    }
</script>

<style lang="less">
    .btn-blue-circle {
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        border-radius: 15px;
        font-size: 12px;
        border: 1px solid #758dce;
        background: transparent;
    }
    .toolip {
    background: #ccc;
    }
    .productImg-show{
        position: absolute;
        width: 100%;
        height: 100%;
        //background: rgba(0,0,0,.26);
        z-index:200;
        display:none;
    }
</style>
