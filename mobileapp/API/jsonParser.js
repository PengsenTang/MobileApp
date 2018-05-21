function getLimitation(jsonStr){
	var json = JSON.parse(jsonStr);
	var result = "";
    for(var key in json){
    	result += key + "=" + json[key] + "AND";
    }
    result = result.substring(0, result.length-3);
    return result;
}


function getAttributes(str){
    return str.split(',');
}


function getUpdateList(jsonStr){
	var json = JSON.parse(jsonStr);
	var result = [];
    for(var key in json){
    	result.push(key);
    	result.push(json[key]);
    }
    return result;
}


function getUpdateString(jsonStr){
	var json = JSON.parse(jsonStr);
	var result = "";
    for(var key in json){
    	result += key + "='" + json[key] + "',";
    }
    return result.substring(0, result.length-1);
}


module.exports = {
	getAttributes: getAttributes,
	getLimitation: getLimitation,
	getUpdateString: getUpdateString,
	getUpdateList: getUpdateList
};