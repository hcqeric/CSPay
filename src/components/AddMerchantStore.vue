<template>
  <div class="store-add-container">
    <MainHeader title="添加门店" :showBack="true" ></MainHeader>
    <div class="store-add-content">
      <div class="store-add-info">
        <div class="store-add-header"></div>
        <div class="store-add-msg">
          <div class="store-add-msg-item">
            <span><i>*</i>门&nbsp;&nbsp;店&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;：</span>
            <input placeholder="请输入门店名称" v-model="shopName"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>联&nbsp;&nbsp;系&nbsp;&nbsp;电&nbsp;&nbsp;话&nbsp;：</span>
            <input placeholder="请输入联系电话" v-model="telephone"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>门&nbsp;&nbsp;店&nbsp;&nbsp;地&nbsp;&nbsp;址&nbsp;：</span>
            <input placeholder="请输入门店地址" v-model="fullAddress" readonly="readonly" @click="openAddressPicker"/>

          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>详&nbsp;&nbsp;细&nbsp;&nbsp;地&nbsp;&nbsp;址&nbsp;：</span>
            <input placeholder="请输入详细地址" v-model="address"/>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>营业开始时间：</span>
            <input placeholder="请选择营业开始时间" v-model="shopStartTime" readonly="readonly" @click="open('picker3')"/>
            <mt-datetime-picker
              ref="picker3"
              type="time"
              v-model="startTime"
              @confirm="handleChange">
            </mt-datetime-picker>
          </div>
          <div class="store-add-msg-item">
            <span><i>*</i>营业结束时间：</span>
            <input placeholder="请选择营业结束时间" v-model="shopEndTime" readonly="readonly"  @click="open('picker4')"/>
            <mt-datetime-picker
              ref="picker4"
              type="time"
              v-model="endTime"
              @confirm="handleChange">
            </mt-datetime-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="user-pay">
      <button @click="saveStore">保存门店</button>
    </div>
    <div class="address-mask" v-if="showAddressSel"></div>
    <div class="address-sel" v-if="showAddressSel">
      <!--<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>-->
      <section class="address">
        <section class="title">
          <h4>门店地址</h4>
          <!--<span @click="closeAdd()">×</span>-->
        </section>
        <section class="level">
          <div class="area" @click="provinceSelected()"  :class="showProvince?'active':''">{{shopProvince ? shopProvince.name : "请选择"}}</div>
          <div class="area" @click="citySelected()" :class="showCity?'active':''"  v-show="shopProvince">{{shopCity ? shopCity.name : '请选择' }}</div>
          <div class="area" @click="districtSelected()" :class="showDistrict?'active':''" v-show="shopCity">{{shopDistrict?shopDistrict.name:'请选择'}}</div>
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in addressProInfo" :key='k' @click="getProvinceId(v)" v-if="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in addressCityInfo" :key='k' @click="getCityId(v)" v-if="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in addressDisInfo" :key='k' @click="getDistrictId(v)" v-if="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </div>
    <!--<div class="store-add-upload">-->
      <!--<div class="store-upload-info">-->
        <!--&lt;!&ndash;<p>营业执照：</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="store-info-upload">&ndash;&gt;-->
          <!--&lt;!&ndash;<input class="inp_fil" type="file">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>门店照片：</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="store-info-upload">&ndash;&gt;-->
          <!--&lt;!&ndash;<input class="inp_fil" type="file" >&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->

      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import { createShop, getAddressPicker } from "../http/getData";
  import { Toast } from 'mint-ui'
  import MainHeader from '@/components/view/MainHeader'
  import VDistpicker from 'v-distpicker'
    export default {
        name: "AddMerchantStore",
      data(){
          return {
            shopName:'',
            telephone: '',
            fullAddress: '',
            shopProvince: '',
            shopCity: '',
            shopDistrict: '',
            address:'',
            shopStartTime: '',
            shopEndTime: '',
            startTime: null,
            endTime: null,
            showAddressSel: false,
            addressProInfo:[],
            addressCityInfo:[],
            addressDisInfo:[],
            showProvince: true,
            showCity: false,
            showDistrict: false
          }
      },
      components: {
        MainHeader,
        VDistpicker
      },
      methods:{
        openAddressPicker(){
          if(this.addressProInfo.length == 0) {
            this.addressProInfo = []
            getAddressPicker({
              code: 0
            }).then(response => {
              response.data.map(item => {
                this.$set(item, "selected", false)
                this.addressProInfo.push(item)
              })
            })
          }
          this.showAddressSel = true
          this.showProvince = true
          this.showCity = false
          this.showDistrict = false
        },
        provinceSelected(){
          if(!this.addressProInfo){
            getAddressPicker({
              code: 0
            }).then(response=>{
              this.addressProInfo = response.data
            })
          }
          this.showProvince = true
          this.showCity = false
          this.showDistrict = false
        },
        citySelected(){
          if(!this.addressCityInfo){
            getAddressPicker({
              code: this.shopProvince.code
            }).then(response=>{
              this.addressCityInfo = response.data
              console.log("City")
            })
          }
          this.showProvince = false
          this.showCity = true
          this.showDistrict = false
        },
        districtSelected(){
          if (!this.addressDisInfo){
            getAddressPicker({
              code: this.shopCity.code
            }).then(response=>{
              this.addressDisInfo = response.data
            })
          }
          this.showProvince = false
          this.showCity = false
          this.showDistrict = true
        },
        getProvinceId(v){
          this.addressCityInfo = []
          getAddressPicker({
            code: v.code
          }).then(response=>{
            response.data.map(item=>{
               this.$set(item, "selected", false)
               this.addressCityInfo.push(item)
            })
            this.showProvince = false
            this.showCity = true
            this.showDistrict = false
            this.shopProvince = v
            this.addressProInfo.map((item,index)=>{
              if (item.code == v.code){
                this.addressProInfo[index].selected = true
              } else{
                this.addressProInfo[index].selected = false
              }
            })
          })
        },
        getCityId(v){
          this.addressDisInfo = []
          getAddressPicker({
            code: v.code
          }).then(response=>{
            response.data.map(item=>{
              this.$set(item, "selected", false)
              this.addressDisInfo.push(item)
            })
            this.showProvince = false
            this.showCity = false
            this.showDistrict = true
            this.shopCity = v
            this.addressCityInfo.map((item,index)=>{
              if (item.code == v.code){
                this.addressCityInfo[index].selected = true
              } else{
                this.addressCityInfo[index].selected = false
              }
            })
          })
        },
        getDistrictId(v){
            this.showProvince = false
            this.showCity = false
            this.showDistrict = true
            this.shopDistrict = v
          this.addressDisInfo.map((item,index)=>{
            if (item.code == v.code){
              this.addressDisInfo[index].selected = true
            } else{
              this.addressDisInfo[index].selected = false
            }
          })
            this.fullAddress = `${this.shopProvince.name}${this.shopCity.name}${this.shopDistrict.name}`
            this.showAddressSel = false
        },
        onSelected(data) {
          alert(data.province + ' | ' + data.city + ' | ' + data.area)
          console.log(data)
        },
        saveStore(){
          createShop({
            shopName: this.shopName,
            telephone: this.telephone,
            shopProvince: this.shopProvince.name,
            shopCity: this.shopCity.name,
            shopDistrict: this.shopDistrict.name,
            address: this.address,
            shopStartTime: this.shopStartTime,
            shopEndTime: this.shopEndTime
          }).then(response=>{
            Toast({
              message: '门店添加成功',
              duration: 1500
            })
            this.$router.back()
          })
        },
        open(picker) {
          this.$refs[picker].open();
        },
        handleChange() {
          this.shopStartTime = this.startTime
          this.shopEndTime = this.endTime
        },
      }
    }
</script>

<style scoped>
  .store-add-container{
    min-height: 100vh;
    width: 100vw;
    background: #f7f7f7;
  }
  .store-add-content{
    margin-top: 20px;
    background: #fff;
  }
  .store-add-header{
    background: #f57b7e url(../assets/img/bg3.png) no-repeat left bottom;
    background-size: 100% 10px;
    height: 54px;
  }
  .store-add-msg{
    padding: 0 58px 48px;
  }
  .store-add-msg-item{
    display: flex;
    align-items: center;
    height: 134px;
  }
  .store-add-msg-item>span{
    position: relative;
    font-size: 48px;
    width: 338px;
  }
  .store-add-msg-item>span>i{
    display: block;
    position: absolute;
    left: -36px;
    top: 10px;
    color: #f57b7e;
    font-style: normal;
  }

  .store-add-msg-item>input{
    border: none;
    outline: none;
    margin: 4px;
    flex: 1;
    font-size: 42px;
    color: #000;
  }

  .store-add-upload{
    margin-top: 20px;
    background: #fff;
  }
  .store-upload-info{
    padding: 48px;
  }
  .store-upload-info>p:first-child{
    margin-top: 0;
  }
  .store-upload-info>p{
    font-size: 48px;
    color: #222;
  }
  .store-info-upload{
    height: 540px;
    background: #f0f0f0 url(../assets/img/pic2.png) no-repeat center center;
    background-size: auto 360px;
    position: relative;
  }
  .store-info-upload:first-of-type{
    background: #f0f0f0 url(../assets/img/pic1.png) no-repeat center center;
    background-size: auto 360px;
  }
  .store-info-upload>input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 540px;
    opacity: 0;
  }
  .user-pay{
    margin-top: 130px;
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

  .address-mask{
    background: #000000;
    opacity: 0.5;
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2000;
  }
  .address-sel{
    position: fixed;
    top: 50vh;
    left: 0;
    width: 100vw;
    height: 50vh;
    background: #fff;
    opacity: 1;
    z-index: 2001;
  }
  .address{
    display: flex;
    flex-direction: column;
  }

  .address>.title{
    height: 6vh;
  }
  .address>.title>h4{
    font-size: 48px;
    text-align: center;
    margin: 0;
    padding: 30px;
  }
  .address>.level{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eee;/*no*/
    height: 5vh;
  }
  .address>.level>.area{
    flex: 1;
    text-align: center;
    font-size: 46px;
    padding: 20px 0;
    color: #222;
  }
  .address>.level>.area.active{
    position: relative;
    color: red;
  }
  .address>.level>.area.active:after{
    position: absolute;
    bottom: 0;
    height: 4px;
    content: '';
    width: 100%;
    left: 0;
    background: red;
  }
  .address>ul{
    list-style: none;
    margin: 0;
    padding: 0;
    height: 39vh;
    overflow-y: scroll;
  }
  .addList{
    height: 80px;
    line-height: 80px;
    font-size: 42px;
    padding-left: 30px;
    color: #222;
  }
  .addList.active{
    color: red;
  }
</style>
