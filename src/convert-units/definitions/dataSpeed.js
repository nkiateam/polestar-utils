var bitSpeed, byteSpeed;

bitSpeed = {
    bps: {
        name: {
            singular: 'Bit per Second',
            plural: 'Bits per Second',
        },
        to_anchor: 1
    },
    kbps: {
        name: {
            singular: 'Kilobit per Second',
            plural: 'Kilobits per Second',
        },
        to_anchor: 1024
    },
    Mbps: {
        name: {
            singular: 'Megabit per Second',
            plural: 'Megabits per Second',
        },
        to_anchor: 1048576
    },
    Gbps: {
        name: {
            singular: 'Megabit per Second',
            plural: 'Megabits per Second',
        },
        to_anchor: 1073741824
    },
    Tbps: {
        name: {
            singular: 'Terabit per Second',
            plural: 'Terabits per Second',
        },
        to_anchor: 1099511627776
    }
};

byteSpeed = {
    'B/s': {
        name: {
            singular: 'Byte per Second',
            plural: 'Bytes per Second',
        },
        to_anchor: 1
    },
    'kB/s': {
        name: {
            singular: 'Kilobyte per Second',
            plural: 'Kilobytes per Second',
        },
        to_anchor: 1024
    },
    'MB/s': {
        name: {
            singular: 'Megabyte per Second',
            plural: 'Megabytes per Second',
        },
        to_anchor: 1048576
    },
    'GB/s': {
        name: {
            singular: 'Megabyte per Second',
            plural: 'Megabytes per Second',
        },
        to_anchor: 1073741824
    },
    'TB/s': {
        name: {
            singular: 'Terabyte per Second',
            plural: 'Terabytes per Second',
        },
        to_anchor: 1099511627776
    }
};

module.exports = {
    bitSpeed: bitSpeed,
    byteSpeed: byteSpeed,
    _anchors: {
        bitSpeed: {
            unit: 'bps',
            ratio: 1/8
        },
        byteSpeed: {
            unit: 'B/s',
            ratio: 8
        }
    }
};
