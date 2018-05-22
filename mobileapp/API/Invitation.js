var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');
var Msg = require('./Message');
var Relationship = require('./Relationship');


function send(req, res){
	if(!req.body.sender|| !req.body.receiver || !req.body.content){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.sender == msg.receiver){
    	res.json({
            'code': 201,
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


function agree_invitation(id, res){
    Msg.get_message_info(res, id, function(req, res){
            console.log(req);
            var params = {'id1':req.sender, 'id2':req.receiver};
            console.log('1111:'+params);
            Relationship.newRelationship({'body':params}, res);
        }
    );
}


function update_invitation_status(req, res){
	if(!req.body.id || !req.body.invitation_status){
		res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var msg = req.body;
    if(msg.invitation_status!='pending' && msg.invitation_status!='accepted' && msg.invitation_status!='rejected'){
    	res.json({
            'code': 201,
            'msg': 'invitation_status must be one of (pending/rejected/accepted)'
        });
        return;
    }
    //agree invitation, insert data into relationship table
    if(msg.invitation_status == 'accepted'){
        agree_invitation(msg.id, res);
    }
    //continue to update
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