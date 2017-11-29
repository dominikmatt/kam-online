class Player {
    constructor() {
        this._socket = null;
        this._username = '';
        this.color3 = '';
    }

    getPlayerColor(username) {
        switch (username) {
            case 'player1':
                return [0, 0, 1];
                break;
            case 'player2':
                return [1, 0, 0];
                break;
        }
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this.color3 = this.getPlayerColor(username);
        this._username = username;
    }

    get socket() {
        return this._socket;
    }

    set socket(socket) {
        this._socket = socket;
    }
}

module.exports = Player;