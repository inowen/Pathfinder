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
        if (this.vehicle == undefined) {
            this.vehicle = 'x';
        }
        this.cost = cost;
        this.combined_cost = combined_cost;
        this.parent = parent;
    }

    getIdentityString() {
        return this.placement.row + "_" + this.placement.col + "_" + this.placement.orientation + "_" + this.vehicle;
    }


    // Btw, the goal node is required to assign the correct value for combined_cost
    // (using a Manhattan distance heuristic)
    generateAllChildren(goal_node, map) {
        var children = new Array();

        // TURN LEFT
        var child_turn_left = this.getCopy(this);
        child_turn_left.placement.orientation = (child_turn_left.placement.orientation + 3) % 4;
        child_turn_left.parent = this;
        child_turn_left.cost += this.getCostTurn(map.get(child_turn_left.placement.row,child_turn_left.placement.col));
        child_turn_left.combined_cost = child_turn_left.cost + manhattanDistance(child_turn_left, goal_node);
        children.push(child_turn_left);

        // TURN RIGHT
        var child_turn_right = this.getCopy(this);
        child_turn_right.placement.orientation = (child_turn_right.placement.orientation + 1) % 4;
        child_turn_right.parent = this;
        child_turn_right.cost += this.getCostTurn(map.get(child_turn_right.placement.row, child_turn_right.placement.col));
        child_turn_right.combined_cost = child_turn_right.cost + manhattanDistance(child_turn_right, goal_node);
        children.push(child_turn_right);

        // GO FORWARD
        var child_go_forward = this.getCopy(this);
        child_go_forward.placement = forwardPlacement(child_go_forward.placement);
        let row = child_go_forward.placement.row;
        let col = child_go_forward.placement.col;
        if (map.isInsideMap(row, col)) {
            if (map.isWalkable(row,col)) {
                child_go_forward.parent = this;
                child_go_forward.cost += this.getCostForward(map.get(this.placement.row, this.placement.col));
                child_go_forward.combined_cost = child_go_forward.cost + manhattanDistance(child_go_forward, goal_node);

                if (map.isVehicle(row,col)) {
                    child_go_forward.vehicle = map.get(row,col);
                }
                children.push(child_go_forward);
            }
        }

        console.log("Created " + children.length + " children.");
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
        console.error("Should never be getting here! Char=" + terrain_char);
        return 50;
    }

    getCostForward(terrain_char) {
        return this.getCostTurn(terrain_char); // For now both actions cost the same.
    }


    getCopy(other_node) {
        var copyPlacement = new Placement(
            other_node.placement.row, other_node.placement.col, other_node.placement.orientation
        );
        var copy = new PathfinderNode(
            copyPlacement, other_node.vehicle, other_node.cost, other_node.combined_cost, other_node.parent
        );
        return copy;
    }
}


function manhattanDistance(node_a, node_b) {
    let row_a = node_a.placement.row;
    let col_a = node_a.placement.col;
    let row_b = node_b.placement.row;
    let col_b = node_b.placement.col;
    let diff_row = row_b - row_a;
    let diff_col = col_b - col_a;
    return Math.abs(diff_row) + Math.abs(diff_col);
}


function forwardPlacement(placement) {
    var ret_placement = new Placement(placement.row, placement.col, placement.orientation);
    if (placement.orientation == 0) {
        ret_placement.row--;
    }
    else if (placement.orientation == 1) {
        ret_placement.col++;
    }
    else if (placement.orientation == 2) {
        ret_placement.row++;
    }
    else if (placement.orientation ==3) {
        ret_placement.col--;
    }
    return ret_placement;
}