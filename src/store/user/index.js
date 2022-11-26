//user仓库
import {reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout} from '@/api'
import {setToken, clearToken} from '@/utils/token.js'
const state = {
	code:'',
	token:'',
	userInfo:{},
}

const actions = {
	//获取验证码(假)
	async getCode({commit},phone){
		//将验证码作为data直接返回,现有条件不能发送短信验证码
		let result = await reqGetCode(phone)
		if(result.code == 200){
			alert(`号码:${phone},验证码:${result.data}`)
			commit('GETCODE',result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error('验证码获取失败'))
		}
	},
	//发送用户注册信息
	async userRegister({commit},userInfo){
		let result = await reqUserRegister(userInfo)
		if(result.code == 200){
			alert('注册成功,正在跳转到登陆页面...');
			return 'ok'
		}else{
			return Promise.reject(new Error('注册失败,或该账号已被使用'))
		}
	},
	//发送用户登录信息[token]
	async userLogin({commit},userInfo){
		let result = await reqUserLogin(userInfo)
			if(result.code == 200){
				//如果选择自动登录则保存到session里
				if(userInfo.isChecked) setToken(result.data.token)
				commit('USERLOGIN',result.data)
				return 'ok'
			}else{
				return Promise.reject(new Error('用户名或密码错误'))
			}
	},
	//获取用户信息
	async getUserInfo({commit}){
		let result = await reqGetUserInfo()
		if(result.code == 200){
			commit('GETUSERINFO',result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error('fail'))
		}
	},
	//退出登录
	async userLogout({commit}){
		//只是通知服务器删除token
		let result = await reqUserLogout()
		if(result.code == 200){
			commit('CLEAR');
			return 'ok';
		}else{
			return Promise.reject(new Error('fail'))
		}
	}
}

const mutations = {
	//保存验证码
	GETCODE(state,code){
		state.code = code
	},
	//保存登录成功后的用户信息
	USERLOGIN(state,userInfo){
		state.token = userInfo.token
	},
	//保存用户信息
	GETUSERINFO(state,userInfo){
		state.userInfo = userInfo
	},
	//清除用户信息
	CLEAR(state){
		state.token = '';
		state.userInfo = {};
		clearToken();
	}
}

const getters = {
	
}


export default {
	state,
	actions,
	mutations,
	getters
}