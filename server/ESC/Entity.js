class Entity {
    constructor(id, clientId, type) {
        this._id = id;
        this._type = type;
        this._components = {};
        this._clientId = clientId;
    }

    addComponent(Entity) {
        const key = Entity.key;

        if (this._components[key]) {
            return;
        }

        this._components[key] = new Entity();
        this._components[key].clientId = this.clientId;
    }

    getComponent(key) {
        return this._components[key];
    }

    getComponentsData() {
        const componentsData = {};

        for (let key in this._components) {
            componentsData[key] = this._components[key].getData();
        }

        return componentsData;
    }

    get components() {
        return this._components;
    }

    get owner() {
        return this._owner;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(value) {
        this._clientId = value;
    }
}

module.exports = Entity;