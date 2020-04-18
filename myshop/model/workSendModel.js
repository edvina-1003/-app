var mongoose = require('./db.js');
const Schema = mongoose.Schema;

var d = new Date();
const workSSchema = new Schema({
	username: {
		type: String
	}, // 发表人
	subject: {
		type: String
	}, // 内容  
	imggroup: {
		type: String
	}, //发表图
	star: {
		type: String
	}, //收藏
	add_time: { //发送时间
		type: Number,
		default: d.getTime()
	}

});
module.exports = mongoose.model('WorkSend', workSSchema, 'work_send');