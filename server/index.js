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

const defaultPlayerData = [
    {
        startPosition: {
            x: 4,
            y: 0,
            z: 4
        },
        street: [5, 3]
    },
    {
        startPosition: {
            x: 20,
            y: 0,
            z: 20
        },
        street: [21, 19]
    }
];

io.on('connection', function (client) {
    let me = null;

    clientStack.add(client);

    clientStack.count();

    client.on('game.connect', (data) => {
        const defaultData = defaultPlayerData.pop();
        me = new Player();
        me.socket = client;
        me.username = data.from;

        clientStack.setPlayer(client.id, me);

        game.addPlayer(me, client.id);

        console.log(defaultData);
        buildingStack.add({
            buildingId: null,
            type: 'storehouse',
            position: defaultData.startPosition,
            done: true
        }, client.id);
        game.map.setStreetAt(defaultData.street[0], defaultData.street[1], true);

        buildingStack.stack.forEach((building) => {
            building.sendTo(me, me);
        });


    });

    new GameRoutes(game, client);
});