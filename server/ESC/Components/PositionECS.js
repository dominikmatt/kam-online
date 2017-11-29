class PositionECS {
    constructor() {
        this._position = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    setData(position) {
        this._position = position;
    }

    get position() {
        return this._position;
    }

    getData() {
        return this._position;
    }

    static get key() {
        return 'position';
    }
}

module.exports = PositionECS;