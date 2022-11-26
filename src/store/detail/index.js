import {reqGetGoodsInfo, reqAddOrderUpdata} from "@/api"
//封装游客身份的临时模块-->生成一个随机的唯一字符串
import {getUUID} from '@/utils/uuid_token.js'
const state = {
	goodInfo:{},
	//游客临时身份
	uuid_token:getUUID(),
}

const actions = {
	//获取产品信息
	async getGoodInfo({commit},skuId){
		let result = await reqGetGoodsInfo(skuId)
		if(result.code == 200){
			commit('GETGOODINFO',result.data)
		}
	},
	//添加产品到购物车中
	async addOrdShopCart({commit},{skuId,skuNum}){
		let result = await reqAddOrderUpdata(skuId,skuNum)
		//使用async当前这个函数执行返回Promise
		if(result.code == 200){
			//成功
			return 'success';
		}else{
			//失败
			return Promise.reject(new Error('fail'))
		}
	}
}

const mutations = {
	GETGOODINFO(state,goodInfo){
		state.goodInfo = goodInfo
	},
}

//简化数据
const getters = {
	//路径导航简化数据
	categoryView(state){
		//比如:state.goodInfo初始状态空对象,空对象的categoryView属性值undefined
		//当前计算出来的 categoryView属性值至少是一个空对象,假的报错就不会有了
		return state.goodInfo.categoryView||{};
	},
	skuInfo(state){
		return state.goodInfo.skuInfo||{};
	},
	//产品售卖属性的简化
	spuSaleAttrList(state){
		return state.goodInfo.spuSaleAttrList||[];
	},
	
}

export default {
	state,
	actions,
	mutations,
	getters,
}