/*
** This is decorated implementation of convert-utils
*  (https://github.com/ben-ng/convert-units)
 */

import round from 'lodash/round';
import isNumber from 'lodash/isNumber';
import convert from './convert-units';

const convertUnit = (value, from, to, fixed = 1) => {
    if (!isNumber(value) || !from || !to) {
        return { 
            val: fixed > 0 ? round(value, fixed) : value, 
            unit: '',
            singular: '',
            plural: '',
        };
    }
    const result = convert(value).from(from).to(to);
    const desc = describe(to);
    return { 
        val: fixed > 0 ? round(result, fixed) : result, 
        unit: to,
        singular: desc.singular,
        plural: desc.plural,
    };
};

const convertUnitToBest = (value, from, option = {}, fixed = 1) => {
    if (!isNumber(value) || !from) {
        return { 
            val: fixed > 0 ? round(value, fixed) : value, 
            unit: '',
            singular: '',
            plural: '',
        };
    }
    const result = convert(value).from(from).toBest(option);
    result.val = fixed > 0 ? round(result.val, fixed) : result.val;
    return result;
};

const measures = () => {
    return convert().measures();
};

const unitPossibilities = (unit) => {
    return convert().from(unit).possibilities();
};

const possibilities = (measure) => {
    if (measure) {
        return convert().possibilities(measure);
    }
    return convert().possibilities();
};

const describe = (unit) => {
    return convert().describe(unit);
};

const list = (measure) => {
    if (measure) {
        return convert().list(measure);
    }
    return convert().list();
};

const unitConverter = {
    convertUnit,
    convertUnitToBest,
    measures,
    unitPossibilities,
    possibilities,
    describe,
    list,
};


export default unitConverter;
