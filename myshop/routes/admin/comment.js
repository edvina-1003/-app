       const router = require('koa-router')()
router.prefix('/comment');

var tools = require('../../common/tools.js');


var comment = require('../../model/commentModel.js');
var commentImage = require('../../model/commentImageModel.js');

//图片上传模块

const multer = require('koa-multer');
var storage = multer.diskStorage({
	//  destination: function (req, file, cb) {
	//
	//
	//      cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
	//  },
	destination: 'public/upload/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
	filename: function (req, file, cb) {   /*图片上传完成重命名*/
		var fileFormat = (file.originalname).split(".");   /*获取后缀名  分割数组*/
		cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
})
var upload = multer({ storage: storage });


router.get('/', async function (ctx) {
	// 连接Mongo 实现数据查询显示  调用方法  find(集合名,查询条件)
	// 1. 动态当前页
	var page = ctx.request.query.page || 1;

	var keyword = ctx.request.query.keyword;

	// 注意
	var json = {};
	if (keyword) {   //{title:{$regex:/羽绒裤/}}     
		json = Object.assign({ title: { $regex: new RegExp(keyword) } });
	}
	// 2. 每页显示条数
	var pageSize = 3;
	// 3. 总条数
	var totals = await comment.find(json).count();
	// 4. 总页数
	var totalPages = Math.ceil(totals / pageSize);
	// 5.每页开始的编号
	var offset = (page - 1) * pageSize;
	//	
	//	// 分页   skip(offset).limit(pageSize)
	//var results = await comment.find(json).skip(offset).limit(pageSize).sort({"sort":-1});

	var results = await ctx.model.comment.aggregate([

		{
			$lookup: {  // 两表联合 jion
				from: 'comment_cate',
				localField: 'cate_id',
				foreignField: '_id',
				as: 'catelist',
			},
		},
		{
			$match: json   // where查询条件 模糊查询
		},
		{
			$sort: { "sort": -1 }
		},
		{
			$skip: offset,  // 分页
		},
		{
			$limit: pageSize,  // 分页
		}

	]);

	console.log(results);

	await ctx.render('admin/comment/index.html', {
		data: results,
		sd: tools.formatTime(),
		totalPages,
		page,
		keyword
	});
})
//
// 添加
router.get('/add', async function (ctx) {
	// 查询 commentCate 表中所有的分类信息
	var results = await commentCate.find({});
	await ctx.render('admin/comment/add.html', { commentCate: results });
})
router.post('/doadd', upload.fields([
	{
		name: 'comment_img',
		maxCount: 5
	}
]), async function (ctx) {

	if (ctx.req.files['comment_img'] == undefined || ctx.req.files['comment_img'] == null) {
		//ctx.redirect(prevPage);

		await ctx.render('admin/error.html', { message: '图像必须上传', redirectUrl: '/admin/comment/add' });
	} else {
		// 图像路径拼接  upload/2224ev.jpg,upload/dfdfdf.jpg,
		var comment_image_list = ctx.req.files['comment_img'];
		var comment_img_string = '';
		for (k in comment_image_list) {
			comment_img_string += comment_image_list[k].path.substr(7).replace(/\\/g, '/') + ',';
		}

		var title = ctx.req.body.title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var comment_number = ctx.req.body.comment_number;
		var shop_price = ctx.req.body.shop_price;
		var market_price = ctx.req.body.market_price;
		var comment_size = JSON.stringify(ctx.req.body.comment_size);
		var comment_color = JSON.stringify(ctx.req.body.comment_color);
		var comment_keywords = ctx.req.body.comment_keywords;
		var comment_content = ctx.req.body.comment_content;
		var sort = ctx.req.body.sort;
		var is_new = ctx.req.body.is_new || 0;
		var is_hot = ctx.req.body.is_hot || 0;
		var is_best = ctx.req.body.is_best || 0;
		var comment_img = comment_img_string;
		var comments = new comment({
			title,
			sub_title,
			cate_id,
			comment_number,
			shop_price,
			market_price,
			comment_img,
			comment_size,
			comment_color,
			comment_keywords,
			comment_content,
			sort,
			is_new,
			is_hot,
			is_best
		})
		//console.log(ctx.req.files);
		var addResult = await comments.save();

		//  commentImage 表中 img_url 的单个图像一个一个存到数据库中
		for (var i = 0; i < comment_image_list.length; i++) {
			const commentImgRes = new commentImage({
				comment_id: addResult._id,
				img_url: comment_image_list[i].path.substr(7).replace(/\\/g, '/')// /upload/20191111/22324353.jpg
			});

			await commentImgRes.save();
		}
		ctx.redirect('/admin/comment');
	}

})
//
//// 更新
router.get('/edit', async function (ctx) {
	var id = ctx.request.query._id;

	var catResults = await commentCate.find({});
	var result = await comment.find({ _id: id });
	console.log('###', ctx.state.prevPage);

	// 去 commentImage 表中查找当前产品的所有图像
	var commentImageresult = await commentImage.find({ comment_id: id });
	await ctx.render('admin/comment/edit.html',
		{
			dataone: result[0],
			commentCate: catResults,
			commentImage: commentImageresult,
			prevPage: ctx.state.prevPage   // /admin/comment?page=2
		});
})
//
router.post('/doedit', upload.fields([
	{
		name: 'comment_img',
		maxCount: 5
	}
]), async function (ctx) {

	var prevPage = ctx.req.body.prevPage;
	var _id = ctx.req.body._id;
	if (ctx.req.files['comment_img'] == undefined || ctx.req.files['comment_img'] == null) {

		var title = ctx.req.body.title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var comment_number = ctx.req.body.comment_number;
		var shop_price = ctx.req.body.shop_price;
		var market_price = ctx.req.body.market_price;
		var comment_size = JSON.stringify(ctx.req.body.comment_size);
		var comment_color = JSON.stringify(ctx.req.body.comment_color);
		var comment_keywords = ctx.req.body.comment_keywords;
		var comment_content = ctx.req.body.comment_content;
		var sort = ctx.req.body.sort;
		var is_new = ctx.req.body.is_new || 0;
		var is_hot = ctx.req.body.is_hot || 0;
		var is_best = ctx.req.body.is_best || 0;
		var updateResult = await comment.updateOne({ "_id": _id }, {
			title,
			sub_title,
			cate_id,
			comment_number,
			shop_price,
			market_price,
			comment_size,
			comment_color,
			comment_keywords,
			comment_content,
			sort,
			is_new,
			is_hot,
			is_best
		});
	} else {
		// 图像路径拼接  upload/2224ev.jpg,upload/dfdfdf.jpg,
		var comment_image_list = ctx.req.files['comment_img'];
		var comment_img_string = '';
		for (k in comment_image_list) {
			comment_img_string += comment_image_list[k].path.substr(7) + ',';
		}

		var title = ctx.req.body.title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var comment_number = ctx.req.body.comment_number;
		var shop_price = ctx.req.body.shop_price;
		var market_price = ctx.req.body.market_price;
		var comment_size = JSON.stringify(ctx.req.body.comment_size);
		var comment_color = JSON.stringify(ctx.req.body.comment_color);
		var comment_keywords = ctx.req.body.comment_keywords;
		var comment_content = ctx.req.body.comment_content;
		var sort = ctx.req.body.sort;
		var is_new = ctx.req.body.is_new || 0;
		var is_hot = ctx.req.body.is_hot || 0;
		var is_best = ctx.req.body.is_best || 0;
		var comment_img = comment_img_string;

		var updateResult = await comment.updateOne({ "_id": _id }, {
			title,
			sub_title,
			cate_id,
			comment_number,
			shop_price,
			market_price,
			comment_img,
			comment_size,
			comment_color,
			comment_keywords,
			comment_content,
			sort,
			is_new,
			is_hot,
			is_best
		});
		//  ctx.state.prevPage 返回到上一页路径上 
		//ctx.redirect('/admin/comment');

		// 修改添加图像
		for (var i = 0; i < comment_image_list.length; i++) {
			const commentImgRes = new commentImage({
				comment_id: _id,
				img_url: comment_image_list[i].path.substr(7),
			});

			await commentImgRes.save();
		}

	}
	ctx.redirect(prevPage);

})


// 删除图像commentImageRemove
router.post('/commentImageRemove', async function (ctx) {

	const comment_image_id = ctx.request.body.comment_image_id;

	// 注意  图片要不要删掉   fs模块删除以前当前数据对应的图片



	if (result) {

		ctx.body = { success: true, message: '删除数据成功' };  // json
	} else {

		ctx.body = { success: false, message: '删除数据失败' }; //json
	}
 
})
module.exports = router