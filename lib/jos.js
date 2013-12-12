/*
 * lib for jos
 */
var util = require("./util.js");
var rest = require("restler");
var crypto = require('crypto');
var querystring = require("querystring");

function JDRequest(apiurl,appsecret,sysParam, appParam){
	this.api_url = apiurl;
	this.sysParam = sysParam;
	this.appParam = appParam;
	this.app_secret = appsecret;
	this.sign = function(){
		var params = [];
		for(var k in this.sysParam){
			if(!k || !this.sysParam[k]){
				continue;
			}
			var param = k + this.sysParam[k];
			params.push(param);
		}
		var appStr = "360buy_param_json" + JSON.stringify(this.appParam);
		params.push(appStr);
		params.sort();
        var s = this.app_secret;
		for(var i=0; i<params.length; i++){
			s += params[i];
		}
		s += this.app_secret;
		//console.log(s);
        s = crypto.createHash('md5').update(s,'utf8').digest("hex").toUpperCase();
		return s;
	};
	this.buildUrl = function(){
		var sign = this.sign();
		this.sysParam["sign"] = sign;
		var url = this.api_url + "?" + querystring.stringify(this.sysParam);
		return url;
	};
	this.buildPayload = function(){
		return "360buy_param_json="+JSON.stringify(this.appParam);
	}
}

function JDClient(config){
	//API server url
	this.api_url = config.api_url ? config.api_url : "http://gw.api.360buy.com/routerjson";
	
	//App secret
	if(!config.app_secret){
		throw "Bad parameters, need app_secret"
	}
	this.app_secret = config["app_secret"];
	
	//System level params
	this.sysParam = {};
	if(config["access_token"]){
		this.sysParam["access_token"] = config["access_token"]
	}
	this.sysParam["app_key"] = config["app_key"];
	this.sysParam["format"] = config["format"];
	this.sysParam["v"] = config["v"];	
}

JDClient.prototype = {
	invokeMethod : function(method,appParam,callback){
		var sysParam = this.sysParam;
		sysParam["method"] = method;
		sysParam["timestamp"] = util.Now(); 
		
		var request = new JDRequest(this.api_url,this.app_secret,sysParam,appParam);
		var url = request.buildUrl();
		var payload = request.buildPayload();
		var jdHeader = {"Content-Type":"application/x-www-form-urlencoded"};
		
		rest.post(url,{data: payload, headers: jdHeader}).on("complete",function(data){
			callback(data);
		});
	}
}

exports.getJDClient = function(config){
	return new JDClient(config);
}
