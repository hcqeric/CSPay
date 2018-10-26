<template>
  <div class="coupon-container">
    <MainHeader title="使用优惠券"></MainHeader>
    <div class="coupon-content">
      <div class="user-info">
        <div class="info-item">
          用户名：<span>{{userInfo.userId}}</span>
        </div>
        <div class="info-item">
          手机号：<span>{{userInfo.mobile}}</span>
        </div>
        <div class="info-item">
          订单编号：<span>{{orderNum}}</span>
        </div>
        <div class="user-pay">
          <button @click="showDialog">使用优惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {useCoupon,getUserInfo} from "../http/getData";
  import MainHeader from '@/components/view/MainHeader'
  import {MessageBox, Toast} from 'mint-ui'


  export default {
    name: "UseCoupon",
    components: {
      MainHeader
    },
    data() {
      return {
        orderNum: '',
        userId: '',
        Authorization: '',
        userInfo:{
          userId: '',
          mobile: '',
          createTime: ''
        }
      }
    },
    methods:{
      showDialog(){
        MessageBox({
          title: '使用优惠券',
          message: '亲，确定要使用该优惠券吗?',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            useCoupon(this.userId, this.orderNum,{
              Authorization: this.Authorization
            }).then(response => {
              // Toast({
              //   message: '完成使用',
              //   position: 'middle',
              //   duration: 1500
              // })
            })
          } else {
            console.log("quxiaole")
          }
        })
      }
    },
    mounted() {
      let {orderNum, userId} = this.$route.params
      this.orderNum = orderNum
      this.userId = userId

      let {Authorization} = this.$route.query
      this.Authorization = Authorization

      this.showDialog()

      getUserInfo(this.userId).then(response => {
        this.userInfo.userId = response.data.userId
        this.userInfo.mobile = response.data.mobile
        this.userInfo.createTime = response.data.createTime
      })
    }
  }
</script>

<style scoped>
  .coupon-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .coupon-content{
    position: absolute;
    background: #fff;
    width: 100vw;
    top: 166px;
    bottom: 0;
    left: 0;
  }

  .user-info{
    padding: 48px;
  }
  .info-item{
    display: flex;
    align-items: center;
    height: 120px;
    font-size: 48px;
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
