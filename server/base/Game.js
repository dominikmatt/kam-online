const PF = require('pathfinding');
const BuildingStack = require('./../buildings/BuildingStack');
const Map = require('./Map');

class Game {
    constructor(clientId) {
        this.map = new Map(clientId);

        this._players = [];

        /** @var {BuildingStack} */
        this._buildingStack = new BuildingStack();
    }

    /**
     * @param {Array} coordinates - Array with coordinates;
     */
    setNotBuildable(coordinates) {
        coordinates.forEach((position) => {
            this.map.nodes[position.z][position.x].buildable = false;
        });
    }

    /**
     * @param {Array} coordinates - Array with coordinates;
     *
     * @return {Boolean}
     */
    isBuildable(coordinates) {
        let isBuildable = true;

        coordinates.forEach((position) => {
            if (!this.map.nodes[position.z][position.x].buildable) {
                isBuildable = false;
                return;
            }
        });

        return isBuildable;
    }

    getMapData() {
        return this.map;
    }

    addPlayer(player) {
        this._players.push(player);
    }

    getPlayerByUsername(username) {
        const players = this._players.filter((player) => {
            return player.username === username;
        });

        if (0 < players.length) {
            return players[0];
        }

        return players;
    }

    sendToAll(object, me) {
        this._players.forEach((player) => {
            object.sendTo(player, me);
        });
    }

    /**
     * @return {BuildingStack}
     */
    get buildingStack() {
        return this._buildingStack;
    }
}

module.exports = Game;