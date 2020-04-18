<template>
	<div class="navbar">
		<!--插槽-->
		<div class="left">
			<slot name="left">
				<a href="http://localhost:8080/#/register">
					<i class="iconfont icon-add-select"></i>
				</a>
			</slot>
		</div>
		<div class="center">
			<slot name="center">
				<a><i class="iconfont icon-search"></i></a>
			    <input type="text" class="key" placeholder="搜索菜谱、食材" @click="goToSearch"/>
				<a href="#"><i class="iconfont icon-icon_send"></i></a>
			</slot>
		</div>
		<div class="right">
			<slot name="right">
				<a href="#">
					<i class="iconfont icon-lingdang"></i>
				</a>
			</slot>
		</div>
	</div>
</template>
<script>
	export default{
		name:'navBar',
		methods:{
			goToSearch(){
				this.$router.push('/searchMenu');
			}
		}
	}
</script>
<style scoped>
  .navbar{
  	margin-top: 5px;
  	width: 100%;
  	height: 50px;
  	display: flex;
  	position: fixed;
  	top: 0;
  	background: #ffffff6b;
  }
  .navbar .left{
  	width: 50px;
  	height: 50px;
  	text-align: center;
  	line-height: 50px;
  }
  .navbar .right{
  	width: 50px;
  	height: 50px;
  	text-align: center;
  	line-height: 50px;
  }
  .navbar .right i{
  	font-size: 18px;
  }
  .navbar .left a{
  	text-decoration: none;
  }
  .navbar .left i{
  	font-size: 28px;
  }
  .navbar .center{
  	flex: 1;
  	display: flex;
  	line-height: 50px;
  	background: #EEEEEE;
  }
  .navbar .center a{
  	text-decoration: none;
  	width: 50px;
  	text-align: center;
  }
  .navbar .center i{
  	font-size: 18px;
  }
  .navbar .center .iconfont{
  	text-align: center;
  }
  .navbar .center .iconfont{
  	width: 50px;
  	height: 50px;
  }
  .navbar .center .key{
  	flex: 1;
  	height: 30px;
  	margin: 9px 0;
  	outline: none;
  	border: 0px;
  	background: #EEEEEE;
  }
</style>