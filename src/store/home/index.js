//home模块的仓库
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'
const state = {
	//state中的默认初始值不要随意赋值
	categoryList:[],
	bannerList:[],
	floorList:[],
}

const actions = {
	//通过API里面的接口函数调用,向服务器发送请求,获取服务器的数据
	async categoryList({commit}){
		let result = await reqCategoryList()
		if(result.code == 200){
			commit('CATEGORYLIST',result.data)
		}
	},
	//获取首页轮播图的数据
	async getBannerList({commit}){
		let result = await reqGetBannerList()
		if(result.code == 200){
			commit('BANNERLIST',result.data)
		}
	},
	//获取Floor组件数据
	async getFloorList({commit}){
		let result = await reqGetFloorList()
		if(result.code == 200){
			commit('FLOORLIST',result.data)
		}
	},
}

const mutations = {
	//
	CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList;
	},
	BANNERLIST(state,bannerList){
		state.bannerList = bannerList
	},
	FLOORLIST(state,floorList){
		state.floorList = floorList
	}
}

const getters = {}

export default {
	// namespaced:true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	actions,
	mutations,
	getters,
}