<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">我的订单</div>
		</div>
		<div class="order-tab">
			<div class="every-status" @click="queryOrder(0,0)" :class="orderIndex==0?'active':''">
				<div>全 部</div>
			</div>

			<div class="every-status" @click="queryOrder(1,10)" :class="orderIndex==1?'active':''">
				<div>待付款</div>
			</div>

			<div class="every-status" @click="queryOrder(2,20)" :class="orderIndex==2?'active':''">
				<div>待收货</div>
			</div>

			<div class="every-status" @click="queryOrder(3,40)" :class="orderIndex==3?'active':''">
				<div>已完成</div>
			</div>

			<div class="every-status" @click="queryOrder(4,50)" :class="orderIndex==4?'active':''">
				<div>已取消</div>
			</div>
		</div>
		<div class="orders" v-for="(order,key) in orderList" :key="key">
			<div class="orders-item">
				<div class="store">
					<div class="iconfont">
						<i class="iconfont icon-store"></i>
					</div>
					<span>懒人厨房精选</span>
					<div class="status">
						{{status[order.order_status]}}
					</div>
				</div>
				<div class="goods" v-for="(item,key) in order.itemList" :key="key">
					<div class="goodsImage">
						<img :src="`http://localhost:3000/${item.product_img}`" width="70" height="70" />
					</div>
					<div class="center">
						{{item.product_title}}
					</div>
					<div class="right">
						<div class="price">
							￥{{item.product_price}}
						</div>
						</br>
						<div class="number">
							x {{item.product_num}}
						</div>
					</div>
				</div>
				<div class="total">
					<p>实付款：￥{{order.all_price}}</p>
				</div>
				<div class="goPay">
					<div v-if="order.status == 40">
						<div class="buy-delete">
							删除订单
						</div>
					</div>
					<div v-if="order.status == 20">
						<div class="buy-pay" @click="conformOrder(order.id)">
							确认收货
						</div>
					</div>
					<div v-if="order.status == 10">
						<div class="buy-cancel" @click="cancelOrder(order.id)">
							取消订单
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'orderList',
		data() {
			return {
				userId: "",
				user: "",
				userLogin: false,
				orderIndex: 0,
				orderList: [],
				status: {
					10: '待付款',
					20: '待收货',
					40: '交易完成',
					50: '已取消'
				}
			}
		},
		methods: {
			goback() {
				this.$router.go(-1);
			},
			queryOrder(index, status) {
				this.orderIndex = index;
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录!").then(action => {
						this.$router.push("/login");
					});
				} else {
					this.userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
				}
				this.$axios
					.get(
						"http://localhost:3000/order/queryAllOrders?userId=" +
						this.userId +
						"&orderStatus=" +
						status
					)
					.then(res => {
						this.orderList = res.data.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			getAllOrder() {
				if(!window.localStorage.getItem("userinfo")) {
					this.orderList = [];
				} else {
					this.userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
					this.$axios
						.get(
							"http://localhost:3000/order/queryAllOrders?userId=" +
							this.userId +
							"&orderStatus=0"
						)
						.then(res => {
							console.log(res.data.data);
							this.orderList = res.data.data;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			conformOrder(orderid) {
				//this.$axios.defaults.baseURL = "http://localhost:8080";
				this.$axios
					.post(
						"https://www.imoocdsp.com/order/changeToFinished?orderId=" + orderid
					)
					.then(res => {
						if(res.data.status == 200) {
							location.reload();
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			cancelOrder(orderid) {

				//this.$axios.defaults.baseURL = "http://localhost:8080";
				this.$axios
					.post(
						"https://www.imoocdsp.com/order/changeToCanceled?orderId=" + orderid
					)
					.then(res => {
						if(res.data.status == 200) {
							location.reload();
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			goback() {
				// 返回历史对象window.history.go(-1)的上一页
				this.$router.go(-1);
			},
			load() {
				this.user = JSON.parse(localStorage.getItem("userinfo"))[0].phone;
				console.log(this.user);
				if(this.user) {
					this.userLogin = true;
				} else {
					this.userLogin = false;
				}
			},
			login() {
				return this.$router.push("/login");
			},
			logout() {
				this.$axios
					.get("http://localhost:3000/loginOut", {
						withCredentials: true
					})
					.then(res => {
						localStorage.removeItem("userinfo");
					})
					.catch(e => {
						console.log(e);
					});
				location.reload();
			}
		},
		mounted() {
			this.load();
			this.getAllOrder();
		}
	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
		position: fixed;
		top: 0;
		background: #FFFFFF;
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
	
	.order-tab {
		width: 100%;
		display: flex;
		margin-top: 70px;
	}
	
	.order-tab .every-status {
		width: 20%;
		text-align: center;
		font-size: 15px;
	}
	
	.orders {
		margin-top: 20px;
	}
	
	.orders .orders-item {
		margin: 0 10px;
	}
	
	.orders .orders-item .store {
		width: 100%;
		height: 50px;
		display: flex;
		border-bottom: 1px solid #c0c0c08c;
	}
	
	.orders .orders-item .store .iconfont {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 17px;
	}
	
	.orders .orders-item .store .status {
		width: 80px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 15px;
		color: #F10000;
	}
	
	.orders .orders-item .store span {
		flex: 1;
		line-height: 50px;
		font-size: 16px;
	}
	
	.orders .orders-item .goods {
		width: 100%;
		height: 100px;
		display: flex;
		border-bottom: 1px solid #c0c0c08c;
	}
	
	.orders .orders-item .goods .goodsImage {
		width: 70px;
		line-height: 100px;
		margin-top: 15px;
	}
	
	.orders .orders-item .goods .center {
		margin-left: 10px;
		flex: 1;
		margin-top: 20px;
		font-size: 16px;
		margin-right: 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-bottom: 10px;
		height: 45px;
	}
	
	.orders .orders-item .goods .right {
		width: 70px;
		margin-top: 20px;
		line-height: 20px;
		margin-left: 10px;
		font-size: 15px;
	}
	
	.orders .orders-item .goods .right .price {
		float: right;
	}
	
	.orders .orders-item .goods .right .number {
		float: right;
	}
	
	.orders .orders-item .total {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		border-bottom: 1px solid #c0c0c08c;
	}
	
	.orders .orders-item .total p {
		float: right;
	}
	
	.orders .orders-item .goPay {
		height: 50px;
		width: 100%;
		font-size: 15px;
		margin-top: 20px;
	}
	
	.orders .orders-item .goPay .buy-delete {
		float: right;
		width: 90px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #8C8C8C;
		border-radius: 5px;
		color: #8C8C8C;
	}
	
	.orders .orders-item .goPay .buy-pay {
		float: right;
		width: 90px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #F10000;
		border-radius: 5px;
		color: #FFFFFF;
		background: #F10000;
	}
	
	.orders .orders-item .goPay .buy-cancel {
		float: right;
		width: 90px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #F10000;
		border-radius: 5px;
		color: #F10000;
	}
</style>