const Building = require('./Building');

const buildingMatrix = [
    [0,0,0],
    [0,0,0],
    [0,1,0]
];

buildingMatrix.reverse();

class Warehouse extends Building {
    constructor(id) {
        super(id, 'warehouse', buildingMatrix);
    }
}

module.exports = Warehouse;