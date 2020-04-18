<template>
	<div>
		<div class="tabbar">
			<div class="goodsComment">
				<a href="#">
					<i class="iconfont icon-comments"></i>
				</a>
				<a href="#">
					<i class="iconfont icon-cart-Empty"></i>
				</a>
			</div>
			
			<div class="goodsCart" @click="addCart">
				加入购物车
			</div>
			<div class="goodsBuy">
				立即购买
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'tabBar1',
		data(){
			return{
				addGoods:[],//本地存储中获得的商品数据
				productOne:[]
			}
		},
		methods:{
			addCart(key){
			//添加到购物车
			//获得本地存储
			this.addGoods = JSON.parse(localStorage.getItem('addGoods')) || [];
			console.log(this.addGoods);
			for(key in this.addGoods){
				let item = this.addGoods[key];
				if (item.id==productOne.id) {
					let newAddGoodOne ={
						id:item.id,
						num:item.num+1
					}
					this.addGoods.splice(key,1);
					this.addGoods.push(newAddGoodOne);
				}else{
					//添加商品
					let newAddGoodOne ={
						id:productOne.id,
						num:1
					}
					this.addGoods.push(newAddGoodOne);
				}
			}
			
		}
		
	}
</script>

<style scoped>
	.tabbar{
		width: 100%;
		display: flex;
		bottom: 0;
		position: fixed;
		height: 60px;
	}
	.tabbar .goodsComment{
		width: 33%;
		display: flex;
		text-align: center;
		line-height: 60px;
		background: #ffffffe0;
	}
	.tabbar .goodsComment a{
		width: 50%;
	}
	.tabbar .goodsComment .iconfont{
		font-size: 30px;
		color: #000000;
	}
	.tabbar .goodsCart{
		text-align: center;
		line-height: 60px;
		font-size: 18px;
		width: 34%;
		background: #EC971F;
		color: #FFFFFF;
	}
	
	
	.tabbar .goodsBuy .iconfont{
		font-size: 30px;
	}
	.tabbar .goodsBuy{
		text-align: center;
		line-height: 60px;
		font-size: 18px;
		width: 33%;
		background: #D9534F;
		color: #FFFFFF;
	}
</style>