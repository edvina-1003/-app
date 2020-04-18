<template>
	<div>
		<div class="navbar">
			<div class="left">
				<i class="iconfont icon-arrow-lift" @click="goback"></i>
			</div>
			<div class="right">
				上传
			</div>
		</div>
		<div class="title">
			<img src="../../assets/images/logo.png" />
		</div>
		<div class="send">
			<router-link to="/menuSend">
				<div class="menuSend">
					<div class="mup">
						<i class="iconfont icon-camera"></i>
					</div>
					<div class="con1"></div>
					<div class="con2"></div>
					<p>创建食谱</p>
			    </div>
			</router-link>
			
			<router-link to="/workSend">
				<div class="workSend">
					<div class="wup">
						<i class="iconfont icon-camera"></i>
					</div>
					<div class="con3"></div>
					<div class="con4"></div>
					<p>上传作品</p>
			    </div>
			</router-link>
			
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'send',
		data(){
			return{
				
			}
		},
		methods:{
			goback(){
					this.$router.go(-1);
				}
		}
	}
</script>

<style scoped>
    .navbar {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	
	.navbar .left .iconfont {
		font-size: 24px;
	}
	
	.navbar .right {
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding-right: 35px;
	}
	.title{
		width: 100%;
		background: #f56946;
	}
	.title img{
		width: 100%;
		height: 139.86px;
	}
	.send{
		text-align: center;
		display: flex;
		justify-content:space-around;
		height: 542px;
		background: #f56946;
	}
	.send .menuSend{
		width: 120px;
		margin-top: 80px;
		height: 220px;
		text-align: center;
		border: 1px solid #FFFFFF;
	}
	.send .menuSend p{
		font-size: 17px;
		color: #FFFFFF;
		margin-top: 3px;
	}
	.send .workSend{
		margin-top: 80px;
		width: 120px;
		height: 220px;
		text-align: center;
		border: 1px solid #FFFFFF;
	}
	.send .workSend p{
		margin-top: 40px;
		font-size: 17px;
		color: #FFFFFF;
	}
	.send .mup{
		height: 100px;
		border-bottom: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
	.send .mup .iconfont{
		line-height: 100px;
		font-size: 28px;
		color: #f56946;
	}
	.send  .con1{
		margin: 20px;
		text-align: center;
		width: 80px;
		height: 40px;
		border: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
	.send  .con2{
		margin: 20px;
		text-align: center;
		width: 80px;
		height: 34px;
		border: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
	
	.send .wup{
		height: 120px;
		margin: 7px;
		border-bottom: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
	.send .wup .iconfont{
		line-height: 80px;
		font-size: 28px;
		color: #f56946;
	}
	.send  .con3{
		margin: 20px 10px;
		text-align: center;
		width: 100px;
		height: 14px;
		border: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
	.send .con4{
		margin: 10px;
		text-align: center;
		width: 60px;
		height: 14px;
		border: 1px solid #ffffffc4;
		background: #ffffffc4;
	}
</style>