<template>
    {{statement|json}}
</template>
<script lang="coffee">
    ### 报表设计器 ###
    module.exports =
        # 数据模型
        data: () ->
            return {
                # 报表页面信息
                statement:
                    name: '报表设计器'
            }

        methods: {}

</script>
