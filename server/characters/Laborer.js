const Character = require('./Character');

class Laborer extends Character {
    constructor(id, clientId) {
        super(id, clientId, 'laborer');
    }
}

module.exports = Laborer;