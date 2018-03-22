var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var CommentSchema=new Schema({
  comment:String,
  time:{type:Date,default:Date.now},
  author:{
    type:Schema.Types.ObjectId,
    ref:'user'
  }
});

var Comments= mongoose.model('comment',CommentSchema);

module.exports={Comments};
