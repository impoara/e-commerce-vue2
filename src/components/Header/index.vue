<template>
	<header class="header">
		<!-- 头部的第一行 -->
		<div class="top">
			<div class="container">
				<div class="loginList">
					<p>天天购欢迎您！</p>
					<!-- 登陆前显示 -->
					<p v-if="!userName">
						<span>请</span>
						<!-- 声明式导航: 务必有to属性 -->
						<router-link to="/login">登录</router-link>&nbsp;
						<router-link to="/register" class="register">免费注册</router-link>
					</p>
					<!-- 登陆后显示 -->
					<p v-if="userName">
						<a style="margin-left: 30px; color: goldenrod;">用户: {{userName}}</a>
						<a style="margin-left: 30px;color: olive;" @click="logout">退出登陆</a>&nbsp;
					</p>
				</div>
				<div class="typeList">
					<router-link to="/center/myorder">我的订单</router-link>
					<router-link to="/shopcart">我的购物车</router-link>
					<router-link to="/center">我的账户</router-link>
					<a href="###">天天会员</a>
					<a href="###">企业采购</a>
					<a href="###">关注天天超市</a>
					<a href="###">合作招商</a>
					<a href="###">商家后台</a>
				</div>
			</div>
		</div>
		<!--头部第二行 搜索区域-->
		<div class="bottom">
			<h1 class="logoArea">
				<router-link class="logo" to="/home">
					<img src="./images/logo.png" alt="">
				</router-link>
			</h1>
			<div class="searchArea">
				<form action="###" class="searchForm">
					<input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge" />
					<button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
						搜索
					</button>
				</form>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {
				keyword: '',
			}
		},
		computed: {
			userName(){
				return this.$store.state.user.userInfo.name
			}
		},
		methods: {
			// 搜索按钮的回调函数:需要向search路由进行跳转
			goSearch() {
				// 路由传参
				// 第一种:字符串形式	// param参数(要现在router里配置)// query参数(不用先在router里配置)
				// this.$router.push("/search/" + this.keyword+"?key="+this.keyword.toUpperCase());
				// 第二种:模板字符串	// param参数(要现在router里配置)// query参数(不用先在router里配置)
				// this.$router.push(`/search/${this.keyword}?key=${this.keyword.toUpperCase()}`)
				// 第三种:对象		//(对象写法)写params要在router里配置name			
				// this.$router.push({name:'search',params:{keyword:this.keyword},query:{key:this.keyword.toUpperCase()}})

				/* ***************************************************************************** */
				// 面试题1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
				// 答:路由跳转传参的时候,对象的写法可以是name、path形式,但是需要注意的是,path这种写法不能与params参数使用.

				// 面试题2.如何制定params参数可传可不传?
				// 如果路由要求传递params参数,但是你偏不传params参数,这时URL就会出现问题.
				// 答:如何指定params可传可不传,只需在配置路由时,在占位后面加上一个问号'?'.
				// this.$router.push({name:'search',query:{key:this.keyword.toUpperCase()}});

				// 面试题3.params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
				// 答:使用undefined解决:params参数可以传递、不传递(空的字符串).
				// this.$router.push({name:'search',params:{keyword:''||undefined},query:{key:this.keyword.toUpperCase()}})

				// 面试题4.路由组件能不能传递props数据?
				// 答:可以的:有三种写法
				// this.$router.push({name:'search',params:{keyword:this.keyword},query:{key:this.keyword.toUpperCase()}},(solve)=>{},(error)=>{})
				// this.$router.push({
				// 	name:'search',
				// 	params:{keyword:this.keyword || undefined},
				// 	/* query:{key:this.keyword.toUpperCase()}, */
				// })
				let location = {
					name: 'search',
					params: {
						keyword: this.keyword || undefined
					}
				}
				if (this.$route.query) {
					location.query = this.$route.query
				}
				this.$router.push(location)
			},
			//退出登录
			async logout(){
				//1.需要发请求,通知服务器退出登录[服务器来删除token]
				//2.清除项目中的数据[userInfo、token]
				try{
					//如果退出成功
					await this.$store.dispatch('userLogout');
					//则返回首页
					this.$router.push('/home');
				}catch(e){
					console.log(e.message)
				}

			}
		},
		mounted() {
			//通过全局事件总线清除关键字,当Search组件中删除params面包屑时调用的.
			this.$bus.$on('clearHeader', () => {
				this.keyword = ''
			})
		},
	};
</script>

<style scoped lang="less">
	.header {
		&>.top {
			background-color: #eaeaea;
			height: 30px;
			line-height: 30px;

			.container {
				width: 1200px;
				margin: 0 auto;
				overflow: hidden;

				.loginList {
					float: left;

					p {
						float: left;
						margin-right: 10px;

						.register {
							border-left: 1px solid #b3aeae;
							padding: 0 5px;
							margin-left: 5px;
						}
					}
				}

				.typeList {
					float: right;

					a {
						padding: 0 10px;

						&+a {
							border-left: 1px solid #b3aeae;
						}
					}

				}

			}
		}

		&>.bottom {
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;

			.logoArea {
				float: left;

				.logo {
					img {
						width: 175px;
						margin: 25px 45px;
					}
				}
			}

			.searchArea {
				float: right;
				margin-top: 35px;

				.searchForm {
					overflow: hidden;

					input {
						box-sizing: border-box;
						width: 490px;
						height: 32px;
						padding: 0px 4px;
						border: 2px solid #ea4a36;
						float: left;

						&:focus {
							outline: none;
						}
					}

					button {
						height: 32px;
						width: 68px;
						background-color: #ea4a36;
						border: none;
						color: #fff;
						float: left;
						cursor: pointer;

						&:focus {
							outline: none;
						}
					}
				}
			}
		}
	}
</style>
