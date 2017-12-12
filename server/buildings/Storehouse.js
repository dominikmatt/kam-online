const Building = require('./Building');

const buildingMatrix = [
    [0,0,0],
    [0,0,0],
    [0,1,0]
];
const neededResources = {
    timber: {
        need: 6,
        store: 0
    },
    stone: {
        need: 5,
        store: 0
    }
};

buildingMatrix.reverse();

class Storehouse extends Building {
    constructor(id) {
        super(id, 'storehouse', buildingMatrix);
    }
}

module.exports = Storehouse;