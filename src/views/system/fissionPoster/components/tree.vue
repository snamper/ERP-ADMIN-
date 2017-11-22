<template>
    <li>
        <span class="commodity-categories-item" :class="[agents.OpenID === openID ? 'selected' : '',agents.children ? 'pitch-on' : 'pitch-off']" @click="getAgentDeptID(agents)">
            <i class="iconfont" :class="[agents.children ? 'icon-file' : 'icon-hollowfile']" data-toggle="collapse" data-target="#{{agents.OpenID}}"></i><em>{{agents.NickName}}</em>
        </span>
        <ul id="{{agents.OpenID}}" class="collapse">
            <agents-tree v-for="agents in agents.children" :agents="agents" :open-id.sync="openID"></agents-tree>
        </ul>
    </li>
</template>

<script>
    module.exports = {
        props: ['agents','openID'],
        name: 'agentsTree',
        methods: {
            getAgentDeptID: function (agents) {
                this.$dispatch('getAgentsList',agents);
//                this.openID = agents.OpenID;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
