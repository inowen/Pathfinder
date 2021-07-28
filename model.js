/**
 * The interface class for the model.
 */


class Model {
    constructor(algorithm_name, map_name) {
        this.map = new Map2d(map_name);
        this.agent = new Agent(algorithm_name, this.map);

        // Idea: Initially position the player on the first square available from top left,
        //       and the goal on the most bottom-right position? First square that isn't .isObstacle(x,y)
        var playerPlacement = this.getFirstWalkableTopLeft();
        var goalPlacement = this.getFirstWalkableBottomRight();

        this.gameState = new GameState(this.map, this.agent.getStoredPlan(), playerPlacement, goalPlacement);

        // And then, attach some kind of listener to the view/p5/something. That callback calls the controller
        //  to tell the model to put the goal somewhere else.


    }

    /**
     * Advances the model one step. Might not do anything.
     * It takes an action and updates the internally maintained GameState.
     */
    step() {

    }

    getGameState() {
        return null;
    }


    getFirstWalkableTopLeft() {
        var map = this.map;
        for (var row=0; row<map.size; ++row) {
            for (var col=0; col<map.size; ++col) {
                if (map.isWalkable(row,col)) {
                    return new Placement(row, col, 0);
                }
            }
        }
        return new Placement(1, 1, 0);
    }

    getFirstWalkableBottomRight() {
        var map = this.map;
        for (var row=map.size-1; row>=0; --row) {
            for (var col=map.size-1; col>=0; --col) {
                if (map.isWalkable(row, col)) {
                    return new Placement(row, col, 0);
                }
            }
        }
        return new Placement(map.size-1, map.size-1);
    }
}