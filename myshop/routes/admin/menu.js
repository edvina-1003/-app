const router = require('koa-router')()
router.prefix('/menu');

var tools = require('../../common/tools.js');

var menuCate = require('../../model/menuCateModel.js');
var menu = require('../../model/menuModel.js');
var menuImage = require('../../model/menuImageModel.js');

//图片上传模块

const multer = require('koa-multer');
var storage = multer.diskStorage({
	//  destination: function (req, file, cb) {
	//
	//
	//      cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
	//  },
	destination: 'public/upload1/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
	filename: function(req, file, cb) { /*图片上传完成重命名*/
		var fileFormat = (file.originalname).split("."); /*获取后缀名  分割数组*/
		cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
})
var upload = multer({
	storage: storage
});

router.get('/', async function(ctx) {
	// 连接Mongo 实现数据查询显示  调用方法  find(集合名,查询条件)
	var page = ctx.request.query.page || 1;
	var keyword = ctx.request.query.keyword;
	var json ={};
	if(keyword) { //{title:{$regex:/羽绒裤/}}     
		json = Object.assign({
			title: {
				$regex: new RegExp(keyword)
			}
		});
	}
	var pageSize = 3;
	var totals = await menu.find(json).count();
	var totalPages = Math.ceil(totals / pageSize);
	var offset = (page - 1) * pageSize;
	

	var results = await ctx.model.menu.aggregate([

		{
			$lookup: { // 两表联合 jion
				from: 'menu_cate',
				localField: 'cate_id',
				foreignField: '_id',
				as: 'catelist'
			}
		},
		{
			$match: json // where查询条件 模糊查询
		},
		{
			$sort: {
				"sort": -1
			}
		},
		{
			$skip: offset, // 分页
		},
		{
			$limit: pageSize, // 分页
		}

	]);

	console.log(results);


	await ctx.render('admin/menu/index.html', {
		data: results,
		sd: tools.formatTime(),
		totalPages,
		page,
		keyword
	});
})

router.get('/add', async function(ctx) {
	var results = await menuCate.find({});
	await ctx.render('admin/menu/add.html', {
		menuCate: results
	});
})
router.post('/doadd', upload.fields([{
	name: 'menu_img',
	maxCount: 5
}]), async function(ctx) {
	console.log(ctx.req.files);
	if(ctx.req.files['menu_img'] == undefined || ctx.req.files['menu_img'] == null) {
		await ctx.render('admin/error.html', {
			message: '图像必须上传',
			redirectUrl: '/admin/menu/add'
		});
	} else {
		console.log(ctx.req.body, 'body')
		var menu_image_list = ctx.req.files['menu_img'];
		var menu_img_string = '';
		for(k in menu_image_list) {
			menu_img_string += menu_image_list[k].path.substr(7).replace(/\\/g, '/') + ',';
		}
		
		var food_title = ctx.req.body.food_title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var food_name = ctx.req.body.food_name;
		var food_count = ctx.req.body.food_count;
		var food_content = ctx.req.body.food_content;
		var sort = ctx.req.body.sort;
		var menu_img = menu_img_string;
		var is_best = ctx.req.body.is_best || 0;
		var menu_keywords = ctx.req.body.menu_keywords;
		var menus = new menu({
			food_title,
			sub_title,
			cate_id,
			food_name,
			food_count,
			food_content,
			menu_img,
			sort,
			is_best,
			menu_keywords
		})
		console.log(menus, 'menus')
		var addResult = await menus.save();
		//  menuImage 表中 img_url 的单个图像一个一个存到数据库中
		for(var i = 0; i < menu_image_list.length; i++) {
			const menuImgRes = new menuImage({
				menu_id: addResult._id,
				img_url: menu_image_list[i].path.substr(7).replace(/\\/g, '/') // /upload/20191111/22324353.jpg
			});

			await menuImgRes.save();
		}
		ctx.redirect('/admin/menu');
	}

})

router.get('/edit', async function(ctx) {
	var id = ctx.request.query._id;
//	console.log(id);
	var catResults = await menuCate.find({});
	var result = await menu.find({
		_id: id
	});
//	console.log('###', ctx.state.prevPage);

	// 去 menuImage 表中查找当前产品的所有图像
	var menuImageresult = await menuImage.find({
		menu_id: id
	});

	await ctx.render('admin/menu/edit.html', {
		dataone: result[0],
		menuCate: catResults,
		menuImage: menuImageresult,
		prevPage: ctx.state.prevPage
	});

})
router.post('/doedit', upload.fields([{
	name: 'menu_img',
	maxCount: 5
}]), async function(ctx){
	var prevPage = ctx.req.body.prevPage;
	var _id = ctx.req.body._id;
	if(ctx.req.files['menu_img'] == undefined || ctx.req.files['menu_img'] == null) {
		var food_title = ctx.req.body.food_title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var food_name = ctx.req.body.food_name;
		var food_count = ctx.req.body.food_count;
		var food_content = ctx.req.body.food_content;
		var sort = ctx.req.body.sort;
		var is_best = ctx.req.body.is_best || 0;
		var menu_keywords = ctx.req.body.menu_keywords;
		var updateResult = await menu.updateOne({
			"_id": _id
		}, {
			food_title,
			sub_title,
			cate_id,
			food_name,
			food_count,
			food_content,
			sort,
			is_best,
			menu_keywords
        });
            
	}else{
		// 图像路径拼接  upload/2224ev.jpg,upload/dfdfdf.jpg,
		var menu_image_list = ctx.req.files['menu_img'];
		var menu_img_string = '';
		for(k in menu_image_list) {
			menu_img_string += menu_image_list[k].path.substr(7) + ',';
		}
		var food_title = ctx.req.body.food_title;
		var sub_title = ctx.req.body.sub_title;
		var cate_id = ctx.req.body.cate_id;
		var food_name = ctx.req.body.food_name;
		var food_count = ctx.req.body.food_count;
		var menu_content = ctx.req.body.menu_content;
		var sort = ctx.req.body.sort;
		var menu_img = menu_img_string;
		var is_best = ctx.req.body.is_best || 0;
		var menu_keywords = ctx.req.body.menu_keywords;
		var updateResult = await menu.updateOne({
			"_id": _id
		}, {
			food_title,
			sub_title,
			cate_id,
			food_name,
			food_count,
			menu_content,
			sort,
			menu_img,
			is_best,
			menu_keywords
		});
		// 修改添加图像
		for(var i = 0; i < menu_image_list.length; i++) {
			const menuImgRes = new menuImage({
				menu_id: _id,
				img_url: menu_image_list[i].path.substr(7),
			});

			await menuImgRes.save();
		}

	}

	//		ctx.redirect('/admin/menu');
	ctx.redirect(prevPage);
})
// 删除图像menuImageRemove
router.post('/menuImageRemove', async function(ctx) {

	const menu_image_id = ctx.request.body.menu_image_id;

	// 注意  图片要不要删掉   fs模块删除以前当前数据对应的图片

	const result = await menuImage.deleteOne({
		_id: menu_image_id
	}); // 注意写法

	if(result) {

		ctx.body = {
			success: true,
			message: '删除数据成功'
		}; // json
	} else {

		ctx.body = {
			success: false,
			message: '删除数据失败'
		}; //json
	}

})
module.exports = router