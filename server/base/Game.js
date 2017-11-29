const Map = require('./Map');

let _singleton = Symbol();

class Game {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this.map = new Map(this);

        this._players = [];
    }

    /**
     * @return {Game}
     */
    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new Game(_singleton);
        }

        return this[_singleton]
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
}

module.exports = Game.instance;