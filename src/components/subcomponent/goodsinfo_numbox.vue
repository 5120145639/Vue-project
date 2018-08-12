<template>
    <!-- 因为是异步请求的数据来设置max，max还未获取到值就被传递过来，所以为undefined :data-numbox-max='max'  
    需要用watch监听max值（watch是值改变了就会触发）-->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    import mui from "../../lib/js/mui.min.js"
    export default {
        mounted(){//初始化数字选择组件
            mui(".mui-numbox").numbox()
        },
        methods:{
            countChanged(){
                this.$emit("getcount",parseInt(this.$refs.numbox.value))
            }
        },
        props:["max"],
        watch:{
            "max":function(newVal,oldVal){
                mui(".mui-numbox").numbox().setOption("max",newVal)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>

