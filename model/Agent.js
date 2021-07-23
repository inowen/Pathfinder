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
/*
    Option: Pass an environment into the agent, which would contain the map.
    That environment could be passed on to the algorithm, and the algorithm
    would ask the environment for the children of an environment.
    (might need something to convert between an Environment and a node...)
 */


class Agent {
    constructor(algorithm_name) {
        let algos = new Algorithms(); // Reference algorithms.js before Agent.js
        this.algorithm = algos[algorithm_name];
        this.plan = new Array(); // Array of Placement
    }


    think() {
        // Use the plan or call this.algorithm to make a plan, return a Placement
        return null;
    }
}