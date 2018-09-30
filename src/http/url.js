// 开发地址
//  const url = 'http://api.cnzha.com/';

//线上地址
const url = 'http://120.79.16.221:9091/';

//鑫哥本地IP
// const url = 'http://192.168.0.136:8080';

//嘉龙本地IP
 const serviceUrl = 'http://192.168.0.99:8081';

//增加支持动态路由形式
// testUseCoupon: '/app/order/useCoupon/:userId/:orderNum'
export default {
  baseUrl: url,
  serviceUrl: serviceUrl,
  goodsList: '/app/goods/list',
  goodsDetail: '/app/goods/info/',
  createOrder: '/app/order/create',
  orderPay: '/app/order/pay',
  discountList: '/app/order/detalList',
  useCoupon: '/app/order/useCoupon/',
  userInfo: '/app/user/info/',
  list:'/app/order/list',
  merchantList: '/api/v1/shop/list',
  createShop: '/api/v1/shop/create',
  clerkList: '/api/v1/clerk/list/:shopId',
  createClerk: '/api/v1/clerk/create',
  addressPicker: '/api/v1/area/children/:code'
}
