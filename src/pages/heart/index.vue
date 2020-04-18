<template>
	<div>
		<tab-bar></tab-bar>
		<div class="navbar1">
			<div class="left">
				<i class="iconfont icon-arrow-lift" @click="goback"></i>
			</div>
			<div class="right">
				我的收藏
			</div>
		</div>
		
		<!--未收藏-->
		<div v-if="!hasLike" class="no-like">
			尚未收藏任何食谱
		</div>
		
		<!--收藏-->
		<div class="heartContainer"  v-if="hasLike">
			<ul class="list">
				<li class="item" v-for="(item,key) in menuLike" :key="key">
					<router-link :to="'/detail/'+item._id" class="link">
						<div class="heartImg">
							<img v-lazy="`http://localhost:3000/${item.menu_img.split(',')[0]}`" />
						</div>
						<p class="heartTitle">{{item.food_title}}</p>
						<div class="user">
							<div class="left">
								<img src="../../assets/images/tx8.jpg" width="20"/>
							</div>
							<div class="right">
								爱做饭的小朋友
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
	import tabBar from '@/components/tabBar'
	import config from "@/assets/js/config";
	export default{
		name:'heart',
		components:{
			tabBar
		},
		data(){
			return{
				hasLike:false,
				url:"",
				menuLike:[]
			}
		},
		created(){
			if (window.localStorage.getItem("userinfo")) {
				this.userIsLike();
			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			userIsLike(){
				var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
			},
			getLikeProducts(){
				let addLikes = JSON.parse(localStorage.getItem('addLikes')) || [];
				if (addLikes!=0) {
					this.hasLike = true;
					let itemIds = '';
					for (let i= 0;i<addLikes.length;i++) {
						itemIds += addLikes[i].id + ','; 
					}
					console.log(itemIds);
					
					this.$axios.get('http://localhost:3000/items/queryItems?itemIds='+itemIds)
					.then(res=>{
						this.menuLike = res.data.data;
						for (let i=0;i<this.menuLike.length;i++) {
							let item = this.menuLike[i];
							console.log(item);
						}
					})
					.catch(e=>{
						console.log(e);
					})
				}
			}
		},
		mounted(){
			this.getLikeProducts();
		}
		
	}
</script>

<style>
    .navbar1 {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
	}
	
	.navbar1 .left {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	
	.navbar1 .left .iconfont {
		font-size: 24px;
	}
	
	.navbar1 .right {
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding-right: 35px;
	}
	.no-like{
		font-size: 17px;
		margin-top: 180px;
		text-align: center;
		color: #8C8C8C;
	}
	.heartContainer{
		display: flex;
		margin: 10px;
		margin-bottom: 60px;
		
	}
	.heartContainer .list{
		/*display: flex;
		flex-wrap: wrap;
		justify-content: space-between;*/
		margin: 10px 3px;
		column-count: 2;
		column-gap: 10px;
		/*height: 100%;*/
		break-inside: avoid;
	}
	.heartContainer .list .item {
		/*width: 190px;
		margin: 7px 3px;*/
		margin-bottom: 10px;
		width: 190px;
	}
	.heartContainer .list .item .link{
		
	}
	.heartContainer .list .item .heartImg{
		width: 100%;
		height: 100%;
	}
	.heartContainer .list .item .heartImg img{
		border-radius: 7px;
		width: 100%;
		height: 100%;
	}
	.heartContainer .list .item .heartTitle{
		margin: 10px 0 10px 5px;
		font-size: 16px;
		color: #000000;
		font:bold;
	}
	.heartContainer .list .item .user{
		display: flex;
		margin-left: 5px;
	}
	.heartContainer .list .item .user .left{
		width: 20px;
		margin-right: 10px;
	}
	.heartContainer .list .item .user .left img{
		border-radius: 50%;
	}
	.heartContainer .list .item .user .right{
		color: #8C8C8C;
		font-size: 13px;
	}
</style>