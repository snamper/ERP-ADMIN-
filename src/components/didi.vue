<template>
    <div class="didi">
        <!--错误信息-->
        <audio preload type="error" :src="errorAudio"></audio>
        <!--商品成功-->
        <audio preload type="goodSuccess" v-ref:good-success :src="goodSuccessAudio"></audio>
        <!--订单成功-->
        <audio preload type="orderSuccess" :src="orderSuccessAudio"></audio>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
</style>

<script type="text/babel">
    import errorAudio from '../audio/error.wav'
    import goodSuccessAudio from '../audio/good_success.wav'
    import orderSuccessAudio from '../audio/order_success.wav'
    export default {
        data() {
            return {
                errorAudio,
                goodSuccessAudio,
                orderSuccessAudio,
            }
        },
        methods: {
            /**
             * 错误提示
             */
            playError: function() {

                document.querySelector('[type="error"]').play()
            },
            /**
             * 扫描商品成功提示
             */
            playGoodSuccess: function() {
                document.querySelector('[type="goodSuccess"]').play()
            },
            /**
             * 扫描订单成功提示
             */
            playOrderSuccess: function() {
                document.querySelector('[type="orderSuccess"]').play()
            }
        },
    };
    
</script>