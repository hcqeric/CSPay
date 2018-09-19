<template>
  <div class="home-header">
    <i :class="showBack == true ? 'mintui mintui-back' : ''" @click="$router.back()"> </i>
    <span>{{title}}</span>
    <i></i>
  </div>
</template>

<script>
    export default {
        name: "MainHeader",
      props: {
        title: '',
        showBack: false
      }
    }
</script>

<style scoped>
  .home-header{
    height: 146px;
    line-height: 146px;
    display: flex;
    justify-content: space-between;
    color: #222;
    font-size: 54px;
    background: #fff;
  }
  .home-header>i{
    font-size: 48px;
    padding-left: 44px;
    color: #222;
  }
</style>
