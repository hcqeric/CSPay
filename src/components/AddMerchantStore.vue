<template>
  <div class="store-add-container">
    <MainHeader title="添加门店" :showBack="true" ></MainHeader>
    <div class="store-add-content">
      <div class="store-add-info">
        <div class="store-add-header"></div>
        <div class="store-add-msg">
          <div class="store-add-msg-item">
            <span><i>*</i>门店名称：</span>
            <input placeholder="请输入门店名称"/>
          </div>
          <div class="store-add-msg-item">
            <span>店&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</span>
            <input placeholder="请输入店长名称"/>
          </div>
          <div class="store-add-msg-item">
            <span>经营范围：</span>
            <input placeholder="请输入经营范围"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>联系电话：</span>
            <input placeholder="请输入联系电话"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>门店地址：</span>
            <input placeholder="请输入门店地址"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>详细地址：</span>
            <input placeholder="请输入详细地址"/>
          </div>
        </div>
      </div>
    </div>
    <div class="store-add-upload">
      <div class="store-upload-info">
        <p>营业执照：</p>
        <div class="store-info-upload">
          <input class="inp_fil" type="file">
        </div>
        <p>门店照片：</p>
        <div class="store-info-upload">
          <input class="inp_fil" type="file" >
        </div>
        <div class="user-pay">
          <button>保存门店</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
    export default {
        name: "AddMerchantStore",
      components: {
        MainHeader
      }
    }
</script>

<style scoped>
  .store-add-container{
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

  .store-add-upload{
    margin-top: 20px;
    background: #fff;
  }
  .store-upload-info{
    padding: 48px;
  }
  .store-upload-info>p:first-child{
    margin-top: 0;
  }
  .store-upload-info>p{
    font-size: 48px;
    color: #222;
  }
  .store-info-upload{
    height: 540px;
    background: #f0f0f0 url(../assets/img/pic2.png) no-repeat center center;
    background-size: auto 360px;
    position: relative;
  }
  .store-info-upload:first-of-type{
    background: #f0f0f0 url(../assets/img/pic1.png) no-repeat center center;
    background-size: auto 360px;
  }
  .store-info-upload>input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 540px;
    opacity: 0;
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
