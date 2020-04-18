<template>
	<div class="tabbar">
		<router-link to="/home" class="item item-active" >
			<i class="iconfont icon-home">
			</i>
			<span>首页</span>
		</router-link>
		<router-link to="/shiji" class="item">
			<i class="iconfont icon-store"></i>
			<span>市集</span>
		</router-link>
		<router-link to="/heart" class="item">
			<i class="iconfont icon-favorites"></i>
			<span>收藏</span>
		</router-link>
		<router-link to="/my" class="item">
		    <i class="iconfont icon-bussiness-man"></i>
			<span>我的</span>
		</router-link>
	</div>
</template>
<script>
//	export default{
//		name:'tabBar',
//		computed:{
//			pickNum(){
//				// 获得状态管理 num
//				return this.$store.getters.getShopNum
//			}
//		}
//	}
    export default{
	    name:'tabBar'
    }
</script>
<style scoped>
	.tabbar{
		width:100%;
		display: flex;
		height: 60px;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
	}
	.tabbar .item{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100px;
		color: #333333;
		text-align: center;
		margin: 0 1px;
	}
	.tabbar .item .iconfont{
		font-size: 28px;
		margin-bottom: 5px;
		font:bold;
	}
	.tabbar .item span{
		font-size: 14px;
	}
	.tabbar a.router-link-active {
		background: #f46a46;
		color: #FFFFFF;
	}
</style>