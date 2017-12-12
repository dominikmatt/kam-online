const BuildingFactory = require('./../buildings/BuildingFactory');

module.exports = (res) => {
    console.log(res.data);
    const buildingData = BuildingFactory(res.data.buildingId, res.data.type, res.data.owner);

    /** @var Building */
    const building = buildingData.building;

    if (buildingData.isNew) {
        building.updatePosition(new BABYLON.Vector3(
            res.data.position.x,
            res.data.position.y,
            res.data.position.z
        ), false);

        building.build();
    }

    if (res.data.destroyed) {
        building.destroy();
    }

    building.completionPercent = res.data.completionPercent;
    building.buildAnimation();
};