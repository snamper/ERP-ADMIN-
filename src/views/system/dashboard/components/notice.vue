<template>
    <div class="system-notice">
        <span><img src="../../../../images/system-notice.png" alt=""></span>系统公告
    </div>
    <div class="activity-list-hd">
        <a v-link="{name:'notice-see',query: { noticeID : noticeListRemoveHtmlTag[0].NoticeID } }">
            <h1>{{noticeListRemoveHtmlTag[0].Title}}</h1>
            <p>{{noticeListRemoveHtmlTag[0].Content}}</p>
        </a>
    </div>
    <div class="activity-list" v-if="noticeListRemoveHtmlTag.length > 0">
        <ul>
            <li v-for="notice in noticeListRemoveHtmlTag" v-if="$index > 0"><a v-link="{name:'notice-see',query:{noticeID:notice.NoticeID}}">{{notice.Title}}</a></li>
        </ul>
    </div>
</template>

<script>
    var servers = require('../../../../js/servers/servers');
    module.exports = {
        data: function () {
            return {
                noticeList: []
            }
        },
        methods: {
            getNotices: function () {
                var self = this;
                servers.postAjax({
                    url: '/SysNotice/ErpQuerySysNotice',
                    data: {
                        PageNumber: 1,
                        PageSize: 5,
                        SearchWhere: {
                            Status: 1
                        }
                    }
                }).done(function (result) {
                    if (result.ResultCode == 1) {
                        self.noticeList = result.Data.PageData;
                    }
                })
            },
            //去掉所有的html标记
            removeHtmlTag: function (str) {
                return str.replace(/<[^>]+>/g,"");
            }
        },
        computed: {
            noticeListRemoveHtmlTag: {
                get: function () {
                    var self = this;
                    var noticeList = this.noticeList;
                    if (noticeList.length > 0) {
                        noticeList.forEach(function (item) {
                            item.Content = self.removeHtmlTag(item.Content);
                        });
                        return noticeList;
                    }
                    return [];
                }
            }
        },
        ready: function () {
            this.getNotices();
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>