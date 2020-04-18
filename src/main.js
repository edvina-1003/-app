// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'  //生子
import router from './router'
import VueRouter from 'vue-router'
import Swiper from 'swiper'
// 引入   px 转  rem 单位
import 'lib-flexible'
import './assets/css/iconfont.css'
import './assets/css/swiper.min.css'
// 引入全局  $axios
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(VueJsonp)
//import VueJsonp from 'vue-jsonp'
//Vue.use(VueJsonp)

// 导入  vuex
import store from './store.js';
import {Badge} from 'mint-ui';
Vue.component(Badge.name,Badge);

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// 引入 mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

   //加载loadding 图像
//Mint.Indicator.open('加载中');
   //弹出提示框
//Mint.MessageBox('提示', '操作成功');
//popup 下册弹出层

//Mint.MessageBox({
//title: 'Notice',
//message: 'Are you sure?',
//showCancelButton: true
//});

// 图片懒加载
import VueLazyload from 'vue-lazyload';
//Vue.use(VueLazyload, {
//	  loading: require("./assets/images/loading.gif")
//})

//request 请求拦截器
axios.interceptors.request.use(function (req) {
  // 显示loading
  Mint.Indicator.open('加载...');
  return req;
})
// response响应拦截器
axios.interceptors.response.use(function (res) {
  // 隐藏loading

  Mint.Indicator.close();
  return res;

})


//// swiper css样式
//import 'swiper/dist/css/swiper.min.css'
// 导入 css 样式
//import './assets/css/jd.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 挂路由
  store,  // 挂vuex
  components: { App }, //挂子
  template: '<App/>'  //用子
})
