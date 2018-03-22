var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var PointSchema=new Schema({
  type:{type:String,default:'Point'},
  coordinates:{type:[Number],index:'2dsphere'}
});

var blogPostSchema=new Schema({
  title:String,
  content:String,
  imageUrl:String,
  postDate: {
		type: Date,
		default: Date.now
	},
  geometry:PointSchema,
  comments:[{
    type:Schema.Types.ObjectId,
    ref:'comment'
  }]
});

var BlogPost=mongoose.model('blogPost',blogPostSchema);

module.exports={BlogPost};
