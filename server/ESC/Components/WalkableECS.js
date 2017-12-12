const clientStack = require('./../../clientStack');
const PF = require('pathfinding');
/** @var Game */
const game = require('./../../base/Game');

const pathFinder = new PF.AStarFinder({
    allowDiagonal: false
});
const walkableStates = {
    standing: 'statnding',
    walking: 'walking'
};

class WalkableECS {
    constructor() {
        this.start = {x: 0, y: 0, z: 0};
        this.target = [3,3];
        this.path = [];
        this.nextPosition = [3,3];
        this.state = walkableStates.standing;
        this.clientId = null;
    }

    /**
     * Goto, returns true if a path has been found.
     * Returns false if there is no way to the job.
     *
     * @param toPosition
     * @param fromPosition
     * @return {boolean}
     */
    addGoToPath(toPosition, fromPosition) {
        this.path = pathFinder.findPath(
            fromPosition.x,
            fromPosition.z,
            toPosition.x,
            toPosition.z,
            game.map.streetGrid.clone()
        );

        if (this.path && 0 < this.path.length) {
            return true;
        }

        return false;
    }

    goTo() {
        if (this.path && 0 < this.path.length) {
            this.state = walkableStates.walking;

            return true;
        }

        return false;
    }

    getData() {
        return {
            start: this.start,
            target: this.target,
            path: this.path,
            state: this.state,
            nextPosition: this.nextPosition
        }
    }

    static get key() {
        return 'walkable';
    }
}

module.exports = WalkableECS;