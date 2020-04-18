const router = require('koa-router')()
var manager = require('../model/managerModel.js');
var goodsCate = require('../model/goodsCateModel.js');
var goods = require('../model/goodsModel.js');
var users = require('../model/usersModel.js');
var menu = require('../model/menuModel.js');
var menuCate = require('../model/menuCateModel.js');
//var comment = require('../model/commentModel.js');
var ueditor = require('koa2-ueditor')
var user = require('../model/userModel.js');
var order = require('../model/orderModel.js');
var orderItem = require('../model/orderItemModel.js');


router.prefix('/admin')

var url=require('url');
//创建应用级路由中间件，让后台的每个页面都访问此方法，判断用户是否登录
router.use(async function(ctx,next){
	ctx.model={
		manager:manager,
		goods:goods,
		goodsCate:goodsCate,
		users:users,
		menuCate:menuCate,
		menu:menu,
		comment:comment,
		order:order
	}
	ctx.state.prevPage = ctx.request.headers['referer'];
	var pathname = url.parse(ctx.request.url).pathname;
	

	
	//权限判断
	if(ctx.session.userInfo) {    //判断是否存在
		ctx.state.userInfo=ctx.session.userInfo;//全局变量
		await next();
	}else{
		//判断哪些页面不用判断session
		if(pathname=='/admin/login'||pathname=='/admin/login/dologin'||pathname=='/admin/login/verify'){
			await next();
		}else{
		    ctx.redirect('/admin/login');
		}
	}
})

router.get('/',async function (ctx, next) {
	await ctx.render('admin/index.html');
})

//每个后台路由能访问的公共的处理的路由方法(等同于baseController 类)
 router.get('/changeStatus',async (ctx)=>{

	    //console.log(ctx.query);
	
	    var collectionName=ctx.query.collectionName; /*数据库表*/
	    var attr=ctx.query.attr; /*属性*/
	    var id=ctx.query.id;   /*更新的 id*/
	    
	    var data= await ctx.model[collectionName].find({"_id":id});
	    
	    if(data.length>0){
	        if(data[0][attr]==1){
	            var json = { /*es6 属性名表达式*/
	                [attr]: 0
	            };
	        }else{
	            var json = {
	                [attr]: 1
	            };
	        }
	
	        let updateResult=await  ctx.model[collectionName].update({"_id":id},json);
	
	        if(updateResult){
	            ctx.body={"message":'更新成功',"success":true};
	        }else{
	            ctx.body={"message":"更新失败","success":false}
	        }
	
	    }else{
	        ctx.body={"message":'更新失败,参数错误',"success":false};
	    }
	
})


// 公共删除封装
router.get('/del',async function(ctx){
	var collection=ctx.query.collection; /*数据库表*/
	var _id=ctx.query._id;   /*删除 id*/
	var delResult=await ctx.model[collection].deleteOne({"_id":_id});
    ctx.redirect(ctx.state.prevPage); //  /admin/goodsCate/ /admin/goods?page=2   从哪来返回哪去
})

// 公共的排序封装
router.get('/editNum',async function(ctx){
	const model = ctx.request.query.model; /* 数据库表 Model*/
    const attr = ctx.request.query.attr; /* 更新的属性 如:sort */
    const id = ctx.request.query.id; /* 更新的 id*/
    const num =ctx.request.query.num; /* 数量*/

    const result = await ctx.model[model].find({ _id: id });

    if (result.length > 0) {

	      const json = {/* es6 属性名表达式*/
	
	        [attr]: num,
	      };
	
	      // 执行更新操作
	      const updateResult = await ctx.model[model].updateOne({ _id: id }, json);
	
	      if (updateResult) {
	        ctx.body = { message: '更新成功', success: true };
	      } else {
	
	        ctx.body = { message: '更新失败', success: false };
	      }

      } else {

        // 接口
        ctx.body = { message: '更新失败,参数错误', success: false };
      }
})



//引
var managerRouter = require('./admin/manager.js'); 
var loginRouter = require('./admin/login.js');
var goodsCateRouter = require('./admin/goodsCate.js');
var goodsRouter = require('./admin/goods.js');
var usersRouter = require('./admin/users.js');
var menuRouter = require('./admin/menu.js');
var menuCateRouter = require('./admin/menuCate.js');
var orderRouter = require('./admin/order.js');
//var commentRouter = require('./admin/comment.js');

//挂
router.use(managerRouter.routes(),managerRouter.allowedMethods());
router.use(loginRouter.routes(),managerRouter.allowedMethods());
router.use(goodsCateRouter.routes(),goodsCateRouter.allowedMethods());
router.use(goodsRouter.routes(),goodsRouter.allowedMethods());
router.use(usersRouter.routes(),usersRouter.allowedMethods());
router.use(menuRouter.routes(),menuRouter.allowedMethods());
router.use(menuCateRouter.routes(),menuCateRouter.allowedMethods());
router.use(orderRouter.routes(),orderRouter.allowedMethods());
//router.use(commentRouter.routes(),commentRouter.allowedMethods());

router.all('/editorUpload',ueditor(['public',{
	"imageAllFiles":[".png",".jpg",".jpeg"],
	"imagePathFormat":"http://localhost:3000/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"
}
	
])) 

module.exports = router
