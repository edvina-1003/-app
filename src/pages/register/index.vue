<template>
		<div>
			<div class="navbar">
			   <p><a href="index.vue">取消</a></p>
		    </div>
		<div class="regContainer">
			<img src="../../assets/images/bg.jpg" width="100%" />
			<router-link to="/login" class="itemNum">
				<button><h2>手机号登录</h2></button>
			</router-link>
			<!--<router-link to class="itemWe">
				<button><h2>使用微信登录</h2></button>
			</router-link>-->
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	
	.navbar{
		color: #F10000;
		font-size: 21px;
		width: 100%;
		height: 60px;
	}
	.navbar p a{
		text-decoration: none;
		color: #FF6600;
	}
	.navbar p{
		line-height: 60px;
		margin-left: 25px;
		font: bold;
	}
	.regContainer{
		width: 100%;
		height: 676px;
		text-align: center;
		background: #f46a46;
	}
	.regContainer .itemNum button{
		background-color: #f46a46; /* Green */
	    border: none;
	    color: white;
	    margin-top: 150px;
	    padding: 1px 32px;
	    text-align: center;
	    text-decoration: none;
	    display: inline-block;
	    font-size: 16px;
		border-radius: 8px;
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
	}
	.regContainer .itemNum button h2{
		color: #FFFFFF;
		margin: 14px 0;
	}
	.regContainer .itemWe button{
		margin-top: 30px;
		width: 350px;
		height: 55px;
		background: #43b12fad;
		outline: none;
		border-radius: 6px;
	}
	.regContainer .itemWe button h2{
		color: #FFFFFF;
		margin: 14px 0;
	}
</style>