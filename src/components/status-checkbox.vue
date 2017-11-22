<script>
    /**
     * 状态复选框，返回 1 与 0
     */
    export default {
        props: ['status'],

        ready(){
            //
        }
    }
</script>
<template id="status-checkbox">
    <label class="form-group-text"></label>
    <div class="checkbox-group">
        <div class="checkbox">
            <label>
                <input type="checkbox" :true-value=1 :false-value="0" v-model="status" checked="parseInt(Barcode.status)==1" style="margin-top: -1px;">
                启用
            </label>
        </div>
    </div>
    <!-- <input type="checkbox" v-model="status" :true-value="1" :false-value="0" style="vertical-align: center; margin: 10px;"> -->
    <!-- <select v-model="status" class="form-control" style="margin-top: 5px; margin-bottom: 5px;">
        <option value="1">启用</option>
        <option value="0">禁用</option>
    </select> -->
</template>
