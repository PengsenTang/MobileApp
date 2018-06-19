var express = require('express');
var router = express.Router();
var Relationship = require('../API/Relationship')
/* GET home page. */
router.post('/all', function(req, res, next) {
  Relationship.getRelationship(req,res);
});

router.post('/check', function(req, res, next) {
  Relationship.checkRelationship(req,res);
});

router.post('/new', function(req, res, next) {
  Relationship.newRelationship(req,res);
});

router.post('/filter', function(req, res, next) {
  console.log(req.body.method)
  if(req.body.method == 0)
    Relationship.filterByName(req,res)
  else if(req.body.method == 1)
    Relationship.filterByNickname(req,res)
  else if(req.body.method == 2)
    Relationship.filterByNumber(req,res)
  else
   res.json({
	"code":"201",
        "msg":"method参数应当为1、2、3"
});
});

module.exports = router;
