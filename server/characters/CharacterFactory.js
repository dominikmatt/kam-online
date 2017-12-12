const uuid = require('uuid/v4');
const Character = require('./Character');
const characters = {};
const charactersMapper = {
    serf: require('./Serf'),
    laborer: require('./Laborer')
};

/**
 * @param {String|null} id
 * @param {String} type
 * @return {{building: Building, isNew: boolean}|Boolean}
 */
module.exports = (id, clientId, type) => {
    let isNewCharacter = false;

    if (null === id) {
        id = type + '-' + uuid();
    }

    if (!characters[id]) {
        console.log(type);
        characters[id] = new charactersMapper[type](id, clientId);
        isNewCharacter = true;
    }

    return {
        character: characters[id],
        isNew: isNewCharacter
    };
};

