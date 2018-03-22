

var router=require('express').Router();
var passport=require('passport');


router.get('/google',passport.authenticate('google',{
  scope:['profile']
}))

router.get('/google/redirect',passport.authenticate('google',{
  session:false
}),(req,res)=>{
res.redirect('/blogpost/image');
});

module.exports=router;
