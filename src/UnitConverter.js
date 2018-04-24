/*
** This is decorated implementation of convert-utils
*  (https://github.com/ben-ng/convert-units)
 */

import round from 'lodash/round';
import isNumber from 'lodash/isNumber';
import convert from './convert-units';

const convertUnit = (value, from, to, fixed = 1) => {
    if (!isNumber(value)) {
        return { 
            val: fixed > 0 ? round(value, fixed) : value, 
            unit: '',
            singular: '',
            plural: '',
        };
    } else if (!from || !to) {
        return scaleNumber(value, fixed);
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
    if (!isNumber(value)) {
        return { 
            val: fixed > 0 ? round(value, fixed) : value, 
            unit: '',
            singular: '',
            plural: '',
        };
    } else if (!from) {
        return scaleNumber(value, fixed);
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

const scaleNumber = (val, fixed = 1) => {
    const scales = ['', 'k', 'M', 'G', 'T']
    if (val === 0) {
        return {
            val: round(val, fixed),
            unit: scales[0],
        }
    }
    const i = parseInt(Math.floor(Math.log(val) / Math.log(1000)), 10)
    if (i === 0) {
        return {
            val: round(val, fixed),
            unit: scales[i],
        };
    }
    return {
        val: round((val / (1000 ** i), fixed)),
        unit: scales[i],
    };
}

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
