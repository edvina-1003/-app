var mongoose = require('./db.js')
const Schema = mongoose.Schema;
var d = new Date();
const MenuSchema = new Schema({
	food_title: {
		type: String,
		default: ''
	}, // 产品名称
	sub_title: {
		type: String,
		default: ''
	}, // 产品子标题
	cate_id: {
		type: Schema.Types.ObjectId
	}, // 两表关联  分类id 
	food_name: {
		type: String,
		default: ''
	}, //用料
	food_count: {
		type: String,
		default: ''
	}, //用料个数
	menu_img: {
		type: String,
		default: ''
	}, //视频照片
	food_content: { // 食谱内容
		type: String,
		default: ''
	},
	sort: {
		type: Number,
		default: 100
	},
	status: {
		type: Number,
		default: 1
	}, // 状态 0 1
	add_time: { //创建时间
		type: Number,
		default: d.getTime()
	},
	is_best: { // 最新商品
		type: Number,
		default: 0
	},
	menu_keywords: { // 食谱关键词
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Menu', MenuSchema, 'menu');