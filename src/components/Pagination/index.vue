<template>
	<div class="pagination">
		<!-- 开头部分 -->
		<button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)">首页</button>
		<button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
		<button disabled v-if="startNumAndEndNum.start>1">...</button>

		<!-- 中间部分 -->
		<button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
		
		<!-- 末尾部分 -->
		<button disabled v-if="startNumAndEndNum.end < totalPage">...</button>
		<button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
		<button disabled style="margin-left: 10px; background-color: black; color: white;">第{{pageNo}}页</button>
		<button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">尾页</button>

		<button disabled style="margin-left: 30px; background-color: pink; color: black;">共 {{totalPage}} 页 {{total}} 条</button>
	</div>
</template>

<script>
	export default {
		name: 'Pagination',
		props:['pageNo','pageSize','total','continues'],
		computed: {
			//Math.ceil():向上取整,计算总页数
			totalPage() {
				return Math.ceil(this.total/this.pageSize);
			},
			//计算出连续页码的起始数字与结束数字
			startNumAndEndNum(){
				const {continues,totalPage,pageNo} = this;
				//先定义两个变量来存储起始与结束的数字
				let start = 0 , end = 1;
				//连续页码数字5[就是至少五页]: 1.若出现不正常现象:"[数据不够五页]"
				if(continues > totalPage){
					start = 1;
					end = totalPage;
				}else{
					//正常现象:[连续页码为5,且总页数大于等于5]
					//起始数字
					start = pageNo - parseInt(continues/2);
					//结束数字
					end = pageNo + parseInt(continues/2);
					//把不正常出现的[start数字出现0,负数]纠正 例:pageNo=1时: -1,0,1,2,3
					if(start < 1){
						start = 1;
						end = continues;
					}
					//当end页超出总页数是,将其纠正
					if(end > totalPage){
						end = totalPage
						start = totalPage - continues + 1
					}
				}
				return {start,end}
			},
		},
	}
</script>

<style lang="less" scoped>
	.pagination {
		text-align: center;
		
		button:hover{
			background-color: orange;
		}
		
		button {
			margin: 0 5px;
			background-color: #f4f4f5;
			color: #606266;
			outline: none;
			border-radius: 2px;
			padding: 0 4px;
			vertical-align: top;
			display: inline-block;
			font-size: 13px;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			cursor: pointer;
			box-sizing: border-box;
			text-align: center;
			border: 0;

			&[disabled] {
				color: #c0c4cc;
				cursor: not-allowed;
			}
			
		}
	.active{
		background-color: skyblue;
		color: black;
	}
	}
</style>
