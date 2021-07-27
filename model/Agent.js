/**
 * The Agent has a think() function that returns the next
 * Placement to go to. 
 * 
 * The agent stores a plan, if there's no plan it will call 
 * a pathfinding algorithm to make one.
 */


class Agent {
    constructor(algorithm_name, map) {
        let algos = new Algorithms(); // Reference algorithms.js before Agent.js
        this.algorithm = algos[algorithm_name];
        this.hasPlan = false;
        this.plan = new Array(); // Array of Placement
        this.map = map;
    }


    // Returns the next placement to put the player on. Or null, in which case the player shouldn't move.
    think(starting_node, goal_node) {
        // If no plan, make one calling pathfinder
        if (!this.hasPlan) {
            // Create starting node, goal node, (and map?)
            this.plan = this.algorithm(starting_node, goal_node, this.map);
            this.hasPlan = true;
        }

        // Return the first placement in the plan
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