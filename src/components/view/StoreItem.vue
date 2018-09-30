<template>
    <div class="store-item">
      <StoreHeader :index="index"></StoreHeader>
      <div class="store-info">
        <div class="store-msg">
          <div class="store-msg-item">
            <i></i>
            <span>店   长：Anglababy</span>
          </div>
          <div class="store-msg-item">
            <i></i>
            <span>台卡数：15张</span>
          </div>
        </div>
        <div class="store-setting" :class="index % 2 == 1 ? '' : 'color-second'">
          <span @click.stop="setManager">设置店长</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import StoreHeader from '@/components/view/StoreHeader'
    export default {
        name: "StoreItem",
      components:{
          StoreHeader
      },
      props: {
        index: Number
      },
      methods:{
        setManager(){
          Toast({
            message: '功能暂未开放，敬请期待',
            duration: 1500
          })
          // this.$router.push('/setmanager')
        }
      }
    }
</script>

<style scoped>
  .store-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 20px;
  }
  .store-msg{
    padding: 40px 0;
  }
  .store-msg-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
  }
  .store-msg-item:first-of-type>i{
    background: url(../../assets/img/icon23.png) no-repeat center center;
    background-size: auto 48px;
  }
  .store-msg-item>i{
    height: 50px;
    width: 50px;
    background: url(../../assets/img/icon24.png) no-repeat center center;
    background-size: auto 48px;
  }
  .store-msg-item>span{
    font-size: 48px;
    margin-left: 40px;
  }
  .store-setting{
    margin: 0 20px;
  }
  .store-setting>span{
    display: inline-block;
    background: #f57b7e;
    text-align: center;
    width: 296px;
    height: 100px;
    line-height: 100px;
    border-radius: 50px;
    font-size: 52px;
    color: #fff;
  }
  .store-setting.color-second>span{
    background: #5dcdbf;
  }
</style>
