var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');


function send(req, res){
	if(!req.body.sender || !req.body.receiver || !req.body.content){
        res.json({
            'code':201,
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.sender == msg.receiver){
    	res.json({
            'code': 201,
            'msg': 'you can not send message to yourself'
        });
        return;
    }
    var params = [msg.sender, msg.receiver, msg.content];
    db.queryArgs(sqlCommands.message.send, params, function(err, result) {
    	if(!result || result.affectedRows == 0)
    		db.doReturn(res, 201,'insert failed');
    	else
    		db.doReturn(res, 200, 'success');
    });
}


function receive_list(req, res){
	if(!req.body.id){
		res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    db.queryArgs(sqlCommands.message.receive_list, req.body.id, function(err, result) {
    	db.doReturn(res, 200, 'success', result);
    });
}


function message_info(req, res){
	if(!req.body.id){
		res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    db.queryArgs(sqlCommands.message.message_info, req.body.id, function(err, result) {
    	db.doReturn(res, 200, 'success', result[0]);
    });
}


function update_message_status(req, res){
	if(!req.body.id || !req.body.message_status){
		res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.message_status!='read'&& msg.message_status!='unread'&& msg.message_status!='deleted'){
    	res.json({
            'code': 201,
            'msg': 'message_status must be one of (read/unread/deleted)'
        });
        return;
    }
    var params = [msg.message_status, msg.id];
    db.queryArgs(sqlCommands.message.update_message_status, params, function(err, result) {
    	if(!result || result.affectedRows == 0)
    		db.doReturn(res, 201, 'update failed');
    	else
    		db.doReturn(res, 200, 'success');
    });
}


module.exports = {
	send: send,
	receive_list: receive_list,
	message_info: message_info,
    update_message_status: update_message_status
};