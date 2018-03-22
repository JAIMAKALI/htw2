var express=require('express');
var {User}=require('./../models/user_blogpost');
var {BlogPost}=require('./../models/blogPost');
var {Comments}=require('./../models/comments');
var mongoose=require('mongoose');
var router=express.Router();
var multer =require('multer');
var Blog=mongoose.model('blogPost');
var multerConfig={
  storage : multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    var ext=file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now()+'.'+ext);
  }
}),
fileFilter: function(req, file, cb) {
// To reject this file pass `false`, like so:

var ext=file.mimetype.split('/')[1];
// // To accept the file pass `true`, like so:
if(ext=='jpeg' || ext=='png'){
cb(null, true);
}
else{
cb(null,false);
}
}
}

router.get('/image',(req,res)=>{
  User.find({}).populate({
    path:'blogPost',
    populate:{
      path:'comments',
      model:'comment'
    }
  }).then((user)=>{
        //console.log(user[0].blogPost);
        console.log(user);
      res.render('test',{content:user});
  })
});

router.post('/image',multer(multerConfig).single('photo'),(req,res)=>{

  var username=req.body.email;
  var filename=req.file.filename;
  var description=req.body.description;
  var lng=req.body.lng;
  var lat=req.body.lat;
 var user=new User({name:username});
 var blogPost=new BlogPost({title:'regarding help',content:description,imageUrl:filename,
 geometry:{type:'point',coordinates:[lng,lat]}});

user.blogPost.push(blogPost);
Promise.all([user.save(),blogPost.save()]).then(()=>{
  res.redirect('/blogpost/image');
})
})


router.get('/editProfile',(req,res)=>{
  res.render('editProfile');
});

router.post('/editProfile',multer(multerConfig).single('photo'),(req,res)=>{
var address=req.body.address;
var photoUrl=req.file.filename;
User.findOneAndUpdate({name:req.body.name},{address:address,imageUrl:photoUrl}).then((user)=>{
  console.log(user);
  res.redirect('/blogpost/image');
})

})


router.post('/comment/:id',(req,res)=>{
  var id=req.params.id;
  var comment=req.body.comment;
  var comments=new Comments({comment:comment});
 BlogPost.findOne({_id:id}).then((result)=>{
 result.comments.push(comments);
  Promise.all([comments.save(),result.save()]).then(()=>{
    res.redirect('/blogpost/image');
  })
 })

})

router.get('/image/nearperson',(req,res,next)=>{
var lng=req.query.lng;
var lat=req.query.lat;
console.log(req.query);
Blog.aggregate(
[
    {
        '$geoNear': {
            'near': {
                'type': 'Point',
                'coordinates': [ parseFloat(lng), parseFloat(lat) ]
            },
            'spherical': true,
            'distanceField': 'dist',
            'maxDistance': 500000
        }
    }
]).then((result)=>{
  console.log(result);
  res.render('nearpeople',{result:result});
}).catch((err)=>{console.log(err)});
});

router.get('/profileInfo/:id',(req,res)=>{
var id=req.params.id;
User.findOne({_id:id}).then((user)=>{
  res.render('profileInfo',{profileInfo:user});
})
})
//image capture routes

router.get('/imageCapture',(req,res)=>{
  res.render('imagecapture');
})

router.get('/',(req,res)=>{
  res.render('homepage');
})
module.exports=router;
