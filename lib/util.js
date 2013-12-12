exports.Now = function(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month < 10){
		month = '0' + month;
	}
	var day = date.getDate();
	if(day < 10){
		day = '0' + day;
	}
	var hour = date.getHours();
	if(hour < 10){
		hour = '0' + hour;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	var seconds = date.getSeconds();
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var now = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
	return now;
}