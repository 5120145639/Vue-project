<template>
    <div>
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotuList" :key="item.src">
            <img :src="item.img" alt="" :class="{'full':isfull}">
        </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:["lunbotuList","isfull"]
    }
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    &:nth-child(1) {
      background-color: pink;
    }
    &:nth-child(2) {
      background-color: cyan;
    }
    &:nth-child(3) {
      background-color: #0f0;
    }
    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full{
  width: 100%;
}
</style>

