var db = require('../DAO/Connection');
var sqlCommands = require('../DAO/commonSQL');


function getUserInfo(req, res, next){
    var param = req.body;
    db.queryArgs(sqlCommands.userinfo.all, param.id, 
        function(err, result) {
            db.doReturn(res, result);
        }
    );
}


module.exports = {
    getUserInfo: getUserInfo
};
