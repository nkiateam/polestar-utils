let convert;
const keys = require('lodash/keys');
const each = require('lodash/forEach');
const measures = {
    length: require('./definitions/length'),
    area: require('./definitions/area'),
    mass: require('./definitions/mass'),
    volume: require('./definitions/volume'),
    each: require('./definitions/each'),
    temperature: require('./definitions/temperature'),
    time: require('./definitions/time'),
    digital: require('./definitions/digital'),
    partsPer: require('./definitions/partsPer'),
    speed: require('./definitions/speed'),
    pace: require('./definitions/pace'),
    pressure: require('./definitions/pressure'),
    current: require('./definitions/current'),
    voltage: require('./definitions/voltage'),
    power: require('./definitions/power'),
    reactivePower: require('./definitions/reactivePower'),
    apparentPower: require('./definitions/apparentPower'),
    energy: require('./definitions/energy'),
    reactiveEnergy: require('./definitions/reactiveEnergy'),
    volumeFlowRate: require('./definitions/volumeFlowRate'),
    illuminance: require('./definitions/illuminance'),
    frequency: require('./definitions/frequency'),
    angle : require('./definitions/angle'),
    percentage : require('./definitions/percentage'),
    dataSpeed: require('./definitions/dataSpeed'),
    rotationSpeed: require('./definitions/rotationSpeed'),
    gravimetry: require('./definitions/gravimetry'),
    dust: require('./definitions/dust')
};
let Converter;

Converter = function(numerator, denominator) {
    if (denominator) {
        this.val = numerator / denominator;
    } else {
        this.val = numerator;
    }
};

/**
 * Lets the converter know the source unit abbreviation
 */
Converter.prototype.from = function(from) {
    if (this.destination)
        throw new Error('.from must be called before .to');

    this.origin = this.getUnit(from);

    if (!this.origin) {
        this.throwUnsupportedUnitError(from);
    }

    return this;
};

/**
 * Converts the unit and returns the value
 */
Converter.prototype.to = function (to) {
    const { origin } = this;
    if (!origin) {
        throw new Error('.to must be called after .from');
    }

    this.destination = this.getUnit(to);

    let result, transform;
    const { destination, val } = this;

    if(!destination) {
        this.throwUnsupportedUnitError(to);
    }

    // Don't change the value if origin and destination are the same
    if (origin.abbr === destination.abbr) {
        return val;
    }

    // You can't go from liquid to mass, for example
    if(destination.measure !== origin.measure) {
        throw new Error('Cannot convert incompatible measures of '
            + destination.measure + ' and ' + origin.measure);
    }

    /**
     * Convert from the source value to its anchor inside the system
     */
    result = val * origin.unit.to_anchor;

    /**
     * For some changes it's a simple shift (C to K)
     * So we'll add it when convering into the unit (later)
     * and subtract it when converting from the unit
     */
    if (origin.unit.anchor_shift) {
        result -= origin.unit.anchor_shift
    }

    /**
     * Convert from one system to another through the anchor ratio. Some conversions
     * aren't ratio based or require more than a simple shift. We can provide a custom
     * transform here to provide the direct result
     */
    if(origin.system !== destination.system) {
        transform = measures[origin.measure]._anchors[origin.system].transform;
        if (typeof transform === 'function') {
            result = transform(result)
        }
        else {
            result *= measures[origin.measure]._anchors[origin.system].ratio;
        }
    }

    /**
     * This shift has to be done after the system conversion business
     */
    if (destination.unit.anchor_shift) {
        result += destination.unit.anchor_shift;
    }

    /**
     * Convert to another unit inside the destination system
     */
    return result / destination.unit.to_anchor;
};

/**
 * Converts the unit to the best available unit.
 */
Converter.prototype.toBest = function (params) {
    if(!this.origin)
        throw new Error('.toBest must be called after .from');

    const options = Object.assign({
        exclude: [],
        cutOffNumber: 1,
        imperial: false,
    }, params)

    let best;
    let { imperial } = options;
    const isImperial = imperial && this.hasImperial(this.origin.measure);
    /**
     Looks through every possibility for the 'best' available unit.
     i.e. Where the value has the fewest numbers before the decimal point,
     but is still higher than 1.
     */
    each(this.possibilities(), function(possibility) {
        const unit = this.describe(possibility);
        const isIncluded = options.exclude.indexOf(possibility) === -1;
        if (isIncluded && (
            (!isImperial && this.origin.system === unit.system) ||
            (isImperial && (unit.system === 'imperial' ||
                (unit.system !== 'metric' && this.origin.system === unit.system)))
        )) {
            const result = this.to(possibility);

            if (!best || (result >= options.cutOffNumber &&
                (result < best.val || (best.val < 1 && best.val > 0 && result > best.val)))) {
                best = {
                    val: result,
                    unit: possibility,
                    singular: unit.singular,
                    plural: unit.plural
                };
            }
        }
    }.bind(this));

    return best;
}

/**
 * Finds the unit
 */
Converter.prototype.getUnit = function (abbr) {
    let found;

    each(measures, function (systems, measure) {
        each(systems, function (units, system) {
            if (system === '_anchors'){
                return false;
            }

            each(units, function (unit, testAbbr) {
                if (testAbbr === abbr) {
                    found = {
                        abbr: abbr
                        , measure: measure
                        , system: system
                        , unit: unit
                    };
                    return false;
                }
            });

            if (found) {
                return false;
            }
        });

        if (found) {
            return false;
        }
    });

    return found;
};

const describe = function(resp) {
    return {
        abbr: resp.abbr,
        measure: resp.measure,
        system: resp.system,
        singular: resp.unit.name.singular,
        plural: resp.unit.name.plural,
    };
}

/**
 * An alias for getUnit
 */
Converter.prototype.describe = function (abbr) {
    const resp = Converter.prototype.getUnit(abbr);
    let desc = null;

    try {
        desc = describe(resp);
    } catch(err) {
        this.throwUnsupportedUnitError(abbr);
    }

    return desc;
};

/**
 * Detailed list of all supported units
 */
Converter.prototype.list = function (measure) {
    let list = [];

    each(measures, function (systems, testMeasure) {
        if(measure && measure !== testMeasure)
            return;

        each(systems, function (units, system) {
            if(system === '_anchors')
                return false;

            each(units, function (unit, abbr) {
                list = list.concat(describe({
                    abbr: abbr,
                    measure: testMeasure,
                    system: system,
                    unit: unit,
                }));
            });
        });
    });

    return list;
};

Converter.prototype.throwUnsupportedUnitError = function (what) {
    let validUnits = [];

    each(measures, function (systems, measure) {
        each(systems, function (units, system) {
            if(system === '_anchors')
                return false;

            validUnits = validUnits.concat(keys(units));
        });
    });

    throw new Error('Unsupported unit ' + what + ', use one of: ' + validUnits.join(', '));
}

/**
 * Returns the abbreviated measures that the value can be
 * converted to.
 */
Converter.prototype.possibilities = function (measure) {
    let possibilities = [];
    if(!this.origin && !measure) {
        each(keys(measures), function (measure){
            each(measures[measure], function (units, system) {
                if (system === '_anchors') {
                    return false;
                }
                possibilities = possibilities.concat(keys(units));
            });
        });
    } else {
        const measureKey = measure || this.origin.measure;
        each(measures[measureKey], function (units, system) {
            if(system === '_anchors') {
                return false;
            }
            possibilities = possibilities.concat(keys(units));
        });
    }

    return possibilities;
};

/**
 * Returns the abbreviated measures that the value can be
 * converted to.
 */
Converter.prototype.measures = function () {
    return keys(measures);
};

Converter.prototype.hasImperial = function (measure) {
    const systems = measures[measure];
    return Object.keys(systems).some((key) => key === 'imperial')
}

convert = function (value) {
    return new Converter(value);
};

module.exports = convert;
