<template>
	<div>
		<div class="homeContainer">
			
			<div class="recommendCon">
				<ul class="productList">
					<li class="item" v-for="(item,key) in products">
						<router-link :to="'/detail/'+item._id" class="mesgLink">
							<div class="mesgtp">
								<img v-lazy="`http://localhost:3000/${item.menu_img.split(',')[0]}`" width="200" height="200"/>
							</div>
							<div class="mesgTitle">
								<h2>{{item.food_title}}</h2>
								<p class="subTitle">
									{{item.sub_title}}
								</p>
							</div>
							<div class="mesgCon">
								<div class="left">
									<a href="#"><img src="../../assets/images/tx1.jpg" class="mesgTx" width="50" height="50"/></a>
								</div>
								<div class="center">
									<p>
										我家厨房
									</p>
								</div>
								<div class="right">
									<a href="#">
										<i class="iconfont icon-favorites"></i>
									</a>
								</div>
							</div>
						</router-link>
					</li>
					
				</ul>
			</div>
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
				this.$jsonp('http://localhost:3000/index/items/is_best')
				.then(res=>{
					this.products = JSON.parse(res).data;
					console.log(res.data.data);
				})
				.catch(e=>{
					console.log(e);
				})
			}
		},
		mounted(){
			this.getProductList();
		}
	}
</script>

<style scoped>
	.homeContainer {
		width: 100%;
		height: 100%;
	}
	
	.homeContainer .recommendCon{
		width: 100%;
		height: 100%;
	}
	.recommendCon .productList{
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		display: inline-block;
	}
	.productList .item{
		margin-top: 15px;
		
		width: 200px;
		float: left;
		margin: 0 3px 10px 3px;
	}
	.productList .item a{
		text-decoration: none;
	}
	.productList .item:nth-last-child(1){
		margin-bottom: 80px;
	}
	.item .mesgLink .mesgtp img{
		border-radius: 10px;
	}
	.item .mesgLink .mesgTitle{
		/*多行隐藏*/
		display: -webkit-box;
	    text-overflow: ellipsis;
        overflow : hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        
        font-size: 12px;
        color: #333333;
        margin: 10px 5px;
        height: 48px;
	}
	.item .mesgLink .mesgTitle p{
		height: 23px;
		font-size: 15px;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		text-overflow: ellipsis;
	}
	.item .mesgLink .mesgCon{
		width: 100%;
		height: 50px;
		display: flex;
	}
	.item .mesgLink .mesgCon .left{
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.item .mesgLink .mesgCon .left img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.item .mesgCon .right{
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.item .mesgCon .right i{
		font-size: 30px;
		color: #BEBEBE;
	}
	.item .mesgCon .center{
		flex: 1;
		line-height: 50px;
		color: #BEBEBE;
		font-size: 15px;
		/*单行隐藏*/
		overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
	}
</style>