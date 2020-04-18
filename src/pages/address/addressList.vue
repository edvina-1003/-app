<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">
				<h2>选择收货地址</h2></div>
		</div>
		<div class="chooseAddress">
			<ul>
				<li class="item" v-for="(item,index) in addressList" :key="index" @click="setDefault(item)">
					<div class="message">
						<div class="left">
							<i class="iconfont" :class="item.default_address?'icon-yigouxuan':'icon-weigouxuanv2'"></i>
						</div>
						<div class="right">
							<div class="my-name">
								<span class="name">
									{{item.name}}
								</span>
								<span class="phone">
									{{item.phone}}
								</span>
							</div>
							<div class="my-address">
								{{item.province+','+item.city+','+item.district}}
							</div>
						</div>
					</div>
					<div class="change">
						<span @click.stop="delAdd(item)" class="delete">删除</span>
						<span @click.stop="editAdd(item)" class="edit">编辑</span>
					</div>
				</li>
			</ul>

		</div>
		<mt-button type="danger" size="normal" class="addAddress" @click="goAdd">添加地址</mt-button>
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	export default {
		name: 'addressList',
		data() {
			return {
				addressList: []
			};
		},
		methods: {
			goback() {
				// 返回历史对象window.history.go(-1)的上一页
				this.$router.push("/confirmOrder");
			},
			getAddress() {
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录!").then(action => {
						this.$router.push("/login");
					});
				} else {
					var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
				}
				this.$axios
					.get("http://localhost:3000/address/addressList/" + userId)
					.then(res => {
						console.log(res.data.data);
						this.addressList = res.data.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			goAdd() {
				this.$router.push("/addAddress");
			},
			delAdd(item) {
				MessageBox({
					title: "温馨提示",
					message: "您确定要删除选中产品吗？",
					showCancelButton: true
				}).then(type => {
					if(type == "confirm") {
						let addressId = item._id;
						this.$axios
							.get("http://localhost:3000/address/delete/" + addressId)
							.then(res => {
								console.log(res.data.data);
							})
							.catch(err => {
								console.log(err);
							});
						location.reload();
					}
				});
			},
			setDefault(item) {
				let addressId = item._id; // 对应地址编号
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录!").then(action => {
						this.$router.push("/login");
					});
				} else {
					var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
				}
				this.$axios({
						method: "get",
						url: "http://localhost:3000/address/setDefault",
						headers: {
							"content-type": "application/json;charset=UTF-8"
						},
						params: {
							userId: userId, // 用户编号
							addressId: addressId // 地址编号
						},
						dataType: "json"
					})
					.then(res => {
						console.log(res.data);
					})
					.catch(err => {
						console.log(err);
					});
				location.reload();
			},
			editAdd(item) {
				console.log(item);
				this.$router.push({
					name: "addAddress",
					query: {
						id: item._id
					}
				});
			}

		},

		created() {
			this.getAddress()
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
		padding-right: 35px;
	}
	
	.chooseAddress {
		margin: 10px;
	}
	
	.chooseAddress .item {
		width: 100%;
		height: 100px;
	}
	
	.chooseAddress .item .message {
		width: 100%;
		height: 70px;
		display: flex;
		border-bottom: 1px solid #DCDCDC;
	}
	
	.chooseAddress .item .message .left {
		width: 50px;
		height: 70px;
		text-align: center;
		line-height: 70px;
	}
	
	.chooseAddress .item .right {
		flex: 1;
		margin-top: 10px;
		margin-left: 10px;
	}
	
	.chooseAddress .item .right .my-name {
		font-size: 15px;
		margin-bottom: 5px;
	}
	
	.chooseAddress .item .right .my-address {
		font-size: 14px;
		height: 38px;
	}
	
	.chooseAddress .item .change {
		margin-top: 10px;
	}
	
	.chooseAddress .item .change span {
		float: right;
		margin: 0 15px;
		font-size: 13px;
		color: #8C8C8C;
	}
	
	.addAddress {
		width: 200px;
		height: 40px;
		margin-left: 107px;
		margin-top: 50px;
	}
</style>