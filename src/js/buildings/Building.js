const core = require('./../core');
const connection = require('./../Connection');
const mapHelper = require('./../map/mapHelper');

class Building {
    constructor(id, type, segmentWidth, segmentHeight, buildingMatrix, owner) {
        this.type = type;
        this.id = id;
        this.mapWidth = segmentWidth;
        this._segmentHeight = segmentHeight;
        this._width = this.segmentWidth * core.map.segmentsWidth;
        this._height = this.segmentHeight * core.map.segmentsHeight;
        this._position = new BABYLON.Vector3(0, 0, 0);
        this.owner = core.player;
        this._completionPercent = 0;
        this.isPlaced = false;
        this._buildingMatrix = buildingMatrix;
        this._owner = owner;

        /** @var BABYLON.Mesh */
        this.building = null;

        this.create(new BABYLON.Vector3(0, 0, 0));
    }

    destroy() {
        this.building.dispose();
    }

    /**
     * Normalize position to map grid.
     *
     * @param {BABYLON.Vector3} position
     * @return {BABYLON.Vector3}
     */
    normalizePosition(position) {
        return mapHelper.normalizePosition(position);
    }

    /**
     * Send data to server.
     */
    sendToServer() {
        connection.emit('game.building.create', {
            data: {
                buildingId: this.id,
                position: this.position,
                type: this.type
            }
        });
    }

    /**
     * Update building position.
     *
     * @param {BABYLON.Vector3} updatePosition
     * @param {boolean} normalizePosition
     */
    updatePosition(updatePosition, normalizePosition) {
        if (this.isPlaced) {
            return;
        }

        this.position = updatePosition;

        if (normalizePosition) {
            this.position = this.normalizePosition(updatePosition).clone();
        }

        this.building.position.x = this.position.x + (this.width / 2);
        this.building.position.y = this.position.y + (this.completionPercent / 100) - 0.5;
        this.building.position.z = this.position.z + (this.height / 2);

        this.building.position.x = this.building.position.x - 1;
        this.building.position.z = this.building.position.z - 1;
    }

    buildAnimation() {
        this.building.position = new BABYLON.Vector3(
            this.building.position.x,
            this.position.y + (this.completionPercent / 100) - 0.5,
            this.building.position.z
        );
    }

    updateSize() {
        this.building.scaling = new BABYLON.Vector3(
            this.width,
            1,
            this.height
        );

        this.building.bakeCurrentTransformIntoVertices();
    }

    build() {}
    create() {}

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get segmentHeight() {
        return this._segmentHeight;
    }

    get segmentWidth() {
        return this.mapWidth;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get completionPercent() {
        return this._completionPercent;
    }

    set completionPercent(value) {
        this._completionPercent = value;
    }

    get buildingMatrix() {
        return this._buildingMatrix;
    }
}

module.exports = Building;