<template>
    <li>
        <span class="commodity-categories-item" :class="[categories.DeptID === deptID ? 'selected' : '',categories.children ? 'pitch-on' : 'pitch-off']" @click="getCategoryDeptID(categories)">
            <i class="iconfont" :class="[categories.children ? 'icon-file' : 'icon-hollowfile']" data-toggle="collapse" data-target="#{{categories.DeptID}}"></i><em>{{categories.Name}}</em></span>
        <ul id="{{categories.DeptID}}" class="collapse">
            <categories-tree v-for="categories in categories.children" :categories="categories" :dept-id.sync="deptID"></categories-tree>
        </ul>
    </li>
</template>

<script>
    module.exports = {
        props: ['categories','deptID'],
        name: 'categoriesTree',
        methods: {
            getCategoryDeptID: function (categories) {
                this.$dispatch('getCategoriesList',categories);
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>
