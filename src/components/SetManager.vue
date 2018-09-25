<template>
  <div class="manager-container">
    <MainHeader title="设置店长" :showBack="true" ></MainHeader>
    <div class="manager-content">
      <div class="manager-set">
        <div class="manager-merchant">
          <span>好乐付</span>
          <span>百万商户的选择</span>
        </div>
        <div class="manager-qrcode">
          <img src="../assets/img/ewm.png" alt="">
          <p>扫码注册成为该门店店长</p>
        </div>
      </div>
      <div class="user-pay">
        <button>解绑店长</button>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
    export default {
        name: "SetManager",
      components: {
        MainHeader
      }
    }
</script>

<style scoped>
  .manager-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .manager-content{
    position: absolute;
    background: #fff;
    width: 100vw;
    top: 166px;
    bottom: 0;
    left: 0;
  }
  .manager-set{
    width: 810px;
    margin: 40px auto 0;
  }
  .manager-merchant{
    background: #ef8f5d;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
  }
  .manager-merchant>span:first-child{
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .manager-merchant>span{
    font-size: 46px;
    color: #fff;
  }
  .manager-qrcode{
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px;
  }
  .manager-qrcode>img{
    vertical-align: top;
    width: 630px;
    height: 630px;
  }
  .manager-qrcode>p{
    font-size: 48px;
    color: #222;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .user-pay{
    margin-top: 130px;
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
