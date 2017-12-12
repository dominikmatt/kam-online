const Job = require('./Job');
const positionECSKey = require('./../ESC/Components/PositionECS').key;

const jobStates = {
    'waiting': 'waiting',
    'running': 'running',
    'done': 'done'
};

class LaborerJob extends Job {
    constructor(building) {
        super('laborer', building);

        this.positions = [];

        /** @var Number */
        this._refHeight = 0;

        this.state = jobStates.waiting;
        this.jobSteps = [
            {
                type: 'goToStart',
                run: () => {
                    const goTo = this.character.getComponent('walkable').goTo();
                },
                check: () => {
                    const characterPosition = this.character.getComponent(positionECSKey).position;

                    if (this._building.entryPosition.x === characterPosition.x
                        && this._building.entryPosition.z === characterPosition.z
                    ) {
                        return true;
                    }

                    return false;
                }
            },
            {
                type: 'build',
                run: () => {
                    setInterval(() => {
                        if (100 > this.building.completionPercent) {
                            this.building.workOnIt();
                        }
                    }, 100);
                },
                check: () => {
                    return 100 <= this.building.completionPercent;
                }
            }
        ];
    }

    isExecutable() {
        const goToPathFound = this.character.getComponent('walkable')
            .addGoToPath(
                this.building.entryPosition,
                this.character.getComponent('position').position
            );

        if (goToPathFound) {
            return true;
        }

        return false;
    }

    /**
     * @return {Number}
     */
    get refHeight() {
        return this._refHeight;
    }

    /**
     * @param {Number} refHeight
     */
    set refHeight(refHeight) {
        this._refHeight = refHeight;
    }
}

module.exports = LaborerJob;