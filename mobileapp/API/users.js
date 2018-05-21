var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');


function email_authentication(req, res, next){
    var params = req.body;
    console.log(params);
    if(params.account == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
    	var Rpassword = params.password;
    	db.queryArgs(sqlCommands.users.getIdByEmail, params.account, 
        	function(err, result) {
        		if(result){	
        			var user_id = result[0]['id'];
        			console.log(Rpassword);
        			db.queryArgs(sqlCommands.users.check_authentication, user_id, 
        				function(err,result){
        					if(result){
        						if(result[0]['password']== Rpassword){
        							res.json({
        								'code':'1',
        								'user_id':result[0]['user_id'],
        								'message':'Matched'
        							})
        						}
        						else{
        							res.json({
        								'code':'0',
        								'message':'Not Matched',
        								'detail':err.sqlMessage
        							})
        						}
        					}
        					else{
            					db.doReturn(res,{'code':'0','message':'Not Registered Yet!','detail':sqlMessage});
            				}
        				});
        		}	
            	else{
            		db.doReturn(res,{'code':'0','message':'Not Registered Yet!','detail':sqlMessage});
            	}
        	}
    	);
	}
}

function number_authentication(req, res, next){
    var params = req.body;
    console.log(params);
    if(params.account == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
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
        								'code':'1',
        								'user_id':result[0]['user_id'],
        								'message':'Matched'
        							})
        						}
        						else{
        							res.json({
        								'code':'0',
        								'message':'Not Matched',
        								'detail':err.sqlMessage
        							})
        						}
        					}
        					else{
            					db.doReturn(res,{'code':'0','message':'Not Registered Yet!','detail':err.sqlMessage});
            				}
        				});
        		}	
            	else{
            		db.doReturn(res,{'code':'0','message':'Not Registered Yet!','detail':err.sqlMessage});
            	}
        	}
    	);
	}
}

function number_register(req,res,next){
    //if not find id or attributes, return error
    var params = req.body;
    if(params.id == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
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
								db.doReturn(res,{'code':'1','message':'Registered Successfully'});
							}
							else{
								db.doReturn(res,{'result':'0','message':'Register Failure','detail':err.sqlMessage});
							}
						}
					);
				}
				else{
					res.json({'code':'0','message':'Already Registered','detail':err.sqlMessage});
				}
			}
		);
	}
}

function email_register(req,res,next){
    var params = req.body;
    if(params.id == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
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
								db.doReturn(res,{'code':'1','message':'Registered Successfully'});
							}
							else{
								db.doReturn(res,{'code':'0','message':'Register Failure','detail':err.sqlMessage});
							}
						}
					);
				}
				else{
					res.json({'code':'0','message':'Already Registered','detail':err.sqlMessage});
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