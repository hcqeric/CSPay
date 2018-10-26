// 开发地址
//  const url = 'http://api.cnzha.com/';

//线上地址
// const url = 'http://120.79.16.221:9091/';
const url = 'http://192.168.0.99:8081/api/v1/';

//鑫哥本地IP
// const url = 'http://192.168.0.136:8080';

//增加支持动态路由形式
// testUseCoupon: '/api/v1/app/order/useCoupon/:userId/:orderNum'
export default {
  baseUrl: url,
  goodsList: '/api/v1/app/goods/list',
  goodsDetail: '/api/v1/app/goods/info/',
  createOrder: '/api/v1/app/order/create',
  orderPay: '/api/v1/app/order/pay',
  discountList: '/api/v1/app/order/detailList',
  useCoupon: '/api/v1/app/order/useCoupon/',
  userInfo: '/api/v1/app/user/info/',
  list:'/api/v1/app/order/list',
  merchantList: '/api/v1/shop/list',
  createShop: '/api/v1/shop/create',
  clerkList: '/api/v1/clerk/list/:shopId',
  createClerk: '/api/v1/clerk/create',
  addressPicker: '/api/v1/area/children/:code'
}
