var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs')
var schema=new mongoose.Schema({
  email:{type:String,required:true},
  password:{type:String,required:true}
});
// for bcrypt the password
schema.methods.encryptedPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}
//for verify bcrypted password
schema.methods.verifyPassword=function(password){
  return bcrypt.compareSync(password,this.password);
}
var User=mongoose.model('user_details',schema);

module.exports={User};
