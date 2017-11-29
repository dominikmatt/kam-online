const Cube = require('./Cube');

const buildingMatrix = [
    [0,0,0],
    [0,0,0],
    [0,1,0]
];

buildingMatrix.reverse();

class Warehouse extends Cube {
    constructor(id, owner) {
        super(id, 'warehouse', 3.0, 3.0, buildingMatrix, owner);
    }
}

module.exports = Warehouse;