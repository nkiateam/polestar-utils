export const getBytes = (str) => {
    let byte = 0;
    let one_char = '';

    for(let i = 0; i < str.length; i++) {
        one_char = str.charAt(i);
        if(escape(one_char).length > 4) {
            byte += 2;                      //한글2Byte
        } else {
            byte++;                         //영문 등 나머지 1Byte
        }
    }

    return byte;
};

export const isMaxBytes = (str, maxBytes) => {
    const bytes = getBytes(str);

    return bytes > maxBytes;
};

export const hexEncode = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

export const hexDecode = (str) => {
    const hexes = str.match(/.{1,4}/g) || [];
    let back = '';
    for (let j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}

// 글자 자르기
const charByteSize = (ch) => {
    if (ch === null || ch.length === 0) {
        return 0;
    }

    const charCode = ch.charCodeAt(0);

    if (charCode <= 0x00007F) {
        return 1;
    } else if (charCode <= 0x0007FF) {
        return 2;
    } else if (charCode <= 0x00FFFF) {
        return 3;
    }
    return 4;
}

const getByteLength = (s) => {
    if (s === null || s.length === 0) {
        return 0;
    }

    let size = 0;
    for (let i = 0; i < s.length; i++) {
        size += charByteSize(s.charAt(i));
    }
    return size;
}

export const cutByteLength = (s, len, suffix = '...') => {
    if (s === null || s.length === 0) {
        return 0;
    }

    let size = 0;
    let rIndex = s.length;
    const _len = len + 1;
    let _suffix = '';

    for (let i = 0; i < s.length; i++) {
        size += charByteSize(s.charAt(i));
        if (size === _len) {
            rIndex = i + 1;
            _suffix = suffix;
            break;
        } else if (size > _len) {
            rIndex = i;
            _suffix = suffix;
            break;
        }
    }
    return `${s.substring(0, rIndex)}${_suffix}`;
}

export default {
    getBytes,
    isMaxBytes,
    hexEncode,
    hexDecode,
    cutByteLength,
};
