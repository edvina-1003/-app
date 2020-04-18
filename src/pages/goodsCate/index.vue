<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">商品分类</div>
		</div>
		<div class="tab">
			<tab-title @end="run"></tab-title>
		    <tab-content :curId="curId" :catName="catName"></tab-content>
		</div>
		
	</div>
</template>

<script>
	import tabTitle from '@/pages/goodsCate/tabTitle';
	import tabContent from '@/pages/goodsCate/tabContent';
	export default{
		name:'goodsCate',
		data(){
			return{
				curId:null,
				catName:''
			}
		},
		components:{
			tabTitle,
			tabContent
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			run(x,catName){
				this.curId = x;
				this.catName = catName;
				console.log(this.curId);
			}
		},
		mounted(){
			// 初始化的菜单名称的事件触发
			this.$on('end',(x,catName)=>{
				this.curId = x;
				this.catName = catName;
			})
		}
		 
	}
</script>

<style scoped>
	.navbar{
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
	}
	.navbar .left{
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	.navbar .left .iconfont{
		font-size: 24px;
	}
	.navbar .right{
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding-right: 35px;
	}
	.tab{
		display: flex;
	}
</style>