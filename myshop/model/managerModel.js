var mongoose = require('./db.js');
var d = new Date();

var Schema = mongoose.Schema;//schema映射manager关系型数据库的表结构

const managerSchema = new Schema({
	username: {
		type: String
	},//字段
	password: {
		type: String
	},
	mobile: {
		type: String
	},
	status: {
		type: Number,
		default: 1  //默认值
	},
	add_time: {
		type: Number,
		default: d.getTime()  //当前时间戳
	}

});
//managerSchema与真实manager表的关联
module.exports = mongoose.model('Manager', managerSchema, 'manager');