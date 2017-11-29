class PositionECS {
    constructor() {
        this._position = new BABYLON.Vector3(0, 0, 0);
        this.onChangedCallback = () => {};
    }

    setData(position) {
        this._position = new BABYLON.Vector3(
            position.x - 1,
            position.y,
            position.z - 1
        );

        this.onChangedCallback(this._position);
    }
    
    addOnChangedCallback(callback) {
        this.onChangedCallback = callback;
    }

    get position() {
        return this._position;
    }

    static get key() {
        return 'position';
    }
}

module.exports = PositionECS;