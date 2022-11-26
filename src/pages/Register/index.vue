<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<div class="register">
			<h3>注册新用户
				<span class="go">我有账号，去 <router-link to="/login">登陆</router-link></span>
			</h3>
			<div class="content">
				<label>用户名:</label>
				<input placeholder="请输入你的用户名" v-model="userName" name="userName" v-validate="{ required: true, regex:  /^[A-Za-z0-9_\-\u4e00-\u9fa5]{3,15}$/ }" :class="{ invalid: errors.has('userName') }" />
				<span class="error-msg">{{ errors.first("userName") }}</span>
			</div>
			<div class="content">
				<label>手机号:</label>
				<input placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{ invalid: errors.has('phone') }" />
				<span class="error-msg">{{ errors.first("phone") }}</span>
			</div>
			<div class="content">
				<label>验证码:</label>
				<input placeholder="请输入验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('code') }" />
				<button style="width: 85px; height: 30px; margin-left: 2px;" @click="getCode">获取验证码</button>
				<span class="error-msg">{{ errors.first("code") }}</span>
			</div>
			<div class="content">
				<label>登录密码:</label>
				<input placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="{ required: true, regex: /^[0-9A-Za-z]{6,20}$/ }" :class="{ invalid: errors.has('password') }" />
				<span class="error-msg">{{ errors.first("password") }}</span>
			</div>
			<div class="content">
				<label>确认密码:</label>
				<input placeholder="请输入确认密码" v-model="isPassword" name="isPassword" v-validate="{ required: true, is:password  }" :class="{ invalid: errors.has('isPassword') }" />
				<span class="error-msg">{{ errors.first("isPassword") }}</span>
			</div>
			<div class="controls">
				<input type="checkbox" v-model="isAgree" name="isAgree" v-validate="{ required: true, 'agree':true }" :class="{ invalid: errors.has('isAgree') }" />
				<span class="error-msg">{{ errors.first("isAgree") }}</span>
				<span> 同意协议并注册《尚品汇用户协议》</span>
			</div>
			<div class="btn">
				<button @click="userRegister">完成注册</button>
			</div>
		</div>

		<!-- 底部 -->
		<div class="copyright">
			<ul>
				<li>关于我们</li>
				<li>联系我们</li>
				<li>联系客服</li>
				<li>商家入驻</li>
				<li>营销中心</li>
				<li>手机尚品汇</li>
				<li>销售联盟</li>
				<li>天天社区</li>
			</ul>
			<div class="address">地址：暂定............</div>
			<div class="beian">鲁ICP备0000000000000号</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Register',
		data() {
			return { //收集表单数据
				//用户名
				userName: '',
				//手机号
				phone: '',
				//验证码
				code: '',
				//登陆密码
				password: '',
				//确认登陆密码
				isPassword: '',
				//是否同意协议
				isAgree: false,
			}
		},
		methods: {
			//获取验证码
			getCode() {
				//判断一下数据(如果phone有数据则执行发送验证码功能)
				try {
					this.phone && this.$store.dispatch('getCode', this.phone)
				} catch (e) {
					alert(e.message)
				}

			},
			//用户注册信息提交
			async userRegister() {
				const success = await this.$validator.validateAll(); //全部表单验证
				//整理一下数据
				const {
					phone,
					userName,
					password,
					code
				} = this
				//判断验证码
				if (code != this.isCode) {
					alert('验证码错误')
					return 0
				}
				try {
					if(success){
						//发送注册请求信息
						await this.$store.dispatch('userRegister', {
							phone,
							password,
							code,
							nickName: userName
						})
						this.$router.push('/login');
					}
				} catch (e) {
					alert(e.message)
				}
			}
		},
		computed: {
			...mapState({
				isCode: (state) => {
					return state.user.code
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.register-container {
		.register {
			width: 1200px;
			height: 470px;
			border: 1px solid rgb(223, 223, 223);
			margin: 0 auto;

			h3 {
				background: #ececec;
				margin: 0;
				padding: 6px 15px;
				color: #333;
				border-bottom: 1px solid #dfdfdf;
				font-size: 20.04px;
				line-height: 30.06px;

				span {
					font-size: 14px;
					float: right;

					a {
						color: #e1251b;
					}
				}
			}

			div:nth-of-type(1) {
				margin-top: 40px;
			}

			.content {
				padding-left: 390px;
				margin-bottom: 18px;
				position: relative;

				label {
					font-size: 14px;
					width: 96px;
					text-align: right;
					display: inline-block;
				}

				input {
					width: 270px;
					height: 38px;
					padding-left: 8px;
					box-sizing: border-box;
					margin-left: 5px;
					outline: none;
					border: 1px solid #999;
				}

				img {
					vertical-align: sub;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.controls {
				text-align: center;
				position: relative;

				input {
					vertical-align: middle;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.btn {
				text-align: center;
				line-height: 36px;
				margin: 17px 0 0 55px;

				button {
					outline: none;
					width: 270px;
					height: 36px;
					background: #e1251b;
					color: #fff !important;
					display: inline-block;
					font-size: 16px;
				}
			}
		}

		.copyright {
			width: 1200px;
			margin: 0 auto;
			text-align: center;
			line-height: 24px;

			ul {
				li {
					display: inline-block;
					border-right: 1px solid #e4e4e4;
					padding: 0 20px;
					margin: 15px 0;
				}
			}
		}
	}
</style>
