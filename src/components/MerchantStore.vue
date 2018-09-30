<template>
  <div class="merchant-container">
    <MainHeader title="门店管理"></MainHeader>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                 @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
    <div class="store-item-cont" v-for="(item, n) in shopList" :key="item.id" @click.stop="gotoCashierMgr(item.id)">
      <StoreItem :index="n"></StoreItem>
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
      <span>o(╥﹏╥)o 目前还没有添加过门店!!!</span>
    </div>
    <div v-if="allLoaded" class="page-err">
      <span>o(╥﹏╥)o所有门店都在这里了!!!</span>
    </div>
    <div class="user-pay">
      <button @click="addMerchantStore">添加门店</button>
    </div>
  </div>
</template>

<script>
    import MainHeader from '@/components/view/MainHeader'
    import StoreItem from '@/components/view/StoreItem'
    import {getShopList} from "../http/getData";
    import {setLocalStorage} from "../custom/mixin";

    export default {
        name: "MerchantStore",
      data(){
          return {
            showError: false,
            allLoaded: false,
            autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
            bottomStatus: '',
            bottomPullText: '上拉加载更多...',
            bottomDropText: '释放更新...',
            totalCount: 0,
            pageInfo:{
              page: 1,
              limit: 3
            },
            shopList: [],
            Authorization: ''
          }
      },
      components:{
          StoreItem,
          MainHeader
      },
      methods:{
        loadBottom(){
          if( this.totalCount - this.pageInfo.limit * this.pageInfo.page > 0){
            this.pageInfo.page++
            this.getListData(this.pageInfo)
          }else{
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        gotoCashierMgr(id){
          this.$router.push(`/cashiermgr/${id}`)
        },
        addMerchantStore(){
          this.$router.push('/addstore')
        },
        getListData(pageInfo){
          getShopList(pageInfo).then(response=>{
            this.totalCount = response.data.total
            response.data.dataList.map(item => {
              this.shopList.push(item)
            })
          }).catch(error => {})
        }
      },
      mounted(){
        let {Authorization} = this.$route.query
        this.Authorization = Authorization
        // this.Authorization = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTM2MTg1ODI3NyIsImV4cCI6MTUzODcyNjkwNCwidXNlcklkIjoxMDQxNTk2MTc0NTM4MTMzNTA1LCJjcmVhdGVkIjoxNTM4MTIyMTA0Njg2fQ.d6VcsAHXN3aUAByttmZ8aCIjN6H3NOaf4zItEQwenFvGcGcz9zknARCI82OeOEGnRm3Dd7MIwrQ3V2hndsnSng'
        setLocalStorage("Authorization", this.Authorization)
        this.getListData(this.pageInfo)
      }
    }
</script>

<style scoped>
  .merchant-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .store-item-cont:first-of-type{
    padding-top: 40px;
    margin-top: 0;
  }
  .store-item-cont{
    margin: 40px 40px 0;
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

  .page-err>span{
    display: block;
    font-size: 42px;
    color: #fe5e48;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
</style>
