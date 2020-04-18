<template>
	<div>
		<div class="recommendCon">
				<h1>猜你喜欢</h1>
				<ul class="mesgList">
					<li class="mesgItem" v-for="(item,key) in products">
						<div class="mesgLink">
							<router-link :to="'/productDetail/'+item._id" class="link">
								<div class="mesgtp">
									<img v-lazy="`http://localhost:3000/${item.goods_img.split(',')[0]}`" width="200" height="200"/>
								</div>
								<div class="mesgTitle">
									<span>{{item.title}}</span>
									<p>{{item.sub_title}}</p>
								</div>
								<div class="mesgCon">
									<div class="price">
										￥{{item.market_price}}
									</div>
									<div class="right"><span>已售{{item.click_count}}</span></div>

								</div>
							</router-link>
						</div>
					</li>
					
				</ul>
			</div>
	</div>
</template>

<script>
	export default{
		name:'productList',
		data(){
			return{
				products:[]
			}
			
		},
		methods:{
			getProductList(){
//				this.$axios.defaults.baseURL='http://localhost:8080';
//				this.$axios.post('/api/index/items/rec')
                this.$jsonp('http://localhost:3000/index/item/is_hot')
	    		.then(res=>{
//	    			console.log(res.data.data);
	    			this.products = JSON.parse(res).data;
//	    			console.log(this.products);
	    		})
	    		.catch(e=>{
	    			console.log(e)
	    		})
			}
		},
		mounted(){
			this.getProductList();
		}
	}
</script>

<style scoped>
	.shijiContainer .recommendCon .mesgItem:nth-last-child(1) {
		margin-bottom: 80px;
	}
	
	.shijiContainer .recommendCon {
		width: 100%;
		display: inline-block;
		margin-top: 20px;
	}
	
	.shijiContainer .recommendCon h1 {
		margin: 0 0 20px 20px;
	}
	
	.shijiContainer .recommendCon .mesgList {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		display: inline-block;
	}
	
	.shijiContainer .recommendCon .mesgItem {
		margin-top: 15px;
		height: 320px;
		width: 200px;
		float: left;
		margin: 0 3px 10px 3px;
	}
	
	.shijiContainer .recommendCon .mesgItem a {
		text-decoration: none;
	}
	
	.recommendCon .mesgLink .mesgtp img {
		border-radius: 10px;
	}
	
	.recommendCon .mesgLink .mesgTitle {
		/*多行隐藏*/
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		margin: 10px 0;
		height: 60px;
	}
	
	.recommendCon .mesgLink .mesgTitle span {
		font-size: 14px;
		font: bold;
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.recommendCon .mesgLink .mesgTitle p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 13px;
		color: #AAAAAA;
		margin-top: 5px;
	}
	
	.recommendCon .mesgLink .mesgCon {
		width: 100%;
		height: 30px;
		display: flex;
	}
	
	.recommendCon .mesgLink .mesgCon .price {
		color: #F10000;
		line-height: 30px;
		width: 100px;
		font-size: 14px;
		font: bold;
	}
	
	.recommendCon .mesgLink .mesgCon .right {
		line-height: 30px;
		flex: 1;
		height: 30px;
		font-size: 14px;
		color: #BEBEBE;
	}
</style>