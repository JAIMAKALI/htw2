var mongoose=require('mongoose');
var PostSchema=require('./post');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  name:{type:String,
  validate:{
    validator:(name)=>name.length>=3,
    message:'name must be greater than 3'
  }
  },
  posts:[PostSchema],
  blogPost:[{
    type:Schema.Types.ObjectId,
    ref:'blogPost'
  }],
  address:{type:String},
  imageUrl:{type:String}
});

userSchema.virtual('postCount').get(function(){
  return this.posts.length;
})

userSchema.pre('remove',function(next){
  var BlogPost=mongoose.model('blogPost');
  BlogPost.remove({_id:{$in:this.blogPost}}).then(()=>next());
});

var User=mongoose.model('user',userSchema);
module.exports={User};
