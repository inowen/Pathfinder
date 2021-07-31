
/**
 * Each of the fields is a function that takes (starting_node, goal_node, map).
 * They return an array of Placement (the plan), or null if no plan could be found.
 */

class Algorithms {
    // Field names ought to be: astar, dfs, bfs, it_deepening, greedy
    constructor() {
        this.astar = PathfindAstar;
        this.dfs = PathfindDFS;
        this.bfs = PathfindBFS;
        this.greedy = PathfindGreedy;
    }
}

function PathfindAstar(root_node, goal_node, map) {

}

function PathfindDFS(root_node, goal_node, map) {
    var stack = new Array();
    stack.push(root_node);
    var closedSet = new EqualitySet();
    var path_found = false;
    var current_node = null;
    while(stack.length>0 && !path_found) {
        current_node = stack.pop();
        closedSet.add(current_node);
        if (current_node.placement.row == goal_node.placement.row
            && current_node.placement.col == goal_node.placement.col
        ) {
            path_found = true;
        }
        else {
            var all_children = current_node.generateAllChildren(goal_node, map);
            for (var i = 0; i < all_children.length; ++i) {
                if (!closedSet.has(all_children[i])) {
                    stack.push(all_children[i]);
                }
            }
        }
    }
    if (path_found) {
        return linkedListToPlan(current_node, root_node);
    }
    return null;
}

function PathfindBFS(root_node, goal_node, map) {
    var queue = new Array();
    queue.push(root_node);
    var closedSet = new EqualitySet();
    var path_found = false;
    var current_node = null;
    while(queue.length>0 && !path_found) {
        current_node = queue.shift();
        closedSet.add(current_node);
        if (current_node.placement.row==goal_node.placement.row
            && current_node.placement.col==goal_node.placement.col
        ) {
            path_found = true;
        }
        else {
            var all_children = current_node.generateAllChildren(goal_node, map);
            for (var i=0; i<all_children.length; ++i) {
                if (!closedSet.has(all_children[i])) {
                    queue.push(all_children[i]);
                }
            }
        }
    }
    if (path_found) {
        return linkedListToPlan(current_node, root_node);
    }
    return null;
}


function PathfindGreedy(root_node, goal_node, map) {

}
















// ----------------------------------------------------------------------------

function linkedListToPlan(final_node, root_node) {
    if (final_node == null) {
        return null;
    }
    var plan = new Array();
    var current_node = final_node;
    while(current_node != root_node) {
        plan.unshift(current_node.placement);
        current_node = current_node.parent;
    }
    return plan;
}