var express = require('express');
var router = express.Router();
var Invitation = require('../API/Invitation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('please use post');
});


router.post('/send', function(req, res, next) {
	Invitation.send(req, res);
});

router.post('/newInvitation',function(req,res,next){
//	res.send("please use get method")
	res.json({'msg':'To send message to invite'});
});

router.post('/update_invitation_status', function(req, res, next) {
	Invitation.update_invitation_status(req, res);
});


module.exports = router;
