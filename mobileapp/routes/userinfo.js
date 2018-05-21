var express = require('express');
var router = express.Router();
var UserInfo = require('../API/UserInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post request');
});


router.post('/get_userinfo_all', function(req, res, next) {
	UserInfo.get_userinfo_all(req, res, next);
});


router.post('/get_userinfo', function(req, res, next) {
	UserInfo.get_userinfo(req, res, next);
});


router.post('/update_userinfo', function(req, res, next) {
	UserInfo.update_userinfo(req, res, next);
});


router.post('/update_userinfos', function(req, res, next) {
	UserInfo.update_userinfos(req, res, next);
});


router.post('/user_list', function(req, res, next) {
	UserInfo.user_list(req, res, next);
});


module.exports = router;
