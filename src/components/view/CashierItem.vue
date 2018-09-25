<template>
    <div class="cashier-item-info">
      <div class="cashier-info-icon">
        <img src="../../assets/img/icon33.png" alt="">
      </div>
      <div class="cashier-info-msg">
        <span>张萌萌<i :class="n == 0 ? 'is-merchant' : ''">收银员</i></span>
        <span>18632133313</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CashierItem",
      data(){
          return {
            n: 1
          }
      }
    }
</script>

<style scoped>
  .cashier-item-info{
    display: flex;
    height: 242px;
    align-items: center;
  }
  .cashier-info-icon>img{
    margin-left: 36px;
    height: 150px;
  }
  .cashier-info-msg{
    margin-left: 40px;
    display: flex;
    flex-direction: column;
  }
  .cashier-info-msg>span{

    font-size: 48px;
    color: #999;
  }
  .cashier-info-msg>span:first-child{
    padding-bottom: 20px;
    font-size: 52px;
    color: #222;
  }
  .cashier-info-msg>span>i{
    margin-left: 20px;
    font-size: 48px;
    color: #f7b5b7;
  }
  .cashier-info-msg>span>i.is-merchant{
    color: #f57b7e;
  }
</style>
