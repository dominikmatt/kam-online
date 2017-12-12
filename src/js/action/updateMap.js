const core = require('./../core');

module.exports = (res) => {
    for (let x in res.data.nodes) {
        for (let z in res.data.nodes[x]) {
            const node = res.data.nodes[x][z];

            if (node.street) {
                const street = BABYLON.Mesh.CreateBox(
                    'street-' + x + '-' + z,
                    1,
                    core.scene
                );
                const streetMaterial = new BABYLON.StandardMaterial('street-' + x + '-' + z + '-material', core.scene);
                streetMaterial.ambientColor = BABYLON.Color3.Gray();
                streetMaterial.emissiveColor = BABYLON.Color3.Gray();
                streetMaterial.specularColor = BABYLON.Color3.Gray();
                streetMaterial.specularPower = 0;

                street.material = streetMaterial;
                street.position = new BABYLON.Vector3(
                    node.position.x - 0.5,
                    0,
                    node.position.z - 0.5
                );
                street.scaling.y = 0.01;
            }
        }
    };
};