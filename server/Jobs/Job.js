const uuid = require('uuid/v4');

const jobStates = {
    'waiting': 'waiting',
    'running': 'running',
    'done': 'done'
};

class Job {
    constructor(type, building) {
        this._id = uuid();
        this._type = type;
        this._character = null;
        this._building = building;
    }

    run() {
        console.log('------> run job');
        this.state = jobStates.running;
        this.runStep();
    }

    runStep() {
        const currentStep = this.jobSteps.shift();

        if (!currentStep) {
            this.state = jobStates.done;
            this.character.job = null;
            return 'done';
        }

        currentStep.run();

        this.jobChecker = setInterval(() => {
            if (currentStep.check()) {
                clearInterval(this.jobChecker);
                this.runStep();
            }
        }, 500);
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    get character() {
        return this._character;
    }

    set character(value) {
        this._character = value;
    }

    get building() {
        return this._building;
    }
}

module.exports = Job;