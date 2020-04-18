<template>

	<div class="tabcontent">
		<h3 class="bigtitle">{{catName}}</h3>
		<div v-if="productByCat.length>0" >
			<ul class="cateProduct">
				<li class="item" v-for="(item,key) in productByCat">
					<router-link :to="'/productDetail/'+item._id" class="link">
						<p class="image">
							<img v-lazy="`http://localhost:3000/${item.goods_img.split(',')[0]}`" alt="">
						</p>
						<p class="title">{{item.title}}</p>
						<p class="info"><span class="price">{{item.market_price}}元</span><span class="like">喜欢：{{item.click_count}}</span></p>
					</router-link>
				</li>
				
			</ul>
	    </div>
		<div class="p">
			暂无其他商品
		</div>
	</div>

</template>

<script>
	export default {
		name: 'tabContent',
		data(){
			return{  
				productByCat:[]
			}
		},
		props:{
			curId:{
				
			},
			catName:{
				type:String
			}
		},
		watch:{
			curId(){
				this.getContent();
			}
		},
		methods:{
			getContent(){
				this.$axios.get('http://localhost:3000/items/searchBycat?catId='+this.curId)
				.then(res=>{
					this.productByCat= res.data.data;
				    console.log(this.productByCat);
				})
				.catch(e=>{
					console.log(e);
				})
			}
		},
		mounted(){
			setTimeout(()=>{
				this.getContent();
			},100)
		}
	}
</script>

<style scoped>
	.tabcontent {
		flex: 1;
		
		padding-left: 10px;

	}
	.bigtitle{
		font-size: 20px;
		padding: 10px 0 20px 0;
	}
	.cateProduct{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.cateProduct .item{
		width: 49%;
		margin-bottom: 10px;
	}
	.cateProduct .image img{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.cateProduct .title{
		padding: 10px 0 10px 0 ;
		font-size: 14px;
		color: #000000;
	}
	
	.cateProduct .price{
		color: #f00;
		font-size: 12px;
	}
	.cateProduct .like{
		color: #C0C0C0;
		font-size: 12px;
		float: right;
	}
	.tabcontent .p{
		text-align: center;
		margin-top: 20px;
		color: #808080;
		font-size: 15px;
	}
</style>