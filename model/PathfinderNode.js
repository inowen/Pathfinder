/**
 * Every kind of pathfinder uses nodes like this. 
 * Contains information about 
 * - Placement, 
 * - vehicle, 
 * - cost to node, 
 * - combined cost (for A* and such),
 * - reference to parent node.
 */


class PathfinderNode {
    constructor(placement, vehicle, cost, combined_cost, parent) {
        this.placement = placement;
        this.vehicle = vehicle;
        this.cost = cost;
        this.combined_cost = combined_cost;
        this.parent = parent;
    }


    // Btw, the goal node is required to assign the correct value for combined_cost
    // (using a Manhattan distance heuristic)
    generateAllChildren(goal_node, map) {
        // To-do: Add some kind of information about the cost of each action on each kind of cell.
        //        Make a list of children, adapting their cost, parent, placement, vehicle (if necessary).
    }
}