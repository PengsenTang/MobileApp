var express = require('express');
var router = express.Router();
var Msg = require('../API/Message');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post');
});


router.post('/send', function(req, res, next) {
	Msg.send(req, res);
});


router.post('/receive_list', function(req, res, next) {
	Msg.receive_list(req, res);
});


router.post('/message_info', function(req, res, next) {
	Msg.message_info(req, res);
});


router.post('/update_message_status', function(req, res, next) {
	Msg.update_message_status(req, res);
});


module.exports = router;
