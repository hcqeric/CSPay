<template>
    <div class="cashier-container">
      <MainHeader title="门店收银管理" :showBack="true" ></MainHeader>
      <div class="cashier-content">
        <StoreHeader></StoreHeader>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                     @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div class="cashier-item" v-for="item in cashierList" :key="item.id" @click.stop="$router.push('/cashiermrch')">
          <CashierItem></CashierItem>
        </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus === 'pull'">{{bottomPullText}}</span>
            <span v-show="bottomStatus === 'drop'">{{bottomDropText}}</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
        <div v-if="totalCount == 0" class="page-err">
          <span>o(╥﹏╥)o 该门店目前还没有收银员!!!</span>
        </div>
        <div v-if="allLoaded" class="page-err">
          <span>o(╥﹏╥)o所有收银员都在这里了!!!</span>
        </div>
      </div>
      <div class="user-pay">
        <button @click="addCashier">添加收银员</button>
      </div>
    </div>
</template>

<script>
  import {getClerkList} from "../http/getData";
  import MainHeader from '@/components/view/MainHeader'
  import StoreHeader from '@/components/view/StoreHeader'
  import CashierItem from '@/components/view/CashierItem'
    export default {
        name: "CashierManager",
      data(){
          return{
            showError: false,
            allLoaded: false,
            autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
            bottomStatus: '',
            bottomPullText: '上拉加载更多...',
            bottomDropText: '释放更新...',
            totalCount: 0,
            shopId: '',
            pageInfo:{
              page: 1,
              limit: 15
            },
            cashierList: []
          }
      },
      components: {
        MainHeader,
        StoreHeader,
        CashierItem
      },
      methods:{
        loadBottom(){
          if( this.totalCount - this.pageInfo.limit * this.pageInfo.page > 0){
            this.pageInfo.page++
            this.getCashierList(this.pageInfo)
          }else{
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
          addCashier(){
            this.$router.push(`/addcashier/${this.shopId}`)
          },
          getCashierList(pageInfo){
            getClerkList({
              shopId: this.shopId
            },pageInfo).then(response => {
              this.totalCount = response.data.total
              response.data.dataList.map(item => {
                this.cashierList.push(item)
              })
            }).catch(error => {})
          }
      },
      mounted(){
        let {id} = this.$route.params
        this.shopId = id
        this.getCashierList(this.pageInfo)
      }
    }
</script>

<style scoped>
  .cashier-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .cashier-content{
    margin-top: 20px;
    background: #fff;
    /*margin-bottom: 170px;*/
  }
  .cashier-item{
    border-top: 1px dashed #b5b5b5;/*no*/
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

  .page-err>span{
    display: block;
    font-size: 42px;
    color: #fe5e48;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
</style>
