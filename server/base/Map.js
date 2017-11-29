var PF = require('pathfinding');
const clientStack = require('./../clientStack');
const mapWidth = 30;
const mapHeight = 30;

const nodes = [];
const streetGrid = new PF.Grid(mapWidth, mapHeight);

for(let posX = 0; posX < mapWidth; posX++) {
    nodes.push([]);

    for(let posZ = 0; posZ < mapHeight; posZ++) {
        nodes[posX].push({
            position: {
                x: posX,
                z: posZ
            },
            buildable: true,
            street: false
        });
        streetGrid.setWalkableAt(posX, posZ, false);
    }
}

class Map {
    constructor(game) {
        this.game = game;
        this._mapWidth = mapWidth;
        this._mapHeight = mapHeight;
        this._nodes = nodes;
        this._streetGrid = streetGrid;
    }

    /**
     * Set a street on given x and z coordinates.
     *
     * @param {Number} posX
     * @param {Number} posZ
     * @param {Boolean} walkable
     */
    setStreetAt(posX, posZ, hasStreet) {

        this._nodes[posX][posZ].street = hasStreet;
        this._streetGrid.setWalkableAt(posX, posZ, hasStreet);
        this.game.sendToAll(this, client.player);
    }

    sendTo(toPlayer, fromPlayer) {
        toPlayer.socket.emit('game.map.update', {
            from: fromPlayer.username,
            to: toPlayer.username,
            data: {
                nodes: this._nodes
            }
        });
    }

    get mapHeight() {
        return this._mapHeight;
    }

    get mapWidth() {
        return this._mapWidth;
    }

    get nodes() {
        return this._nodes;
    }

    get streetGrid() {
        return this._streetGrid;
    }
}

module.exports = Map;