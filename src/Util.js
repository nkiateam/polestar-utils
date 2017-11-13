


const getUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

const uniqueID = () => 'id-' + Math.random().toString(36).substr(2, 9);

const sleep = (milliseconds) => {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
};

// 시작페이지로 설정
const setStartPage = (obj, url) => {
	obj.style.behavior='url(#default#homepage)';
	//obj.setHomePage('http://internet.scourt.go.kr/');
	obj.setHomePage(url);
}

// 쿠키 설정
const setCookie = (cname, cvalue, exdays, cdomain) => {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = 'expires=' + d.toUTCString();
	var domain;
	if(cdomain) {
		domain = '; domain=' + cdomain;
	}
	document.cookie = cname + '=' + escape(cvalue) + '; path=/; ' + expires + domain;
};

// 쿠키 가져오기
const getCookie = (cname) => {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return unescape(c.substring(name.length, c.length));
		}
	}
	return '';
};

export default {
	getUUID,
	sleep,
	setStartPage,
	setCookie,
	getCookie
};