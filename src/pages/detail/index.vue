<template>
	<div>
		<div class="navbar">
			<div class="left">
				<a href="index.vue">
					<i class="iconfont icon-arrow-lift" @click="goback"></i>
				</a>
			</div>
			<div class="center">
				<a href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple" target="_blank">
					<i class="iconfont icon-weibo"></i>
				</a>
				<a href="#"><i class="iconfont icon-qqkongjian"></i></a>
			</div>
		</div>
		<div class="tabbar">
			<div class="commentCon">
				<a href="#"><i class="iconfont icon-comments"></i></a>
				<span>评论</span>
			</div>
			<div class="like" v-if="!isLike" @click="userlike">
				<i class="iconfont icon-favorites"></i>
				<span>收藏</span>
			</div>
			<div class="like" v-if="isLike" @click="userunlike">
				<i class="iconfont icon-favorites" style="color: #f00"></i>
				<span>已收藏</span>
			</div>

			<!--<a href="#"><i class="iconfont icon-camera"></i></a>
			<span>传作品</span>-->
		</div>

		<div class="second-nav" v-if="ok">
			<swiper-slide v-for="(item,key) in swipers" :key="key">
				<img :src="`http://localhost:3000/${item}`" alt>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</div>
		<div class="detailContainer">
			<div class="detailTitle">
				<h1>{{productOne.food_title}}</h1>
			</div>
			<p class="detailP">
				2.3万收藏 · 25.0万次浏览
			</p>
			<div class="myCon">
				<div class="myTx">
					<a href="#">
						<img src="../../assets/images/tx10.jpg" width="70" height="70" />
					</a>
				</div>
				<div class="myName">
					<span>手机用户_7031</span>
					<p>01-02</p>
				</div>
				<div class="follow">
					<a href="#">
						<p>关注</p>
					</a>
				</div>
			</div>
			<div class="detailTitle">
				{{productOne.sub_title}}
			</div>
			<div class="detailMenu">
				<div class="menuTitle">
					<h2>用料</h2>
					<i class="iconfont icon-cheng-danse"></i>
					<a href="#"><span>丢进菜篮子</span></a>
				</div>
				<div class="menu">
					<ul class="mesgList">
						<li class="mesgItem">
							<div class="mesgLink">
								<div class="material">
									{{productOne.food_name}}
								</div>
								<div class="number">
									{{productOne.food_count}}
								</div>
							</div>
						</li>

					</ul>

				</div>
				<h2>详细步骤</h2>
				<div class="menuStep">
					<div v-html="productOne.food_content"></div>
				</div>
				<div class="mesgComment">
					<h2>这道菜的评论</h2>
					<ul class="mesgList">
						<li class="mesgItem">
							<div class="mesgLink">
								<div class="myTx">
									<a href="#"><img src="../../assets/images/tx8.jpg" width="50" height="50" /></a>
								</div>
								<div class="right">
									<div class="left">
										<div class="comment">
											<p class="myName">
												清风拂面
											</p>
											<p class="myComment">
												看上去好好吃的样子哦~我也要试试看...
											</p>
										</div>
										<div class="support">
											<a href="#">
												<i class="iconfont icon-good"></i>
											</a>
										</div>
									</div>
									<div class="myReply">
										<ul class="mesgList">
											<li class="mesgItem">
												<div class="reply">
													<div class="left">
														<p class="myName">
															手机用户_7031
														</p>
														<p class="myComment">
															快去试试吧~
														</p>
													</div>
													<div class="right">
														<a href="#">
															<i class="iconfont icon-good" @click="addGood"></i>
														</a>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<div class="myComment1">
						<div class="myTx">
							<a href="#"><img src="../../assets/images/tx7.jpg" width="50" height="50" /></a>
						</div>
						<form class="myInupt">
							<input type="text" class="key" placeholder="喜欢评论的人，做饭一定超好吃~" v-model="plContent"/>
						</form>
						<div class="true">
							<a href="#">
								<i class="iconfont icon-icon_send"></i>
							</a>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>
</template>
<script src="../../assets/js/swiper-min.js"></script>
<script>
	import { MessageBox } from "mint-ui";
	import Swiper from 'swiper'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import config from "@/assets/js/config";
	export default {
		name: 'deatil',
		data() {
			return {
				isLike: false,
				addLikes: [],
				url: "",
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
				},
				plContent: ''
			}
		},
		created() {
			if(window.localStorage.getItem("userinfo")) {
				this.userIsLike();
			}
		},
		methods: {
			addGood() {

			},
			goback() {
				this.$router.go(-1);
			},
			getProductOne() {
				this.$axios.get('http://localhost:3000/item/searchById?itemId=' + this.$route.params.id)
					.then(res => {

						this.productOne = res.data.data;
						console.log(res.data.data);
						this.swipers = res.data.data.menu_img.split(","); //string类型转为对象
						this.swipers.pop();
						//console.log(this.swipers[0]);
						this.ok = true; // 作用: 保证先加载$axios 数据 然后加 swiper DOM标记
						this.itemDescArray = JSON.parse(res.data.data.content); //string类型转为对象
					})
					.catch(e => {
						console.log(e);
					})
			},
			userIsLike() {
				var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
				this.$axios.get(config.api + "/item/userIsLikeItem?userId=" + userId + "&itemId=" + this.$route.params.id)
					.then(res => {
						if(res.data.success) {
							this.isLike = true;
						} else {
							this.isLike = false;
						}
					});
			},
			userlike() {
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录!").then(action => {
						this.$router.push("/login");
					});
				} else {
					let bool = true;
					var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
					this.addLikes = JSON.parse(localStorage.getItem('addLikes')) || [];
					console.log(this.addLikes);
					for(var i = 0; i < this.addLikes.length; i++) {
						let item = this.addLikes[i];
						if(item.id == this.productOne._id) {
							var newAddLikeOne = {
								id: item.id
							}
							this.addLikes.splice(i, 1);
							this.addLikes.push(newAddLikeOne);
							bool = false;
						}
					}
					if(bool) {
						var newAddLikeOne = {
							id: this.productOne._id
						}
						this.addLikes.push(newAddLikeOne);
					}

					this.$axios.get(config.api + "/item/like?userId=" + userId + "&itemId=" + this.$route.params.id)
						.then(res => {
							console.log(res.data);
							if(res.data.success) {
								this.isLike = true;
								location.reload();
							}
						});
					localStorage.setItem('addLikes', JSON.stringify(this.addLikes));
				}
			},
			userunlike() {
				if(!window.localStorage.getItem("userinfo")) {
					MessageBox.alert("您尚未登录！").then(action => {
						this.$router.push("/login");
					});
				} else {

					var userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
					this.$axios.get(config.api + "/item/unlike?userId=" + userId + "&itemId=" + this.$route.params.id)
						.then(res => {
							console.log(res.data);
							if(res.data.success) {
								this.isLike = false;
								location.reload();
							}
						});
				}
			}
			//发送评论
			
			
		},
		components: {
			swiper,
			swiperSlide
		},
		mounted() {
			this.getProductOne();
			this.getYoujiPl();
		}

	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		height: 50px;
		display: flex;
		position: fixed;
		top: 0;
		background: #ffffff6b;
		left: 0;
		z-index: 9999;
	}
	
	.navbar a {
		text-decoration: none;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.navbar .left i {
		font-size: 30px;
		color: #FF6600;
	}
	
	.navbar .center {
		flex: 1;
		line-height: 50px;
	}
	
	.navbar .center i {
		font-size: 28px;
		margin-left: 10px;
		color: #FF6600;
	}
	
	.tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: #EEEEEE;
		display: flex;
	}
	
	.tabbar a {
		text-decoration: none;
	}
	
	.tabbar a i {
		font-size: 30px;
		margin-left: 10px;
	}
	
	.tabbar .commentCon {
		float: left;
	}
	
	.tabbar .commentCon i {
		color: #000000;
	}
	
	.tabbar span {
		font-size: 18px;
		line-height: 60px;
		margin-right: 20px;
		margin-left: 5px;
	}
	
	.tabbar .like i {
		font-size: 28px;
	}
	
	.second-nav {
		width: 100%;
		height: 100%;
		margin-top: 0px;
	}
	/*.second-nav .swiper-container {
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
	}*/
	
	.second-nav img {
		width: 100%;
		height: 100%;
	}
	
	.swiper-slide {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/*.swiper-container img {
		width: 100%;
		height: 300px;
	}*/
	
	.detailContainer {
		width: 100%;
		height: 100%;
		margin-top: 10px;
	}
	
	.detailContainer:nth-last-child(1) {
		margin-bottom: 80px;
	}
	
	.detailContainer h1 {
		text-align: center;
		font-size: 28px;
		margin: 15px 0;
	}
	
	.detailContainer .detailP {
		text-align: center;
		font-size: 15px;
		font: bold;
		margin-bottom: 40px;
	}
	
	.detailContainer .myCon {
		width: 100%;
		display: flex;
	}
	
	.detailContainer .myCon .myTx {
		width: 70px;
		height: 70px;
		margin-left: 20px;
	}
	
	.detailContainer .myCon .myTx img {
		border-radius: 50%;
	}
	
	.detailContainer .myCon .follow {
		width: 70px;
		height: 70px;
		text-align: 70px;
		line-height: 70px;
	}
	
	.detailContainer .myCon .follow a {
		text-decoration: none;
	}
	
	.detailContainer .myCon .myName {
		flex: 1;
		margin-left: 10px;
		margin-top: 10px;
	}
	
	.detailContainer .myCon .myName span {
		font-size: 18px;
	}
	
	.detailContainer .myCon .myName p {
		margin-top: 10px;
		font-size: 15px;
	}
	
	.detailContainer .myCon .follow p {
		font-size: 18px;
		color: #FF6600;
		text-align: center;
	}
	
	.detailContainer .detailTitle {
		margin: 20px;
		font-size: 17px;
		font: "楷体";
	}
	
	.detailContainer .detailMenu {
		margin: 30px 20px;
	}
	
	.detailContainer .detailMenu .menuTitle {
		display: flex;
		width: 100%;
		height: 50px;
	}
	
	.detailContainer .detailMenu .menuTitle a ul li {
		text-decoration: none;
	}
	
	.detailContainer .detailMenu .menuTitle h2 {
		font-size: 24px;
		line-height: 50px;
		color: #FFA600;
	}
	
	.detailContainer .detailMenu .menuTitle span {
		width: 90px;
		height: 50px;
		line-height: 50px;
		font-size: 17px;
		color: #FF6600;
	}
	
	.detailContainer .detailMenu .menuTitle .iconfont {
		flex: 1;
		line-height: 50px;
		font-size: 22px;
		margin-left: 10px;
	}
	
	.detailContainer .detailMenu .menu {
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .menu .mesgList {
		display: flex;
		flex-direction: column;
	}
	
	.detailContainer .detailMenu .menu .mesgList .mesgItem {
		margin-top: 15px;
		width: 100%;
		/*height: 50px;*/
		margin-bottom: 20px;
		border-bottom: 1px dashed #C0C0C0;
	}
	
	.detailContainer .detailMenu .menu .mesgList .mesgItem .mesgLink {
		display: flex;
		/*height: 50px;*/
		font-size: 18px;
		/*line-height: 50px;*/
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 20px;
	}
	
	.detailContainer .detailMenu .menu .mesgList .mesgItem .mesgLink .material {
		width: 40%;
		margin-bottom: 20px;
		float: left;
	}
	
	.detailContainer .detailMenu .menu .mesgList .mesgItem .mesgLink .number {
		flex: 1;
		margin-left: 20px;
	}
	
	.detailContainer .detailMenu h2 {
		font-size: 24px;
		margin-bottom: 30px;
	}
	
	.detailContainer .detailMenu .menuStep {
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .menuStep h2 {
		font-size: 19px;
		margin-bottom: 10px;
	}
	
	.detailContainer .detailMenu .menuStep img {
		border-radius: 10px;
		margin-bottom: 10px;
	}
	
	.detailContainer .detailMenu .menuStep p {
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.detailContainer .detailMenu .mesgComment {
		margin-top: 30px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.detailContainer .detailMenu .mesgComment h2 {
		font-size: 19px;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList {
		margin-top: 20px;
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem {
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem a {
		text-decoration: none;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink {
		width: 100%;
		height: 80px;
		display: flex;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .myTx {
		width: 70px;
		height: 80px;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .myTx img {
		border-radius: 50%;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right {
		display: flex;
		flex-direction: column;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left {
		display: flex;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left .support {
		width: 70px;
		height: 70px;
		text-align: center;
		right: 0;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left .support i {
		font-size: 30px;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left .comment {
		flex: 1;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left .comment .myName {
		font-size: 18px;
		height: 30px;
		margin-top: 5px;
		color: #999999;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .left .comment .myComment {
		font-size: 16px;
		overflow: hidden;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .myReply {
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList {
		width: 100%;
		height: 100%;
	}
	
	.detailContainer .detailMenu .mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply {
		width: 100%;
		height: 80px;
		display: flex;
		margin-bottom: 40px;
	}
	
	.mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply .right {
		width: 70px;
		height: 80px;
		text-align: center;
	}
	
	.mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply .right i {
		font-size: 30px;
	}
	
	.mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply .left {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply .left .myName {
		font-size: 18px;
		height: 30px;
		margin-top: 5px;
		color: #999999;
	}
	
	.mesgComment .mesgList .mesgItem .mesgLink .right .myReply .mesgList .mesgItem .reply .left .myComment {
		font-size: 16px;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		text-overflow: ellipsis;
	}
	
	.mesgComment .myComment1 {
		margin-top: 90px;
		display: flex;
		width: 100%;
		height: 50px;
	}
	
	.mesgComment .myComment1 a {
		text-decoration: none;
	}
	
	.mesgComment .myComment1 .myTx {
		width: 50px;
		height: 50px;
	}
	
	.mesgComment .myComment1 .myTx img {
		border-radius: 50%;
	}
	
	.mesgComment .myComment1 .true {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.mesgComment .myComment1 .true i {
		font-size: 30px;
	}
	
	.mesgComment .myComment1 .myInupt {
		flex: 1;
	}
	
	.mesgComment .myComment1 .myInupt .key {
		line-height: 50px;
		width: 250px;
		margin-left: 10px;
		outline: none;
		height: 50px;
		border: 0px;
		background: #EEEEEE;
		font-size: 15px;
		padding-left: 5px;
		border-radius: 5px;
	}
</style>

<style>
	*,
	body {
		margin: 0;
		padding: 0;
	}
	
	a,
	ul,
	li {
		text-decoration: none;
	}
</style>