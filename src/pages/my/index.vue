<template>
	<div>
		<tab-bar></tab-bar>
		<div class="navbar">
			<div class="left">
				<router-link to="/send">
					<i class="iconfont icon-add-select"></i>
				</router-link>
			</div>
			<div class="center">
				<a href="#"><i class="iconfont icon-search"></i></a>
				<input type="text" class="key" placeholder="搜索我的食谱" />
				<a href="#"><i class="iconfont icon-icon_send"></i></a>
			</div>
			<div class="right">
				<a href="#">
					<i class="iconfont icon-add-account"></i>
				</a>
				<a href="#">
					<i class="iconfont icon-chilun" @click="logout"></i>
				</a>
			</div>
		</div>
		<div class="no-login" v-if="!hasLogin">
			
			<div class="btn-login" @click="login">请登录</div>
		</div>
		<!--个人信息-->
		<div class="mycontainer" v-if="hasLogin"> 
			<div class="second-nav">
				<div class="myName">
					<h2>{{user}}</h2>
				</div>
				<div class="myTx">
					<a href="#">
						<img src="../../assets/images/tx3.jpg" width="70" height="70"/>
					</a>
				</div>
			</div>
			<div class="message">
				<p>2018-10-4加入</p>
				<p>添加个人信息，让厨友更加了解你</p>
				<div class="message1">
					<div class="left">
						<div class="fans">
							<a href="#">0</a>
							<p>懒人积分</p>
						</div>
					</div>
					
					<div class="right">
						<a href="http://localhost:8080/#/change"><button>编辑资料</button></a>
					</div>
				</div>
			</div>
			<div class="myMessage">
				<div class="third-nav">
					<router-link to="/heart" class="item">
						<i class="iconfont icon-history"></i>
						<span>浏览历史</span>
					</router-link>
					<router-link to="./orderList" class="item">
						<i class="iconfont icon-dingdan"></i>
						<span>订单</span>
					</router-link>
					
				</div>
				<div class="myMenu">
					<div class="mySelect">
						<router-link to="/my" class="item">
							<span>食谱</span>
						</router-link>
						<router-link to="/my1" class="item1">
							<span>作品</span>
						</router-link>
					</div>
					<div class="itemMenu">
						<ul class="mesgList">
							<li class="mesgItem" v-for="(item,key) in comments">
								<a href="#" class="mesgLink">
									<div class="mesgtp" v-for="(img,k) in imgUrl[key]">
										<img :src="`${url}${img}`" width="180" height="200" />
									</div>
									<div class="menuTitle">
										<h1>{{item.menu_name}}</h1>
									</div>
									<div class="sub_title">{{item.sub_title}}</div>
								</a>
							</li>
							
							
						</ul>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>
</template>

<script>
	import TabBar from '@/components/tabBar'
	import config from "@/assets/js/config";
	export default{
		name:'my',
		components:{
			TabBar
		},
		data(){
			return {
				hasLogin:false,
				user:"",
				orderIndex:0,
				userId:"",
				comments:[],
				content:'',
				imgUrl:[],
				url:''
			}
		},
		mounted(){
			this.load();
			// 查询所有已经生成订单的商品商品
			this.url = config.api;
			this.getCommentList();
		},
		methods:{
			
			load(){
				this.user=JSON.parse(localStorage.getItem("userinfo"))[0].phone;
				
				if (this.user) {
					this.hasLogin = true;
				} else{
					this.hasLogin = false;
				}
			},
			login(){
				return this.$router.push("/login");
			},
			logout(){
				this.$axios
			        .get("http://localhost:3000/loginOut", { withCredentials: true })
			        .then(res => {
			          localStorage.removeItem("userinfo");
			        })
			        .catch(e => {
			          console.log(e);
			        });
			      location.reload();
			},
			getCommentList(){
				var urls = [];
				this.$axios.get(config.api+'/getComments')
				.then(res=>{
					var res = res.data.data;
					this.comments = res;
					for (var item in res) {
						urls.push(JSON.parse(res[item].imggroup));
						console.log(urls);
					}
					this.imgUrl = urls;
				})
				.catch(e=>{
					console.log(e);
				})
			}
		}
	};
</script>

<style scoped>
	/**{
		margin: 0;
		padding: 0;
	}
	.container{
		width: 100%;
		height: ;
	}*/
	.navbar{
		width: 100%;
		height: 50px;
		margin-top: 5px;
		position: fixed;
		top: 0;
		display: flex;
		background: #FFFFFF;
	}
	.navbar a{
		text-decoration: none;
	}
	.navbar .left{
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.navbar .left i{
		font-size: 28px;
	}
	.navbar .right{
		width: 80px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.navbar .right i{
		font-size: 25px;
	}
	.navbar .center{
		flex: 1;
		display: flex;
		line-height: 50px;
		background: #EEEEEE;
	}

	.navbar .center .iconfont{
		font-size: 18px;
		width: 50px;
		height: 50px;
		margin: 0 10px;
	}
	.navbar .center .key{
		flex: 1;
		height: 30px;
		margin: 9px 0;
	  	outline: none;
	  	border: 0px;
	  	background: #EEEEEE;
	}
	/* 用户未登录 start */
	.no-login {
	  background-color: white;
	  padding: 13px 0;
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  border-bottom: 1px solid #ccc;
	  margin-top: 150px;
	}
	
	.btn-login {
	  width: 80px; /* 绝对设置宽度，避免不同手机屏幕的兼容性问题 */
	  color: white;
	  background-color: #f46a46;
	  font-size: 14px;
	  padding: 8px 15px;
	  margin-top: 10px;
	  border-radius: 25px;
	  text-align: center;
	}
	.mycontainer{
		width: 100%;
		height: 100%;
		margin-top: 100px;
	}
	
	.mycontainer .second-nav{
		width: 100%;
		
		display: flex;
	}
	.mycontainer .second-nav .myName{
		margin-left: 20px;
		flex: 1;
		line-height: 70px;
		font-size: 20px;
	}
	.mycontainer .second-nav .myTx{
		width: 70px;
		height: 70px;
		margin-right: 20px;
	}
	.mycontainer .second-nav .myTx img{
		border-radius: 20px;
	}
	.mycontainer .message{
		margin: 20px;
	}
	.mycontainer .message p{
		margin-top: 10px;
		font-size: 15px;
	}
	.mycontainer .message .message1{
		margin-top: 10px;
		font-size: 15px;
		text-align: center;
	}
	.mycontainer .message1 .left{
		width: 80px;
		float: left;
	}
	.mycontainer .message1 .left p{
		margin-top: 5px;
	}
	
	.mycontainer .message1 .right{
		float: right;
		border: 1px #F23030;
		line-height: 43px;
	}
	.mycontainer .message1 .right button{
		/*color: #F23030;*/
		font-size: 17px;
		background: #FFFFFF;
		outline: none;
	}
	.mycontainer .myMessage{
		margin-top: 100px;
		width: 100%;
	}
	.mycontainer .myMessage .third-nav{
		display: flex;
		width: 100%;
		height: 60px;
		font-size: 16px;
	}
	.mycontainer .myMessage .third-nav .item{
		flex: 1;
		justify-content: center;
		align-items: center;
		text-align: center;
		line-height: 60px;
		flex-direction: column;
		color: #333333;
	}
	.mycontainer .myMessage .third-nav .item i{
		font-size: 30px;
		line-height: 60px;
	}
	.mycontainer .myMessage .myMenu{
		margin-top: 10px;
		/*text-align: center;*/
		font-size: 18px;
	}
	.mycontainer .myMessage .myMenu .mySelect {
		text-align: center;
	}
	.mycontainer .myMessage .myMenu .mySelect .item{
		color: #333333;
		border-bottom: 2px solid #F10000;
	}
	.mycontainer .myMessage .myMenu .mySelect .item span{
		font: bold;
	}
	.mycontainer .myMessage .myMenu .mySelect .item1{
		color: #BEBEBE;
	}
	.mycontainer .myMessage .myMenu .itemMenu{
		margin-top: 40px;
		width: 100%;
	}
	.mycontainer .myMessage .myMenu .itemMenu .mesgList{
		display: flex;
		/*flex-direction: column;
		width: 100%;
		display: inline-block;*/
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.mycontainer .myMessage .myMenu .itemMenu .mesgList .mesgItem{
		/*width: 49%;
		float: left;
		margin-left: 2px;*/
		width: 49%;
		margin-top: 10px;
		margin: 0 2px;
		margin-bottom: 10px;
	}
	.mycontainer .myMessage .myMenu .itemMenu .mesgList .mesgItem img{
		border-radius: 10px;
		width: 180px;
		height: 180px;
		margin-left: 11px;
	}
	.mycontainer .myMessage .myMenu .itemMenu .mesgList .mesgItem:nth-last-child(1){
		margin-bottom: 80px;
	}
	.mycontainer .myMenu .itemMenu .mesgItem .mesgLink .menuTitle{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #333333;
		margin-bottom: 5px;
		width: 180px;
	}
	.mycontainer .myMenu .itemMenu .mesgItem .mesgLink .menuTitle h1{
		font-size: 17px;
		margin-left: 8px;
	}
	.mycontainer .myMenu .itemMenu .mesgItem .mesgLink .sub_title{
		font-size: 15px;
		color: #000000;
		margin-bottom: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 8px;
		width: 180px;
	}
</style>