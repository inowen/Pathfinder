/**
 * The Agent has a think() function that returns the next
 * Placement to go to.
 * 
 * The agent stores a plan, if there's not plan it will call 
 * a pathfinding algorithm.
 * 
 * The pathfinding algorithm to use has to be set in the Agent's constructor.
 */


// Needs a reference to the map, which the algorithm needs.


class Agent {
    constructor(algorithm_name) {
        this.algorithm = null; // Somehow get a reference to the algorithm.
                // Options: An Algorithm class, or store a reference to algorithm functions? ...
                //      Make a choice later.
    }


    think() {
        return null;
    }
}