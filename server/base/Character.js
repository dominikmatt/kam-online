const Entity = require('../ESC/Entity');
const WalkableECS = require('../ESC/Components/WalkableECS');
const PositionECS = require('../ESC/Components/PositionECS');
const clientStack = require('./../clientStack');
const jobsPool = require('./../Jobs/JobsPool');

class Character extends Entity {
    constructor(id, clientId) {
        super(id, clientId, 'serf');

        this.jobType = 'bulldoze';
        this.job = null;

        this.addComponent(PositionECS);
        this.addComponent(WalkableECS);

        this.updateFrontendData();

        setInterval(() => this.executeJob(), 1000);
    }

    executeJob() {
        if (this.job) {
            return;
        }

        this.job = jobsPool.getJob('bulldoze', this);

        if (!this.job) {
            return;
        }

        this.job.run();
        this.updateFrontendData();
    }

    sendTo(toPlayer, fromPlayer) {
        const client = clientStack.get(this.clientId);
        const componentsData = this.getComponentsData();

        toPlayer.socket.emit('game.character.update', {
            from: fromPlayer.username,
            to: toPlayer.username,
            data: {
                characterId: this._id,
                type: this._type,
                owner: client.player.username,
                componentsData
            }
        });
    }

    updateFrontendData() {
        const client = clientStack.get(this.clientId);
        client.game.sendToAll(this, client.player);
    }
}

module.exports = Character;