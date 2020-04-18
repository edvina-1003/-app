var mongoose = require('./db.js');
var d = new Date();

var Schema = mongoose.Schema;

const userLikeSchema = new Schema({
	userId:{
		type:Schema.Types.ObjectId
	},
	itemId:{
		type:Schema.Types.ObjectId
	},
	sort:{
		type:Number
	},
	status:{
		type:Number,
		default:1
	},
	add_time:{
		type:Number,
		default:d.getTime(),
	},
});
module.exports = mongoose.model('UserLike',userLikeSchema,'user_like');
