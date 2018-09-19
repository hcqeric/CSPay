<template>
  <div class="order-container" v-if="orderInfo.pocsTotal">
    <MainHeader title="兑换详情" :showBack="true"></MainHeader>
    <div class="order-msg" >
      <div class="msg-item">
        <span>下单时间</span>
        <span>{{orderInfo.createTime| DateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
      </div>
      <div class="msg-item">
        <span>订单编号</span>
        <span>{{orderInfo.orderNum}}</span>
      </div>
      <div class="msg-item">
        <span>当前积分</span>
        <span>{{orderInfo.pocsTotal| moneyFormat('', 5)}}</span>
      </div>
      <div class="msg-item">
        <span>使用积分</span>
        <span>{{orderInfo.pocsPrice| moneyFormat('', 5)}}</span>
      </div>

    </div>
    <div class="order-goods">
      <div class="order-item-goods">
        <img :src="orderInfo.goodsImg" alt="">
        <span>{{orderInfo.goodsName}}</span>
      </div>
    </div>
    <div class="user-active">
      <p>填写地址</p>
      <div class="user-address">
        <div class="info-item" @click="choiceArea">
          <span><strong>*</strong>收货地址</span>
          <input type="text" placeholder="请选择收货地址" v-model="fullLevelAddress"
                                  readonly="readonly">
          <img src="../assets/img/jiantou.png" alt="">
        </div>
        <div class="info-item">
          <span><strong>*</strong>详细地址</span><input placeholder="例：6号楼108室" type="text" v-model="addressInfo.address">
        </div>
      </div>
      <div class="user-info">
        <div class="info-item">
          <span><strong>*</strong>联系人</span><input placeholder="联系人姓名" type="text" v-model="addressInfo.consignee">
        </div>
        <div class="info-item">
          <span><strong>*</strong>手机号</span><input placeholder="联系人电话" type="text" oninput="if(value.length > 11)value = value.slice(0, 11)" v-model="addressInfo.mobile">
        </div>
      </div>
      <div class="user-pay">
        <button @click="goToPay">确定</button>
      </div>
    </div>

    <mt-popup v-model="popupAddressVisible" position="bottom" class="mint-popup-address">
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" value-key="name"
                 :show-toolbar="true">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
        </div>
      </mt-picker>
    </mt-popup>

    <div v-if="showError">
      <ErrorLoaded></ErrorLoaded>
    </div>
  </div>

</template>

<script>
  import MainHeader from '@/components/view/MainHeader'
  import ErrorLoaded from '@/components/view/ErrorLoaded'
  import threeLevelAddress from '../assets/json/threeLevelAddress.json'
  import {createOrder, orderPay} from "../http/getData";
  import {getLocalStorage} from "../custom/mixin";
  import {Toast} from 'mint-ui'

  export default {
    name: 'OrderDetail',
    components:{
      MainHeader,
      ErrorLoaded
    },
    data() {
      return {
        showError: false,
        Authorization: '',
        popupAddressVisible: false,
        addressPicker:'',
        fullLevelAddress: '',
        addressSlots: [
          {
            flex: 1,
            values: this.getProvinceArr(),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: this.getCityArr("北京市"),
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: this.getCountyArr("北京市", "直辖区"),
            className: 'slot5',
            textAlign: 'center'
          }],
        addressInfo: {
          id: '',
          consignee: '',
          province: '',
          city: '',
          district: '',
          address: '',
          mobile: ''
        },
        orderInfo:{
          pocsTotal: '',
          pocsPrice: '',
          orderNum: '',
          orderId: '',
          createTime: '',
          goodsName: '',
          goodsImg: ''
        }
      }
    },
    methods:{
      goToPay(){
        if (!this.addressInfo.mobile || !this.addressInfo.consignee || !this.addressInfo.province || !this.addressInfo.address) {
          Toast({
            message: '标星项为必填！',
            position: 'middle',
            duration: 1000
          })
          return false
        }
        orderPay({
          Authorization: this.Authorization
        },{
          adsNumber: this.addressInfo.mobile,
          adsName: this.addressInfo.consignee,
          orderId: this.orderInfo.orderId,
          province: this.addressInfo.province,
          city: this.addressInfo.city,
          district: this.addressInfo.district,
          address: this.addressInfo.address
        }).then(response => {
          Toast({
            message: response.result.remarks
          })
          this.$router.replace('/exchange/' + response.result.payStatus)
        })
      },
      //遍历json，返回省级对象数组
      getProvinceArr() {
        let provinceArr = [];
        threeLevelAddress.forEach(function (item) {
          let obj = {};
          obj.name = item.name;
          obj.areaCode = item.areaCode;
          provinceArr.push(obj);
        });
        return provinceArr;
      },
      getCurrProvince(provinceCode) {
        let arr = threeLevelAddress.filter(item => item.areaCode === provinceCode)
        console.log(arr)
        let obj = {};
        obj.name = arr[0].name;
        obj.areaCode = arr[0].areaCode;
        return obj
      },
      //遍历json，返回市级对象数组
      getCityArr(province) {
        // console.log("省：" + province);
        let cityArr = [];
        threeLevelAddress.forEach(function (item) {
          if (item.name == province) {
            item.children.forEach(function (args) {
              let obj = {};
              obj.name = args.name;
              obj.areaCode = args.areaCode;
              cityArr.push(obj);
            });
          }
        });
        return cityArr;
      },
      getCurrCity(provinceCode, cityCode) {
        let arr = threeLevelAddress.filter(
          item => item.areaCode == provinceCode
        )[0].children.filter(
          item => item.areaCode == cityCode
        )
        let obj = {};
        obj.name = arr[0].name;
        obj.areaCode = arr[0].areaCode;
        console.log(obj)
        return obj
      },
      //遍历json，返回县级对象数组
      getCountyArr(province, city) {
        let countyArr = [];
        threeLevelAddress.forEach(function (item) {
          if (item.name == province) {
            item.children.forEach(function (args) {
              if (args.name == city) {
                args.children.forEach(function (param) {
                  let obj = {};
                  obj.name = param.name;
                  obj.areaCode = param.areaCode;
                  countyArr.push(obj);
                })
              }
            });
          }
        });
        return countyArr;
      },
      getCurrCounty(provinceCode, cityCode, countyCode){
        let arr = threeLevelAddress.filter(
          item => item.areaCode == provinceCode
        )[0].children.filter(
          item => item.areaCode == cityCode
        )[0].children.filter(
          item => item.areaCode == countyCode
        )
        let obj = {};
        obj.name = arr[0].name;
        obj.areaCode = arr[0].areaCode;

        return obj
      },
      choiceArea() {
        this.popupAddressVisible = true

        if (this.addressInfo.province != '' && this.addressInfo.city != '' && this.addressInfo.district != '') {
          let proItem = this.getCurrProvince(this.addressInfo.province)
          let cityItem = this.getCurrCity(this.addressInfo.province, this.addressInfo.city)
          let countyItem = this.getCurrCounty(this.addressInfo.province, this.addressInfo.city, this.addressInfo.district)

          this.addressPicker.setSlotValues(0, this.getProvinceArr())
          this.addressPicker.setSlotValues(1, this.getCityArr(proItem["name"]));
          this.addressPicker.setSlotValues(2, this.getCountyArr(proItem["name"], cityItem["name"]));
        }
      },
      cancleaddress: function () {
        this.popupAddressVisible = false
      },
      selectaddress() {
        this.addressPicker.getSlotValues(1).forEach(item => {
          if (item.name == this.addressPicker.getSlotValue(1).name && item.areaCode != this.addressPicker.getSlotValue(1).areaCode) {
            this.addressPicker.setSlotValue(1, item)
          }
        })
        this.addressPicker.getSlotValues(2).forEach(item => {
          if (item.name == this.addressPicker.getSlotValue(2).name && item.areaCode != this.addressPicker.getSlotValue(2).areaCode) {
            this.addressPicker.setSlotValue(2, item)
          }
        })

        this.addressInfo.province = this.addressPicker.getSlotValue(0)["name"]
        this.addressInfo.city = this.addressPicker.getSlotValue(1)["name"]
        this.addressInfo.district = this.addressPicker.getSlotValue(2)["name"]

        this.fullLevelAddress = this.addressPicker.getSlotValue(0)["name"] + this.addressPicker.getSlotValue(1)["name"] + this.addressPicker.getSlotValue(2)["name"];

        this.popupAddressVisible = false
      },
      onAddressChange(picker, values){
        this.addressPicker = picker
        //给市、县赋值
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
        picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));

      }
    },
    mounted(){
      let {id} = this.$route.params
      let auth = getLocalStorage("Authorization")
      this.Authorization = auth
      // this.Authorization = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk3MjM3NjMyMiIsImV4cCI6MTUzNzg1NjE3MCwidXNlcklkIjoxMDQwNTE4OTg4OTkzNDMzNjAxLCJjcmVhdGVkIjoxNTM3MjUxMzcwMTc5fQ.d9iGG8a2FiNm3wLnXFsVlO_aUbYyMDSaxcUV3WHbOtaSemInQZfrRk5YOpRA9G78-Lfo9cncbCKTv-8gy4bqzw"
      createOrder({
        Authorization: this.Authorization
      },{
        goodsId: id
      }).then(response=>{
        this.orderInfo.pocsTotal = response.result.pocsTotal
        this.orderInfo.pocsPrice = response.result.goods.pocsPrice
        this.orderInfo.goodsName = response.result.goods.name
        this.orderInfo.goodsImg = response.result.goods.goodsImg
        this.orderInfo.orderNum = response.result.order.orderNum
        this.orderInfo.orderId = response.result.order.id
        this.orderInfo.createTime = response.result.order.createTime
      }).catch(error => {
        this.showError = true
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-container{
  min-height: 100vh;
  background: #f7f7f7;
}

  .order-msg{
    margin-top:20px;
    background: #fff;
    padding: 0 44px;
  }
  .msg-item{
    display: flex;
    height: 110px;
    align-items: center;
    justify-content: space-between;
  }
  .msg-item>span{
    font-size: 42px;
  }
  .msg-item>span:first-child{
    color: #a4a9ad;
  }
  .msg-item>span:last-child{
    color: #717580;
  }
  .msg-item:last-of-type>span:last-child{
    color: #fe5e48;
  }

  .order-goods{
    margin-top: 20px;
    background: #fff;
    padding: 0 44px;
  }
  .order-item-goods{
    height: 190px;
    display: flex;
    align-items: center;
  }
  .order-item-goods>img{
    width: 150px;
    height: 150px;
  }
.order-item-goods>span{
  margin-left: 60px;
  font-size: 42px;
  color: #717580;
}
  .user-active{

  }
  .user-active>p{
    font-size: 42px;
    color: #717580;
    padding: 0 44px;
  }
  .user-address{
    background: #fff;
    padding: 0 44px;
  }

.info-item {
  height: 130px;
  line-height: 130px;
  border-bottom: 1px solid rgba(239, 239, 239, 0.9);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.info-item>span {
  display: inline-block;
  font-size: 42px;
  width: 240px;
  color: #717580;
}
.info-item>span>strong {
  font-size: 36px;
  margin-right: 8px;
  vertical-align: center;
  color: red;
}

.info-item>input {
  border: none;
  outline-color: transparent;
  height: 40px;
  line-height: 40px;
  font-size: 36px;
  flex: 1;
}
.info-item>img{
  height: 46px;
}
.user-info{
  margin-top: 20px;
  background: #fff;
  padding: 0 44px;
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
.mint-popup-address{
  width: 100%;
}


</style>
