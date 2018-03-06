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

export default {
    getBytes,
    isMaxBytes,
    hexEncode,
    hexDecode,
};
