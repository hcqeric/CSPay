<template>
  <div class="cashier-add-container">
    <MainHeader title="添加收银员" :showBack="true" ></MainHeader>
    <div class="store-add-content">
      <div class="store-add-info">
        <div class="store-add-header"></div>
        <div class="store-add-msg">
          <div class="store-add-msg-item">
            <span><i>*</i>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
            <input placeholder="请输入姓名" v-model="cashierName"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>联系电话：</span>
            <input placeholder="请输入联系电话" v-model="cashierMobile"/>
          </div>
        </div>
      </div>
      <div class="user-pay">
        <button @click="saveCashier">保存收银员</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {createClerk} from "../http/getData";
  import {Toast} from 'mint-ui'
  import MainHeader from '@/components/view/MainHeader'
    export default {
      name: "AddCashier",
      data(){
        return {
          cashierName: '',
          cashierMobile: '',
          shopId: ''
        }
      },
      components: {
        MainHeader
      },
      methods:{
        saveCashier(){
          if (!this.cashierName || !this.cashierMobile) {
            Toast({
              message: '标星项为必填！',
              position: 'middle',
              duration: 1000
            })
            return false
          }
          if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.cashierMobile))) {
            Toast({
              message: '手机号码格式不正确！',
              position: 'middle',
              duration: 1000
            })
            return false
          }
          createClerk({
            shopId: this.shopId,
            name: this.cashierName,
            mobile: this.cashierMobile
          }).then(response => {
            Toast({
              message: '添加收银员成功！',
              position: 'middle',
              duration: 1000
            })
            this.$router.push(`/cashiermgr/${this.shopId}`)
          })
        }
      },
      mounted(){
        let {id} = this.$route.params
        this.shopId = id
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
