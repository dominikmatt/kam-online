const BABYLON = require('babylonjs');
const core = require('./core');
const connection = require('./Connection');
const vertices = require('./../../server/Maps/flat/vertices.json');
const mapHelper = require('./map/mapHelper');
require('babylonjs-materials');

class Map {
    constructor() {
        /** @var BABYLON.GroundMesh */
        this.ground = null;

        /** @var BABYLON.Vector3 */
        this.groundPositions = [];

        this.mapPath = 'flat';
        this.mapWidth = 30;
        this.mapHeight = 30;
        this.segmentsWidth = 1;
        this.segmentsHeight = 1;
        this.segments = this.mapWidth / this.segmentsWidth;
        this.verticesPositionsChanged = false;
    }

    createMapFromServer() {
        var grid = {
            'h' : this.mapWidth,
            'w' : this.mapHeight
        };
        this.ground = new BABYLON.MeshBuilder.CreateTiledGround('ground',
            {
                xmin: 0,
                zmin: 0,
                xmax: this.mapWidth - 1,
                zmax: this.mapHeight - 1,
                subdivisions: grid
            },
            this.scene
        );
        //this.ground = BABYLON.Mesh.CreateGround("ground", this.mapWidth, this.mapHeight, this.segments, this.scene, true);
        this.ground.material = this.createGroundMaterial();
        this.ground.material.wireframe = false;

        this.ground.checkCollisions = true;
        this.ground.isPickable = true;

        core.scene.onPointerDown = (event, pickInfo) => {
            if (!pickInfo.hit) {
                return;
            }

            console.log('Pointer down information:');
            console.table(pickInfo.pickedPoint);
            console.table(mapHelper.normalizePosition(pickInfo.pickedPoint));

            if (window.toBuildBuilding) {
                pickInfo.pickedPoint.y = this.smoothGround(pickInfo.pickedPoint);
                window.toBuildBuilding.updatePosition(pickInfo.pickedPoint, true);
                window.toBuildBuilding.build();
                window.toBuildBuilding.sendToServer();

                window.toBuildBuilding = null;
            } else if (window.buildStreet) {
                connection.emit('game.street.build', {
                    data: {
                        position: mapHelper.normalizePosition(pickInfo.pickedPoint)
                    }
                });
            }
        };

        /**
         * @param {PointerEvent} event
         */
        core.scene.onPointerMove = (event) => {
            const pickInfo = core.scene.pick(event.clientX, event.clientY);

            if (!pickInfo.hit) {
                return;
            }

            if (window.toBuildBuilding) {
                window.toBuildBuilding.updatePosition(pickInfo.pickedPoint, true);
            }
        };
    }

    updateMap() {
        fetch('http://localhost:3000/_api/game/map')
            .then((response) => {
                return response.json();
            })
            .then((map) => {
                this.ground.updateVerticesData(
                    BABYLON.VertexBuffer.PositionKind,
                    map
                );
            });
    }

    /**
     * Set all vertices around a point to the same height.
     * e.g.: To set a smooth ground for a building.
     *
     * Usage:
     * map.smoothGround(new BABYLON.Vector3(0, 0, 0);
     * This script will set all vertices around 0(x), 0(y) to the same height.
     *
     *
     * @param {BABYLON.Vector3} position
     *
     * @return {Number}
     */
    smoothGround(position, refHeight = null) {
        this.perpareDataModelForEleveation();
        this.verticesPositions = this.ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        const sphereCenter = position;
        const updateIndexes = [];
        const referenceHeights = [];

        sphereCenter.y = 0;

        // Get all vertices around given point.
        this.groundPositions.forEach((position, index) => {
            sphereCenter.y = position.y; // Need it to reduce y-distance to 0.

            const updateDistance = BABYLON.Vector3.Distance(position, sphereCenter);
            const heightRefDistance = BABYLON.Vector3.Distance(position, sphereCenter);

            if (updateDistance < this.segmentsWidth) {
                updateIndexes.push(index);
            }

            if (heightRefDistance < this.segmentsWidth * 3) {
                referenceHeights.push(this.verticesPositions[index * 3 + 1]);
            }
        });

        // Store reference height.
        if (!refHeight) {
            const refheightMin = Math.min(...referenceHeights);
            refHeight = refheightMin;
        }

        // Set all all vertices to the same height.
        updateIndexes.forEach((index) => {
            this.verticesPositions[index * 3 + 1] = refHeight
        });

        this.verticesPositionsChanged = true;

        return refHeight;
    }

    /**
     * Get all vertices of the ground as BABYLON.Vector3 object.
     */
    perpareDataModelForEleveation() {
        const verticesPositions = this.ground.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        let index = 0;

        if (!verticesPositions) {
            return;
        }

        this.groundPositions = [];

        for (index; index < verticesPositions.length; index += 3) {
            this.groundPositions.push(
                new BABYLON.Vector3(
                    verticesPositions[index],
                    verticesPositions[index + 1],
                    verticesPositions[index + 2]
                )
            );
        }
    }

    createGroundMaterial() {
        const terrainMaterial = new BABYLON.StandardMaterial("texture1", this.scene);
        terrainMaterial.wireframe = false;
        terrainMaterial.diffuseColor = new BABYLON.Color3(0.29, 0.85, 0.1);
        terrainMaterial.specularColor = new BABYLON.Color3(0.29, 0.85, 0.1);
        terrainMaterial.emissiveColor = new BABYLON.Color3(0.29, 0.85, 0.1);
        terrainMaterial.ambientColor = new BABYLON.Color3(0.29, 0.85, 0.1);

        return terrainMaterial;
    }

    update() {
        // Update ground.
        if (this.verticesPositionsChanged) {
            this.ground.updateVerticesData(
                BABYLON.VertexBuffer.PositionKind,
                this.verticesPositions
            );

            this.verticesPositionsChanged = false;
        }
    }
}

module.exports = Map;
