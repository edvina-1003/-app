var mongoose = require('../db')

const Schema = mongoose.Schema;

var d=new Date();
const youjiPls = new Schema({
    youjiId: { type:Schema.Types.ObjectId  },// 对应youjiID
    plUserId: { type:Schema.Types.ObjectId  },// 对应评论人userID
    plContent: {type: String,default: ''}, //评论内容
    add_time: {
        type:Number,
        default: d.getTime()  //当前时间戳   评论时间
    },
    status: { type: Number,default:1  },     // 状态 0 1
});
module.exports = mongoose.model('YoujiPls', youjiPls,'youjiPls');
