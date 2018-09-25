<template>
    <div class="cashiermrch-container">
      <div class="cashiermrch-header">
        <div class="cashiermrch-info">
          <img src="../assets/img/icon34.png" alt="">
          <p>AnglaBaby</p>
          <span>18632133313</span>
        </div>
        <div class="cashiermrch-total">
          <div class="cashiermrch-total-item">
            <p>255646<span>元</span></p>
            <div class="cashiermrch-total-info total-amount">
              <span></span>总金额
            </div>
          </div>
          <div  class="cashiermrch-total-item count">
            <p>255646</p>
            <div class="cashiermrch-total-info total-count">
              <span></span>总笔数
            </div>
          </div>
          <div  class="cashiermrch-total-item">
            <p>255646</p>
            <div class="cashiermrch-total-info total-score">
              <span></span>总积分
            </div>
          </div>
        </div>
        <i class="mintui mintui-back" @click="goBack"></i>
      </div>
      <div class="cashiermrch-cash-list">
        <div class="cashiermrch-cash-item" v-for="n in 10" :key="n">
          <CashierMrchItem></CashierMrchItem>
        </div>
      </div>
      <div class="user-pay" v-if="n == 0">
        <button>结算下班</button>
      </div>
      <div class="user-pay dbtn" v-if="n == 1">
        <button>解除绑定</button>
        <button>结算下班</button>
      </div>
    </div>
</template>

<script>
    import CashierMrchItem from '@/components/view/CashierMrchItem'
    export default {
        name: "CashierMgrMerchant",
      components:{
        CashierMrchItem
      },
      data(){
        return {
          n: 1
        }
      },
        methods:{
          goBack(){
            this.$router.back()
          }
        }
    }
</script>

<style scoped>
  .cashiermrch-header{
    background: url(../assets/img/bg1.jpg) no-repeat center bottom;
    background-size: cover;
    height: 650px;
    position: relative;
  }
  .cashiermrch-header>i{
    font-size: 48px;
    color: #fff;
    position: absolute;
    top: 40px;
    left: 40px;
    padding: 20px;
  }
  .cashiermrch-info{
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding: 70px 0;
    align-items: center;
  }
  .cashiermrch-info>img{
    height: 180px;
    width: 180px;
  }
  .cashiermrch-info>span{
    font-size: 48px;
    color: #fff;
  }
  .cashiermrch-info>p{
    font-size: 54px;
    font-weight: bold;
    color: #fff;
    padding: 8px 0;
    margin: 0;
  }
  .cashiermrch-total{
    display: flex;
    flex-direction: row;
  }
  .cashiermrch-total-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cashiermrch-total-item>p{
    font-size: 52px;
    font-weight: bold;
    color: #fff;
    margin: 0;

  }
  .cashiermrch-total-item>p>span{
    font-size: 36px;
    margin-left: 8px;
  }
  .cashiermrch-total-info{
    margin-top: 10px;
    font-size: 40px;
    height: 50px;
    color: #fff;
    line-height: 50px;
  }
  .cashiermrch-total-info>span{
    display: inline-block;
    height: 40px;
    width: 40px;
    margin-right: 10px;
    margin-bottom: -4px;
    line-height: 40px;
  }
  .total-amount>span{
    background: url(../assets/img/icon35.png) no-repeat center center;
    background-size: auto 34px;
  }
  .total-count>span{
    background: url(../assets/img/icon36.png) no-repeat center center;
    background-size: auto 34px;
  }
  .total-score>span{
    background: url(../assets/img/icon37.png) no-repeat center center;
    background-size: auto 34px;
  }
  .cashiermrch-total-item.count{
    border-left: 1px solid #fff;/*no*/
    border-right: 1px solid #fff;/*no*/
  }
  .cashiermrch-cash-list{
    padding: 0 20px;
    margin-bottom: 170px;
  }
  .cashiermrch-cash-item{
    margin-top: 20px;
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
  .user-pay.dbtn>button{
    width: 450px;
    background-image: url("../assets/img/btn-bg.jpg");
    background-repeat: repeat;
    margin: 20px 20px 0;
    border-radius: 65px;
  }
</style>
