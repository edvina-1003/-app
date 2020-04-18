const router = require('koa-router')()
var svgCaptcha = require('svg-captcha');
var managerModel = require('../../model/managerModel');

router.prefix('/login')
//登录
router.get('/',async function (ctx, next) {
	await ctx.render('admin/login.html');//安装并引入验证码
})
//登录的表单提交
router.post('/dologin',async(ctx)=>{
	//session中存的验证码
	//获得表单中验证码，用户密码 实现数据库验证登录
	console.log(ctx.session.code);
	console.log(ctx.request.body);//接收post数据
	//1.接收表单数据（表单验证码，用户，密码）
	var verify = ctx.request.body.verify;
	var username = ctx.request.body.username;
	var password = ctx.request.body.password;
	//将验证码都toLocalLowerCase()转为小写
	//2.接收验证码程序的session数据ctx.session.code
	//3.判断 (a.判断验证码是否一致
	if (ctx.session.code.toLocaleLowerCase()===verify.toLocaleLowerCase()) {
		
		//用户名密码 实现数据库验证登录
		// (b.判断用户名和密码是否在manager集合中查找到result的结果
		var results = await managerModel.find({username:username,password:password});
		
		if (results.length>0) {
			// (c.将用户信息存在session，并且设置全局变量
			ctx.session.userInfo = results[0];
			ctx.state.userInfo = ctx.session.userInfo;//state全局变量
			await ctx.render('admin/index');
		} else{
			await ctx.render('admin/error.html',{message:'用户名或密码不正确',redirectUrl:'/admin/login'});
		}
	} else{
		await ctx.render('admin/error.html',{message:'验证码错误',redirectUrl:'/admin/login'});
	}
})

router.get('/verify',async function(ctx){
	var captcha = svgCaptcha.create({    //实例化验证码
		size:4,
		fontSize:50,
		width:120,
		height:34,
		backgroud:"#cc9966"
	});
   	//console.log(captcha.text);
    //保存生成的验证码存在session
    ctx.session.code=captcha.text;
    
    //设置响应头
    ctx.response.type='image/svg+xml';
    ctx.body=captcha.data;
})
//退出
router.get('/loginout',async (ctx)=>{
	ctx.session.userInfo=null;
	ctx.redirect('/admin/login');
})

module.exports = router
