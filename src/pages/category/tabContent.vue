<template>

	<div class="tabcontent">
		<h3 class="bigtitle">{{catName}}</h3>
		<div v-if="productByCat.length>0" >
			<ul class="cateProduct">
				<li class="item" v-for="(item,key) in productByCat">
					<router-link :to="'/detail/'+item._id" class="link">
						<p class="image">
							<img v-lazy="`http://localhost:3000/${item.menu_img.split(',')[0]}`" alt="">
						</p>
						<p class="title">{{item.food_title}}</p>
						<div class="user">
							<div class="userTx">
								<img src="../../assets/images/tx3.jpg" />
							</div>
							<div class="username">
								一颗柠檬
							</div>
						</div>
					</router-link>
				</li>
				
			</ul>
	    </div>
		<div class="p">
			暂无其他食谱
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
				this.$axios.get('http://localhost:3000/item/searchBycat?catId='+this.curId)
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
	
	.cateProduct .user{
		display: flex;
		width: 100%;
		height: 20px;
	}
	.cateProduct .user .userTx{
		margin-left: 3px;
		width: 20px;
		height: 20px;
	}
	.cateProduct .user .userTx img{
		width: 100%;
		height: 100%;
		border-radius: 50px;
	}
	.cateProduct .user .username{
		margin-left: 10px;
		font-size: 14px;
		color: #000000;
	}
	.tabcontent .p{
		text-align: center;
		margin-top: 20px;
		color: #808080;
		font-size: 15px;
	}
</style>