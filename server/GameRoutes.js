const CharacterFactory = require('./base/CharacterFactory');
const PositionECS = require('./ESC/Components/PositionECS');
const buildingStack = require('./buildings/BuildingStack');

class GameRoutes {
    constructor(game, client) {
        this.game = game;
        this.client = client;

        this.bind();
    }

    bind() {
        /**
         * Build a street.
         */
        this.client.on('game.street.build', (data) => {
            const posX = data.data.position.x;
            const posZ = data.data.position.z;

            this.game.map.setStreetAt(posX, posZ, true);
        });

        /**
         * Create a new character.
         */
        this.client.on('game.character.create', (res) => {
            CharacterFactory(null, clientId, res.data.type);
        });

        /**
         * Update character data.
         */
        this.client.on('game.character.update', (res) => {
            const character = CharacterFactory(res.data.characterId, clientId).character;

            character.getComponent(PositionECS.key).setData(res.data.position);
        });

        /**
         * Build a new building.
         */
        this.client.on('game.building.create', (data) => {
            buildingStack.add(data.data, this.client.id);
            console.log(buildingStack.get(data.data.buildingId));
            this.game.sendToAll(buildingStack.get(data.data.buildingId), this.client.player);
        });
    }
}

module.exports = GameRoutes;