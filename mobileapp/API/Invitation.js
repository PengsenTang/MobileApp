var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');


function send(req, res){
	if(!req.body.sender|| !req.body.receiver || !req.body.content){
        res.json({
            'code':'201',
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.sender == msg.receiver){
    	res.json({
            'code':'201',
            'msg': 'you can not invite yourself'
        });
        return;
    }
    var params = [msg.sender, msg.receiver, msg.content];
    db.queryArgs(sqlCommands.invitation.send, params, function(err, result) {
    	if(!result || result.affectedRows == 0)
    		db.doReturn(res, 201,'insert failed');
    	else
    		db.doReturn(res, 200, 'success');
    });
}


function update_invitation_status(req, res){
	if(!req.body.id || !req.body.invitation_status){
		res.json({
            'code':'201',
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.invitation_status!='pending' && msg.invitation_status!='accepted' && msg.invitation_status!='rejected'){
    	res.json({
            'code':'201',
            'msg': 'invitation_status must be one of (pending/rejected/accepted)'
        });
        return;
    }
    var params = [msg.invitation_status, msg.id];
    db.queryArgs(sqlCommands.invitation.update_invitation_status, params, function(err, result) {
    	if(!result || result.affectedRows == 0)
    		db.doReturn(res, 201, 'update failed');
    	else
    		db.doReturn(res, 200, 'success');
    });
}


module.exports = {
	send: send,
    update_invitation_status: update_invitation_status
};