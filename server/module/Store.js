class Store {
    constructor(store) {
        this.store = store;
        this.setProperty = this.setProperty.bind(this);
        this.getProperty = this.getProperty.bind(this);
    };
    setProperty(prop, value) {
        const prevValue = this.store[prop];
        if (
            prevValue &&
            typeof prevValue === 'object' && !(prevValue instanceof Array) &&
            typeof value === 'object' && !(value instanceof Array)
        ) {
            value = Object.assign(prevValue, value);
        }
        this.store[prop] = value;
    };
    getProperty(prop) {
        let value = this.store[prop];
        if (typeof value === 'object' && !(value instanceof Array)) {
            return Object.assign({}, value);
        }
        return value;
    };
};

let oStore = new Store({
    user: {},
    api_log_id: null
});

module.exports = {
    Store,
    oStore
};