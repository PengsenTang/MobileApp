//
var userinfo = {
	user_list:'select id from user_info',
    all:'select * from user_info where id=?',
    get_all_info:'select * from user_info where id=?',
    get_info:'select ?? from user_info where id=?',
    update_info:'update user_info set ??=? where id=?',
};

var users = {
	phone_register:'insert into user_info(phone_number,name,gender,register_time) values(?,?,?,?)',
	create_authentication:'insert into authentication values(?,?)',
	email_register:'insert into user_info(mail_address,name,gender,register_time) values(?,?,?,?)',
	getIdByNumber:'select * from user_info where phone_number = ?',
	getIdByEmail:'select * from user_info where mail_address = ?',
	check_authentication:'select password from authentication where user_id = ?',
	whetherNumberRegistered:'select * from user_info where phone_number = ?',
	whetherEmailRegistered:'select * from user_info where mail_address = ?',
	update_password:'update authentication set password =? where user_id =?'
}
/**
pengsen tang
**/

//write here
var relationship = {
	get_relationship:'select * from relation where id1 = ? or id2 = ?',
	new_relationship:'insert into relation values(?,?,?,?)',
	check_relationship:'select count(*) from relation where (id1 = ? and id2 = ?)  or (id1 = ? and id2 = ?) '
}
/**
pengsen tang
**/

/**
yuhang meng
**/

//write here
var message = {
	send: 'insert into message(sender, receiver, content, time) values(?,?,?,now())',
	receive_list: 'select * from message where receiver=?',
	message_info: 'select * from message where id=?',
	update_message_status: 'update message set message_status=? where id=?'
}


var invitation = {
	send: "insert into message(sender, receiver, content, time, message_status, invitation_status) values(?,?,?,now(),'unread','pending')",
	update_invitation_status: 'update message set invitation_status=? where id=?'
}

/**
yuhang meng
**/

//exports
module.exports = {
    userinfo : userinfo,
    users: users,
    message: message,
    invitation: invitation,
    relationship:relationship
};
