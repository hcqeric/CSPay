<template>
  <div class="detail-container" v-if="goodsInfo">
    <MainHeader  title="商品详情" :showBack="true"></MainHeader>
    <div class="detail-content">
      <div class="detail-banner">
        <!--<img :src="goodsInfo.goodsImg" alt="">-->
        <mt-swipe :auto="4000" class="swipe">
          <mt-swipe-item v-for="(item, index) in goodsInfo.goodsDetailFileList" :key="index"><img :src="item.url" alt=""></mt-swipe-item>
        </mt-swipe>
        <!--<img src="http://img.mezhizp.com/pub/201808301444151170315514.jpg" alt="">-->
        <!--<div class="banner-mask"></div>-->
      </div>
      <div class="detail-intro">
        <p>积分价：{{goodsInfo.pocsPrice| moneyFormat('', 5)}}</p>
        <p class="goods-name">{{goodsInfo.name}}</p>
        <span>{{goodsInfo.introduce}}</span>
        <div class="goods-amount">
          <div>
          <button class="amount-btn" @click="minusAmount">-</button>
          <input v-model.number="tradeCount" type="number" style="width: 2em" @input="handleInput" @focus="handlefocus" @blur="handleBlur">
          <button class="amount-btn" @click="addAmount">+</button>
          </div>
        </div>
      </div>

      <!--<div class="detail-info">-->
        <!--<img :src="item.url" alt="" v-for="item in goodsInfo.goodsDetalFileList" :key="item.id">-->
      <!--</div>-->
    </div>
    <div class="goto">
      <button @click="addToShopCart">{{(goodsInfo.pocsPrice * tradeCount)| moneyFormat('', 5)}}积分立刻兑换</button>
    </div>
  </div>
</template>

<script>

  import MainHeader from '@/components/view/MainHeader'
  import {getGoodsDetail} from "../http/getData";

  export default {
    name: "GoodsDetail",
    data(){
      return {
        id: '',
        tradeCount: 1,
        isFirstFocus: true,
        focusAmount: 1,
        goodsInfo: null
      }
    },
    methods: {

      addToShopCart(){
        this.$router.push(`/order/${this.id}/${this.tradeCount}`)
      },
      minusAmount(){
        if (this.tradeCount <= 1){
          this.tradeCount = 1
          return false
        }
        this.tradeCount--
      },
      addAmount(){
        this.tradeCount++
      },
      handleInput(){

      },
      handlefocus(){
        if(this.isFirstFocus){
          this.focusAmount = this.tradeCount
          this.isFirstFocus = false
        }
      },
      handleBlur() {
        if (this.tradeCount == '' || this.tradeCount < 1) {
          this.tradeCount = this.focusAmount
        }
      }
    },
    components:{
      MainHeader
    },
    mounted(){
      let {id} = this.$route.params
      getGoodsDetail(id).then(response=>{
        // alert('2342342')
        this.id = response.data.id
        this.goodsInfo = response.data
        // alert(JSON.stringify(this.goodsInfo))
      })
    }
  }
</script>

<style scoped>
  .detail-container{
    min-height: 100vh;
    background: #f7f7f7;
    position: relative;
  }
  .detail-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 888;
  }
  .detail-content{
    position: absolute;
    top: 168px;
    bottom: 140px;
    left: 0;
    width: 100vw;
    background: #fff;
  }
  .detail-banner{
    position: relative;
    width: 100vw;
    text-align: center;
    vertical-align: middle;
  }
  .mint-swipe {
    height: 36vh;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  img{
    width: 100%;
  }
  .detail-banner>img{
    width: 90vw;
    padding: 16px;
  }
  .detail-intro{
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 0 44px;
  }
  .detail-intro>span{
    font-size: 42px;
    color: #a4a9ad;
  }
  .detail-intro>p:first-child{
    font-size: 36px;
    color: #fe5e48;
  }
  .detail-intro>.goods-name{
    font-size: 48px;
    color: #333;
  }
  .detail-intro>p:last-child{
    font-size: 48px;
    color: #717580;
  }
  .detail-info{
    margin-top: 20px;
    margin-bottom: 140px;
    background: #fff;
  }
  .detail-info>img{
    width: 100vw;
    vertical-align: bottom;
  }

  .goods-amount{
    margin-top: 20px;

    display: flex;
  }
  .goods-amount>div{
    line-height: 80px;
    height: 80px;
    border: 1px solid #fe5e48;
  }
  .goods-amount>div>input{
    box-sizing: border-box;
    border: none;
    text-align: center;
    font-size: 48px;
    color: #333;
    padding: 0;
  }
  .amount-btn{
    border: none;
    background-color: transparent;
    background-image: url("../assets/img/bg-color-btn.png");
    color: #fff;
    height: 80px;
    width: 80px;
    font-size: 58px;
  }

  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 140px;
    line-height: 140px;
    background-color: transparent;
    background-image: url("../assets/img/btn-bg.jpg");
    width: 100%;
    font-size: 48px;
    color: #fff;
    outline: none;
    text-align: center;
  }


</style>
<style>
  .swipe .mint-swipe-indicator.is-active {
    background: #fe5e48;
  }
  .swipe .mint-swipe-indicator {
    background: #999;
    opacity: 1;
  }
</style>
