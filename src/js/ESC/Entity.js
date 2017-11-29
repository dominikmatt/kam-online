class Entity {
    constructor(id, type, owner) {
        this._id = id;
        this._type = type;
        this._components = {};
        this._owner = owner;
    }

    addComponent(Entity) {
        const key = Entity.key;

        if (this._components[key]) {
            return;
        }

        this._components[key] = new Entity();
    }

    getComponent(key) {
        return this._components[key];
    }

    updateComponentsData(componentsData) {
        for (let key in this._components) {
            this._components[key].setData(componentsData[key]);
        }
    }

    get components() {
        return this._components;
    }

    get owner() {
        return this._owner;
    }

    get id() {
        return this._id;
    }
}

module.exports = Entity;