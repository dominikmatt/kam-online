const core = require('./../core');
const CharacterFactory = require('./../characters/CharacterFactory');

module.exports = (res) => {
    console.log('game.character.update', res);
    const character = CharacterFactory(res.data.characterId, res.data.type, res.data.owner).character;
    character.updateComponentsData(res.data.componentsData);

    return;

    // Draw way.
    const material = new BABYLON.StandardMaterial("myMaterial", core.scene);

    walkable.path.forEach((point, index) => {
        const box = BABYLON.Mesh.CreateBox(
            index + '-point',
            0.1,
            core.scene
        );
        const material = new BABYLON.StandardMaterial("myMaterial", core.scene);

        box.position.x = point[0] + 0.5;
        box.position.z = point[1] + 0.5;

        if (point[0] === walkable.start[0] && point[1] === walkable.start[1]) {
            material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            material.specularColor = new BABYLON.Color3(1, 0, 0);
            material.ambientColor = new BABYLON.Color3(1, 0, 0);
        } else if (point[0] === walkable.target[0] && point[1] === walkable.target[1]) {
            material.emissiveColor = new BABYLON.Color3(0, 1, 0);
            material.diffuseColor = new BABYLON.Color3(0, 1, 0);
            material.specularColor = new BABYLON.Color3(0, 1, 0);
            material.ambientColor = new BABYLON.Color3(0, 1, 0);
        } else {
            material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            material.diffuseColor = new BABYLON.Color3(1, 1, 1);
            material.specularColor = new BABYLON.Color3(1, 1, 1);
            material.ambientColor = new BABYLON.Color3(1, 1, 1);
        }

        box.material = material;
    });
};