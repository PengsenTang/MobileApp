var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');

function getRelationship(req,res){
    var params = req.body;
    console.log(params);
    var param = [];
    param.push(params.id);
    param.push(params.id);
     db.queryArgs(sqlCommands.relationship.get_relationship, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'all corresponding records',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
}
function newRelationship(req,res){
    var params = req.body;
    var param = [];
    param.push(params.id1);
    param.push(params.id2);
    if(params.description == "undefined"){
        param.push("");
    }
    else{
        param.push(params.description);
        param.push(new Date());
        db.queryArgs(sqlCommands.relationship.new_relationship, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'New Relation Established',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
    }
}
function checkRelationship(req,res){
    var params = req.body;
    var param = [];
    param.push(params.id1);
    param.push(params.id2);
    if(params.description == "undefined"){
        param.push("");
    }
    else{
        param.push(params.description);
        param.push(new Date());
        db.queryArgs(sqlCommands.relationship.new_relationship, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'New Relation Established',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
    }
}


module.exports = {
	getRelationship:getRelationship,
    newRelationship:newRelationship,
    checkRelationship:checkRelationship
};