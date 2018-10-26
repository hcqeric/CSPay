<template>
    <div class="dis-container">
      <MainHeader title="优惠券" :showBack="true"></MainHeader>
      <div class="dis-content">
        <div class="dis-tabs">
          <div class="dis-tab-item" :class="current == 0 ? 'current' : ''" @click="changeTab(0)">
            <span>全部</span>
          </div>
          <div class="dis-tab-item" :class="current == 1 ? 'current' : ''" @click="changeTab(1)">
            <span>未使用</span>
          </div>
          <div class="dis-tab-item" :class="current == 2 ? 'current' : ''" @click="changeTab(2)">
            <span>已使用</span>
          </div>
        </div>
        <div class="dis-card-list">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                       @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
          <div class="dis-card-item" v-for="item in discountCardList" :key="item.id">
            <div class="dis-card-info">
              <img :src="item.goodsImg" alt="">
              <div class="dis-card-info-name">
                <span>{{item.goodsName}}</span>
                <button @click="genQRCode(item)" :class="item.goodsStatus == 1 ? 'unable' : ''">去使用</button>
              </div>
            </div>
            <div class="qrcode-info" v-show="item.showQRCode == 1">
              <div :id="'qrcode' + item.id"></div>
              <p><span class="arrow-up" @click="item.showQRCode = 0"></span>请扫描上方二维码进行使用</p>
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
        </div>
        <div v-if="totalCount == 0" class="page-err">
          <span v-if="pageInfo.status == ''">o(╥﹏╥)o 你目前还没有优惠券!!!</span>
          <span v-else-if="pageInfo.status == '0'">o(╥﹏╥)o 你目前还没有未使用的!!!</span>
          <span v-else>o(╥﹏╥)o 你目前还没有使用过的优惠券!!!</span>
        </div>
        <div v-if="allLoaded" class="page-err">
          <span>o(╥﹏╥)o所有优惠券都在这里了!!!</span>
        </div>
      </div>
    </div>
</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
  import {getLocalStorage} from "../custom/mixin";
  import {getDiscountList} from "../http/getData";
  import QRCode from 'qrcodejs2'

  export default {
      name: "DiscountCard",
      data(){
          return {
            showError: false,
            allLoaded: false,
            autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
            bottomStatus: '',
            bottomPullText: '上拉加载更多...',
            bottomDropText: '释放更新...',
            totalCount: 0,
            Authorization: '',
            current: 0,
            hasGenCode: false,
            showQRCode: false,
            page: 1,
            pageInfo:{
              page: '1',
              limit: '15',
              status: ''
            },
            discountCardList:[]
          }
      },
        components:{
          MainHeader
        },
      methods:{
        loadBottom(){
          if( this.totalCount - parseInt(this.pageInfo.limit) * this.pageInfo.page > 0){
            this.page++
            this.pageInfo.page = this.page + ''
            this.getListData(this.pageInfo)
          }else{
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        genQRCode(item){
          if(item.goodsStatus == 1){
            return false
          }
          if (item.hasGenCode == 0){
            new QRCode('qrcode'+ item.id , {
              width:150,
              height: 150,
              text: item.url
            })
            this.$set(item, "hasGenCode", 1)
          }
          this.$set(item, "showQRCode", 1)
        },
        changeTab(current){
          if(current == this.current){
            return false
          }
          this.current = current
          this.discountCardList = []
          this.page = 1
          this.pageInfo.page = this.page + ''
          this.allLoaded = false
          this.showError = false

          if(current == 0){
            this.pageInfo.status = ''
          }else if(current == 1){
            this.pageInfo.status = '0'
          }else if(current == 2){
            this.pageInfo.status = '1'
          }
          this.getListData(this.pageInfo, false)
        },
        getListData(pageInfo, isShowLoading){
          getDiscountList({
            Authorization: this.Authorization
          },this.pageInfo, isShowLoading).then(response=>{
            this.totalCount = response.data.totalCount
            response.data.list.map(item=>{
              this.$set(item, 'showQRCode', 0)
              this.$set(item, 'hasGenCode', 0)
              this.discountCardList.push(item)
            })
          }).catch(error => {})
        }
      },
    mounted(){
          let auth = getLocalStorage("Authorization")
          this.Authorization = auth
          // this.Authorization = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk3MjM3NjMyMiIsImV4cCI6MTUzNzg1NjE3MCwidXNlcklkIjoxMDQwNTE4OTg4OTkzNDMzNjAxLCJjcmVhdGVkIjoxNTM3MjUxMzcwMTc5fQ.d9iGG8a2FiNm3wLnXFsVlO_aUbYyMDSaxcUV3WHbOtaSemInQZfrRk5YOpRA9G78-Lfo9cncbCKTv-8gy4bqzw'
          this.getListData(this.pageInfo, true)
    }
    }
</script>

<style scoped>
.dis-container{
  min-height: 100vh;
  width: 100vw;
  background: #f7f7f7;
}
  .dis-content{
    margin-top: 20px;
    background: #fff;
  }
  .dis-tabs{
    display: flex;
    align-items: center;
    height: 150px;
    position: relative;
  }
  .dis-tabs:after{
    content: '';
    position: absolute;
    height: 1px;/*no*/
    background: #e1e1e1;
    width: 100vw;
    left: 0;
    bottom: 0;
  }
  .dis-tab-item{
    flex: 1;
    text-align: center;
  }

  .dis-tab-item > span {
    position: relative;
    font-size: 48px;
    color: #222;
  }
.dis-tab-item.current > span{
  color: #fe5e48;
}
  .dis-tab-item.current > span:after{
    content: '';
    position: absolute;
    height: 10px;
    background: #fe5e48;
    width: 100%;
    left: 0;
    bottom: -18px;
  }

  .dis-card-list{
    width: 100vw;
  }
  .dis-card-item{
    display: flex;
    flex-direction: column;
    padding:0 36px;
    border-bottom: 1px solid #e1e1e1;/*no*/
  }
  .dis-card-info{
    position: relative;
    height: 230px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dis-card-info>img{
    height: 180px;
    width: 180px;
    flex-shrink: 0;
  }
  .dis-card-info-name{
    display: flex;
    flex-direction: column;
    margin-left: 60px;
  }
  .dis-card-info-name>span{
    font-size: 48px;
    color: #717580;
  }
  .dis-card-info-name>button{
    width: 180px;
    border: 1px solid #fe5e48;/*no*/
    border-radius: 30px;
    height: 60px;
    line-height: 58px;
    background-color: transparent;
    background-image: url("../assets/img/bg-white.png");
    font-size: 30px;
    color: #fe5e48;
    outline: none;
    text-align: center;
    margin-top: 20px;
  }
  .dis-card-info-name>button.unable{
    border: 1px solid #e1e1e1;/*no*/
    color: #e1e1e1;
  }
  .qrcode-info{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .qrcode-info>p{
    /*display: block;*/
    display: inline-block;
    height: 100px;
    width: 660px;
    text-align: center;
    line-height: 100px;
    background: #f8f8f9;
    font-size: 42px;
    color: #717580;
  }
  .qrcode-info>div>img{
    width: 500px;
    height: 500px;
  }
  .arrow-up{
    position: relative;
    margin-right: 60px;
  }
  .arrow-up:after{
    border: 2px solid #c8c8cd;/*no*/
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 65%;
    left: 0;
    position: absolute;
    width: 30px;
    height: 30px;
    transform: translateY(-50%) rotate(-45deg);
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
