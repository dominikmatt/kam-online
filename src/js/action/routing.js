const connection = require('./../Connection');
const updateBuilding = require('./updateBuilding');
const updateCharacter = require('./updateCharacter');
const updateMap = require('./updateMap');

connection.socket.on('game.building.update', updateBuilding);
connection.socket.on('game.character.update', updateCharacter);
connection.socket.on('game.map.update', updateMap);