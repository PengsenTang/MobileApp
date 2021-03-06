var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var Verify = require('../SMS/control');
var redis = require('redis')
const crypto = require('crypto')

client = redis.createClient()

var profile_photo_path = ['/profile_photo/avatar1.jpg','/profile_photo/avatar2.jpg','/profile_photo/avatar3.jpg','/profile_photo/avatar4.jpg','/profile_photo/avatar5.jpg','/profile_photo/avatar6.jpg','/profile_photo/avatar7.jpg','/profile_photo/avatar8.jpg','/profile_photo/avatar9.jpg','/profile_photo/avatar10.jpg']


function email_authentication(req, res, next){
    if( !req.body.account  || !req.body.password){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
        var params = req.body;
    	var Rpassword = params.password;
    	db.queryArgs(sqlCommands.users.getIdByEmail, params.account, 
        	function(err, result) {
        		if(result){	
        			var user_id = result[0]['id'];
        			db.queryArgs(sqlCommands.users.check_authentication, user_id, 
        				function(err,result){
        					if(result){
        						if(result[0]['password']== Rpassword){
        							res.json({
        								'code':200,
        								'msg':'Matched',
        								'result':user_id
        							})
        						}
        						else{
        							res.json({
        								'code':201,
        								'msg':'Not Matched',
        							})
        						}
        					}
        					else{
            					db.doReturn(res,201,'Not Registered Yet!',err.sqlMessage);
            				}
        				});
        		}	
            	else{
            		db.doReturn(res,201,'Not Registered Yet!',err.sqlMessage);
            	}
        	}
    	);
	}
}

function number_authentication(req, res, next){
	var md5 = crypto.createHash("md5")
    if(!req.body.account || !req.body.password || !req.body.method){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
        var params = req.body;
    	var Rpassword = params.password;
    	Rpassword = md5.update(Rpassword).digest('hex')
	db.queryArgs(sqlCommands.users.getIdByNumber, params.account, 
        	function(err, result) {
        		if(result){	
        			var user_id = result[0]['id'];
        			db.queryArgs(sqlCommands.users.check_authentication, user_id, 
        				function(err,result){
        					if(result){
        						if(result[0]['password']== Rpassword){
        							res.json({
        								'code':200,
        								'msg':'Matched',
        								'result':user_id
        							})
        						}
        						else{
        							res.json({
        								'code':201,
        								'msg':'Not Matched',
        							})
        						}
        					}
        					else{
            					db.doReturn(res,201,'Not Registered Yet!',err.sqlMessage);
            				}
        				});
        		}	
            	else{
            		db.doReturn(res,201,'Not Registered Yet!',err.sqlMessage);
            	}
        	}
    	);
	}
}

function number_register(req,res,next){
    //if not find id or attributes, return error
var md5 = crypto.createHash("md5")
    if(!req.body.account || !req.body.method || !req.body.password || !req.body.verifycode){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
	var params = req.body
	var code = params.verifycode
	var phoneNumber = params.account
    client.get(phoneNumber,function(err,response){
        if(err){
            console.log("Something wrong with redis")
            return 0
        }
        else{
            if(code == response){
                        var params = req.body;
                        var param = [];
                        param.push(params.account);
                        param.push(params.name);
                        param.push(new Date());
			var index = Math.floor(Math.random()*10)
			var avatar_path = profile_photo_path[index]
                        param.push(avatar_path)
			var password = params.password;
                        db.queryArgs(sqlCommands.users.phone_register,param,
                            function(err,result){
                                if(result){
                                    var insertId = result.insertId;
                                    var authentication = [];
                                    authentication.push(insertId);
				    var password = req.body.password
				    var encryptedPassword = md5.update(password).digest("hex");
                                    authentication.push(encryptedPassword);
                                    db.queryArgs(sqlCommands.users.create_authentication,authentication,
                                        function(err,result){
                                            if(result){
                                                db.doReturn(res,200,'Registered Successfully',insertId);
                                            }
                                            else{
                                                db.doReturn(res,201,'Register Failure',err.sqlMessage);
                                            }
                                        }
                                    );
                                }
                                 else{
                                    res.json({'code':201,'msg':'Already Registered','result':err.sqlMessage});
                                }
                            }
                        );
                    }
            else{
                res.json({'code':201,'msg':'Verifycode Not Matched'});
            }
        }
    })
	}
}

function modify_password(req,res,next){
    var md5 = crypto.createHash("md5")
    var _md5 = crypto.createHash("md5")
    if(!req.body.id || !req.body.oldpassword || !req.body.newpassword){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
        var params = req.body
        var oldPassword = req.body.oldpassword
        oldPassword = oldPassword.toString()
	    var user_id = req.body.id
        var encryptedOldPassword = md5.update(oldPassword).digest("hex")
        db.queryArgs(sqlCommands.users.check_authentication, user_id, 
            function(err,result){
                if(result){
                    if(result[0]['password']== encryptedOldPassword){
                                    var insertId = req.body.id;
                                    var authentication = [];
                                    var newPassword = req.body.newpassword
                                    newPassword = newPassword.toString()
				    var encryptedNewPassword = _md5.update(newPassword).digest("hex");
                                    authentication.push(encryptedNewPassword);
                                    authentication.push(insertId);
                                    db.queryArgs(sqlCommands.users.updatePassword,authentication,
                                        function(err,result){
                                            if(result){
                                                db.doReturn(res,200,'Updated Successfully');
                                            }
                                            else{
                                                db.doReturn(res,201,'Update Failure',err.sqlMessage);
                                            }
                                        });
                                }
                                else{
                                    res.json({
                                        'code':201,
                                        'msg':'Not Matched',
                                    })
                                }
                            }
                            else{
                                db.doReturn(res,201,'Not Registered Yet!',err.sqlMessage);
                            }
                        });
    }
}

function reset_password(req,res,next){
    var md5 = crypto.createHash("md5")
    console.log(req.body)
    if(!req.body.account || !req.body.password || !req.body.verifycode){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
    console.log("in else")
    var params = req.body
    var code = params.verifycode
    var phoneNumber = params.account
	client.get(phoneNumber,function(err,response){
        if(err){
            console.log("Something wrong with redis")
            return 0
        }
        else{
            if(code == response){
			console.log('!!!')
                        var params = req.body;
                        var param = [];
                        var account = params.account
                        db.queryArgs(sqlCommands.users.getIdByNumber,account,
                            function(err,result){
                                if(result){
                                    var insertId = result[0]['id'];
                                    var authentication = [];
                                    var password = req.body.password
                                    var encryptedPassword = md5.update(password).digest("hex");
                                    authentication.push(encryptedPassword);
                                    authentication.push(insertId);
                                    console.log(authentication)
				    console.log(sqlCommands.users.updatePassword)
				    db.queryArgs(sqlCommands.users.updatePassword,authentication,function(err,result){
                                            if(result){
					console.log('updated successfullt')                 
                               db.doReturn(res,200,'Updated Successfully',insertId);
                                            }
                                            else{
						console.log('failure')
                                                db.doReturn(res,201,'Update Failure',err.sqlMessage);
                                            }
                                        });
                                }
                                 else{
                                    res.json({'code':201,'msg':'Not Registered Yet','result':err.sqlMessage});
                                }
                            });
            }
            else{
                res.json({'code':201,'msg':'Verifycode Not Matched'});
            }
        }
    })
}
}

function email_register(req,res,next){
    
    if( !req.body.account || !req.body.password){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
	    var params = req.body;
    	var param = [];
		param.push(params.account);
		param.push(params.name);
		param.push(params.gender);
		param.push(new Date());
		db.queryArgs(sqlCommands.users.email_register,param,
			function(err,result){
				if(result){
					var insertId = result.insertId;
					var authentication = [];
					authentication.push(insertId);
					authentication.push(req.body.password);
					db.queryArgs(sqlCommands.users.create_authentication,authentication,
						function(err,result){
							if(result){
								db.doReturn(res,200,'Registered Successfully');
							}
							else{
								db.doReturn(res,201,'Register Failure',err.sqlMessage);
							}
						}
					);
				}
				else{
					res.json({'code':201,'msg':'Already Registered','result':err.sqlMessage});
				}
			}
		);
	}
}

module.exports = {
    number_register:number_register,
    email_register:email_register,
    number_authentication:number_authentication,
    email_authentication:email_authentication,
    reset_password:reset_password,
    modify_password:modify_password
};
