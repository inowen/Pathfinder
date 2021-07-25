
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
        this.it_deepening = PathfindIterativeDeepening;
        this.greedy = PathfindGreedy;
    }
}

function PathfindAstar(root_node, goal_node, map) {

}

function PathfindDFS(root_node, goal_node, map) {

}

function PathfindBFS(root_node, goal_node, map) {
    var queue = new Array();
    queue.push(root_node);
    // I need to add a closed set 
    // ...........................
    var path_found = false;
    var current_node;
    while(queue.length>0 && !path_found) {
        current_node = queue.shift();
        // Add current node to the closed set
        // ..................................
        if (current_node.placement.row==goal_node.placement.row
            && current_node.placement.col==goal_node.placement.col
            && current_node.placement.orientation==goal_node.placement.orientation
        ) {
            path_found = true;
        }
        else {
            var all_children = current_node.generateAllChildren(goal_node, map);ç
            for (var i=0; i<all_children.length; ++i) {
                // Check if it's in the closed set. If it isn't, add it to the end of the queue.
                // ............................................................................
            }
        }
    }

    // Make some kind of function that reconstructs an array of Placement by going up the linked list
    // starting from a goal node and ending up at the starting node.
    // (universal function to all algorithms)
    if (path_found) {
        return linkedListToPlan(current_node);
    }
    return null;
}

function PathfindIterativeDeepening(root_node, goal_node, map) {

}

function PathfindGreedy(root_node, goal_node, map) {

}