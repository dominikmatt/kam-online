const BABYLON = require('babylonjs');
const Map = require('./Map');
const core = require('./core');
require('./menu/menu');

window.buildingsMapper = {
    warehouse: require('./buildings/Warehouse'),
    quarry: require('./buildings/Quarry'),
};

/**
 * Start game, create scene and initialize game loop.
 */
class Game {
    constructor() {
        this._canvas = document.getElementById('game-canvas');
        this._engine = new BABYLON.Engine(this._canvas, true);

        this.createScene();

        this.engine.runRenderLoop(this.runRenderLoop.bind(this));

        this.initializeMap();
    }

    initializeMap() {
        core.map = new Map();

        core.map.createMapFromServer();
    }

    /**
     * Create babylon scene.
     */
    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 20, 0), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        scene.gravity = new BABYLON.Vector3(0, -0.1, 0);

        // Enable Collisions
        scene.collisionsEnabled = false;

        //Then apply collisions and gravity to the active camera
        camera.checkCollisions = false;
        camera.applyGravity = false;

        //Set the ellipsoid around the camera (e.g. your player's size)
        camera.ellipsoid = new BABYLON.Vector3(50, 1, 1);

        core.scene = scene;
    }

    /**
     * Run game loop.
     *
     * This method is called by babylonjs.
     */
    runRenderLoop() {
        if (core.map) {
            core.map.update();
        }
        core.scene.render();
    }

    /**
     * @return {BABYLON.Engine}
     */
    get engine() {
        return this._engine;
    }

    /**
     * @return {Element}
     */
    get canvas() {
        return this._canvas;
    }
}

module.exports = Game;