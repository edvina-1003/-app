var mongoose = require('./db.js');
var d = new Date();

var Schema = mongoose.Schema;//schema映射manager关系型数据库的表结构

const userSchema = new Schema({
	username: {
		type: String
	},//字段
	password: {
		type: String
	},
	phone: {
		type: String
	},
	last_ip: { type: String },
//	status: {
//		type: Number,
//		default: 1  //默认值
//	},
    sex:{
    	type: String
    },
    age:{
    	type: String
    },
    
	add_time: {
		type: Number,
		default: d.getTime()  //当前时间戳
	}

});
//managerSchema与真实manager表的关联
module.exports = mongoose.model('Users', userSchema, 'users');