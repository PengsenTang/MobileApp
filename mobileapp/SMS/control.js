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



function sendMessage(phoneNumber){
    var verifyCode = generateCode()
    client.set(phoneNumber,verifyCode,function(err,reply){
	client.expire(phoneNumber,600)
	console.log(reply.toString());
    })
    messageFunc.messageVerify(phoneNumber,verifyCode)
}

function forgetPassword(phoneNumber){
    var verifyCode = generateCode()
    client.set(phoneNumber,verifyCode,function(err,reply){
	client.expire(phoneNumber,600)
	console.log(reply.toString());
    })
    messageFunc.forgetPassword(phoneNumber,verifyCode)
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


checkVerifycode(15082362189,2130)

module.exports={
	sendMessage:sendMessage,
	checkVerifycode:checkVerifycode,
	forgetPassword:forgetPassword
}
//sendMessage(15082362189,code)
