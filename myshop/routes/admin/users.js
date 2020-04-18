const router = require('koa-router')()
router.prefix('/users')

var usersModel = require('../../model/usersModel');

var tools = require('../../common/tools.js');

router.get('/',async function(ctx,next){
	var results = await usersModel.find({});
	await ctx.render('admin/users/index.html',{data:results,sd:tools.formatTime()})
	
	
})
router.get('/add',async(ctx)=>{
	await ctx.render('admin/users/add');
})
router.post('/doadd',async(ctx)=>{
	var username = ctx.request.body.username;
	var password = tools.md5(ctx.request.body.password);
	var phone = ctx.request.body.phone;
	var age = ctx.request.body.age;
	var sex = ctx.request.body.sex;
	var last_ip = ctx.request.body.last_ip;
	
	var users = new usersModel({
		username:username,
		password:password,
		phone:phone,
		age:age,
		sex:sex,
		last_ip:last_ip
	})
    
	var addResult = await users.save();
	ctx.redirect('/admin/users');
})
//修改
router.get('/edit',async (ctx)=>{
	var _id = ctx.query._id;
	var result = await usersModel.find({"_id":_id});
	await ctx.render('admin/users/edit',{
		dataone:result[0]
	})
})
router.post('/doedit',async (ctx)=>{
	var _id = ctx.request.body._id;
	var username = ctx.request.body.username;
	var password = tools.md5(ctx.request.body.password);
	var phone = ctx.request.body.phone;
	var age = ctx.request.body.age;
	var sex = ctx.request.body.sex;
	var last_ip = ctx.request.body.last_ip;
	
	var updateResult = await usersModel.updateOne({"_id":_id},{"username":username,"password":password,"phone":phone,"age":age,"sex":sex,"last_ip":last_ip});
	ctx.redirect('/admin/users');
})

module.exports = router