<template>
    <li>
        <span class="commodity-categories-item" :class="[agents.CustomerID === customerId ? 'selected' : '',agents.children ? 'pitch-on' : 'pitch-off']" @click="getAgentDeptID(agents)">
            <i class="iconfont" :class="[agents.children ? 'icon-file' : 'icon-hollowfile']" data-toggle="collapse" data-target="#{{agents.CustomerID}}"></i><em>{{agents.Name}}({{agents.CustomerGradeName}})</em></span>
        <ul id="{{agents.CustomerID}}" class="collapse">
            <agents-tree v-for="agents in agents.children" :agents="agents" :customer-id.sync="customerId"></agents-tree>
        </ul>
    </li>
</template>

<script>
    module.exports = {
        props: ['agents','customerId'],
        name: 'agentsTree',
        methods: {
            getAgentDeptID: function (agents) {
                this.$dispatch('getAgentsList',agents);
                this.customerId = agents.CustomerID;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
