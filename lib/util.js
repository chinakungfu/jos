
exports.Now = function(){
	var date = new Date();
	var year = date.getFullYear();
	var month = zeroPad(date.getMonth() + 1,2);
	var day = zeroPad(date.getDate(),2);
	var hour = zeroPad(date.getHours(),2);
	var minutes = zeroPad(date.getMinutes(),2);
	var seconds = zeroPad(date.getSeconds(),2);
	var now = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
	return now;
}

function zeroPad(number, length) {
  number = number.toString();
  while (number.length < length) {
    number = '0' + number;
  }

  return number;
}