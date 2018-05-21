var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var myJson = require('./jsonParser');


//
function get_userinfo_all(req, res, next){
    if(req.body.id == 'undefined'){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
    }
    else{
        db.queryArgs(sqlCommands.userinfo.get_all_info, req.body.id, function(err, result) {
                db.doReturn(res, 200, 'success', result);
            }
        );
    }
}


//need id and Attributes
//Attributes:'id,name,phone...'
function get_userinfo(req, res, next){
    var params = req.body;
    //if not find id or attributes, return error
    if(params.id == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
    }
    else{
        var attributes = myJson.getAttributes(params.Attributes);
        params = [attributes, params.id];
        console.log(params[0]);
        db.queryArgs(sqlCommands.userinfo.get_info, params, function(err, result) {
                db.doReturn(res, 200, 'success', result);
            }
        );
    }
    
}


//Attribute:{key1:value1};  only one attribute update
function update_userinfo(req, res, next){
    var params = req.body;
    //if not find id or attributes, return error
    if(params.id == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
        var attributes = myJson.getUpdateList(params.Attributes);//string to object
        attributes.push(params.id);
        db.queryArgs(sqlCommands.userinfo.update_info, attributes, 
            function(err, result) {
                if(result){
                    if(result.affectedRows == 0){
                        db.doReturn(res, 201,'update failed');
                    }
                    else{
                        db.doReturn(res, 200);
                    }
                }
                else{
                    db.doReturn(res, 201, 'update error');
                }
                
            }
        );
    }
}


//Attribute:{key1:value1, key2:value2};
function update_userinfos(req, res, next){
    var params = req.body;
    //if not find id or attributes, return error
    if(params.id == 'undefined' || params.Attributes == 'undefined'){
        res.json({
            code:'201',
            msg: 'parameter error'
        });
    }
    else{
        var attributes = myJson.getUpdateString(params.Attributes);//string to object
        //console.log(attributes);
        sql = "update user_info set " + attributes + " where id = ?";
        console.log(sql);
        db.queryArgs(sql, params.id, function(err, result) {
                if(result){
                    if(result.affectedRows == 0){
                        db.doReturn(res, 201,'update failed');
                    }
                    else{
                        db.doReturn(res, 200);
                    }
                }
                else{
                    db.doReturn(res, 201, 'update error');
                }
            }
        );
    }
}


//only get ids
function user_list(req, res, next){
    var param = req.body;
    db.query(sqlCommands.userinfo.user_list, 
        function(err, result) {
            db.doReturn(res, 200, 'success', result);
        }
    );
}


module.exports = {
    get_userinfo_all: get_userinfo_all,
    get_userinfo: get_userinfo,
    update_userinfo: update_userinfo,
    update_userinfos: update_userinfos,
    user_list: user_list
};
