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
        var children = new Array();

        // TURN LEFT
        var child_turn_left = this.getCopy(this);
        child_turn_left.placement.orientation = (child_turn_left.placement.orientation + 3) % 4;
        child_turn_left.parent = this;
        child_turn_left.cost += this.getCostTurn(map.get(child_turn_left.placement.x,child_turn_left.placement.y));
        child_turn_left.combined_cost = child_turn_left.cost + manhattanDistance(child_turn_left, goal_node);
        children.push(child_turn_left);

        // TURN RIGHT
        var child_turn_right = this.getCopy(this);
        child_turn_right.placement.orientation = (child_turn_right.placement.orientation + 1) % 4;
        child_turn_right.parent = this;
        child_turn_right.cost = this.getCostTurn(map.get(child_turn_right.placement.x, child_turne_right.placement.y));
        child_turn_right.combined_cost = child_turn_right.cost + manhattanDistance(child_turn_right, goal_node);
        children.push(child_turn_right);

        // GO FORWARD (has to check if there's a vehicle to take there)
        var child_go_forward = this.getCopy(this);
        // Depending on orientation, change the coordinates accordingly.

        // Then check if that Placement is inside the map, and if it's walkable. In that case, add it.
        // (isInsideMap, isWalkable from map methods)
        

        // To-do: Add some kind of information about the cost of each action on each kind of cell.
        //        Make a list of children, adapting their cost, parent, placement, vehicle (if necessary).



        return children;
    }

    
    getCostTurn(terrain_char) {
        if (terrain_char == 'F') {
            return 10;
        }
        if (terrain_char == 'c' || terrain_char == 'b' || terrain_char == 's') {
            return 5;
        }
        if (terrain_char == 'W') {
            if (this.vehicle == 'b') {
                return 5;
            }
            else {
                return 100;
            }
        }
        if (terrain_char == 'R') {
            if (this.vehicle == 'c') {
                return 1;
            }
            else {
                return 15;
            }
        }
        if (terrain_char == 'S') {
            if (this.vehicle == 's') {
                return 5;
            }
            else {
                return 80;
            }
        }
        console.error("Should never be getting here!");
        return 50;
    }

    getCostForward(terrain_char) {
        return this.getCostTurn(terrain_char); // For now both actions cost the same.
    }


    getCopy(other_node) {
        var copyPlacement = new Placement(
            other_node.placement.x, other_node.placement.y, other_node.placement.orientation
        );
        var copy = new PathfinderNode(
            copyPlacement, other_node.vehicle, other_node.cost, other_node.combined_cost, other_node.parent
        );
        return copy;
    }
}


function manhattanDistance(node_a, node_b) {
    let x_a = node_a.placement.x;
    let y_a = node_a.placement.y;
    let x_b = node_b.placement.x;
    let y_b = node_b.placement.y;
    let diff_x = x_b - x_a;
    let diff_y = y_b - y_a;
    return Math.sqrt(diff_x*diff_x + diff_y*diff_y);
}