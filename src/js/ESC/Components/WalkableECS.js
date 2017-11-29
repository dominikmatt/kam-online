const core = require('./../../core');

const walkableStates = {
    standing: 'statnding',
    walking: 'walking'
};

class WalkableECS {
    constructor() {
        this._mesh = null;
        this._path = [];
        this._state = walkableStates.standing;
        this.onTargetReachedCallback = () => {};
    }

    setData(data) {
        this._path = data.path;

        if (walkableStates[data.state] !== this._state) {
            this._state = walkableStates[data.state];

            if (walkableStates.walking === this._state) {
                this.walk();
            }
        }
    }

    walk() {
        const animation = new BABYLON.Animation(
            "movement",
            "position",
            1,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        const steps = [
            {
                frame: 0,
                value: this.mesh.position
            }
        ];

        this._path.forEach((point, index) => {
            steps.push(
                {
                    frame: index + 1,
                    value: new BABYLON.Vector3(point[0] - 0.5, 1, point[1] - 0.5)
                }
            );
        });

        animation.setKeys(steps);
        this.mesh.animations.push(animation);

        core.scene.beginAnimation(this.mesh, 0, 100, false, 1, () => {
            this._state = walkableStates.standing;
            this.onTargetReachedCallback();
        });
    }

    onTargetReached(callback) {
        this.onTargetReachedCallback = callback;
    }

    get mesh() {
        return this._mesh;
    }

    set mesh(value) {
        this._mesh = value;
    }

    static get key() {
        return 'walkable';
    }
}

module.exports = WalkableECS;