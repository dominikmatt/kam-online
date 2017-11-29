const BuildingFactory = require('./BuildingFactory');

class BuildingStack {
    constructor() {
       this._stack = [];
    }

    add(buildingData, clientId) {
        let building;

        if (this.stack[buildingData.buildingId]) {
            return false;
        }

        building = BuildingFactory(buildingData.buildingId, buildingData.type).building;
        building.position = buildingData.position;
        building.clientId = clientId;

        building.build();

        this._stack.push(building);

        return true;
    }

    get stack() {
        return this._stack;
    }

    get(buildingId) {
        return this.stack.find((building) => {
            return building.id === buildingId;
        });
    }
}

module.exports = BuildingStack;