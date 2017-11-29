const Character = require('./Character');
const characterStack = {};

/**
 * @param {String|null} id
 * @param {String} type
 *
 * @return {{character: Character, isNew: boolean}|Boolean}
 */
module.exports = (id, type = 'serf', owner = '') => {
    let isNewCharacter = false;

    if (null === id) {
        return;
    }

    if (!characterStack[id]) {
        characterStack[id] = new Character(id, type, owner);
        isNewCharacter = true;
    }

    return {
        character: characterStack[id],
        isNew: isNewCharacter
    };
};

