const Character = require('./Character');

class Serf extends Character {
    constructor(id, clientId) {
        super(id, clientId, 'serf');
    }
}

module.exports = Serf;