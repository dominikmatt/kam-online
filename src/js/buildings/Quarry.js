const Cube = require('./Cube');

const buildingMatrix = [
    [0,0,0],
    [0,0,0,0],
    [0,1,0,0]
];

buildingMatrix.reverse();

class Quarry extends Cube {
    constructor(id,owner) {
        super(id, 'quarry', 4.0, 3.0, buildingMatrix, owner);
    }
}

module.exports = Quarry