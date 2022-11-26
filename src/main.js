import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局注册
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
//引入elementUI部分组件
import { MessageBox,Button } from 'element-ui';
//(注册全局组件)第一个参数: 组件的名字, 第二个参数: 哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//elementUI(全局配置)
Vue.component(MessageBox.name,MessageBox)
Vue.component(Button.name,Button)
//elementUI挂载在原型上(全局配置)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockServer.js--mock数据
import '@/mock/mockServe.js'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入路由
import VueRouter from 'vue-router'
import router from '@/router'
//引入仓库
import store from './store'
//统一接口api文件夹里面的全部请求函数(统一引入)
import * as API from '@/api'
//引入懒加载(图片)插件
import VueLazyload from 'vue-lazyload'
import flycat from './assets/flycat.gif'
//引入表单校验插件--(为节约空间在文件夹中提前声明和使用,再此只需引入)
import '@/plugins/validate.js'
//使用插件
//路由器
Vue.use(VueRouter)
//图片懒加载
Vue.use(VueLazyload,{
	//懒加载默认图片
	loading:flycat,
})
//引入自定义插件
import myPlugins from '@/plugins/myPlugins.js'
Vue.use(myPlugins,{
	name:'upper'
})

Vue.config.productionTip = false
new Vue({
	el: '#app',
	beforeCreate(){
		//全局事件总线
		Vue.prototype.$bus = this;
		//全局Api
		Vue.prototype.$API = API;
	},
	render: h => h(App),
	//注册路由:书写router时,组件身上会拥有$route,$router属性
	router,
	//注册仓库:组件实例的身上会多出一个$store属性
	store,
})
