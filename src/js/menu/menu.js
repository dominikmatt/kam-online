const core = require('./../core');
const BuildingFactory = require('./../buildings/BuildingFactory');
const connection = require('./../Connection');

class Menu {
    constructor() {
        this.bindDOMEvents();
    }

    bindDOMEvents() {
        document.querySelectorAll('[data-action]')
            .forEach((el) => {
                el.addEventListener('click', this.onActionClicked.bind(this));
            });
    }

    onActionClicked(event) {
        const action = event.target.dataset.action;
        window.buildStreet = false;

        switch (action) {
            case 'build':
                this.buildBuildingAction();
                break;
            case 'buildStreet':
                this.buildStreetAction();
                break;
            case 'createCharacter':
                this.createCharacterAction();
                break;
        }
    }

    buildBuildingAction() {
        const buildingKey = event.target.dataset.building;

        if (window.toBuildBuilding) {
            window.toBuildBuilding.destroy();
        }

        window.toBuildBuilding = BuildingFactory(null, buildingKey, core.player.username).building;
    }

    buildStreetAction() {
        window.buildStreet = !window.buildStreet;
    }

    createCharacterAction() {
        const characterKey = event.target.dataset.character;

        connection.emit('game.character.create', {
            data: {
                type: characterKey
            }
        });
    }
}

module.exports = new Menu();