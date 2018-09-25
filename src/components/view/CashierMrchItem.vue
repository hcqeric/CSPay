<template>
    <div class="cashiermrch-item">
      <div class="cashiermrch-item-time">
        <span>2017-03-06 12：00 至 2017-03-06  18:00</span>
      </div>
      <div class="cashiermrch-item-info">
        <p>订单金额：<span>6800.00</span><i>元</i></p>
        <p>订单笔数：<span>350</span></p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CashierMrchItem"
    }
</script>

<style scoped>
  .cashiermrch-item-time{
    background: #ef8f5d;
    text-align: center;
    padding: 30px;
  }
  .cashiermrch-item-time>span{
    font-size: 46px;
    color: #fff;
  }
  .cashiermrch-item-info{
    display: flex;
    padding: 10px 0;
    text-align: center;
    background: #f7f7f7;
  }
  .cashiermrch-item-info>p{
    flex: 1;
    font-size: 44px;
    color: #222;
    position: relative;
  }
  .cashiermrch-item-info>p:last-child{
    flex-shrink: 1;
  }
  .cashiermrch-item-info>p:last-child:after{
    position: absolute;
    content: '';
    width: 1px;/*no*/
    height: 100%;
    background: #999;
    left: 0;
    top: 0;
  }
  .cashiermrch-item-info>p>span{
    font-size: 42px;
    color: #ef8f5d;
  }
  .cashiermrch-item-info>p>i{
    font-size: 40px;
    color: #999;
  }
</style>
