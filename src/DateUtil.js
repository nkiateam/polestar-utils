const zerofill = (n, digits) => {
    let zero = '';
    let sn = n.toString();

    if (sn.length < digits) {
        for (let i = 0; i < digits - sn.length; i++) {
            zero += '0';
        }
    }

    return zero + sn;
};

export const getDateToString = (date) => {
    const year = date.getFullYear();
    const month = zerofill(date.getMonth() + 1, 2);
    const day = zerofill(date.getDate(), 2);
    const hours = (date.getHours() < 0) ? '00' : zerofill(date.getHours(), 2);	// daterangepicker hours 9시간 오버표시되는 버그로 인해 빼준다.
    const minutes = zerofill(date.getMinutes(), 2);
    const seconds = zerofill(date.getSeconds(), 2);
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return dateString;
};

// date: 기준일, hours: 구하고자하는 이전 시간
export const getLastDate = (date, hours) => new Date(Date.parse(date) - (1000 * 60 * 60 * hours));

export default {
    getDateToString,
    getLastDate,
};
