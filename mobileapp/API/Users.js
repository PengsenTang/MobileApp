var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');


function email_authentication(req, res, next){
    if( !req.body.account  || !req.body.password || !req.body.method){
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
        			console.log(user_id);
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
    if(!req.body.account || !req.body.password || !req.body.method){
        res.json({
            code:201,
            msg: 'parameter error'
        });
    }
    else{
        var params = req.body;
    	var Rpassword = params.password;
    	db.queryArgs(sqlCommands.users.getIdByNumber, params.account, 
        	function(err, result) {
        		if(result){	
        			var user_id = result[0]['id'];
        			console.log(Rpassword);
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
    if(!req.body.account || !req.body.method || !req.body.password ){
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
		var password = params.password;
		db.queryArgs(sqlCommands.users.phone_register,param,
			function(err,result){
				if(result){
					console.log(result);
					var insertId = result.insertId;
					console.log(req.body.password);
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

function email_register(req,res,next){
    
    if(!req.body.method  || !req.body.account || !req.body.password){
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
				console.log(result);
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
};
