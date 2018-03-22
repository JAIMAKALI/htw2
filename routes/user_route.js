var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var passport=require('passport');
var csrfProtection=csrf();



router.use(csrfProtection);// middleware for route protection

router.get('/profile',isLoggin,(req,res)=>{
   res.render('user/profile');
});

router.get('/logout',isLoggin,(req,res,next)=>{
  req.logout();
  res.redirect('/');
})

// router.use('/',isNotLoggin,(req,res,next)=>{
//   next();
// })


router.get('/signin',(req,res)=>{
  var message=req.flash('error');

  res.render('user/signin',{csrfToken:req.csrfToken(),message:message});
});

router.post('/signin',passport.authenticate('local.signin',{
  //  successRedirect:'/user/profile',
   failureRedirect: '/user/signin',
   failureFlash:true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl=req.session.oldUrl;

    req.session.oldUrl=null;
    res.redirect(`/blogpost/image`);
  }
  else {
    res.redirect('/blogpost/image');
  }
});

router.get('/signup',(req,res)=>{
  var success=req.flash('success');

  var message=req.flash('error');
  res.render('user/signup',{csrfToken:req.csrfToken(),message:message,success:success});
});

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/blogpost/image',
   failureRedirect: '/user/signup',
   failureFlash:true
})
);



module.exports = router;

function isLoggin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function isNotLoggin(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
