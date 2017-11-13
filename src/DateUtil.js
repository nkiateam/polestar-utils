
const getDateToString = (date) => {
	var year = date.getFullYear(),
		month = zerofill(date.getMonth() + 1, 2),
		day = zerofill(date.getDate(), 2),
		hours = (date.getHours() < 0) ? '00' : zerofill(date.getHours(), 2),	// daterangepicker hours 9시간 오버표시되는 버그로 인해 빼준다.
		minutes = zerofill(date.getMinutes(), 2),
		seconds = zerofill(date.getSeconds(), 2),
		dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

	return dateString;
};

const zerofill = (n, digits) => {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}

	return zero + n;
};

// date: 기준일, hours: 구하고자하는 이전 시간
const getLastDate = (date, hours) => new Date(Date.parse(date) - 1000 * 60 * 60 * hours);

export default {
	getDateToString,
	getLastDate
};