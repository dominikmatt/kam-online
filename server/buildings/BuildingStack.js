const BuildingFactory = require('./BuildingFactory');

let _singleton = Symbol();

class BuildingStack {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

       this._stack = [];
    }

    /**
     * @return {BuildingStack}
     */
    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new BuildingStack(_singleton);
        }

        return this[_singleton]
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

module.exports = BuildingStack.instance;