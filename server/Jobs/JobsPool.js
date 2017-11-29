let _singleton = Symbol();

class JobsPool {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this.date = new Date();
        this.atWorking = [];
        this.pool = {
            bulldoze: []
        }
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new JobsPool(_singleton);
        }

        return this[_singleton]
    }

    addJob(job) {
        if (!this.pool[job.type]) {
            this.pool[job.type] = [];
        }

        this.pool[job.type].push(job);
    }

    getJob(type, character) {
        const job = this.pool[type].shift();

        if (!job) {
            return false;
        }

        job.character = character;
        this.atWorking.push(job);

        if (job.isExecutable()) {
            return job;
        }

        this.resetJob(job);

        return false;
    }

    resetJob(needJob) {
        const index = this.atWorking.findIndex((currentJob) => {
            return needJob.id === currentJob.id;
        });
        const job = this.atWorking.splice(index, 1);

        JobsPool.instance.addJob(job.pop());
    }
}

module.exports = JobsPool.instance;