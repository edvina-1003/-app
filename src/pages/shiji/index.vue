<template>
	<div class="container">
		<nav-bar1></nav-bar1>
		<tab-bar></tab-bar>
		<div class="second-nav">
			<router-link to="/hongbei" class="item item-active">
				<i class="iconfont icon-hongbeigongju"></i>
				<span>烘焙</span>
			</router-link>
			<router-link to="/caihua" class="item">
				<i class="iconfont icon-caihua"></i>
				<span>果蔬生鲜</span>
			</router-link>
			<router-link to="/dianqi" class="item">
				<i class="iconfont icon-chufangdianqi"></i>
				<span>器具</span>
			</router-link>
			<router-link to="/hongbei" class="item">
				<i class="iconfont icon-dami"></i>
				<span>米面</span>
			</router-link>
			<router-link to="/fangbianshipin" class="item">
				<i class="iconfont icon-fangbianmian_"></i>
				<span>方便食品</span>
			</router-link>
			<router-link to="/yinpin" class="item">
				<i class="iconfont icon-yinpin"></i>
				<span>饮品茶酒</span>
			</router-link>
			<router-link to="/lingshi" class="item">
				<i class="iconfont icon-lingshi"></i>
				<span>零食</span>
			</router-link>
			<router-link to="/goodsCate" class="item">
				<i class="iconfont icon-all"></i>
				<span>全部分类</span>
			</router-link>
		</div>
		<div class="shijiContainer">
			<div class="buy">
				<h1>爱尝鲜新品点</h1>
				<a href="#">
					<h2>查看全部</h2></a>
			</div>
			<product-list1></product-list1>
			
			<div class="buy">
				<h1>市集经典</h1>
				<a href="#">
					<h2>查看全部</h2></a>
			</div>
			<product-list2></product-list2>
			
			<div class="buy">
				<h1>市集上新</h1>
				<a href="#">
					<h2>查看全部</h2></a>
			</div>
			<product-list3></product-list3>
			<product-list></product-list>
		</div>
	</div>
</template>

<script>
	import NavBar1 from '@/components/navBar1'
	import TabBar from '@/components/tabBar'
	import productList from '@/pages/shiji/productList'
	import productList1 from '@/pages/shiji/productList1'
	import productList2 from '@/pages/shiji/productList2'
	import productList3 from '@/pages/shiji/productList3'
	export default {
		name: 'shiji',
		components: {
			NavBar1,
			TabBar,
			productList,
			productList1,
			productList2,
			productList3
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.container {
		width: 100%;
		height: 100%;
		overflow-x: visible;
		margin-top: 70px;
	}
	
	.second-nav {
		width: 100%;
		margin-top: 20px;
		height: 160px;
	}
	
	.second-nav .item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 103px;
		height: 60px;
		color: #333333;
		text-align: center;
		text-decoration: none;
		float: left;
		margin: 10px 0;
	}
	
	.second-nav .item i {
		font-size: 35px;
		color: #5D656B;
		margin-bottom: 5px;
	}
	
	.second-nav .item span {
		font-size: 15px;
	}
	
	.shijiContainer {
		width: 100%;
		/*margin-top: 30px;*/
	}
	
	.shijiContainer .buy {
		margin-top: 20px;
		display: flex;
	}
	
	.shijiContainer .buy h1 {
		flex: 1;
		margin-left: 20px;
	}
	
	.shijiContainer .buy a {
		text-decoration: none;
		color: #f10000a8;
		font: bold;
		font-size: 13px;
		float: right;
		width: 100px;
		line-height: 31px;
	}
	
	.shijiContainer .buyP {
		margin: 5px 0 20px 20px;
		font-size: 16px;
		color: #BEBEBE;
		font: bold;
	}
	
	.shijiContainer .buyCon {
		width: 100%;
		height: 100%;
	}
	
	.shijiContainer .buyCon .mesgList {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	
	.shijiContainer .buyCon .mesgItem {
		height: 80px;
		width: 100%;
		margin-bottom: 5px;
		
	}
	
	.shijiContainer .buyCon .mesgItem:nth-last-child(1) {
		margin-bottom: 20px;
	}
	
	.shijiContainer .buyCon .mesgLink {
		display: flex;
		height: 80px;
	}
	
	/*.shijiContainer .buyCon .mesgItem a {
		text-decoration: none;
	}
	*/
	.shijiContainer .buyCon .mesgLink .buyTp {
		width: 90px;
		height: 80px;
	}
	.shijiContainer .buyCon .mesgLink .buyTp img{
		margin-left: 5px;
	}
	.shijiContainer .buyCon .mesgLink .buyCart {
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		background: #FFFFFF;
		margin-right: 5px;
	}
	
	.shijiContainer .buyCon .buyCart i {
		font-size: 40px;
	}
	
	.shijiContainer .buyCon .mesgLink .buyTitle {
		flex: 1;
		margin: 10px 0 0 10px;
		color: #333333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.shijiContainer .buyCon .buyTitle span {
		font-size: 16px;
	}
	
	.shijiContainer .buyCon .buyTitle .price {
		font-size: 13px;
		color: #F10000;
		margin-top: 5px;
	}
	
	.shijiContainer .buyCon .buyTitle s {
		float: left;
	}
	
	
</style>