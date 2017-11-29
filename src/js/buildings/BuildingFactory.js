const uuid = require('uuid/v4');
const buildingStack = {};

/**
 * @param {String|null} id
 * @param {String} type
 * @return {{building: Building, isNew: boolean}|Boolean}
 */
module.exports = (id, type = '', owner = '') => {
    let isNewBuilding = false;

    if ('' === type || !window.buildingsMapper[type]) {
        return false;
    }

    if (null === id) {
        id = type + '-' + uuid();
    }

    if (!buildingStack[id]) {
        buildingStack[id] = new window.buildingsMapper[type](id, owner);
        isNewBuilding = true;
    }

    return {
        building: buildingStack[id],
        isNew: isNewBuilding
    };
};

