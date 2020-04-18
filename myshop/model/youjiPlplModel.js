var mongoose = require('../db')

const Schema = mongoose.Schema;

var d=new Date();
const youjiPlpls = new Schema({
    youjiId: { type:Schema.Types.ObjectId  },// 对应youjiID
    oldPlUserId: { type:Schema.Types.ObjectId  },// 原先评论
    newPlUserId: { type:Schema.Types.ObjectId  },// 评论的评论
    plContent: {type: String,default: ''}, //评论内容
    add_time: {
        type:Number,
        default: d.getTime()  //当前时间戳   评论时间
    },
    status: { type: Number,default:1  },     // 状态 0 1
});
module.exports = mongoose.model('YoujiPlpls', youjiPlpls,'youjiPlpls');
