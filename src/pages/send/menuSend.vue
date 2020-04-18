<template>
	<div>
		<div class="navbar">
			<div class="left">
				<i class="iconfont icon-arrow-lift" @click="goback"></i>
			</div>
			<div class="right">
			    创建食谱
			</div>
		</div>
		<div class="menuSend">
			<ul class="list">
				<li class="item">
					<div class="left">
						食谱标题：
					</div>
					<div class="right">
						<input type="text" class="key" placeholder="请输入标题..." v-model="menu_name"/>
					</div>
				</li>
				<li class="item">
					<div class="left">
						烹饪趣事：
					</div>
					<div class="right">
						<input type="text" class="key" placeholder="请输入烹饪故事..." v-model="sub_title"/>
					</div>
				</li>
				<li class="item">
					<div class="left">
						用料：
					</div>
					<div class="right">
						<input type="text" class="key" placeholder="请输入所有材料..." v-model="food_name"/>
					</div>
				</li>
				<li class="item">
					<div class="left">
						用量：
					</div>
					<div class="right">
						<input type="text" class="key" placeholder="请输入用量..." v-model="food_count"/>
					</div>
				</li>
			</ul>
			<div class="subjectdiv">
		      <textarea type="text" class="subjectinput" v-model="subject" placeholder="制作过程..." ></textarea>
		    </div>
		    <div class="fontinfo">分享最多六张图片，图片大小不超过2M</div>
			<div class="shareform">
				<el-upload action="`{$url}/headphoto`" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" ref="upload" :auto-upload="false" :on-change="fileChange">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>

			<button class="sendbtn" @click="btnupload">发送</button>
		</div>
	</div>
</template>

<script>
	import config from "@/assets/js/config";
	export default{
		name:'menuSend',
		methods:{
			goback(){
				this.$router.go(-1);
			}
		},
		data(){
			return{
				url:'',
				dialogImageUrl: '',
				dialogVisible: false,
				geshi: true,
				daxiao: true,
				fileList: '',
				address: '',
				subject:'',
				menu_name:'',
				sub_title:'',
				food_name:'',
				food_count:''
			}
		},
		beforeMount() {
			let self = this

			if(!localStorage.getItem('userinfo')) {
				self.$message({
					message: '请登录账号',
					type: 'warning',
					duration: 1200
				})
				setTimeout(function() {
					self.$router.push('/login');
				}, 1200)
			}
		},mounted() {
			this.url = config.api;
		},
		computed: {},
		methods: {
			handleRemove(file, fileList) {
				//console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			fileChange(file, filelist) {
				let self = this
				let isIMG;

				if(file.raw.type == 'image/jpeg' || file.raw.type == 'image/png' || file.raw.type == 'image/jpg') {
					isIMG = true
				} else {
					isIMG = false
				}
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(filelist.length > 6) {
					self.$message({
						message: '最多上传六张图片',
						type: 'error',
						duration: 1500
					});
					filelist.splice(filelist.length - 1, 1)
				} else {
					if(!isIMG) {
						self.geshi = false;
						self.$message({
							message: '请上传图片',
							type: 'error',
							duration: 1500
						});
						filelist.splice(filelist.length - 1, 1)
					} else if(!isLt2M) {
						self.daxiao = false
						self.$message({
							message: '上传图片请小于2M',
							type: 'error',
							duration: 1500
						});
						filelist.splice(filelist.length - 1, 1)
					} else {
						console.log(file, filelist)
						self.fileList = filelist
					}
				}
			},
			uploadImg() {
				let self = this

			},
			goback() {
				// 返回历史对象的上一页
				this.$router.go(-1);
			},
			// 图片压缩并保存到files
			getBase64(url) {
				let self = this;
				let Img = new Image(),
					dataURL = "";
				Img.src = url;
				let p = new Promise(function(resolve, reject) {
					Img.onload = function() {
						//要先确保图片完整获取到，这是个异步事件
						let canvas = document.createElement("canvas"), //创建canvas元素
							width = Img.width, //确保canvas的尺寸和图片一样
							height = Img.height;
						// 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
						let ratio = width / height,
							maxLength = 1000,
							newHeight = height,
							newWidth = width;
						// 在长宽超过最大长度时，按图片长宽比例等比缩小
						if(width > maxLength || height > maxLength) {
							if(width > height) {
								newWidth = maxLength;
								newHeight = maxLength / ratio;
							} else {
								newWidth = maxLength * ratio;
								newHeight = maxLength;
							}
						}
						canvas.width = newWidth;
						canvas.height = newHeight;
						canvas
							.getContext("2d")
							.drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
						dataURL = canvas.toDataURL("image/jpeg", 0.5); //转换图片为dataURL
						resolve(dataURL);
					};
				});
				return p;
			},
			btnupload() {
				let self = this
				console.log(self.fileList.length)
				if(self.fileList.length < 1) {
					let data = {
						subject: self.subject,
						userinfo: localStorage.getItem('userinfo'),
						menu_name:self.menu_name,
						sub_title:self.sub_title,
						food_name:self.food_name,
						food_count:self.food_count
					}

					this.$axios({
							method: "post",
							url: config.api + "/uploads",
							data,
							dataType: "json"
						})
						.then(res => {
							console.log(res.data);
							this.$router.push('/my')
						})
				} else {
					let imgs = [];
					let names = [];
					for(var i = 0; i < self.fileList.length; i++) {
						let reader = new FileReader();
						reader.readAsDataURL(self.fileList[i].raw);
						reader.onloadend = e => {
							this.getBase64(e.target.result).then(url => {
								imgs.push(url.split("base64,")[1]);
								console.log(imgs)
							});
						};

						names.push(self.fileList[i].name);

					}
					setTimeout(() => {
						let data = {
							userinfo: localStorage.getItem('userinfo'),
							subject: self.subject,
							menu_name:self.menu_name,
							sub_title:self.sub_title,
							food_name:self.food_name,
							food_count:self.food_count,
							imgs,
							names
						}
						this.$axios({
								method: "post",
								url: config.api + "/uploads",
								data,
								dataType: "json"
							})
							.then(res => {
								console.log(res.data);
								if(res.data.success) {
									this.$router.push('/my')
								}
							})
					}, 300);

				}
			},
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
	.menuSend{
		width: 100%;
		height: 100%;
		/*margin-top: 8px;*/
	}
	.menuSend .item {
		margin: 10px;
		display: flex;
		height: 50px;
		line-height: 50px;
		font-size: 17px;
		border-bottom: 1px solid #DCDCDC;
	}
	.menuSend .item .left{
		margin:0 5px;
		width: 100px;
	}
	.menuSend .item .right{
		margin-left: 5px;
	}
	.menuSend .item .right .key{
		height: 30px;
		outline: none;
  	    border: 0px;
  	    font-size: 17px;
	}
	.menuSend .subjectdiv{
		margin: 20px 10px;
	}
	.menuSend .subjectdiv .subjectinput{
		width: 380px;
		height: 160px;
		font-size: 17px;
		padding-left: 10px;
		padding-top: 5px;
		outline: none;
  	    border: 1px solid #DCDCDC;
	}
	.menuSend  .fontinfo{
		margin-left: 10px;
		font-size: 15px;
	}
	.menuSend .shareform{
		margin: 10px;
	}
	.menuSend .sendbtn{
		margin: 10px;
		width: 80px;
		height: 30px;
	}
</style>