const clientStack = require('./clientStack');
const PF = require('pathfinding');
const CharacterFactory = require('./base/CharacterFactory');
const PositionECS = require('./ESC/Components/PositionECS');

class GameRoutes {
    static bind(client) {
        const clientId = client.id;

        client.on('game.street.build', (data) => {
            const posX = data.data.position.x;
            const posZ = data.data.position.z;
            const clientData = clientStack.get(clientId);

            clientData.game.map.setStreetAt(posX, posZ, true);
        });

        client.on('game.character.create', (res) => {
            CharacterFactory(null, clientId, res.data.type);
        });

        client.on('game.character.update', (res) => {
            const character = CharacterFactory(res.data.characterId, clientId).character;

            character.getComponent(PositionECS.key).setData(res.data.position);
        });
    }
}

module.exports = GameRoutes;