var mongoose = require('./db.js')
const Schema = mongoose.Schema;
var d = new Date();
const menuImageSchema = new Schema({
	menu_id:{type:Schema.Types.ObjectId},
	img_url:{type:String},

	status:{type:Number,default:1},
	add_time:{
		type:Number,
		default:d.getTime()
	}
});
module.exports = mongoose.model('MenuImage',menuImageSchema,'menu_image');