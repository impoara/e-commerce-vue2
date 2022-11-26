<template>
  <div>
	<h1 v-upper="msg"></h1>
	<Header/>
	<router-view></router-view>
	<!-- 在Home、Search显示，在登录、注册隐藏 -->
	<Footer v-show="$route.meta.show"/>
	<!-- <video controls src="../public/Never-Gonna-Give-You-up.mp4"></video> -->
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  data() {
  	return {
  		msg: 'ABC'
  	}
  },
  components: {Header,Footer}
}
</script>

<style>
	
</style>
