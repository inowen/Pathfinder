/**
 * The interface class for the model.
 */


class Model {
    constructor(algorithm_name, map_name) {
        this.map = new Map2d(map_name);
        this.agent = new Agent(algorithm_name, this.map);
    }

    step() {

    }

    getGameState() {
        return null;
    }
}