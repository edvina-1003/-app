<template>
	<div class="navbar">
		<div class="left">
			<slot name="left">
				<a href="#">
					<i class="iconfont icon-dingwei"></i>
				</a>
			</slot>
		</div>
		<div class="center">
			<slot name="center">
				<a href="#"><i class="iconfont icon-search"></i></a>
				<input type="text" class="key" placeholder="搜索商品" @click="goToSearch"/>
				<a href="#"><i class="iconfont icon-icon_send"></i></a>
			</slot>
		</div>
		<div class="right">
			<slot name="right">
				<router-link to="/cart">
					<i class="iconfont icon-cart-Empty"></i>
					<span><mt-badge size="small" color="#f00">{{pickNum}}</mt-badge></span>
				</router-link>
			</slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:'navBar1',
		computed:{
			pickNum(){
				return this.$store.getters.getShopNum 
			}
		},
		methods:{
			goToSearch(){
				this.$router.push('/search');
			}
		}
	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		height: 50px;
		margin-top: 5px;
		display: flex;
		top: 0;
		background: #FFFFFF;
		position: fixed;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.navbar .right {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.navbar .right i {
		font-size: 18px;
	}
	
	.navbar .left a {
		text-decoration: none;
	}
	
	.navbar .left i {
		font-size: 28px;
	}
	
	.navbar .center {
		flex: 1;
		display: flex;
		line-height: 50px;
		background: #EEEEEE;
	}
	
	.navbar .center a {
		text-decoration: none;
		width: 50px;
		text-align: center;
	}
	
	.navbar .center i {
		font-size: 18px;
	}
	
	.navbar .center .iconfont {
		width: 50px;
		height: 50px;
	}
	
	.navbar .center .key {
		flex: 1;
		height: 30px;
		margin: 9px 0;
		outline: none;
		border: 0px;
		background: #EEEEEE;
	}
	
	.navbar .right {
		width: 70px;
		height: 50px;
	}
	.navbar .right span{
		height: 13px;
		line-height: 13px;
		text-align: center;
	}
	.navbar .right i {
		font-size: 30px;
	}

</style>