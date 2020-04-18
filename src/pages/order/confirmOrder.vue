<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">确认订单</div>
		</div>
		<div class="my-address" @click="toAdressInfo()">
			<router-link to="/address">
				<div class="left"><i class="iconfont icon-dingwei"></i></div>
				<div class="center">{{addressInfo}}</div>
				<div class="right"><i class="iconfont icon-arrow-right"></i></div>
			</router-link>
		</div>
		<div class="goodsDetail">
			<div class="title">
				<i class="iconfont icon-store"></i>
				<span>懒人厨房精选</span>
			</div>
			<div class="goods" v-for="(item,key) in orderGoodList" :key="key">
				<div class="goodsImage">
					<img v-lazy="`http://localhost:3000/${item.goods_img.split(',')[0]}`" width="70" height="70">
				</div>
				<div class="goodsTitle">
					{{item.title}}
				</div>
				<div class="price">
					<p>￥{{item.market_price}}</p>
					<p class="count">x{{item.num}}</p>
				</div>
			</div>
		</div>
		<div class="freight">
			<span class="price">运费：</span>
			<span>包邮</span>
		</div>
		<div class="freight">
			<span class="price">合计：</span>
			<span>￥{{totalPrice}}</span>
		</div>
		<div class="message">
			<input type="text" placeholder="请备注..." class="key" />
		</div>
		<div class="integral">
			<i class="iconfont icon-lihe"></i>
			<span>懒人积分</span>
			<i class="iconfont icon-arrow-right"></i>
		</div>
		<div class="my-pay">
			<p>支付方式</p>
			<div class="pay">
				<i class="iconfont icon-icon_alipay_line"></i>
				<p>支付宝</p>
			</div>
		</div>
		<div class="tabbar">
			<span class="price">实付款: ￥{{totalPrice}}</span>
			<span class="pay" @click="createOrder">付款</span>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from "mint-ui";
	export default {
		name: 'confirmOrder',
		data() {
			return {
				orderGoodList: [],
				totalPrice: 0,
				addressInfo: ''
			}
		},
		methods: {
			goback() {
				this.$router.push('/cart');
			},
			total() {
				var totalPrice = 0;
				for(var i = 0; i < this.orderGoodList.length; i++) {
					var itemPrice =
						parseInt(this.orderGoodList[i].num) *
						this.orderGoodList[i].market_price;
					totalPrice += itemPrice;
				}
				this.totalPrice = totalPrice;
				console.log(this.totalPrice);
			},
			toAdressInfo() {
				this.$router.push('/addressList');
			},
			getAddress() {
				//this.$axios.defaults.baseURL = "http://localhost:8080";
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录!").then(action => {
						this.$router.push("/login");
					});
				} else {
					var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
				}
				this.$axios
					.get("http://localhost:3000/address/default/" + userId)
					.then(res => {
						console.log(res.data.data);
						if(res.data.data) {
							this.addressInfo =
								"收件人:" + res.data.data.name + ",电话:" + res.data.data.phone;
							this.addressId = res.data.data._id;
						} else {
							this.addressInfo = "你当前没地址信息请创建地址";
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			createOrder() {
				var addGoodList =
					JSON.parse(window.localStorage.getItem("addGoods")) || [];
				var orderGoodList = this.orderGoodList;

				if(addGoodList != 0) {
					var itemStr = "";
					var remark = "";
					for(var i = 0; i < orderGoodList.length; i++) {
						var itemId = orderGoodList[i]._id;
						var itemCounts = orderGoodList[i].num;
						var singleItem = itemId + "|" + itemCounts + ",";
						itemStr += singleItem;
					}

					if(!window.localStorage.getItem("userinfo")) {
						MessageBox.alert("您尚未登录!").then(action => {
							this.$router.push("/login");
						});
					} else {
						var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
					}
					this.$axios({
							method: "post",
							url: "http://localhost:3000/order/createOrder",
							headers: {
								"content-type": "application/json;charset=UTF-8"
							},
							params: {
								itemStr: itemStr,
								userId: userId,
								addressId: this.addressId
							},
							dataType: "json"
						})
						.then(res => {
							// 订单号， 将来 支付拉取支付是传的值
							if(res.data.success) {
								let orderId = res.data.data;
								//MessageBox.alert("支付成功").then(action => {
								for(var i = 0; i < orderGoodList.length; i++) {
									var itemId = orderGoodList[i]._id;
									for(var j = 0; j < addGoodList.length; j++) {
										if(itemId == addGoodList[j].id) {
											addGoodList.splice(j, 1);
										}
									}
								}
								window.localStorage.setItem(
									"addGoods",
									JSON.stringify(addGoodList)
								);
								this.$router.push({
									name: "payment",
									query: {
										orderId: orderId
									}
								});
								//});
							} else {
								MessageBox.alert("支付失败");
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			}

		},
		mounted() {
			this.getAddress();
			this.orderGoodList = JSON.parse(
				window.localStorage.getItem("orderGoodList")
			);
			console.log(this.orderGoodList);
			this.total();
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
	
	.my-address {
		width: 100%;
		height: 50px;
	}
	
	.my-address a {
		display: flex;
		background: #ccebd1a3;
	}
	
	.my-address i {
		font-size: 20px;
		color: #000000;
	}
	
	.my-address .left {
		width: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.my-address .right {
		width: 50px;
		text-align: center;
		float: right;
		line-height: 50px;
	}
	
	.my-address .center {
		flex: 1;
		font-size: 16px;
		margin-top: 12px;
		color: #000000;
	}
	
	.goodsDetail {
		margin: 10px 10px 0 10px;
		border-bottom: 1px solid #cccccc59;
	}
	
	.goodsDetail .title {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #cccccc59;
	}
	
	.goodsDetail .title i {
		font-size: 20px;
		margin-left: 7px;
	}
	
	.goodsDetail .title span {
		margin-left: 10px;
		font-size: 16px;
	}
	
	.goodsDetail .goods {
		display: flex;
		height: 90px;
	}
	
	.goodsDetail .goods .goodsImage {
		width: 70px;
		line-height: 70px;
		margin: 10px 0 10px 0;
	}
	
	.goodsDetail .goods .goodsImage img {
		border-radius: 5px;
	}
	
	.goodsDetail .goods .goodsTitle {
		height: 40px;
		flex: 1;
		font-size: 16px;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		text-overflow: ellipsis;
		margin: 20px 0 0 10px;
	}
	
	.goodsDetail .goods .price {
		width: 30px;
		text-align: center;
		font-size: 15px;
		margin-top: 20px;
		margin-left: 40px;
	}
	
	.goodsDetail .goods .price p {
		float: right;
	}
	
	.goodsDetail .goods .price .count {
		color: #808080e8;
		margin-top: 7px;
	}
	
	.freight {
		margin: 0 10px 10px 10px;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		border-bottom: 1px solid #cccccc59;
		display: flex;
	}
	
	.freight .price {
		width: 90%;
	}
	
	.message {
		margin: 15px 10px 10px 10px;
		height: 50px;
	}
	
	.message .key {
		line-height: 50px;
		width: 100%;
		outline: none;
		height: 50px;
		border: 0px;
		background: #EEEEEE;
		font-size: 15px;
		padding-left: 5px;
		border-radius: 5px;
	}
	
	.integral {
		display: flex;
		height: 70px;
		line-height: 70px;
	}
	
	.integral i {
		font-size: 25px;
		width: 12%;
		text-align: center;
	}
	
	.integral span {
		font-size: 16px;
		flex: 1;
	}
	
	.my-pay {
		margin: 10px;
	}
	
	.my-pay p {
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.my-pay .pay {
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		margin-top: 20px;
		display: flex;
		margin-bottom: 70px;
	}
	
	.my-pay .pay i {
		font-size: 50px;
		margin-right: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		width: 50px;
		background: #00B7FF;
	}
	
	.my-pay .pay p {
		line-height: 50px;
	}
	
	.tabbar {
		background: #FFFFFF;
		height: 70px;
		line-height: 70px;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		margin: 0 10px 0 10px;
	}
	
	.tabbar .price {
		width: 80%;
		font-size: 17px;
		color: #F23030;
	}
	
	.tabbar .pay {
		flex: 1;
		text-align: center;
		margin-right: 20px;
		height: 50px;
		line-height: 50px;
		margin-top: 10px;
		border-radius: 4px;
		background: #F23030;
		font-size: 17px;
		color: #FFFFFF;
	}
</style>