/** @var Core */
const core = require('./../core');
const Entity = require('./../ESC/Entity');
const WalkableESC = require('./../ESC/Components/WalkableECS');
const PositionECS = require('./../ESC/Components/PositionECS');
const connection = require('./../Connection');

class Character extends Entity {
    constructor(id, type, owner) {
        super(id, type, owner);
        console.log(id, type, owner);
        this.character = null;

        this.create();

        this.addComponent(PositionECS);
        this.addComponent(WalkableESC);

        this.getComponent(WalkableESC.key).mesh = this.character;
        this.getComponent(WalkableESC.key).onTargetReached(() => {
            this.updateCharacter();
        });

        this.getComponent(PositionECS.key)
            .addOnChangedCallback((position) => {
                this.character.position.x = position.x + 0.5;
                this.character.position.y = 1;
                this.character.position.z = position.z + 0.5;
            });
    }

    create() {
        this.character = BABYLON.Mesh.CreateBox(
            'people',
            0.5,
            core.scene
        );

        this.character.material = this.createCharacterMaterial();
    }

    updateCharacter() {
        connection.emit('game.character.update', {
            data: {
                characterId: this.id,
                position: {
                    x: Math.ceil(this.character.position.x),
                    y: this.character.position.y,
                    z: Math.ceil(this.character.position.z)
                }
            }
        });
    }

    createCharacterMaterial() {
        const terrainMaterial = new BABYLON.StandardMaterial("texture1", this.scene);
        terrainMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        terrainMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        terrainMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
        terrainMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);

        return terrainMaterial;
    }
}

module.exports = Character;