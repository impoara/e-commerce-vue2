//当前这个模块:API进行统一管理
import requests from './ajax.js';
import mockRequests from './mockAjax.js'
//三级联动的接口
// /product/getBaseCategoryList  get  无参数

//分别暴露 //发请求:axios发送请求返回结果Promise对象
export const reqCategoryList = () => {
	return requests({
		url: '/product/getBaseCategoryList',
		method: 'get'
	})
};

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floora数据(Home首页接口)
export const reqGetFloorList = () => mockRequests.get('/floor');

//获取search模块数据 地址:/api/list	请求方式:post	参数:需要传参
/*	例如: 
 {
   "category3Id": "61",
   "categoryName": "手机",
   "keyword": "小米",
   "order": "1:desc",
   "pageNo": 1,
   "pageSize": 10,
   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
   "trademark": "4:小米"
 }
 */
//当前这个接口,给服务器传递参数params,至少是一个空对象(否则失败).
export const reqGetSearchList = (params) => requests({
	url:'/list',
	method:'post',
	data:params
})

//获取产品详情信息的接口 URL:/api/item/{ skuId } 请求方式:Get 参数: skuId(string类型)
export const reqGetGoodsInfo = (skuId) => requests({
	url:`/item/${skuId}`,
	method:'get',
})

//将产品添加到购物车中(获取更新某一个产品的个数||更改已经假如购物车商品的数量)
///api/cart/addToCart/{ skuId }/{ skuNum } 请求方式:Post
export const reqAddOrderUpdata = (skuId,skuNum) => {
	return requests({
		url:`/cart/addToCart/${skuId}/${skuNum}`,
		method:'post',
	})
}

//获取购物车列表
///api/cart/cartList 请求方式:Get
export const reqGetCartList = () => requests({
	url:'/cart/cartList',
	method:'get',
})

//删除购物车中的商品
///api/cart/deleteCart/{skuId} 请求方式:DELETE
export const reqDeleteCartById = (skuId) => requests({
	url:`/cart/deleteCart/${skuId}`,
	method:'delete'
})

//修改购物车中商品的选中状态
///api/cart/checkCart/{skuId}/{isChecked} 请求方式:Get
export const reqUpdateCheckedById = (skuId,isChecked) => requests({
	url:`/cart/checkCart/${skuId}/${isChecked}`,
	method:'get'
})

//获取验证码/api/user/passport/sendCode/{phone} 请求方式:Get
export const reqGetCode = (phone) => requests({
	url:`/user/passport/sendCode/${phone}`,
	method:'get'
})

//用户注册,提交用户信息
///api/user/passport/register 请求方式: Post 参数:phone, password, code, nickName
export const reqUserRegister = (data) => requests({
	url:`/user/passport/register`,
	data,
	method:'post'
})

//用户登录
///api/user/passport/login 请求方式: Post 参数 phone, password
export const reqUserLogin = (data) => requests({
	url:'/user/passport/login',
	data,
	method:'post'
})

//自动登录(获取用户信息)
///api/user/passport/auth/getUserInfo 请求方式: Get
export const reqGetUserInfo = () => requests({
	url:'/user/passport/auth/getUserInfo',
	method:'get'
})

//获取用户地址信息
///api/user/userAddress/auth/findUserAddressList 请求方式: Get
export const reqUserAddressInfo = () => requests({
	url:'/user/userAddress/auth/findUserAddressList',
	method:'get'
})

//退出登录
///api/user/passport/logout 请求方式: Get
export const reqUserLogout = () => requests({
	url:'/user/passport/logout',
	method:'get'
})

//获取商品清单
///api/order/auth/trade 请求方式: Get
export const reqOrderInfo = () => requests({
	url:'/order/auth/trade',
	method:'get'
})

//提交订单的接口
///api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式: Post
export const reqSubmitOrder = (tradeNo,data) => requests({
	url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
	data,
	method:'post'
})

//获取订单支付信息
///api/payment/weixin/createNative/{orderId} 请求方式：Get
export const reqPayInfo = (orderId) => requests({
	url:`/payment/weixin/createNative/${orderId}`,
	method:'get'
})

//获取订单支付情况
///api/payment/weixin/queryPayStatus/{orderId} 请求方式: Get
export const reqPayStatus = (orderId) => requests({
	url:`/payment/weixin/queryPayStatus/${orderId}`,
	method:'get'
})

//获取个人中心数据(订单列表)
///api/order/auth/{page}/{limit} 请求方式: Get {page:第几页,limit:一页多少条信息}
export const reqMyOrderList = (page,limit) => requests({
	url:`/order/auth/${page}/${limit}`,
	method:'get'
})