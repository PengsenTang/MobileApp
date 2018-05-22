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


module.exports = router;
