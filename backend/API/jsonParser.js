function getLimitation(jsonStr){
	var json = JSON.parse(jsonStr);
	var result = "";
    for(var key in json){
    	result += key + "= '" + json[key] + "' AND ";
    }
    result = result.substring(0, result.length-3);
    return result;
}


function getAttributes(str){
    return str.split(',');
}


function getUpdateList(jsonStr){
	//var json = JSON.parse(jsonStr);
	var json = jsonStr;
  	var result = [];
    for(var key in json){
    	key= key.toString()
	result.push(key);
    	result.push(json[key]);
    }
    return result; 
}


function getUpdateString(jsonStr){
	console.log("1st line in getUpdateString")
	var json = JSON.parse(jsonStr);
	var result = "";
	console.log("json is")
	console.log(json)
    for(var key in json){
	key = key.toString()
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
