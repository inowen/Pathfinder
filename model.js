/**
 * The interface class for the model.
 */


class Model {
    constructor(algorithm_name, map_name) {
        this.map = new Map2d(map_name);
        this.algorithm_name = algorithm_name;
        this.agent = new Agent(algorithm_name, this.map);

        var playerPlacement = this.getFirstWalkableTopLeft();
        var goalPlacement = this.getFirstWalkableBottomRight();
        this.gameState = new GameState(this.map, this.agent.getStoredPlan(), playerPlacement, goalPlacement);

        // And then, attach some kind of listener to the view/p5/something. That callback calls the controller
        //  to tell the model to put the goal somewhere else.
        // => So, controller is called to change the position of something. The controller tells the model
        //          to set the new player/goalPlacement. Then a new Agent is created with those parameters.
        //                  (but obviously it only starts calculating again once Think is called)
        //                      BUT, the controller after all that tells the view to redraw, without the plan.
        //                              So, those setters in the model also eliminate the plan in GameState.


    }

    /**
     * Advances the model one step. Might not do anything.
     * It takes an action and updates the internally maintained GameState.
     */
    step() {
        // Get the next action from the Agent.
        var start_node = new PathfinderNode(this.gameState.playerPlacement, this.gameState.vehicle, 0, 0, null);
        var goal_node = new PathfinderNode(this.gameState.goalPlacement, 'x', 0, 0, null);
        var nextPlacement = this.agent.think(start_node, goal_node);
        // and update the GameState accordingly.
        this.gameState.playerPlacement = nextPlacement;
        this.gameState.plan = this.agent.getStoredPlan();
        var pos = this.gameState.playerPlacement;
        if (this.map.isVehicle(pos.row, pos.col)) {
            this.gameState.vehicle = this.map.get(pos.row, pos.col);
        }
    }

    getGameState() {
        return this.gameState;
    }

    // This should also reset the algorithms somehow... So interaction with the Agent
    setPlayerPosition(newPlacement) {
        this.gameState.playerPlacement = newPlacement;
        this.agent = new Agent(this.algorithm_name, this.map);
        this.gameState.plan = [];
    }

    setGoalPosition(newPlacement) {
        this.gameState.goalPlacement = newPlacement;
        this.agent = new Agent(this.algorithm_name, this.map);
        this.gameState.plan = [];
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