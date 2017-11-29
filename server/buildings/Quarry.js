const Building = require('./Building');

const buildingMatrix = [
    [0,0,0],
    [0,0,0,0],
    [0,1,0,0]
];

buildingMatrix.reverse();

class Quarry extends Building {
    constructor(id) {
        super(id, 'quarry', buildingMatrix);
    }
}

module.exports = Quarry