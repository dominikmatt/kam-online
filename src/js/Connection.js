const io = require('socket.io-client');
const socket = io('http://localhost:3000');
let _singleton = Symbol();

class Connection {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._socket = socket;
        this.player = null;
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new Connection(_singleton);
        }

        return this[_singleton]
    }

    connectToGame(player) {
        this.player = player;

        this.emit('game.connect', {
            gameId: 1
        });
    }

    emit(command, data) {
        data.from = this.player.username;
        socket.emit(command, data);
    }

    get socket() {
        return this._socket;
    }

    set socket(value) {
        this._socket = value;
    }
}

module.exports = Connection.instance;