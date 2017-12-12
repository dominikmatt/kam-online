const Cube = require('./Cube');

const buildingMatrix = [
    [0,0,0],
    [0,0,0],
    [0,1,0]
];

buildingMatrix.reverse();

class Storehouse extends Cube {
    constructor(id, owner) {
        super(id, 'storehouse', 3.0, 3.0, buildingMatrix, owner);
    }
}

module.exports = Storehouse;