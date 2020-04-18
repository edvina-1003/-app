<template>
	<div>
		<div class="header">
			<nav-bar></nav-bar>
		</div>
		<div class="footer">
			<tab-bar></tab-bar>
		</div>
		<div class="second-nav">
			<img src="../../assets/images/ad.jpg" class="ad" width="424" height="180px" />
		</div>
		<div class="recommend">
				<h1>为你推荐</h1>
				<router-link to="/category">菜谱分类</router-link>
		</div>
		<product-list></product-list>
	</div>
</template>

<script>
	import NavBar from '@/components/navBar'
	import TabBar from '@/components/tabBar'
	import productList from '@/pages/home/productList'
	export default {
		name: 'home',
		components: {
			NavBar,
			TabBar,
			productList
		}
	}
</script>

<style>
    *{
		margin: 0;
		padding: 0;
	}
	
	.container {
		width: 100%;
		height: 100%;
	}

	.second-nav {
		width: 100%;
		margin-top: 70px;
	}
	
	.second-nav img {
		width: 100%;
	}
	.recommend{
		margin: 20px 0;
		display: flex;
	}
	.recommend h1 {
		/*font-size: 23px;*/
		font: bold;
		color: #333333;
		margin-left: 10px;
		flex: 1;
	}
	
	.recommend a {
		text-decoration: none;
		font-size: 20px;
		color: #999999;
		float: right;
		margin-right: 10px;
		width: 100px;
	}
	
</style>