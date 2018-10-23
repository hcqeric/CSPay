<template>
  <div class="detail-container" v-if="goodsInfo">
    <MainHeader  title="商品详情" :showBack="true"></MainHeader>
    <div class="detail-content">
      <div class="detail-banner">
        <img :src="goodsInfo.goodsImg" alt="">
        <!--<img src="http://img.mezhizp.com/pub/201808301444151170315514.jpg" alt="">-->
        <!--<div class="banner-mask"></div>-->
      </div>
      <div class="detail-intro">
        <p>积分价：{{goodsInfo.pocsPrice| moneyFormat('', 5)}}</p>

        <span>{{goodsInfo.introduce}}</span>
        <p>{{goodsInfo.name}}</p>
      </div>
      <!--<div class="detail-info">-->
        <!--<img :src="item.url" alt="" v-for="item in goodsInfo.goodsDetalFileList" :key="item.id">-->
      <!--</div>-->
    </div>
    <div class="goto">
      <button @click="addToShopCart">{{goodsInfo.pocsPrice| moneyFormat('', 5)}}积分立刻兑换</button>
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
        goodsInfo: null
      }
    },
    methods: {
      addToShopCart(){
        this.$router.push('/order/'+ this.id)
      }
    },
    components:{
      MainHeader
    },
    mounted(){
      let {id} = this.$route.params
      getGoodsDetail(id).then(response=>{
        this.id = response.result.id
        this.goodsInfo = response.result
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
