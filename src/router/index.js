//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由配置
import routes from './routes.js'
//引入store
import store from '@/store'
//先把VueRouter原型对象的push和replace,保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace(防止点击多次报错)
//第一个参数:告诉原来push方法,你往哪里跳转(传递哪些参数)
//第二个参数:成功的回调
//第三个参数:失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
	if (resolve && reject) {
		//call||apply区别:
		//相同点:都可以调用函数一次,都可以篡改函数的上下文一次
		//不同点:call与apply传递参数: call传递参数用逗号隔开. apply方法执行,传递数组.
		originPush.call(this, location, resolve, reject);
	} else {
		originPush.call(this, location, () => {}, () => {});
	}
}

VueRouter.prototype.replace = function(location, resolve, reject) {
	if (resolve && reject) {
		originReplace.call(this, location, resolve, reject);
	} else {
		originReplace.call(this, location, () => {}, () => {});
	}
}

//配置路由
const router = new VueRouter({
	//配置路由
	routes: routes,
	//滚动行为(进度条)
	scrollBehavior(to, from, savedPosition) {
		//代表滚动条在最上方
		return { y: 0 };
	},
})

//全局守卫---前置守卫(在路由跳转间进行判断)
router.beforeEach(async (to,from,next)=>{
	//to:可以获取到你想要跳转到哪个路由的信息
	//from:可以获取到你来自哪个路由
	//next:放行函数
	//1.next():直接放行
	//2.next('/login'):放行到指定的路由上
	//3.next(false):中断当前导航,如果url变了,就再把你变回from的路由
	//用户已经登陆,则一定有token(但是仓库里不一定有token)
	if(sessionStorage.getItem('TOKEN')){ //若有保存的token则将其保存到仓库里
		store.state.user.token = sessionStorage.getItem('TOKEN')
	}
	let token = store.state.user.token
	let name = store.state.user.userInfo.name
	if(token){
		//已登录*1
		//想去登录页面则遣返
		if(to.path == '/login'){
			//返回来时的路由**2
			next(from.path) 
		}else{
			//登录后去的是其他路由,若userInfo有则放行**2
			if(name){//***3
				next();
			}else{//***3
				//没有用户信息,则派发action让仓库存储信息再跳转
				try{//****4
					//获取用户信息
					await store.dispatch('getUserInfo');
					next();
				}catch(e){//****4
					//token失效了,获取不到用户信息
					//清除用户数据
					await store.dispatch('userLogout')
					//重新登陆
					aler('请重新登录!')
					next('/login');
				}
			}
		}
	}else{
		let toPath = to.path;
		//未登录*1:-----不能去交易相关、支付相关【pay,paysuccess】、个人中心
		if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 || toPath.indexOf('cart')!=-1){
			alert('请先登录!')
			next('/login?redirect='+toPath);
		//不是去上述页面-----正常放行
		}else next();
	}
})

export default router
