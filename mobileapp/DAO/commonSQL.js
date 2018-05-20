//
var userinfo = {
	user_list:'select id from user_info',
    all:'select * from user_info where id=?',
};

//exports
module.exports = {
    userinfo : userinfo
};
