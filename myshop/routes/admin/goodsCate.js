const router = require('koa-router')()
router.prefix('/goodsCate');

var tools = require('../../common/tools.js');

var goodsCate = require('../../model/goodsCateModel.js');

router.get('/',async function(ctx){
	// 连接Mongo 实现数据查询显示  调用方法  find(集合名,查询条件)
	
    var results = await goodsCate.find({});
 
	await ctx.render('admin/goodsCate/index.html',{data:results,sd:tools.formatTime()});
})

// 添加
router.get('/add', async function(ctx){
	await ctx.render('admin/goodsCate/add.html');
})
router.post('/doadd',async function(ctx){
	//console.log(ctx.request.body);
	var title = ctx.request.body.title;
	var sort =  ctx.request.body.sort;
	
	var cate  = new goodsCate({
		title:title,
		sort:sort
	})
	var addResult =await  cate.save();
	
	ctx.redirect('/admin/goodsCate');
})

// 更新
router.get('/edit', async function(ctx){
	var id = ctx.request.query._id;
	console.log(id);
	var result = await goodsCate.find({_id:id});
	await ctx.render('admin/goodsCate/edit.html',{dataone:result[0]});
})

router.post('/doEdit',async (ctx)=>{
	
	    var _id=ctx.request.body._id;
	    var title=ctx.request.body.title;
	    var sort=ctx.request.body.sort;
	    var status = ctx.request.body.status;
	    console.log(ctx.request.body);
	    var updateResult=await goodsCate.updateOne({"_id":_id},{"title":title,"sort":sort,"status":status});
	    
	    ctx.redirect('/admin/goodsCate');
	         
	
})

module.exports = router