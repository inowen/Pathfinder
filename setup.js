
async function main() {
    /**
     * In here: Await loading the textures, load map, initialize model, view and controller.
     * Then finally attach the listeners to the html elements. The listeners call controller methods
     * (the controller is a singleton).
     */

    // Create view, wait for images to load
    


    // Create and initialize model

    // Start controller, pass references to view and model

    // Add the callbacks to the html elements


    // DOWN HERE, DEBUGGINGç
    let country_roads = new Map2d("country_roads");
    let gameState = new GameState(country_roads, null, 18, 2, 3);
    let view = new View('screen', gameState);

    // Change gameState (add a player thing), then refresh: tests setter, refresh, and drawing player
    /*
    gameState.orientation = 3;
    view.setGameState(gameState);
    view.refresh();

    plan = [];
    plan.push(new Placement(1, 1, 0));
    plan.push(new Placement(1, 2, 0));
    plan.push(new Placement(1, 3, 3));
    plan.push(new Placement(2, 3, 2));
    plan.push(new Placement(3, 3, 1));
    plan.push(new Placement(4, 3, 1));
    plan.push(new Placement(4, 5, 1));

    gameState.plan = plan;
    view.setGameState(gameState);
    view.refresh();
    */


    // Create a PathfinderNode, generate all children, and print them to console.
    var goalNode = new PathfinderNode(new Placement(1, 1, 1), 'c', 0, 0, null);
    var pathfinderNode = new PathfinderNode(new Placement(1, 5, 1), 'b', 0, 10, null);

    var algs = new Algorithms();
    var plan = algs['bfs'](pathfinderNode, goalNode, country_roads);
    console.log("Plan: ");
    console.log(plan);

    
}


main();
console.log("Launched main function, setup exits.");