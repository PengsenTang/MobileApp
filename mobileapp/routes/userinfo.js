var express = require('express');
var router = express.Router();
var UserInfo = require('../API/getUserInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('userInfo success');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	UserInfo.getUserInfo(req, res, next);
});

module.exports = router;
