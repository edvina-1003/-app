<template>
	<div>
		<p class="buyP">新品好货，超值低级，38元包邮</p>
		<div class="buyCon">
			<ul class="mesgList">
				<li class="mesgItem" v-for="(item,key) in product">
					<div class="mesgLink">
						<router-link :to="'/productDetail/'+item._id" class="link">
							<div class="buyTp">
								<img v-lazy="`http://localhost:3000/${item.goods_img.split(',')[0]}`" width="80" height="80" />
							</div>
							<div class="buyTitle">
								<span>{{item.title}}</span>
								<div class="price">尝鲜价￥{{item.market_price}}</div>
								<s>￥{{item.shop_price}}</s>
							</div>
							<div class="buyCart">
								<a href="#"><i class="iconfont icon-cart-Empty"></i></a>
							</div>
						</router-link>
					</div>

				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'productList1',
		data() {
			return {
				product: []
			}
		},
		methods:{
			getProductList1(){
				this.$jsonp('http://localhost:3000/index/item/is_new')
				.then(res=>{
					this.product = JSON.parse(res).data;
					console.log(this.product);
				})
				.catch(e=>{
					console.log(e);
				})
			}
		},
		mounted(){
			this.getProductList1();
		}
	}
</script>

<style scoped>
	.buyP {
		margin: 5px 0 20px 20px;
		font-size: 16px;
		color: #BEBEBE;
		font: bold;
	}
	
	.buyCon {
		width: 100%;
		height: 100%;
	}
	
	.buyCon .mesgList {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	
	.buyCon .mesgItem {
		height: 80px;
		width: 100%;
		margin-bottom: 5px;
	}
	
	.buyCon .mesgItem:nth-last-child(1) {
		margin-bottom: 20px;
	}
	
	.buyCon .link {
		display: flex;
		height: 80px;
	}
	/*.shijiContainer .buyCon .mesgItem a {
		text-decoration: none;
	}
	*/
	
	.buyCon .link .buyTp {
		width: 90px;
		height: 80px;
	}
	
	.buyCon .link .buyTp img {
		margin-left: 5px;
	}
	
	.buyCon .link .buyCart {
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		background: #FFFFFF;
		margin-right: 5px;
	}
	
	.buyCon .buyCart i {
		font-size: 40px;
	}
	
	.buyCon .link .buyTitle {
		flex: 1;
		margin: 10px 0 0 10px;
		color: #333333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.buyCon .buyTitle span {
		font-size: 16px;
	}
	
	.buyCon .buyTitle .price {
		font-size: 13px;
		color: #F10000;
		margin-top: 5px;
	}
	
	.buyCon .buyTitle s {
		float: left;
	}
</style>