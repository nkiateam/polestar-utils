const regExp_EMAIL = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

export const checkEmail = (strValue) => strValue.match(regExp_EMAIL);

export default {
    checkEmail,
};
