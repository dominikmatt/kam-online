/** @var Core */
const core = require('./../core');
const Building = require('./Building');

class Cube extends Building {
    constructor(id, type, width, height, buildingMatrix, owner) {
        super(id, type, width, height, buildingMatrix, owner);
    }

    create(position) {
        const building = new BABYLON.SolidParticleSystem(this.id + '-building', core.scene);
        const box = BABYLON.Mesh.CreateBox(
            this.id + '-building-box',
            1,
            core.scene
        );
        let boxCounts = 0;

        this.buildingMatrix.forEach((z) => {
            boxCounts += z.length;
        });

        let indexX = 0;
        let indexZ = 0;

        const updatBoxPositions = (particle) => {
            const posX = -(this.width / 2) + 0.5 + indexX;
            const posZ = -(this.height / 2) + 0.5 + indexZ;

            particle.position.x = posX;
            particle.position.z = posZ;

            if (1 === this.buildingMatrix[indexZ][indexX]) {
                particle.material = this.createBuildingEntryMaterial(particle);
            } else {
                particle.material = this.createBuildingMaterial(particle);
            }

            indexX++;

            if (this.buildingMatrix[indexZ].length <= indexX) {
                indexX = 0;
                indexZ++;
            }
        };

        building.addShape(box, boxCounts, {
            positionFunction: updatBoxPositions
        });

        building.initParticles();
        building.updateParticle();

        this.building = building.buildMesh();

        this.updatePosition(position, true);
    }

    createBuildingMaterial(particle) {
        particle.color = core.getPlayerColor(this._owner);
    }

    createBuildingEntryMaterial(particle) {
        particle.color = new BABYLON.Color4(0, 0, 0, 1);
    }

    build() {
        if (this.isPlaced) {
            return;
        }

        this.isPlaced = true;

        this.updatePosition(this.position, false);
    }
}

module.exports = Cube;