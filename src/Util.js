// const getUUID = () => {
// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
// 		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
// 		return v.toString(16);
// 	});
// };

// const uniqueID = () => 'id-' + Math.random().toString(36).substr(2, 9);

export const sleep = (milliseconds) => {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

// 시작페이지로 설정
export const setStartPage = (obj, url) => {
    obj.style.behavior = 'url(#default#homepage)';
    obj.setHomePage(url);
};

// 쿠키 설정
export const setCookie = (cname, cvalue, exdays, cdomain) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    let domain;
    if (cdomain) {
        domain = `; domain=${cdomain}`;
    }
    document.cookie = `${cname}=${escape(cvalue)}; path=/; ${expires}${domain}`;
};

// 쿠키 가져오기
export const getCookie = (cname) => {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return unescape(c.substring(name.length, c.length));
        }
    }
    return '';
};

export default {
    sleep,
    setStartPage,
    setCookie,
    getCookie,
};
