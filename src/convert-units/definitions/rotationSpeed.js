var rotationSpeed;

rotationSpeed = {
    rpm: {
        name: {
            singular: 'rotation per minute'
            , plural: 'rotations per minute'
        }
        , to_anchor: 1
    }
};


module.exports = {
    metric: rotationSpeed
    , _anchors: {
        rotation: {
            unit: 'rpm'
            , ratio: 1
        }
    }
};
