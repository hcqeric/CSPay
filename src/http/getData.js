import Request from '@/http/axios';
import url from '@/http/url.js'

//  示例  {api  访问路径   methods 访问方式 param 传递参数 data 提交数据}
// export const example = (params) => new Request().require({api: '/api/member/Login',param:params,data:datas});

export const getGoodsList = (datas, isShowLoading) => new Request().require({api: url.goodsList,data:datas, loadingVisble: isShowLoading}); //获取商品列表

export const getGoodsDetail = (id) => new Request().require({api: url.goodsDetail + id, methods: 'GET', loadingVisble: true}); //获取商品详情

export const createOrder = (params, datas) => new Request().require({api: url.createOrder, param:params, data:datas, loadingVisble: true}); //获取订单详情

export const orderPay = (params, datas) => new Request().require({api: url.orderPay, param:params, data:datas, loadingVisble: true, loadingText: '正在支付...'}); //订单支付

export const getDiscountList = (params, datas, isShowLoading) => new Request().require({api: url.discountList, param:params, data:datas, loadingVisble: isShowLoading}); //获取优惠券列表

export const useCoupon = (userId, orderNum, params) => new Request().require({api: url.useCoupon + userId + '/' + orderNum, param: params, methods: 'GET'}); //使用优惠券

export const getUserInfo = (userId) => new Request().require({api: url.userInfo + userId, methods: 'GET'}); //获取用户信息

export const getList = ( params,datas) => new Request().require({api: url.list, param : params, data: datas}); //获取兑换记录列表

// 增加支持多站点接口，通过构造函数传入非主站点接口的baseUrl
export const getExchangeDetail = () => new Request("https://www.baidu.com").require({api: "/app/order/info/109"}); //获取兑换详情

// 增加支持动态路由，通过restParam传入动态数据，json格式
// export const testUseCoupon = (restParam, params) => new Request().require({api: url.testUseCoupon,restParam: restParam, param: params, methods: 'GET'}); //使用优惠券

export const getShopList = (params) => new Request('').require({api: url.merchantList, param: params,  methods: 'GET'}); //商家服务-门店列表

export const createShop = (datas) => new Request('').require({api: url.createShop, data: datas}); //商家服务-门店创建

export const getClerkList = (restParam, params) => new Request('').require({api: url.clerkList, restParam: restParam, param: params,  methods: 'GET'}); //商家服务-店员列表

export const createClerk = (datas) => new Request('').require({api: url.createClerk, data: datas}); //商家服务-店员创建

export const getAddressPicker = (restParam) => new Request('').require({api: url.addressPicker, restParam: restParam, methods: 'GET'}); //省市区地址选择





