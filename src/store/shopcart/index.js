//购物车模块
import {
	reqGetCartList,
	reqDeleteCartById,
	reqUpdateCheckedById
} from '@/api'
const state = {
	cartList: [],
}

const actions = {
	//获取购物车列表数据
	async getCartList({commit}) {
		let result = await reqGetCartList();
		if (result.code == 200) {
			commit('GETCARTLIST', result.data);
		}
	},
	//删除购物车中某一个产品
	async deleteCartBySkuId({commit}, skuId) {
		let result = await reqDeleteCartById(skuId)
		if (result.code == 200) {
			return 'ok'
		} else {
			Promise.reject(new Error('fail'));
		}
	},
	//删除购物车中选中的全部产品
	deleteAllCheckedCart({dispatch,getters}) {
		//context:小仓库,commit[提交mutations修改state] getters[计算属性] dispatch[派发action]
		//获取购物车中的全部产品
		let PromiseAll = [];
		getters.cartList.cartInfoList.forEach((item) => {
			let Promise = item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : '';
			//将每一个Promise存到PromiseAll数组中
			PromiseAll.push(Promise);
		})
		//只要全部的Promise1|p2|p3...都成功则返回结果为成功
		//如果有一个失败,则返回失败
		return Promise.all(PromiseAll)
	},
	//修改购物车中某一产品的选中状态
	async updateCheckedById({commit}, {skuId,isChecked}) {
		let result = await reqUpdateCheckedById(skuId, isChecked)
		if (result.code == 200) {
			return 'ok'
		} else {
			Promise.reject(new Error('fail'))
		}
	},
	//修改购物车中全部产品的选中状态
	updateAllChecked({dispatch,getters}, isChecked) {
		let PromiseALl = [];
		getters.cartList.cartInfoList.forEach((item) => {
			//调用上一个模块发送请求
			let Promise = dispatch('updateCheckedById', {
				skuId: item.skuId,
				isChecked
			});
			PromiseALl.push(Promise);
		})
		return Promise.all(PromiseALl);
	}
}

const mutations = {
	GETCARTLIST(state, cartList) {
		state.cartList = cartList
	}
}

const getters = {
	cartList(state) {
		return state.cartList[0] || {};
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
