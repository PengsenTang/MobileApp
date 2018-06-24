var express = require('express');
var router = express.Router();
var Users = require('../API/Users');
var Verify = require('../SMS/control');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
var method = req.body.method;
	if(method === "phone")
	{
		Users.number_authentication(req,res,next);
	}
	else if(method === "email")
	{
		Users.email_authentication(req,res,next);
	}	
	else
	{
		res.json({
            code:202,
            msg: 'Wrong Register Type'
        });
	}
})
//注册的验证码
router.post('/registerVerifycode',function(req,res,next){
        Verify.register(req,res,next)
})
//重置密码
router.post('/resetPassword',function(req,res,next){
    Users.reset_password(req,res,next)
})
//修改密码
router.post('/modifyPassword',function(req,res,next){
	Users.modify_password(req,res,next)
})
//重置密码的验证码
router.post('/resetVerifycode',function(req,res,next){
		Verify.reset(req,res,next)
})

router.post('/register',function(req,res,next){
	var method = req.body.method;
	if(method === "phone")
	{	
		Users.number_register(req,res,next);
	}
	else if(method === "email")
	{
		Users.email_register(req,res,next);
	}
	else
	{
		res.json({
            code:202,
            msg: 'Wrong Register Type'
        });
	}
})

module.exports = router;