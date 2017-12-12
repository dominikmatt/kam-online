const uuid = require('uuid/v4');
const buildings = {};

const buildingsMapper = {
    storehouse: require('./Storehouse'),
    quarry: require('./Quarry'),
};

/**
 * @param {String|null} id
 * @param {String} type
 * @return {{building: Building, isNew: boolean}|Boolean}
 */
module.exports = (id, type = '') => {
    let isNewBuilding = false;

    if ('' === type || !buildingsMapper[type]) {
        return false;
    }

    if (null === id) {
        id = type + '-' + uuid();
    }

    if (!buildings[id]) {
        buildings[id] = new buildingsMapper[type](id);
        isNewBuilding = true;
    }

    return {
        building: buildings[id],
        isNew: isNewBuilding
    };
};

