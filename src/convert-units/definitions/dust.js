const dust = {
    '㎍/㎥': {
        name: {
            singular: 'Microgram per Cubic Meter',
            plural: 'Micrograms per Cubic Meter',
        },
        to_anchor: 1,
    },
};

module.exports = {
    metric: dust,
    _anchors: {
        metric: {
            unit: '㎍/㎥',
            ratio: 1,
        },
    },
};