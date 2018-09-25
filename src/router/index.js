import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const GoodsDetail = () => import('@/components/GoodsDetail')
const OrderDetail = () => import('@/components/OrderDetail')
const ExchangeSuccess = () => import('@/components/ExchangeSuccess')
const DiscountCard = () => import('@/components/DiscountCard')
const NotFound = () => import('@/components/view/ErrorLoaded')
const UseCoupon = () => import('@/components/UseCoupon')
const MerchantStore = () => import('@/components/MerchantStore')
const SetManager = () => import('@/components/SetManager')
const AddMerchantStore = () => import('@/components/AddMerchantStore')
const CashierManager = () => import('@/components/CashierManager')
const CashierMgrMerchant = () => import('@/components/CashierMgrMerchant')
const AddCashier = () => import('@/components/AddCashier')

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
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: MerchantStore
    },
    {
      path: '/setmanager',
      name: 'setmanager',
      component: SetManager
    },
    {
      path: '/addstore',
      name: 'addstore',
      component: AddMerchantStore
    },
    {
      path: '/cashiermgr',
      name: 'cashiermgr',
      component: CashierManager
    },
    {
      path: '/cashiermrch',
      name: 'cashiermrch',
      component: CashierMgrMerchant
    },
    {
      path: '/addcashier',
      name: 'addcashier',
      component: AddCashier
    }

  ]
})

export default router
