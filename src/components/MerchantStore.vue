<template>
  <div class="merchant-container">
    <MainHeader title="门店管理"></MainHeader>
    <div class="store-item-cont" v-for="n in 5" :key="n" @click.stop="gotoCashierMgr">
      <StoreItem :index="n"></StoreItem>
    </div>
    <div class="user-pay">
      <button @click="addMerchantStore">添加门店</button>
    </div>
  </div>
</template>

<script>
    import MainHeader from '@/components/view/MainHeader'
    import StoreItem from '@/components/view/StoreItem'
    export default {
        name: "MerchantStore",
      components:{
          StoreItem,
          MainHeader
      },
      methods:{
        gotoCashierMgr(){
          console.log("aaaaaaaaaaaaaaaaa")
          this.$router.push('/cashiermgr')
        },
        addMerchantStore(){
          this.$router.push('/addstore')
        }
      }
    }
</script>

<style scoped>
  .merchant-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .store-item-cont:first-of-type{
    padding-top: 40px;
    margin-top: 0;
  }
  .store-item-cont{
    margin: 40px 40px 0;
  }
  .user-pay{
    margin-top: 160px;
    text-align: center;
  }
  .user-pay>button{
    width: 990px;
    border: none;
    height: 130px;
    line-height: 130px;
    background-color: transparent;
    background-image: url("../assets/img/button_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 48px;
    color: #fff;
    outline: none;
    text-align: center;
    margin-bottom: 40px;
  }
</style>
