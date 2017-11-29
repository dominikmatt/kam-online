let _singleton = Symbol();

class ClientStack {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._clients = {};
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new ClientStack(_singleton);
        }

        return this[_singleton]
    }

    add(client) {
        this._clients[client.id] = {
            client
        };
    }

    /**
     * @param clientId
     * @return {{client: Client, game: Game, player: Player}}
     */
    get(clientId) {
        return this._clients[clientId];
    }

    setGame(clientId, game) {
        this._clients[clientId].game = game;
    }

    setPlayer(clientId, player) {
        this._clients[clientId].player = player;
    }
}

module.exports = ClientStack.instance;