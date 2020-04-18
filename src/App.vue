<template>
  <div id="app">
  	<div class="container">
  		<div class="container-body">
  			<router-view></router-view>
  		</div>
  		
  	<!--	底部-->
  		<!--<div class="footer">
  			  <tab-bar></tab-bar>
  		</div>-->
  	</div>
  </div>
</template>

<script>
//1. 导入tabbar,生子
import tabBar from '@/components/tabBar'
import navBar from '@/components/navBar'
import navBar1 from '@/components/navBar1'

export default {
  name: 'App',
  components:{
  	tabBar,  //2.挂子
  	navBar,
  	navBar1
  	
  }
}
</script>

<style>
	 *, body{
		margin: 0;
		padding: 0;
	}
    a,ul,li{
    	text-decoration: none;
    }
    ul,li{
    	list-style: none;
    }
</style>
