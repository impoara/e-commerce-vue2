//search模块的仓库
import {
	reqGetSearchList
} from '@/api'
const state = {
	//state中的默认初始值不要随意赋值(不知道是数组,还是对象,要测试一下)
	searchList: {},
}

const actions = { // params={} :如果有参数就使用参数,若没使用就默认空对象
	async getSearchList({ commit }, params={}) {
		let result = await reqGetSearchList(params)
		if (result.code == 200) {
			commit('GETSEARCHLIST', result.data)
		}
	}
}

const mutations = {
	GETSEARCHLIST(state, searchList) {
		state.searchList = searchList
	}
}

const getters = {
	goodsList(state){
		//假如没有网
		if(state.searchList){
			return state.searchList.goodsList
		}else{return '数据丢失'}
	},
	trademarkList(state){
		if(state.searchList){
			return state.searchList.trademarkList
		}else{return '数据丢失'}
	},
	attrsList(state){
		if(state.searchList){
			return state.searchList.attrsList
		}else{return '数据丢失'}
	},
}

export default {
	// namespaced:true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	actions,
	mutations,
	getters,
}
