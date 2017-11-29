const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
/** @var GamesPool */
const gamesPool = require('./base/gamesPool');
/** @var Player */
const Player = require('./base/Player');
/** @var ClientStack */
const clientStack = require('./clientStack');
const GameRoutes = require('./GameRoutes');

server.listen(3000);

io.on('connection', function (client) {
    let game = null;
    let me = null;

    clientStack.add(client);

    client.on('game.connect', (data) => {
        game = gamesPool.getOrCreateGameById(null, client.id);
        me = new Player();
        me.socket = client;
        me.username = data.from;

        clientStack.setGame(client.id, game);
        clientStack.setPlayer(client.id, me);

        game.addPlayer(me);

        game.buildingStack.stack.forEach((building) => {
            building.sendTo(me, me);
        });
    });

    GameRoutes.bind(client);

    client.on(
        'game.building.create',
        (data) => {
            if (!game) {
                return;
            }

            game.buildingStack.add(data.data, client.id);

            game.sendToAll(
                game.buildingStack.get(data.data.buildingId),
                me
            );
        }
    );


});