/**
 * The Agent has a think() function that returns the next
 * Placement to go to. 
 * 
 * The agent stores a plan, if there's no plan it will call 
 * a pathfinding algorithm to make one.
 */


class Agent {
    constructor(algorithm_name, map) {
        let algos = new Algorithms();
        this.algorithm = algos[algorithm_name];
        this.hasPlan = false;
        this.plan = new Array(); // Array of Placement
        this.map = map;
    }


    // Returns the next placement to put the player on. 
    // Or null, in which case the player shouldn't move.
    think(starting_node, goal_node) {
        if (!this.hasPlan) {
            this.plan = this.algorithm(starting_node, goal_node, this.map);
            this.hasPlan = true;
        }
        var nextPlacement = null;
        if (this.hasPlan && this.plan.length>0) {
            nextPlacement = this.plan.shift();
        }
        return nextPlacement;
    }


    getStoredPlan() {
        return this.plan;
    }
}