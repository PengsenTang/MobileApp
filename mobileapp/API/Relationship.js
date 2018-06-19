var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');



function filterByName(req,res){
    if(!req.body.id||!req.body.value){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var params = req.body;
    var param = [];
    param.push(params.id);
    value=req.body.value
    rvalue = "%"+value+"%"
    console.log(rvalue)
    param.push(rvalue)
    param.push(params.id);
    param.push(rvalue)
     db.queryArgs(sqlCommands.relationship.filterByName, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'all corresponding records',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
}

function filterByNickname(req,res){
    if(!req.body.id||!req.body.value){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var params = req.body;
    var param = [];
    param.push(params.id);
    value=req.body.value
    rvalue = "%"+value+"%"
    console.log(rvalue)
    param.push(rvalue)
    param.push(params.id);
    param.push(rvalue)
     db.queryArgs(sqlCommands.relationship.filterByNickname, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'all corresponding records',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
}

function filterByNumber(req,res){
    if(!req.body.id||!req.body.value){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var params = req.body;
    var param = [];
    param.push(params.id);
    value=req.body.value
    rvalue = "%"+value+"%"
    console.log(rvalue)
    param.push(rvalue)
    param.push(params.id);
    param.push(rvalue)
     db.queryArgs(sqlCommands.relationship.filterByNumber, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'all corresponding records',result);
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
                return result;
            });
}

function getRelationship(req,res){
    if(!req.body.id){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
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
    if(!req.body.id1 || !req.body.id2){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var params = req.body;
    var param = [];
    param.push(params.id1);
    param.push(params.id2);
    if(params.description == undefined){
        param.push("");
    }
    else{
        param.push(params.description);
        param.push(new Date());
        db.queryArgs(sqlCommands.relationship.new_relationship, param, function(err, result) {
                if(result){
                    db.doReturn(res,200,'New Relation Established');
                }
                else{
                    db.doReturn(res,201,'Something Wrong with Record',err.sqlMessage);
                }
            });
    }
}
function checkRelationship(req,res){
    if(!req.body.id1||!req.body.id2){
        res.json({
            'code': 201,
            'msg': 'parameter error'
        });
        return;
    }
    var params = req.body;
    var param = [];
    param.push(params.id1);
    param.push(params.id2);
    param.push(params.id2);
    param.push(params.id1);
    db.queryArgs(sqlCommands.relationship.check_relationship,param, function(err, result) {
            if(result[0]['count(*)']==1){
                db.doReturn(res,200,'Relation Already Established');
            }
            else if(result[0]['count(*)']==0){
                db.doReturn(res,201,'No Relation Yet');
            }
            else
            {
                db.doReturn(res,201,'Soemthing Wrong',err.sqlMessage);
            }
    });
}


module.exports = {
    getRelationship:getRelationship,
    filterByNumber:filterByNumber,
    filterByName:filterByName,
    filterByNickname:filterByNickname,
    newRelationship:newRelationship,
    checkRelationship:checkRelationship
};
