<template>
  <div class="cashier-add-container">
    <MainHeader title="添加收银员" :showBack="true" ></MainHeader>
    <div class="store-add-content">
      <div class="store-add-info">
        <div class="store-add-header"></div>
        <div class="store-add-msg">
          <div class="store-add-msg-item">
            <span><i>*</i>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
            <input placeholder="请输入名称"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>联系电话：</span>
            <input placeholder="请输入联系电话"/>
          </div>
        </div>
      </div>
      <div class="user-pay">
        <button>保存收银员</button>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
    export default {
      name: "AddCashier",
      components: {
        MainHeader
      }
    }
</script>

<style scoped>
  .cashier-add-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .store-add-content{
    margin-top: 20px;
    background: #fff;
  }
  .store-add-header{
    background: #f57b7e url(../assets/img/bg3.png) no-repeat left bottom;
    background-size: 100% 10px;
    height: 54px;
  }
  .store-add-msg{
    padding: 0 58px 48px;
  }
  .store-add-msg-item{
    display: flex;
    align-items: center;
    height: 134px;
  }
  .store-add-msg-item>span{
    position: relative;
    font-size: 48px;
    width: 272px;
  }
  .store-add-msg-item>span>i{
    display: block;
    position: absolute;
    left: -36px;
    top: 10px;
    color: #f57b7e;
    font-style: normal;
  }

  .store-add-msg-item>input{
    border: none;
    outline: none;
    margin: 4px;
    flex: 1;
    font-size: 42px;
    color: #000;
  }

  .user-pay{
    margin-top: 40px;
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
