<template>
  <div class="coupon-container">
    <MainHeader title="使用优惠券"></MainHeader>
  </div>
</template>

<script>
  import {useCoupon,getUserInfo} from "../http/getData";
  import MainHeader from '@/components/view/MainHeader'
  import {MessageBox, Toast} from 'mint-ui'
  import {getLocalStorage} from "../custom/mixin";

  export default {
    name: "UseCoupon",
    components: {
      MainHeader
    },
    data() {
      return {
        orderNum: '',
        userId: '',
        Authorization: ''
      }
    },
    mounted() {
      let {orderNum, userId} = this.$route.params
      this.orderNum = orderNum
      this.userId = userId

      let auth = getLocalStorage("Authorization")
      this.Authorization = auth

      getUserInfo(userId).then(response => {
        console.log(response)
      })

      MessageBox({
        title: '使用优惠券',
        message: '亲，确定要使用该优惠券吗?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          useCoupon(this.id, {
            Authorization: this.Authorization
          }).then(response => {
            Toast({
              message: '完成使用',
              position: 'middle',
              duration: 1500
            })
          })
        } else {
          console.log("quxiaole")
        }
      })
    }
  }
</script>

<style scoped>

</style>
