import { reqUserAddressInfo, reqOrderInfo } from '@/api'

const state = {
	addressInfo:[],
	orderInfo:{},
}

const actions = {
	//获取用户地址信息
	async getUserAddressInfo({commit}){
		let result = await reqUserAddressInfo()
		if(result.code == 200){
			commit('GETUSERADDRESSINFO',result.data)
		}
	},
	//获取商品清单
	async getOrderInfo({commit}){
		let result = await reqOrderInfo()
		if(result.code == 200){
			commit('GETORDERINFO',result.data)
		}
	},
}

const mutations = {
	//存储用户地址信息
	GETUSERADDRESSINFO(state,addressInfo){
		state.addressInfo = addressInfo;
	},
	//存储商品清单信息
	GETORDERINFO(state,orderInfo){
		state.orderInfo = orderInfo;
	},
}

const getters = {
	
}

export default {
	state,
	actions,
	mutations,
	getters,
}