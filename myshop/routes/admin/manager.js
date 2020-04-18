const router = require('koa-router')()
router.prefix('/manager')

//mongoose 对象中 数据manager表的模型对象
var managerModel = require('../../model/managerModel');

var tools = require('../../common/tools.js');
//db类库实现数据库增删改查
//var DB = require('../../model/db.js');//DB类的实例化对象

router.get('/',async function (ctx, next) {
  //ctx.body = '我是管理员列表页'
  //连接Mongo 实现数据查询显示
	var results = await managerModel.find({});
	await ctx.render('admin/manager/index.html',{data:results,sd:tools.formatTime()})
	
})

//添加

router.get('/add',async (ctx)=>{//渲染是异步
//	ctx.body = '我是管理员添加页'
    await ctx.render('admin/manager/add');
})

router.post('/doadd',async (ctx)=>{//封装是同步
	var username=ctx.request.body.username;
	var password=tools.md5(ctx.request.body.password);
	var mobile = ctx.request.body.mobile;
	
	var manager = new managerModel({
		username:username,//封装传值
		mobile:mobile,
		password:password
	})
	var addResult=await manager.save();
	ctx.redirect('/admin/manager');
})
//修改
router.get('/edit',async(ctx)=>{
	var _id = ctx.query._id;
	var result=await managerModel.find({"_id":_id});
	await ctx.render('admin/manager/edit',{
		dataone:result[0]
	})
})

router.post('/doedit',async(ctx)=>{
	var _id = ctx.request.body._id;
	var username = ctx.request.body.username;
	var password = tools.md5(ctx.request.body.password);
	var mobile = ctx.request.body.mobile;
	
	var updateResult = await managerModel.updateOne({"_id":_id},{"username":username,"password":password,"mobile":mobile});
	ctx.redirect('/admin/manager');
})
//删除
//router.get('/del',async(ctx)=>{
//	var _id = ctx.request.query._id;
//	console.log(_id);
//	var delReault = await managerModel.remove({"_id":_id});
//	ctx.redirect('/admin/manager');
//})

module.exports = router
