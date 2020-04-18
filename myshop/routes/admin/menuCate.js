const router = require('koa-router')()
router.prefix('/menuCate');

var tools = require('../../common/tools.js');

var menuCate = require('../../model/menuCateModel.js');

router.get('/',async function(ctx){
	// 连接Mongo 实现数据查询显示  调用方法  find(集合名,查询条件)
	
    var results = await menuCate.find({});
   
	await ctx.render('admin/menuCate/index.html',{data:results,sd:tools.formatTime()});
})
router.get('/add',async function(ctx){
	await ctx.render('admin/menuCate/add.html');
})
router.post('/doadd',async function(ctx){
	var title = ctx.request.body.title;
	var sort = ctx.request.body.sort;
	
	var cate = new menuCate({
		title:title,
		sort:sort
	})
	var addResult = await cate.save();
	ctx.redirect('/admin/menuCate');
})
router.get('/edit',async function(ctx){
	var id = ctx.request.query._id;
	console.log(id);
	var result = await menuCate.find({
		_id:id
	});
	await ctx.render('admin/menuCate/edit.html',{dataone:result[0]});
})
router.post('/doEdit',async (ctx)=>{
	var _id=ctx.request.body._id;
	var title = ctx.request.body.title;
	var sort = ctx.request.body.sort;
	var status = ctx.request.body.status;
	var updateResult = await menuCate.updateOne({"_id":_id},{"title":title,"sort":sort,"status":status});
	ctx.redirect('/admin/menuCate');
})
module.exports = router