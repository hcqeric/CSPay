<template>
  <div class="exchange-container">
    <MainHeader :title="title" :showBack="true"></MainHeader>
    <div class="exchange-content">
      <div class="ex-succ">
      <img src="../assets/img/duihuanchenggong.png" alt="">
      <span>{{title}}</span>
      </div>
      <button @click="$router.push('/discount')">完成</button>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
  import { Indicator } from 'mint-ui';
  export default {
    name: "ExchangeSuccess",
    data(){
      return {
        title: ''
      }
    },
    components: {
      MainHeader
    },
    mounted(){
      let {status} = this.$route.params
      if (status == 1){
        this.title = "支付成功"
      }else if(status == 2){
        this.title = "支付失败"
      }
      // Indicator.open({
      //   text: "加载中",
      //   spinnerType: 'snake'
      // })
    }
  }
</script>

<style scoped>
.exchange-container{
  position: relative;
  min-height: 100vh;
  background: #f7f7f7;
}
  .exchange-content{
    position: absolute;
    background: #fff;
    width: 100vw;
    top: 166px;
    bottom: 0;
    left: 0;
  }
  .ex-succ{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 200px 0 0;
  }
.ex-succ>img{
  width: 486px;
  height: 439px;
}
  .ex-succ>span{
    font-size: 70px;
    color: #fe5e48;
  }
  .exchange-content>button{
    position: fixed;
    width: 990px;
    border: none;
    height: 130px;
    line-height: 130px;
    background-color: transparent;
    background-image: url("../assets/img/button_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    bottom: 100px;
    left: 50%;
    font-size: 48px;
    color: #fff;
    outline: none;
    text-align: center;
    margin-left: -495px;
  }
</style>
