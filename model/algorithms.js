
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
    var closedSet = new EqualitySet();
    var path_found = false;
    var current_node = null;
    while(queue.length>0 && !path_found) {
        current_node = queue.shift();
        closedSet.add(current_node);
        if (current_node.placement.row==goal_node.placement.row
            && current_node.placement.col==goal_node.placement.col
            && current_node.placement.orientation==goal_node.placement.orientation
        ) {
            path_found = true;
        }
        else {
            var all_children = current_node.generateAllChildren(goal_node, map);ç
            for (var i=0; i<all_children.length; ++i) {
                if (!closedSet.has(all_children[i])) {
                    closedSet.add(all_children[i]);
                }
            }
        }
    }
    
    if (path_found) {
        return linkedListToPlan(current_node, root_node);
    }
    return null;
}

function PathfindIterativeDeepening(root_node, goal_node, map) {

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