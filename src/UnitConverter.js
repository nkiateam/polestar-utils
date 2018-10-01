/*
** This is decorated implementation of convert-utils
*  (https://github.com/ben-ng/convert-units)
 */

import round from 'lodash/round';
import isNumber from 'lodash/isNumber';
import convert from './convert-units';

const validUnit = (value, from, to, fixed) => {
    const defaultValue = {
        val: value,
        unit: from,
        singular: '',
        plural: '',
    };
    if (!isNumber(value)) {
        return {
            invalid: true,
            value: defaultValue,
        };
    } else if (!from || !to) {
        return {
            invalid: true,
            value: scaleNumber(value, fixed),
        };
    } else if (!convert().getUnit(from)) {
        return {
            invalid: true,
            value: defaultValue,
        };
    } else if (to && !convert().getUnit(to)) {
        return {
            invalid: true,
            value: defaultValue,
        };
    }
    return {
        invalid: false,
    };
}

const getUnit = (unit) => {
    return convert().getUnit(unit);
}

const convertUnit = (value, from, to, fixed = 1) => {
    const isValidUnit = validUnit(value, from, to, fixed);
    if (isValidUnit.invalid) {
        return isValidUnit.value;
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
    const isValidUnit = validUnit(value, from, false, fixed);
    if (isValidUnit.invalid) {
        return isValidUnit.value;
    }

    if (value === 0) {
        const desc = describe(from);
        return {
            val: value,
            unit: from,
            singular: desc.singular,
            plural: desc.plural,
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

const scaleNumber = (val, fixed = 1) => {
    const scales = ['', 'k', 'M', 'G', 'T'];
    if (val < 1000) {
        return {
            val: round(val, fixed),
            unit: scales[0],
        }
    }
    const i = parseInt(Math.floor(Math.log(val) / Math.log(1000)), 10);
    if (i === 0) {
        return {
            val: round(val, fixed),
            unit: scales[i],
        };
    }
    const resultVal = val / (1000 ** i);
    return {
        val: round(resultVal, fixed),
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
    validUnit,
    getUnit,
};


export default unitConverter;
