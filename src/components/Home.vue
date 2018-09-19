<template>
  <div class="home-container" v-if="typeList.length != 0">
    <div class="home-header">
      积分商城
      <span class="discount" @click="$router.push('/discount')">优惠券</span>
    </div>
    <img src="../assets/img/shangcheng_banner.jpg"/>
    <div class="home-sorts">
      <div class="sort-list" >
        <div class="sort-item" v-for="item in typeList" :key="item.id" @click="changeList(item.id)">
          <img :src="item.url" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <p class="list-title">
        商品中心
      </p>
      <div class="list-content">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                     @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
          <div class="goods-item" v-for="item in  goodsList" :key="item.id" @click="$router.push('/detail/' + item.id)">
            <img :src="item.goodsImg" alt="">
            <div class="goods-intro">
              <p class="goods-name">{{item.name}}</p>
              <p class="goods-price">积分兑换：{{item.pocsPrice| moneyFormat('', 5)}}</p>
            </div>
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
          <span>o(╥﹏╥)o 当前分类下还没有商品!!!</span>
        </div>
        <div v-if="allLoaded" class="page-err">
          <span>o(╥﹏╥)o所有商品都在这里了!!!</span>
        </div>
      </div>
    </div>

    <div v-if="showError">
      <ErrorLoaded></ErrorLoaded>
    </div>
  </div>
</template>

<script>
    import {getGoodsList} from "../http/getData";
    import {setLocalStorage} from "../custom/mixin";

    export default {
        name: "Home",
        data(){
          return{
            showError: false,
            allLoaded: false,
            autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
            bottomStatus: '',
            bottomPullText: '上拉加载更多...',
            bottomDropText: '释放更新...',
            totalCount: 0,
            page: 1,
            pageInfo:{
              page: '1',
              limit: '15',
              queryLevel: '0',
              typeId: ''
            },
            typeList: [],
            goodsList: []
          }
        },
      methods:{

        changeList(id)
        {
          if(this.pageInfo.typeId == id){
            return false
          }
          this.allLoaded = false;
          this.page = 1
          this.pageInfo.page = 1 + ''
          this.pageInfo.queryLevel = '2'
          this.pageInfo.typeId = id + ''
          this.goodsList = []
          this.getGoodsListByLevel(this.pageInfo)
        },
        loadBottom(){
          if( this.totalCount - parseInt(this.pageInfo.limit) * this.pageInfo.page > 0){
            this.page++
            this.pageInfo.page = this.page + ''
            this.getGoodsListByLevel(this.pageInfo)

          }else{
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        getGoodsListByLevel(data){
          getGoodsList(data, false).then(response=>{
            this.totalCount = response.result.page.totalCount
            response.result.page.list.map(item=>{
              this.goodsList.push(item)
            })
          }).catch(error=>{})
        }
      },
      mounted() {
        let {Authorization} = this.$route.query
        setLocalStorage("Authorization", Authorization)
        getGoodsList({
              page: this.pageInfo.page,
              limit: this.pageInfo.limit,
              queryLevel: this.pageInfo.queryLevel
        },true).then(response => {
          this.typeList = response.result.typeList
          if(this.typeList.length == 0 || response.result.typeList == undefined){
            this.showError = true
          }
          response.result.page.list.map(item=>{
            this.goodsList.push(item)
          })
          this.pageInfo.typeId = this.typeList[0].id
          this.totalCount = response.result.page.totalCount
        }).catch(error=>{})
      }
    }
</script>

<style scoped>
  .home-container{
    background: #f7f7f7;
  }
  .home-header{
    position: relative;
    height: 146px;
    line-height: 146px;
    text-align: center;
    color: #222;
    font-size: 54px;
    background: #fff;
  }
  .discount{
    position: absolute;
    right: 44px;
    font-size: 42px;
    color: #fe5e48;
  }

  .home-container>img{
    width: 100vw;
    vertical-align: bottom;
  }
  .home-sorts{
    height: 554px;
    background: #fff;
  }
  .sort-list{
    display: flex;
    flex-wrap: wrap;
  }
  .sort-item{
    display: flex;
    width: 33.3333333333%;
    height: 277px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .sort-item>img{
    width: 130px;
    height: 130px;
    border-radius: 70px;
    border: 1px solid #e1e1e1;/*no*/
  }
  .sort-item>span{
    font-size: 36px;
    color: #717580;
    margin-top: 36px;
  }
  .goods-list{
    margin-top: 20px;
    background: #fff;
    padding: 0 44px;
  }
  .goods-list>p{
    padding: 44px 0 36px;
    margin: 0;
    font-size: 42px;
    color: #222;
  }
  .goods-item{
    position: relative;
    height: 270px;
    display: flex;
    align-items: center;
  }
  .goods-item>img{
    height: 180px;
    width: 180px;
    flex-shrink: 0;
  }
  .goods-intro{
    margin-left: 48px;
  }
  .goods-intro>p{
    margin: 0;
    padding: 16px 0;
  }
  .goods-name{
    font-size: 42px;
    color: #717580;
  }
  .goods-price{
    font-size: 42px;
    color: #fe5e48;
  }
  .goods-item:after{
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #e1e1e1;
    content: '';
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
