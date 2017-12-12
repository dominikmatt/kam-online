let _singleton = Symbol();

class JobsPool {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this.date = new Date();
        this.atWorking = [];
        this.pool = {}
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new JobsPool(_singleton);
        }

        return this[_singleton]
    }

    addJob(clientId, job) {
        if (!this.pool[clientId]) {
            this.pool[clientId] = {};
        }

        if (!this.pool[clientId][job.type]) {
            this.pool[clientId][job.type] = [];
        }

        job.clientId = clientId;

        this.pool[clientId][job.type].push(job);
    }

    getJob(clientId, type, character) {
        // No jobs for clientId or type exists.
        if (!this.pool[clientId] || !this.pool[clientId][type]) {
            return;
        }

        const job = this.pool[clientId][type].shift();

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
        const jobs = this.atWorking.splice(index, 1);
        const job = jobs.pop();

        JobsPool.instance.addJob(job.clientId, job);
    }
}

module.exports = JobsPool.instance;