var percentage = {
    '%': {
        name: {
            singular: '%',
            plural: '%',
        },
        to_anchor: 1,
    },
};

module.exports = {
    metric: percentage,
    _anchors: {
        metric: {
            unit: '%',
            ratio: 1,
        },
    },
};
