const Game = require('./Game.js');
let _singleton = Symbol();

class GamesPool {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._games = [];
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new GamesPool(_singleton);
        }

        return this[_singleton]
    }

    getOrCreateGameById(id, clientId) {
        if (!this._games[id]) {
            this._games[id] = new Game(clientId);
        }

        return this._games[id];
    }
}

module.exports = GamesPool.instance;