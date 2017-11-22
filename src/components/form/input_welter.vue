<template lang="html">
    <div class="form-group col-lg-3 col-md-4 col-sm-6">
        <label>{{inputText}}<span v-if="canMark && pageType != 'see'" class="form-required-mark">*</span></label>
        <div class="monad">
            <input v-if="pageType != 'see' && !inputAfter" v-model="inputValue" type="text" class="form-control" :style="{
                borderRadius: 4 + 'px'
                }">
            <div class="input-group input-group-center" v-if="pageType != 'see' && inputAfter">
                <input v-model="inputValue" type="text" class="form-control" style="border-radius:4px;">
                <span class="input-group-addon input-group-addonbg">{{inputAfter}}</span>
            </div>
            <div v-if="pageType == 'see'" class="monad" v-text="inputValue && inputAfter || inputValue === 0 && inputAfter ? inputValue + inputAfter : inputValue || ''"></div>
        </div>
    </div>
</template>

<script lang="coffee">
    module.exports =
        props: ['inputValue', 'pageType', 'canMark', 'inputText', 'inputAfter']
</script>
