<!--登录页-->
<template>
	<div>
		<div class="navbar">
			<div class="left">
				<i class="iconfont icon-arrow-lift" @click="goback"></i>
			</div>
			<div class="right">
				用户登录
			</div>
		</div>
		<main class="user_login_box">
			<div class="login_dialog" id="login">
				<div class="_username">
					<p>手机号：</p>
					<input type="text" placeholder="请输入手机号" class="user_input" v-model="phone" id="phone">
				</div>
				<div class="_username u_passwd">
					<p>密码：</p>
					<input type="password" placeholder="请输入密码" class="user_input" v-model="code" id="code">
				</div>

				<div class="login_box">
					<a @click="login()" class="btn_login">登录</a>
				</div>
				<div class="go_reg_box">
					<div>未注册直接输入账号密码，自动注册！</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import { MessageBox } from "mint-ui";
	import navBar from "@/components/navBar";
	export default {
		components: {
			navBar
		},
		data() {
			return {
				phone: "", //手机
				code: "" //验证码
			};
		},
		methods: {
			goback() {
				return this.$router.push("/home");
			},
			testPhone(phone) {
				return /^1[1|3|4|5|7|8][0-9]{9}$/.test(phone);
			},
			login() {
				if(
					this.phone.length == 11 &&
					this.code.length >= 6 &&
					this.testPhone(this.phone)
				) {
					//this.$axios.defaults.withCredentials=true;
					this.$axios({
							method: "post",
							url: "http://localhost:3000/dologin",
							data: {
								username: this.phone,
								password: this.code
							},
							withCredentials: true,
							dataType: "json"
						})
						.then(res => {
							if(res.data.success) {
								localStorage.setItem("userinfo", JSON.stringify(res.data.userinfo));
								MessageBox.alert("登录成功!").then(action => {
									this.$router.go(-1);
								});
							}
						})
						.catch(e => {
							console.log(e);
						});
				} else {
					MessageBox.alert("手机号或验证输入错误！").then(action => {
						this.phone = "";
						this.code = "";
					});
				}
			}
		}
	};
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
	
	.user_login_box {
		max-width: 640px;
		min-width: 300px;
		margin: 0 auto;
		height: 200px;
		padding-top: 100px;
	}
	
	.user_login_box .login_dialog {
		width: 100%;
		height: 100%;
	}
	
	.login_dialog ._username {
		/*width: 100%;*/
		height: 50px;
		background-color: #fff;
		margin-top: 20px;
		border-radius: 3px;
		display: flex;
		margin-bottom: 30px;
	}
	
	.login_dialog ._username p {
		width: 80px;
		line-height: 50px;
		font-size: 16px;
		margin-left: 10px;
		
	}
	
	._username .user_input {
		flex: 1;
		height: 100%;
		font-size: 16px;
		margin-right: 10px;
		border-radius: 5px;
		outline: none;
	}
	
	.login_dialog .u_passwd {
		margin-top: 10px;
	}
	
	.login_dialog .login_box {
		height: 50px;
		width: 70%;
		background-color: #f23030;
		border-radius: 4px;
		margin-top: 80px;
		background: #f46a46;
		text-align: center;
		margin-left: 65px;
	}
	
	.login_box a {
		display: block;
		width: 100%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		color: #fff;
		font-size: 17px;
	}
	
	.go_reg_box {
		float: right;
		margin-top: 10px;
	}
	
	.go_reg_box span {
		display: inline-block;
		color: #aaa;
		height: 20px;
		line-height: 20px;
		margin-top: 20px;
	}
</style>