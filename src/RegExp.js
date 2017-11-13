
const regExp_EMAIL = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

const checkEmail = (strValue) => {
	if (!strValue.match(regExp_EMAIL)) {
		return false;
	}
	return true;
};

export default {
	checkEmail
};