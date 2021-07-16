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
}