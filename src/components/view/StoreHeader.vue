<template>
    <div class="store-header" :class="index % 2 == 1 ? '' : 'color-second'">
      <div class="header-info">
        <span></span>
        <h3>好乐购超市宝安店</h3>
      </div>
    </div>
</template>

<script>
    export default {
        name: "StoreHeader",
        props: {
          index: Number
        }
    }
</script>

<style scoped>
    .store-header{
      height: 148px;
      background: #f57b7e url(../../assets/img/bg3.png) no-repeat left bottom;
      background-size: 100% 10px;
    }
    .store-header.color-second{
      background: #5dcdbf url(../../assets/img/bg3.png) no-repeat left bottom;
    }
    .header-info{
      height: 138px;
      padding: 0 20px;
      display: flex;
      align-items: center;
    }
    .header-info>span{
      display: inline-block;
      height: 112px;
      width: 112px;
      line-height: 112px;
      background: #fff url(../../assets/img/icon22.png) no-repeat center center;
      background-size: 70px auto;
      vertical-align: middle;
      border-radius: 3em;
      margin-right: 1em;
    }
    .header-info>h3{
      font-size: 48px;
      color: #fff;
    }
</style>
