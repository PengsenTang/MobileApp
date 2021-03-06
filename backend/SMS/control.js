var redis = require('redis')
var messageFunc = require('./sendMessage')
client = redis.createClient()

function generateCode(){
	var num=""
	for(var i=0;i<4;i++){
		num+=Math.floor(Math.random()*10)
	}
	return num
}


function register(req,res,next){
	var phoneNumber = req.body.account
	var verifyCode = generateCode()
    client.set(phoneNumber,verifyCode,function(err,reply){
	client.expire(phoneNumber,600)
	console.log(reply.toString());
	messageFunc.messageVerify(phoneNumber,verifyCode,res)
    })
}

function sendInvitation(req,res,next){
	var phoneNumber = req.body.targetNumber
	var nickname = req.body.inviterName
	messageFunc.sendInvitation(phoneNumber,nickname,res)
}


function reset(req,res,next){
	var phoneNumber = req.body.account
	    var verifyCode = generateCode()
    client.set(phoneNumber,verifyCode,function(err,reply){
	client.expire(phoneNumber,600)
	console.log(reply.toString());
    })
    messageFunc.forgetPassword(phoneNumber,verifyCode,res)
}



function checkVerifycode(phoneNumber,code){
	client.get(phoneNumber,function(err,response){
		if(err){
			console.log("Something wrong with redis")
			return 0
		}
		else{
			if(code == response){
				console.log("matched")
				return 1
			}
			else{
				return 0
			}
		}
	})
}


module.exports={
	checkVerifycode:checkVerifycode,
	reset:reset,
	register:register,
	sendInvitation:sendInvitation
}
