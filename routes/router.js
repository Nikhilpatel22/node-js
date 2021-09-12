const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../module/student');
const uploadModel = require('../module/upload');
//const std = Student.find({});


router.use(express.static(__dirname+"./public/"));


router.get('/',function(req, res, next) {
  //Employee.exec(function(err,data){
//if(err) throw err;
res.render('index', { title: 'Student Data' });
  });
//});
//var upload = multer({ dest: 'public/uploads/' })

var storage = multer.diskStorage({
	destination: './public/upload/',
	filename: function(req, file, cb){
	cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var upload = multer({
storage:storage
}).single('file');

router.post('/upload',upload,function(req, res, next) {
const imageFile=req.file.filename;
const success =req.file.filename+ "uploded successfully";
const imageDetails= new uploadModel({
image:req.file.filename
});
	imageDetails.save(function(err,doc){
  if(err) throw err;

	uploadModel.find({}).exec(function(err,data){
	if(err) throw err;
res.render('upload', { title: 'Upload Data', records:data,success:success });
  });

 	});

  });


router.get('/upload',function(req, res, next) {
	uploadModel.find({}).exec(function(err,data){
if(err) throw err;
res.render('upload', { title: 'Upload Data', records:data,success:'' });
});
  });


router.get('/register',function(req, res, next){
	Student.find({}).exec(function(err, data){
			if(err) throw err;
	res.render('register',{ title: 'Student Records', records : data});
})
})

router.post('/register',upload ,function(req, res, next){
	
	const student = new Student({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	  cpassword : req.body.cpassword,
	   gender : req.body.gender,
		image:req.file.filename,
	})
	student.save(function(err,req1){
	if(err) throw err;
	Student.find({}).exec(function(err, data){
			if(err) throw err;
	res.render('register',{ title: 'Student Records', records : data });
	})
	})
})

router.get('/delete/:id',function(req, res, next){
	var id = req.params.id;
	var del = Student.findByIdAndDelete(id);
	del.exec(function(err){
	if(err) throw eerr;
	res.redirect('/register');
})
})

router.get('/edit/:id',function(req, res, next){
   
   var id=req.params.id;
   var edit = Student.findById(id);
	 edit.exec(function(err, data){
		if(err)throw err;
		res.render('edit',{ title : "edit record", records:data})
	})
})

router.post('/update/',upload,function(req, res, next){

if(req.file){

var dataRecords={
  name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	  cpassword : req.body.cpassword,
	  gender : req.body.gender,
		image:req.file.filename,
}
  }else{

    var dataRecords={
    name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	  cpassword : req.body.cpassword,
	  gender : req.body.gender,
	
    }
  }
  var update= Student.findByIdAndUpdate(req.body.id,dataRecords);
  update.exec(function(err, data){
		if(err)throw err;	
	res.redirect('/register');
	})	
})

module.exports = router;
