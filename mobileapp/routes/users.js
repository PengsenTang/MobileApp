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
router.all('/getVerifycode',function(req,res,next){
        var phoneNumber = req.body.account
	console.log(phoneNumber)
	Verify.sendMessage(phoneNumber)
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
