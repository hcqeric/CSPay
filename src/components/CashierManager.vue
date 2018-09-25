<template>
    <div class="cashier-container">
      <MainHeader title="门店收银管理" :showBack="true" ></MainHeader>
      <div class="cashier-content">
        <StoreHeader></StoreHeader>
        <div class="cashier-item" v-for="n in 10" :key="n" @click="$router.push('/cashiermrch')">
          <CashierItem></CashierItem>
        </div>
      </div>
      <div class="user-pay">
        <button @click="$router.push('/addcashier')">添加收银员</button>
      </div>
    </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
  import StoreHeader from '@/components/view/StoreHeader'
  import CashierItem from '@/components/view/CashierItem'
    export default {
        name: "CashierManager",
      components: {
        MainHeader,
        StoreHeader,
        CashierItem
      }
    }
</script>

<style scoped>
  .cashier-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .cashier-content{
    margin-top: 20px;
    background: #fff;
    margin-bottom: 170px;
  }
  .cashier-item{
    border-top: 1px dashed #b5b5b5;/*no*/
  }
  .user-pay{
    position: fixed;
    bottom: 0;
    height: 170px;
    width: 100vw;
    text-align: center;
    background: #fff;
  }
  .user-pay:after{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1px;/*no*/
    content: '';
    background: #eee;
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
    margin-top: 20px;
  }
</style>
