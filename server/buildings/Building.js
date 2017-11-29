const clientStack = require('./../clientStack');
const jobsPool = require('./../Jobs/JobsPool');
const BulldozeJob = require('./../Jobs/BulldozeJob');
/** @var Game */
const game = require('./../base/Game');
console.log('building');
class Building {
    constructor(id, type, buildingMatrix) {
        this._position = {
            x: 0,
            y: 0,
            z: 0
        };

        this._id = id;
        this._type = type;
        this._completionPercent = 0;
        this._clientId = null;
        this._buildingMatrix = buildingMatrix;
        this._coordinates = [];
        this._destroyed = false;
        this._entryPosition = {x: 0, y: 0, z:0};
    }

    build() {
        this.addBulldozeJobs();
        this.generateCoordinatesArray();
    }

    workOnIt() {
        if (100 > this.completionPercent) {
            this._completionPercent = this.completionPercent + 10;
            game.sendToAll(this, client.player);
        }
    }

    generateCoordinatesArray() {
        const client = clientStack.get(this.clientId);

        this.buildingMatrix.forEach((z, indexZ) => {
            const posZ = this.position.z + indexZ;

            z.forEach((x, indexX) => {
                const posX = this.position.x + indexX;

                this._coordinates.push({
                    x: posX,
                    z: posZ
                });
            });
        });

        if (!game.isBuildable(this._coordinates)) {
            this._destroyed = true;
            game.sendToAll(this, client.player);

            return;
        }

        game.setNotBuildable(this._coordinates);
    }

    sendTo(toPlayer, fromPlayer) {
        const client = clientStack.get(this.clientId);

        toPlayer.socket.emit('game.building.update', {
            from: fromPlayer.username,
            to: toPlayer.username,
            data: {
                buildingId: this.id,
                type: this.type,
                position: this.position,
                completionPercent: this.completionPercent,
                destroyed: this._destroyed,
                owner: client.player.username
            }
        });
    }

    /**
     * - Generates all steps for the bulldoze job.
     * - Set entry point of building.
     */
    addBulldozeJobs() {
        const positions = [];
        const job = new BulldozeJob(this);

        this.buildingMatrix.forEach((row, posZ) => {
            row.forEach((item, posX) => {
                positions.push({
                    x: this.position.x + posX,
                    y: this.position.y,
                    z: this.position.z + posZ
                });

                if (1 === item) {
                    this._entryPosition.x = this.position.x + posX;
                    this._entryPosition.z = this.position.z + posZ;

                    game.map.streetGrid.setWalkableAt(
                        this._entryPosition.x,
                        this._entryPosition.z,
                        true
                    );
                }
            });
        });

        job.positions = positions;
        jobsPool.addJob(job);
    }

    get type() {
        return this._type;
    }

    get id() {
        return this._id;
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

    get clientId() {
        return this._clientId;
    }

    set clientId(clientId) {
        this._clientId = clientId;
    }

    get buildingMatrix() {
        return this._buildingMatrix;
    }

    get entryPosition() {
        return this._entryPosition;
    }
}

module.exports = Building;