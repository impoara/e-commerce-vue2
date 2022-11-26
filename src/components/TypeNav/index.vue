<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="leaveShow" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<!-- 过渡动画 -->
				<transition name="animate__animated animate__bounce"
					appear enter-active-class="animate__fadeIn"
					leave-active-class="animate__fadeOut"
					style="--animation-duration: 0.1s"
					>
					<div class="sort" v-show="show">
						<!-- 三级联动 -->
						<div class="all-sort-list2" @click="goSearch">
							<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
								:class="{cur:currentIndex==index}">
								<h3 @mouseenter="changeIndex(index)">
									<a :data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
								</h3>
								<!-- 二级、三级分类 -->
								<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
									<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
											</dt>
											<dd>
												<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import throttle from 'lodash/throttle';
	import 'animate.css';
	export default {
		name: 'TypeNav',
		data() {
			return {
				//存储用户鼠标移上哪一个一级分类
				currentIndex: -1,
				show: true
			}
		},
		//组件挂载完毕,可以向服务器发请求
		mounted() {
			//通知Vuex发请求,获取数据,存储于仓库种
			this.$store.dispatch('categoryList')
			//不在home页,当组件挂载完毕,让show属性变为false
			if (this.$route.path != '/home') {
				this.show = false
			}
		},
		computed: {
			...mapState({
				categoryList: (state) => {
					return state.home.categoryList;
				},
			})
		},
		methods: {
			//鼠标进入修改响应式数据currentIndex属性
			/* changeIndex(index) {
				//index:鼠标移上某一个一级分类的元素的索引值
				this.currentIndex = index
			}, */
			changeIndex: throttle(function(index) { //节流
				this.currentIndex = index
			}, 50),

			leaveShow() {
				this.currentIndex = -1
				if (this.$route.path != '/home') {
					this.show = false
				}
			},

			goSearch(event) {
				//最好的解决方式,使用编程式导航 + 事件委派
				//存在的问题:事件委派,是把全部的子节点[h3、dt、dl、em]的时间委派给父组件
				//点击a标签的时候,才会进行路由跳转[如何确定点击的一定是a标签]
				//存在另外一个问题:即使能确定点击的是a标签,如何区分是哪一级的a标签

				//第一个问题:把子节点当中a标签,加上自定义属性data-categoryName,其余子节点没有
				let element = event.target
				//dataset:获取节点的自定义属性于属性值
				let {
					categoryname,
					category1id,
					category2id,
					category3id
				} = element.dataset
				//如果有标签有categoryname一定是a标签
				if (categoryname) {
					//整理路由跳转参数
					let location = {
						name: 'search'
					}
					let query = {
						categoryName: categoryname
					}
					if (category1id) {
						query.category1Id = category1id
					} else if (category2id) {
						query.category2Id = category2id
					} else {
						query.category3Id = category3id
					}
					//判断:如果路由跳转的时候,带有params参数,捎带脚传递过去.
					if(this.$route.params){
						location.params = this.$route.params
					}
					//整理参数
					location.query = query
					//路由跳转
					this.$router.push(location)
				}
			},

			//当鼠标移入的时候,让商品分类列表进行展示
			enterShow() {
				if (this.$route.path != '/home') {
					this.show = true
				}
			},
		},
	}
</script>

<style scoped lang="less">
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							// display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						/* &:hover {
							.item-list {
								display: block;
							}
						} */
					}

					.cur {
						background-color: skyblue;
					}

					/* .item:hover {	第一种方法
						background-color: skyblue;
					} */
				}
			}
			//过渡动画的样式
			//过渡动画开始状态(进入)
			/* .sort-enter,.sort-leave-to{
				height: 0px;
				// transform: rotate(0deg);
			}
			//过渡动画的结束状态(进入)
			.sort-enter-to,.sort-leave{
				height: 461px;
				// transform: rotate(360deg);
			}
			//定义动画时间速率
			.sort-enter-active{
				transition: all 0.5s linear;
			} */
		}
	}
</style>
