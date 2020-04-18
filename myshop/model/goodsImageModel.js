var mongoose = require('./db.js')
const Schema = mongoose.Schema;
var d = new Date();
const GoodsImageSchema = new Schema({
	goods_id:{type:Schema.Types.ObjectId},
	img_url:{type:String},
//	color_id:{
//		type:Schema.Types.Mixed,
//		default:''
//	},
	status:{type:Number,default:1},
	add_time:{
		type:Number,
		default:d.getTime()
	}
});
module.exports = mongoose.model('GoodsImage',GoodsImageSchema,'goods_image');
