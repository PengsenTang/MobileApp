var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');





module.exports = {
	send: send,
    update_invitation_status: update_invitation_status
};