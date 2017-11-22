<template>
    <div class="row">
        <div class="col-xs-12">

        </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-md-5">.col-xs-6 .col-md-4</div>
      <div class="col-xs-2 col-md-2">.col-xs-6 .col-md-4</div>
      <div class="col-xs-5 col-md-5">.col-xs-6 .col-md-4</div>
    </div>
</template>
<script>
    // 配置sku 选择
    module.exports = {
        data: function () {
            return {
                data: {
                    select: []
                }
            }
        },
        porps: [list, name, newList],
        methods: {
            add: function () {
                console.log('add');
            },
            delete: function () {
                console.log('delete');
            }
        }
    }
</script>
