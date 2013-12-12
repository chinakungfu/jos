jos
=====

A node.js library for jos (JD-Open-Service).

Installing
----------

```
npm install jos
```

Example usage
-------------

```javascript
var jos = require("jos");

//Build options with your jd account
var options = {
	"api_url":"http://gw.api.360buy.com/routerjson",
	"app_secret": yourAppSecret,
	"app_key": yourAppKey,
	"format": "json",
	"v": "2.0"
}

//Get a client with options
var jdClient = jos.getJDClient(options);

//Specify app params
var appParam = {
	"ids": "982040",
	"base":"sku_id,name,image_path,brand_name"
};

//Call jdClient.invokeMethod(method,appParam,callback) to execute query.
jdClient.invokeMethod("jingdong.ware.baseproduct.get",appParam,function(data){
	console.log(data);
});

```

