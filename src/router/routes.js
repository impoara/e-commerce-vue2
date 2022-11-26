//引入路由插件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/* 懒加载
当打包构建应用时, Javascript 包会非常大,影响页面加载.
如果我们能把不同路由对应组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件,这样就更加高效.
例如:
--------复杂带函数
const foo = ()=>{
	return import('@/pages/Home')
}
//主页路由
{
	path: '/home',
	component: foo,
},
--------简单
//主页路由
{
	path: '/home',
	component: ()=>import('@/pages/Home'),
},
 */

//路由配置信息
export default [
	//个人主页面
	{
		path:'/center',
		name:'center',
		component:Center,
		meta:{
			show:true
		},
		//二级路由
		children:[
			{	//我的订单
				path:'myorder',
				component:MyOrder,
				meta:{
					show:true
				},
			},
			{
				path:'grouporder',
				component:GroupOrder,
				meta:{
					show:true
				},
			},
		]
	},
	
	//支付成功页面
	{
		path:'/paysuccess',
		name:'paysuccess',
		component:PaySuccess,
		meta:{
			show: true
		},
		//这个路由独享守卫写到组件里去了.(内有,三种方法说明!)
	},
	
	//支付页面
	{
		path:'/pay',
		name:'pay',
		component:Pay,
		meta:{
			show: true
		},
		//路由独享守卫(只能由"交易页面"进入"支付页面")
		beforeEnter:(to, from, next) => {
			if(from.path == '/trade'){
				next();
			}else{
				next(false);
			}
		}
	},
	
	//交易页面 
	{
		path:'/trade',
		name:'trade',
		component: Trade,
		meta:{
			show: true
		},
		//路由独享守卫(只能由"购物车页面"进入"交易页面")
		beforeEnter:(to, from, next) => {
			if(from.path == '/shopcart'){
				next();
			}else{
				next(false);
			}
		},
	},
	
	//购物车页面路由
	{
		path: '/shopcart',
		name: 'shopcart',
		component: ShopCart,
		meta:{
			show: true
		}
	},
	
	//加入购物车成功页路由
	{
		path: '/addcartsuccess',
		name:'addcartsuccess',
		component: AddCartSuccess,
		meta: {
			show: true
		}
	},
	
	//商品详情页路由
	{
		path: '/detail/:skuid',
		component: Detail,
		meta: {
			show: true
		}
	},
	
	//主页路由
	{
		path: '/home',
		component: ()=>import('@/pages/Home'),
		meta: {
			show: true
		},
	},
	
	//搜索页路由
	{
		//这里是params的占位 加?表示params参数可传可不传
		path: '/search/:keyword?',
		component: ()=>import('@/pages/Search'),
		meta: {
			show: true
		},
		name: "search",
		//路由组件能不能传递props数据?
		//布尔值写法:params
		props: true,
		//对象写法:额外给路由组件传递一些props
		// props:{a:1,b:2},
		//函数写法:可以params参数、query参数,通过props传递给路由组件
		// props:($route)=>{	//可以不写这个(直接到Search里用$route.params.keyWord或$route.query.key)
		// 	return {keyWord:$route.params.keyWord,key:$route.query.key}
		// }
	},
	
	//登录页路由
	{
		path: '/login',
		component: Login,
		meta: {
			show: false
		},
	},
	
	//注册页路由
	{
		path: '/register',
		component: Register,
		meta: {
			show: false
		},
	},
	
	// 重定向,在项目启动的时候,访问/,立马让它重定向到首页
	{
		path: '*',
		redirect: '/home',
	},

];
