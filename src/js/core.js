const connection = require('./Connection');
const urlParameters = new URLSearchParams(window.location.search);
let _singleton = Symbol();

class Core {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this.date = new Date();

        /** @var BABYLON.Scene */
        this._scene = null;

        /** @var Map */
        this._map = null;

        this._player = {
            username: urlParameters.get('username'),
            color3: this.getPlayerColor(urlParameters.get('username'))
        };

        connection.connectToGame(this.player);
    }

    getPlayerColor(username) {
        switch (username) {
            case 'player1':
                return new BABYLON.Color3(0, 0, 1);
                break;
            case 'player2':
                return new BABYLON.Color3(1, 0, 0);
                break;
        }
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new Core(_singleton);
        }

        return this[_singleton]
    }

    /**
     * @return {BABYLON.Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * @param {BABYLON.Scene} scene
     */
    set scene(scene) {
        this._scene = scene;
    }

    /**
     * @return {Map}
     */
    get map() {
        return this._map;
    }

    /**
     * @param {Map} map
     */
    set map(map) {
        this._map = map;
    }

    set player(player) {
        this._player = player;
    }

    get player() {
        return this._player;
    }
}

module.exports = Core.instance;
