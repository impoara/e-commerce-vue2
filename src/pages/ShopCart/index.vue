<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(cart) in cartListInfo" :key="cart.id">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart,$event)">
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl">
						<div class="item-msg">{{cart.skuName}}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{cart.skuPrice}}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
						<input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
							@change="handler('change',$event.target.value*1,cart)">
						<a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
					</li>
					<li class="cart-list-con7">
						<a href="#none" class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" :checked="isAllCheck&&cartListInfo.length>0" type="checkbox" @change="updateAllChecked">
				<span>全选</span>
			</div>
			<div class="option">
				<a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>0</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{totalPrice}}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="trade">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import throttle from 'lodash/throttle';
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'ShopCart',
		mounted() {
			this.getData();
		},
		methods: {
			//获取个人购物车数据
			getData() {
				this.$store.dispatch('getCartList')
			},
			//修改某一个产品的个数(附带节流)
			handler:throttle(async function(type, disNum, cart){
				//type区分三个元素(-,+,数字改变),disNum原数据的改变量(有正负),cart商品信息
				switch (type) {
					case 'add':
						disNum = cart.skuNum < 9999 ? 1 : 0;
						break;
					case 'minus':
						//判断产品个数大于1,才可传递
						disNum = cart.skuNum > 1 ? -1 : 0;
						break;
					case 'change':
						if(isNaN(disNum)||disNum < 1||disNum > 9999){
							disNum = 0;
						}else {
							//服务器的改变量 = 新数 - 旧数  (后台直接加上改变量)
							disNum = Math.floor(disNum) - cart.skuNum
						}
						break;
				}
				try {
					//修改成功
					await this.$store.dispatch('addOrdShopCart', {skuId: cart.skuId,skuNum: disNum})
					//再次获取数据
					this.getData()
				} catch (e) {
					console.log(e)
				}
			}, 1000),
			//删除某一产品的操作
			async deleteCartById(skuId){
				try {
					await this.$store.dispatch('deleteCartBySkuId',skuId)
					this.getData()
				} catch(error){
					alert(error.message)
				}
			},
			//修改某一产品的勾选状态
			async updateChecked(cart,event){
				try{
					let isChecked = event.target.checked ? 1 : 0;
					await this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked})
					this.getData()
				}catch (error) {
					alert(error.message)
				}
			},
			//修改所有产品的勾选状态
			async updateAllChecked(event){
				//首先检测是否有产品,若没有这不执行勾选
				if(this.cartListInfo.length == 0){
					event.target.checked = false
					return alert('购物车中没有商品')
				}
				//将true或false转化成1或0
				let isChecked = event.target.checked ? 1 : 0;
				try{
					await this.$store.dispatch('updateAllChecked',isChecked);
					this.getData()
				}catch(e){
					alert(e.message)
				}
			},
			//删除所有购物车中已选中的商品
			async deleteAllCheckedCart(){
				//首先检测是否有产品,若没有这不执行
				if(this.cartListInfo.length == 0){
					return 0
				}
				try{
					//派发一个action
					await this.$store.dispatch('deleteAllCheckedCart')
					this.getData()
				}catch(e){
					alert(e.message)
				}
			},
		},
		computed: {
			...mapGetters(['cartList']),
			//购物车数据
			cartListInfo() {
				return this.cartList.cartInfoList || [];
			},
			//总价格计算
			totalPrice() {
				let sum = 0;
				this.cartListInfo.forEach((item) => {
					if (item.isChecked) {
						sum += item.cartPrice * item.skuNum
					}
				})
				return sum
			},
			//判断底部复选框是否选中
			isAllCheck() {
				return this.cartListInfo.every((item) => item.isChecked == 1)
			}
		},
	}
</script>

<style lang="less" scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				&>div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;

				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					&>li {
						float: left;
					}

					.cart-list-con1 {
						width: 15%;
					}

					.cart-list-con2 {
						width: 35%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					/* .cart-list-con3 {
						width: 20.8333%;

						.item-txt {
							text-align: center;
						}
					} */

					.cart-list-con4 {
						width: 10%;

					}

					.cart-list-con5 {
						width: 17%;

						.mins {
							border: 1.5px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8.4px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1.5px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8.4px;
						}
					}

					.cart-list-con6 {
						width: 10%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 13%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
