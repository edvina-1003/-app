<template>
	<div class="invitation-content">
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">购物车</div>
		</div>
		<div v-if="!hasProduct" class="no-cart">
			<img src="../../assets/images/tx7.jpg" />
			<p>现在还没有商品哦~<mt-button type="danger" size="large" @click="goshiji" class="goshiji">返回</mt-button></p>
		</div>
		<div v-if="hasProduct" class="has-cart">
			<div class="goodsTitle" @click="chooseA()">
				<div>
					<i class="iconfont" :class="chooseAll?'icon-yigouxuan':'icon-weigouxuanv2'" ></i>
				</div>
				
				<h3>懒人厨房精选</h3>
				<div class="integral" @click="addPop">懒人积分</div>
			</div>
			<ul class="my-addList">
				<li v-for="(shop,key) in shopCart" :key="key">
					<div class="my-checkbox" @click="touchOne(shop)">
						<i class="iconfont" :class="shop.isSelect?'icon-yigouxuan':'icon-weigouxuanv2'"></i>
					</div>
					<div class="product-image">
						<img :src="`http://localhost:3000/${shop.goods_img.split(',')[0]}`" width="100"height="100" />
					</div>
					<div class="product-info">
						<p class="title">{{shop.title}}</p>
						<div class="price">
							<p>￥{{shop.market_price}}</p>
							<div class="productNum">
								<span class="min" @click="min(shop)">-</span>
								<span>{{shop.num}}</span>
								<span class="max" @click="max(shop)">+</span>
					        </div>
						</div>
					</div>
					<!--<mt-popup v-model="popupVisible" position="right" class="mypop">
						
					</mt-popup>-->
					<div class="my-delete" @click="del(shop,key)">
						删除
					</div>
				</li>
			</ul>
			
			<div class="goodsSettlement">
				<div @click="chooseA()">
					<i class="iconfont" :class="chooseAll?'icon-yigouxuan':'icon-weigouxuanv2'" ></i>
				</div>
				
				<div class="goodsSelect">
				    <span>全选</span>
				    <div class="total">
				        <p class="total1">合计：￥{{calc.total}}</p>
				        <p class="total2">不含运费</p>
				    </div>
				</div>
				<div class="settlement" @click="goConfirm">
					结算({{calc.count}})
				</div>
			</div>
			<mt-popup class="mypop" v-model="popupVisible" position="bottom">
				<div class="integralTitle">
					懒人厨房积分兑换
					<span @click="close">X</span>
				</div>
				<div class="exchange">
				    <div v-if="!hasExchange" class="no-exchange"> 
				    	<ul class="integralList">
				    		<li>
				    			<h2>￥5</h2>
						    	<div class="exTitle">
						    		<p>满 50 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="no">领取</div>
				    		</li>
				    		<li>
				    			<h2>￥50</h2>
						    	<div class="exTitle">
						    		<p>满 500 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="no">领取</div>
				    		</li>
				    		<li>
				    			<h2>￥100</h2>
						    	<div class="exTitle">
						    		<p>满 1000 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="no">领取</div>
				    		</li>
				    	</ul>
				    	
				    </div>
				    <div v-if="hasExchange" class="has-exchange"> 
				    	<ul class="integralList">
				    		<li>
				    			<h2>￥5</h2>
						    	<div class="exTitle">
						    		<p>满 50 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="yes">已领取</div>
				    		</li>
				    		<li>
				    			<h2>￥50</h2>
						    	<div class="exTitle">
						    		<p>满 500 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="yes">已领取</div>
				    		</li>
				    		<li>
				    			<h2>￥100</h2>
						    	<div class="exTitle">
						    		<p>满 1000 懒人积分可用</p>
						    		<p>使用日期： 2020.3.24~2021.3.24</p>
						    	</div>
				    	        <div class="yes">已领取</div>
				    		</li>
				    	</ul>
				    	
				    </div>
				</div>
			</mt-popup>
		    
		</div>
	</div>
</template>

<script>
	import GoodTool from '@/assets/js/GoodTool.js';
	import {MessageBox} from 'mint-ui';
	export default{
		name:'cart',
		data(){
			return{
				hasProduct:false,
				popupVisible:false,
				hasExchange:false,
				shopCart:[],
				chooseAll:true,
				orderGoodList:[]
			}
		},
		methods:{
			goback(){
				this.$router.push('/shiji');
			},
			goshiji(){
				this.$router.push("/shiji");
			},
			addPop(){
				this.popupVisible = true;
			},
			close(){
				this.popupVisible = false;
			},
			//单个商品勾选
			touchOne(shop){
				shop.isSelect = !shop.isSelect;
				let selectedCount = 0;
				for (let i=0;i<this.shopCart.length;i++) {
					if (this.shopCart[i].isSelect==true) {
						selectedCount++;
					}
				}
				if (this.shopCart.length==selectedCount) {
					this.chooseAll = true;
				} else{
					this.chooseAll = false;
				}
			},
			chooseA(){
				this.chooseAll = !this.chooseAll;
				for (let i=0;i<this.shopCart.length;i++) {
					let shop = this.shopCart[i];
					shop.isSelect = this.chooseAll;
				}
			},
			getCartProducts(){
				let addGoods = JSON.parse(localStorage.getItem('addGoods')) || [];
				if (addGoods!=0) {
					this.hasProduct = true;
					let itemIds = '';
					for (let i = 0;i<addGoods.length;i++) {
						itemIds += addGoods[i].id+',';
					}
					console.log(itemIds);
					
					this.$axios.get('http://localhost:3000/item/queryItems?itemIds='+itemIds)
					.then(res=>{
						this.shopCart = res.data.data;
						for(let i=0;i<this.shopCart.length;i++){
							let shop = this.shopCart[i];
							let num = GoodTool.getCartNumById(addGoods,shop._id);
							this.$set(shop,'num',num);
							this.$set(shop,'isSelect',true);
							console.log(shop);
						}
					})
					.catch(e=>{
						console.log(e);
					});
				}
				
			},
			//加减商品
			min(shop){
				if (shop.num==1) {
					return false;
				} else{
					shop.num--;
				}
				
				//修改状态管理中的state的num数量
				this.$store.dispatch('addShopNumAction',-1);
				
				
				
				
				let addGoods = [];
				let addGoodOne = null;
				this.shopCart.forEach(shop=>{
					addGoodOne ={
						id:shop._id,
						num:shop.num
					},
					addGoods.push(addGoodOne);
				});
				localStorage.removeItem('addGoods');
				localStorage.setItem('addGoods',JSON.stringify(addGoods));
				
			},
			max(shop){
				shop.num++;
				
				
				
				
				//修改状态管理中的state的num数量
				this.$store.dispatch('addShopNumAction',+1);
				
				let addGoods = [];
				let addGoodOne = null;
				
				
				this.shopCart.forEach(shop=>{
					addGoodOne ={
						id:shop._id,
						num:shop.num
					},
					addGoods.push(addGoodOne);
				});
				localStorage.removeItem('addGoods');
				localStorage.setItem('addGoods',JSON.stringify(addGoods));
			},
			del(shop,index){
				//1.删除shopcart对应商品
				MessageBox.alert('删除成功！').then(action => {
				    this.shopCart.splice(index,1);
					//2.状态管理state中的num值要删除
					let num = shop.num;
					this.$store.dispatch('addShopNumAction',-num);
					//3.修改本地存储对应addGoods商品
					let addGoods = JSON.parse(localStorage.getItem('addGoods')) || [];
					addGoods.splice(index,1);
					localStorage.setItem('addGoods',JSON.stringify(addGoods));
//					this.getCartProducts()
                    location.reload();
				});
			},
			goConfirm(){
				
				if (this.calc.total<=0) {
					MessageBox.alert('请至少选择一件商品');
				}
				else if(!window.localStorage.getItem('userinfo')){
					MessageBox.alert('您尚未登录！').then(action =>{
						this.$router.push('/login');
					});
				}
                  else {
			        // 将预处理订单数据存入到本地缓存中
			        window.localStorage.setItem(
			          "orderGoodList",  
			          JSON.stringify(this.orderGoodList)
			        );
			        // 跳转到确认订单页中
			        this.$router.push("/confirmOrder");
			      }
			}
		},
		mounted(){
			this.getCartProducts();
		},
		computed:{
			//计算属性
			calc(){
				//商品个数
				//总价
				let total = 0;
				let count = 0;
				let orderGoodList=[];
				this.shopCart.forEach(shop=>{
					if (shop.isSelect==true) {
						count += shop.num;
						//单个商品的总价格 =单个商品的价格*数量 shop.pricrDiscount*shop.num
						total += shop.market_price * shop.num;
						//3.构建预处理订单数据对象
						orderGoodList.push(shop);
						this.orderGoodList = orderGoodList;
					}
					
				})
				return{
					count,
					total
				}
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
	.no-cart{
		display: flex;
		flex-direction: column;
	}
	.no-cart img{
		width: 100%;
	}
	.no-cart p{
		margin: 10px 0 10px 0;
		text-align: center;
		font-size: 18px;
		color: #ef4f4fc9;
	}
	.no-cart .goshiji{
		margin-top: 10px;
		text-align: center;
	}
	.has-cart{
		margin: 20px 0 10px 10px;
	}
	.has-cart .goodsTitle{
		display: flex;
	}
	.has-cart .goodsTitle .iconfont{
		width: 5%;
		line-height: 22px;
		text-align: center;
		margin-right: 10px;
		margin-top: 1px;
	}
	.has-cart .goodsTitle h3{
		font-size: 17px;
		margin-bottom: 20px;
		width: 76%;
	}
	.has-cart .goodsTitle .integral{
		color: #FF6600;
		font-size: 16px;
	}
	.has-cart .my-addList{
		width: 100%;
		height: 100%;
		margin-bottom: 70px;
	}
	.has-cart .my-addList li{
		display: flex;
		height: 120px;
		width: 100%;
		margin-bottom: 5px;
	}
	
	.has-cart .my-addList .my-checkbox{
		width: 5%;
		line-height: 120px;
		text-align: center;
	}
	.has-cart .my-addList .product-image{
		text-align: center;
		width: 30%;
	}
	.has-cart .my-addList .product-image img{
		margin-top: 10px;
	}
	.has-cart .my-addList .product-info{
		flex: 1;
		margin-top: 10px;
	}
	.has-cart .my-addList .product-info .title{
		font-size: 17px;
		height: 42px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-bottom: 10px;
	}
	.has-cart .my-addList .product-info .price{
		display: flex;
		margin: 20px 0 20px 0;
		font-size: 17px;
	}
	.has-cart .my-addList .product-info .price p{
		width: 60%;
		color: #FF6600;
	}
	.has-cart .my-addList .productNum{
		flex: 1;
		display: flex;
	}
	.has-cart .my-addList .productNum span{
		width: 33%;
		text-align: center;
		background: #CCCCCC;
		margin-right: 2px;
	}
	.has-cart .my-addList .my-delete{
		width: 15%;
		text-align: center;
		line-height: 100px;
		background: #D9534F;
		font-size: 16px;
		color: #FFFFFF;
		margin: 10px 0 10px 7px;
		border-radius: 7px;
	}
	.has-cart .goodsSettlement{
		position: fixed;
		bottom: 0;
		height: 60px;
		display: flex;
		width: 100%;
	}
	.has-cart .goodsSettlement .iconfont{
		width: 5%;
		line-height: 60px;
		background: #FFFFFF;
	}
	.has-cart .goodsSettlement .goodsSelect{
		display: flex;
		flex: 1;
		background: #FFFFFF;
	}
	.has-cart .goodsSettlement .goodsSelect span{
		flex: 1;
		font-size: 16px;
		line-height: 60px;
		margin-left: 10px;
		
	}
	.has-cart .goodsSettlement .goodsSelect .total{
		width: 30%;
	}
	.has-cart .goodsSettlement .goodsSelect .total1{
		color: #D9534F;
		font-size: 16px;
	}
	.has-cart .goodsSettlement .goodsSelect .total2{
		color: #808080;
		font-size: 14px;
	}
	.has-cart .goodsSettlement .settlement{
		width: 30%;
		line-height: 60px;
		text-align: center;
		font-size: 16px;
		color: #FFFFFF;
		background: #D9534F;
	}
	.has-cart .mypop{
		width: 100%;
		height: 300px;
	}
	.has-cart .mypop .integralTitle{
		width: 95%;
		height: 60px;
		line-height: 60px;
		font-size: 17px;
		margin-left: 10px;
	}
	.has-cart .mypop .integralTitle span{
		float: right;
		color: #B92C28;
		font-size: 19px;
	}
	.has-cart .mypop .exchange{
		display: flex;
		border-top: 1px dashed #c0c0c047;
	}
	.has-cart .mypop .exchange .no-exchange{
		border-top: 1px dashed #c0c0c047;
		color: #F10000;
		width: 100%;
		border-bottom: 1px dashed #c0c0c047;
	}
	.has-cart .mypop .exchange .no-exchange li{
		display: flex;
		border-top: 1px dashed #c0c0c047;
		border-bottom: 1px dashed #c0c0c047;
		
	}
	.has-cart .mypop .exchange .no-exchange li h2{
		width: 70px;
		text-align: center;
		line-height: 70px;
		font-size: 22px;
		margin-right: 5px;
	}
	.has-cart .mypop .exchange .no-exchange li .exTitle{
		flex: 1;
		margin-top: 17px;
		font-size: 15px;
	}
	.has-cart .mypop .exchange .no-exchange li .no{
		width: 70px;
		text-align:center;
		line-height: 70px;
		font-size: 17px;
	}
	.has-cart .mypop .exchange .has-exchange{
		border-top: 1px dashed #FFFFFF;
		color: #FFFFFF;
		width: 100%;
		border-bottom: 1px dashed #FFFFFF;
	}
	.has-cart .mypop .exchange .has-exchange li{
		display: flex;
		border-top: 1px dashed #FFFFFF;
		border-bottom: 1px dashed #FFFFFF;
		background: #F10000;
	}
	.has-cart .mypop .exchange .has-exchange li h2{
		width: 70px;
		text-align: center;
		line-height: 70px;
		font-size: 22px;
		margin-right: 5px;
	}
	.has-cart .mypop .exchange .has-exchange li .exTitle{
		flex: 1;
		margin-top: 17px;
		font-size: 15px;
	}
	.has-cart .mypop .exchange .has-exchange li .yes{
		width: 70px;
		text-align:center;
		line-height: 70px;
		font-size: 17px;
	}
</style>