const router = require('koa-router')()
var mongoose = require('../model/db.js');
var order = require('../model/orderModel.js');
var orderItem = require('../model/orderItemModel.js');
var goods = require('../model/goodsModel.js');
var goodsCate = require('../model/goodsCateModel.js');
var menu = require('../model/menuModel.js');
var menuCate = require('../model/menuCateModel.js');
var User = require('../model/userModel.js');
var tools = require('../common/tools.js');
var address = require('../model/addressModel.js');
var userLike = require('../model/userLikeModel.js');
var menuSend = require('../model/menuSendModel.js');
var workSend = require('../model/workSendModel.js');
const path = require('path');
const fs = require('fs');
var comment = require('../model/commentModel.js');

// 引入 controller 控制器
//var AlipayController = require('../controller/alipay.js');


router.get('/', async(ctx, next) => {
	await ctx.render('index')
})
//精品，最新，热销
router.get('/index/item/:type', async function(ctx) {
	var type = ctx.params.type;
	console.log(typeof type);
	var results = await goods.find({
		[type]: 1
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到内容",
			"data": []
		};
	}
})

// 获得所有分类名称信息
router.get('/cats', async function(ctx) {
	var results = await goodsCate.find({}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询分类内容",
			"data": []
		};
	}
})

// /items/searchByCat?catId='+this.curId
// 通过分类id  查找对应商品
router.get('/items/searchByCat', async function(ctx) {
	var catId = ctx.query.catId;
	var results = await goods.find({
		"cate_id": catId
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": 0,
			"message": "没有查询分类对应的商品",
			"data": []
		};
	}
})

// 调用产品详情页
///items/searchById?itemId
router.get('/items/searchById', async function(ctx) {
	var itemId = ctx.query.itemId;
	var result = await goods.find({
		"_id": itemId
	}).sort({
		"sort": -1
	});
	if(result.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": result[0]
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到具体商品",
			"data": []
		};
	}
})

//精选
router.get('/index/items/:type', async function(ctx) {
	var type = ctx.params.type;
	console.log(typeof type);
	var results = await menu.find({
		[type]: 1
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到内容",
			"data": []
		};
	}
})

// 调用产品详情页
///items/searchById?itemId
router.get('/item/searchById', async function(ctx) {
	var itemId = ctx.query.itemId;
	var result = await menu.find({
		"_id": itemId
	}).sort({
		"sort": -1
	});
	if(result.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": result[0]
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到具体商品",
			"data": []
		};
	}
})

// /items/searchByCat?catId='+this.curId
// 通过分类id  查找对应商品
router.get('/item/searchByCat', async function(ctx) {
	var catId = ctx.query.catId;
	var results = await menu.find({
		"cate_id": catId
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": 0,
			"message": "没有查询分类对应的商品",
			"data": []
		};
	}
})


//查询商品名字
//router.get('/items/search',async function(ctx){
//	var itemTitle = ctx.query.itemTitle;
//	var results = await goods.find({
//		"title":itemTitle
//	}).sort({
//		"sort":-1
//	});
//	if(results.length > 0) {
//		ctx.body = {
//			"success": true,
//			"message": "OK",
//			"data": results
//		};
//	} else {
//		ctx.body = {
//			"success": 0,
//			"message": "没有搜索到对应的商品",
//			"data": []
//		};
//	}
//	
//})



// 获得所有分类名称信息
router.get('/cat', async function(ctx) {
	var results = await menuCate.find({}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询分类内容",
			"data": []
		};
	}
})

function strToArray(str) {
	try {
		let tempIds = [];
		if(str) {
			const idsArr = str.replace(/,/g, ',').split(',');
			if(idsArr[idsArr.length - 1] == '') {
				idsArr.pop();
			}
			for(let i = 0; i < idsArr.length; i++) {
				tempIds.push({
					_id: idsArr[i]
				});
			}
		} else {
			tempIds = [{
				1: -1
			}];
		}
		return tempIds;
	} catch(error) {
		return [{
			1: -1
		}];
	}
}

router.get('/item/queryItems', async function(ctx) {
	var itemIds = ctx.request.query.itemIds; //转成数组
	var goodsIds = strToArray(itemIds);
	console.log(goodsIds);

	var results = await goods.find({
		$or: goodsIds,
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到具体内容",
			"data": []
		};
	}
})

function strToArray1(str) {
	try {
		let tempIds = [];
		if(str) {
			const idsArr = str.replace(/,/g, ',').split(',');
			if(idsArr[idsArr.length - 1] == '') {
				idsArr.pop();
			}
			for(let i = 0; i < idsArr.length; i++) {
				tempIds.push({
					_id: idsArr[i]
				});
			}
		} else {
			tempIds = [{
				1: -1
			}];
		}
		return tempIds;
	} catch(error) {
		return [{
			1: -1
		}];
	}
}



//收藏
router.get('/items/queryItems', async function(ctx) {
	var itemIds = ctx.request.query.itemIds; //转成数组
	var menuIds = strToArray1(itemIds);
	console.log(menuIds);

	var results = await menu.find({
		$or: menuIds,
	}).sort({
		"sort": -1
	});
	if(results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到具体收藏'内容",
			"data": []
		};
	}
})



// 用户登录和注册
router.post('/dologin', async function (ctx) {
	// 1. 如果数据库没有该数据则注册
	// 2. 否则登录
	const username = ctx.request.body.username;
	let password = ctx.request.body.password;
	const ip = ctx.request.ip.replace(/::ffff:/, '');
	console.log(username, password, ip)
	const userResultL = await User.find({ phone: username, password: tools.md5(password) }, '_id phone');
	if (userResultL.length) {
		ctx.session.userinfos = userResultL;
		//console.log(ctx.session.userinfos, userResultL[0].phone);
		ctx.body = {
			success: true,
			msg: '登录成功',
			userinfo: ctx.session.userinfos
		};
	} else {
		// 注册信息
		if (password.length < 6) {
			ctx.body = {
				success: false,
				msg: '密码长度不够',
			};
		} else {
			const userModel = new User({
				phone: username,
				password: tools.md5(password),
				last_ip: ip
			});
			// 保存用户
			const userResult = await userModel.save();
			if (userResult) {

				// 获取用户信息

				const userinfos = await User.find({ phone: username }, '_id phone');
				// 用户注册成功以后默认登录
				// cookies 安全      加密
				ctx.session.userinfos = userinfos;
				ctx.body = {
					success: true,
					msg: '注册并且登录成功',
					userinfo: ctx.session.userinfos
				};
			}

		}

	}
})

// 退出登录
router.get('/loginOut', async function(ctx) {
	ctx.session.userinfos = '';
	ctx.body = {
		success: true,
		msg: '退出成功',
	};
})

// 获得用户信息
router.get('/getUser', async function(ctx) {
	var userinfo = ctx.session.userinfos
	console.log(userinfo);
	if(userinfo) {
		ctx.body = { userinfo };
	} else {

		ctx.body = {
			success: false,
			message: "此用户不存在"
		}
	}
});

/*地址接口****************************************************************/

// GET-/address/addressList/{userId}
// 查询用户收货地址列表
router.get('/address/addressList/:userId', async function (ctx) {

	var uid = ctx.params.userId;
	var results = await address.find({ 'uid': uid }).sort({ "sort": -1 });
	if (results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "查询用户对应地址列表成功",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "查询用户对应地址列表失败",
			"data": []
		};
	}
})


// POST-/address/createOrUpdate
// 创建/修改收货地址
router.post('/address/createOrUpdate', async function (ctx) {
	var uid = ctx.request.body.userId;  // string 类型？转 ObjectId类型
	var name = ctx.request.body.receiver;
	var phone = ctx.request.body.mobile;
	var province = ctx.request.body.province;
	var city = ctx.request.body.city;
	var district = ctx.request.body.district;
	var addressInfo = ctx.request.body.descAddress;
	console.log(uid, name, phone, province, city, district, addressInfo);

	var addressId = ctx.request.query.addressId;
	console.log(addressId);
	if (addressId == undefined || addressId == null || addressId == '') {
		// 添加操作
		const addressCount = await address.find({ uid }).count();
		if (addressCount > 20) {
			this.ctx.body = {
				success: false,
				message: '增加收货地址失败 收货地址数量超过限制',
			};
		} else {
			// 添加新地址时，将用户对应的旧地址 default_address 设置为 0(不是默认地址)
			await address.updateMany({ uid }, { default_address: 0 });
			const addressModel = new address({
				uid,
				name,
				phone,
				province,
				city,
				district,
				addressInfo
			});
			// 保存用户
			const addressResult = await addressModel.save();
			if (addressResult) {
				ctx.body = {
					success: true,
					message: "添加地址成功"
				}
			}
		}

	} else {

		// 更新操作
		const updateResult = await address.updateOne(
			{ "_id": addressId },
			{
				uid,
				name,
				phone,
				province,
				city,
				district,
				addressInfo
			}
		);
		if (updateResult) {
			ctx.body = {
				success: true,
				message: "更新地址成功"
			}
		} else {
			ctx.body = {
				success: false,
				message: "更新地址失败"
			}
		}


	}

})

// POST-/address/fetch
//http://localhost:3000/address/fetch?userId='+userId+'&addressId='+this.addressId
// 查询地址
router.get('/address/fetch', async function (ctx) {
	var userId = ctx.request.query.userId;
	var addressId = ctx.request.query.addressId;
	var results = await address.find({ _id: addressId, uid: userId }).sort({ "sort": -1 });
	if (results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results[0]
		};
	} else {
		ctx.body = {
			"success": true,
			"message": "没有查询地址编号对应地址",
			"data": []
		};
	}
})



// GET-/address/setDefault
// 设置默认的用户收货地址
router.get('/address/setDefault', async function (ctx) {
	var uid = ctx.request.query.userId;  //用户编号
	var addressId = ctx.request.query.addressId; // 用户地址编号
	await address.updateMany({ uid: uid }, { default_address: 0 });
	await address.updateMany({ uid: uid, "_id": addressId }, { default_address: 1 });
	ctx.body = {
		success: true,
		msg: '更新默认收货地址成功'
	};
})

// POST-/address/delete/{addressId}
// 删除用户收货地址
router.get('/address/delete/:addressId', async function (ctx) {
	var addressId = ctx.params.addressId;
	var delResult = await address.deleteOne({ _id: addressId }).sort({ "sort": -1 });

	ctx.body = {
		success: true,
		msg: '删除地址成功'
	};

})


// GET-/address/default/{userId}
// 查询用户默认收货地址
router.get('/address/default/:userId', async function (ctx) {
	var userId = ctx.params.userId;
	var defaultResult = await address.find({ uid: userId, default_address: 1 });
	ctx.body = {
		success: true,
		msg: '查询到默认地址',
		data: defaultResult[0]
	};

})


/**订单处理 =====================================================================*/
function itemToArray(itemStr) {
	var items = itemStr.split(','); // [1001|5,2000|3,3043|2]
	items.pop();
	var itemsObj = [];  // [{_id:1001,num:5},{_id:2000,num:3}]
	for (k in items) {
		itemOne = items[k].split('|');
		itemsObj.push(
			{
				_id: itemOne[0],
				num: itemOne[1]
			}
		)
	}
	return itemsObj;
}
// POST - /order/createOrder
// 生成[待付款]订单
router.post('/order/createOrder', async function (ctx) {
	const uid = ctx.request.query.userId;
	const itemStr = ctx.request.query.itemStr;
	const addressId = ctx.request.query.addressId;
	//itemStr=1001|5,1002|3
	console.log(uid);

	let addressResult = await address.find({ "uid": uid, "default_address": 1 });
	var cartList = itemToArray(itemStr);
	if (addressResult && addressResult.length > 0 && cartList && cartList.length > 0) {
		var all_price = 0;
		var orderList = [];
		for (k in cartList) {
			var resultOne = await goods.find({ _id: cartList[k]._id });
			if (resultOne) {
				all_price += resultOne[0].market_price * parseInt(cartList[k].num);
				orderList.push({
					_id: resultOne[0]._id,
					title: resultOne[0].title,
					goods_img: resultOne[0].goods_img,
					market_price: resultOne[0].market_price,
					num: cartList[k].num,

				})
			}
		}
		console.log(orderList);
		//执行提交订单的操作

		let order_id = tools.getOrderId();
		let name = addressResult[0].name;
		let phone = addressResult[0].phone;
		let address = addressResult[0].address;
		let pay_status = 0;
		let pay_type = '';
		let order_status = 10;
		let orderModel = new order({ order_id, uid, name, phone, address, pay_status, pay_type, order_status, all_price });
		let orderResult = await orderModel.save();

		if (orderResult && orderResult._id) {
			//增加商品信息
			for (let i = 0; i < orderList.length; i++) {
				let json = {
					"uid": uid,
					"order_id": orderResult._id,   //订单id
					"product_title": orderList[i].title,
					"product_id": orderList[i]._id,
					"product_img": orderList[i].goods_img.split(',')[0],
					"product_price": orderList[i].market_price,
					"product_num": orderList[i].num
				}

				let orderItemModel = new orderItem(json);
				await orderItemModel.save();

			}
			ctx.body = {
				success: true,
				msg: '生成订单',
				data: orderResult.order_id
			};
		} else {
			ctx.body = {
				success: false,
				msg: '失败',
				data: []
			};
		}
	} else {
		ctx.body = {
			success: false,
			msg: '失败',
			data: []
		};
	}
})

// 确认订单信息
router.get('/confirm', async function (ctx) {


	var orderId = ctx.request.query.orderId;


	var orderResult = await order.find({ "order_id": orderId });

	if (orderResult && orderResult.length > 0) {

		//获取商品
		var orderItemResult = await orderItem.find({ "order_id": orderResult[0]._id });
		ctx.body = {
			success: true,
			msg: '成功',
			data: {
				orderResult: orderResult[0],
				orderItemResult: orderItemResult,
				id: orderId

			}
		};

	} else {
		//错误
		ctx.body = {
			success: false,
			msg: '失败',
			data: []
		};
	}

});

// 10 待付款(已下单) 20 待收货(已付款)  30 物流（发货） 40已完成（交易成功）  50 取消  60 退货
// POST - /order/queryAllOrders
// 查询所有订单
router.get('/order/queryAllOrders', async function (ctx) {
	var userId = mongoose.Types.ObjectId(ctx.request.query.userId);
	var orderStatus = parseInt(ctx.request.query.orderStatus);
	console.log(userId, orderStatus)
	if (orderStatus == 0) {
		var json = {
			uid: userId
		}
	} else {
		var json = {
			uid: userId,
			order_status: orderStatus
		}
	}
	console.log(json);
	var results = await order.aggregate([

		{
			$lookup: {  // 两表联合 jion
				from: 'order_item',
				localField: '_id',
				foreignField: 'order_id',
				as: 'itemList',
			},
		},
		{
			$match: json   // where查询条件 模糊查询
		},
		{
			$sort: { "sort": -1 }
		}

	]);
	console.log(results);
	if (results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询到订单内容",
			"data": []
		};
	}
})




// POST - /order/changeToCanceled
// 订单状态变更: 待付款 -> 已取消
router.get('/order/changeToCanceled', async (ctx, next) => {
	var orderId = ctx.request.query.orderId;
	var updateResult = await order.updateOne(
		{ "_id": orderId },
		{
			order_status: 50
		}
	);
	if (updateResult) {
		ctx.body = {
			success: true,
			message: "订单取消了"
		}
	}
})


// POST - /order/changeToFinished
// 订单状态变更: 待收货 -> 已完成
router.get('/order/changeToFinished', async (ctx, next) => {
	var orderId = ctx.request.query.orderId;
	var updateResult = await order.updateOne(
		{ "_id": orderId },
		{
			order_status: 40
		}
	);
	if (updateResult) {
		ctx.body = {
			success: true,
			message: "订单完成"
		}
	}
})

// 搜索热门话题
router.get('/index/search', async function (ctx) {
	var keyword = ctx.request.query.keyword;

	// 注意
	var json = {};
	if (keyword) {   //{title:{$regex:/羽绒裤/}}     
		json = Object.assign({ title: { $regex: new RegExp(keyword) } });
	}
	var results = await goods.find(json).sort({ "sort": -1 });
	if (results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询内容",
			"data": []
		};
	}
})
// 搜索热门话题
router.get('/indexs/search', async function (ctx) {
	var keyword = ctx.request.query.keyword;

	// 注意
	var json = {};
	if (keyword) {   //{title:{$regex:/羽绒裤/}}     
		json = Object.assign({ food_title: { $regex: new RegExp(keyword) } });
	}
	var results = await menu.find(json).sort({ "sort": -1 });
	if (results.length > 0) {
		ctx.body = {
			"success": true,
			"message": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "没有查询内容",
			"data": []
		};
	}
})

// 用户收藏商品   /item/like
router.get('/item/like', async function (ctx) {
	var userId = ctx.request.query.userId;
	var itemId = ctx.request.query.itemId;
	const userLikeModel = new userLike({
		userId,
		itemId
	});
	// 保存用户
	const userLikeResult = await userLikeModel.save();
	if (userLikeResult) {
		ctx.body = {
			"success": true,
			"message": "收藏成功"
		};
	}
})


// 用户取消收藏商品  /item/unlike
router.get('/item/unlike', async function (ctx) {
	var userId = ctx.request.query.userId;
	var itemId = ctx.request.query.itemId;
	var delResult = await userLike.deleteOne({ "userId": userId, "itemId": itemId });
	if (delResult) {
		ctx.body = {
			"success": true,
			"message": "取消收藏"
		};
	}
})

// 查询用户是否收藏商品  /item/userIsLikeItem

router.get('/item/userIsLikeItem', async function (ctx) {
	var userId = ctx.request.query.userId;
	var itemId = ctx.request.query.itemId;
	var results = await userLike.find({ "userId": userId, "itemId": itemId });
	if (results.length) {
		ctx.body = {
			"success": true,
			"message": "收藏过",
		};
	} else {
		ctx.body = {
			"success": false,
			"message": "未收藏",
		};
	}
})



//图片上传模块

async function writeFile(path, dataBuffer) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

async function getUploadFile(name,_base64) {
	
	var extname = path.extname(name);
	var paths = 'public/upload/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()+'/' + new Date().getTime()+'.'+extname;
	let base64
	if (_base64.includes('data:image/')) {
		base64 = _base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
	} else {
		base64 = _base64;
	}
	var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
	await writeFile(paths, dataBuffer)
	return {
		saveDir:  paths.slice(6).replace(/\\/g, '/')
	}
}


// 上传图像:
router.post('/upload',async function(ctx){
	const data = ctx.request.body
    console.log(data);
	if ( !data.subject) {
		return
	}
	//const userInfo = ctx.session.userinfos
	const userInfo = ctx.request.body.userinfo;
	console.log(userInfo);
	// 评论有没有上传图片
	let images = [] // 存图像路径
	if (data.imgs) {
		for (let i = 0; i < data.imgs.length; i++) {
			let img = await getUploadFile(data.names[i],data.imgs[i])
			images[i] = img.saveDir
		}
	}
   
	const datas = {
		username: JSON.parse(userInfo)[0].phone,
		subject: data.subject,
		imggroup:JSON.stringify(images)
	}

	console.log(datas)

	const sendModel= new workSend(datas)
	await sendModel.save()
	
	ctx.body = {
		success: true,
		msg: '添加作品成功'
	};

   
})
// 上传图像:
router.post('/uploads',async function(ctx){
	const data = ctx.request.body
    console.log(data);
	if ( !data.subject) {
		return
	}
	//const userInfo = ctx.session.userinfos
	const userInfo = ctx.request.body.userinfo;
	const menu_name = ctx.request.body.menu_name;
	const sub_title = ctx.request.body.sub_title;
	const food_name = ctx.request.body.food_name;
	const food_count = ctx.request.body.food_count;
	
	console.log(userInfo);
	// 评论有没有上传图片
	let images = [] // 存图像路径
	if (data.imgs) {
		for (let i = 0; i < data.imgs.length; i++) {
			let img = await getUploadFile(data.names[i],data.imgs[i])
			images[i] = img.saveDir
		}
	}
   
	const datas = {
		username: JSON.parse(userInfo)[0].phone,
		subject: data.subject,
		imggroup:JSON.stringify(images),
		menu_name:data.menu_name,
		sub_title:data.sub_title,
		food_name:data.food_name,
		food_count:data.food_count
	}

	console.log(datas)

	const sendModel= new menuSend(datas)
	await sendModel.save()
	
	ctx.body = {
		success: true,
		msg: '添加食谱成功'
	};

   
})

// 展示所有用户分享信息
router.get('/getComment',async function(ctx){
    
	//var results = await sendInfo.find({}).sort({ "sort": -1 });
	var results = await workSend.aggregate([

		{
			$lookup: {  // 两表联合 jion
				from: 'comment',
				localField: '_id',
				foreignField: 'sendId',
				as: 'commentlist',
			},
		},
		
		{
			$sort: { "add_time": -1 }
		}

	]);

	console.log(results);
	if (results.length > 0) {
		ctx.body = {
			"status": 200,
			"msg": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"status": 0,
			"msg": "没有查询到内容",
			"data": []
		};
	}
})


// 展示所有用户分享信息
router.get('/getComments',async function(ctx){
    
	//var results = await sendInfo.find({}).sort({ "sort": -1 });
	var results = await menuSend.aggregate([

		{
			$lookup: {  // 两表联合 jion
				from: 'comment',
				localField: '_id',
				foreignField: 'sendId',
				as: 'commentlist',
			},
		},
		
		{
			$sort: { "add_time": -1 }
		}

	]);

	console.log(results);
	if (results.length > 0) {
		ctx.body = {
			"status": 200,
			"msg": "OK",
			"data": results
		};
	} else {
		ctx.body = {
			"status": 0,
			"msg": "没有查询到内容",
			"data": []
		};
	}
})



module.exports = router;