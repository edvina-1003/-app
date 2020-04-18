import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import shiji from '@/pages/shiji'
import heart from '@/pages/heart'
import my from '@/pages/my'
import my1 from '@/pages/my1'
import detail from '@/pages/detail'
import cart from '@/pages/cart'
import modify from '@/pages/modify'
import talk from '@/pages/talk'
import login from "@/pages/my/login"
import register from '@/pages/register'
import category from '@/pages/category'
import change from '@/pages/change'
import search from '@/pages/search'
import productDetail from '@/pages/productDetail'
import goodsCate from '@/pages/goodsCate'
import confirmOrder from '@/pages/order/confirmOrder'
import addressList from '@/pages/address/addressList'
import addAddress from '@/pages/address/addAddress'
import orderList from '@/pages/my/orderList'
import payment from '@/pages/order/payment'
import success from '@/pages/order/success'
import searchMenu from '@/pages/searchMenu'
import send from '@/pages/send'
import menuSend from '@/pages/send/menuSend'
import workSend from '@/pages/send/workSend'

Vue.use(Router)

export default new Router({
	routes:[
	{
		path:'/home',
		name:'home',
		component:home
	},
	{
		path:'/shiji',
		name:'shiji',
		component:shiji
	},
	{
		path:'/heart',
		name:'heart',
		component:heart
	},
	{
		path:'/my',
		name:'my',
		component:my
	},
	{
		path:'/register',
		name:'register',
		component:register
	},
	{
		path:'/login',
		name:'login',
		component:login
	},
	
	{
		path:'/modify',
		name:'modify',
		component:modify
	},
	
	{
		path:'/talk',
		name:'talk',
		component:talk
	},
	
	{
		path:'*',
		redirect:'/home'
	},{
		path:'/detail/:id',
		name:'detail',
		component:detail
	},{
		path:'/search',
		name:'search',
		component:search
	},
	{
		path:'/searchMenu',
		name:'searchMenu',
		component:searchMenu
	},
	{
		path:'*',
		redirect:'/my'
	},{
		path:'/my1',
		name:'my1',
		component:my1
	},
	{
		path:'*',
		redirect:'home'
	},{
		path:'/category',
		name:'category',
		component:category
	},
	{
		path:'*',
		redirect:'my'
	},{
		path:'/change',
		name:'change',
		component:change
	},
	{
		path:'*',
		redirect:'shiji'
	},{
		path:'/goodsCate',
		name:'goodsCate',
		component:goodsCate
	},{
		path:'/productDetail/:id',
		name:'productDetail',
		component:productDetail
	},{
		path:'/cart',
		name:'cart',
		component:cart
	},
	{
		path:'/confirmOrder',
		name:'confirmOrder',
		component:confirmOrder
	},
	{
		path:'/payment',
		name:'payment',
		component:payment
	},
	{
		path:'/success',
		name:'success',
		component:success
	},
	{
		path:'/addressList',
		name:'addressList',
		component:addressList
	},
	{
		path:'/addAddress',
		name:'addAddress',
		component:addAddress
	},{
		path:'*',
		redirect:'my'
	},{
		path:'/orderList',
		name:'orderList',
		component:orderList
	},
	{
      path: '/login',
      name: 'login',
      component: login
	},
	{
		path:'/send',
		name:'send',
		component:send
	},
	{
		path:'*',
		redirect:'/heart'
	},{
		path:'/detail/:id',
		name:'detail',
		component:detail
	},
	{
		path:'/menuSend',
		name:'menuSend',
		component:menuSend
	},
	{
		path:'/workSend',
		name:'workSend',
		component:workSend
	}
	]
})
