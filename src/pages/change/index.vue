<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a href="http://localhost:8080/#/my">
					<i class="iconfont icon-arrow-lift"></i>
				</a>
			</div>
			<div class="center">
				编辑个人资料
			</div>
			<div class="right">
				<a href="#">
					保存
				</a>
			</div>
		</div>
		<div class="changeContainer">
			<div class="changeTx">
				<a href="#">
					<img src="../../assets/images/tx6.jpg" width="70" height="70" />
				</a>
				<p><input type="file" class="key"></p>
			</div>
			<ul class="list">
				<li class="item">
					<div class="left">
						用户名：
					</div>
					<div class="right">
						<input type="text" class="key" />
					</div>
				</li>
				<li class="item">
					<div class="left">
						手机号：
					</div>
					<div class="right">
						<input type="number" class="key" />
					</div>
				</li>
				<li class="item">
					<div class="left">
						Email：
					</div>
					<div class="right">
						<input type="email" class="key" />
					</div>
				</li>
				<li class="item">
					<div class="left">
						生日：
					</div>
					<div class="right">
						<input type="date" class="key"/>
					</div>
				</li>
			</ul>
		</div>
		 
	</div>
</template>

<script>
	export default {
		name:'index'
	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		height: 50px;
		display: flex;
		font-size: 18px;
	}
	
	.navbar i {
		font-size: 30px;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.navbar a {
		text-decoration: none;
	}
	
	.navbar .right {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.navbar .right a {
		color: #FF6600;
	}
	
	.navbar .center {
		flex: 1;
		text-align: center;
		line-height: 50px;
	}
	
	.changeContainer {
		width: 100%;
		height: 100%;
	}
	
	.changeContainer .changeTx {
		width: 100%;
		height: 180px;
		text-align: center;
	}
	
	.changeContainer .changeTx img {
		margin-top: 50px;
		border-radius: 50%;
	}
	
	.changeContainer .changeTx p {
		margin-top: 20px;
		font-size: 15px;
		margin-left: 170px;
	}
	
	.changeContainer .list {
		margin: 10px;
	}
	
	.changeContainer .item {
		margin: 10px;
		display: flex;
		height: 50px;
		line-height: 50px;
		font-size: 17px;
		border-bottom: 1px solid #DCDCDC;
	}
	.changeContainer .item .left{
		margin:0 5px;
		width: 80px;
	}
	.changeContainer .item .right{
		margin-left: 5px;
	}
	.changeContainer .item .right .key{
		height: 30px;
		outline: none;
  	    border: 0px;
  	    font-size: 17px;
	}
</style>