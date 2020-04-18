var mongoose = require('./db.js');
const Schema = mongoose.Schema;

var d = new Date();
const menuCateSchema = new Schema({
	title: {
		type: String
	}, // 分类名称
	status: {
		type: Number,
		default: 1
	}, //状态 0,1  
	sort: {
		type: Number,
		default: 100
	}, // 排序
	add_time: { //添加时间
		type: Number,
		default: d.getTime()
	}

});
module.exports = mongoose.model('MenuCate', menuCateSchema, 'menu_cate');