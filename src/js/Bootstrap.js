const Game = require('./Game.js');

class Bootstrap {
    start() {
        this._game = new Game();
    }
}

module.exports = Bootstrap;