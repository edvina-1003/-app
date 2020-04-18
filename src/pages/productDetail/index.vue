<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a><i class="iconfont icon-arrow-lift" @click="goback"></i></a>
			</div>
			<div class="right">商品详情页</div>
		</div>
		<swiper :options="options" v-if="ok">
			<swiper-slide v-for="(item,key) in swipers" :key="key">
				<img :src="`http://localhost:3000/${item}`" alt>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>

		</swiper>
		<div class="goodsTitle">
			<div class="bigtitle">
				<h2>{{productOne.title}}</h2>
			</div>
			<div class="smalltitle">
				{{productOne.sub_title}}
			</div>
			<div class="goodsPrice">
				<span class="orgPrice">￥{{productOne.market_price}}</span>
				<span class="disPrice">￥{{productOne.shop_price}}</span>
				<span class="goodsCount">库存:{{productOne.click_count}}</span>
			</div>
			<div class="integral">
				<a href="#">懒人积分</a>
				<span>包邮</span>
			</div>
		</div>
		<div class="goodsComments">
			<ul class="list">
				<li class="item">
					<div class="userTx">
						<a href="#">
							<img src="../../assets/images/tx4.jpg" width="50" height="50" />
						</a>
					</div>
					<div class="right">

						<p class="myName">
							清风拂面
						</p>
						<p class="myComment">
							看上去好好用的样子哦~我也要试试看...
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="goodsDetail">
			<h3>商品详情</h3>
			<div class="item-desc">

				<!--文本描述
					<div v-if="content.contentType==1">
						<div :style="content.cssStyle">
							{{productOne.goods_content}}
						</div>
					</div>-->
				<!--图片描述-->
				<!--<div v-if="content.contentType==2">
						<img :src="content.url" :style="content.cssStyle">
					</div>-->
				<div v-html="productOne.goods_content" ></div>

			</div>
		</div>
		<div class="tabbar">
			<div class="goodsComment">
				<a href="#">
					<i class="iconfont icon-comments"></i>
				</a>
				<router-link to="/cart">
					<i class="iconfont icon-cart-Empty"></i>
				</router-link>
			</div>
			<div class="goodsCart" @click="addPop">
				加入购物车
			</div>
			<div class="goodsBuy" @click="addBuy">
				立即购买
			</div>
		</div>
		<!--下侧弹层-->
		<mt-popup v-model="popupVisible" position="bottom" class="mypop">
			<!--<button @click.stop="addCart">添加商品</button>-->
			<div class="goodsTitle">
				<div class="left">
					<img :src="`http://localhost:3000/${swipers[0]}`" width="60" height="60" />
				</div>
				<div class="right">
					<p class="Title">
						{{productOne.title}}
					</p>
					<p class="price">
						￥{{productOne.market_price}}
					</p>
					<div class="one-choose" v-html="chooseContent"></div>
				</div>
			</div>
			<div class="goodsColor">
				<p>颜色</p>
				<div class="color">
					<div v-for="(item,key) in goodsColor" :key="key" @click="changeCurId(key)" :class="{active:key==curId}">
						{{item}}
					</div>

				</div>
			</div>
			<div class="goodsSize">
				<p>种类</p>
				<div class="size">

					<div v-for="(item,key) in goodsSize" :key="key" @click="changeCurId2(key)" :class="{active:key==curId2}">
						{{item}}
					</div>
				</div>
			</div>
			<div class="goodsCount">
				<span>数量</span>
				<div class="count">
					<span>-</span>
					<span>1</span>
					<span>+</span>
				</div>
			</div>
			<mt-button @click.stop="addCart" type="danger" size="large" class="godetail">确定</mt-button>
		</mt-popup>
	</div>
</template>

<script>
	import { MessageBox } from "mint-ui";
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'productDetail',
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				chooseContent: "",
				curId: null,
				curId2: null,
				goodsColor: [],
				popupVisible: false,
				addGoods: [],
				goodsSize: [],
				itemDescArray: [],
				productOne: [],
				ok: false,
				swipers: [],
				options: {
					direction: "horizontal",
					loop: true,
					pagination: {
						el: ".swiper-pagination"
					},
					autoplay: {
						delay: 2000,
						disableOnInteraction: false
					}
				}
			}
		},
		watch: {
			curId() {
				this.chooseContent = "选择的是： " + this.goodsColor[this.curId] + ', ' + this.goodsSize[this.curId2];
			},
			curId2() {
				this.chooseContent = "选择的是：" + this.goodsColor[this.curId] + ', ' + this.goodsSize[this.curId2];
			}
		},
		methods: {
			changeCurId(key) {
				this.curId = key;
			},
			changeCurId2(key) {
				this.curId2 = key;
			},
			goback() {
				this.$router.go(-1);
			},
			getProductOne() {
				this.$axios
					.get(
						"http://localhost:3000/items/searchById?itemId=" + this.$route.params.id)
					.then(res => {
						console.log(res.data.data);
						this.productOne = res.data.data;
						this.swipers = res.data.data.goods_img.split(","); //string类型转为对象
						this.goodsSize = JSON.parse(res.data.data.goods_size);
						this.goodsColor = JSON.parse(res.data.data.goods_color);

						this.swipers.pop();
						//console.log(this.swipers[0]);
						this.ok = true; // 作用: 保证先加载$axios 数据 然后加 swiper DOM标记

						// 产品列表展示信息图和文字
						/* 
									 * this.itemDescArray二维数组 ：
									 * 
									   contentType = 1文本描述, 2图像描述
									   cssStyle 样式
									   
									   words 提供文本内容
									   url  提供图片路径
									   
									*/
						this.itemDescArray = JSON.parse(res.data.data.content); //string类型转为对象
					})
					.catch(e => {
						console.log(e);
					})
			},
			addPop() {
				this.popupVisible = true;
			},
			addBuy(){
				this.$router.push('/confirmOrder');
				
			},
			addCart() {

				if(
					this.chooseContent.indexOf("undefined") != -1 ||
					this.chooseContent == "请选择颜色和型号"
				) {
					//alert("请至少选择一个产品去结算");
					MessageBox.alert("你没选择颜色或者型号 ");
				} else {
					let bool = true;

					this.addGoods = JSON.parse(localStorage.getItem('addGoods')) || [];
					console.log(this.addGoods);
					this.$store.dispatch('addShopNumAction', 1)
					for(var i = 0; i < this.addGoods.length; i++) {
						let item = this.addGoods[i];
						if(item.id == this.productOne._id) {
							var newAddGoodOne = {
								id: item.id,
								num: this.$store.getters.getShopNum
							}
							this.addGoods.splice(i, 1);
							this.addGoods.push(newAddGoodOne);
							bool = false;
						}
					}
					if(bool) {
						//添加商品
						var newAddGoodOne = {
							id: this.productOne._id,
							num: 1
						}
						this.addGoods.push(newAddGoodOne);
					}
					localStorage.setItem('addGoods', JSON.stringify(this.addGoods));
					this.popupVisible = false;
				}
			}
		},
		mounted() {
			this.getProductOne();

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
	
	.swiper-container {
		width: 100%;
	}
	
	.swiper-container img {
		width: 100%;
		height: 100%;
	}
	
	.goodsTitle {
		width: 100%;
	}
	
	.goodsTitle .bigtitle {
		margin: 10px;
	}
	
	.goodsTitle .smalltitle {
		margin: 10px;
		font-size: 14px;
	}
	
	.goodsTitle .goodsPrice {
		margin: 10px;
		font-size: 20px;
	}
	
	.goodsTitle .goodsPrice .orgPrice {
		color: red;
	}
	
	.goodsTitle .goodsPrice .disPrice {
		color: #f60;
		text-decoration: line-through;
	}
	
	.goodsTitle .goodsPrice .goodsCount {
		float: right;
		font-size: 15px;
		line-height: 26px;
	}
	
	.goodsTitle .integral {
		margin: 10px;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
	}
	
	.goodsTitle .integral span {
		float: right;
		color: #808080;
	}
	
	.goodsComments {
		margin: 10px;
		height: 70px;
	}
	
	.goodsComments .item {
		display: flex;
	}
	
	.goodsComments .userTx {
		width: 50px;
	}
	
	.goodsComments .right {
		flex: 1;
	}
	
	.goodsComments .right .myName {
		font-size: 15px;
		margin: 5px 0 5px 5px;
	}
	
	.goodsComments .right .myComment {
		font-size: 14px;
	}
	
	.goodsDetail {
		margin: 10px;
		font-size: 14px;
	}
	
	.goodsDetail h3 {
		margin-bottom: 10px;
	}
	
	.goodsDetail .item-desc {
		background-color: #f6f6f6;
		padding: 15px 0 15px 0;
		padding-bottom: 50px;
		line-height: 25px;
		
	}
	
	
	
	.tabbar {
		height: 60px;
		display: flex;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	
	.tabbar .goodsComment {
		width: 33%;
		line-height: 60px;
		text-align: center;
		background: #ffffffe0;
		display: flex;
	}
	
	.tabbar .goodsComment a {
		width: 50%;
	}
	
	.tabbar .goodsComment .iconfont {
		font-size: 30px;
		color: #000000;
	}
	
	.tabbar .goodsCart {
		width: 34%;
		text-align: center;
		line-height: 60px;
		background: #EC971F;
		color: #FFFFFF;
		font-size: 18px;
	}
	
	.tabbar .goodsBuy {
		width: 34%;
		text-align: center;
		line-height: 60px;
		background: #D9534F;
		color: #FFFFFF;
		font-size: 18px;
	}
	
	.mypop {
		width: 100%;
		/*height: 300px;*/
		background: #FFFFFF;
	}
	
	.mypop .goodsTitle {
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
		display: flex;
	}
	
	.mypop .goodsTitle .left {
		width: 70px;
		margin: 10px;
	}
	
	.mypop .goodsTitle .left img {
		border-radius: 3px;
	}
	
	.mypop .goodsTitle .right {
		margin: 10px 0 10px 0;
		font-size: 17px;
	}
	
	.mypop .goodsTitle .right .price {
		margin-top: 7px;
		font-size: 15px;
		color: #FF6600;
	}
	
	.mypop .goodsTitle .right .one-choose {
		font-size: 13px;
		color: #808080;
	}
	
	.mypop .goodsSize {
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.mypop .goodsSize p {
		font-size: 17px;
		margin: 15px;
	}
	
	.mypop .goodsSize .size {
		display: flex;
		flex-wrap: wrap;
		/*justify-content: space-around;*/
		align-items: center;
		padding-top: 10px;
	}
	
	.mypop .goodsSize .size div {
		width: 20%;
		border-radius: 4px;
		background: #eee;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		margin-left: 10px;
		margin-bottom: 10px;
	}
	
	.mypop .goodsSize .size div.active {
		background: #F00;
		color: #FFFFFF;
	}
	
	.mypop .goodsColor {
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.mypop .goodsColor p {
		font-size: 17px;
		margin: 15px;
	}
	
	.mypop .goodsColor .color {
		display: flex;
		flex-wrap: wrap;
		/*justify-content: space-around;*/
		align-items: center;
		padding-top: 10px;
	}
	
	.mypop .goodsColor .color div {
		width: 20%;
		border-radius: 4px;
		background: #eee;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		margin-left: 10px;
		margin-bottom: 10px;
	}
	
	.mypop .goodsColor .color div.active {
		background: #F00;
		color: #FFFFFF;
	}
	
	.mypop .goodsCount {
		width: 100%;
		display: flex;
		margin-bottom: 15px;
	}
	
	.mypop .goodsCount span {
		width: 60%;
		margin: 15px 0 10px 15px;
		font-size: 17px;
	}
	
	.mypop .goodsCount .count {
		flex: 1;
		margin: 15px 10px 10px 0;
		text-align: center;
	}
	
	.mypop .goodsCount .count span {
		font-size: 18px;
		width: 20px;
		background: #DBDBDB;
	}
</style>