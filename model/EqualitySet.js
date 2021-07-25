class EqualitySet {
    constructor() {
        this.map = new Map();
    }

    has(node) {
        return this.map.has(node.getIdentityString());
    }

    add(node) {
        this.map.set(node.getIdentityString(), node);
    }

    delete(node) {
        this.map.delete(node.getIdentityString());
    }
}