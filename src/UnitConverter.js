/*
** This is decorated implementation of convert-utils
*  (https://github.com/ben-ng/convert-units)
 */

import round from 'lodash/round';
import convert from './convert-units';

const isNotNumber = value => typeof value !== 'number' && Number.isNaN(value);

const convertUnit = (value, from, to, fixed = 1) => {
    if (isNotNumber(value)) {
        return null;
    } else if (!from || !to) {
        return value;
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
    if (isNotNumber(value)) {
        return null;
    } else if (!from) {
        return value;
    }
    const result = convert(value).from(from).toBest(option);
    result.val = fixed > 0 ? round(result.val, fixed) : result.val;
    console.log('result', result);
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

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
