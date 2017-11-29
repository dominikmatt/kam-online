const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
/** @var Game */
const game = require('./base/Game');
/** @var Player */
const Player = require('./base/Player');
/** @var ClientStack */
const clientStack = require('./clientStack');
const GameRoutes = require('./GameRoutes');
const buildingStack = require('./buildings/BuildingStack');

server.listen(3000);

io.on('connection', function (client) {
    let me = null;

    clientStack.add(client);

    client.on('game.connect', (data) => {
        me = new Player();
        me.socket = client;
        me.username = data.from;

        clientStack.setPlayer(client.id, me);

        game.addPlayer(me);
        buildingStack.stack.forEach((building) => {
            building.sendTo(me, me);
        });
    });

    new GameRoutes(game, client);
});