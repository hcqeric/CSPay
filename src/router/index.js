import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GoodsDetail from '@/components/GoodsDetail'
import OrderDetail from '@/components/OrderDetail'
import ExchangeSuccess from '@/components/ExchangeSuccess'
import DiscountCard from '@/components/DiscountCard'
import NotFound from '@/components/view/ErrorLoaded'
import UseCoupon from '@/components/UseCoupon'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  // base: '/h5',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'goodsdetail',
      component: GoodsDetail
    },
    {
      path: '/exchange/:status',
      name: 'exchangesucc',
      component: ExchangeSuccess
    },
    {
      path: '/order/:id',
      name: 'orderdetail',
      component: OrderDetail
    },
    {
      path: '/discount',
      name: 'discount',
      component: DiscountCard
    },
    {
      path: '/coupon/:orderNum/:userId',
      name: 'coupon',
      component: UseCoupon
    },
    {
      path: '/404',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
