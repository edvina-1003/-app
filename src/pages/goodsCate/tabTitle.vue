<template>
	<div>
		<ul class="tabtitle">
			<li v-for="(item,key) in titles" 
				:key="key"
				:class="{active:curId==item.id}"
				@click="switchTab(item._id)"
				>
				{{item.title}}
			</li>
			
		</ul>
	</div>
</template>

<script>
	export default{
		name:'tabTitle',
		data(){
			return{
				titles:[],
				curId:null
			}
		},
		methods:{
			getTitles(){
				this.$axios.get('http://localhost:3000/cats')
				.then(res=>{
					console.log(res.data.data);
                    this.titles = res.data.data;
                    this.switchTab(this.titles[0]._id);
				})
				.catch(e=>{
					console.log(e);
				});
			},
			switchTab(id){
				if(id==this.curId){
					return false;
				}
				this.curId = id;
				function getTitleById(titles,id){
					for(var k in titles){
						if(titles[k]._id==id){
							return titles[k].title;
						}
					}
					return false
				}
				// 广播把 curId 传递给父元素
				//this.$emit('end',this.curId,this.titles[id].title);
				this.$emit('end',this.curId,getTitleById(this.titles,this.curId));
			}
		},
		mounted(){
			this.getTitles();
		}
	}
</script>

<style scoped>
	
	.tabtitle{
		width: 130px;
	}
	.tabtitle li{
		text-align: center;
		border-right: 1px solid #CCCCCC;
		border-bottom: 1px solid #CCCCCC;
		font: bold 14px/45px 微软雅黑;
	}
	.tabtitle li.active{
		color: #FF6600;
		border-right: 0;
	}
</style>