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
	whetherEmailRegistered:'select * from user_info where mail_address = ?'
}
/**
pengsen tang
**/

//write here

/**
pengsen tang
**/

/**
yuhang meng
**/

//write here

/**
yuhang meng
**/

//exports
module.exports = {
    userinfo : userinfo,
    users:users
};
