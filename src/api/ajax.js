//对于axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
//start:进度条开始.	done:进度条结束
import "nprogress/nprogress.css";
//在当前模块引入store
import store from '@/store'
//1.利用axios对象方法create,去创建一个axios实例
const requests = axios.create({
	//配置对象
	baseURL:"http://gmall-h5-api.atguigu.cn/api",
	//请求超时的时间
	timeout:5000,
});
//请求拦截器:再发送请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事情.
requests.interceptors.request.use((config)=>{
	//config:配置对象,对象里面有一个属性很重要,header请求头
	//添加一个获取用户信息的请求头token
	if(store.state.user.token){
		//先看仓库里有没有
		config.headers.token = store.state.user.token;
	}else{
		//如果没有再看session存储里有没有(虽然存进去了,但没成功)
		if(sessionStorage.getItem('TOKEN')){
			config.headers.token = sessionStorage.getItem('TOKEN')
		}
	}
	//添加一个userTempId请求头
	if(store.state.detail.uuid_token){
		//给请求头添加一个字段(userTempId)这是与后端协定的一个字段
		config.headers.userTempId = store.state.detail.uuid_token;
	}
	//进度条开始
	nprogress.start();
	return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
	//成功的回调函数:服务器响应数据回来以后,响应拦截器可以检测到,可以做一些事情
	//进度条结束
	nprogress.done();
	return res.data;
},(err)=>{
	//响应失败的回调函数  终结Promise响应链
	return Promise.reject(new Error('fail'));
})

export default requests;