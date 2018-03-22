var mongoose=require('mongoose');

var schema=new mongoose.Schema({
  userName:{
    type:String,
  },
  id:{
    type:Number
  }
});

var google_users=mongoose.model('google_users',schema);

module.exports={google_users};
