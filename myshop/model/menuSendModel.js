var mongoose = require('./db.js')
const Schema = mongoose.Schema;
const d = new Date();
const menuSSchema = new Schema({
	username: {//发表人
		type: String
	},
	menu_name: {//标题
		type: String
	},
	sub_title: {//子标题
		type: String
	},
	food_name: {//用料
		type: String
	},
	food_count: {//数量
		type: String
	},
	subject: {//内容
		type: String,
		default: ''
	},
	imggroup: {
		type: String
	}, //发表图
	heart:{   //收藏
		type: String
	},
	add_time: { //时间
		type: Number,
		default: d.getTime(),
	},
	status: {
		type: Number,
		default: 1
	}
});
module.exports = mongoose.model('MenuSend', menuSSchema, 'menu_send');